import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './UseEffect.jsx'
function App() {
  const [profiles, setProfiles] = useState([])
  function addProfile(){

    setProfiles([...profiles,{
      src: "https://media.licdn.com/dms/image/v2/D5635AQEcRtAITDDQSw/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1704129945118?e=1730552400&v=beta&t=cZ7RaIyHeFkn9uIjd1yeeH0J8numK9WCdcRBV0JA8LI",
      name: "Soham das",
      Description1:"React JS developer | Student at Makaut        Kolkata, West Bengal",
      Description2: " Maulana Abul Kalam Azad University of Technology, West Bengal formerly WBUT"
    }])
  }
//you could have declare a normal array and use push operation on it but it wouldn't be detected by react as the state wouldn't
//have been changed so the component wouldn't rerender
  return (
    <>
    <div >
      <button onClick={addProfile} style={{padding:10, borderRadius:10, border:"none"}}>add</button>
      {/* react renders a component multiple time by calling the component multiple times normally or calling it multiple times 
      inside an array inside second brackets      below a array of Profile component is being rendered */}
     <div style={{display:"flex", gap:30}}>{profiles.map((profile)=><Profile src="https://media.licdn.com/dms/image/v2/D5635AQEcRtAITDDQSw/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1704129945118?e=1730552400&v=beta&t=cZ7RaIyHeFkn9uIjd1yeeH0J8numK9WCdcRBV0JA8LI" name="Soham Das" Description1="React JS developer | Student at Makaut
        Kolkata, West Bengal" Description2=" Maulana Abul Kalam Azad University of Technology, West Bengal formerly WBUT"/>)}</div>
     </div>
<Counter/>
    </>
  )
}
function Profile(props){
  let style={width: 220, height: 300, backgroundColor: "gray", borderRadius:20, }
  //this how you use inline css in react by passing a javascript object in the style attrbute
  //inside js objects highpen is supported that's why u need to use caps letter or quotation
  return(
    <>
    <div style={style}>
      <div style={{display:"flex", "justify-content":"center"}}>
    <img src={props.src}
    style={{borderRadius:50, width:100, height:100, marginTop:30}}></img>
    </div>
    <div style={{marginLeft:20}}>
      <div>{props.name}</div>
      <div>
        {props.Description1}
      </div>
<br></br>
    </div>
      <div style={{padding:10}}>
       {props.Description2}
      </div>
    </div>
    </>
  )
}

export default App
