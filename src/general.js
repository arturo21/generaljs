/*
  Copyright (C) 2025 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/
/*Integrado GDOM para el manejo del DOM / eventos / AJAX */
/*Este archivo lo necesita Function SMOOTH SCROLL*/
let cripto=require("./mods/gcrypto.js");
let fetchapi=require("./mods/fetchapi.js");
let ajaxapi=require("./mods/ajaxapi.js");
let ww=require("./mods/webworkers.js");
let ws=require("./mods/websockets.js");
let storage=require("./mods/cookies.js");
let ytapi=require("./mods/ytapi.js");
let bind=require("./mods/databind.js");
let components = require("./mods/components.js");
let g = require("./mods/gdom.min.js");
let numapps=0;
let elementactive="html";
let varsint=[{}];
let nameapp="appdata"+numapps;
let scopenom="genrlapp-" + Math.floor(Math.random() * 27);
const genrl = (() => {
  const watchers = new WeakMap();

  return {
    watch,
    unwatch,
    run
  };
})();

//CLASE GENERAL - GENRL
genrl = (function (global) {
  const _logStore = [];
  const html = document.documentElement;
  let numapps = 0;
  let nameapp = "appdata" + numapps;
  let scopenom = "genrlapp-" + Math.floor(Math.random() * 27);

  // 🔒 Privadas
  function isFunction(fn) {
    return typeof fn === 'function';
  }
  function isObject(obj) {
    return obj !== null && typeof obj === 'object';
  }
  function isArray(arr) {
    return Array.isArray(arr);
  }
  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  }
  function getxhr() {
    return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  }

  // 🔓 API público
  const genrl = {
    extend(name, method) {
      if (typeof name === 'string' && isFunction(method)) {
        genrl[name] = function (...args) {
          const result = method.apply(genrl, args);
          return result === undefined ? genrl : result;
        };
      }
      return genrl;
    },
    fn(name) {
      const method = genrl[name];
      return isFunction(method) ? method.bind(genrl) : undefined;
    },
    // 🔌 Registro de plugins con inicialización
    use(plugin, options = {}) {
      if (typeof plugin !== 'function') {
        console.warn('Plugin debe ser una función');
        return;
      }

      const name = plugin.name || `plugin_${Object.keys(plugins).length + 1}`;
      if (plugins[name]) {
        console.warn(`Plugin "${name}" ya fue registrado`);
        return;
      }

      const result = plugin(General, options);
      plugins[name] = result || true;
    },
    // 🧩 Acceso a plugins registrados
    plugins() {
      return Object.keys(plugins);
    }
  };

  genrl.fn.extend = function (name, method) {
    if (typeof name === 'string' && isFunction(method)) {
      genrl[name] = function (...args) {
        const result = method.apply(genrl, args);
        return result === undefined ? genrl : result;
      };
    }
    return genrl;
  };

	  Object.assign(genrl, {
	    // 🔧 Inicialización
	    init() {
	      genrl.createScope();
	      return genrl;
	    },
	    createScope() {
	      html.setAttribute("id", nameapp);
	      html.setAttribute("name", nameapp);
	      html.setAttribute("data-scope", scopenom);
	      html.setAttribute("data-gapp", scopenom);
	      html.classList.add("app-scope", `scope-${scopenom}`);
	      numapps++;
	      return genrl;
	    },
	    setScope(nombre = "general") {
	      html.setAttribute("data-scope", nombre);
	      html.classList.remove(...Array.from(html.classList).filter(c => c.startsWith("scope-")));
	      html.classList.add(`scope-${nombre}`, "app-scope");
	      return genrl;
	    },
	    getScope() {
	      return html.getAttribute("data-scope");
	    },
	    hasScope(nombre) {
	      return genrl.getScope() === nombre;
	    },

	    // 🔧 DOM y eventos
	    run(fn) {
	      if (document.readyState === "complete" || document.readyState === "interactive") {
	        if (isFunction(fn)) fn();
	      } else {
	        document.addEventListener("DOMContentLoaded", () => {
	          if (isFunction(fn)) fn();
	        });
	      }
	      return genrl;
	    },
	    ready(fn) {
	      return genrl.run(fn);
	    },
	    docready(fn) {
	      return genrl.run(fn);
	    },
	    getxhr,
	    ajax() {
	      return getxhr();
	    },
	    // 🔧 Seguridad
	    safeEval(fn) {
	      if (isFunction(fn)) {
	        try { fn(); } catch (e) { console.error("safeEval error:", e); }
	      }
	      return genrl;
	    },
	    // 🔧 Consola
	    log(msg) {
	      console.log(msg);
	      return genrl;
	    },
	    warn(msg) {
	      console.warn(msg);
	      return genrl;
	    },
	    info(msg) {
	      console.info(msg);
	      return genrl;
	    },
	    error(msg) {
	      console.error(msg);
	      return genrl;
	    },

	    // 🔧 Navegación
	    lhref(url) {
	      location.href = url;
	      return genrl;
	    },
	    lreplace(url) {
	      location.replace(url);
	      return genrl;
	    },

	    // 🔧 Codificación
	    encodeuri(url) {
	      return url.split(" ").join("+");
	    },
	    base64_encode(str) {
	      return btoa(str);
	    },
	    base64_decode(str) {
	      return atob(str);
	    },
	    utf8_encode(str) {
	      return unescape(encodeURIComponent(str));
	    },
	    utf8_decode(str) {
	      return decodeURIComponent(escape(str));
	    },

	    // 🔧 JSON y HTML
	    parseJSON(json) {
	      return JSON.parse(json);
	    },
	    stringifyJSON(obj) {
	      return JSON.stringify(obj);
	    },
	    parseHTML(htmlstr) {
	      const tmp = document.implementation.createHTMLDocument();
	      tmp.body.innerHTML = htmlstr;
	      return tmp.body.children;
	    },

	    // 🔧 Arrays y objetos
	    map(arr, cb) {
	      if (isArray(arr)) arr.map(cb);
	      return genrl;
	    },
	    each(obj, cb) {
	      if (isObject(obj)) {
	        try { obj.forEach(cb); } catch { [obj].forEach(cb); }
	      }
	      return genrl;
	    },
	    slice(arr, start, end, cb) {
	      if (isArray(arr)) cb(arr.slice(start, end));
	      return genrl;
	    },
	    inArray(arr, val) {
	      return arr.indexOf(val);
	    },
	    indexOf(arr, val) {
	      return arr.indexOf(val);
	    },
	    makeArray(pseudo) {
	      return [].slice.call(pseudo);
	    },

	    // 🔧 Entrada
	    getKey(e) {
	      return e.keyCode || e.charCode;
	    },
	    getChar(e) {
	      return String.fromCharCode(genrl.getKey(e));
	    },
	    blockChar(e) {
	      const c = genrl.getChar(e);
	      return genrl.isNumeric(c) ? "Solo letras permitidas" : genrl;
	    },
	    bloqNum(e) {
	      const c = genrl.getChar(e);
	      return !genrl.isNumeric(c) ? "Solo números permitidos" : genrl;
	    },
	    isNumeric(n) {
	      return !isNaN(parseFloat(n)) && isFinite(n);
	    },
	    trim(str) {
	      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	    },

	    // 🔧 Validación y sanitización
	    validate: {
	      email: validateEmail,
	      url: validateURL
	    },
	    sanitize: {
	      html: escapeHTML,
	      text: str => str.replace(/[^\w\s]/gi, ''),
	      json: obj => {
	        try { return JSON.parse(JSON.stringify(obj)); } catch { return null; }
	      }
	    },
	    // 🔧 Utilidades
	    uuid() {
	      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
	        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	      );
	    },
	    timestamp() {
	      return new Date().toISOString();
	    },
	    now() {
	  		return Math.floor(Math.abs(performance.now()));
	    },
	    nowFloat() {
	      return performance.now();
	    },
		// 🔍 Define propiedad reactiva
		defineReactive(obj, prop, path = [prop]) {
			let value = obj[prop];

			// Si es objeto, observar profundamente
			if (value && typeof value === 'object') {
			  observeDeep(value, path);
			}

			Object.defineProperty(obj, prop, {
			  get() {
			    return value;
			  },
			  set(newVal) {
			    const oldVal = value;
			    value = newVal;

			    // Si nuevo valor es objeto, observarlo
			    if (newVal && typeof newVal === 'object') {
			      observeDeep(newVal, path);
			    }

			    triggerWatchers(obj, path.join('.'), newVal, oldVal);
			  },
			  configurable: true,
			  enumerable: true
			});
		},
		// 🔁 Observación profunda recursiva
		observeDeep(obj, basePath = []) {
			Object.keys(obj).forEach(key => {
			  defineReactive(obj, key, [...basePath, key]);
			});
		},
		// 🧠 Ejecuta callbacks registrados
		triggerWatchers(obj, fullPath, newVal, oldVal) {
			const map = watchers.get(obj);
			if (!map) return;

			Object.keys(map).forEach(path => {
			  if (fullPath.startsWith(path)) {
			    map[path].forEach(fn => fn(newVal, oldVal, fullPath));
			  }
			});
		},
		// ✅ Registrar observador
		watch(obj, path, callback) {
			if (!watchers.has(obj)) {
			  watchers.set(obj, {});
			}
			const map = watchers.get(obj);
			if (!map[path]) {
			  map[path] = [];
			}
			map[path].push(callback);

			// Activar observación profunda si es necesario
			const keys = path.split('.');
			let target = obj;
			for (let i = 0; i < keys.length - 1; i++) {
			  target = target[keys[i]];
			  if (!target || typeof target !== 'object') return;
			}
			defineReactive(target, keys[keys.length - 1], keys);
		},
		// ❌ Eliminar observador
		unwatch(obj, path) {
		const map = watchers.get(obj);
		if (map && map[path]) {
		  delete map[path];
		}
	}
});

  return genrl;
})(window);

