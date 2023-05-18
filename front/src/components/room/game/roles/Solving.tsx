import React, { useState, useEffect, useRef, useCallback } from 'react';

import tw from 'tailwind-styled-components';

import GameLeftSide from '../sides/GameLeftSide';
import GameRightSide from '../sides/GameRightSide';
import GameCenter from '../sides/GameCenter';
import Margin, { MarginType } from '@/components/ui/Margin';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import {
  changeBgColor,
  changeBrushWidth,
  changePaletteColor,
  changeSelectedTool,
} from '@/store/slice/game/drawSlice';

import { listenEvent, removeEvent } from '@/socket/socketEvent';
import { sendMessage } from '@/socket/messageSend';
import { endRound } from '@/store/slice/game/gameRoundSlice';
import EndRoundDialog from '../dialogs/EndRoundDialog';

export default function Solving({
  isReverseGame,
  socket,
}: {
  isReverseGame: boolean;
  socket: WebSocket;
}) {
  const {
    brushWidth,
    canvasBgColor,
    paletteColor,
    INIT_BG_COLOR,
    selectedTool,
  } = useAppSelector((state) => state.draw);
  const {
    userInfo: { userIdx, userNickname },
    answers: { savedAnswers, inputedAnswers },
    gameDatas: { selectedUserIdx },
    gameUsers,
    leftTime,
    roomInfo: { adminUserIdx },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

  const [widthRatio, setWidthRatio] = useState<number>();
  const [heightRatio, setHeightRatio] = useState<number>();

  const [prevArray, setPrevArray] = useState<ImageData[]>([]);
  const [nextArray, setNextArray] = useState<ImageData[]>([]);

  const [answerInputValue, setAnswerInputValue] = useState<string>('');

  // 정답 제출
  const answerSubmitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    const answer = answerInputValue;
    const chatInputValue = {
      user: userNickname,
      status: 'answer',
      content: answer,
      userIdx,
    };
    console.log(chatInputValue);
    sendMessage(socket, 'chat', chatInputValue);
    console.log('제출');
    setAnswerInputValue('');
  };

  // 정답 입력
  const answerChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setAnswerInputValue(event.target.value);
  };

  // 그리는 사람 캔버스와 보는 사람 캔버스 비율 구하기
  const saveRatio = (width: number, height: number) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const myWidth = canvas.offsetWidth;
      const myHeight = canvas.offsetHeight;

      setWidthRatio(myWidth / width);
      setHeightRatio(myHeight / height);
    }
  };

  // 캔버스 처음 상태로 돌리기
  const clearCanvas = useCallback(() => {
    const canavs = canvasRef.current;
    if (!ctx || !canavs) return;

    ctx.fillStyle = INIT_BG_COLOR;
    ctx.clearRect(0, 0, canavs.width, canavs.height);
    ctx.fillRect(0, 0, canavs.width, canavs.height);
    ctx.fillStyle = paletteColor;
    dispatch(changeBgColor(INIT_BG_COLOR));
  }, [INIT_BG_COLOR, ctx, paletteColor, dispatch]);

  // 뒤로가기
  const goPrev = useCallback(() => {
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    setPrevArray((prev) => {
      const idx = prev.length - 1;
      const currentImageData = ctx!.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      if (idx >= 0) {
        setNextArray((next) => [...next, currentImageData]);
        const result = prev;
        const popedImage = result.pop()!;
        ctx.putImageData(popedImage, 0, 0);
        return result;
      }

      clearCanvas();
      return [];
    });
  }, [clearCanvas, ctx]);

  // 되돌리기
  const goNext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    setNextArray((next) => {
      const idx = next.length - 1;
      if (idx < 0) return [];
      const currentImageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      setPrevArray((prev) => [...prev, currentImageData]);
      const result = next;
      const popedImage = result.pop()!;
      ctx?.putImageData(popedImage, 0, 0);
      return result;
    });
  }, [ctx]);

  // 현재 그림 버리기
  const goTrashBin = useCallback(() => {
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const currentImageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    setPrevArray((prev) => [...prev, currentImageData]);
    clearCanvas();
  }, [clearCanvas, ctx]);

  // 위치 이동
  const goMove = useCallback(
    (x: number, y: number) => {
      if (!ctx || !widthRatio || !heightRatio) return;

      ctx.moveTo(x * widthRatio!, y * heightRatio!);
    },
    [ctx, widthRatio, heightRatio],
  );

  // 그리기
  const goDraw = useCallback(
    (x: number, y: number) => {
      if (!ctx || !widthRatio || !heightRatio) return;

      ctx.lineTo(x * widthRatio, y * heightRatio);
      ctx.stroke();
    },
    [ctx, widthRatio, heightRatio],
  );

  // 그리기 시작
  const startDraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.beginPath();
    const currentImageData = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    )!;
    setPrevArray((prev) => [...prev, currentImageData]);
  }, [ctx]);

  // 그리기 종료
  const cancelDraw = useCallback(() => {
    if (!ctx) return;

    ctx.closePath();
  }, [ctx]);

  // 채우기
  const fillCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    dispatch(changeBgColor(paletteColor));
  }, [ctx, dispatch, paletteColor]);

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
  }, [canvasRef]);

  // 소켓 메시지 수신
  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type !== 'draw') return;
      switch (data.action) {
        // 비율 저장
        case 'saveRatio':
          saveRatio(data.width, data.height);
          return;
        // 색 변경 적용
        case 'changeColor':
          dispatch(changePaletteColor(data.paletteColor));
          return;
        // 붓 너비 변경 적용
        case 'changeBrushWidth':
          dispatch(changeBrushWidth(data.width));
          return;
        // 도구 변경
        case 'changeTool':
          dispatch(changeSelectedTool(data.selectedTool));
          return;
        // 뒤로가기
        case 'goPrev':
          goPrev();
          return;
        // 되돌리기
        case 'goNext':
          goNext();
          return;
        // 휴지통 클릭
        case 'goTrashBin':
          goTrashBin();
          return;
        case 'clearCanvas':
          // goTrashBin();
          return;
        // 위치 이동
        case 'move':
          goMove(data.offsetX, data.offsetY);
          return;
        // 그리기 시작
        case 'startDraw':
          startDraw();
          return;
        // 그리기
        case 'drawMove':
          goDraw(data.offsetX, data.offsetY);
          return;
        // 그리기 종료
        case 'cancelDraw':
          cancelDraw();
          return;
        // 채우기
        case 'fill':
          fillCanvas();
          return;
        default:
          return;
      }
    };
    listenEvent(socket, messageHandler);

    return () => {
      removeEvent(socket, messageHandler);
    };
  }, [
    socket,
    dispatch,
    goNext,
    goPrev,
    clearCanvas,
    goTrashBin,
    cancelDraw,
    goDraw,
    goMove,
    startDraw,
    fillCanvas,
  ]);

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
  }, [ctx, selectedTool, canvasBgColor, paletteColor]);

  // 색 변경 적용
  useEffect(() => {
    if (!ctx) return;
    ctx.strokeStyle = paletteColor;
    ctx.fillStyle = paletteColor;
  }, [ctx, paletteColor]);

  // 붓 너비 변경
  useEffect(() => {
    if (!ctx) return;
    ctx.lineWidth = brushWidth;
  }, [ctx, brushWidth]);

  // 정답 비교
  useEffect(() => {
    if (savedAnswers.length === 0) return;
    if (savedAnswers.length === inputedAnswers.length) {
      clearCanvas();
      if (userIdx === adminUserIdx) sendMessage(socket, 'roundOver');
      setAnswerInputValue('');
      dispatch(endRound());
    }
  }, [
    savedAnswers,
    inputedAnswers,
    dispatch,
    socket,
    ctx,
    clearCanvas,
    userIdx,
    adminUserIdx,
  ]);

  // 시간 초과
  useEffect(() => {
    if (leftTime === 0) {
      clearCanvas();
      if (userIdx === adminUserIdx) sendMessage(socket, 'roundOver');
      setAnswerInputValue('');
      dispatch(endRound());
    }
  }, [leftTime, dispatch, socket, ctx, clearCanvas, userIdx, adminUserIdx]);

  return (
    <>
      <EndRoundDialog socket={socket} />
      <GameLeftSide isPainting={false} />
      {isReverseGame && (
        <GameCenter>
          <canvas
            className="w-full bg-white flex-auto"
            ref={canvasRef}
          ></canvas>
          <Margin type={MarginType.height} size={16} />
          <AnswerForm onSubmit={answerSubmitHandler}>
            <Input
              type="text"
              placeholder="그림에 해당하는 제시어를 입력해주세요."
              value={answerInputValue}
              onChange={answerChangeHandler}
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
            <p>
              현재
              {
                gameUsers.filter((user) => user.userIdx === selectedUserIdx)[0]
                  .userNickname
              }
              님이 그리는 중입니다.
            </p>
          </PaintingInfo>
          <Margin type={MarginType.height} size={16} />
          <canvas
            className="w-full bg-white flex-auto"
            ref={canvasRef}
          ></canvas>
          <Margin type={MarginType.height} size={16} />
          <AnswerForm onSubmit={answerSubmitHandler}>
            <Input
              type="text"
              placeholder="그림에 해당하는 제시어를 입력해주세요."
              autoFocus
              onChange={answerChangeHandler}
            />
            <Margin type={MarginType.width} size={16} />
            <Button px={4} py={2} rounded="lg" color="bg-blue-300">
              입력
            </Button>
          </AnswerForm>
        </GameCenter>
      )}
      <GameRightSide isPainting={false} socket={socket} />
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
