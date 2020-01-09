# swork-when

[![npm](https://img.shields.io/npm/v/swork-when)](https://www.npmjs.com/package/swork-when) [![travis ci](https://travis-ci.org/justin-lee-collins/swork-when.svg?branch=master)](https://travis-ci.org/justin-lee-collins/swork-when.svg?branch=master) [![coverage](https://img.shields.io/coveralls/github/justin-lee-collins/swork-when)](https://img.shields.io/coveralls/github/justin-lee-collins/swork-when) [![download](https://img.shields.io/npm/dw/swork-when)](https://img.shields.io/npm/dw/swork-when) [![Greenkeeper badge](https://badges.greenkeeper.io/justin-lee-collins/swork-when.svg)](https://greenkeeper.io/)[![Join the chat at https://gitter.im/swork-chat/community](https://badges.gitter.im/swork-chat/community.svg)](https://gitter.im/swork-chat/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

swork-when is a [swork](https://www.npmjs.com/package/swork) middleware designed to create logical paths conditional upon the incoming request. This allows for incremental branching strategies to reduce redundant conditional checks and overall simplified middleware. It is built with TypeScript and async methods.

**License**

MIT

**Installation**

`npm install swork-when`

`yarn add swork-when`

**Example**

```ts
// sw.ts
import { Swork } from "swork";
import { when } from "swork-when";
import { buildApiSwork } from "./apiSwork";
import { buildNotApiSwork } from "./notApiSwork";

// Define root app
export const app = new Swork();
const api = buildApiSwork();
const notApi = buildNotApiSwork();

// Use api swork app if condition is met
app.use(when((context: FetchContext) => {
    return context.request.headers.get("Accept") === "application/json";
}, api));

// If not an api call
app.use(notApi);

app.listen();
```

In the above example, the service worker conditionally re-routes the logic flow to the api `swork` app whenever the condition is true. Whenever the condition is false, the logic passes over the api logic flow and onto the next middleware.

## Methods

**when** 

```ts
when(predicate: (context: FetchContext) => Promise<boolean> | boolean, app: Swork): Swork
```

Create a conditional branch in the app workflow. If `predicate` returns `true` the provided swork app will execute. If `predicate` returns `false`, the provided swork app is ignored and execution continues.

## Notes

`when` can be used by nested `swork` applications and is encouraged when deep branching strategies are required.

## Contact

If you are using [swork](https://www.npmjs.com/package/swork) or any of its related middlewares, please let me know on [gitter](https://gitter.im/swork-chat/community). I am always looking for feedback or additional middleware ideas.
