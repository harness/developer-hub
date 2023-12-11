---
id: ssh
title: Chaos faults for SSH
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

SSH chaos injects chaos on the target host using SSH connections by passing custom chaos logic through a configmap.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="ssh">

### SSH chaos

SSH chaos injects chaos on the target host using SSH connections by passing custom chaos logic through a configmap. These scripts are executed using SSH credentials, which are securely referenced in the configmap. This enables direct fault injection on the target host. This experiment offers customisation for the chaos injection logic, providing flexibility and control over chaos experiments.

<accordion color="green">
    <summary>Use cases</summary>
ssh
</accordion>

</FaultDetailsCard>
