---
title: Overview
description: AI-powered deployment verification without baseline configuration
sidebar_label: Overview
slug: /continuous-delivery/verify/configure-cv/configure-verify-step-with-ai/overview
sidebar_position: 1
---

Traditional continuous verification requires extensive manual setup—creating monitored services, defining baseline periods, configuring threshold rules, and maintaining health checks. This overhead often delays adoption and requires ongoing maintenance as services evolve. AI-powered verification eliminates this complexity by using intelligent agents that automatically analyze deployment health without any baseline configuration.

## What is AI-powered verification?

AI-powered verification combines two components that work together to provide automated deployment health analysis:

**AI Verify step**: A pipeline step that deploys data collection plugins into your Kubernetes cluster to collect and analyze logs and metrics during deployments. The plugins aggregate and cluster data while stripping personally identifiable information before it leaves your cluster. Instead of comparing against historical baselines or predefined thresholds, the step uses statistical and algorithmic methods for anomaly detection, with LLMs augmenting the results by contextualizing anomalies against deployment verification criteria, filtering false positives based on business criticality, and synthesizing actionable root cause insights.

**AI-assisted health source configuration**: An LLM-powered Configuration Agent that automatically discovers and configures metrics from your observability platforms. Describe your service and monitoring goals in natural language, and the agent generates appropriate metric categories, queries, and aggregation settings.

## How it differs from traditional verification

Traditional continuous verification and AI-powered verification take fundamentally different approaches:

| Aspect | Traditional Verification | AI-Powered Verification |
|--------|-------------------------|------------------------|
| **Baseline requirement** | Requires clean baseline data before verification works | Uses baseline data but does not require manual baseline configuration |
| **Configuration** | Manual monitored service setup, health source queries, threshold tuning | Describe service in natural language, agent discovers and configures metrics |
| **Anomaly detection** | Rule-based comparison against thresholds | Statistical and algorithmic detection with LLM-based contextualization |
| **Failure explanations** | Generic alerts ("threshold exceeded") | Natural language explanations of what went wrong and why |
| **Maintenance overhead** | Frequent threshold retuning as services evolve | Adapts automatically to changing behavior patterns |
| **False positives** | Common with brittle thresholds | Reduced by understanding context and relationships between signals |
| **Setup time** | Hours per service | Minutes per service |

## Feature parity with traditional Verify step

Harness is actively developing AI Verify to reach feature parity with the traditional Verify step. The following table shows which capabilities are currently available and which are planned for future releases.

| Feature | Traditional Verify | AI Verify | Status |
|---------|-------------------|-----------|---------|
| **Core verification** | ✓ | ✓ | Available |
| **Metrics analysis** | ✓ | ✓ | Available |
| **Logs analysis** | ✓ | ✓ | Available |
| **Variable support in health sources** | ✓ | ✗ | Planned for Q2 2026 |
| **Multi-query support** | ✓ | ✗ | Planned for Q2 2026 |
| **User feedback on logs** | ✓ | ✗ | Planned for Q2 2026 |
| **Configurable start time** | ✓ | ✗ | Future release |
| **Sub-task webhook notifications** | ✓ | ✗ | Future release |
| **Pinned baseline** | ✓ | ✗ | Future release |
| **Multiple verification types** | ✓ | N/A | AI Verify uses single approach |

### Features planned for Q2 2026

**Variable support for health sources**

Variable support for health sources lets you use Harness variables in health source queries to parameterize them dynamically based on deployment context. Health sources will have inline variable support with a new field to create variables. These variables can be used inside health source queries like `<+healthSourceVariables.var1>`. You can also use other pipeline, stage, and service variables along with health source variables.

**Multi-query support**

Multi-query support lets you analyze multiple queries configured in a single health source and introduces an aggregated UI of all the queries analysis done by AI Verify. Currently, AI-assisted health sources can create multiple queries, but all queries are not being analyzed, and there is no aggregated summary view of results.

**User feedback on logs**

User feedback on log analysis allows you to provide feedback on the log analysis for better analysis based on your domain knowledge. This feature helps improve the accuracy of log anomaly detection.

