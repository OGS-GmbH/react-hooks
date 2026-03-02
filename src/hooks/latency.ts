import { type Dispatch, type SetStateAction, useRef, useState } from "react";

/**
 * React hook for handling state updates with a specified latency.
 * @typeParam T - Type of the initial state value.
 * @param initialValue - Initial state value 
 * @param latency - Latency in milliseconds to delay the state updates
 * @returns State as `T`
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   const [value, setValue] = useLatencyBoundState<string>("initial", 1000);
 *
 *   useEffect(() => {
 *     setValue("updated");
 *   }, [])
 *   
 *   return (
 *     <>
 *       <!-- The value will update with a delay of 1 second after calling setValue -->
 *       <p>{value}</p>
 *     </>
 *   )
 * }
 * ```
 *
 * @category useLatencyBoundState
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function useLatencyBoundState <T> (initialValue: T, latency: number): [T, Dispatch<SetStateAction<T>> ] {
  const [latencyBound, setLatencyBound] = useState<T>(initialValue);
  const lastUpdateTime = useRef<number>(Date.now());
  const awaitingUpdates = useRef<number>(0);

  const dispatch: Dispatch<SetStateAction<T>> = function (setStateAction: SetStateAction<T>) {
    const currentUpdateTime = Date.now();
    const currentLatency = currentUpdateTime - lastUpdateTime.current;
    awaitingUpdates.current += 1;
    const latencyDiff = awaitingUpdates.current * latency - currentLatency;

    setTimeout(() => {
      setLatencyBound(setStateAction);
      lastUpdateTime.current = currentUpdateTime;
      awaitingUpdates.current -= 1;
    }, latencyDiff);
  }

  return [
    latencyBound,
    dispatch
  ]
}

export {
  useLatencyBoundState
}
