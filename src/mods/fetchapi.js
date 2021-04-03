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
/************************************************/
/**********************FETCH API*****************/
/************************************************/
fetchapi=(function(global,factory){
  //write code below
  function getSocket(){
    let fetchapi=fetch;
    if(fetchapi){
      return fetchapi;
    }
  };
  return{
    getFetch:function(){
		let sockfetch=getSocket();
		return sockfetch;
  	},
  	get:function(url,callbackReq){
  		let objeto;
		let x,y,valor,indice;
		let sockfetch=getSocket();
		sockfetch(url)
	    .then(function(response){
	    	response.json().then(function(data){
			if(response.ok){
		          try {
		            callbackReq(data);
		          }
		          catch (e) {
		            throw new Error(e);
		          }
		          finally {
		              //silence is golden
		          }
	          }
	    	})
	        .catch(function(error){
	          console.log(error);
	        })
	    })
	    .catch(function(error){
	      console.log(error);
	    })
  	},
  	post:function(url,data,callbackReq){
		let sockfetch=getSocket();
		let options;
		let respjson;
		let objeto;
		let x,y,valor,indice;
      options={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
			"data":data
		})
      }
      sockfetch(url,options)
        .then(function(response){
        	if(response.ok){
				response.text().then(function(data){
					callbackReq(data);
				})
		        .catch(function(error){
		          	console.log(error);
	        	})
        	}
        })
        .catch(function(error){
          console.log(error);
        })
  	}
  }
}(window));
module.exports=fetchapi;
