import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
// import googleMap from '../modules/map/map';
import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

document.addEventListener('DOMContentLoaded', () => {
  initGallerySwiper();
  initAnimations();
});

function initGallerySwiper() {
  new Swiper('.gallery-swiper', {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.gallery-next-btn',
      prevEl: '.gallery-prev-btn',
    },
  });
}

function initAnimations() {
  //hero
  const heroTl = gsap.timeline({ delay: 1 });

  heroTl
    .fromTo(
      '.top_section__right',
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'power2.out' },
    )
    .fromTo(
      '.figure',
      { xPercent: 100, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '<',
    );

  //concept
  gsap.fromTo(
    '.concept-block',
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: '.concept-block',
        start: 'top 95%',
        end: 'bottom bottom',
        toggleActions: 'play none none none',
        fastScrollEnd: true,
        once: true,
      },
    },
  );

  //summary decor animations
  gsap.fromTo(
    '.summary-decor-1, .summary-decor-2',
    {
      x: (index, target) => (target.classList.contains('summary-decor-1') ? -100 : 100),
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.summary-section',
        start: 'top 60%',
        fastScrollEnd: true,
        once: true,
      },
    },
  );

  //summary image parallax
  gsap.to('.summary-image ', {
    y: -200,
    ease: 'none',
    scrollTrigger: {
      trigger: '.summary-content-block',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });

  // advantages
  document.querySelectorAll('.advantages-item').forEach(block => {
    gsap.fromTo(
      block,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          toggleActions: 'play none none none',
          fastScrollEnd: true,
          once: true,
        },
      },
    );
  });

  //gallery
  gsap.fromTo(
    '.gallery-images-block',
    { y: 150, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: '.gallery-section',
        start: 'top 50%',
        toggleActions: 'play none none none',
        fastScrollEnd: true,
        once: true,
      },
    },
  );

  //about
  gsap.fromTo(
    '.about-decor-img',
    { yPercent: 40, opacity: 0 },
    {
      duration: 1,
      yPercent: 0,
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 50%',
        end: 'bottom bottom',
        toggleActions: 'play none none none',
        once: true,
        fastScrollEnd: true,
      },
    },
  );
}
