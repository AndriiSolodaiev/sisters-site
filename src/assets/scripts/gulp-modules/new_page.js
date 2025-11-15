import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
// import googleMap from '../modules/map/map';
import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

document.addEventListener('DOMContentLoaded', () => {
  const gallerySwiper = new Swiper('.gallery-swiper', {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.gallery-next-btn',
      prevEl: '.gallery-prev-btn',
    },
  });
});

document.addEventListener('DOMContentLoaded', function() {
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
});
