import { WebSocketServer } from 'ws';
import  jwt, { JwtPayload }  from 'jsonwebtoken';// installed in the global node modules
import {JWT_SECRET} from '@repo/backend-common/config'


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, req) {
  const url = req.url//will send the token in query parameter

  if (!url){
    return
  }
  const params = new URLSearchParams(url.split('?')[1])//it will split the url in a array of two element first element will have whatever the url has before the ? and the second will have whatever the url has  after ?
  const token = params.get('token') || "" //so that type is only string not string|undefined
  const decoded = jwt.verify(token, JWT_SECRET)// if you import the secret from the apps package then it gives error that config is not under rootdir
  if(typeof decoded == "string"){// verifiying that decoded is JwtPayload only not string 
    ws.close()
    return
  }
  if(!decoded || decoded.userId){//here type of decode is only JwtPayload only, so we can add decoded.anything typescript won't complain
    ws.close()// jwt is used so that only signed up user can join in the room, for example if soham created room it should be that soham is joining the room
    return
  }
  ws.on('message', function message(data) {
    ws.send("pong")
  });

  
});
//The URLSearchParams interface defines utility methods to work with the query string of a URL.