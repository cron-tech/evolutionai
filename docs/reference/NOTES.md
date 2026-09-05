# Comportamento e composição — referência visual

Base: `motion.mp4` (11s, 60fps) analisado quadro a quadro.

## Como ler este documento

O vídeo é a **peça de apresentação do Dribbble**, não uma gravação de scroll. A
página aparece dentro de uma moldura de tablet sobre fundo verde, e a câmera faz
zoom, inclinação e panorâmica enquanto percorre o conteúdo.

Isso significa que **quase todo o movimento visível é da câmera, não da página**.
Por isso cada observação abaixo está marcada:

- `[OBSERVADO]` — visível nos frames, é fato da página
- `[INFERIDO]` — dedução razoável a partir da composição, precisa de decisão
- `[DECIDIR]` — não há informação no material; escolha de projeto

Percurso do vídeo: 0,0–0,6s hero plana → 0,7–8,0s descida pelas seções →
8,0–9,5s subida de volta → 9,6–11,0s hero plana novamente. O ponto mais profundo
alcançado é a seção 6. **Não há material sobre o que vem depois dela.**

---

## Inventário de seções

### 1. Header `[OBSERVADO]`

Logo à esquerda (wordmark + quadrado verde). Quatro links de navegação:
Products, Solutions, Resources, Pricing. À direita: "For Developers" com ícone de
link externo, botão secundário escuro "Request Demo", botão primário verde
"Sign Up".

Linha divisória de 1px na base, mais clara que o fundo.

`[DECIDIR]` Se o header é fixo e se muda de estado ao rolar. O vídeo não mostra
scroll real, então não há como observar.

### 2. Hero (fundo preto) `[OBSERVADO]`

Título em três linhas, centralizado, com **dois níveis de contraste no mesmo
bloco**: "The future of development is" em cinza apagado, "human + AI" em branco
puro. Dois ícones aparecem embutidos na linha do título, no mesmo tamanho das
letras: uma impressão digital em contorno verde antes de "human", e uma estrela
de quatro pontas em verde brilhante antes de "AI".

Parágrafo de apoio em duas linhas, centralizado, cinza médio.

CTA único: "Join The Community", botão escuro de cantos arredondados com borda
sutil e **glow verde difuso ao redor**, projetado para baixo.

Nenhum segundo CTA, nenhuma prova social, nenhum logotipo de cliente na hero.

`[INFERIDO]` A estrela verde tem aparência de elemento animado (brilho, possível
rotação lenta). Não dá para confirmar pelo vídeo.

### 3. Transição para o bloco claro `[OBSERVADO]`

Este é o recurso estrutural mais característico da peça: o conteúdo claro é uma
**"folha" branca que sobe sobre o fundo preto**, com cantos superiores muito
arredondados — raio grande, na ordem de 40 a 60px. A folha não ocupa a largura
total: sobra uma faixa preta estreita nas laterais.

Mais adiante a folha **também termina em cantos inferiores arredondados**, e o
fundo preto volta abaixo dela. Ou seja: é um bloco claro flutuando sobre a
página escura, não uma alternância simples de background.

### 4. "Choose Your Adventure" (dentro do bloco claro) `[OBSERVADO]`

Título centralizado, dois tons: "Choose Your" em preto, "Adventure" em verde.
Subtítulo centralizado em duas linhas.

Abaixo, **dois cards escuros lado a lado**, largura igual:

