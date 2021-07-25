# general.js

**JS library to do high performance solutions**
 
JS Library that handles DOM / Events - DOM / AJAX - FETCH / WebSockets-Webworkers / Watch - UnWatch / Crypto / expansible 

## Import library from CDN
```html
	<script src="https://cdn.underdevelopment.work/generaljs/general.min.js">
```

## How to init the library
```javascript
	genrl.run(function(){
		//write code below
	});
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

## How to select a DOMElement By ID
```javascript
	g("#element");
```

## How to select a DOMElement By ClassName
```javascript
	g(".element");
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
		console.log("Cambió el campo");
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
			console.log("DATA: " + data);
			g("#titulo_widget").html("RESULTADO:");
			g("#mensajes").html(data);
		})
		.catch(function(e){	
			console.log("ERROR:" + e);
		})
	});
```
### GET JSON + Callback
```javascript
	let ajaxobj=genrl.ajaxapi;
	g("#getjbtn").click(function(){
		ajaxobj
		.getJSON("http://localhost/sistemapmod/devtools/dev/general.js/config.json")
		.then(function(data){
			console.log("DATA: " + data);
			g("#titulo_widget").html("RESULTADO:");
			g("#mensajesb").html(data);
		})
		.catch(function(e){	
			console.log("ERROR:" + e);
		})
	});
```
## Load asinchronous + Callback
```javascript
	let ajaxobj=genrl.ajaxapi;
	g("#loadbtn").click(function(){
		ajaxobj
		.load("http://localhost/sistemapmod/devtools/dev/general.js/README.md")
		.then(function(data){
			console.log("DATA: " + data);
			g("#titulo_widget").html("RESULTADO:");
			g("#mensajesa").html(data);
		})
		.catch(function(e){	
			console.log("ERROR:" + e);
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
			console.log("DATA RECIBIDA: ");
			console.log(data);
			g("#titulo_widget").html("RESULTADO:");
			g("#mensajesa").html(data);
		})
		.catch(function(e){	
			console.log("ERROR:" + e);
		})
	});
```

### Asynchronous Files UPLOAD for General.JS 
#### Client Side
```javascript
	let ajaxobj=genrl.ajaxapi;
	g('#archivo').change(function(e){
		console.log("Cambió el campo");
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
			console.log("ERROR:" + e);
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
	if(fetchapi){
		g.log("FETCH API ha sido cargada exitosamente!");
		g.log("***************************************");
		var dataSrc={};
		dataSrc={
			method:'fetch',
			name:"arturo",
			lastname:"vasquez"
		}
		genrl.fetchapi.post(
			"socket_fetch.php",
			dataSrc,
			function(data){
				genrl.log("DATA FETCH");
				genrl.log(data);
			}
		);
		genrl.fetchapi.get(
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

Use the Source...

The Source be with you...
