import React from 'react';
import GameLeftSide from './sides/GameLeftSide';
import GameRightSide from './sides/GameRightSide';
import CenterDisplay from './sides/GameCenter';

export default function Watching() {
  return (
    <>
      <GameLeftSide isPainting={false} />
      <CenterDisplay>
        <div>그리는 사람</div>
        <div>그림 그리는 화면</div>
      </CenterDisplay>
      <GameRightSide />
    </>
  );
}
