---
id: gcp
title: Chaos faults for GCP
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/gcp
---

<!-- Import statement for Custom Components -->

import FaultDetailsCard from "@site/src/components/ChaosEngineering/FaultDetailsCard";
import ExperimentListSection from "@site/src/components/ChaosEngineering/ExperimentListSection"
import { experiments } from "./experiments"

<!-- Heading Description -->

## Introduction

GCP faults disrupt the resources that run on a GCP cluster. Different faults disrupt various aspects of the GCP cluster, based on which GCP faults are categorized into different types.
Fault execution is triggered when the chaosengine resource is created. Chaosengines are embedded within the steps of a chaos fault, but you can also create the chaosengine manually, and the chaos operator reconciles this resource and triggers the fault execution.

<!-- Experiment List and Search Bar (every experiment added below, need to be added in this file also) -->

