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
/*función - módulo web api animations*/
/*
var options = {
  iterations: Infinity,
  iterationStart: 0,
  delay: 0,
  endDelay: 0,
  direction: 'alternate',
  duration: 700,
  fill: 'forwards',
  easing: 'ease-out',
}
*/
/************************************************/
let nombrewapi='';
let element;
webapi=(function(nombrewapi){
	//Submodulo WebAnimationsAPI
	return{
		animate:function(options){
			//contenedor,keyframesanim,optanim
			if(element!=undefined){
				element=document.querySelector(options.contenedor);
				element.animate(options.keyframesanim, options.optanim)
			}
			else{
				glog("El Elemento no está definido para trabajar con la API.");
			}
			return this;
		}
	}
}(nombrewapi));
module.exports=webapi;
