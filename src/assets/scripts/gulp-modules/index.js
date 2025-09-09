import Swiper, { Navigation, Scrollbar, Grid } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
// import googleMap from '../modules/map/map';
import { initSmoothScrolling } from '../modules/scroll/leniscroll';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import axios from 'axios';
import '../animations';
import '../section-construction';
initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase, MorphSVGPlugin);
// googleMap();

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
  speed: 600,

  slidesPerView: 1.3,
  spaceBetween: 16,
  navigation: {
    prevEl: '[data-planning-btn-prev]',
    nextEl: '[data-planning-btn-next]',
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
  speed: 600,
  slidesPerView: 1.2,
  spaceBetween: 20,

  breakpoints: {
    768: {
      slidesPerView: 2.4,
    },
    1366: {
      slidesPerView: 4.5,
    },
  },
});
if (window.innerWidth >= 768) {
  const startPos = 'top +=68px';
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
      },
    },
  });
}
const swiperAdvantagesCtrls = new Swiper('.swiper-advantages-ctrls', {
  speed: 600,
  modules: [Scrollbar],
  slidesPerView: 'auto',
  spaceBetween: 24,

  breakpoints: {
    768: {
      spaceBetween: 32,
    },
  },
  scrollbar: {
    el: '.swiper-advantages-ctrls .swiper-scrollbar',
    draggable: true,
  },
});
const tlColorBG = gsap.timeline({
  scrollTrigger: {
    trigger: '.advantages',
    start: 'top center',
    end: 'bottom center', // коли верх секції доходить до центру екрану
    toggleActions: 'play reverse play reverse',
  },
});
tlColorBG
  .to('.page__content', {
    backgroundColor: '#3F4CAA',
    ease: 'none',
  })
  .fromTo(
    '.advantages__title',
    { color: '#292925' },
    {
      color: '#F9F2EB',
    },
    '<',
  );

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.swiper-advantages-ctrls .swiper-slide');
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
        duration: 0.2,
        onComplete: () => {
          gsap.set(currentPanel, { display: 'none' });

          // Показ нової панелі
          gsap.set(targetPanel, { display: 'flex' });
          gsap.to(targetPanel, { autoAlpha: 1, duration: 0.2 });

          // Анімація кожного .panel-item по черзі
          const items = targetPanel.querySelectorAll('.panel-item');
          gsap.fromTo(
            items,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.3,
              stagger: 0.1,
              ease: 'power2.out',
            },
          );

          currentPanel = targetPanel;
        },
      });
    });
  });
});

export const swiperMap = new Swiper('.swiper-map', {
  modules: [Scrollbar],
  speed: 600,

  slidesPerView: 'auto',
  spaceBetween: 8,

  scrollbar: {
    el: '.swiper-map .swiper-scrollbar',
    draggable: true,
  },
});
const swiperSafety = new Swiper('.swiper-safety', {
  speed: 600,
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 16,
  navigation: {
    prevEl: '[data-safety-btn-prev]',
    nextEl: '[data-safety-btn-next]',
  },
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  //   draggable: true,
  // },
});

let swiperRielInitialized = false;
let swiperRiel;
document.querySelector('.swiper-slide[data-id="riel"]')?.addEventListener('click', () => {
  if (!swiperRielInitialized && window.innerWidth < 768) {
    setTimeout(() => {
      swiperRiel = new Swiper('.swiper-riel', {
        modules: [Scrollbar],
        loop: false,
        centeredSlides: true,
        slidesPerView: 1.8,
        spaceBetween: 16,
        on: {
          init: function() {
            animateToCircle(this.slides[this.activeIndex]);
          },
          slideChange: function() {
            animateToCircle(this.slides[this.activeIndex]);
          },
        },
        scrollbar: {
          el: '.swiper-riel .swiper-scrollbar',
          draggable: true,
        },
      });

      swiperRielInitialized = true;
    }, 500);
  } else if (window.innerWidth > 768) {
    document.querySelectorAll('.riel-item').forEach((item, index) => {
      const delay = 500 + index * 200;
      console.log(item, delay);
      setTimeout(() => {
        animateToCircle(item);
      }, delay);
    });
  }
});

