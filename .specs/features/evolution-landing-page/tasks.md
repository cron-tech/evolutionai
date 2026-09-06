# Evolution Landing Page Tasks

## Execution Protocol (MANDATORY -- do not skip)

Implement these tasks with the `tlc-spec-driven` skill: **activate it by name and
follow its Execute flow and Critical Rules.** Do not search for skill files by
filesystem path. The skill is the source of truth for the full flow (per-task
cycle, sub-agent delegation, adequacy review, Verifier, discrimination sensor).

**If the skill cannot be activated, STOP and tell the user - do not proceed
without it.**

---

**Design**: `.specs/features/evolution-landing-page/design.md`
**Status**: Draft

---

## Test Coverage Matrix

> Gerado por decisão explícita do usuário (nenhum framework de teste instalado
> ainda, nenhuma diretriz de projeto encontrada — `AGENTS.md` não fala de testes).
> Decisão confirmada: **Vitest + React Testing Library para unit/component; sem
> e2e/Playwright.** Navegação por teclado, ARIA em runtime, breakpoints
> responsivos e `prefers-reduced-motion` visual ficam para QA manual no browser
> durante o Execute — não têm gate automatizado.

| Code Layer | Required Test Type | Coverage Expectation | Location Pattern | Run Command |
|---|---|---|---|---|
| Funções puras de lógica (ex.: derivação do passo ativo do scrollytelling) | unit | Todos os branches (antes do 1º passo, entre passos, após o último, valores fora da faixa) | `src/**/*.utils.ts` + `src/**/*.utils.test.ts` | `npx vitest run` |
| Componentes com lógica de renderização condicional, sem estado (`SectionTitle`, badge "Recomendado" do `Pricing`, ano dinâmico do `Footer`) | unit | Todo branch condicional coberto 1:1 com o AC correspondente | `src/components/**/*.test.tsx` | `npx vitest run` |
| Ilhas de client com estado/efeito (`Header`, `NarrativeSteps`, `DelegateAnnotation`, `Faq`, `NewsletterForm`) | component | 1:1 com os ACs atribuídos ao componente + edge cases explícitos da spec (ex.: exatamente-um-passo-ativo, foco devolvido ao fechar menu, confirmação simulada sem chamada de rede) | `src/components/sections/*.test.tsx` | `npx vitest run` |
| Arquivos de conteúdo tipado (`src/lib/content/*.ts`) | none | TypeScript strict é o próprio gate — forma do dado, não comportamento | `src/lib/content/*.ts` | build gate only |
| Seções Server puramente apresentacionais, sem branch (`Hero`, `Personas`, `LightSheet`, `GlowButton`, `Delegate`, `SocialProof`, `FinalCta`) | none | Build gate + QA manual visual no browser (fora do escopo automatizado por decisão do usuário) | `src/components/**` | build gate only |
| Composição final (`src/app/page.tsx`) | none | `next build` precisa compilar a árvore inteira sem erro | `src/app/page.tsx` | build gate only |

## Gate Check Commands

> Confirmar antes do Execute. `test`/`typecheck` são scripts novos, adicionados na
> Task 1.

| Gate Level | When to Use | Command |
|---|---|---|
| Quick | Depois de tasks com `Tests: unit` ou `Tests: component` | `npx vitest run` |
| Build | Depois de cada fase e na task final de integração | `npm run lint && npm run typecheck && npx vitest run && npm run build` |

---

## Execution Plan

Fases são sequenciais — cada uma termina antes da próxima começar; tasks dentro
de uma fase executam em ordem.

### Phase 1: Foundation & Tooling

Instrumentação de teste, tokens de design, fonte, metadata, primitivo de Accordion
e tipos de conteúdo compartilhados. Prepara tudo que as fases seguintes consomem.

```
T1 → T2
T3, T4, T5, T6 (independentes entre si e de T1/T2)
```

### Phase 2: Content — Upper Funnel

Arquivos de conteúdo tipado para header, hero, personas, narrative, delegate.

```
T7, T8, T9, T10, T11 (independentes entre si)
```

### Phase 3: Content — Lower Funnel

Arquivos de conteúdo tipado para social proof, pricing, FAQ, footer, CTA final.

```
T12, T13, T14, T15, T16 (independentes entre si)
```

### Phase 4: Common Components

Os três componentes compartilhados que implementam as regras de sistema do
`DESIGN-REFERENCE.md` (título de dois tons, glow, folha clara).

```
T17, T18, T19 (independentes entre si)
```

### Phase 5: Sections — Hero Area

Header, Hero, Personas e o scrollytelling (utilitário + componente).

```
T20, T21, T22 (independentes entre si)
T23 → T24
```

### Phase 6: Sections — Delegate & Second Sheet

Seção de delegação (com a anotação manuscrita) e as três seções que compõem a
segunda folha clara.

```
T25 → T26
T27, T28, T29 (independentes entre si)
```

### Phase 7: Closing & Integration

CTA final, newsletter, footer, e a composição final de `page.tsx`.

```
T30 (independente)
T31 → T32
T29 → T33 (via Phase 6, ver Diagram-Definition Cross-Check)
T30 → T33
T32 → T33
```

---

## Task Breakdown

### Phase 1: Foundation & Tooling

#### T1: Add Vitest + Testing Library dependencies and npm scripts

