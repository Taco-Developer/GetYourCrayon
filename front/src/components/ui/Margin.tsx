import React from 'react';
import tw from 'tailwind-styled-components';

export default function Margin({ type, size }: { type: string; size: number }) {
  const style: React.CSSProperties =
    type === 'height'
      ? { height: size, display: 'block' }
      : { width: size, display: 'inline-block' };
  return <span style={style}></span>;
}
