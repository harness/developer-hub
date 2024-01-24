---
title: Validate hypotheses using probes
sidebar_position: 3
description: Steps to validate a hypothesis using probes
---

This section describes the steps to validate a hypthesis using resilience probes.

### Before you begin

* [Probe overview](./overview.md)
* [Configure and add a probe](./configure-and-add-probes.md)
* [Chaos faults](/docs/chaos-engineering/technical-reference/chaos-faults/chaos-faults.md)

### Step 1. Add a probe
To add a probe for a fault while constructing an experiment, once you add a fault to the experiment you'll be prompted to configure it. You can simply switch to the **Probes** tab to access the list of probes for the fault. By default, most of the experiments will have a default target application health check.

![Probe List](./static/validate-hypothesis-using-probes/probe-list.png)

### Step 2. Deploy a probe
Select **Deploy new Probe** to add a new probe. Next, you will need to specify the name, type, and mode of the probe.Select **Continue**. Then specify the probe properties. Select **Continue**. Finally, specify the probe specific details and select **Setup the Probe** to add the probe. 

![New Probe Overview](./static/validate-hypothesis-using-probes/new-probe-overview.png)
