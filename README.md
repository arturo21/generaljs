<h1 align="center">⚙️ General.JS</h1>

<p align="center">
  <strong>Librería JavaScript para soluciones de alto rendimiento</strong><br>
  <em>DOM, eventos, AJAX, WebSockets, WebWorkers, rutas, componentes, extensiones y más</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Versión estable">
  <img src="https://img.shields.io/badge/status-activo-brightgreen.svg" alt="Estado del proyecto">
  <img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="Licencia MIT">
</p>

---

## 🚀 ¿Qué es General.JS?

**General.JS** es una librería JavaScript ligera, extensible y sin dependencias externas. Diseñada para desarrolladores que buscan rendimiento, modularidad y control total sobre el DOM, eventos, rutas, componentes y comunicación asincrónica.

---

## ✨ Características destacadas

| 🧩 Módulo             | ⚡ Funcionalidad |
|----------------------|------------------|
| 📦 DOM               | Selección, manipulación, atributos, clases, estilos |
| 🔁 Eventos           | `on`, `click`, `change`, `hover`, `animate`, `toggle` |
| 🌐 AJAX / FETCH      | `get`, `post`, `upload`, `load`, `getJSON`, `fetchapi` |
| 🧠 WebWorkers        | Procesos en segundo plano |
| 📡 WebSockets        | Comunicación en tiempo real |
| 🧬 Componentes       | Web Components con templates encapsulados |
| 🛣️ Rutas             | Sistema de rutas con `map` y `listen` |
| 🧰 Extensiones       | `extend` público, privado y por selector |
| 🔒 Crypto            | Utilidades criptográficas integradas |
| 📁 Archivos          | Lectura, carga y subida de archivos |
| 🎯 Scroll suave      | `smooth()` con duración, offset y callback |
| 🧪 Devtools          | `log`, `warn`, `info`, `error` para consola JS |

---

## 📦 Instalación

### Desde NPM
```bash
npm i gnrl.js

## How to init the library
```javascript
	genrl.run(function(){
		//write code below
	});
```

## Create a Web Component
```javascript
	component=genrl.components;
	component.addcomponent("my-counter","template.html", function(template,data){
		class MyCounter extends HTMLElement {
			constructor() {
				super();
				this.count = 0;
				this.attachShadow({ mode: 'open' });
			}
			connectedCallback() {
				this.shadowRoot.appendChild(template.content.cloneNode(true));
				this.shadowRoot.getElementById('inc').onclick = () => this.inc();
				this.shadowRoot.getElementById('dec').onclick = () => this.dec();
				this.update(this.count);
			}
			inc() {
				this.update(++this.count);
			}
			dec() {
				this.update(--this.count);
			}
			update(count) {
				this.shadowRoot.getElementById('count').innerHTML = count;
			}
		}
		component.register("my-counter",MyCounter);
	});
```

### Call Web Component created
```html
	<my-counter></my-counter>
```

## How to getElement Object
```javascript
	g("#element").getEl();
```

```javascript
	g(".element").getEl();
```

## How to select a DOMElement 
```javascript
	g("#element");
```

```javascript
	g(".element");
```


## Create a Toggle Button to change classname
```javascript
	g("#campoeval").on('change',function(){
		if(g("#campoconclase").hasClass("is-hidden")==true){
			g("#campoconclase").removeClass("is-hidden");
		}
		else{
			g("#campoconclase").addClass("is-hidden")
		}
	});
```

## Working with data-values
### setData
```javascript
	g("#campoeval").on('change',function(){
		g("#campoeval").setData("idproducto",idproducto);
	});
```

### getData
```javascript
	g("#campoeval").on('change',function(){
		let idprod=g("#campoeval").getData("idproducto");
	});
```

### rmData
```javascript
	g("#campoeval").on('change',function(){
		g("#campoeval").rmData("idproducto");
	});
```

## How to read an object
```javascript
genrl.each(h,function(x,index){
	genrl.log("RESULTADO");
	genrl.log(x.nombre);
	genrl.log(index);
})
```

## How to set CSS attributes
```javascript
g("#element").css({
	'height': '400px',
	'width': '200px',
	'opacity': '1'
});
```
## Bind an event
```javascript
g("#btnmover").click(function(){
	g("#div_A").animate('bounce',5000,function(){
		genrl.log("Se ha activado el callBack");
	});
});
```
## How to get an attribute of a DOMElement
```javascript
	idelement=g("#element").getAttrb("id");
```

## How to set an attribute of a DOMElement
```javascript
	g("#element").setAttrb("attribRandom","test");
```

## Get element children
```javascript
	g("#element").children();
```

## Get element child number N
```javascript
	g("#element").child(N);
```

## Evaluates a Function
```javascript
	genrl.eval(function(){
		alert("Hola Mundo!");
	});
```

## Evaluates a Text as JS Function
```html
	data='<script id="scripttag">alert("HOLA");</script>';
```

```javascript
	g("#scripttag").eval(data);
```

## URL ROUTES
```javascript
	genrl.path.map("#/prueba").to(function(){
		g("#cargadiv").load("README.md",function(){
			genrl.log("Módulo cargado.");
		});
	});
	genrl.path.listen();
```

## Get fileList from file input when it changes
### archivo is a file input
```javascript
	g('#archivo').change(function(e){
		genrl.log("Cambió el campo");
		dataf=g('#archivo').getFiles();
	});
