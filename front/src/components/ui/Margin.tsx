import React from 'react';
import tw from 'tailwind-styled-components';

export default function Margin({ type, size }: { type: string; size: number }) {
  const style: React.CSSProperties =
    type === 'height'
      ? { height: size }
      : { width: size, display: 'inline-block' };
  return <div style={style}></div>;
}
