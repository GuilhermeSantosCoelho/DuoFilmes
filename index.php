<!DOCTYPE html>
<html>
<head>

	<?php
	session_start();
	if (isset($_SESSION['usuario'])) {
		$usuario = $_SESSION['usuario'];
	}else{
		header("Location:login.html");
	}
	?>

	<title>Projeto</title>
	<link rel="stylesheet" type="text/css" href="CSS/principal.css">
	<script src="js/script3.js" type="text/javascript"></script>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/index.js"></script>

	<!-- Ícones -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">

	<!-- Bootstrap core CSS -->
	<link href="bootstrap-4.1.0/dist/css/bootstrap.min.css" rel="stylesheet">

</head>
<body>

	<!-- Menu -->
	<nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
		<a class="navbar-brand" href="#">Navbar</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarsExample09">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active">
					<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">Link</a>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled" href="#">Disabled</a>
				</li>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="dropdown09" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Convites recebidos</a>
					<div class="dropdown-menu" id="meus_convites" aria-labelledby="dropdown09">
						
					</div>
				</li>
			</ul>
			<form class="form-inline my-2 my-md-0">
				<input class="form-control" type="text" placeholder="Search" aria-label="Search">
			</form>
		</div>
	</nav>

	<br/><br/><br/><br/><br/>

	<!-- Div que mostra os convites que o usuário recebeu! -->
	<center>
		<div id="convites_recebidos">
			<br/><h3 style="display: inline-block;padding-left: 30px">Seus convites:</h3>
			<i onclick="document.getElementById('convites_recebidos').style.display = 'none'" class="fas fa-times fa-2x" style="cursor:pointer;color:#d83636;float: right;padding-right: 30px"></i>
			<br/><hr>
			<div id="convites"></div>
		</div>
	</center>

	<div class="container">
		<div class="row">

		</div>
	</div>

	<?php include("includes/feed.php"); ?>

	<center>
		<div id="div_convite">
			<i id="fechar_div_convite" class="fas fa-times-circle fa-2x"></i>
			<br><br>
			<h3 id="titulo_convite"></h3><br>
			<input type="hidden" id="video_id">
			<input type="hidden" id="video_nome">
			<input type="text" id="convidado"><br><br>
			<button id="enviar_convite">Convidar</button><br><br>
			<h6 id="return"></h6>
		</div>
	</center>

	<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="bootstrap-4.1.0/assets/js/vendor/popper.min.js"></script>
		<script src="bootstrap-4.1.0/dist/js/bootstrap.min.js"></script>

	</body>
	</html>