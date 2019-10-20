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
	genrl.log("Se ha activado el callBack");
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

## AJAX Calls
### GET + Callback
```javascript
	genrl.get(
	{
		id:"321654"
	},
	"socket.php",
	function(data){
		g.log("DATA: ");
		g.log(data.data);
		g.dom("#ajaxresponse").html("RESPONSE AJAX \n" + data.data);
	}
);
```
### POST + Callback
```javascript
	genrl.post(
	{
		name:"peter",
		lastname:"smitth"
	},
	"socket.php",
	function(data){
		g.log("DATA: ");
		g.log(data.data);
		g.dom("#ajaxresponse").html("RESPONSE AJAX \n" + data.data);
	}
);
```
## Load asinchronous + Callback
```javascript
	g.dom("#cargadiv").load("README.md",function(){
		g.log("Módulo cargado.");
	});
);
```
## Smooth scrolling
```javascript
	g.dom("#holap").click(function(){
		g.dom("#holap").smooth("#adiosp",{
			duration:'10000',
			offset: 0,
			callback: function(){
				g.log("Scroll finalizado");
			}
		});
	});
```

### Asynchronous Files UPLOAD for General.JS 
#### Client Side
```javascript
	genrl.upload("#filetoupload",function(data){
		g.log("*******************data.file*******************");
		g.log("DATA");
		g.log(data);
		g.log("DATA FILE NAME");
		g.log(data.file);
		g.log("DATA FILE STATUS");
		g.log(data.status);
		g.log("*******************data.file*******************");
		//////////////////////////////////////////////////
	});
```
#### Server Side
```php
<?php
	$JSON    =file_get_contents("php://input");
	$request =json_decode($JSON);
	$data=base64_decode($request->data);
	$fileName=$request->name;
	$serverFile=time().$fileName;
	$fp=fopen('uploads/'.$serverFile,'w'); //Prepends timestamp to prevent overwriting
	fwrite($fp,$data);
	fclose($fp);
	$returnData[]=array("file"=>$serverFile);
	echo(json_encode($returnData));
?>
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
