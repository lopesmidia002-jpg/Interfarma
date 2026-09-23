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

  try {
    const data = await adminApi.getPageAdminSections(pageSlug);
    const sections = data.sections || [];

    container.innerHTML = `
      <div class="card-header-flex">
        <div>
          <h1 style="font-size: 1.8rem; margin-bottom: 0.25rem;">Editor de Páginas: ${pageNames[pageSlug] || pageSlug}</h1>
          <p style="color: var(--admin-text-muted); font-size: 0.95rem;">Altere títulos, subtítulos, textos, botões, imagens e elementos visuais desta página.</p>
        </div>

        <!-- SELETOR RÁPIDO DE PÁGINAS -->
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <label style="font-size: 0.85rem; font-weight: 600; color: var(--admin-text-muted);">Selecionar Página:</label>
          <select id="select-page-slug" class="form-control" style="width: auto; font-weight: 600;">
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
          ${sections.map((sec, idx) => `
            <div class="admin-card section-card" data-key="${sec.section_key}">
              <div class="card-header-flex" style="border-bottom: 1px solid var(--admin-border); padding-bottom: 1rem; margin-bottom: 1.25rem;">
                <div>
                  <span class="badge" style="margin-bottom: 0.25rem;">Seção: ${sec.section_key.toUpperCase()}</span>
                  <h3 style="font-size: 1.25rem; color: var(--admin-primary);">${sec.title || `Seção ${sec.section_key}`}</h3>
                </div>
                <button type="button" class="btn-adm btn-adm-primary btn-save-section" data-key="${sec.section_key}">
                  💾 Salvar Esta Seção
                </button>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Título Principal</label>
                  <input type="text" class="form-control sec-title" value="${sec.title || ''}">
                </div>

                <div class="form-group">
                  <label class="form-label">Texto do Badge / Selo</label>
                  <input type="text" class="form-control sec-badge" value="${sec.badge_text || ''}">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Subtítulo / Descrição Curta</label>
                <input type="text" class="form-control sec-subtitle" value="${sec.subtitle || ''}">
              </div>

              <div class="form-group">
                <label class="form-label">Conteúdo / Texto Explicativo Completo</label>
                <textarea class="form-control sec-content" rows="3">${sec.content || ''}</textarea>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Texto do Botão (CTA)</label>
                  <input type="text" class="form-control sec-btn-text" value="${sec.button_text || ''}">
                </div>

                <div class="form-group">
                  <label class="form-label">Link de Destino do Botão</label>
                  <input type="text" class="form-control sec-btn-link" value="${sec.button_link || ''}">
                </div>
              </div>

              <!-- UPLOAD DE IMAGEM DA SEÇÃO -->
              <div class="form-group" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--admin-border);">
                <label class="form-label" style="font-weight: 700; color: #1E293B;">Imagem / Banner da Seção</label>
                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1.25rem; margin-bottom: 0.75rem;">
                  <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
                    <div style="width: 220px; height: 130px; border-radius: 8px; overflow: hidden; background: #E2E8F0; border: 1px solid #CBD5E1; flex-shrink: 0; box-shadow: 0 2px 6px rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center; position: relative;">
                      <img class="preview-sec-img" src="${sec.image_url || '/asserts/Group-551222.png'}" alt="Preview" style="width: 100%; height: 100%; object-fit: contain; background: #FFFFFF; display: block;" onerror="this.src='/asserts/Group-551222.png';">
                    </div>
                    <div style="flex: 1; min-width: 220px;">
                      <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 0.75rem; line-height: 1.5;">
                        Selecione uma imagem (JPG, PNG, WEBP, SVG) para enviar. O upload salvará a foto no servidor e atualizará a seção no site assim que clicar em Salvar.
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

              <!-- DADOS EXTRAS EM JSON (Cards, passos, itens) -->
              ${sec.extra_data ? `
                <div class="form-group" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed var(--admin-border);">
                  <label class="form-label" style="display: flex; justify-content: space-between;">
                    <span>Itens Estruturados (Passos / Cards / Métricas JSON)</span>
                    <small style="color: var(--admin-text-muted);">Formato JSON Válido</small>
                  </label>
                  <textarea class="form-control sec-extra-data" rows="5" style="font-family: monospace; font-size: 0.85rem;">${JSON.stringify(sec.extra_data, null, 2)}</textarea>
                </div>
              ` : ''}
            </div>
          `).join('')}
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
        imgPreview.src = val || '/asserts/Group-551222.png';
      });

      fileInput?.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        uploadBtn.disabled = true;
        uploadBtn.textContent = '⏳ Enviando...';
        try {
          const res = await adminApi.uploadFile(file);
          urlInput.value = res.url;
          imgPreview.src = res.url;
          if (statusText) {
            statusText.style.display = 'inline';
            setTimeout(() => { statusText.style.display = 'none'; }, 4000);
          }
        } catch (err) {
          alert('Erro no upload da imagem: ' + err.message);
        } finally {
          uploadBtn.disabled = false;
          uploadBtn.textContent = '📁 Fazer Upload de Nova Foto';
        }
      });

      // Salvar Seção
      const saveBtn = card.querySelector('.btn-save-section');
      saveBtn?.addEventListener('click', async () => {
        const sectionKey = card.getAttribute('data-key');
        saveBtn.disabled = true;
        saveBtn.textContent = 'Salvando...';

        try {
          let extraData = null;
          const extraDataInput = card.querySelector('.sec-extra-data');
          if (extraDataInput && extraDataInput.value.trim()) {
            try {
              extraData = JSON.parse(extraDataInput.value.trim());
            } catch (jsonErr) {
              alert('O campo de Itens Estruturados contém JSON inválido: ' + jsonErr.message);
              saveBtn.disabled = false;
              saveBtn.textContent = '💾 Salvar Esta Seção';
              return;
            }
          }

          const payload = {
            title: card.querySelector('.sec-title')?.value,
            badge_text: card.querySelector('.sec-badge')?.value,
            subtitle: card.querySelector('.sec-subtitle')?.value,
            content: card.querySelector('.sec-content')?.value,
            button_text: card.querySelector('.sec-btn-text')?.value,
            button_link: card.querySelector('.sec-btn-link')?.value,
            image_url: urlInput?.value,
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
