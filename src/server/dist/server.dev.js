"use strict";

var express = require('express');

var _require = require('pg'),
    Client = _require.Client;

var app = express();

var server = require('http').Server(app);

var io = module.exports.io = require('socket.io')(server);

require('dotenv').config();

var _require2 = require('../Constants'),
    PLAY = _require2.PLAY,
    PAUSE = _require2.PAUSE,
    SYNC_TIME = _require2.SYNC_TIME,
    NEW_VIDEO = _require2.NEW_VIDEO,
    ASK_FOR_VIDEO_INFORMATION = _require2.ASK_FOR_VIDEO_INFORMATION,
    SYNC_VIDEO_INFORMATION = _require2.SYNC_VIDEO_INFORMATION,
    JOIN_ROOM = _require2.JOIN_ROOM,
    SEND_MESSAGE = _require2.SEND_MESSAGE,
    RECEIVED_MESSAGE = _require2.RECEIVED_MESSAGE,
    SEND_USERNAME = _require2.SEND_USERNAME,
    ASK_FOR_USERNAME = _require2.ASK_FOR_USERNAME;

var PORT = process.env.PORT || 5000;
app.use(express["static"](__dirname + '/../../build'));
var client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
io.on('connection', function (socket) {
  //in = send all
  //to = send all except sender
  socket.on(JOIN_ROOM, function (data) {
    socket.join(data.room);
    socket.room = data.room;
    socket.username = data.username;
    var message = socket.username + " joined.";
    io["in"](socket.room).emit(RECEIVED_MESSAGE, {
      username: 'Server',
      text: message
    });
    io["in"](socket.room).emit(ASK_FOR_USERNAME);
  });
  socket.on(PLAY, function () {
    socket.to(socket.room).emit(PLAY);
  });
  socket.on(PAUSE, function () {
    socket.to(socket.room).emit(PAUSE);
  });
  socket.on(SYNC_TIME, function (currentTime) {
    socket.to(socket.room).emit(SYNC_TIME, currentTime);
  });
  socket.on(NEW_VIDEO, function (videoURL) {
    io.to(socket.room).emit(NEW_VIDEO, videoURL);
  });
  socket.on(ASK_FOR_VIDEO_INFORMATION, function () {
    socket.to(socket.room).emit(ASK_FOR_VIDEO_INFORMATION);
  });
  socket.on(SYNC_VIDEO_INFORMATION, function (data) {
    io.to(socket.room).emit(SYNC_VIDEO_INFORMATION, data);
  });
  socket.on(SEND_MESSAGE, function (data) {
    io["in"](socket.room).emit(RECEIVED_MESSAGE, data);
  });
  socket.on(SEND_USERNAME, function (username) {
    io["in"](socket.room).emit(SEND_USERNAME, username);
  });
  socket.on('disconnect', function () {
    client.connect();
    client.query('SELECT table_name FROM information_schema.tables;', function (err, res) {
      if (err) throw err;
      var message = socket.username + " disconnected. - Tables:" + res.rows.length;
      socket["in"](socket.room).emit(RECEIVED_MESSAGE, {
        username: 'Server',
        text: message
      });
      io["in"](socket.room).emit(ASK_FOR_USERNAME);
      client.end();
    });
  });
});
server.listen(PORT, function () {
  console.log('listening on *:' + PORT);
});