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

| 🧩 Función                          | 📘 Descripción                                                                 |
|-----------------------------------|--------------------------------------------------------------------------------|
| Module Revealed                   | Encapsula funciones privadas y expone solo lo necesario.                      |
| Encadenamiento fluido             | Todos los métodos retornan `this` o el módulo para llamadas encadenadas.      |
| setScope(nombre)                  | Define el ámbito activo en el DOM (`data-scope`).                             |
| createScope()                     | Inicializa atributos `id`, `name`, `data-scope`, `data-gapp` en `<html>`.     |
| safeEval(fn)                      | Ejecuta funciones de forma segura (sin `eval()` inseguro).                    |
| now()                             | Devuelve tiempo de ejecución como entero positivo.                            |
| uuid() / timestamp()              | Genera identificadores únicos y marcas de tiempo ISO.                         |
| validate / sanitize               | Validación de email, URL y sanitización de HTML, texto y JSON.               |
| logEvent(), getLog(), clearLog() | Registro interno de eventos para depuración.

### Submódulo Components

| 🧩 Función                          | 📘 Descripción                                                                 |
|-----------------------------------|--------------------------------------------------------------------------------|
| register(tag, class)              | Registra un Web Component personalizado.                                      |
| addcomponent(tag, url, cb, opts)  | Carga plantilla externa y la asocia al componente.                            |
| loadAll(manifest)                 | Carga múltiples componentes desde un manifiesto.                              |
| mount(tag, selector)              | Inserta el componente en el DOM.                                              |
| unmount(tag)                      | Elimina instancias del componente del DOM.                                    |
| setDefaults(opts)                 | Define estilos y atributos comunes para todos los componentes.                |
| isRegistered(tag)                 | Verifica si un componente ya fue registrado.                                  |


### Submódulo AjaxAPI

| 🧩 Función                          | 📘 Descripción                                                                 |
|-----------------------------------|--------------------------------------------------------------------------------|
| get(url)                          | Realiza una petición GET.                                                     |
| getJSON(url)                      | Realiza una petición GET y parsea JSON.                                       |
| post(url, data)                   | Envía datos por POST.                                                         |
| upload(url, FormData)             | Sube archivos mediante POST asincrónico.                                      |
| load(url)                         | Carga contenido externo en el DOM.                                            |

### Submódulo bind

| 🧩 Función                          | 📘 Descripción                                                                 |
|-----------------------------------|--------------------------------------------------------------------------------|
| setData(key, value)               | Asocia un valor a un elemento DOM.                                            |
| getData(key)                      | Recupera el valor asociado.                                                   |
| rmData(key)                       | Elimina el valor asociado.                                                    |
| bind(selector, model)            | Enlaza datos a elementos DOM dinámicamente.                                   |


### Submódulo Animate

| 🧩 Función                          | 📘 Descripción                                                                 |
|-----------------------------------|--------------------------------------------------------------------------------|
| animate(type, duration, cb)       | Aplica animaciones con duración y callback.                                   |
| smooth(target, opts)              | Realiza scroll suave hacia un objetivo.                                       |
| setAnimationDuration(el, speed)   | Establece duración de animación con prefijo de navegador.                     |


### Submódulo Cripto

| 🧩 Función                          | 📘 Descripción                                                                 |
|-----------------------------------|--------------------------------------------------------------------------------|
| base64_encode(str)                | Codifica en base64.                                                           |
| base64_decode(str)                | Decodifica base64.                                                            |
| utf8_encode(str)                  | Codifica UTF-8.                                                               |
| utf8_decode(str)                  | Decodifica UTF-8.                                                             |
### Submódulo WebSockets

| 🧩 Función                          | 📘 Descripción                                                                 |
|-----------------------------------|--------------------------------------------------------------------------------|
| connect(url)                      | Establece conexión WebSocket.                                                 |
| send(data)                        | Envía datos por WebSocket.                                                    |
| onMessage(cb)                     | Escucha mensajes entrantes.                                                   |

