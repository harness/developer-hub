---
title: FAQs
description: Frequently asked questions about Harness Service Reliability Management (SRM).
sidebar_position: 10
---

## Health sources

<details>
<summary><strong>Why do I have to specify a start and end time when creating a health source?</strong></summary>

The initial start and end times are placeholders. When Harness makes an actual query, the times are updated. These times are required parameters in either the query path (for Get requests) or the body (for Post requests).
</details>

<details>
<summary><strong>The Dynatrace health source returns a "Token is missing required scope" error.</strong></summary>

Make sure your API token has `Read metrics` and `Read entities` permissions.
</details>

<details>
<summary><strong>The Dynatrace health source doesn't list any services.</strong></summary>

Only services with marked **Key Requests** are shown. Confirm that the service you want has at least one metric marked as **Key Request**.
</details>

## Metrics

<details>
<summary><strong>What are Metrics Packs?</strong></summary>

In **Metrics Packs** you select the error and performance metrics to use for a health source.
</details>

<details>
<summary><strong>Can I apply custom thresholds to new metrics to exclude old trends?</strong></summary>

For new metrics, Harness can check for fixed value thresholds only, not percentage deviation thresholds.
</details>

<details>
<summary><strong>What is the difference between the service based and host based query types?</strong></summary>

Host based queries return service metrics grouped by host/pod name.

Service based queries return service metrics without any grouping by host/pod names.

For all the health sources, Harness converts your service based queries to a host based queries for CV, if required.

For custom health sources, Harness takes either type according to the use case.
</details>

## Verification

<details>
<summary><strong>What happens if the test/control pod is restarted/deleted while canary verification is in progress?</strong></summary>

If the test pod restarts, it emits the normal metrics or new error metrics to the health source. Harness collects these and analyzes them accordingly.

If the test pod shuts down and is replaced by a new pod, the new pod is considered the canary and analyzed for the remainder of the verification duration.

If the control node restarts, Harness expects it to emit either error or normal metrics. In both cases, Harness treats the metrics as control data, since the node is a control host.

If a control pod shuts down and is replaced by a new pod, the new pod is considered the canary. This shouldn't impact the verification because the pod is on the same deployed application version.
</details>

<details>
<summary><strong>The primary or canary node isn't identified during verification.</strong></summary>

The node is identified in case metrics are reported by your verification provider (such as AppD or Prometheus) for the duration of the analysis window.

Check the API call being made to determine if any nodes reported data during that time.

You can also verify this by checking the provider dashboard.
</details>

<details>
<summary><strong>Verification fails with a "Data collection task failed" error.</strong></summary>

If you get the following error, make sure your Harness Delegate is updated to the latest version.

`Data collection task failed with exception: DataCollectionDSLException: Variable formulaList is being used before declaration.`

An issue was present in a previous version that caused perpetual tasks to experience significant delays in reassignment after the active delegate shut down.
</details>

<details>
<summary><strong>Can I use a NewRelic health source connector to verify deployment of a Non-APM metric (or OpenTelemetry app)?</strong></summary>

To do this, you can create a custom metric health source that uses your NewRelic health source connector, and then use an NRQL query to fetch the metric data.
</details>

## Execution logs and step results

<details>
<summary><strong>Verify step logs contain "We couldn't find deployed node details from CD".</strong></summary>

The following message can occur in Verify step execution logs:

`Verify step configured to use deployed node(service instance) details from CD. Received Node details from CD: Deployed in this stage: Nodes before deployment: Nodes after deployment: We couldn't find deployed node details from CD, hence falling back to default analysis based on node details from APM provider.`

This usually means you are trying to use a deployed node from a CD Deploy step, but the deployment (such as a canary or rollout deployment) hasn't occurred or you are using a custom script to deploy or scale up/down. In these cases, Harness can't identify the deployed node. As a fallback, Harness attempts to pull data for the query response from your configured health source.
</details>

<details>
<summary><strong>In the Verify step results, the total number of metrics under Metrics in Violation is different from the total number of configured metrics.</strong></summary>

**Metrics in Violation** reports the total number of metrics that returned data. Configured metrics that don't report data aren't included in the total.
</details>

<details>
<summary><strong>The status takes a long time to update after manually marking a CV step as successful.</strong></summary>

Manually marking a CV step as successful doesn't change the status immediately. It can take up to a minute or more to update while Harness cancels data collection and learning engine tasks behind the scenes.
</details>

<details>
<summary><strong>Verify step doesn't verify the Prometheus health source.</strong></summary>

If verification isn't happening for your health source, check the following configurations:

* Your query is correctly formatted.
* You selected **Continuous Verification** under the query's **Assign** section.
* You've selected the appropriate services to apply the metric to.
</details>

## Minimally deviated control pods

<details>
<summary><strong>Does Harness always take the minimally deviated control pod (the "worst of best")?</strong></summary>

Yes. Harness takes the minimally deviated control pod.

The logic is that is that the version running in the production is already good; therefore the one being deployed should be similar to it.

For example, if the canary pod metrics deviate excessively from primary pod A while remaining close to primary pod B, then it's possible that the canary pod is still functioning properly. From there, you can apply thresholds and ML analysis to arrive at a final determination.
</details>

<details>
<summary><strong>Is the minimally deviated pod chosen based on the first data point comparison?</strong></summary>

No. For each minute, Harness analyzes data from the first to *n*th minute to determine which test pod is minimally deviated.

If it seems that the control pod doesn't change, this means that the same pod is consistently evaluated as the "worst of the best".
</details>

## SLOs

<details>
<summary><strong>When creating an SLO via Terraform provider, the request succeeds, but the SLO doesn't appear in the UI.</strong></summary>

Confirm that all variables passed are correct. For example, `healthSourceRef` is the health source ID, not the name.
</details>
