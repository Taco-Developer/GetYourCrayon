import React, { useState } from 'react';

import Painting from './Painting';
import Watching from './Watching';

export default function Lier() {
  const [role, setRole] = useState<string>('painting');

  const changedRole = (changedRole: string) => {
    setRole(changedRole);
  };

  switch (role) {
    case 'painting':
      return <Painting />;
    case 'watching':
      return <Watching />;
    case 'selecting':
      return <div>모두 다 그리고 결정하는 상황</div>;
    default:
      return <div>Something wrong!!</div>;
  }
}
