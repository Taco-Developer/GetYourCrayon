import React from 'react';

import Drawing from './roles/Drawing';
import Solving from './roles/Solving';
import { useAppSelector } from '@/store/thunkhook';
import Loading from '@/components/ui/Loading';

export default function CatchMinde({ socket }: { socket: WebSocket }) {
  const { userRole } = useAppSelector((state) => state);

  switch (userRole) {
    case 'drawing':
      return <Drawing socket={socket} />;
    case 'solving':
      return <Solving isReverseGame={false} socket={socket} />;
    default:
      return <Loading />;
  }
}
