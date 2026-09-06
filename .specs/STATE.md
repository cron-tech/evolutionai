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

## Handoff

- **Feature**: evolution-landing-page (`.specs/features/evolution-landing-page/`) — ✅ COMPLETE
- **Phase / Task**: Execute finalizado — T1–T33 implementadas e commitadas, Verifier rodou (PASS), 2 gaps menores encontrados e corrigidos em seguida (HDR-05 sem teste; NewsletterForm com copy hardcoded). Gate completo (`lint && typecheck && vitest run && build`) verde: 35/35 testes, `validate_state.py` sem erros.
- **Completed**: Specify, Design, Tasks, Execute (todas as 7 fases) — feature inteira
- **In-progress**: nenhum — nada pendente de código
- **Next step**: QA manual no browser (checklist ao final de `tasks.md`: teclado, breakpoints, `prefers-reduced-motion`, contraste) antes de considerar a página pronta para revisão visual do usuário; depois, revisão de `git log` e decisão do usuário sobre merge/push (fora do escopo autorizado deste Execute)
- **Blockers**: none
- **Uncommitted files**: nenhum arquivo da feature — só `.claude/settings.json`, edição manual do usuário, fora do escopo
- **Branch**: feat/evolution-landing-page (33 tasks + 1 fix de footer + 2 commits de correção pós-Verifier + 1 relatório de validação = commits locais, nenhum push feito)
