---
title: "Android SDK: Does the SDK use SharedPreferences on the device to store the FME cache?"
sidebar_label: "Android SDK: Does the SDK use SharedPreferences on the device to store the FME cache?"
sidebar_position: 23
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025324672-Android-SDK-Does-the-SDK-utilize-the-SharedPreferences-on-the-device-to-store-the-Split-cache </button>
</p>

## Question
Does the Android SDK utilize the SharedPreferences on the device to store the FME cache?

## Answer
The Android SDK does not use the device SharedPreferences. It stores the FME cache directly on internal storage, in the application's context folder.