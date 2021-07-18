<?php
	require("conexion.php");
	require("funcionesGaleria.php");
	
	$respuesta = json_encode(array('estado' => 0));
	
	if( isset($_GET['url']) ){if( $_GET['url'] != '' ){
		$parse = array();
		parse_str( parse_url($_GET['url'], PHP_URL_QUERY), $parse );
		if( isset($parse['v']) ){
			$idvideo = $parse['v'];
			$portada = "https://i.ytimg.com/vi/{$idvideo}/mqdefault.jpg";
			$nuevo = agregar($idvideo, $_GET['url'], $portada);
			if( $nuevo ){
				$respuesta = json_encode(array(
					'estado' => $nuevo,
					'idvideo' => $idvideo,
					'url' => $_GET['url'],
					'imagen' => $portada,
				));
			}
		}
	}}
	
	echo $respuesta;