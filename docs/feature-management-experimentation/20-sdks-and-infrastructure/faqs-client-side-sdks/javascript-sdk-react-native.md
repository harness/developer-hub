---
title: "Running bundle using React Native and JavaScript SDK causes an error. Bundling failed: Error: Unable to resolve module `util`"
sidebar_label: "Running bundle using React Native and JavaScript SDK causes an error. Bundling failed: Error: Unable to resolve module `util`"
sidebar_position: 24
---

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025154551-Running-bundle-using-React-Native-and-JavaScript-SDK-causes-an-error-Bundling-failed-Error-Unable-to-resolve-module-util </button>
</p>

## Issue

### Build environment

react: 16.3.0
react-native: 0.55.0

### Steps to reproduce

When running the bundle, following error occurrs: bundling failed: Error: Unable to resolve module `util` from `D:\\project\node_modules\@splitsoftware\splitio\lib\utils\logger\LoggerFactory.js: Module util does not exist in the Haste module map`

## Answer

JavaScript SDK requires class util as a dependency; however, it's not included in the package.json dependencies, since it comes built-in in most npm packages.

React Native, however, does not have the class "util" by default installation.

Install the class using the command below, this will fix the issue
```
npm install util
```

As of July 29th 2021, our [React Native SDK](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-native-sdk) is available.