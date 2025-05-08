import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import { useState } from '../modules/helpers/helpers.js';
import { newsCard } from '../modules/news/newsCard';
import requestData from '../modules/api.js';
import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

// const loadMoreBtn = document.querySelector('[data-more-news]');

// const [news, setNews, useNewsEffect] = useState({
//   pending: false,
//   type: 'all',
//   container: document.querySelector('.news__container'),
//   data: [],
//   part: 1,
//   step: 4,
// });

// useNewsEffect(({ data, container,step,part, type }) => {


//   const dataFiltredByType = type==="all"? data : data.filter(el =>  el.type === type)
//   console.log(dataFiltredByType);

//   if (dataFiltredByType.length <= step * part) {
//     loadMoreBtn.style.display = 'none';
//   } else {
//     loadMoreBtn.style.display = 'block';
//   }
//   const newData = dataFiltredByType
//     .map(el => {
//       return newsCard(el);
//     })
//     .slice(0, step * part)
//     .join('');
//   container.innerHTML = newData;
  
// });

// useNewsEffect(({ pending, container }) => {
//   gsap.to(container, {
//     autoAlpha: pending ? 0.5 : 1,
//   });

//   pending ? container.classList.add('loading') : container.classList.remove('loading');
// });



// requestData("news", {type:"all"}).then(res => {
//   console.log(res);
//   setNews({
//     ...news(),
//     data: res.data.result,
//   });
// });


// if (loadMoreBtn) {
//   loadMoreBtn.addEventListener('click', function() {
//     setNews({
//       ...news(),
//       part: news().part + 1,
//       pending: true,
//     });
//     setTimeout(() => {
//       setNews({
//         ...news(),
//         pending: false,
//       });
//     }, 500);
//   });
// }
// const filterBtnWraper = document.querySelector(".filter__list")
// filterBtnWraper.addEventListener('click', evt => {
//   const target = evt.target.closest('[data-news-type-button]');
  
//   filterBtnWraper.querySelectorAll('[data-news-type-button]').forEach(el => {
//     if (el === target) { 
//       const type = target.getAttribute('data-news-type-button');
      
//       el.classList.add('active');
      
//         setNews({
//           ...news(),
//           type,
//           pending: true,
//           part: 1,
//         });
//         setTimeout(()=> {
//           setNews({
//             ...news(),
            
//             pending: false,
//           });
//         }, 500)
//     }
//     if (el !== target) el.classList.remove('active');
//   });
// });
