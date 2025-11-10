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
