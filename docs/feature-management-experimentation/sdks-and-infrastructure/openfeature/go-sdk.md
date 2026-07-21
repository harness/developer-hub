---
title: OpenFeature Provider for Go SDK
sidebar_label: Go OpenFeature Provider
sidebar_position: 10
description: Integrate OpenFeature with Harness FME in your Go applications to evaluate feature flags, manage contexts, and track events using a standardized SDK.
---

Integrate your Go applications with Harness FME using the <Tooltip id="fme.openfeature.provider">Go OpenFeature Provider</Tooltip>, a standardized, vendor-agnostic feature flagging API. This provider implements the OpenFeature specification and bridges the OpenFeature SDK with the Harness FME Go SDK.

This page walks you through installing, configuring, and using the Go OpenFeature provider to evaluate <Tooltip id="fme.feature-management.feature-flag">feature flags</Tooltip> in your Go applications.

## Before you begin

Before you begin, ensure you have the following:

- A valid [Harness FME SDK key](/docs/feature-management-experimentation/sdks-and-infrastructure/#api-keys) for your project
- A Go environment running version 1.21 or later
- Access to your Go module configuration (`go.mod`)

## Version compatibility

| Component                                | Minimum Version |
| ---------------------------------------- | ---------------- |
| Go                                       | 1.21+            |
| `github.com/splitio/split-openfeature-provider-go` | ≥ 2.0.0          |
| OpenFeature Go SDK                       | ≥ 1.0.0          |

## Install the provider and dependencies

Add the Harness FME OpenFeature provider to your Go module.

```bash
go get github.com/splitio/split-openfeature-provider-go
```

## Initialize the provider

You can instantiate and register the provider using your Harness FME SDK key.

```go
import (
    "github.com/open-feature/go-sdk/openfeature"
    splitProvider "github.com/splitio/split-openfeature-provider-go"
)

provider, err := splitProvider.NewProviderSimple("YOUR_SDK_API_KEY")
if err != nil {
    // Provider creation error
}
openfeature.SetProviderAndWait(provider)
```

Alternatively, if you want more control or need [advanced initialization](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/go-sdk/#configuration), you can create a `SplitClient` and provide it directly:

```go
import (
    "github.com/open-feature/go-sdk/openfeature"
    "github.com/splitio/go-client/v6/splitio/client"
    "github.com/splitio/go-client/v6/splitio/conf"
    splitProvider "github.com/splitio/split-openfeature-provider-go"
)

cfg := conf.Default()
factory, err := client.NewSplitFactory("YOUR_SDK_API_KEY", cfg)
if err != nil {
    // SDK initialization error
}

splitClient := factory.Client()
if err := splitClient.BlockUntilReady(10); err != nil {
    // SDK timeout error
}

provider, err := splitProvider.NewProvider(splitClient)
if err != nil {
    // Provider creation error
}
_ = openfeature.SetProviderAndWait(provider)
```

## Construct an evaluation context

Provide an <Tooltip id="fme.openfeature.evaluation-context">evaluation context</Tooltip> with a <Tooltip id="fme.openfeature.targeting-key">targeting key</Tooltip> to evaluate flags. The evaluation context passes targeting information such as user IDs, email addresses, or plan types for flag targeting.

For example:

```go
import "context"

client := openfeature.NewClient("CLIENT_NAME")
ctx := context.Background()

evaluationContext := openfeature.NewEvaluationContext("TARGETING_KEY", nil)
boolValue, err := client.BooleanValue(ctx, "boolFlag", false, evaluationContext)
```

If the same targeting key is reused across evaluations, set the context at the client level:

```go
evaluationContext := openfeature.NewEvaluationContext("TARGETING_KEY", nil)
client.SetEvaluationContext(evaluationContext)
```

Or globally:

```go
evaluationContext := openfeature.NewEvaluationContext("TARGETING_KEY", nil)
openfeature.SetEvaluationContext(evaluationContext)
```

Once the context is set at the client or API level, you don't need to provide it for each evaluation.

## Evaluate with details

Use the `*ValueDetails` APIs to get flag values and metadata (such as variant, reason, error code, and configuration). The FME treatment configuration is returned as a raw JSON string under `FlagMetadata["config"]`.

For example:

```go
details, err := client.StringValueDetails(ctx, "my-flag", "fallback", evalCtx)
if err == nil && details.FlagMetadata != nil {
    if config, ok := details.FlagMetadata["config"].(string); ok {
        // config holds the Split treatment config
    }
}
```

## Track events

The Harness FME OpenFeature provider supports tracking user actions or conversion <Tooltip id="fme.feature-management.event">events</Tooltip> directly from your Go application.

To enable event tracking with `Track(ctx, eventName, evalCtx, details)`, your evaluation context must include the following:

- A non-blank targeting key on the `EvaluationContext`
- A [`trafficType`](/docs/feature-management-experimentation/traffic-types/) attribute (for example, `"user"` or `"account"`)
- A non-blank event name

Optionally, you can include a numeric value and additional event properties using `openfeature.NewTrackingEventDetails(value)` and `.Add(key, value)`. For more information, see [Sending Events](/docs/feature-management-experimentation/api/events/#event-record-fields).

For example:

```go
evalCtx := openfeature.NewEvaluationContext("user-123", map[string]any{"trafficType": "user"})

details := openfeature.NewTrackingEventDetails(19.99).
    Add("plan", "pro").
    Add("coupon", "WELCOME10")

client.Track(ctx, "checkout.completed", evalCtx, details)
```

For more information, go to the [Harness FME Go OpenFeature Provider GitHub repository](https://github.com/splitio/split-openfeature-provider-go).