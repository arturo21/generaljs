<?php
	session_start();
	$JSON       = file_get_contents("php://input");
	$request    = json_decode($JSON);
	echo($request->nombre);

?>
