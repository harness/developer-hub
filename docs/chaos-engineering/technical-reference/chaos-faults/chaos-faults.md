---
id: chaos-faults
title: Chaos faults
---

```mdx-code-block
<div style={{display: 'none'}}>
```

## Chaos faults

### Kubernetes

### VMware

### AWS

### GCP

### Azure

### Kube-Resilience

### Load

### Security-chaos

### Linux

```mdx-code-block
</div>
```

The fault execution is triggered when the chaos engine resource is created. Typically, the chaos engine is embedded within the **steps** of a chaos fault. However, you can also create the chaos engine manually, and the chaos operator reconciles this resource and triggers the fault execution.

Provided below are tables with links to the individual fault docs for easy navigation.

<!-- Custom component -->

import ChaosFaults from '@site/src/components/ChaosEngineering/ChaosFaults';
import { categories } from './categories'

<ChaosFaults categories={categories} />
