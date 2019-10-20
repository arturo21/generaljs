this.onmessage = function(e) {
  var mensaje;
  mensaje = e.data;
  console.log('Message received: ' + mensaje);
  if(mensaje=="Hola"){
    console.log('Cómo estás?');
    console.log('Adiós!');
  }
}
