---
title: Canary deployment
sidebar_label: Canary Deployment
description: Build a Harness pipeline that deploys an agent service to AWS Agent Core with a canary strategy.
sidebar_position: 4
keywords:
  - deploy ai agent
  - agent pipeline
  - canary agent deployment
  - aws agent core traffic shift
tags:
  - continuous-delivery
  - ai-agents
  - agent-deployments
---

import DocImage from '@site/src/components/DocImage';
import DeployStep from './step-reference/deploy-step.md';
import TrafficShiftStep from './step-reference/traffic-shift-step.md';

The pipeline execution defines how Harness rolls out a new agent revision. For AWS Agent Core, Harness deploys the new revision, then shifts traffic to it in stages so you can validate the new version before it takes all traffic. This page shows you how to configure the canary execution on the pipeline stage.

:::note

Agent deployments are behind the feature flag `CDS_AGENT_RUNTIME_DEPLOYMENT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

You need a registered [agent service](/docs/continuous-delivery/ai-agent-deployments/aws-agent-core/agent-service) and an [environment](/docs/continuous-delivery/ai-agent-deployments/aws-agent-core/environment) with an AWS Agent Core infrastructure definition. For all prerequisites, go to [Before you begin](/docs/continuous-delivery/ai-agent-deployments/aws-agent-core/overview#before-you-begin) on the overview.

---

## Select the execution strategy

On the **Execution** tab of the stage, select the execution strategy. Select **Canary** to scaffold the deploy and traffic shift steps, or select **Blank Canvas** to build the execution from an empty step group.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/execution-strategies.png')} width="50%" height="50%" alt="Execution Strategies selection showing Canary and Blank Canvas options" title="Click to view full size" />
</div>

:::info

Canary is the only execution strategy for agent deployments in this release. Support for more deployment strategies is planned.

:::

---

## Default canary steps

When you select the **Canary** strategy, Harness adds a step group with two steps: a deploy step and a single traffic shift step that routes 100 percent of traffic to the new revision. Harness also adds a rollback step group with the rollback step.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/canary-default-aws.png')} width="50%" height="50%" alt="Execution tab showing the default canary with a deploy step and a single traffic shift step" title="Click to view full size" />
</div>

<DeployStep />

<TrafficShiftStep />

### Rollback step

The rollback step reverts traffic to the previous revision. Harness adds it to the stage rollback steps so it runs when a deploy or traffic shift step fails.

The step type is `RollbackAwsAgentCoreRevision` and the **Image** is `harness/aws-agentcore-plugin:1.0.0-linux-amd64`.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/execution-rollback-aws.png')} width="50%" height="50%" alt="Rollback view showing the rollback step in the stage rollback steps" title="Click to view full size" />
</div>

<details>
<summary>Default canary pipeline YAML</summary>

```yaml
pipeline:
  projectIdentifier: Demo
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: AI Agent
        identifier: AI_Agent
        description: ""
        type: Deployment
        spec:
          deploymentType: AiAgent
          service:
            serviceRef: AWSExampleAgent
          environment:
            environmentRef: Aws_Agent_Core
            deployToAll: false
            infrastructureDefinitions:
              - identifier: Agent_Core_CD_Play
          execution:
            steps:
              - stepGroup:
                  steps:
                    - step:
                        type: DeployAwsAgentCoreRevision
                        name: Deploy Aws Agent Core Revision
                        identifier: Deploy_Aws_Agent_Core_Revision
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/aws-agentcore-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          waitReady: true
                    - step:
                        type: ShiftAwsAgentCoreTraffic
                        name: Shift Aws Agent Core Traffic
                        identifier: Shift_Aws_Agent_Core_Traffic
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/aws-agentcore-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          target:
                            revisionId: <+steps.Deploy_Aws_Agent_Core_Revision.agentDeployment.revisionId>
                          weight: 100
                  name: Aws Agent Core Step Group
                  identifier: Aws_Agent_Core_Step_Group
                  sharedPaths:
                    - /var/run
                    - /var/lib/docker
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: <+input>
                      namespace: default
            rollbackSteps:
              - stepGroup:
                  name: Aws Agent Core Rollback Step Group
                  identifier: Aws_Agent_Core_Rollback_Step_Group
                  steps:
                    - step:
                        type: RollbackAwsAgentCoreRevision
                        name: Rollback Aws Agent Core Revision
                        identifier: Rollback_Aws_Agent_Core_Revision
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/aws-agentcore-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                  sharedPaths:
                    - /var/run
                    - /var/lib/docker
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: <+input>
                      namespace: default
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
  identifier: Sample_AWS_Agent_Core_Deployment
  name: Sample AWS Agent Core Deployment
