import { list } from 'postcss';
import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
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
  // const [messageList, setMessageList] = useState<MessageType[]>([]);
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

  // const sendMessage = async () => {
  //   if (currentMessage !== '') {
  //     const messageData: MessageType = {
  //       author: userId,
  //       message: currentMessage,
  //     };

  //     await socket.emit('send_message', messageData);
  //     setMessageList((list) => [...list, messageData]);
  //     setCurrentMessage('');
  //   }
  // };

  // useEffect((): (() => void) => {
  //   socket.on('receive_message', (data) => {
  //     setMessageList((list) => [...list, data]);
  //   });
  //   return () => {
  //     socket.off('receive_message');
  //   };
  // }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>

      {/*  */}
      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={i}
                className="message"
                id={userId === messageContent.author ? 'you' : 'other'}
              >
                <div>
                  <div className="message-meta">
                    <p id="author">{messageContent.author}</p>
                  </div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/*  */}

      <div className="chat-footer">
        <input
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
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
