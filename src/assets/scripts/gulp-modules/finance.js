/**
 * Finance Page Module
 * Управління вибором категорій та переключенням контенту
 */

import gsap from 'gsap/all';

class FinanceModule {
  constructor() {
    this.dropdown = document.querySelector('.finance-dropdown');
    this.dropdownTrigger = document.querySelector('.finance-dropdown__trigger');
    this.dropdownOptions = document.querySelectorAll('.finance-dropdown__option');
    this.dropdownItems = document.querySelectorAll('.finance-dropdown__item');
    this.dropdownLabel = document.querySelector('.finance-dropdown__label');
    this.menuItems = document.querySelectorAll('.finance-menu__item');
    this.cards = document.querySelectorAll('.finance-card');
    this.title = document.querySelector('.finance-title');
    this.description = document.querySelector('.finance-description');
    this.currentIndex = 0;
    
    this.svgs = [
       '<svg xmlns="http://www.w3.org/2000/svg" width="37" height="35" viewBox="0 0 37 35" fill="none"><path d="M34.1 18L32.2 17.5C31.4 17.3 30.7 17.2 29.9 17.1C31.2 16.4 32.4 14.8 32.4 12.5C32.4 10.1 30.9 8.5 28.5 8.5C27.2 8.5 26.1 9 25.4 9.9C25.1 9.7 24.8 9.6 24.5 9.5L22.5 9C21.7 8.8 21 8.7 20.2 8.6C21.5 7.9 22.7 6.3 22.7 4C22.7 1.6 21.2 0 18.8 0C16.4 0 14.9 1.6 14.9 4C14.9 6.3 16 7.9 17.4 8.6C16.6 8.7 15.8 8.8 15.1 9L13.1 9.5C12.8 9.6 12.4 9.7 12.1 9.9C11.4 9 10.3 8.5 9 8.5C6.6 8.5 5.1 10.1 5.1 12.5C5.1 14.8 6.2 16.4 7.6 17.1C6.8 17.2 6 17.3 5.3 17.5L2.9 18C1.2 18.4 0 19.9 0 21.7V29.3H9.9V34.4H27.2V29.3H37V21.7C37 20 35.8 18.4 34.1 18ZM28.3 9.8C30 9.8 31.1 10.8 31.1 12.6C31.1 14.4 30 16.4 28.3 16.4C26.7 16.4 25.5 14.4 25.5 12.6C25.6 10.9 26.6 9.8 28.3 9.8ZM15.8 4.2C15.8 2.4 16.8 1.4 18.6 1.4C20.3 1.4 21.4 2.4 21.4 4.2C21.4 6 20.3 8 18.6 8C16.9 8 15.8 6 15.8 4.2ZM13.1 10.8L15.1 10.3C17.4 9.8 19.9 9.8 22.2 10.3L24.2 10.8C24.4 10.9 24.6 10.9 24.8 11C24.6 11.5 24.5 12 24.5 12.6C24.5 14.9 25.6 16.5 27 17.2C26.2 17.3 25.4 17.4 24.7 17.6L22.7 18.1H22.6V17.8C22.6 15.4 21.1 13.8 18.7 13.8C16.3 13.8 14.8 15.4 14.8 17.8V18.1C14.7 18.1 14.7 18.1 14.6 18L12.6 17.5C11.8 17.3 11.1 17.2 10.3 17.1C11.6 16.4 12.8 14.8 12.8 12.5C12.8 11.9 12.7 11.4 12.5 10.9C12.6 10.9 12.8 10.8 13.1 10.8ZM18.5 21.6C16.9 21.6 15.7 19.6 15.7 17.8C15.7 16 16.7 15 18.5 15C20.2 15 21.3 16 21.3 17.8C21.3 19.6 20.2 21.6 18.5 21.6ZM5.9 12.6C5.9 10.8 6.9 9.8 8.7 9.8C10.4 9.8 11.5 10.8 11.5 12.6C11.5 14.4 10.4 16.4 8.7 16.4C7 16.4 5.9 14.5 5.9 12.6ZM5 28.2V22.4C5 22.1 4.7 21.8 4.4 21.8C4.1 21.8 3.8 22.1 3.8 22.4V28.2H1.2V21.8C1.2 20.6 2 19.6 3.2 19.3L5.1 18.8C7.4 18.3 9.9 18.3 12.2 18.8L14.2 19.3C14.4 19.4 14.7 19.5 14.9 19.6C15.3 21 16.1 22 17.1 22.5C16.3 22.6 15.5 22.7 14.8 22.9L13.8 23.1V22.5C13.8 22.2 13.5 21.9 13.2 21.9C12.9 21.9 12.6 22.2 12.6 22.5V23.4C11 23.9 9.9 25.3 9.9 27V28.3H5V28.2ZM23.4 33.3V27.5C23.4 27.2 23.1 26.9 22.8 26.9C22.5 26.9 22.2 27.2 22.2 27.5V33.3H14.6V27.5C14.6 27.2 14.3 26.9 14 26.9C13.7 26.9 13.4 27.2 13.4 27.5V33.3H11V26.9C11 25.7 11.8 24.7 13 24.4L15 23.9C17.3 23.4 19.8 23.4 22.1 23.9L24.1 24.4C25.3 24.7 26.1 25.7 26.1 26.9V33.3H23.4ZM35.8 28.2H33.2V22.4C33.2 22.1 32.9 21.8 32.6 21.8C32.3 21.8 32 22.1 32 22.4V28.2H27.2V26.9C27.2 25.2 26.1 23.7 24.4 23.3V22.5C24.4 22.2 24.1 21.9 23.8 21.9C23.5 21.9 23.2 22.2 23.2 22.5V23.1L22.3 22.9C21.5 22.7 20.8 22.6 20 22.5C21 22 21.8 21 22.2 19.6C22.4 19.5 22.6 19.4 22.8 19.4L24.8 18.9C27.1 18.4 29.6 18.4 31.9 18.9L33.8 19.4C35 19.7 35.8 20.7 35.8 21.9V28.2Z" fill="#F9F2EB"/></svg>',
        '<svg width="35" height="39" viewBox="0 0 35 39" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.3991 16.6999V16.2999L24.3991 15.5999C24.1991 14.8999 23.9991 14.2999 23.6991 13.6999L24.5991 11.8999L24.3991 11.5999C24.0991 11.1999 23.6991 10.8999 23.3991 10.4999L23.0991 10.1999L21.1991 11.0999C20.8991 10.8999 20.5991 10.7999 20.2991 10.5999C19.9991 10.3999 19.6991 10.3999 19.2991 10.2999L18.5991 8.39991H18.1991C17.6991 8.39991 17.1991 8.29991 16.6991 8.39991H16.3991L15.6991 10.2999C14.9991 10.4999 14.3991 10.6999 13.7991 10.9999L11.9991 10.0999L11.6991 10.3999C11.2991 10.6999 10.8991 11.0999 10.5991 11.3999L10.3991 11.6999L11.2991 13.5999C11.0991 13.8999 10.9991 14.1999 10.7991 14.4999C10.6991 14.7999 10.5991 15.0999 10.4991 15.4999L8.59913 16.1999V16.5999C8.59913 17.0999 8.49913 17.5999 8.59913 18.0999V18.4999L10.4991 19.1999C10.6991 19.8999 10.8991 20.4999 11.1991 21.0999L10.2991 22.8999L10.4991 23.1999C10.7991 23.5999 11.1991 23.8999 11.4991 24.2999L11.7991 24.4999L13.6991 23.5999C13.9991 23.7999 14.2991 23.8999 14.5991 24.0999C14.8991 24.1999 15.1991 24.2999 15.5991 24.3999L16.2991 26.2999H18.4991L19.1991 24.3999C19.8991 24.1999 20.4991 23.9999 21.0991 23.6999L22.8991 24.5999L23.1991 24.3999C23.5991 24.0999 23.8991 23.6999 24.2991 23.3999L24.4991 23.0999L23.5991 21.1999C23.7991 20.8999 23.8991 20.5999 24.0991 20.2999C24.1991 19.9999 24.2991 19.6999 24.3991 19.2999L26.2991 18.5999V18.1999C26.3991 17.6999 26.3991 17.1999 26.3991 16.6999ZM25.1991 17.6999L23.3991 18.2999L23.2991 18.5999C23.1991 18.9999 23.0991 19.2999 22.9991 19.6999C22.8991 19.9999 22.6991 20.3999 22.4991 20.6999L22.2991 20.9999L23.0991 22.7999L22.6991 23.1999L21.1991 22.3999H21.0991L20.7991 22.2999L20.5991 22.3999C19.9991 22.7999 19.2991 23.0999 18.4991 23.1999L18.1991 23.2999L17.4991 25.0999H16.9991L16.3991 23.2999L16.0991 23.1999C15.6991 23.0999 15.3991 22.9999 14.9991 22.8999C14.6991 22.7999 14.2991 22.5999 13.9991 22.3999L13.6991 22.1999L11.8991 22.9999L11.4991 22.5999L12.1991 21.1999L12.3991 20.8999L12.1991 20.5999C11.7991 19.9999 11.4991 19.2999 11.3991 18.4999V18.1999L9.59913 17.4999V16.9999L11.3991 16.3999L11.4991 16.0999C11.5991 15.6999 11.6991 15.3999 11.7991 14.9999C11.8991 14.6999 12.0991 14.2999 12.2991 13.9999L12.4991 13.6999L11.6991 11.8999L12.0991 11.4999L13.7991 12.3999L14.0991 12.1999C14.6991 11.7999 15.3991 11.4999 16.1991 11.3999L16.4991 11.2999L17.1991 9.49991H17.6991L18.3991 11.3999L18.6991 11.4999C19.0991 11.5999 19.3991 11.6999 19.7991 11.7999C20.0991 11.8999 20.4991 12.0999 20.7991 12.2999L21.0991 12.4999L22.8991 11.6999L23.2991 12.0999L22.3991 13.7999L22.5991 14.0999C22.9991 14.6999 23.2991 15.3999 23.3991 16.1999L23.4991 16.4999L25.2991 17.1999C25.1991 17.2999 25.1991 17.4999 25.1991 17.6999Z" fill="#F9F2EB"/><path d="M19.4008 12.6002C16.8008 11.5002 13.7008 12.7002 12.6008 15.3002C12.1008 16.6002 12.0008 18.0002 12.6008 19.3002C13.1008 20.6002 14.1008 21.6002 15.4008 22.1002C16.1008 22.4002 16.7008 22.5002 17.4008 22.5002C18.1008 22.5002 18.7008 22.4002 19.3008 22.1002C20.6008 21.6002 21.6008 20.6002 22.1008 19.3002C23.3008 16.8002 22.1008 13.7002 19.4008 12.6002ZM21.1008 18.9002C20.7008 19.9002 19.9008 20.6002 18.9008 21.0002C17.9008 21.4002 16.8008 21.4002 15.9008 21.0002C14.9008 20.6002 14.2008 19.8002 13.8008 18.8002C13.4008 17.8002 13.4008 16.7002 13.8008 15.8002C14.4008 14.3002 15.9008 13.4002 17.4008 13.4002C17.9008 13.4002 18.5008 13.5002 19.0008 13.7002C21.0008 14.5002 21.9008 16.9002 21.1008 18.9002Z" fill="#F9F2EB"/><path d="M17.4 5.1C10.7 5.1 5.2 10.6 5.2 17.3C5.2 21.1 7 24.7 10.1 27V31.2C10.1 32.2 10.9 33.1 12 33.1H12.1V37C12.1 38 12.9 38.9 14 38.9H21C22 38.9 22.9 38.1 22.9 37V33.1H23C24 33.1 24.9 32.3 24.9 31.2V27C27.9 24.7 29.8 21.1 29.8 17.3C29.6 10.5 24.1 5.1 17.4 5.1ZM20.9 37.6H13.9C13.5 37.6 13.2 37.3 13.2 36.9V35.7H21.5V36.9C21.6 37.3 21.3 37.6 20.9 37.6ZM21.6 34.6H13.3V33.1H21.6V34.6ZM23.8 26.2L23.6 26.4V31.2C23.6 31.6 23.3 31.9 22.9 31.9H12C11.6 31.9 11.3 31.6 11.3 31.2V26.4L11.1 26.2C8.2 24.1 6.5 20.8 6.5 17.3C6.5 11.2 11.4 6.3 17.5 6.3C23.6 6.3 28.5 11.2 28.5 17.3C28.4 20.8 26.7 24.1 23.8 26.2ZM3.7 16.7H0.6C0.3 16.7 0 17 0 17.3C0 17.6 0.3 17.9 0.6 17.9H3.7C4 17.9 4.3 17.6 4.3 17.3C4.3 17 4.1 16.7 3.7 16.7ZM34.1 16.7H31C30.7 16.7 30.4 17 30.4 17.3C30.4 17.6 30.7 17.9 31 17.9H34.1C34.4 17.9 34.7 17.6 34.7 17.3C34.7 17 34.5 16.7 34.1 16.7ZM17.4 4.3C17.7 4.3 18 4 18 3.7V0.6C18 0.3 17.7 0 17.4 0C17.1 0 16.8 0.3 16.8 0.6V3.7C16.8 4 17.1 4.3 17.4 4.3Z" fill="#F9F2EB"/><path d="M7.29922 26.6002L5.09922 28.8002C4.89922 29.0002 4.89922 29.4002 5.09922 29.6002C5.19922 29.7002 5.39922 29.8002 5.49922 29.8002C5.59922 29.8002 5.79922 29.7002 5.89922 29.6002L8.09922 27.4002C8.29922 27.2002 8.29922 26.8002 8.09922 26.6002C7.89922 26.4002 7.49922 26.4002 7.29922 26.6002ZM28.7992 5.1002L26.5992 7.30019C26.3992 7.50019 26.3992 7.9002 26.5992 8.1002C26.6992 8.2002 26.8992 8.30019 26.9992 8.30019C27.1992 8.30019 27.2992 8.2002 27.3992 8.1002L29.5992 5.90019C29.7992 5.70019 29.7992 5.3002 29.5992 5.1002C29.3992 4.9002 28.9992 4.9002 28.7992 5.1002ZM27.4992 26.6002C27.2992 26.4002 26.8992 26.4002 26.6992 26.6002C26.4992 26.8002 26.4992 27.2002 26.6992 27.4002L28.8992 29.6002C28.9992 29.7002 29.1992 29.8002 29.2992 29.8002C29.4992 29.8002 29.5992 29.7002 29.6992 29.6002C29.8992 29.4002 29.8992 29.0002 29.6992 28.8002L27.4992 26.6002ZM7.29922 8.1002C7.39922 8.2002 7.59922 8.30019 7.69922 8.30019C7.89922 8.30019 7.99922 8.2002 8.09922 8.1002C8.29922 7.9002 8.29922 7.50019 8.09922 7.30019L5.89922 5.1002C5.69922 4.9002 5.29922 4.9002 5.09922 5.1002C4.89922 5.3002 4.89922 5.70019 5.09922 5.90019L7.29922 8.1002Z" fill="#F9F2EB"/></svg>',
        '<svg width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.7 17.4V7.1L17.6 0H0V31.4H24.7C28.2 31 31 28 31 24.4C30.9 20.8 28.2 17.8 24.7 17.4ZM18.1 2.2L22.7 6.8H18.1V2.2ZM1.2 30.3V1.3H16.9V8H23.5V17.5C19.8 17.7 16.9 20.8 16.9 24.5C16.9 26.9 18.1 29.1 20 30.3H1.2ZM23.9 30.3C20.7 30.3 18.1 27.7 18.1 24.5C18.1 21.3 20.7 18.7 23.9 18.7C27.1 18.7 29.7 21.3 29.7 24.5C29.7 27.6 27.1 30.2 23.9 30.3Z" fill="#F9F2EB"/><path d="M26.5 22.0998L23 25.5998L21.3 23.8998C21.1 23.6998 20.7 23.6998 20.5 23.8998C20.3 24.0998 20.3 24.4998 20.5 24.6998L23.1 27.2998L27.5 22.8998C27.7 22.6998 27.7 22.2998 27.5 22.0998C27.1 21.8998 26.7 21.8998 26.5 22.0998ZM6.1 6.6998L4.1 8.6998L3.2 7.7998C3 7.5998 2.6 7.5998 2.4 7.7998C2.2 7.9998 2.2 8.3998 2.4 8.5998L4.1 10.2998L6.9 7.4998C7.1 7.2998 7.1 6.8998 6.9 6.6998C6.7 6.4998 6.4 6.4998 6.1 6.6998ZM9 7.9998H14.4C14.7 7.9998 15 7.6998 15 7.3998C15 7.0998 14.7 6.7998 14.4 6.7998H9C8.7 6.7998 8.4 7.0998 8.4 7.3998C8.4 7.6998 8.7 7.9998 9 7.9998ZM9 10.1998H19.8C20.1 10.1998 20.4 9.8998 20.4 9.5998C20.4 9.2998 20.1 8.9998 19.8 8.9998H9C8.7 8.9998 8.4 9.2998 8.4 9.5998C8.4 9.8998 8.7 10.1998 9 10.1998ZM17.2 16.3998C17.2 16.0998 16.9 15.7998 16.6 15.7998H9C8.7 15.7998 8.4 16.0998 8.4 16.3998C8.4 16.6998 8.7 16.9998 9 16.9998H16.6C16.9 16.9998 17.2 16.7998 17.2 16.3998ZM9 14.7998H19.8C20.1 14.7998 20.4 14.4998 20.4 14.1998C20.4 13.8998 20.1 13.5998 19.8 13.5998H9C8.7 13.5998 8.4 13.8998 8.4 14.1998C8.4 14.4998 8.7 14.7998 9 14.7998ZM13.9 22.6998H9C8.7 22.6998 8.4 22.9998 8.4 23.2998C8.4 23.5998 8.7 23.8998 9 23.8998H13.9C14.2 23.8998 14.5 23.5998 14.5 23.2998C14.5 22.9998 14.2 22.6998 13.9 22.6998ZM15.6 20.4998H9C8.7 20.4998 8.4 20.7998 8.4 21.0998C8.4 21.3998 8.7 21.6998 9 21.6998H15.6C15.9 21.6998 16.2 21.3998 16.2 21.0998C16.2 20.7998 16 20.4998 15.6 20.4998ZM6.1 13.5998L4.1 15.5998L3.2 14.6998C3 14.4998 2.6 14.4998 2.4 14.6998C2.2 14.8998 2.2 15.2998 2.4 15.4998L4.1 17.1998L6.9 14.3998C7.1 14.1998 7.1 13.7998 6.9 13.5998C6.7 13.3998 6.4 13.3998 6.1 13.5998ZM6.1 20.5998L4.1 22.5998L3.2 21.6998C3 21.4998 2.6 21.4998 2.4 21.6998C2.2 21.8998 2.2 22.2998 2.4 22.4998L4.1 24.1998L6.9 21.3998C7.1 21.1998 7.1 20.7998 6.9 20.5998C6.7 20.2998 6.4 20.2998 6.1 20.5998Z" fill="#F9F2EB"/></svg>',
        '<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.8 15.6H16.8V0.6C16.8 0.3 16.5 0 16.2 0C15.9 0 15.6 0.3 15.6 0.6V15.6H0.6C0.3 15.6 0 15.9 0 16.2C0 16.5 0.3 16.8 0.6 16.8H15.6V31.8C15.6 32.1 15.9 32.4 16.2 32.4C16.5 32.4 16.8 32.1 16.8 31.8V16.8H31.8C32.1 16.8 32.4 16.5 32.4 16.2C32.4 15.9 32.2 15.6 31.8 15.6Z" fill="#F9F2EB"/></svg>'
    ]
    // Дані для контенту кожної категорії
    this.categoryData = [
      {
        title: 'Канікули на платежі',
        description: 'Канікули на платежі за розтермінуванням або на виплати — це додаткова опція до діючого договору розтермінування від забудовника. \n\nВона дозволяє клієнту зробити паузу в оплаті згідно з підписаним графіком: до трьох місяців поспіль, якщо йдеться про щомісячні платежі, або один квартал у випадку квартальних платежів.\n\nПотім ця сума рівномірно додається до наступних платежів за графіком, без зміни кінцевого строку дії договору.',
        cards: [
          {
            title: 'Для кого',
            svg: this.svgs[0],
            texts: [
              'Канікули на платежі доречні у різних життєвих ситуаціях: коли змінюється дохід, з’являються нові фінансові зобов’язання, відбувається переїзд або потрібен час для адаптації.',
              'Такий інструмент допомагає зберігати баланс і правильно розподіляти ресурси, не відмовляючись від планів щодо придбання нерухомості.',
              'Для тих, хто розглядає житло як інвестицію, це також корисна опція. Пауза дозволяє зосередитися на підготовці об’єкта, плануванні подальших дій і гнучкому управлінні капіталом.'
            ]
          },
          {
            title: 'На що поширюється',
            svg: this.svgs[1],      
            texts: [
              'Опція поширюється на всі типи приміщень девелопера. Це не банківські «кредитні канікули», а сервіс від забудовника, який надає додаткову гнучкість і дозволяє адаптувати графік платежів під життєві обставини.'
            ]
          },
          {
            title: 'Принцип дії, переваги',
            svg: this.svgs[2],
            texts: [
              'Наприклад, якщо клієнт сплачує по 50 000 грн щомісяця і бере тримісячну паузу, відкладена сума становитиме 150 000 грн.',
              'Якщо після канікул лишається п’ятнадцять платежів, до кожного з них буде додано по 10 000 грн, і новий щомісячний платіж становитиме 60 000 грн до завершення графіка.',
              'Для квартального графіка діє така ж логіка: пропущений квартальний платіж розподіляється між усіма наступними, без зміни фінальної дати.'
            ]
          }
        ]
      },
      {
        title: 'Допомога з перепродажем',
        description: 'Якщо клієнт вирішує перепродати придбаний у нас раніше об’єкт (житловий чи комерційний), девелопер надає сервіс «Допомога з перепродажем».\n\nВін передбачає можливість виставити приміщення на продаж через відділ продажу поряд з іншими актуальними пропозиціями, отримавши професійний супровід і роботу з потенційними покупцями.',
        cards: [
          {
            title: 'Для кого',
            svg: this.svgs[0],
            texts: [
              'Цей сервіс зручний фактично для усіх інвесторів, які купували у нас нерухомість і нині переорієнтовують свої інвестиції чи житлові плани, а також для покупців, які шукають максимально зручний спосіб продажу без додаткових ризиків.'
            ]
          },
          {
            title: 'На що поширюється',
            svg: this.svgs[1],
            texts: [
              'Опція доступна для всіх об’єктів компанії та дозволяє організувати прозорий процес перепродажу.'
            ]
          },
          {
            title: 'Принцип дії, переваги',
            svg: this.svgs[2],
            texts: [
              'Продаж нерухомості часто потребує значних часових ресурсів: пошук і відбір покупців, організація показів, переговори, юридичні формальності.',
              'Ми беремо ці процеси на себе — здійснюємо рекламне просування, опрацьовуємо всі вхідні звернення, організовуємо покази та забезпечуємо повний юридичний супровід угоди. Такий підхід дозволяє клієнту заощадити час і пройти процес продажу максимально комфортно та передбачувано.'
            ]
          },
          {
            title: 'Додатково',
            svg: this.svgs[3],
            texts: [
              'Усі додаткові витрати — податки та нотаріальні послуги — сплачуються клієнтом. Ціна продажу визначається компанією відповідно до ринкової ситуації та погоджується з клієнтом.'
            ]
          }
        ]
      },
      {
        title: 'Компенсація й винагороди затримки',
        description: 'У випадку затримки введення будинку в експлуатацію клієнт отримує компенсацію вартості оренди приміщення аналогічної кімнатності з придбаним. Це покриває витрати на оренду під час очікування та забезпечує додаткову фінансову захищеність.',
        cards: [
          {
            title: 'Для кого',
            svg: this.svgs[0],
            texts: [
              'Опція підходить усім покупцям нерухомості, які хочуть мати додаткову впевненість у термінах завершення будівництва та захистити себе від можливих витрат у разі затримки.',
              'Вона буде корисною як тим, хто планує переїзд і орендує житло, так і інвесторам, які прагнуть мінімізувати фінансові ризики під час очікування готовності об’єкта.'

            ]
          },
          {
            title: 'На що поширюється',
            svg: this.svgs[1],
            texts: [
              '<span style="font-weight: 700">Компенсація у випадку затримки діє для таких житлових комплексів:</span>',
              '<span style="font-weight: 700">Львів:</span> Big Ben, Father, Hyde Park',
              '<span style="font-weight: 700">Київ:</span> Sister, Brother, Maxima Residence, Nordica Residence (3-тя черга)',
              'Компенсація застосовується лише до договорів, укладених щодо цих комплексів, і не поширюється на раніше запущені або вже реалізовані об’єкти.'
            ]
          },
          {
            title: 'Принцип дії, переваги',
            svg: this.svgs[2],
            texts: [
              'Виплата компенсацій розпочинається, якщо затримка здачі перевищує 6 місяців, і триває до моменту, коли клієнту надано доступ до виконання ремонту його приміщення або коли будинок введено в експлуатацію.',
              'Розмір компенсації визначається на підставі «Щоквартального звіту ринку нерухомості від ЛУН», опублікованого на lun.ua, або іншим способом, погодженим сторонами.'
            ]
          },
          {
            title: 'Додатково',
            svg: this.svgs[3],
            texts: [
              'При підписанні договору купівлі клієнту видається Гарантійний лист, коли настає момент виплат, з клієнтом підписується додатковий договір, у якому фіксується сума щомісячної компенсації та порядок її виплати.',
              'Такий підхід створює додаткову впевненість і надійно захищає інтереси клієнта.'
            ]
          }
        ]
      },
      {
        title: 'Можливість заміни на більшу площу',
        description: 'Клієнт отримує спеціальні умови при заміні придбаної раніше в РІЕЛ нерухомості на помешкання більшої площі.\n\nЦе означає, що покупець може без складних процедур оновити свій вибір і обміняти свою квартиру чи апартаменти на помешкання більшої площі, зберігаючи вигідні умови та ціну за вже оплачені раніше квадратні метри від РІЕЛ.\n\nПри заміні приміщення на більше клієнт сплачує вартість додаткових квадратних метрів за актуальною ціною та витрати за переоформлення нерухомості.',
        cards: [
          {
            title: 'Для кого',
            svg: this.svgs[0],
            texts: [
              'Ця опція підійде тим, хто хоче перейти на більшу площу без зайвих складнощів. Вона дозволяє збільшити житловий простір у зручний момент, не витрачаючи час на додаткові процедури.',
              'Тож можливість заміни актуальна у різних життєвих ситуаціях — коли з’являється потреба в додаткових кімнатах, змінюється стиль життя, зростають вимоги до комфорту або виникає бажання обрати інше планування. Такий формат дає покупцеві більше гнучкості та дозволяє адаптувати своє житло до нових потреб без тривалих пошуків і зайвих витрат.',
              'Це також зручний інструмент для тих, хто розглядає нерухомість як інвестицію: заміна помешкання дозволяє оперативно коригувати свої рішення та обирати оптимальні варіанти без додаткових фінансових втрат.'

            ]
          },
          {
            title: 'Принцип дії, переваги',
            svg: this.svgs[1],
            texts: [
              'Усі метри, оплачені раніше, зберігають свою первісну ціну — у розрахунок входить лише різниця площі, яка рахується за актуальної вартістю на момент угоди. Обмін проходить у межах одного житлового комплексу – квартира обмінюється на більшу квартиру або апартаменти, апартаменти – на апартаменти.',
              'Для цього клієнт має звернутися до нас з бажанням замінити об’єкт на більший. Ми перерахуємо загальну вартість і роз\'яснимо всі деталі.'
            ]
          },
          {
            title: 'Умови використання',
            svg: this.svgs[2],
            texts: [
              'Скористатися послугою заміни нерухомості можна до введення будинку в експлуатацію.',
              'Опція оформляється через зміни в договорі або укладення нового з урахуванням нової площі та фінансових умов.'
            ]
          }
        ]
      }
    ];

    // English translations for the same structure (used when site path contains /en/)
    this.categoryDataEnglish = [
  {
    title: 'Payment Holidays',
    description: 'A payment holiday for installment plans is an additional option for an active installment agreement from the developer.\n\nIt allows the client to take a break from payments according to the signed schedule: up to three consecutive months for monthly payments, or one quarter for quarterly payments.\n\nThis amount is then evenly added to the subsequent scheduled payments without changing the final term of the contract.',
    cards: [
      {
        title: 'Who is it for',
        svg: this.svgs[0],
        texts: [
          'Payment holidays are relevant in various life situations: when income changes, new financial obligations arise, during a move, or when time is needed for adaptation.',
          'This tool helps maintain balance and properly allocate resources without abandoning plans to purchase real estate.',
          'For those considering housing as an investment, this is also a useful option. The pause allows focusing on property preparation, planning further actions, and flexible capital management.'
        ]
      },
      {
        title: 'What it applies to',
        svg: this.svgs[1],
        texts: [
          'The option applies to all types of developer premises. This is not a bank "loan holiday," but a service from the developer that provides additional flexibility and allows adapting the payment schedule to life circumstances.'
        ]
      },
      {
        title: 'How it works, Benefits',
        svg: this.svgs[2],
        texts: [
          'For example, if a client pays 50,000 UAH monthly and takes a three-month break, the deferred amount will be 150,000 UAH.',
          'If fifteen payments remain after the holiday, 10,000 UAH will be added to each, and the new monthly payment will be 60,000 UAH until the end of the schedule.',
          'The same logic applies to a quarterly schedule: a missed quarterly payment is distributed among all subsequent ones without changing the final date.'
        ]
      }
    ]
  },
  {
    title: 'Resale Assistance',
    description: 'If a client decides to resell a previously purchased property (residential or commercial), the developer provides the "Resale Assistance" service.\n\nIt offers the opportunity to list the premises for sale through the sales department alongside other current offers, receiving professional support and engagement with potential buyers.',
    cards: [
      {
        title: 'Who is it for',
        svg: this.svgs[0],
        texts: [
          'This service is convenient for virtually all investors who purchased real estate from us and are now refocusing their investments or housing plans, as well as for buyers looking for the most convenient way to sell without additional risks.'
        ]
      },
      {
        title: 'What it applies to',
        svg: this.svgs[1],
        texts: [
          'The option is available for all company properties and allows for an organized and transparent resale process.'
        ]
      },
      {
        title: 'How it works, Benefits',
        svg: this.svgs[2],
        texts: [
          'Selling real estate often requires significant time resources: searching and screening buyers, organizing viewings, negotiations, and legal formalities.',
          'We handle these processes — we carry out advertising promotion, process all incoming inquiries, organize viewings, and provide full legal support for the deal. This approach allows the client to save time and go through the selling process as comfortably and predictably as possible.'
        ]
      },
      {
        title: 'Additional info',
        svg: this.svgs[3],
        texts: [
          'All additional expenses — taxes and notary services — are paid by the client. The sale price is determined by the company according to the market situation and agreed upon with the client.'
        ]
      }
    ]
  },
  {
    title: 'Delay Compensation & Rewards',
    description: 'In case of a delay in commissioning the building, the client receives compensation for the rental cost of a property with the same number of rooms as the one purchased. This covers rental expenses during the wait and provides additional financial security.',
    cards: [
      {
        title: 'Who is it for',
        svg: this.svgs[0],
        texts: [
          'The option is suitable for all real estate buyers who want extra confidence in construction completion dates and protection from potential costs in case of a delay.',
          'It will be useful for both those planning to move and currently renting, and investors seeking to minimize financial risks while waiting for the property to be ready.'
        ]
      },
      {
        title: 'What it applies to',
        svg: this.svgs[1],
        texts: [
          '<span style="font-weight: 700">Compensation in case of delay applies to the following residential complexes:</span>',
          '<span style="font-weight: 700">Lviv:</span> Big Ben, Father, Hyde Park',
          '<span style="font-weight: 700">Kyiv:</span> Sister, Brother, Maxima Residence, Nordica Residence (Phase 3)',
          'Compensation applies only to contracts concluded for these complexes and does not apply to previously launched or already completed properties.'
        ]
      },
      {
        title: 'How it works, Benefits',
        svg: this.svgs[2],
        texts: [
          'Compensation payments begin if the delivery delay exceeds 6 months and continue until the client is granted access to carry out renovations or the building is commissioned.',
          'The amount of compensation is determined based on the "Quarterly Real Estate Market Report from LUN" published on lun.ua, or by another method agreed upon by the parties.'
        ]
      },
      {
        title: 'Additional info',
        svg: this.svgs[3],
        texts: [
          'Upon signing the purchase agreement, the client is issued a Letter of Guarantee; when the time for payments arrives, an additional agreement is signed with the client, fixing the monthly compensation amount and the payment procedure.',
          'This approach creates additional confidence and reliably protects the client\'s interests.'
        ]
      }
    ]
  },
  {
    title: 'Upgrade to Larger Area',
    description: 'The client receives special conditions when replacing a previously purchased RIEL property with a larger living space.\n\nThis means that the buyer can update their choice without complex procedures and exchange their apartment for a larger one, maintaining favorable terms and the price for the square meters already paid to RIEL.\n\nWhen upgrading to a larger property, the client pays for the additional square meters at the current price and covers the costs of re-registering the real estate.',
    cards: [
      {
        title: 'Who is it for',
        svg: this.svgs[0],
        texts: [
          'This option is suitable for those who want to move to a larger area without unnecessary complications. It allows increasing living space at a convenient time without spending time on additional procedures.',
          'The upgrade option is relevant in various life situations — when a need for extra rooms arises, lifestyle changes, comfort requirements grow, or there is a desire to choose a different layout. This format gives the buyer more flexibility and allows adapting their home to new needs without long searches and extra costs.',
          'It is also a convenient tool for those who view real estate as an investment: property replacement allows for quick adjustments to decisions and choosing optimal options without additional financial losses.'
        ]
      },
      {
        title: 'How it works, Benefits',
        svg: this.svgs[1],
        texts: [
          'All previously paid meters retain their original price — the calculation only includes the difference in area, which is charged at the current price at the time of the deal. The exchange takes place within the same residential complex: an apartment is exchanged for a larger apartment, or apartments for apartments.',
          'To do this, the client should contact us with the desire to replace the property with a larger one. We will recalculate the total cost and explain all the details.'
        ]
      },
      {
        title: 'Terms of Use',
        svg: this.svgs[2],
        texts: [
          'The property replacement service can be used until the building is commissioned.',
          'The option is formalized through amendments to the contract or by concluding a new one, taking into account the new area and financial terms.'
        ]
      }
    ]
  }
];

    this.init();

    // Populate page immediately with the first category (language-aware)
    try {
      this.setActiveCategory(this.currentIndex);
    } catch (e) {
      // fail silently if anything goes wrong during init render
      // (listeners will still be attached)
    }
  }

