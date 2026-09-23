/**
 * INTELFARMA - CONTROLADOR MESTRE DO PAINEL ADMINISTRATIVO (CMS)
 */

import { adminApi } from './admin-api.js';
import { renderLoginScreen } from './auth.js';
import { renderDashboard } from './views/dashboard.js';
import { renderSettings } from './views/settings.js';
import { renderPageEditor } from './views/pages-editor.js';
import { renderMedicines } from './views/medicines.js';
import { renderBlog } from './views/blog.js';
import { renderFaqs } from './views/faqs.js';
import { renderMessages } from './views/messages.js';
import { renderProfile } from './views/profile.js';
import { renderUsers } from './views/users.js';

let currentView = 'dashboard';

export async function initAdminApp() {
  const root = document.getElementById('admin-root');
  const token = adminApi.getToken();

  if (!token) {
    renderLoginScreen(root, () => initAdminApp());
    return;
  }

  // Validar se o token ainda é válido e atualizar dados do usuário
  let user = adminApi.getUser() || { name: 'Interfarma' };
  try {
    const meRes = await adminApi.getMe();
    if (meRes && meRes.user) {
      user = meRes.user;
      adminApi.setUser(user);
    }
  } catch (err) {
    renderLoginScreen(root, () => initAdminApp());
    return;
  }

  // Renderizar Shell do Painel
  root.innerHTML = `
    <div id="admin-layout">
      <!-- SIDEBAR -->
      <aside class="admin-sidebar" id="admin-sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <img src="/asserts/IF_Logo Vetorizado 1.png" alt="Interfarma" onerror="this.style.display='none';">
            <span>Interfarma CMS</span>
          </div>
          <button type="button" id="btn-close-sidebar" class="btn-close-sidebar" aria-label="Fechar Menu">&times;</button>
        </div>

        <ul class="sidebar-menu">
          <li class="sidebar-heading">Visão Geral</li>
          <li class="sidebar-item ${currentView === 'dashboard' ? 'active' : ''}">
            <a data-view="dashboard">
              <span>📊</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'settings' ? 'active' : ''}">
            <a data-view="settings">
              <span>🎨</span>
              <span>Identidade & Cores</span>
            </a>
          </li>

          <li class="sidebar-heading">Editar Elementos das Páginas</li>
          <li class="sidebar-item ${currentView === 'page-home' ? 'active' : ''}">
            <a data-view="page-home" title="Editar todos os elementos da Home">
              <span>🏠</span>
              <span>Página Home</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'page-como-funciona' ? 'active' : ''}">
            <a data-view="page-como-funciona" title="Editar todos os elementos de Como Funciona">
              <span>⚡</span>
              <span>Página Como Funciona</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'page-diferenciais' ? 'active' : ''}">
            <a data-view="page-diferenciais" title="Editar todos os elementos de Diferenciais">
              <span>🏆</span>
              <span>Página Diferenciais</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'page-empresas' ? 'active' : ''}">
            <a data-view="page-empresas" title="Editar todos os elementos de Empresas B2B">
              <span>🏢</span>
              <span>Página Empresas</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'page-medicamentos' ? 'active' : ''}">
            <a data-view="page-medicamentos" title="Editar elementos da página de Medicamentos">
              <span>💊</span>
              <span>Página Medicamentos</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'page-faq' ? 'active' : ''}">
            <a data-view="page-faq" title="Editar elementos da página de FAQ">
              <span>❓</span>
              <span>Página FAQ</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'page-blog' ? 'active' : ''}">
            <a data-view="page-blog" title="Editar elementos da página do Blog">
              <span>📰</span>
              <span>Página Blog</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'page-contato' ? 'active' : ''}">
            <a data-view="page-contato" title="Editar elementos da página de Contatos">
              <span>📞</span>
              <span>Página Contatos</span>
            </a>
          </li>

          <li class="sidebar-heading">Gerenciadores do CMS</li>
          <li class="sidebar-item ${currentView === 'medicines' ? 'active' : ''}">
            <a data-view="medicines">
              <span>💊</span>
              <span>Catálogo Medicamentos</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'blog' ? 'active' : ''}">
            <a data-view="blog">
              <span>📰</span>
              <span>Artigos do Blog</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'faqs' ? 'active' : ''}">
            <a data-view="faqs">
              <span>❓</span>
              <span>Perguntas do FAQ</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'messages' ? 'active' : ''}">
            <a data-view="messages">
              <span>✉️</span>
              <span>Mensagens & Leads</span>
            </a>
          </li>

          <li class="sidebar-heading">Usuários & Conta</li>
          <li class="sidebar-item ${currentView === 'users' ? 'active' : ''}">
            <a data-view="users">
              <span>👥</span>
              <span>Usuários & Acessos</span>
            </a>
          </li>
          <li class="sidebar-item ${currentView === 'profile' ? 'active' : ''}">
            <a data-view="profile">
              <span>👤</span>
              <span>Meu Perfil</span>
            </a>
          </li>

          <li class="sidebar-heading" style="margin-top: 1rem;">Acesso</li>
          <li class="sidebar-item">
            <a href="/" target="_blank">
              <span>🌐</span>
              <span>Ver Site Público &rarr;</span>
            </a>
          </li>
          <li class="sidebar-item">
            <a id="btn-admin-logout" style="color: #F87171;">
              <span>🚪</span>
              <span>Sair da Conta</span>
            </a>
          </li>
        </ul>
      </aside>

      <!-- OVERLAY PARA MOBILE -->
      <div class="admin-sidebar-overlay" id="admin-sidebar-overlay"></div>

      <!-- ÁREA PRINCIPAL -->
      <main class="admin-main">
        <!-- TOPBAR -->
        <header class="admin-topbar">
          <div class="topbar-left">
            <button type="button" id="btn-sidebar-toggle" class="btn-sidebar-toggle" aria-label="Abrir Menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <h2 id="topbar-title">Dashboard & Métricas</h2>
          </div>

          <div class="topbar-right">
            <div class="user-profile-badge" id="btn-user-profile" title="Ver Meu Perfil" style="cursor: pointer;">
              <div class="user-avatar">${user.name ? user.name.charAt(0).toUpperCase() : 'I'}</div>
              <span class="user-name-text" style="font-size: 0.875rem; font-weight: 600;">${user.name || 'Interfarma'}</span>
            </div>
          </div>
        </header>

        <!-- CONTAINER DA VIEW -->
        <div class="admin-content" id="admin-view-container"></div>
      </main>
    </div>
  `;

  // Carregar a View inicial
  await switchView(currentView);

  // Controle do Menu Mobile (Sidebar & Overlay)
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('admin-sidebar-overlay');
  const toggleBtn = document.getElementById('btn-sidebar-toggle');
  const closeBtn = document.getElementById('btn-close-sidebar');

  function openSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('active');
  }

  function closeSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('active');
  }

  toggleBtn?.addEventListener('click', openSidebar);
  closeBtn?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);

  // Clique no avatar do topo abre o Perfil
  document.getElementById('btn-user-profile')?.addEventListener('click', () => {
    switchView('profile');
    if (window.innerWidth <= 900) {
      closeSidebar();
    }
  });

  // Listeners da Sidebar (fecha no mobile ao clicar em item)
  root.querySelectorAll('.sidebar-item a[data-view]').forEach(item => {
    item.addEventListener('click', (e) => {
      const view = item.getAttribute('data-view');
      switchView(view);
      if (window.innerWidth <= 900) {
        closeSidebar();
      }
    });
  });

  // Logout
  document.getElementById('btn-admin-logout')?.addEventListener('click', () => {
    adminApi.removeToken();
    initAdminApp();
  });
}

