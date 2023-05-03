'use client';
import React, { useState, useEffect } from 'react';
import { socket } from '@/socket/server';
import Chat from '@/components/room/ready/Chat';
import InRoom from '@/components/room/ready/InRoom';

export default function Room() {
  const [userId, setUserId] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [showChat, setShowChat] = useState<boolean>(false);

  useEffect(() => {
    socket;
  }, []);
  return (
    <div>
      <h1>Room Page</h1>
      {!showChat ? (
        <InRoom
          socket={socket}
          userId={userId}
          setUserId={setUserId}
          room={room}
          setRoom={setRoom}
          setShowChat={setShowChat}
        />
      ) : (
        <Chat socket={socket} userId={userId} room={room} />
      )}
    </div>
  );
}
