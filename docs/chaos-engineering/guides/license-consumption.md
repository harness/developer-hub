---
title: License Consumption 
sidebar_position: 12
description: Harness CE services license consumption
redirect_from:
  - /docs/chaos-engineering/use-harness-ce/license-consumption/
---

Harness Chaos Engineering uses a licensing model based on the number of **Services** that undergo chaos experimentation within each 30-day cycle. This model is integrated into the broader Harness Developer 360 framework, where each chaos service license entitles three developers to access and use the Chaos Engineering module.

This approach allows targeted experimentation across a wide range of environments, optimizing license utilization and supporting the needs of different teams, applications, and infrastructure types.

## What is a service?

In the Harness Chaos Engineering module, a **Service** refers to the specific target resource undergoing chaos experiments. This could include a variety of resources such as Kubernetes clusters, VMware instances, Windows or Linux servers, PCF applications, and popular cloud platforms. 

The table below describes how a **Service** is considered in Chaos Engineering, in the context of the target resource.

| Target Resource | Chaos Service Mapping | Target Resource : Chaos Service License |
|---|---|---|
| Kubernetes Platform | One license service is equivalent to a Kubernetes service or a workload such as a Deployment/ReplicaSet/StatefulSet/DaemonSet/Job/CronJob. | 1:1 |
| Virtual Machine or a Baremetal host running Windows or Linux OS | The virtual machine can be a VMware VM, a hypervisor VM, or any cloud provider VM such as EC2, GCP VM, or Azure VM. This has a one-to-one mapping with the license service. | 1:1 |
| Serverless functions | Cloud providers offer serverless functions such as AWS Lambda, GCP Cloud Functions, or Azure Functions. Chaos experiments on 5 serverless functions are mapped to a license service. | 5:1 |
| Cloud Container Services | This could be AWS ECS, Azure Container Apps, or GCP Cloud Run. This has a one-to-one mapping with the license service. | 1:1 |
| Miscellaneous (experiment runs) | Any target resource that does not fall into a specific type described above, will fall in the miscellaneous category. In this category, 100 chaos experiment runs on a given target are mapped to a license service. | 100:1 |

Have questions? Go to [Frequently Asked Questions on Licenses](/docs/faqs/chaos-engineering-faqs#license).
