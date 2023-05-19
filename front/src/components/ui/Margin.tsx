import React from 'react';

export enum MarginType {
  height,
  width,
}

export default function Margin({
  type,
  size,
}: {
  type: MarginType;
  size: number;
}) {
  const style: React.CSSProperties =
    type === MarginType.height
      ? { height: size, display: 'block' }
      : { width: size, display: 'inline-block' };
  return <span style={style}></span>;
}
