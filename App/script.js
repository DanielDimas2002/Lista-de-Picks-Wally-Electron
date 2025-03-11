// Seleciona os elementos necessários
const btnAdicionarCampeao = document.getElementById('adicionarCampeao');
const popupForm = document.getElementById('popupForm');
const formCampeao = document.getElementById('formCampeao');
const nomeCampeaoInput = document.getElementById('nomeCampeao');
const partidasCampeaoInput = document.getElementById('partidasCampeao');
const cancelarPopup = document.getElementById('cancelarPopup');
const tabelaPicksBody = document.querySelector('#tabelaPicks tbody');
const popupAdicao = document.getElementById('popupAdicao');
const btnCancelarPopup = document.getElementById('cancelarPopup');

let campeoes = [];

// Função para atualizar a tabela de campeões
function atualizarTabela() {
    tabelaPicksBody.innerHTML = ''; 

    campeoes.forEach((campeao, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${campeao.nome}</td>
            <td class = "vidas">${campeao.partidas}</td>
            <td>
                <button class="destaque" onclick="reduzirVida(${index})">Reduzir Vida</button>
                <button class="acao" onclick="editarCampeao(${index})">Editar</button>
                <button class="acao" onclick="moverParaCima(${index})">↑</button>
                <button class="acao" onclick="moverParaBaixo(${index})">↓</button>
                <button class="acao" onclick="moverParaTopo(${index})">Topo</button>
                <button class="destaque" onclick="removerCampeao(${index})">Excluir</button>
            </td>
        `;
        tabelaPicksBody.appendChild(tr);
    });

    // Salvar campeões no localStorage
    localStorage.setItem('campeoes', JSON.stringify(campeoes));
}

// Função para adicionar ou editar campeões
formCampeao.addEventListener('submit', (e) => {
    e.preventDefault();
    const nomeCampeao = nomeCampeaoInput.value;
    const partidasCampeao = parseInt(partidasCampeaoInput.value);

    // Validação
    if (!nomeCampeao || isNaN(partidasCampeao) || partidasCampeao < 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Adiciona novo campeão ou atualiza existente
    if (formCampeao.dataset.index !== undefined) {
        const index = parseInt(formCampeao.dataset.index);
        campeoes[index].nome = nomeCampeao;
        campeoes[index].partidas = partidasCampeao;
    } else {
        campeoes.push({ nome: nomeCampeao, partidas: partidasCampeao });
    }

    // Limpa o formulário e fecha o pop-up
    formCampeao.reset();
    delete formCampeao.dataset.index; // Remove o índice do dataset
    fecharPopupAdicao(); // Usando a função para fechar o pop-up
    atualizarTabela();
});

// Função para abrir o pop-up
function abrirPopupAdicao() {
    popupAdicao.style.display = 'flex'; // Mostra o pop-up
    document.getElementById('overlay').style.display = 'block'; // Mostra o overlay
}

// Função para fechar o pop-up
function fecharPopupAdicao() {
    popupAdicao.style.display = 'none'; // Oculta o pop-up
    document.getElementById('overlay').style.display = 'none'; // Oculta o overlay
}

// Evento de clique para abrir o pop-up
btnAdicionarCampeao.addEventListener('click', abrirPopupAdicao);

// Evento de clique para cancelar e fechar o pop-up
btnCancelarPopup.addEventListener('click', fecharPopupAdicao);

// Função para reduzir a vida de um campeão
function reduzirVida(index) {
    if (campeoes[index].partidas > 0) {
        campeoes[index].partidas -= 1;

        // Remove automaticamente o campeão se as partidas chegarem a 0
        if (campeoes[index].partidas === 0) {
            campeoes.splice(index, 1);
        }
        atualizarTabela();
    }
}

// Função para editar um campeão
function editarCampeao(index) {
    nomeCampeaoInput.value = campeoes[index].nome;
    partidasCampeaoInput.value = campeoes[index].partidas;
    formCampeao.dataset.index = index; // Armazena o índice para edição
    abrirPopupAdicao(); // Abre o pop-up
}

// Função para mover um campeão para cima
function moverParaCima(index) {
    if (index > 0) {
        [campeoes[index], campeoes[index - 1]] = [campeoes[index - 1], campeoes[index]];
        atualizarTabela();
    }
}

// Função para mover um campeão para baixo
function moverParaBaixo(index) {
    if (index < campeoes.length - 1) {
        [campeoes[index], campeoes[index + 1]] = [campeoes[index + 1], campeoes[index]];
        atualizarTabela();
    }
}

// Função para mover um campeão para o topo
function moverParaTopo(index) {
    if (index > 0) {
        const campeao = campeoes.splice(index, 1)[0];
        campeoes.unshift(campeao);
        atualizarTabela();
    }
}

// Função para remover um campeão
function removerCampeao(index) {
    campeoes.splice(index, 1);
    atualizarTabela();
}

// Recupera os dados do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const campeoesSalvos = localStorage.getItem('campeoes');
    if (campeoesSalvos) {
        campeoes = JSON.parse(campeoesSalvos);
        atualizarTabela();
    }
});

// Comunicação com o backend Electron
const { ipcRenderer } = require('electron');

ipcRenderer.on('salvar-dados', () => {
    localStorage.setItem('campeoes', JSON.stringify(campeoes)); // Salva os dados no localStorage
    ipcRenderer.send('dados-salvos'); // Informa o backend que os dados foram salvos
});
