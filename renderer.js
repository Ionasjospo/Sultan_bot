document.addEventListener('DOMContentLoaded', () => {
    const scanQrButton = document.getElementById('scanQrButton');
  
    if (scanQrButton) {
      console.log('Button found and listener attached');
      scanQrButton.addEventListener('click', () => {
        console.log('Button clicked');
        window.electron.startBot();
      });
    } else {
      console.error('Button not found');
    }
  
    const sendMessagesButton = document.getElementById('sendMessagge');

    if (sendMessagesButton) {
        sendMessagesButton.addEventListener('click', () => {
            console.log('send messagge clicked');
            const numbers = ['59891685942@c.us'];
            
            window.electron.sendMessages(numbers, "Hola");
          });
    } else {
        console.error('Button not found');
    }


    window.electron.onBotStarted((message) => {
      console.log('Bot started message received');
      alert(message);
    });
  });
  

  window.electron.onMessagesSent((message) => {
    console.log('Messages sent message received');
    alert(message);
  });
  