import express from 'express';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/faq (Público)
router.get('/', (req, res) => {
  const { category, search } = req.query;

  try {
    let query = 'SELECT * FROM faqs WHERE is_active = 1';
    const params = [];

    if (category && category !== 'Todos') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (question LIKE ? OR answer LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term);
    }

    query += ' ORDER BY sort_order ASC, id ASC';

    const faqs = db.prepare(query).all(...params);

    const categories = db.prepare(`
      SELECT category, COUNT(*) as count 
      FROM faqs 
      WHERE is_active = 1 
      GROUP BY category
      ORDER BY count DESC
    `).all();

    res.json({ faqs, categories });
  } catch (error) {
    console.error('Erro ao buscar FAQs:', error);
    res.status(500).json({ error: 'Erro ao carregar perguntas frequentes.' });
  }
});

// POST /api/faq (Admin)
router.post('/', authenticateToken, (req, res) => {
  const { question, answer, category, sort_order } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: 'Pergunta e resposta são obrigatórias.' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO faqs (question, answer, category, sort_order)
      VALUES (?, ?, ?, ?)
    `).run(question, answer, category || 'Geral', sort_order || 0);

    const created = db.prepare('SELECT * FROM faqs WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ message: 'FAQ criada com sucesso.', faq: created });
  } catch (error) {
    console.error('Erro ao criar FAQ:', error);
    res.status(500).json({ error: 'Erro ao criar pergunta frequente.' });
  }
});

// PUT /api/faq/:id (Admin)
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { question, answer, category, sort_order, is_active } = req.body;

  try {
    db.prepare(`
      UPDATE faqs
      SET question = COALESCE(?, question),
          answer = COALESCE(?, answer),
          category = COALESCE(?, category),
          sort_order = COALESCE(?, sort_order),
          is_active = COALESCE(?, is_active),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      question, answer, category, sort_order,
      is_active !== undefined ? (is_active ? 1 : 0) : null,
      id
    );

    const updated = db.prepare('SELECT * FROM faqs WHERE id = ?').get(id);
    res.json({ message: 'FAQ atualizada com sucesso.', faq: updated });
  } catch (error) {
    console.error('Erro ao atualizar FAQ:', error);
    res.status(500).json({ error: 'Erro ao salvar FAQ.' });
  }
});

// DELETE /api/faq/:id (Admin)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    db.prepare('DELETE FROM faqs WHERE id = ?').run(req.params.id);
    res.json({ message: 'FAQ removida com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover FAQ.' });
  }
});

export default router;
