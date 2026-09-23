import { api } from '../api.js';
import { showToast } from '../components.js';

export async function renderEmpresasPage() {
  const app = document.getElementById('app');

  const clientTypes = [
    {
      title: 'Clínicas',
      desc: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.'
    },
    {
      title: 'Hospitais Públicos',
      desc: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.'
    },
    {
      title: 'Distribuidoras',
      desc: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.'
    },
    {
      title: 'Indústrias',
      desc: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.'
    },
    {
      title: 'Hospitais Privados',
      desc: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.'
    },
    {
      title: 'Secretarias de Saúde',
      desc: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.'
    }
  ];

  app.innerHTML = `
    <div style="background: #FFFFFF;">
      <!-- HERO BANNER DA PÁGINA (FOTO INSTITUCIONAL COM TÍTULO E SUBTÍTULO) -->
      <section class="page-hero-header">
        <div class="page-hero-header-overlay"></div>
        <div class="page-hero-header-content">
          <h1 class="page-hero-header-title">
            Empresas
          </h1>
          <p class="page-hero-header-subtitle">
            Todas as vantagens em contar com a InterFarma
          </p>
        </div>
      </section>

      <!-- SEÇÃO 1: EMPRESAS QUE ATENDEMOS (GRADE 3x2 CONFORME A FOTO) -->
      <section style="padding: 4rem 1rem 3rem 1rem; background: #FFFFFF;">
        <div class="container" style="max-width: 1140px;">
          
          <div style="text-align: center; margin-bottom: 3rem;">
            <h2 style="font-size: 1.85rem; font-weight: 800; color: #153258; letter-spacing: -0.01em; text-align: center;">
              Empresas que atendemos
            </h2>
          </div>

          <div class="empresas-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin-bottom: 3.5rem;">
            ${clientTypes.map(c => `
              <div class="client-type-card" style="background: #FFFFFF; border: 1px solid #EBF1F6; border-radius: 16px; padding: 2.25rem 1.75rem; text-align: center; box-shadow: 0 4px 16px rgba(0,0,0,0.03); transition: var(--transition);">
                <h3 style="font-size: 1.15rem; font-weight: 800; color: #178272; margin-bottom: 1rem; line-height: 1.35; text-align: center;">
                  ${c.title}
                </h3>
                <p style="font-size: 0.85rem; color: #718096; line-height: 1.6; text-align: center;">
                  ${c.desc}
                </p>
              </div>
            `).join('')}
          </div>

        </div>
      </section>

      <!-- SEÇÃO 2: FORMULÁRIO "ENTRE EM CONTATO" (CARD BRANCO FLUTUANTE CONFORME A FOTO) -->
      <section style="padding: 1rem 1rem 5rem 1rem; background: #FFFFFF;">
        <div class="container" style="max-width: 820px;">
          <div class="empresas-contact-card" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 20px; padding: 3rem 2.5rem 2.5rem 2.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.03); margin: 0 auto;">
            
            <!-- TÍTULO DO FORMULÁRIO -->
            <div style="text-align: center; margin-bottom: 2.5rem;">
              <h2 style="font-size: 1.95rem; font-weight: 800; color: #153258; letter-spacing: -0.01em; text-align: center;">
                Entre em contato
              </h2>
            </div>

            <!-- FORMULÁRIO COM GRADE DE CAMPOS -->
            <form id="empresas-contact-form" style="display: flex; flex-direction: column; gap: 1.25rem; width: 100%;">
              
              <!-- LINHA 1: NOME & EMPRESA -->
              <div class="form-grid-row">
                <div>
                  <input type="text" id="ep-name" required placeholder="Nome">
                </div>
                <div>
                  <input type="text" id="ep-company" placeholder="Empresa">
                </div>
              </div>

              <!-- LINHA 2: E-MAIL & TELEFONE -->
              <div class="form-grid-row">
                <div>
                  <input type="email" id="ep-email" required placeholder="E-mail">
                </div>
                <div>
                  <input type="tel" id="ep-phone" placeholder="Telefone">
                </div>
              </div>

              <!-- LINHA 3: MENSAGEM -->
              <div class="form-field-full">
                <textarea id="ep-message" rows="4" required placeholder="Mensagem" style="resize: vertical;"></textarea>
              </div>

              <!-- LINHA 4: BOTÃO ENVIAR (ALINHADO E RESPONSIVO) -->
              <div class="form-submit-container">
                <button type="submit" id="btn-submit-empresas-contact" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.925rem; padding: 0.8rem 2.5rem; border-radius: 6px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(44, 164, 176, 0.3); transition: all 0.2s ease;">
                  Enviar
                </button>
              </div>

            </form>

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

  // Bind do formulário de empresas
  const form = document.getElementById('empresas-contact-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-submit-empresas-contact');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
      const payload = {
        name: document.getElementById('ep-name')?.value.trim() || '',
        email: document.getElementById('ep-email')?.value.trim() || '',
        phone: document.getElementById('ep-phone')?.value.trim() || '',
        company: document.getElementById('ep-company')?.value.trim() || '',
        subject: 'Interesse Corporativo via Página Empresas',
        message: document.getElementById('ep-message')?.value.trim() || ''
      };

      await api.sendContact(payload);
      showToast('Sua solicitação foi enviada com sucesso! Entraremos em contato com sua empresa em breve.', 'success');
      form.reset();
    } catch (err) {
      showToast(err.message || 'Erro ao enviar mensagem. Tente novamente.', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Enviar';
    }
  });

  // Bind do formulário de lead newsletter
  bindLeadForm();
}

function bindLeadForm() {
  document.getElementById('lead-email-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('lead-email-input')?.value;
    if (!email) return;

    try {
      await api.sendContact({
        name: 'Lead Newsletter / Empresas',
        email: email,
        subject: 'Interesse via Empresas',
        message: 'Solicitação de contato via campo de e-mail da página Empresas.'
      });
      showToast('E-mail cadastrado com sucesso! Entraremos em contato em breve.', 'success');
      const input = document.getElementById('lead-email-input');
      if (input) input.value = '';
    } catch (err) {
      showToast('Erro ao enviar e-mail. Tente novamente.', 'error');
    }
  });
}

