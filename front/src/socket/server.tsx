import io from 'socket.io-client';

// const URL =
//   process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001';

export const socket = io('http://k8b230.p.ssafy.io:3001');
