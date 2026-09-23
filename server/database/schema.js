import db from './db.js';

export function initSchema() {
  db.exec(`
    -- Tabela de Usuários Administrativos
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Configurações Globais do Site (Identidade visual, cores, contatos)
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      site_name TEXT NOT NULL DEFAULT 'Intelfarma',
      slogan TEXT DEFAULT 'Soluções Inteligentes em Saúde e Benefícios Farmacêuticos',
      logo_url TEXT DEFAULT '/asserts/IF_Logo Vetorizado 1.png',
      logo_footer_url TEXT DEFAULT '/asserts/IF_Logo Vetorizado 1.png',
      favicon_url TEXT DEFAULT '/asserts/IF_Logo Vetorizado 1.png',
      primary_color TEXT DEFAULT '#1E40AF',
      secondary_color TEXT DEFAULT '#0D9488',
      accent_color TEXT DEFAULT '#2563EB',
      bg_color TEXT DEFAULT '#F8FAFC',
      text_color TEXT DEFAULT '#0F172A',
      phone TEXT DEFAULT '(11) 3456-7890',
      whatsapp TEXT DEFAULT '(11) 99999-8888',
      email TEXT DEFAULT 'contato@intelfarma.com.br',
      address TEXT DEFAULT 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
      cnpj TEXT DEFAULT '12.345.678/0001-90',
      social_links TEXT DEFAULT '{"facebook":"#","instagram":"#","linkedin":"#","youtube":"#"}',
      custom_css TEXT DEFAULT '',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Seções e Conteúdo de Todas as Páginas
    CREATE TABLE IF NOT EXISTS page_sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_slug TEXT NOT NULL,
      section_key TEXT NOT NULL,
      title TEXT,
      subtitle TEXT,
      content TEXT,
      button_text TEXT,
      button_link TEXT,
      image_url TEXT,
      badge_text TEXT,
      extra_data TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(page_slug, section_key)
    );

    -- Tabela de Medicamentos
    CREATE TABLE IF NOT EXISTS medicines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      active_principle TEXT,
      laboratory TEXT,
      category TEXT NOT NULL,
      dosage TEXT,
      presentation TEXT,
      original_price REAL DEFAULT 0,
      discount_percentage REAL DEFAULT 0,
      final_price REAL DEFAULT 0,
      requires_prescription INTEGER DEFAULT 0,
      image_url TEXT,
      description TEXT,
      featured INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela do Blog
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      summary TEXT,
      content TEXT NOT NULL,
      cover_image TEXT,
      author TEXT DEFAULT 'Equipe Intelfarma',
      category TEXT DEFAULT 'Saúde & Bem-Estar',
      tags TEXT,
      read_time TEXT DEFAULT '4 min',
      is_published INTEGER DEFAULT 1,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de FAQs
    CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT DEFAULT 'Geral',
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Tabela de Mensagens e Leads de Contato
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('✅ Esquema do banco de dados SQLite inicializado com sucesso.');
}
