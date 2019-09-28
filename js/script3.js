
var playerVideo, view;
var btnPlay;
var intervalTimer;
var hour, min, seg, currentHour, currentMin, currentSeg;
var enviar;

function prepare(elem){
	if(playerVideo != elem){
		playerVideo = elem;	

		view = playerVideo.querySelector(".video-view");
		timer = playerVideo.querySelector(".video-time");
		enviar = playerVideo.querySelector(".dados");

		btnPlay = playerVideo.querySelector(".video-play");
		btnPlay.addEventListener("click",play);

		intervalTimer = setInterval(updateTimer, 100);
	}
}

function updateTimer(){
	hour = Math.floor(view.duration / 3600);
	min = Math.floor(view.duration / 60);
	seg = Math.floor(((view.duration / 60) % 1) * 60);

	currentHour = Math.floor(view.currentTime / 3600);
	currentMin = Math.floor(view.currentTime / 60);
	currentSeg = Math.floor(((view.currentTime / 60) % 1) * 60);

	timer.innerHTML = converteTimer(currentHour, currentMin, currentSeg) + ' | ' + converteTimer(hour, min, seg);
}

function play(){
	if(view.played.length != 0){
		if (view.played.start(0) == 0 && !view.paused) {
			view.pause();
			btnPlay.style.backgroundImage = "url(Images/play.png)";
		}else{
			view.play();
			btnPlay.style.backgroundImage = "url(Images/pause.png)";
		}
	}else{
		view.play();
		btnPlay.style.backgroundImage = "url(Images/pause.png)";
	}

}

function converteTimer(horas, minutos, segundos){
	if (horas < 10 && horas > 0) {
		horas = '0' + String(horas) + ":";
	}else{
		horas = "";
	}
	if (minutos < 10) {
		minutos = '0' + String(minutos);
	}else if (minutos > 59) {
		minutos = minutos - (Math.floor(minutos/60)*60);
	}
	if (segundos < 10) {
		segundos = '0' + String(segundos);
	}
	return String(horas) + String(minutos) + ":" + String(segundos);
}

function enviarDados(){
	var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
		if(this.readyState == 4){
			if(this.status == 200){
				if(this.responseText != null){
					var dados = this.responseText;
					var objeto = JSON.parse(dados);
					if(objeto.estado == 'pausado'){
						view.pause();
						btnPlay.style.backgroundImage = "url(Images/play.png)";
					}else if(objeto.estado == 'play'){
						view.play();
						btnPlay.style.backgroundImage = "url(Images/pause.png)";
					}
				}
			}
		}
	}
	request.open("GET", "Verificar.php", true);
	request.send(null);
	setTimeout('enviarDados()', 500);
}

function Verificar_convite(usuario){
	var usuario = document.getElementById("usuario").value;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readyState == 4){
			if(this.status == 200){
				if(this.responseText != null){
					var dados = this.responseText.split("|");
					if (dados == 1) {
						document.getElementById("Convites").innerHTML = 'Nenhum Convite!';
						document.getElementById("Aceitar").style.display = "none";
						document.getElementById("Recusar").style.display = "none";
					}else{
						document.getElementById("Convites").innerHTML = "<p>" + dados[0] + "<label style=\"color:#41ada6\">" + dados[1] + "</label>" + "Filme: " + "<label style=\"color:#41ada6\">" + dados[2] + "</label></p>";
						document.getElementById("Aceitar").style.display = "block";
						document.getElementById("Recusar").style.display = "block";
					}
				}
			}
		}
	}
	request.open("GET", "verificar_convite.php?usuario="+usuario, true);
	request.send(null);
	setTimeout('Verificar_convite()', 500);
}
