---
sidebar_position: 6
title: Explore Architecture
description: Understand Harness Chaos Engineering Architecture
canonical_url: https://www.harness.io/blog/automating-kubernetes-resource-discovery-and-chaos-experiment-creation
redirect_from:
- /docs/chaos-engineering/get-started/key-concepts
- /docs/chaos-engineering/architecture-and-security/architecture/components
- /docs/chaos-engineering/architecture-and-security/architecture
- /docs/chaos-engineering/technical-reference/architecture/kubernetes
- /docs/chaos-engineering/technical-reference/architecture/linux
- /docs/chaos-engineering/architecture-and-security/architecture/control-plane
- /docs/category/architecture-and-security
- /docs/category/architecture
- /docs/chaos-engineering/chaos-infrastructure/linux-chaos-infrastructure-advanced-management
- /docs/chaos-engineering/features/chaos-infrastructure/linux-chaos-infrastructure-advanced-management
- /docs/chaos-engineering/features/chaos-infrastructure/windows-chaos-infrastructure
- /docs/chaos-engineering/features/chaos-infrastructure/openshift-infra
- /docs/chaos-engineering/chaos-infrastructure/openshift-infra
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Deployment models

Harness Chaos Engineering is a module on the Harness platfrom. Harness is offered as a SaaS or can be deployed on-premise that can be managed by the enterprise customers. The capabilities of Harness Chaos Engineering are same in either of the models - SaaS or On-Premise. The On-Premise version of Harness is called as Self-Managed-Platform or SMP.


In both the deployment models, the architecture is broadly classified into two parts:

1. **The Control Plane** that is part of the Harness Platform
2. **The Execution Plane** that resides in the enterprise's private or public network

In SaaS model, the chaos control plane of the customer is managed by Harness and the execution plane and the image artifact registry have to have connectivity to SaaS (app.harness.io). In the On-Premise model, the chaos control plane and the execution plane are inside the customer network, only the image artifact registry need to be updated from the public domain. 

![ SaaS vs SMP ](./static/architecture/saas-vs-onprem.png)


## The execution plane


The execution plane is a logical group of components that reside in the customer's network which are responsible for running chaos experiments. Some of these components are long running and others are spawned dynamically at run time of the chaos experiment. The chaos experiments can be run on the target resources by a chaos agent residing on the target or by the Harness delegate residing somewhere in the customer network. 



### Agentless model
In the agentless model, the chaos experiments are run by the Harness Delegate. One Harness Delegate can run chaos experiments on multiple targets like other Kubernetes clusters, cloud platform resources, VMware resources as long as the network connectivity is available between the Delegate and the target.

![Agentless Execution Plane](./static/architecture/agentless-model.png)

Harness Delegate can run chaos experiments on the following target types:
- Kubernetes clusters and the applications running on the Kubernetes. This includes the managed Kubernetes services like EKS, GKE and AKS.
- Cloud Platform resources like AWS ECS, AWS Lambda, GCP Cloud Run, Google Cloud Functions, Azure ACS and Azure functions. This includes cloud platform resources like load balancers too.
- VMware resources

### Agent model 
In the agent model, a chaos agent needs to be deployed on the target resource and then the chaos agent runs the chaos experiments on the local resources.
![Agent based Execution Plane](./static/architecture/agentbased-model.png)

Agent model is usually preferred for running chaos experiments on the Linux or Windows hosts. However, they can be used to run chaos experiments on all types of resources. The following table provides different agent types and corresponding target resources.

**Agent and Agentless models**

|  Model | Agent  |  Supported Target Types |
|---|---|---|
| Agentless  | Harness Deleage  | Kubernetes, AWS/GCP/Azure resources, VMware  |
|  Agent |  Kubernetes Chaos Agent | Kubernetes, AWS/GCP/Azure resources, VMware  |
|  Agent |  Linux Chaos Agent | Linux hosts and applications running on them |
|  Agent |  Windows Chaos Agent | Windows hosts and applications running on them  |


## The control plane

### Chaos Services
### Governance
#### Platform RBACs
#### ChaosGuard
### Constructing Experiments
#### Chaos Studio
### Storing Chaos Experiments
#### Project workspace
#### Custom ChaosHubs
### Orchestrating Chaos Experiments
#### Via Pipelines
#### Via API
#### Via Scheduler
#### Via Portal
#### Via CLI
#### Via GameDays 

## Scaling of  Harness Chaos Engineering

## How Stuff Works 

