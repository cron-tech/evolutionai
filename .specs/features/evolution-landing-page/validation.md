# Evolution Landing Page Validation

**Date**: 2026-09-06
**Spec**: `.specs/features/evolution-landing-page/spec.md`
**Diff range**: `a06a63d9b8f08d08caf218d7bc519bbc3b8ee9e3..HEAD` (34 commits)
**Verifier**: independent sub-agent (author ≠ verifier)

---

## Task Completion

All 33 tasks in `tasks.md` (T1–T33) are marked `✅ Complete` and each has a corresponding commit in the diff range. No task is partial or blocked.

---

## Spec-Anchored Acceptance Criteria

Scope note: per the Test Coverage Matrix in `tasks.md`, keyboard navigation, runtime ARIA, responsive breakpoints, and `prefers-reduced-motion` *visual* behavior are an explicit, documented manual-QA-only decision — these are NOT flagged as gaps below when no automated test exists for them. Rows marked "none (documented scope)" are a deliberate project decision, not an omission.

### HDR — Header

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
|---|---|---|---|
| HDR-01: wordmark + 4 nav links + 2 CTAs | Exactly 4 links, 2 CTA labels present | `src/components/sections/header.test.tsx:9-23` — `expect(links).toHaveLength(4)`, `expect(links.map(...)).toEqual(headerContent.nav.map(...))`, `expect(screen.getByText(headerContent.cta.secondary.label))...` | ✅ PASS |
| HDR-02: bg+blur after 8px scroll | `data-scrolled` flips false→true crossing 8px | `src/components/sections/header.test.tsx:25-29` (`data-scrolled="false"` initial) and `:31-41` (`scrollY=20` → `data-scrolled="true"`); impl `src/components/sections/header.tsx:22` `setScrolled(window.scrollY > 8)` | ✅ PASS |
| HDR-03: <768px replaces links with menu button | not precisely automatable (CSS media query) | — | ⚠️ none (documented scope: "breakpoints responsivos" is explicit manual-QA per Test Coverage Matrix header note) |
| HDR-04: focus moves to first item on open, returns to toggle on close | `document.activeElement` is first nav link after open; toggle button after close | `src/components/sections/header.test.tsx:43-52` and `:54-63`; impl `src/components/sections/header.tsx:28-38` | ✅ PASS |
| HDR-05: `position: sticky` throughout scroll | not tested | — | ❌ GAP (see Gaps) — implemented (`header.tsx:44` `"sticky top-0 z-50..."`) but zero automated assertion, and not covered by any of the four documented manual-QA-only categories |

### HERO

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
|---|---|---|---|
| HERO-01..05 | Tests: none per matrix (Hero is a server component with no conditional branch) | — | ⚠️ none (documented scope, build-gate only) — verified by code read: `src/components/sections/hero.tsx:9-19` renders `SectionTitle`, one paragraph, exactly one `GlowButton`; `src/lib/content/hero.ts` (read: contains `titleParts` with both `foreground` and `dimmed` tones) |

### SHEET — Light sheet transition

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
|---|---|---|---|
| SHEET-01..03 | Tests: none per matrix (no JS branch — Tailwind responsive classes only) | — | ⚠️ none (documented scope) — verified by code: `src/components/common/light-sheet.tsx:11-13` `"rounded-xl md:rounded-sheet"` with `mx-[var(--container-sheet-gutter)]` |

### PERSONA

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
|---|---|---|---|
| PERSONA-01..04 | Tests: none per matrix (server component, hover resolved in pure CSS) | — | ⚠️ none (documented scope) — verified by code: `src/components/sections/personas.tsx:26-54` (2 cards, equal width via `md:grid-cols-2`), CTA variant mapping `:10-13` (`operations`→`default`, `it`→`outline`), matches `src/lib/content/personas.ts:22-26,38-42` |

