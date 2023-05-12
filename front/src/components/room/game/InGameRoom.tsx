import React from 'react';

import { w3cwebsocket as W3CWebsocket } from 'websocket';

import tw from 'tailwind-styled-components';

import Lier from '@/components/room/game/Lier';
import ReverseCatchMind from '@/components/room/game/ReverseCatchMind';
import AiPaintingGuess from '@/components/room/game/AiPaintingGuess';
import RelayPainting from '@/components/room/game/RelayPainting';
import CatchMind from '@/components/room/game/CatchMind';

export default function InGameRoom({
  game,
  client,
}: {
  game: string;
  client: W3CWebsocket;
}) {
  return (
    <>
      <Container>
        {game === 'Lier' && <Lier client={client} />}
        {game === 'AiPainting' && <AiPaintingGuess client={client} />}
        {game === 'RelayPainting' && <RelayPainting client={client} />}
        {game === 'ReverseCatchMind' && <ReverseCatchMind client={client} />}
        {game === 'CatchMind' && <CatchMind client={client} />}
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
