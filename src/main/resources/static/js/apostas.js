window.onload = () => {
    listarApostas();
    atualizarsaldo();
}

function verificarEstadoDoHistorico(tamanhoLista){
    if(tamanhoLista == 0) $('#estadoHistorico').css('display', "initial");
    else $('#btnExcluirHistorico').css('display', "initial");
}

function listarApostas(){
    $.ajax({
        method: "GET",
        url: "/aposta/"+localStorage.getItem('codigo'),
        success: function (dados){
            verificarEstadoDoHistorico(dados.apostas.length);
            dados.apostas.slice().reverse().forEach(aposta => gerarAposta(aposta));
        }
    }).fail(function(xhr, status, errorThrown){
        gerarMessageBox(2, xhr.responseText, "Tentar novamente");
    });
}

let indexHistorico = 1;
function gerarAposta(dados){
    $('#containerApostas').append(
        '<div class="aposta">'+
            '<div class="margem-aposta">'+
                '<span class="linha-aposta">'+
                    '<p class="subtitulo-aposta">Data</p>'+
                    '<p class="texto-aposta">'+dados.dataAposta.split(" ")[0]+" - "+dados.dataAposta.split(" ")[1]+'</p>'+
                '</span>'+

                '<span class="linha-aposta">'+
                    '<p class="subtitulo-aposta">Número de bombas</p>'+
                    '<p class="texto-aposta">'+dados.quantidadeBombas+'</p>'+
                '</span>'+

                '<span class="linha-aposta">'+
                    '<p class="subtitulo-aposta">Valor apostado</p>'+
                    '<p class="texto-aposta">R$ '+dados.valor.toFixed(2)+'</p>'+
                '</span>'+

                '<span class="linha-aposta">'+
                    '<p class="subtitulo-aposta">Retorno liquido</p>'+
                    '<p class="texto-aposta" id="retorno-'+indexHistorico+'">'+dados.retorno.split(" ")[0]+" "+dados.retorno.split(" ")[1]+" "+parseFloat(dados.retorno.split(" ")[2]).toFixed(2)+'</p>'+
                '</span>'+
            '</div>'+
        '</div>'
    );
    cor = (dados.retorno.split(" ")[0] == "+") ? "green" : "red";
    $('#retorno-'+indexHistorico).css('color', cor);
    indexHistorico++
}

function apagarHistorico(){
    $.ajax({
        method: "DELETE",
        url: "/aposta/"+localStorage.getItem('codigo'),
        success: function (dados){
            gerarMessageBox(1, dados, "Prosseguir")
        }
    }).fail(function(xhr, status, errorThrown){
        gerarMessageBox(2, xhr.responseText, "Tentar novamente");
    });
}