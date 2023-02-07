const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User Join with ID: ${socket.id} joined room : ${room}`);
  });

  socket.on("send_message", (message) => {
    socket.to(message.room).emit("receive_message",message)
    console.log("send_message", message);
  })

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("listening on http://localhost3001");
});
