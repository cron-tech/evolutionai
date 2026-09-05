# Valores medidos — referência visual

Fonte: frames nítidos e frontais extraídos de `motion.mp4` (janelas 0.0–0.6s e
9.6–11.0s, onde a página aparece plana, sem moldura, zoom ou motion blur).
Amostragem por pixel em resolução original (2880×2160).

> O site público da HackerRank foi redesenhado e **não corresponde mais** a esta
> peça. Não use o site atual como referência: o vídeo é a única fonte.

---

## Cores medidas (confiança alta)

| Token                | Hex       | Onde aparece                        |
|----------------------|-----------|-------------------------------------|
| `background`         | `#000000` | Fundo da página e do header         |
| `background-light`   | `#FFFFFF` | Seção clara que sobe sobre a escura |
| `surface`            | `#161616` | Banner de cookies, superfícies base |
| `surface-raised`     | `#1F1F1F` | Botão secundário do header          |
| `accent`             | `#17E476` | Verde da marca (quadrado do logo)   |
| `accent-cta`         | `#27E295` | Verde do botão primário             |
| `foreground`         | `#FFFFFF` | Texto em destaque                   |

## Cores medidas (confiança média — validar)

Valores obtidos do pixel mais claro de cada bloco de texto. A compressão do vídeo
escurece antialiasing, então o valor real tende a ser **um pouco mais claro**.

| Token                | Hex aprox. | Onde aparece                          |
|----------------------|------------|---------------------------------------|
| `foreground-muted`   | `#AFAFAF`  | Links do menu                         |
| `foreground-subtle`  | `#6F6F6F`  | Parágrafo de apoio da hero            |
| `foreground-dimmed`  | `#4F4F4F`  | Trecho apagado do título da hero      |

O título da hero usa **dois níveis de opacidade no mesmo bloco de texto**: a parte
contextual fica apagada e só a palavra-chave vai a branco puro. É o principal
recurso de hierarquia da peça — vale replicar.

---

## Layout (proporcional)

Medidas relativas à largura do frame. Converta para px depois de fixar a largura de
viewport de referência do projeto.

| Medida                        | % da largura | Em viewport 1440px |
|-------------------------------|--------------|--------------------|
| Altura do header              | 8,3%         | ~120px             |
| Padding lateral (esquerda)    | 2,15%        | ~31px              |
| Padding lateral (direita)     | 1,91%        | ~28px              |

O header tem uma linha divisória de 1px na base, mais clara que o fundo, visível
apenas quando a página está no topo.

---

## A confirmar (não dá para medir com precisão pelo vídeo)

- [ ] Família tipográfica — geométrica sem serifa, `a` de andar único, terminações
      retas. Candidatas: Poppins, Outfit, Plus Jakarta Sans, Geist.
- [ ] Escala tipográfica exata (tamanho, peso, `line-height`, `letter-spacing`)
- [ ] `border-radius` de botão e card
- [ ] `box-shadow` do glow verde sob o CTA da hero
- [ ] Largura máxima do container de conteúdo
- [ ] Espaçamento vertical entre seções
- [ ] Comportamento responsivo (o vídeo só mostra desktop)
