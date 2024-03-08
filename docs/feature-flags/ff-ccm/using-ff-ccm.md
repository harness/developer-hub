---
title: Features Flag with Cloud Cost Management Overview
description: This page discusses using Harness Feature Flags with Cloud Cost Management, how to use it and common FAQs on how it's used. 
sidebar_position: 10
---

This topic describes using Cloud Cost Management with Harness Feature Flags (FF).

:::info note
If you'd like to learn more about Cloud Cost Management at Harness, you can have a read of the [Harness Cloud Cost Management (CCM) Overview](../../cloud-cost-management/get-started/overview.md) page.
:::

# Feature Flags with Cloud Cost Management Overview

:::info note
If you'd like to learn more about the various types of costs within Cloud Cost Management, have a look at [Harness' Cloud Cost Management Key Concepts](../../cloud-cost-management/get-started/key-concepts.md) page. 
:::

When a feature is enabled/disabled it may contribute to increased running costs.  For example:

 a new feature that introduces caching using GCP memstore may improve user experience by speeding up response times, but due to the increased amount of data stored in the cache, and increased volume of requests this could lead to higher running costs.

 

The purpose of this feature is to make it easy for customers to identify when enabling a feature may have lead to cost anomalies.  The feature flags module will integrate with the Harness cloud cost module (CCM) and correlate flag change events with cost anomalies i.e.

 

A CCM Perspective will be associated with a feature flag environment.   

If a flag is changed within that environment it will be added to a watch list for 24hours.

Every hour CCM will be queried to check for anomalies in the perspective.   If an anomaly is reported, then feature flags will correlate that anomaly with any flags currently on the watch list.

 

The feature flags UI will report the presence of anomalies, making it easy for the user to find which flags maybe related to the reported anomalies.


## Why use the Cloud Cost Management tool within Feature Flags?​

Using Cloud Cost Management within Feature Flags will help you to: 

1. *Increase Visibility*: Prior to this integration, customers had limited visibility into the costs of enabling or modifying features within their applications. This made it challenging for Harness users to identify any cost related cloud costs which was in relations to the Feature Flags tool. Now you're able to gain insights into the cost of your Feature Flags 

2. *Have an Improved Proactive Cost Management Experience*: Rather than relying on reactive approaches to managing the cloud costs specifically to Feature Flags, you can now have real-time insights into the impact of your Feature Flag changes and optimize your cloud spending into a less manual and time-consuming process. 

3. *Adopt Higher Level Troubleshooting*: You'll be able to pinpoint the root cause of any cost ananomalies to any events around your Feature Flag changes. The hope we have at Harness is that this will help you to reduce time to finding solutions around any cost disparaties as well as help to improve your operational effiency of your products.

## 'New Feature' Architecture 

### Architecture Diagram 1

When inserting images, ensure you are providing descriptions and writing an 
introductory line or paragraph to the diagram. 

![Your diagram. ](./path/to/diagram.png)

### Architecture Diagram 2

When inserting images, ensure you are providing descriptions and writing an 
introductory line or paragraph to the diagram.

## Another Section

### Another Subsection

Example of a table if needed:

| Column 1    | Column 2    | Column 3    | Column 4    |
| ----------- | ----------- | ----------- | ----------- |
| <Row 1>.    | <Row 2>.    |  <Row 3.>.  | <Row 4.>.   |
| <Row 1>.    | <Row 2>.    |  <Row 3>.   | <Row 4.>.   |


## FAQs About Your Feature

### Question 1

<insert text>

### Question 2

<insert text>

## Related Pages

You can provide links to any related pages. 
