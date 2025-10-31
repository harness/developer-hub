---
title: Precalculation
description: Learn how to configure a precalculated report on SEI
sidebar_position: 100
sidebar_label: Precalculation
redirect_from:
    - /docs/software-engineering-insights/sei-metrics-and-reports/precalculated-reports
    - /docs/software-engineering-insights/analytics-and-reporting/precalculated-widgets
---

## What is a precalculated report?

A precalculated report is a type of report that stores data for specific time intervals. Essentially, when a user requests to load the widget, if the data has already been calculated and is present in the database, the request will be served from stored data instead of a live calculation. This way, users can quickly view the data without having to wait for a live calculation to be performed.

## How is the calculation done?

The calculation for precalculated widgets is done by displaying data retrieved from associated tools at scheduled intervals. Changes to settings won't affect the displayed data immediately, as the data is updated only after the scheduled updates. Therefore, changes made to the widget will only take effect after the next scheduled update.

:::info
For precalculated widgets, if the **Insight Time** is enabled changes to the Insight time setting will not be reflected immediately, and the most recently configured time duration in the Insight will be used automatically for data retrieval.
:::

## How can you get a precalculated report configured?

To make a report precalculated, the user needs to request the Harness Support(mailto:support@harness.io) to enable the precalculation flag for a particular report (using `widget ID`).

After some time, the widget will have the `<PRE-CALCULATED>` tag applied to the header.

## FAQs

<details>

<summary>How often is the data updated?</summary>

The default interval for the data update is set to 24 hours or 1440 minutes. However, this interval can be modified as per the requirement.

</details>

<details>

<summary>How can users verify the report shows the latest data?</summary>

To ensure that the report displays the most recent data, users can refer to the `Last Updated On` field on the report. This field indicates the most recent time at which the data calculations were performed.

</details>