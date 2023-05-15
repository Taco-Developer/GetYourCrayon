import React, { useEffect } from 'react';

import tw from 'tailwind-styled-components';

import Lier from '@/components/room/game/Lier';
import ReverseCatchMind from '@/components/room/game/ReverseCatchMind';
import AiPaintingGuess from '@/components/room/game/AiPaintingGuess';
import RelayPainting from '@/components/room/game/RelayPainting';
import CatchMind from '@/components/room/game/CatchMind';
import { useAppDispatch } from '@/store/thunkhook';
import { addInGameChat } from '@/store/slice/game/inGameChatDatasSlice';
import { listenEvent, removeEvent } from '@/socket/socketEvent';

export default function InGameRoom({
  game,
  socket,
}: {
  game: string;
  socket: WebSocket;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const messageHandler = (message: MessageEvent) => {
      const data = JSON.parse(message.data);
      if (data.type === 'inGameChat') {
        dispatch(addInGameChat(data.content));
      }
    };
    listenEvent(socket, messageHandler);

    return () => {
      removeEvent(socket, messageHandler);
    };
  }, [dispatch, socket]);

  return (
    <>
      <Container>
        {game === 'Lier' && <Lier socket={socket} />}
        {game === 'AiPainting' && <AiPaintingGuess socket={socket} />}
        {game === 'RelayPainting' && <RelayPainting socket={socket} />}
        {game === 'ReverseCatchMind' && <ReverseCatchMind socket={socket} />}
        {game === 'CatchMind' && <CatchMind socket={socket} />}
      </Container>
    </>
  );
}

const Container = tw.div`
  w-screen
  xl:w-10/12

  h-screen

  grid
  grid-cols-12
  gap-4

  mx-auto
  p-8

  bg-white/[.4]
`;