////////PROTOTIPOS//////////
genrl.__proto__.extend_=function(callback){
	//extiende las funcionalidades de la librería mediante la función interna extend
	genrl.fn.extend(genrl,callback);
};
genrl.__proto__.watch_=function(objeto,attrib,callback){
	//funcion Watch
	DOMelement=g.getelem(objeto);
	watch(DOMelement,attrib,callback);
};
genrl.__proto__.unwatch_=function(objeto,attrib,callback){
	//Funcion Unwatch
	DOMelement=g.getelem(objeto);
	unwatch(DOMelement,attrib,callback);
};
genrl.__proto__.ajax=function(){
	let sock;
	sock=genrl.getxhr();
	return sock;
};
genrl.__proto__.isReady=function(){
	if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		return 1;
	}
	else{
		return 0;
	}
}
genrl.__proto__.empty=function(string){
	if(typeof string==='string'){
		if(string==""){
			return;
		}
		else{
			return -1;
		}
	}
	else{
		return -1;
	}
};
genrl.__proto__.getelem=function(id){
	let objeto;
	if(typeof id==='string'){
		objeto=document.querySelector(id);
		if(typeof objeto==='object'){
			return objeto;
		}
	}
};
genrl.__proto__.getelems=function(tag){
	let arrtags=[];
	if(tag!=undefined){
		arrtags=document.querySelectorAll(tag);
		return arrtags;
	}
	else{
		return -1;
	}
};
genrl.extend({ cripto });
genrl.extend({ ww });
genrl.extend({ ws });
genrl.extend({ storage });
genrl.extend({ fetchapi });
genrl.extend({ ajaxapi });
genrl.extend({ ytapi });
genrl.extend({ components });
genrl.extend({ bind });
genrl.extend({ g });
genrl.init();
module.exports=g;
