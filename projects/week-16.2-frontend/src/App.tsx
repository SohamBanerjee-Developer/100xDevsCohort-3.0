import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState(["hi there", "hello"]);
  const wsRef = useRef()

  useEffect(() => {// in strict mode useEffect will run two time two connectio  will be created you can wither close strict mode or add cleanup logic
    const ws = new WebSocket("ws://localhost:8080")
    wsRef.current = ws
    ws.onopen = ()=>{
// without this it will give error: Failed to execute 'send' on 'WebSocket': Still in CONNECTING state
      ws.send(JSON.stringify({
        'type': 'join',
        'payload': {
          'roomId': '123'
        }
      }))
    }
    ws.onmessage = (e)=>{
      setMessages(messages=>[...messages, e.data])
    }
    return ()=>{
      ws.close()
    }
  }, []);

  return (
    <>
      <diV className="bg-black flex flex-col p-16 font-serif">
        <div className=" min-h-72 chatbox h-5/6 bg-red-950">
        {messages?.map(message=> <div>
          <span className="inline-block mx-12 my-4 p-4 text-black rounded-sm bg-white">{message}</span>
          </div>)}
        </div>
        <div className="send p-4 flex justify-center items-center h-1/6 bg-slate-600">
          <input
          id="sendMessage"
            type="text"
            placeholder="enter your message"
            className="p-2 h-14 w-11/12 rounded-md"
          />
          <button
            type="submit"
            onClick={()=>{
              const message = document.getElementById('sendMessage')?.value
              wsRef.current?.send(JSON.stringify({//you can only send string to a  webSocket server
                'type': 'chat',
                'payload': {
                  'message': message
                }
              }))
            }}
            className="bg-red-950 text-white h-14 p-2 rounded-md "
          >
            {" "}
            send message
          </button>
        </div>
      </diV>
    </>
  );
}

export default App;
