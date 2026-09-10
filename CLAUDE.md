# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visão geral

App Next.js (100% App Router — a migração completa do Pages Router residual, ferramentas de debug e API routes, foi fechada na Etapa 4 da v3; TypeScript) que agrega notícias de tecnologia e games de diversos sites brasileiros/portugueses via scraping de HTML (server-side, com JSDOM) e exibe os resultados em um feed único no front-end. Não há banco de dados: cada fonte é raspada sob demanda quando a rota de API é chamada.

Existia também uma feature de "magnet" (torrent), mas foi completamente removida (ver `git log` por "delete obsolete route files"/"delete obsolete json files"). Não recriar `src/pages/magnet` ou `src/pages/api/magnet` a menos que explicitamente solicitado.

## Processo (commits e PRs)

Nunca fazer `git commit` nem abrir Pull Request por conta própria — só quando o humano pedir
explicitamente naquela conversa. Preparar/mostrar o diff e sugerir a mensagem de commit é ok;
executar o commit ou criar o PR sem pedido explícito, não.

Nunca incluir trailer `Co-Authored-By: Claude ...` (ou qualquer variação) nas mensagens de
commit deste repositório — isso faz o GitHub listar "claude" como contribuidor no repo, o que
não é desejado aqui (achado real: aconteceu no commit `41cdcd6`/`2d517eb`, corrigido via amend +
force-push).

### Decisões de arquitetura (`docs/decisions/`)

Decisões não triviais (remover/arquivar código, resolver dependência legada) ficam registradas
como ADR em `docs/decisions/NNNN-titulo.md`. Por convenção, um ADR pode citar o achado de origem
do workspace pessoal de avaliação (`reactjs/improvements/vN/feed-news/`, fora deste
repositório) por caminho de arquivo, para rastreabilidade — isso é intencional, não uma
referência quebrada nem um descuido: esse workspace é uma ferramenta de acompanhamento pessoal,
não faz parte do código nem é acessível a terceiros que clonarem este repo, mas o caminho ajuda
o próprio autor a re-encontrar o contexto completo da decisão.

## Comandos

```bash
pnpm install        # gerenciador de pacotes do projeto (ver pnpm-lock.yaml)
pnpm dev             # servidor de desenvolvimento (next dev)
pnpm build           # build de produção
pnpm start           # serve o build de produção
pnpm lint            # eslint . (flat config, eslint.config.mjs)

pnpm test                  # roda toda a suíte Jest (jest --runInBand)
pnpm test:e2e:apitech      # só os testes de integração das fontes de tech
pnpm test:e2e:apigame      # só os testes de integração das fontes de game
```

Para rodar um teste único: `npx jest -t "nome do teste"` ou `npx jest src/scraping/__tests__/tech-source.integration.test.ts -t "site offline"`.

Os testes em `src/scraping/__tests__/*.integration.test.ts` são testes de integração reais: eles disparam `it.each` sobre **todas** as fontes cadastradas e fazem requests HTTP de verdade para os sites de origem (não há mocks). São lentos, dependem de rede e podem falhar se um site mudar a marcação HTML ou ficar fora do ar — isso é esperado e não necessariamente indica regressão no código deste repo. `jest.setTimeout(20000)` reflete essa dependência de rede.

Node `>=24.0.0` é exigido (`engines` em `package.json`).

## Arquitetura

### Scraping de fontes (núcleo do backend)

Cada site de origem é uma classe em `src/scraping/{tech,game}/<arquivo>.ts` que implementa a interface `ISource` (definida em `index.ts` de cada domínio). Essas classes ficam fora de `src/app/api/` de propósito — não são rotas, e o Next valida em build-time que todo `route.ts` dentro de `app/**` exporte um handler HTTP (`GET`/`POST`/etc.), o que essas classes nunca fizeram (export default de uma instância, não de uma função):

```ts
interface ISource {
  getOriginUrl(): string;
  getHome(): Promise<IResponseHomeDTO>;
}
```

