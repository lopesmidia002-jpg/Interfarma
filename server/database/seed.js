import bcrypt from 'bcryptjs';
import db from './db.js';
import { initSchema } from './schema.js';

export function runSeed() {
  initSchema();

  // 1. Usuário Admin Padrão
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (userCount.count === 0) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync('admin123456', salt);
    
    db.prepare(`
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `).run('Interfarma', 'admin@interfarma.com.br', hashedPassword, 'admin');

    console.log('👤 Usuário admin padrão criado: admin@interfarma.com.br / admin123456');
  } else {
    // Atualizar email e nome se estava com antigo
    db.prepare(`UPDATE users SET email = 'admin@interfarma.com.br', name = 'Interfarma' WHERE email = 'admin@intelfarma.com.br' OR email = 'admin@interfarma.com.br'`).run();
  }

  // 2. Configurações Globais do Site
  const settingsCount = db.prepare('SELECT COUNT(*) as count FROM site_settings').get();
  if (settingsCount.count === 0) {
    db.prepare(`
      INSERT INTO site_settings (
        site_name, slogan, logo_url, logo_footer_url, favicon_url,
        primary_color, secondary_color, accent_color, bg_color, text_color,
        phone, whatsapp, email, address, cnpj, social_links
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'Interfarma',
      'Soluções Inteligentes em Saúde e Benefícios Farmacêuticos',
      '/asserts/IF_Logo Vetorizado 1.png',
      '/asserts/IF_Logo Vetorizado 1.png',
      '/asserts/IF_Logo Vetorizado 1.png',
      '#0284C7', // Azul moderno primário
      '#0D9488', // Verde-água tecnológico
      '#0369A1',
      '#F8FAFC',
      '#0F172A',
      '(11) 3456-7890',
      '(11) 99999-8888',
      'contato@interfarma.com.br',
      'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
      '12.345.678/0001-90',
      JSON.stringify({
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
        youtube: 'https://youtube.com'
      })
    );
    console.log('⚙️ Configurações globais inseridas com sucesso.');
  } else {
    db.prepare(`UPDATE site_settings SET site_name = 'Interfarma' WHERE site_name = 'Intelfarma'`).run();
  }

  // 3. Seções Iniciais de Todas as 8 Páginas
  const sections = [
    // HOME
    {
      page_slug: 'home',
      section_key: 'hero',
      title: 'A revolução no acesso a medicamentos e gestão de saúde',
      subtitle: 'Conectamos empresas, colaboradores e farmácias em um ecossistema inteligente, econômico e 100% digital.',
      content: 'Mais de 35.000 farmácias credenciadas em todo o território nacional, com descontos de até 80% e entrega expressa.',
      button_text: 'Conheça Nossos Planos',
      button_link: '/empresas',
      image_url: '/asserts/Group-551222.png',
      badge_text: 'Plataforma Líder em Benefícios em Saúde',
      sort_order: 1,
      extra_data: JSON.stringify({
        stats: [
          { number: '+2.5M', label: 'Vidas atendidas' },
          { number: '35k+', label: 'Farmácias credenciadas' },
          { number: '80%', label: 'Economia média em medicamentos' },
          { number: '99.8%', label: 'Satisfação dos clientes' }
        ]
      })
    },
    {
      page_slug: 'home',
      section_key: 'features_summary',
      title: 'Por que escolher a Intelfarma?',
      subtitle: 'Desenvolvemos tecnologia proprietária para transformar o cuidado com a saúde em algo simples e acessível.',
      content: 'Tenha controle total, relatórios em tempo real e um canal de atendimento humanizado 24 horas por dia.',
      button_text: 'Ver todos os diferenciais',
      button_link: '/diferenciais',
      image_url: '/asserts/vaadin_doctor.svg',
      badge_text: 'Tecnologia & Cuidado',
      sort_order: 2,
      extra_data: JSON.stringify({
        items: [
          { icon: 'vaadin_doctor.svg', title: 'Suporte Médico e Farmacêutico', text: 'Orientação especializada para tirar dúvidas sobre receitas e posologia.' },
          { icon: 'ic_round-business-center.svg', title: 'Gestão Corporativa Inteligente', text: 'Painel completo para o RH acompanhar o uso de benefícios sem burocracia.' },
          { icon: 'ic_round-local-police.svg', title: 'Conformidade e Segurança Total', text: 'Processamento de dados em conformidade com a LGPD e altos padrões de segurança.' },
          { icon: 'mdi_hours-24.svg', title: 'Atendimento Ágil 24/7', text: 'Canais digitais e telefônicos sempre prontos para atender você.' }
        ]
      })
    },
    {
      page_slug: 'home',
      section_key: 'cta_banner',
      title: 'Pronto para transformar a saúde dos seus colaboradores?',
      subtitle: 'Fale com um dos nossos consultores e receba uma proposta personalizada para a sua empresa.',
      content: 'Implementação rápida em menos de 48 horas, sem custo de adesão.',
      button_text: 'Solicitar Proposta Agora',
      button_link: '/contato',
      image_url: '/asserts/equipe-panoramica.png',
      badge_text: 'Soluções Corporativas',
      sort_order: 3,
      extra_data: null
    },

    // COMO FUNCIONA
    {
      page_slug: 'como-funciona',
      section_key: 'hero',
      title: 'Simples, ágil e 100% digital',
      subtitle: 'Entenda como a Intelfarma facilita o acesso a medicamentos e simplifica a gestão de saúde para todos.',
      content: 'Desde o cadastro da empresa até a retirada ou entrega do medicamento, cuidamos de cada detalhe com transparência.',
      button_text: 'Começar Agora',
      button_link: '/empresas',
      image_url: '/asserts/Group-56144.png',
      badge_text: 'Passo a Passo Transparente',
      sort_order: 1,
      extra_data: JSON.stringify({
        steps: [
          { step: '01', title: 'Adesão Corporativa Simples', desc: 'A empresa cadastra seus colaboradores na plataforma com poucos cliques.' },
          { step: '02', title: 'Identificação no App ou Farmácia', desc: 'O colaborador apresenta o CPF ou cartão digital em qualquer farmácia credenciada.' },
          { step: '03', title: 'Desconto Imediato na Linha de Caixa', desc: 'O sistema autoriza o benefício instantaneamente com os melhores descontos do mercado.' },
          { step: '04', title: 'Relatórios e Gestão em Tempo Real', desc: 'O RH tem acesso a métricas consolidadas, sem surpresas na fatura.' }
        ]
      })
    },

    // DIFERENCIAIS
    {
      page_slug: 'diferenciais',
      section_key: 'hero',
      title: 'Nossos Diferenciais Competitivos',
      subtitle: 'A combinação perfeita entre tecnologia de ponta, ampla cobertura e compromisso humano.',
      content: 'Descubra por que mais de 500 empresas confiam na Intelfarma para cuidar de seus colaboradores.',
      button_text: 'Conheça nossos planos',
      button_link: '/empresas',
      image_url: '/asserts/supervisor-licencas.jpg',
      badge_text: 'Vantagens Exclusivas',
      sort_order: 1,
      extra_data: JSON.stringify({
        pillars: [
          { title: 'Maior Rede Credenciada', desc: 'Parceria com as maiores redes de farmácias do Brasil (Droga Raia, Drogasil, Pague Menos, São Paulo, Pacheco e milhares de farmácias independentes).' },
          { title: 'Economia Comprovada', desc: 'Negociação direta com grandes laboratórios farmacêuticos garantindo as menores tabelas de preço.' },
          { title: 'Integração Simples', desc: 'APIs modernas e integração direta com os principais sistemas de folha de pagamento e RH.' },
          { title: 'Auditoria e Compliance', desc: 'Processamento de receitas e regras de subsídio automatizadas com total conformidade.' }
        ]
      })
    },

    // EMPRESAS
    {
      page_slug: 'empresas',
      section_key: 'hero',
      title: 'Benefício em medicamentos que valoriza sua equipe',
      subtitle: 'Aumente o engajamento, reduza o absenteísmo e proporcione bem-estar real para seus colaboradores.',
      content: 'Planos flexíveis com subsídio total, parcial ou apenas desconto em folha, adaptados ao orçamento da sua empresa.',
      button_text: 'Simular Benefício Corporativo',
      button_link: '/contato',
      image_url: '/asserts/Group-589448.png',
      badge_text: 'Soluções para Recursos Humanos',
      sort_order: 1,
      extra_data: JSON.stringify({
        plans: [
          { name: 'Essencial', desc: 'Acesso à rede credenciada com descontos exclusivos de até 80% sem custo para a empresa.', features: ['Descontos em 35.000+ farmácias', 'Cartão digital para colaboradores', 'Suporte ao RH', 'Sem custo mensal'] },
          { name: 'Corporativo Plus', desc: 'Desconto em folha e subsídio customizável por nível ou cargo.', features: ['Tudo do Essencial', 'Subsídio flexível (20% a 100%)', 'Desconto em folha de pagamento', 'Relatórios analíticos de uso', 'Gerente de contas dedicado'] },
          { name: 'Enterprise Saúde 360', desc: 'Ecossistema completo com telemedicina, entrega domiciliar e gestão de crônicos.', features: ['Tudo do Plus', 'Programa de medicamentos contínuos', 'Telemedicina inclusa', 'Entrega delivery prioritária', 'Dashboard BI executivo'] }
        ]
      })
    },

    // MEDICAMENTOS
    {
      page_slug: 'medicamentos',
      section_key: 'hero',
      title: 'Guia e Catálogo de Medicamentos',
      subtitle: 'Consulte medicamentos, genéricos, valores de referência e descontos disponíveis na rede Intelfarma.',
      content: 'Busque pelo nome comercial, princípio ativo ou categoria terapêutica.',
      button_text: 'Consultar Rede Credenciada',
      button_link: '/como-funciona',
      image_url: '/asserts/Group-56088.png',
      badge_text: 'Economia e Transparência',
      sort_order: 1,
      extra_data: JSON.stringify({
        categories: ['Todos', 'Genéricos', 'Uso Contínuo', 'Analgésicos', 'Antibióticos', 'Cardiologia', 'Dermatologia', 'Vitaminas & Suplementos']
      })
    },

    // FAQ
    {
      page_slug: 'faq',
      section_key: 'hero',
      title: 'Perguntas Frequentes (FAQ)',
      subtitle: 'Tire suas dúvidas sobre o funcionamento do benefício, farmácias credenciadas, faturamento e suporte.',
      content: 'Não encontrou o que procurava? Nossa equipe está disponível no WhatsApp e nos canais de atendimento.',
      button_text: 'Falar com Atendimento',
      button_link: '/contato',
      image_url: '/asserts/Group-55999.png',
      badge_text: 'Central de Ajuda',
      sort_order: 1,
      extra_data: null
    },

    // BLOG
    {
      page_slug: 'blog',
      section_key: 'hero',
      title: 'Blog Intelfarma: Saúde, Gestão e Bem-Estar',
      subtitle: 'Artigos, estudos e dicas práticas de especialistas sobre saúde corporativa, medicamentos e qualidade de vida.',
      content: 'Fique por dentro das últimas tendências e novidades do setor de saúde.',
      button_text: 'Explorar Artigos',
      button_link: '#posts',
      image_url: '/asserts/InterFarma-Blog.jpg',
      badge_text: 'Conteúdo Especializado',
      sort_order: 1,
      extra_data: null
    },

    // CONTATO
    {
      page_slug: 'contato',
      section_key: 'hero',
      title: 'Entre em contato com nossa equipe',
      subtitle: 'Estamos prontos para esclarecer suas dúvidas, apresentar propostas corporativas ou oferecer suporte.',
      content: 'Preencha o formulário ou fale conosco através de nossos canais diretos.',
      button_text: 'Enviar Mensagem',
      button_link: '#form',
      image_url: '/asserts/InterFarma-Contato.jpg',
      badge_text: 'Atendimento Rápido',
      sort_order: 1,
      extra_data: JSON.stringify({
        horario: 'Segunda a Sexta das 08h às 18h / Suporte 24h via canal digital'
      })
    }
  ];

  const stmtSection = db.prepare(`
    INSERT OR REPLACE INTO page_sections (
      page_slug, section_key, title, subtitle, content,
      button_text, button_link, image_url, badge_text, extra_data, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const sec of sections) {
    stmtSection.run(
      sec.page_slug,
      sec.section_key,
      sec.title,
      sec.subtitle,
      sec.content,
      sec.button_text,
      sec.button_link,
      sec.image_url,
      sec.badge_text,
      sec.extra_data,
      sec.sort_order
    );
  }
  console.log('📄 Seções das 8 páginas inseridas/atualizadas com sucesso.');

  // 4. Medicamentos Iniciais Padrão
  const medCount = db.prepare('SELECT COUNT(*) as count FROM medicines').get();
  if (medCount.count === 0) {
    const defaultMeds = [
      {
        name: 'Dipirona Monoidratada',
        active_principle: 'Dipirona 500mg',
        laboratory: 'Medley / EMS / Neo Química',
        category: 'Analgésicos',
        dosage: '500mg',
        presentation: 'Caixa com 20 comprimidos',
        original_price: 18.50,
        discount_percentage: 65,
        final_price: 6.48,
        requires_prescription: 0,
        image_url: '/asserts/Group-56088.png',
        description: 'Medicamento analgésico e antipirético indicado para dores e febre.',
        featured: 1
      },
      {
        name: 'Losartana Potássica',
        active_principle: 'Losartana Potássica 50mg',
        laboratory: 'EMS Genéricos',
        category: 'Cardiologia',
        dosage: '50mg',
        presentation: 'Caixa com 30 comprimidos revestidos',
        original_price: 34.00,
        discount_percentage: 75,
        final_price: 8.50,
        requires_prescription: 1,
        image_url: '/asserts/Group-56088.png',
        description: 'Indicado para o tratamento da hipertensão arterial e insuficiência cardíaca.',
        featured: 1
      },
      {
        name: 'Amoxicilina + Clavulanato',
        active_principle: 'Amoxicilina 500mg + Clavulanato 125mg',
        laboratory: 'Eurofarma',
        category: 'Antibióticos',
        dosage: '500mg/125mg',
        presentation: 'Caixa com 21 comprimidos revestidos',
        original_price: 89.90,
        discount_percentage: 55,
        final_price: 40.45,
        requires_prescription: 1,
        image_url: '/asserts/Group-56088.png',
        description: 'Antibiótico de amplo espectro para infecções bacterianas do trato respiratório e urinário.',
        featured: 1
      },
      {
        name: 'Atorvastatina Cálcica',
        active_principle: 'Atorvastatina 20mg',
        laboratory: 'Aché Laboratórios',
        category: 'Cardiologia',
        dosage: '20mg',
        presentation: 'Caixa com 30 comprimidos',
        original_price: 65.00,
        discount_percentage: 70,
        final_price: 19.50,
        requires_prescription: 1,
        image_url: '/asserts/Group-56088.png',
        description: 'Auxilia na redução dos níveis elevados de colesterol total e triglicerídeos.',
        featured: 1
      },
      {
        name: 'Complexo Vitamínico Imuno B-Complex',
        active_principle: 'Vitaminas B1, B2, B6, B12, C e Zinco',
        laboratory: 'NutriLife Saúde',
        category: 'Vitaminas & Suplementos',
        dosage: '1000mg',
        presentation: 'Frasco com 60 cápsulas',
        original_price: 79.90,
        discount_percentage: 45,
        final_price: 43.95,
        requires_prescription: 0,
        image_url: '/asserts/Group-56088.png',
        description: 'Suplemento alimentar completo para fortalecimento da imunidade e disposição.',
        featured: 1
      },
      {
        name: 'Omeprazol',
        active_principle: 'Omeprazol 20mg',
        laboratory: 'Prati-Donaduzzi',
        category: 'Uso Contínuo',
        dosage: '20mg',
        presentation: 'Caixa com 28 cápsulas',
        original_price: 26.00,
        discount_percentage: 60,
        final_price: 10.40,
        requires_prescription: 0,
        image_url: '/asserts/Group-56088.png',
        description: 'Indicado para tratamento de gastrite, refluxo gastroesofágico e úlceras.',
        featured: 1
      }
    ];

    const stmtMed = db.prepare(`
      INSERT INTO medicines (
        name, active_principle, laboratory, category, dosage, presentation,
        original_price, discount_percentage, final_price, requires_prescription,
        image_url, description, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const m of defaultMeds) {
      stmtMed.run(
        m.name, m.active_principle, m.laboratory, m.category, m.dosage, m.presentation,
        m.original_price, m.discount_percentage, m.final_price, m.requires_prescription,
        m.image_url, m.description, m.featured
      );
    }
    console.log('💊 Catálogo de medicamentos iniciais inserido com sucesso.');
  }

  // 5. Posts do Blog
  const blogCount = db.prepare('SELECT COUNT(*) as count FROM blog_posts').get();
  if (blogCount.count === 0) {
    const defaultPosts = [
      {
        title: 'Como o Benefício de Medicamentos Reduz o Absenteísmo em até 30%',
        slug: 'como-beneficio-medicamentos-reduz-absenteismo',
        summary: 'Descubra como empresas líderes estão utilizando subsídios em saúde preventiva para manter suas equipes mais saudáveis e produtivas.',
        content: `
          <h2>A importância da saúde preventiva no ambiente corporativo</h2>
          <p>O absenteísmo e o presenteísmo são dois dos maiores desafios enfrentados pelos setores de Recursos Humanos na atualidade. Estudos recentes comprovam que colaboradores com acesso facilitado a tratamentos contínuos faltam menos e apresentam maior rendimento no trabalho.</p>
          <h3>O papel da Intelfarma</h3>
          <p>Ao conectar farmácias em todo o Brasil e subsidiar medicamentos essenciais, a Intelfarma garante que o colaborador nunca interrompa seu tratamento por questões financeiras.</p>
          <blockquote>"Acesso rápido e econômico a medicamentos é o pilar fundamental para uma política de bem-estar de alta eficácia."</blockquote>
        `,
        cover_image: '/asserts/blog-card-cover.jpg',
        author: 'Dra. Camila Ribeiro (Farmacêutica Chefe)',
        category: 'Gestão de RH & Saúde',
        tags: 'absenteísmo, benefícios corporativos, saúde preventiva',
        read_time: '5 min'
      },
      {
        title: 'Genéricos vs. Referência: O que você precisa saber para economizar com segurança',
        slug: 'genericos-vs-referencia-guia-economia',
        summary: 'Entenda os testes de bioequivalência e como os genéricos entregam a mesma eficácia por uma fração do preço.',
        content: `
          <h2>Mitos e verdades sobre medicamentos genéricos</h2>
          <p>No Brasil, os medicamentos genéricos passam por rigorosos testes na ANVISA para comprovar que possuem o mesmo princípio ativo, biodisponibilidade e eficácia do produto de referência.</p>
          <h3>Como economizar na farmácia credenciada</h3>
          <p>Com a Intelfarma, o sistema recomenda automaticamente opções genéricas equivalentes com descontos de até 80%, garantindo o melhor custo-benefício para sua família.</p>
        `,
        cover_image: '/asserts/blog-card-cover.jpg',
        author: 'Dr. Lucas Silveira',
        category: 'Medicamentos & Economia',
        tags: 'genéricos, economia, farmácia, anvisa',
        read_time: '4 min'
      },
      {
        title: 'Guia de Saúde do Coração: Acompanhamento e Cuidados Contínuos',
        slug: 'guia-saude-do-coracao-cuidados-continuos',
        summary: 'Dicas práticas para manter a pressão arterial controlada e a importância de nunca suspender a medicação sem orientação médica.',
        content: `
          <h2>Controle da Hipertensão</h2>
          <p>A hipertensão arterial é silenciosa e atinge mais de 30% dos adultos brasileiros. Manter hábitos saudáveis aliados ao uso correto dos medicamentos receitados é essencial para prevenir complicações cardiovasculares.</p>
        `,
        cover_image: '/asserts/blog-card-cover.jpg',
        author: 'Equipe Médica Intelfarma',
        category: 'Saúde & Bem-Estar',
        tags: 'coração, hipertensão, saúde contínua',
        read_time: '6 min'
      }
    ];

    const stmtBlog = db.prepare(`
      INSERT INTO blog_posts (
        title, slug, summary, content, cover_image, author, category, tags, read_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const b of defaultPosts) {
      stmtBlog.run(
        b.title, b.slug, b.summary, b.content, b.cover_image, b.author, b.category, b.tags, b.read_time
      );
    }
    console.log('📰 Posts padrão do blog inseridos com sucesso.');
  }

  // 6. FAQs Categorizadas
  const faqCount = db.prepare('SELECT COUNT(*) as count FROM faqs').get();
  if (faqCount.count === 0) {
    const defaultFaqs = [
      {
        question: 'Como funciona o desconto na farmácia credenciada?',
        answer: 'Basta informar seu CPF no caixa de qualquer farmácia da rede credenciada (como Raia, Drogasil, Pague Menos e redes parceiras) ou apresentar seu cartão virtual no aplicativo Intelfarma. O desconto é aplicado instantaneamente.',
        category: 'Utilização & Benefício',
        sort_order: 1
      },
      {
        question: 'Preciso de receita médica para comprar medicamentos?',
        answer: 'Medicamentos isentos de prescrição (MIPs) podem ser adquiridos livremente com desconto. Para medicamentos tarjados (tarja vermelha ou preta), é obrigatória a apresentação da receita médica válida no momento da compra.',
        category: 'Receitas & Medicamentos',
        sort_order: 2
      },
      {
        question: 'Como minha empresa pode contratar a Intelfarma?',
        answer: 'O processo é 100% digital e pode ser concluído em até 48 horas. Basta preencher o formulário na página de Empresas ou entrar em contato com nossa equipe comercial para desenhar o plano ideal para seus colaboradores.',
        category: 'Empresas & Contratação',
        sort_order: 3
      },
      {
        question: 'Quais farmácias fazem parte da rede credenciada?',
        answer: 'Nossa rede abrange mais de 35.000 farmácias em todo o Brasil, incluindo as principais redes nacionais, regionais e estabelecimentos independentes em todos os estados.',
        category: 'Rede Credenciada',
        sort_order: 4
      },
      {
        question: 'Como o RH acompanha o uso dos benefícios pelos colaboradores?',
        answer: 'Disponibilizamos um painel administrativo corporativo onde o gestor de RH acompanha o volume de utilizações, economia gerada, indicadores consolidados de saúde e relatórios de faturamento com total segurança e respeito à LGPD.',
        category: 'Empresas & Contratação',
        sort_order: 5
      }
    ];

    const stmtFaq = db.prepare(`
      INSERT INTO faqs (question, answer, category, sort_order)
      VALUES (?, ?, ?, ?)
    `);

    for (const f of defaultFaqs) {
      stmtFaq.run(f.question, f.answer, f.category, f.sort_order);
    }
    console.log('❓ FAQs iniciais inseridas com sucesso.');
  }
}

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  runSeed();
  console.log('🌱 Seed executado com êxito!');
}
