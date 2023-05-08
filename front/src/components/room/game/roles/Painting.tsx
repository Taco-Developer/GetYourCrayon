import React, { useEffect, useRef, useState } from 'react';

import tw from 'tailwind-styled-components';

import { Slider } from '@mui/material';

import GameCenter from '../sides/GameCenter';
import GameLeftSide from '../sides/GameLeftSide';
import GameRightSide from '../sides/GameRightSide';
import Margin from '@/components/ui/Margin';

export default function Painting() {
  const [paletteColor, setPaletteColor] = useState<string>('#000000');
  const [brushWidth, setBrushWidth] = useState<number>(4);
  const [opacityStyle, SetOpacityStyle] = useState<number>(1);

  const brushWidthList = [
    [4, 'bg-black rounded-full w-[4px] h-[4px]'],
    [6, 'bg-black rounded-full w-[6px] h-[6px]'],
    [8, 'bg-black rounded-full w-[8px] h-[8px]'],
    [10, 'bg-black rounded-full w-[10px] h-[10px]'],
    [12, 'bg-black rounded-full w-[12px] h-[12px]'],
  ];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const [isPainting, setIsPainting] = useState<boolean>();

  useEffect(() => {
    if (ctx) {
      const rgba = [];
      for (let i = 1; i < paletteColor.length; i += 2) {
        const tmp = paletteColor[i] + paletteColor[i + 1];
        rgba.push(parseInt(tmp, 16));
      }
      ctx.strokeStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${opacityStyle})`;
      ctx.fillStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${opacityStyle})`;
      // ctx.strokeStyle = paletteColor;
      // ctx.fillStyle = paletteColor;
      ctx.lineWidth = brushWidth;
    }
  }, [paletteColor, brushWidth, ctx, opacityStyle]);

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
    ctx?.save();
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
      <GameLeftSide
        isPainting={true}
        paletteColor={paletteColor}
        changeColor={(color) => {
          setPaletteColor(color);
        }}
      />
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
          <Option>
            <BrushWidthList>
              {brushWidthList.map((brush) => (
                <BrushWidthItem
                  key={brush[0]}
                  onClick={() => {
                    setBrushWidth(brush[0] as number);
                  }}
                >
                  <div className={brush[1] as string} />
                </BrushWidthItem>
              ))}
            </BrushWidthList>
            <div className="p-2 outline outline-1 rounded-lg flex justify-between items-center gap-4">
              <div className="w-[14px] h-[14px] rounded-full bg-gray-300" />
              <Slider
                min={0}
                step={0.01}
                max={1}
                value={opacityStyle}
                onChange={(_, value) => {
                  SetOpacityStyle(value as number);
                }}
                defaultValue={1}
                valueLabelDisplay="auto"
                className="w-full"
              />
              <div className="w-[14px] h-[14px] rounded-full bg-black" />
            </div>
          </Option>
          <Tools>
            <div>아이콘</div>
            <div>아이콘</div>
            <div>아이콘</div>
            <div>아이콘</div>
            <div>아이콘</div>
            <div>아이콘</div>
            <div>아이콘</div>
            <div>아이콘</div>
          </Tools>
        </CanvasOptions>
      </GameCenter>
      <GameRightSide isPainting={true} />
    </>
  );
}

const CanvasOptions = tw.div`
  w-full

  bg-[#88CDFF]
  rounded-lg

  p-4

  flex
  justify-between
`;

const Option = tw.div`
  min-w-[240px]
  w-2/5
  h-full

  bg-white
  rounded-lg

  p-2

  flex
  flex-col
  justify-between
  gap-2
`;

const BrushWidthList = tw.div`
  p-2

  outline
  outline-1
  rounded-lg

  flex
  justify-between
  items-center
`;

const BrushWidthItem = tw.div`
  w-[32px]
  h-[32px]

  bg-gray-300
  rounded-full

  flex
  justify-center
  items-center
`;

const Tools = tw.div`
  min-w-[240px]
  w-2/5
  h-full

  bg-white
  rounded-lg

  p-2

  grid
  grid-rows-2
  grid-cols-4
  gap-2
`;
