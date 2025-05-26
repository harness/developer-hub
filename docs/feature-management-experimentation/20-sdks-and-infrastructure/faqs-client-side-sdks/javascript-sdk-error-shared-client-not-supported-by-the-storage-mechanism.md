---
title: "JavaScript SDK Error: \"Shared Client not supported by the storage mechanism. Create isolated instances instead\""
sidebar_label: "JavaScript SDK Error: \"Shared Client not supported by the storage mechanism. Create isolated instances instead\""
sidebar_position: 20
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360034151511-JavaScript-SDK-Error-Shared-Client-not-supported-by-the-storage-mechanism-Create-isolated-instances-instead </button>
</p>

## Issue

When testing JavaScript SDK browser mode using Jest, it fails with the following error:

Shared Client not supported by the storage mechanism. Create isolated instances in stead

## Root cause

When using Jest for testing applications, Jest runs in Node.js by default, and Node.js does not support shared clients, which is why it detects the storage does not have that function.
It is not possible to overwrite that method from the outside.

## Solution

You can instruct Jest to explicitly resolve to browser by setting the config in jest options. For example, when using package.json we can add the flag:
```
{
   "name": "MYAPP",
   "version": "X.X.X",
   ....
   "jest": {
      "browser": true
   }
   ...
}
```

See the [Jest documentation](https://jestjs.io/docs/en/configuration#browser-boolean) for more information.