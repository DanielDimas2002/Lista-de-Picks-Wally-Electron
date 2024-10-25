// Seleciona os elementos necessários
const btnAdicionarCampeao = document.getElementById('adicionarCampeao');
const popupForm = document.getElementById('popupForm');
const formCampeao = document.getElementById('formCampeao');
const nomeCampeaoInput = document.getElementById('nomeCampeao');
const partidasCampeaoInput = document.getElementById('partidasCampeao');
const cancelarPopup = document.getElementById('cancelarPopup');
const tabelaPicksBody = document.querySelector('#tabelaPicks tbody');
const instrucoesBotao = document.getElementById('instrucoesBotao');
const instrucoesTela = document.getElementById('instrucoes');
const fecharInstrucoes = document.getElementById('fecharInstrucoes');


let campeoes = [];

// Função para atualizar a tabela de campeões
function atualizarTabela() {
    tabelaPicksBody.innerHTML = ''; // Limpa a tabela

    campeoes.forEach((campeao, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${campeao.nome}</td>
            <td>${campeao.partidas}</td>
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
    popupForm.style.display = 'none';
    atualizarTabela();
});

// Função para abrir o pop-up
btnAdicionarCampeao.addEventListener('click', () => {
    popupForm.style.display = 'flex';
});

// Função para cancelar o pop-up
cancelarPopup.addEventListener('click', () => {
    popupForm.style.display = 'none';
    formCampeao.reset();
    delete formCampeao.dataset.index;
});

// Função para reduzir a vida de um campeão
function reduzirVida(index) {
    if (campeoes[index].partidas > 0) {
        campeoes[index].partidas -= 1;

        // Se a vida (partidas) chegar a 0, pede confirmação para remover o campeão
        if (campeoes[index].partidas === 0) {
            const confirmacao = window.confirm(`Já acabou de trollar com o(a) ${campeoes[index].nome} Wally?`);
            if (confirmacao) {
                removerCampeao(index); 
            } else {
                // Se o usuário não confirmar, restaura a vida para 1 (ou qualquer valor que você escolher)
                campeoes[index].partidas = 1; 
                atualizarTabela(); 
            }
        } else {
            atualizarTabela(); 
        }
    } else {
        alert('O campeão não tem mais partidas restantes.');
    }
}



// Função para editar um campeão
function editarCampeao(index) {
    nomeCampeaoInput.value = campeoes[index].nome;
    partidasCampeaoInput.value = campeoes[index].partidas;
    formCampeao.dataset.index = index; // Armazena o índice para edição
    popupForm.style.display = 'flex'; // Abre o pop-up
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
    const confirmacao = window.confirm(`Wally, tem certeza que deseja excluir ${campeoes[index].nome} da lista?`);
    if (confirmacao) {
        campeoes.splice(index, 1);
        atualizarTabela();
    }
}

// Recupera os dados do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const campeoesSalvos = localStorage.getItem('campeoes');
    if (campeoesSalvos) {
        campeoes = JSON.parse(campeoesSalvos);
        atualizarTabela();
    }
});

// Função para abrir a tela lateral de instruções
instrucoesBotao.addEventListener('click', () => {
    instrucoesTela.style.display = 'block'; // Exibe a tela lateral
});

// Função para fechar a tela lateral de instruções
fecharInstrucoes.addEventListener('click', () => {
    instrucoesTela.style.display = 'none'; // Esconde a tela lateral
});