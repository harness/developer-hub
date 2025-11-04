---
title: OpenFeature Provider for Node.js SDK
sidebar_label: Node.js OpenFeature Provider
sidebar_position: 5
description: Integrate OpenFeature with Harness FME in your Node.js applications to evaluate feature flags, manage contexts, and track events using a standardized SDK.
---

Integrate your Node.js applications with Harness FME using the <Tooltip id="fme.openfeature.provider">Node.js OpenFeature Provider</Tooltip>, a standardized, vendor-agnostic feature flagging API. This provider implements the OpenFeature specification and bridges the OpenFeature SDK with the Harness FME Node.js SDK.

This page walks you through installing, configuring, and using the Node.js OpenFeature provider to evaluate <Tooltip id="fme.openfeature.feature-flag">feature flags</Tooltip> in your Node.js applications.

### Prerequisites

Before you begin, ensure you have the following:

- A valid [Harness FME SDK key](/docs/feature-management-experimentation/sdks-and-infrastructure/#api-keys) for your project  
- A Node.js environment running version 14.x or later  
- Access to `npm` or `yarn` to install dependencies  

### Version compatibility

| Component                                | Minimum Version |
| ---------------------------------------- | ---------------- |
| Node.js                                  | 14.x+            |
| `@splitsoftware/openfeature-js-split-provider` | ≥ 1.0.0    |
| OpenFeature Node.js SDK                  | ≥ 1.0.0          |

## Install the provider and dependencies

Install the Harness FME OpenFeature provider and required peer dependencies:

```bash
npm install @splitsoftware/openfeature-js-split-provider
npm install @splitsoftware/splitio
npm install @openfeature/server-sdk
```

## Initialize the provider

You can register the provider with OpenFeature in one of several ways, depending on your setup.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="initialize-provider-selection">
<TabItem value="sdk" label="SDK API Key">

If you are using an SDK API key:

```javascript
const OpenFeature = require('@openfeature/server-sdk').OpenFeature;
const OpenFeatureSplitProvider = require('@splitsoftware/openfeature-js-split-provider').OpenFeatureSplitProvider;

const authorizationKey = '<YOUR_SERVER_SIDE_SDK_KEY>'
const provider = new OpenFeatureSplitProvider(authorizationKey);
OpenFeature.setProvider(provider);
```

</TabItem>
<TabItem value="factory" label="Split Factory (Recommended)">

If you are using a Split Factory: 

```javascript
const OpenFeature = require('@openfeature/server-sdk').OpenFeature;
const SplitFactory = require('@splitsoftware/splitio').SplitFactory;
const OpenFeatureSplitProvider = require('@splitsoftware/openfeature-js-split-provider').OpenFeatureSplitProvider;

const authorizationKey = '<YOUR_SERVER_SIDE_SDK_KEY>'
const splitFactory = SplitFactory({core: {authorizationKey}});
const provider = new OpenFeatureSplitProvider(splitFactory);
OpenFeature.setProvider(provider);
```

</TabItem>
<TabItem value="client" label="Split Client (Legacy)">

If you are using a Split client directly (not recommended for new implementations):

```javascript
const OpenFeature = require('@openfeature/server-sdk').OpenFeature;
const SplitFactory = require('@splitsoftware/splitio').SplitFactory;
const OpenFeatureSplitProvider = require('@splitsoftware/openfeature-js-split-provider').OpenFeatureSplitProvider;

const splitFactory = SplitFactory({
  core: {
    authorizationKey: '<YOUR_SERVER_SIDE_SDK_KEY>'
  }
});
const provider = new OpenFeatureSplitProvider(splitFactory);
OpenFeature.setProvider(provider);
```

:::info
The recommended approach is to pass the `splitFactory` instance instead of a splitClient. This ensures consistency with the JS Web Provider and allows future access to additional `splitFactory` features beyond the client itself.
:::

</TabItem>
</Tabs>

## Construct an evaluation context

Provide an <Tooltip id="fme.openfeature.evaluation-context">evaluation context</Tooltip> with a <Tooltip id="fme.openfeature.targeting-key">targeting key</Tooltip> to evaluate flags. The evaluation context passes targeting information such as user IDs, email addresses, or plan types for flag targeting.

For example:

```javascript
const client = openFeature.getClient('<CLIENT_NAME>');

const context: EvaluationContext = {
  targetingKey: '<TARGETING_KEY>',
};
const boolValue = await client.getBooleanValue('boolFlag', false, context);
```

If the same targeting key is reused across evaluations, set the context at the client level:

```javascript
const context: EvaluationContext = {
  targetingKey: '<TARGETING_KEY>',
};
client.setEvaluationContext(context)
```

Or at the API level: 

```javascript
const context: EvaluationContext = {
  targetingKey: '<TARGETING_KEY>',
};
OpenFeatureAPI.getInstance().setCtx(context)
```

Once the context is set at the client or API level, you don't need to provide it for each evaluation.

## Evaluate with details

Use the `get*Details(...)` APIs to get flag values and metadata (such as variant, reason, error code, and configuration). The FME treatment configuration is returned as a raw JSON string under `flagMetadata["config"]`.

For example: 

```javascript
const booleanTreatment = await client.getBooleanDetails('boolFlag', false, context);
const config = booleanTreatment.flagMetadata.config
```

## Track events

The Harness FME OpenFeature provider supports tracking user actions or conversion <Tooltip id="fme.openfeature.events">events</Tooltip> directly from your Node.js application.

To enable event tracking, your evaluation context must include the following:

- A non-empty `targetingKey`
- A [`trafficType`](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/) (for example, `"user"` or `"account"`)
- A non-blank event name

Optionally, you can include a numeric value (defaults to 0) and additional event properties (prefers primitives such as string, number, boolean, or null). For more information, see [Sending Events](/docs/feature-management-experimentation/api/events/#event-record-fields).

For example:

```javascript
const context = { targetingKey: 'user-123', trafficType: 'account' }
const details = { value: 19.99, plan: 'pro', coupon: 'WELCOME10' }

client.track('checkout.completed', context, details)
```

For more information, go to the [Harness FME Node.js OpenFeature Provider GitHub repository](https://github.com/splitio/split-openfeature-provider-js).