function animateToCircle(slideEl) {
  const svg = slideEl.querySelector('.riel-svg');
  if (!svg) return;

  const star = svg.querySelector('.shape-star');
  const circle = svg.querySelector('.shape-circle');

  if (!star || !circle) return;
  const text = slideEl.querySelector('p');
  const circlePath = circle.getAttribute('d');
  const tl = gsap.timeline();
  tl.to(star, {
    delay: 0.3,
    duration: 0.6,
    morphSVG: circlePath,
    ease: 'power2.inOut',
  }).to(text, { opacity: 1, scale: 1 }, '<');
}

gsap.to('.filler img', {
  yPercent: 20, // зображення трохи рухається вгору
  ease: 'none',
  // scale: 1.4,
  scrollTrigger: {
    trigger: '.filler',
    start: 'top bottom', // коли секція входить в екран
    end: 'bottom top', // коли секція виходить
    scrub: true, // робить анімацію синхронною зі скролом
    // markers: true,
  },
});

//gallery
let galleryImages = {}; // Буде наповнений з JSON

// Ініціалізація Swiper галереї
const swiperGallery = new Swiper('.swiper-gallery', {
  modules: [Navigation],
  speed: 600,
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    prevEl: '[data-gallery-btn-prev]',
    nextEl: '[data-gallery-btn-next]',
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
    },
    1366: {
      slidesPerView: 4,
    },
  },

  on: {
    init(swiper) {
      handleNavVisibility(swiper);
    },
    resize(swiper) {
      handleNavVisibility(swiper);
    },
  },
});

function handleNavVisibility(swiper) {
  const btnsWrap = document.querySelector('.gallery .swiper-btns-wrap');
  if (!btnsWrap) return;

  // Підрахунок лише реальних слайдів (без дублікатів)
  const realSlideCount = swiper.slides.length - swiper.loopedSlides * 2 || swiper.slides.length;

  const currentSlidesPerView = swiper.params.slidesPerView;

  // Якщо slidesPerView — 'auto', треба брати swiper.slidesPerViewDynamic()
  const slidesToCheck =
    currentSlidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : currentSlidesPerView;

  if (realSlideCount <= slidesToCheck) {
    btnsWrap.classList.add('hidden');
  } else {
    btnsWrap.classList.remove('hidden');
  }
}

// Контрл-свайпер
const swiperGalleryCtrls = new Swiper('.swiper-gallery-ctrls', {
  modules: [Scrollbar],
  slidesPerView: 'auto',
  spaceBetween: 32,
  freeMode: true,
  watchSlidesProgress: true,
  scrollbar: {
    el: '.swiper-gallery-ctrls .swiper-scrollbar',
    draggable: true,
  },
});

// Отримання зображень з бекенду
async function fetchGalleryImages() {
  const formData = new FormData();
  formData.append('action', 'gallery');

  try {
    const response = await axios.post('/wp-admin/admin-ajax.php', formData);
    const galleries = response.data.galleies || [];

    // Перетворити у формат { territory: [img1, img2], ... }
    galleries.forEach(group => {
      const categoryName = group.name;
      const imageUrls = group.gallery.map(item => item.img);
      galleryImages[categoryName] = imageUrls;
    });

    loadGallery('territory'); // Початкове завантаження
  } catch (error) {
    console.error('Помилка при завантаженні галереї:', error);
  }
}

// Відображення слайдів за категорією
function loadGallery(category) {
  const wrapper = document.querySelector('.swiper-gallery .swiper-wrapper');
  wrapper.innerHTML = '';

  if (galleryImages[category]) {
    galleryImages[category].forEach((src, index) => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      gsap.from(slide, { opacity: 0, yPercent: 20, delay: index * 0.05 });

      const img = document.createElement('img');
      img.src = src;
      img.alt = category;

      slide.appendChild(img);
      wrapper.appendChild(slide);
    });

    swiperGallery.update();
    swiperGallery.slideTo(0);
  }
}

