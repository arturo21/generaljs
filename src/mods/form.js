export function methods(el) {
  return {
    getFiles() {
      if (el.tagName === 'INPUT' && el.type === 'file') {
        return el.files;
      }
      return null;
    },

    resetText() {
      el.value = '';
      return this;
    },

    intval() {
      return parseInt(el.value);
    },

    floatval() {
      return parseFloat(el.value);
    }
  };
}