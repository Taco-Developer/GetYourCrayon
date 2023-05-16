import React from 'react';

import Drawing from './roles/Drawing';
import Solving from './roles/Solving';
import { useAppSelector } from '@/store/thunkhook';

export default function CatchMinde({ socket }: { socket: WebSocket }) {
  const { userRole } = useAppSelector((state) => state);

  if (userRole === '') return <div>로딩 중!!!~~</div>;

  switch (userRole) {
    case 'drawing':
      return <Drawing socket={socket} />;
    case 'solving':
      return <Solving isReverseGame={false} socket={socket} />;
    default:
      return <div>Something wrong!!!</div>;
  }
}
