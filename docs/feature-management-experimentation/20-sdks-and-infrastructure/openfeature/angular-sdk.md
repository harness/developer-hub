---
title: OpenFeature Provider for Angular
sidebar_label: Angular OpenFeature Provider
sidebar_position: 4
description: Integrate OpenFeature with Harness FME in your Angular applications to evaluate feature flags, manage contexts, and track events using a standardized SDK.
---

Integrate your Angular applications with Harness FME using the <Tooltip id="fme.openfeature.provider">Angular OpenFeature Provider</Tooltip>, a standardized, vendor-agnostic feature flagging API. This provider implements the OpenFeature specification and bridges the OpenFeature SDK with the Harness FME Browser SDK.

This page walks you through installing, configuring, and using the Angular OpenFeature provider to evaluate <Tooltip id="fme.openfeature.feature-flag">feature flags</Tooltip> in your Angular applications.

### Prerequisites

Before you begin, ensure you have the following:

- A valid [Harness FME SDK key](/docs/feature-management-experimentation/sdks-and-infrastructure/#api-keys) for your project
- An Angular 14+ project
- Access to your project's `package.json` file to add the provider dependency

### Version compatibility

| Component                         | Minimum Version                     |
| --------------------------------- | ----------------------------------- |
| Angular                           | ≥ 14                                |
| `@splitsoftware/openfeature-web-split-provider` | ≥ 1.0.0         |
| Harness FME Browser SDK           | ≥ 10.x                              |
| OpenFeature Angular SDK           | ≥ 0.1.0                             |

## Install the provider and dependencies

Add the Harness FME OpenFeature provider dependency to your project's `package.json` file.

```bash
npm i @openfeature/angular-sdk @splitsoftware/splitio-browserjs @splitsoftware/openfeature-web-split-provider
```

## Initialize the provider

The Harness FME OpenFeature provider requires your Harness FME Browser SDK key and a <Tooltip id="fme.openfeature.targeting-key">targeting key</Tooltip>. 

If you are using a traditional `NgModule` setup: 

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenFeatureModule } from '@openfeature/angular-sdk';
import { SplitFactory } from '@splitsoftware/splitio-browserjs';
import { OpenFeatureSplitProvider } from '@splitsoftware/openfeature-web-split-provider';

const splitFactory = SplitFactory({
  core: {
    authorizationKey: '<YOUR_CLIENT_SIDE_SDK_KEY>',
    key: 'TARGETING_KEY'
  }
});
const openFeatureProvider = new OpenFeatureSplitProvider(splitFactory);

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    OpenFeatureModule.forRoot({
      provider: openFeatureProvider
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

If you are using a standalone bootstrap (Angular 16 or later):

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { OpenFeatureModule } from '@openfeature/angular-sdk';
import { SplitFactory } from '@splitsoftware/splitio-browserjs';
import { OpenFeatureSplitProvider } from '@splitsoftware/openfeature-web-split-provider';

const splitFactory = SplitFactory({
  core: {
    authorizationKey: 'CLIENT_SIDE_SDK_KEY',
    key: 'TARGETING_KEY'
  }
});
const openFeatureProvider = new OpenFeatureSplitProvider(splitFactory);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    importProvidersFrom(
      OpenFeatureModule.forRoot({
        provider: openFeatureProvider
      })
    )
  ]
};
```

## Evaluate feature flags

Use the `FeatureFlagService` (which is shown as `splitService` in this example) to evaluate flags through the OpenFeature provider. Specify the feature flag key and a default value in the evaluation method to ensure predictable behavior while the flag resolves.

```typescript
import { FeatureFlagService, EvaluationDetails } from '@openfeature/angular-sdk';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private splitService: FeatureFlagService) {}
  
  ngOnInit() {
    this.splitService.getStringDetails('featureFlagName', 'default').subscribe((result: EvaluationDetails<string>) => {
      console.log('Feature flag result:', result.value);
    });
  }
}
```

For more information, go to the [Harness FME Web OpenFeature Provider GitHub repository](https://github.com/splitio/split-openfeature-provider-web-js?tab=readme-ov-file#angular-usage).