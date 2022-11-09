---
title: Chaos Infrastructures
sidebar_position: 7
---

Chaos infrastructures represent the individual components of a deployment environment. It is a service that runs within your target environment to aid HCE in accessing the target resources and injecting chaos at cloud-native scale. 
- There are different types of chaos infrastructures for different environments such as Kubernetes, Linux VMs, AWS cloud, VMware, etc. 
- Based on the target environments, chaos infrastructures might install as a Kubernetes service or a Linux daemon and so on. 

All the chaos infrastructure services adhere to the principle of least privilege where they execute only with the minimum number of permissions required.

Multiple chaos infrastructures may be added to a single environment and can be subjected to a chaos experiment as an entity.
