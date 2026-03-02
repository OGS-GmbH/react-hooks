import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Options for {@link useAxios} hook.
 *
 * @category useAxios
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type UseAxiosOptions = Partial<{
  /**
   * Flag indicating whether the request should be made immediately on hook initialization.
   * @default `false`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  immediate: boolean,
  /**
   * Instance to use for the request.
   * @default `axios`
   *
   * @since 1.0.0
   * @author Simon Kovtyk
   */
  instance: AxiosInstance
}> & AxiosRequestConfig;

/**
 * Cycle of the request in {@link useAxios} hook.
 * Possible is only one state at the time of: `loading`, `error`, `success`, `pending` or `aborted`
 *
 * @category useAxios
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type UseAxiosCycle = "loading" | "error" | "success" | "pending" | "aborted";

/**
 * Fn signature for aborting the request in {@link useAxios} hook.
 *
 * @category useAxios
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type UseAxiosAbortFn = () => void;

/**
 * Fn signature for executing the request in {@link useAxios} hook.
 *
 * It takes the same config as the one passed to the hook, but with higher priority and returns a `Promise` of `AxiosResponse`, that can be handled as thenable.
 * @typeParam TData - Type of the response data.
 * @typeParam TError - Type of the response error.
 *
 * @category useAxios
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type UseAxiosExecuteFn <TData, TError> = (options?: AxiosRequestConfig) => Promise<AxiosResponse<TData, TError>>;

/**
 * Return type of {@link useAxios} hook.
 * @typeParam TData - Type of the response data.
 * @typeParam TError - Type of the response error.
 *
 * @category useAxios
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type UseAxiosReturn <
  TData,
  TError
> = {
  /**
   * Flag indicating whether the request is currently loading. Derived from the {@link UseAxiosReturn.cycle} state.
   */
  isLoading: boolean,
  /**
   * Flag indicating whether the request is currently pending or outstanding. Derived from the {@link UseAxiosReturn.cycle} state.
   */
  isPending: boolean,
  /**
   * Flag indicating whether the request is was aborted. Derived from the {@link UseAxiosReturn.cycle} state.
   *
   * @remarks Aborting the request with a custom `AbortController` signal will not update this flag.
   */
  hasAborted: boolean,
  /**
   * Flag indicating whether the request is finished. Derived from the {@link UseAxiosReturn.cycle} state.
   *
   * @remarks The request is considered finished if it is in either `error`, `success` or `abort` cycle.
   */
  hasFinished: boolean,
  /**
   * Flag indicating whether the request is finished with errors. Derived from the {@link UseAxiosReturn.cycle} state.
   */
  hasError: boolean,
  /**
   * Flag indicating whether the request is finished with success. Derived from the {@link UseAxiosReturn.cycle} state.
   */
  hasSuccess: boolean,
  /**
   * Current cycle of the request.
   * Refer to {@link UseAxiosCycle} for more details on possible cycles and their meaning.
   *
   */
  cycle: UseAxiosCycle,
  /**
   * Abort fn to cancel the request. It will update the cycle to `aborted`.
   */
  abort: UseAxiosAbortFn,
  /**
   * Handler fn to execute the request.
   * Refer to {@link UseAxiosExecuteFn} for more details on the signature of the fn and its behavior.
   */
  execute: UseAxiosExecuteFn<TData, TError>,
} & Partial<AxiosResponse<TData, TError>>;

/**
 * React hook for handling Axios requests with support for request cancellation and state management.
 *
 * Main benefit of this hook is that it abstracts away the logic of handling request states and cancellation, providing a simple interface for making requests and reacting to their state changes.
 *
 * @example
 * ```tsx
 * function MyComponent () {
 *   const {data, isLoading, hasError, execute} = useAxios<{name: string, address: string}, {message: string}>({
 *     method: "get",
 *     url: "/api/user"
 *   })
 *
 *   return (
 *     <>
 *       <p>{data.name}</p>
 *       <p>{data.address}</p>
 *     </>
 *   )
 * }
 * ```
 *
 * @typeParam TData - Type of the response data.
 * @typeParam TError - Type of the response error.
 * @param options - {@link UseAxiosOptions} for the hook, including Axios request config and additional options for controlling the behavior of the hook.
 * @returns An {@link UseAxiosReturn} containing the request state, response data, and handler functions for executing and aborting the request.
 *
 * @category useAxios
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function useAxios <
  TData,
  TError
> ({immediate, instance, ...axiosRequestConfig}: UseAxiosOptions): UseAxiosReturn<TData, TError> {
  const axiosInstance = useRef<AxiosInstance>(instance || axios);
  const [cycle, setCycle] = useState<UseAxiosCycle>("pending");
  const [response, setResponse] = useState<AxiosResponse<TData, TError> | null>(null);
  const isLoading = useMemo(() => cycle === "loading", [cycle]);
  const hasFinished = useMemo(() => (["error", "success", "canceled"] as UseAxiosCycle[]).includes(cycle), [cycle]);
  const hasError = useMemo(() => cycle === "error", [cycle]);
  const hasSuccess = useMemo(() => cycle === "success", [cycle]);
  const isPending = useMemo(() => cycle === "pending", [cycle]);
  const hasAborted = useMemo(() => cycle === "aborted", [cycle]);
  const abortController = useRef(new AbortController());

  function abort (): ReturnType<UseAxiosAbortFn> {
    abortController.current.abort();
    setCycle("aborted");
    abortController.current = new AbortController();
  }

  function execute (executeAxiosRequestConfig?: AxiosRequestConfig): Promise<AxiosResponse<TData, TError>> {
    setCycle("loading");

    const thenableResponse = axiosInstance.current.request<TData>({
      signal: abortController.current.signal,
      ...axiosRequestConfig,
      ...executeAxiosRequestConfig
    });

    thenableResponse.then((thenableInnerResponse) => {
      setCycle("success");
      setResponse(thenableInnerResponse)
    }).catch((thenableInnerResponse) => {
      setCycle("error");
      setResponse(thenableInnerResponse);
    });

    return thenableResponse;
  }

  useEffect(() => {
    if (immediate)
      execute()
  }, [immediate])

  return {
    execute,
    cycle,
    isLoading,
    isPending,
    hasAborted,
    hasFinished,
    hasError,
    hasSuccess,
    abort,
    ...response
  }
}

export type {
  UseAxiosCycle,
  UseAxiosExecuteFn,
  UseAxiosAbortFn,
  UseAxiosOptions,
  UseAxiosReturn
}

export {
  useAxios
}
