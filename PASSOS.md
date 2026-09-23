# PASSOS DO PROJETO - INTERFARMA

Este arquivo rastreia os passos de desenvolvimento por ordem de prioridade.
> **Regra**: Cada passo é executado e marcado com `[x]` quando concluído. O próximo passo só será iniciado após a confirmação do usuário.

---

## 📋 Lista de Passos por Prioridade

- [x] **Passo 1: Setup Inicial, Arquivos de Memória, Governança e Docker Base**
  - Criação de `.gitignore`, `DOCUMENTACAO.md`, `CONTEXTO.md`, `PASSOS.md` e regras do agente em `.agents/rules/`.
  - Definição da arquitetura de backend, banco de dados e frontend.

- [x] **Passo 2: Arquitetura Backend, Banco de Dados SQLite, API REST e Autenticação JWT**
  - Configuração do servidor Node.js/Express.
  - Criação do banco de dados SQLite com migrations/seeders automáticos (usuário admin padrão, configurações de site, seções das 8 páginas, FAQs, blog e medicamentos padrão).
  - Implementação do sistema de autenticação segura (JWT + bcrypt).
  - Rotas da API para leitura pública e CRUD administrativo (`/api/auth`, `/api/settings`, `/api/pages`, `/api/medicines`, `/api/blog`, `/api/faq`, `/api/contact`, `/api/admin/upload`).
  - Endpoint de upload de fotos/arquivos com Multer.

- [x] **Passo 3: Configuração do Ambiente Docker e Conteinerização**
  - Criação do `Dockerfile` multi-stage com compilação nativa de SQLite e Node.js 20.
  - Criação do `docker-compose.yml` com volumes persistentes para banco de dados (`./data`), uploads (`./uploads`) e mídias (`./asserts`).
  - Configuração de `.dockerignore` e Healthcheck integrado.

- [x] **Passo 4: Design System, Layout Global e Navegação das Páginas Institucionais**
  - Criação da folha de estilos global com tokens dinâmicos (`public/css/style.css`).
  - Criação do Header institucional responsivo com logo dinâmico, navegação e mobile drawer.
  - Criação do Footer institucional com canais de atendimento, WhatsApp flutuante e dados de CNPJ/redes.
  - Injeção dinâmica de tokens de cores vindos da API (`public/js/components.js` e `public/js/api.js`).

- [x] **Passo 5: Desenvolvimento das Páginas Institucionais (Frontend Dinâmico)**
  - **Página Home**: Hero com CTA, números de impacto, benefícios, destaques e depoimentos (`public/js/pages/home.js`).
  - **Página Como Funciona**: Diagrama e etapas do fluxo para usuários e empresas (`public/js/pages/como-funciona.js`).
  - **Página Diferenciais**: Pilares estratégicos, tecnologia e segurança (`public/js/pages/diferenciais.js`).
  - **Página Empresas**: Propostas de valor para RHs, formulário corporativo e planos (`public/js/pages/empresas.js`).
  - **Página Medicamentos**: Catálogo com busca em tempo real, categorias e detalhes (`public/js/pages/medicamentos.js`).
  - **Página FAQ**: Acordeão dinâmico categorizado com barra de pesquisa (`public/js/pages/faq.js`).
  - **Página Blog**: Listagem de artigos com paginação/cards e visualização individual de post (`public/js/pages/blog.js`).
  - **Página Contatos**: Formulário de contato funcional integrado à API, WhatsApp e informações de endereço/mapa (`public/js/pages/contato.js`).
  - **Roteamento SPA**: Integração de todas as rotas e atualização dinâmica de títulos SEO (`public/js/main.js`).

- [x] **Passo 6: Desenvolvimento do Painel Administrativo Completo (CMS)**
  - Tela de Login com autenticação JWT e validação de sessão (`public/admin/js/auth.js`).
  - Dashboard com métricas em tempo real, contatos recentes e atalhos rápidos (`public/admin/js/views/dashboard.js`).
  - **Módulo de Identidade & Cores**: Seletor de cores em tempo real, upload de logo principal, footer e favicon (`public/admin/js/views/settings.js`).
  - **Módulo de Edição de Páginas (Com Opção para Cada Item no Menu)**: Links dedicados na sidebar para cada uma das 8 páginas (Home, Como Funciona, Diferenciais, Empresas, Medicamentos, FAQ, Blog, Contato) permitindo editar todos os títulos, subtítulos, textos, imagens, botões e dados de qualquer seção (`public/admin/js/views/pages-editor.js`).
  - **Módulo de Medicamentos**: Tabela, busca, modal com upload de fotos e cálculo de descontos (`public/admin/js/views/medicines.js`).
  - **Módulo de Blog**: CRUD completo de artigos com upload de imagem de capa e formatação (`public/admin/js/views/blog.js`).
  - **Módulo de FAQs**: Gerenciamento de perguntas e respostas por categoria e ordenação (`public/admin/js/views/faqs.js`).
  - **Módulo de Mensagens**: Inbox de leads com alteração de status (`unread`, `read`, `replied`) e exclusão (`public/admin/js/views/messages.js`).

