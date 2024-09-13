---
id: chaos-faults
title: Chaos faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/
- /docs/chaos-engineering/chaos-faults/
---


<div style={{display: 'none'}}>


## Chaos faults

### AWS

### Azure

### Cloud-Foundry

### GCP

### Kube-Resilience

### Kubernetes

### Linux

### Load

### Security-chaos

### VMware

### Windows

### SSH

### BYOC

</div>

Chaos faults are the failures injected into the chaos infrastructure as part of a chaos experiment. Every fault is associated with a target resource, and you can customize the fault using the fault tunables, which you can define as part of the Chaos Experiment CR and Chaos Engine CR.

The fault execution is triggered when the chaos engine resource is created. Typically, the chaos engine is embedded within the **steps** of a chaos fault. However, you can also create the chaos engine manually, and the chaos operator reconciles this resource and triggers the fault execution.

You can customize a fault execution by changing the tunables (or parameters). Some tunables are common across all the faults (for example, **chaos duration**), and every fault has its own set of tunables: default and mandatory ones. You can update the default tunables when required and always provide values for mandatory tunables (as the name suggests).

Various status of chaos faults are described below:

<details>
<summary> Fault Status </summary>

	Fault status indicates the current status of the fault executed as a part of the chaos experiment. A fault can have 0, 1, or more associated [probes](/docs/chaos-engineering/concepts/explore-concepts/resilience-probes/). Other steps in a chaos experiment include resource creation and cleanup.

	In a chaos experiment, a fault can be in one of six different states. It transitions from **running**, **stopped** or **skipped** to **completed**, **completed with error** or **error** state.

	- **Running**: The fault is currently being executed.
	- **Stopped**: The fault stopped after running for some time.
	- **Skipped**: The fault skipped, that is, the fault is not executed.
	- **Completed**: The fault completes execution without any **failed** or **N/A** probe statuses.
	- **Completed with Error**: When the fault completes execution with at least one **failed** probe status but no **N/A** probe status, it is considered to be **completed with error**.
	- **Error**: When the fault completes execution with at least one **N/A** probe status, it is considered to be **error** because you can't determine if the probe status was **passed** or **failed**. A fault is considered to be in an **error** state when it has 0 probes because there are no health checks to validate the sanity of the chaos experiment.

</details>

Below are tables with links to individual fault documentation for easy navigation.

<!-- Custom component -->

import ChaosFaults from '@site/src/components/ChaosEngineering/ChaosFaults';
import { categories } from './categories'

<ChaosFaults categories={categories} />
