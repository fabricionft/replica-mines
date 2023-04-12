window.onload = () => {
    gerarMinas();
    alterarSessao();
    atualizarsaldo();
    atualizarSeletorDeMinas();
}

function atualizarSeletorDeMinas(){
    let quantidadeDeBombas = (localStorage.getItem('quantidadeBombas') > 0) ? localStorage.getItem('quantidadeBombas') : 3;
    if(quantidadeDeBombas == 3) localStorage.setItem('quantidadeBombas', quantidadeDeBombas);
    $('#quantidadeDeMinas').val(quantidadeDeBombas);
}

function pararOuVoltar(acao){
    (acao == 1) ? $("[name='mine']").attr('disabled', 'disabled') : $("[name='mine']").removeAttr("disabled");
}

function gerarMinas(){
   $("[name='mine']").remove();
   for(var i = 1; i <= 25; i++){
       $('#mines').append(
          '<button class="mine" id="'+i+'" name="mine" onclick="(verificar(parseInt(this.id))) ? errou(this.id) : acertou(this.id);" disabled>'+
             '<img id="img-'+i+'" src="img/circulo.png" width="45%">'+
          '</button>'
       );

       if(i <= 20) $('#quantidadeDeMinas').append('<option value="'+i+'">Minas: '+i+'</option>');
   }
   exibirBotao("iniciarjogo");
   $("#darCashOut").attr('disabled', 'disabled');
}

function verificar(id){
    let resposta = (localBombas.includes(id)) ? true : false;
    return resposta;
}

function acertou(id){
    $('#'+id).css('background', "orange").attr('disabled', 'disabled');
    $('#img-'+id).attr('src', "img/estrela.png");
    $("#darCashOut").removeAttr("disabled");

    calcularValores($('#valorAtual').html().split(" ")[1]);
}

function errou(id){
    exibirItens();

    $('#'+id).css('background', "rgb(241, 172, 172)");
    $('#img-'+id).attr('src', "img/explosao.png");

    concluirAposta("descontar", $('#valorInicial').html().split(" ")[1], 0);
}

function darCashOut(){
    exibirItens();

    concluirAposta("cashout", $('#valorInicial').html().split(" ")[1], $('#valorAtual').html().split(" ")[1]);
}

function exibirItens(){
    for(var i = 1; i <= 25; i++)
        (localBombas.includes(i)) ? $('#img-'+i).attr('src', "img/bombear.png") : $('#img-'+i).attr('src', "img/estrela.png");

    $("[name='mine']").attr('disabled', 'disabled');
    exibirBotao("jogarNovamente");
}

function jogar(valor){
    if(verificarSessao()){
        if(valor.length){
            $.ajax({
                method: "GET",
                url: "/aposta/"+localStorage.getItem('codigo')+"/"+valor,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
                }
            }).done(function (dados) {
                iniciarJogo(valor);
            }).fail(function(err){
                tratarErros(err);
            });
        }else gerarMessageBox(2, "É necessário que você digite algum valor!!", "Ok");
    }
    else gerarMessageBox(2, "Você precisa estar logado para fazer uma aposta!", "Ok");
}

function iniciarJogo(valor){
    localBombas = bombasSelecionadas();
    pararOuVoltar(2);
    renderizarValores(valor, valor, (valor / (1 - (pegarQuantidadeDebombas()) / 25)));
    exibirBotao("darCashOut");
}

function bombasSelecionadas(){
    let bombasSelecionadas = []
    while(bombasSelecionadas.length < pegarQuantidadeDebombas()){
        let numeroRandomico = Math.floor(Math.random() * 25 + 1);
        if(!bombasSelecionadas.includes(numeroRandomico)) bombasSelecionadas.push(numeroRandomico)
    }
    return bombasSelecionadas;
}

function exibirBotao(botaoSelecionado){
    $("[name='btnJogo']").css('display', "none");
    $("#"+botaoSelecionado).css('display', "initial");
}

function pegarQuantidadeDebombas(){
    return parseInt(localStorage.getItem('quantidadeBombas'));
}

function alterarValorDeAposta(operador){
    let valor = parseFloat(($('#valor').val()) ? $('#valor').val() : 0);
    $('#valor').val((operador == "-" && valor > 0) ? (valor - 1).toFixed(2) : (valor + 1).toFixed(2));
}