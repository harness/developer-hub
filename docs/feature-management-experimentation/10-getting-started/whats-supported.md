---
title: What's supported in Harness FME
description: Platforms and technologies supported in FME
sidebar_label: What's supported
sidebar_position: 1
---

This topic lists platform and technologies supported by Harness Feature Management & Experimentation (FME).

For more information about FME features and functionality, go to the [Harness FME overview](/docs/feature-management-experimentation/getting-started/overview).

To learn about upcoming and recently released features, go to the [Harness FME product roadmap](https://developer.harness.io/roadmap/#fme).

## Supported server-side SDKs

The following table lists the server-side FME SDKs that Harness supports.

| SDK | Documentation |
| ---- | --- |
| [Go](https://github.com/splitio/go-client) | [Go SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/go-sdk) |
| [Elixir Thin Client](https://github.com/splitio/elixir-thin-client) | [Elixir Thin Client SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/elixir-thin-client-sdk) |
| [Java](https://github.com/splitio/java-client) | [Java SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/java-sdk) |
| [.NET](https://github.com/splitio/dotnet-client) | [.NET SDK Reference](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/net-sdk) |
| [Node.js](https://github.com/splitio/javascript-client) | [Node.js SDK Reference](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/nodejs-sdk) |
| [PHP](https://github.com/splitio/php-client) | [PHP SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/php-sdk) |
| [PHP Thin Client](https://github.com/splitio/php-thin-client) | [PHP Thin Client SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/php-thin-client-sdk) |
| [Python](https://github.com/splitio/python-client) | [Python SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/python-sdk) |
| [Ruby](https://github.com/splitio/ruby-client) | [Ruby SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/server-side-sdks/ruby-sdk) |

## Supported client-side SDKs

The following table lists the client-side FME SDKs that Harness supports.

| SDK | Documentation |
| ---- | --- |
| [Android](https://github.com/splitio/android-client) | [Android SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/android-sdk) |
| [Angular utilities](https://github.com/splitio/angular-sdk-plugin) | [Angular utilities reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/angular-utilities) |
| [JavaScript Browser](https://github.com/splitio/javascript-browser-client) | [JavaScript Browser SDK Reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/browser-sdk) |
| [Flutter plugin](https://github.com/splitio/flutter-sdk-plugin) | [Flutter plugin Reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/flutter-plugin) |
| [iOS](https://github.com/splitio/ios-client) | [iOS SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/ios-sdk) |
| [Javascript](https://github.com/splitio/javascript-client) | [Javascript SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk) |
| [React](https://github.com/splitio/react-client) | [React SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-sdk) |
| [React Native](https://github.com/splitio/react-native-client) | [React Native SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/react-native-sdk) |
| [Redux](https://github.com/splitio/redux-client) | [Redux SDK reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/redux-sdk) |

## Supported RUM Agents and SDK Suites

RUM Agents collect Real User Monitoring events and send these events to Harness. Harness FME also supports FME SDK Suites that include RUM Agents. The following table lists the FME RUM Agents and FME SDK Suites that Harness supports.

| FME SDK Suite | FME SDK Suite documentation | RUM Agent documentation |
| ---- | --- | --- |
| [Android](https://github.com/splitio/android-client) | [Android SDK Suite reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-suites/android-suite) | [Android RUM Agent reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/android-rum-agent) |
| [iOS](https://github.com/splitio/ios-client) | [iOS SDK Suite reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-suites/ios-suite) | [iOS RUM Agent reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/ios-rum-agent) |
| [JavaScript Browser](https://github.com/splitio/javascript-browser-client) | [JavaScript Browser SDK Suite Reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-suites/browser-suite) | [JavaScript Browser RUM Agent reference](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent) |

## Split Evaluator

For languages where there is no native SDK support, Harness offers the [Split Evaluator](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-evaluator), a small service capable of evaluating some or all available FME features for a given customer via a REST endpoint.

## Split Synchronizer

The [Split Synchronizer](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer) service is built for languages that do not have a native capability to keep a shared local cache, which is needed to evaluate FME feature flags.

This tool coordinates the sending and receiving of data to a remote datastore that all of your processes can share. Out of the box, Split Synchronizer supports Redis as a remote datastore. The Synchronizer service runs as a standalone process in dedicated or shared servers and it does not affect the performance of your code or FME SDKs.

## Split Proxy

The [Split Proxy](/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-proxy) enables you to deploy a service in your own infrastructure that behaves like Harness servers and is used by both server-side and client-side SDKs to synchronize the flags without connecting to Harness FME's actual backend directly.

This tool reduces connection latencies from the SDKs to the Harness servers transparently, and when a single connection is required from a private network to the outside for security reasons.

## Running in the cloud

There are no limitations for using FME in any cloud or non-cloud environment as long as the languages needed are supported with an SDK, and connectivity to either Harness or the Split Proxy can be established.

<!-- todo: move 3 sections to integrations landing page >
## Monitoring and analytics sources

Monitoring and analytics sources in Harness FME are APM (Application Performance Monitoring) or customer data and analytics providers that allow you to collect customer events and performance metrics.

<!-- Review note on “Monitoring and analytics sources”: We do not ingest data from all these integrations. Some are only data out (i.e. send flag changes to APM tool) -->

<!-- Analytics, Customer data platform, Monitoring, Warehouse + Google Tag Manager (from Deployment) - ->

Harness FME supports the following monitoring and analytics sources:

- [Amazon S3](https://help.split.io/hc/en-us/articles/360053674072-Amazon-S3)
- [Amplitude](https://help.split.io/hc/en-us/articles/360046658932-Amplitude)
- [AppDynamics](https://help.split.io/hc/en-us/articles/360020898371-AppDynamics)
- [Bugsnag](https://help.split.io/hc/en-us/articles/5709939011085-Bugsnag)
- [Datadog](https://help.split.io/hc/en-us/articles/4822553169933-Datadog)
- [Dynatrace](https://help.split.io/hc/en-us/articles/360059673711-Dynatrace)
- [FullStory](https://help.split.io/hc/en-us/articles/360045937831-FullStory)
- [Google Analytics](https://help.split.io/hc/en-us/articles/360040838752-Google-Analytics)
- [Google Tag Manager](https://help.split.io/hc/en-us/articles/7936008367245-Google-Tag-Manager)
- [Grafana](https://help.split.io/hc/en-us/articles/12397463150861-Grafana)
- [Heap](https://help.split.io/hc/en-us/articles/360035207311-Heap)
- [Librato](https://help.split.io/hc/en-us/articles/360020950431-Librato)
- [Mixpanel](https://help.split.io/hc/en-us/articles/360045503191-Mixpanel)
- [mParticle](https://help.split.io/hc/en-us/articles/360038306272-mParticle)
- [New Relic](https://help.split.io/hc/en-us/articles/360020695432-New-Relic)
- [PagerDuty](https://help.split.io/hc/en-us/articles/360046246631-PagerDuty)
- [Papertrail](https://help.split.io/hc/en-us/articles/360020700512-Papertrail)
- [Quantum Metric](https://help.split.io/hc/en-us/articles/4423968122381-Quantum-Metric)
- [Rollbar](https://help.split.io/hc/en-us/articles/360020700732-Rollbar)
- [Segment](https://help.split.io/hc/en-us/articles/360020742532-Segment)
- [Sentry](https://help.split.io/hc/en-us/articles/360029879431-Sentry)
- [SessionCam](https://help.split.io/hc/en-us/articles/360039246411-SessionCam)
- [Sumologic](https://help.split.io/hc/en-us/articles/360020746172-Sumo-Logic)

To learn how to add a monitoring or analytics source, click on one of the links above.

## Deployment platforms

Deployment and serverless application platforms simplify deployment and hosting for your application code or infrastructure.

Harness FME supports the following deployment and serverless application platforms:

<!-- Deployment - ->

- [Cloudflare Workers](https://help.split.io/hc/en-us/articles/4505572184589-Cloudflare-Workers) <!-- serverless hosting -- >
- [Terraform provider](https://help.split.io/hc/en-us/articles/6191463919885-Terraform-provider) <!-- terraform = deploy cloud infrastructure, create feature flags from terraform - ->
- [Vercel](https://help.split.io/hc/en-us/articles/16469873148173-Vercel)

To learn how to configure Harness FME for a deployment platform or serverless application platform, click on one of the links above.

## Development, change management, and messaging tools

Development, change management, and messaging tools improve team efficiency, enhance developer experience, and help effectively manage permissions.

Harness FME supports the following development, change management, and messaging tools:

<!-- Development, Change management, Messaging - ->

- [Azure DevOps](https://help.split.io/hc/en-us/articles/4408032964493-Azure-DevOps) <!-- configure/enable rollouts, create/associate feature flags - ->
- [GitHub Actions](https://help.split.io/hc/en-us/articles/24994768544269-GitHub-Actions) <!-- evaluate feature flags in GA - ->
- [Jenkins](https://help.split.io/hc/en-us/articles/360044691592-Jenkins) <!-- create/update/delete feature flags as part of test & automation workflow - ->
- [Jira Cloud](https://help.split.io/hc/en-us/articles/360059317892-Jira-Cloud) <!-- connect feature flags and Jira issues - ->
- [Slack](https://help.split.io/hc/en-us/articles/360020997851-Slack)
- [ServiceNow](https://help.split.io/hc/en-us/articles/5524203735181-ServiceNow) <!-- manage permissions/approval flows - ->
- [VSCode extension](https://help.split.io/hc/en-us/articles/10731776599309-VSCode-extension)

To learn how to configure one of these tools to effectively work with FME, click on a link above.

<!-- todo: consider including this when the FME module can be selected in the Idea Portal
## Feature requests

Some of our best ideas come from our customers. You can submit your feature requests to [Harness Idea Portal](https://ideas.harness.io/feature-request).
-->

## What else does Harness support?

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported).