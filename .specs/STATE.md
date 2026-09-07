# STATE

## Decisions

### AD-001
- **Decision**: A árvore de componentes da landing page é Server-first, com ilhas de Client Component só onde há estado real de interação (Header, NarrativeSteps, Faq, NewsletterForm). Hover de cards e o resto da composição ficam em Server Components + CSS puro.
- **Reason**: Evita converter a árvore inteira em Client Components (o que aconteceria com um `ScrollProvider` central), preservando streaming/SSR nas seções estáticas e mantendo o bundle de JS mínimo — direto atendimento ao NFR de Core Web Vitals do projeto.
- **Trade-off**: Mais arquivos/limites `"use client"` para gerenciar do que uma solução de contexto único; cada ilha de interação precisa da própria lógica de estado em vez de compartilhar uma fonte central.
- **Scope**: Toda a árvore de componentes em `src/components/sections/` e `src/components/common/` — vale para features futuras nesta base de código, não só para esta landing page.
- **Date**: 2026-09-05
- **Status**: active

### AD-002
- **Decision**: Os tokens de texto/fundo (`--foreground`, `--background`, `--text-muted`, `--text-subtle`, `--text-dimmed`, `--border`) passam a ser relativos à superfície, via variáveis intermediárias `--tone-*` redefinidas em `:root` (escuro, padrão da página), `.surface-light` (dentro da folha branca) e `.surface-dark` (cards escuros aninhados dentro da folha, ex. Personas), em vez de valores fixos.
- **Reason**: QA manual no browser encontrou `--foreground`/`--background` herdando o tema claro do scaffold shadcn (`#0a0a0a`/branco) em vez da paleta do Evolution — a T3 nunca aplicou essas duas linhas do bloco `@theme` de `DESIGN-REFERENCE.md` §9 porque o preset `radix-nova` já as mapeava, e a colisão (Risco 1 do design.md) foi resolvida na direção errada. Efeito: 15 de 36 combinações texto/fundo reais falhavam AA, incluindo a metade "contraste pleno" do título bicolor em toda seção escura. Corrigir token a token teria mantido dois sistemas de cor convivendo (`foreground` vs. `on-light`); tornar os tokens relativos à superfície resolve a família inteira sem qualquer mudança de classe nos componentes que já usam `text-foreground`/`bg-background`/`border-border`.
- **Trade-off**: Um nível extra de indireção (tone → color token) para quem for ler `globals.css`; qualquer novo "tipo de superfície" (ex. um card claro dentro de um card escuro) precisa de uma nova classe `.surface-*`, não só um novo valor de token.
- **Scope**: `src/app/globals.css` e qualquer componente futuro que precise anunciar em qual superfície está (aplicar `.surface-light`/`.surface-dark` no wrapper, nunca por token individual).
- **Date**: 2026-09-06
- **Status**: active

### AD-003
- **Decision**: `--color-background` e `--color-border` (dentro de `@theme inline`) apontam diretamente para `--tone-surface`/`--tone-border`, em vez de para `--background`/`--border`.
- **Reason**: QA rodada 2 achou uma regressão da AD-002 — SocialProof e Pricing (os dois únicos consumidores de `bg-background`/`border-border` na base) renderizavam com fundo/borda congelados no valor de `:root` (preto/translúcido) mesmo dentro de `.surface-light`. Causa: `--background`/`--border` são declaradas numa regra `:root {}` comum, fora de `@theme inline` — uma `var()` só resolve usando o valor visível onde ELA é declarada, e nenhuma regra `.surface-*` redeclara `--background`/`--border` (só `--tone-surface`/`--tone-border`), então o valor fica congelado no de `:root` para a árvore inteira. Os tokens de texto (`foreground`, `text-muted`, etc.) escaparam desse bug por já apontarem direto para `--tone-*`. Um teste de snapshot de classe não pegaria isso — a classe estava certa, só o valor por trás dela quebrou; `src/test/surface-tokens.test.ts` foi adicionado para compilar o CSS de verdade (`@tailwindcss/postcss`) e inspecionar a declaração gerada.
- **Trade-off**: `--background`/`--border`/`--foreground` (as variáveis "soltas", fora do tema) ficam órfãs — declaradas em `:root`/`.dark` só por herança do scaffold shadcn, sem nenhum consumidor real. Aceitável: removê-las teria mais blast radius do que deixá-las inertes.
- **Scope**: `src/app/globals.css` — mesmo escopo da AD-002; qualquer token futuro que precise ser relativo à superfície deve apontar direto para `--tone-*`, nunca para uma variável intermediária declarada só em `:root`.
- **Date**: 2026-09-06
- **Status**: active

