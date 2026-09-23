import { adminApi } from '../admin-api.js';

export async function renderPageEditor(container, pageSlug = 'home') {
  container.innerHTML = `<div style="text-align: center; padding: 50px;"><span class="badge">Carregando editor de páginas...</span></div>`;

  const pageNames = {
    'home': 'Página Inicial (Home)',
    'como-funciona': 'Como Funciona',
    'diferenciais': 'Diferenciais Competitivos',
    'empresas': 'Soluções para Empresas (B2B)',
    'medicamentos': 'Catálogo de Medicamentos',
    'faq': 'Perguntas Frequentes (FAQ)',
    'blog': 'Página do Blog',
    'contato': 'Página de Contatos'
  };

  const sectionLabels = {
    'hero': 'Banner Superior (Hero da Página)',
    'about_summary': 'UM POUCO SOBRE NÓS (Página Inicial)',
    'steps': 'Etapas do Nosso Processo (Fluxo de 6 Passos)',
    'licencas': 'Licenças e Órgãos Reguladores (Foto do Supervisor & Licenças)',
    'tecnologia': 'Tecnologia e Investimento (Foto do Analista & Recursos)',
    'valores': 'Missão, Visão e Valores (Diretrizes)',
    'empresas_atendidas': 'Empresas que Atendemos (6 Segmentos B2B)'
  };

  try {
    const data = await adminApi.getPageAdminSections(pageSlug);
    const sections = (data.sections || []).filter(sec => {
      if (pageSlug === 'home') {
        return sec.section_key === 'hero' || sec.section_key === 'about_summary';
      }
      return true;
    });

    container.innerHTML = `
      <div class="card-header-flex">
        <div>
          <h1 style="font-size: 1.75rem; margin-bottom: 0.35rem; line-height: 1.3;">Editor de Páginas: ${pageNames[pageSlug] || pageSlug}</h1>
          <p style="color: var(--admin-text-muted); font-size: 0.92rem; line-height: 1.5;">Altere títulos, subtítulos, textos, botões, fotos e banners visuais desta página com auditoria e carregamento direto.</p>
        </div>

        <!-- SELETOR RÁPIDO DE PÁGINAS -->
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; width: 100%; max-width: 420px;">
          <label style="font-size: 0.85rem; font-weight: 700; color: var(--admin-text-muted); white-space: nowrap;">Selecionar Página:</label>
          <select id="select-page-slug" class="form-control" style="flex: 1; min-width: 200px; font-weight: 600;">
            ${Object.entries(pageNames).map(([slug, name]) => `
              <option value="${slug}" ${slug === pageSlug ? 'selected' : ''}>${name}</option>
            `).join('')}
          </select>
        </div>
      </div>

      ${sections.length === 0 ? `
        <div class="admin-card" style="text-align: center; padding: 3rem 1rem;">
          <h3>Nenhuma seção cadastrada para esta página.</h3>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          ${sections.map((sec, idx) => {
            const isAboutSection = sec.section_key === 'about_summary';
            const isStepsSection = sec.section_key === 'steps';
            const isLicencasSection = sec.section_key === 'licencas';
            const isTecnologiaSection = sec.section_key === 'tecnologia';
            const isValoresSection = sec.section_key === 'valores';
            const isEmpresasSection = sec.section_key === 'empresas_atendidas';
            const friendlyName = sectionLabels[sec.section_key] || sec.section_key.toUpperCase();

            // Configuração de Imagens / Fotos por seção
            let imageLabel = 'Imagem / Banner da Seção';
            let imageHelp = 'Selecione uma imagem (JPG, PNG, WEBP, SVG) para enviar. O upload salvará a foto no servidor e atualizará a seção no site assim que clicar em Salvar.';
            let fallbackImg = '/asserts/hero-header-bg.png';
            let showImageUpload = true;

            if (sec.section_key === 'hero') {
              imageLabel = (pageSlug === 'home') ? 'Foto / Banner Principal (Hero)' : 'Foto de Fundo do Banner Superior (Header)';
              imageHelp = (pageSlug === 'home')
                ? 'Envie a imagem da ilustração do especialista com elementos flutuantes no Hero da página inicial.'
                : 'Envie a foto panorâmica de fundo do banner de cabeçalho desta página.';
              fallbackImg = (pageSlug === 'home') ? '/asserts/Group-589448.png' : '/asserts/hero-header-bg.png';
            } else if (sec.section_key === 'about_summary') {
              imageLabel = 'Foto da Equipe (Banner à Esquerda)';
              imageHelp = 'Envie a foto da equipe (reunião) exibida à esquerda da seção "Um pouco sobre nós" na página inicial.';
              fallbackImg = '/asserts/equipe-reuniao.jpg';
            } else if (sec.section_key === 'licencas') {
              imageLabel = 'Foto do Supervisor de Licenças (Esquerda)';
              imageHelp = 'Envie a foto do supervisor com prancheta exibida à esquerda da seção de licenças ANVISA.';
              fallbackImg = '/asserts/supervisor-licencas.jpg';
            } else if (sec.section_key === 'tecnologia') {
              imageLabel = 'Foto do Analista de Tecnologia (Direita)';
              imageHelp = 'Envie a foto do analista no computador exibida à direita da seção de tecnologia.';
              fallbackImg = '/asserts/analista-tecnologia.jpg';
            } else if (isStepsSection || isValoresSection || isEmpresasSection) {
              showImageUpload = false;
            }

            // Itens de cada seção estruturada
            const defaultAboutItems = [
              { title: 'Estamos no mundo todo', text: 'Contamos com uma rede global de fornecedores, estrategicamente localizados.' },
              { title: 'Cuidamos de tudo', text: 'Nossa equipe gerencia todos os processos, cuidando de toda burocracia, até o medicamento chegar em suas mãos.' },
              { title: 'Compromisso com prazos', text: 'Somos comprometidos com os prazos e sabemos da importância de cumpri-los.' },
              { title: 'Certificação e infraestrutura', text: 'Somos comprometidos com os prazos e sabemos da importância de cumpri-los.' }
            ];
            const currentAboutItems = (sec.extra_data?.items && sec.extra_data.items.length > 0) ? sec.extra_data.items : defaultAboutItems;

            const defaultSteps = [
              { step: '01', title: 'Prescrição Médica', desc: 'Uma prescrição é uma rotina de cuidados com a saúde, implementados por um médico ou outro profissional de saúde qualificado.' },
              { step: '02', title: 'Fornecedores', desc: 'Verificamos a disponibilidade nos fornecedores exclusivos e qualificados espalhados em vários países.' },
              { step: '03', title: 'Proposta Comercial', desc: 'Apresentamos ao cliente todas as informações necessárias sobre o medicamento.' },
              { step: '04', title: 'Pagamento', desc: 'O pagamento é efetuado através de transferência bancária ou boleto com total segurança.' },
              { step: '05', title: 'Envio & Logística', desc: 'O medicamento é despachado com controle rigoroso de temperatura e rastreamento em tempo real.' },
              { step: '06', title: 'Entrega no Destino', desc: 'O medicamento chega com total segurança no endereço indicado ou na clínica/hospital.' }
            ];
            const currentSteps = (sec.extra_data?.steps && sec.extra_data.steps.length > 0) ? sec.extra_data.steps : defaultSteps;

            const defaultLicenses = [
              { title: 'ANVISA', desc: 'Autorização para importação, distribuição, armazenamento de medicamentos, cosméticos, correlatos e alimentos.' },
              { title: 'CRF / Farmacêutico', desc: 'Responsabilidade técnica integral com farmacêuticos habilitados em tempo integral.' },
              { title: 'Licença Sanitária', desc: 'Alvará sanitário estadual e municipal com vistorias periódicas atualizadas.' },
              { title: 'Certificado de Boas Práticas', desc: 'Certificação de boas práticas de distribuição, armazenagem e transporte.' },
              { title: 'Rastreabilidade', desc: 'Controle de lote e validade com sistema de auditoria eletrônica 100% integrado.' },
              { title: 'Cadeia Fria Qualificada', desc: 'Equipamentos calibrados e validados para medicamentos termolábeis.' }
            ];
            const currentLicenses = (sec.extra_data?.licenses && sec.extra_data.licenses.length > 0) ? sec.extra_data.licenses : defaultLicenses;

            const defaultFeatures = [
              { title: 'Nossa Estrutura', desc: 'Nossas estruturas contam com laboratórios físico químicos e microbiológicos - RDC 10/2011' },
              { title: 'Monitoramento da Carga', desc: 'Rastreamento contínuo em tempo real durante todo o trajeto internacional e nacional.' },
              { title: 'Software de Temperatura', desc: 'Sensores térmicos conectados que registram a curva de temperatura minuto a minuto.' },
              { title: 'Sistema de Dados', desc: 'Plataforma em nuvem com criptografia de ponta a ponta e compliance LGPD.' },
              { title: 'Veículo Próprio', desc: 'Frota dedicada e climatizada para transportes prioritários e urgentes.' },
              { title: 'Acompanhamento do Paciente', desc: 'Suporte humanizado e canal direto para esclarecimento de dúvidas e orientações.' }
            ];
            const currentFeatures = (sec.extra_data?.features && sec.extra_data.features.length > 0) ? sec.extra_data.features : defaultFeatures;

            const defaultValues = [
              { title: 'Nossa Missão', desc: 'Proporcionar ao paciente a segurança, confiabilidade com honestidade durante a aquisição de medicamentos qualificados visando o melhor tratamento.' },
              { title: 'Nossa Visão', desc: 'Ser uma empresa de referência internacional com excelência na assessoria de importação de medicamentos.' },
              { title: 'Nossos Valores', desc: 'Honestidade, Respeito, Excelência, Integridade e Compromisso social.' }
            ];
            const currentValues = (sec.extra_data?.values && sec.extra_data.values.length > 0) ? sec.extra_data.values : defaultValues;

            const defaultClients = [
              { title: 'Clínicas', desc: 'Atendimento ágil para clínicas médicas e de infusão com fornecimento direto e pontual.' },
              { title: 'Hospitais Públicos', desc: 'Assessoria completa em processos de importação emergencial e licitações em saúde.' },
              { title: 'Distribuidoras', desc: 'Parcerias estratégicas para suprimento de produtos especiais e demandas específicas.' },
              { title: 'Indústrias', desc: 'Programas de benefícios corporativos e suporte farmacêutico empresarial.' },
              { title: 'Hospitais Privados', desc: 'Fornecimento contínuo de itens de alto custo e suporte em protocolos complexos.' },
              { title: 'Secretarias de Saúde', desc: 'Gestão transparente em demandas judiciais e atendimento prioritário a pacientes.' }
            ];
            const currentClients = (sec.extra_data?.clients && sec.extra_data.clients.length > 0) ? sec.extra_data.clients : defaultClients;

            return `
              <div class="admin-card section-card" data-key="${sec.section_key}">
                <div class="card-header-flex" style="border-bottom: 1px solid var(--admin-border); padding-bottom: 1rem; margin-bottom: 1.25rem;">
                  <div>
                    <span class="badge" style="margin-bottom: 0.25rem; font-weight: 700; ${isAboutSection ? 'background: #E0F2FE; color: #0284C7;' : ''}">
                      Seção: ${friendlyName}
                    </span>
                    <h3 style="font-size: 1.25rem; color: var(--admin-primary); line-height: 1.35;">${sec.title || `Seção ${sec.section_key}`}</h3>
                  </div>
                  <button type="button" class="btn-adm btn-adm-primary btn-save-section" data-key="${sec.section_key}">
                    💾 Salvar Esta Seção
                  </button>
                </div>

                <!-- GRADE DE TÍTULO E SUBTÍTULO -->
                <div class="form-grid-2">
                  <div class="form-group">
                    <label class="form-label">Título Principal</label>
                    <textarea class="form-control sec-title" rows="2" style="resize: vertical; min-height: 48px;">${sec.title || ''}</textarea>
                  </div>

                  ${(sec.section_key === 'hero' && pageSlug === 'home') ? `
                    <div class="form-group">
                      <label class="form-label">Subtítulo / Descrição do Banner</label>
                      <textarea class="form-control sec-hero-subtitle" rows="2" style="resize: vertical; min-height: 48px;" placeholder="Digite o subtítulo do banner principal">${sec.subtitle || ''}</textarea>
                    </div>
                  ` : `
                    <div class="form-group">
                      <label class="form-label">${sec.section_key === 'hero' ? 'Subtítulo do Banner' : 'Texto do Badge / Selo'}</label>
                      <textarea class="form-control ${sec.section_key === 'hero' ? 'sec-hero-subtitle' : 'sec-badge'}" rows="1" style="resize: vertical; min-height: 48px;">${sec.section_key === 'hero' ? (sec.subtitle || '') : (sec.badge_text || '')}</textarea>
                    </div>
                  `}
                </div>

                <!-- TEXTO INTRODUTÓRIO DE COMO FUNCIONA OU SOBRE NÓS -->
                ${(pageSlug === 'como-funciona' && sec.section_key === 'hero') ? `
                  <div class="form-group" style="margin-bottom: 1.25rem;">
                    <label class="form-label" style="font-weight: 700;">Texto Introdutório da Página</label>
                    <textarea class="form-control sec-content" rows="2" style="resize: vertical; min-height: 52px;">${sec.content || 'A InterFarma trabalha para auxiliar todos os brasileiros na importação de medicamentos, sem tributação alfandegária*.'}</textarea>
                  </div>
                ` : ''}

                ${isAboutSection ? `
                  <div class="form-group" style="margin-bottom: 1.25rem;">
                    <label class="form-label" style="font-weight: 700;">Texto / Descrição Explicativa</label>
                    <textarea class="form-control sec-about-subtitle" rows="2" style="resize: vertical; min-height: 52px;">${sec.subtitle || 'A InterFarma trabalha para auxiliar todos os brasileiros na importação de medicamentos, sem tributação alfandegária*.'}</textarea>
                  </div>

                  <!-- 4 CARDS DE DESTAQUE / DIFERENCIAIS -->
                  <div style="margin-top: 1.25rem; margin-bottom: 1.25rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.25rem;">
                    <h4 style="font-size: 1rem; font-weight: 700; color: #1E293B; margin-bottom: 0.25rem;">Cards de Diferenciais & Destaques (4 Itens à Direita)</h4>
                    <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1rem;">Edite os 4 itens que aparecem ao lado da foto da equipe na página Home.</p>

                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                      ${[0, 1, 2, 3].map(i => {
                        const item = currentAboutItems[i] || defaultAboutItems[i];
                        return `
                          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem;">
                            <div style="font-weight: 700; font-size: 0.82rem; color: #0284C7; margin-bottom: 0.5rem; text-transform: uppercase;">
                              Card ${i + 1}
                            </div>
                            <div class="form-grid-2">
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Título do Card</label>
                                <input type="text" class="form-control sec-about-item-title-${i}" value="${item.title || ''}" placeholder="Ex: Estamos no mundo todo">
                              </div>
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Descrição do Card</label>
                                <input type="text" class="form-control sec-about-item-text-${i}" value="${item.text || ''}" placeholder="Ex: Contamos com uma rede global...">
                              </div>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- CARDS DE ETAPAS (COMO FUNCIONA) -->
                ${isStepsSection ? `
                  <div style="margin-top: 1.25rem; margin-bottom: 1.25rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.25rem;">
                    <h4 style="font-size: 1rem; font-weight: 700; color: #1E293B; margin-bottom: 0.25rem;">6 Etapas do Processo (Fluxo de Importação)</h4>
                    <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1rem;">Edite os 6 passos que compõem o fluxo interativo na página Como Funciona.</p>

                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                      ${[0, 1, 2, 3, 4, 5].map(i => {
                        const step = currentSteps[i] || defaultSteps[i];
                        return `
                          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem;">
                            <div style="font-weight: 700; font-size: 0.82rem; color: #0D9488; margin-bottom: 0.5rem; text-transform: uppercase;">
                              Passo ${i + 1}
                            </div>
                            <div class="form-grid-2">
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Título da Etapa</label>
                                <input type="text" class="form-control sec-step-title-${i}" value="${step.title || ''}" placeholder="Ex: Prescrição Médica">
                              </div>
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Descrição da Etapa</label>
                                <input type="text" class="form-control sec-step-desc-${i}" value="${step.desc || ''}" placeholder="Ex: Uma prescrição é uma rotina...">
                              </div>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- CARDS DE LICENÇAS (DIFERENCIAIS) -->
                ${isLicencasSection ? `
                  <div style="margin-top: 1.25rem; margin-bottom: 1.25rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.25rem;">
                    <h4 style="font-size: 1rem; font-weight: 700; color: #1E293B; margin-bottom: 0.25rem;">Lista de Licenças e Órgãos Reguladores</h4>
                    <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1rem;">Edite os 6 itens de licença e regulamentação exibidos ao lado da foto do supervisor.</p>

                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                      ${[0, 1, 2, 3, 4, 5].map(i => {
                        const lic = currentLicenses[i] || defaultLicenses[i];
                        return `
                          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem;">
                            <div style="font-weight: 700; font-size: 0.82rem; color: #0284C7; margin-bottom: 0.5rem; text-transform: uppercase;">
                              Item de Licença ${i + 1}
                            </div>
                            <div class="form-grid-2">
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Órgão / Título</label>
                                <input type="text" class="form-control sec-lic-title-${i}" value="${lic.title || ''}" placeholder="Ex: ANVISA">
                              </div>
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Descrição da Autorização</label>
                                <input type="text" class="form-control sec-lic-desc-${i}" value="${lic.desc || ''}" placeholder="Ex: Autorização para importação...">
                              </div>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- CARDS DE TECNOLOGIA (DIFERENCIAIS) -->
                ${isTecnologiaSection ? `
                  <div style="margin-top: 1.25rem; margin-bottom: 1.25rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.25rem;">
                    <h4 style="font-size: 1rem; font-weight: 700; color: #1E293B; margin-bottom: 0.25rem;">Recursos de Tecnologia e Infraestrutura</h4>
                    <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1rem;">Edite os 6 recursos tecnológicos exibidos ao lado da foto do analista.</p>

                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                      ${[0, 1, 2, 3, 4, 5].map(i => {
                        const feat = currentFeatures[i] || defaultFeatures[i];
                        return `
                          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem;">
                            <div style="font-weight: 700; font-size: 0.82rem; color: #0D9488; margin-bottom: 0.5rem; text-transform: uppercase;">
                              Recurso ${i + 1}
                            </div>
                            <div class="form-grid-2">
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Título do Recurso</label>
                                <input type="text" class="form-control sec-feat-title-${i}" value="${feat.title || ''}" placeholder="Ex: Nossa Estrutura">
                              </div>
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Descrição do Recurso</label>
                                <input type="text" class="form-control sec-feat-desc-${i}" value="${feat.desc || ''}" placeholder="Ex: Nossas estruturas contam com...">
                              </div>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- CARDS DE VALORES (DIFERENCIAIS) -->
                ${isValoresSection ? `
                  <div style="margin-top: 1.25rem; margin-bottom: 1.25rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.25rem;">
                    <h4 style="font-size: 1rem; font-weight: 700; color: #1E293B; margin-bottom: 0.25rem;">Missão, Visão e Valores</h4>
                    <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1rem;">Edite os 3 pilares estratégicos da empresa exibidos no card flutuante.</p>

                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                      ${[0, 1, 2].map(i => {
                        const val = currentValues[i] || defaultValues[i];
                        return `
                          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem;">
                            <div style="font-weight: 700; font-size: 0.82rem; color: #153258; margin-bottom: 0.5rem; text-transform: uppercase;">
                              ${i === 0 ? 'Nossa Missão' : (i === 1 ? 'Nossa Visão' : 'Nossos Valores')}
                            </div>
                            <div class="form-grid-2">
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Título</label>
                                <input type="text" class="form-control sec-val-title-${i}" value="${val.title || ''}">
                              </div>
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Descrição</label>
                                <input type="text" class="form-control sec-val-desc-${i}" value="${val.desc || ''}">
                              </div>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- CARDS DE CLIENTES / EMPRESAS QUE ATENDEMOS -->
                ${isEmpresasSection ? `
                  <div style="margin-top: 1.25rem; margin-bottom: 1.25rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.25rem;">
                    <h4 style="font-size: 1rem; font-weight: 700; color: #1E293B; margin-bottom: 0.25rem;">Empresas que Atendemos (6 Segmentos)</h4>
                    <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1rem;">Edite os 6 tipos de clientes atendidos exibidos na grade da página Empresas.</p>

                    <div style="display: flex; flex-direction: column; gap: 1rem;">
                      ${[0, 1, 2, 3, 4, 5].map(i => {
                        const cli = currentClients[i] || defaultClients[i];
                        return `
                          <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1rem;">
                            <div style="font-weight: 700; font-size: 0.82rem; color: #178272; margin-bottom: 0.5rem; text-transform: uppercase;">
                              Segmento ${i + 1}
                            </div>
                            <div class="form-grid-2">
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Nome do Segmento</label>
                                <input type="text" class="form-control sec-cli-title-${i}" value="${cli.title || ''}" placeholder="Ex: Clínicas">
                              </div>
                              <div class="form-group" style="margin-bottom: 0;">
                                <label class="form-label" style="font-size: 0.8rem;">Descrição do Atendimento</label>
                                <input type="text" class="form-control sec-cli-desc-${i}" value="${cli.desc || ''}" placeholder="Ex: Atendimento ágil para...">
                              </div>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                ` : ''}

                <!-- UPLOAD DE IMAGEM / BANNER DA SEÇÃO -->
                ${showImageUpload ? `
                  <div class="form-group" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--admin-border);">
                    <label class="form-label" style="font-weight: 700; color: #1E293B;">${imageLabel}</label>
                    <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1.25rem; margin-bottom: 0.75rem;">
                      <div style="display: flex; gap: 1.25rem; align-items: flex-start; flex-wrap: wrap;">
                        <div style="width: 100%; max-width: 240px; height: 135px; border-radius: 8px; overflow: hidden; background: #E2E8F0; border: 1px solid #CBD5E1; flex-shrink: 0; box-shadow: 0 2px 6px rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center; position: relative;">
                          <img class="preview-sec-img" src="${sec.image_url || fallbackImg}" alt="Preview" style="width: 100%; height: 100%; object-fit: contain; background: #FFFFFF; display: block;" onerror="this.src='${fallbackImg}';">
                        </div>
                        <div style="flex: 1; min-width: 200px; width: 100%;">
                          <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.85rem; line-height: 1.55;">
                            ${imageHelp}
                          </p>
                          <input type="file" class="file-sec-img" accept="image/*" style="display: none;">
                          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
                            <button type="button" class="btn-adm btn-adm-primary btn-adm-sm btn-upload-sec-img" style="display: inline-flex; align-items: center; gap: 0.4rem;">
                              📁 Fazer Upload de Nova Foto
                            </button>
                            <span class="upload-status-text" style="font-size: 0.82rem; color: #166534; font-weight: 700; display: none;">✅ Foto enviada com sucesso!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <label class="form-label" style="font-size: 0.8rem; color: #64748B;">Caminho da Imagem / URL:</label>
                    <input type="text" class="form-control sec-img-url" value="${sec.image_url || ''}" placeholder="/asserts/imagem.png ou URL">
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;

    // Listener para trocar de página
    document.getElementById('select-page-slug')?.addEventListener('change', (e) => {
      const newSlug = e.target.value;
      renderPageEditor(container, newSlug);
    });

    // Listeners de upload de imagem por seção
    container.querySelectorAll('.section-card').forEach(card => {
      const fileInput = card.querySelector('.file-sec-img');
      const uploadBtn = card.querySelector('.btn-upload-sec-img');
      const imgPreview = card.querySelector('.preview-sec-img');
      const urlInput = card.querySelector('.sec-img-url');
      const statusText = card.querySelector('.upload-status-text');

      uploadBtn?.addEventListener('click', () => fileInput?.click());

      urlInput?.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (imgPreview) imgPreview.src = val || '/asserts/hero-header-bg.png';
      });

      fileInput?.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (uploadBtn) {
          uploadBtn.disabled = true;
          uploadBtn.textContent = '⏳ Enviando...';
        }
        try {
          const res = await adminApi.uploadFile(file);
          if (urlInput) urlInput.value = res.url;
          if (imgPreview) imgPreview.src = res.url;
          if (statusText) {
            statusText.style.display = 'inline';
            setTimeout(() => { statusText.style.display = 'none'; }, 4000);
          }
        } catch (err) {
          alert('Erro no upload da imagem: ' + err.message);
        } finally {
          if (uploadBtn) {
            uploadBtn.disabled = false;
            uploadBtn.textContent = '📁 Fazer Upload de Nova Foto';
          }
        }
      });

      // Salvar Seção
      const saveBtn = card.querySelector('.btn-save-section');
      saveBtn?.addEventListener('click', async () => {
        const sectionKey = card.getAttribute('data-key');
        const currentSec = sections.find(s => s.section_key === sectionKey);
        saveBtn.disabled = true;
        saveBtn.textContent = 'Salvando...';

        try {
          let extraData = currentSec ? currentSec.extra_data : null;
          let subtitle = currentSec ? currentSec.subtitle : '';
          let content = currentSec ? currentSec.content : '';

          if (sectionKey === 'hero') {
            const heroSubtitleInput = card.querySelector('.sec-hero-subtitle');
            if (heroSubtitleInput) subtitle = heroSubtitleInput.value;
            const contentInput = card.querySelector('.sec-content');
            if (contentInput) content = contentInput.value;
          } else if (sectionKey === 'about_summary') {
            const aboutSubtitleInput = card.querySelector('.sec-about-subtitle');
            if (aboutSubtitleInput) subtitle = aboutSubtitleInput.value;

            const defaultIcons = [
              '/asserts/Group5576.png',
              '/asserts/Group5577.png',
              '/asserts/Group5578.png',
              '/asserts/feather_award.png'
            ];

            const newItems = [];
            for (let i = 0; i < 4; i++) {
              const titleEl = card.querySelector(`.sec-about-item-title-${i}`);
              const textEl = card.querySelector(`.sec-about-item-text-${i}`);
              if (titleEl || textEl) {
                newItems.push({
                  icon: defaultIcons[i],
                  title: titleEl?.value.trim() || '',
                  text: textEl?.value.trim() || ''
                });
              }
            }
            if (newItems.length > 0) {
              extraData = { items: newItems };
            }
          } else if (sectionKey === 'steps') {
            const newSteps = [];
            for (let i = 0; i < 6; i++) {
              const titleEl = card.querySelector(`.sec-step-title-${i}`);
              const descEl = card.querySelector(`.sec-step-desc-${i}`);
              if (titleEl || descEl) {
                newSteps.push({
                  step: `0${i + 1}`,
                  title: titleEl?.value.trim() || '',
                  desc: descEl?.value.trim() || ''
                });
              }
            }
            if (newSteps.length > 0) {
              extraData = { steps: newSteps };
            }
          } else if (sectionKey === 'licencas') {
            const newLic = [];
            for (let i = 0; i < 6; i++) {
              const titleEl = card.querySelector(`.sec-lic-title-${i}`);
              const descEl = card.querySelector(`.sec-lic-desc-${i}`);
              if (titleEl || descEl) {
                newLic.push({
                  title: titleEl?.value.trim() || '',
                  desc: descEl?.value.trim() || ''
                });
              }
            }
            if (newLic.length > 0) {
              extraData = { licenses: newLic };
            }
          } else if (sectionKey === 'tecnologia') {
            const newFeat = [];
            for (let i = 0; i < 6; i++) {
              const titleEl = card.querySelector(`.sec-feat-title-${i}`);
              const descEl = card.querySelector(`.sec-feat-desc-${i}`);
              if (titleEl || descEl) {
                newFeat.push({
                  title: titleEl?.value.trim() || '',
                  desc: descEl?.value.trim() || ''
                });
              }
            }
            if (newFeat.length > 0) {
              extraData = { features: newFeat };
            }
          } else if (sectionKey === 'valores') {
            const newVals = [];
            for (let i = 0; i < 3; i++) {
              const titleEl = card.querySelector(`.sec-val-title-${i}`);
              const descEl = card.querySelector(`.sec-val-desc-${i}`);
              if (titleEl || descEl) {
                newVals.push({
                  title: titleEl?.value.trim() || '',
                  desc: descEl?.value.trim() || ''
                });
              }
            }
            if (newVals.length > 0) {
              extraData = { values: newVals };
            }
          } else if (sectionKey === 'empresas_atendidas') {
            const newCli = [];
            for (let i = 0; i < 6; i++) {
              const titleEl = card.querySelector(`.sec-cli-title-${i}`);
              const descEl = card.querySelector(`.sec-cli-desc-${i}`);
              if (titleEl || descEl) {
                newCli.push({
                  title: titleEl?.value.trim() || '',
                  desc: descEl?.value.trim() || ''
                });
              }
            }
            if (newCli.length > 0) {
              extraData = { clients: newCli };
            }
          }

          const badgeInput = card.querySelector('.sec-badge');
          const payload = {
            title: card.querySelector('.sec-title')?.value,
            badge_text: badgeInput ? badgeInput.value : '',
            subtitle: subtitle,
            content: content,
            button_text: currentSec ? currentSec.button_text : '',
            button_link: currentSec ? currentSec.button_link : '',
            image_url: urlInput ? urlInput.value : (currentSec ? currentSec.image_url : ''),
            extra_data: extraData
          };

          await adminApi.updatePageSection(pageSlug, sectionKey, payload);
          alert(`Seção "${sectionKey}" atualizada com sucesso no site!`);
        } catch (err) {
          alert('Erro ao salvar seção: ' + err.message);
        } finally {
          saveBtn.disabled = false;
          saveBtn.textContent = '💾 Salvar Esta Seção';
        }
      });
    });

  } catch (err) {
    container.innerHTML = `<div class="admin-card" style="color: var(--admin-danger);">Erro ao carregar editor: ${err.message}</div>`;
  }
}
