/* prismadev — load sequence, scroll reveals, copy-to-clipboard */
(function () {
  'use strict';

  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* The hero refraction sequence is pure CSS — nothing to start here. */

  /* Nav gains a hairline once you leave the top of the page. */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    nav.classList.toggle('is-stuck', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Scroll reveals. */
  var targets = document.querySelectorAll('.reveal');
  if (calm || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    document.querySelector('.cta').classList.add('in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.transitionDelay = (i * 70) + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

    targets.forEach(function (el) { io.observe(el); });

    /* The contact figure re-converges when the section comes into view. */
    var cta = document.querySelector('.cta');
    var ctaIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        cta.classList.add('in');
        ctaIO.unobserve(cta);
      });
    }, { threshold: 0.25 });
    ctaIO.observe(cta);
  }

  /* Copy the address. */
  var btn = document.querySelector('.copy');
  if (btn && navigator.clipboard) {
    var label = btn.querySelector('.copy-txt');
    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(btn.dataset.copy).then(function () {
        label.textContent = 'Copied';
        btn.classList.add('done');
        setTimeout(function () {
          label.textContent = 'Copy address';
          btn.classList.remove('done');
        }, 2000);
      });
    });
  } else if (btn) {
    btn.hidden = true;
  }
})();
