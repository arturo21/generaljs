export function methods(el) {
  return {
    html(content) {
      if (content !== undefined) {
        el.innerHTML = content;
        return this;
      }
      return el.innerHTML;
    },

    text(content) {
      if (content !== undefined) {
        el.textContent = content;
        return this;
      }
      return el.textContent;
    },

    val(value) {
      if (value !== undefined) {
        el.value = value;
        return this;
      }
      return el.value;
    },

    empty() {
      el.innerHTML = '';
      return this;
    },

    emptyVal() {
      el.value = '';
      return this;
    },

    addClass(cls) {
      el.classList.add(...cls.split(' '));
      return this;
    },

    removeClass(cls) {
      el.classList.remove(...cls.split(' '));
      return this;
    },

    toggleClass(cls) {
      el.classList.toggle(cls);
      return this;
    },

    hasClass(cls) {
      return el.classList.contains(cls);
    },

    attr(name, value) {
      if (value !== undefined) {
        el.setAttribute(name, value);
        return this;
      }
      return el.getAttribute(name);
    },

    removeAttr(name) {
      el.removeAttribute(name);
      return this;
    },

    prop(name, value) {
      if (value !== undefined) {
        el.setAttribute(name, value);
        return this;
      }
      return el.getAttribute(name);
    },

    data(name, value) {
      if (value !== undefined) {
        el.dataset[name] = value;
        return this;
      }
      return el.dataset[name];
    },

    srcimg(source) {
      if (el.tagName === 'IMG') {
        el.src = source;
      }
      return this;
    },

    cursor(style) {
      el.style.cursor = style;
      return this;
    },

    toggleDisplay() {
      el.style.display = el.style.display === 'none' ? '' : 'none';
      return this;
    },

    show() {
      el.style.display = 'block';
      return this;
    },

    hide() {
      el.style.display = 'none';
      return this;
    },

    resetText() {
      el.value = '';
      return this;
    },

    replaceWith(htmlString) {
      el.outerHTML = htmlString;
      return this;
    },

    clone() {
      return el.cloneNode(true);
    }
  };
}