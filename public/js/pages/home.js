import { api } from '../api.js';
import { showToast } from '../components.js';

export async function renderHomePage() {
  const app = document.getElementById('app');

  let pageData = null;
  try {
    pageData = await api.getPage('home');
  } catch (e) {
    pageData = null;
  }
  const sec = pageData?.data || {};

  const heroTitle = sec.hero?.title ? sec.hero.title.replace(/\n/g, '<br>') : 'Quando você precisar,<br>onde você estiver.';
  const heroSubtitle = sec.hero?.subtitle || 'A InterFarma conta com assessoria personalizada para importação e transporte de medicamentos especiais e de alto custo para você, hospitais, clínicas e profissionais de saúde.';
  const heroImg = sec.hero?.image_url || '/asserts/Group-589448.png';
  const aboutImg = sec.about_summary?.image_url || '/asserts/equipe-reuniao.jpg';

  let blogPosts = [];
  try {
    const blogData = await api.getBlogPosts({ limit: 6 });
    blogPosts = blogData?.posts || [];
  } catch (e) {
    blogPosts = [];
  }

  const defaultBlogItem = {
    title: 'Título do blog',
    slug: 'titulo-do-blog',
    summary: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru',
    cover_image: '/asserts/blog-laptop.jpg'
  };

  const displayBlogPosts = [...blogPosts];
  while (displayBlogPosts.length < 6) {
    const idx = displayBlogPosts.length + 1;
    displayBlogPosts.push({
      ...defaultBlogItem,
      id: idx,
      slug: displayBlogPosts.length === 0 ? 'como-beneficio-medicamentos-reduz-absenteismo' : `post-exemplo-${idx}`,
      cover_image: '/asserts/blog-laptop.jpg'
    });
  }

  app.innerHTML = `
    <div style="background: #FFFFFF; font-family: var(--font-main); overflow-x: hidden;">
      
      <!-- ==========================================
           1. HERO SECTION
           ========================================== -->
      <section style="background: linear-gradient(180deg, #EBF5FA 0%, #F6FAFD 70%, #FFFFFF 100%); padding: 3.5rem 1.5rem 2.5rem 1.5rem; position: relative; overflow: hidden;">
        <div class="container" style="max-width: 1140px; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 3rem; align-items: center;">
          
          <!-- LADO ESQUERDO: TÍTULO, TEXTO E CTA -->
          <div style="z-index: 2;">
            <h1 style="font-size: 3.1rem; font-weight: 800; color: #153258; line-height: 1.15; margin-bottom: 1.5rem; letter-spacing: -0.02em;">
              ${heroTitle}
            </h1>
            <p style="font-size: 0.95rem; color: #64748B; line-height: 1.7; margin-bottom: 2rem; max-width: 470px;">
              ${heroSubtitle}
            </p>
            <div>
              <a href="/contato" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.95rem; padding: 0.85rem 2.25rem; border-radius: 6px; box-shadow: 0 4px 14px rgba(44, 164, 176, 0.4); text-decoration: none; display: inline-block; transition: all 0.2s ease;" data-route="contato">
                Fale com nossos especialistas
              </a>
            </div>

            <!-- CONTROLES DE CARROSSEL DISCRETOS -->
            <div style="display: flex; gap: 0.75rem; margin-top: 3.5rem; color: #94A3B8; font-size: 1.35rem; user-select: none; align-items: center;">
              <span style="cursor: pointer; transition: color 0.2s;" onmouseover="this.style.color='#2CA4B0'" onmouseout="this.style.color='#94A3B8'">&lsaquo;</span>
              <span style="cursor: pointer; color: #2CA4B0;">&rsaquo;</span>
            </div>
          </div>

          <!-- LADO DIREITO: FOTO DO MÉDICO COM ELEMENTOS FLUTUANTES (GROUP-589448) -->
          <div style="position: relative; text-align: center; z-index: 1;">
            <div style="position: relative; max-width: 500px; margin: 0 auto;">
              <img src="${heroImg}" alt="Médico InterFarma Especialista" style="width: 100%; max-height: 520px; object-fit: contain; display: block;" onerror="this.src='/asserts/Group-589448.png';">
            </div>
          </div>

        </div>
      </section>

      <!-- ==========================================
           2. TRÊS CARDS DE AÇÃO FLUTUANTES
           ========================================== -->
      <section style="padding: 0 1rem 3.5rem 1rem; background: #FFFFFF; margin-top: -1.5rem; position: relative; z-index: 3;">
        <div class="container" style="max-width: 960px;">
          <div class="floating-action-cards" style="background: #FFFFFF; border: 1px solid #EBF1F6; border-radius: 20px; padding: 2.25rem 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.03); display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; text-align: center;">
            
            <!-- CARD 1: SOLICITE UM ORÇAMENTO -->
            <div class="action-card-item" style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center;">
              <div>
                <div style="width: 48px; height: 48px; margin: 0 auto 0.85rem auto; display: flex; align-items: center; justify-content: center;">
                  <img src="/asserts/Group5530.png" alt="Solicite um orçamento" style="max-width: 40px; max-height: 40px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'36\\' height=\\'36\\' viewBox=\\'0 0 24 24\\' fill=\\'#178272\\'><path d=\\'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z\\'/></svg>'">
                </div>
                <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-bottom: 1.25rem; line-height: 1.3; text-align: center;">
                  Solicite um<br>orçamento
                </h3>
              </div>
              <a href="/contato" class="btn" style="background: #EAF5FB; color: #2CA4B0; font-size: 0.82rem; font-weight: 700; padding: 0.45rem 1.5rem; border-radius: 20px; text-decoration: none; display: inline-block; transition: all 0.2s ease;" data-route="contato">
                Saiba mais &rarr;
              </a>
            </div>

            <!-- CARD 2: LISTA DE MEDICAMENTOS -->
            <div class="action-card-item" style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center;">
              <div>
                <div style="width: 48px; height: 48px; margin: 0 auto 0.85rem auto; display: flex; align-items: center; justify-content: center;">
                  <img src="/asserts/Group5531.png" alt="Lista de medicamentos" style="max-width: 40px; max-height: 40px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'36\\' height=\\'36\\' viewBox=\\'0 0 24 24\\' fill=\\'#178272\\'><path d=\\'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z\\'/></svg>'">
                </div>
                <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-bottom: 1.25rem; line-height: 1.3; text-align: center;">
                  Lista de<br>medicamentos
                </h3>
              </div>
              <a href="/medicamentos" class="btn" style="background: #EAF5FB; color: #2CA4B0; font-size: 0.82rem; font-weight: 700; padding: 0.45rem 1.5rem; border-radius: 20px; text-decoration: none; display: inline-block; transition: all 0.2s ease;" data-route="medicamentos">
                Acesse &rarr;
              </a>
            </div>

            <!-- CARD 3: PERGUNTAS FREQUENTES -->
            <div class="action-card-item" style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; text-align: center;">
              <div>
                <div style="width: 48px; height: 48px; margin: 0 auto 0.85rem auto; display: flex; align-items: center; justify-content: center;">
                  <img src="/asserts/Group5532.png" alt="Perguntas frequentes" style="max-width: 40px; max-height: 40px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'36\\' height=\\'36\\' viewBox=\\'0 0 24 24\\' fill=\\'#178272\\'><path d=\\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z\\'/></svg>'">
                </div>
                <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-bottom: 1.25rem; line-height: 1.3; text-align: center;">
                  Perguntas<br>frequentes
                </h3>
              </div>
              <a href="/faq" class="btn" style="background: #EAF5FB; color: #2CA4B0; font-size: 0.82rem; font-weight: 700; padding: 0.45rem 1.5rem; border-radius: 20px; text-decoration: none; display: inline-block; transition: all 0.2s ease;" data-route="faq">
                Consultar &rarr;
              </a>
            </div>

          </div>
        </div>
      </section>

      <!-- ==========================================
           3. SEÇÃO: UM POUCO SOBRE NÓS
           ========================================== -->
      <section style="padding: 3.5rem 1rem 4.5rem 1rem; background: #FFFFFF;">
        <div class="container" style="max-width: 1140px;">
          <div class="about-us-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 4.5rem; align-items: center;">
            
            <!-- FOTO DA EQUIPE CONFORME A IMAGEM DE REFERÊNCIA -->
            <div class="about-team-container" style="position: relative; max-width: 500px; margin: 0 auto;">
              <img class="about-team-photo" src="${sec.about_summary?.image_url || '/asserts/equipe-reuniao.jpg'}" alt="Equipe InterFarma" style="width: 100%; height: auto; max-height: 540px; object-fit: contain; display: block; border-radius: 20px;" onerror="this.src='/asserts/equipe-reuniao.jpg';">
            </div>

            <!-- TEXTO E 4 DESTAQUES CONFORME A REFERÊNCIA -->
            <div>
              <span style="color: #2CA4B0; font-weight: 700; font-size: 0.95rem;">${sec.about_summary?.badge_text || 'A InterFarma'}</span>
              <h2 style="font-size: 2.25rem; font-weight: 800; color: #153258; margin: 0.35rem 0 1rem 0; letter-spacing: -0.01em;">
                ${sec.about_summary?.title || 'Um pouco sobre nós.'}
              </h2>
              <p style="font-size: 0.95rem; color: #718096; line-height: 1.65; margin-bottom: 2rem; max-width: 520px;">
                ${sec.about_summary?.subtitle || 'A InterFarma trabalha para auxiliar todos os brasileiros na importação de medicamentos, sem tributação alfandegária*.'}
              </p>

              <div style="display: flex; flex-direction: column; gap: 1.15rem;">
                ${(() => {
                  const defaultItems = [
                    { icon: '/asserts/Group5576.png', bg: '#CCFBF1', color: '#0D9488', title: 'Estamos no mundo todo', text: 'Contamos com uma rede global de fornecedores, estrategicamente localizados.' },
                    { icon: '/asserts/Group5577.png', bg: '#E0E7FF', color: '#4338CA', title: 'Cuidamos de tudo', text: 'Nossa equipe gerencia todos os processos, cuidando de toda burocracia, até o medicamento chegar em suas mãos.' },
                    { icon: '/asserts/Group5578.png', bg: '#FCE7F3', color: '#BE185D', title: 'Compromisso com prazos', text: 'Somos comprometidos com os prazos e sabemos da importância de cumpri-los.' },
                    { icon: '/asserts/feather_award.png', bg: '#E0F2FE', color: '#0284C7', title: 'Certificação e infraestrutura', text: 'Somos comprometidos com os prazos e sabemos da importância de cumpri-los.' }
                  ];
                  const items = (sec.about_summary?.extra_data?.items && sec.about_summary.extra_data.items.length > 0)
                    ? sec.about_summary.extra_data.items
                    : defaultItems;

                  return items.map((item, idx) => {
                    const def = defaultItems[idx % defaultItems.length];
                    return `
                      <div style="display: flex; align-items: center; gap: 1.15rem; background: #FFFFFF; border: 1px solid #EBF1F6; border-radius: 14px; padding: 1rem 1.35rem; box-shadow: 0 4px 14px rgba(0,0,0,0.02); transition: transform 0.2s ease;">
                        <div style="width: 42px; height: 42px; border-radius: 50%; background: ${def.bg}; color: ${def.color}; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                          <img src="${item.icon || def.icon}" alt="${item.title || def.title}" style="width: 24px; height: 24px; object-fit: contain;" onerror="this.outerHTML='⭐'">
                        </div>
                        <div>
                          <h4 style="font-size: 0.95rem; font-weight: 800; color: #153258; margin-bottom: 3px;">${item.title || def.title}</h4>
                          <p style="font-size: 0.78rem; color: #94A3B8; margin: 0; line-height: 1.4;">${item.text || def.text}</p>
                        </div>
                      </div>
                    `;
                  }).join('');
                })()}
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ==========================================
           4. SEÇÃO: COMO FUNCIONA NOSSO PROCESSO
           ========================================== -->
      <section style="padding: 3.5rem 1.5rem 4.5rem 1.5rem; background: #FFFFFF;">
        <div class="container" style="max-width: 1100px;">
          
          <div style="text-align: center; margin-bottom: 3.5rem;">
            <span style="color: #2CA4B0; font-weight: 700; font-size: 0.9rem;">Qualidade garantida</span>
            <h2 style="font-size: 2.15rem; font-weight: 800; color: #153258; margin: 0.35rem 0 0.75rem 0;">
              Como funciona nosso processo
            </h2>
            <p style="font-size: 0.95rem; color: #718096; max-width: 650px; margin: 0 auto; line-height: 1.6;">
              A InterFarma trabalha para auxiliar todos os brasileiros na importação de medicamentos, sem tributação alfandegária*.
            </p>
          </div>

          <!-- LINHA 1: PASSOS 1, 2 E 3 -->
          <div class="flow-row-top" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.75rem; flex-wrap: wrap;">
            
            <!-- PASSO 1 -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <img src="/asserts/Group5804.png" alt="Prescrição Médica" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' fill=\\'currentColor\\'><path d=\\'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\\'/></svg>'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">Prescrição Médica</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55; margin: 0;">
                Uma prescrição é uma rotina de cuidados com a saúde, implementados por um médico ou profissional qualificado.
              </p>
            </div>

            <!-- SETA 1 -> 2 -->
            <div class="flow-arrow-horizontal" style="display: flex; align-items: center; justify-content: center;">
              <img src="/asserts/set-direita.png" alt="->" style="width: 24px; height: 24px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'28\\' height=\\'28\\' viewBox=\\'0 0 24 24\\' fill=\\'#2CA4B0\\'><path d=\\'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z\\'/></svg>'">
            </div>

            <!-- PASSO 2 -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <img src="/asserts/Group5805.png" alt="Fornecedores" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' fill=\\'currentColor\\'><path d=\\'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.1.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.1-.89-2-2-2zm-6 0h-4V4h4v2z\\'/></svg>'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">Fornecedores</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55; margin: 0;">
                Verificamos a disponibilidade nos fornecedores exclusivos e qualificados espalhados em vários países.
              </p>
            </div>

            <!-- SETA 2 -> 3 -->
            <div class="flow-arrow-horizontal" style="display: flex; align-items: center; justify-content: center;">
              <img src="/asserts/set-direita.png" alt="->" style="width: 24px; height: 24px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'28\\' height=\\'28\\' viewBox=\\'0 0 24 24\\' fill=\\'#2CA4B0\\'><path d=\\'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z\\'/></svg>'">
            </div>

            <!-- PASSO 3 -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <img src="/asserts/Group5806.png" alt="Aprovação" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' fill=\\'currentColor\\'><path d=\\'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z\\'/></svg>'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">Aprovação</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55; margin: 0;">
                Aprovação do orçamento e documentos do paciente disponíveis com total discrição e confiabilidade.
              </p>
            </div>

          </div>

          <!-- SETA DE CONEXÃO DESCENDENTE (3 -> 4) -->
          <div class="flow-arrow-down" style="display: flex; justify-content: flex-end; padding-right: 12%; margin-bottom: 1.75rem;">
            <img src="/asserts/set-baixo.png" alt="v" style="width: 24px; height: 24px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'28\\' height=\\'28\\' viewBox=\\'0 0 24 24\\' fill=\\'#2CA4B0\\'><path d=\\'M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z\\'/></svg>'">
          </div>

          <!-- LINHA 2: PASSOS 6, 5 E 4 (ORDEM VISUAL) -->
          <div class="flow-row-bottom" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            
            <!-- PASSO 6: GARANTIA DE ENTREGA -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <img src="/asserts/Group5809.png" alt="Garantia de Entrega" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' fill=\\'currentColor\\'><path d=\\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\\'/></svg>'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">Garantia de Entrega</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55; margin: 0;">
                Garantimos a entrega do medicamento para o paciente em embalagens certificadas.
              </p>
            </div>

            <!-- SETA 5 -> 6 (VOLTANDO PARA ESQUERDA) -->
            <div class="flow-arrow-horizontal" style="display: flex; align-items: center; justify-content: center;">
              <img src="/asserts/set-esquerda.png" alt="<-" style="width: 24px; height: 24px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'28\\' height=\\'28\\' viewBox=\\'0 0 24 24\\' fill=\\'#2CA4B0\\'><path d=\\'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\\'/></svg>'">
            </div>

            <!-- PASSO 5: ANVISA - RF -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <img src="/asserts/Group5808.png" alt="ANVISA - RF" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' fill=\\'currentColor\\'><path d=\\'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z\\'/></svg>'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">ANVISA – RF</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55; margin: 0;">
                Inspeção realizada com fornecimento de documentos comprobatórios de anuência.
              </p>
            </div>

            <!-- SETA 4 -> 5 (VOLTANDO PARA ESQUERDA) -->
            <div class="flow-arrow-horizontal" style="display: flex; align-items: center; justify-content: center;">
              <img src="/asserts/set-esquerda.png" alt="<-" style="width: 24px; height: 24px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'28\\' height=\\'28\\' viewBox=\\'0 0 24 24\\' fill=\\'#2CA4B0\\'><path d=\\'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z\\'/></svg>'">
            </div>

            <!-- PASSO 4: AUTORIZAÇÃO -->
            <div class="flow-step-card" style="flex: 1; min-width: 250px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 2.25rem 1.25rem 1.75rem 1.25rem; text-align: center; position: relative; box-shadow: 0 6px 20px rgba(0,0,0,0.03);">
              <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); width: 44px; height: 44px; border-radius: 50%; background: #4FD1C5; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(79, 209, 197, 0.4);">
                <img src="/asserts/Group5807.png" alt="Autorização" style="width: 22px; height: 22px; object-fit: contain;" onerror="this.outerHTML='<svg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' fill=\\'currentColor\\'><path d=\\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\\'/></svg>'">
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 800; color: #153258; margin-top: 0.5rem; margin-bottom: 0.75rem;">Autorização</h3>
              <p style="font-size: 0.8rem; color: #718096; line-height: 1.55; margin: 0;">
                Autorizamos o fornecedor a embarcar o produto com certificação de temperatura.
              </p>
            </div>

          </div>

        </div>
      </section>

      <!-- ==========================================
           5. CARD "FAÇA JÁ SEU PEDIDO"
           ========================================== -->
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

      <!-- ==========================================
           6. SEÇÃO NOVIDADES: CONFIRA NOSSO BLOG
           ========================================== -->
      <section class="home-blog-section">
        <img src="/asserts/Vector84.png" alt="" class="home-blog-bg-curve">
        
        <div class="home-blog-container">
          
          <!-- CABEÇALHO DO BLOG (ALINHADO À ESQUERDA) -->
          <div class="home-blog-header">
            <span class="home-blog-tag">Novidades</span>
            <h2 class="home-blog-title">
              Confira nosso blog
            </h2>
          </div>

          <!-- GRADE DE 6 POSTS (3x2) -->
          <div class="home-blog-grid">
            ${displayBlogPosts.slice(0, 6).map(p => `
              <div class="home-blog-card">
                <a href="/blog/${p.slug}" data-route="blog-post" data-slug="${p.slug}" class="home-blog-card-img-wrap">
                  <img src="${p.cover_image || '/asserts/blog-laptop.jpg'}" alt="${p.title}" class="home-blog-card-img" onerror="this.src='/asserts/blog-laptop.jpg';">
                </a>
                <h3 class="home-blog-card-heading">
                  <a href="/blog/${p.slug}" data-route="blog-post" data-slug="${p.slug}">${p.title}</a>
                </h3>
                <p class="home-blog-card-text">
                  ${p.summary || 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru'}
                </p>
              </div>
            `).join('')}
          </div>

          <!-- BOTÃO ACESSAR BLOG -->
          <div class="home-blog-cta-wrap">
            <a href="/blog" class="home-blog-cta-btn" data-route="blog">
              Acessar blog
            </a>
          </div>

        </div>
      </section>

      <!-- ==========================================
           7. SEÇÃO LEAD: INFORME SEU E-MAIL
           ========================================== -->
      <section style="background: #F4F9FD; padding: 4.5rem 1rem 5rem 1rem; text-align: center;">
        <div class="container" style="max-width: 650px;">
          <h2 style="font-size: 1.85rem; font-weight: 800; color: #153258; margin-bottom: 2rem; line-height: 1.35; letter-spacing: -0.01em;">
            Informe seu e-mail que<br>entraremos em contato
          </h2>

          <form id="lead-email-form" style="display: flex; gap: 0.75rem; justify-content: center; align-items: center; max-width: 480px; margin: 0 auto; flex-wrap: wrap;">
            <div style="position: relative; flex: 1; min-width: 250px;">
              <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94A3B8; font-size: 1.1rem; line-height: 1;">✉</span>
              <input type="email" id="lead-email-input" required placeholder="Endereço de e-mail" style="width: 100%; padding: 0.8rem 1rem 0.8rem 2.6rem; font-size: 0.9rem; border-radius: 6px; border: 1px solid #E2E8F0; background: #FFFFFF; outline: none; box-shadow: 0 1px 3px rgba(0,0,0,0.03); font-family: inherit;">
            </div>
            <button type="submit" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.9rem; padding: 0.8rem 2rem; border-radius: 6px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(44, 164, 176, 0.3); transition: all 0.2s ease;">
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
        name: 'Lead Newsletter / Home',
        email: email,
        subject: 'Interesse via Home',
        message: 'Solicitação de contato via campo de e-mail da página inicial.'
      });
      showToast('E-mail cadastrado com sucesso! Entraremos em contato em breve.', 'success');
      const input = document.getElementById('lead-email-input');
      if (input) input.value = '';
    } catch (err) {
      showToast('Erro ao enviar e-mail. Tente novamente.', 'error');
    }
  });
}
