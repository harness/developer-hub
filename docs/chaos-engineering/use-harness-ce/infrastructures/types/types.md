---
title: Types of Infrastructure
redirect_from:
- /docs/chaos-engineering/use-harness-ce/infrastructures/enable-disable
---
This topic describes different types of infrastructure, that can be used to execute chaos experiments.

There are different types of chaos infrastructure such as:
- [Legacy Infrastructure (Kubernetes)](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra)
- OpenShift
- [Linux](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/linux)
- [Windows](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra/windows)
- [Delegate-Driven Chaos Infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/types/ddcr/)


You can execute experiments on these infrastructures based on different environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, and so on.

Chaos experiments associated with Cloud Foundry are executed using Linux chaos infrastructure, and experiments with AWS, GCP, Azure, VMware, and Bare metal are executed on Kubernetes infrastructure.

Before creating an infrastructure, [create an environment](/docs/chaos-engineering/use-harness-ce/experiments/create-experiments#create-environment) because a chaos infrastructure is created within an environment.

