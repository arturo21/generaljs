/*
  Copyright (C) 2025 Arturo Vasquez Soluciones Web.
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
	let ajax_=getSocket();
	let bitget=0;
	let bitpost=0;
	let bitgetjson=0;
	let bitupload=0;
	let bitload=0;
	let protocol='get';
	let errormessage="";
	let bitgetxml=0;
	let datares="";
	let headers="";
	let boolwithcred=false;
	let errorCallback = null;
	//write code below
	function getSocket(){
		// code for modern browsers
		xmlhttp = new XMLHttpRequest();
		return xmlhttp;
	};
return{
    getAjax:function(){
		return ajax_;
  	},
    getAjax:function(){
		return ajax_;
  	},
	withCredentials:function(boolean){
		boolwithcred = false
		if(boolean==true){
			boolwithcred = true
		}
		return this;
  	},
	load:function(url){
		let options;
		let respjson;
		let objeto;
		let x,y,valor,indice;
		var params = "action=load";
		bitget=0;
		bitpost=0;
		bitgetjson=0;
		bitupload=0;
		bitload=1;
		if(bitload==1){
			ajax_.open("GET", url, true);
			if(boolwithcred==true){
				ajax_.withCredentials = true;
			}
			if(headers!=''){
				ajax_.setRequestHeader("Content-Type", headers);
			}
			else{
				headers="application/json";
				ajax_.setRequestHeader("Content-Type", headers);
			}
			ajax_.send(null);
			return this;
		}
	},
  	get:function(url){
		let options;
		let respjson;
		let objeto;
		let x,y,valor,indice;
		var params = "action=get";
		bitget=1;
		bitpost=0;
		bitgetjson=0;
		bitupload=0;
		bitload=0;
		if(bitget==1){
			ajax_.open("GET", url, true);
			if(headers!=''){
				ajax_.setRequestHeader("Content-Type", headers);
			}
			else{
				headers="application/json";
				ajax_.setRequestHeader("Content-Type", headers);
			}
			ajax_.send(null);
			return this;
		}
  	},
  	getJSON:function(url){
		let options;
		let respjson;
		let objeto;
		let x,y,valor,indice;
		var params="action=getjson";
		bitget=0;
		bitpost=0;
		bitgetxml=0;
		bitgetjson=1;
		bitupload=0;
		bitload=0;
		if(bitgetjson==1){
			ajax_.open("GET", url, true);
			if(headers!=''){
				ajax_.setRequestHeader("Content-Type", headers);
			}
			else{
				headers="application/json";
				ajax_.setRequestHeader("Content-Type", headers);
			}
			ajax_.send(null);
			return this;
		}
  	},
  	getXML:function(url){
		let options;
		let respjson;
		let objeto;
		let x,y,valor,indice;
		var params="action=getxml";
		bitget=0;
		bitpost=0;
		bitgetjson=0;
		bitgetxml=1;
		bitupload=0;
		bitload=0;
		if(bitgetxml==1){
			ajax_.open("GET", url, true);
			if(headers!=''){
				ajax_.setRequestHeader("Content-Type", headers);
			}
			else{
				headers="application/json";
				ajax_.setRequestHeader("Content-Type", headers);
			}
			ajax_.send(null);
			return this;
		}
  	},
	setContentType:function(setting){
		if(setting!=''){
			headers=setting;
		}
	},
  	post:function(url,data){
		let options;
		let respjson;
		let objeto;
		let x,y,valor,indice;
		protocol="post";
		bitget=0;
		bitpost=1;
		bitgetjson=0;
		bitupload=0;
		bitload=0;
		ajax_=getSocket();
		ajax_.open("POST", url, true);
		if(boolwithcred==true){
			ajax_.withCredentials = true;
		}
		if(headers!=''){
			ajax_.setRequestHeader("Content-Type", headers);
		}
		else{
			headers="application/json";
			ajax_.setRequestHeader("Content-Type", headers);
		}
		ajax_.response='json';
		ajax_.send(data);
		return this;
  	},
  	upload:function(url,data){
		let options;
		let respjson;
		let objeto;
		let x,y,valor,indice;
		protocol="post";
		bitget=0;
		bitpost=0;
		bitgetjson=0;
		bitupload=1;
		bitload=0;
		ajax_=getSocket();
		ajax_.open("POST", url, true);
		if(boolwithcred==true){
			ajax_.withCredentials = true;
		}
		if(headers!=''){
			ajax_.setRequestHeader("Content-Type", headers);
		}
		else{
			headers="application/json";
			ajax_.setRequestHeader("Content-Type", headers);
		}
		ajax_.response='text';
		ajax_.send(data);
		return this;
  	},
  	event:function(event,callback){
		if(typeof callback==='function'){
			ajax_.addEventListener(event, callback)
		}
		return this;
  	},
	then:function(callback){
		ajax_.onreadystatechange = function(){
			if(ajax_.readyState==4 && ajax_.status==200){
				if(bitgetjson==1 || bitgetxml==1){
					if(bitgetjson==1){
						datares = JSON.parse(ajax_.responseText);
					}
					if(bitgetxml==1){
						datares = ajax_.responseXML;
					}
				}
				else{
					datares = ajax_.responseText;
				}
				callback(datares);
				return this;
			}
			else{
				errormessage=ajax_.statusText;
				ajaxapi.catch(errormessage);
				return this;
			}
		};
		return this;
	},
	catch:function(callback){
    if (typeof callback === 'function') {
      errorCallback = callback;
      callback();
    }
    else{
    	console.log(callback);
    }
    return this;
	}
  }
}(window));
module.exports=ajaxapi;
