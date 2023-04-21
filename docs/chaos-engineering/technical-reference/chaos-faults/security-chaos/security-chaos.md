---
id: security-chaos
title: Chaos faults for Kube Security
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

Security chaos is a set of chaos experiments that helps test the security of the Kubernetes cluster.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="security-chaos">

### Kube security CIS

Kube security CIS runs the CIS benchmark on the Kubernetes cluster and checks for the compliance of the cluster with the CIS benchmark. CIS benchmark is a set of security best practices for the Kubernetes cluster.

<accordion color="green">
    <summary>Use cases</summary>

- Determines the compliance of the Kubernetes cluster with the CIS benchmark.
- Find and fix the security issues in the Kubernetes cluster.

</accordion>

</FaultDetailsCard>