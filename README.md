> *We're OGS, check out our work on [github.com/ogs-gmbh](https://github.com/ogs-gmbh)*

# React Hooks

*Composable Hooks for React applications.*

![Preview](./docs/preview.avif)

<a href="./LICENSE" target="_blank"><img src="https://img.shields.io/github/license/OGS-GmbH/react-hooks?color=0f434e&logo=hackthebox&logoColor=000000&labelColor=ffffff" /></a>
<a href="https://github.com/OGS-GmbH/react-hooks/actions/workflows/main-deploy.yml" target="_blank"><img src="https://img.shields.io/github/actions/workflow/status/OGS-GmbH/react-hooks/main-deploy.yml?color=0f434e&logo=rocket&logoColor=000000&labelColor=ffffff" /></a>
<a href="https://www.npmjs.com/package/@ogs-gmbh/react-hooks" target="_blank"><img src="https://img.shields.io/npm/v/%40ogs-gmbh%2Freact-hooks?color=0f434e&logo=npm&logoColor=000000&labelColor=ffffff" /></a>

- **Easy to Set Up**\
  Simple configuration lets you use our hooks quickly.

- **Hooks for everyone's needs**\
  Extensive collection of React hooks

- **Type-Safe Integration**\
  Fully compatible with TypeScript.

- **Composable and Scalable**\
  Designed for composability, allowing hooks to be combined seamlessly.

## Getting Started

> [!IMPORTANT]
> We're offering an extensive API-Reference covered with in-depth usage examples of this project.

To get a starting point, simply refer to our documentation at [ogs-gmbh.github.io/react-hooks](https://ogs-gmbh.github.io/react-hooks).

## Prerequisites

- Node.js version 18 or higher
- A package manager: e.g. npm, pnpm, ...

## Installation

Using npm:
```sh
$ npm install @ogs-gmbh/react-hooks
```

<details>
  <summary>Using a different package managers?</summary>
  <br/>
  
  Using yarn:
  ```sh
  $ pnpm add @ogs-gmbh/react-hooks
  ```
  
  Using pnpm:
  ```sh
  $ pnpm add @ogs-gmbh/react-hooks
  ```
  
  Using bun:
  ```sh
  $ bun add @ogs-gmbh/react-hooks
  ```

</details>

### Usage

We offer various React Hooks. Each React Hook shows its usage and is documented. Please check the list below:

| Hook | Use-Case |
| --- | --- |
| [`useAxios`](https://ogs-gmbh.github.io/react-hooks/reference/useAxios/useAxios) | Handling Axios requests |
| [`useInitialize`](https://ogs-gmbh.github.io/react-hooks/reference/useInitialize/useInitialize) | Call only on immediate component render, not on subsequent updates |
| [`useKey`](https://ogs-gmbh.github.io/react-hooks/reference/useKey/useKey) | Detect Key-Events |
| [`useLatencyBoundState`](https://ogs-gmbh.github.io/react-hooks/reference/useLatencyBoundState/useLatencyBoundState) | Like React's `useState`, but with delay |
| [`useLazyEffect`](https://ogs-gmbh.github.io/react-hooks/reference/useLazyEffect/useLazyEffect) | Calling the effect only on updates, not on the first render |
| [`useMounted`](https://ogs-gmbh.github.io/react-hooks/reference/useMounted/useMounted) | Checking if the component is mounted |
| [`useMountedEffect`](https://ogs-gmbh.github.io/react-hooks/reference/useMountedEffect/useMountedEffect) | Calling the effect only when the component is mounted |
| [`useMountedState`](https://ogs-gmbh.github.io/react-hooks/reference/useMountedState/useMountedState) | Checking if the component is mounted |
| [`usePreviousState`](https://ogs-gmbh.github.io/react-hooks/reference/usePreviousState/usePreviousState) | Getting the previous state value |
| [`usePromise`](https://ogs-gmbh.github.io/react-hooks/reference/usePromise/usePromise) | Handling promises |

## License

The MIT License (MIT) - Please have a look at the [LICENSE file](./LICENSE) for more details.

## Contributing
Contributions are always welcome and greatly appreciated. Whether you want to report a bug, suggest a new feature, or improve the documentation, your input helps make the project better for everyone.

Feel free to submit a pull request, issue or feature request.

### Issues and Feature Requests
Reporting an issue or creating a feature request is made by creating a new issue on this repository.

You can create a [new issue or feature request here](../../issues/new/choose).

### Pull Requests
GitHub offers a solid guideline for contributing to open source projects through pull requests, covering key practices. These best practices provide a reliable starting point for making effective contributions.

You can find the [guidelines here](https://docs.github.com/get-started/exploring-projects-on-github/contributing-to-a-project).

### Code Of Conduct
We are committed to keeping a welcoming, inclusive, and respectful community for everyone. To help us achieve this, we kindly ask that you adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Disclaimer

All trademarks and registered trademarks mentioned are property of their respective owners and are used for identification purposes only. Use of these names does not imply endorsement or affiliation.

This project is a trademark of OGS Gesellschaft für Datenverarbeitung und Systemberatung mbH. The License does not grant rights to use the trademark without permission.

---

<a href="https://www.ogs.de/en/">
  <picture>
    <source
      srcset="https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.0.0/docs/assets/logo/light.svg"
      media="(prefers-color-scheme: dark)"
    />
    <img height="64" alt="OGS Logo" src="https://raw.githubusercontent.com/OGS-GmbH/.github/refs/tags/v1.0.0/docs/assets/logo/dark.svg"
  </picture>
</a>

Gesellschaft für Datenverarbeitung und Systemberatung mbH

[Imprint](https://www.ogs.de/en/imprint/) | [Contact](https://www.ogs.de/en/contact/) | [Careers](https://www.ogs.de/en/about-ogs/#Careers)
