---
title: Use Investigator Agent Pipelines
description: Extend the AI Investigator with custom data sources and analysis logic using pipeline stages to investigate incidents with domain-specific context.
sidebar_label: Use Investigator Agent Pipelines
sidebar_position: 4
---

# Use Investigator Agent Pipelines

:::warning Early Access Feature
Investigator Agent Pipelines are currently in **Early Access**. The core end-to-end flow is functional, but full productionization features (UI pipeline builder, pipeline marketplace, enhanced error handling) are planned for Q2 2026. Contact your Harness representative to enable this feature for your organization.
:::

Investigator Agent Pipelines enable teams to extend the AI Investigator with custom investigation steps that run alongside the built-in RCA Change Agent. Use pipelines to connect domain-specific data sources, execute custom analysis logic, and enrich incident investigations with context unique to your infrastructure.

## Overview

The AI Investigator analyzes incidents using multiple data sources to identify root cause candidates. While the built-in RCA Change Agent provides out-of-the-box investigation capabilities (deployments, pull requests, ServiceNow changes), many teams have unique infrastructure, internal tools, or domain-specific knowledge that requires custom investigation logic.

**Investigator Agent Pipelines solve this by:**

- Connecting custom data sources (internal wikis, observability tools, vendor APIs)
- Running domain-specific analysis logic (canary metric checks, change database queries, compliance validations)
- Enriching investigations with infrastructure-specific context (cloud provider metadata, network topology, service dependencies)

## What Are Agent Pipelines?

Agent pipelines are custom investigation workflows built using Harness pipeline stages. When an incident is created (or manually triggered), the pipeline executes and returns investigation results that appear alongside built-in RCA theories in the Investigator panel.

### Key Characteristics

- **Build once, run on every incident**: Pipelines run automatically without per-incident manual steps
- **Appear alongside built-in theories**: Custom pipeline results display in the same Investigator panel as RCA Change Agent theories
- **Flexible data sources**: Connect any API, database, or internal tool accessible from Harness pipelines
- **Domain-specific logic**: Implement analysis specific to your infrastructure (e.g., query deployment canary metrics, check feature flag states, validate compliance)

## How It Works

### Pipeline Execution Flow

1. **Incident Created**: An incident is created in Harness AI SRE (manually or via alert rule)
2. **Pipeline Triggered**: Configured agent pipelines trigger automatically on incident creation
3. **Investigation Runs**: Pipeline stages execute custom investigation logic (API calls, data fetches, analysis)
4. **Results Returned**: Pipeline outputs are captured and formatted as investigation results
5. **Display in Investigator**: Results appear in the Investigator panel alongside built-in RCA theories

### Input Contract

Agent pipelines receive incident context as input variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `incident_id` | Unique identifier for the incident | `INC-12345` |
| `incident_title` | Incident title | `High API latency in production` |
| `incident_severity` | Severity level | `critical`, `high`, `medium`, `low` |
| `affected_services` | List of impacted services | `["api-gateway", "auth-service"]` |
| `incident_start_time` | Incident start timestamp (ISO 8601) | `2026-04-30T14:23:00Z` |
| `environment` | Affected environment (if available) | `production`, `staging` |

Pipelines can use these variables to scope investigation queries and analysis.

### Output Contract

Pipelines return investigation results in a structured format:

```json
{
  "theories": [
    {
      "title": "Recent deployment to api-gateway",
      "description": "Deployment api-gateway-v2.3.1 rolled out 5 minutes 
         before incident start. Canary metrics show 
         p99 latency increased from 200ms to 1500ms.",
      "confidence": 85,
      "evidence": [
        {
          "type": "deployment",
          "source": "Internal Deployment Tracker",
          "timestamp": "2026-04-30T14:18:00Z",
          "details": "api-gateway-v2.3.1 deployed to production"
        },
        {
          "type": "metric",
          "source": "Canary Dashboard",
          "metric_name": "p99_latency_ms",
          "value": 1500,
          "threshold": 500
        }
      ]
    }
  ]
}
```

**Field Definitions:**

- **title**: Short summary of the theory (shown in Investigator panel)
- **description**: Detailed explanation with supporting evidence
- **confidence**: Confidence score (0-100) indicating likelihood this is the root cause
- **evidence**: Array of supporting data points (deployments, metrics, logs, configuration changes)

## Supported Step Types

Agent pipelines use standard Harness pipeline stages to execute investigation logic:

### Data Fetch Steps

Query external data sources and APIs:

