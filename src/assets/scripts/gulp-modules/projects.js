import { gsap, ScrollTrigger, CustomEase } from 'gsap/all';

import { useState } from '../modules/helpers/helpers.js';

import requestData from '../modules/api.js';
import { projectCard } from '../modules/projects/projectCard.js';
import { initSmoothScrolling } from '../modules/scroll/leniscroll';

initSmoothScrolling();
gsap.registerPlugin(ScrollTrigger, CustomEase);

// const loadMoreBtn = document.querySelector('[data-more-projects]');

// const [projects, setProjects, useProjectsEffect] = useState({
//   pending: false,
//   type: 'all',
//   container: document.querySelector('.projects__list '),
//   data: [],
//   part: 1,
//   step: 4,
// });

// useProjectsEffect(({ data, container,step,part, type }) => {
 
//   const dataFiltredByType = type==="all"? data : data.filter(el =>  el.card.type === type)
  
//   if (dataFiltredByType.length <= step * part) {
//     loadMoreBtn.style.display = 'none';
//   } else {
//     loadMoreBtn.style.display = 'block';
//   }
//   const newData = dataFiltredByType
//     .map(el => {
//       return projectCard(el);
//     })
//     .slice(0, step * part)
//     .join('');
//   container.innerHTML = newData;
  
// });

// useProjectsEffect(({ pending, container }) => {
//   gsap.to(container, {
//     autoAlpha: pending ? 0.5 : 1,
//   });

//   pending ? container.classList.add('loading') : container.classList.remove('loading');
// });



// requestData("projects", {type:"all"}).then(res => {
 
//   setProjects({
//     ...projects(),
//     data: res.data.result,
//   });
// });


// if (loadMoreBtn) {
//   loadMoreBtn.addEventListener('click', function() {
//     setProjects({
//       ...projects(),
//       part: projects().part + 1,
//       pending: true,
//     });
//     setTimeout(() => {
//       setProjects({
//         ...projects(),
//         pending: false,
//       });
//     }, 500);
//   });
// }
// const filterBtnWraper = document.querySelector(".projects__filter")
// filterBtnWraper.addEventListener('click', evt => {
//   const target = evt.target.closest('[data-projects-type-button]');
  
//   filterBtnWraper.querySelectorAll('[data-projects-type-button]').forEach(el => {
//     if (el === target) { 
//       const type = target.getAttribute('data-projects-type-button');
//       el.classList.add('active');
      
//         setProjects({
//           ...projects(),
//           type,
//           pending: true,
//           part: 1,
//         });
//         setTimeout(()=> {
//           setProjects({
//             ...projects(),
            
//             pending: false,
//           });
//         }, 500)
//     }
//     if (el !== target) el.classList.remove('active');
//   });
// });