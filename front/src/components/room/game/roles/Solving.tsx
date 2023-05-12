import React, { useState, useEffect, useRef } from 'react';

import { w3cwebsocket as W3CWebSocket } from 'websocket';

import tw from 'tailwind-styled-components';

import GameLeftSide from '../sides/GameLeftSide';
import GameRightSide from '../sides/GameRightSide';
import GameCenter from '../sides/GameCenter';
import Margin, { MarginType } from '@/components/ui/Margin';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Solving({
  isReverseGame,
  client,
}: {
  isReverseGame: boolean;
  client: W3CWebSocket;
}) {
  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const [widthRatio, setWidthRatio] = useState<number>();
  const [heightRatio, setHeightRatio] = useState<number>();

  const saveRatio = (width: number, height: number) => {
    console.log(width, height);
  };

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

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx?.scale(dpr, dpr);

        return ctx;
      };
      const ctx = initCanvas();
      setCtx(ctx);
    }
  }, [canvasRef]);

  useEffect(() => {
    client.onmessage = (message) => {
      if (typeof message.data !== 'string') return;
      const data = JSON.parse(message.data);
      if (data.type !== 'draw') return;
      if (data.action === 'saveRatio') {
        console.log('saveRatio');
        saveRatio(data.width, data.height);
        return;
      }
      if (data.action === 'changeColorOpacity') {
        console.log('changeColorOpacity');
        return;
      }
      if (data.action === 'changeBrushWidth') {
        console.log('changeBrushWidth');
        return;
      }
      if (data.action === 'goPrev') {
        console.log('goPrev');
        return;
      }
      if (data.action === 'goNext') {
        console.log('goNext');
        return;
      }
      if (data.action === 'clearCanvas') {
        console.log('clearCanvas');
        return;
      }
    };
    return () => {};
  }, [client]);

  return (
    <>
      <GameLeftSide isPainting={false} />
      {isReverseGame && (
        <GameCenter>
          <canvas
            className="w-full bg-white flex-auto"
            ref={canvasRef}
          ></canvas>
          <Margin type={MarginType.height} size={16} />
          <AnswerForm onSubmit={submitHandler}>
            <Input
              type="text"
              placeholder="그림에 해당하는 제시어를 입력해주세요."
            />
            <Margin type={MarginType.width} size={16} />
            <Button px={4} py={2} rounded="lg" color="bg-blue-300">
              입력
            </Button>
          </AnswerForm>
        </GameCenter>
      )}
      {!isReverseGame && (
        <GameCenter>
          <PaintingInfo>
            <p>현재 참가자5님이 그리는 중입니다.</p>
          </PaintingInfo>
          <Margin type={MarginType.height} size={16} />
          <canvas
            className="w-full bg-white flex-auto"
            ref={canvasRef}
          ></canvas>
          <Margin type={MarginType.height} size={16} />
          <AnswerForm onSubmit={submitHandler}>
            <Input
              type="text"
              placeholder="그림에 해당하는 제시어를 입력해주세요."
            />
            <Margin type={MarginType.width} size={16} />
            <Button px={4} py={2} rounded="lg" color="bg-blue-300">
              입력
            </Button>
          </AnswerForm>
        </GameCenter>
      )}
      <GameRightSide isPainting={false} />
    </>
  );
}

const AnswerForm = tw.form`
    w-full
    bg-white

    rounded-lg

    py-4
    px-8

    flex
    items-center
`;

const PaintingInfo = tw.div`
  w-full

  rounded-lg

  py-2
  px-8
  
  bg-white
`;
