---
title: OpenFeature Provider for Android SDK
sidebar_label: Android OpenFeature Provider
sidebar_position: 1
description: Integrate OpenFeature with Harness FME in your Android applications to evaluate feature flags, manage contexts, and track events using a standardized SDK.
---

Integrate your Android applications with Harness FME using the <Tooltip id="fme.openfeature.provider">Android OpenFeature Provider</Tooltip>, a standardized, vendor-agnostic feature flagging API. This provider implements the OpenFeature specification and bridges the OpenFeature SDK with the Harness FME Android SDK.

This page walks you through installing, configuring, and using the Android OpenFeature provider to evaluate <Tooltip id="fme.openfeature.feature-flag">feature flags</Tooltip> in your Android applications.

### Prerequisites

Before you begin, ensure you have the following:

- A valid [Harness FME SDK key](/docs/feature-management-experimentation/sdks-and-infrastructure/#api-keys) for your project
- An Android project targeting API Level 21 (Android 5.0 Lollipop) or later
- Access to your project's `build.gradle` or `build.gradle.kts` file to add the provider dependency

### Version compatibility

| Component                         | Minimum Version                     |
| --------------------------------- | ----------------------------------- |
| Android                           | API Level 21 (Android 5.0 Lollipop) |
| `@splitsoftware/split-openfeature-provider-android` | ≥ 1.0.0                          |
| OpenFeature Kotlin SDK            | ≥ 0.7.0                             |

## Install the provider and dependencies

Add the Harness FME OpenFeature provider dependency to your application's `build.gradle.kts` file.

```kotlin
dependencies {
    implementation("io.split.openfeature:split-openfeature-android:1.0.0")
}
```

Or, if you're using the Groovy DSL (`build.gradle`):

```groovy
dependencies {
    implementation 'io.split.openfeature:split-openfeature-android:1.0.0'
}
```

## Initialize the provider

The Harness FME OpenFeature provider requires an Android application `Context` (for SDK initialization) and your Harness FME SDK Key. 

```kotlin
import dev.openfeature.kotlin.sdk.OpenFeatureAPI
import dev.openfeature.kotlin.sdk.ImmutableContext
import io.split.openfeature.android.provider.SplitProvider

// Create provider configuration
val config = SplitProvider.Config(
    applicationContext = applicationContext,
    sdkKey = "YOUR_SDK_KEY"
)

// Create the FME provider
val provider = SplitProvider(config = config)

// Set the provider with an initial context containing a targeting key
val initialContext = ImmutableContext(targetingKey = "user-123")
OpenFeatureAPI.setProvider(provider, initialContext = initialContext)

// Get a client and evaluate flags
val client = OpenFeatureAPI.getClient()
val showNewFeature = client.getBooleanValue("new-feature", false)
```

## Construct an evaluation context

Provide an <Tooltip id="fme.openfeature.evaluation-context">evaluation context</Tooltip> with a <Tooltip id="fme.openfeature.targeting-key">targeting key</Tooltip> to evaluate flags. The evaluation context passes targeting information such as user IDs, email addresses, or plan types for flag targeting.

For example:

```kotlin
val context = ImmutableContext(
    targetingKey = "user-123",
    attributes = mapOf(
        "email" to Value.String("user@example.com"),
        "age" to Value.Integer(30),
        "plan" to Value.String("premium")
    )
)

val client = OpenFeatureAPI.getClient()
val result = client.getBooleanDetails("premium-feature", false, context)
```

To set a targeting key during initialization: 

```kotlin
val initialContext = ImmutableContext(targetingKey = "user-123")
OpenFeatureAPI.setProvider(provider, initialContext = initialContext)
```

To change a targeting key at runtime:

```kotlin
val newContext = ImmutableContext(targetingKey = "user-456")
OpenFeatureAPI.setEvaluationContext(newContext)
```

## Observe provider events

The Harness FME OpenFeature provider emits <Tooltip id="fme.openfeature.events">events</Tooltip> when provider state changes (for example, when flags update, configuration changes, or errors) occur. You can observe these events to update your application's behavior in real time.

You can enable your application to:

- Refresh feature-dependent UI when flags change
- Gracefully handle degraded states (i.e., when the provider becomes stale)
- Log or alert on configuration or network issues
- Control initialization flows based on provider readiness

For example: 

```kotlin
import dev.openfeature.kotlin.sdk.events.OpenFeatureProviderEvents
import kotlinx.coroutines.launch

// Observe provider events
lifecycleScope.launch {
    provider.observe().collect { event ->
        when (event) {
            is OpenFeatureProviderEvents.ProviderReady -> {
                // Provider is ready to evaluate flags
                Log.d("Split", "Provider is ready")
            }
            is OpenFeatureProviderEvents.ProviderConfigurationChanged -> {
                // Flag configuration has been updated
                Log.d("Split", "Configuration changed")
            }
            is OpenFeatureProviderEvents.ProviderStale -> {
                // Provider is serving cached data
                Log.d("Split", "Provider is stale")
            }
            is OpenFeatureProviderEvents.ProviderError -> {
                // An error occurred
                Log.e("Split", "Provider error: ${event.error}")
            }
        }
    }
}
```

## Track events

The Harness FME OpenFeature provider supports tracking user actions or conversion <Tooltip id="fme.openfeature.events">events</Tooltip> directly from your Android application. 

To enable event tracking, your evaluation context must include the following:

- A non-empty `targetingKey`
- A [`TrafficType`](/docs/feature-management-experimentation/traffic-types/) (for example, `"user"` or `"account"`)
- A non-blank event name

Optionally, you can include:

Optionally, you can include a numeric value (defaults to 0) and additional event properties (prefers primitives such as string, number, boolean, or null). For more information, see [Sending Events](/docs/feature-management-experimentation/api/events/#event-record-fields).

```kotlin
// Set context with trafficType
val context = ImmutableContext(targetingKey = "user-123")
    .withTrafficType("user")

OpenFeatureAPI.setEvaluationContext(context)

// Track an event
val client = OpenFeatureAPI.getClient()
client.track("button_clicked")

// Track with a value
client.track(
    "purchase_completed",
    TrackingEventDetails(value = 99.99)
)

// Track with properties
client.track(
    "page_viewed",
    TrackingEventDetails(
        structure = ImmutableStructure(
            mapOf(
                "page" to Value.String("home"),
                "referrer" to Value.String("google")
            )
        )
    )
)
```

For more information, go to the [Harness FME Android OpenFeature Provider GitHub repository](https://github.com/splitio/split-openfeature-provider-android/).