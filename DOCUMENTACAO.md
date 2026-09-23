# DOCUMENTAÇÃO DO PROJETO - INTELFARMA

## 1. Introdução e Propósito
A plataforma **Intelfarma (InterFarma)** é uma solução web corporativa e institucional desenvolvida para disponibilizar informações, catálogo de medicamentos, serviços de benefícios corporativos, artigos e canais de contato, integrada a um Sistema de Gerenciamento de Conteúdo (CMS) completo, 100% conteinerizada em Docker.

---

## 2. Arquitetura da Aplicação

### 2.1 Backend e API
- **Servidor Web**: Node.js com Express e arquitetura modular ESM (`server/index.js`).
- **Banco de Dados**: SQLite estruturado (`better-sqlite3`) localizado em `data/intelfarma.sqlite` com modo WAL e integridade referencial:
  - `users`: Usuários e administradores do painel com credenciais criptografadas via `bcryptjs`.
  - `site_settings`: Configurações globais (logos, cores primária/secundária, telefones, redes sociais, dados institucionais).
  - `page_sections`: Conteúdo dinâmico de cada seção das 8 páginas (títulos, subtítulos, textos, botões, imagens e JSONs estruturados).
  - `medicines`: Catálogo de medicamentos (nome, princípio ativo, laboratório, categoria, dosagem, apresentação, preços, descontos, fotos e destaque).
  - `blog_posts`: Artigos do blog (título, slug gerado automaticamente, resumo, conteúdo HTML, capa, autor, categoria e tags).
  - `faqs`: Perguntas frequentes categorizadas com ordenação e status.
  - `contact_messages`: Mensagens e leads enviados pelos formulários das páginas públicas.
- **Autenticação**: Tokens JWT assinados com expiração configurável e middleware de autorização nas rotas administrativas (`server/middleware/auth.js`).
- **Armazenamento de Mídias**: Diretório de uploads (`uploads/`) gerenciado com Multer (`server/middleware/upload.js`), com sanitização de nomes e limite de 10MB por arquivo.

### 2.2 Frontend e Interface
- **Barra Superior Dupla (Topbar + Navbar)**:
  - **Topbar Superior**: Faixa verde/teal com telefone (`+55 11 5088-1818`), e-mail (`contato@interfarma.com.br`) e redes sociais (Instagram e LinkedIn), visível exclusivamente no modo desktop e ocultada automaticamente no modo mobile (`max-width: 768px`).
  - **Navbar Principal**: Fundo suave com logotipo oficial vetorizado InterFarma, links de navegação (`Como funciona`, `Diferenciais`, `Empresas`, `Medicamentos`, `FAQ`, `Blog`), seletor de idioma `PT | EN` e botão destacado `Entrar em contato`. No modo mobile, o desfoque atua exclusivamente sobre a página ao fundo (`#app` e footer), mantendo o cabeçalho, logo e links 100% nítidos e legíveis.
- **Página Home (Conforme Layout de Referência)**:
  - **Hero Principal**: Título "Quando você precisar, onde você estiver.", texto de assessoria de medicamentos de alto custo, botão teal "Fale com nossos especialistas" e recorte do médico com selos flutuantes.
  - **3 Cards de Ação**: "Solicite um orçamento", "Lista de medicamentos" e "Perguntas frequentes" em card flutuante com bordas arredondadas e botões arredondados em azul suave.
  - **Seção "Um pouco sobre nós"**: Foto da equipe em composição com moldura azul suave e detalhe orgânico amarelo, com altura proporcional no desktop (490px) e ajuste fluido automático no mobile (`object-fit: contain; height: auto`) para que todas as pessoas da imagem fiquem 100% visíveis em smartphones.
  - **Seção "Como funciona nosso processo"**: Diagrama de 6 etapas interligadas com setas indicativas de fluxo contínuo.
  - **Hero Header Institucional**: Aplicado em todas as páginas internas (`/como-funciona`, `/diferenciais`, `/empresas`, `/medicamentos`, `/faq`, `/blog`, `/contato`) com a foto da equipe de logística e expedição (`/asserts/hero-header-bg.png`) 100% nítida, iluminada e visível, sem overlays escuros pesados e com excelente contraste tipográfico.
  - **Novidades - "Confira nosso blog"**: Grade 3x2 de artigos recentes e botão centralizado "Acesse o Blog".
  - **Seção de Leads e Rodapé**: Formulário de inscrição com campo de e-mail e rodapé minimalista horizontal.

