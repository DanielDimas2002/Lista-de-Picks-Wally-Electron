// Importa os módulos necessários do Electron e Node
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");

let mainWindow; // Armazena a referência da janela principal

// Função responsável por criar a janela principal do aplicativo
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'app-react', 'preload.js'), // ⚠️ Ponte segura entre React e Node
      contextIsolation: true,  // Mantém o preload isolado do contexto global
      nodeIntegration: false   // 🔒 Desativa acesso direto ao Node pelo front-end
    }
  });

  // Carrega o index.html do React (build final ou dev)
  mainWindow.loadFile(path.join(__dirname, 'app-react', 'public', 'index.html'));

  // Quando a janela for fechada, libera o recurso
  mainWindow.on('close', () => {
    mainWindow = null;
  });
}

// Escuta pedidos do React para salvar dados em arquivos JSON
ipcMain.on("salvar-dados", (event, tipo, dados) => {
  const caminho = path.join(__dirname, "app-react", "data", `${tipo}.json`);
  
  fs.readFile(caminho, "utf8", (erro, conteudo) => {
    let lista = [];
    
    if (!erro) {
      try {
        lista = JSON.parse(conteudo); // Tenta carregar dados já existentes
      } catch (e) {
        console.log("Erro ao converter JSON:", e); // Em caso de arquivo corrompido
      }
    }

    lista.push(dados); // Adiciona os novos dados recebidos

    fs.writeFile(caminho, JSON.stringify(lista, null, 2), (erro) => {
      if (erro) {
        console.error("Erro ao salvar:", erro);
      } else {
        console.log(`✅ Dados salvos em ${tipo}.json`);
      }
    });
  });
});

// Cria a janela quando o app estiver pronto
app.whenReady().then(createWindow);

// Fecha completamente o app em Windows/Linux
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Reabre a janela no macOS quando o ícone for clicado
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
