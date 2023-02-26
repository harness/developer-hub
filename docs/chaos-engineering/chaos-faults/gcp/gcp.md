---
id: gcp
title: Chaos faults for GCP
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

GCP faults disrupt the resources that run on a GCP cluster. Different GCP faults disrupt various aspects of the GCP cluster.


<ExperimentListSection experiments={experiments} />


<FaultDetailsCard category="gcp">

### GCP VM disk loss by label

GCP VM disk loss by label disrupts the state of GCP persistent disk volume filtered using a label by detaching it from its VM instance for a specific duration.

<accordion color="green">
    <summary>Use cases</summary>

- GCP VM disk loss by label fault can be used to determine the resilience of the GKE infrastructure. 
- It helps determine how quickly a node can recover when a persistent disk volume is detached from the VM instance associated with it.

</accordion>

</FaultDetailsCard>


<FaultDetailsCard category="gcp">

### GCP VM disk loss

This fault disrupts the state of GCP persistent disk volume by detaching the disk volume from its VM instance using the disk name for a specific duration.

<accordion color="green">
    <summary>Use cases</summary>

- GCP VM disk loss fault determines the resilience of the GKE infrastructure. 
- It helps determine how quickly a node can recover when a persistent disk volume is detached from the VM instance associated with it.

</accordion>


</FaultDetailsCard>


<FaultDetailsCard category="gcp">

### GCP VM instance stop by label

This fault powers off from the GCP VM instances (filtered by a label before) for a specific duration.

<accordion color="green">
    <summary>Use cases</summary>
GCP VM instance stop by label fault determines the resilience of an application that runs on a VM instance when a VM instance unexpectedly stops (or fails).
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="gcp">

### GCP VM instance stop

GCP VM instance stop powers off from a GCP VM instance using the instance name (or a list of instance names) before for a specific duration. It checks the performance of the application (or process) running on the VM instance. When the `MANAGED_INSTANCE_GROUP` environment variable is set to `enable`, the fault does not start the instances after chaos. Instead, the fault checks the instance group for new instances.

<accordion color="green">
    <summary>Use cases</summary>
GCP VM instance stop fault determines the resilience of an application that runs on a VM instance when a VM instance unexpectedly stops (or fails).
</accordion>


</FaultDetailsCard>
