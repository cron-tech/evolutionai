# Design Reference — Evolution

Consolidação de `docs/reference/` em tokens de design prontos para Tailwind v4.
Este documento é **saída** do projeto (fora de `docs/reference/`, que permanece
intocada) e alimenta a fase DESIGN do fluxo SDD.

## 1. Como ler este documento

Todo valor carrega uma marcação de origem — nenhum número aqui é palpite silencioso:

| Marca | Significa |
|---|---|
| **[MEDIDO]** | Vem direto de `MEDIDAS.md` — amostragem de pixel em resolução original, confiança alta |
| **[AMOSTRADO]** | Lido por mim na hero em 2880×2160 (`screenshots/`), sem ferramenta de medição — precisão de régua visual, não de pixel |
| **[DERIVADO]** | Cálculo determinístico sobre um valor medido (conversão OKLCH, verificação de contraste WCAG) |
| **[SUPOSIÇÃO]** | Proposta minha onde `MEDIDAS.md` marca "a confirmar" — **precisa da sua validação** |

Viewport de referência: **1440px** (a mesma usada em `MEDIDAS.md`). Em caso de
divergência entre este documento e `MEDIDAS.md`, **`MEDIDAS.md` vence** — ele é a
fonte de verdade declarada no `AGENTS.md`.

Três decisões de projeto já tomadas nesta sessão, que moldam tudo abaixo:

1. **Tipografia:** Outfit (geométrica, `a` de andar único — o desenho amostrado no
   título da hero), variable font, um arquivo via `next/font/google`.
2. **Accent:** verde da referência **deslocado de matiz** — mesma luminosidade e
   comportamento de neon sobre preto, mas girado ~12° para o Evolution não ler como
   "HackerRank recolorido". Ver §2.3.
3. **Tema:** único e fixo. Preto e branco são camadas da composição (a "folha" que
   sobe sobre o fundo escuro), não modos claro/escuro intercambiáveis. Sem `.dark`,
   sem toggle, sem tokens duplicados — `next-themes` só força `dark` no `<html>` para
   o shadcn não reclamar de um provider ausente.

---

## 2. Paleta

### 2.1 Base

| Token | Hex | Origem | Uso |
|---|---|---|---|
| `--bg-page` | `#000000` | [MEDIDO] | Fundo da página e do header |
| `--surface-sheet` | `#FFFFFF` | [MEDIDO] | A "folha" clara que sobe sobre o fundo escuro |
| `--surface` | `#161616` | [MEDIDO] | Cards escuros, superfícies base sobre `bg-page` |
| `--surface-raised` | `#1F1F1F` | [MEDIDO] | Botão secundário do header, elementos elevados |
| `--surface-sunken` | `#0A0A0A` | [SUPOSIÇÃO] | Um degrau abaixo de `surface`, para inputs/divisórias sutis. `MEDIDAS.md` não amostrou este valor |

### 2.2 Texto

O `MEDIDAS.md` já avisa: os cinzas de texto foram amostrados do pixel mais claro de
cada bloco, e a compressão do vídeo escurece antialiasing — então "o valor real
tende a ser um pouco mais claro". Ao rodar contraste WCAG 2.1 sobre esses valores,
dois deles **falham** mesmo antes de qualquer margem de segurança:

| Token | Hex medido | Contraste /`bg-page` | Veredito | Hex corrigido | Contraste corrigido |
|---|---|---|---|---|---|
| `--text-muted` (links do menu) | `#AFAFAF` | 9.57:1 | ✅ passa AA corpo (4.5:1) | mantido | — |
| `--text-subtle` (parágrafo de apoio) | `#6F6F6F` | 4.18:1 | ❌ falha AA corpo | **`#757575`** | 4.56:1 |
| `--text-dimmed` (metade apagada do título) | `#4F4F4F` | 2.56:1 | ❌ falha até AA texto grande (3:1) | **`#5A5A5A`** | 3.04:1 |

