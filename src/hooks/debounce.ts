import { useCallback, useEffect, useRef } from "react";

/**
 * React Hook that creates a debounced version of a callback.
 *
 * The returned callback delays execution until it has not been invoked
 * again for the specified amount of time. If it is called repeatedly
 * within the delay, only the latest invocation is executed.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const debouncedSearch = useDebouncedCallback(
 *     (value: string) => {
 *       expensiveSearch(value);
 *     },
 *     300
 *   );
 *
 *   return (
 *     <input
 *       onChange={(e) => debouncedSearch(e.target.value)}
 *     />
 *   );
 * }
 * ```
 *
 * @typeParam T - Tuple of argument types accepted by the callback.
 *
 * @param callback - Function to execute after the debounce delay.
 * @param delay - Debounce delay in milliseconds.
 *
 * @returns A stable debounced callback. The latest invocation is executed
 * after the configured delay.
 *
 * @category useDebouncedCallback
 * @since 1.1.0
 * @author David Schummer
 */
function useDebouncedCallback<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): (...args: T) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return useCallback(
    (...args: T) => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [delay, callback]
  );
}

export { useDebouncedCallback };
