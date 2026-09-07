import fs from "node:fs"
import path from "node:path"
import postcss from "postcss"
import tailwindcss from "@tailwindcss/postcss"
import { beforeAll, describe, expect, it } from "vitest"

// Regression coverage for the bug fixed in AD-003 (.specs/STATE.md): a
// component test that only checks class names (e.g. toHaveClass("bg-background"))
// cannot catch a bug in how a CSS custom property cascades, because it never
// looks at what that class actually resolves to. This compiles globals.css
// for real (the same @tailwindcss/postcss plugin postcss.config.mjs uses)
// and inspects the generated declarations directly.
//
// It does NOT use jsdom's getComputedStyle: jsdom (confirmed empirically
// while writing this test — see the PR/commit this test shipped in) never
// substitutes var() for computed styles at all, even for the simplest
// same-element case, so a getComputedStyle-based assertion here would only
// ever read back the literal string "var(--tone-surface)" and pass or fail
// for the wrong reason. Reading the compiled declaration's value is the
// precise, honest way to pin this: it fails immediately if `.bg-background`
// (or `.border-border`) ever points through the frozen `--background`/
// `--border` indirection again instead of `--tone-surface`/`--tone-border`
// directly — which is exactly the mechanism that broke twice (AD-002 fixed
// text tokens this way but missed background/border; AD-003 closed that gap).
describe("surface tokens (compiled CSS declarations)", () => {
  let compiledCss: string

  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, "..", "..")
    const cssPath = path.resolve(projectRoot, "src/app/globals.css")
    const css = fs.readFileSync(cssPath, "utf8")
    // Content scanning needs the whole project as `base`: bg-background and
    // border-border are only ever used under src/components/, not src/app/.
    const result = await postcss([tailwindcss({ base: projectRoot })]).process(css, {
      from: cssPath,
    })
    compiledCss = result.css
  })

  function declValue(selector: string, prop: string): string | undefined {
    const root = postcss.parse(compiledCss)
    let value: string | undefined
    root.walkRules(selector, (rule) => {
      rule.walkDecls(prop, (decl) => {
        value = decl.value
      })
    })
    return value
  }

  it("points .bg-background straight at --tone-surface (not the frozen --background indirection)", () => {
    expect(declValue(".bg-background", "background-color")).toBe("var(--tone-surface)")
  })

  it("points .border-border straight at --tone-border (not the frozen --border indirection)", () => {
    expect(declValue(".border-border", "border-color")).toBe("var(--tone-border)")
  })

  it("points .text-foreground straight at --tone-strong (the pattern the fix now matches)", () => {
    expect(declValue(".text-foreground", "color")).toBe("var(--tone-strong)")
  })

  it("defines --tone-surface as black at :root and white inside .surface-light", () => {
    expect(declValue(":root", "--tone-surface")).toBe("#000000")
    expect(declValue(".surface-light", "--tone-surface")).toBe("#ffffff")
  })

  it("defines --tone-border as a dark, visible tone inside .surface-light (not translucent white)", () => {
    const value = declValue(".surface-light", "--tone-border")
    expect(value).toBe("oklch(0 0 0 / 12%)")
  })
})
