---
title: Windows Fault Workflow 
sidebar_label: Windows Fault Workflow 
sidebar_position: 50
---

This topic describes the flow of control when you execute a Windows experiment in Harness Chaos Engineering.

## Prerequisites
- [Install the Windows infrastructure](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/windows#prerequisites-to-install-infrastructure)

The Windows infrastructure runs as a service (managed by the service manager). It is installed in the execution plane (required to poll tasks), and is registered in the control plane.

The **Control Plane** creates and manages chaos experiments and the **Execution Plane** runs these chaos experiments using the Windows infrastructure and sends back the results.

The diagram below describes the interaction between the chaos control plane component and the execution plane component for a Windows experiment. 

![windows fault flow](../static/how-stuff-works/windows-workflow.png)

## 1. Poll Chaos Tasks

The execution plane (chaos infrastructure) polls the control plane to fetch chaos tasks. 

## 2. Assign Tasks
A chaos task is assigned to the infrastructure by the control plane, and the infrastructure acknowledges receipt of the task back to the control plane. 

## 3. Execute Experiment 

An experiment is created (along with the resilience probes) in the environment (specific to an account or a project), and launched in the execution plane. Windows experiments use Powershell scripts to inject (or revert) chaos processes. The experiment metadata is stored in a database (MongoDB).

## 4. Generate Fault Results

The logs of the experiment, including the resilience score, and fault statuses are generated and sent to the control plane.