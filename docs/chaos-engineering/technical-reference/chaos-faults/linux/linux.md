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

Linux faults disrupt the resources running on a Linux machine. This deteriorates the performance of the application for the duration of the chaos experiment.

## Resource consumption
The infrastructure consumes minimal system resources in an idle state, when no experiment is being executed. For example, in a GCP e2-micro VM instance with **2 vCPU** and **1 GB** of memory that runs **Ubuntu 22.04** operating system, the average resource consumption was found to be as follows:
- **CPU usage:** 0.05%
- **Memory usage:** 1.5%
- **Disk storage consumption:** 25 MB
- **Bandwidth consumption:** 0.15 KB/s

## Fault compatibility matrix
The faults have been tested for compatibility in the following Linux OS distributions:

|                                                 | Stress faults (cpu, memory, disk IO) | Network faults (loss, latency, corruption, duplication) | DNS faults (error, spoof) | HTTP faults(latency, modify body, modify header, reset peer, status code) | Process faults (process kill, service restart) | Time chaos | Disk fill |
|-------------------------------------------------|--------------------------------------|---------------------------------------------------------|---------------------------|---------------------------------------------------------------------------|------------------------------------------------|------------|-----------|
| Ubuntu 16+                                      | ✓                                    | ✓                                                       | ✓                         | ✓                                                                         | ✓                                              | ✓          | ✓         |
| Debian 10+                                      | ✓                                    | ✓                                                       | ✓                         | ✓                                                                         | ✓                                              | ✓          | ✓         |
| CentOS 7+                                       | ✓                                    | ✓                                                       | ✓                         | ✓                                                                         | ✓                                              | ✓          | ✓         |
| RHEL 7+                                         | ✓                                    | ✓                                                       | ✓                         | ✓                                                                         | ✓                                              | ✓          | ✓         |
| Fedora 30+                                      | ✓                                    | ✓                                                       | ✓                         | ✓                                                                         | ✓                                              | ✓          | ✓         |
| openSUSE LEAP 15.4+ / SUSE Linux Enterprise 15+ | ✓                                    | ✓                                                       | ✓                         | ✓                                                                         | ✓                                              | ✓          | ✓         |


<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="linux">

### Linux CPU stress

Linux CPU stress applies stress on the CPU of the target Linux machines for a certain duration.

- Induces CPU stress on the target Linux machines.
- Simulates a lack of CPU for processes running on the application, which degrades their performance.

<accordion color="green">
<summary>Use cases</summary>

- Induces CPU stress on the target Linux machines.
- Simulates a lack of CPU for processes running on the application, which degrades their performance.
- Simulates slow application traffic or exhaustion of the resources, leading to degradation in the performance of processes on the machine.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux memory stress

Linux memory stress causes memory consumption of the target Linux machines for a specific duration.

<accordion color="green">
<summary>Use cases</summary>

- Induces memory consumption and exhaustion on the target Linux machines.
- Simulates a lack of memory for processes running on the application, which degrades their performance.
- Simulates application slowness due to memory starvation, and noisy neighbour problems due to excessive consumption of memory.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux disk IO stress

Linux disk I/O stress applies stress on the disk of the target Linux machines over I/O operations for a specific duration.

<accordion color="green">
<summary>Use cases</summary>

- Simulates slower disk operations for the applications.
- Simulates noisy neighbour problems by exhausting the disk bandwidth.
- Verifies the disk performance on increasing I/O threads and varying I/O block sizes.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network loss
Linux network loss injects chaos to disrupt network connectivity on the Linux machine by blocking the network requests.

<accordion color="green">
<summary>Use cases</summary>

- Induces network loss on the target Linux machines.
- Simulates loss of connectivity access by blocking the network requests on the machine.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network latency
Linux network latency injects chaos to disrupt network connectivity on a Linux machine by adding delay to the network requests.

<accordion color="green">
<summary>Use cases</summary>

- Induces network latency on the target Linux machines.
- Simulates latency in connectivity access by delaying the network requests of the machine.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network duplication
Linux network duplication injects chaos to disrupt network connectivity on a Linux machine by duplicating network packets.

