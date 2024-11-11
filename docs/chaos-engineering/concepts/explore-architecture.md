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


Harness Chaos Engineering is a module on the Harness platfrom. Harness is offered as a SaaS or can be deployed on-premise that can be managed by the enterprise customers. The capabilities of Harness Chaos Engineering are same in either of the models - SaaS or On-Premise. Harness chaos engineering supports many deployment models. In any model, the architecture is divided into two parts. 

1. **The Control Plane** that is part of the Harness Platform
2. **The Execution Plane** that resides in the enterprise's private or public network

## Deployment models

Usually, there is one control plane and one or more execution planes in a given enterprise. Below diagrams shows different deployment models. 

Control plane on SaaS:

![SaaS](./static/architecture/ce-arch-saas.png)

Control plane on On-Premise or SMP :
![SaaS](./static/architecture/ce-arch-smp.png)


## The execution plane
The execution plane is a logical group of components that reside in the customer's network which are responsible for running chaos experiments. Some of these components are long running and others are spawned dynamically at run time of the chaos experiment. The chaos experiments can be run on the target resources by a chaos agent residing on the target or by the Harness delegate residing somewhere in the customer network. 

### Agentless model
In the agentless model, the chaos experiments are run by the Harness Delegate. One Harness Delegate can run chaos experiments on multiple targets like other Kubernetes clusters, cloud platform resources, VMware resources as long as the network connectivity is available between the Delegate and the target.

Harness Delegate can run chaos experiments on the following target types:
- Kubernetes clusters and the applications running on the Kubernetes. This includes the managed Kubernetes services like EKS, GKE and AKS.
- Cloud Platform resources like AWS ECS, AWS Lambda, GCP Cloud Run, Google Cloud Functions, Azure ACS and Azure functions. This includes cloud platform resources like load balancers too.
- VMware resources

### Agent model 
In the agent model, a chaos agent needs to be deployed on the target resource and then the chaos agent runs the chaos experiments on the local resources.

Agent model is usually preferred for running chaos experiments on the Linux or Windows hosts. However, they can be used to run chaos experiments on all types of resources. The following table provides different agent types and corresponding target resources.

|  Model | Agent  |  Supported Target Types |
|---|---|---|
| Agentless  | Harness Deleage  | Kubernetes, AWS/GCP/Azure resources, VMware  |
|  Agent |  Kubernetes Chaos Agent | Kubernetes, AWS/GCP/Azure resources, VMware  |
|  Agent |  Linux Chaos Agent | Linux hosts and applications running on them |
|  Agent |  Windows Chaos Agent | Windows hosts and applications running on them  |


## Scaling of the execution plane

## Resource requirements

