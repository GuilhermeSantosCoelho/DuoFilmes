<?php

	include_once("conexao/conexao.php");
	$Obj_Conexao = new CONEXAO();

	$query = $Obj_Conexao->Consulta("SELECT * FROM video");

	while ($linha = mysqli_fetch_assoc($query)) {
		$Videos[] = $linha;
	}

?>

<div class="container">
	<div class="row">
		<input type="hidden" id="usuario" value="<?= $usuario ?>">
		<?php
			foreach ($Videos as $Video) {
		?>
		<div class="col-md-3" style="padding-bottom: 30px;">
			<center>
				<!-- Div que contém a imagem do filme -->
				<div class="div_imagem">
					<img src="imagens/<?= $Video['imagem'] ?>.jpg" width="100%" height="296px" style="border-radius: 3px">
				</div>
				<!-- Exibindo o nome do filme -->
				<h6><?= utf8_encode($Video['nome']) ?></h6><br/>
				<!-- Fazendo aparecer a div de convite -->
				<h6 class="convidar">
					Assistir com um amigo
					<input type="hidden" class="video_id" value="<?= $Video['id'] ?>">
					<input type="hidden" class="video_nome" value="<?= utf8_encode($Video['nome']) ?>">
				</h6>
				<hr/>
			</center>
		</div>
		<?php
			}
		?>
	</div>
</div>



