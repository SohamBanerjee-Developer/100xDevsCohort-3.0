"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let userCount = 0;
let allSocket = []; //type of socket is WebSocket if you don't import the type you will get the native websocket that javsscript has
wss.on("connection", (socket) => {
    userCount = userCount + 1;
    console.log("user is connected #" + userCount);
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === "join") {
            allSocket.push({
                socket,
                roomId: parsedMessage.payload.roomId
            });
            console.log(parsedMessage);
            console.log(allSocket);
        }
        let currentUserRoom = null;
        if (parsedMessage.type == "chat") {
            for (let i = 0; i < allSocket.length; i++) {
                if (socket == allSocket[i].socket) {
                    currentUserRoom = allSocket[i].roomId;
                }
            }
            for (let i = 0; i < allSocket.length; i++) {
                if (allSocket[i].roomId == currentUserRoom) {
                    allSocket[i].socket.send(parsedMessage.payload.message.toString());
                }
            }
            if (currentUserRoom == null) {
                socket.send("please enter in a room");
            }
        }
    });
    //     socket.on('disconnect', ()=>{//control doesn't reach here
    //         console.log(allSocket);
    //         allSocket = allSocket.filter(s => s!==socket)// to clear tha array after disconnect
    //         console.log(allSocket);
    //    })
});
