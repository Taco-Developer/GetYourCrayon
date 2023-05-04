import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import InRoom from './InRoom';
import UserList from './user/UserList';
import Chat from './content/Chat';
// import Voice from './Voice';
import tw from 'tailwind-styled-components';

interface RoomPropsType {
  socket: Socket;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
}

export default function Ready({
  socket,
  userId,
  setUserId,
  room,
  setRoom,
}: RoomPropsType) {
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
          <AnyDiv>
            <Chat socket={socket} userId={userId} room={room} />
          </AnyDiv>
        </RoomBody>
      );
      break;
  }
}

const RoomBody = tw.div`w-screen h-screen flex items-center justify-center`;
const UserDiv = tw.div`w-1/4 h-4/5 bg-red-400 flex items-center justify-center                    ASFGASDFASDFASDFASDFASDF         POIOP[IOPOIUPOIUIO]`;
const AnyDiv = tw.div`w-2/4 h-4/5 bg-orange-400 flex items-center justify-center`;
