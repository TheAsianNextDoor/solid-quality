import { applyWSSHandler } from '@trpc/server/adapters/ws';
import fetch from 'node-fetch';
import { WebSocketServer } from 'ws';

import { createContext } from './context';
import { appRouter } from './router/_app';

if (!global.fetch) {
  (global as any).fetch = fetch;
}

const wss = new WebSocketServer({
  port: 3001,
});

const handler = applyWSSHandler({ wss, router: appRouter, createContext });

wss.on('connection', (socket) => {
  console.log(`++ Connection (${wss.clients.size})`);
  socket.once('close', () => {
    console.log(`-- Connection (${wss.clients.size})`);
  });
});

console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wss.close();
});