- `getOriginUrl()` retorna a URL do site, mas **codificada em base64** (`atob("...")` dentro do método).
- `getHome()` usa `JSDOM.fromURL(url)` para baixar e parsear o HTML do site real, depois usa `document.querySelectorAll`/seletores CSS específicos daquele site para extrair `link`, `title`, `thumb`, `created_at` de cada post.
- O **nome do arquivo** da classe também é a URL em base64 (ex.: `aHR0cHM6Ly90ZWNub2Jsb2cubmV0.ts` decodifica para `https://tecnoblog.net`). Isso é intencional (ver `md/encode.md` no histórico — não versionado, mas presente localmente): ofusca a lista de sites raspados em vez de deixá-la legível em texto puro nos nomes de arquivo/import.
- `src/scraping/{tech,game}/index.ts` (um por domínio) importa todas as classes e exporta o array `sources: ISource[]`. Ao adicionar/remover uma fonte, este é o único lugar a atualizar os imports/array. `src/app/api/{tech,game}/source/route.ts` (a rota de verdade) importa `sources`/`Post` daqui.
- `src/scraping/{tech,game}/alias.txt` em cada domínio é uma tabela de referência (não importada pelo código) mapeando URL legível → string base64, útil para localizar/depurar qual arquivo corresponde a qual site.
- Fontes descontinuadas ficam comentadas no `index.ts` e/ou documentadas em um array `_sourcesRemoved`/`originsRemoved` com motivo e data, em vez de simplesmente apagadas — preserva o histórico de por que um site saiu do ar.

### Rotas de API

`src/app/api/{tech,game}/source/route.ts` (Route Handler do App Router, `GET(request: Request)`) é o único handler por domínio. Recebe `?url=<alias>` (substring da URL decodificada, case-insensitive), encontra a fonte correspondente em `sources` filtrando por `getOriginUrl().includes(alias)`, chama `engine.getHome()` e devolve `{ data, total }` com `id` injetado em cada post (`id = link`). Erros (parâmetro faltando, alias não encontrado) retornam JSON estruturado com status 400+.

Não existe um `route.ts` genérico compartilhado entre `tech` e `game` — a lógica é duplicada propositalmente entre os dois domínios; ao alterar o comportamento de um, verifique se o outro precisa do mesmo ajuste.

Os testes de integração (`src/scraping/__tests__/*.integration.test.ts`) importam a função `GET` exportada do `route.ts` e chamam ela direto com um `Request`, sem servidor HTTP fake — não usam `supertest` (removido do projeto na Etapa 4 da v3, já sem uso depois da migração para Route Handlers).

### Origens exibidas no front-end

`src/assets/json/{tech,game}/origins.ts` contém a lista de origens mostradas na UI (título, URL, `BIN_ID`), também com `title`/`url` em base64 e decodificados via `atob` no `default export`. É uma lista separada (e não necessariamente idêntica) das classes em `sources/`, usada para gerar abas/menus e os `generateStaticParams` das páginas dinâmicas.

### Páginas dinâmicas

`src/app/tech/[slug]/page.tsx` e `src/app/game/[slug]/page.tsx` (App Router, Server Components): `generateStaticParams` pré-renderiza só a primeira origem no build (as demais renderizam sob demanda na primeira visita, dado o número de fontes); `export const revalidate = 86400` faz a revalidação ISR (24h, não mais 2h). Os dados reais são buscados direto no servidor — `await getTechContent(slug)`/`await getGameContent(slug)` (`TechFeed.tsx`/`GameFeed.tsx` em `src/components/Feed/`, que por sua vez chamam o helper compartilhado `getFeedContent` em `src/scraping/getFeedContent.ts`) — sem `@tanstack/react-query` e sem fetch client-side para essas duas rotas (a dependência não está mais em `package.json`).

`src/app/tech/placeholder/` é ferramenta de debug — um `page.tsx` Server Component (só exporta `metadata`, título da aba) que renderiza um `*Client.tsx` (`"use client"`, usa `useState`/`useEffect` reais, então o boundary client é honesto, não um escape hatch). Migrada para App Router na Etapa 4 da v3 (antes vivia em `src/pages/tech/placeholder.tsx`, servida por `src/pages/_app.tsx`, hoje removido). As API routes (`src/app/api/**/route.ts`) também são Route Handlers do App Router — ver seção "Rotas de API".

`src/app/tech/refresh/` e `src/app/api/tech/stored/route.ts` existiram como ferramenta de debug/rota apontando para um backend externo legado (`NEXT_PUBLIC_API_TECH_URL`, nunca documentado em `.env.example`) e foram removidos — publicamente acessíveis e funcionalmente quebrados (chamavam rotas que não existem mais nesse backend).

### Imagens (`next/image`)

`next.config.js` usa `remotePatterns: [{ protocol: "https", hostname: "**" }]` — uma whitelist manual de host por host ficaria obsoleta a cada fonte nova (são 60+ fontes em `src/assets/json/{tech,game}/origins.ts`, cada uma com seu próprio domínio/CDN de thumbnail). A curadoria real de quais sites são confiáveis já acontece em `src/scraping/{tech,game}/index.ts` (só sites aprovados ali chegam a virar `<Image>`); o wildcard de hostname é um trade-off consciente, não um descuido.