```

</details>

---

## Add staged traffic shifts

To roll out more gradually, add more traffic shift steps between the deploy step and the final 100 percent shift. Each step routes an increasing percentage of traffic to the new revision, for example 10 percent, 25 percent, 50 percent, and 100 percent. Between the shifts, you can add smoke tests, evals, approval gates, or release gates to validate each stage before more traffic moves to the new revision.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/execution-canary-aws.png')} width="50%" height="50%" alt="Execution tab showing the deploy step followed by 10, 25, 50, and 100 percent traffic shift steps" title="Click to view full size" />
</div>

<details>
<summary>Staged canary pipeline YAML</summary>

```yaml
pipeline:
  projectIdentifier: Demo
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: deploy
        identifier: deploy
        description: ""
        type: Deployment
        spec:
          deploymentType: AiAgent
          service:
            serviceRef: AWSExampleAgent
          environment:
            environmentRef: Aws_Agent_Core
            deployToAll: false
            infrastructureDefinitions:
              - identifier: Agent_Core_CD_Play
          execution:
            steps:
              - stepGroup:
                  name: Aws Agent Core Step Group
                  identifier: Aws_Agent_Core_Step_Group
                  steps:
                    - step:
                        type: DeployAwsAgentCoreRevision
                        name: Deploy Aws Agent Core Revision
                        identifier: Deploy_Aws_Agent_Core_Revision
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/aws-agentcore-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          waitReady: true
                        timeout: 10m
                    - step:
                        type: ShiftAwsAgentCoreTraffic
                        name: 10 percent Shift
                        identifier: Shift_Aws_Agent_Core_Traffic_10
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/aws-agentcore-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          target:
                            revisionId: <+steps.Deploy_Aws_Agent_Core_Revision.agentDeployment.revisionId>
                          weight: 10
                        timeout: 10m
                    - step:
                        type: ShiftAwsAgentCoreTraffic
                        name: 25 percent Shift
                        identifier: Shift_Aws_Agent_Core_Traffic_25
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/aws-agentcore-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          target:
                            revisionId: <+steps.Deploy_Aws_Agent_Core_Revision.agentDeployment.revisionId>
                          weight: 25
                        timeout: 10m
                    - step:
                        type: ShiftAwsAgentCoreTraffic
                        name: 50 percent Shift
                        identifier: Shift_Aws_Agent_Core_Traffic_50
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/aws-agentcore-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          target:
                            revisionId: <+steps.Deploy_Aws_Agent_Core_Revision.agentDeployment.revisionId>
                          weight: 50
                        timeout: 10m
                    - step:
                        type: ShiftAwsAgentCoreTraffic
                        name: 100 percent Shift
                        identifier: Shift_Aws_Agent_Core_Traffic_100
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/aws-agentcore-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          target:
                            revisionId: <+steps.Deploy_Aws_Agent_Core_Revision.agentDeployment.revisionId>
                          weight: 100
                        timeout: 10m
                  sharedPaths:
                    - /var/run
                    - /var/lib/docker
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: <+input>
                      namespace: default
            rollbackSteps:
              - stepGroup:
                  name: Aws Agent Core Rollback Step Group
                  identifier: Aws_Agent_Core_Rollback_Step_Group
                  steps:
                    - step:
                        type: RollbackAwsAgentCoreRevision
                        name: Rollback Aws Agent Core Revision
                        identifier: Rollback_Aws_Agent_Core_Revision
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/aws-agentcore-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                  sharedPaths:
                    - /var/run
                    - /var/lib/docker
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: <+input>
                      namespace: default
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
  identifier: Sample_AWS_Agent_Core_Staged_Canary
  name: Sample AWS Agent Core Staged Canary
```

</details>

---

## Run and monitor the deployment

Run the pipeline to deploy the agent. After the pipeline runs, open the agent service to review the deployment. The **Summary** tab lists every deployment that references the agent service, with its status and start time, and the **Configuration** tab shows the platform configuration, which you can edit.

{/* IMAGE PLACEHOLDER: Agent service Summary with the Deployments list showing pipeline executions (agent-service-deployments.png) */}

Because the agent is a Harness deployment, approvals, OPA policies, and RBAC apply the same way they do for any other stage.

---

## Next steps

You have deployed an agent service to AWS Agent Core with a canary strategy. You can now add approvals and policies to the stage, or configure additional environments.

- [Step reference](/docs/continuous-delivery/ai-agent-deployments/aws-agent-core/step-reference/deploy-step): Review the deploy and traffic-shift step parameters in detail.
- [Deploy to Google Agent Runtime](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/overview): Deploy an agent to Vertex Agent Runtime instead.
