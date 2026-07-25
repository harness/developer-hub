---
title: Traffic shift step
sidebar_label: Traffic Shift Step
description: Reference for the Shift Google Agent Runtime Traffic step.
sidebar_position: 2
keywords:
  - shift google agent runtime traffic
  - agent traffic shift step
tags:
  - continuous-delivery
  - ai-agents
  - agent-deployments
---

import DocImage from '@site/src/components/DocImage';

## Traffic shift step

The traffic shift step routes a percentage of traffic to the revision produced by the deploy step. Add a step for each stage of the canary, for example 10 percent, 25 percent, 50 percent, and 100 percent.

The step type is `ShiftGoogleAgentRuntimeTraffic`. Configure the following fields:

- **Container Registry:** A Harness connector for the registry that hosts the plugin image.
- **Image:** The traffic shift plugin image, `harness/google-agent-runtime-plugin:1.0.0-linux-amd64`.
- **Target Revision ID:** The revision produced by the deploy step, `<+steps.DeployGoogleAgentRuntimeRevision.agentDeployment.revisionId>`.
- **Weight (%):** The percentage of traffic to route to the target revision for this shift.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/step-shift-google.png')} width="50%" height="50%" alt="Shift Google Agent Runtime Traffic step parameters showing image, target revision ID, and weight" title="Click to view full size" />
</div>
