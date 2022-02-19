var app = require('express')();
var http = require('http').createServer(app);
// var io = require('socket.io')(http);
const io = require("socket.io")(http, {
      cors: {
        origin: ['https://live-class.iquestmath.com/', 'https://live-class.iquestmath.com/*', 'http://localhost:3000', 'http://localhost:3000/*'],
        methods: ["GET", "POST"]
      },
      allowEIO3: true
    });

io.on('connection', (socket)=> {
      // console.log('User Online');

      socket.on('canvas-data', (data)=> {
            socket.broadcast.emit('canvas-data', data);
            console.log('Canvas Data on server...');
      })
      socket.on('sheet-data', (data)=> {
            socket.broadcast.emit('sheet-data', data);
            console.log('Sheet Data on server...');
      })
      socket.on('sheet-page', (data)=> {
            socket.broadcast.emit('sheet-page', data);
            console.log('Sheet Page on server...');
      })
      socket.on('sheet-change', (data)=> {
            socket.broadcast.emit('sheet-change', data);
            console.log('Sheet change on server...');
      })
      socket.on('other-data', (data)=> {
            socket.broadcast.emit('other-data', data);
            console.log('Other data on server...');
      })
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})