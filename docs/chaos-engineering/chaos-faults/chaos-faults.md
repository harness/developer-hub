---
id: chaos-faults
title: Chaos Faults
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

```mdx-code-block
</div>
```

The fault execution is triggered when the chaos engine resource (various examples are provided under the respective faults) is created. Typically, the chaosengine is embedded within the **steps** of a chaos fault. However, you can also create the chaosengine manually, and the chaos operator reconciles this resource and triggers the fault execution.

Provided below are tables with links to the individual fault docs for easy navigation.

<!-- Custom component -->

import ChaosFaults from '@site/src/components/ChaosEngineering/ChaosFaults';
import { categories } from './categories'

<ChaosFaults categories={categories} />
