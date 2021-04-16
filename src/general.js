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
/*Integrado GDOM para el manejo del DOM / eventos / AJAX */
/*Este archivo lo necesita Function SMOOTH SCROLL*/
require("./requestAnimationFrame.js");
require("./css/animate.css");
/*************************************************/
cripto=require("./mods/gcrypto.js");
fetchapi=require("./mods/fetchapi.js");
ajaxapi=require("./mods/ajaxapi.js");
ww=require("./mods/webworkers.js");
ws=require("./mods/websockets.js");
storage=require("./mods/cookies.js");
webapi=require("./mods/webapi.js");
ytapi=require("./mods/ytapi.js");
datab=require("./mods/data-bind.lite.min.js");
let is=require("./mods/is.min.js");
let watchjs = require("./mods/watch.min.js");
let watch = watchjs.watch;
let unwatch = watchjs.unwatch;
let callWatchers = watchjs.callWatchers;
let numapps=0;
let elementactive="html";
let varsint=[{}];
let scope=[{}];

g=(function(global,factory){
	this.elemaux='';
	this.childrenaux=[{}];
	this.parentsaux=[{}];
	this.parentaux='';
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
	    let foundIndex = -1;
	    for (let index = 0; index < array.length; index++) {
	        if (array[index] === valToFind) {
	            foundIndex = index;
	            break;
	        }
	    }
		return foundIndex;
	};
	function prop(element,proper){
		let obj; //busca dentro del objeto y devuelve solo la primera acepcion
		let val;
		obj=getelems(element);
		if(is.isObject(obj)){
		  	result=obj[0].getAttribute(proper);
			return result;
		}
	};
	function getScreenCordinates(obj) {
        let p = {};
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
		let error = new Error(this.message);
		error.name = this.name;
		this.stack = error.stack;
	};
	function getBrowserPreffix(){
		let N = navigator.appName, ua = navigator.userAgent, tem;
		let M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
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
		let preffixbrowser;
		preffixbrowser=getBrowserPreffix();
		el.style[preffixbrowser + "-animation-duration"] = speed + "s";
		return 0;
	};
	function getTransitionEvent(){
		let t, el = document.createElement("fakeelement");
		let transitions = {
	    	"transition"      : "transitionend",
	    	"OTransition"     : "oTransitionEnd",
	    	"MozTransition"   : "transitionend",
	    	"WebkitTransition": "webkitTransitionEnd"
	  	};
		for (t in transitions){
	    	if (el.style[t] !== undefined){
	      		return transitions[t];
	    	}
		}
	};
	function getAnimationEvent(){
	  	let t, el = document.createElement("fakeelement");
	  	let animations = {
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
		let cadena;
		let typestr;
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
		let objeto, attrib, filelist;
		let tag,tagf;
		if(id!=undefined){
			if(typeof id==='string'){
				objeto=document.querySelector(id);
				if(objeto){
					return objeto;
				}
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
	function getFileList(id,callback){
		let objeto, attrib, filelist;
		let tag,tagf;
		if(id!=undefined){
			if(typeof id==='string'){
				objeto=document.querySelector(id);
				if(objeto){
					console.log("FILTRO1");
					tag=objeto.tagName;
					tagf=tag.toLowerCase();
					if(tagf=='input'){
						console.log("FILTRO2");
						attrib=objeto.getAttribute("type");
						if(attrib!=null || attrib!=undefined || attrib!=''){
							console.log("FILTRO2.5 " + attrib);	
							if(attrib=='file'){
								console.log("FILTRO3");
								fileList = objeto.files;
								callback(fileList);
							}
						}
					}
				}
			}
		}
	};
	function getelems(tag){
		let arrtags=[];
		if(tag!=undefined){
			arrtags=document.querySelectorAll(tag);
			return arrtags;
		}
		else{
			return -1;
		}
	};
	function valobj(objval){
        let valor;
        let obj;
        let args;
        let tovalue;
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
        let valor;
        let obj;
        let args;
        let tovalue;
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
	function child_(domel_,number){
      	let objeto;
      	let valaux;
      	let numint;
      	let children;
      	let childfin;
      	let intquery=domel_;
      	objeto=getelem(intquery);
      	if(typeof number==='number'){
      		if(typeof objeto==='object'){
	      		if(objeto.children!=undefined){
	      			numint=parseInt(number);
	      			children=objeto.children;
	      			childfin=children[numint-1];
					setValAux_(childfin);
	      			return this;
				}
			}
		}
		return this;
	};
	function debugvar_(varinter){
		if(varinter != undefined || varinter != null || varinter.length > 0 || varinter != ''){
			return varinter;
		}
		else{
			return -1;
		}
	};
	function setValAux_(valor){
		this.elemaux=valor;
		return 0;
	};
	function getValAux_(){
		console.log("ELEMAUX +" + this.elemaux);
		return this.elemaux;
	};
	function emptyValAux_(){
		this.elemaux=null;
		return 0;
	};
	function setChildrenAux_(valor){
		this.childrenaux=valor;
		return 0;
	};
	function getChildrenAux_(){
		console.log("CHILDRENAUX +" + this.childrenaux);
		return this.childrenaux;
	};
	function emptyChildrenAux_(){
		this.childrenaux=null;
		return 0;
	};
	function setParentAux_(valor){
		this.parentaux=valor;
		return 0;
	};
	function getParentAux_(){
		console.log("PARENTAUX +" + this.parentaux);
		return this.parentaux;
	};
	function emptyParentAux_(){
		this.parentaux=null;
		return 0;
	};
	setError.prototype = Object.create(Error.prototype);
	//here wuould go public functions
	//...................
	return function(domel="html"){
		return{
			getthis: function(){
				console.log(this);
				return 0;
			},
			getel: function(id){
				return getelem(id);
			},
			getels: function(id){
				let arrtags=[];
				arrtags=getelems(id);
				return arrtags;
			},
			getArgs:function(stylesStr){
				console.log(arguments)
				return this;
			},
			getFiles:function(){
				let objeto, tag, tagf, attrib;
				objeto=getelem(domel);
				tag=objeto.tagName;
				tagf=tag.toLowerCase();
				if(tagf=='input'){
					attrib=objeto.getAttribute("type");
					if(attrib!=null || attrib!=undefined || attrib!=''){
						if(attrib==='file'){
							fileList = objeto.files;
							return fileList;
						}
					}
				}
				return this;
			},
			hide: function(){
				let domelement;
				if(!document.getElementById){
					return false;
				}
				domelement=getelem(domel);
				if(domelement.style!=undefined){
					domelement.style.display="none";
				}
				return this;
			},
			height: function(){
				let domelement;
				domelement=getelem(domel);
				return parseFloat(getComputedStyle(domelement, null).height.replace("px", ""));
			},
			show:function(){
				let domelement;
				if(!document.getElementById){
					return false;
				}
				domelement=getelem(domel);
				if(domelement.style!=undefined){
					domelement.style.display="block";
				}
				return this;
			},
			animate:function(){
				let infiniteBool=0;
				let speedanim=0;
				let bit;
				//write code below
				//define arguments to work with
				el=getelem(domel);
				animationStr="";
				animationName=arguments[0];
				bit=arguments[1];
				if(bit<=1){
					infiniteBool=parseInt(arguments[1]);
				}
				else{
					speedanim=parseInt(arguments[1]);
				}
				callbackFunc=arguments[2];
				animpreffix="";
				animpreffix=getAnimationEvent();
				el.addEventListener(animpreffix,function(){
					if(infiniteBool==true){
						glog("INFINITO");
						el.classList.remove('infinite');
					}
					el.classList.remove(animationName);
					el.classList.remove('animated');
					if(animationName=='fadeOut'){
						el.style.opacity=0;
					}
					if(animationName=='fadeIn'){
						el.style.opacity=1;
					}
					callbackFunc();
				});
				//call animateCss function
				el.classList.add('animated');
				el.classList.add(animationName);
				if(infiniteBool==true){
					glog("INFINITO");
					el.classList.add('infinite');
				}
				else{
					setAnimationDuration(el,speedanim);
				}
				return this;
			},
			find:function(selector,callbackfind){
				// Final found elements
				let found_elements = [];
				let i;
				// Find all the outer matched elements
				let outers = getelem(domel);
				for(i=0;i<outers.length;i++){
					let elements_in_outer=outers[i].querySelectorAll(selector);
					// document.querySelectorAll() returns an "array-like" collection of elements
				// convert this "array-like" collection to an array
					elements_in_outer=Array.prototype.slice.call(elements_in_outer);
					found_elements=found_elements.concat(elements_in_outer);
				}
				// The final 4 elements
				if(found_elements.length>0){
					glog(found_elements);
					callbackfind(found_elements);
				}
				return this;
		   },
			each:function(callbackeach){
		      	let objeto;
		      	let x,y,valor,indice;
		      	objeto=getelems(domel);
		        genrl.each(objeto,callbackeach);
		        return this;
	      	},
			trigger:function(evtname){
		      	let objeto;
		      	objeto=getelem(domel);
				let event = document.createEvent('HTMLEvents');
				event.initEvent(evtname, true, false);
				objeto.dispatchEvent(event);
				return this;
			},
			empty:function(){
		      	let objeto;
		      	objeto=getelem(domel);
		        objeto.innerHTML='';
		        return this;
			},
			emptyVal:function(){
		      	let objeto;
		      	objeto=getelem(domel);
		        objeto.value='';
		        return this;
			},
			prop:function(property){
		      	//busca dentro del objeto y devuelve solo la primera acepcion
				let obj;
				//Llama a funcion interna prop(domel,prper)
				obj=prop_(domel,property);
				if(is.isObject(obj)){
					return obj;
				}
				return this;
			},
			wrap:function(){
		      	let objeto;
		      	let content;
		      	objeto=getelem(domel);
		      	content=document.createElement('div');
		      	content.class="wrap";
		      	content.name="wrap";
		      	content.id="wrap";
				wrap(objeto, content);
				return this;
			},
			wrapAll:function(){
				let wrapper = document.createElement('div');
				let objeto=getelems(domel);
				objeto[0].before(wrapper);
				elements.forEach(function(element) {
				    wrapper.append(element);
				});
				return this;
			},
			unwrap:function(docunw){
		      	let objeto;
		      	objeto=getelem(docunw);
				// get the element's parent node
				let parent = objeto.parentNode;
				// move all children out of the element
				while (objeto.firstChild) parent.insertBefore(objeto.firstChild, objeto);
				// remove the empty element
				parent.removeChild(objeto);
				return this;
			},
			html:function(){
		      	let objeto;
		      	let objetohtml=getelem(domel);
		      	let args=arguments;
		      	if(args[0]!=undefined){
		      		string=args[0];
		      		objetohtml.innerHTML = string;
		      		return this;
		      	}
				return objeto.innerHTML;
			},
			text:function(){
		      	let objeto;
		      	let objetotext=getelem(domel);
		      	let args=arguments;
		      	if(args[0]!=undefined){
		      		string=args[0];
		      		objetotext.textContent = string;
					return this;
		      	}
		      	else{
		      		return objeto;
		      	}
			},
			is:function(classElem){
		      	let objeto;
		      	let otroobjeto;
		      	objetois=getelem(domel);
		      	otroobjeto=getelem(classElem);
		      	if(objetois === otherEl){
					return 0;
		      	}
			},
			prev:function(){
		      	let objeto;
		      	let nextsib;
		      	objetoprev=getelem(domel);
		      	prevsib=objetoprev.previousElementSibling;
				return prevsib;
			},
			next:function(){
		      	let objeto;
		      	let nextsib;
		      	objetonext=getelem(domel);
		      	nextsib=objetonext.nextElementSibling;
				return nextsib;
			},
			remove:function(){
		      	let objeto;
		      	objetorm=getelem(domel);
		      	objetorm.parentNode.removeChild(objeto);
		      	return this;
			},
			replaceWith:function(string){
		      	let objetorep;
		      	objetorep=getelem(domel);
		      	objetorep.outerHTML = string;
		      	return this;
			},
			matches:function(selector){
		      	let objetomat;
		      	let otroobjetomat;
		      	objetomat=getelem(domel);
		      	otroobjetomat=getelem(classElem);
		      	if(objetomat === otroobjetomat){
					return this;
		      	}
			},
			filter:function(filterFn){
		      	let objetofilter;
		      	objetofilter=getelem(domel);
		      	if(typeof filterFn==='function'){
		      		Array.prototype.filter.call(objetofilter,filterFn);
		      	}
		      	return this;
			},
			has:function(strquery){
		      	let objetohas;
		      	let intqueryhas=domel + ":has " + strquery;
		      	objetohas=getelem(intqueryhas);
		      	if(typeof strquery==='string'){
		      		if(typeof objetohas==='object'){
		      			return this;
		      		}
		      	}
			},
			not:function(strquery){
				let objetonot;
		      	let intquerynot=domel + ":has " + strquery;
		      	objetonot=getelem(intquerynot);
		      	if(typeof strquery==='string'){
		      		if(typeof objetonot==='object'){
		      			return this;
		      		}
		      	}
			},
			child:function(number){
				child_(domel,number);
				return this;
			},
			closest:function(strelem){
				let objetoclo;
				objetoclo=getelem(domel);
				if(typeof strelem==='string'){
					return objetoclo.closest(strelem);
	  			}
	  			return this;
	  		},
	  		siblings:function(){
	  			let objetosib;
	  			objetosib=getelem(domel);
	  			Array.prototype.filter.call(objetosib.parentNode.children, function(child){
					return child !== objetosib;
				});
				return this;
	  		},
			offset:function(){
				let objetooff;
				let par;
				let rect;
				let result;
				objetooff=getelem(domel);
				rect = objetooff.getBoundingClientRect();
				result={
					top: rect.top + document.body.scrollTop,
					left: rect.left + document.body.scrollLeft
				};
				return result;
	  		},
	  		scrollLeft:function(){
	  			let objetoscr;
	  			let par;
	  			let rect;
	  			let result;
	  			objetoscr=getelem(domel);
	  			rect = objetoscr.getBoundingClientRect();
	  			if(arguments.length<1){
	  				let valor=rect.left;
	  				return valor;
	  			}
	  			else{
	  				let valor=rect.left + arguments[0];
	  				objetoscr.style.transition="transform 3s linear 1s";
					objetoscr.style.transform="translateX(" + valor + "px)";
	  				return this;
	  			}
	  		},
			scrollTop:function(){
		    	let objetoscrt;
		      	let par;
		      	let rect;
		      	let result;
		      	objetoscrt=getelem(domel);
		      	rect = objetoscrt.getBoundingClientRect();

		      	if(arguments.length<1){
		      		let valor=rect.top;
		      		return valor;
		      	}
		      	else{
		      		let valor=rect.top + arguments[0];
		      		objetoscrt.style.transition="transform 3s linear 1s";
		      		objetoscrt.style.transform="translateY(" + valor + "px)";
					return this;
				}
			},
			offsetParent:function(){
			  	let objetooffp;
			  	let par;
			  	let rect;
			  	let result;
			  	objetooffp=getelem(domel);
			  	result=objetooffp.offsetParent || objetooffp;
				return this;
			},
			parent:function(){
				let objetopar;
				objetopar=getelem(domel);
				return objetopar.parentNode;
			},
			position:function(){
		      	let objetopos;
		      	let result;
		      	objetopos=getelem(domel);
		      	result={left:objetopos.offsetLeft,top:objetopos.offsetTop};
				return result;
			},
			outerHeight:function(){
		      	let objeto;
		      	let result;
		      	let objetooh=getelem(domel);
			    let height=objetooh.offsetHeight;
		    	let style=getComputedStyle(objetooh);
		      	let args=arguments;
		      	if(args[0]!=undefined){
		      		if(args[0]==true){
					  		height+=parseInt(style.marginTop) + parseInt(style.marginBottom);
					  		return height;
		      		}
		      		else{
		      			return objetooh.offsetHeight;
		      		}
		      	}
		      	else{
		      		return objetooh.offsetHeight;
		      	}
			},
			outerWidth:function(){
		      	let result;
		      	let objetoow=getelem(domel);
			    let height=objeto.offsetWidth;
			    let style=getComputedStyle(objeto);
		      	let args=arguments;
		      	if(args[0]!=undefined){
		      		if(args[0]==true){
					  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
					  return width;
		      		}
		      		else{
		      			return objetoow.offsetWidth;
		      		}
		      	}
		      	else{
		      		return objetoow.offsetHeight;
		      	}
			},
			after:function(htmlstr){
		      	//write code below...
		      	let objaf;
		      	objaf=getelem(domel);
				objaf.insertAdjacentHTML('afterend', htmlstr);
				return this;
			},
			before:function(htmlstr){
		      	//write code below...
		      	let objbef;
		      	objbef=getelem(domel);
				objbef.insertAdjacentHTML('beforebegin', htmlstr);
				return this;
			},
			append:function(html){
		      	//write code below...
		      	let objappe;
		      	let elChild = document.createElement('div');
				objappe=getelem(domel);
				elChild.innerHTML=html;
				objappe.appendChild(elChild);
				return this;
			},
			prepend:function(html){
		      	//write code below...
		      	let objprep;
		      	objprep=getelem(domel);
				objprep.insertAdjacentHTML('afterend', html);
				return this;
			},
			clone:function(){
		      	//write code below...
		      	let objclo;
		      	objclo=getelem(domel);
		      	objclo.cloneNode(true);
		      	return this;
			},
			children:function(){
		      	//write code below...
		      	let objcld;
		      	objcld=getelem(domel);
				setChildrenAux_(objcld.children);
				return this;
			},
			first:function(){
		      	//write code below...
		      	let objfrs;
		      	let numeqch;
		      	objfrs=getelem(domel);
				numeqch=objfrs.children[0];
				return this;
			},
			last:function(){
		      	//write code below...
		      	let objlst;
		      	let numeqch;
		      	objlst=getelem(domel);
				numeqch=objlst.slice(-1);
				return this;
			},
			index:function(){
				let elm=getelem(domel);
				let c = elm.parentNode.children;
				let i=0;
				for(; i < c.length; i++ ){
					if( c[i] == elm ){
						return i;
					}
				}
				return this;
			},
			hasClass:function(classElem){
		      	let objetohasc;
		      	objetohasc=getelem(domel);
		      	if(objetohasc.classList.contains(classElem)){
					return this;
		      	}
			},
			addClass:function(classele){
		      	//write code below...
		      	let obj;let stringclass;let stringarr;let i;
				stringclass="";
				stringclass=classele;
		      	obj=getelem(domel);
				stringarr=stringclass.split(' ');
				if(stringarr.length>0){
					for(i=0;i<stringarr.length;i++){
						obj.classList.add(stringarr[i]);
					}
				}
				else{
					obj.classList.add(classele);
				}
				return this;
			},
			removeClass:function(classele){
		      	//write code below...
				let obj; let stringclass; let stringarr; stringclass="";let i;
				stringclass=classele;
	  			obj=getelem(domel);
				stringarr=stringclass.split(' ');
				if(stringarr.length>0){
					for(i=0;i<stringarr.length;i++){
						obj.classList.remove(stringarr[i]);
					}
				}
				else{
					obj.classList.remove(classele);
				}
				return this;
			},
			addAttrb:function(attr,value){
		      	//write code below...
		      	let obj;
		      	let type;
		      	let i;
		      	type=getobjtype(domel);
		      	switch(type){
		      		case 'element':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].setAttribute(attr,value);
		      			}
		      			break;
		      		case 'class':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].setAttribute(attr,value);
		      			}
		      			break;
		      		case 'id':
						obj=getelem(domel);
						obj.setAttribute(attr,value);
						break;
		      	}
		      	return this;
			},
			getAttrb:function(attr){
				//write code below...
		      	let obj;
		      	let type;
		      	let i;
		      	let result;
		      	result=Array;
		      	type=getobjtype(domel);
		      	switch(type){
		      		case 'element':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				result[i]=obj[i].getAttribute(attr);
		      			}
		      			return result;
		      			break;
		      		case 'class':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				result[i]=obj[i].getAttribute(attr);
		      			}
		      			return result;
		      			break;
		      		case 'id':
						obj=getelem(domel);
						result[i]=obj.getAttribute(attr);
						return result;
						break;
		      	}
				return this;
			},
			rmAttrb:function(attr){
		      	//write code below...
		      	let obj;
		      	let type;
		      	let i;
		      	type=getobjtype(domel);
		      	switch(type){
		      		case 'element':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].removeAttribute(attr);
		      			}
		      			break;
		      		case 'class':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].removeAttribute(attr);
		      			}
		      			break;
		      		case 'id':
						obj=getelem(domel);
						obj.removeAttribute(attr);
						break;
		      	}
		      	return this;
			},
			data:function(attr){
			  	//write code below...
			  	let obj;
			  	let i;
			  	let value;
			  	obj=getelems(domel);
			  	if(arguments.length<2){
					for(i=0;i<obj.length;i++){
						result[i]=obj[i].getAttribute(attr);
					}
					return result;
			  	}
			  	else{
			  		value=arguments[1];
					for(i=0;i<obj.length;i++){
						obj[i].setAttribute(attr,value);
					}
					result=0;
			  	}
				return this;
			},
			toggleClass:function(classele){
			  	//write code below...
			  	let obj;
			  	obj=getelem(domel);
			  	obj.classList.toggle(classele);
			  	return this;
			},
			cursor:function(estilo){
		        let fila;
		      	switch(estilo){
		      		case 'auto':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'pointer':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'wait':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'text':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'initial':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'inherit':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'none':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
	      		}
	      		return this;
	      	},
	      	toggleDisplay: function(){
	        	let fila;
	            if (!document.getElementById){
	                return false;
	            }
	            fila=getelem(domel);
	            if(fila.style.display != "none"){
	              fila.style.display = "none";
	            }
	            else{
	              fila.style.display = "";
	            }
	            return this;
	        },
	        resetText: function(){
	          	let textcontent;
	          	textcontent=getelem(domel);
	          	textcontent.value='';
				return this;
	        },
	        val: function(){
	            let valor;
	            let args;
	            args=arguments;
	            if(args[0]==undefined){
	                valor=valobj(domel);
	                return valor;
	            }
	            else{
	            	setval(domel,args[0]);
	            }
	            return this;
	        },
	        version: function(){
	            glog(version());
	            return this;
	        },
	        intval: function(){
				let number;
				valor=valobj(domel);
				return parseInt(valor);
	        },
	        floatval: function(){
	        	let number;
				valor=valobj(domel);
				return parseFloat(valor);
	        },
		    gotodiv: function(){
		        let objeto;
		        objeto=getelem(domel);
		        objeto.scrollIntoView();
		        return this;
		    },
			smooth: function(target, options){
			    let start = window.pageYOffset,
			        opt={
			            duration: options.duration,
			            offset: options.offset || 0,
			            callback: options.callback,
			            easing: easeInOutQuad
			        },
			        distance = typeof target === 'string'
			            ? opt.offset + document.querySelector(target).getBoundingClientRect().top
			            : target,
			        duration = typeof opt.duration === 'function'
			            ? opt.duration(distance)
			            : opt.duration,
			        timeStart, timeElapsed;
			    requestAnimationFrame(function(time){ timeStart = time; loop(time); });
			    function loop(time){
			        timeElapsed = time - timeStart;
			        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
			        if (timeElapsed < duration){
			        	requestAnimationFrame(loop)
			        }
			        else{
			        	end();
			        }
			    }
			    function end(){
			        window.scrollTo(0, start + distance);
			        if (typeof opt.callback==='function'){
			        	opt.callback();
			        }
			    }
			    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
			    function easeInOutQuad(t, b, c, d)  {
			        t /= d / 2
			        if(t < 1) return c / 2 * t * t + b
			        t--
			        return -c / 2 * (t * (t - 2) - 1) + b
			    }
			    return this;
			},
		    blink: function(status){
		        let fila;
		        switch(status){
		        	case 'on':
			        	fila=getelem(domel);
			        	fila.className="blink_div";
			        	break;
			        case 'off':
			        	fila=getelem(domel);
			        	fila.className="";
			        	break;

		        }
		        return this;
		    },
			submit:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.onsubmit=function(){
		        	callbackfunc();
		        }
		        return this;
			},
	        click:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.onclick=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	        dblClick:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.ondblclick=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	        keyup:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.onkeyup=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	        keydown:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.onkeydown=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	      	change:function(callbackfunc){
		        let control;
	        	control=getelem(domel);
		        control.onchange=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	      	blur:function(callbackfunc){
		        let control;
	        	control=getelem(domel);
		        control.onblur=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
			not:function(ignomename){
				let control=getelems(domel + ':not(' + ignomename + ')');
				if(control!=undefined){
					return this;
				}
				return this;
			},
			bind:function(fn,context){
				if(typeof fn==='function'){
					fn.bind(context);
				}
				return this;
			},
			trigger:function(el, eventName, options){
				let event;
				if (window.CustomEvent) {
					event = new CustomEvent(eventName, options);
				}
				else{
					event = document.createEvent('CustomEvent');
					event.initCustomEvent(eventName, true, true, options);
				}
				el.dispatchEvent(event);
				return this;
			},
			on:function(){
				let control;
				let eventoCall;
				eventoCall=arguments[0];
				callback=arguments[1];
				control=getelem(domel);
				control.addEventListener(eventoCall,callback);
				return this;
			},
			one:function(){
				let control;
				let eventoCall;
				eventoCall=arguments[0];
				callback=arguments[1];
				control=getelem(domel);
				control.addEventListener(eventoCall,function(){
					control.removeEventListener(eventoCall,callback);
				});
				return this;
		    },
			off:function(){
				let control;
				let eventoCall;
				eventoCall=arguments[0];
				callback=arguments[1];
				control=getelem(domel);
				control.removeEventListener(eventoCall,callback);
				return this;
			},
			get: function(stylesStr){
				let result;
				let aux,i;
				let objelem=getelem(domel);
				let style=window.getComputedStyle ? getComputedStyle(objelem,null) : objelem.currentStyle;
				result={};
				if(!Array.isArray(stylesStr)){
					aux=style[stylesStr];
					result[stylesStr]=aux;
				}
				else{
					let objeto=stylesStr;
					let indi;
					for(i=0;i<2;i++){
						indi=stylesStr[i];
						aux=style[indi];
						result[indi]=aux;
					}
				}
				return result;
			},
			set: function(styles){
				let elems;
				let i;
				if (typeof styles !== 'object') {
					throw new Error('Second parameter of this function should be an object');
				}
				elems=getCssElements(domel);
				if(elems.length === 0) {
					return false;
				}
				else{
					elems.forEach(function(elem) {
						for (let i in styles) {
							if (styles.hasOwnProperty(i)) {
								elem.style[i] = styles[i];
							}
						}
					});
				}
				return this;
			},
			css: function(style){
				//Hacer callback un argumento opcional
				let callbackCall;
				let callbackAux;
				let response;
				let dominter;
				let valaux;
				let valchildren;
				let valparent;
				let domelint;
				let objfinal=[{}];

				valaux=getValAux_();
				valchildren=getChildrenAux_();
				valparent=getParentAux_();
				//Identificar que el callback es uuna finción
				if(typeof arguments[1]==='function'){
					callbackCall=arguments[1];
					genrl.log("ES UNA FUNCION");
				}
				if(debugvar_(valaux)){
					domelint=valaux;
					genrl.log(domelint);
				}
				else{
					if(debugvar_(valchildren)){
						domelint=valchildren;
					}
					else{
						if(debugvar_(valparent)){
							domelint=valparent;
						}
					}
				}
				if(typeof style==='object'){
					genrl.log("ES UN OBJETO");
					if(Array.isArray(domelint)){
						if(style.length==undefined){
							genrl.log("CONFIRMADO OBJETO");
						}
						else{
							genrl.log("CONFIRMADO ARRAY");
							genrl.log(style);
							let max=parseInt(style.length);
							for(i=0;i<=max;i++){
								aux=style[i];
								aux_=g(domel).get(aux);
								if(aux_[aux]!=undefined){
									objfinal[aux]=aux_[aux];
								}
							}
							objfinal.length=i;
							return objfinal;
						}
						if(style.length>0){
							genrl.warn("ARRAY Cond 1");
							try{
								g(domel).set(style);
								return this;
							}
							catch(e){
								genrl.log("ERROR TRY CATCH 1");
								genrl.log(e);
							}
						}
					}
				}
				else{
					genrl.warn("STRING Cond 2");
					if(typeof style==='string'){
						genrl.log("Es un string");
						return g(domel).get(style);
					}
				}
				if(typeof callbackCall==='function'){
					callbackCall();
				}
			},
		}
	}
}(window));

