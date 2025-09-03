import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './sockets';
import { users } from './sockets/infoServer/users';
import { rooms } from './sockets/infoServer/rooms';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// Configura sockets
setupSocket(io);


app.get('/users', (req, res) => {
  const usersArray = Array.from(users.values());
  console.log('users', usersArray);
  res.send(usersArray);
 
});

app.get('/rooms', (req, res) => {

  res.send(rooms);

});


server.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});
