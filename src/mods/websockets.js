/*
  Copyright (C) 2021 Arturo Vasquez Soluciones Web.
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
/*función - módulo interno websockets*/
/************************************************/
ws=(function(){
	var numsockets;
	var socketUnt;
    var workerName;
	var retobject;
	var objectfinal;
	var socketi;
	var sockets;
	sockets=[];
	retobject={};
	objectfinal={};

	function printonerror(event){
		console.log("ERROR...");
		console.log(event.error);
	};
	function printonopen(event){
		console.log("Conexion abierta...");
	};
	function printonmsg(event){
		console.log("Enviando mensaje...");
		console.log(event.data);
	};
	//Submodulo WebSockets
	return{
		set:function(nombreid,urldir){
			console.log("************************************SOCKET*******************************");
			console.log(socketUnt);
			console.log("************************************SOCKET*******************************");
			if(socketUnt==undefined){
				if(urldir!=''){
            // Code Below.....
            			try{
            				socketUnt=new WebSocket(urldir);
            			}
            			catch(e){
            				console.error(e);
            			}
            			finally{
            				socketUnt.addEventListener('error',printonerror);
							socketUnt.addEventListener('open',printonopen);
							socketUnt.addEventListener('message',printonmsg);
							sockets[numsockets]={'nombre':nombreid,'inst':socketUnt};
							numsockets++;
            			}
				}
			}
			else{
				g.log("El WebSocket API no está soportado por el navegador.");
			}
		},
		get:function(nombreid){
			for(w in sockets){
				if(sockets[w].inst!=undefined){
					if(sockets[w].nombre==nombreid){
						g.log(sockets[w]);
						retobject.socket=sockets[w].inst;
						retobject.id=sockets[w].nombre;
						return sockets[w].nombre;
						break;
					}
				}
			}
			return retobject;
		},
		close:function(nombreid){
			for(w in sockets){
				if(sockets[w].inst!=undefined){
					if(sockets[w].nombre==nombreid){
						socketi=sockets[w].inst;
						break;
					}
				}
			}
			socketi.close();
			return 0;
		},
		reply:function(nombreid,message,callbackmsg){
			var w=genrl.ws.get(nombreid);
			w.socket.addEventListener('message',callbackmsg);
			callbackmsg();
		},
		receive:function(nombreid,callbackmsg){
			var w=genrl.ws.get(nombreid);
			w.socket.addEventListener('message',callbackmsg);
			callbackmsg();
		},
		send:function(nombreid,message){
			var w=genrl.ws.get(nombreid);
			w.socket.send(message);
			g.log("************SOCKET RESPONSE*************");
			g.log(message);
			g.log("************SOCKET RESPONSE*************");
		}
	}
}());
module.exports=ws;
