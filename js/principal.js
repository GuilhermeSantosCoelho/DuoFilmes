
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

// Função que busca os convites de um usuário no banco de dados via AJAX
function buscar_convites(){
	var request = new XMLHttpRequest();
	request.onload = function(){
		var arr = this.responseText.split("|");
		document.getElementById("convites").innerHTML = "";
		for (var i = 0; i < arr.length - 1; i++) {
			dado = arr[i];
			var result = JSON.parse(dado);
			document.getElementById("convites").innerHTML += "Você tem um convite de " + result.convite + " para assistir ao filme " + result.nome + "!<br/>";
			document.getElementById("convites").innerHTML += "<a href='filme.php?filme=" + result.video_id + "&convite=" + result.convite + "&convidado=" + result.convidado + "'>Aceitar</a>";
			document.getElementById("convites").innerHTML += "<a style='cursor:pointer;padding-left:10px' onclick='recusar_convite("+result.id_convite+")'>Recusar</a><br/>";
		}
	}
	request.open("GET", "funcoes/buscar_convites.php");
	request.send();
	document.getElementById('convites_recebidos').style.display = 'block';
}

// Função que recusa um convite
function recusar_convite(id_convite){
	var request = new XMLHttpRequest();
	request.open("GET", "funcoes/recusar_convite.php?id_convite="+id_convite);
	request.send();
	document.getElementById("convites").innerHTML = "";
	buscar_convites();
}