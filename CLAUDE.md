# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visão geral

App Next.js (Pages Router, TypeScript) que agrega notícias de tecnologia e games de diversos sites brasileiros/portugueses via scraping de HTML (server-side, com JSDOM) e exibe os resultados em um feed único no front-end. Não há banco de dados: cada fonte é raspada sob demanda quando a rota de API é chamada.

Existia também uma feature de "magnet" (torrent), mas foi completamente removida (ver `git log` por "delete obsolete route files"/"delete obsolete json files"). Não recriar `src/pages/magnet` ou `src/pages/api/magnet` a menos que explicitamente solicitado.

## Comandos

```bash
pnpm install        # gerenciador de pacotes do projeto (ver pnpm-lock.yaml)
pnpm dev             # servidor de desenvolvimento (next dev)
pnpm build           # build de produção
pnpm start           # serve o build de produção
pnpm lint            # next lint

pnpm test                  # roda toda a suíte Jest (jest --runInBand)
pnpm test:e2e:apitech      # só os testes de integração das fontes de tech
pnpm test:e2e:apigame      # só os testes de integração das fontes de game
```

Para rodar um teste único: `npx jest -t "nome do teste"` ou `npx jest src/pages/api/__tests__/tech-source.integration.test.ts -t "site offline"`.

Os testes em `src/pages/api/__tests__/*.integration.test.ts` são testes de integração reais: eles disparam `it.each` sobre **todas** as fontes cadastradas e fazem requests HTTP de verdade para os sites de origem (não há mocks). São lentos, dependem de rede e podem falhar se um site mudar a marcação HTML ou ficar fora do ar — isso é esperado e não necessariamente indica regressão no código deste repo. `jest.setTimeout(20000)` reflete essa dependência de rede.

Node `>=24.0.0` é exigido (`engines` em `package.json`).

## Arquitetura

### Scraping de fontes (núcleo do backend)

Cada site de origem é uma classe em `src/pages/api/{tech,game}/sources/<arquivo>.ts` que implementa a interface `ISource` (definida em `sources/index.ts` de cada domínio):

```ts
interface ISource {
  getOriginUrl(): string;
  getHome(): Promise<IResponseHomeDTO>;
}
```

- `getOriginUrl()` retorna a URL do site, mas **codificada em base64** (`atob("...")` dentro do método).
- `getHome()` usa `JSDOM.fromURL(url)` para baixar e parsear o HTML do site real, depois usa `document.querySelectorAll`/seletores CSS específicos daquele site para extrair `link`, `title`, `thumb`, `created_at` de cada post.
- O **nome do arquivo** da classe também é a URL em base64 (ex.: `aHR0cHM6Ly90ZWNub2Jsb2cubmV0.ts` decodifica para `https://tecnoblog.net`). Isso é intencional (ver `md/encode.md` no histórico — não versionado, mas presente localmente): ofusca a lista de sites raspados em vez de deixá-la legível em texto puro nos nomes de arquivo/import.
- `sources/index.ts` (um por domínio, `tech` e `game`) importa todas as classes e exporta o array `sources: ISource[]`. Ao adicionar/remover uma fonte, este é o único lugar a atualizar os imports/array.
- `sources/alias.txt` em cada domínio é uma tabela de referência (não importada pelo código) mapeando URL legível → string base64, útil para localizar/depurar qual arquivo corresponde a qual site.
- Fontes descontinuadas ficam comentadas no `index.ts` e/ou documentadas em um array `_sourcesRemoved`/`originsRemoved` com motivo e data, em vez de simplesmente apagadas — preserva o histórico de por que um site saiu do ar.

### Rotas de API

`src/pages/api/{tech,game}/source.ts` é o único handler por domínio. Recebe `?url=<alias>` (substring da URL decodificada, case-insensitive), encontra a fonte correspondente em `sources` filtrando por `getOriginUrl().includes(alias)`, chama `engine.getHome()` e devolve `{ data, total }` com `id` injetado em cada post (`id = link`). Erros (parâmetro faltando, alias não encontrado) retornam JSON estruturado com status 400+.

Não existe um `source.ts` genérico compartilhado entre `tech` e `game` — a lógica é duplicada propositalmente entre os dois domínios; ao alterar o comportamento de um, verifique se o outro precisa do mesmo ajuste.

### Origens exibidas no front-end

`src/assets/json/{tech,game}/origins.ts` contém a lista de origens mostradas na UI (título, URL, `BIN_ID`), também com `title`/`url` em base64 e decodificados via `atob` no `default export`. É uma lista separada (e não necessariamente idêntica) das classes em `sources/`, usada para gerar abas/menus e os `getStaticPaths` das páginas dinâmicas.

### Páginas dinâmicas

`src/pages/tech/[slug].tsx` e `src/pages/game/[slug].tsx`: `getStaticPaths` gera uma página por origem (`fallback: "blocking"`/`true`), `getStaticProps` apenas faz revalidação ISR (2h) sem buscar dados no build. Os dados reais chegam no client via `react-query`, que chama `/api/{tech,game}/source?url=...` (fetch direto, não usa o axios client de `src/services/api.ts`, que está praticamente não utilizado pelas páginas atuais).

### Alias de import `@/`

`components.json` (config do shadcn/ui) declara o alias `@/components` e `@/utils`, mas **não há `paths` no `tsconfig.json`**. O alias funciona porque `baseUrl` é `"src"` e existe um diretório literal `src/@/components/...` e `src/@/lib/utils.ts` — ou seja, `@` não é um alias TS, é uma pasta real chamada `@` dentro de `src`. Resolução de imports não-`@` (ex.: `components/Loading`, `services/api`, `hooks/settings`) também depende desse mesmo `baseUrl: "src"`.

### UI

Mistura de componentes "legados" (`src/components/...`) e componentes shadcn/ui (`src/@/components/ui/...`, estilo "new-york", Tailwind com CSS variables, base color zinc). Vários componentes têm sufixo `Shadcn` (ex.: `ArticleCardShadcn.tsx`) indicando uma migração em andamento de Bootstrap/tw-elements para shadcn — ao tocar em um componente, verifique se há uma contraparte `*Shadcn` que deveria ser usada/atualizada no lugar.

Estado global simples via Context API em `src/hooks/` (`SettingsProvider` para origem tech/game selecionada, `StyleSwitcherProvider`, `ThemeProvider` da shadcn para dark/light). Sem Redux/Zustand.

## Coisas a saber antes de editar

- Arquivos `*.txt`, `*.zip` e as pastas `/md` e `/notes` estão no `.gitignore` — são notas de trabalho/backups locais, não fazem parte do código do app e não devem ser tratados como fonte de verdade para arquitetura (apesar de às vezes conterem o raciocínio por trás de um refactor).
- Ao adicionar uma nova fonte de scraping, siga o padrão existente: nome de classe curto, `getOriginUrl()` retornando `atob(<base64 da URL>)`, nome do arquivo igual ao base64 da URL (com padding `=` literal no nome do arquivo), export default de uma instância (`export default new NomeClasse()`), e registrar o import + entrada no array em `sources/index.ts` do domínio correspondente.
