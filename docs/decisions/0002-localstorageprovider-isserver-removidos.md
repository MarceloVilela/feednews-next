# 0002 — Remover `localStorageProvider` e `isServer` sem arquivar

- **Status:** aceita e executada
- **Contexto:** achado H3 da rodada de avaliação v4 (resíduos mortos que contradizem a alegação
  de "migração completa para App Router")

## Contexto

Duas funções utilitárias sem consumidor há tempos, cada uma morta por um caminho diferente
(investigado via `git log -S` antes de remover, conforme prática deste repositório de rastrear
consumidores antes de apagar código):

- **`src/services/localStorageProvider.ts`** — escrito pra ser passado como `provider` (cache
  persistente via `localStorage`) do `SWRConfig`, mas nunca foi ligado de fato: o `_app.tsx`
  original só usava a opção `fetcher` do `SWRConfig`. Morto desde o *initial commit*, não é
  resíduo de um refactor específico — foi escrito e nunca plugado em lugar nenhum. A camada que
  ele serviria (cache de requisições no cliente) deixou de existir quando `swr`/`react-query`
  foram removidos (commit "moderniza data fetching, dependências e config de lint") e a
  arquitetura passou a buscar dados direto no servidor (Server Components + `revalidate`).
- **`src/utils/isServer.ts`** — tinha consumidor real até certo ponto: era o guard de SSR dentro
  do `StyleSwitcherProvider` hand-rolled (tema dark/light via `localStorage` manual,
  `if (isServer()) return { alias: 'dark' }` pra evitar acessar `localStorage` no servidor). Esse
  provider inteiro foi removido num cleanup anterior ("remove cluster morto, corrige tema claro e
  adiciona skeleton") e substituído pelo `ThemeProvider` do shadcn (`next-themes`), que resolve o
  mesmo problema de hidratação internamente (padrão `mounted` + `suppressHydrationWarning`), sem
  precisar de um `isServer()` externo. A função ficou órfã porque aquele cleanup removeu quem
  chamava, sem remover o arquivo em si.

## Decisão

Remover os dois arquivos de `src/` — nenhum dos dois vira componente ativo de novo, diferente do
achado M3.

Diferente do achado M3 (`ImageWithFallbackProps`, ver
[`0001-image-with-fallback-arquivado.md`](./0001-image-with-fallback-arquivado.md)), aqui não há
um caso de uso real e não atendido por trás do código morto — a funcionalidade de cada um
(persistência de cache de fetch; guard de SSR pra acesso a `localStorage`) já é coberta hoje por
outra peça da arquitetura atual (ausência de cache client-side; `ThemeProvider`/`next-themes`
internamente). Não são candidatos a reaproveitamento futuro, ao contrário do M3.

**Atualização**: depois desta decisão, o humano pediu backup de todo arquivo removido e
documentado em `docs/decisions/` (não só o M3) em `notes/deprecated/` — os dois arquivos deste
ADR também foram preservados lá, restaurados via `git show HEAD:<path>`. Isso não contradiz a
decisão acima: a diferença de fundo com o M3 continua valendo (aqui é cópia de segurança/
rastreabilidade, não arquivamento como exemplo reaproveitável).

## Consequências

- `src/services/localStorageProvider.ts` e `src/utils/isServer.ts` removidos do repositório
  (cópia de backup em `notes/deprecated/`, ver atualização acima).
- Fecha a parte de remoção de código do H3. A parte de documentação do mesmo achado (`CLAUDE.md`,
  que citava `SettingsProvider`/`StyleSwitcherProvider` — hoje inexistentes em
  `src/hooks/index.tsx`, que só monta `ThemeProvider`) foi corrigida na mesma execução;
  `README.md` não tinha menção literal aos nomes dos providers, conferido e deixado como está.
