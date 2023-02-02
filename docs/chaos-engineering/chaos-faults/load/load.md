---
id: load
title: Loadgen Chaos faults
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

Loadgen chaos faults disrupt the state using a heavy load on the given target hosts. They can be categorized into different types depending on the loadgen mechanism used in it.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="load">

### Locust Loadgen Chaos

Locust loadgen chaos fault causes load generation on the given target hosts for a specified chaos duration
- It can result in the slowness or unavailability of the target host due to heavy load.
- This fault checks the performance of the application (or process) running on the instance.

<accordion color="green">
    <summary>Fault usage</summary>
This fault determines the resilience of the application under load. It determines how quickly the application scale/recover to aviod such such a failure. 
</accordion>

</FaultDetailsCard>
