import { Games, Rooms, RoomSummary } from "../infoServer/types";

export function getRoomsSummaryForGame(game: Games, rooms: Rooms): RoomSummary[] {
  const summary: RoomSummary[] = [];

  const gameRooms = rooms.get(game);

  console.log('gameRooms', gameRooms);
  if (!gameRooms) {
    return summary;
  }
  // console.log(gameRooms.entries().return());
  for (const [roomID, room] of gameRooms.entries()) {
    summary.push({
      roomID,
      name: room.name,
      playersCount: room.players.length,
    });
  }
  

  return summary;
}