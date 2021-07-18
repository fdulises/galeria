<?php
	require("conexion.php");
	require("funcionesGaleria.php");
	
	$respuesta = json_encode(array('estado' => 0));
	
	if( isset($_GET['id']) ){if( $_GET['id'] != '' ){
		if( eliminar($_GET['id']) ) $respuesta = json_encode(array('estado' => 1));
	}}
	
	echo $respuesta;