import React, { useState, useEffect } from 'react';
import UserList from './user/UserList';
import ModeChoice from './more/ModeChoice';
import Setting from './more/Setting';
import Chat from './more/Chat';
import ReadyBtn from './more/ReadyBtn';
import tw from 'tailwind-styled-components';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';
import { setUser } from '@/store/slice/userSlice';
import { getCookie } from 'cookies-next';

interface RoomPropsType {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  client: W3CWebSocket | null;
  setClient: React.Dispatch<React.SetStateAction<W3CWebSocket | null>>;
}

interface MessageType {
  author: string;
  message: string;
}

export default function Ready({
  userId,
  setUserId,
  room,
  setRoom,
  setStatus,
  client,
  setClient,
}: RoomPropsType) {
  const dispatch = useAppDispatch();

  /** 유저 닉네임 */
  const { userNickname } = useAppSelector((state) => state.userInfo);
  /** 유저가 생성한 방 */
  const { roomIdx } = useAppSelector((state) => state.roomIdx);

  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [choice, setChoice] = useState<number>(1);
  // 게시물 번호
  const [boardId, setBoardId] = useState<number | null>(null);

  const closeSocket = () => {
    if (client) {
      client.close();
    }
  };

  useEffect(() => {
    if (roomIdx !== null) {
      const newClient = new W3CWebSocket(
        `wss://getyourcrayon.co.kr/api/${roomIdx}`,
      );
      setClient(newClient);
    }
  }, [roomIdx, setClient]);

  useEffect(() => {
    /** 토큰 */
    const token = getCookie('accesstoken');
    if (client) {
      client.onopen = () => {
        client.send(
          JSON.stringify({
            type: 'userIn',
            authorization: token,
          }),
        );
        client.send(
          JSON.stringify({
            type: 'chat',
            author: 'admin',
            message: `${userNickname}님이 입장하셨습니다 :)`,
          }),
        );
      };
      client.onmessage = (message) => {
        if (
          typeof message.data === 'string' &&
          JSON.parse(message.data).type === 'chat'
        ) {
          const data = JSON.parse(message.data);
          setMessageList((prevMessages) => [...prevMessages, data]);
        }
      };
    }
  }, [client, userNickname]);

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
              <Chat
                client={client}
                userId={userId}
                room={room}
                messageList={messageList}
              />
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
