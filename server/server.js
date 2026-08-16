import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

// ==========================================
// HTTP SERVER
// ==========================================
const httpServer = http.createServer(app);

// ==========================================
// SOCKET.IO SERVER
// ==========================================
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://erp-softwareai.netlify.app",
    ],
    credentials: true,
  },
});

// ==========================================
// SOCKET CONNECTION
// ==========================================
io.on("connection", (socket) => {

  console.log("🔌 SOCKET CONNECTED:", socket.id);

  socket.on("join-company", (companyId) => {

    const roomName = `company:${companyId}`;

    socket.join(roomName);

    console.log(
      "🏢 SOCKET JOINED ROOM:",
      socket.id,
      roomName
    );

    socket.emit("joined-company", {
      room: roomName,
    });
  });

});

// ==========================================
// START SERVER
// ==========================================
const startServer = async () => {
  try {
    await connectDB();

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Socket.IO running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server");
    console.error(error);
  }
};

startServer();

// Export io
export { io };