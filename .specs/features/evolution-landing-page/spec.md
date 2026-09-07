# Evolution Landing Page Specification

## Problem Statement

A Cron.Tech precisa de um case de portfólio que demonstre qualidade de estúdio em
design e código, não um template. A peça é a landing page de um SaaS B2B fictício,
o **Evolution**: uma plataforma de automação operacional com agentes de IA para
empresas de médio porte, que conecta ferramentas já usadas pela equipe (planilhas,
CRM, ERP, e-mail) e deixa agentes de IA executarem tarefas repetitivas entre elas —
sem exigir time de engenharia. A promessa central: reduzir configuração de semanas
para minutos, com o time de negócio no controle, não o time de TI. O sistema visual
é herdado de uma referência imutável (`docs/reference/`, design Ramotion para
HackerRank); a referência governa FORMA, o Evolution governa CONTEÚDO.

## Goals

- [ ] Página completa, single-route, comunicando a proposta de valor do Evolution
      através de 11 seções (header → hero → personas → narrativa → delegação →
      prova social → pricing → FAQ → CTA final → footer), reaproveitando os 6
      arquétipos estruturais da referência com conteúdo 100% próprio.
- [ ] Responsiva mobile-first (a referência é desktop-only; todo o comportamento
      mobile é decisão nova deste projeto).
- [ ] Acessível: navegação por teclado completa, foco visível, contraste AA em todo
      texto, `prefers-reduced-motion` com fallback definido por animação.
- [ ] Core Web Vitals: fontes via `next/font`, imagens via `next/image`, toda
      animação restrita a `transform`/`opacity`.
- [ ] Conteúdo (copy, itens de lista, planos, FAQ, depoimentos) em arquivos de dados
      tipados em `src/lib/content/` — nunca hardcoded em JSX.

## Out of Scope

| Item | Motivo |
|---|---|
| Autenticação / área logada | Landing page pré-venda; o produto Evolution em si não é construído, só sua vitrine |
| Backend real para formulários (newsletter, "Request Demo") | CTAs são decorativos com feedback visual, sem persistência — decisão confirmada com o usuário |
| Pagamento / checkout de planos | Pricing exibe planos e CTA "Fale com vendas" / "Começar agora", sem fluxo de cobrança |
| CMS / edição de conteúdo em runtime | Conteúdo é estático, tipado em arquivos `.ts`, editado via código |
| Internacionalização (i18n) / múltiplos idiomas | Página é 100% em português, decisão confirmada; sem toggle de idioma |
| Analytics / tracking de eventos | Fora do escopo desta spec; pode ser adicionado depois sem afetar a UI |
| Blog, documentação, área de recursos completa | Resolvido na QA rodada 2 (`AD-004`): o item "Recursos" foi removido do header/footer em vez de mantido como referência sem rota |
| Testemunhos de empresas reais | Evolution é produto fictício; qualquer testemunho/logo de cliente é fictício — ver Assumptions |

---

## Assumptions & Open Questions

