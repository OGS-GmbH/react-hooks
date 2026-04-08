import { useCallback, useEffect, useRef, useState, type EffectCallback } from "react";

/**
 * React hook for checking if the component is mounted.
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   const isMounted = useMountedState();
 *
 *   return isMounted && <p>The component is mounted.</p>;
 * }
 * ```
 *
 * @returns A state which is `true` if the component is mounted, `false` otherwise.
 *
 * @category useMountedState
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function useMountedState(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
}

/**
 * React hook for checking if the component is mounted.
 *
 * @remarks Instead of {@link useMountedState} it returns a `Function` that can be used to check if the component is mounted at any time, which can be useful in asynchronous operations to prevent state updates on unmounted components.
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   const isMounted = useMounted();
 *
 *   return isMounted && <p>The component is mounted.</p>;
 * }
 * ```
 *
 * @returns A `Function`, that returns `true` if the component is mounted, `false` otherwise.
 *
 * @category useMounted
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function useMounted(): () => boolean {
  const mountedRef = useRef<boolean>(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return get;
}

/**
 * React hook for calling the effect only when the component is mounted.
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   useMountedEffect(() => {
 *     console.log("This will only be logged when the component is mounted, and will not be logged if the component is unmounted or rerendered.");
 *   })
 * }
 * ```
 *
 * @param effect - Effect callback to be executed when the component is mounted.
 *
 * @category useMountedEffect
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function useMountedEffect(effect: EffectCallback): void {
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) return;

    isMounted.current = true;
    return effect();
  }, []);
}

export { useMounted, useMountedState, useMountedEffect };
