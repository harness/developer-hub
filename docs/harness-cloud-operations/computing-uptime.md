---
title: Computing uptime for Harness Modules
description: How we compute uptime for different Harness Modules
sidebar_label: Computing uptime for Harness Modules
---

Harness uptime for different modules across different clusters is available on [https://status.harness.io/](https://status.harness.io/).

## Partial outages vs major outages

Status page definition — [https://support.atlassian.com/statuspage/docs/display-historical-uptime-of-components/](https://support.atlassian.com/statuspage/docs/display-historical-uptime-of-components/).

While major outages affect 100% of the people that use a given component, partial outages only affect a subset of those users. Following that logic, partial outages don’t count as much as major outages in the uptime showcase.

Specifically, partial outages are discounted to only be **30%** as bad as major outages. This is an “across the board” calculation and **cannot** be configured.

## Common Service Level Indicators across all Modules
For all Harness modules, the following Service Level Indicators (SLIs) will be applicable. Anytime, the common Service Level Indicators (SLIs) breach their thresholds it will be considered partial outage and 30% of the total duration would be applicable.

| **SLI**                          | **Threshold**                                                | Outage Kind    |
|----------------------------------|--------------------------------------------------------------|----------------|
| Login EURT (Base Pages > #login) | Greater than 30 seconds for a consecutive duration of 5 mins | Partial Outage |
| Overall EURT (app.harnes.io)     | Greater than 30 seconds for a consecutive duration of 5 mins | Partial Outage |
| Gateway overall ART              | Greater than 50 ms for a consecutive duration of 5 mins      | Partial Outage |

### Example

Say Gateway has a partial outage for 50 minutes then:

* 30% of 50 minutes = 15 minutes = 900 seconds will be the downtime.
* If this was the only incident for a 90 day duration (7776000 seconds) , the uptime then will be (1–900/7776000) * 100 = (1–0.000115740740741) * 100 = 99.988

## Service Level Indicators specific to Harness Modules

## Continuous Delivery (Current Gen)
| **SLI**                                   | **Threshold**                                                | Outage Kind    |
|-------------------------------------------|--------------------------------------------------------------|----------------|
| Dashboard ART                             | Greater than 10 seconds for a consecutive duration of 5 mins | Partial Outage |
| Pipeline and Workflow executions ART      | Greater than 30 seconds for a consecutive duration of 5 mins | Partial Outage |

## Continuous Delivery (Next Gen)
| **SLI**                                                               | **Threshold**                                                | Outage Kind    |
|-----------------------------------------------------------------------|--------------------------------------------------------------|----------------|
| Dashboard ART                             | Greater than 10 seconds for a consecutive duration of 5 mins(P95) | Partial Outage |
| Event In Queue Time      | Greater than 30 seconds for a consecutive duration of 10 mins | Major Outage |
| Event In Queue Time      | Greater than 20s for a consecutive duration of 10 mins | Partial Outage |
| List Executions P95 (Pipeline execution summary)     | If greater than 10 seconds for 5 mins consecutive then major outage| Major Outage |
| List Executions P95 (Pipeline execution summary)`     | If greater than 5 seconds for 5 mins consecutive then partial outage| Partial Outage |
| List Executions P95 (Pipeline list)     | If greater than 10 seconds for 5 mins consecutive then major outage| Major Outage |
| List Executions P95 (Pipeline list)`    | If greater than 5 seconds for 5 mins consecutive then partial outage| Partial Outage |
| GitOps APIs ART     | Greater than 10 seconds for a consecutive duration of 5 mins| Major Outage |
| GitOps APIs ART     | Greater than 5 seconds for a consecutive duration of 5 mins| Partial Outage |

## Continuous Integration 
| **SLI**                                                               | **Threshold**                                                | Outage Kind    |
|-----------------------------------------------------------------------|--------------------------------------------------------------|----------------|
| CI Manager                             | Greater than 30 seconds for a consecutive duration of 5 mins | Major Outage |
| CI Manager Execution health      | No executions messages for more than 30 mins | Major Outage |

## Cloud Cost Management 
| **SLI**                                                               | **Threshold**                                                | Outage Kind    |
|-----------------------------------------------------------------------|--------------------------------------------------------------|----------------|
| GraphQL / REST API                             | Greater than 30 seconds for a consecutive duration of 5 mins | Major Outage |
| Drops in the incoming message count event-service      | No incoming messages for more than 30 mins | Major Outage |
| Lightwing APIs ART      | Greater than 30 seconds for a consecutive duration of 5 mins | Major Outage |
| Faktory Queue job wait time      | Greater than 30 sec for a consecutive duration of 5 mins | Major Outage |

## Feature Flags 
| **SLI**                                                               | **Threshold**                                                | Outage Kind    |
|-----------------------------------------------------------------------|--------------------------------------------------------------|----------------|
| Feature Flag Dashboard RestAPI ART                            | Greater than 30 seconds for a consecutive duration of 5 mins | Partial Outage |
| Evaluation API      | Greater than 45 seconds for consecutive duration of 5min | Major Outage |
| Metrics API      | Greater than 45 seconds for consecutive duration of 5min | Partial Outage |

## Security Testing Orchestration 
| **SLI**                                                               | **Threshold**                                                | Outage Kind    |
|-----------------------------------------------------------------------|--------------------------------------------------------------|----------------|
| STO Call-HTTP to pipeline-service ART                            | Greater than 10 seconds for a consecutive duration of 5 mins | Major Outage |
| STO Call-HTTP to pipeline-service ART                            | Greater than 5 seconds for a consecutive duration of 5 mins | Partial Outage |
| STO Core API ART                            | Greater than 30 seconds for a consecutive duration of 5 mins  | Major Outage |
| STO pipeline - Create/modify                            | Greater than 30 seconds for a consecutive duration of 5 mins   | Partial Outage |






