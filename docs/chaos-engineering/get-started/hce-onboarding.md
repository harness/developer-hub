---
sidebar_position: 5
title: HCE onboarding guide
description: Onboard with HCE
---

This guide describes the versions of HCE, interaction between different components, and and how to get started with HCE.

## Before you begin

* [HCE overview](/docs/chaos-engineering/get-started/overview)
* [Key concepts](/docs/chaos-engineering/get-started/key-concepts)

Harness Chaos Engineering is available is **SaaS** and **self-managed** versions.

1. **SaaS (Software-as-a-service)**: You either sign up or get invited to a specific project. You can also create a project if you have the necessary permissions. HCE helps manage the cluster.
2. **SMP (Self-managed platform)**: You create, manage and maintain your clusters. You are responsible for providing permissions to projects and handling issues associated with them.

## Interaction between execution plane and control plane

The **execution plane** consists of components required to orchestrate the chaos injection (the process of injecting chaos into target resources). These components are installed in clusters (external or internal depending on the type of chaos infrastructure used). Some of the components include:
1. Workflow controller: Helps execute chaos experiments.
2. Subscriber: Serves as a bridge between the execution plane and control plane. It also performs other tasks required to orchestrate the chaos experiment executions.

The **control plane** consists of microservices that help with the functioning of the web-based portal. This portal is used to create, schedule, and monitor chaos experiments.

The execution plane helps setup the resources (clusters) and you can use the control plane to interact with the cluster and create chaos experiments.

## Steps to execute a HCE experiment

To create a chaos experiment, complete the following steps:
1. [Fulfill the resource requirements](/docs/chaos-engineering/features/prerequisites.md): In this step, you can create resources or get the required permissions to create the necessary resources.
2. [Add an environment](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-1-create-an-environment): A chaos experiment is performed within a chaos environment that houses the necessary infrastructure.
3. [Add a chaos infrastructure](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-2-add-a-chaos-infrastructure): The required chaos infrastructure is created within a chaos environment.
4. [Validate the chaos infrastructure installation](/docs/chaos-engineering/features/chaos-infrastructure/connect-chaos-infrastructures#step-3-validate-the-chaos-infrastructure-installation): Once you create your chaos infrastructure, ensure that it has been created in the right manner.
5. [Create a demo application](/docs/chaos-engineering/get-started/tutorials/first-chaos-engineering#creating-a-demo-application-and-observability-infrastructure): You can either create a demo application or use your own application on which you can execute chaos experiments.
6. [Create and run a chaos experiment](/docs/chaos-engineering/features/experiments/construct-and-run-custom-chaos-experiments.md): Once you have setup your application, you can decide which resources to target and execute the chaos experiments on.

## Next steps

For a guided experience, try:
* [Run your first chaos experiment](/docs/chaos-engineering/get-started/tutorials/first-chaos-engineering.md)
* [Executing experiments in a sandbox](/docs/chaos-engineering/certifications/run-experiments-in-sandbox.md)
* [Create chaos experiments from scratch](/docs/chaos-engineering/get-started/tutorials/chaos-experiment-from-blank-canvas.md)