**What**: Instalar `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`,
`@testing-library/jest-dom`, `@testing-library/user-event` como devDependencies e
adicionar os scripts `"test": "vitest run"` e `"typecheck": "tsc --noEmit"` ao
`package.json`.
**Where**: `package.json`
**Depends on**: None
**Reuses**: n/a (primeira infraestrutura de teste do projeto)
**Requirement**: Infra (habilita o gate de todas as tasks com `Tests: unit`/`component`)

**Tools**:
- MCP: NONE
- Skill: NONE

**Done when**:
- [ ] Dependências instaladas e presentes em `package.json`/`package-lock.json`
- [ ] Scripts `test` e `typecheck` executam sem erro de configuração ausente
- [ ] `npm run typecheck` roda limpo contra o código atual do scaffold

**Tests**: none
**Gate**: build
**Commit**: `chore(test): add vitest and testing library tooling`
**Status**: ✅ Complete

---

#### T2: Create Vitest config and test setup file

**What**: Criar `vitest.config.ts` (ambiente `jsdom`, plugin React, alias `@/*`
espelhando o `tsconfig.json`) e `src/test/setup.ts` (importa
`@testing-library/jest-dom`, chama `cleanup()` após cada teste).
**Where**: `vitest.config.ts`
**Depends on**: T1
**Reuses**: alias `@/*` já definido em `tsconfig.json:23-25`
**Requirement**: Infra

**Tools**:
- MCP: `context7` (confirmar API atual de `vitest.config.ts` + `@vitejs/plugin-react` antes de escrever, evitando opção depreciada)
- Skill: NONE

**Done when**:
- [ ] `npx vitest run --passWithNoTests` executa e sai com código 0
- [ ] `src/test/setup.ts` referenciado em `test.setupFiles` do config
- [ ] Alias `@/*` resolvido dentro dos testes (validado na primeira task que o usa, T17)

**Tests**: none
**Gate**: quick
**Commit**: `chore(test): configure vitest with jsdom and testing-library setup`
**Status**: ✅ Complete

---

#### T3: Remap design tokens into globals.css

**What**: Adicionar ao bloco `@theme inline` de `src/app/globals.css` os tokens do
`docs/DESIGN-REFERENCE.md` §9 (paleta, tipografia, espaçamento, raios, containers)
e remapear `--color-primary`/`--color-accent`/`--radius` do preset `radix-nova`
para os tokens do Evolution, em vez de manter os dois sistemas de cor
coexistindo (Risco 1 do `design.md`).
**Where**: `src/app/globals.css`
**Depends on**: None
**Reuses**: bloco `@theme inline` existente (`src/app/globals.css:7-49`), valores
prontos do `docs/DESIGN-REFERENCE.md` §9
**Requirement**: Infra (habilita todos os requisitos visuais — HERO, PERSONA, etc.)

**Tools**:
- MCP: NONE
- Skill: `frontend-design` (validar que o remapeamento não quebra nenhum
  componente shadcn existente antes de prosseguir)

**Done when**:
- [ ] Todos os tokens do §9 do `DESIGN-REFERENCE.md` presentes no arquivo
- [ ] `--color-primary`/`--color-accent`/`--radius` apontam para os valores do
      Evolution, nenhum token duplicado com nome colidente
- [ ] `npm run build` compila sem erro de CSS

**Tests**: none
**Gate**: build
**Commit**: `feat(theme): remap design tokens to evolution palette`
**Status**: ✅ Complete

---

#### T4: Swap font to Outfit and set page language + base metadata

**What**: Trocar `Geist`/`Geist_Mono` por `Outfit` (variable, `next/font/google`)
em `src/app/layout.tsx`; definir `lang="pt-BR"` no elemento `<html>`; atualizar o
`export const metadata` com título/descrição do Evolution (Metadata API,
substituindo os valores de scaffold "Create Next App").
**Where**: `src/app/layout.tsx`
**Depends on**: None
**Reuses**: estrutura atual do `RootLayout` (`src/app/layout.tsx:20-29`)
**Requirement**: Infra / Goals (Outfit, SEO básico)

**Tools**:
- MCP: `context7` (confirmar a API de `next/font/google` e da Metadata API na
  versão instalada do Next antes de escrever — `AGENTS.md` exige isso)
- Skill: NONE

**Done when**:
- [ ] `Outfit` importado e aplicado via `className`/variável CSS, mapeado em
      `--font-sans` (já preparado em T3)
- [ ] `<html lang="pt-BR">`
- [ ] `metadata.title`/`metadata.description` refletem o Evolution, não o scaffold
- [ ] `npm run build` compila sem erro

**Tests**: none
**Gate**: build
**Commit**: `feat(layout): switch to outfit font and evolution metadata`
**Status**: ✅ Complete

---

#### T5: Add Radix Accordion primitive via shadcn

**What**: Rodar `npx shadcn add accordion` (preset `radix-nova` já configurado em
`components.json`) para gerar o primitivo de Accordion usado pela seção FAQ.
**Where**: `src/components/ui/accordion.tsx`
**Depends on**: None
**Reuses**: `components.json` (preset `radix-nova`, alias `ui` já apontando para
`src/components/ui`)
**Requirement**: Infra (habilita FAQ-01, FAQ-02, FAQ-03)

**Tools**:
- MCP: NONE
- Skill: NONE

**Done when**:
- [ ] `src/components/ui/accordion.tsx` gerado pelo CLI, sem edição manual
- [ ] `npm run build` compila sem erro com o novo componente importável

**Tests**: none
**Gate**: build
**Commit**: `chore(ui): add accordion primitive via shadcn`
**Status**: ✅ Complete

---

#### T6: Create shared content types

