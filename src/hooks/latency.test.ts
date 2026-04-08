import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useLatencyBoundState } from "./latency.js";

describe("useLatencyBoundState", () => {
  it("should update state with latency", async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useLatencyBoundState(false, 500));

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[0]).toBe(true);
  });
});