  init() {
    // Dropdown обробники
    if (this.dropdownTrigger) {
      this.dropdownTrigger.addEventListener('click', () => this.toggleDropdown());
    }

    if (this.dropdownOptions.length > 0) {
      this.dropdownOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
          this.selectDropdownOption(index);
        });
      });
    }

    // Закриття dropdown при клацанні поза ним
    document.addEventListener('click', (e) => {
      if (this.dropdown && !this.dropdown.contains(e.target)) {
        this.closeDropdown();
      }
    });
    
    // Обробника клацання на меню (десктоп)
    this.menuItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.setActiveCategory(index);
      });
    });
  }

  toggleDropdown() {
    if (this.dropdown.classList.contains('is-open')) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    this.dropdown.classList.add('is-open');
  }

  closeDropdown() {
    this.dropdown.classList.remove('is-open');
  }

  selectDropdownOption(index) {
    this.closeDropdown();
    this.setActiveCategory(index);
  }

  setActiveCategory(index) {
    this.currentIndex = index;

    // Оновлення активного пункту меню (десктоп)
    this.menuItems.forEach((item, i) => {
      item.classList.toggle('finance-menu__item--active', i === index);
    });

    // Оновлення активного пункту dropdown (мобіль)
    this.dropdownItems.forEach((item, i) => {
      item.classList.toggle('is-active', i === index);
    });

    // Оновлення label dropdown (враховуємо мову сторінки)
    const activeData = this.getActiveData();
    if (this.dropdownLabel && activeData[index]) {
      this.dropdownLabel.textContent = activeData[index].title;
    }

    // Оновлення контенту
    this.updateContent(index);
  }

  updateContent(index) {
    const data = this.getActiveData()[index];
    
    if (!data) return;

    // Оновлення заголовку
    if (this.title) {
      this.title.textContent = data.title;
    }

    // Оновлення опису (розділення на параграфи)
    const descriptions = data.description.split('\n\n');
    
    // Знаходимо контейнер з описами
    const header = document.querySelector('.finance-header');
    if (header) {
      // Очищуємо старі параграфи
      header.querySelectorAll('.finance-description').forEach(p => p.remove());
      
      // Додаємо нові paraграфи
      descriptions.forEach(desc => {
        const p = document.createElement('p');
        p.className = 'finance-description';
        p.textContent = desc;
        header.appendChild(p);
      });

      // Анімація header - slide up
      gsap.fromTo(header, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out'
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    }

    // Оновлення карток — гарантуємо, що кількість .finance-card
    // у DOM відповідає data.cards.length (створюємо/видаляємо елементи при потребі)
    const cardsContainer = document.querySelector('.finance-cards');
    if (!cardsContainer) return;

    let existingCards = Array.from(cardsContainer.querySelectorAll('.finance-card'));
    const needed = data.cards ? data.cards.length : 0;

    // Додати картки, якщо потрібно
    while (existingCards.length < needed) {
      let toAppend;
      if (existingCards.length > 0) {
        toAppend = existingCards[0].cloneNode(true);
        // Очистимо тексти/іконки у клоні перед заповненням
        const icon = toAppend.querySelector('.finance-card__icon'); if (icon) icon.innerHTML = '';
        const title = toAppend.querySelector('.finance-card__title'); if (title) title.textContent = '';
        const content = toAppend.querySelector('.finance-card__content');
        if (content) {
          content.querySelectorAll('.finance-card__text').forEach(n => n.remove());
        }
      } else {
        toAppend = this.createCardElement();
      }
      cardsContainer.appendChild(toAppend);
      existingCards = Array.from(cardsContainer.querySelectorAll('.finance-card'));
    }

    // Видалити зайві картки
    while (existingCards.length > needed) {
      const rem = existingCards.pop();
      rem.remove();
    }

    // Тепер оновлюємо вміст кожної картки
    existingCards = Array.from(cardsContainer.querySelectorAll('.finance-card'));
    existingCards.forEach((card, cardIndex) => {
      const cardData = data.cards[cardIndex];

      // Перед оновленням робимо коротке приховання для плавної анімації
      gsap.set(card, { opacity: 0, y: 30 });

      if (cardData) {
        const iconContainer = card.querySelector('.finance-card__icon');
        if (iconContainer && cardData.svg) {
          iconContainer.innerHTML = cardData.svg;
        }

        const cardTitle = card.querySelector('.finance-card__title');
        if (cardTitle) {
          cardTitle.textContent = cardData.title;
        }

        // Тексти
        const textContainer = card.querySelector('.finance-card__content') || card;
        const textElements = Array.from(card.querySelectorAll('.finance-card__text'));

        // Оновити або створити параграфи
        for (let i = 0; i < cardData.texts.length; i++) {
          if (i < textElements.length) {
            textElements[i].innerHTML = cardData.texts[i];
          } else {
            const p = document.createElement('p');
            p.className = 'finance-card__text';
            p.innerHTML = cardData.texts[i];
            textContainer.appendChild(p);
          }
        }

        // Видалити зайві параграфи
        if (textElements.length > cardData.texts.length) {
          for (let i = textElements.length - 1; i >= cardData.texts.length; i--) {
            textElements[i].remove();
          }
        }
      }

      // Вхідна анімація картки
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.36,
        delay: 0.35 + cardIndex * 0.08,
        ease: 'power2.out'
      });
    });
  }

  // Повертає масив даних залежно від шляху (якщо в URL є /en/ — повертаємо англійський масив)
  getActiveData() {
    try {
      if (typeof window !== 'undefined' && window.location && window.location.pathname) {
        if (window.location.pathname.indexOf('/en/') !== -1) {
          return this.categoryDataEnglish || this.categoryData;
        }
      }
    } catch (e) {
      // ignore
    }
    return this.categoryData;
  }

  // Створює мінімальну структуру .finance-card, коли немає елементів у DOM
  createCardElement() {
    const card = document.createElement('div');
    card.className = 'finance-card';

    const icon = document.createElement('div');
    icon.className = 'finance-card__icon';

    const content = document.createElement('div');
    content.className = 'finance-card__content';

    const title = document.createElement('h3');
    title.className = 'finance-card__title';
    title.textContent = '';

    const p = document.createElement('p');
    p.className = 'finance-card__text';
    p.textContent = '';

    content.appendChild(title);
    content.appendChild(p);
    card.appendChild(icon);
    card.appendChild(content);

    return card;
  }
}

// Ініціалізація при завантаженні
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new FinanceModule();
  });
} else {
  new FinanceModule();
}

console.log('[Finance] Module loaded');
