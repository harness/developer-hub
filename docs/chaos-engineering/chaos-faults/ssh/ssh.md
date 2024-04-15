---
id: ssh
title: Chaos faults for SSH
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/ssh
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

SSH chaos injects chaos on the target host using SSH connections by passing custom chaos logic through a ConfigMap.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="ssh">

### SSH chaos

SSH chaos injects chaos on the target host using SSH connections by passing custom chaos logic through a ConfigMap. These scripts are executed using SSH credentials, which are securely referenced in the ConfigMap. This enables direct fault injection on the target host. This experiment offers customisation for the chaos injection logic, providing flexibility and control over chaos experiments.

<Accordion color="green">
    <summary>Use cases</summary>

- SSH chaos can be used with custom chaos logic and transferred to a target VM (to execute network chaos experiments, power off, and so on).
- This serves as a framework which can be customised to perform other chaos experiments, such as network stress, HTTP, DNS, restart service and so on.
- This framework can be used to rollback to the orignal state of an abort event.

</Accordion>

</FaultDetailsCard>
