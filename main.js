// Importa os módulos necessários do Electron e Node
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// ✅ Agora usamos a versão assíncrona do fs
const fs = require("fs").promises;

let mainWindow;

// ======================================================
// 🪟 CRIAÇÃO DA JANELA PRINCIPAL
// ======================================================

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(
    path.join(__dirname, 'app-react', 'build', 'index.html')
  );

  // ====================================================
  // 🛠️ ATALHOS PARA DEVTOOLS
  // ====================================================

  mainWindow.webContents.on(
    'before-input-event',
    function (event, input) {

      // F12
      if (
        input.key === 'F12' &&
        input.type === 'keyDown'
      ) {
        mainWindow.webContents.toggleDevTools();
      }

      // CTRL + SHIFT + I
      if (
        input.control &&
        input.shift &&
        input.key.toLowerCase() === 'i' &&
        input.type === 'keyDown'
      ) {
        mainWindow.webContents.toggleDevTools();
      }

    }
  );

  mainWindow.on('close', function () {
    mainWindow = null;
  });

}

// ======================================================
// 🚀 INICIALIZAÇÃO DO ELECTRON
// ======================================================

app.whenReady().then(createWindow);

// ======================================================
// 📥 LEITURA DE DADOS DO JSON
// ======================================================

ipcMain.handle(
  "ler-dados",

  async function (event, tipo) {

    const caminho = path.join(
      __dirname,
      "app-react",
      "data",
      `${tipo}.json`
    );

    try {

      const conteudo = await fs.readFile(
        caminho,
        "utf8"
      );

      const dados = JSON.parse(conteudo);

      console.log(`📥 Dados lidos de ${tipo}.json`);

      return dados;

    } catch (erro) {

      console.log(
        `⚠️ Arquivo ${tipo}.json não encontrado ou vazio`
      );

      return [];

    }

  }
);

// ======================================================
// 💾 SALVAMENTO DE DADOS NO JSON
// ======================================================

ipcMain.handle(
  "salvar-dados",

  async function (event, tipo, dados) {

    const caminho = path.join(
      __dirname,
      "app-react",
      "data",
      `${tipo}.json`
    );

    let lista = [];

    // ==========================================
    // 📥 Tenta ler o JSON existente
    // ==========================================

    try {

      const conteudo = await fs.readFile(
        caminho,
        "utf8"
      );

      lista = JSON.parse(conteudo);

    } catch (erro) {

      console.log(
        `⚠️ ${tipo}.json inexistente ou vazio`
      );

    }

    // ==========================================
    // ➕ Adiciona novo item
    // ==========================================

    lista.push(dados);

    // ==========================================
    // 💾 Salva novamente no JSON
    // ==========================================

    try {

      await fs.writeFile(
        caminho,
        JSON.stringify(lista, null, 2)
      );

      console.log(`✅ Dados salvos em ${tipo}.json`);

      return true;

    } catch (erro) {

      console.log(
        `❌ Erro ao salvar ${tipo}.json:`,
        erro
      );

      return false;

    }

  }
);

// ======================================================
// 🔄 ATUALIZAÇÃO COMPLETA DO JSON
// ======================================================

ipcMain.handle(
  "atualizar-dados",

  async function (event, tipo, novaLista) {

    const caminho = path.join(
      __dirname,
      "app-react",
      "data",
      `${tipo}.json`
    );

    try {

      await fs.writeFile(
        caminho,
        JSON.stringify(novaLista, null, 2)
      );

      console.log(
        `🔄 ${tipo}.json atualizado com sucesso`
      );

    } catch (erro) {

      console.log(
        `❌ Erro ao atualizar ${tipo}.json:`,
        erro
      );

    }

  }
);

// ======================================================
// ❌ FECHAMENTO TOTAL DO APP
// ======================================================

app.on(
  'window-all-closed',

  function () {

    if (process.platform !== 'darwin') {
      app.quit();
    }

  }
);

// ======================================================
// 🍎 REABRIR NO MAC
// ======================================================

app.on(
  'activate',

  function () {

    if (mainWindow === null) {
      createWindow();
    }

  }
);