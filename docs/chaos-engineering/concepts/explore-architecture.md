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
- /docs/chaos-engineering/concepts/deployment-architecture
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Before you begin, review the following

- [All about chaos engineering](/docs/chaos-engineering/concepts/chaos101)

Harness Chaos Engineering (HCE), a part of Harness platform, is offered as SaaS or deployed on-premise (SMP) that is managed by the enterprise customers. The capabilities of HCE are same in both the models - **SaaS** or **On-Premise**. 
Irrespective of the model, the architecture is divided into two parts. 

1. **The Control Plane** that is part of the Harness Platform.
2. **The Execution Plane** that resides in the enterprise's private or public network.

## Deployment models
An enterprise consists of one control plane and one or more execution planes. The diagrams below describe different deployment models. 

Control plane on SaaS:

![SaaS](./static/architecture/ce-arch-saas.png)

Control plane on On-Premise (SMP):

![SaaS](./static/architecture/ce-arch-smp.png)


## The execution plane
The execution plane consists of a logical group of components that reside in the customer's network responsible for running chaos experiments. Some of these components are long running and others are spawned dynamically at run time (of the chaos experiment). The chaos experiments are executed on the target resources by a chaos agent residing on the target or by the Harness delegate residing in the customer network.

### Agentless model
In the agentless model, the chaos experiments are run by the Harness Delegate. One Harness Delegate can run chaos experiments on multiple targets such as other Kubernetes clusters, cloud platform resources, VMware resources, as long as the network connectivity is available between the Delegate and the target.

![Agentless Execution Plane](./static/architecture/agentless-model.png)

Harness Delegate can run chaos experiments on the following target types:
- Kubernetes clusters and the applications running on the Kubernetes. This includes the managed Kubernetes services like EKS, GKE and AKS.
- Cloud Platform resources like AWS ECS, AWS Lambda, GCP Cloud Run, Google Cloud Functions, Azure ACS and Azure functions. This includes cloud platform resources like load balancers too.
- VMware resources

### Agent model 
In the agent model, a chaos agent has to be deployed on the target resource and then the chaos agent runs the chaos experiments on the local resources.

![Agent based Execution Plane](./static/architecture/agentbased-model.png)

Agent model is preferred to run chaos experiments on the Linux or Windows hosts. However, they can be used to run chaos experiments on all types of resources. The following table provides different agent types and corresponding target resources.

**Agent and Agentless models**

| Model     | Agent                  | Supported Target Types                         |
|-----------|------------------------|------------------------------------------------|
| Agentless | Harness Delegate       | Kubernetes, AWS/GCP/Azure resources, VMware    |
| Agent     | Kubernetes Chaos Agent | Kubernetes, AWS/GCP/Azure resources, VMware    |
| Agent     | Linux Chaos Agent      | Linux hosts and applications running on them   |
| Agent     | Windows Chaos Agent    | Windows hosts and applications running on them |


## Features of Control Plane
The control plane in HCE consists of various components that helps connect the targets to Harness, create chaos experiments, set up RBACs, set up governance and orchestrate the chaos experiments. Some of the key features of the control plane are described below.

