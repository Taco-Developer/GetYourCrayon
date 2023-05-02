import React, { useState } from 'react';
import Painting from './roles/Painting';
import Solving from './roles/Solving';

export default function RelayPainting() {
  const [role, setRole] = useState('solving');

  switch (role) {
    case 'painting':
      return <Painting />;
    case 'solving':
      return <Solving isReverseGame={false} />;
    default:
      return <div>Something wrong!!!</div>;
  }
}
