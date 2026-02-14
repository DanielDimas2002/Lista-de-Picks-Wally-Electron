// preload.js

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {

  lerDados: function (tipo) {
    return ipcRenderer.invoke("ler-dados", tipo);
  },

  salvarDados: function (tipo, dados) {
    return ipcRenderer.invoke("salvar-dados", tipo, dados);
  },

  atualizarDados: function (tipo, novaLista) {
    return ipcRenderer.invoke("atualizar-dados", tipo, novaLista);
  }

});

