import React from 'react';

import { w3cwebsocket as W3CWebsocket } from 'websocket';

import Drawing from './roles/Drawing';
import Solving from './roles/Solving';
import { useAppSelector } from '@/store/thunkhook';

export default function CatchMinde({ client }: { client: W3CWebsocket }) {
  const { userRole } = useAppSelector((state) => state);

  if (userRole === '') return <div>로딩 중!!!~~</div>;

  switch (userRole) {
    case 'drawing':
      return <Drawing client={client} />;
    case 'solving':
      return <Solving isReverseGame={false} client={client} />;
    default:
      return <div>Something wrong!!!</div>;
  }
}
