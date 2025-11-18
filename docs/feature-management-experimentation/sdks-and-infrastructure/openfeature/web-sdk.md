---
title: OpenFeature Provider for Web SDK
sidebar_label: Web OpenFeature Provider
sidebar_position: 3
description: Integrate OpenFeature with Harness FME in your web applications to evaluate feature flags, manage contexts, and track events using a standardized SDK.
---

Integrate your web applications with Harness FME using the <Tooltip id="fme.openfeature.provider">Web OpenFeature Provider</Tooltip>, a standardized, vendor-agnostic feature flagging API. This provider implements the OpenFeature specification and bridges the OpenFeature SDK with the Harness FME Browser SDK.

This page walks you through installing, configuring, and using the Web OpenFeature provider to evaluate <Tooltip id="fme.openfeature.feature-flag">feature flags</Tooltip> in your web applications.

### Prerequisites

Before you begin, ensure you have the following:

- A valid [Harness FME SDK key](/docs/feature-management-experimentation/sdks-and-infrastructure/#api-keys) for your project  
- A modern browser environment that supports ES6 modules  
- Access to `npm` or `yarn` to install dependencies  

### Version compatibility

| Component                                      | Minimum Version |
| ---------------------------------------------- | ---------------- |
| Browser SDK (`@splitsoftware/splitio-browserjs`) | ≥ 1.0.0        |
| `@splitsoftware/openfeature-web-split-provider`  | ≥ 1.0.0        |
| OpenFeature Web SDK                              | ≥ 1.0.0        |

## Install the provider and dependencies

Install the Harness FME OpenFeature provider and required peer dependencies:

```bash
npm install @splitsoftware/openfeature-web-split-provider
npm install @splitsoftware/splitio-browserjs
npm install @openfeature/web-sdk
```

## Initialize the provider

Register the Harness FME OpenFeature provider by using a `SplitFactory` instance.

For example:

```javascript
import { OpenFeature } from '@openfeature/web-sdk';
import { SplitFactory } from '@splitsoftware/splitio-browserjs';
import { OpenFeatureSplitProvider } from '@splitsoftware/openfeature-web-split-provider';

const splitFactory = SplitFactory({
  core: {
    authorizationKey: '<YOUR_CLIENT_SIDE_SDK_KEY>' 
    key: '<TARGETING_KEY>'
  }
});
const provider = new OpenFeatureSplitProvider(splitFactory);

// Wait for the default SDK client for '<TARGETING_KEY>' to be ready
await OpenFeature.setProviderAndWait(provider);
```

## Construct an evaluation context

Provide an <Tooltip id="fme.openfeature.evaluation-context">evaluation context</Tooltip> with a <Tooltip id="fme.openfeature.targeting-key">targeting key</Tooltip> to evaluate flags. The evaluation context passes targeting information such as user IDs, email addresses, or plan types for flag targeting.

For example:

```javascript
const context: EvaluationContext = {
  targetingKey: '<TARGETING_KEY>',
  trafficType: 'account'
};
await OpenFeature.setContext(context)
```

## Evaluate with details

Use the `get*Details(...)` APIs to get flag values and metadata (such as variant, reason, error code, and configuration). The FME treatment configuration is returned as a raw JSON string under `flagMetadata["config"]`.

For example: 

```javascript
const booleanTreatment = client.getBooleanDetails('boolFlag', false);
const config = booleanTreatment.flagMetadata.config;
```

## Evaluate with attributes

To include user or session attributes in flag evaluations, define them in the evaluation context before calling the evaluation methods.

For example:

```javascript
const context = {
  targetingKey: '<TARGETING_KEY>',
  trafficType: 'account',
  plan: 'premium',
  coupon: 'WELCOME10'
};

await OpenFeature.setContext(context);
const booleanTreatment = client.getBooleanDetails('boolFlag', false);
```

## Track events

The Harness FME OpenFeature provider supports tracking user actions or conversion <Tooltip id="fme.openfeature.events">events</Tooltip> directly from your web application.

To enable event tracking, your evaluation context must include the following:

- A non-empty `targetingKey`
- A [`trafficType`](/docs/feature-management-experimentation/traffic-types/) (for example, `"user"` or `"account"`)
- A non-blank event name

Optionally, you can include a numeric value (defaults to 0) and additional event properties (prefers primitives such as string, number, boolean, or null). For more information, see [Sending Events](/docs/feature-management-experimentation/api/events/#event-record-fields).

For example:

```javascript
const context = { targetingKey: 'user-123', trafficType: 'account' }
const details = { value: 19.99, properties: { plan: 'pro', coupon: 'WELCOME10' }}

await client.setContext(context)
client.track('checkout.completed', details)
```

For more information, go to the [Harness FME Web OpenFeature Provider GitHub repository](https://github.com/splitio/split-openfeature-provider-web-js).