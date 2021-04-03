/*
  Copyright (C) 2019 Arturo Vasquez Soluciones Web.
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
/*función - módulo interno webworkers*/
/************************************************/
var nombreww='';
ww=(function(nombreww){
	var workers=[];
	var numworkers=0;
	var workertmp;
    var workerSck;
    var workerName;
	var retobject;
	var objectfinal;
	retobject={};
	objectfinal={};
	//Submodulo WebWorkers
	return{
		set:function(nombreid,filename){
			if(workerSck==undefined){
				if(filename!=''){
            		// Code Below.....
            		try{
            			workertmp = new Worker(filename);
            			try{
            				workers[numworkers]={'nombre':nombreid,'inst':(workertmp)};
							numworkers++;
            			}
            			catch(e){
            				console.log(e);
            			}
            		}
            		catch(e){
            			console.error(e);
            		}
				}
			}
			else{
				glog("El WebWorker API no está soportado por el navegador.");
			}
		},
		get:function(nombreid){
			for(w in workers){
				if(workers[w].inst!=undefined){
					if(workers[w].nombre==nombreid){
						retobject.worker=workers[w].inst;
						retobject.id=workers[w].nombre;
						break;
					}
				}
			}
			return retobject;
		},
		terminate:function(nombreid){
			var workeri;
			for(w in workers){
				if(workers[w].inst!=undefined){
					if(workers[w].nombre==nombreid){
						workeri=workers[w].inst;
						break;
					}
				}
			}
			workeri.terminate();
			return 0;
		},
		close:function(nombreid){
			var workeri;
			for(w in workers){
				if(workers[w].inst!=undefined){
					if(workers[w].nombre==nombreid){
						workeri=workers[w].inst;
						break;
					}
				}
			}
			workeri.close();
			return 0;
		},
		send:function(nombreid,message){
			var w=genrl.ww.get(nombreid);
			w.worker.postMessage(message);
		}
	}
}(nombreww));
module.exports=ww;
