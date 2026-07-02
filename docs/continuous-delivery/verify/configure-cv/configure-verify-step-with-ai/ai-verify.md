---
title: Configure the AI Verify (v2) step
description: Add the AI Verify (v2) step to your pipeline for automated deployment verification
sidebar_label: AI Verify (v2) Step
slug: /continuous-delivery/verify/configure-cv/configure-verify-step-with-ai/ai-verify
sidebar_position: 3
---

This guide shows how to add and configure the AI Verify (v2) step in your deployment pipeline. Before proceeding, ensure you have [created AI-assisted health sources](/docs/continuous-delivery/verify/configure-cv/configure-verify-step-with-ai/ai-assisted-health-source) to define what metrics and logs to analyze. For an overview of how AI-powered verification works, see the [Overview](/docs/continuous-delivery/verify/configure-cv/configure-verify-step-with-ai/overview).

The AI Verify (v2) step deploys data collection plugins (not LLM agents) into your Kubernetes cluster. These plugins collect and aggregate data while stripping personally identifiable information before it leaves your cluster. Anomaly detection uses statistical and algorithmic methods, with LLMs augmenting results through contextualization and insight generation.

:::note
AI Verify is behind feature flags `CDS_CV_AI_VERIFY_NG` and `CDS_CV_HEALTH_SOURCES_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable these features.
:::

## Add the AI Verify (v2) step

:::important
AI Verify (v2) must be added inside a **Container Step Group** (not as a standalone step). The step group provides the infrastructure configuration needed to deploy data collection plugins.
:::

Open your pipeline and navigate to the Execution section of your deployment stage. After the deployment completes, click **Add Step Group** to create a container step group. Inside the step group, click **Add Step** and search for **AI Verification**. Select the **AI Verify (v2)** tile (with purple icon).

The step configuration opens with two tabs:
- **Step Parameters**: Configure data collection, sensitivity, health sources, and infrastructure
- **Advanced**: Access advanced settings like conditional execution and failure strategies

## Configure step parameters

The Step Parameters tab contains all the settings for configuring the AI Verify step. The configuration is organized into several sections:

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/ai-verify-step.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

| Parameter | Description | Required | Default |
|-----------|-------------|----------|---------|
| **Name** | Name of the AI Verify step | Yes | - |
| **Description** | Optional description for the step | No | - |
| **Data Collection Window** | Time duration for collecting logs and metrics (e.g., `5m`) | Yes | - |
| **Sensitivity** | How strictly anomaly detection evaluates deviations (LOW, MEDIUM, HIGH) | No | MEDIUM |
| **Timeout** | Maximum time for the entire step execution (e.g., `10m`) | Yes | - |
| **Fail on No Analysis** | Whether to fail the pipeline if analysis cannot be performed | No | false |
| **Health Source Refs** | List of health source identifiers to analyze | Yes | - |
| **Data Collection Infrastructure Type** | Where to run data collection plugin pods (KubernetesDirect) | Yes | - |
| **Connector** | Kubernetes cluster connector reference | Yes | - |
| **Namespace** | Kubernetes namespace for deploying plugin pods | Yes | - |
| **Limit Memory** | Maximum memory per plugin container (e.g., `256Mi`) | Yes | - |
| **Limit CPU** | Maximum CPU per plugin container (e.g., `250m`) | Yes | - |

### Name

Give the step a name that describes what it's verifying, such as "AI Verify Payment Service" or "Verify Production Deployment". This name appears in the pipeline execution view and helps identify which verification is running.

### Description

Add an optional description to provide additional context about what this verification step validates. This field is useful for documenting the purpose of specific health sources or verification scenarios.

### Data Collection Window

This controls how long the data collection plugins collect data from your observability platforms. The window starts when the step begins execution, so ensure your deployment is fully rolled out before the AI Verify step runs. Common values are `5m` for most deployments, `3m` for quick verifications, or `10m` for services that need longer observation periods.

### Sensitivity

The sensitivity setting controls how strictly the anomaly detection evaluates deviations. Choose from three levels:

- **Low**: Reduces false positives on services with high variability or frequent changes
- **Medium**: Balanced approach suitable for most production services (default)
- **High**: Catches smaller deviations, best for stable services with predictable behavior

### Timeout

The timeout value must exceed the data collection window because it includes both data collection and analysis processing time. Setting the timeout to `10m` when your data collection window is `5m` leaves enough buffer for the plugins to complete data collection and for the analysis to finish. If the step exceeds the timeout, it fails regardless of the analysis results.

### Fail on No Analysis

This checkbox determines whether the pipeline should fail if the analysis cannot be performed (e.g., no data collected, plugin deployment failed). When set to true, the pipeline fails if analysis cannot complete. When set to false (default), the step reports the issue but allows the pipeline to continue. This is separate from failing based on detected anomalies—that behavior is controlled by the Sensitivity threshold.

### Health Sources

The Health Sources section displays all health sources you've added to this step. Click **+ Add** to select health sources from those created for this project.

Each health source in the list shows:
- Health source name
- Type badge (LOG or METRIC) indicating the data type
- Edit and delete icons for managing the list

You can add multiple health sources to analyze both logs and metrics from the same deployment. Each health source runs as a separate analysis with its own plugin pod and independent verdict. The step tracks each health source analysis separately, allowing you to identify which specific health source detected issues if the verification fails.

**Note**: The health sources must be created at the project, organization, or account level before they can be referenced here. See [AI-assisted health source configuration](/docs/continuous-delivery/verify/configure-cv/configure-verify-step-with-ai/ai-assisted-health-source) for creating health sources.

### Data Collection Infrastructure

This section configures where and how the data collection plugin pods run.

**Infrastructure type**: Select where the data collection plugin pods run. Currently only **KubernetesDirect** is supported, which deploys plugins directly into a Kubernetes cluster.

### Connector

Choose a Kubernetes connector that has permissions to create pods, read logs, and delete pods in the target namespace. The connector provides the cluster endpoint and authentication credentials needed to deploy the data collection plugin pods.

The connector dropdown shows the connector name and a scope indicator (PROJECT, ORG, or ACCOUNT) showing where the connector is defined. You can select connectors from any scope accessible to your current project.

### Namespace

Enter the Kubernetes namespace where you want the data collection plugin pods to run. This namespace must already exist and have sufficient resource quota to accommodate multiple pods running concurrently. Each health source creates one pod, so adding three health sources means three pods deploy simultaneously.

### Resources

Resource limits control the maximum CPU and memory each plugin container can consume.

**Limit Memory**: Maximum memory per plugin container. The default value is `256Mi`, which handles typical workloads. Increase to `512Mi` or higher if you're analyzing high volumes of data or experiencing out-of-memory errors.

**Limit CPU**: Maximum CPU per plugin container. The default value is `250m` (quarter of a core), which handles typical workloads. Increase to `500m` or `1000m` if you see CPU throttling in pod metrics or need faster data processing.

Each field accepts Kubernetes resource notation (e.g., `250m` for CPU, `250Mi` for memory). The blue refresh icon next to each field allows you to use runtime inputs or expressions.

## View execution results

Once the pipeline runs, click on the AI Verify step to open its execution details. The Analysis tab shows the complete verification results with the verification status at the top, followed by detailed insights and visualizations.

The verification status banner shows whether the analysis passed or failed. When issues are detected, the interface displays a detailed breakdown including Summary, Root Cause Hypothesis, Recommendation, Evidence, and Actionable Fix sections. These insights come from LLM contextualization of the statistical anomaly detection results.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/analysis-summary-panel.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

The summary explains what went wrong in natural language. The Root Cause Hypothesis section identifies the underlying issue based on patterns across your logs and metrics. Recommendations provide actionable next steps for addressing detected problems. The Evidence section shows specific data points that triggered the failure, and Actionable Fix suggests concrete remediation steps.

Below the summary, the Analysis tab displays the complete execution view with three main components: agent timeline on the left, scatter plot visualization in the center, and execution metadata at the top.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/analysis-tab-complete.png')} width="80%" height="80%" title="Click to view full size image" />
</div>

The agent timeline displays each processing phase with duration metrics. You'll see Clustering Agent, Data Gatekeeper Agent, and other analysis components that processed your deployment data. Each entry shows how long that phase took, giving you visibility into the verification workflow. Click the arrow next to any entry to expand and view detailed logs for that phase.

The scatter plot visualizes analyzed data points across multiple dimensions, showing Critical Regression and Non-Blocking Regression indicators. Normal behavior clusters together while anomalies appear as outliers. Hover over clusters to see details like the number of ignored clusters or specific regression classifications.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/scatter-plot-visualization.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

Click View Detailed Analysis to open a full-screen view with cluster-by-cluster breakdowns, individual log patterns, and metric anomaly timelines.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/events-list-tab.png')} width="80%" height="80%" title="Click to view full size image" />
</div>

The Events List tab provides an alternative view showing all events with health indicators (Healthy, Warn, Unhealthy) and event types like NON_BLOCKING_REGRESSION or IGNORED_CLUSTER. This tab helps you drill down into specific issues and understand which clusters or patterns were flagged during analysis.

The Details tab shows standard execution information like start time, duration, and timeout configuration. The Input and Output tabs display the step's configuration parameters and execution outputs respectively.


## Write the YAML configuration

You can configure the AI Verify (v2) step directly in YAML if you prefer editing pipelines as code. The step type is `AIVerifyNG` and must be inside a **stepGroup** with **stepGroupInfra** configuration.

```yaml
pipeline:
  name: AI-verify-Deploy-check
  identifier: AIverifyDeploycheck
  projectIdentifier: my_project
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: deploy-and-verify
        identifier: deployAndVerify
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: my_service
          environment:
            environmentRef: my_environment
            deployToAll: false
            infrastructureDefinitions:
              - identifier: my_infrastructure
          execution:
            steps:
              - stepGroup:
                  name: ai-verify-step-group
                  identifier: aiVerifyStepGroup
                  steps:
                    - step:
                        type: AIVerifyNG
                        name: AIVerifyV2_1
                        identifier: AIVerifyV2_1
                        spec:
                          dataCollectionWindow: 5m
                          healthSources:
                            - healthSourceRef: my_health_source_1
                            - healthSourceRef: my_health_source_2
                          resources:
                            limits:
                              cpu: 250m
                              memory: 256Mi
                        timeout: 10m
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: my_k8s_connector
                      namespace: harness-delegate-ng
            rollbackSteps: []
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
```

**Key fields:**

- **stepGroup**: AI Verify (v2) must be inside a step group (not a standalone step)
  - `steps`: Contains the AIVerifyNG step
  - `stepGroupInfra`: Defines where data collection plugins run
    - `type`: KubernetesDirect (currently the only supported type)
    - `spec.connectorRef`: Kubernetes connector identifier
    - `spec.namespace`: Kubernetes namespace for plugin pods

- **AIVerifyNG step fields**:
  - `name`: Step name (e.g., `AIVerifyV2_1`)
  - `identifier`: Step identifier (e.g., `AIVerifyV2_1`)
  - `timeout`: Maximum time for the entire step execution (must be at step level). Should be significantly longer than dataCollectionWindow to allow for analysis processing.
  - `spec.dataCollectionWindow`: Time duration for collecting logs and metrics (e.g., `5m`, `10m`, or `<+input>` for runtime input)
  - `spec.healthSources`: List of health source references (use `healthSourceRef` for each)
    - Each health source must be created beforehand at project/org/account level
    - Can include both LOG and METRIC type health sources
  - `spec.resources.limits`: CPU and memory limits for each plugin pod
    - `cpu`: e.g., `250m` (250 millicores)
    - `memory`: e.g., `256Mi` (256 mebibytes)
