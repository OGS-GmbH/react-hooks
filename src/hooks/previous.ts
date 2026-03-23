import { useEffect, useRef, useState } from "react";

/**
 * React hook for getting the previous state value.
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePreviousState(count);
 *
 *   return (
 *     <>
 *       <p>Current count: {count}</p>
 *       <p>Previous count: {prevCount}</p>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *     </>
 *   )
 * }
 * ```
 *
 * @typeParam T - Type of the state value.
 * @param state - Current state value to track.
 * @param initialValue - Optional initial value for the previous state. If not provided, the previous state will be `undefined` on the first render.
 * @returns Previous state value of type `T` or `undefined` if it's the first render and no initial value is provided.
 *
 * @category usePreviousState
 * @since 1.0.0
 * @author Simon Kovtyk
 */
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
