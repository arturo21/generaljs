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
/*Este archivo lo necesita Function SMOOTH SCROLL*/
require("./requestAnimationFrame.js");
/*************************************************/
cripto=require("./mods/gcrypto.min.js");
fetchapi=require("./mods/fetchapi.min.js");
ww=require("./mods/webworkers.min.js");
ws=require("./mods/websockets.min.js");
storage=require("./mods/cookies.min.js");
datab=require("./mods/data-bind.lite.min.js");
var is=require("./mods/is.min.js");
var watchjs = require("./mods/watch.min.js");
var watch = watchjs.watch;
var unwatch = watchjs.unwatch;
var callWatchers = watchjs.callWatchers;
var numapps=0;
var childsel=[{}];

g=(function(global,factory){
	return function(domel){
		console.log(domel);
		//here wuould go private functions
		//...................
	function glog(msg){
			console.log(msg);
		};
		function easeInOutQuad(t, b, c, d){
		  t /= d / 2;
		  if (t < 1) return c / 2 * t * t + b;
		  t--;
		  return -c / 2 * (t * (t - 2) - 1) + b;
		};
		function wrap(el, wrapper) {
		    el.parentNode.insertBefore(wrapper, el);
		    wrapper.appendChild(el);
		};
		function indexOf_(array, valToFind){
		    var foundIndex = -1;
		    for (var index = 0; index < array.length; index++) {
		        if (array[index] === valToFind) {
		            foundIndex = index;
		            break;
		        }
		    }
			return foundIndex;
		};
		function prop(element,proper){
			var obj; //busca dentro del objeto y devuelve solo la primera acepcion
			var val;
			obj=getelems(element);
			if(is.isObject(obj)){
			  	result=obj[0].getAttribute(proper);
				return result;
			}
		};
		function propAll(proper){
			var val=''; //busca dentro del objeto y devuelve solo la primera acepcion
			var array_tags=[];
			var array_final=[];
			var i=0;
			array_tags=getelems(proper);
			if(array_tags.length>0){
				for(i=0;i<array_tags.length;i++){
					array_final[i]=array_tags[i];
				}
				return array_final;
			}
		};
		function getScreenCordinates(obj) {
	        var p = {};
	        p.x = obj.offsetLeft;
	        p.y = obj.offsetTop;
	        while (obj.offsetParent) {
	            p.x = p.x + obj.offsetParent.offsetLeft;
	            p.y = p.y + obj.offsetParent.offsetTop;
	            if (obj == document.getElementsByTagName("body")[0]) {
	                break;
	            }
	            else {
	                obj = obj.offsetParent;
	            }
	        }
	        return p;
		};
		function setError(name,message){
			this.name = name;
		  this.message = message || '';
		  var error = new Error(this.message);
		  error.name = this.name;
		  this.stack = error.stack;
		};
		function getBrowserPreffix(){
		  var N = navigator.appName, ua = navigator.userAgent, tem;
		  var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		  if(M && (tem = ua.match(/version\/([\.\d]+)/i))!= null) M[2] = tem[1];
		  M = M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
		  M = M[0];
		  if(M == "Chrome") { browserPrefix = "webkit"; }
		  if(M == "Firefox") { browserPrefix = "moz"; }
		  if(M == "Safari") { browserPrefix = "webkit"; }
			if(M == "Opera") { browserPrefix = "o"; }
		  if(M == "MSIE") { browserPrefix = "ms"; }
	
			return browserPrefix;
		};
		function setAnimationDuration(el,speed){
			var preffixbrowser;
			preffixbrowser=getBrowserPreffix();
			el.style[preffixbrowser + "-animation-duration"] = speed + "s";
			return 0;
		}
		function getTransitionEvent(){
		  var t, el = document.createElement("fakeelement");
		  var transitions = {
		    "transition"      : "transitionend",
		    "OTransition"     : "oTransitionEnd",
		    "MozTransition"   : "transitionend",
		    "WebkitTransition": "webkitTransitionEnd"
		  }
		  for (t in transitions){
		    if (el.style[t] !== undefined){
		      return transitions[t];
		    }
		  }
		};
		function getAnimationEvent(){
		  var t, el = document.createElement("fakeelement");
		  var animations = {
		    "animationDuration"      : "animationend",
		    "OAnimationDuration"     : "oanimationend",
		    "MozAnimationDuration"   : "animationend",
		    "WebkitAnimationDuration": "webkitAnimationEnd",
				'MSAnimationDuration': 'MSAnimationEnd'
		  }
		  for (a in animations){
		    if (el.style[a] !== undefined){
		      return animations[a];
		    }
		  }
		};
		function getobjtype(id){
			var cadena;
			var typestr;
			if(typeof id==='string'){
				cadena=id;
		      	if(cadena.search("#")==0){
		        	typestr="id";
		      	}
		      	else if(cadena.search(".")==0){
					typestr="class";
				}
				else{
					typestr="element";
				}
				return typestr;
			}
		};
		function getelem(id){
			var objeto;
			if(id!=undefined){
				if(typeof id==='string'){
					var pcarac='';
					pcarac=id.charAt(0);
					objeto=document.querySelector(id);
					if(typeof objeto==='object'){
						return objeto;
					}
				}
				else{
					if(typeof id==='object'){
						return id;
					}			
				}
			}
		};
		function getelems(tag){
			var arrtags=[];
			if(tag!=undefined){
				arrtags=document.querySelectorAll(tag);
				return arrtags;
			}
			else{
				return -1;
			}
		};
		function valobj(objval){
	        var valor;
	        var obj;
	        var args;
	        var tovalue;
	        obj=getelem(objval);
	        if(obj.type!='select-one' && obj.type!="file"){
				valor=obj.value;
	        }
	        else{
	        	if(obj.type=="file"){
	        		valor=obj.files[0];
	        	}
	        	else{
	        		valor=obj.options[obj.selectedIndex].value;
	        	}
	        }
	        return valor;
	   };
	   function setval(objval,value){
	        var valor;
	        var obj;
	        var args;
	        var tovalue;
	        obj=getelem(objval);
	        if(obj.type!='select-one' && obj.type!="file"){
				obj.value=value;
	        }
	        return 0;
		};
		function version(){
			return "0.0.1";
		};
		function getCssElements(el){
			if(el instanceof HTMLElement){
				return [el];
			}
			else if(typeof el === 'string'){
				return document.querySelectorAll(el);
			}
			return [];
		};
		setError.prototype = Object.create(Error.prototype);
		return{
			
		};
	};
}(window));

