---
title: "Error building React app with webpack: Entrypoint undefined"
sidebar_label: "Error building React app with webpack: Entrypoint undefined"
helpdocs_is_private: false
helpdocs_is_published: true
---

<!-- applies to React SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360047190132-React-SDK-Error-building-app-with-webpack-Entrypoint-undefined-ng-index-html </button>
</p>

## Issue

React App failed to build using Webpack after installing React SDK:

```
1 asset
Entrypoint undefined = ng/admin_index.html
[./node_modules/html-webpack-plugin/lib/loader.js!./admin_index.html] 1.89 KiB {0} [built]
[./node_modules/html-webpack-plugin/node_modules/lodash/lodash.js] 527 KiB {0} [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {0} [built]
Child html-webpack-plugin for "ng\index.html":
1 asset
Entrypoint undefined = ng/index.html
[./node_modules/html-webpack-plugin/lib/loader.js!./index.html] 1.91 KiB {0} [built]
[./node_modules/html-webpack-plugin/node_modules/lodash/lodash.js] 527 KiB {0} [built]
[./node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {0} [built]
[./node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {0} [built]
i ?wdm?: Failed to compile.
```

## Root Cause

Webpack is trying to build the React SDK library into the server side, which will cause errors since React SDK is designed to run only on browser side. 

Answer
To resolve the issue, open `webpack.config.js` file, locate the resolve section, make sure the `mainFields` entry contain `browser` similar to this example:
```json
resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
      mainFields: ['browser', 'main', 'module']
    },
```