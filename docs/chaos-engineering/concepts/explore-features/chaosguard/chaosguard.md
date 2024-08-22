---
id: chaosguard
title: ChaosGuard
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry
---

<!-- Import statement for Custom Components -->

import FeatureDetailsCard from "@site/src/components/ChaosEngineering/FeatureDetailsCard";
import FeatureListSection from "@site/src/components/ChaosEngineering/FeatureListSection"
import { features } from "./features"

<!-- Heading Description -->
## Introduction

Cloud Foundry faults disrupt the functioning of Cloud Foundry resources. This deteriorates the performance of the app for the duration of the chaos experiment.

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection features={features} />

<FaultDetailsCard category="chaosguard">

### CF app container kill

CF app container kill causes a Cloud Foundry app instance container to be killed and restarted.

- Checks resilience upon app instance crash due to container unavailability.
- Validates the effectiveness of disaster recovery and high availability of the app.

<accordion color="green">
<summary>Use cases</summary>

- Checks resilience upon app instance crash due to container unavailability.
- Validates the effectiveness of disaster recovery and high availability of the app.

</accordion>

</FaultDetailsCard>