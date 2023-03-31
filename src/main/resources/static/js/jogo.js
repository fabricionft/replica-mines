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
          '<button class="mine" id="'+i+'" name="mine" onclick="(verificar(this.id)) ? errou(this.id) : acertou(this.id);" disabled>'+
             '<img id="img-'+i+'" src="img/circulo.png" width="45%">'+
          '</button>'
       );

       if(i <= 20) $('#quantidadeDeMinas').append('<option value="'+i+'">Minas: '+i+'</option>');
   }
   exibirBotao("iniciarjogo");
}

function verificar(id){
    for(var i = 0; i < localBombas.length; i++)
        if(parseInt(id) == localBombas[i]) return true;
    return false
}

function acertou(id){
    $('#'+id).css('background', "orange").attr('disabled', 'disabled');
    $('#img-'+id).attr('src', "img/estrela.png");

    calcularValores($('#valorAtual').html().split(" ")[1]);
}

function errou(id){
    exibirItens();

    $('#'+id).css('background', "rgb(241, 172, 172)");
    $('#img-'+id).attr('src', "img/explosao.png");

    concluirAposta("descontar", $('#valorInicial').html().split(" ")[1], 0)
}

function darCashOut(){
    exibirItens();

    concluirAposta("cashout", $('#valorInicial').html().split(" ")[1], $('#valorAtual').html().split(" ")[1])
}

function exibirItens(){
    localBombas.forEach(idBomba => {
        for(var i = 1; i <= 25; i++)
            if(idBomba == i)
                $('#img-'+i).attr('src', "img/bombear.png").addClass('bomb');
    });

    for(var i = 1; i <= 25; i++)
        if($('#img-'+i).attr('class') != "bomb")
            $('#img-'+i).attr('src', "img/estrela.png");

    $("[name='mine']").attr('disabled', 'disabled');
    exibirBotao("jogarNovamente");
}

function jogar(valor){
    if(verificarSessao()){
        if(valor.length){
            $.ajax({
                method: "GET",
                url: "/usuario/iniciar/"+localStorage.getItem('codigo')+"/"+valor,
                success: function (dados){
                    iniciarJogo(valor);
                }
            }).fail(function(xhr, status, errorThrown){
                gerarMessageBox(2, xhr.responseText, "Tentar novamente");
            });
        }else gerarMessageBox(2, "É necessário que você digite algum valor!!", "Ok");
    }
    else gerarMessageBox(2, "Você precisa estar logado para fazer uma aposta!", "Ok");
}

let localBombas;
function iniciarJogo(valor){
    localBombas = bombasSelecionadas();
    pararOuVoltar(2);
    renderizarValores(valor, valor, (valor / (1 - (pegarQuantidadeDebombas()) / 25)));
    exibirBotao("darCashOut");
}

function bombasSelecionadas(){
    let lista = [];
    for (i = 0; i < 25; i++) {
        lista[i] = i + 1;
    }

    let tamanhoLista = lista.length;
    for (tamanhoLista; tamanhoLista;) {
        numeroAleatorio = Math.random() * tamanhoLista-- | 0;
        tmp = lista[numeroAleatorio];
        lista[numeroAleatorio] = lista[tamanhoLista];
        lista[tamanhoLista] = tmp;
    }

    let bombasSelecionadas = [];
    let quantidadeBombas = pegarQuantidadeDebombas();
    for(i = 0; i < quantidadeBombas; i++) bombasSelecionadas.push(lista[i]);

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