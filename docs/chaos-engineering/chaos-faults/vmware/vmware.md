---
id: vmware
title: Chaos faults for VMware
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

VMware faults disrupt the resources running on a VMware cluster. Depending on the type of instance the fault targets, VMware faults are categorized into various types.

<ExperimentListSection experiments={experiments} />


<FaultDetailsCard category="vmware">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### VMware CPU hog

VMware CPU hog applies stress on the CPU resources on Linux OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>View fault usage</summary>
This fault helps determine how resilient an application is when stress is applied on the CPU resources of a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="vmware">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### VMware disk loss

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

- This experiment Causes the application to become unreachable on account of node turning unschedulable (NotReady) due to docker service kill
- The docker service has been stopped/killed on a node to make it unschedulable for a certain duration i.e TOTAL_CHAOS_DURATION. The application node should be healthy after the chaos injection and the services should be re-accessible.
- The application implies services. Can be reframed as: Test application resiliency upon replica getting unreachable caused due to docker service down.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>View fault usage</summary>
    In the distributed system like VMware it is very likely that your application replicas may not be sufficient to manage the traffic (indicated by SLIs) when some of the replicas are unavailable due to any failure (can be system or application) the application needs to meet the SLO(service level objectives) for this, we need to make sure that the applications have minimum number of available replicas. One of the common application failures is when the pressure on other replicas increases then to how the horizontal pod autoscaler scales based on observed resource utilization and also how much PV mount takes time upon rescheduling. The other important aspects to test are the MTTR for the application replica, re-elections of leader or follower like in kafka application the selection of broker leader, validating minimum quorum to run the application for example in applications like percona, resync/redistribution of data.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->

<!-- ensure to enclose all markdown inside the <FaultDetailsCard/> tag-->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->

<FaultDetailsCard category="vmware">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### VMware DNS chaos

VMware DNS chaos causes DNS errors in the VMware VMs for a specific duration.
- It checks the performance of the application (or process) running on the VMware VMs.

<accordion color="green">
    <summary>View fault usage</summary>
This fault causes DNS errors on the target VMs which results in unavailability (or distorted) network connectivity from the VM to the target hosts. This fault provides a hypothesis wherein certain services of an application could be unreachable from the VM. This fault determines how DNS errors impact the infrastructure and standalone tasks in the application.
</accordion>

<!-- <accordion /> has same usage as details with default blue color -->

<!-- ensure to enclose all markdown inside the <FaultDetailsCard/> tag-->

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->
