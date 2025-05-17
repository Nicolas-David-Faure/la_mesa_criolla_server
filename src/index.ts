import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './sockets';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// Configura sockets
setupSocket(io);

server.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
