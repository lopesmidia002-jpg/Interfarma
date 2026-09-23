import express from 'express';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// GET /api/blog (Público)
router.get('/', (req, res) => {
  const { category, search, limit = 20, offset = 0 } = req.query;

  try {
    let query = 'SELECT id, title, slug, summary, cover_image, author, category, tags, read_time, published_at FROM blog_posts WHERE is_published = 1';
    const params = [];

    if (category && category !== 'Todos') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (title LIKE ? OR summary LIKE ? OR tags LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY published_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const posts = db.prepare(query).all(...params);

    const categories = db.prepare(`
      SELECT category, COUNT(*) as count 
      FROM blog_posts 
      WHERE is_published = 1 
      GROUP BY category
    `).all();

    res.json({ posts, categories });
  } catch (error) {
    console.error('Erro ao buscar posts do blog:', error);
    res.status(500).json({ error: 'Erro ao carregar artigos do blog.' });
  }
});

// GET /api/blog/:slug (Público)
router.get('/:slug', (req, res) => {
  try {
    const post = db.prepare('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1').get(req.params.slug);
    if (!post) {
      return res.status(404).json({ error: 'Artigo não encontrado.' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar artigo.' });
  }
});

// GET /api/blog/admin/all (Admin)
router.get('/admin/all', authenticateToken, (req, res) => {
  try {
    const posts = db.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar lista administrativa do blog.' });
  }
});

// POST /api/blog (Admin)
router.post('/', authenticateToken, (req, res) => {
  const { title, summary, content, cover_image, author, category, tags, read_time, is_published } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Título e conteúdo são obrigatórios.' });
  }

  try {
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    while (db.prepare('SELECT id FROM blog_posts WHERE slug = ?').get(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const result = db.prepare(`
      INSERT INTO blog_posts (
        title, slug, summary, content, cover_image, author,
        category, tags, read_time, is_published, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      title, slug, summary, content,
      cover_image || '/asserts/InterFarma-Blog.jpg',
      author || 'Equipe Intelfarma',
      category || 'Saúde & Bem-Estar',
      tags, read_time || '4 min',
      is_published !== undefined ? (is_published ? 1 : 0) : 1
    );

    const created = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ message: 'Artigo publicado com sucesso.', post: created });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ error: 'Erro ao salvar artigo no blog.' });
  }
});

// PUT /api/blog/:id (Admin)
router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, summary, content, cover_image, author, category, tags, read_time, is_published } = req.body;

  try {
    db.prepare(`
      UPDATE blog_posts
      SET title = COALESCE(?, title),
          summary = COALESCE(?, summary),
          content = COALESCE(?, content),
          cover_image = COALESCE(?, cover_image),
          author = COALESCE(?, author),
          category = COALESCE(?, category),
          tags = COALESCE(?, tags),
          read_time = COALESCE(?, read_time),
          is_published = COALESCE(?, is_published),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      title, summary, content, cover_image, author, category, tags,
      read_time, is_published !== undefined ? (is_published ? 1 : 0) : null,
      id
    );

    const updated = db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id);
    res.json({ message: 'Artigo atualizado com sucesso.', post: updated });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    res.status(500).json({ error: 'Erro ao atualizar artigo.' });
  }
});

// DELETE /api/blog/:id (Admin)
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    db.prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id);
    res.json({ message: 'Artigo removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover artigo.' });
  }
});

export default router;
