	genrl.extend({
		saludofunc:function(mensaje){
			genrl.log("SALUDOFUNC: HOLA, " + mensaje + " -> funcion extendida con otra funcion dentro de raiz");
		}
	});
	genrl.fn.extend({
		saludos:function(mensaje){
			genrl.log("SALUDOFUNC FN: HOLA, " + mensaje + " -> funcion extendida con otra funcion dentro de fn");
		}
	});
