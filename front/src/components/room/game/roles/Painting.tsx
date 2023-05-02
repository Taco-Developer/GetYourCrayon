import React, { useEffect, useRef, useState } from 'react';

import tw from 'tailwind-styled-components';

import GameCenter from '../sides/GameCenter';
import GameLeftSide from '../sides/GameLeftSide';
import GameRightSide from '../sides/GameRightSide';
import Margin from '@/components/ui/Margin';

export default function Painting() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const [isPainting, setIsPainting] = useState<boolean>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const initCanvas = () => {
        // 캔버스 구역 크기
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        const dpr = window.devicePixelRatio;

        // 캔버스 크기 설정
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        const ctx = canvas.getContext('2d');
        ctx?.scale(dpr, dpr);

        return ctx;
      };
      const ctx = initCanvas();
      setCtx(ctx);
    }
  }, [canvasRef]);

  // 그리기 시작
  const startPainting = () => {
    setIsPainting(true);
    ctx?.beginPath();
  };

  // 그리기 종료
  const cancelPainting = () => {
    setIsPainting(false);
    ctx?.closePath();
  };

  // 캔버스 내에서 마우스 이동
  const onMove = ({ nativeEvent }: React.MouseEvent) => {
    const offsetX = nativeEvent.offsetX;
    const offsetY = nativeEvent.offsetY;
    if (isPainting) {
      ctx?.lineTo(offsetX, offsetY);
      ctx?.stroke();
      return;
    }
    ctx?.moveTo(offsetX, offsetY);
  };

  return (
    <>
      <GameLeftSide isPainting={true} />
      <GameCenter>
        <canvas
          className="w-full flex-auto bg-white"
          ref={canvasRef}
          onMouseDown={startPainting}
          onMouseUp={cancelPainting}
          onMouseMove={onMove}
          onMouseLeave={cancelPainting}
        ></canvas>
        <Margin type="height" size={16} />
        <CanvasOptions>
          <Option>옵션</Option>
          <Tools>도구</Tools>
        </CanvasOptions>
      </GameCenter>
      <GameRightSide isPainting={true} />
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
