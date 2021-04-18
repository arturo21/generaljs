<?php
	session_start();
	$JSON       = trim(file_get_contents("php://input"));
	$request    = json_decode($JSON,true);
	if(!is_array($request)){
		echo("INVALID");
	}
	else{
		echo("VALID\n\n");
		$data=$request['data'];
		$method=$data['method'];
		echo($method."\n\n");
		print_r(var_dump($request));
	}
?>
