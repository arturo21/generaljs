require("../node_modules/glider-js/glider.css");
require("../node_modules/glider-js/glider-compat.min.js");
Glider=require("glider-js");
gcycle=(function(){
	var slider;
	function getelem(id){
		var objeto;
		if(typeof id==='string'){
			objeto=document.querySelector(id);
			if(typeof objeto==='object'){
				return objeto;
			}
		}
	};
	function sliderglider(obj,options){
		var index=0;
		var slider;
		slider=new Glider(obj,options);
		if(options.autoplay==true){
			//programación del AUTOPLAY
			var timeint=setInterval(function(){
				if(index!=0){
					slider.scrollItem(index);
				}
				else{
					slider.scrollItem(0);
				}
				if(index==(slider.slides.length - 1)){
					index=0;
				}
				else{
					index++;
				}
			},parseInt(slider.opt.durationbs));
			/////////////////////////////////
		}
		if(options.getobject==true){
			console.log("Devolviendo objeto...");
			return slider;
		}
	}
  	return{
		docready: function(fn){
			if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
				fn();
			}
			else{
		    	document.addEventListener('DOMContentLoaded', fn);
			}
		},
  		info:function(){
			console.log("Hola Mundo!");
			if(slider){
				console.log(slider);
			}
			else{
				console.log("No slider INIT");
			}
			return 0;
  		},
  		log:function(msg){
			console.log(msg);
			return 0;
  		},
  		run:function(options){
			var obj;
			var options;
			var slider;
			var objname;
			if(!options.container){
				console.error("No se especificó el contenedor. Vuelva a intentarlo.");
			}
			else{
				objname=options.container;
				obj=getelem(objname);
				obj.style.overflow="hidden";
				if(!options.getobject){
					try{
						console.warn("No se encontró parámetro GetObject.");
						sliderglider(obj,options);
						return 0;
					}
					catch{
						console.log("No se pudo crear el objeto.");
					}
				}
				else{
					try{
						return sliderglider(obj,options);
					}
					catch{
						console.error("No se pudo crear objeto.");
					}
				}
			}
  		}
	}
}());
module.exports=gcycle;