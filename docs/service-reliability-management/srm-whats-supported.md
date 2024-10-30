---
title: What's supported in Harness SRM
description: Health and change sources supported by Harness SRM.
sidebar_label: What's supported
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic lists health sources and change sources supported by Harness Service Reliability Management (SRM).

All SRM features supported in Harness SaaS are also supported in the Self-Managed Enterprise Edition.

For more information about SRM features and functionality, go to [Harness SRM overview](/docs/service-reliability-management/get-started/overview.md) and [Harness SRM key concepts](/docs/service-reliability-management/get-started/key-concepts).

For information about upcoming and recently released features, go to the [SRM product roadmap](https://developer.harness.io/roadmap/#srm), [SRM release notes](/release-notes/service-reliability-management), and [SRM early access features](#srm-early-access-features)

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported).

## Health sources

Health sources in Harness SRM are APM (Application Performance Monitoring) or log providers that allow you to monitor changes in your service's health trends.

Harness SRM supports the following health sources:

- AppDynamics
- CloudWatch
- Datadog
- Dynatrace
- Elasticsearch
- Google Cloud Operations (formerly Stackdriver)
- Loki
- New Relic
- Prometheus
- Splunk Log
- Splunk Observability (formerly SignalFX)
- Sumologic
- Custom health source

To learn how to add a health source, go to [Health sources](/docs/category/health-sources-catalog).

Harness offers support for all major APM vendors, but there are cases where a customized APM is needed. The [Custom Health Source](../continuous-delivery/verify/configure-cv/health-sources/custom-health-metrics) lets you customize APMs of your choice.

## Change sources

Change sources enable you to monitor change events related to deployments, infrastructure changes, and incidents.

Harness SRM supports the following change sources:

- Harness Continuous Delivery
- Harness Chaos Engineering
- Harness Feature Flag
- PagerDuty
- Custom change source

To learn how to add a change source, go to [Change sources](/docs/category/change-sources-catalog).

## Governance

Harness Policy As Code uses [Open Policy Agent (OPA)](https://www.openpolicyagent.org/) as the central service to store and enforce policies for the different entities and processes across the Harness platform.

You can centrally define and store policies and then select where (which entities) and when (which events) they will be applied.

Currently, you can define and store policies directly in the OPA service in Harness.

Soon, you will be able to use remote Git or other repos (for example, OCI-compatible registries) to define and store the policies used in Harness.

- [Harness Policy As Code overview](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview)
- [Harness Policy As Code quickstart](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-quickstart)
- [Add a Policy step to a pipeline](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline)

## SRM early access features

Some Harness SRM features are released behind feature flags to get feedback from a subset of customers before releasing the features to general availability.

You can opt-in to the early access (beta) features for Harness SRM described in the following table. Contact [Harness Support](mailto:support@harness.io) to enable specific early access features in your Harness account. Include the feature flag or name with your request.

For more information about early access features, including early access features for the Harness Platform, delegate, and other Harness modules, go to [Early access features](/release-notes/early-access).

| Flag | Description | Availability |
| ---  | ----------- | ------------ |
| `SRM_LOG_HOST_SAMPLING_ENABLE` | Harness was automatically applying an alternate deployment strategy even if the required data for the deployment configured in the Verify step was not available.<br/>Now, Harness does not automatically apply an alternate deployment strategy if the required data is not available. Instead, Harness fails the CV.<br/>Harness automatically applies an alternate deployment strategy only if you choose the Auto option in the Continuous Verification Type dropdown list when configuring the Verify step. | Beta<br/>Note: This feature was released for early access in 2022. Early access features from past releases might have been promoted to GA since their original release. |
