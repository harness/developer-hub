---
title: Faults
sidebar_position: 2
---

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