---
id: chaos-faults
title: Chaos faults
redirect_from:
	- /docs/chaos-engineering/technical-reference/chaos-faults/
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


The fault execution is triggered when the chaos engine resource is created. Typically, the chaos engine is embedded within the **steps** of a chaos fault. However, you can also create the chaos engine manually, and the chaos operator reconciles this resource and triggers the fault execution.

Below are tables with links to individual fault documentation for easy navigation.

<!-- Custom component -->

import ChaosFaults from '@site/src/components/ChaosEngineering/ChaosFaults';
import { categories } from './categories'

<ChaosFaults categories={categories} />