| Assumption / decision | Chosen default | Rationale | Confirmed? |
|---|---|---|---|
| Idioma da copy | Português | Decisão do usuário | y |
| Ícones de integração (CRM/ERP/e-mail/planilhas) | Marcas reais (ex.: Salesforce, SAP, Gmail, Google Sheets) | Decisão do usuário, ciente do risco de marca registrada em material publicado | y |
| **Risco sinalizado sobre o item acima** | Usar apenas o mark oficial de cada marca (SVG monocromático simples), sem lockup completo, sem sugerir parceria/endosso formal — texto ao redor deixa claro que é "compatível com", nunca "parceiro oficial de" | Reduz exposição legal mantendo a decisão do usuário | y |
| Comportamento dos CTAs | Decorativo com feedback visual (hover, foco, clique, confirmação simulada), sem submissão real | Decisão do usuário | y |
| Estrutura de Pricing | 3 planos (Starter / Growth / Scale) + card Enterprise sob consulta | Decisão do usuário | y |
| Prova social (depoimentos/logos de cliente) | Empresas e depoimentos **fictícios**, nomeados como tal na narrativa do case (nunca atribuídos a empresas reais) | Evolution não tem clientes reais; atribuir depoimento a empresa real seria alegação falsa | y |
| Reinterpretação do arquétipo "Choose Your Adventure" | Dois cards: "Para o time de operações" (autosserviço, sem código) vs. "Para o time de TI" (governança, segurança, visibilidade) | Espelha a promessa central ("time de negócio no controle, não o time de TI") sem importar a narrativa developers/business da referência | y |
| Reinterpretação do scrollytelling ("AI Changing Software Development") | 3 passos narrando a evolução: hoje (tarefas manuais entre sistemas) → agentes assumindo triagem/resposta → operação supervisionada, não executada manualmente | Mantém a mecânica (3 afirmações, uma ativa, opacidade decrescente) com narrativa do Evolution | y |
| Reinterpretação da seção final escura (kanban "Backlog → AI delegated") | Mantida quase literal: card de tarefa operacional (ex. "Responder tickets de suporte Nível 1") migrando de "Backlog" para "Agente assumiu", com a mesma anotação manuscrita + seta | É o arquétipo que mais coincide naturalmente com o produto real do Evolution | y |
| Header fixo ao rolar | Fixo (`position: sticky`), com fundo que ganha leve blur/opacidade após o primeiro scroll | `NOTES.md` marca isso como `[DECIDIR]` — sem indício no material; sticky é o padrão de mercado para SaaS B2B | y |
| Sticky do scrollytelling | Coluna direita (mídia) fixa via CSS `position: sticky` enquanto a esquerda avança; troca de mídia por fade (não slide) | `NOTES.md` marca ambos como `[DECIDIR]`; fade é mais barato de fazer bem com `prefers-reduced-motion` | y |
| Avanço do scrollytelling | Por scroll contínuo (não por clique/passos discretos) | Mais próximo do padrão de mercado desse tipo de seção e do que o vídeo sugere como intenção | y |
| Conteúdo do footer | Logo + 3 colunas de links (Produto, Empresa, Recursos) + bloco de newsletter + redes sociais + linha legal (copyright, Privacidade, Termos) | Decisão do usuário: escopo "completo" | y |
| Nome/marca do Evolution na página | Wordmark textual "Evolution" + ícone geométrico simples (sem logo elaborado) | Não há marca definida no brief; um logo simples evita desviar esforço de design para algo fora do escopo do case | y |

**Open questions:** none — todas as decisões estão confirmadas pelo usuário (y);
nenhuma segue sem marcação.

---

## User Stories

Cada seção da página é uma "user story" de visitante — testável isoladamente ao
navegar até ela e observar seu comportamento.

### P1: Header de navegação ⭐ MVP

**User Story**: Como visitante, quero um cabeçalho que me oriente e me deixe agir
(ver planos, pedir demo) a qualquer momento da rolagem.

**Why P1**: Presente em toda a página; sem ele não há navegação nem CTA persistente.

**Acceptance Criteria**:

