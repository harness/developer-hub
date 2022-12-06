---
title: What Is Continuous Verification (CV)?
description: Introduces Harness' Continuous Verification features, which integrate your choice of state-of-the-art APM and log monitoring services.
sidebar_position: 10
helpdocs_topic_id: ina58fap5y
helpdocs_category_id: zxxvl8vahz
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes Harness' Continuous Verification features.

### Visual Overview

In a hurry? Here's a [one-minute video summary](https://fast.wistia.com/embed/medias/5sglzgol3u) of how Harness helps you monitor the health of your deployments through a streamlined, comprehensive interface.


### Verifying Services

The more often you deploy software, the more you need to validate the health of newly deployed service instances. You need the ability to rapidly detect regressions or anomalies, and to rapidly roll back failed deployments.

You have your choice of state-of-the-art APM (application performance monitoring) and logging software to continually measure your deployment data. But before Harness, you needed to connect your data to these multiple systems, and manually monitor each provider for unusual, post-deployment activity.

Harness' Continuous Verification (CV) approach simplifies verification. First, Harness aggregates monitoring from multiple providers into one dashboard. Second, Harness uses machine learning to identify normal behavior for your applications. This allows Harness to identify and flag anomalies in future deployments, and to perform automatic rollbacks.

### APM/Time-Series Data

Application performance monitoring (APM) platforms like AppDynamics continuously measure and aggregate performance metrics across your service's transactions, database calls, third-party API calls, etc. We can mine these metrics to provide an excellent snapshot of the service's current state, and to predict its near-future behavior.

Harness Continuous Verification uses real-time, semi-supervised machine learning to model and predict your service's behavior. We then apply anomaly-detection techniques to the modeled representation, to predict regressions in behavior or performance.

### Log Data

Harness Continuous Verification can also consume data from log providers like Sumo Logic and Elastic/ELK. Using semi-supervised machine learning, Harness analyzes and extracts clusters of log messages, based on textual and contextual similarity. This builds a further signature (model) of your service's current state and future behavior.

Using this learned signature—and using real-time comparisons of the current signature to past versions—Harness then predict service anomalies and regressions, starting at deployment time and extending beyond.

#### Queries and Limitations

Log verification takes in a user-provided search query. Queries should be negative queries that look at errors or exceptions. Typically, no more than 100 to 1000 errors in a minute.

Responses come from typical application logs and are 50–100 lines each, although there is limitation. There's an overall limit of 1MB per minute.

### Data Storage

Harness stores the data it receives in its database. 24/7 Service Guard retention is 30 days. Deployment verifications are available for months (as long as the Workflow is available).

### Getting Alerts

Harness Continuous Verification enables you to flexibly configure alerts, and alert thresholds, based on Harness' dynamic analysis of both time-series and log data.

### Next Up

Next, take a look at:

* [Why Perform Continuous Verification?](why-cv.md)

