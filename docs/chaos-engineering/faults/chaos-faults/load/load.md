---
id: load
title: Chaos faults for load generation
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/load
- /docs/chaos-engineering/chaos-faults/load
---

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

## Introduction

Load generation faults drive synthetic traffic at a target service so you can test how the workload behaves under load: whether the SLO holds, whether the HPA scales correctly, and whether monitoring detects saturation within the alerting SLA. Use them to validate the resilience of an application against a controlled, reproducible workload.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="load">

### k6 loadgen

k6 loadgen runs a [Grafana k6](https://grafana.com/docs/k6/) script against a target HTTP endpoint for a configurable duration. Use it for scripted, programmable load tests with rich thresholds and metrics.

<Accordion color="green">
<summary>Use cases</summary>
Test how a service behaves under realistic, scripted load: whether end-to-end latency stays inside the SLO, whether the HPA scales correctly, and whether downstream dependencies absorb the load.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="load">

### Locust loadgen

Locust loadgen runs a [Locust](https://locust.io/) script against a target HTTP endpoint for a configurable duration. Use it when you want a Python-based load profile and a rich UI dashboard during the run.

<Accordion color="green">
<summary>Use cases</summary>
Test how a service behaves under a Python-defined load profile: whether end-to-end latency stays inside the SLO, whether the HPA scales correctly, and whether downstream dependencies absorb the load.
</Accordion>

</FaultDetailsCard>