---

## 3. Instruções de Execução com Docker

### 3.1 Executando a Aplicação
```bash
docker compose up -d
```

### 3.2 Acesso
- **Site Institucional**: `http://localhost:3000`
- **Página do Blog**: `http://localhost:3000/blog`
- **Painel Administrativo**: `http://localhost:3000/admin`
- **Credenciais Padrão Iniciais**: `admin@interfarma.com.br` / `admin123456`

---

## 4. Histórico de Versões
- **v1.0.0 a v1.6.0**: Arquitetura, backend, banco SQLite, rotas, Docker e CMS completo.
- **v1.7.0**: Atualização da barra superior dupla conforme modelo visual.
- **v1.8.0**: Reformulação completa da página do Blog conforme modelo fotográfico de referência (botão voltar, capa arredondada, texto, banner "Faça já seu pedido", newsletter e rodapé minimalista horizontal).
- **v1.9.0**: Reformulação completa de todas as páginas institucionais (Home, Como Funciona, Diferenciais, Empresas, FAQ, Medicamentos e Contatos) em estrita conformidade com as fotos de referência.
- **v1.9.1**: Otimização da usabilidade mobile: correção do acesso e navegação pelos links do menu mobile com clique instantâneo, painel drawer 100% branco opaco nítido e backdrop escurecedor com desfoque nativo fluido da página ao fundo.
- **v1.9.2**: Centralização e enquadramento completo do Hero Banner fotográfico (`hero-header-bg.png`) no modo mobile (`height: 220px; background-position: 73% center`), garantindo visibilidade total de ambas as pessoas da equipe na imagem e perfeita legibilidade dos títulos.
- **v1.9.3**: Centralização responsiva e ajuste de espaçamento dos textos dentro dos balões/cards flutuantes (Missão, Visão e Valores, Cards de Ação) no modo mobile, eliminando transbordamentos e garantindo alinhamento central harmônico.
- **v1.9.4**: Centralização e harmonização completa da página Empresas e Contato no modo mobile (grade responsiva vertical dos 6 cards de empresas sem transbordamento horizontal, card de formulário flutuante centralizado e botão de envio adaptado).
- **v1.9.5**: Correção definitiva do enquadramento dos campos de formulário no modo mobile (remoção de restrições rígidas de largura mínima, aplicação de box-sizing e contenção 100% fluida dentro do card branco).
- **v1.9.6**: Centralização simétrica da foto da equipe na seção "Um pouco sobre nós" da Home no modo mobile (`.about-team-container` com largura controlada, margem automática e ajuste dos adornos decorativos), garantindo enquadramento harmonioso no centro da tela.
- **v1.9.8**: Aprimoramento da abertura e fechamento dos balões de perguntas frequentes (FAQ) no modo mobile e desktop (transição fluida com CSS Grid, correção do colapso em navegadores mobile WebKit/Safari com `min-height: 0` e `visibility`, rotação suave do ícone chevron e manipulação inteligente de toque que permite abrir em qualquer ponto do card e fechar no cabeçalho sem bloquear a seleção de texto).
- **v1.9.9**: Reformulação pixel-perfect da página Diferenciais em estrita conformidade com o layout original de referência (2 colunas de licenças ANVISA, foto do supervisor com backdrop azul e blob amarelo à esquerda, 2 colunas de recursos de tecnologia com ícones teal e foto do analista com blob amarelo à direita, e card flutuante de Missão, Visão e Valores perfeitamente responsivo).
- **v1.9.10**: Configuração padrão de todos os balões de FAQ iniciando 100% fechados tanto no modo desktop quanto no modo mobile, abrindo exclusivamente sob demanda quando clicados pelo usuário.
- **v1.9.11**: Substituição da foto da seção "Possuímos todas as licenças..." na página Diferenciais pela imagem oficial do supervisor com capacete de segurança branco segurando tablet no armazém farmacêutico (`supervisor-licencas.jpg`).
- **v1.9.12**: Atualização da foto da seção "Tecnologia e Investimento" na página Diferenciais pela foto oficial do analista/gestor farmacêutico sorrindo na estação de trabalho com computador (`analista-tecnologia.jpg`).
- **v1.9.13**: Redimensionamento da página do Blog para exibir 3 cards destacados na grade horizontal com imagens ampliadas (`height: 220px`), cantos arredondados (`border-radius: 18px`), sombra moderna e responsividade para tablets e smartphones.
- **v1.9.14**: Remoção da barra de paginação numérica (`< 1 2 3 4 5 >`) da página do Blog para layout limpo e minimalista.
- **v1.9.15**: Ajuste do enquadramento do Hero Banner das páginas internas no modo desktop (`height: 360px; background-position: center 12%`), garantindo a visibilidade total das cabeças, óculos, caixas e prateleiras da equipe farmacêutica idêntico à imagem de referência.
- **v1.9.16**: Remoção da seção de banners/cards do Blog ("Novidades - Confira nosso blog") da página inicial (Home), conectando fluidamente a seção "Faça já seu pedido" diretamente à seção de captura de leads.
- **v1.9.17**: Correção do modal "Editar Artigo do Blog" no Painel Administrativo (`public/admin/js/views/blog.js` e `admin.css`), adicionando rolagem fluida e estruturada via Flexbox (`min-height: 0; overflow-y: auto`), rodapé fixo visível com botão "Salvar Artigo", preview de banner amplo e bem dimensionado (260x145px) com fallback visual, live preview ao digitar URL e botão para restaurar imagem padrão.
- **v1.9.18**: Substituição das imagens dos 3 banners/cards do Blog pela imagem oficial do ícone/logo verde "Blog" (`asserts/blog-card-cover.jpg`), atualizando o banco de dados SQLite, a página do Blog pública e os fallbacks visuais.
- **v1.9.19**: Correção completa do sistema de upload e sincronização de fotos no Painel Administrativo (`pages-editor.js`, `home.js`, `diferenciais.js`), adicionando preview amplo (220x130px) com feedback de upload em tempo real (`upload-status-text`), sincronização de URL ao digitar e consumo dinâmico das fotos salvas via API (`api.getPage()`) nas páginas do site institucional.
- **v1.9.20**: Substituição da foto de fundo do banner panorâmico "Faça já seu pedido" pela nova imagem panorâmica da equipe sorrindo (`asserts/equipe-panoramica.png`, `Rectangle2.png`), mantendo o enquadramento perfeito e harmonia visual em todas as páginas institucionais.
- **v1.9.21**: Atualização da foto da seção "Tecnologia e Investimento" na página Diferenciais pela imagem oficial do supervisor com capacete de segurança branco e tablet (`asserts/analista-tecnologia.jpg`, `asserts/Rectangle Copy 4-1.jpg`).
- **v1.9.22**: Sincronização e substituição total das imagens de fundo com recorte médico/círculos (`BG.jpg`, `Group58922.png`, `card-somos-o-meio.png`) pela nova foto panorâmica da equipe com 5 colaboradores, unificando os banners em todas as páginas e assets.
- **v1.9.24**: Atualização da foto da seção "Possuímos todas as licenças exigidas pelos órgãos reguladores" na página Diferenciais pela imagem oficial do supervisor com capacete de segurança branco e tablet (`supervisor-licencas.jpg`, `Rectangle Copy 4.jpg`), atualizando o banco de dados SQLite, o seed e os assets estáticos.









