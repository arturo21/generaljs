genrl.docready(function(){
	var cadenamd5;
	var h={};
	var contdivs;
	var bitvisible;
	var cadena;
	var elementos=[];
	var ww={};
	var index=0;

	h=[
		{'nombre':'arturo'},
		{'nombre':'pedro'},
		{'nombre':'antonio'},
		{'nombre':'oscar'},
		{'nombre':'nepo'},
		];
	genrl.log("**************prop Function************");
	//buscar sin ID pero sabiendo la etiqueta
	//genrl.log(g("html").prop("data-scope"));
	//buscar con ID, sabiendo el atributo
	genrl.log(genrl.ds("#appdata0").get("scope"));
	//buscar solo el atributo
	elementos=genrl.propAll(".abc");
	genrl.log("**************ELEMENTOS************");
	genrl.log(elementos);
	genrl.log("**************ELEMENTOS************");
	genrl.log("**************prop Function************");
	genrl.log("H ARRAY");
	genrl.each(h,function(x,index){
		genrl.log("RESULTADO");
		genrl.log(x.nombre);
		genrl.log(index);
	})
	genrl.log("FIN H ARRAY");
	nav=genrl.browser();
	genrl.log("**********NAV**************");
	genrl.log(nav);
	genrl.log("**********NAV**************");
	cadenamd5=genrl.cripto.encode("MD5","pruebaclave","pruebaclave");
	genrl.log("CLAVE MD5: " + cadenamd5);
	g("#databind").on('keyup',function(e){
		var valornew;
		valornew=g("#databind").val();
		g("#dataresp").val(valornew);
	});
	contdivs=0;
	bitvisible=0;

	g("#btnmover").click(function(){
		g("#div_A").animate('bounce',1500,function(){
			genrl.log("Se ha activado el callBack");
		});
	});
	g("#btnmostrar").click(function(){
		g("#ajaxresponse").animate('fadeIn',5000,function(){
			genrl.log("Finished");
		});
	});
	g("#btnocultar").click(function(){
		g("#ajaxresponse").animate('fadeOut',5000,function(){
			genrl.log("Finished");
		});
	});
	///////////////////////////////////////
	genrl.log("Path JS Version: " + genrl.path.getVersion());
	genrl.log("****************************FUNCION DATA:****************************");
	g("div").addAttrb("gn-repeat","none");
	g(".abc").addAttrb("gn-repeat","none");
	g(".abc").data("attrib-nuevo","true");
	result=g(".abc").getAttrb("gn-repeat");
	resultdos=g(".abc").data("attrib-nuevo");
	genrl.log(resultdos[0]);
	genrl.log("******************************************************************");
	g(".abc").rmAttrb("gn-repeat");
	//scrollLeft - Getter/Setter
	g("#contentCont").scrollLeft();
	g("#contentCont").scrollLeft(200);
	//scrollTop
	g("#contentCont").scrollTop();
	g("#contentCont").scrollTop(100);
	g("#holap").cursor('pointer');
	//Por arreglo simple de un solo elemento
	g("#holap").css({'opacity':'1'});
	g("#holap").css({'color':'#000'});
	//en JSON
	g("#holap").css({
		'position':'relative',
		'display':'block',
		'float':'none',
		'background':"#fff000",
		'font-size':"20px",
		'margin-top':'20px',
		'margin-bottom':'20px',
		'border':'1px solid #000',
		'text-align':'center',
		'content':'Esto es un titulo'
	},function(){
		genrl.log("cambios de estilo realizados");
	});
	genrl.log("HEIGHT****************************");
	var props=g(".abc").css("height");
	genrl.log(props);
	genrl.log("HEIGHT****************************");
	genrl.log("HEIGHT****************************");
	var props=g(".abc").css(["height","width"]);
	genrl.log("OBJFINAL****************************");
	genrl.log(props);
	genrl.log("OBJFINAL****************************");
	genrl.log("HEIGHT****************************");
	genrl.log("***ARRAY HEIGHT****************************");
	g("#holap").click(function(){
		g("#holap").smooth("#adiosp",{
			duration:'10000',
			offset: 0,
			callback: function(){
				genrl.log("Scroll finalizado");
			}
		});
	});
	g("#adiosp").click(function(){
		g("#holap").smooth("#adiosp",{
			duration:'10000',
			offset: 0,
			callback: function(){
				genrl.log("Scroll finalizado");
			}
		});
	});
	g("#btnfile").click(function(){
		var archivo;
		//holaf=id del control file
		//function(data)=callback con return de la data obtenida
		g.upload("#holaf",function(data){
			//tratar variable para convertir string en JSON
			//Imprimir variable///////////////////////////////
			genrl.log("*******************data.file*******************");
			genrl.log("DATA");
			genrl.log(data);
			genrl.log("DATA FILE NAME");
			genrl.log(data.file);
			genrl.log("DATA FILE STATUS");
			genrl.log(data.status);
			genrl.log("*******************data.file*******************");
			//////////////////////////////////////////////////
		});
	});
	g("#btnwebsock").click(function(){
		genrl.log("Mensaje a enviar " + g("#mensaje").val());
		genrl.ws.reply('socket1',g("#mensaje").val(),function(){
			g("#responsechat").append(g("#mensaje").val());
		});
	});
	genrl.getJSON(
		{
			varu:"arturo",
			vard:"vasquez"
		},
		"socket.php",
		function(data){
			genrl.log("DATA: ");
			genrl.log(data.data);
		}
	);
	genrl.post(
		{
			varu:"arturo",
			vard:"vasquez"
		},
		"socket.php",
		function(data){
			genrl.log("DATA: ");
			genrl.log(data.data);
			g("#ajaxresponse").html("RESPUESTA AJAX \n" + data.data);
		}
	);
	//Extender el objeto con otro objeto llamado saludo
	saludo=(function(){
		return{
			hola:function(mensaje){
				genrl.log("HOLA, " + mensaje);
			}
		}
	}());
	genrl.extend({
		saludo
	});
	saludofunc=(function(){
		genrl.log("HOLA, " + mensaje);
	}());
	genrl.extend({
		saludofunc
	});
	genrl.log(genrl);
	genrl.saludo.hola("Arturo -> funcion extendida con otro objeto");
	//Extender el objeto con funcion llamado saludofunc
	genrl.saludofunc("Arturo 1");
	//Extender el objeto con funcion llamado saludos en fn
	genrl.fn.saludos("Arturo 2");
	genrl.storage.setLocal("usuario","Arturo");
	usuariop=genrl.storage.getLocal("usuario");
	genrl.log("USUARIO " + usuariop);
	genrl.log("*****Bit Verif isReady*****");
	genrl.log(g.isReady());
	genrl.log("*****Bit Verif isReady*****");
	genrl.log("*****WebWorker 1*****");
	genrl.ww.set('worker1',"./src/mods/worker1.js");
	genrl.ww.send('worker1',"Hola");
	genrl.log("*****WebSocket 1*****");
	genrl.ws.set('socket1',"ws://127.0.0.1:5001");
	genrl.log("*****WebSocket 1*****");
	genrl.path.map("#/prueba").to(function(){
		g("#cargadiv").load("README.md",function(){
			genrl.log("Módulo cargado.");
		});
	});
	genrl.path.listen();
	genrl.log("*****FETCH API*****");
	var fapi=genrl.fetchapi.getFetch();
	if(fetchapi){
		genrl.log("FETCH API ha sido cargada exitosamente!");
		genrl.log("***************************************");
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
	//plugin GcycleJS para GeneralJS////
	genrl.log("GCYCLE SLIDER");
	var slider=gcycle.run({
		container:"#slideshowslide",
		slidesToShow:1,
		dots:".dots",
		draggable:true,
		duration:1,
		rewind:true,
		autoplay:true,
		durationbs:3000,
		arrows:{
			prev:'.glider-prev',
			next:'.glider-next',
		},
		getobject:true
	});
	genrl.log("**********************************");
	genrl.log("**********************************");
	genrl.log("MODAL API");
	g("#btnmodal").click(function(){
		var modalwin=genrl.modalapi.getModal({
			title:"Hola",
			html:true,
			close:true,
			content:"Este es el contenido"
		});
		modalwin.open();
	});
	genrl.log("**********************************");
	genrl.log("**********************************");
	genrl.log("**********************************");
	genrl.log("VIDEO API");
	var video=genrl.ytapi.play({
		'cont':'#player_out',
		'id':'WyOIPZ2hLSA',
		'ancho':'1024',
		'alto':'1024'
	});
	genrl.log(video);
	genrl.log("**********************************");
});
