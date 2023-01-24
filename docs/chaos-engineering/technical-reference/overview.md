---
title: Overview
sidebar_position: 1
---

This document describes the commonly used concepts of Harness Chaos Engineering Module.

## Environments

Harness environment represents your deployment infrastructures such as Dev, QA, Stage, Production, etc.

- It helps isolate the various environments that your engineering, product owners, QA, and automation teams use under a single Harness project.
- This allows for better segregation of mission-critical infrastructures with several attached dependencies from dev and staging infrastructures for their safety.

Multiple chaos infrastructures can be added as part of an environment, as part of HCE.

## Chaos Infrastructure

Chaos infrastructures represent the individual components of a deployment environment. It is a service that runs within your target environment to aid HCE in accessing the target resources and injecting chaos at cloud-native scale.

- There are different types of chaos infrastructures for different environments such as Kubernetes, Linux VMs, AWS cloud, VMware, etc.
- Based on the target environments, chaos infrastructures might install as a Kubernetes service or a Linux daemon and so on.

All the chaos infrastructure services adhere to the principle of least privilege where they execute only with the minimum number of permissions required.

Multiple chaos infrastructures may be added to a single environment and can be subjected to a chaos experiment as an entity.

## Chaos Hubs

Chaos Hub is a collection of experiment templates and faults that helps create new chaos experiments.

- In essence, Chaos Hub is a collection of manifests and charts, which represent the experiments and faults that exist as part of the hub.
- You can add Chaos Hub using a Git service provider such as GitHub, where Chaos Hub exists as a repository. This allows native version control and management of the faults and experiment artifacts.
- Apart from an Enterprise Chaos Hub (out of the box), you can also add custom Chaos Hubs to maintain and distribute private faults and experiments within your organization.

Experiments are templates to create new chaos experiments, which contain a collect of chaos faults and certain custom actions ordered in a specific sequence. Faults refer to the failures injected as part of an experiment.

Both experiments and faults are stored as manifests in an appropriate directory structure. Hence, you can add new experiment templates and faults directly to the repository as files. In addition, you can derive the experiment templates from the existing experiments and save them to the Chaos Hub from the UI.

### Enterprise Hub

Enterprise Chaos Hub comes out of the box with Harness Chaos Engineering, which provides a set of faults and experiment templates. These faults belong to different categories, such as:

- Kubernetes
  - Pods
  - Nodes
- AWS
- VMware
- Azure
- GCP

A variety of experiment templates are available as part of the Enterprise Chaos Hub, which uses faults from the above categories to create a number of chaos experiments for many failure scenarios, such as:

- AWS EC2 HTTP Latency
- K8s Node IO Stress
- VMware Network Latency
- Azure Web App Stop

## Experiments

A chaos experiment is a set of different **operations** coupled together to achieve a desired chaos impact. These operations are either chaos faults or any other custom action related to the experiment, such as load generation.

- Experiments can execute the constituent faults or other operations in any sequence so that they can be ordered to be executed in parallel or serial to each other.

When an experiment is created, steps such as **install-chaos-faults** and **cleanup-chaos-resources** may be present by default. They are responsible for installing the chaos faults within the target environment and deleting the temporary resources created during the experiment execution, respectively.

Adding any other custom action is currently a YAML only feature, where the action is defined in the experiment manifest in a declarative manner.

Once defined, an experiment can be:

1. Directly saved (without running)
2. Directly added to ChaosHub
3. Simply executed.

- The experiment can be either executed immediately or can be scheduled to execute based on a recurring schedule.
- The recurring scheduling can be implemented to run the experiment hourly, daily, weekly, or monthly.

In the end, the success or failure of an experiment depends on the resiliency score obtained.

## What is Resiliency Score?

**Resiliency Score** is a quantitative measure of how resilient is the target environment when the respective chaos experiment is performed on it.

While creating a chaos experiment, certain weights are assigned to all the constituent faults. These weights signify the priority/importance of the respective fault. The higher the weight, the more significant is the fault.

The weight priority is generally divided into three sections:

