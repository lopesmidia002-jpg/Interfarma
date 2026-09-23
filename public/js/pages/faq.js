import { api } from '../api.js';
import { showToast } from '../components.js';

export async function renderFaqPage() {
  const app = document.getElementById('app');

  const defaultFaqs = [
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      answer: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.',
      open: false
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      answer: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.',
      open: false
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      answer: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.',
      open: false
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      answer: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.',
      open: false
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      answer: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.',
      open: false
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      answer: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.',
      open: false
    }
  ];

  // Tentar buscar do banco ou usar lista padrão do layout
  let faqs = defaultFaqs;
  try {
    const data = await api.getFaqs({ limit: 10 });
    if (data && data.faqs && data.faqs.length > 0) {
      faqs = data.faqs.map((f) => ({
        question: f.question || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        answer: f.answer || 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta.',
        open: false
      }));
    }
  } catch (err) {
    // Manter lista padrão
  }

  let pageData = null;
  try {
    pageData = await api.getPage('faq');
  } catch (e) {
    pageData = null;
  }
  const sec = pageData?.data || {};

  const heroTitle = sec.hero?.title || 'FAQ';
  const heroSubtitle = sec.hero?.subtitle || 'Tire suas dúvidas sobre nossos serviços';
  const heroBg = sec.hero?.image_url ? `background-image: url('${sec.hero.image_url}');` : '';

  app.innerHTML = `
    <div style="background: #FFFFFF;">
      <!-- HERO BANNER DA PÁGINA (FOTO COM TÍTULO 'FAQ' CENTRALIZADO) -->
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

      <!-- SEÇÃO PERGUNTAS FREQUENTES -->
      <section style="padding: 4.5rem 1.5rem 5rem 1.5rem; background: #FFFFFF;">
        <div class="container" style="max-width: 820px;">
          
          <div style="text-align: center; margin-bottom: 3rem;">
            <h2 style="font-size: 1.85rem; font-weight: 800; color: #153258; letter-spacing: -0.01em;">
              Perguntas Frequentes
            </h2>
          </div>

          <!-- LISTA DE ACORDEÕES -->
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${faqs.map((f, idx) => `
              <div class="faq-accordion-item ${f.open ? 'open' : ''}">
                <div class="faq-accordion-header" role="button" tabindex="0" aria-expanded="${f.open ? 'true' : 'false'}">
                  <h3 class="faq-accordion-title">
                    ${f.question}
                  </h3>
                  <div class="faq-chevron-wrapper">
                    <svg class="faq-chevron-icon" viewBox="0 0 24 24">
                      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                    </svg>
                  </div>
                </div>

                <div class="faq-accordion-content-wrapper">
                  <div class="faq-accordion-body-inner">
                    <div class="faq-accordion-body">
                      ${f.answer}
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
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

  // Interatividade suave do Accordion (Mobile e Desktop)
  document.querySelectorAll('.faq-accordion-item').forEach(item => {
    const header = item.querySelector('.faq-accordion-header');
    const bodyContent = item.querySelector('.faq-accordion-body');

    const toggle = (forceClose = false) => {
      const isAlreadyOpen = item.classList.contains('open');

      if (forceClose || isAlreadyOpen) {
        item.classList.remove('open');
        header?.setAttribute('aria-expanded', 'false');
      } else {
        // Fecha outros itens para manter o visual limpo e focado no mobile
        document.querySelectorAll('.faq-accordion-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.faq-accordion-header')?.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.add('open');
        header?.setAttribute('aria-expanded', 'true');
      }
    };

    // Ao clicar no cabeçalho ou em qualquer parte do card fechado
    item.addEventListener('click', (e) => {
      // Se clicou dentro do texto da resposta quando já está aberto, permite selecionar e não fecha
      if (item.classList.contains('open') && bodyContent && bodyContent.contains(e.target) && !header.contains(e.target)) {
        return;
      }
      toggle();
    });

    header?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  bindLeadForm();
}

function bindLeadForm() {
  document.getElementById('lead-email-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('lead-email-input')?.value;
    if (!email) return;

    try {
      await api.sendContact({
        name: 'Lead Newsletter / FAQ',
        email: email,
        subject: 'Interesse via FAQ',
        message: 'Solicitação de contato via campo de e-mail da página FAQ.'
      });
      showToast('E-mail cadastrado com sucesso! Entraremos em contato em breve.', 'success');
      const input = document.getElementById('lead-email-input');
      if (input) input.value = '';
    } catch (err) {
      showToast('Erro ao enviar e-mail. Tente novamente.', 'error');
    }
  });
}