async function switchView(viewName) {
  currentView = viewName;
  const container = document.getElementById('admin-view-container');
  const topbarTitle = document.getElementById('topbar-title');
  if (!container) return;

  // Atualizar classe ativa na sidebar
  document.querySelectorAll('.sidebar-item').forEach(item => {
    const link = item.querySelector('a');
    if (link && link.getAttribute('data-view') === viewName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Roteamento de Views
  if (viewName === 'dashboard') {
    if (topbarTitle) topbarTitle.textContent = 'Dashboard & Métricas';
    await renderDashboard(container);
  } else if (viewName === 'settings') {
    if (topbarTitle) topbarTitle.textContent = 'Identidade Visual & Cores';
    await renderSettings(container);
  } else if (viewName === 'users') {
    if (topbarTitle) topbarTitle.textContent = 'Usuários & Permissões';
    await renderUsers(container);
  } else if (viewName === 'profile') {
    if (topbarTitle) topbarTitle.textContent = 'Meu Perfil & Segurança';
    await renderProfile(container);
  } else if (viewName.startsWith('page-')) {
    const slug = viewName.replace('page-', '');
    const pageLabels = {
      'home': 'Home',
      'como-funciona': 'Como Funciona',
      'diferenciais': 'Diferenciais',
      'empresas': 'Empresas B2B',
      'medicamentos': 'Medicamentos',
      'faq': 'FAQ',
      'blog': 'Blog',
      'contato': 'Contato'
    };
    const label = pageLabels[slug] || slug.toUpperCase();
    if (topbarTitle) topbarTitle.textContent = `Edição: Página ${label}`;
    await renderPageEditor(container, slug);
  } else if (viewName === 'medicines') {
    if (topbarTitle) topbarTitle.textContent = 'Medicamentos';
    await renderMedicines(container);
  } else if (viewName === 'blog') {
    if (topbarTitle) topbarTitle.textContent = 'Artigos do Blog';
    await renderBlog(container);
  } else if (viewName === 'faqs') {
    if (topbarTitle) topbarTitle.textContent = 'Perguntas FAQ';
    await renderFaqs(container);
  } else if (viewName === 'messages') {
    if (topbarTitle) topbarTitle.textContent = 'Mensagens & Leads';
    await renderMessages(container);
  }
}

// Eventos Globais de Navegação e Logout
window.addEventListener('admin:navigate', (e) => {
  if (e.detail?.view) switchView(e.detail.view);
});

window.addEventListener('auth:logout', () => {
  initAdminApp();
});

// Inicialização automática
document.addEventListener('DOMContentLoaded', initAdminApp);
