---
id: load
title: Chaos faults for Loadgen
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

Loadgen faults disrupt the state of the application by applying a heavy load on the target hosts. They can be categorized into different types based on the loadgen mechanism used in them.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="load">

### Locust loadgen

Locust loadgen fault simulates load generation on the target hosts for a specific chaos duration. This fault:

- Slows down or makes the target host unavailable due to heavy load.
- Checks the performance of the application or process running on the instance.

<accordion color="green">
    <summary>Use cases</summary>
This fault determines the resilience of the application under a generated load. It determines how quickly the application scales or recovers to avoid such failure. 
</accordion>

</FaultDetailsCard>
