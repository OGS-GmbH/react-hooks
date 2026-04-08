import { useEffect, useRef } from "react";

/**
 * React hook of calling the callback only on the immediate component render, not on subsequent updates.
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   useInitialize(() => {
 *     console.log("This will only be logged on the early first render, not on subsequent updates.");
 *   })
 * }
 * ```
 *
 * @param callback - Callback to be executed on the immediate component render.
 *
 * @category useInitialize
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function useInitialize(callback: () => void): void {
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    initialized.current = true;
  }, []);

  if (initialized.current) return;

  callback();
}

export { useInitialize };
