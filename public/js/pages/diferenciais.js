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

  const supervisorImg = sec.hero?.image_url || '/asserts/supervisor-licencas.jpg';
  const techImg = sec.features_summary?.image_url || '/asserts/analista-tecnologia.jpg';

  app.innerHTML = `
    <div style="background: #FFFFFF;">
      <!-- HERO BANNER DA PÁGINA (FOTO INSTITUCIONAL COM TÍTULO E SUBTÍTULO) -->
      <section class="page-hero-header">
        <div class="page-hero-header-overlay"></div>
        <div class="page-hero-header-content">
          <h1 class="page-hero-header-title">
            Diferenciais
          </h1>
          <p class="page-hero-header-subtitle">
            Todas as vantagens em contar com a InterFarma
          </p>
        </div>
      </section>

      <!-- SEÇÃO 1: LICENÇAS E ÓRGÃOS REGULADORES -->
      <section class="dif-section">
        <div class="container" style="max-width: 1140px;">
          <div class="dif-grid-layout">
            
            <!-- FOTO DO SUPERVISOR COM ADORNOS (ESQUERDA) -->
            <div class="dif-photo-container">
              <div class="dif-blob-tl"></div>
              <div class="dif-photo-backdrop-blue"></div>
              <div class="dif-photo-frame">
                <img src="${supervisorImg}" alt="Licenças InterFarma" onerror="this.src='/asserts/supervisor-licencas.jpg';">
              </div>
            </div>

            <!-- TEXTOS E LISTA DE LICENÇAS ANVISA (DIREITA - 2 COLUNAS) -->
            <div>
              <h2 class="dif-heading-navy">
                Possuímos todas as licenças exigidas pelos órgãos reguladores.
              </h2>

              <div class="dif-licenses-grid">
                <!-- ITEM 1 -->
                <div class="dif-license-item">
                  <h4 class="dif-license-title">ANVISA</h4>
                  <p class="dif-license-desc">
                    Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.
                  </p>
                </div>
                <!-- ITEM 2 -->
                <div class="dif-license-item">
                  <h4 class="dif-license-title">ANVISA</h4>
                  <p class="dif-license-desc">
                    Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.
                  </p>
                </div>
                <!-- ITEM 3 -->
                <div class="dif-license-item">
                  <h4 class="dif-license-title">ANVISA</h4>
                  <p class="dif-license-desc">
                    Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.
                  </p>
                </div>
                <!-- ITEM 4 -->
                <div class="dif-license-item">
                  <h4 class="dif-license-title">ANVISA</h4>
                  <p class="dif-license-desc">
                    Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.
                  </p>
                </div>
                <!-- ITEM 5 -->
                <div class="dif-license-item">
                  <h4 class="dif-license-title">ANVISA</h4>
                  <p class="dif-license-desc">
                    Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.
                  </p>
                </div>
                <!-- ITEM 6 -->
                <div class="dif-license-item">
                  <h4 class="dif-license-title">ANVISA</h4>
                  <p class="dif-license-desc">
                    Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.
                  </p>
                </div>
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
                Tecnologia e Investimento
              </h2>

              <div class="dif-features-grid">
                <!-- FEATURE 1 -->
                <div class="dif-feature-item">
                  <div class="dif-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CA4B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; max-width: 24px; max-height: 24px; display: block;"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  </div>
                  <h4 class="dif-feature-title">Nossa Estrutura</h4>
                  <p class="dif-feature-desc">
                    Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011
                  </p>
                </div>
                <!-- FEATURE 2 -->
                <div class="dif-feature-item">
                  <div class="dif-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CA4B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; max-width: 24px; max-height: 24px; display: block;"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  </div>
                  <h4 class="dif-feature-title">Monitoramento da Carga</h4>
                  <p class="dif-feature-desc">
                    Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011
                  </p>
                </div>
                <!-- FEATURE 3 -->
                <div class="dif-feature-item">
                  <div class="dif-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CA4B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; max-width: 24px; max-height: 24px; display: block;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                  </div>
                  <h4 class="dif-feature-title">Software de Monitoramento de Temperatura</h4>
                  <p class="dif-feature-desc">
                    Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011
                  </p>
                </div>
                <!-- FEATURE 4 -->
                <div class="dif-feature-item">
                  <div class="dif-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CA4B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; max-width: 24px; max-height: 24px; display: block;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <h4 class="dif-feature-title">Sistema de dados</h4>
                  <p class="dif-feature-desc">
                    Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011
                  </p>
                </div>
                <!-- FEATURE 5 -->
                <div class="dif-feature-item">
                  <div class="dif-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CA4B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; max-width: 24px; max-height: 24px; display: block;"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                  </div>
                  <h4 class="dif-feature-title">Veículo Próprio para Transporte</h4>
                  <p class="dif-feature-desc">
                    Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011
                  </p>
                </div>
                <!-- FEATURE 6 -->
                <div class="dif-feature-item">
                  <div class="dif-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CA4B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px; max-width: 24px; max-height: 24px; display: block;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <h4 class="dif-feature-title">Acompanhamento do Tratamento do Paciente</h4>
                  <p class="dif-feature-desc">
                    Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011
                  </p>
                </div>
              </div>
            </div>

            <!-- FOTO DO ANALISTA NO COMPUTADOR COM ADORNO (DIREITA) -->
            <div class="dif-photo-container">
              <div class="dif-blob-tr"></div>
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
              <h3 class="dif-value-title">Nossa Missão</h3>
              <p class="dif-value-desc">
                Proporcionar ao paciente a segurança, confiabilidade com honestidade durante a aquisição de medicamentos qualificados visando o melhor tratamento.
              </p>
            </div>

            <!-- VISÃO -->
            <div class="dif-value-col">
              <div class="dif-value-icon-box">
                <img src="/asserts/feather_eye.png" alt="Nossa Visão" onerror="this.src='/asserts/feather_globe.png';">
              </div>
              <h3 class="dif-value-title">Nossa Visão</h3>
              <p class="dif-value-desc">
                Ser uma empresa de referência internacional com excelência na assessoria de importação de medicamentos.
              </p>
            </div>

            <!-- VALORES -->
            <div class="dif-value-col">
              <div class="dif-value-icon-box">
                <img src="/asserts/feather_globe.png" alt="Nossos Valores" onerror="this.src='/asserts/feather_eye.png';">
              </div>
              <h3 class="dif-value-title">Nossos Valores</h3>
              <p class="dif-value-desc">
                Honestidade, Respeito, Excelência, Integridade e Compromisso social.
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- BANNER DE LARGURA TOTAL: FAÇA JÁ SEU PEDIDO -->
      <section style="position: relative; background: url('/asserts/Rectangle2.png') center/cover no-repeat; padding: 5.5rem 1rem; text-align: center; color: #FFFFFF;">
        <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0, 0, 0, 0.42); z-index: 1;"></div>
        <div class="container" style="position: relative; z-index: 2; max-width: 650px;">
          <h2 style="font-size: 2.35rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1.75rem; letter-spacing: -0.01em;">Faça já seu pedido</h2>
          <a href="/contato" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.95rem; padding: 0.85rem 2.25rem; border-radius: 6px; box-shadow: 0 4px 14px rgba(44, 164, 176, 0.4); text-decoration: none; display: inline-block;" data-route="contato">
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


