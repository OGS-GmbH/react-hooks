import { useEffect, useState } from "react";

function useMounted (): boolean {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

export {
  useMounted
}