### AD-004
- **Decision**: Removido o item de navegação "Recursos" do Header e os links "Central de ajuda"/"Status do produto" da coluna "Recursos" do Footer (mesmo destino órfão, `#recursos`/`#status`); "Sobre o Evolution" passa a apontar para a Hero (`id="sobre"`); demais itens de nav ganham `id` real nas seções (Produto→NarrativeSteps, Soluções→Personas, Preços→Pricing, FAQ→Faq).
- **Reason**: QA rodada 2 achou que nenhuma seção da página tinha `id` — todo link de navegação do Header/Footer sempre foi morto. `spec.md` (HDR-01) e a tabela de Out of Scope já registravam "Recursos" como item sem rota, uma suposição consciente da fase Specify; ao decidir de fato o que fazer com cada link órfão (perguntado ao usuário antes de agir), a decisão foi remover em vez de manter a suposição original — isso substitui HDR-01 (agora 3 links, não 4) e a linha correspondente de Out of Scope, já atualizadas em `spec.md`. "Privacidade"/"Termos" ficam como placeholder inerte (decisão do usuário) — comum em landing pages de portfólio para links legais fora do escopo do case.
- **Trade-off**: Nenhum — é remoção de conteúdo nunca funcional, não perda de funcionalidade real.
- **Scope**: `src/lib/content/header.ts`, `src/lib/content/footer.ts`, `spec.md` (HDR-01, Out of Scope); os 5 `id`+`scroll-mt` ficam em `hero.tsx`, `narrative-steps.tsx`, `personas.tsx`, `pricing.tsx`, `faq.tsx`.
- **Date**: 2026-09-06
- **Status**: active

## Handoff

- **Feature**: evolution-landing-page (`.specs/features/evolution-landing-page/`) — ✅ COMPLETE
- **Phase / Task**: Execute finalizado (T1–T33) + rodada de correção pós-QA manual no browser, em 4 blocos: (1) tokens `--foreground`/`--background` remapeados para tons relativos à superfície (AD-002) — causa raiz de 15/36 combinações de contraste falhando AA; (2) header sem flash de fundo claro antes do primeiro scroll; (3) mídia 404 (Narrative/Delegate) substituída por mocks de UI em código, logos do SocialProof substituídos por SVGs gerados; (4) camada de motion (scroll reveal, hover de botão/card, entrada do parágrafo do Narrative), toda em transform/opacity, com fallback explícito para `prefers-reduced-motion`. Gate completo (`lint && typecheck && vitest run && build`) verde: 41/41 testes, `validate_state.py` sem erros.
- **Completed**: Specify, Design, Tasks, Execute (todas as 7 fases) + correção pós-QA — feature inteira
- **In-progress**: nenhum — nada pendente de código
- **Next step**: QA manual no browser da rodada de correção (o QA anterior já foi feito pelo usuário e gerou os 4 blocos acima; falta confirmar visualmente que os 4 problemas foram resolvidos) antes de considerar a página pronta; depois, revisão de `git log` e decisão do usuário sobre merge/push (fora do escopo autorizado)
- **Blockers**: none
- **Uncommitted files**: nenhum arquivo da feature — só `.claude/settings.json`, edição manual do usuário, fora do escopo
- **Branch**: feat/evolution-landing-page (33 tasks + 1 fix de footer + 2 commits de correção pós-Verifier + 1 relatório de validação + 4 commits da correção pós-QA = commits locais, nenhum push feito)