For questions about the AI Verify roadmap or to request prioritization of specific features, go to [Harness Community](https://community.harness.io/) or contact [Harness Support](mailto:support@harness.io).

## How AI-powered verification works

### Phase 1: Health source configuration

When you create a health source for AI Verify, the Configuration Agent:

1. **Discovers metrics**: Connects to your observability platform (Datadog or Dynatrace) and retrieves all available metrics for your connector. Filters out internal and billing metrics.

2. **Semantic grouping**: Analyzes your service description and monitoring goals to group related metrics into semantic categories like error tracking, performance latency, or infrastructure utilization. Ranks categories by golden signal importance.

3. **Query generation**: For each selected metric, fetches metadata, identifies appropriate tag filters based on your service and environment, constructs platform-specific queries, and validates them by retrieving sample data.

4. **Natural language refinement**: You can fine-tune any metric using plain English feedback (e.g., "Use p95 instead of avg" or "Add filter for environment:production"). The agent regenerates the configuration with your feedback as context.

The Configuration Agent uses a three-phase pipeline (discovery, configuration, validation) with full transparency. You can view the complete agent timeline showing tool calls, LLM reasoning, and validation steps for each metric.

### Phase 2: Deployment verification

When the AI Verify step executes in your pipeline:

1. **Plugin deployment**: Deploys data collection plugins as pods in your Kubernetes cluster. Each health source creates an independent plugin for parallel analysis.

2. **Data collection**: Plugins query your observability platforms during a configurable time window (e.g., 5 minutes) after deployment completes. Collects logs and metrics defined in your health sources.

3. **Pattern analysis and PII filtering**: Plugins aggregate and cluster similar log entries and metric patterns within your cluster. Deduplication eliminates redundant data points. Personally identifiable information is stripped before data leaves your cluster.

4. **Anomaly detection**: Statistical and algorithmic methods identify anomalies and regressions in the collected data. The system detects deviations from expected patterns without requiring historical baselines.

5. **LLM contextualization**: Large language models augment the detected anomalies by adding deployment context, filtering false positives based on business criticality, and understanding relationships between signals (e.g., "latency increased because error rate spiked").

6. **Natural language insights**: If issues are detected, LLMs generate explanations of what went wrong, root cause analysis, and actionable remediation suggestions.

7. **Verdict**: The step passes or fails based on whether detected issues exceed your configured sensitivity threshold (Low, Medium, High). Each health source provides an independent verdict.

## Limitations and considerations

**Network requirements**: The Configuration Agent and AI Verify data collection plugins require network access to both your observability platform and the LLM Gateway. Air-gapped deployments cannot use AI-powered verification and must use manual health source setup with traditional verification steps.

**Platform support**: Currently supports Datadog for metrics and Dynatrace for logs. Manual configuration remains available for all observability platforms including Prometheus, New Relic, AppDynamics, Splunk, and others.

**Infrastructure requirements**: Requires a Kubernetes cluster to run data collection plugin pods. Each health source creates one plugin pod that processes data within your cluster, stripping PII before transmission. Ensure sufficient resource quota for concurrent executions.

**Configuration scope**: Health source configuration changes made directly in your observability platform (outside Harness) are not reflected in the health source definition. The Configuration Agent only manages metrics it configures through Harness.

**Custom composite metrics**: Generated composites use only the base metrics you've selected. If a composite requires metrics outside your selected categories, add those metrics manually before generating the composite.

**Service context changes**: If your service's tagging strategy changes, regenerate the health source or manually update queries to reflect the new tags. The agent cannot detect external tagging changes after initial configuration.

## Getting started

:::note
AI-powered verification is behind feature flags `CDS_CV_AI_VERIFY_NG` and `CDS_CV_HEALTH_SOURCES_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable these features.
:::

To start using AI-powered verification:

1. **Create AI-assisted health sources**: Use the Configuration Agent to automatically discover and configure metrics from your observability platforms. See [AI-assisted health source configuration](./ai-assisted-health-source.md) for step-by-step instructions.

2. **Add AI Verify step to pipelines**: Configure the AI Verify step in your deployment pipelines to analyze health sources during deployments. See [Configure the AI Verify step](./ai-verify.md) for detailed configuration options.

3. **Monitor executions**: View real-time agent events, data clustering, and natural language insights during pipeline execution. Review explanations and remediation suggestions when issues are detected.

4. **Refine over time**: Use natural language feedback to fine-tune metric configurations. Regenerate health sources as your service's monitoring needs evolve.
