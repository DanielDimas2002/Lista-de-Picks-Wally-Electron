// Importa os módulos 'app', 'BrowserWindow' e 'ipcMain' do Electron
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

// Função responsável por criar a janela principal do aplicativo
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'App', 'preload.js'), // Preload adequado para comunicação segura
      nodeIntegration: true // Permite integração com Node.js
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'App', 'Picks_do_Chat.html'));

  // Evento disparado quando a janela for fechada
  mainWindow.on('close', () => {
    mainWindow = null; // Libera a memória corretamente
  });
}

// Ouve o evento do frontend para salvar dados antes de fechar
ipcMain.on('salvar-dados', () => {
  mainWindow.webContents.send('dados-salvos'); // Notifica o frontend para salvar antes de sair
});

// Quando o Electron estiver pronto, cria a janela
app.whenReady().then(createWindow);

// Fecha completamente o app no Windows/Linux quando todas as janelas são fechadas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Reabre a janela no macOS quando o ícone do app for clicado
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
