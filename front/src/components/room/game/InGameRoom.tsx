import React from 'react';

import tw from 'tailwind-styled-components';

import Lier from '@/components/room/game/Lier';
import ReverseCatchMind from '@/components/room/game/ReverseCatchMind';
import AiPaintingGuess from '@/components/room/game/AiPaintingGuess';
import RelayPainting from '@/components/room/game/RelayPainting';
import CatchMinde from '@/components/room/game/CatchMinde';

export default function InGameRoom({ game }: { game: string }) {
  return (
    <>
      <Container>
        {game === 'Lier' && <Lier />}
        {game === 'AiPainting' && <AiPaintingGuess />}
        {game === 'RelayPainting' && <RelayPainting />}
        {game === 'ReverseCatchMind' && <ReverseCatchMind />}
        {game === 'CatchMinde' && <CatchMinde />}
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
