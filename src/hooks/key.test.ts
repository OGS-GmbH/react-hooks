import { act, fireEvent, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useKey } from "./key.js";

describe("useKey", () => {
  (it("should toggle the state on key press", () => {
    const { result } = renderHook(() =>
      useKey({
        mode: "toggle",
        key: "a",
        ctrlKey: true,
        metaKey: true,
        shiftKey: true
      })
    );

    expect(result.current).toBe(false);

    fireEvent.keyDown(window, {
      key: "a",
      ctrlKey: true,
      metaKey: true,
      shiftKey: true
    });

    expect(result.current).toBe(true);

    fireEvent.keyDown(window, {
      key: "a",
      ctrlKey: true,
      metaKey: true,
      shiftKey: true
    });

    expect(result.current).toBe(false);
  }),
    it("should handle modifier states", () => {
      const { result } = renderHook(() =>
        useKey({
          mode: "toggle",
          key: "CapsLock"
        })
      );

      expect(result.current).toBe(false);

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "CapsLock"
          })
        );
      });

      expect(result.current).toBe(true);

      fireEvent.keyDown(window, {
        key: "CapsLock",
        getModifierState: (key: string) => key === "CapsLock"
      });

      expect(result.current).toBe(false);
    }),
    it("should not toggle the state if the key does not match", () => {
      const { result } = renderHook(() =>
        useKey({
          mode: "toggle",
          key: "a",
          ctrlKey: true,
          metaKey: true,
          shiftKey: true
        })
      );

      expect(result.current).toBe(false);

      fireEvent.keyDown(window, {
        key: "a",
        ctrlKey: true,
        metaKey: false,
        shiftKey: false
      });

      expect(result.current).toBe(false);
    }),
    it("should toggle without key specified", () => {
      const { result } = renderHook(() =>
        useKey({
          mode: "toggle",
          ctrlKey: true
        })
      );

      fireEvent.keyDown(window, {
        ctrlKey: true
      });

      expect(result.current).toBe(true);
    }),
    it("should not toggle by other key", () => {
      const { result } = renderHook(() =>
        useKey({
          mode: "toggle",
          key: "a"
        })
      );

      fireEvent.keyDown(window, {
        key: "b"
      });

      expect(result.current).toBe(false);
    }),
    it("should not toggle by alt key", () => {
      const { result } = renderHook(() =>
        useKey({
          mode: "toggle",
          altKey: true
        })
      );

      fireEvent.keyDown(window, {
        key: "a"
      });

      expect(result.current).toBe(false);
    }),
    it("should not toggle by meta key", () => {
      const { result } = renderHook(() =>
        useKey({
          mode: "toggle",
          metaKey: true
        })
      );

      fireEvent.keyDown(window, {
        key: "a"
      });

      expect(result.current).toBe(false);
    }));
  it("should unmount listeners", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() =>
      useKey({
        mode: "toggle",
        ctrlKey: true
      })
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenLastCalledWith("keydown", expect.any(Function));
  });
});
