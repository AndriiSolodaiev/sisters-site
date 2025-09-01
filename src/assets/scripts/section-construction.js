import Swiper, { Navigation, Scrollbar } from 'swiper';
import { pad, useState } from './modules/helpers/helpers';

Swiper.use([Navigation, Scrollbar]);

function constructionSliderHandler() {
  return new Swiper('[data-construction-slider]', {
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: '[data-construction-slider-next]',
      prevEl: '[data-construction-slider-prev]',
    },
  });
}

const constructionSlider = constructionSliderHandler();

function constructionFilterHandler(slider) {
  const [constructionFilter, setConstructionFilter, subscribeConstructionFilter] = useState({});

  const filters = document.querySelectorAll('[data-construction-filter]');

  // 1. Отримуємо дефолтні значення фільтрів
  const initialState = {};
  filters.forEach(filter => {
    const key = filter.dataset.constructionFilter;

    const options = filter.querySelectorAll('option');
    const lastOption = options[options.length - 1];
    const lastValue = lastOption.value;

    filter.value = lastValue; // встановлюємо в UI останнє значення
    initialState[key] = lastValue;

    console.log(`Фільтр "${key}" ініціалізовано значенням: ${lastValue}`);
  });

  // 2. Встановлюємо початковий стан фільтрів
  setConstructionFilter(initialState);

  //  Вручну тригеримо фільтрацію одразу після ініціалізації
  applyFilter(initialState);

  // 3. Вішаємо слухачі
  filters.forEach(filter => {
    filter.addEventListener('change', function(evt) {
      const key = evt.target.dataset.constructionFilter;
      const value = evt.target.value;
      const newState = {
        ...constructionFilter(),
        [key]: value,
      };
      setConstructionFilter(newState);
      applyFilter(newState); // 🔥 застосування фільтра при зміні
    });
  });

  // 4. Функція фільтрації
  function applyFilter(value) {
    const cards = document.querySelectorAll('[data-construction-card]');
    cards.forEach(card => {
      let isShow = true;
      Object.entries(value).forEach(([key, val]) => {
        const cardValue = card.dataset[key];
        if (cardValue != val) {
          isShow = false;
        }
      });
      card.style.display = isShow ? '' : 'none';
    });

    // Прокрутка до початку та оновлення слайдера
    slider.slideTo(0);
    slider.update();
  }
}

constructionFilterHandler(constructionSlider);
