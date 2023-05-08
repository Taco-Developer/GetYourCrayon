const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server("http://k8b203.p.ssafy.io:3003", {
  cors: {
    origin: "http://k8b203.p.ssafy.io:3002",
    methods: ["GET", "POST"],
  },
});
// const io = new Server(server, {
  
//   cors: {
//     origin: "http://k8b203.p.ssafy.io:3002",
//     methods: ["GET", "POST"],
//   },
// });

// 방에 유저 숫자
const countRoom = (roomName) => {
  return io.sockets.adapter.rooms.get(roomName)?.size;
};

// 소켓 연결
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // 방 접속
  socket.on("join_room", (userId, room) => {
    socket["username"] = userId;
    socket["userroom"] = room;
    socket.join(room);
    // 방접속했을때 다른사람에게 입장 알리기
    socket.to(room).emit("receive_message", {
      author: "",
      message: `${userId}님이 입장하셨습니다.`,
    });
    console.log(
      `User with ID: ${
        socket.id
      } joined room: ${room} member count: ${countRoom(room)}`
    );
  });

  // 메시지 보내기
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(socket.userroom).emit("receive_message", data);
  });

  // 연결 종료되기전 메시지 보내기
  socket.on("disconnecting", () => {
    socket.to(socket.userroom).emit("receive_message", {
      author: "",
      message: `${socket.username}님이 퇴장하셨습니다.`,
    });
    console.log("ing");
  });
  // 연결 종료
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => console.log("SERVER RUNNING"));
