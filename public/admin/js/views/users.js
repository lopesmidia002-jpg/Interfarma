import { adminApi } from '../admin-api.js';

export async function renderUsers(container) {
  container.innerHTML = `
    <div style="padding: 100px 0; text-align: center;">
      <div class="badge">Carregando usuários...</div>
    </div>
  `;

  let users = [];
  try {
    const res = await adminApi.getUsers();
    users = res.users || [];
  } catch (err) {
    users = [];
  }

  const currentUser = adminApi.getUser() || {};

  container.innerHTML = `
    <div style="max-width: 1040px; margin: 0 auto;">
      
      <!-- CABEÇALHO DA SEÇÃO -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 style="font-size: 1.45rem; font-weight: 800; color: #0F172A; margin-bottom: 0.25rem;">
            Usuários do Sistema
          </h2>
          <p style="font-size: 0.88rem; color: #64748B;">
            Gerencie as contas de acesso e defina o nível de permissão (Administrador ou Usuário Comum).
          </p>
        </div>

        <button type="button" id="btn-create-user" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
          <span>+</span> Novo Usuário
        </button>
      </div>

      <!-- TABELA DE USUÁRIOS (DESKTOP) -->
      <div class="admin-card desktop-table-view" style="padding: 0; overflow: hidden;">
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 1px solid var(--admin-border);">
                <th style="padding: 1rem 1.25rem; font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase;">Usuário</th>
                <th style="padding: 1rem 1.25rem; font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase;">E-mail</th>
                <th style="padding: 1rem 1.25rem; font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase;">Papel / Permissão</th>
                <th style="padding: 1rem 1.25rem; font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase;">Data de Criação</th>
                <th style="padding: 1rem 1.25rem; font-size: 0.8rem; font-weight: 700; color: #64748B; text-transform: uppercase; text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${users.length === 0 ? `
                <tr>
                  <td colspan="5" style="padding: 3rem; text-align: center; color: #94A3B8;">
                    Nenhum usuário cadastrado.
                  </td>
                </tr>
              ` : users.map(u => {
                const isSelf = u.id === currentUser.id;
                const roleBadge = u.role === 'admin'
                  ? '<span style="background: #E0F2FE; color: #0369A1; font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 9999px;">Administrador</span>'
                  : '<span style="background: #F1F5F9; color: #475569; font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 9999px;">Usuário Comum</span>';
                
                const createdDate = u.created_at ? new Date(u.created_at).toLocaleDateString('pt-BR') : '-';

                return `
                  <tr style="border-bottom: 1px solid var(--admin-border); transition: background 0.15s ease;">
                    <td style="padding: 1.1rem 1.25rem;">
                      <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: ${u.role === 'admin' ? '#0284C7' : '#64748B'}; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; flex-shrink: 0;">
                          ${u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div style="font-weight: 700; color: #0F172A; font-size: 0.92rem;">
                            ${u.name} ${isSelf ? '<span style="font-size: 0.72rem; color: #0284C7; font-weight: 600;">(Você)</span>' : ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style="padding: 1.1rem 1.25rem; font-size: 0.88rem; color: #64748B;">
                      ${u.email}
                    </td>
                    <td style="padding: 1.1rem 1.25rem;">
                      ${roleBadge}
                    </td>
                    <td style="padding: 1.1rem 1.25rem; font-size: 0.85rem; color: #64748B;">
                      ${createdDate}
                    </td>
                    <td style="padding: 1.1rem 1.25rem; text-align: right;">
                      <div style="display: inline-flex; gap: 0.5rem;">
                        <button type="button" class="btn btn-edit-user" data-id="${u.id}" data-name="${encodeURIComponent(u.name)}" data-email="${encodeURIComponent(u.email)}" data-role="${u.role}" style="padding: 0.4rem 0.75rem; font-size: 0.8rem; background: #F1F5F9; color: #1E293B; border-radius: 6px; border: 1px solid #E2E8F0; cursor: pointer;">
                          ✏️ Editar
                        </button>
                        ${!isSelf ? `
                          <button type="button" class="btn btn-delete-user" data-id="${u.id}" data-name="${encodeURIComponent(u.name)}" style="padding: 0.4rem 0.75rem; font-size: 0.8rem; background: #FEF2F2; color: #DC2626; border-radius: 6px; border: 1px solid #FEE2E2; cursor: pointer;">
                            🗑️ Excluir
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- CARDS DE USUÁRIOS (MOBILE) -->
      <div class="mobile-card-view">
        ${users.length === 0 ? `
          <div style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Nenhum usuário cadastrado.</div>
        ` : users.map(u => {
          const isSelf = u.id === currentUser.id;
          const roleBadge = u.role === 'admin'
            ? '<span style="background: #E0F2FE; color: #0369A1; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 9999px;">Administrador</span>'
            : '<span style="background: #F1F5F9; color: #475569; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 9999px;">Usuário Comum</span>';

          return `
            <div class="adm-mobile-card">
              <div style="display: flex; gap: 0.85rem; align-items: center; margin-bottom: 0.5rem;">
                <div style="width: 44px; height: 44px; border-radius: 50%; background: ${u.role === 'admin' ? '#0284C7' : '#64748B'}; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; flex-shrink: 0;">
                  ${u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style="flex: 1; min-width: 0;">
                  <h3 style="font-size: 1rem; font-weight: 700; color: #0F172A; margin-bottom: 0.15rem;">
                    ${u.name} ${isSelf ? '<span style="font-size: 0.75rem; color: #0284C7;">(Você)</span>' : ''}
                  </h3>
                  <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 0.35rem;">${u.email}</p>
                  <div>${roleBadge}</div>
                </div>
              </div>
              <div class="adm-mobile-card-actions">
                <button type="button" class="btn btn-primary btn-adm-sm btn-edit-user" data-id="${u.id}" data-name="${encodeURIComponent(u.name)}" data-email="${encodeURIComponent(u.email)}" data-role="${u.role}">
                  ✏️ Editar Usuário
                </button>
                ${!isSelf ? `
                  <button type="button" class="btn btn-delete-user btn-adm-sm" data-id="${u.id}" data-name="${encodeURIComponent(u.name)}" style="background: #FEF2F2; color: #DC2626; border: 1px solid #FEE2E2; flex: 0 0 46px;" title="Excluir">
                    🗑️
                  </button>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>

    </div>

    <!-- MODAL DE CADASTRO / EDIÇÃO DE USUÁRIO -->
    <div id="modal-user" class="modal-backdrop" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); z-index: 200; align-items: center; justify-content: center; padding: 1.5rem;">
      <div class="modal-box" style="background: #FFFFFF; border-radius: 16px; width: 100%; max-width: 500px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2); overflow: hidden;">
        
        <div style="padding: 1.5rem 1.75rem; border-bottom: 1px solid var(--admin-border); display: flex; justify-content: space-between; align-items: center;">
          <h3 id="modal-user-title" style="font-size: 1.25rem; font-weight: 800; color: #0F172A;">Novo Usuário</h3>
          <button type="button" id="btn-modal-close" style="background: transparent; border: none; font-size: 1.5rem; line-height: 1; color: #64748B; cursor: pointer;">&times;</button>
        </div>

        <form id="form-user" style="padding: 1.75rem;">
          <input type="hidden" id="user-id" value="">

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" for="user-name">Nome Completo</label>
            <input type="text" id="user-name" class="form-input" required placeholder="Ex: João da Silva">
          </div>

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" for="user-email">Endereço de E-mail</label>
            <input type="email" id="user-email" class="form-input" required placeholder="usuario@interfarma.com.br">
          </div>

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label" for="user-role">Nível de Permissão (Papel)</label>
            <select id="user-role" class="form-input" style="background-color: #FFFFFF;">
              <option value="admin">Administrador (Acesso Total)</option>
              <option value="user">Usuário Comum (Acesso Padrão)</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label class="form-label" for="user-password" id="label-user-password">Senha de Acesso</label>
            <input type="password" id="user-password" class="form-input" placeholder="Mínimo 6 caracteres">
            <small id="help-user-password" style="display: none; color: #64748B; font-size: 0.78rem; margin-top: 0.35rem;">Deixe em branco se não desejar alterar a senha atual.</small>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button type="button" id="btn-modal-cancel" class="btn" style="background: #F1F5F9; color: #475569;">
              Cancelar
            </button>
            <button type="submit" id="btn-modal-submit" class="btn btn-primary">
              Salvar Usuário
            </button>
          </div>
        </form>

      </div>
    </div>
  `;

  const modal = document.getElementById('modal-user');
  const modalTitle = document.getElementById('modal-user-title');
  const formUser = document.getElementById('form-user');
  const inputId = document.getElementById('user-id');
  const inputName = document.getElementById('user-name');
  const inputEmail = document.getElementById('user-email');
  const selectRole = document.getElementById('user-role');
  const inputPassword = document.getElementById('user-password');
  const labelPassword = document.getElementById('label-user-password');
  const helpPassword = document.getElementById('help-user-password');

  function openModal(isEdit = false, data = {}) {
    if (isEdit) {
      modalTitle.textContent = 'Editar Usuário';
      inputId.value = data.id || '';
      inputName.value = data.name || '';
      inputEmail.value = data.email || '';
      selectRole.value = data.role || 'user';
      inputPassword.value = '';
      inputPassword.removeAttribute('required');
      labelPassword.textContent = 'Nova Senha (Opcional)';
      helpPassword.style.display = 'block';
    } else {
      modalTitle.textContent = 'Novo Usuário';
      formUser.reset();
      inputId.value = '';
      inputPassword.setAttribute('required', 'required');
      labelPassword.textContent = 'Senha de Acesso';
      helpPassword.style.display = 'none';
      selectRole.value = 'admin';
    }
    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
    formUser.reset();
  }

  document.getElementById('btn-create-user')?.addEventListener('click', () => openModal(false));
  document.getElementById('btn-modal-close')?.addEventListener('click', closeModal);
  document.getElementById('btn-modal-cancel')?.addEventListener('click', closeModal);

  // Bind Editar
  container.querySelectorAll('.btn-edit-user').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = decodeURIComponent(btn.getAttribute('data-name') || '');
      const email = decodeURIComponent(btn.getAttribute('data-email') || '');
      const role = btn.getAttribute('data-role') || 'user';
      openModal(true, { id, name, email, role });
    });
  });

  // Bind Excluir
  container.querySelectorAll('.btn-delete-user').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const name = decodeURIComponent(btn.getAttribute('data-name') || '');
      if (!confirm(`Tem certeza que deseja excluir o usuário "${name}"?`)) return;

      try {
        await adminApi.deleteUser(id);
        alert('Usuário excluído com sucesso!');
        renderUsers(container);
      } catch (err) {
        alert(err.message || 'Erro ao excluir usuário.');
      }
    });
  });

  // Salvar formulário do modal
  formUser?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btnSubmit = document.getElementById('btn-modal-submit');
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Salvando...';

    const id = inputId.value;
    const payload = {
      name: inputName.value.trim(),
      email: inputEmail.value.trim(),
      role: selectRole.value,
      password: inputPassword.value
    };

    try {
      if (id) {
        await adminApi.updateUser(id, payload);
        alert('Usuário atualizado com sucesso!');
      } else {
        await adminApi.createUser(payload);
        alert('Usuário cadastrado com sucesso!');
      }
      closeModal();
      renderUsers(container);
    } catch (err) {
      alert(err.message || 'Erro ao salvar usuário.');
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Salvar Usuário';
    }
  });
}
