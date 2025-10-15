---
title: Setup
description: Learn how to set up assignment and metric sources to run FME experiments in your data warehouse using Warehouse Native.
sidebar_label: Setup
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<CTABanner
  buttonText="Request Access"
  title="Warehouse Native is in beta!"
  tagline="Get early access to run Harness FME experiments directly in your data warehouse."
  link="https://developer.harness.io/docs/feature-management-experimentation/fme-support"
  closable={true}
  target="_self"
/>

## Overview

To start using Warehouse Native Experimentation:

1. [Connect Harness FME](/docs/feature-management-experimentation/integrations) to your data warehouse.
1. Prepare your [assignment](/docs/feature-management-experimentation/warehouse-native/setup/assignment-sources) and [metric source tables](/docs/feature-management-experimentation/warehouse-native/setup/metric-sources) in your data warehouse.
1. Configure your [assignment and metric sources](/docs/feature-management-experimentation/warehouse-native/setup) in Harness FME.
1. Define your [metrics](/docs/feature-management-experimentation/warehouse-native/metrics/) and [create experiments](/docs/feature-management-experimentation/warehouse-native/setup/experiments) in Harness FME.

Once you've created metric definitions and started running experiments in your data warehouse, you can access analyses in Harness FME. 

* An **assignment source** defines how Harness FME should read impression/exposure events from your data warehouse and map them to experiments. It ensures that users are correctly assigned to treatments, environments, and traffic types, enabling accurate metric analysis across experiments.
* A **metric source** defines how Harness FME reads and interprets raw event data from your warehouse. It ensures that metric events are correctly captured, timestamped, scoped to environments and traffic types, and made available for metric definitions.