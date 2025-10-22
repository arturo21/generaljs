const components = (function () {
  const registry = new Set();
  const defaults = {
    styles: "",
    attributes: {}
  };

  return {
    register(tag, webcomp) {
      if (!registry.has(tag)) {
        window.customElements.define(tag, webcomp);
        registry.add(tag);
      } else {
        console.warn(`Componente "${tag}" ya registrado`);
      }
      return this;
    },

    addcomponent(tag, templateURL, callback, options = {}) {
      const template = (typeof genrl !== 'undefined' && genrl.getCreate)
        ? genrl.getCreate('template')
        : document.createElement('template');

      const fetcher = (typeof genrl !== 'undefined' && genrl.ajaxapi)
        ? genrl.ajaxapi
        : { get: url => fetch(url).then(res => res.text()) };

      fetcher.get(templateURL)
        .then(data => {
          template.innerHTML = data;

          if (options.styles || defaults.styles) {
            const style = document.createElement('style');
            style.textContent = options.styles || defaults.styles;
            template.content.prepend(style);
          }

          if (options.attributes || defaults.attributes) {
            Object.entries({ ...defaults.attributes, ...options.attributes }).forEach(([key, val]) => {
              template.setAttribute(key, val);
            });
          }

          if (typeof callback === 'function') {
            callback(template, data);
          }
        })
        .catch(e => console.error("ERROR:", e));

      return this;
    },

    loadAll(manifest = []) {
      manifest.forEach(entry => {
        this.addcomponent(entry.tag, entry.templateURL, entry.callback, entry.options);
      });
      return this;
    },

    mount(tag, targetSelector) {
      const target = document.querySelector(targetSelector);
      if (target) {
        const el = document.createElement(tag);
        target.appendChild(el);
      } else {
        console.warn(`Elemento destino "${targetSelector}" no encontrado`);
      }
      return this;
    },

    unmount(tag) {
      document.querySelectorAll(tag).forEach(el => el.remove());
      return this;
    },

    setDefaults(options = {}) {
      if (options.styles) defaults.styles = options.styles;
      if (options.attributes) defaults.attributes = options.attributes;
      return this;
    },

    isRegistered(tag) {
      return registry.has(tag);
    }
  };
})();

module.exports=components;