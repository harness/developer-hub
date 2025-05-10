---
title: Linux Fault Workflow 
sidebar_label: Linux Fault Workflow 
sidebar_position: 60
---

This topic describes the flow of control when you execute a Linux experiment in Harness Chaos Engineering.

## What You Need
- [Install the Linux infrastructure](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/linux#enable-chaos-on-linux) and ensure it is in **CONNECTED** state.

The Linux chaos infrastructure is installed as an executable binary on your Linux machine. This infrastructure is managed as a `Systemd` service.

The **Control Plane** creates and manages chaos experiments and the **Execution Plane** runs these chaos experiments using the Linux infrastructure and sends back the results.

## 1. Poll Chaos Tasks

Linux infrastructure polls the control plane to fetch the tasks. 

## 2. Execute Experiment 

An experiment is created (along with the resilience probes) in the environment (specific to an account or a project). The experiment metadata is stored in a database (MongoDB).

## 3. Assign Tasks

The experiment created is assigned to the infrastructure by the control plane, and the infrastructure acknowledges the receipt of the experiment to the control plane.

## 4. Execute Experiment

Linux infrastructure executes the experiment and generates logs in real-time.

## 5. Generate Results

The logs of the experiment, including the resilience score, and statuses are sent to the control plane.