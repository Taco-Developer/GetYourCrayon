import React, { useState } from 'react';
import Painting from './roles/Painting';
import Solving from './roles/Solving';

export default function ReverseCatchMind() {
  const [role, setRole] = useState('solving');

  switch (role) {
    case 'painting':
      return <Painting />;
    case 'solving':
      return <Solving isReverseGame={true} />;
    default:
      return <div>Something wrong!!</div>;
  }
}
