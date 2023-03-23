---
id: linux
title: Chaos Faults for Linux
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

Linux faults disrupt the resources running on a Linux machine.

## Fault compatibility matrix
The faults have been tested for compatibility in the following Linux OS distributions:

|                                                 | stress faults (CPU, memory, disk IO) | network faults (loss, latency, corruption, duplication) | DNS faults (error, spoof) | process faults (process kill, service restart) | time chaos |
|-------------------------------------------------|--------------------------------------|---------------------------------------------------------|---------------------------|------------------------------------------------|------------|
| Ubuntu 16+                                      | ✓                                    | ✓                                                       | ✓                         | ✓                                              | ✓          |
| Debian 10+                                      | ✓                                    | ✓                                                       | ✓                         | ✓                                              | ✓          |
| CentOS 7+                                       | ✓                                    | ✓                                                       | ✓                         | ✓                                              | ✓          |
| RHEL 7+                                         | ✓                                    | ✓                                                       | ✓                         | ✓                                              | ✓          |
| openSUSE LEAP 15.4+ / SUSE Linux Enterprise 15+ | ✓                                    | ✓                                                       | ✓                         | ✓                                              | ✓          |

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="linux">

### Linux CPU stress

Linux CPU Stress fault stresses the CPU of the target Linux machines for a certain duration.

- Induces CPU stress on the target Linux machines.
- Simulates a lack of CPU for processes running on the application, which degrades their performance.

<accordion color="green">
<summary>View fault usage</summary>
Simulates slow application traffic or exhaustion of the resources, leading to degradation in the performance of processes on the machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux memory stress

Linux Memory Stress fault causes memory consumption of the target Linux machines for a certain duration.

- Induces memory consumption and exhaustion on the target Linux machines.
- Simulates a lack of memory for processes running on the application, which degrades their performance.

<accordion color="green">
<summary>View fault usage</summary>
Simulates application slowness due to memory starvation, and noisy neighbour problems due to excessive consumption of memory.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux disk IO stress

Linux Disk IO Stress fault stresses the disk of the target Linux machines over IO operations for a certain duration.

- Simulates slower disk operations for the applications.
- Simulates noisy neighbour problems by exhausting the disk bandwidth.
- Verifies the disk performance on increasing IO threads and varying IO block sizes.

<accordion color="green">
<summary>View fault usage</summary>
Checks how the application functions under high disk latency conditions, when IO traffic is high and includes large I/O blocks, and when other services monopolize the IO disks.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network loss
Linux Network Loss injects chaos to disrupt network connectivity in linux machine by blocking the network requests.

<accordion color="green">
<summary>View fault usage</summary>
Simulates loss of connectivity access by blocking the network requests of the Linux machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network latency
Linux Network Latency injects chaos to disrupt network connectivity in linux machine by adding delay to the network requests.

<accordion color="green">
<summary>View fault usage</summary>
Simulates latency in connectivity access by delaying the network requests of the machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network duplication
Linux Network Duplication injects chaos to disrupt network connectivity in Linux machine by duplicating network packets.

<accordion color="green">
<summary>View fault usage</summary>
Simulates packet duplication in connectivity access of the machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network corruption
Linux Network Corruption injects chaos to disrupt network connectivity in Linux machine by corrupting the network requests.

<accordion color="green">
<summary>View fault usage</summary>
Simulates corruption in network by corrupting the network requests of the machine.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux DNS error

Linux DNS Error injects chaos to disrupt DNS resolution in Linux machine.

<accordion color="green">
<summary>View fault usage</summary>
Simulates loss of access to host by blocking DNS resolution of hostnames.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux DNS spoof

Linux DNS Spoof injects chaos to mimic DNS resolution in linux machine.

<accordion color="green">
<summary>View fault usage</summary>
It resolves DNS target host names (or domains) to other IPs provided as user input.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux process kill

Linux Process Kill fault kills the target processes running on Linux machines.
- It checks the performance of the application/process running on Linux.
- Disrupts the application critical processes such as databases or message queues by killing their underlying processes or threads.

<accordion color="green">
<summary>View fault usage</summary>
Determines the resilience of applications when processes on a Linux machine are unexpectedly killed (or disrupted).
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux service restart

Linux Service Restart stops the target system services running in a Linux machine.
- Determines the performance and resilience of the application (or services) running on Linux machines.
- Determines the resilience of an application upon random halts.

<accordion color="green">
<summary>View fault usage</summary>
Determines how efficiently an application recovers and restarts the services.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux time chaos

Linux Time Chaos injects chaos to change the time of the Linux machine.

<accordion color="green">
<summary>View fault usage</summary>
Determines the resiliency of the underlying application components when subjected to a change in the system time.
</accordion>

</FaultDetailsCard>
