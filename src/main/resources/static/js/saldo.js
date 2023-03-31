function atualizarsaldo(){
    if(verificarSessao()){
        $.ajax({
            method: "GET",
            url: "/usuario/saldo/"+localStorage.getItem('codigo'),
            success: function (dados){
                $('#saldo').html('Saldo: R$ '+dados.toFixed(2));
            }
        }).fail(function(xhr, status, errorThrown){
            gerarMessageBox(2, xhr.responseText, "Tentar novamente");
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
    $('#valorAtual').html("R$ "+parseFloat(valoratual).toFixed(2))
    $('#proximoValor').html("R$ "+parseFloat(proximovalor).toFixed(2));
}

function concluirAposta(acao, valorInicial, valorFinal){
    let valor = (acao == "cashout") ? (valorFinal - valorInicial) : valorInicial;
    let a = pegarQuantidadeDebombas();
    $.ajax({
        method: "PUT",
        url: "/usuario",
        data: JSON.stringify({
            codigo: localStorage.getItem('codigo'),
            acao: acao,
            quantidadeDeBombas: a,
            valor: valorInicial,
            retorno: valor
        }),
        contentType: "application/json; charset-utf8",
        success: function (dados){
            $('#saldo').html('Saldo: R$ '+dados.saldo.toFixed(2));
            $("[name='valor']").html("-");
        }
    }).fail(function(xhr, status, errorThrown){
        gerarMessageBox(2, xhr.responseText, "Tentar novamente");
    });
}

function efetuarTransacao(valor, acao){
    let valorFinal = (acao == "deposito") ? valor : (valor * -1);

    $.ajax({
        method: "PUT",
        url: "/usuario/"+localStorage.getItem('codigo')+"/"+valorFinal,
        success: function (dados){
            $('#saldo').html('Saldo: R$ '+dados.toFixed(2));
            gerarMessageBox(1, "Transação realizada com sucesso!", "Prosseguir");
        }
    }).fail(function(xhr, status, errorThrown){
        gerarMessageBox(2, xhr.responseText, "Tentar novamente");
    });
}