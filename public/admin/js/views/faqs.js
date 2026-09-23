import { adminApi } from '../admin-api.js';

export async function renderFaqs(container) {
  container.innerHTML = `<div style="text-align: center; padding: 50px;"><span class="badge">Carregando FAQs...</span></div>`;

  try {
    const data = await adminApi.getFaqs();
    const faqs = data.faqs || [];

    container.innerHTML = `
      <div class="card-header-flex">
        <div>
          <h1 style="font-size: 1.8rem; margin-bottom: 0.25rem;">Perguntas Frequentes (FAQ)</h1>
          <p style="color: var(--admin-text-muted); font-size: 0.95rem;">Adicione e edite perguntas e respostas organizadas por categorias.</p>
        </div>
        <button id="btn-new-faq" class="btn-adm btn-adm-primary">
          ➕ Adicionar Nova Pergunta
        </button>
      </div>

      <div class="admin-card">
        <div class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Ordem</th>
                <th>Categoria</th>
                <th>Pergunta</th>
                <th>Resposta</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${faqs.length === 0 ? `
                <tr><td colspan="5" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Nenhuma pergunta cadastrada.</td></tr>
              ` : faqs.map(f => `
                <tr data-id="${f.id}">
                  <td><strong>#${f.sort_order || 0}</strong></td>
                  <td><span class="badge" style="font-size: 0.75rem;">${f.category}</span></td>
                  <td><strong>${f.question}</strong></td>
                  <td style="color: var(--admin-text-muted); font-size: 0.85rem; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${f.answer}
                  </td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button class="btn-adm btn-adm-outline btn-adm-sm btn-edit-faq" data-id="${f.id}">✏️ Editar</button>
                    <button class="btn-adm btn-adm-danger btn-adm-sm btn-del-faq" data-id="${f.id}">🗑️</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- MODAL FAQ -->
      <div class="modal-overlay" id="modal-faq">
        <div class="modal-box">
          <div class="modal-header">
            <h3 id="modal-faq-title">Nova Pergunta</h3>
            <button type="button" class="btn-adm btn-adm-outline btn-adm-sm" id="btn-close-faq-modal">✕</button>
          </div>
          <form id="form-faq">
            <div class="modal-body">
              <input type="hidden" id="faq-id">

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Categoria *</label>
                  <input type="text" id="faq-category" class="form-control" required value="Utilização & Benefício" placeholder="Ex: Geral, Empresas...">
                </div>
                <div class="form-group">
                  <label class="form-label">Ordem de Exibição</label>
                  <input type="number" id="faq-order" class="form-control" value="0">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Pergunta *</label>
                <input type="text" id="faq-question" class="form-control" required placeholder="Ex: Como funciona o desconto na farmácia?">
              </div>

              <div class="form-group">
                <label class="form-label">Resposta Detalhada *</label>
                <textarea id="faq-answer" class="form-control" rows="4" required placeholder="Escreva a resposta clara para o usuário..."></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-adm btn-adm-outline" id="btn-cancel-faq">Cancelar</button>
              <button type="submit" class="btn-adm btn-adm-primary" id="btn-save-faq">Salvar Pergunta</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const modal = document.getElementById('modal-faq');
    const form = document.getElementById('form-faq');
    const modalTitle = document.getElementById('modal-faq-title');

    const openModal = (faq = null) => {
      form.reset();
      if (faq) {
        modalTitle.textContent = 'Editar Pergunta do FAQ';
        document.getElementById('faq-id').value = faq.id;
        document.getElementById('faq-category').value = faq.category || 'Geral';
        document.getElementById('faq-order').value = faq.sort_order || 0;
        document.getElementById('faq-question').value = faq.question || '';
        document.getElementById('faq-answer').value = faq.answer || '';
      } else {
        modalTitle.textContent = 'Adicionar Pergunta ao FAQ';
        document.getElementById('faq-id').value = '';
        document.getElementById('faq-order').value = faqs.length + 1;
      }
      modal.classList.add('open');
    };

    const closeModal = () => modal.classList.remove('open');

    document.getElementById('btn-new-faq').addEventListener('click', () => openModal());
    document.getElementById('btn-close-faq-modal').addEventListener('click', closeModal);
    document.getElementById('btn-cancel-faq').addEventListener('click', closeModal);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('faq-id').value;
      const payload = {
        category: document.getElementById('faq-category').value.trim(),
        sort_order: parseInt(document.getElementById('faq-order').value) || 0,
        question: document.getElementById('faq-question').value.trim(),
        answer: document.getElementById('faq-answer').value.trim()
      };

      try {
        if (id) {
          await adminApi.updateFaq(id, payload);
          alert('FAQ atualizada com sucesso!');
        } else {
          await adminApi.createFaq(payload);
          alert('FAQ cadastrada com sucesso!');
        }
        closeModal();
        renderFaqs(container);
      } catch (err) {
        alert('Erro ao salvar FAQ: ' + err.message);
      }
    });

    container.querySelectorAll('.btn-edit-faq').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const f = faqs.find(item => item.id == id);
        if (f) openModal(f);
      });
    });

    container.querySelectorAll('.btn-del-faq').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Deseja realmente remover esta pergunta?')) {
          try {
            await adminApi.deleteFaq(id);
            alert('FAQ removida.');
            renderFaqs(container);
          } catch (err) {
            alert('Erro ao remover FAQ: ' + err.message);
          }
        }
      });
    });

  } catch (err) {
    container.innerHTML = `<div class="admin-card" style="color: var(--admin-danger);">Erro: ${err.message}</div>`;
  }
}
