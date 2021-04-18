console.log(g);
console.log(genrl);
genrl.docready(function(){
	g("#algo").css({
		'height':'500px',
		'width':'500px',
		'background':'#000'
	},
	function(){
		genrl.log("LISTO!");
	});
	genrl.log("**********************************");
	genrl.log("VIDEO API");
	var video=genrl.ytapi.play({
		'cont':'#player_out',
		'id':'WyOIPZ2hLSA',
		'ancho':'1024',
		'alto':'1024'
	});
	genrl.log(video);
	genrl.log("**********************************");
});
