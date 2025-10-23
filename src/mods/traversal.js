export function methods(el) {
  return {
    parent() {
      return el.parentNode;
    },

    children() {
      return Array.from(el.children);
    },

    first() {
      return el.children[0] ?? null;
    },

    last() {
      return el.children[el.children.length - 1] ?? null;
    },

    next() {
      return el.nextElementSibling ?? null;
    },

    prev() {
      return el.previousElementSibling ?? null;
    },

    closest(selector) {
      return el.closest(selector);
    },

    siblings() {
      return Array.from(el.parentNode.children).filter(child => child !== el);
    },

    index() {
      return Array.from(el.parentNode.children).indexOf(el);
    }
  };
}
