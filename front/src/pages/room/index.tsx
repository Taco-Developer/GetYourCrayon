'use client';
import React, { useState, useEffect } from 'react';
import { socket } from '@/socket/server';
import Ready from '@/components/room/ready/Ready';
import tw from 'tailwind-styled-components';

export default function Room() {
  const [userId, setUserId] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  useEffect(() => {
    socket;
  }, []);
  return (
    <div>
      <Ready
        socket={socket}
        userId={userId}
        setUserId={setUserId}
        room={room}
        setRoom={setRoom}
      />
    </div>
  );
}