- `0-3`: Low Priority
- `4-6`: Medium Priority
- `7-10`: High Priority

Once a weight has been assigned to the fault, we look for the Probe Success Percentage (a ratio of successful checks v/s total probes) for that experiment itself post the chaos and calculate the total resilience result for that experiment as a multiplication of the weight given and the probe success percentage returned after the Chaos Run.

```
Fault Resilience = (Fault Weight * Probe Success Percentage)
Overall Resilience Score = Cumulative Fault Resilience / Sum of the assigned weights of the experiments
```

## Faults

Faults refer to the failures that are injected into the target resource as part of an experiment.

- Every fault is scoped to some particular resource type, for example, Kubernetes pods, nodes, Cloud VMs, disks, etc.
- These faults can inject a multitude of failures depending on your target resources, such as, delaying network packets for your Kubernetes pods, Stressing CPU of a Kubernetes Nodes, Stopping AWS EC2 instances, Restarting a VMware vCenter ESX Host, etc.

Safety is a paramount consideration for all the chaos faults.

- Chaos faults are reverted upon the completion of the experiment so that the failure is removed and it is ensured that the target resource regains its initial state.
- Individual faults can be safely stopped mid-execution so that on-the-fly experiments can be halted immediately and the failure is safely reverted.

The faults can be categorized into following categories:

1. Kubernetes
   - Pod
   - Node
2. AWS
3. Azure
4. VMware
5. GCP

The faults being added to an experiment need to be configured with appropriate parameters, specific to the fault. While default parameters are provided wherever applicable, the mandatory parameters must be configured before the experiment can be executed. Also, probes can be added to individual faults for automating the hypothesis validation during the fault execution.

Each fault is assosiated with atleast one or more than one probes, a probe explores the behavior of a system in a chaotic or unpredictable manner and helps validate the declarative hypothesis set by the user. The goal of a chaos probe is to understand the underlying patterns and laws that govern the behavior of these systems, and to use that understanding to predict or control their behavior.

[Learn more about probes](./probes/overview)

## Chaos Dashboard

![Chaos Dashboard](./static/chaos-dashboard/chaos-dashboard.png)

Chaos Dashboard is the user-facing dashboard for Harness Chaos Engineering, which provides access to its different features. These features can be broadly classified into:

1. Experiment Management
2. User Management
3. Chaos Infrastructure Management
4. Chaos Analytics

### Experiment Management

Experiment management is an umbrella term for all the actions related to a chaos experiment. This includes their creation, update, and deletion among other things.

- Creation of chaos experiments can be done from:
  - Blank Canvas
  - Experiment Templates (From Chaos Hubs)
  - Experiment Manifest File
- An existing chaos experiment can be updated to make changes to the existing experiment or to a copy of the experiment.
- Deleting a chaos experiment removes it from the dashboard.

### User Management

Role Based Access Control can be enforced for the users to assign them a role, such that only the requisite resources defined under that role can be accessed by them.

- Custom roles can be created by selectively providing access to any set of resources from the list of all available resources.

![Custom Roles](./static/chaos-dashboard/custom-roles.png)

Users can also be grouped so as to provide them a common role or adding them to a common notification channel, etc.

### Chaos Infrastructure Management

Chaos infrastructures can be added to or removed from the environments.

- Kubernetes chaos infrastructures can be installed in either cluster-wide scope or namespace mode, to enable chaos injection through all namespaces or only a single namespace respectively.
- All the chaos infrastructure services adhere to the principle of least privilege.
- Multiple chaos infrastructures may be added to a single environment.
- All the chaos infrastructures added under a given environment can be targeted using a chaos experiment.

### Chaos Analytics

As part of a chaos experiment run various statistics are obtained, such as:

- **Resiliency Score:** A quantitative measure of the resiliency of the target environment for the given experiment.
- **Average Resiliency Score:** Average of resiliency scores obtained over consecutive experiment scores.
- **Probe Success Percentage (Per Fault):** The percentage of successful probe checks out of the total number of probes defined for a fault.
