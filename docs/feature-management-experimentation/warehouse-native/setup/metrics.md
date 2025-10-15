---
title: Create a Metric for Warehouse Native Experimentation in Harness FME
sidebar_label: Create a Metric Definition
description: Learn how to create a metric, select a metric source, and set calculation logic for Warehouse Native Experimentation..
sidebar_position: 5
---

<CTABanner
  buttonText="Request Access"
  title="Warehouse Native is in beta!"
  tagline="Get early access to run Harness FME experiments directly in your data warehouse."
  link="https://developer.harness.io/docs/feature-management-experimentation/fme-support"
  closable={true}
  target="_self"
/>

## Overview

This page explains how to create, manage, and troubleshoot metric definitions for Warehouse Native Experimentation in Harness FME. A <Tooltip id="fme.warehouse-native.metric">metric</Tooltip> specifies how success is measured in an <Tooltip id="fme.warehouse-native.experiment">experiment</Tooltip> by associating a metric source to business logic (i.e. an event type, aggregation method, or impact direction) so your team can consistently measure outcomes. 

## Setup

To create a metric in Harness FME, navigate to **Metrics** in the navigation menu and click **Create metric**.

Then, configure the following components in the side panel: 

* **General Details**: Set the metric name, owners, description, and category.
* **Metric Source and Events**: Choose where the data comes from and which events are included.
* **Calculation Logic**: Define how the metric is measured and what type of change indicates success.

Once configured, metric definitions form a trusted, reusable library of success measures. Analysts and experiment owners can apply them across experiments to ensure consistent, aligned reporting on what success means to your business.

### General details

1. Enter a clear, descriptive name such as `Count of Pricing Page Views` or `Average Page Load Time` in the **Name** field.
1. Assign one or more stakeholders responsible for the metric in the **Owners** dropdown menu. Owners help maintain accountability, serve as points of contact for other teams, and are notified if a metric alert policy is fired.
1. Optionally, add tags to help organize metrics by team, product area, or business goal in the **Tags** field.
1. Optionally, add an explanation of what the metric measures in the **Description** field. For example, `This metric measures the average cart value of users who complete a purchase`.
1. Assign a category in the **Metric category** dropdown menu for easier organization. You can also mark a metric as a **Guardrail Metric**.
   
   :::info
   [Guardrail metrics](/docs/feature-management-experimentation/experimentation/metrics/categories/) are automatically included in all experiments and represent critical system or user health indicators that you always want to monitor, such as latency, error rates, churn, or customer satisfaction. These help ensure that while you're optimizing for your primary success metric, you aren't unintentionally degrading key performance or user experience.
   :::

### Metric source and events

1. Select a **Metric source** that contains the event data to measure. This determines which dataset the calculation uses.
1. Choose the level of aggregation (such as `user`, `account`, or `session`) in the **Select traffic type** dropdown menu to ensure the metric attributes events correctly.
1. Select one or more events from the metric source that define the behavior being measured (for example, `purchase`, `page_view`, or `sign_up`) in the **Events** dropdown menu.

### Calculation logic

1. Specify whether the metric should increase (e.g. conversion rate, revenue) or decrease (e.g. latency, error rate) to indicate success in the **Select desired impact** dropdown menu.
1. Choose how the metric is calculated in the **Measure as** dropdown menu. Harness FME supports multiple aggregation types:

   | Measure As                                          | Description                                                                          | Example Use Cases                                   |
   | --------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------- |
   | **Count of events per user**                        | Counts how many times each user triggered the event.                                 | `# of searches per user`, `# of purchases per user` |
   | **Average of event values per user**                | Averages a numeric property from events per user.                                    | `Average purchase amount`, `Average session time`   |
   | **Sum of event values per user**                    | Sums a numeric property from events per user.                                        | `Total spend per user`, `Total minutes streamed`    |

## Manage metrics

Once created, metrics become shared, reusable definitions that teams can reference across experiments. Managing metrics effectively ensures consistent measurement and a reliable source of truth for your organization.

* **Edit**: Update a metric's definition, owners, tags, or calculation logic if business rules change.

  :::warning Note
  Editing a metric updates it everywhere it's used. Review dependencies carefully before making changes.
  :::

* **Delete**: Remove outdated or unused metrics to keep your library organized. Only delete metrics that are no longer relevant or used in active experiments.

* **Discoverability**: Use tags, owners, and categories to make metrics easy to find, filter, and trust. Clear ownership and tagging help teams locate reliable definitions quickly.

## Troubleshooting

If a metric doesn't appear or behaves unexpectedly, review the following:

- Metric not appearing in experiment setup: Ensure you’ve clicked **Create** and that the metric includes a valid source and event mapping.
- Incorrect aggregation: Double-check your **Measure As** setting (for example, `Count`, `Average`, `Sum`, or `Percentage`).
- Event mismatch: Verify that the selected event name exists in the chosen **Metric Source** and is mapped correctly.
- Impact direction confusion: Confirm that **Increase** is used for positive outcomes (like conversion or revenue) and **Decrease** for negative ones (like latency or error rate).
