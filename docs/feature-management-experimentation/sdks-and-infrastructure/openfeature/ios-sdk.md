---
title: OpenFeature Provider for iOS SDK
sidebar_label: iOS OpenFeature Provider
sidebar_position: 2
description: Integrate OpenFeature with Harness FME in your iOS applications to evaluate feature flags, manage contexts, and track events using a standardized SDK.
---

Integrate your iOS applications with Harness FME using the <Tooltip id="fme.openfeature.provider">iOS OpenFeature Provider</Tooltip>, a standardized, vendor-agnostic feature flagging API. This provider implements the OpenFeature specification and bridges the OpenFeature SDK with the Harness FME iOS SDK.

This page walks you through installing, configuring, and using the iOS OpenFeature provider to evaluate <Tooltip id="fme.openfeature.feature-flag">feature flags</Tooltip> in your iOS applications.

### Prerequisites

Before you begin, ensure you have the following:

- A valid [Harness FME SDK key](/docs/feature-management-experimentation/sdks-and-infrastructure/#api-keys) for your project
- An iOS project (Xcode 14+)
- Access to your project's `Package.swift` file or Xcode project to add the provider dependency

### Version compatibility

| Component                         | Minimum Version                     |
| --------------------------------- | ----------------------------------- |
| iOS                           | ≥ 14 |
| `@splitsoftware/split-openfeature-provider-swift` | ≥ 1.0.0                          |
| OpenFeature Swift SDK            | ≥ 0.4.0                            |

## Install the provider and dependencies

Add the Harness FME OpenFeature provider dependency to your application's Xcode project using Swift Package Manager.

```swift
.package(url: "https://github.com/splitio/split-openfeature-provider-swift", from: "1.0.0")
```

## Initialize the provider

The Harness FME OpenFeature provider requires an iOS application `Context` (for SDK initialization) and your Harness FME SDK Key. 

```swift
import Split
import Combine
import OpenFeature
import SplitProvider

Task {

    var providerCancellable: AnyCancellable?
    let provider = SplitProvider(key: "API_KEY")
    
    // Setup events observer
    providerCancellable = OpenFeatureAPI.shared.observe().sink { [weak self] event in
        switch event {
            case .ready:
                print("Split Provider is ready")
            case .error(let message):
                print("Split Provider error:", message)
            default:
                break
        }
    }
    
    // Setup OpenFeature with initial context
    let context = ImmutableContext(targetingKey: "user_key")
    await OpenFeatureAPI.shared.setProviderAndWait(provider: provider, initialContext: context)
    
    // Get a client and evaluate a flag
    let client = OpenFeatureAPI.getClient()
    let flagEvaluationResult = client.getBooleanValue("new-feature", false)
}
```

## Construct an evaluation context

Provide an <Tooltip id="fme.openfeature.evaluation-context">evaluation context</Tooltip> with a <Tooltip id="fme.openfeature.targeting-key">targeting key</Tooltip> to evaluate flags. The evaluation context passes targeting information such as user IDs, email addresses, or plan types for flag targeting.

For example:

```swift
let context = ImmutableContext(
    targetingKey: "martin", 
    structure: ImmutableStructure(attributes: [ 
        "email": Value.String(someValue),
        "age": Value.Integer(30)
]))
OpenFeatureAPI.shared.setEvaluationContext(evaluationContext: context)

let client = OpenFeatureAPI.getClient()
let result = client.getBooleanDetails("premium-feature", false, context)
```

To set a targeting key during initialization: 

```swift
let initialContext = ImmutableContext(targetingKey = "user-123")
OpenFeatureAPI.setProvider(provider, initialContext = initialContext)
```

To change a targeting key at runtime:

```swift
let newContext = ImmutableContext(targetingKey = "user-456")
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

```swift
import Combine

let cancellable = OpenFeatureAPI.shared.observe().sink { event in
    switch event {
    case ProviderEvent.ready:
        // Provider ready
    case ProviderEvent.stale:
        // Provider stale
    case ProviderEvent.configurationChanges:
        // Configuration changed
    case ProviderEvent.contextChanged:
        // Context updated
    case ProviderEvent.error(let errorCode, let message):
        // Handle error
    default:
        break
    }
}
```

For more information, go to the [Harness FME iOS OpenFeature Provider GitHub repository](https://github.com/splitio/split-openfeature-provider-swift/).