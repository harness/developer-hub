---
title: DORA Metrics Guide
description: The central hub to learn everything about the DORA metrics on Harness SEI
sidebar_position: 10
---

## What is DORA

DORA (DevOps Research Assessment) identified the following key metrics that describe a software development team's performance: Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Time to Restore (MTTR).

### Deployment Frequency

Deployment Frequency is key to understanding the pace of software releases. It is categorized into four levels – Elite, High, Medium, and Low – based on the frequency of deployments. 

* Elite: More than one deployment per day.
* High: Deployments occur anywhere from once per day to once per week.
* Medium: Deployments occur anywhere from once per week to once per month.
* Low: Deployment occurs less than once per month.

### Lead Time

Lead Time for Changes measures the duration from commit to production. The overall lead time is the sum of time spent in each workflow stage, with the specific stages depending on your Workflow profile.

### Change Failure Rate

The Change Failure Rate indicates the percentage of deployments causing production failures. It is categorized into Elite, High, Medium, and Low, based on the percentage of failures. 

* Elite: Failure rate under 15 percent.
* High: Failure rate of 16 to 30 percent.
* Medium: Failure rate of 31 to 45 percent.

### Mean Time to Restore (MTTR)

Mean Time To Restore/Recover (MTTR), or Time to Restore Service, indicates how long it takes an organization to recover from a failure in production. MTTR is a good metric for assessing the speed of your recovery process across several areas of technology.

With SEI, you can use DORA Metrics Insights to understand how your organization or team is performing and help you get an overview of daily, weekly, and monthly trends.

Furthermore, SEI gives you the flexibility to choose the integrations from which you want to derive data, such as Issue Management, SCM, Incident Management, and CI/CD tools, as well as the ability to select filters to refine the data used to generate your metrics.

## Engineering Team Use Cases for Measuring DORA Metrics

Here are some specific use cases for how engineering teams can utilize these metrics:

### Identifying Bottlenecks and Improving Workflow

#### Monitoring Lead Time for Changes

Engineers can identify areas causing delays in the development lifecycle by analyzing the time it takes for code to reach production. This might reveal inefficiencies in code review, testing, or deployment processes.

#### Analyzing Deployment Frequency

Observing changes in deployment frequency can help determine if teams are releasing updates frequently and iteratively, potentially leading to faster innovation.

### Evaluating the Effectiveness of Process Changes

#### Measuring Change Failure Rate

Comparing CFR before and after implementing a new deployment pipeline or testing strategy can assess its effectiveness in catching bugs before they reach production.

#### Tracking Mean Time to Restore

Analyzing MTTR trends can reveal the efficiency of incident response procedures and identify areas for improvement in disaster recovery plans.

### Setting Team Goals and Tracking Progress

#### Establishing Deployment Frequency Targets

Teams can set achievable goals for increasing deployment frequency, encouraging a culture of continuous integration and delivery (CI/CD).

#### Monitoring Lead Time Reduction

Tracking the decrease in lead time over time can demonstrate the team's progress in streamlining development processes and improving efficiency.

### Comparing Performance with Industry Benchmarks

#### Benchmarking DORA Metrics

While using DORA metrics for direct team comparison can be misleading, comparing them with industry benchmarks within a similar context can provide a general sense of how the team is performing relative to others.

### Facilitating Open Communication and Collaboration

#### Sharing DORA Metrics

Using DORA metrics as a starting point for open discussions can foster collaboration between developers, operations, and management. Teams can work together to identify areas for improvement and implement solutions.

It's important to remember that DORA metrics should not be used solely for individual performance evaluation. Instead, they are valuable tools for continuous improvement, enabling teams to identify areas for growth, track progress, and ultimately deliver software faster and more reliably.

