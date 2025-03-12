---
title: Types of Infrastructure
---
This topic describes different types of infrastructure, that can be used to execute chaos experiments.

Based on the target environments, you can install chaos infrastructure as a Kubernetes service, a Linux daemon or a Windows agent.

There are different types of chaos infrastructure such as:
- [Legacy Infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/types/legacy-infra)
    - OpenShift
- [Delegate-Driven Chaos Infrastructure](/docs/chaos-engineering/use-harness-ce/infrastructures/types/ddcr/)
- Linux
- Windows

You can execute experiments on these infrastructures based on different environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, and so on.

Chaos experiments associated with Cloud Foundry are executed using Linux chaos infrastructure, and experiments with AWS, GCP, Azure, VMware, and Bare metal are executed on Kubernetes infrastructure.