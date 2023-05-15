'use client';
import React, { useState, useEffect } from 'react';
import Ready from '@/components/room/ready/Ready';
import InGameRoom from '@/components/room/game/InGameRoom';
import GameResult from '@/components/room/result/GameResult';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

export default function Room() {
  const [userId, setUserId] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [status, setStatus] = useState<string>('ready');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [client, setClient] = useState<W3CWebSocket | null>(null);

  switch (status) {
    case 'ready':
      return (
        <Ready
          userId={userId}
          setUserId={setUserId}
          room={room}
          setRoom={setRoom}
          setStatus={setStatus}
          client={client}
          setClient={setClient}
        />
      );
    case 'gameStart':
      return (
        <InGameRoom
          game="CatchMind"
          client={client as W3CWebSocket}
          socket={socket as WebSocket}
        />
      );
    case 'gameEnd':
      return <GameResult client={client as W3CWebSocket} />;
    default:
      return <div>Something wrong!!!</div>;
  }
}
// socket={socket} userId={userId} setUserId={setUserId} room={room} setRoom={setRoom}
