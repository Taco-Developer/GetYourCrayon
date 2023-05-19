import Image from 'next/image';
import React from 'react';
import Margin, { MarginType } from './Margin';

export default function Loading() {
  return (
    <div className="col-span-12 h-full bg-white flex flex-col justify-center items-center z-50 rounded-xl">
      <Image
        src="/images/bean_eater_400.gif"
        alt="been eater"
        width={400}
        height={400}
      />
      <p className="text-2xl">데이터를 불러오고 있어요!!!!</p>
      <Margin type={MarginType.height} size={16} />
      <p>😢조금만 기다려주세요😢</p>
    </div>
  );
}
