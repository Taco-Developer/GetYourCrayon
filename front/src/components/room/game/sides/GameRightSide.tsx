import React from 'react';
import SideDisplay from './SideDisplay';
import { Button } from '@/components/ui/Button';

export default function GameRightSide({ isPainting }: { isPainting: boolean }) {
  return (
    <SideDisplay>
      <div>남은 시간</div>
      <div>채팅</div>
      {isPainting && (
        <Button
          px={4}
          py={2}
          rounded="lg"
          color="bg-amber-300"
          className="w-full"
        >
          완료
        </Button>
      )}
    </SideDisplay>
  );
}
