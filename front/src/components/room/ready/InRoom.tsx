import { registerId } from '@/store/slice/game/userDataSlice';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import { useState, useEffect } from 'react';

interface MediaDeviceInfo {
  contentHint: string;
  enabled: boolean;
  id: string;
  kind: string;
  label: string;
  muted: boolean;
  oncapturehandlechange?: any;
  onended?: any;
  onmute?: any;
  onunmute?: any;
  readyState?: string;
}

interface RoomPropsType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setShowChat: React.Dispatch<React.SetStateAction<string>>;
}

export default function InRoom({
  userId,
  setUserId,
  room,
  setRoom,
  setShowChat,
}: RoomPropsType) {
  const dispatch = useAppDispatch();
  const { roomIdx } = useAppSelector((state) => state.roomIdx);

  const joinRoom = () => {
    if (userId !== '' && roomIdx !== null) {
      // socket.emit('join_room', userId, room);
      setShowChat('readyRoom');
      dispatch(registerId(userId));
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
      <button onClick={joinRoom}>입장</button>
    </div>
  );
}