**What**: Criar `src/lib/content/types.ts` com os tipos compartilhados por todos
os arquivos de conteúdo: `CtaContent`, `NavLink`, `TextTone`, `TitlePart`.
**Where**: `src/lib/content/types.ts`
**Depends on**: None
**Reuses**: n/a
**Requirement**: Infra (habilita T7–T16)

**Tools**:
- MCP: NONE
- Skill: NONE

**Done when**:
- [ ] `CtaContent`, `NavLink`, `TextTone`, `TitlePart` exportados conforme
      `design.md` (seção Data Models)
- [ ] `npm run typecheck` passa

**Tests**: none
**Gate**: build
**Commit**: `feat(content): add shared content types`
**Status**: ✅ Complete

---

### Phase 2: Content — Upper Funnel

#### T7: Create header content

**What**: Criar `src/lib/content/header.ts` exportando `headerContent` (4
`NavLink`, CTA secundário "Fale com vendas", CTA primário "Começar agora").
**Where**: `src/lib/content/header.ts`
**Depends on**: T6
**Reuses**: `NavLink`, `CtaContent` de `src/lib/content/types.ts`
**Requirement**: HDR-01

**Tools**: MCP: NONE / Skill: NONE

**Done when**:
- [ ] `headerContent` tipado, 4 links + 2 CTAs conforme HDR-01
- [ ] `npm run typecheck` passa

**Tests**: none
**Gate**: build
**Commit**: `feat(content): add header navigation content`
**Status**: ✅ Complete

---

#### T8: Create hero content

**What**: Criar `src/lib/content/hero.ts` exportando `heroContent` (título em
`TitlePart[]` com a mecânica de dois tons, parágrafo com a promessa
semanas→minutos, CTA único "Começar agora").
**Where**: `src/lib/content/hero.ts`
**Depends on**: T6
**Reuses**: `TitlePart`, `CtaContent`
**Requirement**: HERO-01, HERO-02, HERO-03

**Tools**: MCP: NONE / Skill: `frontend-design` (validar tom/registro da copy antes de travar o texto)

**Done when**:
- [ ] `heroContent.titleParts` com pelo menos uma parte `tone: "foreground"` e uma `tone: "dimmed"`
- [ ] Parágrafo comunica a promessa central da spec (Problem Statement)
- [ ] `npm run typecheck` passa

**Tests**: none
**Gate**: build
**Commit**: `feat(content): add hero copy`
**Status**: ✅ Complete

---

#### T9: Create personas content

**What**: Criar `src/lib/content/personas.ts` exportando `personaCards`
(2 itens: "operations" com CTA primário, "it" com CTA secundário — cada um com
título, descrição e 3 bullets), conforme a reinterpretação aprovada do arquétipo
"Choose Your Adventure".
**Where**: `src/lib/content/personas.ts`
**Depends on**: T6
**Reuses**: `CtaContent`
**Requirement**: PERSONA-01, PERSONA-02

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] 2 itens com `id: "operations" | "it"`, 3 bullets cada
- [ ] Card "operations" com `cta.variant: "primary"`, "it" com `"secondary"`
- [ ] `npm run typecheck` passa

**Tests**: none
**Gate**: build
**Commit**: `feat(content): add persona cards content`
**Status**: ✅ Complete

---

#### T10: Create narrative content

**What**: Criar `src/lib/content/narrative.ts` exportando `narrativeSteps` (3
itens: título em `TitlePart[]`, texto de apoio, referência de mídia), narrando a
evolução aprovada (manual → agentes assumindo triagem → operação supervisionada).
**Where**: `src/lib/content/narrative.ts`
**Depends on**: T6
**Reuses**: `TitlePart`
**Requirement**: NARRATIVE-02, NARRATIVE-03

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] Exatamente 3 itens, cada um com `titleParts`, `supportingText`, `media`
- [ ] `npm run typecheck` passa

**Tests**: none
**Gate**: build
**Commit**: `feat(content): add narrative scrollytelling content`
**Status**: ✅ Complete

---

#### T11: Create delegate content

**What**: Criar `src/lib/content/delegate.ts` exportando `delegateContent`
(título, parágrafo, mídia, os dois cards kanban "Backlog"/"Agente assumiu" com
tarefa operacional, e o texto da anotação manuscrita).
**Where**: `src/lib/content/delegate.ts`
**Depends on**: T6
**Reuses**: `TitlePart`
**Requirement**: DELEGATE-01, DELEGATE-02, DELEGATE-03

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] `kanban.backlog` e `kanban.delegated` com título de tarefa, assignees e intervalo de datas
- [ ] `annotation` com o texto da anotação manuscrita
- [ ] `npm run typecheck` passa

**Tests**: none
**Gate**: build
**Commit**: `feat(content): add delegation section content`
**Status**: ✅ Complete

---

### Phase 3: Content — Lower Funnel

#### T12: Create social proof content

**What**: Criar `src/lib/content/social-proof.ts` exportando `socialProofContent`
(disclaimer de conteúdo ilustrativo, logos fictícios, 1–3 depoimentos fictícios).
**Where**: `src/lib/content/social-proof.ts`
**Depends on**: T6
**Reuses**: n/a
**Requirement**: SOCIAL-01, SOCIAL-02

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] `disclaimer` presente e explícito sobre conteúdo ilustrativo
- [ ] Nenhum nome/empresa corresponde a uma empresa real
- [ ] `npm run typecheck` passa

**Tests**: none
**Gate**: build
**Commit**: `feat(content): add social proof content`
**Status**: ✅ Complete

---

#### T13: Create pricing content

