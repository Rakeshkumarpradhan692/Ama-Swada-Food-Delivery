import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:9000"; // Matching server port

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const joinAdminRoom = () => {
  socket.emit("join-room", "admins");
};