`text-dimmed` só é usado em texto de exibição ≥40px (a metade apagada do título da
hero), então o piso aplicável é 3:1, não 4.5:1 — `#5A5A5A` é o mínimo que passa. Estou
subindo os dois o mínimo necessário para cravar exatamente no piso AA, preservando ao
máximo o peso visual apagado que é a marca registrada da peça (ver §2.4).

| Token | Hex | Origem | Uso |
|---|---|---|---|
| `--foreground` | `#FFFFFF` | [MEDIDO] | Texto em destaque, metade branca do título |
| `--text-muted` | `#AFAFAF` | [MEDIDO] | Links do menu |
| `--text-subtle` | `#757575` | [DERIVADO] (era `#6F6F6F`) | Parágrafo de apoio — corrigido para AA corpo |
| `--text-dimmed` | `#5A5A5A` | [DERIVADO] (era `#4F4F4F`) | Metade apagada do título — corrigido para AA texto grande |
| `--text-on-light` | `#0A0A0A` | [SUPOSIÇÃO] | Texto principal dentro da folha branca (contraste 20.4:1) |
| `--text-on-light-muted` | `#5A5A5A` | [SUPOSIÇÃO] | Texto secundário dentro da folha (mesmo valor de `text-dimmed`, contraste 6.9:1 sobre branco) |

### 2.3 Accent — verde deslocado

Verde medido: `#17E476` (marca) / `#27E295` (CTA), ambos em
`oklch(0.806 0.210 151.6)` / `oklch(0.808 0.178 159.0)` [DERIVADO via conversão sRGB→OKLCH].

Girar o matiz para o lado frio (mint/emerald) e manter luminosidade exige reduzir
croma — acima de h≈155° o sRGB satura no canal vermelho (R=0) antes do croma
original. Escolhi h=163° para `accent` e h=168° para `accent-cta`, com o croma
máximo do gamut reduzido ~3% por margem de segurança:

| Token | OKLCH | Hex | Origem | Contraste /preto | Uso |
|---|---|---|---|---|---|
| `--accent` | `oklch(0.806 0.174 163)` | `#00E19F` | [SUPOSIÇÃO] | 12.27:1 | Chevrons, palavra-chave verde do título, bordas |
| `--accent-cta` | `oklch(0.808 0.164 168)` | `#00E1AC` | [SUPOSIÇÃO] | 12.37:1 | Botão primário |

O par preserva o peso ótico do original quase exatamente (12.4:1 → 12.3:1) — a
mudança é perceptível lado a lado (mais esverdeado-azulado, menos "verde grama"),
mas não sacrifica legibilidade.

**Rampa do accent** (mesma matiz 163°, luminosidade variando) para hover, foco, glow
e texto sobre fundo claro — todo [SUPOSIÇÃO], derivada por cálculo, não amostrada:

| Degrau | OKLCH | Hex | Contraste /preto | Uso |
|---|---|---|---|---|
| `accent-50` | `oklch(0.94 0.091 163)` | `#B2FFDA` | 18.2:1 | Fundo de badge sutil |
| `accent-200` | `oklch(0.88 0.190 163)` | `#00FDB3` | 15.7:1 | Hover de texto/ícone accent |
| `accent-500` (=`--accent`) | `oklch(0.806 0.174 163)` | `#00E19F` | 12.3:1 | Base |
| `accent-700` | `oklch(0.72 0.156 163)` | `#00C288` | 9.1:1 | Borda ativa, ícone sobre superfície clara |
| `accent-on-light` | `oklch(0.55 0.119 163)` | `#00875D` | 4.6:1 /branco | **Obrigatório** para texto/ícone verde dentro da folha branca — ver nota abaixo |
| `accent-900` | `oklch(0.65 0.141 163)` | `#00A976` | 6.9:1 | Estado pressed, sombra interna |

