---
title: Build a React Native app with the Split Node.js SDK
sidebar_position: 2
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdk-examples/react-native-app-nodejs/
---

## Overview
This [example GitHub repository](https://github.com/splitio/react-native-sdk-example) is a basic example of a React Native app project using the JavaScript SDK. The project demonstrates how to set up and integrate the Split SDK in a React Native environment, using both Expo and React Native CLI workflows.

In addition, the project was bootstrapped with Expo-CLI using its Managed Workflow.

```bash
$ npm install -g expo-cli
$ expo init react-native-sdk-example
$ cd react-native-sdk-example/
$ npm install --save @splitsoftware/splitio # or 'yarn add @splitsoftware/splitio' if using yarn dependency manager
```

Additionally, the SDK can be used with React Native CLI. For more details, see the [React Native documentation](https://reactnative.dev/docs/getting-started.html).

```bash
npm install -g react-native-cli
react-native init ReactNativeSdkExample
cd ReactNativeSdkExample/
npm install --save @splitsoftware/splitio
# or use yarn: yarn add @splitsoftware/splitio
```

When running, you should see a screen like the image below (taken from an Android device):

![](../static/android-example.png)

## Prerequisites

You'll need [Node.js](https://nodejs.org/en/download/). We recommend that you use the latest LTS version.

Second thing you'll need is to install [Expo-CLI](https://expo.io/) with the command `npm install -g expo-cli`.

To run the app, first change the '' string in the App.js file with the browser key of your Split environment. Optionally, you can try a localhost configuration as the example below:

```javascript
const factory = SplitFactory({
    core: {
        authorizationKey: 'localhost',
        key: 'react_native_example'
    },
    features: {
        'Test_Split': 'on',
        'Test_Another_Split': 'dark',
        'Test_Something_Else': 'off'
    }
});
```

Then call `npm install` and `npm start`. If any error rises when trying to run the app in the Android or iOS emulator, consider updating Expo-Cli or reinstalling the Expo app in your emulator.

More information on the available scripts below.

## Available Scripts
If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`
Runs your app in development mode.

Open it in the [Expo app](https://expo.io/) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

### `npm test`
Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

:::note
No test cases have been added since this is an example app. If you're looking for how to test with SDK, you can:

* mock the module import, see Jest documentation for that [here](https://facebook.github.io/jest/docs/en/jest-object.html#jestmockmodulename-factory-options)
* use the localhost (offline) mode of the JavaScript SDK, more information [here](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk#localhost-mode)
:::

### `npm run ios`
Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

### `npm run android`
Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of adb available to Create React Native App:

### Using Android Studio's `adb`
1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

### Using Genymotion's `adb`
1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

### `npm run eject`
This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.