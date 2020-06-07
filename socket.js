const io = require("socket.io");

function init(httpServer) {
  const socketServer = io(httpServer);

  socketServer.on("connection", function (socket) {
    socket.on("library/get", function () {
      socket.broadcast.emit("library/get");
    });
    socket.on("library/set", function (movies) {
      socket.broadcast.emit("library/set", movies);
    });

    socket.on("trailer/watch", function (movie) {
      socket.broadcast.emit("trailer/watch", movie);
    });
    socket.on("movie/watch", function (movie) {
      socket.broadcast.emit("movie/watch", movie);
    });

    socket.on("play", function () {
      socket.broadcast.emit("play");
    });
    socket.on("pause", function () {
      socket.broadcast.emit("pause");
    });
  });
}

module.exports = { init };
