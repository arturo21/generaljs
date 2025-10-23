import { watch, unwatch, callWatchers } from 'watchjs';

export function methods(el) {
  return {
    watch(prop, callback) {
      watch(el, prop, callback);
      return this;
    },
    unwatch(prop) {
      unwatch(el, prop);
      return this;
    },
    callWatchers(prop) {
      callWatchers(el, prop);
      return this;
    }
  };
}
