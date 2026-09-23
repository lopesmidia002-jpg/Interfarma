import { adminApi } from '../admin-api.js';

export async function renderProfile(container) {
  container.innerHTML = `
    <div style="padding: 100px 0; text-align: center;">
      <div class="badge">Carregando perfil...</div>
    </div>
  `;

  let user = null;
  try {
    const res = await adminApi.getMe();
    user = res.user || adminApi.getUser() || { name: 'Admin', email: '', role: 'admin' };
  } catch (err) {
    user = adminApi.getUser() || { name: 'Admin', email: '', role: 'admin' };
  }

  const roleLabel = user.role === 'admin' ? 'Administrador' : 'Usuário Comum';
  const roleBadgeColor = user.role === 'admin' ? 'background: #E0F2FE; color: #0369A1;' : 'background: #F1F5F9; color: #475569;';

  container.innerHTML = `
    <div style="max-width: 800px; margin: 0 auto;">
      
      <!-- CABEÇALHO DO PERFIL -->
      <div class="admin-card" style="margin-bottom: 2rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <div style="width: 68px; height: 68px; border-radius: 50%; background: #0284C7; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 1.85rem; font-weight: 800; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
          ${user.name ? user.name.charAt(0).toUpperCase() : 'I'}
        </div>
        <div style="flex: 1; min-width: 200px;">
          <h2 style="font-size: 1.45rem; font-weight: 800; color: #0F172A; margin-bottom: 0.25rem;">
            ${user.name || 'Usuário'}
          </h2>
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
            <span style="color: #64748B; font-size: 0.9rem;">${user.email}</span>
            <span style="font-size: 0.75rem; font-weight: 700; padding: 2px 10px; border-radius: 9999px; ${roleBadgeColor}">
              ${roleLabel}
            </span>
          </div>
        </div>
      </div>

      <!-- FORMULÁRIO DE DADOS PESSOAIS -->
      <div class="admin-card" style="margin-bottom: 2rem;">
        <div style="border-bottom: 1px solid var(--admin-border); padding-bottom: 1rem; margin-bottom: 1.75rem;">
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A;">Informações Pessoais</h3>
          <p style="font-size: 0.85rem; color: #64748B; margin-top: 0.2rem;">Atualize seu nome completo e endereço de e-mail de acesso.</p>
        </div>

        <form id="form-update-profile" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label" for="profile-name">Nome Completo</label>
              <input type="text" id="profile-name" class="form-input" required value="${user.name || ''}" placeholder="Seu nome">
            </div>

            <div class="form-group">
              <label class="form-label" for="profile-email">Endereço de E-mail</label>
              <input type="email" id="profile-email" class="form-input" required value="${user.email || ''}" placeholder="seu.email@interfarma.com.br">
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 0.5rem;">
            <button type="submit" id="btn-save-profile" class="btn btn-primary">
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>

      <!-- FORMULÁRIO DE ALTERAÇÃO DE SENHA -->
      <div class="admin-card">
        <div style="border-bottom: 1px solid var(--admin-border); padding-bottom: 1rem; margin-bottom: 1.75rem;">
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A;">Segurança & Senha</h3>
          <p style="font-size: 0.85rem; color: #64748B; margin-top: 0.2rem;">Altere sua senha de acesso ao painel administrativo.</p>
        </div>

        <form id="form-update-password" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="form-group">
            <label class="form-label" for="profile-current-pass">Senha Atual</label>
            <input type="password" id="profile-current-pass" class="form-input" required placeholder="Digite sua senha atual">
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label" for="profile-new-pass">Nova Senha</label>
              <input type="password" id="profile-new-pass" class="form-input" required minlength="6" placeholder="Mínimo 6 caracteres">
            </div>

            <div class="form-group">
              <label class="form-label" for="profile-confirm-pass">Confirmar Nova Senha</label>
              <input type="password" id="profile-confirm-pass" class="form-input" required minlength="6" placeholder="Repita a nova senha">
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 0.5rem;">
            <button type="submit" id="btn-save-password" class="btn" style="background: #0F172A; color: #FFFFFF; font-weight: 700;">
              Atualizar Senha
            </button>
          </div>
        </form>
      </div>

    </div>
  `;

  // Bind do formulário de dados pessoais
  document.getElementById('form-update-profile')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-save-profile');
    btn.disabled = true;
    btn.textContent = 'Salvando...';

    const name = document.getElementById('profile-name')?.value.trim();
    const email = document.getElementById('profile-email')?.value.trim();

    try {
      const res = await adminApi.updateProfile({ name, email });
      if (res.user) {
        adminApi.setUser(res.user);
        // Atualizar header badge
        const badgeAvatar = document.querySelector('.user-avatar');
        const badgeName = document.querySelector('.user-name-text');
        if (badgeAvatar) badgeAvatar.textContent = res.user.name.charAt(0).toUpperCase();
        if (badgeName) badgeName.textContent = res.user.name;
      }
      alert('Informações do perfil atualizadas com sucesso!');
      renderProfile(container);
    } catch (err) {
      alert(err.message || 'Erro ao atualizar perfil.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Salvar Alterações';
    }
  });

  // Bind do formulário de senha
  document.getElementById('form-update-password')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('profile-current-pass')?.value;
    const newPassword = document.getElementById('profile-new-pass')?.value;
    const confirmPassword = document.getElementById('profile-confirm-pass')?.value;

    if (newPassword !== confirmPassword) {
      alert('A nova senha e a confirmação de senha não coincidem.');
      return;
    }

    const btn = document.getElementById('btn-save-password');
    btn.disabled = true;
    btn.textContent = 'Atualizando...';

    try {
      await adminApi.updateProfile({ currentPassword, newPassword });
      alert('Senha atualizada com sucesso!');
      document.getElementById('form-update-password')?.reset();
    } catch (err) {
      alert(err.message || 'Erro ao alterar senha.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Atualizar Senha';
    }
  });
}
