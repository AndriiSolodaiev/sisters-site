import Swiper, { Navigation, Scrollbar } from 'swiper';
import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';
// import googleMap from '../modules/map/map';
import { initSmoothScrolling } from '../modules/scroll/leniscroll';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import axios from 'axios';
import '../animations';
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
      slidesPerView: 3.4,
    },
    1366: {
      slidesPerView: 4.5,
    },
  },
});
if(window.innerWidth > 768 ){
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
const tlColorBG = gsap.timeline({scrollTrigger: {
  trigger: '.advantages',
  start: 'top center',
  end: 'bottom center', // коли верх секції доходить до центру екрану
  toggleActions: 'play reverse play reverse',
}})
tlColorBG.to('.page__content', {
  backgroundColor: '#3F4CAA',
  ease: 'none', 
}).fromTo(".advantages__title", {color:"#292925" }, {
  color: "#F9F2EB"
}, "<");

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
  const slidesToCheck = currentSlidesPerView === 'auto'
    ? swiper.slidesPerViewDynamic()
    : currentSlidesPerView;

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
        { wrapperSelector: '[data-field-features]', hiddenInputName: 'features' }
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