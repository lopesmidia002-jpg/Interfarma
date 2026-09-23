import { api } from '../api.js';
import { showToast } from '../components.js';

export async function renderMedicamentoDetalhesPage(param) {
  const app = document.getElementById('app');

  let medData = null;
  const decodedParam = decodeURIComponent(param || '').replace(/-/g, ' ').trim();

  try {
    // Buscar da API se existir
    medData = await api.getMedicine(decodedParam);
  } catch (e) {
    medData = null;
  }

  // Nome formatado para exibição
  const displayName = medData?.name || (decodedParam ? (decodedParam.charAt(0).toUpperCase() + decodedParam.slice(1)) : 'Nome do medicamento');

  // Mapeamento de detalhes padrão / enriquecimento contextual baseado no modelo de referência
  const defaultDetails = {
    pathologies: medData?.description || 'Câncer de Próstata Metastático',
    active_principle: medData?.active_principle || displayName.split(' ')[0] || 'Abiraterone Acetate',
    specialties: medData?.category || 'Oncologia, Urologia',
    image_url: medData?.image_url || '/asserts/Group-55999.png'
  };

  app.innerHTML = `
    <div style="background: #FFFFFF;">
      
      <!-- ÁREA PRINCIPAL DE DETALHES DO MEDICAMENTO -->
      <section style="padding: 3rem 1.5rem 4.5rem 1.5rem; background: #FFFFFF;">
        <div class="container" style="max-width: 1140px;">
          
          <!-- BOTÃO VOLTAR -->
          <div style="margin-bottom: 2.25rem;">
            <button id="btn-voltar-medicamentos" class="btn" style="background-color: #64748B; color: #FFFFFF; font-weight: 700; font-size: 0.9rem; padding: 0.65rem 1.85rem; border-radius: 6px; border: none; cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 2px 6px rgba(100, 116, 139, 0.25);">
              Voltar
            </button>
          </div>

          <!-- FOTO DO MEDICAMENTO (QUADRADA COM BORDAS ARREDONDADAS) -->
          <div style="width: 190px; height: 190px; border-radius: 18px; overflow: hidden; margin-bottom: 2rem; box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05); background: #FFFFFF; border: 1px solid #EBF1F6; display: flex; align-items: center; justify-content: center;">
            <img src="${defaultDetails.image_url}" alt="${displayName}" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.src='/asserts/Group-55999.png';">
          </div>

          <!-- NOME DO MEDICAMENTO (TÍTULO EM VERDE/TEAL) -->
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #178272; margin-bottom: 2.25rem; letter-spacing: -0.01em; line-height: 1.3;">
            ${displayName}
          </h1>

          <!-- GRADE DE 3 COLUNAS DE ESPECIFICAÇÕES -->
          <div class="med-details-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; max-width: 960px; margin-bottom: 3.5rem;">
            
            <!-- COLUNA 1: PATOLOGIAS -->
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 800; color: #153258; margin-bottom: 0.5rem;">Patologias:</h4>
              <div style="font-size: 0.82rem; color: #718096; line-height: 1.65;">
                ${defaultDetails.pathologies}<br>
                Princípio ativo: ${defaultDetails.active_principle}<br>
                Especialidades:<br>
                ${defaultDetails.specialties.split(/[,/]+/).map(s => s.trim()).filter(Boolean).join('<br>')}
              </div>
            </div>

            <!-- COLUNA 2: PRINCÍPIO ATIVO -->
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 800; color: #153258; margin-bottom: 0.5rem;">Princípio ativo:</h4>
              <div style="font-size: 0.82rem; color: #718096; line-height: 1.65;">
                ${defaultDetails.active_principle}<br>
                Especialidades:<br>
                ${defaultDetails.specialties.split(/[,/]+/).map(s => s.trim()).filter(Boolean).join('<br>')}
              </div>
            </div>

            <!-- COLUNA 3: ESPECIALIDADES -->
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 800; color: #153258; margin-bottom: 0.5rem;">Especialidades:</h4>
              <div style="font-size: 0.82rem; color: #718096; line-height: 1.65;">
                ${defaultDetails.specialties.split(/[,/]+/).map(s => s.trim()).filter(Boolean).join('<br>')}
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- BANNER PANORÂMICO: FAÇA JÁ SEU PEDIDO -->
      <section class="med-panoramic-banner">
        <div class="container" style="max-width: 700px; position: relative; z-index: 2;">
          <h2 style="font-size: 2.35rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1.5rem; letter-spacing: -0.01em;">
            Faça já seu pedido
          </h2>
          <a href="/contato" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.95rem; padding: 0.85rem 2.25rem; border-radius: 6px; box-shadow: 0 4px 14px rgba(44, 164, 176, 0.35); text-decoration: none; display: inline-block;" data-route="contato">
            Fale com nossos especialistas
          </a>
        </div>
      </section>

      <!-- SEÇÃO LEAD: INFORME SEU E-MAIL (FUNDO AZUL CLARO) -->
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

  // Bind do botão Voltar
  document.getElementById('btn-voltar-medicamentos')?.addEventListener('click', () => {
    window.history.pushState({}, '', '/medicamentos');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  // Bind do formulário de lead
  bindLeadForm();
}

function bindLeadForm() {
  document.getElementById('lead-email-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('lead-email-input')?.value;
    if (!email) return;

    try {
      await api.sendContact({
        name: 'Lead Newsletter / Detalhes Medicamento',
        email: email,
        subject: 'Interesse via Medicamentos',
        message: 'Solicitação de contato via campo de e-mail da página de detalhes do medicamento.'
      });
      showToast('E-mail cadastrado com sucesso! Entraremos em contato em breve.', 'success');
      const input = document.getElementById('lead-email-input');
      if (input) input.value = '';
    } catch (err) {
      showToast('Erro ao enviar e-mail. Tente novamente.', 'error');
    }
  });
}
