# CONTEXTO DO PROJETO - INTERFARMA

## 1. Visão Geral
O projeto **Interfarma** é uma plataforma web institucional de alto padrão visual e tecnológico voltada para o setor farmacêutico e de saúde corporativa. O objetivo é apresentar os serviços, diferenciais, catálogo de medicamentos, soluções para empresas, artigos no blog, perguntas frequentes e canais de contato, oferecendo uma experiência premium para o usuário final.

Adicionalmente, a plataforma conta com um **Painel Administrativo Completo (CMS)** protegido por autenticação segura, permitindo que administradores alterem em tempo real todos os textos, imagens, logos, paleta de cores (tokens visuais), banners, medicamentos, artigos de blog, FAQs e informações institucionais de todas as páginas.

---

## 2. Barra Superior & Header Institucional (Layout Duplo)
- **Topbar Superior Verde/Teal (Exibição apenas em Desktop)**:
  - Telefone com ícone: `+55 11 5088-1818` (clicável `tel:`)
  - E-mail com ícone: `contato@interfarma.com.br` (clicável `mailto:`)
  - Ícones de redes sociais: Instagram e LinkedIn
  - Ocultada em dispositivos móveis e telas menores que 768px para layout limpo e otimizado.
- **Navbar Principal & Menu Mobile**:
  - Logotipo oficial vetorizado **InterFarma** (`/asserts/IF_Logo Vetorizado 1.png`)
  - Links de navegação: `Como funciona`, `Diferenciais`, `Empresas`, `Medicamentos`, `FAQ`, `Blog`
  - Seletor de idioma: `PT | EN`
  - Botão de ação (CTA): `Entrar em contato`
  - **Menu Mobile Otimizado & Backdrop com Blur**: Ao abrir o menu no modo mobile, o backdrop escurecedor com desfoque nativo (`backdrop-filter: blur(8px)`) é exibido de forma fluida sobre a página ao fundo, enquanto o menu suspenso desliza como um painel 100% branco opaco, com botões bem espaçados, tipografia de alta legibilidade, transições suaves e clique instantâneo sem travamentos ou interferência na navegação.

---

## 3. Página do Blog (Estrutura Conforme Modelos de Referência)
- **Hero Headers Institucionais das Páginas Internas**:
  - Imagem de fundo unificada em alta definição da equipe de logística e expedição no armazém farmacêutico (`/asserts/hero-header-bg.png`), configurada com alta luminosidade e clareza (sem filtros escurecedores pesados). No desktop opera com `height: 280px; background-position: center center`, e no mobile (`max-width: 768px`) ajusta-se para `height: 220px; background-position: 73% center; background-size: cover`, enquadrando e exibindo com clareza ambas as pessoas da equipe no centro do banner e mantendo os títulos brancos com sombra sutil para contraste nítido.
  - Seção "Últimas postagens" com grade destacada de 3 cards com capa oficial do logo verde "Blog" (`/asserts/blog-card-cover.jpg`), títulos em azul escuro e resumos conceituais.
  - Layout limpo e minimalista sem paginação numérica.
  - Banner de largura total: "Faça já seu pedido" com foto de equipe ao fundo e botão "Fale com nossos especialistas".
  - Seção de captura de leads com fundo azul claro: "Informe seu e-mail que entraremos em contato", campo de texto com ícone de e-mail e botão "Enviar".
  - Rodapé horizontal minimalista com logotipo InterFarma, endereço, telefone, e-mail e ícones sociais.
- **Visualização de Artigo Individual (`/blog/:slug`)**:
  - Botão "Voltar" estilizado em cinza arredondado posicionado no topo superior esquerdo.
  - Imagem de destaque ampla centralizada com bordas arredondadas (16px).
  - Título do artigo em azul escuro e 5 parágrafos de texto justificado e bem espaçado.
  - Banner "Faça já seu pedido" + seção de captação de e-mail + rodapé minimalista.

---

