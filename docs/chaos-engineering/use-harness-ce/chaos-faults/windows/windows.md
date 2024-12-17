---
id: windows
title: Chaos faults for Windows
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows
- /docs/chaos-engineering/chaos-faults/windows
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

<div>

## Introduction

Windows faults disrupt the resources running on a Windows OS based machine or VM. This deteriorates the performance of the application for the duration of the chaos experiment. Depending on the type of instance the fault targets, Windows faults are categorized into various types.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="windows">

### Windows CPU stress

Windows CPU stress applies stress on the CPU resources of Windows OS based machine or VM. It checks the performance of the application running on the VMs.

<Accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when stress is applied on the CPU resources of a Windows virtual machine.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows Disk stress

Windows disk stress injects disk stress into a Windows OS based VM, by consuming and exhausting the disk resources on the target Windows machine.

<Accordion color="green">
<summary>Use cases</summary>
- Simulates a lack of disk for processes running on the application, causing performance degradation and system slowdowns.
- Simulates slow application traffic or resource exhaustion, leading to degradation in the performance of processes on the machine.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### Windows memory stress

Windows memory stress applies stress on the memory resources on Windows OS based machine or VM. It checks the performance of the application running on the VMs.

<Accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when stress is applied on the memory resources of a Windows virtual machine.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows Network Blackhole Chaos

Windows blackhole chaos blocks traffic to specified IP addresses on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<Accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when network access to certain IP addresses is blocked on a Windows virtual machine.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows Network Latency

Windows Network Latency causes a network packet delay on Windows VMs for the target hosts by causing network packet delay using [Clumsy](https://jagt.github.io/clumsy/). It checks the performance of the application running on the Windows VMs.

<Accordion color="green">
<summary>Use cases</summary>
- Determines the resilience of an application when a network delay scenario is simulated on a Windows virtual machine.
- Simulates the situation of network delay for dependent processes and microservices running on the application, which degrades their performance.
- Helps verify the application's ability to handle network failures and its failover mechanisms.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows Network Loss

Windows network loss causes network packet loss on Windows VM for the target hosts or IP addresses using Clumsy. It checks the performance of the services running on the Windows VMs after the disrupted network loss conditions.

<Accordion color="green">
<summary>Use cases</summary>
- Simulates issues within the host network (or microservice) communication across services in different hosts.
- Determines the impact of degradation while accessing a microservice.
- Limits the impact (blast radius) to the traffic that you wish to test by specifying the IP addresses, if the VM stalls or gets corrupted while waiting endlessly for a packet.
- Simulates degraded network with varied percentages of dropped packets between microservices.
- Simulates loss of access to specific third party (or dependent) services (or components).
- Simulates blackhole against traffic to a given availability zone, that is, failure simulation of availability zones.
- Simulates network partitions (split-brain) between peer replicas for a stateful application.
</Accordion>

</FaultDetailsCard>

</div>