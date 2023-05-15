export const listenEvent = (
  socket: WebSocket,
  action: (event: MessageEvent) => void,
) => {
  socket.addEventListener('message', action);
};

export const removeEvent = (
  socket: WebSocket,
  action: (event: MessageEvent) => void,
) => {
  socket.removeEventListener('message', action);
};
