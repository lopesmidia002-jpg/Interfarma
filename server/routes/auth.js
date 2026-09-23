import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database/db.js';
import { config } from '../config.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({
      message: 'Login realizado com sucesso.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno ao realizar autenticação.' });
  }
});

// GET /api/auth/me (Verificar status da sessão)
router.get('/me', authenticateToken, (req, res) => {
  const user = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(req.user.id);
  res.json({ user: user || req.user });
});

// PUT /api/auth/profile (Alterar nome, e-mail ou senha do usuário logado)
router.put('/profile', authenticateToken, (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Se estiver alterando o e-mail, verificar unicidade
    const targetEmail = email ? email.toLowerCase().trim() : user.email;
    if (targetEmail !== user.email) {
      const existing = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(targetEmail, userId);
      if (existing) {
        return res.status(400).json({ error: 'Este e-mail já está sendo utilizado por outro usuário.' });
      }
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ error: 'Informe a senha atual para definir uma nova senha.' });
      }
      const isMatch = bcrypt.compareSync(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'A senha atual está incorreta.' });
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(newPassword, salt);
      db.prepare('UPDATE users SET name = ?, email = ?, password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(name ? name.trim() : user.name, targetEmail, hashedPassword, userId);
    } else {
      db.prepare('UPDATE users SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(name ? name.trim() : user.name, targetEmail, userId);
    }

    const updatedUser = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(userId);
    res.json({ message: 'Perfil atualizado com sucesso.', user: updatedUser });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil.' });
  }
});

// =========================================================================
// GERENCIADOR DE USUÁRIOS (CRUD COMPLETO COM PERMISSÕES ADMIN / COMUM)
// =========================================================================

// GET /api/auth/users (Listar todos os usuários)
router.get('/users', authenticateToken, (req, res) => {
  try {
    const users = db.prepare('SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC').all();
    res.json({ users });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
});

// POST /api/auth/users (Cadastrar novo usuário)
router.post('/users', authenticateToken, (req, res) => {
  const { name, email, password, role = 'admin' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
  }

  const cleanEmail = email.toLowerCase().trim();
  const cleanRole = role === 'user' ? 'user' : 'admin';

  try {
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      return res.status(400).json({ error: 'Já existe um usuário cadastrado com este e-mail.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const result = db.prepare(`
      INSERT INTO users (name, email, password, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).run(name.trim(), cleanEmail, hashedPassword, cleanRole);

    const newUser = db.prepare('SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ message: 'Usuário criado com sucesso.', user: newUser });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

// PUT /api/auth/users/:id (Editar usuário)
router.put('/users/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const cleanEmail = email ? email.toLowerCase().trim() : user.email;
    if (cleanEmail !== user.email) {
      const existing = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(cleanEmail, id);
      if (existing) {
        return res.status(400).json({ error: 'Este e-mail já está sendo utilizado por outro usuário.' });
      }
    }

    const cleanRole = role ? (role === 'user' ? 'user' : 'admin') : user.role;
    const cleanName = name ? name.trim() : user.name;

    if (password && password.trim() !== '') {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      db.prepare('UPDATE users SET name = ?, email = ?, password = ?, role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(cleanName, cleanEmail, hashedPassword, cleanRole, id);
    } else {
      db.prepare('UPDATE users SET name = ?, email = ?, role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
        .run(cleanName, cleanEmail, cleanRole, id);
    }

    const updated = db.prepare('SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?').get(id);
    res.json({ message: 'Usuário atualizado com sucesso.', user: updated });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});

// DELETE /api/auth/users/:id (Deletar usuário)
router.delete('/users/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Não permitir deletar a si próprio se estiver logado
    if (parseInt(id, 10) === req.user.id) {
      return res.status(400).json({ error: 'Você não pode excluir sua própria conta enquanto estiver logado.' });
    }

    // Verificar se é o último administrador
    if (user.role === 'admin') {
      const adminCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'admin'").get().count;
      if (adminCount <= 1) {
        return res.status(400).json({ error: 'Não é possível excluir o único administrador do sistema.' });
      }
    }

    db.prepare('DELETE FROM users WHERE id = ?').run(id);
    res.json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
});

export default router;