**What**: Criar `src/lib/content/pricing.ts` exportando `pricingPlans` (Starter,
Growth, Scale com preço/faixa + `recommended` num deles, Enterprise com
`price: "Sob consulta"` e CTA "Fale com vendas").
**Where**: `src/lib/content/pricing.ts`
**Depends on**: T6
**Reuses**: `CtaContent`
**Requirement**: PRICING-01, PRICING-02

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] 4 planos, exatamente um com `recommended: true`
- [ ] Enterprise com `price: "Sob consulta"` e CTA distinto dos demais
- [ ] `npm run typecheck` passa

**Tests**: none
**Gate**: build
**Commit**: `feat(content): add pricing plans content`
**Status**: ✅ Complete

---

#### T14: Create FAQ content

**What**: Criar `src/lib/content/faq.ts` exportando `faqItems` (perguntas
frequentes cobrindo objeções prováveis: integração, segurança, tempo de setup,
suporte).
**Where**: `src/lib/content/faq.ts`
**Depends on**: T6
**Reuses**: n/a
**Requirement**: FAQ-01

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] Ao menos 5 itens `{ question, answer }`
- [ ] `npm run typecheck` passa

**Tests**: none
**Gate**: build
**Commit**: `feat(content): add faq content`
**Status**: ✅ Complete

---

#### T15: Create footer content

**What**: Criar `src/lib/content/footer.ts` exportando `footerContent`
(descrição curta, 3 colunas de link — Produto/Empresa/Recursos —, texto/label do
bloco de newsletter, redes sociais, links legais).
**Where**: `src/lib/content/footer.ts`
**Depends on**: T6
**Reuses**: `NavLink`
**Requirement**: FOOTER-01

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] 3 colunas presentes, cada uma com título + `NavLink[]`
- [ ] `legalLinks` inclui "Privacidade" e "Termos"
- [ ] `npm run typecheck` passa

**Tests**: none
**Gate**: build
**Commit**: `feat(content): add footer content`
**Status**: ✅ Complete

---

#### T16: Create final CTA content

**What**: Criar `src/lib/content/final-cta.ts` exportando `finalCtaContent`
(mesmo formato de `HeroContent` — título em `TitlePart[]` + CTA único).
**Where**: `src/lib/content/final-cta.ts`
**Depends on**: T6
**Reuses**: `HeroContent` (tipo definido em `src/lib/content/hero.ts`, T8)
**Requirement**: CTA-01

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] `finalCtaContent` satisfaz o mesmo shape de `HeroContent`
- [ ] `npm run typecheck` passa

**Tests**: none
**Gate**: build
**Commit**: `feat(content): add final cta content`
**Status**: ✅ Complete

---

### Phase 4: Common Components

#### T17: Create SectionTitle component

**What**: Criar `src/components/common/section-title.tsx` implementando a regra
de sistema §2.4 do `DESIGN-REFERENCE.md` — título de dois tons — recebendo
`parts: TitlePart[]` e mapeando cada `tone` para a classe de cor correspondente
(`dimmed`→`text-text-dimmed`, `accent`→`text-accent-500`, `foreground`→
`text-foreground`), com `as: "h1" | "h2"` controlando o elemento e o token de
tamanho (`--text-display`/`--text-h1`).
**Where**: `src/components/common/section-title.tsx`
**Depends on**: T6
**Reuses**: `cn` (`src/lib/utils.ts`), `TitlePart` (T6)
**Requirement**: Cross-cutting (§2.4) — habilita HERO-01, PERSONA-01, NARRATIVE-02, DELEGATE-01, CTA-01

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] Componente renderiza `h1` ou `h2` conforme prop `as`
- [ ] Cada `tone` mapeia para a classe correta (teste cobre as 3 tonalidades)
- [ ] Teste unitário cobre os 3 branches de `tone` + os 2 branches de `as`
- [ ] Gate `npx vitest run` passa
- [ ] Test count: 5 testes passam (3 tons + 2 níveis de heading), sem exclusão silenciosa

**Tests**: unit
**Gate**: quick
**Commit**: `feat(common): add two-tone section title component`
**Status**: ✅ Complete

---

#### T18: Create GlowButton component

**What**: Criar `src/components/common/glow-button.tsx` envolvendo o `Button`
existente (`variant="default"`) com o token `--shadow-cta-glow`, estático via CSS
(`prefers-reduced-motion` tratado só em media query, sem JS).
**Where**: `src/components/common/glow-button.tsx`
**Depends on**: None
**Reuses**: `Button` (`src/components/ui/button.tsx`)
**Requirement**: HERO-03, HERO-05, CTA-01

**Tools**: MCP: NONE / Skill: NONE

**Done when**:
- [ ] Renderiza um `Button` com `href`/`children` repassados corretamente
- [ ] Classe do glow (`--shadow-cta-glow`) aplicada
- [ ] `npm run build` compila sem erro (sem teste dedicado — sem lógica de branch, ver Test Coverage Matrix)

**Tests**: none
**Gate**: build
**Commit**: `feat(common): add glow button wrapper`
**Status**: ✅ Complete

---

#### T19: Create LightSheet component

**What**: Criar `src/components/common/light-sheet.tsx` — wrapper estrutural com
fundo `surface-sheet`, `--radius-sheet` nos cantos superiores e inferiores, e
gutter lateral `--container-sheet-gutter`; reduz o raio para `--radius-xl` abaixo
do breakpoint `md` (SHEET-03).
**Where**: `src/components/common/light-sheet.tsx`
**Depends on**: None
**Reuses**: tokens de T3
**Requirement**: SHEET-01, SHEET-02, SHEET-03

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] Cantos superiores e inferiores em `--radius-sheet` (≥768px) e `--radius-xl` (<768px)
- [ ] Gutter lateral aplicado via padding/margin com o token do container
- [ ] `npm run build` compila sem erro

