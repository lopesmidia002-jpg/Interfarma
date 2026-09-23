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
      button_text: 'Fale com nossos especialistas',
      button_link: '/contato',
      image_url: '/asserts/Group-589448.png',
      badge_text: '',
      sort_order: 1,
      extra_data: null
    },
    {
      page_slug: 'home',
      section_key: 'about_summary',
      title: 'Um pouco sobre nós.',
      subtitle: 'A InterFarma trabalha para auxiliar todos os brasileiros na importação de medicamentos, sem tributação alfandegária*.',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '/asserts/equipe-reuniao.jpg',
      badge_text: 'A InterFarma',
      sort_order: 2,
      extra_data: JSON.stringify({
        items: [
          { icon: '/asserts/Group5576.png', title: 'Estamos no mundo todo', text: 'Contamos com uma rede global de fornecedores, estrategicamente localizados.' },
          { icon: '/asserts/Group5577.png', title: 'Cuidamos de tudo', text: 'Nossa equipe gerencia todos os processos, cuidando de toda burocracia, até o medicamento chegar em suas mãos.' },
          { icon: '/asserts/Group5578.png', title: 'Compromisso com prazos', text: 'Somos comprometidos com os prazos e sabemos da importância de cumpri-los.' },
          { icon: '/asserts/feather_award.png', title: 'Certificação e infraestrutura', text: 'Somos comprometidos com os prazos e sabemos da importância de cumpri-los.' }
        ]
      })
    },

    // COMO FUNCIONA
    {
      page_slug: 'como-funciona',
      section_key: 'hero',
      title: 'Como funciona',
      subtitle: 'Confira todo o processo da InterFarma',
      content: 'A InterFarma trabalha para auxiliar todos os brasileiros na importação de medicamentos, sem tributação alfandegária*.',
      button_text: '',
      button_link: '',
      image_url: '/asserts/hero-header-bg.png',
      badge_text: '',
      sort_order: 1,
      extra_data: null
    },
    {
      page_slug: 'como-funciona',
      section_key: 'steps',
      title: 'Fluxo do Processo InterFarma',
      subtitle: '6 etapas transparentes desde a prescrição até a entrega',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '',
      badge_text: 'Passo a Passo',
      sort_order: 2,
      extra_data: JSON.stringify({
        steps: [
          { step: '01', title: 'Prescrição Médica', desc: 'Uma prescrição é uma rotina de cuidados com a saúde, implementadas por um médico ou outro profissional de saúde qualificado, voltadas para um paciente em específico.' },
          { step: '02', title: 'Fornecedores', desc: 'Verificamos a disponibilidade nos fornecedores exclusivos e qualificados espalhados em vários países que forneça o melhor custo benefício e menor prazo de embarque.' },
          { step: '03', title: 'Aprovação', desc: 'Aprovação do orçamento e documentos do paciente disponíveis. Enviados através dos correios ou via emails. Com total discrição e confiabilidade com o paciente.' },
          { step: '04', title: 'Autorização', desc: 'Autorizamos o fornecedor a embarcar o produto, certificamos com a origem e controle de temperatura e documentos para monitoramento da carga.' },
          { step: '05', title: 'ANVISA – RF', desc: 'Produto no Brasil necessita ser fiscalizado pelos setores responsáveis ANVISA – RF. Inspeção realizada, os mesmos fornecerão os documentos comprobatórios da anuência em cada setor.' },
          { step: '06', title: 'Garantia de Entrega', desc: 'Garantimos a entrega do medicamento para o paciente, hospitais e clínicas onde ele estiver. As entregas são realizadas em embalagens certificadas.' }
        ]
      })
    },

    // DIFERENCIAIS
    {
      page_slug: 'diferenciais',
      section_key: 'hero',
      title: 'Diferenciais',
      subtitle: 'Todas as vantagens em contar com a InterFarma',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '/asserts/hero-header-bg.png',
      badge_text: '',
      sort_order: 1,
      extra_data: null
    },
    {
      page_slug: 'diferenciais',
      section_key: 'licencas',
      title: 'Possuímos todas as licenças exigidas pelos órgãos reguladores.',
      subtitle: 'Conformidade total e rigor técnico em todas as etapas de importação.',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '/asserts/supervisor-licencas.jpg',
      badge_text: 'Regulamentação',
      sort_order: 2,
      extra_data: JSON.stringify({
        licenses: [
          { title: 'ANVISA', desc: 'Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.' },
          { title: 'CRF / Farmacêutico', desc: 'Responsabilidade técnica integral com farmacêuticos habilitados em tempo integral.' },
          { title: 'Licença Sanitária', desc: 'Alvará sanitário estadual e municipal com vistorias periódicas atualizadas.' },
          { title: 'Certificado de Boas Práticas', desc: 'Certificação de boas práticas de distribuição, armazenagem e transporte.' },
          { title: 'Rastreabilidade', desc: 'Controle de lote e validade com sistema de auditoria eletrônica 100% integrado.' },
          { title: 'Cadeia Fria Qualificada', desc: 'Equipamentos calibrados e validados para medicamentos termolábeis.' }
        ]
      })
    },
    {
      page_slug: 'diferenciais',
      section_key: 'tecnologia',
      title: 'Tecnologia e Investimento',
      subtitle: 'Estrutura de ponta para garantir qualidade e segurança.',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '/asserts/analista-tecnologia.jpg',
      badge_text: 'Infraestrutura',
      sort_order: 3,
      extra_data: JSON.stringify({
        features: [
          { title: 'Nossa Estrutura', desc: 'Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011' },
          { title: 'Monitoramento da Carga', desc: 'Rastreamento contínuo em tempo real durante todo o trajeto internacional e nacional.' },
          { title: 'Software de Temperatura', desc: 'Sensores térmicos conectados que registram a curva de temperatura minuto a minuto.' },
          { title: 'Sistema de Dados', desc: 'Plataforma em nuvem com criptografia de ponta a ponta e compliance LGPD.' },
          { title: 'Veículo Próprio', desc: 'Frota dedicada e climatizada para transportes prioritários e urgentes.' },
          { title: 'Acompanhamento do Paciente', desc: 'Suporte humanizado e canal direto para esclarecimento de dúvidas e orientações.' }
        ]
      })
    },
    {
      page_slug: 'diferenciais',
      section_key: 'valores',
      title: 'Nossos Princípios & Valores',
      subtitle: 'Missão, Visão e Valores que guiam cada uma de nossas ações',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '',
      badge_text: 'Diretrizes',
      sort_order: 4,
      extra_data: JSON.stringify({
        values: [
          { title: 'Nossa Missão', desc: 'Proporcionar ao paciente a segurança, confiabilidade com honestidade durante a aquisição de medicamentos qualificados visando o melhor tratamento.' },
          { title: 'Nossa Visão', desc: 'Ser uma empresa de referência internacional com excelência na assessoria de importação de medicamentos.' },
          { title: 'Nossos Valores', desc: 'Honestidade, Respeito, Excelência, Integridade e Compromisso social.' }
        ]
      })
    },

    // EMPRESAS
    {
      page_slug: 'empresas',
      section_key: 'hero',
      title: 'Empresas',
      subtitle: 'Todas as vantagens em contar com a InterFarma',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '/asserts/hero-header-bg.png',
      badge_text: '',
      sort_order: 1,
      extra_data: null
    },
    {
      page_slug: 'empresas',
      section_key: 'empresas_atendidas',
      title: 'Empresas que atendemos',
      subtitle: 'Soluções customizadas para diferentes segmentos da saúde',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '',
      badge_text: 'Segmentos B2B',
      sort_order: 2,
      extra_data: JSON.stringify({
        clients: [
          { title: 'Clínicas', desc: 'Atendimento ágil para clínicas médicas e de infusão com fornecimento direto e pontual.' },
          { title: 'Hospitais Públicos', desc: 'Assessoria completa em processos de importação emergencial e licitações em saúde.' },
          { title: 'Distribuidoras', desc: 'Parcerias estratégicas para suprimento de produtos especiais e demandas específicas.' },
          { title: 'Indústrias', desc: 'Programas de benefícios corporativos e suporte farmacêutico empresarial.' },
          { title: 'Hospitais Privados', desc: 'Fornecimento contínuo de itens de alto custo e suporte em protocolos complexos.' },
          { title: 'Secretarias de Saúde', desc: 'Gestão transparente em demandas judiciais e atendimento prioritário a pacientes.' }
        ]
      })
    },

    // MEDICAMENTOS
    {
      page_slug: 'medicamentos',
      section_key: 'hero',
      title: 'Medicamentos',
      subtitle: 'Consulte medicamentos, genéricos e valores de referência disponíveis',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '/asserts/hero-header-bg.png',
      badge_text: '',
      sort_order: 1,
      extra_data: null
    },

    // FAQ
    {
      page_slug: 'faq',
      section_key: 'hero',
      title: 'Perguntas Frequentes (FAQ)',
      subtitle: 'Tire suas dúvidas sobre o funcionamento do benefício e suporte',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '/asserts/hero-header-bg.png',
      badge_text: '',
      sort_order: 1,
      extra_data: null
    },

    // BLOG
    {
      page_slug: 'blog',
      section_key: 'hero',
      title: 'Blog InterFarma',
      subtitle: 'Artigos, estudos e novidades sobre saúde, medicamentos e importação',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '/asserts/hero-header-bg.png',
      badge_text: '',
      sort_order: 1,
      extra_data: null
    },

    // CONTATO
    {
      page_slug: 'contato',
      section_key: 'hero',
      title: 'Entre em contato',
      subtitle: 'Todas as vantagens em contar com a InterFarma',
      content: '',
      button_text: '',
      button_link: '',
      image_url: '/asserts/hero-header-bg.png',
      badge_text: '',
      sort_order: 1,
      extra_data: null
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