- **HTTP Step**: Call REST APIs (internal wikis, custom change databases, vendor APIs)
- **Shell Script Step**: Execute custom scripts (query internal databases, parse logs, check file systems)
- **Container Step**: Run containerized analysis tools (custom Python/Go scripts, ML models, domain-specific analyzers)

### Analysis Steps

Process data and generate insights:

- **Shell Script Step**: Run custom analysis logic (correlate metrics, parse deployment logs, calculate impact)
- **Container Step**: Execute complex analysis (ML inference, anomaly detection, pattern matching)

### Enrichment Steps

Add context from infrastructure-specific sources:

- **HTTP Step**: Fetch metadata from cloud providers (AWS, GCP, Azure), service meshes (Istio, Linkerd), or custom CMDBs
- **Shell Script Step**: Query internal documentation wikis, runbook repositories, or compliance databases

## Creating an Agent Pipeline

### Step 1: Define the Pipeline

1. Navigate to **Pipelines** in your Harness project.
2. Click **Create Pipeline**.
3. Name the pipeline descriptively (e.g., `Investigate Canary Metrics`, `Query Internal Change DB`).
4. Select **Pipeline** type.

### Step 2: Add Investigation Stages

Add stages to fetch data, run analysis, and format results:

**Example Stage: Query Internal Deployment API**

```yaml
- stage:
    name: Fetch Recent Deployments
    identifier: fetch_deployments
    type: Custom
    spec:
      execution:
        steps:
          - step:
              type: Http
              name: Query Deployment API
              identifier: query_deployment_api
              spec:
                url: https://internal-api.company.com/deployments
                method: GET
                headers:
                  - key: Authorization
                    value: Bearer <+secrets.getValue("deployment_api_token")>
                requestBody: |
                  {
                    "services": <+pipeline.variables.affected_services>,
                    "start_time": <+pipeline.variables.incident_start_time>,
                    "lookback_minutes": 30
                  }
                outputVariables:
                  - name: deployments
                    type: String
                    value: <+httpResponseBody>
```

**Example Stage: Analyze Canary Metrics**

```yaml
- stage:
    name: Analyze Canary Metrics
    identifier: analyze_canary
    type: Custom
    spec:
      execution:
        steps:
          - step:
              type: ShellScript
              name: Check Canary Health
              identifier: check_canary
              spec:
                shell: Bash
                onDelegate: true
                source:
                  type: Inline
                  spec:
                    script: |
                      #!/bin/bash
                      # Parse deployment data
                      DEPLOYMENTS='<+execution.steps.query_deployment_api.
                        output.outputVariables.deployments>'
                      
                      # Query Prometheus for canary metrics
                      for deployment in $(echo $DEPLOYMENTS | jq -r '.[] | @base64'); do
                        SERVICE=$(echo $deployment | base64 -d | jq -r '.service')
                        DEPLOY_TIME=$(echo $deployment | base64 -d | jq -r '.timestamp')
                        
                        # Query p99 latency 10 minutes before and after deployment
                        BEFORE=$(curl -s "https://prometheus.company.com/api/v1/
                           query?query=p99_latency{service='$SERVICE'}[10m]&time=$DEPLOY_TIME")
                        AFTER=$(curl -s "https://prometheus.company.com/api/v1/query?
                           query=p99_latency{service='$SERVICE'}[10m]&time=$((DEPLOY_TIME + 600))")
                        
                        # Compare and output if latency increased > 50%
                        # ... analysis logic ...
                      done
                outputVariables:
                  - name: canary_results
                    type: String
                    value: <+execution.steps.check_canary.output.outputVariables.canary_results>
```

### Step 3: Format Results

Add a final stage to format investigation results according to the output contract:

```yaml
- stage:
    name: Format Investigation Results
    identifier: format_results
    type: Custom
    spec:
      execution:
        steps:
          - step:
              type: ShellScript
              name: Build Theory JSON
              identifier: build_theory
              spec:
                shell: Bash
                onDelegate: true
                source:
                  type: Inline
                  spec:
                    script: |
                      #!/bin/bash
                      cat <<EOF > /harness/output.json
                      {
                        "theories": [
                          {
                            "title": "Recent deployment to api-gateway",
                            "description": "Deployment api-gateway-v2.3.1 rolled out 
                               5 minutes before incident start. Canary metrics show 
                               p99 latency increased 
                               from 200ms to 1500ms.",
                            "confidence": 85,
                            "evidence": [
                              {
                                "type": "deployment",
                                "source": "Internal Deployment Tracker",
                                "timestamp": "<+pipeline.variables.incident_start_time>",
                                "details": "api-gateway-v2.3.1 deployed to production"
                              }
                            ]
                          }
                        ]
                      }
                      EOF
```