<accordion color="green">
<summary>Use cases</summary>

- Induces network duplication on the target Linux machines.
- Simulates packet duplication in the network.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux network corruption
Linux network corruption injects chaos to disrupt network connectivity on a Linux machine by corrupting the network requests.

<accordion color="green">
<summary>Use cases</summary>

- Induces network corruption on the target Linux machines.
- Simulates network corruption by corrupting requests of the machine.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux DNS error

Linux DNS error injects chaos to disrupt the DNS resolution on a Linux machine.

<accordion color="green">
<summary>Use cases</summary>

- Induces DNS error on the target Linux machines.
- Simulates loss of access to host by blocking the DNS resolution of host names.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux DNS spoof

Linux DNS spoof injects chaos to mimic DNS resolution on a Linux machine.

<accordion color="green">
<summary>Use cases</summary>

- Induces DNS spoof on the target Linux machines.
- Resolves DNS target host names (or domains) to other IPs provided as user input.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux process kill

Linux process kill fault kills the target processes running on the Linux machines.
- It checks the performance of the application or process running on the Linux machine.

<accordion color="green">
<summary>Use cases</summary>

- Induces process kill on the target Linux machines.
- Disrupts the application critical processes such as databases or message queues by killing their underlying processes or threads.
- Determines the resilience of applications when processes on a Linux machine are unexpectedly killed (or disrupted).

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux service restart

Linux service restart stops the target system services running in a Linux machine.
- It determines the performance and resilience of the application (or services) running on Linux machines.

<accordion color="green">
<summary>Use cases</summary>

- Service restart determines the resilience of an application upon random halts.
- Determines how efficiently an application recovers and restarts the services.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux time chaos

Linux time chaos injects chaos to change the time of the Linux machine.

<accordion color="green">
<summary>Use cases</summary>

- Induces time chaos to change the system time on the target Linux machines.
- Determines the resiliency of the underlying application components when subjected to a change in the system time.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux HTTP latency

Linux HTTP latency injects chaos to cause HTTP request/response latency to a service deployed on a Linux machine.

<accordion color="green">
<summary>Use cases</summary>

- Evaluates the application's resilience to erroneous or incorrect HTTP response body.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux HTTP modify body

Linux HTTP modify body injects chaos to cause HTTP request/response body for a service to be modified on a Linux machine.

<accordion color="green">
<summary>Use cases</summary>

- Evaluates the application's resilience to lossy or flaky HTTP responses.
- Simulates latency to specific API services for (or from) a given service.
- Simulates a slow response on specific third-party or dependent components or services.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux HTTP modify header

Linux HTTP modify header injects chaos to add or update the HTTP headers for request/response to a service deployed on a Linux machine.

<accordion color="green">
<summary>Use cases</summary>

- Evaluates the application's resilience to incorrect or incomplete headers in application services.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux HTTP reset peer

Linux HTTP reset peer injects chaos to stop outgoing HTTP requests by resetting the TCP connection. This is achieved by starting the proxy server and redirecting the request/response traffic through the proxy server.

<accordion color="green">
<summary>Use cases</summary>

- Tests the application's resilience to lossy or flaky HTTP connection.
- Simulates premature connection loss that may occur due to firewall issues or other issues between microservices thereby verifying connection timeout.
- Simulates connection resets due to resource limitations on the server side such as out of memory error, process kills, overload on the server due to high amounts of traffic.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="linux">

### Linux HTTP status code

Linux HTTP reset peer injects chaos to modify the status code of the response from the application server to the desired status code provided by the user.

<accordion color="green">
<summary>Use cases</summary>

- Tests the application's resilience to error code HTTP responses from the provided application server.
- Simulates unavailability of specific API services (503, 404).
- Simulates unavailability of specific APIs for (or from) a given microservice.
- Simulates unauthorized requests for third party services (401 or 403), and API malfunction, that is internal server error (50x).

</accordion>

</FaultDetailsCard>
