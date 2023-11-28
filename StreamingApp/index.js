// const path = require('path');
// const { createServer } = require('http');

// const express = require('express');
// const { getIO, initIO } = require('./socket');

// const app = express();

// app.use('/', express.static(path.join(__dirname, 'static')));

// const httpServer = createServer(app);

// let port = process.env.PORT || 3000;

// initIO(httpServer);

// httpServer.listen(port)
// console.log("Server started on ", port);

// getIO();
const path = require('path');
const { createServer } = require('http');
const express = require('express');
const { getIO, initIO } = require('./socket');

const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));

const httpServer = createServer(app);
const port = process.env.PORT || 3000;

initIO(httpServer);

httpServer.listen(port, () => {
  console.log("Server started on port", port);
});































// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

// const PORT = 3000;

// app.get('/', function (req, res) {
//     res.send('hello World');
// });

// http.listen(PORT, function () {
//     console.log('listening on *:' + PORT);
// });
// io.on("connection", socket => {
//     console.log("a user connected");
//     socket.on("chat message", msg => {
//       console.log(msg);
//       io.emit("chat message", msg);
//     });
//   });