### Chaos Services
Chaos control plane has the concept of services that are used for license tracking as well as for service-oriented chaos experimentation. 
- A service on the control plane is defined differently for different types of targets. For more details about the chaos services description, go to [license consumption](https://developer.harness.io/docs/chaos-engineering/use-harness-ce/license-consumption/).
- A service also helps achieve service-oriented chaos. This feature support is available **ONLY** for Kubernetes targets using the agentless deployment model. The Kubernetes services on the target clusters or the execution plane are discovered by the [discovery service](/docs/chaos-engineering/use-harness-ce/service-discovery) of the Harness platform and [application maps](/docs/chaos-engineering/use-harness-ce/application-map) are created around them.
After discovery, chaos experiments are created to target the resources of these services by the control plane itself. This significantly reduces the initial learning required to get started with chaos engineering practices.  
- Another use of services and application maps is deriving the resilience coverage metric. Since the potential chaos experiments are already created by the control plane, the ratio of the "experiments that are run versus total number of chaos experiments present" can be calculated at a service level or at an application map level. This results in a useful metric of **resilience coverage** for each service and for application map.

### Governance

Chaos governance is a critical feature of the Harness Chaos Engineering module, reflecting its role in minimizing risks and ensuring controlled, purposeful chaos experiments. Without effective governance, poorly planned experiments can unintentionally expand the blast radius, leading to unexpected disruptions that may harm developer productivity or diminish customer satisfaction. Governance in chaos engineering can be broadly categorized into two key aspects, ensuring structured, safe, and impactful experimentation.
1. Guardrails around creating chaos agents, chaos experiments, and chaos execution policies. This is achieved through the [Harness platform RBAC policies](/docs/chaos-engineering/use-harness-ce/governance/rbac).
2. Guardrails around running chaos experiments. This is achieved through the [ChaosGuard](/docs/chaos-engineering/use-harness-ce/governance/governance-in-execution/).

### Construct Chaos Experiments
Chaos experiments are initially constructed using an easy-to-use UI based builder called **Chaos Studio**. Chaos Studio helps in building complex chaos experiments with ease and also provides a great execution view. Chaos experiments will have chaos faults and resilience probes. Chaos fault templates are taken from the Enterprise ChaosHub and then tuned to the needs of the experiment. Resilience probes are constructed either from scratch or using the templates, tuned and then attached to a fault or an experiment. 

In summary, creation of chaos experiments is made easier by the UI based tooling and the end result of such creation is an YAML file. This YAML file can then be used to achieve further automation using infrastructure management tools such a Terraform or Harness IaC. 

### ChaosHubs
A [ChaosHub](/docs/chaos-engineering/use-harness-ce/chaoshubs/) stores various resources of the Chaos Engineering module. Currently, the supported resource are:
- Chaos Faults
- Chaos Experiment Templates
- Resilience Probe Templates

Harness provides a default ChaosHub called **Enterprise ChaosHub** which contains 200+ different types of faults across different types of targets. Custom ChaosHubs are created by users to store their own chaos experiment templates and resilience probe templates.
The common practice is to select the chaos faults from the Enterprise ChaosHub, construct chaos experiments in the project workspace, test them and push them to your own custom ChaosHub as a template which can be used by other users or projects in the organisation. 

### Orchestrate Chaos Experiments
Once the chaos experiments are created using a chaos studio, they are available in the project workspace. You can execute them in many ways, as described below.

#### Orchestrate Via Pipelines
Harness chaos module provides the ability to [execute experiments in pipelines](/docs/chaos-engineering/integrations/pipeline-exec) with the help of a builtin step called Chaos-Step. This chaos-step executes the target experiment and the resulting resilience score is returned to the pipeline. 

This method offers a streamlined and powerful way to execute chaos experiments by integrating pipeline capabilities such as approvals, notifications, and parallel experiment execution. These features create an efficient framework for orchestrating chaos experiments seamlessly.

You can expand the orchestration to other pipelines like Jenkins, Google Cloud Build, or GitHub Actions through APIs or the HCE-CLI, a specialized command-line tool. This ensures adaptability and seamless integration into various CI/CD workflows.

#### Orchestrate Via API
Harness provides API end points to invoke a chaos experiment and to query the result of a chaos experiment that is already run. For more information, go to [execute using API](/docs/chaos-engineering/getting-started/saas/experiment-using-api).

#### Orchestrate Via Scheduler
HCE control plane allows you to schedule a chaos experiment using CRON. For more information, go to [run experiments on schedule](/docs/chaos-engineering/use-harness-ce/experiments/create-experiments#execute-experiment-on-a-schedule). 

#### Orchestrate Via Portal
Harness chaos portal (aka the control plane) allows you to run an experiment with the **Run** button. You can stop an experiment execution with the **Stop** button in the [portal](https://app.harness.io).

You can [perform bulk actions on the chaos experiments](/docs/chaos-engineering/use-harness-ce/experiments/edit-chaos-experiment#bulk-update-cron-schedules). For example, you can choose multiple chaos experiments and add them to the pipeline for sequential execution.

#### Orchestrate Via CLI
HCE-CLI, a command line interface is provided for seamless execution of chaos experiments from automation scripts or from pipeline. For more information, go to [HCE CLI](/docs/chaos-engineering/api-reference/hce-cli).

#### Orchestrate Via GameDays 
The chaos control place provides a native [Gameday feature](/docs/chaos-engineering/use-harness-ce/GameDay) using which chaos experiments can be planned and executed. 

## Scaling HCE
You can incorporate all the chaos capabilities to your new applications using the agentless model. Once the [Harness delegate is deployed and configured](/docs/platform/delegates/delegate-concepts/delegate-overview#install-a-delegate), you can onboard chaos to a new Kubernetes cluster by [adding a connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector) and running an [automated chaos onboarding wizard](/docs/chaos-engineering/getting-started/onboarding/) that discovers the resources and creates initial set of chaos experiments. 

![Scaling with Harness Chaos Engineering](./static/architecture/scalingchaos.png)