// Обробка кліків на контролери
document.querySelectorAll('.swiper-gallery-ctrls .swiper-slide').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.id;

    document.querySelectorAll('.swiper-gallery-ctrls .swiper-slide').forEach(el => {
      el.classList.remove('active-slide');
    });
    btn.classList.add('active-slide');

    loadGallery(category);
  });
});

// Перший запуск
fetchGalleryImages();
//terms
document.addEventListener('DOMContentLoaded', () => {
  const titles = document.querySelectorAll('.terms__title');
  const contents = document.querySelectorAll('.terms__content');

  titles.forEach(title => {
    title.addEventListener('click', () => {
      const targetId = title.dataset.id;

      // Активний заголовок
      titles.forEach(t => t.classList.remove('active'));
      title.classList.add('active');

      // Перемикаємо контент
      contents.forEach(content => {
        const isTarget = content.dataset.terms === targetId;
        content.style.display = isTarget ? 'flex' : 'none';

        if (isTarget) {
          const items = content.querySelectorAll('.terms__item');

          // Початково сховати всі items
          gsap.set(items, { autoAlpha: 0, y: 20 });

          // GSAP: анімація появи з інтервалом
          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.2,
            ease: 'power2.out',
          });
        }
      });
    });
  });

  // Початковий показ першого блоку (якщо активний заголовок заданий)
  const activeTitle = document.querySelector('.terms__title.active');
  if (activeTitle) {
    activeTitle.click();
  }
});

//documents

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.documents__item');
  const moreBtn = document.querySelector('.more-btn');
  const maxVisible = 3;

  if (window.innerWidth <= 768 && moreBtn) {
    // Початково показати перші 3, решта сховати
    items.forEach((item, index) => {
      if (index >= maxVisible) item.classList.add('hidden');
    });

    let isExpanded = false;

    moreBtn.addEventListener('click', () => {
      const hiddenItems = document.querySelectorAll('.documents__item');

      if (!isExpanded) {
        // Показати решту
        hiddenItems.forEach((item, i) => {
          if (i >= maxVisible) {
            setTimeout(() => {
              item.classList.remove('hidden');
              item.classList.add('visible');
            }, (i - maxVisible) * 100);
          }
        });
        moreBtn.classList.add('active');
        isExpanded = true;
      } else {
        // Сховати назад
        hiddenItems.forEach((item, i) => {
          if (i >= maxVisible) {
            setTimeout(() => {
              item.classList.remove('visible');
              item.classList.add('hidden');
            }, (i - maxVisible) * 100);
          }
        });
        moreBtn.classList.remove('active');
        isExpanded = false;
      }
    });
  }

  const groups = [
    { wrapperSelector: '[data-field-rooms]', hiddenInputName: 'rooms' },
    { wrapperSelector: '[data-field-features]', hiddenInputName: 'features' },
  ];

  groups.forEach(group => {
    const wrapper = document.querySelector(group.wrapperSelector);
    if (!wrapper) return;

    const checkboxes = wrapper.querySelectorAll('input[type="checkbox"]');
    const hiddenInput = document.querySelector(`input[name="${group.hiddenInputName}"]`);

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const selectedValues = Array.from(checkboxes)
          .filter(cb => cb.checked)
          .map(cb => cb.value);
        hiddenInput.value = selectedValues.join(', ');
      });
    });
  });

  const radioButtons = document.querySelectorAll('input[type="radio"][name="option"]');
  const hiddenInput = document.querySelector('input[type="hidden"][name="for-whom"]');

  if (!hiddenInput || radioButtons.length === 0) return;

  // Записати значення вибраного за замовчуванням
  const checked = document.querySelector('input[type="radio"][name="option"]:checked');
  if (checked) {
    hiddenInput.value = checked.value;
  }

  // Оновлювати при зміні
  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        hiddenInput.value = radio.value;
      }
    });
  });
});