### NARRATIVE

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
|---|---|---|---|
| NARRATIVE-01: sticky media column ≥md | CSS-only, breakpoint-gated | — | ⚠️ none (documented scope) |
| NARRATIVE-02/03: active step swaps with opacity/fade | Exactly one active element with expected text after scroll change | `src/components/sections/narrative-steps.test.tsx:43-49` (initial), `:51-62` (progress=0.9 → last step active); impl `src/components/sections/narrative-steps.tsx:46-52` | ✅ PASS |
| NARRATIVE-04: exactly one active step, never 0/2 | `getActiveStepIndex` always returns single valid index 0..stepCount-1 | `src/components/sections/narrative-steps.utils.test.ts:5-33` (6 branches: clamp low/high, below-1st-threshold, between-thresholds, exact-threshold, above-last-threshold); impl `src/components/sections/narrative-steps.utils.ts:6-13` | ✅ PASS |
| NARRATIVE-05: mobile stacks text+media per step, no sticky | CSS/DOM-order, breakpoint-gated | — | ⚠️ none (documented scope) — verified by code: separate `md:hidden` block, `narrative-steps.tsx:101-117`, renders each step's own image inline |
| NARRATIVE-06: reduced-motion → static final state, scroll ignored | Active index stays fixed at last step even after a scroll-driven change event | `src/components/sections/narrative-steps.test.tsx:64-81` — asserts single active element = last step both before and after `latestChangeHandler?.(0)`; impl `narrative-steps.tsx:52` `activeIndex = prefersReducedMotion ? steps.length - 1 : scrollActiveIndex` | ✅ PASS |

### DELEGATE

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
|---|---|---|---|
| DELEGATE-01/02: bicolor title + 2-col layout + overlapping kanban cards | Tests: none per matrix (Delegate section is a server component) | — | ⚠️ none (documented scope) — verified by code: `src/components/sections/delegate.tsx:32-56` |
| DELEGATE-03: animated arrow when motion allowed | `strokeDashoffset` non-empty and `transition-` class present | `src/components/sections/delegate-annotation.test.tsx:28-35`; impl `src/components/sections/delegate-annotation.tsx:51-56` | ✅ PASS |
| DELEGATE-04: static arrow, no stroke animation under reduced motion | `strokeDashoffset` empty string and no `transition-` class | `src/components/sections/delegate-annotation.test.tsx:19-26`; impl same lines, gated by `animated = !prefersReducedMotion` (`:34`) | ✅ PASS |

### SOCIAL

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
|---|---|---|---|
| SOCIAL-01..03 | Tests: none per matrix (server component) | — | ⚠️ none (documented scope) — verified by code: `src/components/sections/social-proof.tsx:11` (disclaimer), `:13` (`overflow-x-auto ... md:flex-wrap md:overflow-visible`), `:27-42` (1–3 testimonials) |

