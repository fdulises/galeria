<?php
	function agregar($idvideo, $url, $portada){
		$query = "INSERT INTO videos(idvideo, url, portada) VALUES('{$idvideo}', '{$url}', '{$portada}')";
		if( dbcon::sendQuery($query) ) return dbcon::id();
		return 0;
	}
	
	function eliminar($id){
		return dbcon::sendQuery("DELETE FROM videos WHERE id='{$id}'");
	}
	
	function obtener(){
		return dbcon::query("SELECT * FROM videos ORDER BY id DESC");
	}
	
	function instalar(){
		$galeria = dbcon::sendQuery("
			CREATE TABLE IF NOT EXISTS videos(
				id INTEGER NOT NULL,
				idvideo TEXT NOT NULL,
				url TEXT NOT NULL,
				portada TEXT NOT NULL,
				PRIMARY KEY (id)
			)
		");
		return $galeria;
	}
	
	instalar();