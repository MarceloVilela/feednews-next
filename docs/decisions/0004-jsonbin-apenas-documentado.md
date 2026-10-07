# 0004 — jsonbin fica só como referência documentada, sem uso no projeto

- **Status:** aceita e executada (v5, etapa 3)
  (`reactjs/improvements/v5/feed-news/0feednews-next.md`)
- **Contexto:** `/tech/placeholder` depende do backend externo legado já descrito no ADR 0003 e
  grava, sem autenticação, num bin do jsonbin.io de terceiro a cada carregamento da página

## Contexto

No momento da decisão, `src/app/tech/placeholder/PlaceholderClient.tsx` dispara em `useEffect` de montagem
`apiTech.get("/technews/post/origin")` (backend legado) e `jsonbin.put(BIN_ID, data)`. Resultado:
qualquer visita grava num recurso de terceiro sem clique e sem autenticação, e a leitura depende
de uma API que pode não existir mais. `src/services/jsonbin.ts` e `apiGeneric` não têm nenhum
outro consumidor.

O jsonbin teve um papel real num cliente anterior **sem Next**, que dependia de uma API em
hospedagem gratuita (Heroku/Render) que hiberna e precisa de wakeup: o jsonbin servia de
**placeholder** (cache de leitura) enquanto a API acordava. Cada origem tinha o seu próprio bin,
identificado pelo `BIN_ID`, guardando os posts daquela origem. O cliente de referência é o app
`MarceloVilela/Tech-News` (React Native), cuja tela de Refresh percorre as origens e atualiza os
posts pela API. Esse desenho não existe mais neste
projeto — que usa Next com scraping server-side e ISR (`revalidate = 86400`), sem API
intermediária — e o campo `BIN_ID` em `src/assets/json/tech/origins.ts` era o resquício dele.

## Decisão

Remover do projeto o uso de jsonbin: `/tech/placeholder`, `apiGeneric`, `src/services/jsonbin.ts`
e, se não sobrar consumidor, `apiTech`/`NEXT_PUBLIC_API_TECH_URL`. O padrão fica registrado
**apenas aqui**, como referência de como resolver o mesmo problema num cliente **sem Next**
(SPA ou app nativo) que depende de uma API que hiberna. Não é código a ser reintroduzido.

## Referência: snapshot como placeholder (stale-while-revalidate)

1. Ao abrir, o cliente dispara um ping leve de wakeup na API (ex.: `/health`).
2. Em paralelo, lê o snapshot público do jsonbin e renderiza o feed na hora, marcado como
   "atualizando" e com a idade do dado (`updated_at`).
3. Chama a API real com timeout longo (o wakeup de plano gratuito não é imediato). Quando responde,
   substitui o snapshot; se falhar ou estourar o tempo, mantém o snapshot e exibe a data.

Regras do padrão:

- **Um bin por origem** (`BIN_ID` → posts daquela origem), em vez de um bin único com tudo.
- **Só o servidor escreve no bin** (a API, ao fim de cada scraping, ou um job agendado), com a
  chave guardada no servidor. O cliente apenas lê — cliente gravando em recurso de terceiro sem
  autenticação é o defeito que motivou esta decisão.
- **Mesmo contrato nos dois lados:** `{ data, total, updated_at }`, igual ao que a API devolve,
  para o cliente tratar snapshot e resposta real pelo mesmo código.
- **Falha graciosa:** sem rede ou sem API, o último snapshot continua visível.

```ts
async function loadFeed(slug: string) {
  void fetch(`${API}/health`).catch(() => {});
  const snapshot = await readSnapshot(slug);
  render(snapshot, { stale: true });
  try {
    const fresh = await fetchApi(slug, { timeoutMs: 60_000 });
    render(fresh, { stale: false });
  } catch (error) {
    console.warn("API indisponível, mantendo snapshot", error);
  }
}
```

## Alternativas consideradas

- **Reescrever `/tech/placeholder` como demonstração viva** (leitura via `getFeedContent`, escrita
  atrás de clique, `.env.example`): rejeitada — mantém no repositório uma rota de debug, uma
  dependência de serviço de terceiro e variáveis de ambiente para algo que o app não usa.
- **Manter como está:** rejeitada — escrita automática sem autenticação e dependência de backend
  morto.

## Consequências

- Removidos: `src/app/tech/placeholder/`, `src/services/jsonbin.ts` e `src/services/api.ts`
  (`apiGeneric` e `apiTech`, sem consumidor restante, confirmado por `grep`), o campo `BIN_ID` de
  `src/assets/json/tech/origins.ts` (o `game` não o tinha; único consumidor era
  `PlaceholderClient.tsx`) e `NEXT_PUBLIC_API_TECH_URL` do `.env` local. `CLAUDE.md` atualizado
  (seções "Origens exibidas no front-end" e "Páginas dinâmicas").
- A "descoberta lateral" do ADR 0003 está resolvida.
- Quem precisar do padrão num cliente sem Next tem a descrição acima; nada no código depende dele.
- **Segurança:** uma chave de API do jsonbin esteve versionada (em comentário de
  `src/services/jsonbin.ts`, no histórico git) e em variável `NEXT_PUBLIC_*`, embutida no
  JavaScript do navegador de builds antigos. Remover o arquivo não a retira do histórico; a chave
  foi revogada/rotacionada no jsonbin pelo autor (v5, etapa 3), então o valor antigo no histórico
  não dá mais acesso.
