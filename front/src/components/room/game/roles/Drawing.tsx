import React, { useEffect, useRef, useState } from 'react';

import GameCenter from '../sides/GameCenter';
import GameLeftSide from '../sides/GameLeftSide';
import GameRightSide from '../sides/GameRightSide';
import Margin, { MarginType } from '@/components/ui/Margin';

import { useAppDispatch, useAppSelector } from '@/store/thunkhook';

import {
  changeBgColor,
  changePaletteColor,
} from '@/store/slice/game/drawSlice';
import { sendMessage } from '@/socket/messageSend';
import CanvasOptions from './drawing/CanvasOptions';
import EndRoundDialog from '../dialogs/EndRoundDialog';

const BRUSH_WIDTH_LIST = [
  [4, 'bg-black rounded-full w-[4px] h-[4px]'],
  [8, 'bg-black rounded-full w-[8px] h-[8px]'],
  [12, 'bg-black rounded-full w-[12px] h-[12px]'],
  [16, 'bg-black rounded-full w-[16px] h-[16px]'],
  [24, 'bg-black rounded-full w-[24px] h-[24px]'],
];

export default function Drawing({ socket }: { socket: WebSocket }) {
  const {
    brushWidth,
    canvasBgColor,
    paletteColor,
    INIT_BG_COLOR,
    selectedTool,
  } = useAppSelector((state) => state.draw);
  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

  const [prevArray, setPrevArray] = useState<ImageData[]>([]);
  const [nextArray, setNextArray] = useState<ImageData[]>([]);

  const [isDrawing, setIsDrawing] = useState<boolean>();

  // 현재 touch 위치 찾기
  const getTouchPosition = (event: React.TouchEvent) => {
    const canvas = canvasRef.current;
    return {
      offsetX: event.nativeEvent.touches[0].clientX - canvas!.offsetLeft,
      offsetY: event.nativeEvent.touches[0].clientY - canvas!.offsetTop,
    };
  };

  // 그리기 및 채우기
  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    if (selectedTool !== 'fill') {
      setIsDrawing(true);
      if (ctx) {
        ctx.beginPath();
        setPrevArray((prev) => [
          ...prev,
          ctx.getImageData(
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height,
          ),
        ]);
      }
      sendMessage(socket, 'draw', { action: 'startDraw' });
      // 터치 위치 이동
      if (event.type === 'touchstart') {
        const { offsetX, offsetY } = getTouchPosition(
          event as React.TouchEvent,
        );
        ctx?.moveTo(offsetX, offsetY);
        sendMessage(socket, 'draw', { action: 'move', offsetX, offsetY });
      }
      return;
    }
    // 채우기
    if (selectedTool === 'fill') {
      const canvas = canvasRef.current;
      if (!ctx || !canvas) return;

      ctx.beginPath();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      dispatch(changeBgColor(paletteColor));
      sendMessage(socket, 'draw', { action: 'fill' });
    }
  };

  // 그리기 종료
  const cancelDrawing = () => {
    setIsDrawing(false);
    ctx?.closePath();
    sendMessage(socket, 'draw', { action: 'cancelDraw' });
  };

  // 마우스 이동 or 그리기
  const moveHandler = (event: React.MouseEvent | React.TouchEvent) => {
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
      sendMessage(socket, 'draw', { action: 'drawMove', offsetX, offsetY });
      return;
    }
    ctx?.moveTo(offsetX, offsetY);
    sendMessage(socket, 'draw', { action: 'move', offsetX, offsetY });
  };

  // 캔버스 초기화
  const clearCanvas = () => {
    const canavs = canvasRef.current;
    if (!ctx || !canavs) return;

    ctx.fillStyle = INIT_BG_COLOR;
    ctx.clearRect(0, 0, canavs.width, canavs.height);
    ctx.fillRect(0, 0, canavs.width, canavs.height);
    ctx.fillStyle = paletteColor;
    dispatch(changeBgColor(INIT_BG_COLOR));
  };

  // 뒤로 가기 클릭
  const prevClickHandler = () => {
    setPrevArray((prev) => {
      const idx = prev.length - 1;
      const currentImageData = ctx!.getImageData(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height,
      );

      if (idx >= 0) {
        setNextArray((next) => [...next, currentImageData]);
        const result = prev;
        const popedImage = result.pop()!;
        ctx?.putImageData(popedImage, 0, 0);
        sendMessage(socket, 'draw', { action: 'goPrev' });
        return result;
      }

      clearCanvas();
      sendMessage(socket, 'draw', { action: 'clearCanvas' });
      return [];
    });
  };

  // 되돌리기 클릭
  const nextClickHandler = () => {
    setNextArray((next) => {
      const idx = next.length - 1;
      if (idx < 0) return [];
      const currentImageData = ctx!.getImageData(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height,
      );
      setPrevArray((prev) => [...prev, currentImageData]);
      const result = next;
      const popedImage = result.pop()!;
      ctx?.putImageData(popedImage, 0, 0);
      sendMessage(socket, 'draw', { action: 'goNext' });
      return result;
    });
  };

  // 휴지통 클릭
  const trashBinClickHandler = () => {
    const currentImageData = ctx!.getImageData(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height,
    );
    setPrevArray((prev) => [...prev, currentImageData]);
    clearCanvas();
    sendMessage(socket, 'draw', { action: 'goTrashBin' });
  };

  // 캔버스 초기 설정
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 캔버스 자체 크기와 CSS 크기 맞추기
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const dpr = window.devicePixelRatio;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    context!.scale(dpr, dpr);
    setCtx(context);

    sendMessage(socket, 'draw', { action: 'saveRatio', width, height });
  }, [canvasRef, socket]);

  // 붓 너비 변경
  useEffect(() => {
    if (!ctx) return;
    ctx.lineWidth = brushWidth;
    sendMessage(socket, 'draw', {
      action: 'changeBrushWidth',
      width: brushWidth,
    });
  }, [ctx, brushWidth, socket]);

  // 색 변경
  useEffect(() => {
    if (!ctx) return;
    ctx.strokeStyle = paletteColor;
    ctx.fillStyle = paletteColor;
    sendMessage(socket, 'draw', { action: 'changeColor', paletteColor });
  }, [ctx, paletteColor, socket]);

  // 도구 변경
  useEffect(() => {
    if (!ctx) return;

    switch (selectedTool) {
      case 'erase':
        ctx.fillStyle = canvasBgColor;
        ctx.strokeStyle = canvasBgColor;
        break;
      default:
        ctx.strokeStyle = paletteColor;
        ctx.fillStyle = paletteColor;
        break;
    }
    sendMessage(socket, 'draw', { action: 'changeTool', selectedTool });
  }, [selectedTool, ctx, paletteColor, canvasBgColor, socket]);

  return (
    <>
      <EndRoundDialog socket={socket} />
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
          onMouseDown={startDrawing}
          onTouchStart={startDrawing}
          onTouchMove={moveHandler}
          onMouseUp={cancelDrawing}
          onMouseMove={moveHandler}
          onMouseLeave={cancelDrawing}
        ></canvas>
        <Margin type={MarginType.height} size={16} />
        <CanvasOptions
          nextClickHandler={nextClickHandler}
          prevClickHandler={prevClickHandler}
          trashBinClickHandler={trashBinClickHandler}
        />
      </GameCenter>
      <GameRightSide isPainting={true} socket={socket} />
    </>
  );
}
