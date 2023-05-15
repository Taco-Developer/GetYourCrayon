export const sendMessage = (
  socket: WebSocket,
  type: string,
  payload?: object,
) => {
  let message;
  if (payload === undefined) {
    message = { type };
  } else {
    message = { type, ...payload };
  }
  socket.send(JSON.stringify(message));
};
