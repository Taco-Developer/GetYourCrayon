import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/thunkhook';

import tw from 'tailwind-styled-components';

import { sendMessage } from '@/socket/messageSend';

interface ChatPropsType {
  socket: WebSocket | null;
  messageList: Array<any>;
}

export default function Chat({ socket, messageList }: ChatPropsType) {
  /** 유저 정보 */
  const { userNickname } = useAppSelector((state) => state.userInfo);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  }, [messageList]);

  const messageSubmitHandler = () => {
    if (socket !== null && currentMessage) {
      const sendSocket: {} = {
        author: userNickname,
        message: currentMessage,
        status: 'chatting',
      };
      // console.log(sendSocket);
      sendMessage(socket, 'chat', sendSocket);
      setCurrentMessage('');
    }
  };

  // 채팅 tailwindcss
  const me = 'justify-end';
  const meMeta = 'hidden';
  const meContent = 'justify-end bg-sky-400';
  const you = 'justify-start';
  const youMeta = 'justify-start';
  const youContent = 'justify-start bg-slate-600';
  const admin = 'justify-center';
  const adminMeta = 'hidden';
  const adminContent = 'justify-start bg-black text-white';

  return (
    <OutDiv>
      <ChatDiv>
        <ChatBody>
          {messageList.map((messageContent, i) => {
            return (
              <Message
                key={i}
                className={
                  'admin' === messageContent.author
                    ? admin
                    : userNickname === messageContent.author
                    ? me
                    : you
                }
              >
                <MessageBody>
                  <div
                    className={
                      'admin' === messageContent.author
                        ? adminMeta
                        : userNickname === messageContent.author
                        ? meMeta
                        : youMeta
                    }
                  >
                    <YouMeMeta>{messageContent.author}</YouMeMeta>
                  </div>
                  <MessageContent
                    className={
                      'admin' === messageContent.author
                        ? adminContent
                        : userNickname === messageContent.author
                        ? meContent
                        : youContent
                    }
                  >
                    {messageContent.message}
                  </MessageContent>
                </MessageBody>
              </Message>
            );
          })}
          <div ref={messagesEndRef} />
        </ChatBody>
      </ChatDiv>
      <InputDiv>
        <ChatInput
          type="text"
          value={currentMessage}
          placeholder="메시지..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && messageSubmitHandler();
          }}
        />
        <ChatBtn
          onClick={() => {
            messageSubmitHandler();
          }}
        >
          전송
        </ChatBtn>
      </InputDiv>
    </OutDiv>
  );
}

const OutDiv = tw.div`h-90 w-90 bg-white bg-opacity-50 rounded-xl flex flex-col items-center justify-center p-5`;
const ChatDiv = tw.div`h-90 w-full flex items-center justify-center relative px-3`;
const ChatBody = tw.div`h-full w-full overflow-y-scroll overflow-x-hidden scrollbar-ssibal`;
const MessageBody = tw.div`max-w-xs`;
const Message = tw.div`h-auto flex`;
const MessageContent = tw.div`h-auto w-auto rounded-xl bg-white text-white text-xl font-bold flex items-center mb-4 p-2`;
const YouMeMeta = tw.p`ml-1 mb-1`;
const InputDiv = tw.div`h-10 w-full flex items-center justify-around`;
const ChatInput = tw.input`h-full w-70 text-2xl bg-white rounded-xl flex items-center justify-center px-5`;
const ChatBtn = tw.button`h-full w-20 text-white text-2xl bg-main-green hover:bg-main-pink rounded-xl flex items-center justify-center`;
