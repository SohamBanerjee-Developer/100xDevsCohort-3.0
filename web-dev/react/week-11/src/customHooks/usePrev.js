import React, { useEffect, useRef } from 'react'

function usePrev(value) {
    const ref = useRef()
  useEffect(()=>{
    ref.current= value
  },[value])
  return ref.current
}

export default usePrev
//it works because react first execute return statement and then the effect