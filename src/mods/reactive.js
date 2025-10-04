/*
  Copyright (C) 2024 Arturo Vasquez Soluciones Web.
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
/*función - módulo interno reactive**************/
/************************************************/

let reactive=(function(){
	//Submodulo Reactive
	return{
		addcomponent:function(argumentos){
			//tag, webcomp, templateJSX, container, callback
			window.customElements.define(argumentos.tag, argumentos.webcomp);
			if(argumentos.tag){
				if(argumentos.webcomp){
					if(argumentos.webcomp){
						//****contenedor*padre**************************//
						let template = genrl.getCreate('template');
						let container = genrl.getElem(argumentos.container);
						//**********************************************//
						template.appendChild(argumentos.templateJSX);
						container.appendChild(argumentos.template);
						if(typeof callback==="function"){
							callback(template, data);
						}
					}
					else{
						return -3;	
					}
				}
				else{
					return -2;
				}
			}
			else{
				return -1;
			}
		},
	}
}(window));
module.exports=reactive;
