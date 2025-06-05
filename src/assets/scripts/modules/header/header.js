import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
import device from 'current-device';
if (device.iphone()) {
  document.querySelector('html').style.overscrollBehavior = 'none';
}

const header = document.querySelector('.header-bg');

window.addEventListener('scroll', function headerSquosh() {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 20) {
    header.classList.add('scroll-down');
  } else {
    header.classList.remove('scroll-down');
  }
});

document.body.addEventListener('click', function(evt) {
  const close = evt.target.closest('[data-call-us-modal-close]');
  const form = evt.target.closest('[data-call-us-modal]');
  const btn = evt.target.closest('[data-call-us-btn]');
  const overflow = document.querySelector('[data-call-us__overflow]');

  const menuOverlay = document.querySelector('.menu-overlay');
  const countryList = evt.target.closest('.iti__country-list');
  const btnUp = evt.target.closest('[data-btn-up]');
  const btnMenuTarget = evt.target.closest('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  const menuLink = evt.target.closest('a.menu-item');
  const closeBig = evt.target.closest('[data-call-us-modal-close--big]');
  // const formBig = evt.target.closest('[data-call-us-modal--big]');
  const btnBig = evt.target.closest('[data-call-us-btn--big]');
  const overflowBig = document.querySelector('[data-call-us__overflow--big]');

  if (btnMenuTarget || menuLink) {
    menu.classList.toggle('hidden');
    header.classList.toggle('menu-is-open');
    if (menu.classList.contains('hidden')) {
      window.dispatchEvent(new Event('start-scroll'));
    } else {
      window.dispatchEvent(new Event('stop-scroll'));
    }
    // menuAnimation();
    return;
  }
  if (evt.target === menuOverlay) {
    menu.classList.add('hidden');
    header.classList.remove('menu-is-open');
    window.dispatchEvent(new Event('start-scroll'));
    return;
  }
  // if (btnUp) {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }
  if (btn) {
    if (overflow.classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));
      return overflow.classList.remove('hidden');
    }
    if (btn.dataset.callUsBtn) {
    }
    return;
  }
  if (close || closeBig) {
    window.dispatchEvent(new Event('start-scroll'));
    overflowBig.classList.add('hidden');
    return overflow.classList.add('hidden');
  }
  if (evt.target === overflow) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflow.classList.add('hidden');
  }
  if (btnBig) {
    if (overflowBig.classList.contains('hidden')) {
      window.dispatchEvent(new Event('stop-scroll'));
      return overflowBig.classList.remove('hidden');
    }
    return;
  }
  if (closeBig) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflowBig.classList.add('hidden');
  }
  if (evt.target === overflowBig) {
    window.dispatchEvent(new Event('start-scroll'));
    return overflowBig.classList.add('hidden');
  }
});

const loader = document.querySelector('.loader-wrap');
const tlHero = gsap.timeline();
document.addEventListener('DOMContentLoaded', () => {
  window.onload = function() {
    window.setTimeout(() => {
      loader.classList.add('loaded');

      tlHero
        .from('.hero-title__wrap *', {
          opacity: 0,
          yPercent: 20,
          stagger: 0.05,
        })
        .from(
          '.hero-content .general-btn',
          {
            opacity: 0,
            x: 100,
            duration: 0.5,
          },
          '<',
        )
        .from(
          '.info-wrap *',
          {
            opacity: 0,
            xPercent: 20,
            stagger: 0.05,
          },
          '<',
        )
        .from(
          '.header-bg',
          {
            yPercent: -100,
          },
          '<+=0.2',
        );
    }, 1200);
  };
});

function menuAnimation() {
  const menuIsOpen = document.querySelector('.header-bg').classList.contains('menu-is-open');
  const tl = gsap.timeline();
  if (window.innerWidth < 768) {
    if (menuIsOpen) {
      // Forward animation when menuIsOpen is true
      tl.fromTo(
        '.menu-item',
        { opacity: 0, xPercent: -50 },
        { opacity: 1, xPercent: 0, stagger: 0.1, duration: 0.8 },
      )
        .fromTo(
          '.menu-overlay .header-phone',
          { opacity: 0, xPercent: -30 },
          { opacity: 1, xPercent: 0, stagger: 0.1, duration: 0.4 },
          '<=0.8',
        )
        .fromTo(
          '.menu-overlay .call-us-btn',
          { opacity: 0, xPercent: 30 },
          { opacity: 1, xPercent: 0, stagger: 0.1, duration: 0.4 },
          '<',
        );
    } else {
      // Reverse animation when menuIsOpen is false
      tl.fromTo(
        ' .menu-item',
        { opacity: 1, xPercent: 0 },
        { opacity: 0, xPercent: -30, stagger: 0.1, duration: 0.4 },
      )
        .fromTo(
          '.menu-overlay .header-phone',
          { opacity: 1, xPercent: 0 },
          { opacity: 0, xPercent: -30, stagger: 0.1, duration: 0.4 },
          '<',
        )
        .fromTo(
          '.menu-overlay  .call-us-btn',
          { opacity: 1, xPercent: 0 },
          { opacity: 0, xPercent: 50, stagger: 0.1, duration: 0.4 },
          '<',
        );
    }
  } else {
    if (menuIsOpen) {
      // Forward animation when menuIsOpen is true
      tl.fromTo(
        '.right-block .menu-item',
        { opacity: 0, xPercent: 50 },
        { opacity: 1, xPercent: 0, stagger: 0.1, duration: 0.8 },
        '<',
      ).fromTo(
        '.left-block .menu-item',
        { opacity: 0, xPercent: -50 },
        { opacity: 1, xPercent: 0, stagger: 0.1, duration: 0.8 },
        '<',
      );
    } else {
      // Reverse animation when menuIsOpen is false
      tl.fromTo(
        '.left-block .menu-item',
        { opacity: 1, xPercent: 0 },
        { opacity: 0, xPercent: -50, stagger: 0.1, duration: 0.4 },
        '<',
      ).fromTo(
        '.right-block .menu-item',
        { opacity: 1, xPercent: 0 },
        { opacity: 0, xPercent: 50, stagger: 0.1, duration: 0.4 },
        '<',
      );
    }
  }
}
