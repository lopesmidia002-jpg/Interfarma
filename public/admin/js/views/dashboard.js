import { adminApi } from '../admin-api.js';

export async function renderDashboard(container) {
  container.innerHTML = `<div style="text-align: center; padding: 50px;"><span class="badge">Carregando métricas...</span></div>`;

  try {
    const [medicinesData, blogData, faqsData, messagesData] = await Promise.all([
      adminApi.getMedicines({ limit: 100 }),
      adminApi.getBlogPosts(),
      adminApi.getFaqs(),
      adminApi.getMessages()
    ]);

    const totalMeds = (medicinesData?.medicines || []).length;
    const totalPosts = (blogData || []).length;
    const totalFaqs = (faqsData?.faqs || []).length;
    const totalMessages = (messagesData || []).length;
    const unreadMessages = (messagesData || []).filter(m => m.status === 'unread').length;

    container.innerHTML = `
      <div class="card-header-flex">
        <div>
          <h1 style="font-size: 1.8rem; margin-bottom: 0.25rem;">Visão Geral do Painel</h1>
          <p style="color: var(--admin-text-muted); font-size: 0.95rem;">Bem-vindo ao Sistema de Gerenciamento de Conteúdo Interfarma.</p>
        </div>
        <a href="/" target="_blank" class="btn-adm btn-adm-outline">
          🌐 Ver Site Institucional &rarr;
        </a>
      </div>

      <!-- CARDS DE MÉTRICAS -->
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-icon">💊</div>
          <div class="stat-info">
            <div class="stat-value">${totalMeds}</div>
            <div class="stat-label">Medicamentos Cadastrados</div>
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-icon">📰</div>
          <div class="stat-info">
            <div class="stat-value">${totalPosts}</div>
            <div class="stat-label">Artigos no Blog</div>
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-icon">❓</div>
          <div class="stat-info">
            <div class="stat-value">${totalFaqs}</div>
            <div class="stat-label">Perguntas no FAQ</div>
          </div>
        </div>

        <div class="stat-box">
          <div class="stat-icon" style="background: ${unreadMessages > 0 ? '#FEE2E2' : '#DCFCE7'}; color: ${unreadMessages > 0 ? '#DC2626' : '#166534'};">
            ✉️
          </div>
          <div class="stat-info">
            <div class="stat-value">${totalMessages}</div>
            <div class="stat-label">Mensagens (${unreadMessages} novas)</div>
          </div>
        </div>
      </div>

      <!-- ATALHOS RÁPIDOS & ÚLTIMOS CONTATOS -->
      <div class="dashboard-main-grid">
        <!-- ÚLTIMAS MENSAGENS -->
        <div class="admin-card">
          <div class="card-header-flex">
            <h3 style="font-size: 1.2rem;">Últimos Contatos Recebidos</h3>
            <button class="btn-adm btn-adm-outline btn-adm-sm nav-shortcut" data-view="messages">Ver Todas</button>
          </div>

          ${(messagesData || []).slice(0, 5).length === 0 ? `
            <p style="color: var(--admin-text-muted); text-align: center; padding: 2rem 0;">Nenhuma mensagem recebida até o momento.</p>
          ` : `
            <!-- VISÃO TABELA (DESKTOP) -->
            <div class="table-responsive desktop-table-view">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Assunto</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  ${(messagesData || []).slice(0, 5).map(m => `
                    <tr>
                      <td><strong>${m.name}</strong><br><small style="color: #94A3B8;">${m.email}</small></td>
                      <td>${m.subject || 'Contato'}</td>
                      <td>
                        <span style="font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; ${m.status === 'unread' ? 'background: #FEE2E2; color: #DC2626;' : m.status === 'replied' ? 'background: #DCFCE7; color: #166534;' : 'background: #E2E8F0; color: #475569;'}">
                          ${m.status === 'unread' ? 'Não lida' : m.status === 'replied' ? 'Respondida' : 'Lida'}
                        </span>
                      </td>
                      <td style="font-size: 0.8rem; color: #94A3B8;">${new Date(m.created_at).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- VISÃO CARDS RESPONSIVOS (MOBILE) -->
            <div class="mobile-card-view">
              ${(messagesData || []).slice(0, 5).map(m => `
                <div class="adm-mobile-card" style="padding: 0.9rem; margin-bottom: 0.65rem;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.35rem;">
                    <div>
                      <strong style="font-size: 0.95rem; color: #0F172A; display: block;">${m.name}</strong>
                      <span style="font-size: 0.82rem; color: #64748B;">${m.email}</span>
                    </div>
                    <span style="font-size: 0.72rem; font-weight: 700; padding: 2px 7px; border-radius: 4px; flex-shrink: 0; ${m.status === 'unread' ? 'background: #FEE2E2; color: #DC2626;' : m.status === 'replied' ? 'background: #DCFCE7; color: #166534;' : 'background: #E2E8F0; color: #475569;'}">
                      ${m.status === 'unread' ? 'Não lida' : m.status === 'replied' ? 'Respondida' : 'Lida'}
                    </span>
                  </div>
                  <div style="font-size: 0.84rem; color: #334155; margin-bottom: 0.25rem;">
                    <strong>Assunto:</strong> ${m.subject || 'Contato'}
                  </div>
                  <div style="font-size: 0.76rem; color: #94A3B8; text-align: right;">
                    📅 ${new Date(m.created_at).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- ATALHOS DO CMS -->
        <div class="admin-card">
          <h3 style="font-size: 1.2rem; margin-bottom: 1.25rem;">Ações Rápidas</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <button class="btn-adm btn-adm-outline nav-shortcut" data-view="settings" style="justify-content: flex-start; text-align: left; padding: 0.85rem 1rem;">
              🎨 Alterar Cores, Logos e Identidade Visual
            </button>
            <button class="btn-adm btn-adm-outline nav-shortcut" data-view="page-home" style="justify-content: flex-start; text-align: left; padding: 0.85rem 1rem;">
              🏠 Editar Elementos da Página Home
            </button>
            <button class="btn-adm btn-adm-outline nav-shortcut" data-view="medicines" style="justify-content: flex-start; text-align: left; padding: 0.85rem 1rem;">
              💊 Cadastrar Novo Medicamento
            </button>
            <button class="btn-adm btn-adm-outline nav-shortcut" data-view="blog" style="justify-content: flex-start; text-align: left; padding: 0.85rem 1rem;">
              📰 Publicar Novo Artigo no Blog
            </button>
            <button class="btn-adm btn-adm-outline nav-shortcut" data-view="faqs" style="justify-content: flex-start; text-align: left; padding: 0.85rem 1rem;">
              ❓ Gerenciar Perguntas do FAQ
            </button>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.nav-shortcut').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.getAttribute('data-view');
        window.dispatchEvent(new CustomEvent('admin:navigate', { detail: { view } }));
      });
    });
  } catch (err) {
    container.innerHTML = `<div class="admin-card" style="color: var(--admin-danger);">Erro ao carregar métricas: ${err.message}</div>`;
  }
}
