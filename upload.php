<?php
	$JSON    =file_get_contents("php://input");
	$request =json_decode($JSON);
	$data=base64_decode($request->data);
	$fileName=$request->name;
	$serverFile=time().$fileName;
	$fp=fopen('uploads/'.$serverFile,'w'); //Prepends timestamp to prevent overwriting
	fwrite($fp,$data);
	fclose($fp);
	$returnData[]=array("file"=>$serverFile);
	echo(json_encode($returnData));
?>