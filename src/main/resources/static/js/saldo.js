function atualizarsaldo(){
    if(verificarSessao()){
        $.ajax({
            method: "GET",
            url: "/usuario/saldo/"+localStorage.getItem('codigo'),
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
            }
        }).done(function (dados) {
            $('#saldo').html('Saldo: R$ '+dados.toFixed(2));
        }).fail(function(err)  {
            if(err.status == 403) gerarMessageBox(2, "Sem autoização: Seu token expirou ou não existe!! Para conseguir um novo deslogue e faça login novamente!", "Ok");
            else gerarMessageBox(2, err.responseJSON.mensagem, "Ok");
        });
    }
}

function calcularValores(valor){
    let quantidadeBombas = pegarQuantidadeDebombas();
    valor = valor / ((1 - (quantidadeBombas / 25)));
    proximovalor = valor / ((1 - (quantidadeBombas / 25)));

    renderizarValores($('#valorInicial').html().split(" ")[1], valor, proximovalor);
}

function renderizarValores(valorInicial, valoratual, proximovalor){
    $('#valorInicial').html("R$ "+parseFloat(valorInicial).toFixed(2));
    $('#valorAtual').html("R$ "+parseFloat(valoratual).toFixed(2));
    $('#proximoValor').html("R$ "+parseFloat(proximovalor).toFixed(2));
}

function concluirAposta(acao, valorInicial, valorFinal){
    let valor = (acao == "cashout") ? (valorFinal - valorInicial) : valorInicial;
    let numeroDeBombas = pegarQuantidadeDebombas();

    $.ajax({
        method: "PUT",
        url: "/aposta",
        data: JSON.stringify({
            codigo: localStorage.getItem('codigo'),
            acao: acao,
            quantidadeDeBombas: numeroDeBombas,
            valor: valorInicial,
            retorno: valor
        }),
        contentType: "application/json; charset-utf8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
        }
    }).done(function (dados) {
        $('#saldo').html('Saldo: R$ '+dados.saldo.toFixed(2));
        $("[name='valor']").html("-");
    }).fail(function (err)  {
        if(err.status == 403) gerarMessageBox(2, "Sem autoização: Seu token expirou ou não existe!! Para conseguir um novo deslogue e faça login novamente!", "Ok");
        else gerarMessageBox(2, err.responseJSON.mensagem, "Ok");
    });
}

function efetuarTransacao(valor, acao){
    let valorFinal = (acao == "deposito") ? valor : (valor * -1);

    $.ajax({
        method: "PUT",
        url: "/usuario/"+localStorage.getItem('codigo')+"/"+valorFinal,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.getItem('token'));
        }
    }).done(function (dados) {
        $('#saldo').html('Saldo: R$ '+dados.toFixed(2));
        gerarMessageBox(1, "Transação realizada com sucesso!", "Prosseguir");
    }).fail(function (err)  {
        if(err.status == 403) gerarMessageBox(2, "Sem autoização: Seu token expirou ou não existe!! Para conseguir um novo deslogue e faça login novamente!", "Ok");
        else gerarMessageBox(2, err.responseJSON.mensagem, "Ok");
    });
}