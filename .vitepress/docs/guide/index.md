---
prev: false
next: false
---

# Getting started

## Installation

### Prerequisites

- Node.js version 18 or higher.
- A package manager: e.g. npm, pnpm, ...

::: code-group

```sh [npm]
$ npm add @ogs-gmbh/react-hooks
```

```sh [pnpm]
$ pnpm add @ogs-gmbh/react-hooks
```

```sh [yarn]
$ yarn add @ogs-gmbh/react-hooks
```

```sh [bun]
$ bun add @ogs-gmbh/react-hooks
```

:::

### Usage

We offer various React Hooks. Each React Hook shows its usage and is documented. Please check the list below:

| Hook | Use-Case |
| --- | --- |
| [`useInitialize`](/reference/useInitialize/useInitialize) | Call only on immediate component render, not on subsequent updates |
| [`useKey`](/reference/useKey/useKey) | Detect Key-Events |
| [`useLatencyBoundState`](/reference/useLatencyBoundState/useLatencyBoundState) | Like React's `useState`, but with delay |
| [`useLazyEffect`](/reference/useLazyEffect/useLazyEffect) | Calling the effect only on updates, not on the first render |
| [`useMounted`](/reference/useMounted/useMounted) | Checking if the component is mounted |
| [`useMountedEffect`](/reference/useMountedEffect/useMountedEffect) | Calling the effect only when the component is mounted |
| [`useMountedState`](/reference/useMountedState/useMountedState) | Checking if the component is mounted |
| [`usePreviousState`](/reference/usePreviousState/usePreviousState) | Getting the previous state value |
| [`usePromise`](/reference/usePromise/usePromise) | Handling promises |
