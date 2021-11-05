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
var config=[{}];
var objectfinal=[{}];
var coleccion=[{}];
var componentes=[{}];
var componentshad;
class Component extends HTMLElement {
  constructor() {
    super();
    // element created
  }

  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
	this.id=config.id;
	this.name=config.id;
	this.innerHTML=config.template;
	const shadowRoot = this.attachShadow({mode: 'open'});
	shadowRoot.innerHTML =config.template;
	if(typeof config.callbackfnc==='function'){
		config.callbackfnc(this.innerHTML);
	}
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return config.observable;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
    this.connectedCallback();
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}
components=(function(){
	//Submodulo Components
	return{
		create:function(defaults){
			//name
			//id
			//template
			//defaults.observable
			if(defaults.name!='' && defaults.id!='' && defaults.template!='' && defaults.callbackfnc!=''){
				config=defaults;
				window.customElements.define(config.name, Component);
				componentes.push(config);
			}
			else{
				genrl.log("Faltan datos");
			}
		}
	}
}(window));
module.exports=components;
