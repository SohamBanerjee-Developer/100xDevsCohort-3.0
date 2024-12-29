
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
const [socket, setSocket] = useState("")
const inputRef = useRef()
function sendMessage(){
 const message = inputRef.current?.value
 console.log(inputRef.current);
 
 socket.send(message)
}
useEffect(()=>{
  const ws = new WebSocket("ws://localhost:8000")// it doesn't run while chnging state variable but runs whenever there's change of code within the react component itself
  setSocket(ws)
  ws.onmessage= function(e){// it triggers when backend resonpds with something
    alert(e.data)
  }
},[])

  return (
    <>
    <div>
      <input ref={inputRef} type='text' placeholder='message...'/>
      <button onClick={sendMessage}>send</button>
    </div>
    </>
  )
}

export default App
