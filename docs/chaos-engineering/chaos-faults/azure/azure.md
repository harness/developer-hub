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

Azure disk loss detaches the virtual disk from an Azure instance during chaos. 
- After the specific chaos duration, the virtual disk is re-attached to the instance. 
- This fault checks the performance of the application (or process) running on the instance.

<accordion color="green">
    <summary>Fault usage</summary>
This fault determines the resilience of an application to unexpected disk detachment. It determines how quickly the Azure instance recovers from such a failure. 
</accordion>

</FaultDetailsCard>


<FaultDetailsCard category="azure">

### Azure instance CPU hog


Azure instance CPU hog disrupts the state of infrastructure resources. 
- The fault induces stress on the Azure instance using the Azure Run Command. This command is executed using the bash scripts that are in-built in the fault.
- It utilizes the CPU in excess on the Azure instance using the bash script for a specific duration.


<accordion color="green">
    <summary>Fault usage</summary>
This fault determines the resilience of an Azure instance when CPU resources are utilized in excess, unexpectedly. It determines how Azure scales the CPU resources to maintain the application when it is under stress. 
</accordion>

</FaultDetailsCard>


<FaultDetailsCard category="azure">

### Azure instance IO stress


Azure instance I/O stress contains chaos to disrupt the state of infra resources. 
- The fault can induce stress chaos on Azure Instance using Azure Run command. This command is executed using the bash scripts that are in-built in the fault.
- It causes I/O stress on the Azure Instance using the bash script for a specific duration.


<accordion color="green">
    <summary>Fault usage</summary>
This fault determines the resilience of an Azure instance when I/O sources are in excess, unexpectedly. It determines how Azure scales the resources to maintain the application when it is under stress. 
</accordion>

</FaultDetailsCard>


<FaultDetailsCard category="azure">


### Azure instance memory hog


Azure instance memory hog disrupts the state of infrastructure resources. 
- This fault induces stress on the Azure Instance using the Azure Run command.
- This command is executed using the bash scripts that are in-built in the fault.
- It utilizes memory in excess on the Azure Instance using the bash script for a specific duration.


<accordion color="green">
    <summary>Fault usage</summary>
    This fault determines the resilience of an Azure instance when memory resources are utilized in excess, unexpectedly. It determines how Azure scales the memory to maintain the application when resources are consumed heavily. 
</accordion>

</FaultDetailsCard>


<FaultDetailsCard category="azure">

### Azure instance stop


Azure instance stop powers off from an Azure instance during a specific duration.
- It checks the performance of the application (or process) running on the instance.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>Fault usage</summary>
This fault determines the resilience of an application to unexpected power offs from Azure instances. It determines how the application handles the requests and how quickly it recovers from such failures. 
</accordion>

</FaultDetailsCard>


<FaultDetailsCard category="azure">


### Azure web app access restrict


Azure web app access restrict cause a split brain condition by restricting the access to an app-service instance.
- This fault checks if the requests have been serviced and recovery is automated after the restrictions have been lifted.
- It checks the performance of the application (or process) running on the instance.


<accordion color="green">
    <summary>Fault usage</summary>
This fault determines the resilience of an application when access to a specific app-service instance has been restricted.
</accordion>

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->
<FaultDetailsCard category="azure">

### Azure web app stop


Azure web app stop shuts down the application.
- This fault checks if the requests have been re-routed to another instance on the application service.


<accordion color="green">
    <summary>Fault usage</summary>
This fault determines the resilience of a web application to unplanned halts (or stops). It determines the resilience based on how quicly (and efficiently) the application recovers from the failure by re-routing the traffic to a different instance on the same application service. 
</accordion>

</FaultDetailsCard>

