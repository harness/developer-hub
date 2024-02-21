---
sidebar_position: 1
title: CE onboarding guide
description: Jump-start your journey into chaos engineering.
---

This guide introduces Harness Chaos Engineering (HCE) and describes how to get started with Harness Chaos Engineering.

## What is Chaos Engineering?

In simple terms, Chaos engineering is the technique of inducing chaos, that is, unexpected failures in the application.

The general consensus is that something **will** go wrong in an application, so it would be better to practice what actions to take when something goes wrong and ensure that everything recovers.

The idea is that the design of an application should be resilient and handle any failure. By introducing constant chaos during the engineering phase and during the production phase, you may come across issues that you never thought of.

Harness Chaos Engineering is available is SaaS and self-managed formats.

1. **SaaS (Software-as-a-service)**: You either sign up or get invited to a specific project. You can also create a project if you have the necessary permissions. HCE helps manage the cluster.
2. **SMP (Self-managed platform)**: You create, manage and maintain your clusters. You are responsible for providing permissions to projects and handling issues associated with them.

## Interaction between execution plane and control plane

The **execution plane** consists of components required to orchestrate the chaos injection (the process of injecting chaos into target resources). These components are installed in clusters (external or internal depending on the type of chaos infrastructure used). Some of the components include:
1. Workflow controller: Helps execute chaos experiments.
2. Subscriber: Serves as a bridge between the execution plane and control plane. It also performs other tasks required to orchestrate the chaos experiment executions.

The **control plane** consists of microservices that help with the functioning of the web-based portal. This portal is used to create, schedule, and monitor chaos experiments.

The execution plane helps setup the resources (clusters) and you can use the control plane to interact with the cluster and create chaos experiments.

## Get started with Chaos Engineering

To create a chaos experiment, complete the following steps:
1. [Fulfill the resource requirements](../configure-chaos-experiments/prerequisites): In this step, you can create resources or get the required permissions to create the necessary resources.
2. [Add an environment](../chaos-infrastructure/connect-chaos-infrastructures#step-1-create-an-environment): A chaos experiment is performed within a chaos environment that houses the necessary infrastructure.
3. [Add a chaos infrastructure](../chaos-infrastructure/connect-chaos-infrastructures#step-2-add-a-chaos-infrastructure): The required chaos infrastructure is created within a chaos environment.
4. [Validate the chaos infrastructure installation](../chaos-infrastructure/connect-chaos-infrastructures#step-3-validate-the-chaos-infrastructure-installation): Once you create your chaos infrastructure, ensure that it has been created in the right manner. 
5. [Create a demo application](./first-chaos-engineering#creating-a-demo-application-and-observability-infrastructure): You can either create a demo application or use your own application on which you can execute chaos experiments. 
6. [Create and run a chaos experiment](../configure-chaos-experiments/experiments/construct-and-run-custom-chaos-experiments): Once you have setup your application, you can decide which resources to target and execute the chaos experiments on.

For a guided experience, try:

* [Running your first chaos experiment](./first-chaos-engineering.md)
* [Executing experiments in a sandbox](./run-experiments-in-sandbox)
