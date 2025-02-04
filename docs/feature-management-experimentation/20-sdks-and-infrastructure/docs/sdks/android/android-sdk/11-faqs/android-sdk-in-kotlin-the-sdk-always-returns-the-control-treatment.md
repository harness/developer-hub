---
title: "In Kotlin, the SDK always returns the control treatment"
sidebar_label: "In Kotlin, the SDK always returns the control treatment"
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<!-- applies to Android SDK -->

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360042150571-Android-SDK-Using-Kotlin-SDK-always-returns-control-treatment </button>
</p>

## Issue

When using Android App with Kotlin language, the code below always returns control treatment from Split Android SDK.

```java
val apiKey = "API KEY"
val config = SplitClientConfig.builder().enableDebug().build()
val matchingKey = "userxx"
val bucketKey = null
val key = Key(matchingKey, bucketKey)
val splitFactory = SplitFactoryBuilder.build(apiKey, key, config, applicationContext)
val splitClient = splitFactory.client()

splitClient.on(SplitEvent.SDK_READY, object : SplitEventTask() {
 var treatment = splitClient.getTreatment("split-name")
})
```

## Root Cause

While this code works fine using Swift language based Projects, in Kotlin the code does not listen to the `SDK_READY` event if used as is.

## Solution

Based on the [Advanced Section](https://help.split.io/hc/en-us/articles/360020343291-Android-SDK#advanced-subscribe-to-events) of Android SDK documentation, we can override onPostExecution function, which will be only called when the `SDK_READY` event fires.

<pre>splitClient.on(SplitEvent.<strong>SDK_READY</strong>, <strong>object </strong>: SplitEventTask() \{<br></br>     <strong>override fun </strong>onPostExecution(client: SplitClient) \{<br></br>         <strong>var </strong>treatment = splitClient.getTreatment(<strong>"split-name"</strong>)<br></br>     \}<br></br>\})</pre>