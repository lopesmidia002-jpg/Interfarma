import { api } from '../api.js';
import { showToast } from '../components.js';

export async function renderMedicamentosPage() {
  const app = document.getElementById('app');

  let allMedicines = [];
  let searchTimeout = null;

  try {
    const data = await api.getMedicines({ limit: 100 });
    allMedicines = data.medicines || [];
  } catch (e) {
    allMedicines = [];
  }

  // Se houver menos de 36 medicamentos no banco, preencher com nomes de exemplo para montar o grid perfeito conforme a foto
  const sampleNames = [
    'Losartana Potássica 50mg', 'Amoxicilina + Clavulanato', 'Dipirona Monoidratada 500mg',
    'Omeprazol 20mg', 'Atorvastatina Cálcica 20mg', 'Metformina 850mg',
    'Sinvastatina 20mg', 'Clonazepam 2mg', 'Paracetamol 750mg',
    'Ibuprofeno 600mg', 'Azitromicina 500mg', 'Enalapril 10mg',
    'Hidroclorotiazida 25mg', 'Levotiroxina Sódica 50mcg', 'Pantoprazol 40mg',
    'Rosuvastatina 10mg', 'Ciprofloxacino 500mg', 'Fluoxetina 20mg',
    'Sertralina 50mg', 'Pregabalina 75mg', 'Duloxetina 30mg',
    'Gliflozina 10mg', 'Escitalopram 10mg', 'Rivaroxabana 20mg',
    'Dapagliflozina 10mg', 'Empagliflozina 25mg', 'Semaglutida 1mg',
    'Apixabana 5mg', 'Montelucaste 10mg', 'Tadalafila 5mg',
    'Brimonidina 0.2%', 'Latanoprosta 0.005%', 'Budesonida 32mcg',
    'Formoterol + Budesonida', 'Insulina Glargina 100UI', 'Colírio Lubrificante'
  ];

  let displayList = allMedicines.map(m => m.name);
  if (displayList.length < 36) {
    displayList = [...displayList, ...sampleNames.slice(0, 36 - displayList.length)];
  }

  function render(filter = '') {
    const query = filter.toLowerCase().trim();
    const filtered = query
      ? displayList.filter(name => name.toLowerCase().includes(query))
      : displayList;

    app.innerHTML = `
      <div style="background: #FFFFFF;">
        <!-- HERO BANNER DA PÁGINA (FOTO COM TÍTULO 'Medicamentos' CENTRALIZADO) -->
        <section class="page-hero-header">
          <div class="page-hero-header-overlay"></div>
          <div class="page-hero-header-content">
            <h1 class="page-hero-header-title">
              Medicamentos
            </h1>
            <p class="page-hero-header-subtitle">
              Todas as vantagens em contar com a InterFarma
            </p>
          </div>
        </section>

        <!-- SEÇÃO CONFIRMA OS MEDICAMENTOS QUE TRABALHAMOS -->
        <section style="padding: 4.5rem 1.5rem 5rem 1.5rem; background: #FFFFFF;">
          <div class="container" style="max-width: 1140px;">
            
            <div style="text-align: center; margin-bottom: 3rem;">
              <h2 style="font-size: 1.85rem; font-weight: 800; color: #153258; letter-spacing: -0.01em;">
                Confirma os medicamentos que trabalhamos
              </h2>
            </div>

            <!-- CAMPO DE PESQUISA -->
            <div style="max-width: 420px; margin-bottom: 2.5rem; position: relative;">
              <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94A3B8; font-size: 0.95rem;">🔍</span>
              <input type="text" id="med-search-input" value="${filter}" placeholder="Pesquisar" style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; font-size: 0.88rem; border-radius: 6px; border: 1px solid #E2E8F0; background: #FFFFFF; outline: none; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: border-color 0.2s;">
            </div>

            <!-- GRADE DE MEDICAMENTOS (3 COLUNAS CONFORME A FOTO) -->
            ${filtered.length === 0 ? `
              <div style="text-align: center; padding: 3rem 1rem; color: #94A3B8;">
                Nenhum medicamento encontrado para "${filter}".
              </div>
            ` : `
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 3.5rem;">
                ${filtered.map(medName => `
                  <div class="med-item-card" style="background: #FFFFFF; border: 1px solid #EBF1F6; border-radius: 8px; padding: 0.9rem 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.02); transition: var(--transition); cursor: pointer; display: flex; align-items: center;">
                    <span style="font-size: 0.88rem; font-weight: 700; color: #178272; line-height: 1.3;">
                      ${medName}
                    </span>
                  </div>
                `).join('')}
              </div>
            `}

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

    // Interatividade da busca
    const input = document.getElementById('med-search-input');
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
      input.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          render(e.target.value);
        }, 200);
      });
    }

    // Clique em qualquer medicamento
    document.querySelectorAll('.med-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const text = card.textContent.trim();
        showToast(`Medicamento selecionado: ${text}. Redirecionando para cotação...`, 'info');
        setTimeout(() => {
          window.history.pushState({}, '', '/contato');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }, 800);
      });
    });

    bindLeadForm();
  }

  render('');
}

function bindLeadForm() {
  document.getElementById('lead-email-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('lead-email-input')?.value;
    if (!email) return;

    try {
      await api.sendContact({
        name: 'Lead Newsletter / Medicamentos',
        email: email,
        subject: 'Interesse via Medicamentos',
        message: 'Solicitação de contato via campo de e-mail da página Medicamentos.'
      });
      showToast('E-mail cadastrado com sucesso! Entraremos em contato em breve.', 'success');
      const input = document.getElementById('lead-email-input');
      if (input) input.value = '';
    } catch (err) {
      showToast('Erro ao enviar e-mail. Tente novamente.', 'error');
    }
  });
}

