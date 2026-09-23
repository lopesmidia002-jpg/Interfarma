import express from 'express';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/contact (Público - Envio de formulário)
router.post('/', (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Nome, e-mail e mensagem são campos obrigatórios.' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO contact_messages (name, email, phone, company, subject, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, email, phone || null, company || null, subject || 'Contato via Site', message);

    res.status(201).json({
      message: 'Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.',
      id: result.lastInsertRowid
    });
  } catch (error) {
    console.error('Erro ao salvar mensagem de contato:', error);
    res.status(500).json({ error: 'Erro ao enviar mensagem. Tente novamente mais tarde.' });
  }
});

// GET /api/contact/messages (Admin - Listar mensagens)
router.get('/messages', authenticateToken, (req, res) => {
  try {
    const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar mensagens recebidas.' });
  }
});

// PUT /api/contact/messages/:id/status (Admin - Atualizar status da mensagem)
router.put('/messages/:id/status', authenticateToken, (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!['unread', 'read', 'replied'].includes(status)) {
    return res.status(400).json({ error: 'Status inválido. Use unread, read ou replied.' });
  }

  try {
    db.prepare('UPDATE contact_messages SET status = ? WHERE id = ?').run(status, id);
    res.json({ message: 'Status da mensagem atualizado.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status da mensagem.' });
  }
});

// DELETE /api/contact/messages/:id (Admin - Excluir mensagem)
router.delete('/messages/:id', authenticateToken, (req, res) => {
  try {
    db.prepare('DELETE FROM contact_messages WHERE id = ?').run(req.params.id);
    res.json({ message: 'Mensagem removida com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover mensagem.' });
  }
});

export default router;
