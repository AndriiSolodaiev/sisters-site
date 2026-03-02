import Swiper, { Navigation, Scrollbar } from 'swiper';
import { pad, useState } from './modules/helpers/helpers';

Swiper.use([Navigation, Scrollbar]);

function constructionSliderHandler() {
  return new Swiper('[data-construction-slider]', {
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      1300: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
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
  const monthFilter = document.querySelector('[data-construction-filter="month"]');
  const yearFilter = document.querySelector('[data-construction-filter="year"]');
  const allFilters = document.querySelectorAll('[data-construction-filter]');

  if (!monthFilter || !yearFilter) return;

  const [constructionFilter, setConstructionFilter] = useState({});

  if (!window._allMonthOptions) {
    window._allMonthOptions = Array.from(monthFilter.querySelectorAll('option'));
  }
  const allMonthOptions = window._allMonthOptions;

  function updateMonthSelect(selectedYear, currentMonthValue) {
    const filtered = allMonthOptions.filter(opt => opt.dataset.year === String(selectedYear));
    monthFilter.innerHTML = filtered.map(opt => opt.outerHTML).join('');
    const exists = filtered.some(opt => opt.value === String(currentMonthValue));
    const finalMonth = exists ? currentMonthValue : (filtered.length > 0 ? filtered[0].value : '');
    monthFilter.value = finalMonth;
    return finalMonth;
  }

  function applyFilter(state) {
    const cards = document.querySelectorAll('[data-construction-card]');
    cards.forEach(card => {
      const matchYear = String(card.dataset.year) === String(state.year);
      const matchMonth = String(card.dataset.month) === String(state.month);
      if (matchYear && matchMonth) {
        card.style.display = '';
        card.classList.add('swiper-slide');
      } else {
        card.style.display = 'none';
        card.classList.remove('swiper-slide');
      }
    });
    if (slider) {
      slider.update();
      slider.slideTo(0, 0);
    }
  }

  const years = Array.from(yearFilter.querySelectorAll('option')).map(opt => parseInt(opt.value));
  const maxYear = Math.max(...years);
  const monthsForMaxYear = allMonthOptions
    .filter(opt => opt.dataset.year === String(maxYear))
    .map(opt => parseInt(opt.value));
  const maxMonth = Math.max(...monthsForMaxYear);

  yearFilter.value = String(maxYear);
  const startMonth = updateMonthSelect(String(maxYear), String(maxMonth));

  const initialState = {
    year: String(maxYear),
    month: startMonth
  };

  setConstructionFilter(initialState);
  applyFilter(initialState);

  allFilters.forEach(filter => {
    filter.addEventListener('change', handleFilterChange);
  });

  function handleFilterChange(evt) {
    const key = evt.target.dataset.constructionFilter;
    const value = evt.target.value;
    let currentState = constructionFilter();
    if (key === 'year') {
      const validMonth = updateMonthSelect(value, currentState.month);
      const newState = { ...currentState, year: value, month: validMonth };
      setConstructionFilter(newState);
      applyFilter(newState);
    } else {
      const newState = { ...currentState, [key]: value };
      setConstructionFilter(newState);
      applyFilter(newState);
    }
  }
}

constructionFilterHandler(constructionSlider);