---
title: Architecture
sidebar_position: 1
---

Below is an overview of the HCE architecture.

![Overview](./static/architecture/overview.png)

Harness Chaos Engineering is split into two parts:

1. **Harness Control Plane**
2. **Chaos Infrastructures**

The diagram below gives a peek into the HCE architecture.
![Architecture](./static/architecture/HCE-architecture.png)

## Architecture Summary

**Harness control plane** is the single source to collaboratively create, schedule, and monitor chaos experiments. It comes with a set of chaos faults that are defined in a sequence, which helps achieve a desired chaos impact on the target resources. You can log in to the Harness platform and leverage the interactive chaos center to define your chaos experiments and target the infrastructure. You can also monitor the experiments during their execution.

**Harness Execution Plane** contains the components responsible for orchestrating the chaos injection in the target resources. They get installed in the Chaos Infrastructure containing the control plane. It consists of Chaos Delegate Infrastructure components like Workflow controller, subscriber, event tracker, etc and Litmus Backend Execution Infrastructure components like ChaosExperiment CR, ChaosEngine CR, etc.

## Control Plane Components

### Chaos Infrastructure

**Chaos infrastructure** is a service that runs within your target environment to aid HCE in accessing the target resources and injecting chaos at cloud-native scale. It can be setup with a cluster-wide access or with a single namespace scope. It is a service that runs within your target environment to aid HCE in accessing the target resources and injecting chaos at cloud-native scale.

- There are different types of chaos infrastructures for different environments such as Kubernetes, Linux VMs, AWS cloud, VMware, etc.
- Based on the target environments, chaos infrastructures might install as a Kubernetes service or a Linux daemon and so on.

All the chaos infrastructure services adhere to the principle of least privilege where they execute only with the minimum number of permissions required. Multiple chaos infrastructures may be added to a single environment and can be subjected to a chaos experiment as an entity.

### Enterprise Hub

Enterprise Chaos Hub comes out of the box with Harness Chaos Engineering, which provides a set of faults and experiment templates. In essence, Enterprise Hub is a prebuilt Chaos Hub, its a collection of manifests and charts, which represent the experiments and faults that exist as part of the hub. It ships with a variety of experiment templates are available as part of the Enterprise Chaos Hub, which uses faults from the multiple categories to create a number of chaos experiments for many failure experiments.

### Authentication Server

A Golang micro-service that is responsible for authorizing, authenticating the requests received from Chaos Center and managing users along with their projects. It primarily serves the cause of user creation, user login, resetting the password, updating user information, creating project, managing project related operations.

### Backend Server

A GraphQL based Golang micro-service that serves the requests received from Chaos Center, by either querying the database for the relevant information or by fetching information from the Execution Plane.

### Database

A NoSQL MongoDB database micro-service that is accountable for storing users' information, past chaos experiments, saved chaos experiment templates, user projects, ChaosHubs, and GitOps details, among the other information.

## Chaos Access

Chaos Access components help facilitate the chaos injectio, and enable chaos automation for target resources. Some of the important components in Chaos Access are:

- **Workflow Controller**: The Argo Workflow Controller responsible for the creation of chaos experiment.

- **Subscriber**: Serves as the link between the Chaos Execution Plane and the Control Plane. It has a few distinct responsibilities such as performing health check of all the components in Chaos Execution Plane, creation of a chaos experiment CR from a chaos experiment template, watching for chaos experiment events during its execution, and sending the chaos experiment result to the Control Plane.

- **Event Tracker**: An optional component that is capable of triggering automated chaos experiment runs based on a set of defined conditions for any given resources in the cluster. It is a controller that manages EventTrackerPolicy CR, which is basically the set of defined conditions that is validated by Event Tracker. If the current state of the tracked resources match with the state defined in the EventTrackerPolicy CR, the chaos Experiment run run gets triggered. This feature can only be used if GitOps is enabled.

- **Chaos Exporter**: An optional component that facilitates external observability in Litmus by exporting the chaos metrics generated during the chaos injection as time-series data to the Prometheus DB for its processing and analysis.
