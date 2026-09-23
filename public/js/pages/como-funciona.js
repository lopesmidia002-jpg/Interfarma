import { api } from '../api.js';
import { showToast } from '../components.js';

export async function renderComoFuncionaPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div style="background: #FFFFFF;">
      <!-- HERO BANNER (FOTO COM TÍTULO E SUBTÍTULO) -->
      <section class="page-hero-header">
        <div class="page-hero-header-overlay"></div>
        <div class="page-hero-header-content">
          <h1 class="page-hero-header-title">
            Como funciona
          </h1>
          <p class="page-hero-header-subtitle">
            Confira todo o processo da InterFarma
          </p>
        </div>
      </section>

      <!-- TEXTO INTRODUTÓRIO -->
      <section style="padding: 3.5rem 1.5rem 2.5rem 1.5rem; text-align: center;">
        <div class="container" style="max-width: 760px;">
          <p style="font-size: 1.05rem; color: #64748B; line-height: 1.7; font-weight: 500;">
            A InterFarma trabalha para auxiliar todos os brasileiros na<br>
            importação de medicamentos, sem tributação alfandegária*.
          </p>
        </div>
      </section>

      <!-- FLUXO INTERATIVO DE 6 ETAPAS (MODELO S-SHAPE COM SETAS) -->
      <section style="padding: 1rem 1.5rem 4.5rem 1.5rem;">
        <div class="container" style="max-width: 1100px;">
          
          <!-- LINHA 1: PASSOS 1, 2 E 3 (ESQUERDA PARA DIREITA) -->
          <div class="flow-row-top" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
            
            <!-- PASSO 1: PRESCRIÇÃO MÉDICA -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 42px; height: 42px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">Prescrição Médica</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55;">
                Uma prescrição é uma rotina de cuidados com a saúde, implementados por um médico ou outro profissional de saúde qualificado, voltados para um paciente em específico.
              </p>
            </div>

            <!-- SETA 1 -> 2 -->
            <div class="flow-arrow-horizontal" style="color: #2CA4B0; font-size: 1.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#2CA4B0">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </div>

            <!-- PASSO 2: FORNECEDORES -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 42px; height: 42px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                </svg>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">Fornecedores</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55;">
                Verificamos a disponibilidade nos fornecedores exclusivos e qualificados espalhados em vários países que forneça o melhor custo benefício e menor prazo de embarque.
              </p>
            </div>

            <!-- SETA 2 -> 3 -->
            <div class="flow-arrow-horizontal" style="color: #2CA4B0; font-size: 1.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#2CA4B0">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </div>

            <!-- PASSO 3: APROVAÇÃO -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 42px; height: 42px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">Aprovação</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55;">
                Aprovação do orçamento e documentos do paciente disponíveis. Enviados através dos correios ou via emails. Com total discrição e confiabilidade com o paciente.
              </p>
            </div>

          </div>

          <!-- SETA DE TRANSIÇÃO PARA BAIXO (CANTO DIREITO) -->
          <div class="flow-arrow-down" style="display: flex; justify-content: flex-end; padding-right: 12%; margin-bottom: 1.5rem;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#2CA4B0">
              <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
            </svg>
          </div>

          <!-- LINHA 2: PASSOS 6, 5 E 4 (DIREITA PARA ESQUERDA) -->
          <div class="flow-row-bottom" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            
            <!-- PASSO 6: GARANTIA DE ENTREGA -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 42px; height: 42px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">Garantia de Entrega</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55;">
                Garantimos a entrega do medicamento para o paciente, hospitais e clínicas onde ele estiver. As entregas são realizadas em embalagens certificadas.
              </p>
            </div>

            <!-- SETA 5 <- 6 -->
            <div class="flow-arrow-horizontal" style="color: #2CA4B0; font-size: 1.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#2CA4B0">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </div>

            <!-- PASSO 5: ANVISA - RF -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 42px; height: 42px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">ANVISA – RF</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55;">
                Produto no Brasil necessita ser fiscalizado pelos setores responsáveis ANVISA – RF. Inspeção realizada, os mesmos fornecerão os documentos comprobatórios da anuência em cada setor.
              </p>
            </div>

            <!-- SETA 4 <- 5 -->
            <div class="flow-arrow-horizontal" style="color: #2CA4B0; font-size: 1.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#2CA4B0">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
            </div>

            <!-- PASSO 4: AUTORIZAÇÃO -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 42px; height: 42px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">Autorização</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55;">
                Autorizamos o fornecedor a embarcar o produto, certificamos com a origem o controle de temperatura e documentos para monitoramento da carga.
              </p>
            </div>

          </div>

        </div>
      </section>

      <!-- BANNER PANORÂMICO "FAÇA JÁ SEU PEDIDO" -->
      <section style="position: relative; background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('/asserts/equipe-panoramica.png') center center / cover no-repeat; padding: 5.5rem 1.5rem; text-align: center; color: #FFFFFF;">
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

