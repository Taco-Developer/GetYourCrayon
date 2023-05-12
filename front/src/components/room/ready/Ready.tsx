import React, { useState, useEffect } from 'react';
import InRoom from './InRoom';
import UserList from './user/UserList';
import ModeChoice from './more/ModeChoice';
import Setting from './more/Setting';
import Chat from './more/Chat';
import ReadyBtn from './more/ReadyBtn';
import tw from 'tailwind-styled-components';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

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
  const [finalroom, setFinalRoom] = useState<string>('');
  // const [client, setClient] = useState<W3CWebSocket | null>(null);
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [choice, setChoice] = useState<number>(1);
  const [showChat, setShowChat] = useState<string>('ready');
  // 게시물 번호
  const [boardId, setBoardId] = useState<number | null>(null);

  const closeSocket = () => {
    if (client) {
      client.close();
    }
  };

  useEffect(() => {
    if (finalroom !== '') {
      const newClient = new W3CWebSocket(
        `wss://getyourcrayon.co.kr/api/${finalroom}`,
      );
      setClient(newClient);
    }
  }, [finalroom]);

  useEffect(() => {
    if (client) {
      client.onopen = () => {
        client.send(
          JSON.stringify({
            type: 'userIn',
            author: userId,
          }),
        );
        client.send(
          JSON.stringify({
            type: 'chat',
            author: 'admin',
            message: `${userId}님이 입장하셨습니다 :)`,
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
      client.onclose = () => {
        console.log('소켓이 끊겼습니다');
      };
    }
  }, [client]);

  switch (showChat) {
    case 'ready':
      return (
        <div>
          <h1>닉네임, 방번호 입력 페이지(임시)</h1>
          <InRoom
            userId={userId}
            setUserId={setUserId}
            room={room}
            setRoom={setRoom}
            setShowChat={setShowChat}
            setFinalRoom={setFinalRoom}
          />
        </div>
      );
      break;
    case 'readyRoom':
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
    default:
      return <div>예외입니다.</div>;
  }
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
