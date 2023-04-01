$(document).ready(function (){
    $("[name='formulario']").hide();
});

function renderizarFormulario(formulario){
    if(formulario != "formDeposito" && formulario != "formSaque"){
        $('#containerForms').addClass('ativo');
        $('#'+formulario).show();
    }
    else{
        if(verificarSessao()){
            $('#containerForms').addClass('ativo');
            $('#'+formulario).show();
        }else gerarMessageBox(2, "Você precisa estar logado para fazer um deposito ou saque");
    }
}

function fecharFormulario(){
    $('#containerForms').removeClass('ativo');
    $("[name='inputForm']").val("");
    $("[name='formulario']").hide();
}

function fazerCadastro(){
    let usuario = $('#usuarioCadastro').val().trim();
    let senha = $('#senhaCadastro').val().trim();

    if(validarCadastro()){
        $.ajax({
            method: "POST",
            url: "/usuario",
            data: JSON.stringify(
            {
                usuario: usuario,
                senha: senha
            }),
            contentType: "application/json; charset-utf8",
            success: function (dados){
                gerarMessageBox(1, "Cadastro concluído com sucesso!!", "Prosseguir", true);
            }
        }).fail(function(xhr, status, errorThrown){
            gerarMessageBox(2, xhr.responseText, "Tentar novamente");
        });
    }
}

function fazerLogin(){
    let usuario = $('#usuarioLogin').val().trim();
    let senha = $('#senhaLogin').val().trim();

    if(!usuario.length || !senha.length) gerarMessageBox(2, "Preencha os campos corretamente", "Tentar novamente");
    else{
        $.ajax({
            method: "POST",
            url: "/usuario/login/"+usuario+"/"+senha,
            success: function (token){
                    localStorage.setItem('token', token);
                    buscarDadosUsuario(usuario);
                }
        }).fail(function(xhr, status, errorThrown){
            gerarMessageBox(2, xhr.responseText, "Tentar novamente");
        });
    }
}

function buscarDadosUsuario(username){
    $.ajax({
        method: "GET",
        url: "/usuario/"+username,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
        }
    }).done(function (dados) {
        preencherDados(dados);
        gerarMessageBox(1, "Logado com sucesso", "Prosseguir");
    }).fail(function (err)  {
        if(err.status == 403) gerarMessageBox(2, "Sem autoização: Seu token expirou ou não existe!! Para conseguir um novo deslogue e faça login novamente!", "Ok");
        else gerarMessageBox(2, err.responseJSON.mensagem, "Ok");
    });
}

function preencherDados(dados){
    localStorage.setItem('sessao', "logado");
    localStorage.setItem('codigo', dados.codigo);
}

function deslogar(){
    localStorage.sessao="";
    localStorage.codigo="";
    localStorage.token="";
    location.reload();
}