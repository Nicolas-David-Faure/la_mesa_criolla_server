
export type Games = 'uno' | 'truco' | 'chinchon' | 'escoba';

export interface User {
  userID: string;
  nombre: string;
  game:  Games;
  socketID: string;
  roomID: string | null;
  status: 'connected' | 'disconnected';
}



export interface RoomInfo {
  name: string;
  players: Array<User>;
}




export type Room = Map<string, RoomInfo>; // Mapa de salas por ID
export type Rooms = Map<Games, Room>;     // Mapa de juegos → salas
export interface RoomToCreate {
  game: Games;
  name: string;
  userID : string;
}

export interface RoomSummary {
  roomID: string;
  name: string;
  playersCount: number;
}