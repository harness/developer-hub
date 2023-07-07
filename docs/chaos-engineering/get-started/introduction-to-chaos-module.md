---
sidebar_position: 15
title: Build resilient applications with Chaos Engineering (CE)
---
## Introduction

Welcome to Harness Chaos Engineering (CE)! This section introduces you to the basics of chaos engineering, its importance, and its advantages.

Cloud-native applications are highly distributed, elastic, resistant to failure, and loosely coupled. How would you ensure that your application performs as expected under different failure conditions?

This is where chaos engineering jumps in. Chaos engineering is the discipline of performing experiments on software to build confidence in the system's capability to withstand turbulent and unexpected conditions. Failures are intentionally injected into applications to build resilience. By proactively introducing controlled chaos into systems, you can identify weaknesses in your application and prevent catastrophic failures.
It is _relevant to all types of systems (including legacy applications and infrastructure)_, and particularly important to
cloud-native applications that carry multiple points of failure due to their distributed, and elastic nature.

## Why is chaos engineering important?
In the current landscape of fast-paced technology, system failures can have a significant impact on businesses, customers, and stakeholders. Chaos engineering provides a way to identify potential issues before they become major problems, helping organizations minimize downtime, and mitigate risks.

Resilience is built into applications using the following steps:
1. Choose/build your application
2. Configure the chaos control plane, that is:
	1. Set up the environment
	2. Set up a chaos infrastructure
3. Create chaos experiments in your application
4. Execute the chaos experiments
5. Analyze the result

Needless to say, chaos experiments need the appropriate observability infrastructure to aid the validation of the hypotheses around
steady-state. The practice of chaos engineering consists of repeated experimentation, with varied faults to simulate real-world failure conditions
carried out against different targets.

The diagram below describes the steps that you can perform to run chaos experiments in an application. 

<img width="544" alt="Screenshot 2022-10-10 at 4 23 22 PM" src="https://user-images.githubusercontent.com/21166217/194850472-0f4dda25-74f5-4dbb-86e8-45e09258de73.png"></img>

## Left-shift chaos engineering

The initial principles of chaos engineering advocate performing experiments in production (which is relevant and recommended), which is being viewed as a means to validate resilience beforehand, that is, as a quality gate for big deployment environments.
Generally, this is fueled by a need to build confidence in a highly dynamic environment in which application services _and_ infrastructure
are subject to frequent, and independent upgrades. The resulting paradigm is:

- Increased ad-hoc/exploratory chaos testing by application developers and QA teams;
- Automating chaos experiments within continuous delivery (CD) pipelines.

## Benefits of CE

CE takes a holistic approach to chaos engineering, and doesn't merely focus on fault injection. It is designed to help users set up a fully operational chaos function that is based on the original [principles of chaos](https://principlesofchaos.org/), and addresses several enterprise needs around its practice, which include:

1. Cloud native approach to chaos engineering which supports declarative definition of experiments and Git-based chaos artifact sources (chaos-experiments-as-code).
2. Extensive fault library and robust suite of [ready-to-use experiments](../technical-reference/chaos-faults/), with support to construct complex custom experiments with [multiple faults](../configure-chaos-experiments/experiments/create-complex-chaos-experiments) in the desired order.
3. Centralized control plane which supports varied targets (Kubernetes-based microservices, cloud services, VMware infrastructure).
4. Governance enforcement for chaos experimentation using dedicated workspaces, chaos teams, and access control.
5. Native integration with [Harness Continuous Delivery (CD) pipelines](/tutorials/chaos-experiments/integration-with-harness-cd).
6. [Hypothesis validation using probes](../configure-chaos-experiments/probes/validate-hypothesis-using-probes) and SLO management using integration with Harness Continuous Verification (CV).
7. Guided gameday execution with detailed analytics and reporting based on experiment execution and application resilience.
8. Chaos events, metrics and logs (audit and execution) to aid in the instrumentation of APM dashboards with chaos context.


## Conclusion
Chaos engineering is a critical practice for building resilient systems in today's technology landscape. Harness provides a powerful chaos module that makes it easy to get started with chaos engineering. To get started with a simple chaos experiment, go to [Your first chaos experiment](/tutorials/chaos-experiments/first-chaos-engineering).