`images.unoptimized: true` também está setado (desde 2026-09-09) — a cota de Image Optimization Transformations da Vercel (free tier, 5.000/mês) é cobrada por **time** (`marcelovilelas-projects`), não por projeto, e outro projeto do mesmo time já consumiu a cota inteira sozinho, causando 402 em imagens novas aqui mesmo sem este projeto ter alto uso próprio. Como o catálogo de thumbs deste app é infinito e nunca reaproveitado (cada artigo raspado gera uma imagem nova, vista uma única vez, em 60+ domínios sem contrato de resize), o ganho da otimização automática (webp, `srcset` responsivo) era baixo frente ao risco de depender de uma cota compartilhada fora do controle deste projeto. Com `unoptimized`, `<Image>` renderiza a imagem original da fonte sem passar pelo pipeline `/_next/image` da Vercel; `remotePatterns` fica inerte enquanto essa flag estiver ativa, mantido só caso a otimização seja reativada no futuro.

### Alias de import `@/`

`components.json` (config do shadcn/ui) declara o alias `@/components` e `@/utils`, mas **não há `paths` no `tsconfig.json`**. O alias funciona porque `baseUrl` é `"src"` e existe um diretório literal `src/@/components/...` e `src/@/lib/utils.ts` — ou seja, `@` não é um alias TS, é uma pasta real chamada `@` dentro de `src`. Resolução de imports não-`@` (ex.: `components/Loading`, `services/api`, `hooks/settings`) também depende desse mesmo `baseUrl: "src"`.

### UI

Mistura de componentes "legados" (`src/components/...`) e componentes shadcn/ui (`src/@/components/ui/...`, estilo "new-york", Tailwind com CSS variables, base color zinc). Vários componentes têm sufixo `Shadcn` (ex.: `ArticleCardShadcn.tsx`) indicando uma migração em andamento de Bootstrap/tw-elements para shadcn — ao tocar em um componente, verifique se há uma contraparte `*Shadcn` que deveria ser usada/atualizada no lugar.

Estado global simples via Context API em `src/hooks/` — hoje `src/hooks/index.tsx` só monta o `ThemeProvider` da shadcn (dark/light). `SettingsProvider`/`StyleSwitcherProvider` (versões anteriores, hand-rolled) não existem mais. Sem Redux/Zustand.

## Coisas a saber antes de editar

- Arquivos `*.txt`, `*.zip` e as pastas `/md` e `/notes` estão no `.gitignore` — são notas de trabalho/backups locais, não fazem parte do código do app e não devem ser tratados como fonte de verdade para arquitetura (apesar de às vezes conterem o raciocínio por trás de um refactor).
- Ao adicionar uma nova fonte de scraping, siga o padrão existente: nome de classe curto, `getOriginUrl()` retornando `atob(<base64 da URL>)`, nome do arquivo igual ao base64 da URL (com padding `=` literal no nome do arquivo), export default de uma instância (`export default new NomeClasse()`), colocado em `src/scraping/{tech,game}/` (não em `src/app/api/`), e registrar o import + entrada no array em `src/scraping/{tech,game}/index.ts` do domínio correspondente.

## Sobre scraping e uso responsável

Este projeto é uma demo de portfólio pessoal, não um produto comercial: o scraping das +60 fontes é feito sob demanda (disparado por navegação real de um usuário na página, não por um crawler agendado rodando 24/7) e em baixo volume. A ofuscação em base64 dos nomes/URLs das fontes (ver seção de Arquitetura) já reflete essa consciência sobre ToS de terceiros. Uso desse tipo — baixo volume, sob demanda, fins de demonstração — é comum e geralmente tolerado; quem for reaproveitar o projeto para uso próprio deve avaliar os termos de serviço dos sites de origem antes de operar em escala maior.

Não há rate-limiting nem checagem de `robots.txt` implementados — decisão consciente dado o volume baixo e o padrão sob demanda (uma requisição por origem, só quando um usuário acessa aquela página), não um crawler varrendo os sites continuamente.

`pnpm build` produz stderr ruidoso (erros de parsing de CSS/HTML de bibliotecas de terceiros via JSDOM) — isso é esperado: `generateStaticParams` dispara scraping real contra os sites de origem durante a geração estática, e não indica falha de build. Mesmo padrão de barulho já documentado acima para os testes de integração, que também batem em sites reais.
