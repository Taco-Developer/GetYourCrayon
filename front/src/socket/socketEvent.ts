/** message 수신을 위한 이벤트 등록
 *
 * socket: 연결된 소켓
 *
 * action: message를 수신 후 작동할 함수
 */
export const listenEvent = (
  socket: WebSocket,
  action: (event: MessageEvent) => void,
) => {
  socket.addEventListener('message', action);
};

/** 등록한 이벤트를 제거
 *
 * socket: 연결된 소켓
 *
 * action: 제거할 함수
 */
export const removeEvent = (
  socket: WebSocket,
  action: (event: MessageEvent) => void,
) => {
  socket.removeEventListener('message', action);
};
