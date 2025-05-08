import Swiper, { Navigation } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.video');
  const playBtn = document.querySelector('.play-btn');

  if (video && playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playBtn.classList.add('is-hidden'); // сховати кнопку при відтворенні
      } else {
        video.pause();
        playBtn.classList.remove('is-hidden'); // показати кнопку при паузі
      }
    });

    // Показувати кнопку знову після завершення відео
    video.addEventListener('ended', () => {
      playBtn.classList.remove('is-hidden');
    });
  }
});

const swiperPlannings = new Swiper('.swiper-plannings ', {
  modules: [Navigation],
  speed: 1200,

  slidesPerView: 1.3,
  spaceBetween: 16,
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  breakpoints: {
    // 360: {
    //   slidesPerView: 1.1,
    //   spaceBetween: 8,
    // },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1366: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
  },
});

const swiperSlidePhotos = new Swiper('.swiper-slide-photos', {
  speed: 1200,
  slidesPerView: 1.2,
  spaceBetween: 20,

  breakpoints: {
    768: {
      slidesPerView: 3.4,
    },
  },
});
const startPos = window.innerWidth > 768 ? 'top +=20px' : 'top +=68px';
gsap.timeline({
  scrollTrigger: {
    trigger: '.slide-photos',
    pin: '.slide-photos__bg ',
    start: startPos,
    end: 'bottom bottom',
    // markers: true,
    onEnter: () => {},
    onUpdate: self => {
      swiperSlidePhotos.setProgress(self.progress);
      console.log(self.progress);
    },
  },
});

const swiperAdvantagesCtrls = new Swiper('.swiper-advantages-ctrls', {
  speed: 1200,

  slidesPerView: 'auto',
  spaceBetween: 24,

  breakpoints: {
    768: {
      spaceBetween: 32,
    },
  },
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  //   draggable: true,
  // },
});

gsap.to('body', {
  backgroundColor: '#3F4CAA',
  ease: 'none',
  scrollTrigger: {
    trigger: '.advantages',
    start: 'top center', // коли верх секції доходить до центру екрану
    toggleActions: 'play none none reverse',
  },
});

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.swiper-slide');
  const contentPanels = document.querySelectorAll('.advantage-panel');

  let currentPanel = contentPanels[0];

  // Початково сховати всі панелі
  gsap.set(contentPanels, { autoAlpha: 0, display: 'none' });
  gsap.set(currentPanel, { autoAlpha: 1, display: 'flex' });

  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      const id = slide.dataset.id;
      const targetPanel = document.querySelector(`.advantage-panel[data-id="${id}"]`);

      if (!targetPanel || targetPanel === currentPanel) return;

      // Активний слайд
      slides.forEach(s => s.classList.remove('active-slide'));
      slide.classList.add('active-slide');

      // Анімація приховування поточної панелі
      gsap.to(currentPanel, {
        autoAlpha: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(currentPanel, { display: 'none' });

          // Показ нової панелі
          gsap.set(targetPanel, { display: 'flex' });
          gsap.to(targetPanel, { autoAlpha: 1, duration: 0.3 });

          // Анімація кожного .panel-item по черзі
          const items = targetPanel.querySelectorAll('.panel-item');
          gsap.fromTo(
            items,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.2,
              ease: 'power2.out',
            },
          );

          currentPanel = targetPanel;
        },
      });
    });
  });
});

const swiperMap = new Swiper('.swiper-map', {
  speed: 1200,

  slidesPerView: 'auto',
  spaceBetween: 8,

  // scrollbar: {
  //   el: '.swiper-scrollbar',
  //   draggable: true,
  // },
});
