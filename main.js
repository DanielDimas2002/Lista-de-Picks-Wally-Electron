// Importa os módulos necessários do Electron e Node
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require("fs");

let mainWindow;

// Função responsável por criar a janela principal do aplicativo
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

  mainWindow.loadFile(path.join(__dirname, 'app-react', 'build', 'index.html'));
  mainWindow.webContents.openDevTools();

  mainWindow.on('close', function () {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

// ======================================================
// 📥 LEITURA DE DADOS DO JSON
// ======================================================

ipcMain.handle("ler-dados", async function (event, tipo) {

  const caminho = path.join(__dirname, "app-react", "data", `${tipo}.json`);

  try {

    const conteudo = fs.readFileSync(caminho, "utf8");
    const dados = JSON.parse(conteudo);

    console.log(`📥 Dados lidos de ${tipo}.json`);
    return dados;

  } catch (erro) {

    console.log(`⚠️ Arquivo ${tipo}.json não encontrado ou vazio`);
    return [];

  }
});

// ======================================================
// 💾 SALVAMENTO DE DADOS NO JSON
// ======================================================

ipcMain.handle("salvar-dados", async function (event, tipo, dados) {

  const caminho = path.join(__dirname, "app-react", "data", `${tipo}.json`);

  let lista = [];

  try {

    const conteudo = fs.readFileSync(caminho, "utf8");
    lista = JSON.parse(conteudo);

  } catch (erro) {
    console.log("Arquivo inexistente, criando novo...");
  }

  lista.push(dados);

  fs.writeFileSync(caminho, JSON.stringify(lista, null, 2));

  console.log(`✅ Dados salvos em ${tipo}.json`);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
