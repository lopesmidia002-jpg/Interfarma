import { api } from '../api.js';
import { showToast } from '../components.js';

export async function renderBlogPage(slug = null) {
  const app = document.getElementById('app');

  // =========================================================================
  // CENÁRIO 1: VISUALIZAÇÃO DE POST INDIVIDUAL (/blog/:slug)
  // =========================================================================
  if (slug) {
    app.innerHTML = `<div style="padding: 100px 0; text-align: center;"><div class="badge">Carregando artigo...</div></div>`;
    const post = await api.getBlogPostBySlug(slug);

    if (!post) {
      app.innerHTML = `
        <div class="container" style="padding: 100px 1.5rem; text-align: center;">
          <h2 style="font-size: 2rem; margin-bottom: 1rem; color: #1E3A5F;">Artigo não encontrado</h2>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">O artigo solicitado não está disponível.</p>
          <a href="/blog" class="btn-voltar" data-route="blog">Voltar</a>
        </div>
      `;
      return;
    }

    const coverImg = post.cover_image || '/asserts/blog-card-cover.jpg';

    app.innerHTML = `
      <article style="background: #FFFFFF; padding: 3rem 0 0 0;">
        <div class="container" style="max-width: 820px; margin: 0 auto; padding: 0 1.5rem;">
          <!-- BOTÃO VOLTAR -->
          <div style="margin-bottom: 1.75rem;">
            <a href="/blog" class="btn-voltar" data-route="blog">Voltar</a>
          </div>

          <!-- IMAGEM PRINCIPAL DO POST -->
          <div style="border-radius: 16px; overflow: hidden; margin-bottom: 2.25rem; box-shadow: 0 8px 24px rgba(0,0,0,0.06); text-align: center;">
            <img src="${coverImg}" alt="${post.title}" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 16px; display: block;" onerror="this.src='/asserts/blog-card-cover.jpg';">
          </div>

          <!-- TÍTULO DO BLOG -->
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #153258; margin-bottom: 1.75rem; letter-spacing: -0.01em; line-height: 1.3;">
            ${post.title}
          </h1>

          <!-- CORPO DE TEXTO DO ARTIGO -->
          <div class="blog-article-content" style="color: #475569; font-size: 0.95rem; line-height: 1.85; margin-bottom: 4rem; text-align: left;">
            ${post.content ? post.content : `
              <p style="margin-bottom: 1.6rem;">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultricies felis nec urna feugiat faucibus. Sed tortor enim, dignissim ac massa quis, scelerisque feugiat ligula. Phasellus ac elit vitae felis tincidunt porta. Nunc blandit pulvinar dui, vel condimentum orci rutrum non. Fusce ac augue at ipsum volutpat auctor a vel tortor. Proin condimentum risus vitae felis molestie imperdiet. In pellentesque faucibus ante id ornare. Quisque molestie nunc bibendum, finibus urna eget, malesuada ante. Integer bibendum, nunc in consequat molestie, orci tortor commodo est, sit amet iaculis mauris neque non tortor. Cras sodales auctor ex, in vulputate nunc. Suspendisse eget turpis sed tortor mollis sollicitudin. Morbi dignissim mauris et magna tincidunt suscipit. Mauris auctor id odio sit amet congue.
              </p>
              <p style="margin-bottom: 1.6rem;">
                Pellentesque bibendum euismod cursus. Donec facilisis laoreet lacus sit amet ultricies. Fusce eget sodales dolor, eget congue nisl. Donec tincidunt laoreet sem sit amet posuere. Integer magna odio, efficitur eget pretium sed, rutrum et massa. Aenean semper vitae ex nec tempor. Quisque vitae feugiat orci, tincidunt maximus sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque laoreet, elit eget porta consequat, ligula lorem iaculis libero, et porttitor eros lacus eu neque. Aliquam risus magna, congue sollicitudin mi quis, condimentum volutpat leo. Maecenas egestas, augue sed ultrices venenatis, diam purus tincidunt nibh, nec placerat mi metus eu turpis. Phasellus neque erat, pretium sit amet leo quis, elementum convallis nisl.
              </p>
              <p style="margin-bottom: 1.6rem;">
                Proin hendrerit, nulla quis ornare porta, sem leo bibendum nisl, in lobortis ligula mi ut leo. Sed congue, libero nec faucibus pretium, sapien tortor eleifend nisl, eu laoreet libero mi non massa. Proin gravida enim et auctor tincidunt. Fusce quis leo sapien. Pellentesque faucibus diam congue, imperdiet urna at, sagittis mi. Sed eget leo ut dui fermentum efficitur. Proin ac urna ut diam suscipit varius. Duis convallis pulvinar enim, in elementum urna commodo eget. Etiam dictum ligula neque, in egestas augue interdum semper. Aliquam ullamcorper sodales ex et commodo.
              </p>
              <p style="margin-bottom: 1.6rem;">
                Donec eu iaculis metus, et lobortis velit. Vestibulum lacus ipsum, auctor vel urna in, blandit finibus arcu. Donec iaculis, metus id mollis vestibulum, nunc sem maximus lacus, ut efficitur turpis elit sed metus. Donec turpis quam, luctus id est sit amet, blandit facilisis odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean eu dui sit amet turpis imperdiet mollis nec sed velit. Pellentesque ut dictum turpis, at cursus felis. Proin ultricies rhoncus ipsum nec dapibus. Nullam nunc odio, porta at malesuada vel, consectetur quis augue.
              </p>
              <p style="margin-bottom: 1.6rem;">
                Aenean tempor dictum fringilla. Vestibulum efficitur, augue at tempus mattis, sem purus tristique lorem, quis sagittis risus mi vel lectus. Ut faucibus, ligula sed molestie porta, odio arcu egestas ex, ac interdum augue nisi sed dui. Fusce venenatis felis quis rhoncus placerat. Cras non augue sit amet urna molestie luctus. Sed non velit massa. Pellentesque imperdiet erat eget nisi consectetur auctor. Morbi mattis nisl sem, et sagittis velit molestie in. Vestibulum ullamcorper nunc ac tortor varius blandit. Duis vitae ipsum facilisis, convallis nunc et, lacinia dui. Phasellus aliquam lorem ac turpis semper blandit. Aenean porta velit et luctus euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam erat volutpat. Suspendisse feugiat felis ac lorem laoreet ullamcorper. Praesent eget scelerisque massa.
              </p>
            `}
          </div>
        </div>

        <!-- BANNER DE LARGURA TOTAL: FAÇA JÁ SEU PEDIDO -->
        <section class="med-panoramic-banner">
          <div class="container" style="position: relative; z-index: 2; max-width: 650px;">
            <h2 style="font-size: 2.35rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1.5rem; letter-spacing: -0.01em;">Faça já seu pedido</h2>
            <a href="/contato" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.95rem; padding: 0.85rem 2.25rem; border-radius: 6px; box-shadow: 0 4px 14px rgba(44, 164, 176, 0.4); text-decoration: none; display: inline-block;" data-route="contato">
              Fale com nossos especialistas
            </a>
          </div>
        </section>

        <!-- SEÇÃO LEAD: INFORME SEU E-MAIL (FUNDO AZUL CLARO SUAVE CONFORME FOTO) -->
        <section style="background: #F4F9FD; padding: 4.5rem 1rem 5rem 1rem; text-align: center;">
          <div class="container" style="max-width: 650px;">
            <h2 style="font-size: 1.8rem; font-weight: 800; color: #153258; margin-bottom: 2rem; line-height: 1.35; letter-spacing: -0.01em;">
              Informe seu e-mail que<br>entraremos em contato
            </h2>

            <form id="lead-email-form" style="display: flex; gap: 0.75rem; justify-content: center; align-items: center; max-width: 480px; margin: 0 auto; flex-wrap: wrap;">
              <div style="position: relative; flex: 1; min-width: 250px;">
                <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94A3B8; font-size: 1.1rem; line-height: 1;">✉</span>
                <input type="email" id="lead-email-input" required placeholder="Endereço de e-mail" style="width: 100%; padding: 0.8rem 1rem 0.8rem 2.6rem; font-size: 0.9rem; border-radius: 6px; border: 1px solid #E2E8F0; background: #FFFFFF; outline: none; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
              </div>
              <button type="submit" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.9rem; padding: 0.8rem 2rem; border-radius: 6px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(44, 164, 176, 0.3);">
                Enviar
              </button>
            </form>
          </div>
        </section>
      </article>
    `;

    bindLeadForm();
    return;
  }

  // =========================================================================
  // CENÁRIO 2: LISTAGEM DE POSTS DO BLOG (/blog - 6 CARDS 3x2 CONFORME DESIGN)
  // =========================================================================
  app.innerHTML = `<div style="padding: 100px 0; text-align: center;"><div class="badge">Carregando blog...</div></div>`;

  const [pageData, data] = await Promise.all([
    api.getPage('blog'),
    api.getBlogPosts({ limit: 12 })
  ]);
  const sec = pageData?.sections || {};
  const heroSec = sec.hero || {};
  const posts = data.posts || [];

  // Garantir exatamente 6 posts no grid 3x2 conforme o design de referência
  const displayPosts = [...posts];
  const defaultFiller = {
    title: 'Título do blog',
    slug: 'titulo-do-blog',
    summary: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru',
    cover_image: '/asserts/blog-laptop.jpg'
  };

  while (displayPosts.length < 6) {
    const idx = displayPosts.length + 1;
    displayPosts.push({
      ...defaultFiller,
      id: idx,
      slug: displayPosts.length === 0 ? 'como-beneficio-medicamentos-reduz-absenteismo' : `post-exemplo-${idx}`,
      cover_image: '/asserts/blog-laptop.jpg'
    });
  }

  // Ajustar imagens para blog-laptop.jpg caso venham com o placeholder antigo
  const finalPosts = displayPosts.slice(0, 6).map(p => ({
    ...p,
    cover_image: (p.cover_image && !p.cover_image.includes('blog-card-cover.jpg')) ? p.cover_image : '/asserts/blog-laptop.jpg'
  }));

  const heroStyle = heroSec.image_url ? `style="background-image: url('${heroSec.image_url}'); background-size: cover; background-position: center;"` : '';

  app.innerHTML = `
    <div style="background: #FFFFFF;">
      <!-- HERO BANNER DO BLOG (FOTO COM TÍTULO 'Blog' NO CENTRO) -->
      <section class="page-hero-header" ${heroStyle}>
        <div class="page-hero-header-overlay"></div>
        <div class="page-hero-header-content">
          <h1 class="page-hero-header-title">
            ${heroSec.title || 'Blog'}
          </h1>
          ${heroSec.subtitle ? `<p style="color: rgba(255,255,255,0.9); font-size: 1.05rem; margin-top: 0.5rem; max-width: 600px; margin-left: auto; margin-right: auto;">${heroSec.subtitle}</p>` : ''}
        </div>
      </section>

      <!-- SEÇÃO GRID DE BLOG (6 CARDS COM FOTO LAPTOP CONFORME DESIGN) -->
      <section class="home-blog-section" style="padding-top: 5rem; padding-bottom: 5.5rem;">
        <div class="home-blog-container">
          
          <!-- GRID DE 6 POSTS (3 COLUNAS x 2 LINHAS) -->
          <div class="home-blog-grid" style="margin-bottom: 0;">
            ${finalPosts.map(p => `
              <div class="home-blog-card">
                <a href="/blog/${p.slug}" data-route="blog-post" data-slug="${p.slug}" class="home-blog-card-img-wrap">
                  <img src="${p.cover_image}" alt="${p.title}" class="home-blog-card-img" onerror="this.src='/asserts/blog-laptop.jpg';">
                </a>
                <h3 class="home-blog-card-heading">
                  <a href="/blog/${p.slug}" data-route="blog-post" data-slug="${p.slug}">
                    ${p.title}
                  </a>
                </h3>
                <p class="home-blog-card-text">
                  ${p.summary || defaultFiller.summary}
                </p>
              </div>
            `).join('')}
          </div>

        </div>
      </section>

      <!-- BANNER DE LARGURA TOTAL: FAÇA JÁ SEU PEDIDO -->
      <section class="med-panoramic-banner">
        <div class="container" style="position: relative; z-index: 2; max-width: 650px;">
          <h2 style="font-size: 2.35rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1.5rem; letter-spacing: -0.01em;">Faça já seu pedido</h2>
          <a href="/contato" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.95rem; padding: 0.85rem 2.25rem; border-radius: 6px; box-shadow: 0 4px 14px rgba(44, 164, 176, 0.4); text-decoration: none; display: inline-block;" data-route="contato">
            Fale com nossos especialistas
          </a>
        </div>
      </section>

      <!-- SEÇÃO LEAD: INFORME SEU E-MAIL -->
      <section style="background: #F4F9FD; padding: 4.5rem 1rem 5rem 1rem; text-align: center;">
        <div class="container" style="max-width: 650px;">
          <h2 style="font-size: 1.8rem; font-weight: 800; color: #153258; margin-bottom: 2rem; line-height: 1.35; letter-spacing: -0.01em;">
            Informe seu e-mail que<br>entraremos em contato
          </h2>

          <form id="lead-email-form" style="display: flex; gap: 0.75rem; justify-content: center; align-items: center; max-width: 480px; margin: 0 auto; flex-wrap: wrap;">
            <div style="position: relative; flex: 1; min-width: 250px;">
              <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94A3B8; font-size: 1.1rem; line-height: 1;">✉</span>
              <input type="email" id="lead-email-input" required placeholder="Endereço de e-mail" style="width: 100%; padding: 0.8rem 1rem 0.8rem 2.6rem; font-size: 0.9rem; border-radius: 6px; border: 1px solid #E2E8F0; background: #FFFFFF; outline: none; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
            </div>
            <button type="submit" class="btn" style="background-color: #2CA4B0; color: #FFFFFF; font-weight: 700; font-size: 0.9rem; padding: 0.8rem 2rem; border-radius: 6px; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(44, 164, 176, 0.3);">
              Enviar
            </button>
          </form>
        </div>
      </section>
    </div>
  `;

  bindLeadForm();
}

function bindLeadForm() {
  document.getElementById('lead-email-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('lead-email-input')?.value;
    if (!email) return;

    try {
      await api.sendContact({
        name: 'Lead Newsletter / Blog',
        email: email,
        subject: 'Interesse via Blog',
        message: 'Solicitação de contato via campo de e-mail da página do Blog.'
      });
      showToast('E-mail cadastrado com sucesso! Entraremos em contato em breve.', 'success');
      const input = document.getElementById('lead-email-input');
      if (input) input.value = '';
    } catch (err) {
      showToast('Erro ao enviar e-mail. Tente novamente.', 'error');
    }
  });
}
