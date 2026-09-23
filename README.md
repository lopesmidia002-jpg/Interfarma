# 🏥 InterFarma - Portal Institucional & CMS Completo

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3_Tokens-1572B6?style=for-the-badge&logo=css3&logoColor=white)

Plataforma web corporativa de alto padrão para o setor farmacêutico e de saúde corporativa, integrada a um **Sistema de Gerenciamento de Conteúdo (CMS)** completo e 100% conteinerizada em **Docker**.

---

## 🌟 Funcionalidades Principais

### 🌐 1. Portal Institucional Público (SPA Responsiva)
- **Home**: Hero section dinâmica com controle de especialistas, cards flutuantes de ação rápida, seção *"Um pouco sobre nós"* proporcional, diagrama de fluxo de processos em 6 etapas e captura de leads.
- **Como Funciona**: Fluxo contínuo em 6 etapas (Prescrição Médica &rarr; Fornecedores &rarr; Aprovação &rarr; Autorização &rarr; ANVISA/RF &rarr; Garantia de Entrega) e banner de pedido.
- **Diferenciais**: Pilares regulatórios (ANVISA), tecnologia e monitoramento térmico, fotos oficiais e card de Missão, Visão e Valores.
- **Empresas**: Soluções B2B para RHs, operadoras e distribuidores, com formulário corporativo integrado.
- **Medicamentos**: Catálogo com busca e filtragem instantânea em tempo real e categorias farmacêuticas.
- **FAQ**: Perguntas frequentes em acordeões fluidos via CSS Grid, com animação e suporte a toque no mobile.
- **Blog**: Grade destacada de 3 artigos com imagens ampliadas, visualização individual de post com botão voltar e sem numerais de paginação.
- **Contato**: Formulário integrado para envio de mensagens e leads diretamente ao CMS.

---

### 🔒 2. Painel Administrativo Completo (CMS)
- **Autenticação Segura**: Login via JWT com middleware de proteção e expiração configurável.
- **Módulo de Identidade & Cores**: Seletor de paleta de cores (primária, secundária, destaque) com aplicação em tempo real via CSS Variables, upload de logotipo e favicon.
- **Editor de Páginas Seção por Seção**: Menu dedicado para editar textos, títulos, subtítulos, botões e imagens de qualquer seção das 8 páginas públicas.
- **Upload de Fotos & Mídias**: Gerenciamento de uploads com Multer, preview responsivo (220x130px) com live update de URL e sincronização instantânea no site.
- **Módulo de Medicamentos**: Gestão de catálogo, cálculo automático de desconto e modal com foto.
- **Módulo de Blog**: CRUD completo de artigos com capas em destaque, categorias, autores e formatação HTML.
- **Módulo de Perguntas Frequentes (FAQ)**: Gerenciamento ordenado por categoria.
- **Inbox de Mensagens & Leads**: Caixa de entrada de contatos com alteração de status (`unread`, `read`, `replied`).

---

## 🚀 Como Executar o Projeto com Docker

### Pré-requisitos
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados na máquina.

### Passo 1: Clonar o Repositório
```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd Intelfarmaa
```

### Passo 2: Subir a Aplicação em Docker
```bash
docker compose up -d --build
```

### Passo 3: Acessar a Aplicação
- **Site Institucional**: [http://localhost:3000](http://localhost:3000)
- **Página do Blog**: [http://localhost:3000/blog](http://localhost:3000/blog)
- **Painel Administrativo (CMS)**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Healthcheck da API**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## 🔑 Credenciais Padrão de Acesso ao Painel

| Campo | Valor Padrão |
|---|---|
| **E-mail** | `admin@interfarma.com.br` |
| **Senha** | `admin123456` |

---

## 📁 Estrutura de Diretórios

```plaintext
Intelfarmaa/
├── asserts/                  # Imagens e vetores estáticos de alta resolução
├── data/                     # Banco de dados SQLite persistente (intelfarma.sqlite)
├── public/                   # Frontend público e SPA institucional
│   ├── admin/                # Painel Administrativo CMS (HTML, CSS e Views JS)
│   ├── css/                  # Estilos globais e tokens de design (style.css)
│   └── js/                   # Controladores e páginas SPA (home.js, blog.js, etc.)
├── server/                   # Backend Node.js / Express
│   ├── database/             # Schema SQLite e Seeders automáticos
│   ├── middleware/           # Middlewares de autenticação JWT e upload Multer
│   ├── routes/               # Rotas REST da API (auth, pages, blog, medicines, etc.)
│   ├── config.js             # Configurações de ambiente
│   └── index.js              # Servidor Express principal
├── uploads/                  # Mídias e imagens enviadas pelo CMS
├── Dockerfile                # Configuração multi-stage de compilação Docker
├── docker-compose.yml        # Orquestração de contêineres e volumes persistentes
├── CONTEXTO.md               # Contexto detalhado de regras e arquitetura
├── DOCUMENTACAO.md           # Histórico de versões e especificações
├── PASSOS.md                 # Rastreamento de etapas de desenvolvimento
└── README.md                 # Visão geral do projeto
```

---

## 🛠️ Stack Tecnológica

- **Servidor & Backend**: Node.js 20, Express, `better-sqlite3`, `bcryptjs`, `jsonwebtoken`, `multer`, `cors`.
- **Banco de Dados**: SQLite estruturado com integridade referencial e modo WAL.
- **Frontend**: HTML5 Semântico, Vanilla CSS3 com tokens de tema reativos e Vanilla JavaScript modular (ESM).
- **Conteinerização**: Docker, Docker Compose com volume mapping e Healthcheck integrado.

---

## 📄 Licença e Governança
Este projeto é de uso exclusivo corporativo da **InterFarma / Intelfarma**. Todos os direitos reservados.
