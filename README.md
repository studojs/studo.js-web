# studo.js web

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL-blue.svg)](https://opensource.org/licenses/GPL-3.0)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8c712ba1-b993-4ef3-bb80-181d627c6dbf/deploy-status)](https://app.netlify.com/sites/studojs/deploys)

A web interface for the studo chat (and more in the future).

Based on https://github.com/studojs/studo.js

## Screenshot

![Screenshot Chat](./screenshot.png?raw=true 'Optional Title')

## FAQ

- Why
  - Being able to use it on a PC
  - Trackers in the app: https://reports.exodus-privacy.eu.org/en/reports/com.moshbit.studo/latest
- Privacy
  - No tracking/ads
  - Only the settings and session token are saved locally
  - Public netlify deploy logs
- Proxy
  - A [serverless function](./api/proxy.ts) is used to interact with the studo API without running into CORS issues.
  - All other connections go directly to their servers

## Development

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

Setup:

```js
npm install
```

Start dev server:

```sh
npm run netlify
```

Build:

```sh
npm run build
```

Preview build:

```sh
npm run serve
```
