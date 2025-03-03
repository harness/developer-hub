---
title: "Does the SDK use SharedPreferences to store the Split cache?"
sidebar_label: "Does the SDK use SharedPreferences to store the Split cache?"
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to Android SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025324672-Android-SDK-Does-the-SDK-utilize-the-SharedPreferences-on-the-device-to-store-the-Split-cache </button>
</p>

## Question
Does the Android SDK use SharedPreferences on the device to store the Split cache?

## Answer
The Android SDK does not use the device SharedPreferences. It stores the Split cache directly on internal storage, in the application's context folder.