## 4. Página Como Funciona (Estrutura Conforme Modelo de Referência)
- **Hero Header**: Fundo fotográfico corporativo com título centralizado "Como funciona" e subtítulo "Confira todo o processo da InterFarma".
- **Texto Introdutório**: "A InterFarma trabalha para auxiliar todos os brasileiros na importação de medicamentos, sem tributação alfandegária*."
- **Diagrama de Fluxo (6 Etapas em Ciclo / S-Shape com Setas Azuis)**:
  1. *Prescrição Médica*: Ícone teal de localização/médico + texto explicativo de rotina de cuidados de saúde.
  2. *Fornecedores*: Ícone teal de maleta + texto de fornecedores qualificados internacionais.
  3. *Aprovação*: Ícone teal de documento + texto de aprovação de orçamento e documentos.
  4. *Autorização*: Ícone teal de checagem + texto de autorização de embarque e controle de temperatura.
  5. *ANVISA – RF*: Ícone teal de escudo + texto de inspeção e fiscalização ANVISA/Receita Federal.
  6. *Garantia de Entrega*: Ícone teal de globo + texto de garantia de entrega em embalagens certificadas.
- **Card Split "Faça já seu pedido"**: Caixa com fundo azul claro suave (`#EAF5FB`), foto da equipe na esquerda com cantos arredondados, título escuro na direita e botão teal "Fale com nossos especialistas".
- **Captura de Leads & Rodapé**: Bloco de captação de e-mail e rodapé horizontal minimalista.

---

## 5. Página Contatos / Entre em Contato (Estrutura Conforme Modelo de Referência)
- **Hero Header**: Fundo institucional com título "Entre em contato" e subtítulo "Todas as vantagens em contar com a InterFarma".
- **Card Central "Entre em contato"**: Card branco flutuante com cantos arredondados (20px), sombra suave e campos em grade:
  - *Linha 1*: Nome e Empresa
  - *Linha 2*: E-mail e Telefone
  - *Linha 3*: Mensagem (textarea ampla)
  - *Linha 4*: Botão "Enviar" teal alinhado à esquerda.
- **Captura de Leads & Rodapé**: Seção de e-mail e rodapé minimalista horizontal.

---

## 6. Página Diferenciais (Estrutura Conforme Modelo de Referência)
- **Hero Header**: Título centralizado branco "Diferenciais" e subtítulo "Todas as vantagens em contar com a InterFarma" com fundo fotográfico em alta resolução (`hero-header-bg.png`).
- **Seção 1 (Licenças e Órgãos Reguladores)**:
  - Lado esquerdo: Foto do supervisor em capacete branco (`Rectangle Copy 4.jpg`) em moldura arredondada (20px) com backdrop azul suave (`#EAF5FB`) e blob orgânico decorativo amarelo (`#FCD34D`) no topo esquerdo.
  - Lado direito: Título em azul-marinho (`#153258`) "Possuímos todas as licenças exigidas pelos órgãos reguladores." + grade limpa em 2 colunas com 6 blocos de autorização ANVISA.
- **Seção 2 (Tecnologia e Investimento)**:
  - Lado esquerdo: Título "Tecnologia e Investimento" em tom verde/teal (`#178272`) + grade em 2 colunas com 6 recursos tecnológicos e ícones em teal `#2CA4B0` (Nossa Estrutura, Monitoramento da Carga, Software de Monitoramento de Temperatura, Sistema de dados, Veículo Próprio para Transporte, Acompanhamento do Tratamento do Paciente).
  - Lado direito: Foto do analista farmacêutico no computador (`Rectangle Copy 4-1.jpg`) em moldura arredondada (20px) com blob orgânico amarelo no topo direito.
- **Seção 3 (Nossa Missão / Visão / Valores)**:
  - Card flutuante branco (`box-shadow: 0 15px 40px rgba(0,0,0,0.04)`) com 3 colunas, ícones oficiais (`feather_award.png`, `feather_eye.png`, `feather_globe.png`), títulos em azul-marinho e textos conceituais de compromisso social e excelência.
- **Banner "Faça já seu pedido" + Captura de Leads + Rodapé Minimalista**.

---

## 7. Página Empresas (Estrutura Conforme Modelo de Referência)
- **Hero Header**: Título centralizado branco "Empresas" e subtítulo "Todas as vantagens em contar com a InterFarma".
- **Seção "Empresas que atendemos"**:
  - Título em azul-marinho "Empresas que atendemos".
  - Grade 3x2 com 6 cards destacados (Clínicas, Hospitais Públicos, Distribuidoras, Indústrias, Hospitais Privados, Secretarias de Saúde) com títulos em tom verde/teal e descrições claras.