**Nota crítica:** a referência usa o mesmo verde neon sobre os dois fundos (preto e
branco). Medido: `#17E476` sobre branco dá **1.71:1** de contraste — reprovado até
para elemento decorativo grande, ilegível como texto. Qualquer palavra-chave verde
que caia dentro da folha branca (ex.: "Adventure" em "Choose Your Adventure") **deve
usar `accent-on-light` (`#00875D`, 4.6:1)**, nunca o `--accent` puro. Isso é uma
correção sobre a referência, não uma escolha estética — sem ela o título fica
inacessível dentro do bloco claro.

### 2.4 O recurso de dois tons (regra de sistema, não de seção)

`MEDIDAS.md` registra: "o título da hero usa dois níveis de opacidade no mesmo bloco
de texto: a parte contextual fica apagada e só a palavra-chave vai a branco puro." O
`NOTES.md` confirma que esse padrão se repete em toda seção observada (títulos
sempre bicolores: `foreground` cheio + `text-dimmed` ou `accent`). Trate isso como
**token de composição**, não decisão pontual — todo título de seção do Evolution
segue essa mecânica.

---

## 3. Tipografia — Outfit

`MEDIDAS.md` deixa a família como "a confirmar". O desenho amostrado na hero (título
em 2880×2160) mostra: geométrica, `a` de andar único, bowls circulares, terminações
retas, x-height alta. **Outfit** [SUPOSIÇÃO] cobre esse desenho e, como variable font
(100–900), entra com um único arquivo via `next/font/google` — mais leve que
carregar múltiplos pesos estáticos do Poppins.

| Token | `clamp()` | Peso | Line-height | Letter-spacing | Origem | Uso |
|---|---|---|---|---|---|---|
| `--text-display` | `clamp(2.75rem, 2rem + 3.5vw, 7.5rem)` | 500 | 0.85 | -0.02em | [AMOSTRADO] (título hero ~120px @1440px) | Título da hero |
| `--text-h1` | `clamp(2rem, 1.5rem + 2vw, 3.5rem)` | 600 | 0.95 | -0.015em | [SUPOSIÇÃO] | Títulos de seção ("Choose Your Adventure") |
| `--text-h2` | `clamp(1.5rem, 1.25rem + 1vw, 2.25rem)` | 600 | 1.05 | -0.01em | [SUPOSIÇÃO] | Títulos de card, subtítulos de destaque |
| `--text-body-lg` | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` | 400 | 1.5 | 0 | [AMOSTRADO] | Parágrafo de apoio da hero |
| `--text-body` | `1rem` | 400 | 1.6 | 0 | [SUPOSIÇÃO] | Corpo padrão |
| `--text-caption` | `0.875rem` | 500 | 1.4 | 0.01em | [AMOSTRADO] (links do header) | Nav, labels, badges |

O restante da escala (pesos intermediários, itálico, tabular figures) fica para a
fase DESIGN — não há amostra suficiente para além destes seis níveis.

---

## 4. Espaçamento

Escala base de 4px [SUPOSIÇÃO — padrão de projeto, não medido]:

```
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */
```

Ritmo vertical entre seções: `NOTES.md` marca "espaçamento vertical entre seções"
como não-medível pelo vídeo → **[SUPOSIÇÃO] `--space-section: clamp(4rem, 3rem + 5vw, 8rem)`**
(`--space-24` a `--space-32`), a validar visualmente na fase EXECUTE.

Padding lateral do header [MEDIDO, convertido para px @1440px]:
`--space-header-x-left: 1.9375rem` (31px, 2.15% da largura) ·
`--space-header-x-right: 1.75rem` (28px, 1.91% da largura) — a leve assimetria é do
material original, preservada.

---

## 5. Raios

| Token | Valor | Origem | Uso |
|---|---|---|---|
| `--radius-sm` | 8px | [SUPOSIÇÃO] | Badges, chips |
| `--radius-md` | 12px | [SUPOSIÇÃO] | Botões, inputs |
| `--radius-lg` | 16px | [SUPOSIÇÃO] | Cards escuros (developers/business, kanban) |
| `--radius-xl` | 24px | [SUPOSIÇÃO] | Mídia (fotos, screenshots de produto) |
| `--radius-sheet` | 48px | [AMOSTRADO] | Cantos da "folha" clara — o gesto estrutural da peça (`NOTES.md`: "raio grande, na ordem de 40 a 60px") |

`MEDIDAS.md` marca `border-radius` de botão e card como "a confirmar" — os valores
de `sm`/`md`/`lg`/`xl` acima são suposição de escala consistente, não amostra.
`--radius-sheet` é o único com apoio direto no material (`NOTES.md` já estima a
faixa; 48px é o ponto médio).

---

## 6. Sombras e glows

O glow verde do CTA da hero é o segundo recurso de assinatura da peça (depois do
título bicolor). Expresso via `color-mix()` sobre `--accent-cta`, para nunca
hardcodar o hex fora do token:

```css
--shadow-cta-glow:
  0 0 24px 4px color-mix(in oklch, var(--accent-cta) 45%, transparent),
  0 0 64px 16px color-mix(in oklch, var(--accent-cta) 25%, transparent);
