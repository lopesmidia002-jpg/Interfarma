import { adminApi } from '../admin-api.js';

export async function renderMessages(container) {
  container.innerHTML = `<div style="text-align: center; padding: 50px;"><span class="badge">Carregando mensagens...</span></div>`;

  try {
    const messages = await adminApi.getMessages();

    container.innerHTML = `
      <div class="card-header-flex">
        <div>
          <h1 style="font-size: 1.8rem; margin-bottom: 0.25rem;">Mensagens & Leads de Contato</h1>
          <p style="color: var(--admin-text-muted); font-size: 0.95rem;">Controle contatos recebidos pelo formulário institucional do site.</p>
        </div>
      </div>

      <div class="admin-card">
        <!-- VISÃO TABELA (DESKTOP) -->
        <div class="table-responsive desktop-table-view">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Nome / E-mail</th>
                <th>Telefone / Empresa</th>
                <th>Assunto</th>
                <th>Mensagem</th>
                <th>Data</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${(messages || []).length === 0 ? `
                <tr><td colspan="7" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Nenhuma mensagem recebida.</td></tr>
              ` : (messages || []).map(m => `
                <tr data-id="${m.id}">
                  <td>
                    <select class="select-msg-status status-${m.status || 'unread'}" data-id="${m.id}">
                      <option value="unread" ${m.status === 'unread' ? 'selected' : ''}>Não lida</option>
                      <option value="read" ${m.status === 'read' ? 'selected' : ''}>Lida</option>
                      <option value="replied" ${m.status === 'replied' ? 'selected' : ''}>Respondida</option>
                    </select>
                  </td>
                  <td>
                    <strong style="color: #0F172A;">${m.name}</strong><br>
                    <a href="mailto:${m.email}" style="font-size: 0.85rem; color: var(--admin-primary); font-weight: 500;">${m.email}</a>
                  </td>
                  <td>
                    ${m.phone ? `<div style="font-size: 0.85rem; font-weight: 600; color: #334155;">📞 ${m.phone}</div>` : ''}
                    ${m.company ? `<div style="font-size: 0.8rem; color: var(--admin-text-muted); margin-top: 2px;">🏢 ${m.company}</div>` : ''}
                  </td>
                  <td><strong style="color: #1E293B;">${m.subject || 'Contato'}</strong></td>
                  <td style="max-width: 300px; font-size: 0.88rem; color: #334155; line-height: 1.5;">
                    ${m.message}
                  </td>
                  <td style="font-size: 0.82rem; color: #64748B; white-space: nowrap; font-weight: 500;">
                    ${new Date(m.created_at).toLocaleDateString('pt-BR')} ${new Date(m.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button class="btn-adm btn-adm-danger btn-adm-sm btn-del-msg" data-id="${m.id}" title="Excluir mensagem">🗑️ Excluir</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- VISÃO CARDS RESPONSIVOS (MOBILE) -->
        <div class="mobile-card-view">
          ${(messages || []).length === 0 ? `
            <div style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Nenhuma mensagem recebida.</div>
          ` : (messages || []).map(m => `
            <div class="adm-mobile-card" data-id="${m.id}">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; gap: 0.5rem;">
                <div>
                  <h3 style="font-size: 1.05rem; font-weight: 700; color: #0F172A; margin-bottom: 0.2rem;">${m.name}</h3>
                  <a href="mailto:${m.email}" style="font-size: 0.86rem; color: var(--admin-primary); font-weight: 600; display: block; word-break: break-all;">${m.email}</a>
                </div>
                <span style="font-size: 0.78rem; color: #64748B; font-weight: 600; white-space: nowrap; flex-shrink: 0; background: #F1F5F9; padding: 3px 8px; border-radius: 6px;">
                  ${new Date(m.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>

              ${(m.phone || m.company) ? `
                <div style="font-size: 0.85rem; color: #475569; margin-bottom: 0.6rem; display: flex; gap: 0.85rem; flex-wrap: wrap; font-weight: 500;">
                  ${m.phone ? `<span>📞 ${m.phone}</span>` : ''}
                  ${m.company ? `<span>🏢 ${m.company}</span>` : ''}
                </div>
              ` : ''}

              <div style="font-size: 0.86rem; font-weight: 700; color: #1E293B; margin-bottom: 0.35rem;">
                Assunto: <span style="font-weight: 600; color: #475569;">${m.subject || 'Contato'}</span>
              </div>

              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.85rem; font-size: 0.9rem; line-height: 1.55; color: #334155; margin-bottom: 0.85rem; word-break: break-word;">
                ${m.message}
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: space-between; border-top: 1px solid #F1F5F9; padding-top: 0.85rem; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="font-size: 0.82rem; font-weight: 700; color: #475569;">Status:</span>
                  <select class="select-msg-status status-${m.status || 'unread'}" data-id="${m.id}">
                    <option value="unread" ${m.status === 'unread' ? 'selected' : ''}>Não lida</option>
                    <option value="read" ${m.status === 'read' ? 'selected' : ''}>Lida</option>
                    <option value="replied" ${m.status === 'replied' ? 'selected' : ''}>Respondida</option>
                  </select>
                </div>
                <button class="btn-adm btn-adm-danger btn-adm-sm btn-del-msg" data-id="${m.id}" style="padding: 0.45rem 0.85rem;" title="Excluir">
                  🗑️ Excluir
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Alterar Status
    container.querySelectorAll('.select-msg-status').forEach(select => {
      select.addEventListener('change', async (e) => {
        const id = select.getAttribute('data-id');
        const status = e.target.value;
        try {
          await adminApi.updateMessageStatus(id, status);
          renderMessages(container);
        } catch (err) {
          alert('Erro ao atualizar status: ' + err.message);
        }
      });
    });

    // Excluir
    container.querySelectorAll('.btn-del-msg').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Deseja realmente excluir esta mensagem?')) {
          try {
            await adminApi.deleteMessage(id);
            alert('Mensagem excluída.');
            renderMessages(container);
          } catch (err) {
            alert('Erro ao excluir mensagem: ' + err.message);
          }
        }
      });
    });

  } catch (err) {
    container.innerHTML = `<div class="admin-card" style="color: var(--admin-danger);">Erro: ${err.message}</div>`;
  }
}
