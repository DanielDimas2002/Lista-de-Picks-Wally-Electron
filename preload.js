// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  salvarDados: (tipo, dados) => ipcRenderer.send("salvar-dados", tipo, dados),
});
