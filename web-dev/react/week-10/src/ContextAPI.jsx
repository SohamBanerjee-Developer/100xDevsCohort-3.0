import React, { useContext, useState } from 'react'
import { createContext } from 'react';

const CountContext = createContext();

function ContextAPI() {
    return <div>
    <Parent />
  </div>
}

function CountContextProvider({ children }) {
    const [count, setCount] = useState(0);
  
    return <CountContext.Provider value={{count, setCount}}>{/*this object containing the values is what stored in the CountContext */}
      {children}
    </CountContext.Provider> 
}

function Parent() {
    return (
      <CountContextProvider>
        <Incrase />
        <Decrease />
        <Value />
      </CountContextProvider>
    );
}
// context api renders all three components whereas a state management library like recoil doesn't
function Decrease() {
    const {setCount} = useContext(CountContext);
    return <button onClick={() => setCount(count => count +1)}>Decrease</button>;// updater function
  }
  
  function Incrase() {
    const {setCount} = useContext(CountContext);
    return <button onClick={() => setCount(count => count +1)}>Increase</button>;
  }
  
  function Value() {
    const {count} = useContext(CountContext);
    return <p>Count: {count}</p>;
  }
  

export default ContextAPI