---
id: ssh
title: Chaos faults for SSH
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/ssh
- /docs/chaos-engineering/chaos-faults/ssh
---

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

## Introduction

SSH chaos injects user-defined chaos on a remote VM by executing custom scripts (inject and rollback) over SSH. Use it when the chaos you want to run is not covered by a first-class fault, when you need to run a pre-built script that already exists in your operations toolkit, or when you want a portable framework for the long tail of one-off resilience tests.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="ssh">

### SSH chaos

SSH chaos runs a user-supplied inject script on a remote host over SSH for a configurable duration and runs a rollback script when the duration ends or the experiment is aborted. Scripts are passed through a ConfigMap; SSH credentials (`SSH_PASSWORD` and `SSH_KEY`) are referenced from Harness Secret Manager.

<Accordion color="green">
<summary>Use cases</summary>
Use as a customizable framework when the long-tail chaos you need (custom network rules, custom service restarts, custom database failovers) is not covered by a first-class fault. The rollback script ensures the target host returns to baseline on completion or abort.
</Accordion>

</FaultDetailsCard>
