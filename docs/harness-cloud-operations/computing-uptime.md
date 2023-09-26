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
| Pipeline and Workflow executions ART (manager > /api/executions)      | Greater than 30 seconds for a consecutive duration of 5 mins | Partial Outage |

