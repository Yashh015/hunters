(function () {
  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function initImageHints() {
    document.querySelectorAll('img').forEach(function (img, i) {
      if (!img.hasAttribute('decoding')) img.decoding = 'async';
      if (!img.hasAttribute('loading') && i > 1) img.loading = 'lazy';
    });
  }

  function initGrainOverlay() {
    var grain = document.getElementById('grain');
    if (grain && prefersReducedMotion()) {
      grain.style.animation = 'none';
    }
  }

  function initRevealAnimations() {
    var revealSelector = '.rev, .pain, .step, .oc, .tc, .big-q, .card';
    var revealEls = document.querySelectorAll(revealSelector);
    if (!revealEls.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
    }
  }

  function initNavScrollAccent() {
    var navTick = false;
    window.addEventListener('scroll', function () {
      if (navTick) return;
      navTick = true;
      requestAnimationFrame(function () {
        var pill = document.querySelector('.nav-pill');
        if (pill) {
          pill.style.borderColor = scrollY > 30 ? 'rgba(242,237,230,.14)' : 'rgba(242,237,230,.09)';
        }
        navTick = false;
      });
    }, { passive: true });
  }

  function initMobileMenu() {
    var menuBtn = document.getElementById('menuBtn');
    var mobileMenu = document.getElementById('mobileMenu');
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      var spans = menuBtn.querySelectorAll('span');
      if (mobileMenu.classList.contains('open')) {
        if (spans[0]) spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        if (spans[1]) spans[1].style.opacity = '0';
        if (spans[2]) spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans.forEach(function (s) {
          s.style.transform = '';
          s.style.opacity = '';
        });
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        menuBtn.querySelectorAll('span').forEach(function (s) {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });
  }

  function initSharedUI() {
    initImageHints();
    initGrainOverlay();
    initRevealAnimations();
    initNavScrollAccent();
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSharedUI);
  } else {
    initSharedUI();
  }
})();
