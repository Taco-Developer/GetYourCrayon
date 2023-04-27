import React, { useEffect, useRef } from 'react';

import tw from 'tailwind-styled-components';

import GameCenter from './sides/GameCenter';
import GameLeftSide from './sides/GameLeftSide';
import GameRightSide from './sides/GameRightSide';
import Margin from '@/components/ui/Margin';

export default function Painting() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      // 캔버스 구역 크기
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const dpr = window.devicePixelRatio;
      // 캔버스 크기 설정
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const context = canvas.getContext('2d');
      if (context) {
        context.scale(dpr, dpr);
        // 원 만들기
        context.beginPath();
        context.fillStyle = '#000';
        context.arc(100, 100, 40, 0, Math.PI * 2);
        context.fill();
        context.closePath();
      }
    }
  }, []);

  return (
    <>
      <GameLeftSide isPainting={true} />
      <GameCenter>
        <Margin type="height" size={16} />
        <canvas className="w-full flex-auto bg-white" ref={canvasRef}></canvas>
        <Margin type="height" size={16} />
        <CanvasOptions>
          <Option>옵션</Option>
          <Tools>도구</Tools>
        </CanvasOptions>
      </GameCenter>
      <GameRightSide />
    </>
  );
}

const CanvasOptions = tw.div`
  w-full
  h-20

  py-4
  px-8

  flex
  justify-between

  bg-amber-200
`;

const Option = tw.div`
  w-20
`;

const Tools = tw.div`
  w-20
`;