### Submódulo WebWorkers

| 🧩 Función                          | 📘 Descripción                                                                 |
|-----------------------------------|--------------------------------------------------------------------------------|
| createWorker(script)              | Crea un Web Worker.                                                           |
| postMessage(data)                 | Envía datos al worker.                                                        |
| onMessage(cb)                     | Escucha respuesta del worker.                                                 |
                              |
### Submódulo Routing.general

| 🧩 Función                          | 📘 Descripción                                                                 |
|-----------------------------------|--------------------------------------------------------------------------------|
| map(route).to(fn)            | Asocia una ruta hash a una función.                                           |
| listen()                     | Activa el sistema de rutas y escucha cambios.                                 |
| navigate(url)                | Navega programáticamente a una ruta.                                          |
| getCurrent()                 | Obtiene la ruta actual.                                                       |

## Métodos Nuevos
```js
genrl.setScope("pedagogico");
genrl.safeEval(() => console.log("Ejecutando código seguro"));
genrl.now(); // → número entero positivo
genrl.extend("saludar", () => console.log("¡Hola Arturo!")).saludar();
```

## 🔧 Extensibilidad de la clase genrl

| 🧩 Método de extensión       | 📘 Descripción                                                                 |
|-----------------------------|--------------------------------------------------------------------------------|
| `genrl.extend(nombre, fn)`  | Agrega una función pública directamente al objeto `genrl`.                    |
| `genrl.fn.extend(nombre, fn)` | Agrega una función privada o interna que puede ser invocada desde `genrl.fn`. |
| `g(selector).extend(nombre, fn)` | Agrega una función personalizada a un selector DOM específico.               |


## Ejemplos de uso

### 1. Extender genrl con una función pública
```js
genrl.extend("saludar", function(nombre){
  console.log("¡Hola " + nombre + "!");
  return this;
});
```

### 2. Extender genrl.fn con una función interna (recomendado para plugins)
```js
genrl.fn.extend("multiplicar", function(a, b){
  return a * b;
});

// Invocación
let resultado = genrl.fn("multiplicar")(3, 4); // → 12
```

### 3. Extender un selector DOM con una función personalizada
```js
g("#miBoton").extend("activar", function(){
  this.addClass("activo");
  console.log("Botón activado");
});

// Invocación
g("#miBoton").activar();
```

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

## Registro de Web Components básico
```js
components
  .setDefaults({
    styles: `.ficha { border-left: 4px solid #c25; padding: 1em; }`,
    attributes: { "data-tipo": "editorial" }
  })
  .loadAll([
    {
      tag: "mi-ficha",
      templateURL: "ficha.html",
      callback: (tpl) => {
        const el = document.createElement("mi-ficha");
        el.appendChild(tpl.content.cloneNode(true));
        document.body.appendChild(el);
      }
    }
  ])
  .mount("mi-ficha", "#contenedor")
  .unmount("mi-ficha");
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

## Ejemplo: Contador
```js
genrl.run(() => {
  components
    .register("contador-js", class extends HTMLElement {
      constructor() {
        super();
        this.valor = 0;
        this.attachShadow({ mode: "open" });
      }

      connectedCallback() {
        components.addcomponent("contador-js", "contador.html", (template) => {
          this.shadowRoot.appendChild(template.content.cloneNode(true));
          this.input = this.shadowRoot.getElementById("valor");
          this.btnInc = this.shadowRoot.getElementById("incrementar");
          this.btnDec = this.shadowRoot.getElementById("decrementar");

          this.btnInc.onclick = () => this.incrementar();
          this.btnDec.onclick = () => this.decrementar();
          this.actualizar();
        });
      }

      incrementar() {
        this.valor++;
        this.actualizar();
      }

      decrementar() {
        this.valor--;
        this.actualizar();
      }

      actualizar() {
        this.input.value = this.valor;
      }
    });
});
```

## Ejemplo de Uso en HTML
```html
<contador-js></contador-js>
```