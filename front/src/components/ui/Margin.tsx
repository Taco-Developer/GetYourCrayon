import React from 'react';

export default function Margin({ type, size }: { type: string; size: number }) {
  const style: React.CSSProperties =
    type === 'height' ? { height: size } : { width: size };
  return <div style={style}></div>;
}
