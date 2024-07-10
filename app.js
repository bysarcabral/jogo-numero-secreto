let numeroLimite = 10;
let listaDeNumeroSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto){
    let campo= document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial(){
    exibirTextoNaTela('.pagina__titulo', 'Jogo do Número Secreto');
    exibirTextoNaTela('.conteudo__paragrafo', 'Escolha um número entre 1 e 10');
}

function verificarChute(){
    let chute = document.querySelector('.conteudo__input').value;

    if(chute == numeroSecreto){
        exibirTextoNaTela('.pagina__titulo', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas =  `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('.conteudo__paragrafo', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    }
    else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('.conteudo__paragrafo', 'O número secreto é menor!');
        }
        if(chute < numeroSecreto){
            exibirTextoNaTela('.conteudo__paragrafo', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumeroSorteados = [];
    }
    if(listaDeNumeroSorteados.includes(numeroSorteado)){
        return gerarNumeroAleatorio();
    }
    else{
        listaDeNumeroSorteados.push(numeroSorteado);
        console.log(listaDeNumeroSorteados);
        return numeroSorteado;
    }
}

function limparCampo(){
    chute = document.querySelector('.conteudo__input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
}

exibirMensagemInicial();