//progress
// let progressData = {
//   "1": {
//     "updateDate": "01.06.2025",
//     "finishDate": "01.12.2025",
//     "months": {

//       "2025-april": {
//         "gallery": ["/wp-content/themes/3d/assets/images/flats/flat1.jpg", "/wp-content/themes/3d/assets/images/flats/flat2.jpg"],
//         "progress": [
//           { "title": "Фундамент", "value": 100 },
//           { "title": "Вікна", "value": 40 },
//           { "title": "Каркас (підземна частина)", "value": 100 },
//           { "title": "Радіатори", "value": 10 },
//           { "title": "Каркас (наземна частина)", "value": 100 },
//           { "title": "Двері", "value": 40 },
//           { "title": "Зовнішні стіни та перегородки", "value": 100 },
//           { "title": "Ліфти", "value": 40 }
//         ]
//       },
//       "2025-march": {
//         "gallery": ["/wp-content/themes/3d/assets/images/flats/flat1.jpg","/wp-content/themes/3d/assets/images/flats/flat2.jpg","/wp-content/themes/3d/assets/images/flats/flat3.jpg"],
//         "progress": [
//           { "title": "Фундамент", "value": 95 },
//           { "title": "Вікна", "value": 20 }
//         ]
//       }
//     }
//   },
//   "2": {
//     "updateDate": "01.03.2025",
//     "finishDate": "01.12.2027",
//     "months": {
//       "2025-april": {
//         "gallery": ["/wp-content/themes/3d/assets/images/flats/flat3.jpg"],
//         "progress": [
//           { "title": "Фундамент", "value": 80 },
//           { "title": "Вікна", "value": 10 }
//         ]
//       }
//     }
//   }
// };
// progressData = {
//   "1": {
//     updateDate: "10.06.2025",
//     finishDate: "12.12.2025",
//     progress: [
//       { "title": "Фундамент", "value": 100 },
//           { "title": "Вікна", "value": 40 },
//           { "title": "Каркас (підземна частина)", "value": 100 },
//           { "title": "Радіатори", "value": 10 },
//           { "title": "Каркас (наземна частина)", "value": 100 },
//           { "title": "Двері", "value": 40 },
//           { "title": "Зовнішні стіни та перегородки", "value": 100 },
//           { "title": "Ліфти", "value": 40 }
//     ],
//     months: {
//       "2025-april": {
//         gallery: ["/assets/images/flats/flat1.jpg", "/assets/images/flats/flat2.jpg"]
//       },
//       "2025-march": {
//         gallery: ["/assets/images/flats/flat2.jpg", "/assets/images/flats/flat3.jpg"]
//       }
//     }
//   },
//   "2": {
//     updateDate: "01.05.2025",
//     finishDate: "30.11.2025",
//     progress: [
//       { title: "Фундамент", value: 100 },
//       { title: "Стіни", value: 90 },
//       { title: "Оздоблення", value: 30 },
//     ],
//     months: {
//       "2025-may": {
//         gallery: ["/assets/images/flats/flat3.jpg", "/assets/images/flats/flat2.jpg"]
//       },
//       "2025-april": {
//         gallery: ["/assets/images/flats/flat1.jpg", "/assets/images/flats/flat3.jpg"]
//       }
//     }
//   }
// };
// let currentQueueId = null;
// let currentMonthKey = null;

// // Ініціалізація прогрес-блоку
// // Розкоментувати коли буде бек
// // async function fetchProgressData() {
// //   const formData = new FormData();
// //   formData.append('action', 'progress_data');

// //   try {
// //     const response = await axios.post('/wp-admin/admin-ajax.php', formData);
// //     const data = response.data || {};

// //     progressData = data;

// //     const firstQueue = Object.keys(progressData)[0];
// //     if (firstQueue) loadQueue(firstQueue);
// //     renderQueues(Object.keys(progressData));
// //   } catch (error) {
// //     console.error('Помилка при завантаженні прогрес-даних:', error);
// //   }
// // }
// const firstQueue = Object.keys(progressData)[0];
// if (firstQueue) loadQueue(firstQueue);
// renderQueues(Object.keys(progressData));

