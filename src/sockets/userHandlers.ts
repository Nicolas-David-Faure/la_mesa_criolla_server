import { Server, Socket } from 'socket.io';
import { User } from './infoServer/types';

import { rooms } from './infoServer/rooms';
import { getRoomsSummaryForGame } from './utils/getRoomsSummaryForGame';
import { users } from './infoServer/users';

export function handleUserConnected(io: Server, socket: Socket, data: User) {
  const existingUser = users.get(data.userID);

  if (existingUser) {
    // Reconexión
    existingUser.socketID = socket.id;
    existingUser.status = 'connected';

    const game = existingUser.game;
    const roomID = existingUser.roomID;

    if (game && roomID && rooms.get(game)?.get(roomID)) {
      socket.join(roomID);
      socket.emit('room_rejoined', {
        roomID,
        players: rooms.get(game)?.get(roomID)?.players || [],
      });
      return;
    }
  }

  // Conexión nueva o reconexión sin sala válida
  const user: User = { ...data, socketID: socket.id, status: 'connected' };
  users.set(data.userID, user);
  console.log('handle connected',  users);

  socket.join(`lobby-${data.game}`);
  const roomsSummary = getRoomsSummaryForGame(data.game, rooms);
  socket.emit(`rooms_updated`, roomsSummary);
}



export function handleDisconnect(io: Server, socket: Socket) {
  console.log('Cliente desconectado:', socket.id);

  // Buscar el usuario por su socket.id
  const user = [...users.values()].find(u => u.socketID === socket.id);
  
  if (!user) {
    console.log('Usuario no encontrado en desconexión');
    return;
  }

  // Marcar como desconectado
  user.status = 'disconnected';
  users.set(user.userID, user); // actualizamos el map

  if (user.game && user.roomID) {
    const roomsGame = rooms.get(user.game);
    const room = roomsGame?.get(user.roomID);

    if (room) {
      // Quitar al usuario de la sala
      room.players = room.players.filter(p => p.userID !== user.userID);

      if (room.players.length === 0) {
        // Eliminar sala si queda vacía
        roomsGame!.delete(user.roomID);
        console.log(`Sala eliminada: ${user.roomID}`);
      } else {
        // Actualizar sala si quedan jugadores
        roomsGame!.set(user.roomID, room);
        socket.leave(user.roomID);
        // Emitir actualización de la sala a los jugadores restantes
        io.to(user.roomID).emit('player_left', {
          userID: user.userID,
          players: room.players
        });
      }
    }
  }

  console.log('handle disconnect',  users);

  // También podemos emitir actualización al lobby correspondiente
  const roomsSummary = getRoomsSummaryForGame(user.game, rooms);
  io.to(`lobby-${user.game}`).emit('rooms_updated', roomsSummary);
}

