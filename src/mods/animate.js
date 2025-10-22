/*
  Copyright (C) 2025 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.
  Licencia MIT
*/

const animate = (function () {
  const easings = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  };

  let activeAnimations = [];

  function animate(from, to, duration, easing = 'linear', stepFn, doneFn) {
    const start = performance.now();
    const ease = easings[easing] || easings.linear;
    let paused = false;
    let stopped = false;
    let rafId;

    function frame(now) {
      if (stopped) return;
      if (paused) {
        rafId = requestAnimationFrame(frame);
        return;
      }

      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = from + (to - from) * ease(progress);
      stepFn(value);

      if (progress < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        doneFn?.();
      }
    }

    rafId = requestAnimationFrame(frame);

    const controller = {
      stop() {
        stopped = true;
        cancelAnimationFrame(rafId);
      },
      pause() {
        paused = true;
      },
      resume() {
        paused = false;
      }
    };

    activeAnimations.push(controller);
    return controller;
  }

  function animateCSS(el, prop, unit, from, to, duration, easing, done) {
    return animate(from, to, duration, easing, val => {
      el.style[prop] = val + unit;
    }, done);
  }

  function animateFromTo(el, fromObj, toObj, duration, easing, done) {
    const props = {};
    for (let key in toObj) {
      const fromVal = parseFloat(fromObj[key]) || 0;
      const toVal = parseFloat(toObj[key]);
      const unit = typeof toObj[key] === 'string' && toObj[key].match(/[a-z%]+$/)
        ? toObj[key].match(/[a-z%]+$/)[0]
        : '';
      props[key] = { from: fromVal, to: toVal, unit };
    }

    return animate(0, 1, duration, easing, t => {
      for (let key in props) {
        const { from, to, unit } = props[key];
        const val = from + (to - from) * t;
        el.style[key] = val + unit;
      }
    }, done);
  }

  function select(selector, propMap, duration = 500, easing = 'easeInOutQuad', done) {
    document.querySelectorAll(selector).forEach(el => {
      const fromObj = {};
      const toObj = {};
      for (let key in propMap) {
        const [from, to] = propMap[key].split('→').map(s => s.trim());
        fromObj[key] = from;
        toObj[key] = to;
      }
      animateFromTo(el, fromObj, toObj, duration, easing, done);
    });
  }

  function fadeIn(el, duration = 500) {
    el.style.opacity = 0;
    el.style.display = 'block';
    animateCSS(el, 'opacity', '', 0, 1, duration, 'easeOutQuad');
  }

  function slideUp(el, duration = 500) {
    el.style.transform = 'translateY(100%)';
    el.style.opacity = 0;
    el.style.display = 'block';
    animateFromTo(el, { transform: 'translateY(100%)', opacity: 0 }, { transform: 'translateY(0%)', opacity: 1 }, duration, 'easeOutQuad');
  }

  function bounce(el, duration = 600) {
    el.style.transform = 'scale(0.8)';
    animate(0.8, 1.1, duration / 2, 'easeOutQuad', val => {
      el.style.transform = `scale(${val})`;
    }, () => {
      animate(1.1, 1, duration / 2, 'easeInQuad', val => {
        el.style.transform = `scale(${val})`;
      });
    });
  }

  function timeline(steps) {
    let totalDelay = 0;
    steps.forEach(step => {
      setTimeout(() => {
        if (step.prop) {
          animateCSS(step.el, step.prop, step.unit || '', step.from, step.to, step.duration, step.easing || 'linear');
        } else if (step.fromObj && step.toObj) {
          animateFromTo(step.el, step.fromObj, step.toObj, step.duration, step.easing || 'linear');
        }
      }, totalDelay + (step.delay || 0));
      totalDelay += step.duration + (step.delay || 0);
    });
  }

  return {
    animate,
    animateCSS,
    animateFromTo,
    select,
    fadeIn,
    slideUp,
    bounce,
    timeline,
    easings,
    stopAll() {
      activeAnimations.forEach(ctrl => ctrl.stop());
      activeAnimations = [];
    }
  };
})();

module.exports = animate;
