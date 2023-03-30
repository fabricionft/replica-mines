function verificarSessao(){
    if(localStorage.getItem('sessao') == "logado"){
        $('#deslogar').show();
        $('#logar').hide();
        return true;
    }
    else{
        $('#deslogar').hide();
        $('#logar').show();
        return false;
    }
}

function travarTela() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
}

function destravarTela() {
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = "yes";
}

function gerarMessageBox(cor, mensagem, textoBtn, acesso){
    let corDeFundo = (cor == 1) ? "rgb(214, 253, 226)" : "rgb(253, 214, 214)";

    $('#esconder').addClass('ativo')
    $('#mensagem').css("transform", "translateY(250px)");
    $('#mensagem').css("background", corDeFundo);

    $('#textoMensagem').html(mensagem);
    $('#btnMessage').html(textoBtn);

    travarTela();
}

function fecharMessageBox(){
    destravarTela();
    $('#esconder').removeClass('ativo')
    $('#mensagem'). css("transform", "translateY(-250px)");

    if($('#btnMessage').html() == "Prosseguir") location.reload();
}