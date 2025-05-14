import { popupFactory } from './popupFactory';

export const successPopup = popupFactory(document.querySelector('.thank-you-popup'));

const closeAllBtnRef = document.querySelector('[data-ty-close]');
const overlay = document.querySelector('.overlay')
overlay.addEventListener("click", function (evt) {
  
  if(evt.target === overlay) {
    successPopup.close();
  }
})
closeAllBtnRef.addEventListener('click', () => {
  successPopup.close();
});
