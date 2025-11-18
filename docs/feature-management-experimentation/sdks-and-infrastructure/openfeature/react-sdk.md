---
title: OpenFeature Provider for React
sidebar_label: React OpenFeature Provider
sidebar_position: 5
description: Integrate OpenFeature with Harness FME in your React applications to evaluate feature flags, manage contexts, and track events using a standardized SDK.
---

Integrate your React applications with Harness FME using the <Tooltip id="fme.openfeature.provider">React OpenFeature Provider</Tooltip>, a standardized, vendor-agnostic feature flagging API. This provider implements the OpenFeature specification and bridges the OpenFeature SDK with the Harness FME Browser SDK.

This page walks you through installing, configuring, and using the React OpenFeature provider to evaluate <Tooltip id="fme.openfeature.feature-flag">feature flags</Tooltip> in your React applications.

### Prerequisites

Before you begin, ensure you have the following:

- A valid [Harness FME SDK key](/docs/feature-management-experimentation/sdks-and-infrastructure/#api-keys) for your application
- An React 17+ application using evaluation hooks
- Access to your application's `package.json` file to add the provider dependency

### Version compatibility

| Component                         | Minimum Version                     |
| --------------------------------- | ----------------------------------- |
| React                             | ≥ 17                                |
| `@splitsoftware/openfeature-web-split-provider` | ≥ 1.0.0         |
| Harness FME Browser SDK           | ≥ 10.x                              |
| OpenFeature React SDK             | ≥ 0.1.0                             |

## Install the provider and dependencies

Add the Harness FME OpenFeature provider dependency to your application's `package.json` file.

```bash
npm i @openfeature/react-sdk @splitsoftware/splitio-browserjs @splitsoftware/openfeature-web-split-provider
```

## Initialize the provider

The Harness FME OpenFeature provider requires your Harness FME Browser SDK key and a <Tooltip id="fme.openfeature.targeting-key">targeting key</Tooltip>. 

```typescript
import { OpenFeature } from '@openfeature/react-sdk';
import { OpenFeatureSplitProvider } from '@splitsoftware/openfeature-web-split-provider';
import { DebugLogger, SplitFactory } from '@splitsoftware/splitio-browserjs';

const splitFactory = SplitFactory({
  core: {
    authorizationKey: '<YOUR_CLIENT_SIDE_SDK_KEY>',
    key: 'TARGETING_KEY'
  }
})
const openFeatureProvider = new OpenFeatureSplitProvider(splitFactory);

OpenFeature.setProvider(openFeatureProvider);

function App() {
  return (
    <OpenFeatureProvider>
      <Page></Page>
    </OpenFeatureProvider>
  );
}
```

## Evaluate feature flags using evaluation hooks

Specify the feature flag key and a default value in `useFlag` so your application has a predictable fallback while the flag value loads.

```typescript
import { useFlag } from '@openfeature/react-sdk';

function Page() {
  // Use the "query-style" flag evaluation hook, specifying a flag-key and a default value.
  const { value: showNewMessage } = useFlag('new-message', true);
  return (
    <div className="App">
      <header className="App-header">
        {showNewMessage ? <p>Welcome to this OpenFeature-enabled React app!</p> : <p>Welcome to this React app.</p>}
      </header>
    </div>
  )
}
```

For more information, go to the [Harness FME Web OpenFeature Provider GitHub repository](https://github.com/splitio/split-openfeature-provider-web-js?tab=readme-ov-file#react-usage).