**Tests**: none
**Gate**: build
**Commit**: `feat(common): add light sheet wrapper`
**Status**: ✅ Complete

---

### Phase 5: Sections — Hero Area

#### T20: Create Header section (client)

**What**: Criar `src/components/sections/header.tsx` (`"use client"`) — sticky,
estado `scrolled` (fundo+blur após 8px de scroll via listener `passive: true`),
menu mobile com `useState` + gestão de foco (mover ao abrir, devolver ao fechar).
**Where**: `src/components/sections/header.tsx`
**Depends on**: T6, T7
**Reuses**: `Button` (`src/components/ui/button.tsx`), `headerContent` (T7)
**Requirement**: HDR-01, HDR-02, HDR-03, HDR-04, HDR-05

**Tools**: MCP: `context7` (confirmar padrão de gestão de foco acessível para menu mobile) / Skill: `frontend-design`

**Done when**:
- [ ] Renderiza wordmark, 4 links, CTA secundário e primário (HDR-01)
- [ ] Estado `scrolled` muda após simular `scrollY > 8` (HDR-02)
- [ ] Abrir o menu move o foco para o primeiro item; fechar devolve ao botão de menu (HDR-04)
- [ ] Gate `npx vitest run` passa
- [ ] Test count: mínimo 4 testes (render inicial, scroll state, foco ao abrir, foco ao fechar), sem exclusão silenciosa

**Tests**: component
**Gate**: quick
**Commit**: `feat(header): add sticky header with mobile menu`
**Status**: ✅ Complete

---

#### T21: Create Hero section (server)

**What**: Criar `src/components/sections/hero.tsx` — título via `SectionTitle`,
parágrafo, `GlowButton` único, sem CTA secundário nem prova social.
**Where**: `src/components/sections/hero.tsx`
**Depends on**: T8, T17, T18
**Reuses**: `SectionTitle` (T17), `GlowButton` (T18), `heroContent` (T8)
**Requirement**: HERO-01, HERO-02, HERO-03, HERO-04

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] Exatamente um CTA renderizado (HERO-03)
- [ ] Título e parágrafo vindos de `heroContent`, nada hardcoded em JSX
- [ ] `npm run build` compila sem erro

**Tests**: none
**Gate**: build
**Commit**: `feat(hero): add hero section`
**Status**: ✅ Complete

---

#### T22: Create Personas section (server)

**What**: Criar `src/components/sections/personas.tsx` — título via
`SectionTitle`, dois cards escuros lado a lado (coluna única <768px), hover/foco
tratado só em CSS (`hover:`/`focus-visible:` do Tailwind).
**Where**: `src/components/sections/personas.tsx`
**Depends on**: T9, T17
**Reuses**: `SectionTitle` (T17), `Button`, `personaCards` (T9)
**Requirement**: PERSONA-01, PERSONA-02, PERSONA-03, PERSONA-04

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] 2 cards renderizados a partir de `personaCards`, largura igual em `md`+
- [ ] Card "operations" com CTA `variant="default"`, "it" com `variant="outline"`/`"secondary"`
- [ ] Nenhum estado de hover "preso" em touch (sem JS de hover — só CSS)
- [ ] `npm run build` compila sem erro

**Tests**: none
**Gate**: build
**Commit**: `feat(personas): add persona cards section`
**Status**: ✅ Complete

---

#### T23: Create narrative active-step utility function

**What**: Criar `src/components/sections/narrative-steps.utils.ts` exportando
uma função pura `getActiveStepIndex(stepCount: number, progress: number): number`
que deriva o índice do passo ativo (0..stepCount-1) a partir do progresso de
scroll (0..1), com clamp nos extremos.
**Where**: `src/components/sections/narrative-steps.utils.ts`
**Depends on**: None
**Reuses**: n/a (lógica pura, extraída para ser testável sem simular scroll real em jsdom)
**Requirement**: NARRATIVE-04

**Tools**: MCP: NONE / Skill: NONE

**Done when**:
- [ ] `progress <= 0` retorna `0`; `progress >= 1` retorna `stepCount - 1`
- [ ] Progresso intermediário retorna exatamente um índice válido (nunca dois, nunca fora da faixa)
- [ ] Teste unitário cobre: abaixo do 1º limiar, exatamente em um limiar, entre limiares, acima do último limiar
- [ ] Gate `npx vitest run` passa
- [ ] Test count: mínimo 4 testes, sem exclusão silenciosa

**Tests**: unit
**Gate**: quick
**Commit**: `feat(narrative): add active step derivation utility`
**Status**: ✅ Complete

---

#### T24: Create NarrativeSteps section (client)

**What**: Criar `src/components/sections/narrative-steps.tsx` (`"use client"`) —
sticky de duas colunas em `md`+ via `motion/react` (`useScroll`+
`useMotionValueEvent` chamando `getActiveStepIndex` de T23 para decidir o passo
ativo), fade na troca de mídia, empilhamento em coluna única <768px, e leitura de
`prefers-reduced-motion` via `window.matchMedia` para pular para o estado final.
**Where**: `src/components/sections/narrative-steps.tsx`
**Depends on**: T10, T17, T23
**Reuses**: `SectionTitle` (T17), `getActiveStepIndex` (T23), `narrativeSteps` (T10)
**Requirement**: NARRATIVE-01, NARRATIVE-02, NARRATIVE-03, NARRATIVE-04, NARRATIVE-05, NARRATIVE-06

