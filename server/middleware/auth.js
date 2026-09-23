import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import db from '../database/db.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }

    // Verificar se o usuário ainda existe no banco
    const dbUser = db.prepare('SELECT id, name, email, role FROM users WHERE id = ?').get(user.id);
    if (!dbUser) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    req.user = dbUser;
    next();
  });
}
