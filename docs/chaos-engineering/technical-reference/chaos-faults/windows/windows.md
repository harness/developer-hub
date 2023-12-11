---
id: windows
title: Chaos faults for Windows
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

<div>

## Introduction
Windows faults disrupt the resources running on a Windows OS based machine. This deteriorates the performance of the application for the duration of the chaos experiment. Depending on the type of instance the fault targets, Windows faults are categorized into various types.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="windows">

### VMware Windows CPU hog

VMware Windows CPU hog applies stress on the CPU resources on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when stress is applied on the CPU resources of a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### VMware Windows Memory hog

VMware Windows Memory hog applies stress on the memory resources on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when stress is applied on the memory resources of a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### VMware Windows Blackhole Chaos

VMware Windows Blackhole Chaos blocks traffic to specified IP addresses on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when network access to certain IP addresses is blocked on a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### VMware Windows Network Latency

VMware Windows Network Latency injects network latency on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when network latency is introduced on a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### VMware Windows Network Loss

VMware Windows Network Loss injects network packet loss on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when network packet loss is introduced on a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### VMware Windows Network Corruption

VMware Windows Network Corruption corrupts network packets on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when network packets are corrupted on a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### VMware Windows Network Duplication

VMware Windows Network Duplication duplicates network packets on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when network packets are duplicated on a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### VMware Windows Service Stop

VMware Windows Service Stop stops a specified service on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when a specific service is stopped on a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### VMware Windows Process Kill

VMware Windows Process Kill kills a specified process on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when a specific process is killed on a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### VMware Windows Disk Stress

VMware Windows Disk Stress fills the disk space on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when the disk space is filled on a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### VMware Windows Time Chaos

VMware Windows Time Chaos manipulates the system time on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when the system time is manipulated on a VMware virtual machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows EC2 blackhole chaos

Windows EC2 blackhole chaos results in access loss to the given target hosts or IPs by injecting firewall rules.

<accordion color="green">
    <summary>Use cases</summary>
    
Windows EC2 blackhole chaos:
- Degrades the network without the EC2 instance being marked as unhealthy (or unworthy) of traffic. This can be resolved by using a middleware that switches the traffic based on certain SLOs (performance parameters). 
- Limits the impact, that is, blast radius to only the traffic that you wish to test, by specifying the destination hosts or IP addresses. 

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows EC2 CPU hog

EC2 windows CPU hog induces CPU stress on the AWS Windows EC2 instances using Amazon SSM Run command.

<accordion color="green">
    <summary>Use cases</summary>

EC2 windows CPU hog:
- Simulates the situation of a lack of CPU for processes running on the instance, which degrades their performance. 
- Simulates slow application traffic or exhaustion of the resources, leading to degradation in the performance of processes on the instance.

</accordion>
</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows EC2 memory hog

Windows EC2 memory hog induces memory stress on the target AWS Windows EC2 instance using Amazon SSM Run command.

<accordion color="green">
    <summary>Use cases</summary>

Windows EC2 memory hog:
- Causes memory stress on the target AWS EC2 instance(s).
- Simulates the situation of memory leaks in the deployment of microservices.
- Simulates application slowness due to memory starvation, and noisy neighbour problems due to hogging.

</accordion>
</FaultDetailsCard>
</div>