// function renderQueues(queueKeys) {
//   const wrapper = document.querySelector(".swiper-progress-queue-ctrls .swiper-wrapper");
//   wrapper.innerHTML = "";

//   queueKeys.forEach((queueKey, index) => {
//     const slide = document.createElement("div");
//     slide.className = "swiper-slide";
//     if (index === 0) slide.classList.add("active-slide");
//     slide.dataset.queue = queueKey;
//     slide.textContent = `Черга ${queueKey}`;

//     slide.addEventListener("click", () => {
//       document.querySelectorAll(".swiper-progress-queue-ctrls .swiper-slide").forEach(s => s.classList.remove("active-slide"));
//       slide.classList.add("active-slide");
//       loadQueue(queueKey);
//     });

//     wrapper.appendChild(slide);
//   });

//   if (window.queueSwiper) window.queueSwiper.destroy();
//   window.queueSwiper = new Swiper(".swiper-progress-queue-ctrls", {
//     modules: [Scrollbar],
//     slidesPerView: 'auto',
//     spaceBetween: 32,
//     freeMode: true,
//     watchSlidesProgress: true,
//     scrollbar: {
//       el: '.swiper-progress-queue-ctrls .swiper-scrollbar',
//       draggable: true,
//     },
//   });
// }

// function loadQueue(queueKey) {
//   const queue = progressData[queueKey];
//   if (!queue) return;

//   const dateEls = document.querySelectorAll('.queue-dates .date-value');
//   dateEls[0].textContent = queue.updateDate;
//   dateEls[1].textContent = queue.finishDate;

//   renderMonthTabs(queue.months, queueKey);

//   const monthsSorted = Object.keys(queue.months).sort((a, b) => new Date(b) - new Date(a));
//   const latestMonthKey = monthsSorted[0];
//   loadMonth(queueKey, latestMonthKey);
//   renderPercents(queue.progress);
// }

// function loadMonth(queueKey, monthKey) {
//   const queue = progressData[queueKey];
//   const monthData = queue.months[monthKey];
//   if (!monthData) return;

//   renderGallery(monthData.gallery);
//    // Прогрес тепер належить черзі
// }

// function renderMonthTabs(months, queueKey) {
//   const wrapper = document.querySelector(".swiper-progress-month-ctrls .swiper-wrapper");
//   wrapper.innerHTML = "";

//   const monthKeys = Object.keys(months).sort((a, b) => new Date(b) - new Date(a));

//   monthKeys.forEach((key, index) => {
//     const [year, month] = key.split('-');
//     const monthLabel = getUkrainianMonthLabel(month);

//     const slide = document.createElement("div");
//     slide.className = "swiper-slide";
//     if (index === 0) slide.classList.add("active-slide");
//     slide.dataset.month = key;
//     slide.textContent = `${monthLabel} ${year}`;

//     slide.addEventListener("click", () => {
//       document.querySelectorAll(".swiper-progress-month-ctrls .swiper-slide").forEach(s => s.classList.remove("active-slide"));
//       slide.classList.add("active-slide");
//       loadMonth(queueKey, key);
//     });

//     wrapper.appendChild(slide);
//   });

//   if (window.monthSwiper) window.monthSwiper.destroy();
//   window.monthSwiper = new Swiper(".swiper-progress-month-ctrls", {
//     modules: [Scrollbar],
//     slidesPerView: 'auto',
//     spaceBetween: 32,
//     freeMode: true,
//     watchSlidesProgress: true,
//     scrollbar: {
//       el: '.swiper-progress-month-ctrls .swiper-scrollbar',
//       draggable: true,
//     },
//   });
// }

