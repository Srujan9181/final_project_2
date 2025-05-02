import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';

import connectDatabase from './libs/db.js';
import accountEndpoints from './routes/User.route.js';
import messageEndpoints from './routes/Chat.route.js';

dotenv.config();

const appInstance = express();
const serverInstance = http.createServer(appInstance);

const ioChannel = new SocketServer(serverInstance, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const activePort = process.env.PORT;

appInstance.use(express.json());
appInstance.use(express.urlencoded({ extended: true }));
appInstance.use(cors({ origin: '*' }));

appInstance.use('/user', accountEndpoints);
appInstance.use('/message', messageEndpoints);

appInstance.get('/', (req, res) => {
  res.send('Hello World!');
});

ioChannel.on('connection', (client) => {
  console.log('Connected:', client.id);

  client.on('updateConfig', (details) => {
    client.broadcast.emit('configUpdated', details);
  });

  client.on('disconnect', () => {
    console.log('Disconnected:', client.id);
  });
});

serverInstance.listen(activePort, () => {
  console.log('localhost:',activePort);
  connectDatabase();
});
