---
title: "Error: \"/node_modules/@splitsoftware/splitio/types\"' has no exported member 'SplitIO'"
sidebar_label: "Error: \"/node_modules/@splitsoftware/splitio/types\"' has no exported member 'SplitIO'"
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006667012-Block-traffic-until-the-SDK-is-ready </button>
</p>

## Issue

Using Node.js SDK, when trying to import SplitIO as a namespace in TypeScript:
```javascript
import { SplitIo } from '@splitsoftware/splitio';
```

The following error is thrown:
```
/node_modules/@splitsoftware/splitio/types"' has no exported member 'SplitIO'.
 ```

## Root cause

TypeScript implicitly imports SplitIO namespace when doing `import { SplitFactory } from '@splitsoftware/splitio';`, and even the “typeRoots” config is not affecting it because the declaration file is included in the SDK package and the “types” field is properly configured.

## Answer

You can explicitly import the SplitIO namespace (for example, on modules/files where SplitFactory is not being imported). To achieve this, include the line:
```
import SplitIO from '@splitsoftware/splitio/types/splitio';
```

This requires including `"allowSyntheticDefaultImports": true` in tsconfig.