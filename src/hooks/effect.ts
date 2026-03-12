import { useEffect, useRef } from "react";

function useLazyEffect (effect: () => (void | (() => void)), deps: unknown[] = []) {
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
