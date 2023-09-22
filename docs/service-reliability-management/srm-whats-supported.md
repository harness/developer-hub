---
title: What's supported in Harness SRM
description: Health and change sources supported by Harness SRM.
sidebar_label: What's supported
sidebar_position: 10
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Harness Service Reliability Management (SRM) supports the following health and change sources:

<Tabs>
<TabItem value="Health sources" label="Health sources">

A health source monitors changes in the health trends of the service using metrics and logs collected from an APM and log provider, respectively.

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

A change source monitors change events related to deployments, infrastructure changes, and incidents.





<details>
<summary><b>Harness supported change sources</b></summary>

- Custom change source
- Harness CD
- Harness CD NextGen
- Harness Chaos Engineering
- Harness Feature Flag
- PagerDuty
  
</details>

To know how to add a change source, go to [Change sources](/docs/category/change-sources-catalog).

</TabItem>

</Tabs>

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/get-started/supported-platforms-and-technologies.md).