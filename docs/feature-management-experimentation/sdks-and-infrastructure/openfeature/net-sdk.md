---
title: OpenFeature Provider for .NET SDK
sidebar_label: .NET OpenFeature Provider
sidebar_position: 9
description: Integrate OpenFeature with Harness FME in your .NET applications to evaluate feature flags, manage contexts, and track events using a standardized SDK.
---

Integrate your .NET applications with Harness FME using the <Tooltip id="fme.openfeature.provider">.NET OpenFeature Provider</Tooltip>, a standardized, vendor-agnostic feature flagging API. This provider implements the OpenFeature specification and bridges the OpenFeature SDK with the Harness FME .NET SDK.

This page walks you through installing, configuring, and using the .NET OpenFeature provider to evaluate <Tooltip id="fme.openfeature.feature-flag">feature flags</Tooltip> in your .NET applications.

### Prerequisites

Before you begin, ensure you have the following:

- A valid [Harness FME SDK key](/docs/feature-management-experimentation/sdks-and-infrastructure/#api-keys) for your project  
- A .NET 6.0+ environment  
- Access to your project file to install NuGet dependencies  

### Version compatibility

| Component                                | Minimum Version |
| ---------------------------------------- | ---------------- |
| .NET Runtime                             | 6.0+             |
| `@splitsoftware/split-openfeature-provider-dotnet` | ≥ 1.0.0    |
| OpenFeature .NET SDK                  | ≥ 1.0.0          |

## Install the provider and dependencies

Install the Harness FME OpenFeature provider from [NuGet](https://www.nuget.org/packages/Splitio.OpenFeature.Provider/):

```bash
dotnet add package Splitio.OpenFeature.Provider
```

## Initialize the provider

You can register the provider with OpenFeature by initializing using an SDK key directly or providing a pre-configured Split client.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="initialize-provider-selection">
<TabItem value="sdk" label="SDK API Key">

If you are using an SDK API key:

```csharp
using OpenFeature;
using Splitio.OpenFeature.Provider;

Api api = OpenFeature.Api.Instance;
api.setProviderAsync(new Provider("<YOUR_SDK_API_KEY>"));
```

</TabItem>
<TabItem value="factory" label="Split Factory (Recommended)">

If you are using a Split Factory: 

```csharp
using OpenFeature;
using Splitio.OpenFeature.Provider;
using Splitio.Services.Client.Classes

Api api = OpenFeature.Api.Instance;

var config = new ConfigurationOptions
{
   Ready = 10000
};
var splitClient = new SplitFactory("<YOUR_SDK_API_KEY>", config).Client();
api.SetProviderAsync(new Provider(splitClient));
```

Using a configured `SplitFactory` is recommended for production systems since it allows customization of timeouts, impressions mode, and additional behavior.

</TabItem>
</Tabs>

## Construct an evaluation context

Provide an <Tooltip id="fme.openfeature.evaluation-context">evaluation context</Tooltip> with a <Tooltip id="fme.openfeature.targeting-key">targeting key</Tooltip> to evaluate flags. The evaluation context passes targeting information such as user IDs, email addresses, or plan types for flag targeting.

For example:

```csharp
var context = EvaluationContext.Builder()
   .Set("targetingKey", "randomKey")
   .Build();

var result = await client.GetBooleanValueAsync("boolFlag", false, context);
```

If the same targeting key is reused across evaluations, set the context at the client level:

```csharp
client.SetContext(context)
```

Or at the API level: 

```csharp
api.setEvaluationContext(context)
```

Once the context is set at the client or API level, you don't need to provide it for each evaluation.

For more information, go to the [Harness FME .NET OpenFeature Provider GitHub repository](https://github.com/splitio/split-openfeature-provider-dotnet).