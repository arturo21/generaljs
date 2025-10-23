/*
  Copyright (C) 2025 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.
  Licencia MIT
*/

const bind = (function () {
  const bindings = new Map();
  const formatters = new Map();
  const validators = new Map();
  const listeners = new Map();
  const classMaps = new Map();
  const styleMaps = new Map();
  const channels = new Map();
  const storageKeys = new Map();
  const locks = new Set();
  const guards = new Map();
  const lists = new Map();

  function updateElements(key, value) {
    const elements = bindings.get(key);
    const formatter = formatters.get(key);
    const displayValue = formatter ? formatter(value) : value;

    if (elements) {
      elements.forEach(el => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
          el.value = displayValue;
        } else {
          el.textContent = displayValue;
        }

        const map = classMaps.get(key);
        if (map) {
          Object.values(map).forEach(cls => el.classList.remove(cls));
          if (map[value]) el.classList.add(map[value]);
        }

        const styleFn = styleMaps.get(key);
        if (styleFn) {
          const styles = styleFn(value);
          Object.entries(styles).forEach(([prop, val]) => {
            el.style[prop] = val;
          });
        }
      });
    }

    if (listeners.has(key)) {
      listeners.get(key).forEach(fn => fn(displayValue));
    }

    const store = storageKeys.get(key);
    if (store === 'local') localStorage.setItem(key, JSON.stringify(value));
    if (store === 'session') sessionStorage.setItem(key, JSON.stringify(value));
  }

  function bindElement(el, key, model) {
    if (!bindings.has(key)) bindings.set(key, new Set());
    bindings.get(key).add(el);
    updateElements(key, model[key]);

    el.addEventListener('input', () => {
      if (locks.has(key)) return;
      const guardFn = guards.get(key);
      if (guardFn && !guardFn()) return;

      const validator = validators.get(key);
      const value = el.value;
      if (!validator || validator(value)) {
        model[key] = value;
        el.classList.remove('is-invalid');
      } else {
        el.classList.add('is-invalid');
      }
    });
  }

  function createModel(initial = {}) {
    const proxy = new Proxy(initial, {
      set(target, key, value) {
        target[key] = value;
        updateElements(key, value);
        return true;
      }
    });
    return proxy;
  }

  return {
    model(initialValues) {
      return createModel(initialValues);
    },

    bind(el, key, model) {
      bindElement(el, key, model);
    },

    auto(model) {
      document.querySelectorAll('[data-bind]').forEach(el => {
        const key = el.getAttribute('data-bind');
        if (key && key in model) bindElement(el, key, model);
      });
    },

    format(key, fn) {
      formatters.set(key, fn);
    },

    validate(key, fn) {
      validators.set(key, fn);
    },

    onChange(key, callback) {
      if (!listeners.has(key)) listeners.set(key, new Set());
      listeners.get(key).add(callback);
    },

    class(key, map) {
      classMaps.set(key, map);
    },

    style(key, fn) {
      styleMaps.set(key, fn);
    },

    sync(key, type = 'local') {
      storageKeys.set(key, type);
    },

    restore(model) {
      Object.keys(model).forEach(key => {
        if (localStorage.getItem(key)) model[key] = JSON.parse(localStorage.getItem(key));
        else if (sessionStorage.getItem(key)) model[key] = JSON.parse(sessionStorage.getItem(key));
      });
    },

    subscribe(key, topic) {
      if (!channels.has(topic)) channels.set(topic, new Set());
      channels.get(topic).add(key);
    },

    broadcast(topic, value) {
      const keys = channels.get(topic);
      if (keys) keys.forEach(key => updateElements(key, value));
    },

    remote(key, url) {
      fetch(url)
        .then(res => res.json())
        .then(data => updateElements(key, data[key]))
        .catch(err => console.error(`Error remoto [${key}]:`, err));
    },

    push(key, url) {
      const el = bindings.get(key)?.values().next().value;
      if (!el) return;
      const value = el.value;
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: value })
      }).catch(err => console.error(`Error al enviar [${key}]:`, err));
    },

    lock(key) {
      locks.add(key);
    },

    unlock(key) {
      locks.delete(key);
    },

    guard(key, fn) {
      guards.set(key, fn);
    },

    form(formElement, model) {
      formElement.querySelectorAll('[name]').forEach(el => {
        const key = el.name;
        if (key in model) bindElement(el, key, model);
      });
    },

    submit(formElement, callback) {
      formElement.addEventListener('submit', e => {
        e.preventDefault();
        const data = {};
        formElement.querySelectorAll('[name]').forEach(el => {
          data[el.name] = el.value;
        });
        callback(data);
      });
    },

    list(key, container, renderFn) {
      lists.set(key, { container, renderFn });
    },

    repeat(selector, key) {
      const template = document.querySelector(selector);
      if (!template) return;
      const parent = template.parentElement;
      template.remove();

      lists.set(key, {
        container: parent,
        renderFn: item => {
          const clone = template.cloneNode(true);
          clone.querySelectorAll('[data-bind]').forEach(el => {
            const prop = el.getAttribute('data-bind');
            el.textContent = item[prop];
          });
          return clone;
        }
      });
    }
  };
})();

module.exports = bind;