//CLASE GENERAL - GENRL
genrl=(function(global,factory){
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
	    let foundIndex = -1;
	    for (let index = 0; index < array.length; index++) {
	        if (array[index] === valToFind) {
	            foundIndex = index;
	            break;
	        }
	    }
		return foundIndex;
	};
	function prop_(element,proper){
		let obj; //busca dentro del objeto y devuelve solo la primera acepcion
		let val;
		obj=getelems(element);
		if(is.isObject(obj)){
		  	result=obj[0].getAttribute(proper);
			return result;
		}
	};
	function propAll_(proper){
		let val=''; //busca dentro del objeto y devuelve solo la primera acepcion
		let array_tags=[];
		let array_final=[];
		let i=0;
		array_tags=getelems(proper);
		if(array_tags.length>0){
			for(i=0;i<array_tags.length;i++){
				array_final[i]=array_tags[i];
			}
			return array_final;
		}
	};
	function getScreenCordinates(obj) {
        let p = {};
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
	  let error = new Error(this.message);
	  error.name = this.name;
	  this.stack = error.stack;
	};
	function getBrowserPreffix(){
	  let N = navigator.appName, ua = navigator.userAgent, tem;
	  let M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
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
		let preffixbrowser;
		preffixbrowser=getBrowserPreffix();
		el.style[preffixbrowser + "-animation-duration"] = speed + "s";
		return 0;
	}
	function getTransitionEvent(){
	  let t, el = document.createElement("fakeelement");
	  let transitions = {
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
	  let t, el = document.createElement("fakeelement");
	  let animations = {
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
		let cadena;
		let typestr;
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
	function getSocket_(){
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
	setError.prototype = Object.create(Error.prototype);
	return{
		//write code below
		//aqui van las funciones que no dependen del DOM ni de un control. Que van solas sin atarla a un control HTML
		init: function(){
			this.createScope();
		},
		getxhr:function(){
			return getSocket_();
		},
		docready: function(fn){
			if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
				fn();
			}
			else{
		    	document.addEventListener('DOMContentLoaded', fn);
			}
		},
		ready: function(fn){
			if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
				fn();
			}
			else{
		    	document.addEventListener('DOMContentLoaded', fn);
			}
		},
		run: function(fn){
			if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
				fn();
			}
			else{
		    	document.addEventListener('DOMContentLoaded', fn);
			}
		},
		createScope: function(){
			//Crear Scope HTML - Javascript DOM
			scopenom="genrlapp-" + Math.floor(Math.random() * 27);
			g("html").addAttrb("id","appdata"+numapps);
			g("html").addAttrb("name","appdata"+numapps);
			g("html").addAttrb("data-scope",scopenom);
			g("html").addAttrb("data-gapp",scopenom);
			let attrbdata=g("html").getAttrb("data-scope");
			let model = new datab.Model(scopenom);
			numapps++;
		},
		log: function(msg){
			console.log(msg);
			return this;
		},
		error: function(msg){
			console.error(msg);
			return this;
		},
		info: function(msg){
			console.info(msg);
			return this;
		},
		warn: function(msg){
			console.warn(msg);
			return this;
		},
		map: function(array,callbackmap){
			let val,index;
			if(array.isArray()){
				array.map(callbackmap);
			}
			return this;
	  	},
		propAll:function(prper){
	      	//busca dentro del objeto y devuelve solo la primera acepcion
			let obj;
			obj=propAll_(prper);
			return obj;
		},
		extend:function(callback){
			//extiende las funcionalidades de la librería mediante la función interna extend
			genrl.fn.extend(genrl,callback);
		},
		create:function(domelement){
			document.createElement(domelement);
			return this;
		},
		slice: function(array,start,end,callbackslc){
			if(array.isArray()){
				callbackslc(array.slice(start, end));
			}
		},
	    encb64: function(string){
				return atob(string)
	    },
	    decb64: function(string){
				return btoa(string);
	    },
		each:function(objeto,callbackeach){
			let objProc;
			let x,y,valor,indice;
			if(is.isObject(objeto)){
				try {
					objeto.forEach(callbackeach);
				}
				catch(e){
					objProc=[
						objeto
					];
					objProc.forEach(callbackeach);
				}
			}
			else{
	      		glog("Is not an object!");
	      	}
	      	return this;
		},
	    preventDefault: function(e){
			if(e.preventDefault){
				e.preventDefault();
			}
			return this;
	    },
	    stopPropagation: function(e){
			if(e.stopPropagation){
				e.stopPropagation();
			}
			return this;
	    },
		watch:function(object,attrib,callback){
			//Función Watch
			elementDOM=getelem(object);
			watch(elementDOM,attrib,callback);
			return this;
		},
		unwatch:function(attrib,callback){
		 	//Función Unwatch
		 	elementDOM=getelem(object);
			unwatch(elementDOM,attrib,callback);
			return this;
		},
	    browser: function(){
				//Detect browser and write the corresponding name
				if (navigator.userAgent.search("MSIE") >= 0){
				    glog('"MS Internet Explorer ');
				    let position = navigator.userAgent.search("MSIE") + 5;
				    let end = navigator.userAgent.search("; Windows");
				    let version = navigator.userAgent.substring(position,end);
				    glog(version + '"');
				}
				else if (navigator.userAgent.search("Chrome") >= 0){
					glog('"Google Chrome ');
				    let position = navigator.userAgent.search("Chrome") + 7;
				    let end = navigator.userAgent.search(" Safari");
				    let version = navigator.userAgent.substring(position,end);
				    glog(version + '"');
				}
				else if (navigator.userAgent.search("Firefox") >= 0){
				    glog('"Mozilla Firefox ');
				    let position = navigator.userAgent.search("Firefox") + 8;
				    let version = navigator.userAgent.substring(position);
				    glog(version + '"');
				}
				else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0){//<< Here
				    glog('"Apple Safari ');
				    let position = navigator.userAgent.search("Version") + 8;
				    let end = navigator.userAgent.search(" Safari");
				    let version = navigator.userAgent.substring(position,end);
				    glog(version + '"');
				}
				else if (navigator.userAgent.search("Opera") >= 0){
				    glog('"Opera ');
				    let position = navigator.userAgent.search("Version") + 8;
				    let version = navigator.userAgent.substring(position);
				    glog(version + '"');
				}
				else{
				    glog('"Other"');
				}
				return navigator.userAgent;
	    },
	    isArray: function(arr){
	    	if(Object.prototype.toString.call(arr) === "[object Array]"){
	    		return true;
	    	}
	    	else{
	    		return false;
	    	}
	    },
	    isFunction: function(fn){
	        if(typeof fn === 'function'){
	        	return true;
	        }
	        else{
	        	return false;
	        }
	    },
	    isPlainObject: function(obj){
	        // is this an object?
	        if(obj != null && Object.prototype.toString.call(obj) === "[object Object]"){
	        	return true;
	        }
	        else{
	        	return false;
	        }
	    },
	    rReplace: function(direccion,variable,valor){
	        location.replace([direccion]+"?"+[variable]+"="+[valor]);
			return this;
	    },
	    rHref: function(direccion,variable,valor){
	        location.href([direccion]+"?"+[variable]+"="+[valor]);
			return this;
	    },
	    base64_encode: function(cadena){
	        return btoa(cadena);
	    },
	    base64_decode: function(cadena){
	        return atob(cadena);
	    },
		param: function(object) {
		    let encodedString = '';
		    for (let prop in object) {
		        if (object.hasOwnProperty(prop)) {
		            if (encodedString.length > 0) {
		                encodedString += '&';
		            }
		            encodedString += encodeURI(prop + '=' + object[prop]);
		        }
		    }
		    return encodedString;
		},
	    getParam: function(name){
	            let regexS = "[\\?&]"+name+"=([^&#]*)";
	            let regex = new RegExp ( regexS );
	            let tmpURL = window.location.href;
	            let results = regex.exec( tmpURL );
	            if(results==null){
					return"";
	            }
	            else{
	                return results[1];
	            }
	    },
	    utf8_encode: function(argString){
	      //  discuss at: http://phpjs.org/functions/utf8_encode/
	      // original by: Webtoolkit.info (http://www.webtoolkit.info/)
	      // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	      // improved by: sowberry
	      // improved by: Jack
	      // improved by: Yves Sucaet
	      // improved by: kirilloid
	      // bugfixed by: Onno Marsman
	      // bugfixed by: Onno Marsman
	      // bugfixed by: Ulrich
	      // bugfixed by: Rafal Kukawski
	      // bugfixed by: kirilloid
	      //   example 1: utf8_encode('Kevin van Zonneveld');
	      //   returns 1: 'Kevin van Zonneveld'
	      if (argString === null || typeof argString === 'undefined'){
	        return '';
	      }
	      let string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	      let utftext = '',
	        start, end, stringl = 0;

	      start = end = 0;
	      stringl = string.length;
	      for (let n = 0; n < stringl; n++){
	        let c1 = string.charCodeAt(n);
	        let enc = null;

	        if (c1 < 128){
	          end++;
	        } else if (c1 > 127 && c1 < 2048){
	          enc = String.fromCharCode(
	            (c1 >> 6) | 192, (c1 & 63) | 128
	          );
	        } else if ((c1 & 0xF800) != 0xD800){
	          enc = String.fromCharCode(
	            (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
	          );
	        } else { // surrogate pairs
	          if ((c1 & 0xFC00) != 0xD800){
	            throw new RangeError('Unmatched trail surrogate at ' + n);
	          }
	          let c2 = string.charCodeAt(++n);
	          if ((c2 & 0xFC00) != 0xDC00){
	            throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
	          }
	          c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
	          enc = String.fromCharCode(
	            (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
	          );
	        }
	        if (enc !== null){
	          if (end > start){
	            utftext += string.slice(start, end);
	          }
	          utftext += enc;
	          start = end = n + 1;
	        }
	      }

	      if (end > start){
	        utftext += string.slice(start, stringl);
	      }

	      return utftext;
	    },
	    utf8_decode: function(str_data){
	      //  discuss at: http://phpjs.org/functions/utf8_decode/
	      // original by: Webtoolkit.info (http://www.webtoolkit.info/)
	      //    input by: Aman Gupta
	      //    input by: Brett Zamir (http://brett-zamir.me)
	      // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	      // improved by: Norman "zEh" Fuchs
	      // bugfixed by: hitwork
	      // bugfixed by: Onno Marsman
	      // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	      // bugfixed by: kirilloid
	      //   example 1: utf8_decode('Kevin van Zonneveld');
	      //   returns 1: 'Kevin van Zonneveld'

	      let tmp_arr = [],
	        i = 0,
	        ac = 0,
	        c1 = 0,
	        c2 = 0,
	        c3 = 0,
	        c4 = 0;

	      str_data += '';

	      while (i < str_data.length){
	        c1 = str_data.charCodeAt(i);
	        if (c1 <= 191){
	          tmp_arr[ac++] = String.fromCharCode(c1);
	          i++;
	        } else if (c1 <= 223){
	          c2 = str_data.charCodeAt(i + 1);
	          tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
	          i += 2;
	        } else if (c1 <= 239){
	          // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
	          c2 = str_data.charCodeAt(i + 1);
	          c3 = str_data.charCodeAt(i + 2);
	          tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	          i += 3;
	        } else {
	          c2 = str_data.charCodeAt(i + 1);
	          c3 = str_data.charCodeAt(i + 2);
	          c4 = str_data.charCodeAt(i + 3);
	          c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
	          c1 -= 0x10000;
	          tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
	          tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
	          i += 4;
	        }
	      }

	      return tmp_arr.join('');
	    },
	    getURLComplete: function(){
	        return window.location.href;
	    },
	    getDomain: function(){
	        return document.domain;
	    },
	    getURI: function(){
	        let request_uri;
	        request_uri=location.pathname + location.search;
	        return request_uri;
	    },
	    explode: function(variab, delimiter){
	      let arraystr;
	      return variab.split(delimiter);
	    },
	    gotolocal: function(valselect){
	      let URL;
	      URL=valselect;
	      location.href=URL;
	    },
	    gotoremote: function(valselect){
	      let URL;
	      URL="http://"+valselect;
	      location.href=URL;
	    },
		parseHTML:function(htmlstr){
			let tmp = document.implementation.createHTMLDocument();
			tmp.body.innerHTML = htmlstr;
			return tmp.body.children;
		},
		parseJSON:function(json){
			return JSON.parse(json);
		},
		stringifyJSON:function(json){
			return JSON.stringify(json);
		},
		now:function(){
			return Date.now();
		},
		dialog:function(type,content,callback){
			switch(type){
				case 'alert':
					alert(title);
					callback();
					break;
				case 'confirm':
					if(confirm(title)){
						callback();
					}
					break;
				case 'terminal':
					prompt(title);
					callback();
					break;
			}
		},
		inArray: function(array, valToFind){
			return indexOf_(array,valToFind);
		},
		makeArray: function(pseudoarray){
			let realArray = [].slice.call(pseudoarray);
			return realArray;
		},
		indexOf: function(array, valToFind){
		    return indexOf_(array,valToFind);
		},
		getKey: function(e){
			let KeyCode;
			if(e){
				if(e.keyCode>0){
					KeyCode=e.keyCode;
				}
				else{
					KeyCode=e.charCode;
				}
			}
			return KeyCode;
		},
		getChar: function(e){
	       	let cadena;
			//bloquear teclado a solo numeros
			teclan=g.getKey(e);
			cadena=String.fromCharCode(teclan);
			return String.fromCharCode(cadena);
		},
		blockChar: function(e){
			//bloquear teclado a solo letras
			teclap=g.getKey(e);
			teclan=String.fromCharCode(teclap);
			if(IsNumeric(teclan)==true){
				return "Solo está peritido escribir letras";
			}
			return this;
		},
		bloqNum: function(e){
			teclap=g.getKey(e);
			teclan=String.fromCharCode(teclap);
			if(IsNumeric(teclan)==false){
				return "Solo esta permitido escribir numeros";
			}
			return this;
		},
		trim: function(cadena){
			if (cadena.trim) {
				return cadena.trim();
			}
			return cadena.replace(/^\s+|\s+$/g, '');
		},
		type: function(objname){
			//retorna el tipo de objeto
			let obj;
			obj=getelem(objname);
			return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
		},
	};
}(window));
////////Módulo para extender el framework
genrl.fn=(function(){
	let _class2type={};
	function glogfn(msg){
		console.log(msg);
	};
	function _type(obj){
	    return obj == null ?
	      String( obj ) :
	      _class2type[ toString.call(obj) ] || "object";
	};
	function _isWindow(obj) {
    return obj != null && obj == obj.window;
  };
  function _isFunction(target){
    return toString.call(target) === "[object Function]";
  };
  let _isArray =  Array.isArray || function(obj) {
      return _type(obj) === "array";
	};
	function _isPlainObject(obj) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || _type(obj) !== "object" || obj.nodeType || _isWindow( obj ) ) {
			return false;
		}
		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		}
		catch(e){
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		let key;
		for ( key in obj ) {}
		return key === undefined || hasOwn.call( obj, key );
	};
	function _extend(){
    let options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !_isFunction(target) ) {
      target = {};
    }
    if ( length === i ) {
      target = this;
      --i;
    }
    for ( ; i < length; i++ ) {
      // Only deal with non-null/undefined values
      if ( (options = arguments[ i ]) != null ) {
        // Extend the base object
        for ( name in options ) {
          src = target[ name ];
          copy = options[ name ];

          // Prevent never-ending loop
          if ( target === copy ) {
            continue;
          }
          // Recurse if we're merging plain objects or arrays
          if ( deep && copy && ( _isPlainObject(copy) || (copyIsArray = _isArray(copy)) ) ) {
            if ( copyIsArray ) {
              copyIsArray = false;
              clone = src && _isArray(src) ? src : [];

            } else {
              clone = src && _isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[ name ] = _extend( deep, clone, copy );

          // Don't bring in undefined values
          } else if ( copy !== undefined ) {
            target[ name ] = copy;
          }
        }
      }
    }
    // Return the modified object
    return target;
};
	return{
		extend:function(){
			let options, name, src, copy, copyIsArray, clone,
	      target = arguments[0] || {},
	      i = 1,
	      length = arguments.length,
	      deep = false;
	    // Handle a deep copy situation
	    if ( typeof target === "boolean" ) {
	      deep = target;
	      target = arguments[1] || {};
	      // skip the boolean and the target
	      i = 2;
	    }
	    // Handle case when target is a string or something (possible in deep copy)
	    if ( typeof target !== "object" && !_isFunction(target) ) {
	      target = {};
	    }
	    if ( length === i ) {
	      target = this;
	      --i;
	    }
	    for ( ; i < length; i++ ) {
	      // Only deal with non-null/undefined values
	      if ( (options = arguments[ i ]) != null ) {
	        // Extend the base object
	        for ( name in options ) {
	          src = target[ name ];
	          copy = options[ name ];

	          // Prevent never-ending loop
	          if ( target === copy ) {
	            continue;
	          }

	          // Recurse if we're merging plain objects or arrays
	          if ( deep && copy && ( _isPlainObject(copy) || (copyIsArray = _isArray(copy)) ) ) {
	            if ( copyIsArray ) {
	              copyIsArray = false;
	              clone = src && _isArray(src) ? src : [];

	            } else {
	              clone = src && _isPlainObject(src) ? src : {};
	            }

	            // Never move original objects, clone them
	            target[ name ] = _extend( deep, clone, copy );

	          // Don't bring in undefined values
	          } else if ( copy !== undefined ) {
	            target[ name ] = copy;
	          }
	        }
	      }
	    }
	    // Return the modified object
			return target;
		}
	}
}());
//Módulo - Path.JS - Enrutado
/************************************************/
genrl.path=(function(){
	//Submodulo Cookies
	//Submodulo path / Rewrite pathJS
	function version(){
		return "1.0.0";
	};
	return{
		//Write code below..
		getVersion:function(){
	        return version();
	    },
	    map:function(path){
	        if(genrl.path.routes.defined.hasOwnProperty(path)){
	            return genrl.path.routes.defined[path];
	        }
	        else{
				return new genrl.path.core.route(path);
	        }
	    },
	    root: function(path){
	        genrl.path.routes.root = path;
	    },
	    rescue: function(fn){
	        genrl.path.routes.rescue = fn;
	    },
	    history: {
	        initial:{}, // Empty container for "Initial Popstate" checking variables.
	        pushState: function(state, title, path){
	            if(genrl.path.history.supported){
	                if(genrl.path.dispatch(path)){
	                    history.pushState(state, title, path);
	                }
	            } else {
	                if(genrl.path.history.fallback){
	                    window.location.hash = "#" + path;
	                }
	            }
	        },
	        popState: function(event){
	            let initialPop = !genrl.path.history.initial.popped && location.href == genrl.path.history.initial.URL;
	            genrl.path.history.initial.popped = true;
	            if(initialPop) return;
	            genrl.path.dispatch(document.location.pathname);
	        },
	        listen: function(fallback){
	            genrl.path.history.supported = !!(window.history && window.history.pushState);
	            genrl.path.history.fallback  = fallback;

	            if(genrl.path.history.supported){
	                genrl.path.history.initial.popped = ('state' in window.history), genrl.path.history.initial.URL = location.href;
	                window.onpopstate = path.history.popState;
	            }
	            else{
	                if(genrl.path.history.fallback){
	                    for(route in genrl.path.routes.defined){
	                        if(route.charAt(0) != "#"){
	                          genrl.path.routes.defined["#"+route] = genrl.path.routes.defined[route];
	                          genrl.path.routes.defined["#"+route].path = "#"+route;
	                        }
	                    }
	                    path.listen();
	                }
	            }
	        }
	    },
	    match:function(path, parameterize){
			let compare="";
			let params = {}, route = null, possible_routes, slice, i, j;
				try{
			        for (route in genrl.path.routes.defined){
			            if (route !== null && route !== undefined){
			                route = genrl.path.routes.defined[route];
			                possible_routes = route.partition();
			                for (j = 0; j < possible_routes.length; j++){
			                    slice = possible_routes[j];
			                    compare = path;
			                    if (slice.search(/:/) > 0){
			                        for (i = 0; i < slice.split("/").length; i++){
			                            if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")){
			                                params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
			                                compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
			                            }
			                        }
			                    }
			                    if (slice === compare){
			                        if (parameterize){
			                            route.params = params;
			                        }
			                        return route;
			                    }
			                }
			            }
			        }
				}
				catch(e){
					//Tipo de error
					//prototipo de excepcion donde aparece el tipo de error a validar
					namerror=e.__proto__.name;
					if(namerror!='TypeError'){
						genrl.log(e);
					}
					else{
						genrl.log("EXCEPCION: Esta no es una ruta definida");
					}
				}
				return null;
	    },
	    dispatch:function(passed_route){
	        let previous_route, matched_route;
	        if (genrl.path.routes.current !== passed_route){
	            genrl.path.routes.previous = genrl.path.routes.current;
	            genrl.path.routes.current = passed_route;
	            matched_route = genrl.path.match(passed_route, true);

	            if (genrl.path.routes.previous){
	                previous_route = genrl.path.match(genrl.path.routes.previous);
	                if (previous_route !== null && previous_route.do_exit !== null){
	                    previous_route.do_exit();
	                }
	            }

	            if (matched_route !== null){
	                matched_route.run();
	                return true;
	            } else {
	                if (genrl.path.routes.rescue !== null){
	                    genrl.path.routes.rescue();
	                }
	            }
	        }
	    },
	    listen:function(){
	        let fn = function(){ genrl.path.dispatch(location.hash); }

	        if (location.hash === ""){
	            if (genrl.path.routes.root !== null){
	                location.hash = genrl.path.routes.root;
	            }
	        }

	        // The 'document.documentMode' checks below ensure that pathJS fires the right events
	        // even in IE "Quirks Mode".
	        if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)){
	            window.onhashchange = fn;
	        } else {
	            setInterval(fn, 50);
	        }

	        if(location.hash !== ""){
	            genrl.path.dispatch(location.hash);
	        }
	    },
	    core:{
	        route:function(path){
	            this.path = path;
	            this.action = null;
	            this.do_enter = [];
	            this.do_exit = null;
	            this.params = {};
	            genrl.path.routes.defined[path] = this;
	        }
	    },
	    routes:{
	        'current': null,
	        'root': null,
	        'rescue': null,
	        'previous': null,
	        'defined': {}
	    }
	}
}());
//Módulo - Path.JS - prototipos
/************************************************/
genrl.path.core.route.prototype = {
    'to': function (fn) {
        this.action = fn;
        return this;
    },
    'enter': function (fns) {
        if (fns instanceof Array) {
            this.do_enter = this.do_enter.concat(fns);
        } else {
            this.do_enter.push(fns);
        }
        return this;
    },
    'exit': function (fn) {
        this.do_exit = fn;
        return this;
    },
    'partition': function () {
        let parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
        while (text = re.exec(this.path)) {
            parts.push(text[1]);
        }
        options.push(this.path.split("(")[0]);
        for (i = 0; i < parts.length; i++) {
            options.push(options[options.length - 1] + parts[i]);
        }
        return options;
    },
    'run': function () {
        let halt_execution = false, i, result, previous;

        if (genrl.path.routes.defined[this.path].hasOwnProperty("do_enter")) {
            if (genrl.path.routes.defined[this.path].do_enter.length > 0) {
                for (i = 0; i < genrl.path.routes.defined[this.path].do_enter.length; i++) {
                    result = genrl.path.routes.defined[this.path].do_enter[i].apply(this, null);
                    if (result === false) {
                        halt_execution = true;
                        break;
                    }
                }
            }
        }
        if(!halt_execution){
            genrl.path.routes.defined[this.path].action();
        }
    }
};
////////PROTOTIPOS//////////
genrl.__proto__.extend_=function(callback){
	//extiende las funcionalidades de la librería mediante la función interna extend
	genrl.fn.extend(genrl,callback);
};
genrl.__proto__.watch_=function(objeto,attrib,callback){
	//funcion Watch
	DOMelement=g.getelem(objeto);
	watch(DOMelement,attrib,callback);
};
genrl.__proto__.unwatch_=function(objeto,attrib,callback){
	//Funcion Unwatch
	DOMelement=g.getelem(objeto);
	unwatch(DOMelement,attrib,callback);
};
genrl.__proto__.ajax=function(){
	let sock;
	sock=genrl.getxhr();
	return sock;
};
genrl.__proto__.ds=function(iddataset){
  	let obj;
  	let idfinal;
  	obj=g.getelems(iddataset);
  	return{
  		get:function(nomvar){
  			let result;
			idfinal="data-" + nomvar;
			result=g(iddataset).prop(idfinal);
			return result;
  		},
  		set:function(nomvar,val){
				if(obj.dataset==undefined){
	  			idfinal="data-" + nomvar;
	  			g(iddataset).addAttrb(idfinal,val);
				}
				else{
					Object.defineProperty(obj.dataset, nomvar, "data-variable");
				}
  		},
  		remove:function(nomvar){
  			idfinal="data-" + nomvar;
  			g(iddataset).rmAttrb(idfinal);
  		},
	}
};
genrl.__proto__.isReady=function(){
	if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		return 1;
	}
	else{
		return 0;
	}
}
genrl.__proto__.isEmpty=function(string){
	if(typeof string==='string'){
		if(string.replace(/\s/g,"")==""){
			return;
		}
		else{
			return -2;
		}
	}
	else{
		return -1;
	}
};
genrl.__proto__.getelem=function(id){
	let objeto;
	if(typeof id==='string'){
		objeto=document.querySelector(id);
		if(typeof objeto==='object'){
			return objeto;
		}
	}
};
genrl.__proto__.getelems=function(tag){
	let arrtags=[];
	if(tag!=undefined){
		arrtags=document.querySelectorAll(tag);
		return arrtags;
	}
	else{
		return -1;
	}
};
genrl.extend({ cripto });
genrl.extend({ ww });
genrl.extend({ ws });
genrl.extend({ storage });
genrl.extend({ fetchapi });
genrl.extend({ ajaxapi });
genrl.extend({ webapi });
genrl.extend({ ytapi });
genrl.init();
module.exports=g;
