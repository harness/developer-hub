---
title: CE Services - License Consumption 
sidebar_position: 90
description: Harness CE services license consumption
---

Harness Chaos Engineering uses a licensing model based on the number of **Services** that undergo chaos experimentation within each 30-day cycle. This model is integrated into the broader Harness Developer 360 framework, where each chaos service license entitles three developers to access and use the Chaos Engineering module.

This approach allows targeted experimentation across a wide range of environments, optimizing license utilization and supporting the needs of different teams, applications, and infrastructure types.

### What is a service?
In the Harness Chaos Engineering module, a **Service** refers to the specific target resource undergoing chaos experiments. This could include a variety of resources such as Kubernetes clusters, VMware instances, Windows or Linux servers, PCF applications, and popular cloud platforms. 

The table below describes how a **Service** is considered in Chaos Engineering, in the context of the target resource.

| **Target Resource**                                             | **Chaos Service Mapping**                                                                                                                                                       | **Target resource : Chaos Service License** |
|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| Kubernetes Service                                              | Each Kubernetes service is mapped directly to a Chaos Service.                                                                                                                  | 1:1                                         |
| Virtual Machine or a Baremetal host running Windows or Linux OS | The virtual machine can be a VMware VM, or a hypervisor VM, or any cloud provider VM such as EC2 or GCP VM or Azure VM. This has a one to one mapping with the license service. | 1:1                                         |
| Serverless functions                                            | Cloud provides serverless functions such as Lambda (AWS), GCP Cloud Functions or Azure functions. Chaos experiments on 5 serverless functions are mapped to a license service.  | 5:1                                         |
| Cloud Container Services                                        | This could be AWS ECS or Azure Container App or GCP Cloud Run. This has a one to one mapping with the license service.                                                          | 1:1                                         |
| Miscellaneous (experiment runs)                                 | Any target resource that does not fall into a particular type described above. 100 chaos experiment runs on a given target is mapped to a license service.                      | 100:1                                       |