**Tools**: MCP: `context7` (API atual de `useScroll`/`useMotionValueEvent` do pacote `motion`) / Skill: `frontend-design`

**Done when**:
- [ ] Exatamente um passo ativo renderizado por vez (NARRATIVE-04, via T23)
- [ ] `prefers-reduced-motion: reduce` simulado no teste força o estado final estático, sem troca por scroll (NARRATIVE-06)
- [ ] Gate `npx vitest run` passa
- [ ] Test count: mínimo 3 testes (passo inicial ativo, troca de passo, estado com reduced-motion), sem exclusão silenciosa

**Tests**: component
**Gate**: quick
**Commit**: `feat(narrative): add sticky scrollytelling section`
**Status**: ✅ Complete

---

### Phase 6: Sections — Delegate & Second Sheet

#### T25: Create DelegateAnnotation component (client)

**What**: Criar `src/components/sections/delegate-annotation.tsx`
(`"use client"`) — anotação manuscrita + seta curva SVG; quando
`window.matchMedia("(prefers-reduced-motion: reduce)")` for `true`, renderiza a
seta em estado final (sem `stroke-dashoffset` animado).
**Where**: `src/components/sections/delegate-annotation.tsx`
**Depends on**: None
**Reuses**: n/a
**Requirement**: DELEGATE-03, DELEGATE-04

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] Com `prefers-reduced-motion: reduce` mockado, a seta renderiza sem classe/estilo de animação de traçado
- [ ] Sem `prefers-reduced-motion`, a seta renderiza com a animação de traçado
- [ ] Gate `npx vitest run` passa
- [ ] Test count: mínimo 2 testes, sem exclusão silenciosa

**Tests**: component
**Gate**: quick
**Commit**: `feat(delegate): add handwritten annotation with animated arrow`

---

#### T26: Create Delegate section (server)

**What**: Criar `src/components/sections/delegate.tsx` — título via
`SectionTitle`, parágrafo, mídia vertical, dois cards kanban sobrepostos, e
`DelegateAnnotation` (T25) posicionada sobre eles.
**Where**: `src/components/sections/delegate.tsx`
**Depends on**: T11, T17, T25
**Reuses**: `SectionTitle` (T17), `DelegateAnnotation` (T25), `delegateContent` (T11)
**Requirement**: DELEGATE-01, DELEGATE-02

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] Layout de duas colunas em `md`+, coluna única abaixo
- [ ] Os dois cards kanban renderizam título de tarefa, assignees e intervalo de datas de `delegateContent.kanban`
- [ ] `npm run build` compila sem erro

**Tests**: none
**Gate**: build
**Commit**: `feat(delegate): add delegation section`

---

#### T27: Create SocialProof section (server)

**What**: Criar `src/components/sections/social-proof.tsx` — faixa de logos
fictícios + depoimentos, com o disclaimer de conteúdo ilustrativo visível.
**Where**: `src/components/sections/social-proof.tsx`
**Depends on**: T12
**Reuses**: `socialProofContent` (T12), `next/image`
**Requirement**: SOCIAL-01, SOCIAL-02, SOCIAL-03

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] Disclaimer renderizado de forma visível (SOCIAL-02)
- [ ] Logos com scroll horizontal ou empilhamento abaixo de `md` (SOCIAL-03)
- [ ] `npm run build` compila sem erro

**Tests**: none
**Gate**: build
**Commit**: `feat(social-proof): add social proof section`

---

#### T28: Create Pricing section (server)

**What**: Criar `src/components/sections/pricing.tsx` — 4 cards de plano,
destaque do plano `recommended` (borda/badge), CTA do Enterprise visivelmente
distinto ("Fale com vendas").
**Where**: `src/components/sections/pricing.tsx`
**Depends on**: T13, T17
**Reuses**: `SectionTitle` (T17), `Button`, `pricingPlans` (T13)
**Requirement**: PRICING-01, PRICING-02, PRICING-03, PRICING-04

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] O card com `recommended: true` renderiza a badge/borda de destaque; os demais não
- [ ] Card Enterprise renderiza "Sob consulta" e CTA distinto dos autosserviço
- [ ] Teste unitário cobre os dois branches (com/sem `recommended`) + o branch Enterprise
- [ ] Gate `npx vitest run` passa
- [ ] Test count: mínimo 3 testes, sem exclusão silenciosa

**Tests**: unit
**Gate**: quick
**Commit**: `feat(pricing): add pricing plans section`

---

#### T29: Create Faq section (client)

**What**: Criar `src/components/sections/faq.tsx` (`"use client"`) usando o
`Accordion` do shadcn (T5) para renderizar `faqItems` (T14), com
`aria-expanded`/`aria-controls` geridos pelo primitivo.
**Where**: `src/components/sections/faq.tsx`
**Depends on**: T5, T14
**Reuses**: `Accordion` (`src/components/ui/accordion.tsx`, T5), `faqItems` (T14)
**Requirement**: FAQ-01, FAQ-02, FAQ-03

**Tools**: MCP: NONE / Skill: NONE

**Done when**:
- [ ] Ativar uma pergunta (clique ou Enter/Espaço com foco no cabeçalho) expande a resposta com `aria-expanded="true"`
- [ ] Navegação só de teclado alcança e ativa qualquer pergunta (simulado via `@testing-library/user-event`)
- [ ] Gate `npx vitest run` passa
- [ ] Test count: mínimo 3 testes (expandir por clique, expandir por teclado, `aria-controls` aponta para o painel certo), sem exclusão silenciosa

