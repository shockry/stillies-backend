const io = require("socket.io");
const randomString = require("secure-random-string");

function init(httpServer) {
  const socketServer = io(httpServer);

  socketServer.on("connection", function (socket) {
    if (!socket.handshake.query.room) {
      //Desktop
      const room = randomString({ length: 4, alphanumeric: true });
      socket.join(room);
      socketServer.emit("roomName", room);
    } else {
      // Web (controller)
      const { room } = socket.handshake.query;
      socket.join(room);
      socketServer.emit("clientConnected", room);
    }

    socket.on("library/get", function (clientRoom) {
      socket.to(clientRoom).broadcast.emit("library/get");
    });

    socket.on("library/set", function (movies, clientRoom) {
      socket.to(clientRoom).broadcast.emit("library/set", movies);
    });

    socket.on("trailer/watch", function (movie, clientRoom) {
      socket.to(clientRoom).broadcast.emit("trailer/watch", movie);
    });
    socket.on("movie/watch", function (movie, clientRoom) {
      socket.to(clientRoom).broadcast.emit("movie/watch", movie);
    });
    socket.on("play", function (clientRoom) {
      socket.to(clientRoom).broadcast.emit("play");
    });
    socket.on("pause", function (clientRoom) {
      socket.to(clientRoom).broadcast.emit("pause");
    });
  });
}

module.exports = { init };
