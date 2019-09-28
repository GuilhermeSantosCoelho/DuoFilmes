<!DOCTYPE html>
<html>
	<head>
		<?php
			$nome_filme = $_GET['filme'];
			$id_convite = $_GET['convite_id'];

			include("conexao/conexao.php");
		    $Obj_Conexao = new CONEXAO();

		?>
		<title><?= $nome_filme ?></title>

		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/index.js"></script>

		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    	<script>window.jQuery || document.write('<script src="../../../../assets/js/vendor/jquery-slim.min.js"><\/script>')</script>
    	<script src="bootstrap-4.1.0/assets/js/vendor/popper.min.js"></script>
    	<script src="bootstrap-4.1.0/dist/js/bootstrap.min.js"></script>

    	<!-- Linkando o stilo do player -->
    	<link rel="stylesheet" href="css/player.css">
    	<script src="js/player.js" async></script>

	    <!-- Bootstrap core CSS -->
	    <link href="bootstrap-4.1.0/dist/css/bootstrap.min.css" rel="stylesheet">
	</head>
	<body>
		<!-- Menu -->
		<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
			<div class="collapse navbar-collapse" id="navbarsExampleDefault">
			    <ul class="navbar-nav mr-auto">
			        <li class="nav-item active">
			            <a class="nav-link" href="index.php"><h6 class="texto_botao">Home</h6></a>
			        </li>
			       	<li class="nav-item active">
			            <a class="nav-link" style="cursor: pointer;" onclick="buscar_convites()"><h6 class="texto_botao">Convites Recebidos</h6></a>
			        </li>
			        <li class="nav-item active">
			            <a class="nav-link" style="cursor: pointer;" href="sobre.html"><h6 class="texto_botao">Sobre</h6></a>
			        </li>
			    </ul>
			</div>
		</nav>

	    <br/><br/><br/>

		<center>
			<br/>
			<h4><?= $nome_filme ?></h4>

			<video preload="none" class="jlplayer-video" poster="https://www.seusite.com/capa-do-video.jpg">
			    <source src="https://www.jetersonlordano.com.br/jlplayer/beach.mp4" type="video/mp4">
			    <track kind="captions" src="https://www.seusite.com/legenda.vtt" default>
			</video>
		</center>
		
	</body>
</html>

