import { Server, Socket } from 'socket.io';
import { handleUserConnected, handleDisconnect } from './userHandlers';
import { RoomToCreate, User } from './infoServer/types';
import { handleCreateRoom, handleJoinRoom } from './roomsHandlers';
// Podrías agregar después importaciones de rooms

export function handleConnection(io: Server, socket: Socket) {
  socket.on('mensaje', (msg) => {
    console.log(`Mensaje recibido: ${msg}`);
    io.emit('mensaje', msg);
  });

  socket.on('user_connected', (data : User) => {
    handleUserConnected(io, socket, data);
  });

  socket.on('create_room', (roomToCreate: RoomToCreate ) => {

    console.log('roomToCreate', roomToCreate);
    handleCreateRoom(io, socket, roomToCreate);
  });


  socket.on('join_room', (data : { userID: string, roomID: string }) => {
    handleJoinRoom(io, socket, data.userID, data.roomID);
  });


  socket.on('disconnect', () => {
    handleDisconnect(io, socket);
  });
}
