import { adminApi } from '../admin-api.js';

export async function renderMedicines(container) {
  container.innerHTML = `<div style="text-align: center; padding: 50px;"><span class="badge">Carregando medicamentos...</span></div>`;

  try {
    const data = await adminApi.getMedicines({ limit: 200 });
    const medicines = data.medicines || [];

    container.innerHTML = `
      <div class="card-header-flex">
        <div>
          <h1 style="font-size: 1.8rem; margin-bottom: 0.25rem;">Catálogo de Medicamentos</h1>
          <p style="color: var(--admin-text-muted); font-size: 0.95rem;">Cadastre, edite fotos, defina preços e descontos para a rede credenciada.</p>
        </div>
        <button id="btn-new-med" class="btn-adm btn-adm-primary">
          ➕ Adicionar Novo Medicamento
        </button>
      </div>

      <div class="admin-card">
        <div class="card-header-flex" style="margin-bottom: 1rem;">
          <input type="text" id="filter-meds" class="form-control" placeholder="Filtrar por nome ou princípio ativo..." style="max-width: 350px;">
          <div style="font-size: 0.85rem; color: var(--admin-text-muted); font-weight: 600;">
            Total: <span id="total-med-count">${medicines.length}</span> medicamentos
          </div>
        </div>

        <div class="table-responsive">
          <table class="admin-table" id="table-meds">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome / Princípio Ativo</th>
                <th>Categoria</th>
                <th>Preço Orig.</th>
                <th>Desconto</th>
                <th>Preço Final</th>
                <th>Receita</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${medicines.length === 0 ? `
                <tr><td colspan="8" style="text-align: center; color: var(--admin-text-muted); padding: 2rem;">Nenhum medicamento cadastrado.</td></tr>
              ` : medicines.map(m => `
                <tr data-id="${m.id}" data-search="${m.name.toLowerCase()} ${m.active_principle?.toLowerCase() || ''}">
                  <td>
                    <img src="${m.image_url || '/asserts/Group-56088.png'}" alt="${m.name}" style="width: 44px; height: 44px; object-fit: contain; background: #F8FAFC; border-radius: var(--radius-sm); border: 1px solid var(--admin-border); padding: 2px;">
                  </td>
                  <td>
                    <strong>${m.name}</strong><br>
                    <small style="color: var(--admin-text-muted);">${m.active_principle || ''} • ${m.dosage || ''}</small>
                  </td>
                  <td><span class="badge" style="font-size: 0.75rem;">${m.category}</span></td>
                  <td style="color: #94A3B8;">R$ ${Number(m.original_price).toFixed(2).replace('.', ',')}</td>
                  <td><span style="background: #DCFCE7; color: #166534; font-weight: 700; font-size: 0.75rem; padding: 2px 8px; border-radius: 4px;">${m.discount_percentage}%</span></td>
                  <td><strong style="color: var(--admin-primary);">R$ ${Number(m.final_price).toFixed(2).replace('.', ',')}</strong></td>
                  <td>${m.requires_prescription ? '<span style="color: #DC2626; font-size: 0.75rem; font-weight: 700;">Sim</span>' : '<span style="color: #166534; font-size: 0.75rem;">Não</span>'}</td>
                  <td style="text-align: right; white-space: nowrap;">
                    <button class="btn-adm btn-adm-outline btn-adm-sm btn-edit-med" data-id="${m.id}">✏️ Editar</button>
                    <button class="btn-adm btn-adm-danger btn-adm-sm btn-del-med" data-id="${m.id}" data-name="${m.name}">🗑️</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- MODAL CADASTRO / EDIÇÃO MEDICAMENTO -->
      <div class="modal-overlay" id="modal-med">
        <div class="modal-box">
          <div class="modal-header">
            <h3 id="modal-med-title">Cadastrar Medicamento</h3>
            <button type="button" class="btn-adm btn-adm-outline btn-adm-sm" id="btn-close-med-modal">✕</button>
          </div>
          <form id="form-med">
            <div class="modal-body">
              <input type="hidden" id="med-id">

              <div class="form-grid-2">
                <div class="form-group">
                  <label class="form-label">Nome Comercial *</label>
                  <input type="text" id="med-name" class="form-control" required placeholder="Ex: Dipirona Monoidratada">
                </div>
                <div class="form-group">
                  <label class="form-label">Princípio Ativo</label>
                  <input type="text" id="med-principle" class="form-control" placeholder="Ex: Dipirona 500mg">
                </div>
              </div>

              <div class="form-grid-3">
                <div class="form-group">
                  <label class="form-label">Categoria *</label>
                  <select id="med-category" class="form-control" required>
                    <option value="Genéricos">Genéricos</option>
                    <option value="Uso Contínuo">Uso Contínuo</option>
                    <option value="Analgésicos">Analgésicos</option>
                    <option value="Antibióticos">Antibióticos</option>
                    <option value="Cardiologia">Cardiologia</option>
                    <option value="Dermatologia">Dermatologia</option>
                    <option value="Vitaminas & Suplementos">Vitaminas & Suplementos</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Dosagem</label>
                  <input type="text" id="med-dosage" class="form-control" placeholder="Ex: 500mg">
                </div>
                <div class="form-group">
                  <label class="form-label">Laboratório</label>
                  <input type="text" id="med-lab" class="form-control" placeholder="Ex: EMS / Medley">
                </div>
              </div>

              <div class="form-grid-3">
                <div class="form-group">
                  <label class="form-label">Preço Original (R$)</label>
                  <input type="number" step="0.01" id="med-orig-price" class="form-control" placeholder="0.00">
                </div>
                <div class="form-group">
                  <label class="form-label">Desconto (%)</label>
                  <input type="number" step="1" id="med-discount" class="form-control" placeholder="Ex: 60">
                </div>
                <div class="form-group">
                  <label class="form-label">Exige Receita Médica?</label>
                  <select id="med-prescription" class="form-control">
                    <option value="0">Não (Venda Livre)</option>
                    <option value="1">Sim (Tarjado / Controlado)</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Foto do Produto</label>
                <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 0.5rem;">
                  <img id="med-preview-img" src="/asserts/Group-56088.png" style="width: 48px; height: 48px; object-fit: contain; background: #F8FAFC; border: 1px solid var(--admin-border); border-radius: var(--radius-sm); padding: 4px;">
                  <input type="file" id="med-file-img" accept="image/*" style="display: none;">
                  <button type="button" class="btn-adm btn-adm-outline btn-adm-sm" onclick="document.getElementById('med-file-img').click()">Upload de Foto</button>
                </div>
                <input type="text" id="med-img-url" class="form-control" placeholder="/asserts/foto.png ou URL">
              </div>

              <div class="form-group">
                <label class="form-label">Apresentação / Descrição</label>
                <input type="text" id="med-presentation" class="form-control" placeholder="Ex: Caixa com 20 comprimidos revestidos">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn-adm btn-adm-outline" id="btn-cancel-med">Cancelar</button>
              <button type="submit" class="btn-adm btn-adm-primary" id="btn-save-med">Salvar Medicamento</button>
            </div>
          </form>
        </div>
      </div>
    `;

    // Filtro de busca
    const filterInput = document.getElementById('filter-meds');
    filterInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      document.querySelectorAll('#table-meds tbody tr').forEach(row => {
        const search = row.getAttribute('data-search') || '';
        row.style.display = search.includes(term) ? '' : 'none';
      });
    });

    const modal = document.getElementById('modal-med');
    const form = document.getElementById('form-med');
    const modalTitle = document.getElementById('modal-med-title');

    const openModal = (med = null) => {
      form.reset();
      if (med) {
        modalTitle.textContent = 'Editar Medicamento';
        document.getElementById('med-id').value = med.id;
        document.getElementById('med-name').value = med.name || '';
        document.getElementById('med-principle').value = med.active_principle || '';
        document.getElementById('med-category').value = med.category || 'Genéricos';
        document.getElementById('med-dosage').value = med.dosage || '';
        document.getElementById('med-lab').value = med.laboratory || '';
        document.getElementById('med-orig-price').value = med.original_price || '';
        document.getElementById('med-discount').value = med.discount_percentage || '';
        document.getElementById('med-prescription').value = med.requires_prescription ? '1' : '0';
        document.getElementById('med-img-url').value = med.image_url || '';
        document.getElementById('med-preview-img').src = med.image_url || '/asserts/Group-56088.png';
        document.getElementById('med-presentation').value = med.presentation || '';
      } else {
        modalTitle.textContent = 'Cadastrar Novo Medicamento';
        document.getElementById('med-id').value = '';
        document.getElementById('med-img-url').value = '/asserts/Group-56088.png';
        document.getElementById('med-preview-img').src = '/asserts/Group-56088.png';
      }
      modal.classList.add('open');
    };

    const closeModal = () => modal.classList.remove('open');

    document.getElementById('btn-new-med').addEventListener('click', () => openModal());
    document.getElementById('btn-close-med-modal').addEventListener('click', closeModal);
    document.getElementById('btn-cancel-med').addEventListener('click', closeModal);

    // Upload de Imagem de Medicamento
    document.getElementById('med-file-img').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const res = await adminApi.uploadFile(file);
        document.getElementById('med-img-url').value = res.url;
        document.getElementById('med-preview-img').src = res.url;
      } catch (err) {
        alert('Erro ao enviar imagem: ' + err.message);
      }
    });

    // Submissão do Form
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('med-id').value;
      const payload = {
        name: document.getElementById('med-name').value.trim(),
        active_principle: document.getElementById('med-principle').value.trim(),
        category: document.getElementById('med-category').value,
        dosage: document.getElementById('med-dosage').value.trim(),
        laboratory: document.getElementById('med-lab').value.trim(),
        original_price: parseFloat(document.getElementById('med-orig-price').value) || 0,
        discount_percentage: parseFloat(document.getElementById('med-discount').value) || 0,
        requires_prescription: document.getElementById('med-prescription').value === '1',
        image_url: document.getElementById('med-img-url').value.trim(),
        presentation: document.getElementById('med-presentation').value.trim()
      };

      try {
        if (id) {
          await adminApi.updateMedicine(id, payload);
          alert('Medicamento atualizado com sucesso!');
        } else {
          await adminApi.createMedicine(payload);
          alert('Medicamento cadastrado com sucesso!');
        }
        closeModal();
        renderMedicines(container);
      } catch (err) {
        alert('Erro ao salvar medicamento: ' + err.message);
      }
    });

    // Edição
    container.querySelectorAll('.btn-edit-med').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const med = medicines.find(m => m.id == id);
        if (med) openModal(med);
      });
    });

    // Exclusão
    container.querySelectorAll('.btn-del-med').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const name = btn.getAttribute('data-name');
        if (confirm(`Deseja realmente remover o medicamento "${name}"?`)) {
          try {
            await adminApi.deleteMedicine(id);
            alert('Medicamento removido com sucesso.');
            renderMedicines(container);
          } catch (err) {
            alert('Erro ao excluir medicamento: ' + err.message);
          }
        }
      });
    });

  } catch (err) {
    container.innerHTML = `<div class="admin-card" style="color: var(--admin-danger);">Erro: ${err.message}</div>`;
  }
}