- **Card Central "Entre em contato"**: Formulário flutuante em card branco com Nome, Empresa, E-mail, Telefone, Mensagem e botão teal "Enviar".
- **Captura de Leads & Rodapé Minimalista**.

---

## 8. Página FAQ (Estrutura Conforme Modelo de Referência)
- **Hero Header**: Título centralizado branco "FAQ" em fonte destacada.
- **Seção "Perguntas Frequentes"**:
  - Título em azul-marinho "Perguntas Frequentes".
  - Lista de acordeões com caixas brancas arredondadas, títulos em teal (`#178272`), ícone chevron moderno com rotação animada e transição suave via CSS Grid para abertura e fechamento sem solavancos.
  - Evento de clique restrito ao cabeçalho com suporte a acessibilidade via teclado (`Enter`/`Espaço`), permitindo seleção ou toque no texto da resposta sem fechamento acidental no mobile.
- **Banner "Faça já seu pedido" + Captura de Leads + Rodapé Minimalista**.

---

## 9. Página Medicamentos (Estrutura Conforme Modelo de Referência)
- **Hero Header**: Título centralizado branco "Medicamentos" e subtítulo "Todas as vantagens em contar com a InterFarma".
- **Seção "Confirma os medicamentos que trabalhamos"**:
  - Título em azul-marinho "Confirma os medicamentos que trabalhamos".
  - Campo de busca moderno com ícone de lupa 🔍 e filtragem instantânea em tempo real.
  - Grade com 3 colunas de cards/pills com cantos arredondados e nomes dos medicamentos em destaque verde/teal (`#178272`).
  - Interação de clique com feedback visual e redirecionamento direto para cotação.
- **Banner "Faça já seu pedido" + Captura de Leads + Rodapé Minimalista**.

---

## 10. Página Home / Inicial (Estrutura Conforme Modelo de Referência)
- **Hero Section**:
  - Fundo com gradiente suave azul-claro (`linear-gradient(180deg, #EBF5FA 0%, #FFFFFF 100%)`).
  - Lado esquerdo: Título "Quando você precisar, onde você estiver.", parágrafo descritivo de assessoria e importação de medicamentos de alto custo, botão teal destacado "Fale com nossos especialistas" e controles discretos de navegação `< >`.
  - Lado direito: Imagem recortada do médico com estetoscópio (`Group-589448.png`), crachá/selo de segurança ANVISA e balão flutuante de equipe de atendimento.
- **Três Cards de Ação Flutuantes**:
  - Card centralizado branco flutuante com bordas arredondadas (20px) e 3 colunas:
    1. *Solicite um orçamento*: Ícone teal de balão de mensagem + link em botão arredondado "Saiba mais &rarr;".
    2. *Lista de medicamentos*: Ícone teal de documento/arquivo + link em botão arredondado "Acesse &rarr;".
    3. *Perguntas frequentes*: Ícone teal de dúvida/interrogação + link em botão arredondado "Consultar &rarr;".
- **Seção "Um pouco sobre nós"**:
  - Foto de reunião da equipe em alta definição dimensionada proporcionalmente no desktop (altura de 490px) e com visualização 100% integral no mobile sem nenhum corte lateral ou superior (`height: auto; width: 100%; object-fit: contain;`), moldura azul suave ao fundo e detalhe orgânico amarelo com traços doodle (`/asserts/equipe-reuniao.jpg`).
  - Subtítulo teal "A InterFarma", título principal "Um pouco sobre nós." e texto: *"A InterFarma trabalha para auxiliar todos os brasileiros na importação de medicamentos, sem tributação alfandegária*."*
  - Lista de 4 cards com ícones circulares coloridos:
    1. *Estamos no mundo todo*: "Contamos com uma rede global de fornecedores, estrategicamente localizados."
    2. *Cuidamos de tudo*: "Nossa equipe gerencia todos os processos, cuidando de toda burocracia, até o medicamento chegar em suas mãos."
    3. *Compromisso com prazos*: "Somos comprometidos com os prazos e sabemos da importância de cumpri-los."
    4. *Certificação e infraestrutura*: "Somos comprometidos com os prazos e sabemos da importância de cumpri-los."
- **Seção "Como funciona nosso processo"**:
  - Subtítulo "Qualidade garantida" e título "Como funciona nosso processo".
  - Diagrama de 6 etapas em fluxo contínuo interligadas por setas azuis (Prescrição Médica &rarr; Fornecedores &rarr; Aprovação &darr; &larr; Autorização &larr; ANVISA – RF &larr; Garantia de Entrega).
