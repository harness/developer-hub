---
title: Error building SDK using polymer-cli
sidebar_label: Error building SDK using polymer-cli
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to JavaScript SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360024852412-Building-JavaScript-SDK-using-polymer-cli-cause-error-ENOENT-no-such-file-or-directory </button>
</p>


## Issue

Error building JavaScript SDK using polymer-cli: \"ENOENT: no such file or directory\".

### Build environment

@polymer/polymer: 3.1.0
polymer-cli: 1.9.6

### Steps to reproduce

```
npm i @splitsoftware/splitio@10.6.0
Import via es module: import { SplitFactory } from '@splitsoftware/splitio';
run polymer build
The following error appears:
Error: ENOENT: no such file or directory, open '/Users/[USER_NAME]/projects/[PROJECT_NAME]/frontend/events'
```

## Answer

The way Polymer is performing the build differs significantly from webpack and other bundlers that can recognize the right path for an isomorphic app.
Polymer is trying to load the Node code path of the SDK, which in turn tries to import the events module from NodeJS.

Taking a look to what's on node_modules\@splitsoftware\splitio folder, you'll see a few package.json files with this format:

```json
{
  "main": "./node.js",
  "browser": "./browser.js"
}
```

What we do there is tell NodeJS to just run the Node version of that module (the main field), while we tell bundlers to use the "Browser version".

If the plan is to implement the JS SDK in both server and browser modes, make sure to set the browser and main values to the corresponding js code.