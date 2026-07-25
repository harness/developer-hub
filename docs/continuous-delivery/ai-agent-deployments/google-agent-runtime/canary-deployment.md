---
title: Canary deployment
sidebar_label: Canary Deployment
description: Build a Harness pipeline that deploys an agent service to Google Agent Runtime with a canary strategy.
sidebar_position: 4
keywords:
  - deploy ai agent
  - agent pipeline
  - canary agent deployment
  - google agent runtime traffic shift
tags:
  - continuous-delivery
  - ai-agents
  - agent-deployments
---

import DocImage from '@site/src/components/DocImage';
import DeployStep from './step-reference/deploy-step.md';
import TrafficShiftStep from './step-reference/traffic-shift-step.md';

The pipeline execution defines how Harness rolls out a new agent revision. For Google Agent Runtime, Harness deploys the new revision, then shifts traffic to it in stages so you can validate the new version before it takes all traffic. This page shows you how to configure the canary execution on the pipeline stage.

:::note

Agent deployments are behind the feature flag `CDS_AGENT_RUNTIME_DEPLOYMENT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

You need a registered [agent service](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/agent-service) and an [environment](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/environment) with a Google Agent Runtime infrastructure definition. For all prerequisites, go to [Before you begin](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/overview#before-you-begin) on the overview.

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
  <DocImage path={require('./static/canary-default-google.png')} width="50%" height="50%" alt="Execution tab showing the default canary with a deploy step and a single traffic shift step" title="Click to view full size" />
</div>

<DeployStep />

<TrafficShiftStep />

### Rollback step

The rollback step reverts traffic to the previous revision. Harness adds it to the stage rollback steps so it runs when a deploy or traffic shift step fails.

The step type is `RollbackGoogleAgentRuntimeRevision` and the **Image** is `harness/google-agent-runtime-plugin:1.0.0-linux-amd64`.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/execution-rollback-google.png')} width="50%" height="50%" alt="Rollback view showing the rollback step in the stage rollback steps" title="Click to view full size" />
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
            serviceRef: Google_Weather_Agent
          environment:
            environmentRef: Google_Agent_Platform
            deployToAll: false
            infrastructureDefinitions:
              - identifier: GoogleAgentPlatform
          execution:
            steps:
              - stepGroup:
                  steps:
                    - step:
                        type: DeployGoogleAgentRuntimeRevision
                        name: Deploy Google Agent Runtime Revision
                        identifier: Deploy_Google_Agent_Runtime_Revision
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/google-agent-runtime-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          waitReady: true
                    - step:
                        type: ShiftGoogleAgentRuntimeTraffic
                        name: Shift Google Agent Runtime Traffic
                        identifier: Shift_Google_Agent_Runtime_Traffic
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/google-agent-runtime-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          target:
                            revisionId: <+steps.Deploy_Google_Agent_Runtime_Revision.agentDeployment.revisionId>
                          weight: 100
                  name: Google Agent Runtime Step Group
                  identifier: Google_Agent_Runtime_Step_Group
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
                  name: Google Agent Runtime Rollback Step Group
                  identifier: Google_Agent_Runtime_Rollback_Step_Group
                  steps:
                    - step:
                        type: RollbackGoogleAgentRuntimeRevision
                        name: Rollback Google Agent Runtime Revision
                        identifier: Rollback_Google_Agent_Runtime_Revision
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/google-agent-runtime-plugin:1.0.0-linux-amd64
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
  identifier: Sample_Google_Agent_Runtime_Deployment
  name: Sample Google Agent Runtime Deployment
```

</details>

---

## Add staged traffic shifts

