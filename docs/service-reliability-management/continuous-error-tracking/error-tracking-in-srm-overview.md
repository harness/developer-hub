---
title: Overview
description: Understand Continuous Error Tracking.
sidebar_position: 10
helpdocs_topic_id: cbj5uuzpbu
helpdocs_category_id: c40ko6e87n
helpdocs_is_private: false
helpdocs_is_published: true
---

:::note
Currently, this feature is behind the feature flag `SRM_ET_EXPERIMENTAL`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::


Error Tracking is a developer first observability solution in the Harness [Service Reliability Management (SRM)](https://developer.harness.io/docs/service-reliability-management/howtos-service-reliability-management/service-reliability-management-basics#sort=relevancy&f:@commonsource=%5BNextGen%20Docs%5D) module that enables developers to identify, triage, and resolve errors in applications. This helps in implementing rapid code changes by ensuring that the code is always in a deployable state.

With the increase in release velocity, the risk to code quality also increases. Using Harness Error Tracking, as a developer, you can:

* Quickly identify and address any critical issues during each release with real-time notifications sent to email and Slack channels - ensuring that the right people can make the right decisions fast.
* Deepen understanding of your Java applications in all environments, from production to development, testing, and staging, through code level visibility.
* Automate issue root cause analysis at runtime, eliminating the need for manual log analysis to identify critical errors.
* Quickly and accurately identify and fix detected issues with Automated Root Cause Analysis (ARC) screen, leveraging source code, variable values, environment state of the host/container, and DEBUG level logs to get the full context.
* Integrate the ARC screen with existing tools including APMs, log analyzers, and issue tracking software.

Harness Error Tracking consists of an Error Tracking Agent that runs on a Java Virtual Machine (JVM). It monitors the Java applications for run-time exceptions, log events, and the custom events that you set up. When an exception or an event occurs, the Agent sends the statistics and snapshots to a monitored service on Harness SRM. SRM analyzes the data using Machine Learning (ML) and provides deep insights via comprehensive dashboards such as the Event List and ARC.

![Harness Error Tracking](./static/et-quickstart-overview-diagram.png)


## Next steps

[Install and setup Continuous Error Tracking](error-tracking-in-srm.md).