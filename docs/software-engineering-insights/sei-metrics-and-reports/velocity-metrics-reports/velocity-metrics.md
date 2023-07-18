---
title: Velocity metrics
description: These metrics help analyze the time taken to deliver a feature.
sidebar_position: 10
---

Velocity metrics help analyze the time taken to deliver a feature. They can help you identify bottlenecks in product development and delivery processes.

SEI identifies risk factors and slowdowns by providing insights into:

* Every stage of the SDLC.
* Risks of sprint slips due to scope creep.
* Wait times for PR review, merge times, and CI/CD.
* Code-to-production inefficiencies.

SEI offers different velocity metrics based on the tools your teams use and the processes they follow. Examples of velocity metrics include:

* **Deployment Frequency:** This DORA metric measures how often an organization/team successfully releases software to production. With SEI, you get:
  * The flexibility to choose [integrations](/docs/category/connectors-and-integrations), like issue management, SCM, and CI/CD tools, and add the relevant filters to define your Deployment Frequency.
  * An understanding of your organization's deployment performance.
  * An overview of the daily, weekly, and monthly deployment trends.
* **Lead Time:** The overall lead time is the sum of the average time spent in each stage configured in a workflow, such as the commit-to-deployment cycle in SCM or the issue lifecycle in an issue management system. This metric can help identify where the team is spending time and if the amount of time spent in each stage falls in an acceptable range.
* **PR Collaboration:** This metric provides an overview of how many PRs are being raised, by whom, who is reviewing PRs, who is merging PRs without reviews, and much more. These insights drive further actions to improve processes, initiate conversations with the team, remove the bottlenecks, and improve cycle time.

There are many velocity metrics, and some overlap with other metrics categories. For more information about velocity subcategories and related metrics, go to:

* [DORA metrics](../dora-metrics.md)
* [Effort investment metrics](../effort-investment-metrics.md)
* [Flow metrics](./flow-metrics.md)
* [Sprint metrics](./planning-sprint-metrics.md)

For information about reports you can use to analyze velocity metrics, go to:

* [CI/CD job reports](./ci-cd-reports.md)
* [Issues reports](./issues-reports.md)
* [Lead time reports](./lead-time-reports.md)
* [SCM reports](./scm-reports.md)
* [Support reports](../support-metrics.md) (Issues, resolution time, response time, and requester wait time reports only)
* [PagerDuty reports](../quality-metrics-reports/pagerduty-reports.md) (Ack trend, after hours, response, response times, and stacks reports only)
