import { api } from '../api.js';
import { showToast } from '../components.js';

export async function renderContatoPage() {
  const app = document.getElementById('app');

  let pageData = null;
  try {
    pageData = await api.getPage('contato');
  } catch (e) {
    pageData = null;
  }
  const sec = pageData?.data || {};

  const heroTitle = sec.hero?.title || 'Entre em contato';
  const heroSubtitle = sec.hero?.subtitle || 'Todas as vantagens em contar com a InterFarma';
  const heroBg = sec.hero?.image_url ? `background-image: url('${sec.hero.image_url}');` : '';

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

      <!-- SEÇÃO FORMULÁRIO "ENTRE EM CONTATO" (CARD BRANCO FLUTUANTE CONFORME A FOTO) -->
      <section style="padding: 2.5rem 1rem 5rem 1rem; background: #FFFFFF;">
        <div class="container" style="max-width: 820px;">
          <div class="empresas-contact-card" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 20px; padding: 3rem 2.5rem 2.5rem 2.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.03); margin: 0 auto;">
            
            <!-- TÍTULO DO FORMULÁRIO -->
            <div style="text-align: center; margin-bottom: 2.5rem;">
              <h2 style="font-size: 1.95rem; font-weight: 800; color: #153258; letter-spacing: -0.01em; text-align: center;">
                Entre em contato
              </h2>
            </div>

            <!-- FORMULÁRIO COM GRADE DE CAMPOS -->
            <form id="contact-page-form" style="display: flex; flex-direction: column; gap: 1.25rem; width: 100%;">
              
              <!-- LINHA 1: NOME & EMPRESA -->
              <div class="form-grid-row">
                <div>
                  <input type="text" id="cp-name" required placeholder="Nome">
                </div>
                <div>
                  <input type="text" id="cp-company" placeholder="Empresa">
                </div>
              </div>

              <!-- LINHA 2: E-MAIL & TELEFONE -->
              <div class="form-grid-row">
                <div>
                  <input type="email" id="cp-email" required placeholder="E-mail">
                </div>
                <div>
                  <input type="tel" id="cp-phone" placeholder="Telefone">
                </div>
              </div>

              <!-- LINHA 3: MENSAGEM -->
              <div class="form-field-full">
                <textarea id="cp-message" rows="4" required placeholder="Mensagem" style="resize: vertical;"></textarea>
              </div>

              <!-- LINHA 4: BOTÃO ENVIAR (ALINHADO E RESPONSIVO) -->
              <div class="form-submit-container">
                <button type="submit" id="btn-submit-main-contact" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.925rem; padding: 0.8rem 2.5rem; border-radius: 6px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(44, 164, 176, 0.3); transition: all 0.2s ease;">
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

  // Bind do formulário principal de contato
  const form = document.getElementById('contact-page-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-submit-main-contact');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
      const payload = {
        name: document.getElementById('cp-name')?.value.trim() || '',
        email: document.getElementById('cp-email')?.value.trim() || '',
        phone: document.getElementById('cp-phone')?.value.trim() || '',
        company: document.getElementById('cp-company')?.value.trim() || '',
        subject: 'Mensagem via Formulário de Contato',
        message: document.getElementById('cp-message')?.value.trim() || ''
      };

      await api.sendContact(payload);
      showToast('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.', 'success');
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
        name: 'Lead Newsletter / Contatos',
        email: email,
        subject: 'Interesse via Contatos',
        message: 'Solicitação de contato via campo de e-mail da página Contatos.'
      });
      showToast('E-mail cadastrado com sucesso! Entraremos em contato em breve.', 'success');
      const input = document.getElementById('lead-email-input');
      if (input) input.value = '';
    } catch (err) {
      showToast('Erro ao enviar e-mail. Tente novamente.', 'error');
    }
  });
}

