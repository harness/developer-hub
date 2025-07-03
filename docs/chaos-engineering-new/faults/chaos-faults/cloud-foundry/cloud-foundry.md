---
id: cloud-foundry
title: Chaos Faults for Cloud Foundry
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry
- /docs/chaos-engineering/chaos-faults/cloud-foundry
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->
## Introduction

Cloud Foundry faults disrupt the functioning of Cloud Foundry resources. This deteriorates the performance of the app for the duration of the chaos experiment.

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="cloud-foundry">

### CF app container kill

CF app container kill causes a Cloud Foundry app instance container to be killed and restarted.

- Checks resilience upon app instance crash due to container unavailability.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance crash due to container unavailability.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM CPU stress

CF app JVM CPU stress injects JVM CPU stress into a Cloud Foundry app instance.

- Checks resilience upon app instance JVM CPU stress.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance JVM CPU stress.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM memory stress

CF app JVM memory stress injects JVM memory stress into a Cloud Foundry app instance.

- Checks resilience upon app instance JVM memory stress.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance JVM memory stress.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM method exception

CF app JVM method exception injects JVM method exception into a Cloud Foundry app instance.

- Checks resilience upon app instance JVM method exception.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance JVM method exception.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM method latency

CF app JVM method latency injects JVM method latency into a Cloud Foundry app instance.

- Checks resilience upon app instance JVM method latency.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance JVM method latency.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM modify return

CF app JVM modify return injects JVM modify return into a Cloud Foundry app instance.

- Checks resilience upon app instance JVM modify return.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance JVM modify return.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app JVM trigger GC

CF app JVM trigger GC injects JVM trigger GC into a Cloud Foundry app instance.

- Checks resilience upon app instance JVM trigger GC.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance JVM trigger GC.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app network corruption

CF app network corruption injects network corruption into a Cloud Foundry app instance.

- Checks resilience upon app instance network corruption.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance network corruption.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app network duplication

CF app network duplication injects network duplication into a Cloud Foundry app instance.

- Checks resilience upon app instance network duplication.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance network duplication.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app network latency

CF app network latency injects network latency into a Cloud Foundry app instance.

- Checks resilience upon app instance network latency.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance network latency.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app network loss

CF app network loss injects network loss into a Cloud Foundry app instance.

- Checks resilience upon app instance network loss.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance network loss.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app route unmap

CF app route unmap temporarily unmaps a Cloud Foundry app route and later maps it back to the app.

- Checks resilience against abrupt un-mapping of an app route.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience against abrupt un-mapping of an app route.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>

<FaultDetailsCard category="cloud-foundry">

### CF app stop

CF app stop injects app stop chaos for a Cloud Foundry app.

- Checks resilience against abrupt stop of application components/microservices.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks app resilience against abrupt stopping.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>