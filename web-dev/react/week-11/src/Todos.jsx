import React, { useEffect } from 'react'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { todosAtomFamily } from './store/atom/atomFamily'

function Todos() {
  return (
    <RecoilRoot>
      <Updater/>
    <div>
        <Todo id={1}/>
        <Todo id={2}/>
        <Todo id={2}/>
        <Todo id={2}/>
    </div>
    </RecoilRoot>
  )
}
function Updater(){
  const updateTodo = useSetRecoilState(todosAtomFamily(2))
  useEffect(()=>{
    setTimeout(()=>{
      updateTodo({
        id: 2,
        title: "drink water",
        time: "2 pm"
      })
  },5000)
  },[])

}
function Todo({id}){
    const currentTodo = useRecoilValue(todosAtomFamily(id))
    return <div>
        <p>{currentTodo.title}</p>
        <p>at {currentTodo.time}</p>
    </div>
}

export default Todos