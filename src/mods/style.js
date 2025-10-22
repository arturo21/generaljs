export function methods(el) {
  return {
    css(property, value) {
      if (typeof property === 'string' && value !== undefined) {
        el.style[property] = value;
        return this;
      }
      if (typeof property === 'object') {
        Object.entries(property).forEach(([key, val]) => {
          el.style[key] = val;
        });
        return this;
      }
      if (typeof property === 'string') {
        return getComputedStyle(el)[property];
      }
    },
    setOpacity(value) {
      el.style.opacity = value;
      return this;
    }
  };
}
