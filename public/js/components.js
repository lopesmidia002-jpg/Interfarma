/**
 * INTELFARMA - COMPONENTES GLOBAIS
 * Header, Footer, Tema Dinâmico, WhatsApp e Toasts
 */

export function applyThemeTokens(settings) {
  if (!settings) return;
  const root = document.documentElement;

  if (settings.primary_color) {
    root.style.setProperty('--primary-color', settings.primary_color);
  }
  if (settings.secondary_color) {
    root.style.setProperty('--secondary-color', settings.secondary_color);
  }
  if (settings.accent_color) {
    root.style.setProperty('--accent-color', settings.accent_color);
  }
  if (settings.bg_color) {
    root.style.setProperty('--bg-color', settings.bg_color);
  }
  if (settings.text_color) {
    root.style.setProperty('--text-color', settings.text_color);
  }
  if (settings.custom_css) {
    let customStyleEl = document.getElementById('cms-custom-css');
    if (!customStyleEl) {
      customStyleEl = document.createElement('style');
      customStyleEl.id = 'cms-custom-css';
      document.head.appendChild(customStyleEl);
    }
    customStyleEl.textContent = settings.custom_css;
  }
}

export function renderHeader(settings, activeRoute = 'home') {
  const headerContainer = document.getElementById('header-mount');
  if (!headerContainer) return;

  const siteName = settings?.site_name || 'InterFarma';
  const logoUrl = settings?.logo_url || '/asserts/IF_Logo Vetorizado 1.png';
  const phone = settings?.phone || '+55 11 5088-1818';
  const email = settings?.email || 'contato@interfarma.com.br';
  const cleanPhone = phone.replace(/[^\d+]/g, '');

  headerContainer.innerHTML = `
    <header class="site-header" id="site-header">
      <!-- TOPBAR SUPERIOR VERDE / TEAL -->
      <div class="site-topbar">
        <div class="container topbar-inner">
          <div class="topbar-left">
            <a href="tel:${cleanPhone}" class="topbar-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>${phone}</span>
            </a>
            <a href="mailto:${email}" class="topbar-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>${email}</span>
            </a>
          </div>

          <div class="topbar-right">
            <a href="https://instagram.com" target="_blank" rel="noopener" class="topbar-social" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="topbar-social" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- MAIN NAVBAR -->
      <div class="site-navbar">
        <div class="container header-inner">
          <a href="/" class="brand-logo" data-route="home">
            <img src="${logoUrl}" alt="${siteName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
            <span style="${logoUrl ? 'display:none;' : ''}">${siteName}</span>
          </a>

          <nav class="nav-menu" id="nav-menu">
            <a href="/como-funciona" class="nav-link ${activeRoute === 'como-funciona' ? 'active' : ''}" data-route="como-funciona">Como funciona</a>
            <a href="/diferenciais" class="nav-link ${activeRoute === 'diferenciais' ? 'active' : ''}" data-route="diferenciais">Diferenciais</a>
            <a href="/empresas" class="nav-link ${activeRoute === 'empresas' ? 'active' : ''}" data-route="empresas">Empresas</a>
            <a href="/medicamentos" class="nav-link ${activeRoute === 'medicamentos' ? 'active' : ''}" data-route="medicamentos">Medicamentos</a>
            <a href="/faq" class="nav-link ${activeRoute === 'faq' ? 'active' : ''}" data-route="faq">FAQ</a>
            <a href="/blog" class="nav-link ${activeRoute === 'blog' ? 'active' : ''}" data-route="blog">Blog</a>
            <a href="/contato" class="btn mobile-cta-btn" data-route="contato" style="display: none;">Entrar em contato</a>
          </nav>

          <div class="header-actions">
            <div class="lang-switch">
              <span class="lang-item active">PT</span>
              <span class="lang-item">EN</span>
            </div>
            <a href="/contato" class="btn btn-header-cta" data-route="contato">Entrar em contato</a>
          </div>

          <button class="mobile-toggle" id="mobile-toggle" aria-label="Abrir Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
      <!-- BACKDROP DESFOCADO (BLUR) PARA O MODO MOBILE -->
      <div class="mobile-menu-backdrop" id="mobile-menu-backdrop"></div>
    </header>
  `;

  // Listeners de scroll e toggle mobile
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const backdrop = document.getElementById('mobile-menu-backdrop');

  const closeMenu = () => {
    navMenu?.classList.remove('open');
    toggleBtn?.classList.remove('open');
    backdrop?.classList.remove('open');
    document.body.classList.remove('mobile-menu-active');
    document.body.style.overflow = '';
  };

  toggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navMenu?.classList.toggle('open');
    toggleBtn?.classList.toggle('open', isOpen);
    backdrop?.classList.toggle('open', isOpen);
    if (isOpen) {
      document.body.classList.add('mobile-menu-active');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('mobile-menu-active');
      document.body.style.overflow = '';
    }
  });

  backdrop?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });

  navMenu?.querySelectorAll('a')?.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

export function renderFooter(settings) {
  const footerContainer = document.getElementById('footer-mount');
  if (!footerContainer) return;

  const siteName = settings?.site_name || 'InterFarma';
  const logoFooter = settings?.logo_footer_url || settings?.logo_url || '/asserts/IF_Logo Vetorizado 1.png';
  const phone = settings?.phone || '+55 11 5088-1818';
  const email = settings?.email || 'interfarma@interfarma.com.br';
  const address = settings?.address || 'Rua Salgueiro, 258, Itaim Bibi, São Paulo/SP';
  const cleanPhone = phone.replace(/[^\d+]/g, '');

  footerContainer.innerHTML = `
    <footer class="site-footer-minimal">
      <div class="container footer-minimal-inner">
        <!-- LOGO -->
        <div class="footer-logo">
          <a href="/" data-route="home">
            <img src="${logoFooter}" alt="${siteName}" style="height: 38px; width: auto; object-fit: contain;">
          </a>
        </div>

        <!-- ENDEREÇO -->
        <div class="footer-info-item">
          <span>${address}</span>
        </div>

        <!-- TELEFONE -->
        <div class="footer-info-item">
          <a href="tel:${cleanPhone}" style="color: inherit; font-weight: 600;">${phone}</a>
        </div>

        <!-- EMAIL -->
        <div class="footer-info-item">
          <a href="mailto:${email}" style="color: inherit; font-weight: 600;">${email}</a>
        </div>

        <!-- REDES SOCIAIS -->
        <div class="footer-social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  `;
}

export function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgColor = type === 'success' ? '#0D9488' : type === 'error' ? '#EF4444' : '#0284C7';
  toast.style.cssText = `
    background: ${bgColor};
    color: #FFFFFF;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    font-weight: 600;
    font-size: 0.9rem;
    animation: fadeIn 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  `;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span> ${message}`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
