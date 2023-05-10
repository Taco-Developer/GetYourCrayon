'use client';
import React, { useState, useEffect, ReactElement } from 'react';
// import { socket } from '@/socket/server';
import Ready from '@/components/room/ready/Ready';

export default function Room() {
  const [userId, setUserId] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [status, setStatus] = useState<string>('ready');

  return <div>room</div>;
  // useEffect(() => {
  //   socket;
  // }, []);

  // switch (status) {
  //   case 'ready':
  //     return (
  //       <Ready
  //         socket={socket}
  //         userId={userId}
  //         setUserId={setUserId}
  //         room={room}
  //         setRoom={setRoom}
  //         setStatus={setStatus}
  //       />
  //     );
  //     break;
  // }
}
// socket={socket} userId={userId} setUserId={setUserId} room={room} setRoom={setRoom}
