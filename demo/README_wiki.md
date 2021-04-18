general.js
==========

JS Library to improve your web
------------------------------
 
JS Library that handles DOM / Events - DOM / AJAX - FETCH / WebSockets-Webworkers / Watch - UnWatch / Crypto / expansible 

How to init the library
-----------------------
<pre>
	genrl.docready(function(){
		//write code below
	});
</pre>

Log something to JS console
---------------------------
<pre>
	genrl.log("Se ha activado el callBack");
</pre>

How to select a DOMElement By ID
--------------------------------
<pre>
	g("#element");
</pre>

How to select a DOMElement By ClassName
---------------------------------------
<pre>
	g(".element");
</pre>

How to read an object
---------------------
<pre>
genrl.each(h,function(x,index){
	genrl.log("RESULTADO");
	genrl.log(x.nombre);
	genrl.log(index);
})
</pre>

How to set CSS attributes
-------------------------
<pre>
	g("#element").css({
		'height': '400px',
		'width': '200px',
		'opacity': '1'
	});
</pre>
Bind an event
-------------
<pre>
g("#btnmover").click(function(){
	g("#div_A").animate('bounce',5000,function(){
		genrl.log("Se ha activado el callBack");
	});
});
</pre>

How to get an attribute of a DOMElement
---------------------------------------
<pre>
	idelement=g("#element").getAttrb("id");
</pre>

How to set an attribute of a DOMElement
---------------------------------------
<pre>
	g("#element").setAttrb("attribRandom","test");
</pre>
## Get element children
<pre>
	g("#element").children();
</pre>

Get element child number N
<pre>
	g("#element").child(N);
</pre>

AJAX Calls
----------
GET + Callback
--------------
<pre>
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
</pre>

POST + Callback
---------------
<pre>
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
</pre>
Load asinchronous + Callback
----------------------------
<pre>
	g.dom("#cargadiv").load("README.md",function(){
		g.log("Módulo cargado.");
	});
);
</pre>

Smooth scrolling
----------------
<pre>
	g.dom("#holap").click(function(){
		g.dom("#holap").smooth("#adiosp",{
			duration:'10000',
			offset: 0,
			callback: function(){
				g.log("Scroll finalizado");
			}
		});
	});
</pre>

Asynchronous Files UPLOAD for General.JS 
----------------------------------------
Client Side
-----------
<pre>
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
</pre>
Server Side
-----------
<pre>
&lt;&#63;php
	&#36;JSON    =file_get_contents("php://input");
	&#36;request =json_decode(&#36;JSON);
	&#36;data=base64_decode(&#36;request->data);
	&#36;fileName=&#36;request->name;
	&#36;serverFile=time().&#36;fileName;
	&#36;fp=fopen('uploads/'.&#36;serverFile,'w'); //Prepends timestamp to prevent overwriting
	fwrite(&#36;fp,&#36;data);
	fclose(&#36;fp);
	&#36;returnData[]=array("file"=>&#36;serverFile);
	echo(json_encode(&#36;returnData));
&#63;&gt;
</pre>

Asynchronous JS FETCH API
-------------------------
</pre>
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
</pre>
How to extend the library
-------------------------
Creates a new function
----------------------
<pre>
	genrl.extend({
		myfunction:function(options){
			//write code below
		});
	});
</pre>

Use new function
----------------
<pre>
	genrl.myfunction(options);
</pre>

Use the Source...

The Source be with you...
