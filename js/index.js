$(function(){
	$('.convidar').click(function(){
		document.getElementById('titulo_convite').innerHTML = 'Quem você deseja convidar para assistir <br>' + $('.video_nome',this).val() + '?';
		document.getElementById('video_id').value = $('.video_id',this).val();
		document.getElementById('div_convite').style.display = 'block';
		
	});
	$('#enviar_convite').click(function(){
		var convidado = $('#convidado').val();
		var video_id = $('#video_id').val();
		var resposta = document.getElementById('return');
		if (convidado != '') {
			$.post("funcoes/funcoes.php", {
				funcao: 'convidar',
				video_id: video_id,
				convidado: convidado
			}, function(retorno){
				resposta.innerHTML = retorno;
			});
		}else{
			resposta.innerHTML = "O usuário não pode ficar em branco!";
		}
	});

	$("#fechar_div_convite").click(function(){
		document.getElementById('div_convite').style.display = 'none';
	});

	$("#dropdown09").click(function(){
		$.get( "funcoes/funcoes.php?funcao=buscar_convites", function( data ) {
			var array = data.split('|');
			var video_nome = '';
			$("#meus_convites").html("");
			array.forEach(function (convites, index) {
				if (index != array.length - 1) {
					var convite = JSON.parse(convites);
					$("#meus_convites").append(
						"<div class='convite'>"+
						convite.convite+ ' convidou você para assistir:<br>'+convite.nome+
						"<br><br><label class='label_btn'>"+
						"<button class='btn_aceitar_convite'>"+
						"Aceitar"+
						"<input type='hidden' class='filme_nome' value='"+convite.nome+"'>"+
						"<input type='hidden' class='convite_id' value='"+convite.id_convite+"'>"+
						"</button>"+
						"<label class='spacing'></label>"+
						"<button class='btn_recusar_convite'>"+
						"Recusar"+
						"<input type='hidden' class='convite_id' value='"+convite.id_convite+"'>"+
						"</button></label>"+
						"</div><hr>"
						);
				}
			});
		}); 
	});
	$(".jlplayer-video").click(function(){
		alert();
	});
});

$(document).on('click', '.btn_aceitar_convite', function() {
	var convite_id = $('.convite_id',this).val();
	var filme_nome = $('.filme_nome',this).val();
	$.post("funcoes/funcoes.php", {
		funcao: 'aceitar_convite',
		convite_id: convite_id
	}, function(retorno){
		window.location = "filme.php?filme="+filme_nome+"&convite_id="+convite_id;
	});
});

$(document).on('click', '.btn_recusar_convite', function() {
	var convite_id = $('.convite_id',this).val();
	$.post("funcoes/funcoes.php", {
		funcao: 'recusar_convite',
		convite_id: convite_id
	}, function(retorno){
		//retorno
	});
});
