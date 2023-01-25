---
id: kube-resilience
title: Chaos faults for Kube resilience
---

Kubelet density determines the resilience of the kubelet by creating pods on a specific node. It helps determine how resilient an application is to the unplanned scaling of K8s pods.

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="kube-resilience">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### Kubelet density

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->
- Kubelet density determines the resilience of the kubelet by creating pods on a specific node.
- It also helps determine the performance of the kubelet for a specific node.

<!-- <accordion color='green'/> has same usage as details but green in color -->

<accordion color="green">
    <summary>Fault usage</summary>
    This fault helps determine how resilient an application is to the unplanned scaling of K8s pods.
</accordion>

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->
