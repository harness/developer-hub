---
title: Error running bundle using React Native and JavaScript SDK
sidebar_label: Error running bundle using React Native and JavaScript SDK
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to JavaScript SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025154551-Running-bundle-using-React-Native-and-JavaScript-SDK-causes-an-error-Bundling-failed-Error-Unable-to-resolve-module-util </button>
</p>

## Issue

Running bundle using React Native and JavaScript SDK causes an error. Bundling failed: Error: Unable to resolve module \`util\`.

### Build environment

react: 16.3.0
react-native: 0.55.0

### Steps to reproduce

When running the bundle, following error occurrs: 
```
bundling failed: Error: Unable to resolve module `util` from
 `D:\\project\node_modules\@splitsoftware\splitio\lib\utils\logger\LoggerFactory.js:
 Module util does not exist in the Haste module map`
```

## Answer

JavaScript SDK requires class util as a dependency; however, it's not included in the package.json dependencies, since it comes built-in in most npm packages.

React Native, however, does not have the class "util" by default installation.

Install the class using the command below, this will fix the issue
```
npm install util
```

As of July 29th 2021, our [React Native SDK](https://help.split.io/hc/en-us/articles/4406066357901-React-Native-SDK) is available.