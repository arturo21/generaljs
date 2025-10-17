<h1 align="center">⚙️ General.JS v2</h1>

<p align="center">
  <strong>Librería JavaScript modular, encadenable y extensible para soluciones de alto rendimiento</strong><br>
  <em>DOM, eventos, AJAX, WebSockets, WebWorkers, rutas, componentes, ámbitos, extensiones y más</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue.svg" alt="Versión v2">
  <img src="https://img.shields.io/badge/status-activo-brightgreen.svg" alt="Estado del proyecto">
  <img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="Licencia MIT">
</p>

---

## 🚀 ¿Qué es General.JS?

**General.JS v2** es una librería JavaScript ligera, modular y sin dependencias externas. Refactorizada con el patrón Module Revealed, permite encadenamiento fluido, extensión dinámica, integración con Web Components y control total sobre el DOM, eventos, rutas, ámbitos y comunicación asincrónica.

---

## ✨ Novedades en v2

- 🔧 Patrón Module Revealed para encapsulación segura
- 🔗 Encadenamiento fluido (`genrl.metodo1().metodo2()`)
- 🧩 `setScope(nombre)` y `createScope()` para definir ámbitos de aplicación
- 🔐 `safeEval(fn)` para ejecución segura de funciones
- 🕒 `now()` devuelve tiempo como entero positivo
- 🧱 Métodos DOM integrados con `gdom`: `createElem`, `appendTo`, `on`, `html`, `attr`, `addClass`, `remove`
- 🧬 Módulo `components` extendido con `register`, `addcomponent`, `loadAll`, `mount`, `unmount`, `setDefaults`
- 📦 Registro dinámico de Web Components con plantillas externas
- 🧠 Métodos utilitarios: `uuid`, `timestamp`, `sanitize`, `validate`, `logEvent`, `getLog`, `clearLog`

---

| 🧩 Característica                          | 📘 Descripción                                                                 |
|-------------------------------------------|--------------------------------------------------------------------------------|
| Patrón Module Revealed                    | Encapsula funciones privadas y expone solo lo necesario para mayor seguridad. |
| Encadenamiento fluido                     | Todos los métodos retornan `this` o el módulo, permitiendo llamadas encadenadas. |
| Métodos extendidos                        | Nuevos métodos como `setScope`, `createScope`, `safeEval`, `now`, `uuid`, `timestamp`. |
| Integración con gdom                      | Métodos como `createElem`, `appendTo`, `on`, `html`, `attr`, `addClass`, `remove`. |
| Registro y montaje dinámico de componentes| `register`, `addcomponent`, `loadAll`, `mount`, `unmount`, `setDefaults`.       |
| Seguridad mejorada                        | Reemplazo de `eval()` por `safeEval()`, validaciones de tipo y control de errores. |
| Nuevas utilidades y validaciones          | Validadores (`email`, `url`), sanitizadores (`html`, `text`, `json`), y herramientas de consola. |


## 📦 Instalación

```bash
npm i gnrl.js
```

## Ejemplo de Inicialización
```js
genrl.run(() => {
  genrl
    .createScope()
    .setScope("editorial")
    .theme("claro")
    .log("Ámbito y tema establecidos");
});
```

## Registro de Web Components con plantilla externa
```js
components
  .register("mi-ficha", class extends HTMLElement {
    connectedCallback() {
      // El contenido se insertará desde ficha.html
    }
  })
  .addcomponent("mi-ficha", "ficha.html", (template) => {
    const instance = document.createElement("mi-ficha");
    instance.appendChild(template.content.cloneNode(true));
    document.querySelector("#contenedor").appendChild(instance);
  });
```

## Métodos Nuevos
```js
genrl.setScope("pedagogico");
genrl.safeEval(() => console.log("Ejecutando código seguro"));
genrl.now(); // → número entero positivo
genrl.extend("saludar", () => console.log("¡Hola Arturo!")).saludar();
```