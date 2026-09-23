/**
 * INTELFARMA - CLIENTE API PARA O PAINEL ADMINISTRATIVO (CMS)
 */

const API_BASE = '/api';

export const adminApi = {
  getToken() {
    return localStorage.getItem('intelfarma_admin_token');
  },

  setToken(token) {
    localStorage.setItem('intelfarma_admin_token', token);
  },

  removeToken() {
    localStorage.removeItem('intelfarma_admin_token');
    localStorage.removeItem('intelfarma_admin_user');
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem('intelfarma_admin_user'));
    } catch (e) {
      return null;
    }
  },

  setUser(user) {
    localStorage.setItem('intelfarma_admin_user', JSON.stringify(user));
  },

  async request(endpoint, options = {}) {
    const token = this.getToken();
    const headers = {
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    if (res.status === 401 || res.status === 403) {
      this.removeToken();
      window.dispatchEvent(new CustomEvent('auth:logout'));
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(json.error || `Erro ${res.status}: Não foi possível completar a requisição.`);
    }

    return json;
  },

  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Erro ao realizar login.');
    this.setToken(json.token);
    this.setUser(json.user);
    return json;
  },

  async getMe() {
    return await this.request('/auth/me');
  },

  async updateProfile(data) {
    return await this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Configurações Globais (Cores, Logos, Contatos)
  async getSettings() {
    return await this.request('/settings');
  },

  async updateSettings(data) {
    return await this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Páginas e Seções
  async getPages() {
    return await this.request('/pages');
  },

  async getPageAdminSections(pageSlug) {
    return await this.request(`/pages/${pageSlug}/admin`);
  },

  async updatePageSection(pageSlug, sectionKey, data) {
    return await this.request(`/pages/${pageSlug}/sections/${sectionKey}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // Medicamentos
  async getMedicines(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await this.request(`/medicines?${query}`);
  },

  async createMedicine(data) {
    return await this.request('/medicines', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async updateMedicine(id, data) {
    return await this.request(`/medicines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  async deleteMedicine(id) {
    return await this.request(`/medicines/${id}`, {
      method: 'DELETE'
    });
  },

  // Blog
  async getBlogPosts() {
    return await this.request('/blog/admin/all');
  },

  async createBlogPost(data) {
    return await this.request('/blog', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async updateBlogPost(id, data) {
    return await this.request(`/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  async deleteBlogPost(id) {
    return await this.request(`/blog/${id}`, {
      method: 'DELETE'
    });
  },

  // FAQs
  async getFaqs() {
    return await this.request('/faq');
  },

  async createFaq(data) {
    return await this.request('/faq', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async updateFaq(id, data) {
    return await this.request(`/faq/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  async deleteFaq(id) {
    return await this.request(`/faq/${id}`, {
      method: 'DELETE'
    });
  },

  // Mensagens
  async getMessages() {
    return await this.request('/contact/messages');
  },

  async updateMessageStatus(id, status) {
    return await this.request(`/contact/messages/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },

  async deleteMessage(id) {
    return await this.request(`/contact/messages/${id}`, {
      method: 'DELETE'
    });
  },

  // Upload de Imagem
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.request('/admin/upload', {
      method: 'POST',
      body: formData
    });
  }
};
