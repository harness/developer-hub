---
title: Harness Chaos Engineering (HCE) overview
sidebar_label: Overview
sidebar_position: 1
redirect_from:
  - /docs/chaos-engineering/get-started/introduction-to-chaos-module
description: This section introduces you to the basics of chaos engineering, its importance, and its advantages.
---

Welcome to Harness Chaos Engineering (HCE)! This section introduces you to the basics of chaos engineering, its importance, and its advantages.

## Overview
Cloud-native applications are highly distributed, elastic, resistant to failure, and loosely coupled. You need to ensure that your application performs as expected under different failure conditions.

Chaos engineering is **relevant** to all types of systems, including legacy applications and infrastructure. This is particularly important for cloud-native applications since they carry multiple points of failure due to their distributed, and elastic nature.

Chaos engineering isn't the same as software testing (manual or automated) which verifies that your system is working as expected. This brings you to a new concept- **Chaos Engineering**.

## What is Chaos Engineering?

In simple terms, Chaos engineering is the technique of inducing chaos, that is, unexpected failures in the application.

The general consensus is that something **will** go wrong in an application, so it would be better to practice what actions to take when something goes wrong and ensure that everything recovers.

The idea is that the design of an application should be resilient and handle any failure. By introducing constant chaos during the engineering phase and during the production phase, you may come across issues and potential failure points that you never thought of.

A **formal definition** is: _"Chaos engineering is the discipline of performing experiments on software to build confidence in the system's capability to withstand turbulent and unexpected conditions. Failures are intentionally injected into applications to build resilience. By proactively introducing controlled chaos into systems, you can identify weaknesses in your application and prevent catastrophic failures."_

![](./static/overview/chaos-eng-steps.png)

## Why is chaos engineering important?

In the current landscape of fast-paced technology, system failures have a significant impact on businesses, customers, and stakeholders. Chaos engineering provides a way to identify potential issues before they become major problems, helping organizations minimize downtime, mitigate risks, and improve reliability .

### Shift left chaos engineering

The initial principles of chaos engineering suggest performing experiments in production (which is relevant and recommended), which is viewed as a means to validate resilience beforehand, that is, as a quality gate for larger deployment environments.
This is accelerated by a need to build confidence in a highly dynamic environment in which application services and infrastructure are subject to frequent and independent upgrades. The resulting paradigm is:

- Increased ad-hoc/exploratory chaos testing by application developers and QA teams;
- Automating chaos experiments within continuous delivery (CD) pipelines.

## How to implement chaos engineering to build resilient applications?

You can build resilient applications using the following steps:
1. **Choose** or **build** your application;
2. **Configure** the **chaos control plane**, that is:
	1. Set up an **environment**;
	2. Set up a **chaos infrastructure**;
3. **Create chaos experiments** in your application;
4. **Execute** the chaos experiments;
5. **Analyze** the result.

This suggests that chaos experiments need the appropriate observability infrastructure to aid the validation of the hypotheses around the steady-state. The practice of chaos engineering consists of performing experiments repeatedly, by injecting a variety of potential failures (called **chaos faults**) to simulate real-world failure conditions carried out against different resources (called **targets**).

Harness Chaos Engineering (HCE) simplifies the chaos engineering practices for your organization. The diagram below describes the steps that you can perform to induce chaos into an application.

![Chaos Engineering Overview](./static/overview/first-goal.png)

### Standard chaos experiment flow of control

The standard chaos experimentation flow involves the following steps:
1. Identify the steady state of the system or application under test;
2. Hypothesize around the impact a particular fault or failure would cause;
3. Inject this failure (or chaos fault) in a controlled manner (with a pre-determined and minimal blast radius);
4. Validate whether the hypothesis is proven, and take appropriate actions if a weakness is found.

## Benefits of HCE

HCE doesn't simply focus on fault injection, it helps you set up a fully operational chaos function that is based on the original [principles of chaos](https://principlesofchaos.org/), and addresses several enterprise needs around its practice, which include:

1. Cloud native approach to chaos engineering which supports declarative definition of experiments and Git-based chaos artifact sources (chaos-experiments-as-code).
2. Extensive fault library and robust suite of [ready-to-use experiments](/docs/chaos-engineering/chaos-faults), with support to construct complex custom experiments with [multiple faults](/docs/chaos-engineering/features/experiments/create-complex-chaos-experiments.md) in the desired order.
3. Centralized control plane which supports varied targets (Kubernetes-based microservices, cloud services, VMware infrastructure).
4. Governance enforcement for chaos experimentation using dedicated workspaces, chaos teams, and access control.
5. Native integration with [Harness Continuous Delivery (CD) pipelines](/docs/chaos-engineering/integrations/chaos-cd.md).
6. [Hypothesis validation using probes](/docs/chaos-engineering/features/probes/configure-and-add-probe.md) and SLO management using integration with Harness Continuous Verification (CV).
7. Guided GameDay execution with detailed analytics and reporting based on experiment execution and application resilience.
8. Chaos events, metrics and logs (audit and execution) to aid in the instrumentation of APM dashboards with chaos context.

## Try Chaos Engineering today

* [Run your first chaos experiment](/docs/chaos-engineering/ce-onboarding-guide/first-chaos-engineering.md)
* [Executing experiments in a sandbox](/docs/chaos-engineering/ce-onboarding-guide/run-experiments-in-sandbox)
* [Create chaos experiments from scratch](/docs/chaos-engineering/ce-onboarding-guide/chaos-experiment-from-blank-canvas)

