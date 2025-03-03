---
title: "Error: Duplicate class FinalizableReferenceQueue$DirectLoader"
sidebar_label: "Error: Duplicate class FinalizableReferenceQueue$DirectLoader"
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to Android SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360043275811-Android-SDK-Duplicate-class-FinalizableReferenceQueue-DirectLoader-in-modules-checkstyle-5-3-all-jar-and-guava-18-0-jars </button>
</p>

## Issue

When compiling the App with Android SDK the error below is reported
```
Duplicate class com.google.common.base.FinalizableReferenceQueue$DirectLoader found in modules checkstyle-5.3-all.jar (checkstyle-5.3-all.jar) and guava-18.0.jar (com.google.guava:guava:18.0)
```

## Root Cause

Split Android SDK has Google guava 18.0 library as a dependency, while Checkstyle 5.3 has dependency on [com.google.collections](https://mvnrepository.com/artifact/com.google.collections) » [google-collections](https://mvnrepository.com/artifact/com.google.collections/google-collections) 1.0 which is an old library and is causing the duplicate error.

## Solution

Upgrade the Checkstyle version to 7.0. It will compile successfully, since that version uses Google guava library instead.