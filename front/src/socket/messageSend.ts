/** socket으로 메시지를 보내는 함수
 *
 * socket: 연결된 소켓
 *
 * type: 보내는 메시지 타입
 *
 * payload: 보내려는 데이터가 담긴 객체
 */
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
