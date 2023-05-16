import React, { useState, useEffect } from 'react';
import UserList from './user/UserList';
import ModeChoice from './more/ModeChoice';
import Setting from './more/Setting';
import Chat from './more/Chat';
import ReadyBtn from './more/ReadyBtn';
import tw from 'tailwind-styled-components';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import { setUser } from '@/store/slice/userSlice';
import { getCookie } from 'cookies-next';
import { sendMessage } from '@/socket/messageSend';
import { listenEvent, removeEvent } from '@/socket/socketEvent';

interface RoomPropsType {
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  socket: WebSocket | null;
  setSocket: React.Dispatch<React.SetStateAction<WebSocket | null>>;
}

interface MessageType {
  author: string;
  message: string;
}

export default function Ready({
  room,
  setRoom,
  setStatus,
  socket,
  setSocket,
}: RoomPropsType) {
  /** 유저 정보 */
  const { profile } = useAppSelector((state) => state.mypageInfo);
  /** 유저가 생성한 방 */
  const { roomIdx } = useAppSelector((state) => state.roomIdx);

  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [choice, setChoice] = useState<number>(2);
  // 게시물 번호
  const [boardId, setBoardId] = useState<number | null>(null);

  const closeSocket = () => {
    if (socket) {
      socket.close();
    }
  };

  useEffect(() => {
    if (roomIdx !== null) {
      const newSocket = new WebSocket(
        `wss://getyourcrayon.co.kr/api/${roomIdx}`,
      );
      setSocket(newSocket);
    }
  }, [roomIdx, setSocket]);

  useEffect(() => {
    /** 토큰 */
    const token = getCookie('accesstoken');
    if (socket) {
      socket.onopen = () => {
        sendMessage(socket, 'userIn', { authorization: token });
        sendMessage(socket, 'chat', {
          author: 'admin',
          message: `${profile.userNickname}님이 입장하셨습니다 :)`,
        });
      };

      const messageHandler = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        if (data.type !== 'chat') return;
        setMessageList((prev) => [...prev, data]);
      };
      listenEvent(socket, messageHandler);

      return () => {
        removeEvent(socket, messageHandler);
      };
    }
  }, [profile.userNickname, socket]);

  return (
    <RoomBody>
      <UserDiv>
        <UserList />
      </UserDiv>
      <MoreDiv>
        <PickDiv>
          <PickMenu>
            <SetBtn
              className={choice === 1 ? 'h-full text-4xl mr-2' : ''}
              onClick={() => {
                setChoice(1);
              }}
            >
              모드
            </SetBtn>
            <SetBtn
              className={choice === 2 ? 'h-full text-4xl ml-2' : ''}
              onClick={() => {
                setChoice(2);
              }}
            >
              채팅
            </SetBtn>
          </PickMenu>
          <PickContent>
            {choice === 1 ? (
              <SettingDiv>
                <ModeChoice />
                <Setting />
              </SettingDiv>
            ) : (
              <Chat socket={socket} room={room} messageList={messageList} />
            )}
          </PickContent>
        </PickDiv>
        <BtnDiv>
          <ReadyBtn
            boardId={boardId}
            setBoardId={setBoardId}
            setStatus={setStatus}
            closeSocket={closeSocket}
          />
        </BtnDiv>
      </MoreDiv>
    </RoomBody>
  );
}

const RoomBody = tw.div`w-screen h-screen flex items-center justify-center`;
const UserDiv = tw.div`w-1/4 xl:w-1/4 h-4/5 ml-5 xl:mx-0 rounded-l-2xl flex items-center justify-center`;
const MoreDiv = tw.div`w-3/4 xl:w-2/4 h-4/5 mr-5 xl:mx-0 rounded-r-2xl  flex flex-col items-center justify-between`;
const PickDiv = tw.div`h-80 w-90`;
const PickMenu = tw.div`h-10 flex flex-row `;
const PickContent = tw.div`h-full bg-white bg-opacity-50 rounded-b-xl flex items-center justify-center`;
const SettingDiv = tw.div`h-full w-full flex flex-col items-center justify-center p-4`;
const SetBtn = tw.div`h-90 w-50 text-2xl rounded-t-2xl text-white flex items-center justify-center bg-white bg-opacity-50`;
const BtnDiv = tw.div`h-10 w-90 flex items-center justify-center`;