1. WHEN a página carrega THEN o sistema SHALL exibir wordmark à esquerda, 3 links de
   navegação (Produto, Soluções, Preços), cada um apontando para uma âncora de uma
   seção real da página, ao centro/esquerda, e um botão secundário ("Fale com
   vendas") + um botão primário ("Começar agora") à direita.
   (Nota — QA rodada 2: "Recursos" foi removido; era um item sem seção
   correspondente na página, mantido como suposição consciente na fase Specify
   e substituído por decisão do usuário durante QA. Ver `AD-004` em `STATE.md`.)
2. WHEN o usuário rola a página além de 8px do topo THEN o sistema SHALL aplicar
   fundo com opacidade e blur ao header (de transparente para `bg-page` com
   `backdrop-filter: blur`).
3. WHILE a largura da viewport é menor que o breakpoint `md` (768px) o sistema SHALL
   substituir os 3 links por um botão de menu que abre um painel de navegação
   full-screen ou drawer.
4. WHEN o usuário abre o menu mobile THEN o sistema SHALL mover o foco de teclado
   para o primeiro item do menu e SHALL devolver o foco ao botão de menu ao fechar.
5. The system SHALL manter o header com `position: sticky` no topo da viewport
   durante toda a rolagem.

**Independent Test**: Carregar a página, rolar, redimensionar para mobile, abrir o
menu, navegar só de teclado (Tab/Shift+Tab/Esc) e confirmar foco visível em cada
etapa.

---

### P1: Hero ⭐ MVP

**User Story**: Como visitante, quero entender em segundos o que o Evolution faz e
ter uma ação clara para continuar.

**Why P1**: Primeira impressão da página; decide se o visitante continua a rolagem.

**Acceptance Criteria**:

1. WHEN a página carrega THEN o sistema SHALL exibir um título de três linhas
   centralizado, com a mecânica de dois tons (`text-dimmed` para o texto contextual,
   `foreground` puro para a palavra-chave), seguindo o token `--text-display`.
2. The system SHALL exibir um parágrafo de apoio de até duas linhas centralizado
   abaixo do título, comunicando a promessa central (semanas → minutos de setup).
3. The system SHALL exibir exatamente um CTA primário ("Começar agora") com glow
   verde (`--shadow-cta-glow`) — nenhum CTA secundário, prova social ou logo de
   cliente na hero, preservando a composição enxuta da referência.
4. WHEN o usuário foca o CTA via teclado THEN o sistema SHALL exibir um anel de foco
   visível com contraste ≥ 3:1 contra o fundo preto.
5. WHILE `prefers-reduced-motion: reduce` estiver ativo o sistema SHALL exibir o
   glow do CTA em estado estático (sem pulsar/animar), preservando cor e forma.

**Independent Test**: Carregar a página em 375px e 1440px, comparar com o token de
tipografia e confirmar que só existe um CTA visível.

---

### P1: Transição para a seção clara (folha) ⭐ MVP

**User Story**: Como visitante, quero perceber uma mudança clara de contexto (do
institucional/hero para o funcional/produto) sem uma quebra abrupta de layout.

**Why P1**: É o gesto estrutural mais característico da peça (`--radius-sheet`);
sem ele a página perde a identidade visual herdada da referência.

**Acceptance Criteria**:

1. The system SHALL renderizar um bloco `surface-sheet` (branco) com cantos
   superiores em `--radius-sheet` (48px) que se sobrepõe visualmente ao `bg-page`
   (preto), respeitando o gutter lateral `--container-sheet-gutter`.
2. The system SHALL fechar esse bloco claro com cantos inferiores no mesmo raio
   antes da seção de Delegação retomar o fundo preto.
3. WHILE a viewport é mobile (`<768px`) o sistema SHALL reduzir `--radius-sheet`
   proporcionalmente (nunca abaixo de `--radius-xl`, 24px) para o raio não dominar
   visualmente uma tela estreita.

**Independent Test**: Inspecionar visualmente em 3 larguras (375px, 768px, 1440px)
e confirmar que a folha nunca toca as bordas da viewport e nunca perde o raio.

---

### P1: Seção de personas ("Para quem é o Evolution") ⭐ MVP

**User Story**: Como visitante (líder de operações ou de TI), quero identificar
rapidamente qual proposta de valor se aplica ao meu papel.

**Why P1**: É o primeiro ponto de segmentação de audiência da página — reinterpreta
o arquétipo "Choose Your Adventure" com a narrativa de controle de negócio vs. TI
central ao Evolution.

**Acceptance Criteria**:

1. WHEN a página carrega THEN o sistema SHALL exibir um título bicolor centralizado
   e, abaixo, dois cards escuros de largura igual lado a lado (empilhados em
   coluna única abaixo do breakpoint `md`).
2. The system SHALL dar a cada card: um título, uma descrição curta, três itens de
   lista com marcador verde, e um CTA — o card "Para o time de operações" com CTA
   primário (verde), o card "Para o time de TI" com CTA secundário (escuro),
   preservando a assimetria de peso da referência.
3. WHEN o usuário passa o mouse (hover) sobre um card THEN o sistema SHALL aplicar
   uma elevação sutil (`--shadow-card` → `--shadow-card-overlap`) em até 200ms.
4. IF o dispositivo não suporta hover (touch) THEN o sistema SHALL omitir o estado
   de hover sem deixar o card visualmente "preso" num estado intermediário.

**Independent Test**: Redimensionar entre mobile/desktop, passar mouse em cada
card, confirmar leitura correta de qual card fala com qual papel.

---

### P1: Narrativa scrollytelling ("Como a operação evolui") ⭐ MVP

**User Story**: Como visitante, quero entender a jornada de transformação (do
trabalho manual à supervisão de agentes) enquanto rolo a página, sem precisar
clicar em nada.

**Why P1**: É a seção que carrega o argumento central de valor do produto; reusa o
arquétipo sticky de duas colunas da referência.

**Acceptance Criteria**:

1. WHILE a viewport é `md` ou maior o sistema SHALL manter a coluna de mídia (à
   direita) fixa (`position: sticky`) enquanto a coluna de texto (à esquerda) rola.
2. WHEN o scroll cruza o limiar de um dos 3 passos narrativos THEN o sistema SHALL
   ativar exatamente um item por vez: o item ativo em contraste total com parágrafo
   de apoio visível; os inativos em `text-dimmed`, com opacidade decrescente
   conforme a distância do item ativo.
3. WHEN um passo se torna ativo THEN o sistema SHALL trocar a mídia correspondente
   com transição de opacidade (fade), nunca com corte abrupto ou slide lateral.
4. The system SHALL garantir que no máximo um passo esteja "ativo" a qualquer
   instante do scroll (nunca zero, nunca dois simultâneos, exceto durante a própria
   transição de fade).
5. WHILE a viewport é menor que `md` o sistema SHALL empilhar texto e mídia em
   coluna única, na ordem: item 1 + mídia 1, item 2 + mídia 2, item 3 + mídia 3 —
   abandonando o sticky (que não faz sentido sem duas colunas).
6. WHILE `prefers-reduced-motion: reduce` estiver ativo o sistema SHALL substituir
   a ativação por scroll por um estado final estático (todos os passos visíveis
   com o último em destaque) OU manter a troca de opacidade sem qualquer
   translação — a implementação define qual, mas nunca anima posição.

**Independent Test**: Rolar lentamente por toda a seção em desktop, confirmar
transições de opacidade e sticky; repetir em mobile e com `prefers-reduced-motion`
emulado no DevTools.

---

### P1: Seção de delegação ("A IA assume o operacional") ⭐ MVP

**User Story**: Como visitante, quero ver concretamente como uma tarefa migra do
time humano para um agente de IA.

**Why P1**: É a demonstração mais literal da proposta de valor; reaproveita quase
integralmente o arquétipo assimétrico da referência (cards kanban + anotação
manuscrita + seta).

**Acceptance Criteria**:

1. The system SHALL exibir, sobre fundo `bg-page`, um título bicolor de três
   linhas à esquerda, parágrafo de apoio, e uma mídia vertical de cantos
   arredondados à direita — layout de duas colunas em `md`+, coluna única abaixo
   disso.
2. The system SHALL sobrepor, na base da mídia, dois cards de tarefa estilo kanban
   ("Backlog" e "Agente assumiu"), deslocados um sobre o outro, cada um com título
   de tarefa, avatares/etiquetas e intervalo de datas.
3. The system SHALL exibir uma anotação em fonte cursiva ("IA assumiu" ou
   equivalente) com uma seta curva verde apontando do card "Backlog" para o card
   "Agente assumiu".
4. WHILE `prefers-reduced-motion: reduce` estiver ativo o sistema SHALL renderizar
   a seta e a anotação em estado final (sem traçado animado), caso a implementação
   de entrada use animação de traçado SVG.

**Independent Test**: Verificar em desktop e mobile que a leitura "tarefa migrou de
X para Y" é clara mesmo sem a anotação manuscrita (teste de contraste/hierarquia).

---

### P1: Prova social ⭐ MVP

**User Story**: Como visitante cético, quero ver sinais de que outras empresas
usam o produto antes de confiar na promessa.

**Why P1**: Seção nova (fora da referência), mas essencial para a credibilidade de
um SaaS B2B — confirmada pelo usuário.

**Acceptance Criteria**:

1. The system SHALL exibir uma faixa de logos de empresas fictícias (nomes e marcas
   inventados, nunca de empresas reais) e, abaixo ou ao lado, de 1 a 3 cartões de
   depoimento (nome fictício, cargo fictício, citação, empresa fictícia).
2. The system SHALL identificar visual e textualmente que a seção representa casos
   ilustrativos do case de portfólio (ex.: nota discreta "empresas e depoimentos
   ilustrativos"), nunca alegando clientes reais.
3. WHILE a viewport é mobile o sistema SHALL empilhar ou permitir scroll horizontal
   nos logos, sem quebrar o layout.

**Independent Test**: Confirmar que nenhum nome, logo ou citação corresponde a uma
empresa real; confirmar a nota de rodapé da seção.

---

### P1: Pricing ⭐ MVP

**User Story**: Como visitante em fase de decisão, quero comparar planos e saber
qual se encaixa no meu porte de empresa.

**Why P1**: Seção nova confirmada pelo usuário; estrutura de 3 planos + Enterprise.

**Acceptance Criteria**:

1. The system SHALL exibir 4 cards de plano lado a lado em desktop (Starter,
   Growth, Scale, Enterprise), empilhados em coluna única abaixo de `md`.
2. The system SHALL dar aos 3 primeiros planos um preço ou faixa de preço visível e
   uma lista de recursos incluídos; ao plano Enterprise, "Sob consulta" no lugar do
   preço e um CTA "Fale com vendas" em vez de "Começar agora".
3. WHEN o usuário passa o mouse ou foca um card de plano THEN o sistema SHALL
   destacar visualmente aquele card (borda ou elevação), sem mover os demais cards
   de posição (layout shift zero).
4. The system SHALL marcar visualmente um dos 3 planos autosserviço como
   "Recomendado" (destaque de borda/badge), consistente com o padrão de mercado.

**Independent Test**: Navegar todo o pricing por teclado, confirmar que o
destaque de foco é visível em cada card e que o CTA do Enterprise nunca aparenta
ser autosserviço.

---

### P1: FAQ ⭐ MVP

**User Story**: Como visitante com dúvidas remanescentes, quero respostas rápidas
sem sair da página.

**Why P1**: Seção nova confirmada pelo usuário.

**Acceptance Criteria**:

1. The system SHALL exibir uma lista de perguntas em formato accordion, com no
   máximo uma resposta expandida por vez OU múltiplas simultâneas — a
   implementação escolhe, mas SHALL ser consistente (nunca misturar os dois
   comportamentos na mesma lista).
2. WHEN o usuário ativa uma pergunta (clique ou Enter/Espaço com foco no cabeçalho)
   THEN o sistema SHALL expandir a resposta com `aria-expanded` atualizado e
   `aria-controls` apontando para o painel de resposta.
3. The system SHALL tornar cada cabeçalho de pergunta navegável e ativável somente
   via teclado (sem exigir mouse).

**Independent Test**: Navegar o accordion inteiro só de teclado; inspecionar
atributos ARIA no DevTools.

---

### P1: CTA final ⭐ MVP

**User Story**: Como visitante que rolou a página inteira, quero um último convite
claro para agir antes do footer.

**Why P1**: Seção nova confirmada pelo usuário; fecha o argumento antes do rodapé.

**Acceptance Criteria**:

1. The system SHALL exibir um título de impacto (bicolor, seguindo a mecânica de
   sistema) e um único CTA primário com o mesmo tratamento de glow da hero.
2. The system SHALL usar `bg-page` (preto) como fundo, mantendo a alternância de
   blocos da composição geral da página.

**Independent Test**: Confirmar visualmente que o CTA final reaproveita o mesmo
componente de botão/glow da hero, sem uma variante nova.

---

### P1: Footer ⭐ MVP

**User Story**: Como visitante, quero encontrar links institucionais, legais e de
contato consolidados ao final da página.

**Why P1**: Seção nova (sem material de referência), escopo "completo" confirmado
pelo usuário.

**Acceptance Criteria**:

1. The system SHALL exibir: wordmark + curta descrição, 3 colunas de links
   (Produto, Empresa, Recursos), um bloco de newsletter (campo de e-mail + botão),
   ícones de redes sociais, e uma linha legal (copyright com ano corrente,
   links "Privacidade" e "Termos").
2. WHEN o usuário submete o campo de newsletter com um valor qualquer THEN o
   sistema SHALL exibir uma confirmação visual de sucesso (sem chamada de rede),
   consistente com a decisão de CTAs decorativos.
3. WHILE a viewport é mobile o sistema SHALL empilhar as colunas em uma ordem
   vertical legível (wordmark → colunas de link → newsletter → redes → legal).
4. The system SHALL calcular o ano do copyright dinamicamente (`new Date().getFullYear()`),
   nunca hardcoded.

**Independent Test**: Submeter o campo de newsletter com texto qualquer e vazio;
confirmar comportamento em ambos os casos; verificar o ano do copyright.

---

### P2: Header com estado ativo de rota

**User Story**: Como visitante navegando pelas âncoras internas, quero ver qual
seção da página estou visualizando destacada no header.

**Why P2**: Melhora de orientação, não bloqueia o MVP (a página é single-route).

**Acceptance Criteria**:

1. WHEN uma seção com âncora correspondente a um link de nav entra no viewport
   THEN o sistema SHALL destacar visualmente aquele link no header.

---

### P2: Prefetch/scroll suave para âncoras do header

**User Story**: Como visitante, quero que clicar em um link do header me leve
suavemente até a seção, não um salto abrupto.

**Why P2**: Refinamento de UX, não essencial para a demonstração do produto.

**Acceptance Criteria**:

1. WHEN o usuário clica em um link de âncora do header THEN o sistema SHALL rolar
   suavemente até a seção correspondente.
2. WHILE `prefers-reduced-motion: reduce` estiver ativo o sistema SHALL pular
   diretamente para a seção, sem easing de scroll.

---

### P3: Comutador de moeda no Pricing

**User Story**: Como visitante internacional, quero ver o preço na minha moeda.

**Why P3**: Nice-to-have; o produto e a copy já são fixados em português/mercado
único — não há requisito de negócio real para isso.

**Acceptance Criteria**:

1. WHERE o comutador de moeda estiver presente o sistema SHALL recalcular os
   valores exibidos sem recarregar a página.

---

## Edge Cases

- IF o JavaScript falhar ao carregar (ou for desabilitado) THEN o sistema SHALL
  ainda exibir todo o conteúdo em HTML semântico navegável (progressive
  enhancement — nenhuma seção depende de JS para existir, só para animar).
- IF a viewport for extremamente estreita (<360px) THEN o sistema SHALL manter
  todo texto legível sem overflow horizontal (scroll lateral proibido no `body`).
- IF a viewport for muito alta e estreita (mobile em paisagem) THEN a seção
  scrollytelling SHALL degradar para o comportamento empilhado de mobile
  (critério já coberto por NARRATIVE-05), evitando sticky quebrado.
- WHEN o usuário navega inteiramente por teclado (Tab) THEN o sistema SHALL nunca
  deixar o foco "invisível" (todo elemento focável tem indicador visível) nem
  "preso" (nenhum focus trap fora de um modal/drawer aberto).
- IF uma imagem de mídia (foto, ilustração) falhar ao carregar THEN o sistema SHALL
  exibir o `alt` text e manter o layout sem colapsar (dimensões reservadas via
  `next/image`).

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
|---|---|---|---|
| HDR-01 | P1: Header de navegação | Design | Pending |
| HDR-02 | P1: Header de navegação | Design | Pending |
| HDR-03 | P1: Header de navegação | Design | Pending |
| HDR-04 | P1: Header de navegação | Design | Pending |
| HDR-05 | P1: Header de navegação | Design | Pending |
| HERO-01 | P1: Hero | Design | Pending |
| HERO-02 | P1: Hero | Design | Pending |
| HERO-03 | P1: Hero | Design | Pending |
| HERO-04 | P1: Hero | Design | Pending |
| HERO-05 | P1: Hero | Design | Pending |
| SHEET-01 | P1: Transição para a seção clara | Design | Pending |
| SHEET-02 | P1: Transição para a seção clara | Design | Pending |
| SHEET-03 | P1: Transição para a seção clara | Design | Pending |
| PERSONA-01 | P1: Seção de personas | Design | Pending |
| PERSONA-02 | P1: Seção de personas | Design | Pending |
| PERSONA-03 | P1: Seção de personas | Design | Pending |
| PERSONA-04 | P1: Seção de personas | Design | Pending |
| NARRATIVE-01 | P1: Narrativa scrollytelling | Design | Pending |
| NARRATIVE-02 | P1: Narrativa scrollytelling | Design | Pending |
| NARRATIVE-03 | P1: Narrativa scrollytelling | Design | Pending |
| NARRATIVE-04 | P1: Narrativa scrollytelling | Design | Pending |
| NARRATIVE-05 | P1: Narrativa scrollytelling | Design | Pending |
| NARRATIVE-06 | P1: Narrativa scrollytelling | Design | Pending |
| DELEGATE-01 | P1: Seção de delegação | Design | Pending |
| DELEGATE-02 | P1: Seção de delegação | Design | Pending |
| DELEGATE-03 | P1: Seção de delegação | Design | Pending |
| DELEGATE-04 | P1: Seção de delegação | Design | Pending |
| SOCIAL-01 | P1: Prova social | Design | Pending |
| SOCIAL-02 | P1: Prova social | Design | Pending |
| SOCIAL-03 | P1: Prova social | Design | Pending |
| PRICING-01 | P1: Pricing | Design | Pending |
| PRICING-02 | P1: Pricing | Design | Pending |
| PRICING-03 | P1: Pricing | Design | Pending |
| PRICING-04 | P1: Pricing | Design | Pending |
| FAQ-01 | P1: FAQ | Design | Pending |
| FAQ-02 | P1: FAQ | Design | Pending |
| FAQ-03 | P1: FAQ | Design | Pending |
| CTA-01 | P1: CTA final | Design | Pending |
| CTA-02 | P1: CTA final | Design | Pending |
| FOOTER-01 | P1: Footer | Design | Pending |
| FOOTER-02 | P1: Footer | Design | Pending |
| FOOTER-03 | P1: Footer | Design | Pending |
| FOOTER-04 | P1: Footer | Design | Pending |
| HDR-06 | P2: Header com estado ativo de rota | - | Pending |
| HDR-07 | P2: Scroll suave para âncoras | - | Pending |
| HDR-08 | P2: Scroll suave para âncoras | - | Pending |
| PRICING-05 | P3: Comutador de moeda | - | Pending |

**ID format:** `[SEÇÃO]-[NÚMERO]`, sequencial dentro de cada seção na ordem em que
os critérios aparecem acima.

**Status values:** Pending → In Design → In Tasks → Implementing → Verified

**Coverage:** 46 requisitos totais (43 P1 + 3 P2/P3), 0 mapeados a tasks ainda
(fase Tasks não iniciada), 46 não mapeados ⚠️ (esperado nesta etapa).

---

## Implicit-Requirement Dimensions Sweep

| Dimensão | Cobertura |
|---|---|
| Input validation & bounds | N/A porque os únicos campos (newsletter) são decorativos por decisão do usuário — sem validação real de formato, só feedback visual de submissão (FOOTER-02) |
| Failure / partial-failure states | N/A porque a página não faz nenhuma chamada de rede em runtime (sem backend nesta fase) |
| Idempotency / retry / duplicate handling | N/A porque não há submissão real de dados |
| Auth boundaries & rate limits | N/A — landing page pública, sem área autenticada |
| Concurrency / ordering | Coberto por NARRATIVE-04 (exatamente um passo ativo por vez) e HDR-04 (ordem de foco ao abrir/fechar menu) |
| Data lifecycle / expiry | N/A — nenhum dado é persistido |
| Observability | N/A — fora do escopo desta fase; nenhuma infra de log/métrica foi solicitada |
| External-dependency failure | Coberto pelo Edge Case de imagem quebrada; fontes via `next/font` são resolvidas em build time, não em runtime, então não têm modo de falha de rede no cliente |
| State-transition integrity | Coberto por HDR-04 (foco do menu mobile), NARRATIVE-04 (passo ativo único), FAQ-01/02 (estado expandido/colapsado consistente) |

---

## Success Criteria

- [ ] Todas as 11 seções renderizam e passam por revisão visual comparando com
      `docs/DESIGN-REFERENCE.md` (paleta, tipografia, raios, espaçamento).
- [ ] Navegação 100% por teclado, sem foco invisível ou preso, em toda a página.
- [ ] Nenhuma violação de contraste AA (texto normal ≥4.5:1, texto grande ≥3:1) nos
      tokens definidos em `docs/DESIGN-REFERENCE.md` §2.2.
- [ ] `prefers-reduced-motion: reduce` remove toda animação de posição/translação
      em todas as seções que a possuem (HERO, NARRATIVE, DELEGATE).
- [ ] Zero regressão de CLS: nenhum elemento (imagem, card de pricing, accordion)
      causa deslocamento de layout ao interagir ou carregar.
- [ ] Build de produção (`next build`) sem erros de TypeScript strict e sem
      warnings do ESLint configurado.
