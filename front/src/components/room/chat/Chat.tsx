import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import tw from 'tailwind-styled-components';

interface ChatPropsType {
  socket: Socket;
  userId: string;
  room: string;
}

interface MessageType {
  author: string;
  room: string;
  message: string;
  time: string;
}

export default function Chat({ socket, userId, room }: ChatPropsType) {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<MessageType[]>([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData: MessageType = {
        author: userId,
        room: room,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  return (
    <ChatWindow>
      <ChatHeader>
        <HeaderP>Chat Page</HeaderP>
      </ChatHeader>
      <ChatBody>
        <MessageBox>
          {messageList.map((messageContent: MessageType, i: number) => {
            return (
              <Message key={i}>
                <You>
                  <MessageContent>{messageContent.message}</MessageContent>
                  <YouMeta>
                    <p>{messageContent.time}</p>
                    <p>{messageContent.author}</p>
                  </YouMeta>
                </You>
              </Message>
            );
          })}
        </MessageBox>
      </ChatBody>
      <ChatFooter>
        <FooterInput
          type="text"
          value={currentMessage}
          placeholder="Message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <FooterButton onClick={sendMessage}>버튼</FooterButton>
      </ChatFooter>
    </ChatWindow>
  );
}

const ChatWindow = tw.div`w-80 h-4/5`;
const ChatHeader = tw.div`h-11 border-8 bg-slate-600 relative cursor-pointer`;
const HeaderP = tw.p`block pr-0.5 pl-0.5 text-orange-300 font-bold leading-10`;
const ChatBody = tw.div`h-96 border-black border-2 bg-orange-900`;
const MessageBox = tw.div`w-full h-full overflow-y-scroll overflow-x-hidden`;
const Message = tw.div`h-auto p-2 flex`;
const MessageContent = tw.div`h-auto w-auto bg-fuchsia-400 border-4 text-white flex center my-1 py-1 break-words`;
const Other = tw.div`justify-start`;
const OtherMeta = tw.div`justify-start ml-1`;
const You = tw.div`justify-end`;
const YouMeta = tw.div`justify-end mr-1`;
const ChatFooter = tw.div`h-10 border-2 border-black border-t-0 flex`;
const FooterInput = tw.input`h-full border-r-2 border-r-black font-extralight py-4 flex outline-none`;
const FooterButton = tw.button`grid place-items-center cursor-pointer h-full bg-transparent outline-none text-2xl text-white`;
