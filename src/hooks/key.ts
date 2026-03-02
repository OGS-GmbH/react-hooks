import { useEffect, useState } from "react"

/**
 * Options for {@link useKey} hook.
 *
 * @category useKey
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type UseKeyOptions = Partial<{
  /**
   * Mode of the hook, that changes the way the key state is updated.
   *
   * In `toggle` mode, the state is toggled on each key press, while in `normal` mode, the state is true after the key got pressed.
   */
  mode: "toggle" | "normal"
  /**
   * Key, that should be listened for. It can be either a modifier key, that is checked with `getModifierState` method, or a regular key, that is checked with `key` property of the event.
   */
  key: string;
  /**
   * Flag, to enable listening for `ctrl` key. If set to `true`, the state will be true only if the `ctrl` key is pressed, otherwise it will be ignored.
   * @default `false`
   */
  ctrlKey: boolean;
  /**
   * Flag, to enable listening for `alt` key. If set to `true`, the state will be true only if the `alt` key is pressed, otherwise it will be ignored.
   * @default `false`
   */
  altKey: boolean;
  /**
   * Flag, to enable listening for `shift` key. If set to `true`, the state will be true only if the `shift` key is pressed, otherwise it will be ignored.
   * @default `false`
   */
  shiftKey: boolean;
  /**
   * Flag, to enable listening for `meta` key. If set to `true`, the state will be true only if the `meta` key is pressed, otherwise it will be ignored.
   * @remarks On MacOS, the `meta` key is usually the `Command` key, while on Windows it is the `Windows` key.
   * @default `false`
   */
  metaKey: boolean;
}>;

/**
 * React hook for handling key presses. It listens for the specified key and modifier keys and updates the state accordingly.
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   const capsLock = useKey({
 *     mode: "toggle",
 *     key: "CapsLock"
 *   });
 *
 *   return (
 *     <>
 *       <p>Caps Lock is {capsLock ? "on" : "off"}</p>
 *     </>
 *   )
 * }
 * ```
 * @param options - {@link UseKeyOptions} for the hook, including the key to listen for and the mode of the hook.
 * @returns A `boolean` state indicating whether the specified key and modifier keys are currently pressed.
 *
 * @category useKey
 * @since 1.0.0
 * @author Simon Kovtyk
*/
function useKey ({key, ctrlKey, altKey, shiftKey, metaKey, mode}: UseKeyOptions): boolean {
  const [keyState, setKeyState] = useState<boolean>(false);

  function updateKeyState (state: boolean): void {
    setKeyState((prev) => mode === "toggle" ? !prev && state : state);
  }

  function onKeyDown (event: KeyboardEvent): void {
    if (key !== undefined) {
      if (key !== event.key)
        return setKeyState(false);

      if (event.getModifierState(key))
        return setKeyState(true)
    }

    if (ctrlKey !== undefined && ctrlKey !== event.ctrlKey)
      return setKeyState(false);

    if (altKey !== undefined && altKey !== event.altKey)
      return setKeyState(false);
    
    if (shiftKey !== undefined && shiftKey !== event.shiftKey)
      return setKeyState(false);

    if (metaKey !== undefined && metaKey !== event.metaKey)
      return setKeyState(false);

    updateKeyState(true)
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    }
  }, []);

  return keyState;
}

export type {
  UseKeyOptions
}

export {
  useKey
}
