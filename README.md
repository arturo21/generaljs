# general.js

**JS Library to improve your web**
 
JS Library that handles DOM / Events - DOM / AJAX - FETCH / WebSockets-Webworkers / Watch - UnWatch / Crypto / expansible 

## How to init the library
```javascript
	genrl.docready(function(){
		//write code below
	});
```

## Log something to JS console
```javascript
	genrl.log("Hello World");
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
	g("#getbtn").click(function(){
		fetchobj
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
	g("#getjbtn").click(function(){
		fetchobj
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
	g("#loadbtn").click(function(){
		fetchobj
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
	g("#namebtn").click(function(){
		let strdata={'nombre':'arturo'};
		datos=strdata;
		fetchobj
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
	g('#archivo').change(function(e){
		console.log("Cambió el campo");
		dataf=g('#archivo').getFiles();
	});
	g("#filebtn").click(function(){
		let fdata = new FormData();
		fdata.append("file", dataf[0]);
		fetchobj
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
		g.dom("#holap").smooth("#adiosp",{
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

Use the Source...

The Source be with you...
