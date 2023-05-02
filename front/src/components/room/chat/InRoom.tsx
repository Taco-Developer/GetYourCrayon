import { useState, useEffect } from 'react';
import { socket } from '@/socket/server';

interface RoomPropsType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
}

export default function InRoom({
  userId,
  setUserId,
  room,
  setRoom,
}: RoomPropsType) {
  const joinRoom = () => {
    if (userId !== '' && room !== '') {
      const data = { userId: userId, room: room };
      socket.emit('join_room', data);
      setUserId('');
      setRoom('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={userId}
        placeholder="nickname..."
        onChange={(event) => {
          setUserId(event.target.value);
        }}
      />
      <input
        type="text"
        value={room}
        placeholder="room..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>입장</button>
    </div>
  );
}
