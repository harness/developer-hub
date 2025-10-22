---
title: OpenFeature Provider for Java SDK
sidebar_label: Java OpenFeature Provider
sidebar_position: 3
description: Integrate OpenFeature with Harness FME in your Java applications to evaluate feature flags, manage contexts, and track events using a standardized SDK.
---

## Overview

The <Tooltip id="fme.openfeature.provider">Java OpenFeature Provider</Tooltip> allows your Java applications to integrate with Harness FME using a standardized, vendor-agnostic feature flagging API. This provider implements the OpenFeature specification and bridges the OpenFeature SDK with the Harness FME Java SDK.

This page walks you through installing, configuring, and using the Java OpenFeature provider to evaluate <Tooltip id="fme.openfeature.feature-flag">feature flags</Tooltip> in your Java applications.

### Prerequisites

Before you begin, ensure you have the following:

- A valid [Harness FME SDK key](/docs/feature-management-experimentation/sdks-and-infrastructure/#api-keys) for your project  
- A Java environment running version 11 or later  
- Access to your Maven build configuration

### Version compatibility

| Component                                | Minimum Version |
| ---------------------------------------- | ---------------- |
| Java                                     | 11+              |
| `split-openfeature-provider-java`        | ≥ 1.2.1          |
| OpenFeature Java SDK                     | ≥ 1.0.0          |

## Install the provider and dependencies

Add the Harness FME OpenFeature provider dependency to your Maven build configuration.

```java
<dependency>
    <groupId>io.split.openfeature</groupId>
    <artifactId>split-openfeature-provider</artifactId>
    <version>1.2.1</version>
</dependency>
```

## Initialize the provider

You can instantiate and register the provider using your Harness FME SDK key.

```java
import dev.openfeature.sdk.OpenFeatureAPI;
import io.split.openfeature.SplitProvider;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
api.setProviderAndWait(new SplitProvider("<YOUR_API_KEY>"));
```

Alternatively, if you want more control or need [advanced initialization](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/java-sdk/#configuration), you can create a `SplitClient` and provide it directly:

```java
import dev.openfeature.sdk.OpenFeatureAPI;
import io.split.openfeature.SplitProvider;
import io.split.client.SplitClient;
import io.split.client.SplitClientConfig;
import io.split.client.SplitFactoryBuilder;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();


SplitClientConfig config = SplitClientConfig.builder()
   .setBlockUntilReadyTimeout(10000)
   .build();
SplitClient splitClient = SplitFactoryBuilder.build("<YOUR_API_KEY>", config).client();
api.setProviderAndWait(new SplitProvider(splitClient));
```

## Construct an evaluation context

Use an <Tooltip id="fme.openfeature.evaluation-context">evaluation context</Tooltip> with a <Tooltip id="fme.openfeature.targeting-key">targeting key</Tooltip> to pass attributes used for flag targeting. You can include identifiers such as user IDs, email addresses, plan types, and more.=

For example:

```java
Client client = api.getClient("CLIENT_NAME");

EvaluationContext context = new MutableContext("<TARGETING_KEY>");
Boolean boolValue = client.getBooleanValue("boolFlag", false, context);
```

If the same targeting key is reused across evaluations, set the context at the client or API level:

```java
EvaluationContext context = new MutableContext("<TARGETING_KEY>");
client.setEvaluationContext(context)
```

Or globally:

```java
EvaluationContext context = new MutableContext("<TARGETING_KEY>");
OpenFeatureAPI.getInstance().setEvaluationContext(context)
```

Once the context is set at the client or API level, you don’t need to provide it for each evaluation.

## Evaluate with details

Use the `get*Details(...)` APIs to get flag values and metadata (such as variant, reason, error code, and configuration). The FME treatment configuration is returned as a raw JSON string under `flagMetadata["config"]`.

For example: 

```java
// boolean/string/number/object all have *Details variants:
FlagEvaluationDetails<String> details =
    client.getStringDetails("my-flag", "fallback", ctx);

String jsonConfig = details.getFlagMetadata().getString("config"); // ← Split treatment config
```

## Track events

The FME OpenFeature provider supports tracking user actions or conversion <Tooltip id="fme.openfeature.events">events</Tooltip> directly from your Java application.

To enable event tracking, your evaluation context must include the following:

- A non-empty `targetingKey`
- A `trafficType` (for example, `"user"` or `"account"`)
- A non-blank event name

Optionally, you can include a numeric value and additional event properties.

For example:

```java
MutableContext ctx = new MutableContext("user-123");
ctx.add("trafficType", new Value("user"));

TrackingEventDetails details = new MutableTrackingEventDetails(19.99)
    .add("plan", new Value("pro"))
    .add("coupon", new Value("WELCOME10"));

client.track("checkout.completed", ctx, details);
```

For more information, see the [Harness FME Java OpenFeature Provider GitHub repository](https://github.com/splitio/split-openfeature-provider-java).