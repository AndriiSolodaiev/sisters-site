// eslint-disable-next-line import/no-extraneous-dependencies
import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);
// Define a variable that will store the Lenis smooth scrolling object
let lenis;

let isInited = false;
export const initSmoothScrolling = () => {
  // Instantiate the Lenis object with specified properties
  if (isInited) return lenis;

  lenis = new Lenis({
    lerp: 0.1,
    infinite: false, // Lower values create a smoother scroll effect
    smoothWheel: true, // Enables smooth scrolling for mouse wheel events
  });

  // Update ScrollTrigger each time the user scrolls
  lenis.on('scroll', () => ScrollTrigger.update());
  window.lenis = lenis;
  window.addEventListener('stop-scroll', () => {
    lenis.stop();
  });
  window.addEventListener('start-scroll', () => {
    lenis.start();
  });

  // Define a function to run at each animation frame
  const scrollFn = time => {
    lenis.raf(time); // Run Lenis' requestAnimationFrame method
    requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
  };
  // Start the animation frame loop
  requestAnimationFrame(scrollFn);
  isInited = true;
  return lenis;
};
