
const { Server } = require("socket.io");
let IO;

module.exports.initIO = (httpServer) => {
    IO = new Server(httpServer);

    IO.use((socket, next) => {
        if (socket.handshake.query) {
            let callerId = socket.handshake.query.callerId;
            socket.user = callerId;
            next();
        }
    });

    IO.on("connection", (socket) => {
        // console.log('socket.user',socket);
        // console.log(socket.user, "user Connected");
        socket.join(socket.user);

        socket.on("call", (data) => {
            console.log('call', data);
            let calleeId = data.calleeId;
            let rtcMessage = data.rtcMessage;

            socket.to(calleeId).emit("newCall", {
                callerId: socket.user,
                rtcMessage: rtcMessage,
            });
        });

        socket.on("answerCall", (data) => {
            console.log('answerCall', data);
            let callerId = data.callerId;
            rtcMessage = data.rtcMessage;

            socket.to(callerId).emit("callAnswered", {
                callee: socket.user,
                rtcMessage: rtcMessage,
            });
        });

        socket.on("ICEcandidate", (data) => {
            console.log("ICEcandidate ", data);
            let calleeId = data.calleeId;
            let rtcMessage = data.rtcMessage;
            console.log("socket.user emit", socket.user);

            socket.to(calleeId).emit("ICEcandidate", {
                sender: socket.user,
                rtcMessage: rtcMessage,
            });
        });
    });
};

module.exports.getIO = () => {
    if (!IO) {
        throw Error("IO not initilized.");
    } else {
        return IO;
    }
};