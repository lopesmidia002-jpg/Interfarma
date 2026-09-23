/**
 * INTELFARMA - API CLIENT
 * Comunicação com os endpoints da API REST
 */

const API_BASE = '/api';

export const api = {
  // Configurações Globais (Cores, Logos, Contatos)
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (!res.ok) throw new Error('Falha ao obter configurações.');
      return await res.json();
    } catch (err) {
      console.error('API Error (getSettings):', err);
      return null;
    }
  },

  // Dados de Seções de uma Página
  async getPage(pageSlug) {
    try {
      const res = await fetch(`${API_BASE}/pages/${pageSlug}`);
      if (!res.ok) throw new Error(`Falha ao obter dados da página ${pageSlug}`);
      return await res.json();
    } catch (err) {
      console.error(`API Error (getPage ${pageSlug}):`, err);
      return { sections: [], data: {} };
    }
  },

  // Catálogo de Medicamentos
  async getMedicines(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/medicines?${query}`);
      if (!res.ok) throw new Error('Falha ao obter catálogo de medicamentos.');
      return await res.json();
    } catch (err) {
      console.error('API Error (getMedicines):', err);
      return { medicines: [], categories: [] };
    }
  },

  // Medicamento Individual
  async getMedicine(idOrName) {
    try {
      const res = await fetch(`${API_BASE}/medicines/${encodeURIComponent(idOrName)}`);
      if (!res.ok) throw new Error('Medicamento não encontrado.');
      return await res.json();
    } catch (err) {
      console.error(`API Error (getMedicine ${idOrName}):`, err);
      return null;
    }
  },

  // Posts do Blog
  async getBlogPosts(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/blog?${query}`);
      if (!res.ok) throw new Error('Falha ao obter posts do blog.');
      return await res.json();
    } catch (err) {
      console.error('API Error (getBlogPosts):', err);
      return { posts: [], categories: [] };
    }
  },

  // Post Individual
  async getBlogPostBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE}/blog/${slug}`);
      if (!res.ok) throw new Error('Artigo não encontrado.');
      return await res.json();
    } catch (err) {
      console.error(`API Error (getBlogPostBySlug ${slug}):`, err);
      return null;
    }
  },

  // FAQs
  async getFaqs(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/faq?${query}`);
      if (!res.ok) throw new Error('Falha ao obter perguntas frequentes.');
      return await res.json();
    } catch (err) {
      console.error('API Error (getFaqs):', err);
      return { faqs: [], categories: [] };
    }
  },

  // Envio de Contato
  async sendContact(data) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Erro ao enviar mensagem.');
    return json;
  }
};
