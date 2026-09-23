import { adminApi } from './admin-api.js';

export function renderLoginScreen(container, onLoginSuccess) {
  container.innerHTML = `
    <div class="login-container">
      <div class="login-box">
        <img src="/asserts/IF_Logo Vetorizado 1.png" alt="Interfarma Logo" class="login-logo" onerror="this.style.display='none';">
        <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem;">Painel Administrativo</h2>
        <p style="color: var(--admin-text-muted); font-size: 0.9rem; margin-bottom: 2rem;">Entre com suas credenciais para gerenciar o site e conteúdos.</p>

        <form id="admin-login-form" style="display: flex; flex-direction: column; gap: 1.25rem; text-align: left;">
          <div class="form-group">
            <label class="form-label">E-mail de Acesso</label>
            <input type="email" id="login-email" class="form-control" required value="admin@interfarma.com.br" placeholder="admin@interfarma.com.br">
          </div>

          <div class="form-group">
            <label class="form-label">Senha</label>
            <input type="password" id="login-password" class="form-control" required value="admin123456" placeholder="Sua senha">
          </div>

          <button type="submit" id="btn-submit-login" class="btn-adm btn-adm-primary" style="padding: 0.85rem; font-size: 1rem; width: 100%; margin-top: 0.5rem;">
            Entrar no Painel
          </button>
        </form>

        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--admin-border); font-size: 0.85rem; color: var(--admin-text-muted);">
          <a href="/" style="color: var(--admin-primary); font-weight: 600;">&larr; Voltar para o Site Institucional</a>
        </div>
      </div>
    </div>
  `;

  const form = document.getElementById('admin-login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-submit-login');
    btn.disabled = true;
    btn.textContent = 'Autenticando...';

    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-password').value;

    try {
      await adminApi.login(email, pass);
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess();
      }
    } catch (err) {
      alert(err.message || 'Erro ao efetuar login.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Entrar no Painel';
    }
  });
}
