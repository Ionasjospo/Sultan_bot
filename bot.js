const venom = require('venom-bot');
const fs = require('fs');

let client;

function startBot() {
  return venom
    .create(
      'session-name', 
      (base64Qr, asciiQR) => {
        console.log(asciiQR); // Log ASCII QR code to terminal
        exportQR(base64Qr, 'qr-code.png'); // Export QR to a file
      },
      (statusSession, session) => {
        console.log('Status Session: ', statusSession); // Return is the current status of the session
        // Example output: 'isLogged' or 'notLogged' or 'browserClose' or 'qrReadSuccess' or 'qrReadFail'
      },
      {
        multidevice: false // for version not multidevice use false.(default: true)
      }
    )
    .then((newClient) => {
      client = newClient;
      start(client);
    })
    .catch((error) => {
      console.log('Error creating client:', error);
      throw error;
    });
}

function exportQR(qrCode, path) {
  qrCode = qrCode.replace('data:image/png;base64,', '');
  const imageBuffer = Buffer.from(qrCode, 'base64');
  fs.writeFileSync(path, imageBuffer);
}

function start(client) {
  console.log('Bot is ready!');

  client.onMessage((message) => {
    if (message.body === '!ping') {
      client.sendText(message.from, 'pong');
    }
  });
}

async function sendMessages(numbers, message) {
  if (!client) {
    throw new Error('Client is not initialized');
  }

  for (const number of numbers) {
    try {
      await client.sendText(number, message);
      console.log(`Message sent to ${number}`);
    } catch (error) {
      console.error(`Failed to send message to ${number}:`, error);
    }
  }
}

async function sendImage(numbers, filePath, caption) {
  if (!client) {
    throw new Error('Client is not initialized');
  }

  for (const number of numbers) {
    try {
      await client.sendImage(number, filePath, 'image.jpg', caption);
      console.log(`Image sent to ${number}`);
    } catch (error) {
      console.error(`Failed to send image to ${number}:`, error);
    }
  }
}

module.exports = { startBot, sendMessages, sendImage };
