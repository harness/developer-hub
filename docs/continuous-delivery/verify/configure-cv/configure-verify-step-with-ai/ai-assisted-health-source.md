---
title: AI-assisted health source configuration
description: Use AI to automatically discover and configure metrics from your observability platforms
sidebar_label: AI-Assisted Health Source
slug: /continuous-delivery/verify/configure-cv/configure-verify-step-with-ai/ai-assisted-health-source
sidebar_position: 2
---

This guide walks through creating health sources using the AI-assisted Configuration Agent. The agent automatically discovers metrics from your observability platforms and generates appropriate queries based on your service context. For an overview of how the Configuration Agent works within AI-powered verification, see the [Overview](./overview.md).

:::note
AI-assisted health source configuration is behind feature flags `CDS_CV_AI_VERIFY_NG` and `CDS_CV_HEALTH_SOURCES_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable these features.
:::

## Create an AI-assisted health source

Navigate to Account/Organization/Project Settings depending on where you want to create the health source. Select Health Sources from the left navigation. The Health Sources listing page shows all existing health sources. Click **+ New Health Source** to start the configuration wizard.

### Overview tab

The Overview tab contains the basic configuration for your health source.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/overview-tab.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

**Health Source Name**: Enter a descriptive name for your health source, such as "payments-api-datadog-metrics".

**Select health source type**: Choose your observability platform from the tile grid. Currently supported platforms for AI-assisted configuration:
- **Datadog**
- **Dynatrace**

**Select Connector**: Choose a connector from the dropdown that has access to your observability platform. If you don't have a connector configured, you'll need to [create one first](/docs/category/cloud-providers).

**Select Feature**: Choose the data type you want to monitor:
- **Metrics** - For metric-based analysis
- **Logs** - For log-based analysis (Dynatrace only)

**Setup Approach**: Two options are available:
- **AI-Assisted Setup (Recommended)** - Uses the Configuration Agent to automatically discover and configure metrics
- **Manual Setup** - Requires manual query configuration. See [Health Sources documentation](/docs/category/health-sources) for manual setup instructions.

Select **AI-Assisted Setup (Recommended)** to use the Configuration Agent.

Click **Continue** to proceed to the Service Context tab.

### Service Context tab

The Service Context tab collects information about your service to help the Configuration Agent understand what metrics are relevant.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/service-context-tab.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

**Service**: Select the service from the dropdown. This should be the service you're deploying and want to monitor.

**Environment**: Select the environment where your service runs (Production, Staging, QA, etc.).

**Infrastructure**: Select the infrastructure definition that specifies where your service is deployed.

**Service Context**: In the text area, describe what your service does and what you want to monitor. Write in natural language and be specific about your service's purpose and monitoring goals. Include any relevant information that helps filter metrics or logs for this service amongst other services, such as service-specific tags, namespaces, or identifiers. Providing detailed context helps the Configuration Agent discover the most relevant metrics.

Example: "Payment processing microservice handling Stripe integration, deployed in namespace payment-prod, tagged with service:payments-api, please monitor deployment regressions"

After filling in all fields, click **Generate Metric Categories** to save your context and immediately start the metric discovery process. The Configuration Agent connects to your observability platform using the selected connector, retrieves all available metrics, filters out internal and billing metrics, then classifies them into semantic categories (typically 4-7 categories) based on your service context and monitoring goals. The agent ranks categories by golden signal importance (errors > latency > throughput > infrastructure).

Once generation completes, the **Available Metric Categories** section appears, showing the discovered categories with the number of metrics in each. For example:
- Error Tracking (2 metrics)
- Response Time Monitoring (3 metrics)
- Throughput Monitoring (2 metrics)
- Infrastructure Monitoring (4 metrics)
- Other Performance Metrics (2 metrics)

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/service-context-categories.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

All categories are selected by default. Uncheck any categories you don't want to include in your health source.

Click **Continue** to proceed to the Metrics tab.

### Metrics tab

The Metrics tab displays all discovered metrics organized by the categories you selected in the Service Context tab. The heading shows "Select the metrics you want to include in your health source."

All metric categories appear in a collapsed state by default, showing:
- Category name (e.g., "Error Tracking")
- Number of metrics selected (e.g., "2 selected")

**Expand a category** to view the individual metrics. Each metric shows:
- Display name (e.g., "HTTP Request Errors")
- Raw metric identifier from your observability platform (e.g., `trace.http.request.errors`)

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/metrics-tab-expanded.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

All metrics within the selected categories are checked by default. Uncheck any metrics you don't want to monitor.

#### Generate custom composite metrics

On the right side of the page, the **Generate Custom Composite** panel lets you create derived metrics using natural language.

In the text area, describe the composite metric you want. For example:
"Create a composite that shows latency degradation when error rates spike, weighted by request volume"

Click **Generate Composite** to create the metric. The Configuration Agent analyzes your request and generates the appropriate formula and constituent metrics. Once created, the composite appears in the **Composite Metrics** category in the list on the left.

After selecting your metrics, click **Continue** to proceed to the Metric Review tab.

### Metric Review tab

The Metric Review tab is where the Configuration Agent builds the actual queries for each selected metric. This tab runs a waterfall process for each metric, calling tools to fetch metric context, validate queries, and retrieve sample data.

The first metric card appears in an expanded state by default, while others remain collapsed. Each metric card displays:
- Metric name with its raw identifier (e.g., "HTTP Request Errors" - trace.http.request.errors)
- Risk category badge (e.g., ERROR, PERFORMANCE_RESPONSE_TIME)
- Two tabs: **Configuration** and **Agent Events**

#### Configuration tab

The Configuration tab presents the finalized metric configuration generated by the Configuration Agent. This view displays all the settings the agent determined through its analysis of your service context, metric metadata, and sample data.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/metric-review-configuration.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

Each metric configuration contains several key fields:

**Group**: The semantic category this metric belongs to, such as "Error Tracking" or "Response Time Monitoring". This grouping helps organize related metrics together in the health source and corresponds to the categories generated in the Service Context tab.

**SII Field** (Service Instance Identifier): The field that identifies the tag used to distinguish individual service instances. Common values include "pod" for Kubernetes pods, "container_id" for containers, or "host" for host-based deployments. The Configuration Agent automatically selects this based on your infrastructure definition and available metric tags.

**Risk Category**: A standardized classification that determines how the AI Verify step interprets this metric during deployment analysis. Categories include:
- ERROR - Error rates, exception counts, failure percentages
- PERFORMANCE_RESPONSE_TIME - Latency, duration, response time percentiles
- PERFORMANCE_THROUGHPUT - Request rates, transaction counts
- PERFORMANCE_OTHER - Queue depths, cache metrics
- INFRASTRUCTURE - CPU, memory, disk, network utilization

**Query**: The complete platform-specific query string used to fetch metric data from your observability platform. This query includes the metric name, aggregation function (e.g., sum, avg), tag filters derived from your service and environment context, and rollup settings that control data granularity. For example, a Datadog query might look like: `sum:trace.http.request.errors(*) by {pod}.rollup(avg, 60)`.

The Configuration tab allows you to review these settings before creating the health source. If any configuration doesn't match your requirements, you can use the Fine-Tune Metric feature to adjust it.

#### Agent Events tab

The Agent Events tab provides complete transparency into how the Configuration Agent built the query for each metric. This timeline view shows every action the agent took, including tool calls, LLM reasoning steps, and data validation, giving you full visibility into the configuration process.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/metric-review-agent-events.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

The timeline displays timestamped events in chronological order:

**Tool calls**: Each tool invocation appears with its name and timestamp. Common tools include:
- `fetch_sample_data` - Retrieves recent data points from your observability platform to validate the metric exists and has active data
- `get_metric_context` - Fetches metadata about the metric including available tags, units, and aggregation options
- `validate_query` - Verifies the generated query syntax is correct for your observability platform
- `apply_query_guardrails` - Applies platform-specific query rules and best practices

**Tool execution results**: After each tool call, you'll see "Tool: [tool_name]" indicating the tool completed successfully and returned data to the agent.

**LLM reasoning**: When the agent uses the language model to make decisions, you'll see "LLM call started (gpt-4o)" followed by the token count and duration. For example, "LLM: LLM: gpt-4o-2024-08-06 (2660 tokens)" shows the agent consumed 2660 tokens during that reasoning step. This transparency helps you understand the AI's decision-making process.

**Configuration milestones**: Key status updates appear as the agent progresses:
- "Metric configured: trace.http_request_errors" - Indicates this specific metric's configuration is complete
- "Queries built: 17 metric definitions (12 regular, 5 composites)" - Shows the final count of all metrics configured across all categories

This event timeline is especially valuable for troubleshooting. If a metric fails to configure, the Agent Events tab shows exactly which step failed and why, allowing you to provide targeted feedback through the Fine-Tune feature.

#### Fine-tune a metric

If a metric's configuration doesn't match your requirements, you can refine it using natural language instructions. Enable the **Fine-Tune Metric** toggle at the bottom of any metric card to reveal the refinement interface.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/metric-review-fine-tune.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

The Fine-Tune interface consists of:

**Toggle switch**: Located below the Configuration and Agent Events tabs, enabling this toggle reveals the feedback text area. The toggle persists per metric, so you can fine-tune multiple metrics independently.

**Text input area**: A large text field where you write natural language instructions for the Configuration Agent. The placeholder text provides example refinements: "e.g. Use p95 instead of avg, change SII field to container_id". You can describe any aspect of the configuration you want to modify, and the agent will interpret your intent and regenerate the metric configuration.

**Apply Refinement button**: Clicking this button with the AI icon triggers the Configuration Agent to reprocess the metric using your feedback as additional context. The agent re-runs its waterfall process specifically for this metric, incorporating your instructions into its decision-making.

**Common refinement scenarios**:

Change aggregation methods:
- "Use p95 instead of avg" - Switch from average to 95th percentile aggregation
- "Use max aggregation" - Change to maximum value aggregation
- "Apply sum instead of average" - Change from avg to sum aggregation

Adjust service instance identifiers:
- "Change SII field to container_id" - Use container_id instead of pod for identifying service instances
- "Use host as the SII field" - Switch to host-based instance identification

Modify query filters:
- "Add filter for environment:production" - Include environment tag filter
- "Filter by team:platform tag" - Add team-based filtering
- "Remove the region filter" - Eliminate specific tag filters

Change query parameters:
- "Use 30 second rollup instead of 60" - Adjust data granularity
- "Change rollup to max instead of avg" - Modify rollup aggregation function

After you click **Apply Refinement**, the Configuration Agent processes your feedback and updates the metric configuration. The Agent Events timeline appends new entries showing the refinement process, including how the agent interpreted your instructions and what changes it made. You can review the updated configuration in the Configuration tab and apply additional refinements if needed.

The fine-tuning process is iterative—you can refine a metric multiple times until the configuration matches your requirements. Each refinement builds on the previous configuration, allowing you to progressively adjust the metric settings through natural language conversation with the agent.

After reviewing all metrics, click **Continue** to proceed to the Query Specifications tab.

### Query Specifications tab

The Query Specifications tab provides a final review of all configured metrics before creating the health source. This tab has two panels:

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/query-specifications-tab.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

**Left panel - Queries list**: Shows all configured metrics as a scrollable list. Each entry displays:
- Metric identifier
- Raw metric name from your observability platform

Click any metric in the list to view its details in the right panel.

**Right panel - Query details**: When you select a metric from the list, the right panel shows:
- **Query**: The complete query string
- **Group Name**: Category the metric belongs to
- **Metric Name**: Display name
- **Risk Category**: Classification type
- **SII Field**: Service instance identifier field

#### Review sample data

For metrics with sample data, you can click **Fetch Records** to see a preview graph showing actual data points. The graph displays recent values for the metric, helping you verify that the query returns the expected data.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/query-specifications-graph.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

If sample data doesn't appear or looks incorrect, navigate back to the Metric Review tab using the tab navigation at the top to fine-tune the metric configuration.

Once you've reviewed all query specifications, click **Submit** to create the health source. The health source now appears in your Health Sources list and is ready to use in AI Verify step configurations.

## Handle metric configuration failures

During the Metric Review tab waterfall process, individual metrics may fail to configure if:
- The observability platform doesn't have recent data for the metric
- Query validation fails due to incorrect tag filters
- The metric was deprecated or removed from your observability platform

If some metrics fail:
- Metrics that configured successfully appear in the Query Specifications tab
- Failed metrics show error details in their Agent Events timeline
- You can proceed with the successfully configured metrics by clicking Continue
- Alternatively, navigate back to Metric Review to fine-tune failed metrics with different parameters

If all metrics fail to configure:
- The Continue button remains disabled on the Metric Review tab
- Review the Agent Events for each metric to understand why configuration failed
- Common solutions include adjusting your service context to better match available metrics or selecting different metric categories

You can also choose Manual Setup from the Overview tab if the AI-assisted approach cannot find appropriate metrics for your use case.

## Use the health source in AI Verify step

After creating an AI-assisted health source, reference it in your AI Verify step configuration just like any other health source. Add the health source identifier to the Health Source Refs field in your pipeline's AI Verify step.

The AI Verify step uses the metrics configured by the Configuration Agent to analyze deployment health. Each metric runs through the AI analysis pipeline during verification, using the queries the Configuration Agent established.
