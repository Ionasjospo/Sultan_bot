const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  startBot: () => ipcRenderer.send('start-bot'),
  onBotStarted: (callback) => ipcRenderer.on('bot-started', (event, message) => callback(message)),
  sendMessages: (numbers, message) => ipcRenderer.send('send-messages', numbers, message), // Añadir esta línea
});
