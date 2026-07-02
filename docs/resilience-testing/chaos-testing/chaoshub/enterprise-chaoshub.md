---
title: Enterprise ChaosHub
sidebar_label: Enterprise ChaosHub
sidebar_position: 1
description: Explore the fault, probe, and action templates that ship with the default Enterprise ChaosHub
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EnterpriseHubExplorer from '@site/src/components/ChaosEngineering/EnterpriseHubExplorer';
import { faultTemplateDrill, probeTemplateDrill, actionTemplateDrill } from './enterprise-templates';

The **Enterprise ChaosHub** is the default ChaosHub that Harness provides at the account level. It comes pre-built with a wide catalog of ready-to-use chaos building blocks, so you can start running experiments immediately without authoring anything yourself.

It ships with three kinds of reusable templates:

- **Fault templates**: pre-built faults organized by target platform, such as Kubernetes, AWS, GCP, and Azure.
- **Probe templates**: ready-to-use validation checks for common health and status scenarios.
- **Action templates**: reusable operations, such as custom scripts, that run during an experiment.

Use the tabs below to explore each category. Select a category card to see the templates it contains, then select any template to open its full documentation.

<Tabs groupId="enterprise-templates">
<TabItem value="fault-templates" label="Fault Templates" default>

Pre-built fault templates grouped by target platform. Select a platform to browse its faults.

<EnterpriseHubExplorer categories={faultTemplateDrill} />

</TabItem>
<TabItem value="probe-templates" label="Probe Templates">

Built-in probe templates grouped by platform. Select a platform to browse its probe templates.

<EnterpriseHubExplorer categories={probeTemplateDrill} />

</TabItem>
<TabItem value="action-templates" label="Action Templates">

Built-in action templates grouped by type. Select a type to browse its action templates.

<EnterpriseHubExplorer categories={actionTemplateDrill} />

</TabItem>
</Tabs>
