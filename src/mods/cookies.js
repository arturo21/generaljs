/*
  Copyright (C) 2025 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.
  Licencia MIT
*/

const storage = (function () {
  let logging = false;

  function log(...args) {
    if (logging) console.log('[Storage]', ...args);
  }

  function isLocalSupported() {
    return typeof window.localStorage !== 'undefined';
  }

  function isSessionSupported() {
    return typeof window.sessionStorage !== 'undefined';
  }

  function safeParse(value) {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  return {
    // 🔧 Activar/desactivar logging
    enableLog() {
      logging = true;
    },
    disableLog() {
      logging = false;
    },

    // ✅ LocalStorage
    setLocal(key, value) {
      if (isLocalSupported()) {
        try {
          window.localStorage.setItem(key, value);
          log('setLocal', key, value);
        } catch (e) {
          console.error(e);
        }
      }
    },

    getLocal(key) {
      if (isLocalSupported()) {
        return window.localStorage.getItem(key);
      }
      throw new Error('Tu navegador no soporta LocalStorage!');
    },

    rmLocal(key) {
      if (isLocalSupported()) {
        window.localStorage.removeItem(key);
        log('rmLocal', key);
      }
    },

    hasLocal(key) {
      return isLocalSupported() && window.localStorage.getItem(key) !== null;
    },

    clearLocal() {
      if (isLocalSupported()) {
        window.localStorage.clear();
        log('clearLocal');
      }
    },

    keysLocal() {
      if (isLocalSupported()) {
        return Object.keys(window.localStorage);
      }
      return [];
    },

    sizeLocal() {
      return isLocalSupported() ? window.localStorage.length : 0;
    },

    setLocalObject(key, obj) {
      this.setLocal(key, JSON.stringify(obj));
    },

    getLocalObject(key) {
      return safeParse(this.getLocal(key));
    },

    // ✅ SessionStorage
    setSession(key, value) {
      if (isSessionSupported()) {
        window.sessionStorage.setItem(key, value);
        log('setSession', key, value);
      }
    },

    getSession(key) {
      if (isSessionSupported()) {
        return window.sessionStorage.getItem(key);
      }
      throw new Error('Tu navegador no soporta SessionStorage!');
    },

    rmSession(key) {
      if (isSessionSupported()) {
        window.sessionStorage.removeItem(key);
        log('rmSession', key);
      }
    },

    hasSession(key) {
      return isSessionSupported() && window.sessionStorage.getItem(key) !== null;
    },

    clearSession() {
      if (isSessionSupported()) {
        window.sessionStorage.clear();
        log('clearSession');
      }
    },

    keysSession() {
      if (isSessionSupported()) {
        return Object.keys(window.sessionStorage);
      }
      return [];
    },

    sizeSession() {
      return isSessionSupported() ? window.sessionStorage.length : 0;
    },

    setSessionObject(key, obj) {
      this.setSession(key, JSON.stringify(obj));
    },

    getSessionObject(key) {
      return safeParse(this.getSession(key));
    }
  };
})();

module.exports = storage;
