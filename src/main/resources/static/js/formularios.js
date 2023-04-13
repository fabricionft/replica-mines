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
    $("[name='inputLogin']").val("");
    $("[name='formulario']").hide();
}

function fazerCadastro(){
    if(validarCadastro()){
        $.ajax({
            method: "POST",
            url: "/usuario",
            data: JSON.stringify(
            {
                usuario: $('#usuarioCadastro').val().trim(),
                senha: $('#senhaCadastro').val().trim()
            }),
            contentType: "application/json; charset-utf8",
            success: function (dados){
                gerarMessageBox(1, "Cadastro concluído com sucesso!!", "Prosseguir", true);
            }
        }).fail(function(err){
            gerarMessageBox(2, err.responseJSON.mensagem, "Tentar novamente");
        });
    }
}

$("[name='inputLogin']").keyup(function(){
    ($('#usuarioLogin').val().length && $('#senhaLogin').val().length) ? $('#btnLogin').removeAttr("disabled") : $('#btnLogin').attr('disabled', "disabled");
});

function fazerLogin(){
    $.ajax({
        method: "POST",
        url: "/usuario/login/"+$('#usuarioLogin').val().trim()+"/"+$('#senhaLogin').val().trim(),
        success: function (dados){
            preencherDados(dados);
            gerarMessageBox(1, "Logado com sucesso", "Prosseguir");
        }
    }).fail(function(err){
        gerarMessageBox(2, err.responseJSON.mensagem, "Tentar novamente");
    });
}

function preencherDados(dados){
    localStorage.setItem('sessao', "logado");
    localStorage.setItem('token', dados.token);
    localStorage.setItem('codigo', dados.codigo);
}

function deslogar(){
    localStorage.sessao="";
    localStorage.codigo="";
    localStorage.token="";
    location.reload();
}