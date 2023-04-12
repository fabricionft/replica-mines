function alterarSessao(){
    (!verificarSessao()) ? $("[name='logado']").hide().first().show() : $("[name='logado']").hide().last().show();
}

function verificarSessao(){
    let resposta = (localStorage.getItem('sessao') == "logado") ? true : false;
    return resposta;
}

function redirecionar(){
    if(verificarSessao()) location.href = "historico.html";
    else gerarMessageBox(2, "Você precisa estar logado para ver seu histórico!", "Tentar novamente");
}

function tratarErros(){
    if(err.status == 403) gerarMessageBox(2, "Sem autoização: Seu token expirou ou não existe!! Para conseguir um novo deslogue e faça login novamente!", "Ok");
    else gerarMessageBox(2, err.responseJSON.mensagem, "Ok");
}

function gerarMessageBox(cor, mensagem, textoBtn, acesso){
    let corDeFundo = (cor == 1) ? "rgb(214, 253, 226)" : "rgb(253, 214, 214)";

    $('#esconder').addClass('ativo')
    $('#mensagem').css("transform", "translateY(250px)");
    $('#mensagem').css("background", corDeFundo);

    $('#textoMensagem').html(mensagem);
    $('#btnMessage').html(textoBtn);
}

function fecharMessageBox(){
    $('#esconder').removeClass('ativo');
    $('#mensagem'). css("transform", "translateY(-250px)");

    if($('#btnMessage').html() == "Prosseguir") location.reload();
}