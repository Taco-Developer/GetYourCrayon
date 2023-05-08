import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import tw from 'tailwind-styled-components';

interface ChatPropsType {
  socket: Socket;
  userId: string;
  room: string;
}

interface MessageType {
  author: string;
  message: string;
}

export default function Chat({ socket, userId, room }: ChatPropsType) {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollTo({
      top: messagesEndRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData: MessageType = {
        author: userId,
        message: currentMessage,
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect((): (() => void) => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

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
