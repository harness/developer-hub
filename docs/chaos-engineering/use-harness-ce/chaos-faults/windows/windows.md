---
id: windows
title: Chaos faults for Windows
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/windows
- /docs/chaos-engineering/chaos-faults/windows
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

<div>

## Introduction

Windows faults disrupt the resources running on a Windows OS based machine or VM. This deteriorates the performance of the application for the duration of the chaos experiment. Depending on the type of instance the fault targets, Windows faults are categorized into various types.

<ExperimentListSection experiments={experiments} />

<FaultDetailsCard category="windows">

### Windows CPU stress

Windows CPU stress applies stress on the CPU resources of Windows OS based machine or VM. It checks the performance of the application running on the VMs.

<Accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when stress is applied on the CPU resources of a Windows virtual machine.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### Windows memory stress

Windows memory stress applies stress on the memory resources on Windows OS based machine or VM. It checks the performance of the application running on the VMs.

<Accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when stress is applied on the memory resources of a Windows virtual machine.
</Accordion>

</FaultDetailsCard>

<FaultDetailsCard category="windows">

### Windows Network Blackhole Chaos

Windows blackhole chaos blocks traffic to specified IP addresses on Windows OS based VMware VM. It checks the performance of the application running on the VMware VMs.

<Accordion color="green">
<summary>Use cases</summary>
This fault helps determine how resilient an application is when network access to certain IP addresses is blocked on a Windows virtual machine.
</Accordion>

</FaultDetailsCard>

</div>
