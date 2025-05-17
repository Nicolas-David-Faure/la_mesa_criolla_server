import { Server } from 'socket.io';
import { handleConnection } from './connection';

export function setupSocket(io: Server) {
  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);
    handleConnection(io, socket);
  });
}
