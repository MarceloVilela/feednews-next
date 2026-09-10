# 0001 — Arquivar `ImageWithFallbackProps` em vez de usar ou apagar

- **Status:** aceita
- **Contexto:** achado M3 da rodada de avaliação v4 (`improvements/v4/feed-news/0feednews-next.md`)

## Contexto

`src/components/ImageWithFallbackProps.tsx` nunca teve um consumidor real: `git log -S
"<ImageWithFallback"` não retorna nenhum commit em toda a história do repositório. Foi criado no
*initial commit* e só recebeu um outro commit (`9104495`, "fix: warning vercel on deploy"), que
adicionou `alt=''` fixo depois do `{...rest}` só pra silenciar um warning de build do Vercel —
mudança que introduziu o bug de acessibilidade em si (`alt=''` sobrescreve qualquer `alt` real
que um consumidor passasse), sem nunca chegar a ser usado em nenhuma página.

Ao mesmo tempo, o caso de uso que o componente tentava resolver é real: o app raspa thumbnail de
60+ domínios externos sem contrato de disponibilidade (ver `CLAUDE.md`, seção de scraping), então
fallback de imagem quebrada não é hipotético.

## Decisão

Não integrar o componente agora (não há trabalho de UI planejado pra isso nesta rodada), mas
também não descartar a ideia — arquivá-lo como referência fora do bundle/repositório público,
movendo-o para `notes/deprecated/ImageWithFallbackProps.tsx` (pasta local, `.gitignore`).

Isso segue um precedente já existente no próprio projeto: quando `ArticleCardShadcn.tsx`
substituiu o `ArticleCard` original (tw-elements/Bootstrap) em 2023, a versão antiga foi
preservada do mesmo jeito, como `notes/ArticleCardWithImage copy.tsx` — cópia crua do arquivo,
sem doc em prosa, só o código guardado como retrato de um estado passado. `md/claude-feats.md`
(nota local de uma sessão anterior) documenta o contexto mais amplo dessa mesma migração de UI
(tw-elements → shadcn, "migração visivelmente incompleta").

Alternativas consideradas:
- **Usar agora** (plugar em `ArticleCardShadcn`/`ArticleCardAspectShadcn`) — descartada por não
  haver demanda de UI nesta rodada; corrigir o bug do `alt` sem integrar não justificaria manter
  o arquivo em `src/`.
- **Apagar sem guardar** — descartada porque o caso de uso (fallback de thumbnail raspada) é
  genuíno e pode valer a pena revisitar.

## Consequências

- `src/components/ImageWithFallbackProps.tsx` sai do repositório versionado (fecha o M3: "arquivo
  removido, zero consumidor confirmado").
- A cópia em `notes/` preserva o bug do `alt` de propósito (retrato do estado, não código pronto
  pra reaproveitar) — se o componente for retomado no futuro, corrigir esse bug (exigir `alt` real
  do chamador em vez de fixar `''`) é pré-requisito antes de integrar, não algo a herdar.
- Achado de origem: M3 da rodada de avaliação v4 (fora deste repositório, workspace pessoal de
  avaliação — não referenciado por caminho aqui por não fazer parte deste código-fonte).
