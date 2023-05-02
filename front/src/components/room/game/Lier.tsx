import React, { useState } from 'react';

import Painting from './roles/Painting';
import Watching from './roles/Watching';
import Selecting from './roles/Selecting';

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
      return <Selecting />;
    default:
      return <div>Something wrong!!</div>;
  }
}
