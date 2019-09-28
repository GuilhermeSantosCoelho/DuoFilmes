$(function(){
    $("#cadastrar").click(function(){
        var usuario = $("#usuario").val();
        var senha = $("#senha").val();

        if (usuario.length < 3) {
            document.getElementById('retorno').innerHTML = ("<p style='color:#bf2f2f'>O campo 'usuário' deve ter no mínimo 3 caracteres!</p>");
        }else if (senha.length < 6) {
            document.getElementById('retorno').innerHTML = ("<p style='color:#bf2f2f'>O campo 'senha' deve ter no mínimo 6 caracteres!");
        }else{
            $.post("funcoes/funcoes.php", {
                funcao: 'cadastro',
                usuario: usuario,
                senha: senha
            }, function(retorno){
                document.getElementById('retorno').innerHTML = retorno;
            });
        }
    });
});