To roll out more gradually, add more traffic shift steps between the deploy step and the final 100 percent shift. Each step routes an increasing percentage of traffic to the new revision, for example 10 percent, 25 percent, 50 percent, and 100 percent. Between the shifts, you can add smoke tests, evals, approval gates, or release gates to validate each stage before more traffic moves to the new revision.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/execution-canary-google.png')} width="50%" height="50%" alt="Execution tab showing the deploy step followed by 10, 25, 50, and 100 percent traffic shift steps" title="Click to view full size" />
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
        name: Deploy
        identifier: Deploy
        description: ""
        type: Deployment
        spec:
          deploymentType: AiAgent
          service:
            serviceRef: Google_Weather_Agent
          environment:
            environmentRef: Google_Agent_Platform
            deployToAll: false
            infrastructureDefinitions:
              - identifier: GoogleAgentPlatform
          execution:
            steps:
              - stepGroup:
                  name: Google Agent Runtime Step Group
                  identifier: Google_Agent_Runtime_Step_Group
                  steps:
                    - step:
                        type: DeployGoogleAgentRuntimeRevision
                        name: Deploy Google Agent Runtime Revision
                        identifier: Deploy_Google_Agent_Runtime_Revision
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/google-agent-runtime-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          waitReady: true
                        timeout: 10m
                    - step:
                        type: ShiftGoogleAgentRuntimeTraffic
                        name: 10 percent Shift
                        identifier: ShiftGoogleAgentRuntimeTraffic_10
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/google-agent-runtime-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          target:
                            revisionId: <+steps.Deploy_Google_Agent_Runtime_Revision.agentDeployment.revisionId>
                          weight: 10
                        timeout: 10m
                    - step:
                        type: ShiftGoogleAgentRuntimeTraffic
                        name: 25 percent Shift
                        identifier: ShiftGoogleAgentRuntimeTraffic_25
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/google-agent-runtime-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          target:
                            revisionId: <+steps.Deploy_Google_Agent_Runtime_Revision.agentDeployment.revisionId>
                          weight: 25
                        timeout: 10m
                    - step:
                        type: ShiftGoogleAgentRuntimeTraffic
                        name: 50 percent Shift
                        identifier: ShiftGoogleAgentRuntimeTraffic_50
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/google-agent-runtime-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          target:
                            revisionId: <+steps.Deploy_Google_Agent_Runtime_Revision.agentDeployment.revisionId>
                          weight: 50
                        timeout: 10m
                    - step:
                        type: ShiftGoogleAgentRuntimeTraffic
                        name: 100 percent Shift
                        identifier: ShiftGoogleAgentRuntimeTraffic_100
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/google-agent-runtime-plugin:1.0.0-linux-amd64
                          imagePullPolicy: Always
                          target:
                            revisionId: <+steps.Deploy_Google_Agent_Runtime_Revision.agentDeployment.revisionId>
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
                  name: Google Agent Runtime Rollback Step Group
                  identifier: Google_Agent_Runtime_Rollback_Step_Group
                  steps:
                    - step:
                        type: RollbackGoogleAgentRuntimeRevision
                        name: Rollback Google Agent Runtime Revision
                        identifier: Rollback_Google_Agent_Runtime_Revision
                        spec:
                          connectorRef: account.harness_image_registry
                          image: harness/google-agent-runtime-plugin:1.0.0-linux-amd64
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
  identifier: Sample_Google_Agent_Runtime_Staged_Canary
  name: Sample Google Agent Runtime Staged Canary
```

</details>

---

## Run and monitor the deployment

Run the pipeline to deploy the agent. After the pipeline runs, open the agent service to review the deployment. The **Summary** tab lists every deployment that references the agent service, with its status and start time, and the **Configuration** tab shows the platform configuration, which you can edit.

{/* IMAGE PLACEHOLDER: Agent service Summary with the Deployments list showing pipeline executions (agent-service-deployments.png) */}

Because the agent is a Harness deployment, approvals, OPA policies, and RBAC apply the same way they do for any other stage.

---

## Next steps

You have deployed an agent service to Google Agent Runtime with a canary strategy. You can now add approvals and policies to the stage, or configure additional environments.

- [Step reference](/docs/continuous-delivery/ai-agent-deployments/google-agent-runtime/step-reference/deploy-step): Review the deploy and traffic-shift step parameters in detail.
- [Deploy to AWS Agent Core](/docs/continuous-delivery/ai-agent-deployments/aws-agent-core/overview): Deploy an agent to Amazon Bedrock AgentCore instead.
