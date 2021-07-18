<?php
	class dbcon{
		static private $con;
		static private $result;
		static public function open($db){
			self::$con = new SQLite3($db);
		}
		static public function sendQuery($q){
			$query = self::$con->query($q);
			self::$result = $query;
			return $query;
		}
		static public function fetch(){
			return self::$result->fetchArray(SQLITE3_ASSOC);
		}
		static public function query($q){
			self::sendQuery($q);
			$datos = array();
			while( $fila = self::fetch() ){
				$datos[] = $fila;
			}
			return $datos;
		}
		static public function id(){
			return self::$con->lastInsertRowID();
		}
	}
	
	dbcon::open('galeriaDB.db');