const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const server = http.createServer(app);

// **** MONGOOSE CONNECTION **** //
mongoose
  .connect(
    "mongodb+srv://mohammed-raza:78J1X5q1CzkSmrh9@get-in-touch.oupxy.mongodb.net/get-in-touch?retryWrites=true&w=majority&appName=get-in-touch"
  )
  .then(() => {
    console.log("database in connected successfully");
  })
  .catch((err) => {
    console.log(`An error has been occured: ${err}`);
  });

// **** WEB SOCKET CONNECTION **** //
const io = new Server(server, {
  maxHttpBufferSize: 1e8,
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    socket.broadcast.emit("message-receive", msg);
  });
  socket.on("message-with-file", (data) => {
    socket.broadcast.emit("share-message-with-data", data);
  });
});
// **** SERVER LISTINING **** //
server.listen(3000, () =>
  console.log("****** SERVER IS LISTINING ON PORT 3000 ******")
);
