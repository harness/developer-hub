---
title: Kubernetes Custom Script Action Templates
sidebar_position: 1
description: Pre-built Custom Script Action templates for Kubernetes infrastructure
---

import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection";
import ProbeTemplateCard from "@site/src/components/ChaosEngineering/ProbeTemplateCard";
import Accordion from "@site/src/components/ChaosEngineering/Accordion";
import { customScriptActionTemplates } from "./templates";

# Kubernetes Custom Script Action Templates {#introduction}

Pre-built Custom Script Action templates for integrating observability and monitoring tools with your chaos experiments. These templates help you quickly set up actions to annotate dashboards, create events, and enhance visibility during chaos injection.

Here are Custom Script action templates that you can use in your chaos experiments.

<ExperimentListSection experiments={customScriptActionTemplates} />

<ProbeTemplateCard category="custom-script">

### Grafana Chaos Annotation

Grafana chaos annotation action annotates the grafana dashboard to highlight the chaos duration.

**Required Environment Variables:**
- `GRAFANA_URL`: URL of the Grafana instance
- `GRAFANA_USERNAME`: Username for Grafana authentication
- `GRAFANA_PASSWORD`: Password for Grafana authentication
- `DASHBOARD_UID`: Dashboard UID of the Grafana instance
- `MODE`: Mode of operation (SOT, EOT, or Continuous)
- `ADDITIONAL_TAGS`: Additional tags for the annotation (optional)

<Accordion color="green">
<summary>Use cases</summary>

- Visualize chaos injection periods on Grafana dashboards
- Correlate chaos events with metrics and alerts
- Track experiment timeline alongside application performance
- Improve incident analysis and debugging

</Accordion>
</ProbeTemplateCard>

<ProbeTemplateCard category="custom-script">

### Datadog Chaos Event

It creates an event for the datadog dashboard to highlight the chaos injection.

**Required Environment Variables:**
- `DATADOG_URL`: URL of the Datadog instance
- `DATADOG_API_KEY`: Datadog API key for authentication
- `DATADOG_EVENT_TITLE`: Title of the event
- `DATADOG_EVENT_TEXT`: Text description of the chaos event
- `MODE`: Mode of operation (start or end, default: start)
- `DATADOG_EVENT_TAGS`: Comma-separated tags for the event (optional)
- `DATADOG_EVENT_ALERT_TYPE`: Alert type (info, warning, error, success, default: info)

<Accordion color="green">
<summary>Use cases</summary>

- Create events in Datadog to mark chaos experiment execution
- Track chaos injection alongside application metrics
- Enable correlation between chaos and system behavior
- Enhance observability during resilience testing

</Accordion>
</ProbeTemplateCard>
