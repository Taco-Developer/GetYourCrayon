import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

interface RoomPropsType {
  socket: Socket;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InRoom({
  socket,
  userId,
  setUserId,
  room,
  setRoom,
  setShowChat,
}: RoomPropsType) {
  const joinRoom = () => {
    if (userId !== '' && room !== '') {
      socket.emit('join_room', userId, room);
      setShowChat(true);
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
