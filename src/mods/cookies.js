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
//Módulo - prototipo que permite extender el framework
/************************************************/
storage=(function(){
	//Submodulo Cookies
	return{
		setLocal:function(variable,valorvariable){
			try{
				window.localStorage.setItem(variable, valorvariable);
			}
			catch(e){
				console.log(e);
			}
		},
		getLocal:function(variable){
			if (window.localStorage) {
			  return window.localStorage.getItem(variable);
			}
			else {
			  throw new Error('Tu navegador no soporta LocalStorage!');
			}
		},
		rmLocal:function(variable){
			if (window.localStorage) {
			  window.localStorage.removeItem(variable);
			}
			else {
			  throw new Error('Tu navegador no soporta LocalStorage!');
			}
		},
		setSession:function(variable,valorvariable){
			if (window.sessionStorage) {
				window.sessionStorage.setItem(variable, valorvariable);
			}
			else {
				throw new Error('Tu navegador no soporta SessionStorage!');
			}
		},
		getSession:function(variable){
			if (window.sessionStorage) {
				return window.sessionStorage.getItem(variable);
			}
			else {
				throw new Error('Tu navegador no soporta SessionStorage!');
			}
		},
		rmSession:function(variable){
			if (window.sessionStorage) {
				window.sessionStorage.removeItem(variable);
			}
			else {
				throw new Error('Tu navegador no soporta SessionStorage!');
			}
		}
	}
}());
module.exports=storage;
