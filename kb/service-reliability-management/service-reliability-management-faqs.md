---
title: Service Reliability Management (SRM) FAQs
description: Frequently asked questions about Harness Service Reliability Management (SRM).
sidebar_position: 10
---

## Health sources

### Why do I have to specify a start and end time when creating a health source?

The initial start and end times are placeholders. When Harness makes an actual query, the times are updated. These times are required parameters in either the query path (for Get requests) or the body (for Post requests).

### The Dynatrace health source returns a "Token is missing required scope" error.

Make sure your API token has `Read metrics` and `Read entities` permissions.

### The Dynatrace health source doesn't list any services

Only services with marked **Key Requests** are shown. Confirm that the service you want has at least one metric marked as **Key Request**.

## Metrics

### What are Metrics Packs?

In **Metrics Packs** you select the error and performance metrics to use for a health source.

### Can I apply custom thresholds to new metrics to exclude old trends?

For new metrics, Harness can check for fixed value thresholds only, not percentage deviation thresholds.

### What is the difference between the service based and host based query types?

Host based queries return service metrics grouped by host/pod name.

Service based queries return service metrics without any grouping by host/pod names.

For all the health sources, Harness converts your service based queries to a host based queries for CV, if required.

For custom health sources, Harness takes either type according to the use case.

## Verification

### What happens if the test/control pod is restarted/deleted while canary verification is in progress?

If the test pod restarts, it emits the normal metrics or new error metrics to the health source. Harness collects these and analyzes them accordingly.

If the test pod shuts down and is replaced by a new pod, the new pod is considered the canary and analyzed for the remainder of the verification duration.

If the control node restarts, Harness expects it to emit either error or normal metrics. In both cases, Harness treats the metrics as control data, since the node is a control host.

If a control pod shuts down and is replaced by a new pod, the new pod is considered the canary. This shouldn't impact the verification because the pod is on the same deployed application version.

### The primary or canary node isn't identified during verification.

The node is identified in case metrics are reported by your verification provider (such as AppD or Prometheus) for the duration of the analysis window.

Check the API call being made to determine if any nodes reported data during that time.

You can also verify this by checking the provider dashboard.

### Verification fails with a "Data collection task failed" error.

If you get the following error, make sure your Harness Delegate is updated to the latest version.

`Data collection task failed with exception: DataCollectionDSLException: Variable formulaList is being used before declaration.`

An issue was present in a previous version that caused perpetual tasks to experience significant delays in reassignment after the active delegate shut down.

### Can I use a NewRelic health source connector to verify deployment of a Non-APM metric (or OpenTelemetry app)?

To do this, you can create a custom metric health source that uses your NewRelic health source connector, and then use an NRQL query to fetch the metric data.

## Execution logs and step results

### Verify step logs contain "We couldn't find deployed node details from CD".

The following message can occur in Verify step execution logs:

`Verify step configured to use deployed node(service instance) details from CD. Received Node details from CD: Deployed in this stage: Nodes before deployment: Nodes after deployment: We couldn't find deployed node details from CD, hence falling back to default analysis based on node details from APM provider.`

This usually means you are trying to use a deployed node from a CD Deploy step, but the deployment (such as a canary or rollout deployment) hasn't occurred or you are using a custom script to deploy or scale up/down. In these cases, Harness can't identify the deployed node. As a fallback, Harness attempts to pull data for the query response from your configured health source.

### In the Verify step results, the total number of metrics under Metrics in Violation is different from the total number of configured metrics.

**Metrics in Violation** reports the total number of metrics that returned data. Configured metrics that don't report data aren't included in the total.

### The status takes a long time to update after manually marking a CV step as successful.

Manually marking a CV step as successful doesn't change the status immediately. It can take up to a minute or more to update while Harness cancels data collection and learning engine tasks behind the scenes.

## Minimally deviated control pods

### Does Harness always take the minimally deviated control pod (the "worst of best")?

Yes. Harness takes the minimally deviated control pod.

The logic is that is that the version running in the production is already good; therefore the one being deployed should be similar to it.

For example, if the canary pod metrics deviate excessively from primary pod A while remaining close to primary pod B, then it's possible that the canary pod is still functioning properly. From there, you can apply thresholds and ML analysis to arrive at a final determination.

### Is the minimally deviated pod chosen based on the first data point comparison?

No. For each minute, Harness analyzes data from the first to *n*th minute to determine which test pod is minimally deviated.

If it seems that the control pod doesn't change, this means that the same pod is consistently evaluated as the "worst of the best".

## SLOs

### When creating an SLO via Terraform provider, the request succeeds, but the SLO doesn't appear in the UI.

Confirm that all variables passed are correct. For example, `healthSourceRef` is the health source ID, not the name.

<!-- (I can't understand what the following question means, so I am commenting it out until someone can edit it for clarification.)

## Calculation on how many total comparisons will be required on the order of control, canary and queries.

The total required comparisons are calculated as:

```
(number of queries) * (canary node * primary node)
```

--->
