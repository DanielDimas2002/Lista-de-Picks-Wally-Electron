// Importa os módulos 'app' e 'BrowserWindow' do Electron
const { app, BrowserWindow } = require('electron');
// Importa o módulo 'path' para manipular caminhos de arquivo
const path = require('path');

// Declara a variável que armazenará a janela principal do aplicativo
let mainWindow;

// Função responsável por criar a janela principal do aplicativo
function createWindow() {
  // Cria uma nova janela do navegador com dimensões de 800x600
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // Configurações adicionais da janela
    webPreferences: {
      // Preload carrega o script.js para execução antes do conteúdo web
      preload: path.join(__dirname, 'App', 'script.js'),
      // Permite a integração de Node.js no conteúdo da janela
      nodeIntegration: true
    }
  });

  // Carrega o arquivo HTML da aplicação na janela criada
  mainWindow.loadFile(path.join(__dirname, 'App', 'Picks_do_Chat.html'));

  // Evento disparado quando a janela é fechada
  mainWindow.on('closed', () => {
    // Limpa a referência da janela (evita problemas de memória)
    mainWindow = null;
  });
}

// Evento que é executado quando o Electron está pronto para criar janelas
app.whenReady().then(createWindow);

// Evento que é disparado quando todas as janelas do aplicativo estão fechadas
app.on('window-all-closed', () => {
  // No macOS, as aplicações geralmente permanecem abertas, mas fecham no Windows/Linux
  if (process.platform !== 'darwin') {
    app.quit(); // Fecha completamente o aplicativo
  }
});

// Evento ativado quando o ícone do aplicativo é clicado (macOS)
// Reabre a janela se ela tiver sido fechada, mas o app ainda estiver rodando em background
app.on('activate', () => {
  // Se a janela principal foi fechada, cria uma nova
  if (mainWindow === null) {
    createWindow();
  }
});