**Tests**: component
**Gate**: quick
**Commit**: `feat(faq): add accessible faq accordion`

---

### Phase 7: Closing & Integration

#### T30: Create FinalCta section (server)

**What**: Criar `src/components/sections/final-cta.tsx` — título via
`SectionTitle`, `GlowButton` único, fundo `bg-page`.
**Where**: `src/components/sections/final-cta.tsx`
**Depends on**: T16, T17, T18
**Reuses**: `SectionTitle` (T17), `GlowButton` (T18), `finalCtaContent` (T16)
**Requirement**: CTA-01, CTA-02

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] Reaproveita o mesmo `GlowButton` da Hero — nenhum componente de botão/glow novo
- [ ] Fundo `bg-page`
- [ ] `npm run build` compila sem erro

**Tests**: none
**Gate**: build
**Commit**: `feat(final-cta): add closing cta section`

---

#### T31: Create NewsletterForm component (client)

**What**: Criar `src/components/sections/newsletter-form.tsx` (`"use client"`) —
campo de e-mail + botão, `useState` local para estado de "enviado"; submeter com
valor não vazio mostra confirmação simulada; submeter vazio não mostra
confirmação (sem chamada de rede).
**Where**: `src/components/sections/newsletter-form.tsx`
**Depends on**: T15
**Reuses**: `Button`, texto de `footerContent` (T15)
**Requirement**: FOOTER-02

**Tools**: MCP: NONE / Skill: NONE

**Done when**:
- [ ] Submeter com valor exibe mensagem de confirmação
- [ ] Submeter vazio NÃO exibe confirmação (nenhuma chamada de rede em nenhum dos dois casos)
- [ ] Gate `npx vitest run` passa
- [ ] Test count: mínimo 2 testes, sem exclusão silenciosa

**Tests**: component
**Gate**: quick
**Commit**: `feat(footer): add decorative newsletter form`

---

#### T32: Create Footer section (server)

**What**: Criar `src/components/sections/footer.tsx` — wordmark+descrição, 3
colunas de link, `NewsletterForm` (T31), redes sociais, linha legal com
`new Date().getFullYear()` calculado em runtime.
**Where**: `src/components/sections/footer.tsx`
**Depends on**: T15, T31
**Reuses**: `footerContent` (T15), `NewsletterForm` (T31)
**Requirement**: FOOTER-01, FOOTER-03, FOOTER-04

**Tools**: MCP: NONE / Skill: `frontend-design`

**Done when**:
- [ ] Ano do copyright corresponde a `new Date().getFullYear()`, não hardcoded (teste com data mockada)
- [ ] Ordem de empilhamento mobile: wordmark → colunas → newsletter → redes → legal
- [ ] Gate `npx vitest run` passa
- [ ] Test count: mínimo 1 teste (ano dinâmico), sem exclusão silenciosa

**Tests**: unit
**Gate**: quick
**Commit**: `feat(footer): add site footer`

---

#### T33: Compose page.tsx

**What**: Compor `src/app/page.tsx` — importar e ordenar as 11 seções (`Header`,
`Hero`, `LightSheet[Personas, NarrativeSteps]`, `Delegate`,
`LightSheet[SocialProof, Pricing, Faq]`, `FinalCta`, `Footer`), sem lógica além
da composição.
**Where**: `src/app/page.tsx`
**Depends on**: T20, T21, T22, T24, T26, T27, T28, T29, T30, T32
**Reuses**: todas as seções das Fases 5–7, `LightSheet` (T19)
**Requirement**: Todos (ordem das 11 seções — Goals do spec.md)

**Tools**: MCP: NONE / Skill: `frontend-design` (revisão final de ritmo visual ponta a ponta)

**Done when**:
- [ ] As 11 seções renderizam na ordem definida em Goals do `spec.md`
- [ ] `LightSheet` #1 envolve Personas+NarrativeSteps; `LightSheet` #2 envolve SocialProof+Pricing+Faq
- [ ] `npm run lint && npm run typecheck && npx vitest run && npm run build` — todos passam
- [ ] QA manual no browser (checklist ao final deste documento) executada antes de reportar a task como concluída

**Tests**: none
**Gate**: build
**Commit**: `feat(page): compose evolution landing page`

---

## Phase Execution Map

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7

