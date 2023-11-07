---
id: cloud-foundry
title: Chaos Faults for Cloud Foundry
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

<FaultDetailsCard category="cloud-foundry">

### CF app route unmap

CF app route unmap causes a Cloud Foundry app route to be temporarily un-mapped and later mapped back to the app.

- Checks resilience against abrupt un-mapping of an app route.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience against abrupt un-mapping of an app route.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>