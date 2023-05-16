'use client';
import React, { useState, useEffect } from 'react';
import Ready from '@/components/room/ready/Ready';
import InGameRoom from '@/components/room/game/InGameRoom';
import GameResult from '@/components/room/result/GameResult';
import { GetServerSideProps } from 'next';
import { useAppDispatch } from '@/store/thunkhook';
import { setRoomIdx } from '@/store/slice/game/gameRoom';

export default function Room({ roomIdx }: { roomIdx: string }) {
  const [userId, setUserId] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [status, setStatus] = useState<string>('ready');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) {
      dispatch(setRoomIdx({ roomIdx }));
    }
  }, [dispatch, socket, roomIdx]);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      roomIdx: context.params?.roomIdx || 'noRoom',
    },
  };
};
