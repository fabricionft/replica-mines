$(document).ready(function (){
    $('#formCadastro').hide();
    $('#formLogin').hide();
});

function renderizarFormulario(formulario){
    $('#containerForms').addClass('ativo');
    $('#'+formulario).show();
}

function fecharFormulario(){
    $('#containerForms').removeClass('ativo');
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
            success: function (dados){
                    preencherDados(dados);
                    gerarMessageBox(1, "Logado com sucesso", "Prosseguir");
                }
        }).fail(function(xhr, status, errorThrown){
            gerarMessageBox(2, xhr.responseText, "Tentar novamente");
        });
    }
}

function preencherDados(dados){
    localStorage.setItem('sessao', "logado");
    localStorage.setItem('codigo', dados.codigo);
}

function deslogar(){
    localStorage.sessao="";
    localStorage.codigo="";
    location.reload();
}