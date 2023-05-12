import React, { useEffect, useRef, useState, useCallback } from 'react';

import { w3cwebsocket as W3CWebSocket } from 'websocket';

import tw from 'tailwind-styled-components';

import { Slider } from '@mui/material';

import GameCenter from '../sides/GameCenter';
import GameLeftSide from '../sides/GameLeftSide';
import GameRightSide from '../sides/GameRightSide';
import Margin, { MarginType } from '@/components/ui/Margin';

// Icons
import BrushIcon from '../../../../../public/icons/brush.svg';
import EraserIcon from '../../../../../public/icons/eraser.svg';
import NextIcon from '../../../../../public/icons/next.svg';
import PaintBucketIcon from '../../../../../public/icons/paint-bucket.svg';
import ReturnIcon from '../../../../../public/icons/return.svg';
import RecycleBinIcon from '../../../../../public/icons/recycle-bin.svg';
import CircleIcon from '../../../../../public/icons/circle.svg';
import SquareIcon from '../../../../../public/icons/square.svg';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import {
  addNextArray,
  addPrevArray,
  changeBgColor,
  changeBrushWidth,
  changeOpacityStyle,
  changePaletteColor,
  popNextArray,
  popPrevArray,
} from '@/store/slice/game/drawSlice';

const INIT_BG_COLOR = '#FFFFFF';
const BRUSH_WIDTH_LIST = [
  [4, 'bg-black rounded-full w-[4px] h-[4px]'],
  [8, 'bg-black rounded-full w-[8px] h-[8px]'],
  [12, 'bg-black rounded-full w-[12px] h-[12px]'],
  [16, 'bg-black rounded-full w-[16px] h-[16px]'],
  [24, 'bg-black rounded-full w-[24px] h-[24px]'],
];

const TYPE = 'draw';

export default function Drawing({ client }: { client: W3CWebSocket }) {
  const {
    brushWidth,
    canvasBgColor,
    nextArray,
    opacityStyle,
    paletteColor,
    prevArray,
  } = useAppSelector((state) => state.draw);
  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

  const [isDrawing, setIsDrawing] = useState<boolean>();
  const [selectedTool, setSelectedTool] = useState<string>('brush');

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
      setIsDrawing(true);
      if (ctx) {
        ctx.beginPath();
        dispatch(
          addPrevArray(
            ctx.getImageData(
              0,
              0,
              canvasRef.current!.width,
              canvasRef.current!.height,
            ),
          ),
        );
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
      dispatch(changeBgColor(paletteColor));
    }
  };

  // 그리기 종료
  const cancelPainting = () => {
    setIsDrawing(false);
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

    if (isDrawing) {
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
    const message = {
      type: TYPE,
      action: 'goPrev',
    };
    client.send(JSON.stringify(message));

    const idx = prevArray.length - 1;
    const currentImageData = ctx!.getImageData(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height,
    );

    if (idx >= 0) {
      dispatch(addNextArray(currentImageData));
      const popedImage = prevArray[idx];
      ctx?.putImageData(popedImage, 0, 0);
      dispatch(popPrevArray());
      return;
    }

    clearCanvas();
  };

  // 앞으로 가기 클릭
  const onNextIconClickHandler = () => {
    const message = {
      type: TYPE,
      action: 'goNext',
    };
    client.send(JSON.stringify(message));

    const idx = nextArray.length - 1;
    if (idx < 0) return;
    const currentImageData = ctx!.getImageData(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height,
    );
    dispatch(addPrevArray(currentImageData));
    const popedImage = nextArray[idx];
    ctx?.putImageData(popedImage, 0, 0);
    dispatch(popNextArray());
  };

  // 휴지통 클릭
  const onTrashBinClickHandler = () => {
    const message = {
      type: TYPE,
      action: 'clearCanvas',
    };
    client.send(JSON.stringify(message));

    const currentImageData = ctx!.getImageData(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height,
    );
    dispatch(addPrevArray(currentImageData));
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

  // 선택된 색, 투명도 적용
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
      const message = {
        type: TYPE,
        action: 'changeColorOpacity',
        paletteColor,
        opacityStyle,
      };
      client.send(JSON.stringify(message));
    }
  }, [paletteColor, ctx, opacityStyle, client]);

  // 캔버스 초기 설정
  useEffect(() => {
    const canvas = canvasRef.current;
    // window.addEventListener('resize', () => {
    //   onResizeHandler();
    // });
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

        const message = {
          type: TYPE,
          action: 'saveRatio',
          width,
          height,
        };
        client.send(JSON.stringify(message));

        return ctx;
      };
      const ctx = initCanvas();
      setCtx(ctx);
    }
    return () => {
      // window.removeEventListener('resize', () => {
      //   onResizeHandler();
      // });
    };
  }, [canvasRef, onResizeHandler, client]);

  return (
    <>
      <GameLeftSide
        isPainting={true}
        paletteColor={paletteColor}
        changeColor={(color) => {
          dispatch(changePaletteColor(color));
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
        <Margin type={MarginType.height} size={16} />
        <CanvasOptions>
          <Option>
            <BrushWidthList>
              {BRUSH_WIDTH_LIST.map((brush) => (
                <BrushWidthItem
                  key={brush[0]}
                  onClick={() => {
                    const message = {
                      type: TYPE,
                      action: 'changeBrushWidth',
                      width: brush[0] as number,
                    };
                    client.send(JSON.stringify(message));
                    dispatch(changeBrushWidth(brush[0] as number));
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
                  dispatch(changeOpacityStyle(value as number));
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
  grid-cols-3
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
