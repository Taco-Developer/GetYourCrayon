import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import router, { useRouter } from 'next/router';

import axios from 'axios';
import { gameAPI } from '@/api/api';
import Ready from '@/components/room/ready/Ready';
import InGameRoom from '@/components/room/game/InGameRoom';
import GameResult from '@/components/room/result/GameResult';
import { useAppDispatch } from '@/store/thunkhook';
import { setRoomIdx } from '@/store/slice/game/gameRoom';
import type { GetServerSideProps } from 'next';
import wrapper from '@/store';
import { useAppSelector } from '@/store/thunkhook';
import { setLogin } from '@/store/slice/loginSlice';
import { setUser } from '@/store/slice/userSlice';
import { changeStatus } from '@/store/slice/game/roomStatusSlice';
import { listenEvent, removeEvent } from '@/socket/socketEvent';
import { resetRound } from '@/store/slice/game/gameRoundSlice';
import Loading from '@/components/ui/Loading';

export default function Room({
  roomIdx,
  message,
}: {
  message: string;
  roomIdx: string;
}) {
  const router = useRouter();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const roomStatus = useAppSelector((state) => state.roomStatus);
  const { gameCategory } = useAppSelector((state) => state.roomInfo);
  const { roomInfo } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (message === 'getOut') {
      router.push('/');
    } else if (message === 'notLogin') {
      console.log('로그인해라');
      router.push('/');
    }
  });

  useEffect(() => {
    if (!socket) {
      dispatch(setRoomIdx({ roomIdx }));
      if (roomInfo.roomMax < roomInfo.roomNow) {
        console.log('방빼');
        router.push('/');
      }
    }
  }, [dispatch, socket, roomIdx]);

  useEffect(() => {
    if (!socket) return;

    const gameAlertHandler = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type !== 'gameAlert') return;
      if (data.status === 'gameEnd') dispatch(resetRound());
      dispatch(changeStatus(data.status));
    };

    listenEvent(socket, gameAlertHandler);

    return () => {
      removeEvent(socket, gameAlertHandler);
    };
  }, [socket, dispatch]);

  switch (roomStatus) {
    case 'ready':
      return <Ready socket={socket} setSocket={setSocket} />;
    case 'gameStart':
      return <InGameRoom game={gameCategory!} socket={socket as WebSocket} />;
    case 'gameEnd':
      return <GameResult socket={socket as WebSocket} />;
    default:
      return <Loading />;
  }
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context: any) => {
    const { req, res } = context;
    let refreshtoken = getCookie('refreshtoken', { req, res });
    let accesstoken = getCookie('accesstoken', { req, res });
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Authorization: accesstoken,
        'Content-Type': 'application/json',
        Cookie: `refreshtoken=` + refreshtoken,
      },
    });
    try {
      const one = await api.get(`/room/${context.params?.roomIdx}`);
      const two = one.data;
      console.log('==========>', two);
      if (two.roomMax === two.roomNow) {
        return {
          props: {
            message: 'getOut',
            roomIdx: '',
          },
        };
      } else {
        const re = await api.get(`/member/myinfo`);
        const res = re.data;
        store.dispatch(setLogin({ isLogin: true }));
        store.dispatch(setUser(res));
        return {
          props: {
            message: 'Login',
            roomIdx: context.params?.roomIdx || 'noRoom',
          },
        };
      }
    } catch (e) {
      console.log(e);
      return {
        props: {
          message: 'notLogin',
          roomIdx: '',
        },
      };
    } finally {
      api.defaults.headers.Cookie = '';
    }
  });