### PRICING

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
|---|---|---|---|
| PRICING-01: 4 cards, stacked <md | CSS-only grid, not a conditional branch | — | ⚠️ none (documented scope: matrix scopes Pricing's unit-test requirement to the "Recomendado badge" branch only) |
| PRICING-02: Enterprise shows "Sob consulta" + distinct CTA | Text "Sob consulta" present; Enterprise CTA class differs from self-serve CTAs' class | `src/components/sections/pricing.test.tsx:50-53` and `:55-65`; impl `src/components/sections/pricing.tsx:59-71` | ✅ PASS |
| PRICING-03: hover/focus highlight, zero layout shift | CSS-only (`hover:`/`focus-within:` shadow classes), not a conditional branch | — | ⚠️ none (documented scope, same as PRICING-01) |
| PRICING-04: exactly one plan marked "Recomendado" | Badge + border present on the `recommended:true` card, absent on others | `src/components/sections/pricing.test.tsx:32-39` and `:41-48`; impl `pricing.tsx:39,42-46`; content `src/lib/content/pricing.ts` (exactly one `recommended: true`, on Growth) | ✅ PASS |

### FAQ

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
|---|---|---|---|
| FAQ-01: consistent accordion mode | `type="single" collapsible"` applied once for the whole list (structurally guarantees consistency) | `src/components/sections/faq.tsx:28` | ✅ PASS (satisfied by construction; no dedicated test needed) |
| FAQ-02: activate → `aria-expanded`/`aria-controls` update | `aria-expanded` flips `"false"`→`"true"`; `aria-controls` id resolves to a panel containing the answer text | `src/components/sections/faq.test.tsx:13-23` and `:50-63` | ✅ PASS |
| FAQ-03: keyboard-activatable trigger | Enter and Space both flip `aria-expanded` to `"true"` on a focused trigger | `src/components/sections/faq.test.tsx:25-36` (Enter), `:38-48` (Space) | ✅ PASS |

### CTA final

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
|---|---|---|---|
| CTA-01/02 | Tests: none per matrix (server component); reuses `GlowButton`, `bg-page` background | — | ⚠️ none (documented scope) — verified by code: `src/components/sections/final-cta.tsx:11,15` (`bg-bg-page`, single `<GlowButton>`, no new button variant) |

### FOOTER

| Criterion | Spec-defined outcome | `file:line` + assertion | Result |
|---|---|---|---|
| FOOTER-01: full structure (wordmark, 3 columns, newsletter, socials, legal) | Tests: none per matrix (structural, server component) | — | ⚠️ none (documented scope) — verified by code: `src/components/sections/footer.tsx:14-72` |
| FOOTER-02: submit non-empty → confirmation; empty → none, no network call | `role="status"` present after non-empty submit; absent after empty submit | `src/components/sections/newsletter-form.test.tsx:7-16` and `:18-25`; impl `src/components/sections/newsletter-form.tsx:17-23` | ✅ PASS |
| FOOTER-03: mobile stack order (wordmark→columns→newsletter→socials→legal) | CSS/DOM-order, breakpoint-adjacent | — | ⚠️ none (documented scope) — verified by code: DOM order in `footer.tsx:14-72` matches spec order exactly |
| FOOTER-04: copyright year computed at runtime, never hardcoded | Rendered text contains the mocked system year (2031, then 2045) | `src/components/sections/footer.test.tsx:11-18` and `:20-27`; impl `src/components/sections/footer.tsx:9,64` `new Date().getFullYear()` | ✅ PASS |

**Status**: ⚠️ Gaps present (1 real coverage gap: HDR-05; 1 spec-goal deviation: NewsletterForm inline copy — see Gaps below). All ACs with an automated-test expectation per the Test Coverage Matrix are covered and assert the spec-defined outcome; no spec-precision gaps found in the tested ACs themselves (every tested assertion targets the exact spec-defined value, not a vague "is present" check).

---

## Discrimination Sensor

Isolated in a temporary `git worktree` at a scratch path outside the repo (`git worktree add <scratch>/verify-worktree HEAD`); `node_modules` was symlinked in (Windows exposed it as a plain directory to `stat`/PowerShell but a distinct-inode fast-clone — confirmed distinct inode from the real `node_modules` before deleting it, so no risk to the real tree). All mutations were applied only inside the worktree, one at a time, reverted after each run.

| # | File:line | Mutation | Test(s) run | Killed? |
|---|---|---|---|---|
| 1 | `src/components/sections/pricing.tsx:42` | Flipped badge condition `plan.recommended ?` → `!plan.recommended ?` | `pricing.test.tsx` | ✅ Killed (2/4 tests failed) |
| 2 | `src/components/sections/delegate-annotation.tsx:34` | Forced `animated = false` unconditionally (ignoring `prefersReducedMotion`) | `delegate-annotation.test.tsx` | ✅ Killed (1/3 failed) |
| 3 | `src/components/sections/footer.tsx:9` | Hardcoded `year = 2026` instead of `new Date().getFullYear()` | `footer.test.tsx` | ✅ Killed (2/2 failed) |
| 4 | `src/components/sections/newsletter-form.tsx:19` | Flipped empty-check `=== 0` → `!== 0` | `newsletter-form.test.tsx` | ✅ Killed (2/2 failed) |
| 5 | `src/components/sections/header.tsx:22` | Flipped scroll threshold `window.scrollY > 8` → `< 8` | `header.test.tsx` | ✅ Killed (1/5 failed) |

**Sensor depth**: lightweight (default tier — 5 targeted behavior-level mutations across the feature's highest-risk stateful/conditional components).
**Result**: 5/5 killed — ✅ PASS. No surviving mutants.

**Isolation verification**: Baseline `git status --porcelain` before the sensor showed only ` M .claude/settings.json` (a pre-existing local settings change unrelated to this feature/session). After removing the worktree (`git worktree remove --force`, then `git worktree prune` + manual cleanup of the leftover directory once git had already deregistered it), `git status --porcelain` on the real tree showed the identical single line — confirmed unchanged. No `git stash` was used at any point.

---

## Code Quality

| Principle | Status |
|---|---|
| Minimum code | ✅ |
| Surgical changes | ✅ |
| No scope creep | ✅ |
| Matches patterns | ✅ |
| Spec-anchored outcome check (asserted values match spec) | ✅ |
| Per-layer Coverage Expectation met (domain 1:1 ACs; routes happy+edge+error) | ✅ — N/A routes; component/unit layers map 1:1 to their assigned matrix scope |
| Every test maps to a spec requirement — no unclaimed tests | ✅ — all 34 tests carry an AC id in their name |
| Documented guidelines followed | ✅ `tasks.md` Test Coverage Matrix + Manual Verification Checklist |

One self-acknowledged deviation found in code (see Gaps): `src/components/sections/newsletter-form.tsx:6-12` carries a `// SPEC_DEVIATION` comment explaining that newsletter copy (label/placeholder/confirmation text) is inline in JSX rather than sourced from `src/lib/content/footer.ts`, which conflicts with the Goals section's "content never hardcoded in JSX" requirement. The author flagged this themselves rather than hiding it — a real deviation, not a coverage gap.

---

## Edge Cases

- [x] JS-disabled progressive enhancement: all sections except `NarrativeSteps`/`Faq`/`NewsletterForm` are Server Components rendering static HTML — verified by code (no `"use client"` gating content, only interactivity)
- [ ] Keyboard focus never invisible/trapped — manual QA only (documented scope), not independently re-verified by this Verifier beyond code inspection
- [ ] Broken image fallback (`alt` + reserved dimensions) — verified by code only (`next/image` used throughout with explicit `width`/`height` or `fill`+aspect-ratio container); no automated test, consistent with documented scope
- Note (non-blocking): the Header component has no `Escape`-to-close handler for the mobile menu in `header.tsx` — the spec's Independent Test narrative mentions Esc, but it is not a numbered AC and keyboard nav is explicitly manual-QA scope. Flagged here for the human QA pass, not as a Verifier gap.

---

## Gate Check

- **Gate command**: `npm run lint && npm run typecheck && npx vitest run && npm run build`
- **Result**: lint clean (0 errors/warnings), typecheck clean, **34/34 tests passed** across 9 test files, `next build` succeeded (static prerender of `/` and `/_not-found`)
- **Test count before feature**: 0 (no test framework existed pre-feature, per `tasks.md` T1 rationale)
- **Test count after feature**: 34
- **Delta**: +34
- **Skipped tests**: none
- **Failures**: none

---

## Fix Plans (if issues found)

### Fix 1: HDR-05 (sticky header) has no automated test

- **Root cause**: T20's `Done when` list only names HDR-01/02/04; HDR-03/05 were silently scoped out at task-authoring time without an explicit exemption note (unlike HDR-03, which is covered by the matrix's general "breakpoints responsivos" manual-QA carve-out — HDR-05 is a static class, not a breakpoint behavior, so it doesn't fit that carve-out).
- **Fix task**: Add one assertion to `src/components/sections/header.test.tsx` — e.g. `expect(screen.getByRole("banner")).toHaveClass("sticky", "top-0")` — trivial, no new test infra needed.
- **Priority**: Minor (implementation is correct; only the automated-evidence trail is missing).

### Fix 2: NewsletterForm inline copy (SPEC_DEVIATION)

- **Root cause**: `src/lib/content/footer.ts` (T15) shipped before `NewsletterForm` (T31) without a newsletter-copy field; the T31 author chose not to reopen T15's already-committed content contract mid-batch.
- **Fix task**: Add a `newsletter: { label: string; placeholder: string; ctaLabel: string; confirmation: string }` field to `FooterContent` in `src/lib/content/footer.ts`, populate it in the same file, thread it into `NewsletterForm` as a prop, and update `Footer` (`footer.tsx:45`) to pass it through. Update `newsletter-form.test.tsx` only if prop shape changes what's queried (it currently queries by rendered text/label, which should be unaffected by the source of the string).
- **Priority**: Minor (a Goals-level content-architecture rule, not a broken user-facing behavior — the newsletter still works correctly per FOOTER-02).

---

## Requirement Traceability Update

All 43 P1 requirement IDs move from `Implementing` → `✅ Verified`, except:

| Requirement | Previous Status | New Status |
|---|---|---|
| HDR-05 | Implementing | ⚠️ Verified by code, no automated test (see Fix 1) |
| All other HDR/HERO/SHEET/PERSONA/NARRATIVE/DELEGATE/SOCIAL/PRICING/FAQ/CTA/FOOTER IDs | Implementing | ✅ Verified |

P2/P3 IDs (HDR-06/07/08, PRICING-05) remain `Pending` — out of scope for this MVP verification pass, consistent with spec.md's own P2/P3 designation.

---

## Summary

**Overall**: ⚠️ Issues (2 minor, non-blocking findings; both gate checks and the discrimination sensor pass cleanly)

**Spec-anchored check**: 20/20 automated-test-expected ACs matched their spec-defined outcome (0 spec-precision gaps in tested ACs); all remaining P1 ACs are legitimately un-automated per the project's own documented Test Coverage Matrix scope decision, verified instead by direct code inspection.

**Sensor**: 5/5 mutations killed

**Gate**: lint + typecheck + 34/34 vitest + `next build` all passed

**What works**: All 11 sections compose correctly in `src/app/page.tsx` matching `design.md`'s architecture; every stateful/client component (`Header`, `NarrativeSteps`, `DelegateAnnotation`, `Faq`, `NewsletterForm`, `Footer`'s dynamic year, `Pricing`'s badge/Enterprise branch) has tests that assert the exact spec-defined outcome, not just "something rendered"; the discrimination sensor confirms those tests actually catch regressions in the highest-risk behavior (badge logic, reduced-motion gating, dynamic year, empty-value guard, scroll threshold).

**Issues found**:
1. HDR-05 (sticky header) — implemented correctly but zero automated-test evidence; trivial one-line fix (add a class assertion).
2. `NewsletterForm` — self-acknowledged `SPEC_DEVIATION`: copy is inline in JSX rather than sourced from `src/lib/content/`, conflicting with the Goals section's content-architecture rule. Functionally correct; architecturally inconsistent with the rest of the codebase.

**Next steps**: Both issues are minor/cosmetic and do not block the feature from being considered functionally complete. Recommend routing Fix 1 and Fix 2 above as follow-up tasks if adherence to the letter of the Test Coverage Matrix and the Goals content-architecture rule is required before final sign-off; neither blocks shipping the page as-is.
