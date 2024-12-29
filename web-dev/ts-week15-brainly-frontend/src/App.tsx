// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/ui/Button'
import PlusIcon from './icons/PlusIcon'

function App() {

  function onClickHandler(){

  }
  return (
    <>
      <Button variant='secondary' size='md' onClick={onClickHandler} text='start' startIcon={<PlusIcon size='md'/>} />
      <Button variant='primary' size='sm' onClick={onClickHandler} text='start' startIcon={"📌"} />
      <Button variant='primary' size='lg' onClick={onClickHandler} text='start' startIcon={"📌"} />
    </>
  )
}

export default App