general=(function(global,factory){
	//here wuould go private functions
	//...................
	function glog(msg){
		console.log(msg);
	};
	function easeInOutQuad(t, b, c, d){
	  t /= d / 2;
	  if (t < 1) return c / 2 * t * t + b;
	  t--;
	  return -c / 2 * (t * (t - 2) - 1) + b;
	};
	function wrap(el, wrapper) {
	    el.parentNode.insertBefore(wrapper, el);
	    wrapper.appendChild(el);
	};
	function indexOf_(array, valToFind){
	    var foundIndex = -1;
	    for (var index = 0; index < array.length; index++) {
	        if (array[index] === valToFind) {
	            foundIndex = index;
	            break;
	        }
	    }
		return foundIndex;
	};
	function prop(element,proper){
		var obj; //busca dentro del objeto y devuelve solo la primera acepcion
		var val;
		obj=getelems(element);
		if(is.isObject(obj)){
		  	result=obj[0].getAttribute(proper);
			return result;
		}
	};
	function propAll(proper){
		var val=''; //busca dentro del objeto y devuelve solo la primera acepcion
		var array_tags=[];
		var array_final=[];
		var i=0;
		array_tags=getelems(proper);
		if(array_tags.length>0){
			for(i=0;i<array_tags.length;i++){
				array_final[i]=array_tags[i];
			}
			return array_final;
		}
	};
	function getScreenCordinates(obj) {
        var p = {};
        p.x = obj.offsetLeft;
        p.y = obj.offsetTop;
        while (obj.offsetParent) {
            p.x = p.x + obj.offsetParent.offsetLeft;
            p.y = p.y + obj.offsetParent.offsetTop;
            if (obj == document.getElementsByTagName("body")[0]) {
                break;
            }
            else {
                obj = obj.offsetParent;
            }
        }
        return p;
	};
	function setError(name,message){
		this.name = name;
	  this.message = message || '';
	  var error = new Error(this.message);
	  error.name = this.name;
	  this.stack = error.stack;
	};
	function getBrowserPreffix(){
	  var N = navigator.appName, ua = navigator.userAgent, tem;
	  var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	  if(M && (tem = ua.match(/version\/([\.\d]+)/i))!= null) M[2] = tem[1];
	  M = M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
	  M = M[0];
	  if(M == "Chrome") { browserPrefix = "webkit"; }
	  if(M == "Firefox") { browserPrefix = "moz"; }
	  if(M == "Safari") { browserPrefix = "webkit"; }
		if(M == "Opera") { browserPrefix = "o"; }
	  if(M == "MSIE") { browserPrefix = "ms"; }

		return browserPrefix;
	};
	function setAnimationDuration(el,speed){
		var preffixbrowser;
		preffixbrowser=getBrowserPreffix();
		el.style[preffixbrowser + "-animation-duration"] = speed + "s";
		return 0;
	}
	function getTransitionEvent(){
	  var t, el = document.createElement("fakeelement");
	  var transitions = {
	    "transition"      : "transitionend",
	    "OTransition"     : "oTransitionEnd",
	    "MozTransition"   : "transitionend",
	    "WebkitTransition": "webkitTransitionEnd"
	  }
	  for (t in transitions){
	    if (el.style[t] !== undefined){
	      return transitions[t];
	    }
	  }
	};
	function getAnimationEvent(){
	  var t, el = document.createElement("fakeelement");
	  var animations = {
	    "animationDuration"      : "animationend",
	    "OAnimationDuration"     : "oanimationend",
	    "MozAnimationDuration"   : "animationend",
	    "WebkitAnimationDuration": "webkitAnimationEnd",
			'MSAnimationDuration': 'MSAnimationEnd'
	  }
	  for (a in animations){
	    if (el.style[a] !== undefined){
	      return animations[a];
	    }
	  }
	};
	function getobjtype(id){
		var cadena;
		var typestr;
		if(typeof id==='string'){
			cadena=id;
	      	if(cadena.search("#")==0){
	        	typestr="id";
	      	}
	      	else if(cadena.search(".")==0){
				typestr="class";
			}
			else{
				typestr="element";
			}
			return typestr;
		}
	};
	function getelem(id){
		var objeto;
		if(id!=undefined){
			if(typeof id==='string'){
				var pcarac='';
				pcarac=id.charAt(0);
				objeto=document.querySelector(id);
				if(typeof objeto==='object'){
					return objeto;
				}
			}
			else{
				if(typeof id==='object'){
					return id;
				}			
			}
		}
	};
	function getelems(tag){
		var arrtags=[];
		if(tag!=undefined){
			arrtags=document.querySelectorAll(tag);
			return arrtags;
		}
		else{
			return -1;
		}
	};
	function valobj(objval){
        var valor;
        var obj;
        var args;
        var tovalue;
        obj=getelem(objval);
        if(obj.type!='select-one' && obj.type!="file"){
			valor=obj.value;
        }
        else{
        	if(obj.type=="file"){
        		valor=obj.files[0];
        	}
        	else{
        		valor=obj.options[obj.selectedIndex].value;
        	}
        }
        return valor;
   };
   function setval(objval,value){
        var valor;
        var obj;
        var args;
        var tovalue;
        obj=getelem(objval);
        if(obj.type!='select-one' && obj.type!="file"){
			obj.value=value;
        }
        return 0;
	};
	function version(){
		return "0.0.1";
	};
	function getCssElements(el){
		if(el instanceof HTMLElement){
			return [el];
		}
		else if(typeof el === 'string'){
			return document.querySelectorAll(el);
		}
		return [];
	};
	setError.prototype = Object.create(Error.prototype);
	return{
		
	};
}(window));