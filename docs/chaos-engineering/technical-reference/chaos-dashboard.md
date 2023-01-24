---
title: Chaos Dashboard
sidebar_position: 8
---

![Chaos Dashboard](./static/chaos-dashboard/chaos-dashboard.png)

Chaos Dashboard is the user-facing dashboard for Harness Chaos Engineering, which provides access to its different features. These features can be broadly classified into:
1. Experiment Management
2. User Management
3. Chaos Infrastructure Management
4. Chaos Analytics

## Experiment Management
Experiment management is an umbrella term for all the actions related to a chaos experiment. This includes their creation, update, and deletion among other things.

- Creation of chaos experiments can be done from:
    - Blank Canvas
    - Experiment Templates (From Chaos Hubs)
    - Experiment Manifest File 
- An existing chaos experiment can be updated to make changes to the existing experiment or to a copy of the experiment.
- Deleting a chaos experiment removes it from the dashboard.

## User Management
Role Based Access Control can be enforced for the users to assign them a role, such that only the requisite resources defined under that role can be accessed by them.
- Custom roles can be created by selectively providing access to any set of resources from the list of all available resources.

![Custom Roles](./static/chaos-dashboard/custom-roles.png)

Users can also be grouped so as to provide them a common role or adding them to a common notification channel, etc.

## Chaos Infrastructure Management
Chaos infrastructures can be added to or removed from the environments.
- Kubernetes chaos infrastructures can be installed in either cluster-wide scope or namespace mode, to enable chaos injection through all namespaces or only a single namespace respectively.
- All the chaos infrastructure services adhere to the principle of least privilege.
- Multiple chaos infrastructures may be added to a single environment.
- All the chaos infrastructures added under a given environment can be targeted using a chaos experiment.

## Chaos Analytics
As part of a chaos experiment run various statistics are obtained, such as:
- **Resiliency Score:** A quantitative measure of the resiliency of the target environment for the given experiment.
- **Average Resiliency Score:** Average of resiliency scores obtained over consecutive experiment scores.
- **Probe Success Percentage (Per Fault):** The percentage of successful probe checks out of the total number of probes defined for a fault.
