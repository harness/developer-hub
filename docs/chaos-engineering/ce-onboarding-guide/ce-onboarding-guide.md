---
sidebar_position: 1
title: CE onboarding guide 
description: CE onboarding guide
---
This guide gives a simple introduction to Chaos Engineering and describe the basic steps for getting started with Harness Chaos Engineering (HCE).

## What is Chaos Engineering?
In simple terms, Chaos engineering is the technique of inducing chaos, that is, unexpected failures in the application. 
The general consensus is that something **will** go wrong in an application, so it would be better to practice what actions to take when something goes wrong and ensure that everything recovers.

The idea is that the design of an application should be resilient and handle any failure. By introducing constant chaos during the engineering phase and during the production phase, you may come across issues that you never thought of.

With respect to HCE, you can choose one of the two paths:
1. **SaaS (Software-as-a-service)**: In this path, you can either sign up or get an invite into a specific project. You can also create a project if you have the necessary permissions. HCE helps manage the clusters

2. **SMP (Self-managed platform)**: In this path, as the name suggests, you will be responsible to create, manage and maintain your clusters. You will be responsible in providing permissions to projects and handling issues associated with it.

## Interaction between execution plane and control plane

The **execution plane** consists of components required to orchestrate the chaos injection (the process of injecting chaos into target resources). These components are installed in clusters (external or internal depending on the type of chaos infrastructure used). Some of the components include:
1. Workflow controller: Helps execute chaos experiments.
2. Subscriber: Serves as a bridge between the execution plane and control plane. It also performs other tasks required to orchestrate the chaos experiment executions.

The **control plane** consists of microservices that help with the functioning of the web-based portal. This portal is used to create, schedule, and monitor chaos experiments.

The execution plane helps setup the resources (clusters) and you can use the control plane to interact with the cluster and create chaos experiments.

## Basic steps to get started with chaos engineering

To create a chaos experiment, complete the following steps:
1. [Fulfill the resource requirements](../configure-chaos-experiments/prerequisites): In this step, you can create resources or get the required permissions to create the necessary resources. 
2. [Add an environment](../chaos-infrastructure/connect-chaos-infrastructures#step-1-create-an-environment): A chaos experiment is performed within a chaos environment that houses the necessary infrastructure.
3. [Add a chaos infrastructure](../chaos-infrastructure/connect-chaos-infrastructures#step-2-add-a-chaos-infrastructure): The required chaos infrastructure is created within a chaos environment.
4. [Validate the chaos infrastructure installation](../chaos-infrastructure/connect-chaos-infrastructures#step-3-validate-the-chaos-infrastructure-installation): Once you create your chaos infrastructure, ensure that it has been created in the right manner. 
5. [Create a demo application](../../../tutorials/chaos-experiments/first-chaos-engineering#creating-a-demo-application-and-observability-infrastructure): You can either create a demo application or use your own application on which you can execute chaos experiments. 
6. [Create and run a chaos experiment](../configure-chaos-experiments/experiments/construct-and-run-custom-chaos-experiments): Once you have setup your application, you can decide which resources to target and execute the chaos experiments on.

## Next steps

* Follow this [tutorial](../../../tutorials/chaos-experiments/first-chaos-engineering) to execute your first chaos experiment.
* [Execute experiments in a sandbox](./run-experiments-in-sandbox)
