import React, { useState } from 'react';

import { w3cwebsocket as W3CWebsocket } from 'websocket';

import Drawing from './roles/Drawing';
import Solving from './roles/Solving';
import { useAppSelector } from '@/store/thunkhook';

export default function ReverseCatchMind({ client }: { client: W3CWebsocket }) {
  const { userRole } = useAppSelector((state) => state.userData);

  switch (userRole) {
    case 'drawing':
      return <Drawing client={client} />;
    case 'solving':
      return <Solving isReverseGame={true} client={client} />;
    default:
      return <div>Something wrong!!</div>;
  }
}
