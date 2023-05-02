import React from 'react';
import SideDisplay from './SideDisplay';

export default function GameLeftSide({ isPainting }: { isPainting: boolean }) {
  return (
    <SideDisplay>
      <h2 className="text-2xl">1 / 5</h2>
      <div>참여 목록</div>
      {isPainting && <div>색 수정</div>}
      <div>음향 설정</div>
    </SideDisplay>
  );
}
