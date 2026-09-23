import express from 'express';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/medicines (Público com filtros e paginação/busca)
router.get('/', (req, res) => {
  const { category, search, featured, limit = 50, offset = 0 } = req.query;

  try {
    let query = 'SELECT * FROM medicines WHERE is_active = 1';
    const params = [];

    if (category && category !== 'Todos') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (name LIKE ? OR active_principle LIKE ? OR laboratory LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    if (featured === '1' || featured === 'true') {
      query += ' AND featured = 1';
    }

    query += ' ORDER BY featured DESC, name ASC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const medicines = db.prepare(query).all(...params);

    // Contagem de categorias
    const categories = db.prepare(`
      SELECT category, COUNT(*) as count 
      FROM medicines 
      WHERE is_active = 1 
      GROUP BY category
      ORDER BY count DESC
    `).all();

    res.json({
      medicines,
      categories
    });
  } catch (error) {
    console.error('Erro ao buscar medicamentos:', error);
    res.status(500).json({ error: 'Erro ao buscar catálogo de medicamentos.' });
  }
});

// GET /api/medicines/:id
router.get('/:id', (req, res) => {
  try {
    const med = db.prepare('SELECT * FROM medicines WHERE id = ?').get(req.params.id);
    if (!med) {
      return res.status(404).json({ error: 'Medicamento não encontrado.' });
    }
    res.json(med);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar detalhes do medicamento.' });
  }
});

// POST /api/medicines (Admin)
router.post('/', authenticateToken, (req, res) => {
  const {
    name, active_principle, laboratory, category, dosage, presentation,
    original_price, discount_percentage, requires_prescription,
    image_url, description, featured, is_active
  } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: 'Nome e categoria são obrigatórios.' });
  }

  try {
    const orig = parseFloat(original_price) || 0;
    const disc = parseFloat(discount_percentage) || 0;
    const final_price = orig > 0 ? (orig * (1 - disc / 100)) : 0;

    const result = db.prepare(`
      INSERT INTO medicines (
        name, active_principle, laboratory, category, dosage, presentation,
        original_price, discount_percentage, final_price, requires_prescription,
        image_url, description, featured, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name, active_principle, laboratory, category, dosage, presentation,
      orig, disc, final_price, requires_prescription ? 1 : 0,
      image_url || '/asserts/Group-56088.png', description,
      featured ? 1 : 0, is_active !== undefined ? (is_active ? 1 : 0) : 1
    );

    const created = db.prepare('SELECT * FROM medicines WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ message: 'Medicamento cadastrado com sucesso.', medicine: created });
  } catch (error) {
    console.error('Erro ao cadastrar medicamento:', error);
    res.status(500).json({ error: 'Erro ao cadastrar medicamento.' });
  }
});

// PUT /api/medicines/:id (Admin)
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const {
    name, active_principle, laboratory, category, dosage, presentation,
    original_price, discount_percentage, requires_prescription,
    image_url, description, featured, is_active
  } = req.body;

  try {
    const orig = parseFloat(original_price) || 0;
    const disc = parseFloat(discount_percentage) || 0;
    const final_price = orig > 0 ? (orig * (1 - disc / 100)) : 0;

    db.prepare(`
      UPDATE medicines
      SET name = COALESCE(?, name),
          active_principle = COALESCE(?, active_principle),
          laboratory = COALESCE(?, laboratory),
          category = COALESCE(?, category),
          dosage = COALESCE(?, dosage),
          presentation = COALESCE(?, presentation),
          original_price = ?,
          discount_percentage = ?,
          final_price = ?,
          requires_prescription = COALESCE(?, requires_prescription),
          image_url = COALESCE(?, image_url),
          description = COALESCE(?, description),
          featured = COALESCE(?, featured),
          is_active = COALESCE(?, is_active),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name, active_principle, laboratory, category, dosage, presentation,
      orig, disc, final_price,
      requires_prescription !== undefined ? (requires_prescription ? 1 : 0) : null,
      image_url, description,
      featured !== undefined ? (featured ? 1 : 0) : null,
      is_active !== undefined ? (is_active ? 1 : 0) : null,
      id
    );

    const updated = db.prepare('SELECT * FROM medicines WHERE id = ?').get(id);
    res.json({ message: 'Medicamento atualizado com sucesso.', medicine: updated });
  } catch (error) {
    console.error('Erro ao atualizar medicamento:', error);
    res.status(500).json({ error: 'Erro ao atualizar medicamento.' });
  }
});

// DELETE /api/medicines/:id (Admin)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    db.prepare('DELETE FROM medicines WHERE id = ?').run(req.params.id);
    res.json({ message: 'Medicamento removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover medicamento.' });
  }
});

export default router;