- [x] **Passo 7: Validação Completa, Testes E2E, Ajustes de Usabilidade Mobile e Entrega**
  - Testes completos de navegação institucional e responsividade realizados.
  - Teste de fluxo completo do CMS (alteração de cores, logos, textos e verificação em tempo real no site institucional).
  - Correção e otimização da navegação mobile: menu opaco branco nítido com foco acessível e backdrop com desfoque nativo da página ao fundo.
  - Ajuste de responsividade dos Hero Banners internos (`.page-hero-header`): enquadramento com foco em 73% para que ambas as pessoas da equipe apareçam por completo no modo mobile.
  - Centralização responsiva e padding equilibrado dos balões/cards flutuantes (Missão, Visão e Valores, Cards de Ação) em smartphones.
  - Centralização completa das seções e cards da página Empresas e Contato no modo mobile.
  - Correção do enquadramento dos inputs e textarea nos formulários, contidos 100% dentro dos cards brancos.
  - Centralização simétrica da foto da equipe na seção "Um pouco sobre nós" da Home no modo mobile.
  - Reformulação pixel-perfect da página Diferenciais idêntica à foto de referência (dupla coluna de licenças, foto com blob e backdrop azul, dupla coluna de tecnologia com ícones teal e foto do analista, card flutuante de valores).
  - Aperfeiçoamento da abertura e fechamento suave dos balões de FAQ (CSS Grid transitions, animação de chevron e isolamento de evento de clique no header).
  - Configuração padrão de todos os balões de FAQ iniciando 100% fechados tanto no modo desktop quanto no modo mobile, abrindo exclusivamente sob demanda quando clicados pelo usuário.
  - Substituição da foto da seção "Possuímos todas as licenças..." na página Diferenciais pela foto oficial do supervisor com capacete branco e tablet (`supervisor-licencas.jpg`).
  - Atualização da foto da seção "Tecnologia e Investimento" na página Diferenciais pela foto oficial do analista/gestor no computador (`analista-tecnologia.jpg`).
  - Redimensionamento e exibição de 3 cards no Blog em grid horizontal destacada com imagens ampliadas e responsividade.
  - Remoção da barra de numerais de paginação na página do Blog.
  - Correção do enquadramento do Hero Banner das páginas internas no modo desktop (`height: 360px; background-position: center 12%`) para visibilidade total da imagem de referência.
  - Remoção da seção de cards/banners de blog da página inicial (Home).
  - Correção e redimensionamento completo do modal "Editar Artigo do Blog" no Painel Administrativo (rolagem suave de todos os campos, rodapé fixo com botão Salvar e preview de banner bem dimensionado 260x145px com live update).
  - Substituição das 3 fotos de capa dos cards do Blog pela imagem do logo verde "Blog" (`asserts/blog-card-cover.jpg`).
  - Correção e aprimoramento do upload de fotos no Painel Administrativo com preview amplo, feedback de status e sincronização instantânea das imagens salvas no site público via API (`api.getPage()`).
  - Substituição da foto de fundo do banner panorâmico "Faça já seu pedido" pela nova imagem panorâmica da equipe (`asserts/equipe-panoramica.png`, `Rectangle2.png`).
  - Atualização da foto da seção "Tecnologia e Investimento" na página Diferenciais pela imagem do supervisor com capacete e tablet.
  - Substituição das fotos de fundo médicas/circulares dos banners pela foto panorâmica oficial da equipe.
  - Atualização da foto da seção "Possuímos todas as licenças exigidas pelos órgãos reguladores" na página Diferenciais pela imagem oficial do supervisor com capacete de segurança branco e tablet (`supervisor-licencas.jpg`, `Rectangle Copy 4.jpg`).
  - Implementação do Editor de Páginas completo e auditável para todas as 8 páginas do site com carregamento direto de fotos (Upload), preview instantâneo e campos de texto dinâmicos integrados à API.
  - Padronização visual e tipográfica no modo mobile para todos os inputs, textareas, rótulos e botões do Painel Administrativo.
  - Atualização da imagem da seção "Um pouco sobre nós." na Home pela foto oficial de referência da equipe com detalhe orgânico e moldura suave.
  - Implementação do fluxo de 6 etapas (Prescrição Médica, Fornecedores, Aprovação, Autorização, ANVISA - RF e Garantia de Entrega) com setas sólidas azuis em bloco (#0088CC) nas páginas Como Funciona e Home.
  - Atualização de `DOCUMENTACAO.md`, `CONTEXTO.md` e `PASSOS.md`.



