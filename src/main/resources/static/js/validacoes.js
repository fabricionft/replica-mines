function validarCadastro(){
    let quantidadeDeErros = 0;
    let erros = [];

    if(verficarPreenchimentoDosCampos('cadastro')){
        if($('#senhaCadastro').val().length < 6){
            quantidadeDeErros++;
            erros.push("Sua senha precisa conter pelo menos 6 digitos");
        }

        if(verificarErros(quantidadeDeErros, erros)) return true;
    }
}

function verficarPreenchimentoDosCampos(nomeElementos){
    let inputs = document.getElementsByName(nomeElementos);
    let quantidadeNulo = 0;
    for(i = 0; i < inputs.length; i++)
        if(inputs[i].value.length == 0) quantidadeNulo++;

    if(quantidadeNulo == 0) return true;
    else{
        gerarMessageBox(2, "Por favor preencha todos os campos!!", "Tentar novamente");
        return false;
    };
}

function verificarErros(quantidadeDeErros, erros){
    let exibirErros = "Atenção:";
    erros.forEach(erro => exibirErros += "<br><br>- "+erro);

    if(quantidadeDeErros == 0) return true;
    else{
        gerarMessageBox(2, exibirErros, "Tentar novamente");
        return false;
    }
}