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
/************************************************/
/**********************AJAX API*****************/
/************************************************/
ajaxapi=(function(global,factory){
	//write code below
	function getSocket(){
		if (window.XMLHttpRequest) {
			// code for modern browsers
			xmlhttp = new XMLHttpRequest();
		}
		else{
			// code for old IE browsers
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xmlhttp;
	};
	function transferCompleteGet(data,callback){
		if(typeof callback === 'function'){
			callback(data);
		}
	};
	function transferFailedGet(data,callback){
		if(typeof callback === 'function'){
			callback(data);
		}
	};

	function transferCompleteGetJSON(data,callback){
		if(typeof callback === 'function'){
			callback(data);
		}
	};
	function transferFailedGetJSON(data,callback){
		if(typeof callback === 'function'){
			callback(data);
		}
	};
	function transferCompletePost(data,callback){
		if(typeof callback === 'function'){
			callback(data);
		}
	};
	function transferFailedPost(data,callback){
		if(typeof callback === 'function'){
			callback(data);
		}
	};
	function transferCompletePostUpl(data,callback){
		if(typeof callback === 'function'){
			callback(data);
		}
	};
	function transferFailedPostUpl(data,callback){
		if(typeof callback === 'function'){
			callback(data);
		}
	};

return{
    getAjax:function(){
		let sockajax=getSocket();
		return sockajax;
  	},
	load:function(modulourl){
		window.addEventListener('load', function() {
		    // page is fully rendered
	        let xmlhttp=false;
	        let filecont;
	        let contentdiv;
	        let n;
	        let allScripts;
	        let callback;
	        callback=arguments[1];
	        contentdiv=getelem(domel);
	        xmlhttp=genrl.getxhr();
	        if (typeof callback==='function'){
						callback();
	        }
		    xmlhttp.onreadystatechange = function(){
		        if(xmlhttp.readyState==XMLHttpRequest.DONE){
		           if(xmlhttp.status == 200){
		               contentdiv.innerHTML = xmlhttp.responseText;
		               allScripts=contentdiv.getElementsByTagName('script');
		               for (n=0;n<allScripts.length;n++){
							//run script inside rendered div
							eval(allScripts[n].innerHTML);
		               }
		               if(callback!=undefined){
					        if(typeof callback==='function'){
								callback();
					        }
					        else{
					        	glog("No se puede ejecutar la llamada, no es tipo funcion");
					        }
		               }
		           }
		           else {
		               glog('Error');
		           }
		        }
		    }
		    xmlhttp.open("GET", modulourl, true);
		    xmlhttp.send();
		});
	},
  	get:function(url){
		let sockajax=getSocket();
		let options;
		let respjson;
		let objeto;
		let x,y,valor,indice;
		let ajaxg=getSocket();
  		ajaxg.addEventListener("load", transferCompleteGet);
		ajaxg.addEventListener("error", transferFailedGet);
		ajaxg.open("GET", url, true);

		return{
			then: transferCompleteGet(data, callback),
			catch: transferCompleteGet(e, callback),
		}
  	},
  	getJSON:function(url){
		let sockajax=getSocket();
		let options;
		let respjson;
		let objeto;
		let x,y,valor,indice;
		let ajaxg=getSocket();
  		ajaxg.addEventListener("load", transferCompleteGetJSON);
		ajaxg.addEventListener("error", transferFailedGetJSON);
		ajaxg.open("GET", url, true);

		return{
			then: transferCompleteGetJSON(data,callback),
			catch: transferFailedGetJSON(e, callback)
		}
  	},
  	post:function(url,data){
		let sockajax=getSocket();
		let options;
		let respjson;
		let objeto;
		let x,y,valor,indice;
		let ajaxp=getSocket();
		let formData = new FormData();
  		ajaxp.addEventListener("load", transferCompletePost);
		ajaxp.addEventListener("error", transferFailedPost);
		ajaxp.open("POST", url, true);
		formData.append('data',data);
		ajaxp.send(formData);

		return{
			then: transferCompletePost(data, callback),
			catch: transferFailedPost(e, callback)
		}
  	},
  	upload:function(url,data){
		let sockajax=getSocket();
		let options;
		let respjson;
		let objeto;
		let x,y,valor,indice;
		let ajaxp=getSocket();
		let formData = new FormData();
  		ajaxp.addEventListener("load", transferCompletePostUpl);
		ajaxp.addEventListener("error", transferFailedPostUpl);
		ajaxp.open("POST", url, true);
		formData.append('data',data);
		ajaxp.send(formData);

		return{
			then: transferCompletePostUpl(data, callback),
			catch: transferFailedPostUpl(e, callback)
		}
  	}
  }
}(window));
module.exports=ajaxapi;
