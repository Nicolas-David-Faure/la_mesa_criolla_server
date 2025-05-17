import { Server, Socket } from 'socket.io';
import { RoomToCreate, User } from './infoServer/types';
import { rooms } from './infoServer/rooms';
import { v4 as uuidv4 } from 'uuid'; // Para generar IDs únicos
import { users } from './infoServer/users';
import { getRoomsSummaryForGame } from './utils/getRoomsSummaryForGame';


// Crear una sala
export function handleCreateRoom(io: Server, socket: Socket, roomToCreate: RoomToCreate) {
  const roomID = uuidv4();
  const { game, userID, name } = roomToCreate;

  const roomsGame = rooms.get(game);
  if (!roomsGame) { 
    console.error(`Juego no encontrado: ${game}`);
    return;
  }

  console.log('lista de usuarios', users);

  const currentUser = users.get(userID);
  if (!currentUser) return;

  const updatedUser: User = {
    ...currentUser,
    game,
    roomID: roomID
  };

  users.set(userID, updatedUser);

  if (!roomsGame.has(roomID)) {
    roomsGame.set(roomID, {
      name,
      players: [updatedUser],
    }); // 🔴 acá faltaba cerrar el paréntesis correctamente
  }

  socket.leave(`lobby-${game}`);
  socket.join(roomID);

  console.log(`Sala creada: ${roomID} para el juego ${game}`);

  io.to(roomID).emit('room_created', {
    roomID,
    roomName: name,
    players: [updatedUser],
  });

 
  const roomsSummary = getRoomsSummaryForGame(game, rooms);
  console.log('roomsSummary', roomsSummary);
  io.to(`lobby-${game}`).emit('rooms_updated', roomsSummary); // 🔄 buen uso del nombre fijo
}


// Unirse a una sala existente
export function handleJoinRoom(io: Server, socket: Socket, userID: string, roomID: string) {

  const currentUser = users.get(userID);

  console.log('USER ID ', userID);
  if(!currentUser){
    return console.error(`Usuario no encontrado: ${userID}`);
  }

  const roomsGame = rooms.get(currentUser.game);

  if (!roomsGame) {
    console.error(`Juego no encontrado: ${currentUser.game}`);
    return;
  }

  const room = roomsGame.get(roomID);
  if (!room) {
    console.error(`Sala no encontrada: ${roomID}`);
    return;
  }


  const updatedUser = { ...currentUser, roomID };
  users.set(currentUser.userID, updatedUser);

  // Agregar al usuario a la lista de jugadores de la sala (si no estaba ya)
  if (!room.players.find(p => p.userID === currentUser.userID)) {
    room.players.push(updatedUser);
  }

  // Salir del lobby
  socket.leave(`lobby-${currentUser.game}`);
  socket.join(roomID);

  console.log(`Usuario ${currentUser.nombre} se unió a la sala ${roomID}`);

  // Emitir nueva info a los jugadores de esa sala
  io.to(roomID).emit('room_updated', {
    roomID,
    roomName: room.name,
    players: room.players,
  });

  // Emitir el resumen actualizado de salas al lobby
  const roomsSummary = getRoomsSummaryForGame(currentUser.game, rooms);
  io.to(`lobby-${currentUser.game}`).emit('rooms_updated', roomsSummary);
}
