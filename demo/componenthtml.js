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
/* Web Component*/
/************************************************/
	let template = genrl.getCreate('template');
	let fetchapi=genrl.ajaxapi;
	fetchapi
	.get("template.html")
	.then(function(data){
		component=genrl.components;
		template.innerHTML=data;
		class MyCounter extends HTMLElement {
			constructor() {
				super();
				this.count = 0;
				this.attachShadow({ mode: 'open' });
			}
			connectedCallback() {
				this.shadowRoot.appendChild(template.content.cloneNode(true));
				this.shadowRoot.getElementById('inc').onclick = () => this.inc();
				this.shadowRoot.getElementById('dec').onclick = () => this.dec();
				this.update(this.count);
			}
			inc() {
				this.update(++this.count);
			}
			dec() {
				this.update(--this.count);
			}
			update(count) {
				this.shadowRoot.getElementById('count').innerHTML = count;
			}
		}

		component.register({
			tag:"my-counter",
			webcomp: MyCounter
		});
	})
	.catch(function(e){	
		console.log("ERROR:" + e);
	})
