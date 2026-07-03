/**
 * American Star Driving School – Shared nav, footer, mobile menu
 */
(function () {
  const isSubpage = window.location.pathname.includes('/pages/');
  const base = isSubpage ? '../' : '';

  const path = window.location.pathname;
  const active = {
    home:     !isSubpage && (path.endsWith('/') || path.endsWith('index.html')),
    services: path.includes('services'),
    permit:   path.includes('permit'),
    contact:  path.includes('contact'),
    about:    path.includes('about'),
  };

  function navItem(href, label, key) {
    return `<li><a href="${base}${href}"${active[key] ? ' class="active"' : ''}>${label}</a></li>`;
  }

  const navHTML = `
    <header>
      <div class="nav-inner">
        <a href="${base}index.html" class="logo">
          <span class="logo-star">&#9733;</span>
          <span class="logo-text">
            <span class="logo-top">American Star</span>
            <span class="logo-bottom">Driving School</span>
          </span>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <nav>
          <ul id="navMenu">
            ${navItem('index.html',          'Home',     'home')}
            ${navItem('pages/services.html', 'Services', 'services')}
            ${navItem('pages/permit.html',   'Permit',   'permit')}
            ${navItem('pages/contact.html',  'Contact',  'contact')}
            ${navItem('pages/about.html',    'About',    'about')}
            <li><a class="cta-nav" href="${base}pages/contact.html">Enroll Now</a></li>
          </ul>
        </nav>
      </div>
    </header>`;

  const footerHTML = `
    <footer>
      <div class="footer-inner">
        <div class="footer-col">
          <h4>American Star Driving School</h4>
          <p>Comprehensive driving instruction tailored to your needs. Serving New Jersey since 2023.</p>
        </div>
        <div class="footer-col">
          <h4>Contact Information</h4>
          <a href="mailto:AmericanstarDS@gmail.com">AmericanstarDS@gmail.com</a>
          <a href="tel:7327831750">(732) 783-1750</a>
          <p>New Brunswick, NJ, USA</p>
        </div>
        <div class="footer-col">
          <h4>Hours</h4>
          <p>Monday – Friday: 9am – 6pm</p>
          <p>Saturday – Sunday: 10am – 4pm</p>
        </div>
      </div>
      <div class="footer-bottom">&copy; 2026 American Star Driving School. All rights reserved.</div>
    </footer>`;

  // Inject
  const navEl = document.getElementById('site-nav');
  if (navEl) navEl.outerHTML = navHTML;

  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.outerHTML = footerHTML;

  // Mobile menu
  function initMobileNav() {
    const toggle = document.getElementById('menuToggle');
    const menu   = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
