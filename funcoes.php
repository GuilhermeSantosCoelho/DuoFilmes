<?php
include_once("peer/conexao/conexao.php");
$Obj_Conexao = new CONEXAO();
session_start();

if (isset($_POST['funcao'])) {
	if ($_POST['funcao'] == 'login') {
		$usuario = $_POST['usuario'];
		$senha = $_POST['senha'];
		$query = $Obj_Conexao->Consulta("SELECT * FROM usuarios WHERE username = '$usuario' AND senha = '$senha'");

		if (mysqli_num_rows($query) == 1){
			$_SESSION['usuario'] = $usuario;
			echo 1;
		}else{
			echo "As credenciais estão incorretas!";
		}
		echo 'dasfasdf';
	}else if ($_POST['funcao'] == 'cadastro') {
		$usuario = $_POST['usuario'];
		$senha = $_POST['senha'];
		$query = $Obj_Conexao->Consulta("INSERT INTO usuarios VALUES ('$usuario','$senha')");

		if($query){
			echo "<p style='color:#37b773'>Usuário cadastrado!</p>";
		}else{
			echo "<p style='color:#bf2f2f'>Esse usuário já existe!</p>";
		}
	}else if ($_POST['funcao'] == 'convidar') {
		$usuario = $_SESSION['usuario'];
		$video_id = $_POST['video_id'];
		$convidado = $_POST['convidado'];
		$query = $Obj_Conexao->Consulta("SELECT * FROM convite WHERE convite = '$usuario' AND convidado = '$convidado' AND video_id = $video_id");
		if (mysqli_num_rows($query) > 0) {
			echo "Você já convidou $convidado para assistir esse filme!";
		}else{
			$query = $Obj_Conexao->Consulta("SELECT * FROM usuarios WHERE username = '$convidado'");
			if (mysqli_num_rows($query) == 0) {
				echo "O usuário $convidado não existe!";
			}else{
				$query = $Obj_Conexao->Consulta("INSERT INTO convite VALUES(null,$video_id,'$usuario','$convidado',0)");
				echo "Seu convite foi enviado! Aguarde $convidado aceitar!";
			}
		}
	}else if ($_POST['funcao'] == 'aceitar_convite') {
		$id_convite = $_POST['convite_id'];
		$query = $Obj_Conexao->Consulta("UPDATE convite SET aceito = 1 WHERE id_convite = $id_convite");
	}else if ($_POST['funcao'] == 'recusar_convite') {
		$id_convite = $_POST['convite_id'];
		$query = $Obj_Conexao->Consulta("DELETE FROM convite WHERE id_convite = $id_convite");
	}
}else if (isset($_GET['funcao'])) {
	if ($_GET['funcao'] == 'buscar_convites') {
		$usuario = $_SESSION['usuario'];
 		$query = $Obj_Conexao->Consulta("SELECT nome, id_convite, convite FROM convite c, video v WHERE convidado = '$usuario' AND v.id = c.video_id AND aceito = 0");
 		if (mysqli_num_rows($query) > 0) {
 			while ($linha = mysqli_fetch_assoc($query)){
 				echo json_encode($linha)."|";
	 		}
	 		echo "{}";
 		}else{
			echo 0;
		}	
	}
}

?>