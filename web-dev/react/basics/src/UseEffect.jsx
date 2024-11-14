import { useState, useEffect } from 'react'

export default function Counter(){
    const [count, setCount] = useState(0)//it is fixed somehow if you dont use currentval as a call back while calling setCount
    let number = 0
    function increment() {// you can manually manipulate the dom in react
        number++
        console.log(number);
        document.getElementById("number").innerHTML = number
    }
    function Increment(){
        // setCount(count + 1)// why this doesn't see cohort 3 9.3 and for better explanation 
        // see notion and https://react.dev/learn/queueing-a-series-of-state-updates
        setCount(c=>c+1)
    }
    useEffect(()=>{setInterval(Increment,1000)},[])
    

    return(
        <div id={"number"}>{count}</div>
    )
}