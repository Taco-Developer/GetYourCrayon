'use client';
import React, { useState, useEffect } from 'react';
import { socket } from '@/socket/server';
import Chat from '@/components/room/chat/Chat';
import InRoom from '@/components/room/chat/InRoom';

export default function Room() {
  const [userId, setUserId] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  // useEffect(() => {}, [socket]);
  return (
    <div>
      <h1>Room Page</h1>
      <InRoom
        userId={userId}
        setUserId={setUserId}
        room={room}
        setRoom={setRoom}
      />
      <Chat />
    </div>
  );
}
