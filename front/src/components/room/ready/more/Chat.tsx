import { list } from 'postcss';
import React, { useState, useEffect, useRef } from 'react';
import tw from 'tailwind-styled-components';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

interface ChatPropsType {
  client: W3CWebSocket | null;
  userId: string;
  room: string;
  messageList: Array<any>;
}

export default function Chat({
  client,
  userId,
  room,
  messageList,
}: ChatPropsType) {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  }, [messageList]);

  const sendMessage = () => {
    const message = { author: userId, message: currentMessage };
    if (client !== null) {
      client.send(JSON.stringify(message));
      setCurrentMessage('');
    }
  };

  // 채팅 tailwindcss
  const me = 'justify-end';
  const meMeta = 'hidden';
  const meContent = 'justify-end bg-sky-400';
  const you = 'justify-start';
  const youMeta = 'justify-start ml-3';
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
                    : userId === messageContent.author
                    ? me
                    : you
                }
              >
                <MessageBody>
                  <div
                    className={
                      'admin' === messageContent.author
                        ? adminMeta
                        : userId === messageContent.author
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
                        : userId === messageContent.author
                        ? meContent
                        : youContent
                    }
                  >
                    <p>{messageContent.message}</p>
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
            event.key === 'Enter' && sendMessage();
          }}
        />
        <ChatBtn>전송</ChatBtn>
      </InputDiv>
    </OutDiv>
  );
}

const OutDiv = tw.div`h-90 w-90 bg-white bg-opacity-50 rounded-xl flex flex-col items-center justify-center p-5`;
const ChatDiv = tw.div`h-90 w-full flex items-center justify-center relative px-3`;
const ChatBody = tw.div`h-full w-full overflow-y-scroll overflow-x-hidden scrollbar-ssibal`;
const MessageBody = tw.div`max-w-xs`;
const Message = tw.div`h-auto flex`;
const MessageContent = tw.div`h-auto w-auto rounded-xl bg-white text-white text-xl font-bold flex items-center mb-4 p-2 break-words`;
const YouMeMeta = tw.p`ml-1 mb-1`;
const InputDiv = tw.div`h-10 w-full flex items-center justify-around`;
const ChatInput = tw.input`h-full w-70 text-2xl bg-white rounded-xl flex items-center justify-center px-5`;
const ChatBtn = tw.button`h-full w-20 text-white text-2xl bg-main-green hover:bg-main-pink rounded-xl flex items-center justify-center`;
