import { api } from '../api.js';
import { showToast } from '../components.js';

export async function renderComoFuncionaPage() {
  const app = document.getElementById('app');

  let pageData = null;
  try {
    pageData = await api.getPage('como-funciona');
  } catch (e) {
    pageData = null;
  }
  const sec = pageData?.data || {};

  const heroTitle = sec.hero?.title || 'Como funciona';
  const heroSubtitle = sec.hero?.subtitle || 'Confira todo o processo da InterFarma';
  const introText = sec.hero?.content || 'A InterFarma trabalha para auxiliar todos os brasileiros na<br>importação de medicamentos, sem tributação alfandegária*.';

  const defaultSteps = [
    { step: '01', title: 'Prescrição Médica', desc: 'Uma prescrição é uma rotina de cuidados com a saúde, implementadas por um médico ou outro profissional de saúde qualificado, voltadas para um paciente em específico.' },
    { step: '02', title: 'Fornecedores', desc: 'Verificamos a disponibilidade nos fornecedores exclusivos e qualificados espalhados em vários países que forneça o melhor custo benefício e menor prazo de embarque.' },
    { step: '03', title: 'Aprovação', desc: 'Aprovação do orçamento e documentos do paciente disponíveis. Enviados através dos correios ou via emails. Com total discrição e confiabilidade com o paciente.' },
    { step: '04', title: 'Autorização', desc: 'Autorizamos o fornecedor a embarcar o produto, certificamos com a origem e controle de temperatura e documentos para monitoramento da carga.' },
    { step: '05', title: 'ANVISA – RF', desc: 'Produto no Brasil necessita ser fiscalizado pelos setores responsáveis ANVISA – RF. Inspeção realizada, os mesmos fornecerão os documentos comprobatórios da anuência em cada setor.' },
    { step: '06', title: 'Garantia de Entrega', desc: 'Garantimos a entrega do medicamento para o paciente, hospitais e clínicas onde ele estiver. As entregas são realizadas em embalagens certificadas.' }
  ];

  const steps = (sec.steps?.extra_data?.steps && sec.steps.extra_data.steps.length > 0)
    ? sec.steps.extra_data.steps
    : defaultSteps;

  app.innerHTML = `
    <div style="background: #FFFFFF;">
      <!-- HERO BANNER (FOTO COM TÍTULO E SUBTÍTULO) -->
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

      <!-- TEXTO INTRODUTÓRIO -->
      <section style="padding: 3.5rem 1.5rem 2.5rem 1.5rem; text-align: center;">
        <div class="container" style="max-width: 760px;">
          <p style="font-size: 1.05rem; color: #64748B; line-height: 1.7; font-weight: 500;">
            ${introText.replace(/\n/g, '<br>')}
          </p>
        </div>
      </section>

      <!-- FLUXO INTERATIVO DE 6 ETAPAS (MODELO S-SHAPE COM SETAS AZUIS SÓLIDAS DA REFERÊNCIA) -->
      <section style="padding: 1rem 1.5rem 4.5rem 1.5rem;">
        <div class="container" style="max-width: 1100px;">
          
          <!-- LINHA 1: PASSOS 1, 2 E 3 (ESQUERDA PARA DIREITA) -->
          <div class="flow-row-top" style="display: flex; align-items: center; justify-content: space-between; gap: 1.25rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
            
            <!-- PASSO 1: PRESCRIÇÃO MÉDICA -->
            <div class="flow-step-card" style="flex: 1; min-width: 260px; background: #FFFFFF; border: 1px solid #EBF1F6; border-radius: 16px; padding: 2.25rem 1.35rem 1.85rem 1.35rem; text-align: center; position: relative; box-shadow: 0 4px 18px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #CCFBF1; color: #0D9488; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(13, 148, 136, 0.2);">
                <img src="/asserts/Group5804.png" alt="Prescrição Médica" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='🩺'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">${steps[0]?.title || defaultSteps[0].title}</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.6; margin: 0;">
                ${steps[0]?.desc || defaultSteps[0].desc}
              </p>
            </div>

            <!-- SETA 1 -> 2 (AZUL SÓLIDO BOLD) -->
            <div class="flow-arrow-horizontal" style="display: flex; align-items: center; justify-content: center; padding: 0 0.25rem; flex-shrink: 0;">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#0088CC">
                <path d="M4 10h9V6l7 6-7 6v-4H4v-4z"/>
              </svg>
            </div>

            <!-- PASSO 2: FORNECEDORES -->
            <div class="flow-step-card" style="flex: 1; min-width: 260px; background: #FFFFFF; border: 1px solid #EBF1F6; border-radius: 16px; padding: 2.25rem 1.35rem 1.85rem 1.35rem; text-align: center; position: relative; box-shadow: 0 4px 18px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #CCFBF1; color: #0D9488; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(13, 148, 136, 0.2);">
                <img src="/asserts/Group5805.png" alt="Fornecedores" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='💼'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">${steps[1]?.title || defaultSteps[1].title}</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.6; margin: 0;">
                ${steps[1]?.desc || defaultSteps[1].desc}
              </p>
            </div>

            <!-- SETA 2 -> 3 (AZUL SÓLIDO BOLD) -->
            <div class="flow-arrow-horizontal" style="display: flex; align-items: center; justify-content: center; padding: 0 0.25rem; flex-shrink: 0;">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#0088CC">
                <path d="M4 10h9V6l7 6-7 6v-4H4v-4z"/>
              </svg>
            </div>

            <!-- PASSO 3: APROVAÇÃO -->
            <div class="flow-step-card" style="flex: 1; min-width: 260px; background: #FFFFFF; border: 1px solid #EBF1F6; border-radius: 16px; padding: 2.25rem 1.35rem 1.85rem 1.35rem; text-align: center; position: relative; box-shadow: 0 4px 18px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #CCFBF1; color: #0D9488; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(13, 148, 136, 0.2);">
                <img src="/asserts/Group5806.png" alt="Aprovação" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='📄'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">${steps[2]?.title || defaultSteps[2].title}</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.6; margin: 0;">
                ${steps[2]?.desc || defaultSteps[2].desc}
              </p>
            </div>

          </div>

          <!-- SETA DE TRANSIÇÃO PARA BAIXO (3 -> 4, ALINHADA À DIREITA) -->
          <div class="flow-arrow-down" style="display: flex; justify-content: flex-end; padding-right: 14%; margin: 1.25rem 0;">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#0088CC">
              <path d="M10 4v9H6l6 7 6-7h-4V4h-4z"/>
            </svg>
          </div>

          <!-- LINHA 2: PASSOS 6, 5 E 4 (ORDEM VISUAL: GARANTIA <- ANVISA <- AUTORIZAÇÃO) -->
          <div class="flow-row-bottom" style="display: flex; align-items: center; justify-content: space-between; gap: 1.25rem; flex-wrap: wrap;">
            
            <!-- PASSO 6: GARANTIA DE ENTREGA -->
            <div class="flow-step-card" style="flex: 1; min-width: 260px; background: #FFFFFF; border: 1px solid #EBF1F6; border-radius: 16px; padding: 2.25rem 1.35rem 1.85rem 1.35rem; text-align: center; position: relative; box-shadow: 0 4px 18px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #CCFBF1; color: #0D9488; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(13, 148, 136, 0.2);">
                <img src="/asserts/Group5809.png" alt="Garantia de Entrega" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='🌐'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">${steps[5]?.title || defaultSteps[5].title}</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.6; margin: 0;">
                ${steps[5]?.desc || defaultSteps[5].desc}
              </p>
            </div>

            <!-- SETA 5 <- 6 (AZUL SÓLIDO BOLD) -->
            <div class="flow-arrow-horizontal" style="display: flex; align-items: center; justify-content: center; padding: 0 0.25rem; flex-shrink: 0;">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#0088CC">
                <path d="M20 14h-9v4l-7-6 7-6v4h9v4z"/>
              </svg>
            </div>

            <!-- PASSO 5: ANVISA - RF -->
            <div class="flow-step-card" style="flex: 1; min-width: 260px; background: #FFFFFF; border: 1px solid #EBF1F6; border-radius: 16px; padding: 2.25rem 1.35rem 1.85rem 1.35rem; text-align: center; position: relative; box-shadow: 0 4px 18px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #CCFBF1; color: #0D9488; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(13, 148, 136, 0.2);">
                <img src="/asserts/Group5808.png" alt="ANVISA - RF" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='🛡️'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">${steps[4]?.title || defaultSteps[4].title}</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.6; margin: 0;">
                ${steps[4]?.desc || defaultSteps[4].desc}
              </p>
            </div>

            <!-- SETA 4 <- 5 (AZUL SÓLIDO BOLD) -->
            <div class="flow-arrow-horizontal" style="display: flex; align-items: center; justify-content: center; padding: 0 0.25rem; flex-shrink: 0;">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#0088CC">
                <path d="M20 14h-9v4l-7-6 7-6v4h9v4z"/>
              </svg>
            </div>

            <!-- PASSO 4: AUTORIZAÇÃO -->
            <div class="flow-step-card" style="flex: 1; min-width: 260px; background: #FFFFFF; border: 1px solid #EBF1F6; border-radius: 16px; padding: 2.25rem 1.35rem 1.85rem 1.35rem; text-align: center; position: relative; box-shadow: 0 4px 18px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #CCFBF1; color: #0D9488; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(13, 148, 136, 0.2);">
                <img src="/asserts/Group5807.png" alt="Autorização" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='✅'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">${steps[3]?.title || defaultSteps[3].title}</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.6; margin: 0;">
                ${steps[3]?.desc || defaultSteps[3].desc}
              </p>
            </div>

          </div>

        </div>
      </section>

      <!-- SEÇÃO CARD "FAÇA JÁ SEU PEDIDO" (CONFORME DESIGN DE REFERÊNCIA) -->
      <section class="cf-cta-section">
        <div class="container">
          <div class="cf-cta-wrapper">
            <div class="cf-cta-card">
              
              <!-- FOTO DA EQUIPE À ESQUERDA -->
              <div class="cf-cta-image-wrapper">
                <img src="/asserts/equipe-sorrindo.jpg" alt="Equipe InterFarma" onerror="this.src='/asserts/Rectangle Copy 4.jpg';">
              </div>

              <!-- CONTEÚDO À DIREITA (TÍTULO + BOTÃO) -->
              <div class="cf-cta-content">
                <h2 class="cf-cta-title">
                  Faça já seu pedido
                </h2>
                <div>
                  <a href="/contato" class="cf-cta-btn" data-route="contato">
                    Fale com nossos especialistas
                  </a>
                </div>
              </div>

            </div>
          </div>
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
        name: 'Lead Newsletter / Como Funciona',
        email: email,
        subject: 'Interesse via Como Funciona',
        message: 'Solicitação de contato via campo de e-mail da página Como Funciona.'
      });
      showToast('E-mail cadastrado com sucesso! Entraremos em contato em breve.', 'success');
      const input = document.getElementById('lead-email-input');
      if (input) input.value = '';
    } catch (err) {
      showToast('Erro ao enviar e-mail. Tente novamente.', 'error');
    }
  });
}

