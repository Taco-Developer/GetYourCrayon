import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import InRoom from './InRoom';
import UserList from './user/UserList';
import ModeChoice from './mode/ModeChoice';
import Setting from './mode/Setting';
import Chat from './mode/Chat';
// import Voice from './Voice';
import tw from 'tailwind-styled-components';

interface RoomPropsType {
  socket: Socket;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function Ready({
  socket,
  userId,
  setUserId,
  room,
  setRoom,
  setStatus,
}: RoomPropsType) {
  const [choice, setChoice] = useState<number>(1);
  const [showChat, setShowChat] = useState<string>('ready');
  switch (showChat) {
    case 'ready':
      return (
        <div>
          <h1>닉네임, 방번호 입력 페이지(임시)</h1>
          <InRoom
            socket={socket}
            userId={userId}
            setUserId={setUserId}
            room={room}
            setRoom={setRoom}
            setShowChat={setShowChat}
          />
        </div>
      );
      break;
    case 'readyRoom':
      return (
        <RoomBody>
          <UserDiv>
            <UserList />
            {/* <Voice socket={socket} /> */}
          </UserDiv>
          <MoreDiv>
            <PickMenu>
              <SetBtn
                className={choice === 1 ? 'h-full w-40 text-4xl' : ''}
                onClick={() => {
                  setChoice(1);
                }}
              >
                모드
              </SetBtn>
              <SetBtn
                className={choice === 2 ? 'h-full w-40 text-4xl' : ''}
                onClick={() => {
                  setChoice(2);
                }}
              >
                설정
              </SetBtn>
              <SetBtn
                className={choice === 3 ? 'h-full w-40 text-4xl' : ''}
                onClick={() => {
                  setChoice(3);
                }}
              >
                채팅
              </SetBtn>
            </PickMenu>
            <PickContent>
              {choice === 1 ? (
                <ModeChoice />
              ) : choice === 2 ? (
                <Setting />
              ) : (
                <Chat socket={socket} userId={userId} room={room} />
              )}
            </PickContent>
          </MoreDiv>
        </RoomBody>
      );
      break;
  }
}

const RoomBody = tw.div`w-screen h-screen flex items-center justify-center`;
const UserDiv = tw.div`w-1/4 xl:w-1/4 h-4/5 ml-5 xl:mx-0 rounded-l-2xl bg-white bg-opacity-50 flex items-center justify-center`;
const MoreDiv = tw.div`w-3/4 xl:w-2/4 h-4/5 mr-5 xl:mx-0 rounded-r-2xl bg-white bg-opacity-50 flex flex-col items-center justify-center`;
const PickMenu = tw.div`h-14 w-90 flex flex-row`;
const SetBtn = tw.div`h-90 w-30 text-2xl rounded-t-2xl text-white flex items-center justify-center bg-main-green mx-1`;
const PickContent = tw.div`h-80 w-90 border-black border-2 flex items-center justify-center`;