Phase 1 (independentes): T3, T4, T5, T6
Phase 1:  T1 → T2
Phase 2 (independentes): T7, T8, T9, T10, T11
Phase 3 (independentes): T12, T13, T14, T15, T16
Phase 4 (independentes): T17, T18, T19
Phase 5 (independentes): T20, T21, T22
Phase 5:  T23 → T24
Phase 6:  T25 → T26
Phase 6 (independentes): T27, T28, T29
Phase 7 (independente): T30
Phase 7:  T31 → T32
Phase 7:  T30 → T33
Phase 7:  T32 → T33
```

Execução é estritamente sequencial dentro de cada fase — mesmo tasks
"independentes" rodam uma de cada vez, na ordem listada, por um único agente (ou
sub-agent worker) por vez.

**Empacotamento sugerido em lotes (~7 tasks por worker, fases inteiras)**:

| Lote | Fases | Tasks |
|---|---|---|
| 1 | Phase 1 | T1–T6 (6) |
| 2 | Phase 2 | T7–T11 (5) |
| 3 | Phase 3 + Phase 4 | T12–T19 (8) |
| 4 | Phase 5 | T20–T24 (5) |
| 5 | Phase 6 + Phase 7 | T25–T33 (9) |

---

## Task Granularity Check

| Task | Scope | Status |
|---|---|---|
| T1–T33 | 1 arquivo cada (ver campo `Where` de cada task) | ✅ Granular |

Nenhuma task cria ou modifica mais de um arquivo primário. Onde uma task cria um
arquivo companheiro cohesivo e indissociável (T2: `vitest.config.ts` +
`src/test/setup.ts`), isso é registrado no `Done when`, não no `Where` — os dois
arquivos só fazem sentido juntos, não são deliverables separáveis.

---

## Diagram-Definition Cross-Check

| Task | Depends On (corpo da task) | Diagrama mostra | Status |
|---|---|---|---|
| T2 | T1 | T1 → T2 | ✅ Match |
| T24 | T10, T17, T23 | T23 → T24 (T10, T17 são cross-phase, sem seta necessária) | ✅ Match |
| T26 | T11, T17, T25 | T25 → T26 (T11, T17 cross-phase) | ✅ Match |
| T32 | T15, T31 | T31 → T32 (T15 cross-phase) | ✅ Match |
| T33 | T20, T21, T22, T24, T26, T27, T28, T29, T30, T32 | T30 → T33, T32 → T33 (demais são cross-phase, sem seta necessária) | ✅ Match |

Todas as demais tasks (T3–T9, T11–T23 exceto as listadas, T25, T27–T31)
declaram `Depends on` só para tasks de fases anteriores (cross-phase) — a
paridade de diagrama só se aplica a dependências dentro da mesma fase, então
essas não precisam de seta.

---

## Test Co-location Validation

| Task | Code Layer Criada/Modificada | Matriz Exige | Task Diz | Status |
|---|---|---|---|---|
| T1 | Infra (dependências) | — | none | ✅ OK |
| T2 | Infra (config de teste) | — | none | ✅ OK |
| T3 | Tokens CSS | none (build gate) | none | ✅ OK |
| T4 | `layout.tsx` | none (build gate) | none | ✅ OK |
| T5 | Primitivo gerado (shadcn) | none (build gate) | none | ✅ OK |
| T6 | Conteúdo tipado (`types.ts`) | none | none | ✅ OK |
| T7–T16 | Conteúdo tipado (`content/*.ts`) | none | none | ✅ OK |
| T17 | Componente com branch (`SectionTitle`) | unit | unit | ✅ OK |
| T18 | Componente sem branch (`GlowButton`) | none | none | ✅ OK |
| T19 | Componente sem branch (`LightSheet`) | none | none | ✅ OK |
| T20 | Ilha de client com estado (`Header`) | component | component | ✅ OK |
| T21 | Seção Server sem branch (`Hero`) | none | none | ✅ OK |
| T22 | Seção Server sem branch (`Personas`) | none | none | ✅ OK |
| T23 | Função pura (`narrative-steps.utils.ts`) | unit | unit | ✅ OK |
| T24 | Ilha de client com estado (`NarrativeSteps`) | component | component | ✅ OK |
| T25 | Ilha de client com estado (`DelegateAnnotation`) | component | component | ✅ OK |
| T26 | Seção Server sem branch (`Delegate`) | none | none | ✅ OK |
| T27 | Seção Server sem branch (`SocialProof`) | none | none | ✅ OK |
| T28 | Componente com branch (`Pricing` — badge/Enterprise) | unit | unit | ✅ OK |
| T29 | Ilha de client com estado (`Faq`) | component | component | ✅ OK |
| T30 | Seção Server sem branch (`FinalCta`) | none | none | ✅ OK |
| T31 | Ilha de client com estado (`NewsletterForm`) | component | component | ✅ OK |
| T32 | Componente com branch (`Footer` — ano dinâmico) | unit | unit | ✅ OK |
| T33 | Composição (`page.tsx`) | none (build gate) | none | ✅ OK |

Nenhuma violação — todo `Tests: none` corresponde a uma linha "none" da Test
Coverage Matrix; nenhuma task adia teste para "testado em outra task".

---

## Manual Verification Checklist (fora do gate automatizado)

A decisão de escopo de teste (Vitest + Testing Library, sem e2e) deixa 4 grupos
de requisitos da spec sem gate automatizado. Esta checklist é executada por mim
no browser antes de reportar T33 (e a feature inteira) como concluída — não é
uma task com commit, é verificação manual:

- [ ] Navegação 100% por teclado em toda a página (Tab/Shift+Tab/Enter/Espaço/Esc), foco sempre visível, nunca preso fora de um menu/drawer aberto
- [ ] Breakpoints mobile (375px), tablet (768px) e desktop (1440px) — nenhum overflow horizontal, `LightSheet` nunca toca a borda da viewport
- [ ] `prefers-reduced-motion: reduce` emulado no DevTools — glow do CTA estático, scrollytelling sem troca de posição, seta do Delegate sem traçado animado
- [ ] Contraste AA visual nos tokens de texto corrigidos (`--color-text-subtle`, `--color-text-dimmed`) sobre `bg-page` e `surface-sheet`

---

## Tools Confirmation Needed

Antes de iniciar o Execute, confirmar com o usuário (pergunta separada, fora
deste documento): MCPs e skills sugeridos por task acima (`context7` para APIs de
`vitest`/`next/font`/`motion`; `frontend-design` para copy e composição visual)
— usar como proposto ou ajustar por task/fase.
