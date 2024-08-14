---
sidebar_position: 1
title: Chaos101
description: All you need to know about chaos engineering
redirect_from:
- /docs/chaos-engineering/get-started/introduction-to-chaos-module
- /docs/chaos-engineering/get-started/overview
---

Welcome to Harness Chaos Engineering (HCE)!

This topic provides you with all the details such as **what**, **why**, and **how** of chaos engineering, such as:

1. [What is chaos engineering?](#what-is-chaos-engineering)
2. [Why is chaos engineering important?](#why-is-chaos-engineering-important)
3. [What are the advantages of HCE](#benefits-of-hce)
4. [Implement Chaos engineering to improve the resilience of your application](#how-to-implement-chaos-engineering)

## Introduction

Cloud-native applications are distributed, elastic, and resilient in nature, but their complexity introduces multiple potential points of failure. To ensure these systems perform reliably under various conditions, it is crucial to test their robustness. This is where chaos engineering comes in.

## What is chaos engineering?

Chaos engineering is a proactive approach that intentionally injects failures into your system to identify weaknesses and improve resilience before the real issues occur. The consensus is that something **will** go wrong in an application, so it would be better to practice what actions to take when something goes wrong and ensure that everything recovers.

A **formal definition** is: _"Chaos engineering is the discipline of performing experiments on software to build confidence in the system's capability to withstand turbulent and unexpected conditions. Failures are intentionally injected into applications to build resilience. By proactively introducing controlled chaos into systems, you can identify weaknesses in your application and prevent catastrophic failures."_

![](./static/chaos101/chaos-eng-steps.png)

:::tip
Chaos engineering isn't the same as software testing (manual or automated) which verifies that your system is working as expected.
:::

## Why is chaos engineering important?

In the current landscape of fast-paced technology, system failures have a significant impact on businesses, customers, and stakeholders. Chaos engineering is a way to identify potential issues before they become major problems, helping organizations minimize downtime, mitigate risks, and improve reliability.

Chaos engineering targets a steady-state system and simulates conditions that might cause failures in components such as infrastructure, networks, and services. For example, a chaos experiment might terminate a pod in a functional Kubernetes cluster, shut down a working load balancer to validate failover, or induce CPU spikes on a server, and then observe how the system responds.

### Shift left chaos engineering

The initial principles of chaos engineering recommend performing experiments in production, which is relevant and encouraged. This approach validates resilience beforehand, acting as a quality gate for larger deployment environments. The need to build confidence in a highly dynamic environment—where application services and infrastructure undergo frequent and independent upgrades—accelerates this process. The resulting paradigm includes:

- Increased ad-hoc and exploratory chaos testing by application developers and QA teams;
- Automating chaos experiments within continuous delivery (CD) pipelines.

## How to implement chaos engineering?

You can build resilient applications by following the steps below:

1. **Choose** or **build** your application;
2. **Configure** the **chaos control plane**, that is:
    1. Set up an **environment**;
    2. Set up a **chaos infrastructure**;
3. **Create chaos experiments** in your application;
4. **Execute** the chaos experiments;
5. **Analyze** the result.

This suggests that chaos experiments require an appropriate observability infrastructure to validate the hypotheses about the steady state. The practice of chaos engineering involves repeatedly performing experiments by injecting various potential failures, known as **chaos faults**, to simulate real-world failure conditions against different resources, referred to as **targets**.

Harness Chaos Engineering (HCE) simplifies the chaos engineering practices for your organization. The diagram below outlines the steps you can take to introduce chaos into an application.

![Chaos Engineering Overview](./static/chaos101/first-goal.png)

## Benefits of HCE

HCE doesn't just focus on fault injection; it helps you set up a fully operational chaos function that is based on the original [principles of chaos](https://principlesofchaos.org/), and addresses several enterprise needs, including:

- **Cloud-Native Approach**: HCE supports a declarative definition of experiments and [Git-based chaos artifact sources]((/docs/chaos-engineering/use-harness-ce/chaoshubs/add-chaos-hub)) (chaos-experiments-as-code).

- **Extensive Fault Library**: HCE offers a robust suite of ready-to-use experiments and supports constructing complex custom experiments with multiple faults executed in the desired order.

- **Centralized Control Plane**: The platform supports a variety of targets, including Kubernetes-based microservices, cloud services like AWS, Azure, GCP, Cloud Foundry, and VMware infrastructure.

- **Governance Enforcement**: HCE provides several mechanisms for governance:

    - **Dedicated Workspaces**: Isolate chaos experiments and resources for different teams or projects.
    - **ChaosGuard**: Adds an additional security layer by executing a set of conditions before running chaos experiments.
    - **Chaos Teams**: Allows control over who can access and execute chaos experiments, ensuring that only authorized users interact with chaos resources.
    - **Access Control**: Fine-grained permissions manage access to chaos infrastructure, the types of faults used, and the runtime permissions for executing experiments within target environments.

- **Native Integration with Harness Continuous Delivery (CD) Pipelines**: Streamline chaos engineering into your CI/CD workflows.

- **Hypothesis Validation and SLO Management**: Validate hypotheses using probes and manage SLOs through integration with Harness Continuous Verification (CV).

- **Guided GameDay Execution**: Detailed analytics and reporting based on experiment execution and application resilience.

- **Chaos Events, Metrics, and Logs**: Instrument APM (Application Performance Monitoring) dashboards with chaos context to monitor the impact of chaos faults on service/application health.

## Chaos engineering flow of control

You can define steps (chaos experiment) using which you can inject different kinds of failures into your application. The standard flow involves the following steps:
1. Identify the steady state of the system or application under test and specify its service-level objectives (SLOs);
2. Hypothesize around the impact a particular fault or failure would cause;
3. Inject this failure (or chaos fault) in a controlled manner (with a pre-determined and minimal blast radius);
4. Validate whether the hypothesis is proven and if the system meets the SLOs, and take appropriate actions if a weakness is found.

## Conclusion

Chaos engineering is a technique you can implement with all types of systems, including legacy applications and infrastructure. It is especially significant for cloud-native applications, which often have multiple points of failure due to their distributed and elastic nature.
By introducing constant chaos during the engineering phase and the production phase, you may come across issues and potential failure points that you never thought of.
By embracing chaos engineering, you can better prepare your applications to withstand unexpected disruptions and maintain seamless performance.

## Try Chaos Engineering today

* Run your first chaos experiment
* Executing experiments in a sandbox
* Create chaos experiments from scratch