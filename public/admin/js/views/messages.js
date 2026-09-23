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
        <div class="table-responsive">
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
                    <select class="form-control select-msg-status" data-id="${m.id}" style="padding: 4px 8px; font-size: 0.8rem; font-weight: 700; width: auto; ${m.status === 'unread' ? 'color: #DC2626; background: #FEE2E2;' : m.status === 'replied' ? 'color: #166534; background: #DCFCE7;' : 'color: #475569; background: #F1F5F9;'}">
                      <option value="unread" ${m.status === 'unread' ? 'selected' : ''}>Não lida</option>
                      <option value="read" ${m.status === 'read' ? 'selected' : ''}>Lida</option>
                      <option value="replied" ${m.status === 'replied' ? 'selected' : ''}>Respondida</option>
                    </select>
                  </td>
                  <td>
                    <strong>${m.name}</strong><br>
                    <a href="mailto:${m.email}" style="font-size: 0.8rem; color: var(--admin-primary);">${m.email}</a>
                  </td>
                  <td>
                    ${m.phone ? `<div>📞 ${m.phone}</div>` : ''}
                    ${m.company ? `<div style="font-size: 0.8rem; color: var(--admin-text-muted);">🏢 ${m.company}</div>` : ''}
                  </td>
                  <td><strong>${m.subject || 'Contato'}</strong></td>
                  <td style="max-width: 280px; font-size: 0.85rem; color: #334155;">
                    ${m.message}
                  </td>
                  <td style="font-size: 0.8rem; color: #94A3B8; white-space: nowrap;">
                    ${new Date(m.created_at).toLocaleDateString('pt-BR')} ${new Date(m.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button class="btn-adm btn-adm-danger btn-adm-sm btn-del-msg" data-id="${m.id}">🗑️</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
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
