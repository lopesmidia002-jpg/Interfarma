import express from 'express';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/pages (Lista todas as páginas disponíveis e contagem de seções)
router.get('/', (req, res) => {
  try {
    const pages = db.prepare(`
      SELECT page_slug, COUNT(*) as sections_count, MAX(updated_at) as last_updated
      FROM page_sections
      GROUP BY page_slug
      ORDER BY page_slug ASC
    `).all();
    res.json(pages);
  } catch (error) {
    console.error('Erro ao listar páginas:', error);
    res.status(500).json({ error: 'Erro ao listar páginas.' });
  }
});

// GET /api/pages/:pageSlug (Público - retorna todas as seções ativas de uma página)
router.get('/:pageSlug', (req, res) => {
  const { pageSlug } = req.params;
  try {
    const sections = db.prepare(`
      SELECT * FROM page_sections
      WHERE page_slug = ? AND is_active = 1
      ORDER BY sort_order ASC, id ASC
    `).all(pageSlug);

    // Formatar sections como um mapa chave -> dados para facilitar uso no frontend
    const sectionsMap = {};
    for (const sec of sections) {
      if (sec.extra_data && typeof sec.extra_data === 'string') {
        try {
          sec.extra_data = JSON.parse(sec.extra_data);
        } catch (e) {
          sec.extra_data = null;
        }
      }
      sectionsMap[sec.section_key] = sec;
    }

    res.json({
      page: pageSlug,
      sections: sections,
      data: sectionsMap
    });
  } catch (error) {
    console.error(`Erro ao buscar página ${pageSlug}:`, error);
    res.status(500).json({ error: 'Erro ao buscar conteúdo da página.' });
  }
});

// GET /api/pages/:pageSlug/admin (Admin - retorna todas as seções inclusive inativas)
router.get('/:pageSlug/admin', authenticateToken, (req, res) => {
  const { pageSlug } = req.params;
  try {
    const sections = db.prepare(`
      SELECT * FROM page_sections
      WHERE page_slug = ?
      ORDER BY sort_order ASC, id ASC
    `).all(pageSlug);

    for (const sec of sections) {
      if (sec.extra_data && typeof sec.extra_data === 'string') {
        try {
          sec.extra_data = JSON.parse(sec.extra_data);
        } catch (e) {}
      }
    }

    res.json({ page: pageSlug, sections });
  } catch (error) {
    console.error(`Erro ao buscar seções admin de ${pageSlug}:`, error);
    res.status(500).json({ error: 'Erro ao carregar seções da página.' });
  }
});

// PUT /api/pages/:pageSlug/sections/:sectionKey (Admin - atualiza uma seção específica)
router.put('/:pageSlug/sections/:sectionKey', authenticateToken, (req, res) => {
  const { pageSlug, sectionKey } = req.params;
  const {
    title, subtitle, content, button_text, button_link,
    image_url, badge_text, extra_data, sort_order, is_active
  } = req.body;

  try {
    const extraDataStr = (extra_data !== undefined && extra_data !== null)
      ? (typeof extra_data === 'object' ? JSON.stringify(extra_data) : extra_data)
      : null;

    // Verificar se existe
    const existing = db.prepare('SELECT * FROM page_sections WHERE page_slug = ? AND section_key = ?')
      .get(pageSlug, sectionKey);

    if (existing) {
      const newTitle = title !== undefined ? title : existing.title;
      const newSubtitle = subtitle !== undefined ? subtitle : existing.subtitle;
      const newContent = content !== undefined ? content : existing.content;
      const newButtonText = button_text !== undefined ? button_text : existing.button_text;
      const newButtonLink = button_link !== undefined ? button_link : existing.button_link;
      const newImageUrl = (image_url !== undefined && image_url !== null) ? image_url : existing.image_url;
      const newBadgeText = badge_text !== undefined ? badge_text : existing.badge_text;
      const newExtraData = extraDataStr !== null ? extraDataStr : existing.extra_data;
      const newSortOrder = sort_order !== undefined ? sort_order : existing.sort_order;
      const newIsActive = is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active;

      db.prepare(`
        UPDATE page_sections
        SET title = ?,
            subtitle = ?,
            content = ?,
            button_text = ?,
            button_link = ?,
            image_url = ?,
            badge_text = ?,
            extra_data = ?,
            sort_order = ?,
            is_active = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE page_slug = ? AND section_key = ?
      `).run(
        newTitle, newSubtitle, newContent, newButtonText, newButtonLink,
        newImageUrl, newBadgeText, newExtraData, newSortOrder, newIsActive,
        pageSlug, sectionKey
      );
    } else {
      db.prepare(`
        INSERT INTO page_sections (
          page_slug, section_key, title, subtitle, content,
          button_text, button_link, image_url, badge_text, extra_data, sort_order, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        pageSlug, sectionKey,
        title || '', subtitle || '', content || '',
        button_text || '', button_link || '',
        image_url || '', badge_text || '',
        extraDataStr || null,
        sort_order || 0, is_active !== undefined ? (is_active ? 1 : 0) : 1
      );
    }

    const updated = db.prepare('SELECT * FROM page_sections WHERE page_slug = ? AND section_key = ?')
      .get(pageSlug, sectionKey);

    if (updated.extra_data && typeof updated.extra_data === 'string') {
      try { updated.extra_data = JSON.parse(updated.extra_data); } catch(e) {}
    }

    res.json({ message: 'Seção atualizada com sucesso.', section: updated });
  } catch (error) {
    console.error('Erro ao atualizar seção:', error);
    res.status(500).json({ error: 'Erro ao salvar alterações da seção: ' + error.message });
  }
});

// POST /api/pages/:pageSlug/sections (Admin - cria nova seção dinâmica)
router.post('/:pageSlug/sections', authenticateToken, (req, res) => {
  const { pageSlug } = req.params;
  const {
    section_key, title, subtitle, content, button_text, button_link,
    image_url, badge_text, extra_data, sort_order
  } = req.body;

  if (!section_key) {
    return res.status(400).json({ error: 'Chave da seção (section_key) é obrigatória.' });
  }

  try {
    const extraDataStr = typeof extra_data === 'object' ? JSON.stringify(extra_data) : extra_data;

    db.prepare(`
      INSERT INTO page_sections (
        page_slug, section_key, title, subtitle, content,
        button_text, button_link, image_url, badge_text, extra_data, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      pageSlug, section_key, title, subtitle, content,
      button_text, button_link, image_url, badge_text, extraDataStr, sort_order || 0
    );

    const created = db.prepare('SELECT * FROM page_sections WHERE page_slug = ? AND section_key = ?')
      .get(pageSlug, section_key);

    res.status(201).json({ message: 'Seção criada com sucesso.', section: created });
  } catch (error) {
    console.error('Erro ao criar seção:', error);
    res.status(500).json({ error: 'Erro ao criar nova seção para a página.' });
  }
});

export default router;
