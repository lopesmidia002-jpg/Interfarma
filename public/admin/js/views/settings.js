import { adminApi } from '../admin-api.js';

export async function renderSettings(container) {
  container.innerHTML = `<div style="text-align: center; padding: 50px;"><span class="badge">Carregando configurações...</span></div>`;

  try {
    const settings = await adminApi.getSettings();

    container.innerHTML = `
      <div class="card-header-flex">
        <div>
          <h1 style="font-size: 1.8rem; margin-bottom: 0.25rem;">Identidade Visual, Cores & Informações</h1>
          <p style="color: var(--admin-text-muted); font-size: 0.95rem;">Altere logotipo, paleta de cores global e dados institucionais do site.</p>
        </div>
      </div>

      <form id="settings-form">
        <!-- CORES & IDENTIDADE VISUAL -->
        <div class="admin-card">
          <h3 style="font-size: 1.2rem; margin-bottom: 1.5rem; color: var(--admin-primary);">🎨 Paleta de Cores e Tema Global</h3>
          
          <div class="form-grid-3">
            <div class="form-group">
              <label class="form-label">Cor Primária (Botões, Destaques)</label>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <input type="color" id="set-primary-color" value="${settings.primary_color || '#0284C7'}" style="width: 44px; height: 40px; border: none; cursor: pointer; border-radius: var(--radius-sm);">
                <input type="text" class="form-control" id="set-primary-text" value="${settings.primary_color || '#0284C7'}">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Cor Secundária (Acentos, Ícones)</label>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <input type="color" id="set-secondary-color" value="${settings.secondary_color || '#0D9488'}" style="width: 44px; height: 40px; border: none; cursor: pointer; border-radius: var(--radius-sm);">
                <input type="text" class="form-control" id="set-secondary-text" value="${settings.secondary_color || '#0D9488'}">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Cor de Destaque / Gradiente</label>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <input type="color" id="set-accent-color" value="${settings.accent_color || '#0369A1'}" style="width: 44px; height: 40px; border: none; cursor: pointer; border-radius: var(--radius-sm);">
                <input type="text" class="form-control" id="set-accent-text" value="${settings.accent_color || '#0369A1'}">
              </div>
            </div>
          </div>
        </div>

        <!-- LOGOTIPO & MARCA -->
        <div class="admin-card">
          <h3 style="font-size: 1.2rem; margin-bottom: 1.5rem; color: var(--admin-primary);">🖼️ Logotipos e Favicon</h3>
          
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Logomarca Principal (Header & Footer)</label>
              <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem;">
                <img id="preview-logo" src="${settings.logo_url || '/asserts/IF_Logo Vetorizado 1.png'}" alt="Preview Logo" style="height: 44px; background: #F1F5F9; padding: 6px; border-radius: var(--radius-sm); border: 1px solid var(--admin-border); object-fit: contain;">
                <input type="file" id="file-logo" accept="image/*" style="display: none;">
                <button type="button" class="btn-adm btn-adm-outline btn-adm-sm" onclick="document.getElementById('file-logo').click()">Fazer Upload de Logo</button>
              </div>
              <input type="text" class="form-control" id="set-logo-url" value="${settings.logo_url || ''}" placeholder="/asserts/logo.png ou URL">
            </div>

            <div class="form-group">
              <label class="form-label">Favicon do Navegador</label>
              <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem;">
                <img id="preview-favicon" src="${settings.favicon_url || '/asserts/IF_Logo Vetorizado 1.png'}" alt="Preview Favicon" style="height: 32px; width: 32px; background: #F1F5F9; padding: 4px; border-radius: var(--radius-sm); border: 1px solid var(--admin-border); object-fit: contain;">
                <input type="file" id="file-favicon" accept="image/*" style="display: none;">
                <button type="button" class="btn-adm btn-adm-outline btn-adm-sm" onclick="document.getElementById('file-favicon').click()">Fazer Upload de Favicon</button>
              </div>
              <input type="text" class="form-control" id="set-favicon-url" value="${settings.favicon_url || ''}" placeholder="/asserts/favicon.png ou URL">
            </div>
          </div>
        </div>

        <!-- DADOS INSTITUCIONAIS & CONTATO -->
        <div class="admin-card">
          <h3 style="font-size: 1.2rem; margin-bottom: 1.5rem; color: var(--admin-primary);">🏢 Informações da Empresa & Canais de Atendimento</h3>
          
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Nome da Empresa</label>
              <input type="text" class="form-control" id="set-site-name" value="${settings.site_name || 'Interfarma'}">
            </div>

            <div class="form-group">
              <label class="form-label">CNPJ</label>
              <input type="text" class="form-control" id="set-cnpj" value="${settings.cnpj || '12.345.678/0001-90'}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Slogan Institucional</label>
            <textarea class="form-control" id="set-slogan" rows="2" style="resize: vertical; min-height: 48px;">${settings.slogan || ''}</textarea>
          </div>

          <div class="form-grid-3">
            <div class="form-group">
              <label class="form-label">Telefone Principal</label>
              <input type="text" class="form-control" id="set-phone" value="${settings.phone || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">WhatsApp Oficial (com DDD)</label>
              <input type="text" class="form-control" id="set-whatsapp" value="${settings.whatsapp || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">E-mail de Contato</label>
              <input type="email" class="form-control" id="set-email" value="${settings.email || ''}">
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Endereço Completo</label>
            <textarea class="form-control" id="set-address" rows="2" style="resize: vertical; min-height: 48px;">${settings.address || ''}</textarea>
          </div>
        </div>

        <!-- BOTÃO SALVAR -->
        <div style="display: flex; justify-content: flex-end; margin-bottom: 3rem;">
          <button type="submit" id="btn-save-settings" class="btn-adm btn-adm-primary" style="padding: 0.85rem 2.5rem; font-size: 1rem;">
            💾 Salvar Todas as Configurações
          </button>
        </div>
      </form>
    `;

    // Sincronizar inputs de cor com campos de texto
    ['primary', 'secondary', 'accent'].forEach(type => {
      const picker = document.getElementById(`set-${type}-color`);
      const text = document.getElementById(`set-${type}-text`);
      picker.addEventListener('input', () => { text.value = picker.value; });
      text.addEventListener('input', () => { if (/^#[0-9A-F]{6}$/i.test(text.value)) picker.value = text.value; });
    });

    // Upload de Logo
    document.getElementById('file-logo')?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const uploadRes = await adminApi.uploadFile(file);
        document.getElementById('set-logo-url').value = uploadRes.url;
        document.getElementById('preview-logo').src = uploadRes.url;
        alert('Logotipo enviado com sucesso!');
      } catch (err) {
        alert('Erro ao enviar logo: ' + err.message);
      }
    });

    // Upload de Favicon
    document.getElementById('file-favicon')?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const uploadRes = await adminApi.uploadFile(file);
        document.getElementById('set-favicon-url').value = uploadRes.url;
        document.getElementById('preview-favicon').src = uploadRes.url;
        alert('Favicon enviado com sucesso!');
      } catch (err) {
        alert('Erro ao enviar favicon: ' + err.message);
      }
    });

    // Submissão do Formulário
    document.getElementById('settings-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-save-settings');
      btn.disabled = true;
      btn.textContent = 'Salvando...';

      try {
        const payload = {
          site_name: document.getElementById('set-site-name').value,
          cnpj: document.getElementById('set-cnpj').value,
          slogan: document.getElementById('set-slogan').value,
          primary_color: document.getElementById('set-primary-text').value,
          secondary_color: document.getElementById('set-secondary-text').value,
          accent_color: document.getElementById('set-accent-text').value,
          logo_url: document.getElementById('set-logo-url').value,
          favicon_url: document.getElementById('set-favicon-url').value,
          phone: document.getElementById('set-phone').value,
          whatsapp: document.getElementById('set-whatsapp').value,
          email: document.getElementById('set-email').value,
          address: document.getElementById('set-address').value
        };

        await adminApi.updateSettings(payload);
        alert('Configurações atualizadas com sucesso! As alterações já estão visíveis no site.');
      } catch (err) {
        alert('Erro ao salvar configurações: ' + err.message);
      } finally {
        btn.disabled = false;
        btn.textContent = '💾 Salvar Todas as Configurações';
      }
    });
  } catch (err) {
    container.innerHTML = `<div class="admin-card" style="color: var(--admin-danger);">Erro ao carregar configurações: ${err.message}</div>`;
  }
}
