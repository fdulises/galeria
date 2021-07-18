<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Galería de Videos Youtube</title>
	<link rel="stylesheet" href="plantilla/estilos.css" />
	<script src="plantilla/funciones.js"></script>
</head>
<body>
	<header>
		<nav class="centrar">
			<a href="#" class="logo">MIGALERÍA</a>
			<ul class="navegacion">
				<li><a href="">Tutorial</a></li>
				<li><a href="">Descarga</a></li>
			</ul>
		</nav>
	</header>
	<div id="fondoParallax" class="principal">
		<div class="pantalla">
			<div class="centrar">
				<h1>Galería de Videos Youtube</h1>
				<form method="get" action="agregar.php" name="formenv">
					<input type="text" name="url" id="url" class="phantomIn" placeholder="Ingresa URL Video" />
					<button name="enviar" type="submit" class="phantom">Agregar</button>
				</form>
			</div>
		</div>
	</div>
	<div id="galeria" class="centrar">
		<?php $galeria = obtener(); ?>
		<?php foreach($galeria as $v): ?>
		<a id="<?php echo $v['idvideo']; ?>" href="<?php echo $v['url']; ?>" data-id="<?php echo $v['id']; ?>">
			<img src="<?php echo $v['portada']; ?>" />
		</a>
		<?php endforeach; ?>
	</div>
	<div class="inferior">
		<div class="centrar">
			<p>Aplicación Web Creada con HTML, CSS, JavaScript, PHP, SQLite, JSON y AJAX</p>
		</div>
	</div>
	<footer>
		<div class="centrar">
			<div>Copyright &copy; 2015 - <a href="http://debred.com" title="Desarrollado por el equipo Debred" rel="nofollow" target="_blank">Debred Team</a></div>
		</div>
	</footer>
</body>
</html>