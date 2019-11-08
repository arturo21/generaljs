	g.extend({
		saludofunc:function(mensaje){
			console.log("SALUDOFUNC: HOLA, " + mensaje + " -> funcion extendida con otra funcion dentro de raiz");
		}
	});
	g.fn.extend({
		saludos:function(mensaje){
			console.log("SALUDOFUNC FN: HOLA, " + mensaje + " -> funcion extendida con otra funcion dentro de fn");
		}
	});