- **Banner Panorâmico Unificado "Faça já seu pedido"**:
  - Banner em largura total presente em todas as páginas com a foto panorâmica da equipe de atendimento (`/asserts/equipe-panoramica.png`), com enquadramento perfeito sem cortes nos rostos, sobreposição escura suave, título centralizado branco "Faça já seu pedido" e botão destacado em tom Teal "Fale com nossos especialistas".
- **Seção de Captura de Leads & Rodapé Minimalista**:
  - Campo de e-mail "Informe seu e-mail que entraremos em contato" + rodapé horizontal com logotipo InterFarma, endereço, telefone, e-mail e ícones sociais.

---

## 11. Estrutura de Rotas e Páginas Institucionais
1. **Home (`/`)**: Estrutura 100% fiel ao layout de referência fotográfico.
2. **Como Funciona (`/como-funciona`)**: Fluxo em 6 etapas interligadas com setas.
3. **Diferenciais (`/diferenciais`)**: Licenças ANVISA, Tecnologia e Missão/Visão/Valores.
4. **Empresas (`/empresas`)**: Empresas atendidas em grade 3x2 e formulário corporativo.
5. **Medicamentos (`/medicamentos`)**: Catálogo em 3 colunas com busca instantânea.
6. **FAQ (`/faq`)**: Perguntas Frequentes com acordeões dinâmicos em teal.
7. **Blog (`/blog` e `/blog/:slug`)**: Listagem 3x2, paginação e visualização com botão Voltar.
8. **Contatos (`/contato`)**: Card de contato com campos em 2 colunas.

---

## 5. Painel Administrativo (CMS Completo com Opções por Página)
- **Autenticação**: Login com credenciais seguras (`admin@interfarma.com.br` / `admin123456`, JWT + bcryptjs).
- **Gerenciador Geral de Identidade Visual**:
  - Upload de logotipo (header e footer), favicon, slogans, CNPJ, dados de contato.
  - Seletor de paleta de cores primária, secundária e gradiente em tempo real.
- **Gerenciador Seção a Seção (Menu com Item Dedicado para Cada Página)**:
  - Menu com link direto para cada uma das 8 páginas (Home, Como Funciona, Diferenciais, Empresas, Medicamentos, FAQ, Blog, Contato).
  - Upload direto e substituição de imagens de fundo, banners e fotos de seções com preview imediato (220x130px), live update de URL e aplicação instantânea no site público através da API (`api.getPage()`).
- **Módulos do CMS**:
  - *Gerenciador de Medicamentos*: Cadastro, edição com foto, categorias, preços originais e cálculo automático de descontos.
  - *Gerenciador do Blog*: Criação e edição de posts, banners/capas com preview responsivo (260x145px) e live update, categorias, autores, tags, status de publicação e janela modal com rolagem suave e rodapé fixo.
  - *Gerenciador de FAQs*: Adicionar/remover/editar perguntas e respostas por categoria.
  - *Gerenciador de Mensagens*: Visualização de leads e mensagens enviadas pelos formulários com status (`unread`, `read`, `replied`).

---

## 6. Stack Tecnológica
- **Ambiente**: Docker + Docker Compose (100% conteinerizado com volumes mapeados).
- **Backend**: Node.js com Express, SQLite estruturado com `better-sqlite3` em modo WAL, Multer para upload de mídias, JWT e bcryptjs para autenticação.
- **Frontend**: HTML5 Semântico, CSS3 Moderno com Tokens de Design (variáveis CSS dinâmicas para alteração de cores pelo CMS), JavaScript moderno com roteamento SPA/Páginas, componentes reativos e animações fluidas.
- **Assets**: Imagens e mockups de referência disponíveis na pasta `asserts/`.

---

## 7. Regras de Projeto e Governança
- **Sempre atualizar**: `DOCUMENTACAO.md`, `PASSOS.md` e `CONTEXTO.md` ao final de cada alteração/etapa.
- **Controle de Passos**: Seguir rigorosamente a fila definida em `PASSOS.md` e aguardar a instrução do usuário para iniciar cada passo subsequente.
- **Git Commit**: Ao final de cada implementação ou correção, gerar a mensagem de commit correspondente.
