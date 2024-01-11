---
title: What's supported in Harness SRM
description: Health and change sources supported by Harness SRM.
sidebar_label: What's supported
sidebar_position: 10
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


This topic provides a comprehensive list of health sources and change sources supported by Harness Service Reliability Management (SRM). It covers both Harness SaaS and Harness Self-Managed Enterprise Edition (SMP).

## Harness SaaS

<Tabs>
<TabItem value="Health sources" label="Health sources">

Health sources in Harness SRM are APM (Application Performance Monitoring) or log providers that allow you to monitor changes in your service's health trends. The following health sources are supported:

<details>
<summary><b>Harness supported health sources</b></summary>

- AppDynamics
- CloudWatch
- Custom health source
- Datadog
- Dynatrace
- Elasticsearch
- Google Cloud Operations
- Loki
- New Relic
- Prometheus
- Splunk Log
- Splunk Observability (formerly SignalFX)
- Sumologic

</details>

To learn how to add a health source, go to [Health sources](/docs/category/health-sources-catalog).

</TabItem>


<TabItem value="Change sources" label="Change sources">


Change sources enable you to monitor change events related to deployments, infrastructure changes, and incidents. Harness SRM supports the following change sources:


<details>
<summary><b>Harness supported change sources</b></summary>

- Custom change source
- Harness CD
- Harness CD NextGen
- Harness Chaos Engineering
- Harness Feature Flag
- PagerDuty

</details>

To learn how to add a change source, go to [Change sources](/docs/category/change-sources-catalog).

</TabItem>


<TabItem value="Governance" label="Governance">

Harness Policy As Code uses [Open Policy Agent (OPA)](https://www.openpolicyagent.org/) as the central service to store and enforce policies for the different entities and processes across the Harness platform.

You can centrally define and store policies and then select where (which entities) and when (which events) they will be applied.

Currently, you can define and store policies directly in the OPA service in Harness.

Soon, you will be able to use remote Git or other repos (for example, OCI-compatible registries) to define and store the policies used in Harness.

- [Harness Policy As Code overview](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview)
- [Harness Policy As Code quickstart](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-quickstart)
- [Add a Policy step to a pipeline](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline)

</TabItem>

</Tabs>


## Harness Self-Managed Enterprise Edition (SMP)

All SRM features supported in Harness SaaS are also supported in the Self-Managed Enterprise Edition. 

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/get-started/supported-platforms-and-technologies.md).