// function getUkrainianMonthLabel(month) {
//   const months = {
//     january: "Січень", february: "Лютий", march: "Березень", april: "Квітень",
//     may: "Травень", june: "Червень", july: "Липень", august: "Серпень",
//     september: "Вересень", october: "Жовтень", november: "Листопад", december: "Грудень"
//   };
//   return months[month.toLowerCase()] || month;
// }

// function renderGallery(images) {
//   const wrapper = document.querySelector(".swiper-progress-gallery .swiper-wrapper");
//   wrapper.innerHTML = "";

//   images.forEach(imgUrl => {
//     const slide = document.createElement("div");
//     slide.className = "swiper-slide";

//     const img = document.createElement("img");
//     img.src = imgUrl;
//     img.alt = "Фото ходу будівництва";
//     img.style.opacity = 0;
//     img.style.transform = "translateY(30px)";

//     slide.appendChild(img);
//     wrapper.appendChild(slide);
//   });

//   if (window.gallerySwiper) window.gallerySwiper.destroy();
//   window.gallerySwiper = new Swiper(".swiper-progress-gallery", {
//     modules: [Navigation],
//     speed: 600,
//     slidesPerView: 1,
//     spaceBetween: 20,
//     breakpoints: {
//       768: {
//         slidesPerView: 3,
//       },
//       1366: {
//         slidesPerView: 4,
//       },
//     },
//     navigation: {
//       nextEl: "[data-progress-gallery-btn-next]",
//       prevEl: "[data-progress-gallery-btn-prev]",
//     },
//   });

//   animateGalleryImages();
// }

// function animateGalleryImages() {
//   const images = document.querySelectorAll(".swiper-progress-gallery .swiper-slide img");

//   gsap.fromTo(images,
//     {
//       opacity: 0,
//       y: 30
//     },
//     {
//       opacity: 1,
//       y: 0,
//       duration: 0.6,
//       ease: "power2.out",
//       stagger: 0.1
//     }
//   );
// }

// function renderPercents(progressList) {
//   const wrapper = document.querySelector(".swiper-progress-percents .swiper-wrapper");
//   wrapper.innerHTML = "";

//   progressList.forEach(item => {
//     const slide = document.createElement("div");
//     slide.className = "swiper-slide";

//     const percentId = `progress-${Math.random().toString(36).substr(2, 9)}`;

//     slide.innerHTML = `
//       <h3 class="percents-title" data-percent-title="${item.title}">${item.title}</h3>
//       <p class="percent-value" id="${percentId}">0%</p>
//       <div class="percent-line" data-percent="${item.value}%">
//         <div class="percent-fill" style="width: 0%;"></div>
//       </div>
//     `;

//     wrapper.appendChild(slide);

//     requestAnimationFrame(() => {
//       const fill = slide.querySelector(".percent-fill");
//       const valueEl = document.getElementById(percentId);

//       if (!fill || !valueEl) return;

//       const targetPercent = parseInt(item.value, 10);

//       gsap.to(fill, {
//         width: `${targetPercent}%`,
//         duration: 1,
//         ease: "power2.out"
//       });

//       const counter = { val: 0 };
//       gsap.to(counter, {
//         val: targetPercent,
//         duration: 1.2,
//         ease: "power2.out",
//         onUpdate: () => {
//           if (valueEl) {
//             valueEl.textContent = `${Math.round(counter.val)}%`;
//           }
//         }
//       });
//     });
//   });

//   if (window.percentsSwiper) {
//     window.percentsSwiper.destroy(true, true);
//   }

//   window.percentsSwiper = new Swiper(".swiper-progress-percents", {
//     modules: [Navigation, Grid],
//     speed: 600,
//     navigation: {
//       nextEl: "[data-percents-btn-next]",
//       prevEl: "[data-percents-btn-prev]",
//     },
//     grid: {
//       rows: 2,
//       fill: "row"
//     },
//     slidesPerView: 2,
//     spaceBetween: 16,
//     breakpoints: {
//       768: {
//         spaceBetween: 20,
//         slidesPerView: 4,
//       },
//       1024: {
//         slidesPerView: 4,
//       }
//     }
//   });
// }
