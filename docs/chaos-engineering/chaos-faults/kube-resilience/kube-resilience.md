---
id: kube-resilience
title: Chaos faults for Kube resilience
---

## Introduction

Kubelet density determines the resilience of the kubelet by creating pods on a specific node. It helps determine how resilient an application is to the unplanned scaling of K8s pods.

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->


<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="kube-resilience">

### Kubelet density

Kubelet density determines the resilience of the kubelet by creating pods on a specific node.
- In distributed systems like Kube resilience, application replicas might not be sufficient to manage the traffic (indicated by SLIs) during system (or application) failures. 
- A common application failure occurs when the pressure on other replicas increases, and the horizontal pod autoscaler (HPA) scales based on the observed resource utilization, and the amount of time it takes the persistent volume to mount on rescheduling.
- In case of failures, the application needs to meet the SLOs (service level objectives) by making a minimum number of replicas available.

<accordion color="green">
<summary>Use cases</summary>

- Kubelet density determines how resilient an application is to unplanned scaling of Kubernetes pods.
- It simulates pod-storm (due to autoscale) on high traffic conditions.
- It verifies functioning of the application services from latency and availability standpoint.
- It ensures that the topology constraints are adhered to on pod scale (node selectors, tolerations, zone distribution, affinity or anti-affinity policies). 
- It verifies pod creation and scheduling SLIs on the cluster nodes.
- It helps determine the performance of the kubelet for a specific node.

</accordion>

</FaultDetailsCard>