- **For developers** — descrição curta, três itens de lista com chevron verde
  ("Track your skill proficiency", "Prepare for technical interviews", "Learn the
  latest GenAI skills"), botão primário verde. Visual à direita mostrando uma
  janela de editor de código.
- **For business** — mesma estrutura, três itens, botão secundário escuro.
  Visual à direita com um selo "GenAI" sobre um gradiente verde geométrico.

Contraste importante: **os cards são escuros dentro da seção clara**. E os dois
não usam o mesmo peso de botão — o de developers é verde, o de business é
escuro.

### 5. "AI Changing Software Development" — scrollytelling `[OBSERVADO]`

Título centralizado, dois tons: "AI Changing" em verde, "Software Development"
em preto.

Layout de duas colunas:

- **Esquerda**: uma lista de três afirmações empilhadas. Apenas **uma está ativa
  por vez**, em contraste cheio e com um parágrafo de apoio visível abaixo dela.
  As outras aparecem em cinza, com opacidade decrescente conforme se afastam da
  ativa — a terceira chega quase invisível.
  1. "GenAI advances daily."
  2. "GenAI is becoming a part of everything."
  3. "GenAI will execute more mundane development tasks"
- **Direita**: mídia empilhada — uma foto de cantos arredondados ao fundo e, à
  frente e deslocado, um card escuro de perfil ("Ada, Machine Learning Engineer")
  com seções de Certifications e Badges hexagonais.

`[INFERIDO]` É uma seção sticky: a coluna direita permanece fixa enquanto a
esquerda avança pelos passos, e a mídia troca a cada passo ativo. A palavra
"GenAI" aparece em verde no item ativo e perde a cor nos inativos.

`[DECIDIR]` Se o avanço é por scroll contínuo ou por passos discretos, e se a
mídia troca com fade ou com slide.

### 6. "GenAI will execute more mundane development tasks" (fundo preto) `[OBSERVADO]`

Já fora do bloco claro. Layout assimétrico de duas colunas:

- **Esquerda**: título em três linhas com "GenAI" em verde e o resto em degradê
  de branco para cinza. Parágrafo de apoio em duas linhas.
- **Direita**: foto vertical de cantos arredondados (desenvolvedor de costas,
  com fones, diante de um monitor de código).
- **Sobreposto na base**: dois cards de tarefa em estilo kanban, escuros com
  leve tom azulado, deslocados um sobre o outro. O primeiro rotulado "Backlog", o
  segundo "AI delegated". Cada tarefa traz um título, dois avatares com etiqueta
  ("AI Help", nome da pessoa) e um intervalo de datas.
- **Anotação manuscrita**: o texto "AI Delegated" em fonte cursiva branca,
  inclinado, com uma **seta curva verde** apontando do card Backlog para o card
  AI delegated.

Esse par anotação-manuscrita-mais-seta é um detalhe de acabamento que dá muito
caráter à peça e custa pouco para replicar.

---

## Padrões que se repetem

Vale extrair como regras do sistema, não como decisão por seção:

1. **Título de dois tons.** Toda seção usa a mesma mecânica: parte do texto em
   contraste cheio, parte apagada ou em verde. É o principal recurso de
   hierarquia da peça.
2. **Verde como pontuação, nunca como área.** O verde aparece em uma palavra do
   título, no botão primário, nos chevrons, na seta, no glow. Nunca preenche uma
   seção inteira.
3. **Alternância preto e branco por blocos arredondados**, não por faixas retas.
4. **Cards escuros funcionam nos dois fundos** — dentro do bloco claro e sobre o
   preto.
5. **Mídia sempre em cantos arredondados**, frequentemente com um card sobreposto
   e deslocado sobre ela.

---

## Animações — o que decidir

Nada abaixo é observável no vídeo. São as decisões que a fase DESIGN precisa
tomar, com o `frontend-design` opinando:

- [ ] Entrada das seções ao scroll (fade + translate? stagger entre elementos?)
- [ ] Comportamento do header ao rolar
- [ ] Hover dos cards e dos botões
- [ ] Mecânica exata do sticky da seção 5
- [ ] Entrada da seta curva manuscrita (traçado animado? fade?)
- [ ] Animação do glow do CTA da hero
- [ ] `prefers-reduced-motion`: qual o fallback de cada item acima

## Lacunas do material

- Não há nenhum frame de **footer**.
- Não há nenhum frame **mobile ou tablet**. Todo o responsivo é decisão nova.
- Não há **estados de interação** (hover, foco, ativo, erro).
- Não há seções depois da 6 — se a página tiver pricing, depoimentos, FAQ ou CTA
  final, isso não existe na referência.
