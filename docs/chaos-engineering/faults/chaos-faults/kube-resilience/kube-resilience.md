---
id: kube-resilience
title: Chaos faults for Kube resilience
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/kube-resilience
- /docs/chaos-engineering/chaos-faults/kube-resilience
- /docs/chaos-engineering/technical-reference/chaos-faults/security-chaos/kube-security-cis/
---

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

## Introduction

Kube-resilience faults test the resilience of Kubernetes control-plane components (kubelet, scheduler, API server) under stress conditions that target a specific node. Use these faults to validate that the cluster, the node, and co-located workloads behave correctly when a node suddenly becomes saturated.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="kube-resilience">

### Kubelet density

Kubelet density creates a configurable number of pods on a target Kubernetes node so the kubelet has to handle a sudden burst of pod-create requests in a short window.

<Accordion color="green">
<summary>Use cases</summary>
Test how a node, the kubelet, the container runtime, and co-located workloads behave under a pod-storm: whether the kubelet stays responsive, whether image pulls and CNI setup keep up, whether HPA reacts correctly, and whether monitoring detects the saturation within the alerting SLA.
</Accordion>

</FaultDetailsCard>
