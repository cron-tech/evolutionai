# STATE

## Decisions

### AD-001
- **Decision**: A árvore de componentes da landing page é Server-first, com ilhas de Client Component só onde há estado real de interação (Header, NarrativeSteps, Faq, NewsletterForm). Hover de cards e o resto da composição ficam em Server Components + CSS puro.
- **Reason**: Evita converter a árvore inteira em Client Components (o que aconteceria com um `ScrollProvider` central), preservando streaming/SSR nas seções estáticas e mantendo o bundle de JS mínimo — direto atendimento ao NFR de Core Web Vitals do projeto.
- **Trade-off**: Mais arquivos/limites `"use client"` para gerenciar do que uma solução de contexto único; cada ilha de interação precisa da própria lógica de estado em vez de compartilhar uma fonte central.
- **Scope**: Toda a árvore de componentes em `src/components/sections/` e `src/components/common/` — vale para features futuras nesta base de código, não só para esta landing page.
- **Date**: 2026-09-05
- **Status**: active

## Handoff

- **Feature**: evolution-landing-page (`.specs/features/evolution-landing-page/`)
- **Phase / Task**: Design aprovado; próxima fase é Tasks (breakdown completo, feature é Large — múltiplos componentes e dependências)
- **Completed**: Specify (spec.md validado, 0 erros), Design (design.md escrito, 2 decisões de arquitetura confirmadas com o usuário)
- **In-progress**: nenhum arquivo de código ainda — nenhuma linha de implementação foi escrita (fase EXECUTE não iniciada)
- **Next step**: Rodar a fase Tasks (`references/tasks.md`) para quebrar o design em tasks atômicas com dependências, depois `validate_tasks.py` antes de apresentar para aprovação
- **Blockers**: none
- **Uncommitted files**: `docs/DESIGN-REFERENCE.md`, `.specs/features/evolution-landing-page/spec.md`, `.specs/features/evolution-landing-page/design.md`, `.specs/STATE.md` — todos novos, nenhum commitado ainda (o usuário commita manualmente por convenção do projeto)
- **Branch**: main
