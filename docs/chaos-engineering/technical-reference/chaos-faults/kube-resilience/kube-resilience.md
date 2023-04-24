---
id: kube-resilience
title: Chaos faults for Kube resilience
---

## Introduction

Kubelet density determines the resilience of the kubelet by creating pods on a specific node.

- It helps determine how resilient an application is to the unplanned scaling of K8s pods.

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="kube-resilience">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### Kubelet density

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

- Kubelet density determines the resilience of the kubelet by creating pods on a specific node.
- It also helps determine the performance of the kubelet for a specific node.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
<summary>Use cases </summary>
This fault helps determine how resilient an application is to the unplanned scaling of K8s pods.
In distributed systems like Kube resilience, application replicas may not be sufficient to manage the traffic (indicated by SLIs) during any kind of failures (system or application failure). In such cases, the application needs to meet the SLOs (service level objectives). For this purpose, it is important to ensure that the application has a minimum number of replicas available. 
A common application failure is when the pressure on other replicas increases, how the horizontal pod autoscaler (HPA) scales based on the observed resource utilization, and the amount of time the persistent volume takes to mount on rescheduling.
It simulates pod-storm (due to autoscale) on high traffic conditions and verifies successful functioning of the application services (from latency and availability standpoint).
It ensures that the topology constraints are adhered to on pod scale (node selectors, tolerations, zone distribution, affinity (or anti-affinity policies)). 
It also verifies pod creation and scheduling SLIs on the cluster nodes.
</accordion>

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->
