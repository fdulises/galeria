function abrirUrl(url) {
	peticion_http = new XMLHttpRequest();
	peticion_http.open('GET', url, false);
	peticion_http.send(null);
	return peticion_http.responseText;
}

function agregarVideo(id, idvideo, url, imagen){
	var portada = document.createElement("img");
	portada.src = imagen;
	var galeriaElemento = document.createElement("a");
	galeriaElemento.id = idvideo;
	galeriaElemento.href = url;
	galeriaElemento.setAttribute("data-id", id);
	galeriaElemento.setAttribute("class", "sinanimar");
	galeriaElemento.appendChild(portada);
	galeriaElemento.addEventListener("click", function(evt){
		creaVideo(id, idvideo);
		evt.preventDefault();
	}, false);
	var galeria = document.getElementById("galeria");
	var nodos = galeria.getElementsByTagName("a");
	galeria.insertBefore(galeriaElemento, nodos[0]);
	return false;
}

function animarAparecer(){
	setTimeout(function(){document.querySelector(".sinanimar").setAttribute("class", "animar")},100);
}

function enviarVideo(evt){
	var formEnv = document.formenv;
	formEnv.enviar.setAttribute('disabled', 'disabled');
	var respuesta = JSON.parse(abrirUrl("agregar.php?url="+encodeURI(formEnv.url.value)));
	if(respuesta.estado){
		agregarVideo(respuesta.estado, respuesta.idvideo, respuesta.url, respuesta.imagen);
		formEnv.reset();
		animarAparecer();
	}
	formEnv.enviar.removeAttribute('disabled');
	evt.preventDefault();
};

function animarFondo(cont){
	window.addEventListener("scroll", function(){
		var scrollTop = document.body.parentNode.scrollTop;
		document.querySelector(cont).style.backgroundPosition = '0 ' + -(scrollTop * 0.5) + 'px';
	}, false);
}

function agregarPantalla(){
	var pantalla = document.createElement("div");
	pantalla.id = "pantallaNegra";
	pantalla.style.backgroundColor = "rgba(0,0,0,0.8)";
	pantalla.style.minWidth = "100%";
	pantalla.style.minHeight = "100%";
	pantalla.style.position = "fixed";
	pantalla.style.top = "0";
	pantalla.style.left = "0";
	pantalla.style.zIndex = "2000";
	pantalla.style.display = "none";
	pantalla.addEventListener("click", function(){
		cerrarPantalla(this);
	}, false);
	document.body.appendChild(pantalla);
}

function cerrarPantalla(pantalla){
	pantalla.style.display = "none";
	pantalla.innerHTML = "";
	document.body.style.overflow = "auto";
}

function abrirPantalla(){
	document.getElementById("pantallaNegra").style.display = "block";
	document.body.style.overflow = "hidden";
}

function creaVideo(id, idvideo){
	var videoYoutube = '<div class="video-container"><iframe frameborder="0" allowfullscreen src="https://www.youtube.com/embed/'+idvideo+'"></iframe></div><button type="button" class="phantom eliminar" onclick="eliminarVideo(\''+id+'\');" title="Eliminar Video">Eliminar</button>';
	var videoCont = document.createElement("div");
	videoCont.id = "videoCont";
	videoCont.innerHTML = videoYoutube;
	document.getElementById("pantallaNegra").appendChild(videoCont);
	abrirPantalla();
	return false;
}

function eliminarVideo(id){
	var respuesta = JSON.parse(abrirUrl("eliminar.php?id="+id));
	if(respuesta.estado){
		cerrarPantalla(document.getElementById("pantallaNegra"));
		var videoid = "a[data-id='"+id+"']";
		var videoEliminado = document.querySelector(videoid);
		videoEliminado.setAttribute("class", "sinanimar");
		setTimeout(function(){videoEliminado.setAttribute("class", "oculto")},500);
	}
}

function galeriaLightbox(){
	var selectorVideos = "a[data-id]";
	var videosGaleria = document.querySelectorAll(selectorVideos);
	var videosTotal = videosGaleria.length;
	for(i=0; i<videosTotal; i++){
		videosGaleria[i].addEventListener("click", function(evt){
			creaVideo(this.getAttribute("data-id"), this.getAttribute("id"));
			evt.preventDefault();
		}, false);
	}
	agregarPantalla();
}

function fijarBarra(){
	window.addEventListener("scroll", function(){
		var scrollTop = document.body.parentNode.scrollTop;
		var barra = document.getElementsByTagName("header");
		if(scrollTop>100) barra[0].setAttribute("class", "barrafija");
		else barra[0].setAttribute("class", "");
	}, false);
}

document.addEventListener("DOMContentLoaded", function(){
	animarFondo("#fondoParallax");
	galeriaLightbox();
	fijarBarra();
	document.formenv.addEventListener("submit", function(evt){enviarVideo(evt)}, false);
}, false);