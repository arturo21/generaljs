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

var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");
var MD5 = require("crypto-js/md5");
/************************************************/
cripto=(function(){
  //write code below
  return{
  	encode:function(protocol,key,message){
  		var protStr="";
  		protStr=protocol.toUpperCase();
  		switch(protocol){
  			case "SHA256":
  				ciphertext = SHA256(message,key);      				
  				break;
  			case "AES":
  				ciphertext = AES(message,key);
  				break;
  			case "MD5":
  				ciphertext = MD5(message, key);
  				break;
  		}
  		return ciphertext;
  	},
  	decode:function(protocol,key,message){
  		
  	},
  	hash:function(protocol,key,message){
  		
  	}
  }
}());
module.exports=cripto;