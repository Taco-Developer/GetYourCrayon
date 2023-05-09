import React, { useEffect, useRef, useState, useCallback } from 'react';

import tw from 'tailwind-styled-components';

import { Slider } from '@mui/material';

import GameCenter from '../sides/GameCenter';
import GameLeftSide from '../sides/GameLeftSide';
import GameRightSide from '../sides/GameRightSide';
import Margin from '@/components/ui/Margin';

// Icons
import BrushIcon from '../../../../../public/icons/brush.svg';
import CircleIcon from '../../../../../public/icons/circle.svg';
import EraserIcon from '../../../../../public/icons/eraser.svg';
import NextIcon from '../../../../../public/icons/next.svg';
import PaintBucketIcon from '../../../../../public/icons/paint-bucket.svg';
import ReturnIcon from '../../../../../public/icons/return.svg';
import SquareIcon from '../../../../../public/icons/square.svg';
import RecycleBinIcon from '../../../../../public/icons/recycle-bin.svg';

export default function Painting() {
  const INIT_BG_COLOR = '#FFFFFF';
  const [paletteColor, setPaletteColor] = useState<string>('#000000');
  const [canvasBgColor, setCanvasBgColor] = useState<string>(INIT_BG_COLOR);
  const [brushWidth, setBrushWidth] = useState<number>(4);
  const [opacityStyle, setOpacityStyle] = useState<number>(1);
  const [restoreArray, setRestoreArray] = useState<ImageData[]>([]);
  const [nextArray, setNextArray] = useState<ImageData[]>([]);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const [isPainting, setIsPainting] = useState<boolean>();
  const [selectedTool, setSelectedTool] = useState<string>('brush');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const brushWidthList = [
    [4, 'bg-black rounded-full w-[4px] h-[4px]'],
    [8, 'bg-black rounded-full w-[8px] h-[8px]'],
    [12, 'bg-black rounded-full w-[12px] h-[12px]'],
    [16, 'bg-black rounded-full w-[16px] h-[16px]'],
    [24, 'bg-black rounded-full w-[24px] h-[24px]'],
  ];

  // 현재 touch 위치 찾기
  const getTouchPosition = (event: React.TouchEvent) => {
    const canvas = canvasRef.current;
    return {
      offsetX: event.nativeEvent.touches[0].clientX - canvas!.offsetLeft,
      offsetY: event.nativeEvent.touches[0].clientY - canvas!.offsetTop,
    };
  };

  // 그리기 및 채우기
  const startPainting = (event: React.MouseEvent | React.TouchEvent) => {
    if (selectedTool !== 'fill') {
      setIsPainting(true);
      if (ctx) {
        ctx.beginPath();
        setRestoreArray((prev) => [
          ...prev,
          ctx.getImageData(
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height,
          ),
        ]);
      }
      // 터치 위치 이동
      if (event.type === 'touchstart') {
        const { offsetX, offsetY } = getTouchPosition(
          event as React.TouchEvent,
        );
        ctx?.moveTo(offsetX, offsetY);
      }
      return;
    }
    // 채우기
    if (selectedTool === 'fill') {
      const canvas = canvasRef.current;
      ctx?.beginPath();
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx?.closePath();
      setCanvasBgColor(paletteColor);
    }
  };

  // 그리기 종료
  const cancelPainting = () => {
    setIsPainting(false);
    ctx?.closePath();
  };

  // 마우스 이동 or 그리기
  const onMoveHandler = (event: React.MouseEvent | React.TouchEvent) => {
    let nativeEvent;
    let offsetX;
    let offsetY;

    if (event.type === 'mousemove') {
      nativeEvent = event.nativeEvent as MouseEvent;
      offsetX = nativeEvent.offsetX;
      offsetY = nativeEvent.offsetY;
    } else {
      nativeEvent = event.nativeEvent as TouchEvent;
      offsetX = nativeEvent.touches[0].clientX - canvasRef.current!.offsetLeft;
      offsetY = nativeEvent.touches[0].clientY - canvasRef.current!.offsetTop;
    }

    if (isPainting) {
      ctx?.lineTo(offsetX, offsetY);
      ctx?.stroke();
      return;
    }
    ctx?.moveTo(offsetX, offsetY);
  };

  // 캔버스 초기화
  const clearCanvas = () => {
    if (ctx) {
      ctx.fillStyle = INIT_BG_COLOR;
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      ctx.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    }
  };

  // 뒤로 가기 클릭
  const onReturnIconClickHandler = () => {
    setRestoreArray((restorePrev) => {
      const idx = restorePrev.length - 1;
      const currentImageData = ctx!.getImageData(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height,
      );

      if (idx >= 0) {
        setNextArray((prev) => [...prev, currentImageData]);
        const result = restorePrev;
        const popedImage = result.pop()!;
        ctx?.putImageData(popedImage, 0, 0);
        return result;
      }

      clearCanvas();
      return [];
    });
  };

  // 앞으로 가기 클릭
  const onNextIconClickHandler = () => {
    setNextArray((prev) => {
      if (prev.length === 0) return prev;
      const currentImageData = ctx!.getImageData(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height,
      );
      setRestoreArray((prev) => [...prev, currentImageData]);
      const result = [...prev];
      const popedImage = result.pop();
      ctx?.putImageData(popedImage!, 0, 0);
      return result;
    });
  };

  // 휴지통 클릭
  const onTrashBinClickHandler = () => {
    const currentImageData = ctx!.getImageData(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height,
    );
    setRestoreArray((prev) => [...prev, currentImageData]);
    clearCanvas();
  };

  const onResizeHandler = useCallback(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const dpr = window.devicePixelRatio;

      // 캔버스 크기 설정
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx?.scale(dpr, dpr);
    }
  }, [ctx]);

  // 선택된 색, 붓 크기, 투명도 적용
  useEffect(() => {
    if (ctx) {
      setSelectedTool('brush');
      const rgba = [];
      for (let i = 1; i < paletteColor.length; i += 2) {
        const tmp = paletteColor[i] + paletteColor[i + 1];
        rgba.push(parseInt(tmp, 16));
      }
      ctx.strokeStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${opacityStyle})`;
      ctx.fillStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${opacityStyle})`;
    }
  }, [paletteColor, ctx, opacityStyle]);

  // 캔버스 초기 설정
  useEffect(() => {
    const canvas = canvasRef.current;
    window.addEventListener('resize', () => {
      onResizeHandler();
    });
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
    return () => {
      window.removeEventListener('resize', () => {
        onResizeHandler();
      });
    };
  }, [canvasRef, onResizeHandler]);

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
          onTouchStart={startPainting}
          onTouchMove={onMoveHandler}
          onMouseUp={cancelPainting}
          onMouseMove={onMoveHandler}
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
                    ctx!.lineWidth = brush[0] as number;
                  }}
                  className={brushWidth === brush[0] ? 'bg-[#146C94]' : ''}
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
                  setOpacityStyle(value as number);
                }}
                defaultValue={1}
                valueLabelDisplay="auto"
                className="w-full"
              />
              <div className="w-[14px] h-[14px] rounded-full bg-black" />
            </div>
          </Option>
          <Tools>
            <ToolItem
              onClick={() => {
                setSelectedTool('brush');
                ctx!.fillStyle = paletteColor;
                ctx!.strokeStyle = paletteColor;
              }}
              className={selectedTool === 'brush' ? 'bg-[#146C94]' : ''}
            >
              <BrushIcon
                width={32}
                height={32}
                fill={selectedTool === 'brush' ? '#FFFFFF' : '#000000'}
              />
            </ToolItem>
            <ToolItem
              onClick={() => {
                setSelectedTool('erase');
                ctx!.fillStyle = canvasBgColor;
                ctx!.strokeStyle = canvasBgColor;
              }}
              className={selectedTool === 'erase' ? 'bg-[#146C94]' : ''}
            >
              <EraserIcon
                width={32}
                height={32}
                fill={selectedTool === 'erase' ? '#FFFFFF' : '#000000'}
              />
            </ToolItem>
            <ToolItem
              onClick={() => {
                setSelectedTool('fill');
                ctx!.fillStyle = paletteColor;
                ctx!.strokeStyle = paletteColor;
              }}
              className={selectedTool === 'fill' ? 'bg-[#146C94]' : ''}
            >
              <PaintBucketIcon
                width={32}
                height={32}
                fill={selectedTool === 'fill' ? '#FFFFFF' : '#000000'}
              />
            </ToolItem>
            <ToolItem>
              <CircleIcon width={32} height={32} />
            </ToolItem>
            <ToolItem>
              <SquareIcon width={32} height={32} />
            </ToolItem>
            <ToolItem onClick={onReturnIconClickHandler}>
              <ReturnIcon width={32} height={32} />
            </ToolItem>
            <ToolItem onClick={onNextIconClickHandler}>
              <NextIcon width={32} height={32} />
            </ToolItem>
            <ToolItem onClick={onTrashBinClickHandler}>
              <RecycleBinIcon width={32} height={32} />
            </ToolItem>
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

const ToolItem = tw.div`
  flex
  justify-center
  items-center

  rounded-lg
  outline
  outline-1
`;
