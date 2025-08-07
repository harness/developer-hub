---
title: "Android SDK: Using Kotlin, SDK always returns the control treatment"
sidebar_label: "Android SDK: Using Kotlin, SDK always returns the control treatment"
sidebar_position: 17
---

## Issue

When using Android App with Kotlin language, the code below always returns the control treatment from the Android SDK:

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
Based on the [Advanced Section](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/android-sdk#subscribe-to-events) of Android SDK documentation, we can override onPostExecution function, which will be only called when the `SDK_READY` event fires.

<pre>splitClient.on(SplitEvent.<strong>SDK_READY</strong>, <strong>object </strong>: SplitEventTask() \{<br></br>     <strong>override fun </strong>onPostExecution(client: SplitClient) \{<br></br>         <strong>var </strong>treatment = splitClient.getTreatment(<strong>"split-name"</strong>)<br></br>     \}<br></br>\})</pre>
