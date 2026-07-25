---
title: Deploy step
sidebar_label: Deploy Step
description: Reference for the Deploy AWS Agent Core Revision step.
sidebar_position: 1
keywords:
  - deploy aws agent core revision
  - agent deploy step
tags:
  - continuous-delivery
  - ai-agents
  - agent-deployments
---

import DocImage from '@site/src/components/DocImage';

## Deploy step

The deploy step creates a deployment for the agent on AWS Agent Core. On the first deployment for an agent, it creates the deployment. When a deployment already exists, it creates a new revision under the same deployment. The step publishes the new revision id as output that the traffic shift steps read.

The step type is `DeployAwsAgentCoreRevision`. Configure the following fields:

- **Container Registry:** A Harness connector for the registry that hosts the plugin image.
- **Image:** The deploy plugin image, `harness/aws-agentcore-plugin:1.0.0-linux-amd64`.
- **Wait for the revision to be ready:** Enable this so the pipeline waits until the revision is ready before it continues.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/step-deploy-aws.png')} width="50%" height="50%" alt="Deploy AWS Agent Core Revision step parameters showing timeout, container registry, image, and wait for revision ready" title="Click to view full size" />
</div>
