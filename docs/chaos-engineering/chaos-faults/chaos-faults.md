---
id: chaos-faults
title: Chaos Faults
---

The fault execution is triggered when the chaosengine resource (various examples of which are provided under the respective faults) is created. Typically, these chaosengines are embedded within the 'steps' of a chaos fault. However, you can also create the chaosengine manually, and the chaos-operator reconciles this resource and triggers the fault execution.

Provided below are tables with links to the individual fault docs for easy navigation.

<!-- Custom component -->

import ChaosFaults from '@site/src/components/ChaosEngineering/ChaosFaults';

<ChaosFaults />
