---
title: "Android SDK: Does the SDK use SharedPreferences on the device to store the FME cache?"
sidebar_label: "Android SDK: Does the SDK use SharedPreferences on the device to store the FME cache?"
sidebar_position: 23
---

## Question
Does the Android SDK utilize the SharedPreferences on the device to store the FME cache?

## Answer
The Android SDK does not use the device SharedPreferences. It stores the FME cache directly on internal storage, in the application's context folder.