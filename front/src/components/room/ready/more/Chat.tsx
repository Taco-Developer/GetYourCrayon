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

// interface MessageType {
//   author: string;
//   message: string;
// }

export default function Chat({
  client,
  userId,
  room,
  messageList,
}: ChatPropsType) {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const sendMessage = () => {
    const message = { author: userId, message: currentMessage };
    if (client !== null) {
      client.send(JSON.stringify(message));
      setCurrentMessage('');
    }
  };

  const me = 'justify-end';
  const meMeta = 'justify-end mr-3';
  const meContent = 'justify-end bg-blue-500';
  const you = 'justify-start';
  const youMeta = 'justify-start ml-3';
  const youContent = 'justify-start bg-yellow-500';
  // id={userId === messageContent.author ? 'you' : 'other'}
  return (
    <OutDiv>
      <ChatDiv>
        <ChatBody>
          {messageList.map((messageContent, i) => {
            return (
              <Message
                key={i}
                className={userId === messageContent.author ? me : you}
              >
                <div>
                  <div
                    className={
                      userId === messageContent.author ? meMeta : youMeta
                    }
                  >
                    <YouMeMeta>{messageContent.author}</YouMeMeta>
                  </div>
                  <MessageContent
                    className={
                      userId === messageContent.author ? meContent : youContent
                    }
                  >
                    <p>{messageContent.message}</p>
                  </MessageContent>
                </div>
              </Message>
            );
          })}
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
const Message = tw.div`h-auto flex`;
const MessageContent = tw.div`h-auto w-auto bg-green-500 rounded-xl text-white font-bold flex items-center m-5 break-words`;
const YouMeMeta = tw.p`ml-5`;

const InputDiv = tw.div`h-10 w-full flex items-center justify-around`;
const ChatInput = tw.input`h-full w-70 bg-white rounded-xl flex items-center justify-center`;
const ChatBtn = tw.button`h-full w-20 bg-main-green hover:bg-main-pink rounded-xl flex items-center justify-center`;

// 수정후 지울 예정
// return (
//   <div className="chat-window">
//     <div className="chat-header">
//       <p>Live Chat</p>
//     </div>

//     {/*  */}
//     <div className="chat-body">
//       <div className="message-container">
// {messageList.map((messageContent, i) => {
//   return (
//     <div
//       key={i}
//       className="message"
//       id={userId === messageContent.author ? 'you' : 'other'}
//     >
//       <div>
//         <div className="message-meta">
//           <p id="author">{messageContent.author}</p>
//         </div>
//         <div className="message-content">
//           <p>{messageContent.message}</p>
//         </div>
//       </div>
//     </div>
//   );
// })}
//       </div>
//     </div>
//     {/*  */}

//     <div className="chat-footer">
//       <input
//         type="text"
//         value={currentMessage}
//         placeholder="메시지..."
//         onChange={(event) => {
//           setCurrentMessage(event.target.value);
//         }}
//         onKeyPress={(event) => {
//           event.key === 'Enter' && sendMessage();
//         }}
//       />
//       <button onClick={sendMessage}>&#9658;</button>
//     </div>
//   </div>
// );
