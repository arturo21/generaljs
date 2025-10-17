import { easeInOutQuad } from './utils.js';

export function methods(el) {
  return {
    scrollTo(duration = 500) {
      const start = window.pageYOffset;
      const end = el.getBoundingClientRect().top + start;
      const change = end - start;
      let currentTime = 0;
      const increment = 20;

      function animateScroll() {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        window.scrollTo(0, val);
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        }
      }

      animateScroll();
      return this;
    }
  };
}
