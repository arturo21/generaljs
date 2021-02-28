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
/*función - módulo video yt api*/
/*
var options = {
  iterations: Infinity,
  iterationStart: 0,
  delay: 0,
  endDelay: 0,
  direction: 'alternate',
  duration: 700,
  fill: 'forwards',
  easing: 'ease-out',
}
*/
/************************************************/
let nombrewapi='';
let done = false;
let player;
let divplayer;
let contenedor;
let int_player;
ytapi=(function(nombrewapi){

	//Submodulo YTAPI
	// 4. The API will call this function when the video player is ready.
	function onPlayerReady(event) {
		console.log("onPlayerReady", arguments);   //This shows in console
		event.target.playVideo();
	}

	// 5. The API calls this function when the player's state changes.
	//    The function indicates that when playing a video (state=1),
	//    the player should play for six seconds and then stop.
	function onPlayerStateChange(event) {
		console.log("onPlayerStateChange", arguments);   //This shows in console
		if (event.data == YT.PlayerState.PLAYING && !done) {
			setTimeout(stopVideo, 6000);
			done = true;
		}
	}
	function stopVideo() {
		player.stopVideo();
	}
	function getPlayer(cont,id,ancho,alto){
		player = new YT.Player('player', {
			height: alto,
			width: ancho,
			videoId: id,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}

	function onYouTubePlayer(cont,id,ancho,alto) {
		console.log("ID DE CONTROL DE YOUTUBE " + cont);
		console.log("ID DE VIDEO DE YOUTUBE " + id);
		if (typeof(YT)=='undefined' || typeof(YT.Player)=='undefined') {
	    var tag = document.createElement('script');
	    tag.src = "https://www.youtube.com/iframe_api";
	    var firstScriptTag = document.getElementsByTagName('script')[0];
	    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	    window.onYouTubePlayerAPIReady = function() {
				getPlayer(cont,id,ancho,alto);
	    };
	  }
		else {
			getPlayer(cont,id,ancho,alto);
	  }
	}

	function onYouTubeIframeAPIReady() {
		console.log("onYouTubeIframeAPIReady", arguments);   //This shows in console
	}
	return{
		play:function(optiones){
			genrl.docready(function(){
				divplayer = document.createElement('div');
				contenedor = document.querySelector(optiones.cont);
				divplayer.id="player";
				divplayer.name="player";
				contenedor.appendChild(divplayer);
				onYouTubePlayer(divplayer.id,optiones.id,optiones.ancho,optiones.alto);
				return this;
			});
		}
	}
}(nombrewapi));
module.exports=ytapi;
