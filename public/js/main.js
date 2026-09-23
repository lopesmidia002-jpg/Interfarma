/**
 * INTELFARMA - CLIENT-SIDE ROUTER & APP CONTROLLER
 */

import { api } from './api.js';
import { applyThemeTokens, renderHeader, renderFooter } from './components.js';

// Importar Páginas
import { renderHomePage } from './pages/home.js';
import { renderComoFuncionaPage } from './pages/como-funciona.js';
import { renderDiferenciaisPage } from './pages/diferenciais.js';
import { renderEmpresasPage } from './pages/empresas.js';
import { renderMedicamentosPage } from './pages/medicamentos.js';
import { renderMedicamentoDetalhesPage } from './pages/medicamento-detalhes.js';
import { renderFaqPage } from './pages/faq.js';
import { renderBlogPage } from './pages/blog.js';
import { renderContatoPage } from './pages/contato.js';

let appSettings = null;

const routes = {
  '/': renderHomePage,
  '/como-funciona': renderComoFuncionaPage,
  '/diferenciais': renderDiferenciaisPage,
  '/empresas': renderEmpresasPage,
  '/medicamentos': renderMedicamentosPage,
  '/faq': renderFaqPage,
  '/blog': renderBlogPage,
  '/contato': renderContatoPage
};

function getRouteInfo(pathname) {
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  if (routes[cleanPath]) {
    const routeKey = cleanPath === '/' ? 'home' : cleanPath.replace('/', '');
    return { handler: routes[cleanPath], routeKey, param: null };
  }

  // Verificar rota de detalhes do medicamento (/medicamento/:name ou /medicamentos/:name)
  if (cleanPath.startsWith('/medicamento/')) {
    const param = decodeURIComponent(cleanPath.replace('/medicamento/', ''));
    return { handler: renderMedicamentoDetalhesPage, routeKey: 'medicamentos', param };
  }

  if (cleanPath.startsWith('/medicamentos/') && cleanPath !== '/medicamentos') {
    const param = decodeURIComponent(cleanPath.replace('/medicamentos/', ''));
    return { handler: renderMedicamentoDetalhesPage, routeKey: 'medicamentos', param };
  }

  // Verificar rota de post do blog (/blog/:slug)
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    return { handler: renderBlogPage, routeKey: 'blog', param: slug };
  }

  // Fallback para Home
  return { handler: renderHomePage, routeKey: 'home', param: null };
}

async function navigateTo(path, pushState = true) {
  if (pushState) {
    window.history.pushState({}, '', path);
  }

  // Garantir que classes e travas do menu mobile sejam removidas
  document.body.classList.remove('mobile-menu-active');
  document.body.style.overflow = '';

  const { handler, routeKey, param } = getRouteInfo(window.location.pathname);

  // Renderizar Header e Footer com link ativo
  renderHeader(appSettings, routeKey);
  renderFooter(appSettings);

  // Scroll para o topo
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Executar renderizador da página
  if (param) {
    await handler(param);
  } else {
    await handler();
  }

  // Atualizar título da aba
  updateDocumentTitle(routeKey);
}

function updateDocumentTitle(routeKey) {
  const siteName = appSettings?.site_name || 'Intelfarma';
  const titles = {
    'home': `${siteName} - Soluções Inteligentes em Saúde e Benefícios Farmacêuticos`,
    'como-funciona': `Como Funciona | ${siteName}`,
    'diferenciais': `Diferenciais & Tecnologia | ${siteName}`,
    'empresas': `Soluções Corporativas para Empresas | ${siteName}`,
    'medicamentos': `Catálogo de Medicamentos & Descontos | ${siteName}`,
    'faq': `Perguntas Frequentes (FAQ) | ${siteName}`,
    'blog': `Blog de Saúde & Bem-Estar | ${siteName}`,
    'contato': `Fale Conosco & Atendimento | ${siteName}`
  };

  document.title = titles[routeKey] || siteName;
}

// Inicialização da Aplicação
async function initApp() {
  try {
    appSettings = await api.getSettings();
    applyThemeTokens(appSettings);
  } catch (e) {
    console.warn('Usando configurações padrão:', e);
  }

  // Event listener para links com data-route ou links internos
  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('a');
    if (!targetLink) return;

    const href = targetLink.getAttribute('href');
    if (!href) return;

    // Se for link externo, admin ou âncora interna
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('/admin') || href.startsWith('#')) {
      return;
    }

    e.preventDefault();
    navigateTo(href);
  });

  // Listener para botão voltar/avançar do navegador
  window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname, false);
  });

  // Carregar rota inicial
  await navigateTo(window.location.pathname, false);
}

// Iniciar ao carregar DOM
document.addEventListener('DOMContentLoaded', initApp);
