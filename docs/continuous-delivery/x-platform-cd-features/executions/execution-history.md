---
title: Execution History
description: Learn more about the execution history of a pipeline. Where to find it and what information it contains.
sidebar_position: 7
---

This topic covers the execution history page for any given pipeline. Reading this page should tell you how to navigate to it, and what information is contained within.

## Where Can I Find Execution History?

There are a few places you can look to find the execution history of your pipeline or all pipelines.

### Executions Tab

Find the execution history of all pipelines for a given project in the left navigation tab:

![](./static/leftnav-executions-tab.png)

### Pipelines Tab

In the pipelines tab, click the button for more actions on the pipeline you're interested in and select `View Executions`.

![](./static/pipelinetab-executions.png)

### Pipeline Studio

You can find the execution history on the top right corner when you are in the pipeline studio for a given pipeline.

![](./static/pipelinestudio-execution-history.png)

## Execution Reference

Each execution has the following information displayed for it. Each execution also has more information if you click the arrow on the left of it and open the dropdown. 

1. **Pipeline Name**
    - The name of the pipeline and execution id.
    - When expanded, this column also shows the name of each stage in the pipeline. 
2. **Status**
    - Shows the status of the execution. The options are `SUCCESS`, `FAILED`, `ABORTED`, `EXPIRED`.
    - When expanded, shows the status of each stage as an emoji. You can hover over the emoji for more info.
3. **Service**
    - Shows the service used for the pipeline. For pipelines with more than one service, a `+X` modifier will be displayed where `X` is the number of additional services. 
    - When expanded, this column shows the service for each individual stage of the pipeline.
    - Hover over the service name to see the artifact attached to that service. 
4. **Environment**
    - Shows the infrastructure used for the pipeline. For pipelines with more than one associated environment, a `+X` modifier will be displayed where `X` is the number of additional environments.
    - When expanded, this column shows the environment for each individual stage of the pipeline.
    - Hover over the environment name to see the infrastructure associated with the environment.
5. **Trigger** (This column is unlabeled)
    - This column shows the origin of each execution.
6. **Execution Start Time**
    - Shows the user, method, and start time of the execution.
7. **Details Button**
    - The final column is a button for each pipeline offering additional execution actions including:
    - Add Execution Notes
    - View Execution
    - Edit Pipeline
    - [Re-run Pipeline](/docs/platform/pipelines/resume-pipeline-deployments/)
    - [Abort Pipeline](/docs/platform/pipelines/abort-pipeline/#aborting-a-pipeline)
    - [View Compiled YAML](/docs/platform/pipelines/view-and-compare-pipeline-executions/#view-compiled-yaml)
    - [Compare Pipeline](/docs/platform/pipelines/view-and-compare-pipeline-executions/#compare-executions)
    - [Download Logs](/docs/platform/pipelines/download-logs/)

