# 0003 — Remover `/tech/refresh` e `api/tech/stored/route.ts`

- **Status:** aceita e executada
- **Contexto:** achados H4 e M2 da rodada de avaliação v4 — compartilhavam a mesma decisão de
  fundo (o que fazer com a dependência de um backend externo legado) e foram resolvidos juntos

## Contexto

- **H4 — `src/app/tech/refresh/` (`page.tsx` + `RefreshClient.tsx`)**: ferramenta de debug
  publicamente acessível no deploy que chamava rotas de um backend externo legado
  (`NEXT_PUBLIC_API_TECH_URL`, via `apiTech` em `src/services/api.ts`) que não existem mais
  nesse formato — `/technews-source`, `technews/refresh`, `/technews-source/detail`,
  `/technews/post`. A variável de ambiente nunca foi documentada em `.env.example` (o arquivo não
  existe no repositório).
- **M2 — `src/app/api/tech/stored/route.ts`**: rota interna sem nenhum chamador dentro do app
  (`grep -rn "tech/stored" src` só encontrava o próprio arquivo), também apontando pro mesmo
  backend legado (`/technews/post/origin`), com `catch` silencioso e sem `encodeURIComponent` no
  parâmetro repassado.

Nenhuma das duas rotas era referenciada por `NavigationBar` ou qualquer outro link interno —
confirmado por `grep` antes de remover; só eram alcançáveis por URL direta.

## Decisão

Remover as duas por completo (opção "a" das alternativas levantadas na avaliação, em vez de
corrigir/redirecionar pra API real com `.env.example`) — a API externa legada não faz parte do
fluxo atual do projeto, que hoje faz scraping direto sem backend intermediário.

`CLAUDE.md` atualizado (linha que descrevia `/tech/refresh` como ferramenta de debug ativa)
registrando a remoção e o motivo.

## Descoberta lateral (fora do escopo desta decisão)

`src/services/api.ts` **não foi removido** — o cliente `apiTech` (mesmo `NEXT_PUBLIC_API_TECH_URL`)
continua em uso por `src/app/tech/placeholder/PlaceholderClient.tsx`, que chama o mesmo endpoint
legado (`/technews/post/origin`). Ou seja, a dependência do backend externo legado não foi
totalmente retirada do projeto — só a parte coberta por H4/M2. `/tech/placeholder` provavelmente
tem o mesmo problema de fundo (aponta pra uma API que pode não existir mais), mas isso não estava
no escopo desta decisão e fica como achado em aberto para uma rodada futura.

## Consequências

- `src/app/tech/refresh/` e `src/app/api/tech/stored/route.ts` removidos do repositório.
- `CLAUDE.md` atualizado, sem referência a rota órfã.
- `apiTech`/`NEXT_PUBLIC_API_TECH_URL` continuam existindo em `src/services/api.ts` — não são
  código morto, ainda têm um consumidor real (`/tech/placeholder`).
