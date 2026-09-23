import { adminApi } from '../admin-api.js';

export async function renderBlog(container) {
  container.innerHTML = `<div style="text-align: center; padding: 50px;"><span class="badge">Carregando artigos do blog...</span></div>`;

  try {
    const posts = await adminApi.getBlogPosts();

    container.innerHTML = `
      <div class="card-header-flex">
        <div>
          <h1 style="font-size: 1.8rem; margin-bottom: 0.25rem;">Artigos & Conteúdo do Blog</h1>
          <p style="color: var(--admin-text-muted); font-size: 0.95rem;">Crie novos posts, atualize capas, autores e gerencie publicações.</p>
        </div>
        <button id="btn-new-post" class="btn-adm btn-adm-primary">
          ➕ Escrever Novo Artigo
        </button>
      </div>

      <div class="admin-card">
        <!-- VISÃO TABELA (DESKTOP) -->
        <div class="table-responsive desktop-table-view">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Capa</th>
                <th>Título</th>
                <th>Categoria</th>
                <th>Autor</th>
                <th>Status</th>
                <th>Publicado em</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${(posts || []).length === 0 ? `
                <tr><td colspan="7" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Nenhum artigo publicado.</td></tr>
              ` : (posts || []).map(p => `
                <tr data-id="${p.id}">
                  <td>
                    <img src="${p.cover_image || '/asserts/InterFarma-Blog.jpg'}" alt="${p.title}" style="width: 50px; height: 36px; object-fit: cover; border-radius: var(--radius-sm);">
                  </td>
                  <td>
                    <strong>${p.title}</strong><br>
                    <small style="color: var(--admin-text-muted);">${p.slug}</small>
                  </td>
                  <td><span class="badge" style="font-size: 0.75rem;">${p.category}</span></td>
                  <td>${p.author || 'Equipe'}</td>
                  <td>
                    <span style="font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; ${p.is_published ? 'background: #DCFCE7; color: #166534;' : 'background: #FEE2E2; color: #DC2626;'}">
                      ${p.is_published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td style="font-size: 0.85rem; color: #94A3B8;">${new Date(p.published_at || p.created_at).toLocaleDateString('pt-BR')}</td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button class="btn-adm btn-adm-outline btn-adm-sm btn-edit-post" data-id="${p.id}">✏️ Editar</button>
                    <button class="btn-adm btn-adm-danger btn-adm-sm btn-del-post" data-id="${p.id}" data-title="${p.title}">🗑️</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- VISÃO CARDS RESPONSIVOS (MOBILE) -->
        <div class="mobile-card-view">
          ${(posts || []).length === 0 ? `
            <div style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Nenhum artigo publicado.</div>
          ` : (posts || []).map(p => `
            <div class="adm-mobile-card" data-id="${p.id}">
              <div style="display: flex; gap: 0.85rem; align-items: flex-start;">
                <img src="${p.cover_image || '/asserts/InterFarma-Blog.jpg'}" alt="${p.title}" style="width: 65px; height: 48px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--admin-border); flex-shrink: 0;">
                <div style="flex: 1; min-width: 0;">
                  <h3 style="font-size: 0.98rem; font-weight: 700; color: #0F172A; margin-bottom: 0.25rem; line-height: 1.3;">${p.title}</h3>
                  <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center;">
                    <span class="badge" style="font-size: 0.72rem;">${p.category}</span>
                    <span style="font-size: 0.72rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; ${p.is_published ? 'background: #DCFCE7; color: #166534;' : 'background: #FEE2E2; color: #DC2626;'}">
                      ${p.is_published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                </div>
              </div>
              <div class="adm-mobile-card-actions">
                <button class="btn-adm btn-adm-primary btn-adm-sm btn-edit-post" data-id="${p.id}">✏️ Editar Artigo</button>
                <button class="btn-adm btn-adm-danger btn-adm-sm btn-del-post" data-id="${p.id}" data-title="${p.title}" style="flex: 0 0 46px;" title="Excluir">🗑️</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- MODAL CRIAR / EDITAR POST -->
      <div class="modal-overlay" id="modal-post">
        <div class="modal-box" style="max-width: 820px; width: 95%;">
          <div class="modal-header">
            <h3 id="modal-post-title" style="font-size: 1.25rem; font-weight: 700; color: #1E293B;">Escrever Artigo</h3>
            <button type="button" class="btn-adm btn-adm-outline btn-adm-sm" id="btn-close-post-modal" style="border-radius: 50%; width: 32px; height: 32px; padding: 0; display: flex; align-items: center; justify-content: center;">✕</button>
          </div>
          <form id="form-post">
            <div class="modal-body">
              <input type="hidden" id="post-id">

              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label" style="font-weight: 600; color: #1E293B; margin-bottom: 0.4rem;">Título do Artigo *</label>
                <textarea id="post-title" class="form-control" rows="2" required placeholder="Ex: Como o Benefício de Medicamentos Reduz o Absenteísmo" style="font-size: 0.95rem; font-weight: 600; resize: vertical; min-height: 54px;"></textarea>
              </div>

              <div class="form-grid-3" style="margin-bottom: 1.25rem;">
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-weight: 600; color: #1E293B; margin-bottom: 0.4rem;">Categoria</label>
                  <input type="text" id="post-category" class="form-control" value="Saúde & Bem-Estar" placeholder="Ex: Gestão de RH">
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-weight: 600; color: #1E293B; margin-bottom: 0.4rem;">Autor</label>
                  <input type="text" id="post-author" class="form-control" value="Equipe Interfarma">
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-weight: 600; color: #1E293B; margin-bottom: 0.4rem;">Tempo de Leitura</label>
                  <input type="text" id="post-readtime" class="form-control" value="5 min">
                </div>
              </div>

              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label" style="font-weight: 600; color: #1E293B; margin-bottom: 0.4rem;">Imagem de Capa (Banner do Post)</label>
                <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 1.25rem; margin-bottom: 0.6rem;">
                  <div style="display: flex; gap: 1.5rem; align-items: center; flex-wrap: wrap;">
                    <div style="width: 260px; height: 145px; border-radius: 8px; overflow: hidden; background: #E2E8F0; border: 1px solid #CBD5E1; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.06); position: relative;">
                      <img id="post-preview-img" src="/asserts/Rectangle 755.png" alt="Preview da Capa" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.src='/asserts/Rectangle 755.png';">
                    </div>
                    <div style="flex: 1; min-width: 220px;">
                      <h4 style="font-size: 0.95rem; font-weight: 700; color: #1E293B; margin-bottom: 0.35rem;">Banner em Destaque</h4>
                      <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1rem; line-height: 1.5;">
                        Faça upload de uma imagem representativa para ilustrar o artigo nos cards e no cabeçalho do post.
                      </p>
                      <input type="file" id="post-file-img" accept="image/*" style="display: none;">
                      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button type="button" class="btn-adm btn-adm-primary btn-adm-sm" onclick="document.getElementById('post-file-img').click()" style="display: inline-flex; align-items: center; gap: 0.4rem;">
                          📁 Upload de Imagem
                        </button>
                        <button type="button" class="btn-adm btn-adm-outline btn-adm-sm" id="btn-reset-cover">
                          Restaurar Padrão
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <input type="text" id="post-img-url" class="form-control" placeholder="/asserts/Rectangle 755.png ou URL da imagem" style="font-size: 0.85rem;">
              </div>

              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label" style="font-weight: 600; color: #1E293B; margin-bottom: 0.4rem;">Resumo / Subtítulo *</label>
                <textarea id="post-summary" class="form-control" rows="3" placeholder="Breve introdução que aparece nos cards de listagem..." style="resize: vertical;"></textarea>
              </div>

              <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label" style="font-weight: 600; color: #1E293B; margin-bottom: 0.4rem;">Conteúdo Completo (Aceita HTML/Parágrafos) *</label>
                <textarea id="post-content" class="form-control" rows="8" required placeholder="<h2>Subtítulo</h2><p>Escreva aqui o texto completo do artigo...</p>" style="font-family: inherit; font-size: 0.9rem; line-height: 1.6; resize: vertical;"></textarea>
              </div>

              <div class="form-grid-2">
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-weight: 600; color: #1E293B; margin-bottom: 0.4rem;">Tags (separadas por vírgula)</label>
                  <input type="text" id="post-tags" class="form-control" placeholder="saude, farmacia, empresas">
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                  <label class="form-label" style="font-weight: 600; color: #1E293B; margin-bottom: 0.4rem;">Status</label>
                  <select id="post-status" class="form-control">
                    <option value="1">Publicado</option>
                    <option value="0">Rascunho</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-adm btn-adm-outline" id="btn-cancel-post">Cancelar</button>
              <button type="submit" class="btn-adm btn-adm-primary" id="btn-save-post">Salvar Artigo</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const modal = document.getElementById('modal-post');
    const form = document.getElementById('form-post');
    const modalTitle = document.getElementById('modal-post-title');

    const openModal = (post = null) => {
      form.reset();
      if (post) {
        modalTitle.textContent = 'Editar Artigo do Blog';
        document.getElementById('post-id').value = post.id;
        document.getElementById('post-title').value = post.title || '';
        document.getElementById('post-category').value = post.category || '';
        document.getElementById('post-author').value = post.author || '';
        document.getElementById('post-readtime').value = post.read_time || '';
        document.getElementById('post-img-url').value = post.cover_image || '';
        document.getElementById('post-preview-img').src = post.cover_image || '/asserts/Rectangle 755.png';
        document.getElementById('post-summary').value = post.summary || '';
        document.getElementById('post-content').value = post.content || '';
        document.getElementById('post-tags').value = post.tags || '';
        document.getElementById('post-status').value = post.is_published ? '1' : '0';
      } else {
        modalTitle.textContent = 'Escrever Novo Artigo';
        document.getElementById('post-id').value = '';
        document.getElementById('post-img-url').value = '/asserts/Rectangle 755.png';
        document.getElementById('post-preview-img').src = '/asserts/Rectangle 755.png';
      }
      modal.classList.add('open');
    };

    const closeModal = () => modal.classList.remove('open');

    document.getElementById('btn-new-post').addEventListener('click', () => openModal());
    document.getElementById('btn-close-post-modal').addEventListener('click', closeModal);
    document.getElementById('btn-cancel-post').addEventListener('click', closeModal);

    // Live preview ao digitar URL
    document.getElementById('post-img-url').addEventListener('input', (e) => {
      const val = e.target.value.trim();
      document.getElementById('post-preview-img').src = val || '/asserts/Rectangle 755.png';
    });

    // Botão restaurar padrão
    document.getElementById('btn-reset-cover')?.addEventListener('click', () => {
      document.getElementById('post-img-url').value = '/asserts/Rectangle 755.png';
      document.getElementById('post-preview-img').src = '/asserts/Rectangle 755.png';
    });

    // Upload de capa
    document.getElementById('post-file-img').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const res = await adminApi.uploadFile(file);
        document.getElementById('post-img-url').value = res.url;
        document.getElementById('post-preview-img').src = res.url;
      } catch (err) {
        alert('Erro ao enviar imagem: ' + err.message);
      }
    });

    // Submissão do Form
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('post-id').value;
      const payload = {
        title: document.getElementById('post-title').value.trim(),
        category: document.getElementById('post-category').value.trim(),
        author: document.getElementById('post-author').value.trim(),
        read_time: document.getElementById('post-readtime').value.trim(),
        cover_image: document.getElementById('post-img-url').value.trim(),
        summary: document.getElementById('post-summary').value.trim(),
        content: document.getElementById('post-content').value.trim(),
        tags: document.getElementById('post-tags').value.trim(),
        is_published: document.getElementById('post-status').value === '1'
      };

      try {
        if (id) {
          await adminApi.updateBlogPost(id, payload);
          alert('Artigo atualizado com sucesso!');
        } else {
          await adminApi.createBlogPost(payload);
          alert('Artigo publicado com sucesso!');
        }
        closeModal();
        renderBlog(container);
      } catch (err) {
        alert('Erro ao salvar post: ' + err.message);
      }
    });

    // Edição
    container.querySelectorAll('.btn-edit-post').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const post = posts.find(p => p.id == id);
        if (post) openModal(post);
      });
    });

    // Exclusão
    container.querySelectorAll('.btn-del-post').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const title = btn.getAttribute('data-title');
        if (confirm(`Deseja realmente excluir o artigo "${title}"?`)) {
          try {
            await adminApi.deleteBlogPost(id);
            alert('Artigo removido com sucesso.');
            renderBlog(container);
          } catch (err) {
            alert('Erro ao excluir artigo: ' + err.message);
          }
        }
      });
    });

  } catch (err) {
    container.innerHTML = `<div class="admin-card" style="color: var(--admin-danger);">Erro: ${err.message}</div>`;
  }
}
