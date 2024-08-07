const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { startBot } = require('./bot.js');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

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

ipcMain.on('start-bot', async (event) => {
  console.log('start-bot event received');
  try {
    await startBot();
    event.reply('bot-started', 'Bot iniciado correctamente.');
  } catch (error) {
    event.reply('bot-started', `Error: ${error.message}`);
  }
});

ipcMain.on('send-messages', async (event, numbers, message) => {
    console.log('send-messages event received');
    try {
      await sendMessages(numbers, message); // Asegúrate de importar sendMessages desde bot.js
      event.reply('messages-sent', 'Mensajes enviados correctamente.');
    } catch (error) {
      event.reply('messages-sent', `Error: ${error.message}`);
    }
  });
  