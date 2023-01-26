---
id: kubernetes
title: Chaos Faults for Kubernetes
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->


<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

## Introduction

Kubernetes faults disrupt the resources running on a Kubernetes cluster. They can be categorized into pod-level faults and node-level faults.

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="kubernetes" subCategory="node">

### Docker service kill

Docker service kill makes the application unreachable on the account of the node turning unschedulable (NotReady).
- Docker service is stopped (or killed) on a node to make it unschedulable for a specific duration defined by the `TOTAL_CHAOS_DURATION` environment variable. 
- The application node goes back to normal state and services are resumed after the chaos duration. 

<accordion color="green">
    <summary>View fault usage</summary>
This fault determines the resilience of an application when a node becomes unschedulable, i.e. NotReady state.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Kubelet service kill

Docker service kill makes the application unreachable on the account of the node turning unschedulable (NotReady).
- Docker service is stopped (or killed) on a node to make it unschedulable for a specific duration defined by the `TOTAL_CHAOS_DURATION` environment variable. 
- The application node goes back to normal state and services are resumed after the chaos duration. 

<accordion color="green">
    <summary>View fault usage</summary>
This fault determines the resilience of an application when a node becomes unschedulable, i.e. NotReady state.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node CPU hog

Node CPU hog exhausts the CPU resources on a Kubernetes node. The CPU chaos is injected using a helper pod running the Linux stress tool (a workload generator). The chaos affects the application for a period defined by the `TOTAL_CHAOS_DURATION` environment variable.

<accordion color="green">
    <summary>View fault usage</summary>
The fault aims to verify resiliency of applications whose replicas may be evicted on account on nodes turning unschedulable (Not Ready) due to lack of CPU resources.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node drain
 
Node drain drains the node of all its resources running on it. Due to this, services running on the target node should be rescheduled to run on other nodes. 

<accordion color="green">
    <summary>View fault usage</summary>
This fault determines the resilience of the application when the nodes are deprived of resources. 
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node IO stress

Node IO stress causes I/O stress on the Kubernetes node. The amount of I/O stress is specifed as the size in percentage of the total free space available on the file system using `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable or in gigabytes(GB) using `FILESYSTEM_UTILIZATION_BYTES` environment variable. When both the values are provided, `FILESYSTEM_UTILIZATION_PERCENTAGE` takes precendence. It tests application resiliency on replica evictions that occur due I/O stress on the available disk space.

<accordion color="green">
    <summary>View fault usage</summary>
The fault aims to verify the resilience of applications that share the disk resource for ephemeral or persistent storage purposes.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node memory hog

Node memory hog causes memory resource exhaustion on the Kubernetes node. It is injected using a helper pod running the Linux stress-ng tool (a workload generator). The chaos affects the application foe a duration specified by the `TOTAL_CHAOS_DURATION` environment variable.

<accordion color="green">
    <summary>View fault usage</summary>
Node memory hog causes memory resource exhaustion on the Kubernetes node. The fault aims to verify resilience of applications whose replicas may be evicted on account on nodes becoming unschedulable (Not Ready) due to lack of memory resources.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node restart

Node restart disrupts the state of the node by restarting it. It tests deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod.

<accordion color="green">
    <summary>View fault usage</summary>
This fault determines the deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="kubernetes" subCategory="node">

### Node taint

Node taint taints (contaminates) the node by applying the desired effect. The resources that contain the corresponding tolerations only can bypass the taints.

<accordion color="green">
    <summary>View fault usage</summary>
The fault aims to verify resiliency of applications when the nodes of a container (or deployment) are contaminated.
</accordion>

</FaultDetailsCard>