```

[SUPOSIÇÃO] — `MEDIDAS.md` marca `box-shadow` do glow como "a confirmar"; a
composição em duas camadas (halo apertado + difusão larga) é minha leitura do
`NOTES.md` ("glow verde difuso ao redor, projetado para baixo"), a validar
visualmente.

| Token | Valor | Uso |
|---|---|---|
| `--shadow-card` | `0 8px 24px -8px rgb(0 0 0 / 0.4)` | Elevação padrão de card escuro |
| `--shadow-card-overlap` | `0 16px 40px -12px rgb(0 0 0 / 0.5)` | Cards sobrepostos (kanban da seção 6) |
| `--shadow-cta-glow` | ver acima | CTA primário da hero |

---

## 7. Containers

| Token | Valor | Origem |
|---|---|---|
| `--container-max` | 1280px | [SUPOSIÇÃO] — `MEDIDAS.md` marca largura máxima como "a confirmar" |
| `--container-sheet-gutter` | clamp(1rem, 2vw, 2rem) | [AMOSTRADO] — faixa preta estreita nas laterais da folha (`NOTES.md`) |
| `--container-padding-x` | clamp(1.5rem, 5vw, 2rem) | [SUPOSIÇÃO] |

---

## 8. Inventário estrutural (arquétipos, não seções do Evolution)

O posicionamento do Evolution ainda não foi definido — por isso este inventário
cataloga os **padrões estruturais reutilizáveis** da referência, sem a narrativa da
HackerRank. Nomes de seção, ordem final e conteúdo do Evolution ficam para o PRD.

1. **Header escuro fixo-candidato** — logo + wordmark à esquerda, nav de 4 links,
   ação secundária + CTA primário à direita, divisória de 1px na base (visível só no
   topo). `[DECIDIR]` no `NOTES.md`: comportamento ao rolar.
2. **Hero de título bicolor** — três linhas centralizadas, ícones embutidos na
   altura do texto, CTA único com glow, sem prova social nem segundo CTA.
3. **Transição de folha clara** — bloco branco de cantos superiores muito
   arredondados sobe sobre o fundo preto, sem ocupar a largura total; mais adiante
   fecha com cantos inferiores arredondados e o preto volta.
4. **Par de cards escuros lado a lado** (dentro da folha) — largura igual, um com
   CTA primário verde, outro com CTA secundário escuro; cada um com mídia à direita.
5. **Scrollytelling sticky de duas colunas** — lista de afirmações à esquerda, só
   uma ativa por vez (as demais com opacidade decrescente); mídia empilhada à
   direita, fixa enquanto a lista avança.
6. **Seção assimétrica sobre preto com cards sobrepostos** — título + parágrafo de
   um lado, mídia vertical do outro, cards kanban sobrepostos na base com anotação
   manuscrita + seta curva apontando de um card ao outro.

**Criação nova — não é lacuna a preencher por semelhança** (`NOTES.md` é explícito
sobre isso): footer, toda a versão mobile/responsiva, todos os estados de interação
(hover, foco, ativo, erro), e qualquer seção além do arquétipo 6 (pricing, prova
social, FAQ, CTA final). Nada disso existe no material de referência.

**Padrões transversais** (regras de sistema, valem para qualquer seção do Evolution):
título sempre bicolor · verde como pontuação, nunca como área de fundo · alternância
preto/branco por blocos arredondados, não por faixas retas · cards escuros funcionam
sobre os dois fundos · mídia sempre em cantos arredondados, frequentemente com um
card sobreposto e deslocado.

---

## 9. Bloco `@theme` — pronto para a fase EXECUTE

Não aplicado ainda. `globals.css` continua com os tokens neutros do scaffold do
shadcn até a fase EXECUTE decidir como estes tokens convivem com o preset
`radix-nova` já instalado (`--radius`, `--primary`, etc. precisam ser remapeados,
não duplicados).

```css
@theme inline {
  /* Base */
  --color-bg-page: #000000;
  --color-surface-sheet: #ffffff;
  --color-surface: #161616;
  --color-surface-raised: #1f1f1f;
  --color-surface-sunken: #0a0a0a;

  /* Texto */
  --color-foreground: #ffffff;
  --color-text-muted: #afafaf;
  --color-text-subtle: #757575;
  --color-text-dimmed: #5a5a5a;
  --color-text-on-light: #0a0a0a;
  --color-text-on-light-muted: #5a5a5a;

  /* Accent */
  --color-accent-50: #b2ffda;
  --color-accent-200: #00fdb3;
  --color-accent-500: #00e19f;
  --color-accent-700: #00c288;
  --color-accent-900: #00a976;
  --color-accent-on-light: #00875d;
  --color-accent-cta: #00e1ac;

  /* Tipografia */
  --font-sans: var(--font-outfit);
  --text-display: clamp(2.75rem, 2rem + 3.5vw, 7.5rem);
  --text-h1: clamp(2rem, 1.5rem + 2vw, 3.5rem);
  --text-h2: clamp(1.5rem, 1.25rem + 1vw, 2.25rem);
  --text-body-lg: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
  --text-body: 1rem;
  --text-caption: 0.875rem;

  /* Espaçamento */
  --spacing-header-x-left: 1.9375rem;
  --spacing-header-x-right: 1.75rem;
  --spacing-section: clamp(4rem, 3rem + 5vw, 8rem);

  /* Raios */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-sheet: 48px;

  /* Containers */
  --container-max: 1280px;
  --container-sheet-gutter: clamp(1rem, 2vw, 2rem);
}
```

---

## 10. Lacunas e suposições abertas

Lista fechada do que precisa da sua validação antes ou durante a fase DESIGN:

- [ ] **Tipografia Outfit** — confirma, ou testamos Poppins lado a lado no protótipo?
- [ ] **Accent deslocado (`#00E19F`/`#00E1AC`, h=163°/168°)** — o ângulo de giro está
      bom, ou quer mais distância do verde original?
- [ ] **`accent-on-light` (`#00875D`)** — obrigatório por contraste; confirma o uso
      em qualquer palavra-chave verde dentro da folha branca?
- [ ] **Correção de `text-subtle`/`text-dimmed`** para o piso AA — aceita subir os
      dois cinzas (`#6F6F6F→#757575`, `#4F4F4F→#5A5A5A`) ou prefere outra estratégia
      (ex.: manter o valor original só onde o texto é puramente decorativo)?
- [ ] Raios de botão/card (`sm`/`md`/`lg`/`xl`) — sem amostra no material, são
      proposta de escala consistente.
- [ ] Glow do CTA em duas camadas — validar visualmente no protótipo.
- [ ] Largura máxima de container (1280px) — sem amostra no material.
- [ ] Espaçamento vertical entre seções — sem amostra no material.
- [ ] Todo o comportamento responsivo, o footer e as seções além do arquétipo 6 —
      não existem no material; ficam para o PRD definir com o posicionamento do
      Evolution.
