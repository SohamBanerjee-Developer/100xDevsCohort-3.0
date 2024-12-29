import { WebSocketServer } from "ws";
const wss = new WebSocketServer({port: 8000})

//node doesn't have native websocket server but client
wss.on('connection', function(socket){
    console.log("connected");
    socket.on("message", (e)=>{
       if(e.toString()==="ping"){
        socket.send("pong")
       }
        
    })
})