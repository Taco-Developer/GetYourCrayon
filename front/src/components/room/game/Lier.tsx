import React, { useState } from 'react';

import { w3cwebsocket as W3CWebsocket } from 'websocket';

import Drawing from './roles/Drawing';
import Watching from './roles/Watching';
import Selecting from './roles/Selecting';
import { useAppSelector } from '@/store/thunkhook';

export default function Lier({ client }: { client: W3CWebsocket }) {
  const { userRole } = useAppSelector((state) => state.userData);

  switch (userRole) {
    case 'drawing':
      return <Drawing client={client} />;
    case 'watching':
      return <Watching />;
    case 'selecting':
      return <Selecting />;
    default:
      return <div>Something wrong!!</div>;
  }
}
