import { useEffect, useRef, useState } from "react";

function usePreviousState <T> (state: T, initialValue?: T): T | undefined {
  const [get, set] = useState<T | undefined>(initialValue);
  const currentValueRef = useRef<T>(state)

  useEffect(() => {
    set(currentValueRef.current);
    currentValueRef.current = state;
  }, [state]);

  return get;
}

export {
  usePreviousState
}
