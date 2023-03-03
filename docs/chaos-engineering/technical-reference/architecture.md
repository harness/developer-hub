---
title: Architecture
sidebar_position: 1
---
This section describes the Harness Chaos Engineering (HCE) architecture along with the components. 

Below is an overview of the HCE architecture.

![Overview](./static/architecture/overview.png)

HCE comprises two parts:

1. **Harness control plane**
2. **Chaos infrastructure**

The diagram below gives a peek into the HCE architecture.
![Architecture](./static/architecture/HCE-architecture.png)

## Harness control plane

**Harness control plane** is the single source to collaboratively create, schedule, and monitor chaos experiments. It comes with a set of chaos faults that are defined in a sequence, which helps achieve the desired chaos impact on the target resources. You can log in to the Harness platform and leverage the interactive chaos center to define your chaos experiments and target the infrastructure. You can also monitor the experiments during their execution.

### Control plane components

The control plane in HCE contains many components, which are described below. 

#### Chaos infrastructure

**Chaos infrastructure** is a service that runs within your target environment to help HCE access the target resources and inject chaos at cloud-native scale. It can be setup with cluster-wide access or with a single namespace scope.

- There are different types of chaos infrastructures for different environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, etc.
- Based on the target environments, chaos infrastructures can be installed as a Kubernetes service, a Linux daemon, and so on.

All the chaos infrastructure services adhere to the principle of least privilege, where the services execute with the minimum number of permissions. You can add multiple chaos infrastructures to a single environment and subject it to a chaos experiment as an entity.

#### Enterprise hub

Enterprise ChaosHub comes out of the box with HCE and provides many faults and experiment templates. Enterprise Hub is a prebuilt Chaos Hub; it is a collection of manifests and charts that represent existing experiments and faults as part of the hub. You can use faults from multiple categories to create chaos experiments in the Enterprise ChaosHub.

#### Authentication server

The authentication server is a Golang microservice responsible for authorizing and authenticating the requests received from Chaos Center. It also helps manage users and their projects. It helps in user and project creation, user login, password resets, updating of user information, and managing project-related operations.

#### Backend server

The backend server is a GraphQL-based Golang microservice that serves the requests received from the Chaos Center by either querying the database for the relevant information or fetching information from the execution plane.

#### Database

This is a NoSQL MongoDB database microservice accountable for storing users' information, past chaos experiments, saved chaos experiment templates, user projects, ChaosHubs, and GitOps details, among other information.

## Harness execution plane

**Harness Execution Plane** contains the components responsible for orchestrating the chaos injection in the target resources. They get installed in the Chaos Infrastructure containing the control plane. It consists of Chaos Delegate Infrastructure components like Workflow controller, subscriber, event tracker, etc and Litmus Backend Execution Infrastructure components like ChaosExperiment CR, ChaosEngine CR, etc.

## Chaos access

Chaos access components help facilitate the chaos injection, and enable chaos automation for target resources. Some of the important components in chaos access listed below.

- **Workflow controller**: The Argo Workflow Controller responsible for the creation of chaos experiment.

- **Subscriber**: Serves as the link between the Chaos Execution Plane and the Control Plane. It has a few distinct responsibilities such as performing health check of all the components in Chaos Execution Plane, creation of a chaos experiment CR from a chaos experiment template, watching for chaos experiment events during its execution, and sending the chaos experiment result to the Control Plane.

- **Event tracker**: An optional component that is capable of triggering automated chaos experiment runs based on a set of defined conditions for any given resources in the cluster. It is a controller that manages EventTrackerPolicy CR, which is basically the set of defined conditions that is validated by Event Tracker. If the current state of the tracked resources match with the state defined in the EventTrackerPolicy CR, the chaos Experiment run run gets triggered. This feature can only be used if GitOps is enabled.

- **Chaos exporter**: An optional component that facilitates external observability in Litmus by exporting the chaos metrics generated during the chaos injection as time-series data to the Prometheus DB for its processing and analysis.
