// Logging
export function glog(msg) {
  console.log(msg);
}

// Element resolution
export function getelem(ref) {
  if (typeof ref === 'string') {
    return document.querySelector(ref);
  }
  if (ref instanceof HTMLElement) {
    return ref;
  }
  return null;
}

export function getelems(ref) {
  if (typeof ref === 'string') {
    return document.querySelectorAll(ref);
  }
  return [];
}

// Type detection
export function getobjtype(ref) {
  if (typeof ref === 'string') {
    if (ref.startsWith('#')) return 'id';
    if (ref.startsWith('.')) return 'class';
    return 'element';
  }
  return null;
}

// Animation helpers
export function getAnimationEvent() {
  const el = document.createElement('fakeelement');
  const animations = {
    animation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'animationend',
    OAnimation: 'oanimationend',
    MSAnimation: 'MSAnimationEnd'
  };
  for (const key in animations) {
    if (el.style[key] !== undefined) return animations[key];
  }
  return 'animationend';
}

export function getTransitionEvent() {
  const el = document.createElement('fakeelement');
  const transitions = {
    transition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd'
  };
  for (const key in transitions) {
    if (el.style[key] !== undefined) return transitions[key];
  }
  return 'transitionend';
}

export function getBrowserPrefix() {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'webkit';
  if (ua.includes('Firefox')) return 'moz';
  if (ua.includes('Safari')) return 'webkit';
  if (ua.includes('Opera')) return 'o';
  if (ua.includes('MSIE') || ua.includes('Trident')) return 'ms';
  return '';
}

export function setAnimationDuration(el, seconds) {
  const prefix = getBrowserPrefix();
  el.style[`${prefix}AnimationDuration`] = `${seconds}s`;
}

// Easing function
export function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

// DOM wrapping
export function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

// Error utility
export function setError(name, message = '') {
  const error = new Error(message);
  error.name = name;
  error.stack = error.stack;
  return error;
}
