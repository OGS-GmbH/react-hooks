import { useCallback, useState } from "react";
import { useMounted } from "./mounted";

/**
 * React hook for handling promises. It returns the resolved value of the promise or `null` if the promise is still pending or has been rejected. The hook also ensures that state updates only occur if the component is still mounted, preventing potential memory leaks or errors from trying to update an unmounted component.
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   const data = usePromise(fetch(
 *     "https://jsonplaceholder.typicode.com/todos/1",
 *     {
 *       method: "GET"
 *     }
 *   ));
 *
 *   return (
 *     <>
 *       {
 *         data
 *           ? <p>Data: {JSON.stringify(data)}</p>
 *           : <p>Loading...</p>
 *       }
 *     </>
 *   )
 * }
 * ```
 *
 * @typeParam T - Type of the resolved value of the promise.
 * @param promise - The promise to handle. It can be any promise that resolves to a value of type `T`.
 * @returns The resolved value of the promise of type `T` or `null` if the promise is still pending or has been rejected.
 *
 * @category usePromise
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function usePromise <T> (promise: Promise<T>): T | null {
  const isMounted = useMounted();
  const [state, setState] = useState<T | null>(null);
  const callback = useCallback((promise: Promise<T>) => // oxlint-disable-line eslint(no-shadow)
    new Promise<T>((resolve, reject) => {
      const onValue = (value: T) => {
        isMounted() && resolve(value);
      };
      const onError = (error: T) => {
        isMounted() && reject(error);
      };
      promise.then(onValue, onError);
    }), []);

  callback(promise).then((result) => setState(result));

  return state;
};

export {
  usePromise
}