### Step 4: Configure Triggers

Set up the pipeline to run automatically on incident creation:

1. Click the **Triggers** tab in your pipeline.
2. Click **Add Trigger**.
3. Select **Incident Created** as the trigger type.
4. Configure filter conditions (optional):
   - Trigger only for specific severity levels
   - Trigger only for specific incident types
   - Trigger only for specific services
5. Save the trigger.

## Connecting Custom Data Sources

### Internal APIs

Use the **HTTP Step** to query internal APIs:

- **Authentication**: Store API tokens in Harness Secrets and reference via `<+secrets.getValue("token_name")>`
- **Request body**: Pass incident context as JSON payload
- **Response parsing**: Use `jq` in Shell Script steps to parse JSON responses

### Observability Tools

Query metrics, logs, and traces from observability platforms:

- **Prometheus**: Query metrics using PromQL via HTTP API
- **Grafana**: Fetch dashboard snapshots or panel data via Grafana API
- **Elasticsearch**: Query logs using Elasticsearch Query DSL
- **Custom Observability**: Call vendor-specific APIs (Honeycomb, Lightstep, etc.)

### Internal Databases

Use the **Shell Script Step** to query databases:

- **PostgreSQL**: Use `psql` CLI or connection libraries
- **MySQL**: Use `mysql` CLI or connection libraries
- **MongoDB**: Use `mongosh` or language-specific drivers
- **Redis**: Use `redis-cli` or connection libraries

### Cloud Provider APIs

Fetch infrastructure metadata:

- **AWS**: Query EC2, ECS, Lambda metadata using AWS CLI or SDKs
- **GCP**: Query GCE, GKE, Cloud Run metadata using gcloud CLI or SDKs
- **Azure**: Query VM, AKS, Functions metadata using az CLI or SDKs

## Viewing Investigation Results

### In the Investigator Panel

When agent pipelines complete, their results appear in the Investigator panel alongside built-in RCA Change Agent theories:

1. Open the **Incident Details** page.
2. Click the **Investigator** tab (or similar panel).
3. View theories from multiple sources:
   - **RCA Change Agent**: Deployments, pull requests, ServiceNow changes
   - **Custom Agent Pipelines**: Results from your configured pipelines
4. Each theory displays:
   - **Title**: Short summary
   - **Confidence score**: 0-100
   - **Evidence**: Supporting data points
   - **Source**: Which agent or pipeline generated the theory

### Pipeline Execution Status

Check which pipelines ran and their outputs:

1. Open the **Incident Details** page.
2. Click the **Activity** or **Timeline** tab.
3. Look for events indicating pipeline execution:
   - "Investigator pipeline started: [pipeline name]"
   - "Investigator pipeline completed: [pipeline name]"
   - "Investigator pipeline failed: [pipeline name]"
4. Click the event to view detailed pipeline execution logs.

## Use Cases

### Query Internal Change Databases

**Scenario:** Your organization tracks changes in an internal database not covered by built-in integrations.

**Solution:** Create a pipeline that queries the change database for recent changes affecting incident-related services and returns them as theories.

### Check Deployment Canary Metrics

**Scenario:** Deployments include canary analysis, but Harness AI SRE does not automatically check canary health.

**Solution:** Create a pipeline that fetches recent deployments, queries canary metrics from Prometheus, and flags deployments with degraded canary health.

### Validate Feature Flag States

**Scenario:** Feature flags control critical behavior, and incidents may be caused by recent flag changes.

**Solution:** Create a pipeline that queries your feature flag platform (LaunchDarkly, Split, etc.) for flags changed near the incident start time.

### Enrich with Vendor-Specific Data

**Scenario:** You use a vendor-specific tool (e.g., proprietary observability platform, custom CMDB) with no native Harness integration.

**Solution:** Create a pipeline that calls the vendor API, fetches relevant data, and includes it as investigation evidence.

## Early Access Limitations

The current Early Access release supports the core end-to-end flow but has these limitations:

### What Works Today

✅ Pipeline execution on incident creation  
✅ Input/output contracts for investigation data  
✅ Results display in Investigator panel  
✅ Manual pipeline triggers  
✅ Integration with Harness Secrets for authentication  

