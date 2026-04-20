---
title: APM Probes
sidebar_position: 6
description: Configure APM probes to validate metrics from Prometheus, Datadog, Dynatrace, New Relic, Splunk Observability, Splunk Enterprise, AppDynamics, and GCP Cloud Monitoring
---

import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

APM (Application Performance Monitoring) probes query metrics from your monitoring systems and compare them against expected values during chaos experiments. They use Harness Platform connectors to securely store credentials for the target APM system.

## When to use APM probes

Use APM probes when your application is monitored by an APM system and you want to observe how metrics behave under failure conditions. For example, you can track response times in Prometheus while injecting pod-delete faults, or monitor error rates in Datadog during a network disruption.

## Configure APM Probes

Select the APM provider to view configuration details:

<DynamicMarkdownSelector
  options={{
    "Prometheus": {
      path: "/resilience-testing/content/probes/prometheus-probe.md"
    },
    "AppDynamics": {
      path: "/resilience-testing/content/probes/appdynamics-probe.md"
    },
    "Splunk Observability": {
      path: "/resilience-testing/content/probes/splunk-probe.md"
    },
    "Splunk Enterprise": {
      path: "/resilience-testing/content/probes/splunk-enterprise-probe.md"
    },
    "Dynatrace": {
      path: "/resilience-testing/content/probes/dynatrace-probe.md"
    },
    "New Relic": {
      path: "/resilience-testing/content/probes/newrelic-probe.md"
    },
    "GCP Cloud Monitoring": {
      path: "/resilience-testing/content/probes/gcp-probe.md"
    },
    "Datadog": {
      path: "/resilience-testing/content/probes/datadog-probe.md"
    }
  }}
  toc={toc}
  precedingHeadingID="configure-apm-probes"
  nextHeadingID=""
  disableSort={true}
/>
