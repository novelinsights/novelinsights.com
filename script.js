(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // .reveal elements are visible by default in CSS (so the page works with
  // JavaScript disabled). Only once we know JS and IntersectionObserver are
  // both available do we opt them into the hidden-until-scrolled state.
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach(function (el) { el.classList.add('reveal-pending'); });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.classList.remove('reveal-pending');
            observer.unobserve(entry.target);
          }
        });
      },
      // threshold: 0 + a negative bottom rootMargin fires as soon as an
      // element's top edge crosses into view, regardless of how tall the
      // element is. A percentage threshold (e.g. 0.12) instead depends on
      // what fraction of the element's *own* height is visible at once —
      // for long single-wrapper content (e.g. founder-story.html) that
      // fraction can be unreachable on short mobile viewports, since a
      // narrow column makes the block far taller while the viewport is
      // also shorter, so the reveal never fires and the content stays
      // hidden.
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  }
})();
