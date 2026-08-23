(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function init() {
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

    const btn = $('#menuBtn');
    const mob = $('#mobileNav');
    if (btn && mob) {
      btn.addEventListener('click', () => mob.classList.toggle('open'));
      mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));
    }

    const toTop = $('#toTop');
    const header = $('#header');
    const navLinks = $$('[data-nav]');
    const sectionIds = navLinks.map(a => a.getAttribute('href')).filter(Boolean);
    const sections = sectionIds.map(id => $(id)).filter(Boolean);

    function updateActiveLink() {
      const fromTop = window.scrollY + 120;
      let currentId = sections[0] ? sections[0].id : null;
      for (const s of sections) {
        if (s.offsetTop <= fromTop) currentId = s.id;
      }
      navLinks.forEach(l => {
        const match = l.getAttribute('href') === '#' + currentId;
        l.classList.toggle('is-active', match);
        if (match) l.setAttribute('aria-current', 'true');
        else l.removeAttribute('aria-current');
      });
    }

    function onScroll() {
      if (toTop) {
        if (window.scrollY > 600) toTop.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        else toTop.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
      }
      if (header) {
        if (window.scrollY > 4) header.classList.add('shadow-sm');
        else header.classList.remove('shadow-sm');
      }
      updateActiveLink();
    }

    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
