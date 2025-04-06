---
title: Windows Fault Workflow 
sidebar_label: Windows Fault Workflow 
sidebar_position: 50
---

This topic describes the flow of control when you execute a Windows experiment in Harness Chaos Engineering.

## What You Need
- [Install the Windows infrastructure](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/windows#prerequisites-to-install-infrastructure) and ensure it is in **CONNECTED** state.

The Windows infrastructure runs as a service (managed by the service manager) on the Windows VM in the execution plane.

The **Control Plane** creates and manages chaos experiments and the **Execution Plane** runs these chaos experiments using the Windows infrastructure and sends back the results.

The diagram below describes the interaction between the chaos control plane components and the execution plane component(s) for a Windows experiment. 

![windows fault flow](../static/how-stuff-works/windows-workflow.png)

## 1. Poll Chaos Tasks

Windows infrastructure polls the control plane to fetch the tasks. 

## 2. Execute Experiment 

An experiment is created (along with the resilience probes) in the environment (specific to an account or a project). The experiment metadata is stored in a database (MongoDB).

## 3. Assign Tasks

The experiment created is assigned to the infrastructure by the control plane, and the infrastructure acknowledges the receipt of the experiment to the control plane.

## 4. Execute Experiment

Windows infrastructure executes the experiment and generates logs in real-time. Windows experiments use Powershell scripts to inject (or revert) chaos processes.

## 5. Generate Results

The logs of the experiment, including the resilience score, and statuses are sent to the control plane.