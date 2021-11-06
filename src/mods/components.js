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
		create:function(defaults){
			//name
			//id
			//template
			//Class (class debe estar afuera)
			//defaults.observable
			config=defaults;
			window.customElements.define(config.name, Component);
			if(config.class!=''){
				Component=config.class;
				if(config.name!='' && config.id!='' && config.template!='' && config.callbackfnc!=''){
					if(config.type=='external'){
						aux=config.template;
						splitaux=aux.split(".");
						if(splitaux[(splitaux.length-1)]=="html"){
							let fetchapi=genrl.ajaxapi;
							fetchapi
							.get(config.template)
							.then(function(data){
								config.template=data;
								window.customElements.define(config.name, newcomponent);
								newcomponent= new Component();
							})
							.catch(function(e){	
								console.log("ERROR:" + e);
							})
						}
					}
					if(config.type=='embeded'){
						window.customElements.define(config.name, newcomponent);
						newcomponent= new Component();
					}
				}
			}
		}
	}
}(window));
module.exports=components;
