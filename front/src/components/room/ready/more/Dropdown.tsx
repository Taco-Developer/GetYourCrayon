import { useState, useEffect } from 'react';

export default function Dropdown() {
  const [animation, setAnimation] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<null>(null);
  return (
    <article
      className={`components-dropdown ${
        props.visibility ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'
      }`}
    >
      {animation && props.children}
    </article>
  );
}
