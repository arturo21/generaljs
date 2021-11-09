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
/*función - módulo interno components*/
/************************************************/
let config=[{}];
let aux;
let splitaux;
let newcomponent;
let Component;

components=(function(){
	//Submodulo Components
	return{
		register:function(tag, webcomp){
			window.customElements.define(tag, webcomp);
		},
		addcomponent:function(tag,templateJSX,callback){
			let template = genrl.getCreate('template');
			let fetchapi=genrl.ajaxapi;
			fetchapi
			.get(templateJSX)
			.then(function(data){
				template.innerHTML=data;
				if(typeof callback==="function"){
					callback(template, data);
				}
			})
			.catch(function(e){	
				console.log("ERROR:" + e);
			})
		},
	}
}(window));
module.exports=components;
