'use client';
import React, { useState } from 'react';
import Ready from '@/components/room/ready/Ready';
import InGameRoom from '@/components/room/game/InGameRoom';
import GameResult from '@/components/room/result/GameResult';

export default function Room() {
  const [userId, setUserId] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [status, setStatus] = useState<string>('ready');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  switch (status) {
    case 'ready':
      return (
        <Ready
          userId={userId}
          setUserId={setUserId}
          room={room}
          setRoom={setRoom}
          setStatus={setStatus}
          socket={socket}
          setSocket={setSocket}
        />
      );
    case 'gameStart':
      return <InGameRoom game="CatchMind" socket={socket as WebSocket} />;
    case 'gameEnd':
      return <GameResult socket={socket as WebSocket} />;
    default:
      return <div>Something wrong!!!</div>;
  }
}
// socket={socket} userId={userId} setUserId={setUserId} room={room} setRoom={setRoom}
