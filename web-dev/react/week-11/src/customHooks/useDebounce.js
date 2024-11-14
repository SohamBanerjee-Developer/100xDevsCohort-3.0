import React, { useEffect, useRef } from "react";

function useDebounce(fn) {
  const ref = useRef();
  const fetching = () => {
    clearTimeout(ref.current);
    ref.current=setTimeout(fn,1000)
  };
  return fetching;
}

export default useDebounce;