```

## AJAX Calls
### GET + Callback
```javascript
	let ajaxobj=genrl.ajaxapi;
	g("#getbtn").click(function(){
		ajaxobj
		.get("general.js/README.md")
		.then(function(data){
			genrl.log("DATA: " + data);
			g("#titulo_widget").html("RESULTADO:");
			g("#mensajes").html(data);
		})
		.catch(function(e){	
			genrl.log("ERROR:" + e);
		})
	});
```
### GET JSON + Callback
```javascript
	let ajaxobj=genrl.ajaxapi;
	g("#getjbtn").click(function(){
		ajaxobj
		.getJSON("http://localhost/general.js/config.json")
		.then(function(data){
			genrl.log("DATA: " + data);
			g("#titulo_widget").html("RESULTADO:");
			g("#mensajesb").html(data);
		})
		.catch(function(e){	
			genrl.log("ERROR:" + e);
		})
	});
```
## Load asinchronous + Callback
```javascript
	let ajaxobj=genrl.ajaxapi;
	g("#loadbtn").click(function(){
		ajaxobj
		.load("http://localhost/general.js/README.md")
		.then(function(data){
			genrl.log("DATA: " + data);
			g("#titulo_widget").html("RESULTADO:");
			g("#mensajesa").html(data);
		})
		.catch(function(e){	
			genrl.log("ERROR:" + e);
		})
	});
```

### Asynchronous POST for General.JS 
#### Client Side
```javascript
	let ajaxobj=genrl.ajaxapi;
	g("#namebtn").click(function(){
		let strdata={'nombre':'arturo'};
		datos=strdata;
		ajaxobj
		.post("socketd.php",datos)
		.then(function(data){
			genrl.log("DATA RECIBIDA: ");
			genrl.log(data);
			g("#titulo_widget").html("RESULTADO:");
			g("#mensajesa").html(data);
		})
		.catch(function(e){	
			genrl.log("ERROR:" + e);
		})
	});
```

### Asynchronous Files UPLOAD for General.JS 
#### Client Side
```javascript
	let ajaxobj=genrl.ajaxapi;
	g('#archivo').change(function(e){
		genrl.log("Cambió el campo");
		dataf=g('#archivo').getFiles();
	});
	g("#filebtn").click(function(){
		let fdata = new FormData();
		fdata.append("file", dataf[0]);
		ajaxobj
		.upload("uploadfile.php",fdata)
		.then(function(data){
			g("#titulo_widget").html("RESULTADO:");
			g("#mensajesb").html(data);
		})
		.catch(function(e){	
			genrl.log("ERROR:" + e);
		})
	});
```
#### Server Side
```php
<?php
	session_start();
    if (move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/".$_FILES['file']['name'])) {
        //more code here...
        echo("uploads/".$_FILES['file']['name']);
    }
?>
```

## Smooth scrolling
```javascript
	g("#holap").click(function(){
		g("#holap").smooth("#adiosp",{
			duration:'10000',
			offset: 0,
			callback: function(){
				g.log("Scroll finalizado");
			}
		});
	});
```

### Asynchronous JS FETCH API
```javascript
	genrl.log("*****FETCH API*****");
	var fapi=genrl.fetchapi.getFetch();
	if(fapi){
		g.log("FETCH API ha sido cargada exitosamente!");
		g.log("***************************************");
		var dataSrc={};
		dataSrc={
			method:'fetch',
			name:"arturo",
			lastname:"vasquez"
		}
		fapi.post(
			"socket_fetch.php",
			dataSrc,
			function(data){
				genrl.log("DATA FETCH");
				genrl.log(data);
			}
		);
		fapi.get(
			"example.json",
			function(data){
				var datappal;
				var datos;
				genrl.log("DATA FETCH GET");
				genrl.log(data);
				datappal=data.data;
				genrl.log("PERSONA");
				genrl.log(datappal.persona);
				var datos=datappal.persona;
				genrl.log(datos.ciudad);
				genrl.log("**************");
				genrl.log(datos.nombre);
				genrl.log("**************");
				genrl.log(datos.apellido);
			}
		);
	}
```

## How to extend the library
### Creates a new function
```javascript
	genrl.extend({
		myfunction:function(options){
			//write code below
		});
	});
```

### Use new function 
```javascript
	genrl.myfunction(options);
```

### Creates a new function
```javascript
	g("#MyContent").extend({
		myfunction:function(options){
			//write code below
		});
	});
```

### Use new function 
```javascript
	g("#MyContent").myfunction(options);
```

## How to extend the library (private functions)
### Creates a new function
```javascript
	genrl.fn.extend({
		myfunction:function(options){
			//write code below
		});
	});
```

### Use new function 
```javascript
	genrl.fn.myfunction(options);
```

## Log something to JS console
```javascript
	genrl.log("Hello World");
```

## Warning something to JS console
```javascript
	genrl.warn("Hello World");
```

## Info something to JS console
```javascript
	genrl.info("Hello World");
```

## Error something to JS console
```javascript
	genrl.error("Hello World");
```

### Use the Source...

### The Source be with you...

## Si deseas colaborar, haz clic en el enlace abajo:
## if do you like to to collab, you can do it by clicking the link below:
## --Paypal-- 
[![paypal-btn-image-pay](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/paypalme/avsolucionesweb)
