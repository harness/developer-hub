---
id: byoc
title: Bring Your Own Custom Chaos Faults
redirect_from:
    - /docs/chaos-engineering/chaos-faults/byoc/byoc-injector
---

## Introduction

BYOC (Bring Your Own Chaos) is a feature in HCE that allows users to create custom chaos experiments. This feature enables users to define their own chaos experiments and execute them using the HCE platform. The BYOC feature is designed to be flexible and easy to use, allowing users to define their own chaos experiments using a simple YAML specification.

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

<ExperimentListSection experiments={experiments} />

<!-- Code for Fault Card starts from here -->

<FaultDetailsCard category="byoc">

<!-- please specify category in above tag to generate correct experiment icons and links by itself, if links are broken please contact @Sahil, that's me -->

### BYOC Injector

<!-- Need above heading in markdown ### for it to populate right navigation bar and generate links -->

BYOC injector provides a way to execute custom chaos faults.

<!-- <Accordion color='green'/> has same usage as details but green in color -->

<Accordion color="green">
<summary>Use cases </summary>
- Validates the resilience of an application by introducing custom faults in critical service dependencies and observing the impact on overall system functionality.
- Injects custom faults to simulate disaster scenarios, ensuring that the application's disaster recovery procedures are effective and efficient.
- Implements custom faults to verify that the system meets compliance and regulatory requirements under adverse conditions, such as data corruption or service outages.
</Accordion>

</FaultDetailsCard>

<!-- Code for Fault Card ends here -->
