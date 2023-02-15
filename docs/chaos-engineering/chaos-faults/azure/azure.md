---
id: azure
title: Chaos faults for Azure
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

Azure faults disrupt the resources running on a Azure cluster. They can be categorized into different types depending on the target resource. 

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="azure">

### Azure disk loss

Azure disk loss detaches the virtual disk from an Azure instance. 
- After a specific duration, the virtual disk is re-attached to the instance. 
- This fault checks the performance of the application (or process) running on the instance.

<accordion color="green">
    <summary>Use cases</summary>

- Determines the resilience of an application to unexpected disk detachment. 
- Determines how quickly the Azure instance recovers from such failures. 

</accordion>

</FaultDetailsCard>


<FaultDetailsCard category="azure">

### Azure instance CPU hog

Azure instance CPU hog disrupts the state of infrastructure resources. 
- It induces stress on the Azure instance using the Azure `Run` command. The Azure `Run` command is executed using the in-built bash scripts within the fault.
- It utilizes excess amounts of CPU on the Azure instance using the bash script for a specific duration.


<accordion color="green">
    <summary>Use cases</summary>

- Determines the resilience of an Azure instance and the application deployed on the instance during unexpected excessive utilization of the CPU resources. 
- Determines how Azure scales the CPU resources to maintain the application when it is under stress. 
- Causes CPU stress on the Azure instance(s). 
- Simulates the situation of lack of CPU for processes running on the application, which degrades their performance. 
- Verifies metrics-based horizontal pod autoscaling.
- Verifies vertical autoscale, that is, demand based CPU addition. 
- Facilitates the scalability of nodes based on growth beyond budgeted pods. 
- Verifies the autopilot functionality of cloud managed clusters. 
- Verifies multi-tenant load issues. When the load on one container increases, the fault checks for any downtime in other containers. 

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="azure">

### Azure instance IO stress

Azure instance I/O stress disrupts the state of infra resources. 
- This fault induces stress on the Azure instance using the Azure `Run` command. The Azure `Run` command is executed using the in-built bash scripts within the fault.
- It causes I/O stress on the Azure Instance using the bash script for a specific duration.


<accordion color="green">
    <summary>Use cases</summary>

- Determines the resilience of an Azure instance when unexpected stress is applied on the I/O sources. 
- Determines how Azure scales the resources to maintain the application under stress. 
- Simulates slower disk operations by the application.
- Simulates noisy neighbour problems by hogging the disk bandwidth. 
- Verifies the disk performance on increasing I/O threads and varying I/O block sizes. 
- Checks whether or not the application functions under high disk latency conditions.
- Checks whether or not the application functions under high I/O traffic, and large I/O blocks.
- Checks if other services monopolize the I/O disks during stress. 

</accordion>

</FaultDetailsCard>


<FaultDetailsCard category="azure">


### Azure instance memory hog

Azure instance memory hog disrupts the state of infrastructure resources. 
- It induces stress on the Azure Instance using the Azure `Run` command. The Azure `Run` command is executed using the in-built bash scripts within the fault.
- It utilizes memory in excess on the Azure Instance using the bash script for a specific duration.

<accordion color="green">
<summary>Fault usage</summary>

- Determines the resilience of an Azure instance when memory resources are unexpectedly utilized in excess. 
- Determines how Azure scales the memory to maintain the application when resources are consumed heavily. 
- Simulates the situation of memory leaks in the deployment of microservices.
- Simulates a slowed application caused by lack of memory.
- Simulates noisy neighbour problems due to hogging. 
- Verifies pod priority and QoS setting for eviction purposes. 
- Verifies application restarts on OOM (out of memory) kills.

</accordion>

</FaultDetailsCard>


<FaultDetailsCard category="azure">

### Azure instance stop

Azure instance stop powers off from an Azure instance during a specific duration. It checks the performance of the application or process running on the instance.


<accordion color="green">
    <summary>Use cases</summary>

- Determines the resilience of an application to unexpected power off of the Azure instances. 
- Determines how the application handles the requests and how quickly it recovers from such failures.

</accordion>

</FaultDetailsCard>


<FaultDetailsCard category="azure">


### Azure web app access restrict

Azure web app access restrict causes a split brain condition by restricting the access to an application service instance.
- This fault checks if the requests have been serviced and recovery is automated after the restrictions have been lifted.
- It checks the performance of the application (or process) running on the instance.

<accordion color="green">
    <summary>Use cases</summary>
Azure web app access restrict determines the resilience of an application when access to a specific application service instance is restricted.
</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="azure">

### Azure web app stop

Azure web app stop shuts down the application. It checks whether the requests have been re-routed to another instance on the application service.


<accordion color="green">
    <summary>Use cases</summary>

- Determines the resilience of a web application to unplanned halts (or stops). 
- Determines the resilience based on how quickly and efficiently the application recovers from the failure by re-routing the traffic to a different instance on the same application service.

</accordion>

</FaultDetailsCard>

