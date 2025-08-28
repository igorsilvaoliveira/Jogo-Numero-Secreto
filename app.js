let listaNumerosSorteados = [];
let nummeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirMensagemNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log('web speech api não suportada neste navegador');
    }
}
function exibirMensagemInicial() {
    exibirMensagemNaTela('h1','Bem vindo ao jogo secreto.');
    exibirMensagemNaTela('p','Escolha um numero entre 1 e 50.');
}
    
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirMensagemNaTela('h1','acertou!');
        let palavraTentativa = tentativas > 1 ? 'tetativas' : 'tentativa';
        let mensagemTentativas = `você descobriu o numero secreto em ${tentativas} ${palavraTentativa}.`;
        exibirMensagemNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) {
            exibirMensagemNaTela('p',' O número secreto é maior.');
        } else {
            exibirMensagemNaTela('p',' O número secreto é menor.');
        }
        tentativas ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * nummeroLimite + 1);
    let quantidadeDeElementos = listaNumerosSorteados.length;

    if (quantidadeDeElementos == nummeroLimite) {
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
