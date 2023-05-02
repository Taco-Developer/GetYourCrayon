import React, { useState, useEffect } from 'react';
import { socket } from '@/socket/server';

interface ChatPropsType {
  userId: string;
  room: string;
}

export default function Chat({ userId, room }: ChatPropsType) {
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<[]>([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        author: userId,
        room: room,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  return (
    <div>
      <h1>Chat Page</h1>
    </div>
  );
}
