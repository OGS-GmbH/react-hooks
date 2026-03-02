import { useEffect, useRef, type EffectCallback } from "react";

/**
 * React hook of calling the effect only on updates, not on the first render.
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   useLazyEffect(() => {
 *     console.log("This will not be logged on the first render, but will be logged on subsequent updates.");
 *   })
 * }
 * ```
 *
 * @param effect - Effect callback to be executed on updates.
 * @param deps - Dependency array for the effect. The effect will be re-executed when any of the dependencies change. Default is an empty array, meaning the effect will only run on updates and not on the first render.
 *
 * @category useLazyEffect
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function useLazyEffect (effect: EffectCallback, deps: unknown[] = []): void {
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return effect();
  }, deps);
}

export {
  useLazyEffect
}