### Coming in Q2 2026

⏳ **UI Pipeline Builder**: Visual editor for building agent pipelines without YAML  
⏳ **Pipeline Marketplace**: Pre-built pipelines for common integrations (AWS, GCP, Datadog, custom APIs)  
⏳ **Enhanced Error Handling**: Retry logic, timeout configuration, partial result handling  
⏳ **Result Deduplication**: Automatic deduplication when multiple pipelines return similar theories  
⏳ **Confidence Score Calibration**: UI tools for tuning confidence score weights  

### Workarounds for Early Access

- **No UI builder**: Write pipelines in YAML or use Harness Pipeline Studio
- **No marketplace**: Copy example pipelines from this documentation and adapt to your infrastructure
- **Limited error handling**: Implement retry logic and timeouts in pipeline stages manually
- **Manual deduplication**: Design pipelines to avoid overlapping investigation scopes

## Best Practices

### For Pipeline Design

- **Keep pipelines focused**: One pipeline per investigation type (e.g., separate pipelines for deployments vs. feature flags)
- **Set timeouts**: Configure stage-level timeouts to prevent hanging investigations (recommend 5-10 minutes)
- **Use secrets management**: Store API tokens and credentials in Harness Secrets, never hardcode
- **Log extensively**: Output detailed logs in Shell Script steps for troubleshooting
- **Test before production**: Run pipelines manually on test incidents before enabling automatic triggers

### For Investigation Quality

- **Include evidence**: Provide specific data points (timestamps, metric values, deployment IDs) in theory evidence
- **Calculate confidence accurately**: Higher confidence for stronger correlations (e.g., deployment 2 minutes before incident start = high confidence)
- **Avoid false positives**: Filter out unrelated changes (e.g., changes to unaffected services)
- **Surface actionable insights**: Theory descriptions should guide responders toward next steps

### For Performance

- **Parallelize data fetching**: Use parallel stages to query multiple data sources simultaneously
- **Cache frequently accessed data**: Store static data (service topology, configuration) in pipeline variables
- **Limit lookback windows**: Query only relevant time ranges (e.g., 30 minutes before incident start)
- **Paginate large result sets**: Fetch only the most recent N records to avoid overwhelming the Investigator panel

## Troubleshooting

<details>
<summary><strong>Pipeline executes but no results appear in Investigator panel</strong></summary>

**Possible causes:**
- Output JSON does not match the expected contract
- Pipeline completed with errors
- Results were empty (no theories generated)

**Resolution:**
1. Check pipeline execution logs for errors
2. Verify the output JSON matches the structure in the Output Contract section
3. Ensure at least one theory is returned in the `theories` array
4. Check the incident's Activity tab for pipeline execution events

</details>

<details>
<summary><strong>Pipeline fails with authentication errors</strong></summary>

**Possible causes:**
- API token or secret is expired or incorrect
- Secret reference syntax is wrong
- Insufficient permissions on the external API

**Resolution:**
1. Verify the secret exists in Harness Secrets
2. Check the secret reference syntax: `<+secrets.getValue("secret_name")>`
3. Test API authentication outside the pipeline (e.g., using cURL)
4. Rotate the API token if expired

</details>

<details>
<summary><strong>Pipeline times out or takes too long</strong></summary>

**Possible causes:**
- External API is slow or unresponsive
- Query result set is too large
- Missing stage-level timeout configuration

**Resolution:**
1. Set stage-level timeouts (recommend 5-10 minutes)
2. Optimize queries to fetch only necessary data
3. Implement pagination for large result sets
4. Consider caching frequently accessed data

</details>

## Next Steps

- Go to [Use RCA Change Agent](/docs/ai-sre/ai-agent/rca-change-agent) to learn about the built-in investigation capabilities.
- Go to [Use AI Scribe Agent](/docs/ai-sre/ai-agent) to understand how the AI Scribe captures incident context used by agent pipelines.
- Go to [Create Runbooks](/docs/ai-sre/runbooks/create-runbook) to automate response actions based on investigation findings.

## Feedback and Support

Investigator Agent Pipelines are in Early Access. Share feedback or request features:

- **Email**: [ai-sre-support@harness.io](mailto:ai-sre-support@harness.io)
- **Slack**: `#ai-sre-early-access` (Harness Community Slack)
- **GitHub**: [harness/developer-hub](https://github.com/anthropics/claude-code/issues) (file feature requests)

Contact your Harness representative to enable this feature for your organization.
