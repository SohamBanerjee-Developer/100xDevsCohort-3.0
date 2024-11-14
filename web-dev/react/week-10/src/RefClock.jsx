import React, { useRef, useState } from 'react'

function RefClock() {
  const [clock, setClock] = useState(0)
  //let normalValue = 0//it gets reinitialized to zero at every rerenders
  const [value, setValue]=useState("")
  let ref = useRef()//doesnt cause extra rerender and protects the value from rerendering
  function startClock() {
    let initializer = setInterval(()=>{
      setClock(v=>v+1)
    },1000)
    ref.current = initializer//cause an extra rerender
  }
  function stopClock() {
    clearInterval(ref.current)
    console.log(ref.current);
    
  }
  return (
    <>
    <div>{clock}</div>
    <button onClick={startClock}>start</button>
    <button onClick={stopClock}>stop</button>
  </>
  )
}

export default RefClock