"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("raspberry-pi-web"));
app.use(bodyParser.json())

io.on("connection", socket => {
  socket.on("turnOn", x => {
    socket.broadcast.emit("prender", x);
  });
});

server.listen(8080, () => {});
