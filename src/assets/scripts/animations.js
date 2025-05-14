import { gsap, ScrollTrigger, SplitText } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, SplitText);

const quotes = document.querySelectorAll('.text-anim');

function setupSplits() {
  quotes.forEach(quote => {
    // Reset if needed
    if (quote.anim) {
      quote.anim.progress(1).kill();
      quote.split.revert();
    }

    quote.split = SplitText.create(quote, {
      type: 'words',
      linesClass: 'split-line',
    });

    // Set up the anim
    quote.anim = gsap.from(quote.split.words, {
      scrollTrigger: {
        trigger: quote,

        start: 'top +=90%',
        // markers: { startColor: '#dfdcff', endColor: 'transparent' },
      },
      duration: 0.4,
      ease: 'circ.out',

      opacity: 0,
      y: 40,
      stagger: 0.03,
    });
  });
}

ScrollTrigger.addEventListener('refresh', setupSplits);
setupSplits();
const chars = document.querySelectorAll('.chars-anim');

function setupSplitsChars() {
  chars.forEach(quote => {
    // Reset if needed
    if (quote.anim) {
      quote.anim.progress(1).kill();
      quote.split.revert();
    }

    quote.split = SplitText.create(quote, {
      type: ' chars',
      linesClass: 'split-line',
    });

    // Set up the anim
    quote.anim = gsap.from(quote.split.chars, {
      scrollTrigger: {
        trigger: quote,

        start: 'top +=90%',
        // markers: { startColor: '#dfdcff', endColor: 'transparent' },
      },
      duration: 0.4,
      ease: 'circ.out',

      opacity: 0,
      y: 40,
      stagger: 0.02,
    });
  });
}

ScrollTrigger.addEventListener('refresh', setupSplitsChars);
setupSplitsChars();

gsap.from('.advantages__title-wrap svg', {
  scrollTrigger: {
    trigger: '.advantages__title-wrap',
    scrub: 1,
    start: 'top center',
    end: 'bottom center',
    // markers: { startColor: '#dfdcff', endColor: 'transparent' },
  },
  opacity: 0,
  y: 20,
});

gsap.from('.plannings-title__svg-wrap svg', {
  scrollTrigger: {
    trigger: '.plannings-title__svg-wrap',

    start: 'top center',
    end: 'bottom center',
    // markers: { startColor: '#dfdcff', endColor: 'transparent' },
  },
  opacity: 0,
  y: 20,
});

gsap.from('.icon--sister', {
  scrollTrigger: {
    trigger: '.video-filler',
    scrub: 1,
    start: 'top center',
    end: 'bottom center',
    // markers: { startColor: '#dfdcff', endColor: 'transparent' },
  },

  yPercent: 20,
});

gsap.from('.video-img', {
  scrollTrigger: {
    trigger: '.video-filler',
    scrub: 1,
    start: 'top bottom',
    end: 'bottom top',
    // markers: { startColor: '#dfdcff', endColor: 'transparent' },
  },
  scale: 1.2,
  yPercent: -10,
});
