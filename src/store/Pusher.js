import Pusher from 'pusher-js';

Pusher.logToConsole = true;
export  const pusher = new Pusher('98b580fb614eb0dddaef', {
    cluster: 'en',
    encrypted: true
  });