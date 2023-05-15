import React from 'react';

import Drawing from './roles/Drawing';
import Watching from './roles/Watching';
import Selecting from './roles/Selecting';
import { useAppSelector } from '@/store/thunkhook';

export default function Lier({ socket }: { socket: WebSocket }) {
  const { userRole } = useAppSelector((state) => state);

  switch (userRole) {
    case 'drawing':
      return <Drawing socket={socket} />;
    case 'watching':
      return <Watching />;
    case 'selecting':
      return <Selecting />;
    default:
      return <div>Something wrong!!</div>;
  }
}
