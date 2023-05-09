import { useState, useEffect } from 'react';

export default function Dropdown() {
  const [animation, setAnimation] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<null>(null);
  return (
    <div>
      <h1>Dropdown</h1>
    </div>
  );
}
