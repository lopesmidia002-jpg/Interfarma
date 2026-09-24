import { api } from '../api.js';
import { showToast } from '../components.js';

export async function renderDiferenciaisPage() {
  const app = document.getElementById('app');

  let pageData = null;
  try {
    pageData = await api.getPage('diferenciais');
  } catch (e) {
    pageData = null;
  }
  const sec = pageData?.data || {};

  const heroTitle = sec.hero?.title || 'Diferenciais';
  const heroSubtitle = sec.hero?.subtitle || 'Todas as vantagens em contar com a InterFarma';
  const heroBg = sec.hero?.image_url ? `background-image: url('${sec.hero.image_url}');` : '';

  const supervisorImg = sec.licencas?.image_url || sec.hero?.image_url || '/asserts/supervisor-licencas.jpg';
  const licencasTitle = sec.licencas?.title || 'Possuímos todas as licenças exigidas pelos órgãos reguladores.';
  const defaultLicenses = [
    { title: 'ANVISA', desc: 'Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.' },
    { title: 'ANVISA', desc: 'Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.' },
    { title: 'ANVISA', desc: 'Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.' },
    { title: 'ANVISA', desc: 'Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.' },
    { title: 'ANVISA', desc: 'Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.' },
    { title: 'ANVISA', desc: 'Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.' }
  ];
  const licenses = (sec.licencas?.extra_data?.licenses && sec.licencas.extra_data.licenses.length > 0)
    ? sec.licencas.extra_data.licenses
    : defaultLicenses;

  const techImg = sec.tecnologia?.image_url || sec.features_summary?.image_url || '/asserts/analista-tecnologia.jpg';
  const techTitle = sec.tecnologia?.title || 'Tecnologia e Investimento';
  const defaultFeatures = [
    { title: 'Nossa Estrutura', desc: 'Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011' },
    { title: 'Monitoramento da Carga', desc: 'Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011' },
    { title: 'Software de Monitoramento de Temperatura', desc: 'Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011' },
    { title: 'Sistema de dados', desc: 'Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011' },
    { title: 'Veículo Próprio para Transporte', desc: 'Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011' },
    { title: 'Acompanhamento do Tratamento do Paciente', desc: 'Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011' }
  ];
  const features = (sec.tecnologia?.extra_data?.features && sec.tecnologia.extra_data.features.length > 0)
    ? sec.tecnologia.extra_data.features
    : defaultFeatures;

  const defaultValues = [
    { title: 'Nossa Missão', desc: 'Proporcionar ao paciente a segurança, confiabilidade com honestidade durante a aquisição de medicamentos qualificados visando o melhor tratamento.' },
    { title: 'Nossa Visão', desc: 'Ser uma empresa de referência internacional com excelência na assessoria de importação de medicamentos.' },
    { title: 'Nossos Valores', desc: 'Honestidade, Respeito, Excelência, Integridade e Compromisso social.' }
  ];
  const values = (sec.valores?.extra_data?.values && sec.valores.extra_data.values.length > 0)
    ? sec.valores.extra_data.values
    : defaultValues;

  app.innerHTML = `
    <div style="background: #FFFFFF;">
      <!-- HERO BANNER DA PÁGINA (FOTO INSTITUCIONAL COM TÍTULO E SUBTÍTULO) -->
      <section class="page-hero-header" style="${heroBg}">
        <div class="page-hero-header-overlay"></div>
        <div class="page-hero-header-content">
          <h1 class="page-hero-header-title">
            ${heroTitle}
          </h1>
          <p class="page-hero-header-subtitle">
            ${heroSubtitle}
          </p>
        </div>
      </section>

      <!-- SEÇÃO 1: LICENÇAS E ÓRGÃOS REGULADORES -->
      <section class="dif-section">
        <div class="container" style="max-width: 1140px;">
          <div class="dif-grid-layout">
            
            <!-- FOTO DO SUPERVISOR COM ADORNOS (ESQUERDA) -->
            <div class="dif-photo-container">
              <div class="dif-photo-backdrop-blue"></div>
              <div class="dif-photo-frame">
                <img src="${supervisorImg}" alt="Licenças InterFarma" onerror="this.src='/asserts/supervisor-licencas.jpg';">
              </div>
            </div>

            <!-- TEXTOS E LISTA DE LICENÇAS ANVISA (DIREITA - 2 COLUNAS) -->
            <div>
              <h2 class="dif-heading-navy">
                ${licencasTitle}
              </h2>

              <div class="dif-licenses-grid">
                ${licenses.map(lic => `
                  <div class="dif-license-item">
                    <h4 class="dif-license-title">${lic.title || 'ANVISA'}</h4>
                    <p class="dif-license-desc">
                      ${lic.desc || ''}
                    </p>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- SEÇÃO 2: TECNOLOGIA E INVESTIMENTO -->
      <section class="dif-section-alt">
        <div class="container" style="max-width: 1140px;">
          <div class="dif-grid-layout reverse">
            
            <!-- TEXTOS E GRADE DE RECURSOS TECNOLÓGICOS (ESQUERDA - 2 COLUNAS) -->
            <div>
              <h2 class="dif-heading-teal">
                ${techTitle}
              </h2>

              <div class="dif-features-grid">
                ${features.map(feat => `
                  <div class="dif-feature-item">
                    <div class="dif-feature-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CA4B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; max-width: 24px; max-height: 24px; display: block;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                    <h4 class="dif-feature-title">${feat.title || ''}</h4>
                    <p class="dif-feature-desc">
                      ${feat.desc || ''}
                    </p>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- FOTO DO ANALISTA NO COMPUTADOR COM ADORNO (DIREITA) -->
            <div class="dif-photo-container">
              <div class="dif-photo-frame">
                <img src="${techImg}" alt="Tecnologia InterFarma" onerror="this.src='/asserts/analista-tecnologia.jpg';">
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- SEÇÃO 3: CARD MISSÃO, VISÃO E VALORES (CARD BRANCO FLUTUANTE) -->
      <section class="dif-values-container">
        <div class="container" style="max-width: 1040px;">
          <div class="dif-values-card">
            
            <!-- MISSÃO -->
            <div class="dif-value-col">
              <div class="dif-value-icon-box">
                <img src="/asserts/feather_award.png" alt="Nossa Missão" onerror="this.src='/asserts/feather_globe.png';">
              </div>
              <h3 class="dif-value-title">${values[0]?.title || 'Nossa Missão'}</h3>
              <p class="dif-value-desc">
                ${values[0]?.desc || 'Proporcionar ao paciente a segurança, confiabilidade com honestidade durante a aquisição de medicamentos qualificados visando o melhor tratamento.'}
              </p>
            </div>

            <!-- VISÃO -->
            <div class="dif-value-col">
              <div class="dif-value-icon-box">
                <img src="/asserts/feather_eye.png" alt="Nossa Visão" onerror="this.src='/asserts/feather_globe.png';">
              </div>
              <h3 class="dif-value-title">${values[1]?.title || 'Nossa Visão'}</h3>
              <p class="dif-value-desc">
                ${values[1]?.desc || 'Ser uma empresa de referência internacional com excelência na assessoria de importação de medicamentos.'}
              </p>
            </div>

            <!-- VALORES -->
            <div class="dif-value-col">
              <div class="dif-value-icon-box">
                <img src="/asserts/feather_globe.png" alt="Nossos Valores" onerror="this.src='/asserts/feather_eye.png';">
              </div>
              <h3 class="dif-value-title">${values[2]?.title || 'Nossos Valores'}</h3>
              <p class="dif-value-desc">
                ${values[2]?.desc || 'Honestidade, Respeito, Excelência, Integridade e Compromisso social.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- BANNER PANORÂMICO "FAÇA JÁ SEU PEDIDO" (SOBREPOSTO PELO CARD DE VALORES) -->
      <section class="dif-banner-section">
        <div class="container" style="max-width: 800px; position: relative; z-index: 2;">
          <h2 style="font-size: 2.35rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1.5rem; letter-spacing: -0.01em;">
            Faça já seu pedido
          </h2>
          <a href="/contato" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.95rem; padding: 0.85rem 2.25rem; border-radius: 6px; box-shadow: 0 4px 14px rgba(44, 164, 176, 0.35); text-decoration: none; display: inline-block;" data-route="contato">
            Fale com nossos especialistas
          </a>
        </div>
      </section>

      <!-- SEÇÃO LEAD: INFORME SEU E-MAIL (FUNDO AZUL CLARO SUAVE CONFORME FOTO) -->
      <section style="background: #F4F9FD; padding: 4.5rem 1rem 5rem 1rem; text-align: center;">
        <div class="container" style="max-width: 650px;">
          <h2 style="font-size: 1.8rem; font-weight: 800; color: #153258; margin-bottom: 2rem; line-height: 1.35; letter-spacing: -0.01em;">
            Informe seu e-mail que<br>entraremos em contato
          </h2>

          <form id="lead-email-form" style="display: flex; gap: 0.75rem; justify-content: center; align-items: center; max-width: 480px; margin: 0 auto; flex-wrap: wrap;">
            <div style="position: relative; flex: 1; min-width: 250px;">
              <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94A3B8; font-size: 1.1rem; line-height: 1;">✉</span>
              <input type="email" id="lead-email-input" required placeholder="Endereço de e-mail" style="width: 100%; padding: 0.8rem 1rem 0.8rem 2.6rem; font-size: 0.9rem; border-radius: 6px; border: 1px solid #E2E8F0; background: #FFFFFF; outline: none; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
            </div>
            <button type="submit" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.9rem; padding: 0.8rem 2rem; border-radius: 6px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(44, 164, 176, 0.3);">
              Enviar
            </button>
          </form>
        </div>
      </section>
    </div>
  `;

  bindLeadForm();
}

function bindLeadForm() {
  document.getElementById('lead-email-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('lead-email-input')?.value;
    if (!email) return;

    try {
      await api.sendContact({
        name: 'Lead Newsletter / Diferenciais',
        email: email,
        subject: 'Interesse via Diferenciais',
        message: 'Solicitação de contato via campo de e-mail da página Diferenciais.'
      });
      showToast('E-mail cadastrado com sucesso! Entraremos em contato em breve.', 'success');
      const input = document.getElementById('lead-email-input');
      if (input) input.value = '';
    } catch (err) {
      showToast('Erro ao enviar e-mail. Tente novamente.', 'error');
    }
  });
}


