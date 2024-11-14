import { useState, memo, useEffect } from "react";
import useFetch from "./customHooks/UseFetch";
import usePrev from "./customHooks/usePrev";
import useDebounce from "./customHooks/useDebounce";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import  {counter, isEven } from "./store/atom/atom";
import React from 'react'

function App() {

  return (
    <RecoilRoot>
     {/* <Counter /> */}
     <Counter/>
    </RecoilRoot>
  )
}
// react by default rerenders all the child component whenever the parent component rerender
function Counter() {
const [counter, setCounter] = useState("")
// useEffect(()=>{
//   setInterval(()=>{setCounter(counter+1)},3000)
// },[])
  return <div>
    <Increase />
    <Decrease />
    <CurrentCount />
    <IsEven/>
    {/* <MemoizedCurrentCount/>
    <MemoiszedIncrease/>
    <MemoizedDecrease/> */}
  </div>
}
// components wrapped by memo only rerenders when its props/state changes
// const MemoizedCurrentCount = memo(CurrentCount)
function CurrentCount() {
  const count = useRecoilValue(counter);  
  return <div>
    {count}
  </div>
}

// const MemoizedDecrease = memo(Decrease)
function Decrease() {

  const setCount = useSetRecoilState(counter);

  function decrease() {
    setCount(c => c - 1);
  }

  return <div>
    <button onClick={decrease}>Decrease</button>
  </div>
}


// const MemoiszedIncrease = memo(Increase)
function Increase() {
  const setCount = useSetRecoilState(counter);

  function increase() {
    setCount(c => c + 2);
  }

  return <div>
    <button onClick={increase}>Increase</button>
  </div>
}
function IsEven(){
  const count = useRecoilValue(isEven)
  return<div>
    {count? "odd" : "even"}
  </div>
}


export default App;
