import express from 'express';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/settings (Público)
router.get('/', (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM site_settings ORDER BY id ASC LIMIT 1').get();
    if (!settings) {
      return res.status(404).json({ error: 'Configurações não encontradas.' });
    }
    
    // Parse social links if string
    if (typeof settings.social_links === 'string') {
      try {
        settings.social_links = JSON.parse(settings.social_links);
      } catch (e) {
        settings.social_links = {};
      }
    }

    res.json(settings);
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    res.status(500).json({ error: 'Erro ao carregar configurações do site.' });
  }
});

// PUT /api/settings (Admin)
router.put('/', authenticateToken, (req, res) => {
  const {
    site_name, slogan, logo_url, logo_footer_url, favicon_url,
    primary_color, secondary_color, accent_color, bg_color, text_color,
    phone, whatsapp, email, address, cnpj, social_links, custom_css
  } = req.body;

  try {
    const socialLinksStr = typeof social_links === 'object' ? JSON.stringify(social_links) : (social_links || '{}');

    const result = db.prepare(`
      UPDATE site_settings
      SET site_name = COALESCE(?, site_name),
          slogan = COALESCE(?, slogan),
          logo_url = COALESCE(?, logo_url),
          logo_footer_url = COALESCE(?, logo_footer_url),
          favicon_url = COALESCE(?, favicon_url),
          primary_color = COALESCE(?, primary_color),
          secondary_color = COALESCE(?, secondary_color),
          accent_color = COALESCE(?, accent_color),
          bg_color = COALESCE(?, bg_color),
          text_color = COALESCE(?, text_color),
          phone = COALESCE(?, phone),
          whatsapp = COALESCE(?, whatsapp),
          email = COALESCE(?, email),
          address = COALESCE(?, address),
          cnpj = COALESCE(?, cnpj),
          social_links = COALESCE(?, social_links),
          custom_css = COALESCE(?, custom_css),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `).run(
      site_name, slogan, logo_url, logo_footer_url, favicon_url,
      primary_color, secondary_color, accent_color, bg_color, text_color,
      phone, whatsapp, email, address, cnpj, socialLinksStr, custom_css
    );

    const updated = db.prepare('SELECT * FROM site_settings WHERE id = 1').get();
    if (typeof updated.social_links === 'string') {
      try { updated.social_links = JSON.parse(updated.social_links); } catch(e) {}
    }

    res.json({ message: 'Configurações atualizadas com sucesso.', settings: updated });
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    res.status(500).json({ error: 'Erro ao salvar alterações das configurações.' });
  }
});

export default router;
