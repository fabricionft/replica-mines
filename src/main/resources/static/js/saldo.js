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

function diminuirSaldo(valor){
    $.ajax({
        method: "PUT",
        url: "/usuario/descontar/"+localStorage.getItem('codigo')+"/"+valor,
        success: function (dados){
            $('#saldo').html('Saldo: R$ '+dados.saldo.toFixed(2));
        }
    }).fail(function(xhr, status, errorThrown){
        gerarMessageBox(2, xhr.responseText, "Tentar novamente");
    });
}

function aumentarSaldo(valorInicial, valorFinal){
    $.ajax({
        method: "PUT",
        url: "/usuario/cashout/"+localStorage.getItem('codigo')+"/"+valorInicial+"/"+valorFinal,
        success: function (dados){
            $('#saldo').html('Saldo: R$ '+dados.saldo.toFixed(2));
        }
    }).fail(function(xhr, status, errorThrown){
        gerarMessageBox(2, xhr.responseText, "Tentar novamente");
    });
}
