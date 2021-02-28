g.docready(function(){
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
	g.log("**************prop Function************");
	//buscar sin ID pero sabiendo la etiqueta
	//g.log(g.dom("html").prop("data-scope"));
	//buscar con ID, sabiendo el atributo
	g.log(g.ds("#appdata0").get("scope"));
	//buscar solo el atributo
	elementos=g.propAll(".abc");
	g.log("**************ELEMENTOS************");
	g.log(elementos);
	g.log("**************ELEMENTOS************");
	g.log("**************prop Function************");
	g.log("H ARRAY");
	g.each(h,function(x,index){
		g.log("RESULTADO");
		g.log(x.nombre);
		g.log(index);
	})
	g.log("FIN H ARRAY");
	nav=g.browser();
	g.log("**********NAV**************");
	g.log(nav);
	g.log("**********NAV**************");
	cadenamd5=g.cripto.encode("MD5","pruebaclave","pruebaclave");
	g.log("CLAVE MD5: " + cadenamd5);
	g.dom("#databind").on('keyup',function(e){
		var valornew;
		valornew=g.dom("#databind").val();
		g.dom("#dataresp").val(valornew);
	});
	contdivs=0;
	bitvisible=0;

	g.dom("#btnmover").click(function(){
		g.dom("#div_A").animate('bounce',5000,function(){
			g.log("Se ha activado el callBack");
		});
	});
	g.dom("#btnmostrar").click(function(){
		g.dom("#ajaxresponse").animate('fadeIn',5000,function(){
			g.log("Finished");
		});
	});
	g.dom("#btnocultar").click(function(){
		g.dom("#ajaxresponse").animate('fadeOut',5000,function(){
			g.log("Finished");
		});
	});
	///////////////////////////////////////
	g.log("Path JS Version: " + g.path.getVersion());
	g.log("****************************FUNCION DATA:****************************");
	g.dom("div").addAttrb("gn-repeat","none");
	g.dom(".abc").addAttrb("gn-repeat","none");
	g.dom(".abc").data("attrib-nuevo","true");
	result=g.dom(".abc").getAttrb("gn-repeat");
	resultdos=g.dom(".abc").data("attrib-nuevo");
	g.log(resultdos[0]);
	g.log("******************************************************************");
	g.dom(".abc").rmAttrb("gn-repeat");
	//scrollLeft - Getter/Setter
	g.dom("#contentCont").scrollLeft();
	g.dom("#contentCont").scrollLeft(200);
	//scrollTop
	g.dom("#contentCont").scrollTop();
	g.dom("#contentCont").scrollTop(100);
	g.dom("#holap").cursor('pointer');
	//Por cadena de texto
	g.dom("#holap").css({'opacity':'1'});
	g.dom("#holap").css({'color':'#000'});
	//en JSON
	g.dom("#holap").css({
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
		console.log("cambios de estilo realizados");
	});
	g.log("HEIGHT****************************");
	var props=g.dom(".abc").css("height");
	g.log(props);
	var props=g.dom(".abc").css(["height","width"]);
	g.log(props);
	g.log("HEIGHT****************************");
	g.dom("#holap").click(function(){
		g.dom("#holap").smooth("#adiosp",{
			duration:'10000',
			offset: 0,
			callback: function(){
				g.log("Scroll finalizado");
			}
		});
	});
	g.dom("#adiosp").click(function(){
		g.dom("#holap").smooth("#adiosp",{
			duration:'10000',
			offset: 0,
			callback: function(){
				g.log("Scroll finalizado");
			}
		});
	});
	g.dom("#btnfile").click(function(){
		var archivo;
		//holaf=id del control file
		//function(data)=callback con return de la data obtenida
		g.upload("#holaf",function(data){
			//tratar variable para convertir string en JSON
			//Imprimir variable///////////////////////////////
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
	});
	g.dom("#btnwebsock").click(function(){
		g.log("Mensaje a enviar " + g.dom("#mensaje").val());
		g.ws.reply('socket1',g.dom("#mensaje").val(),function(){
			g.dom("#responsechat").append(g.dom("#mensaje").val());
		});
	});
	g.getJSON(
		{
			varu:"arturo",
			vard:"vasquez"
		},
		"socket.php",
		function(data){
			g.log("DATA: ");
			g.log(data.data);
		}
	);
	g.post(
		{
			varu:"arturo",
			vard:"vasquez"
		},
		"socket.php",
		function(data){
			g.log("DATA: ");
			g.log(data.data);
			g.dom("#ajaxresponse").html("RESPUESTA AJAX \n" + data.data);
		}
	);
	//Extender el objeto con otro objeto llamado saludo
	saludo=(function(){
		return{
			hola:function(mensaje){
				console.log("HOLA, " + mensaje);
			}
		}
	}());
	g.extend({
		saludo
	});
	g.saludo.hola("Arturo -> funcion extendida con otro objeto");
	//Extender el objeto con funcion llamado saludofunc
	g.saludofunc("Arturo 1");
	//Extender el objeto con funcion llamado saludos en fn
	g.fn.saludos("Arturo 2");
	g.storage.setLocal("usuario","Arturo");
	usuariop=g.storage.getLocal("usuario");
	g.log("USUARIO " + usuariop);
	g.log("*****Bit Verif isReady*****");
	g.log(g.isReady());
	g.log("*****Bit Verif isReady*****");
	g.log("*****WebWorker 1*****");
	g.ww.set('worker1',"./src/mods/worker1.js");
	g.ww.send('worker1',"Hola");
	g.log("*****WebSocket 1*****");
	g.ws.set('socket1',"ws://127.0.0.1:5001");
	g.log("*****WebSocket 1*****");
	g.path.map("#/prueba").to(function(){
		g.dom("#cargadiv").load("README.md",function(){
			g.log("Módulo cargado.");
		});
	});
	g.path.listen();
	g.log("*****FETCH API*****");
	var fapi=g.fetchapi.getFetch();
	if(fetchapi){
		g.log("FETCH API ha sido cargada exitosamente!");
		g.log("***************************************");
		var dataSrc={};
		dataSrc={
			method:'fetch',
			name:"arturo",
			lastname:"vasquez"
		}
		g.fetchapi.post(
			"socket_fetch.php",
			dataSrc,
			function(data){
				g.log("DATA FETCH");
				g.log(data);
			}
		);
		g.fetchapi.get(
			"example.json",
			function(data){
				var datappal;
				var datos;
				g.log("DATA FETCH GET");
				g.log(data);
				datappal=data.data;
				g.log("PERSONA");
				g.log(datappal.persona);
				var datos=datappal.persona;
				g.log(datos.ciudad);
				g.log("**************");
				g.log(datos.nombre);
				g.log("**************");
				g.log(datos.apellido);
			}
		);
	}
	//plugin GcycleJS para GeneralJS////
	g.log("GCYCLE SLIDER");
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
	g.log("**********************************");
	g.log("**********************************");
	g.log("MODAL API");
	g.dom("#btnmodal").click(function(){
		var modalwin=g.modalapi.getModal({
			title:"Hola",
			html:true,
			close:true,
			content:"Este es el contenido"
		});
		modalwin.open();
	});
	g.log("**********************************");
	g.log("**********************************");
	g.log("**********************************");
	g.log("DATEPICKER API");
	var datepicker=g.datepickerapi.getDatepicker("#inputdatepicker");
	g.log(datepicker);
	g.log("**********************************");
	g.log("**********************************");
	g.log("**********************************");
	g.log("**********************************");
	g.log("CALENDAR API");
	var calendargrande=g.calendarapi.getCalendar("#contentCalendar");
	calendargrande.init()
	g.log("**********************************");
	g.log("**********************************");
	g.log("COLORPICKER API");
	var colorpicker=g.colorpickerapi.getColorpicker("#inputcolorpicker");
	colorpicker.on();
	g.log(colorpicker);
	g.log("**********************************");
	g.log("**********************************");
	g.log("ACCORDION API");
	var accordion=g.accordionapi.get(".accordion-container");
	g.log(accordion);
	g.log("**********************************");
	g.log("VIDEO API");
	var video=g.ytapi.play({
		'id':'RbRSEY2f7Yo',
		'ancho':'1024',
		'alto':'1024'
	});
	g.log(video);
	g.log("**********************************");
});
