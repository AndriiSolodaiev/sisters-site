import { initSmoothScrolling } from '../modules/scroll/leniscroll';
import Swiper from 'swiper';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
initSmoothScrolling();

// const swiper = new Swiper('.swiper-single-news', {
//   modules: [Navigation],
//   speed: 1000,
//   spaceBetween: 20,
//   slidesPerView: 1,
//   // autoHeight: true,
//   navigation: {
//     prevEl: '.swiper-news-button-prev',
//     nextEl: '.swiper-news-button-next',
//   },
// });
 
// document.querySelector(".single-news__content-wrap").querySelectorAll('*').forEach(el => el.classList.add('dont-reset-me'))