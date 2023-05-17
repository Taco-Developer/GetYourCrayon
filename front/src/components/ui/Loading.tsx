import React from 'react';

export default function Loading() {
  return (
    <div className="col-span-12 h-full bg-white flex justify-center items-center z-50">
      <p className="text-2xl">게임 데이터를 불러오고 있어요!!!!</p>
      <p>😢조금만 기다려주세요😢</p>
    </div>
  );
}
