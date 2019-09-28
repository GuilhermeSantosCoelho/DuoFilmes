$(function(){
    $("#entrar").click(function(){
        var usuario = $("#usuario").val();
        var senha = $("#senha").val();

        if(usuario != '' && senha != ''){
            $.post("http://201.80.58.44:4200/login", {
                usuario: usuario,
                senha: senha
            }, function(retorno){
                if(retorno){
                    document.getElementById('retorno').innerHTML = retorno.message;
                    if(retorno.cookie){
                        document.cookie = "usuario="+retorno.usuario;
                        window.location = '/';
                    }
                }
            });
        }else{
            document.getElementById('retorno').innerHTML = ('Preencha todos os campos!');
        }
    });
});
