export function methods(el) {
  return {
    is(other) {
      return el === other;
    },
    matches(selector) {
      return el.matches(selector);
    },
    filter(fn) {
      return Array.prototype.filter.call([el], fn);
    }
  };
}
