---
title: ECS Blue-Green Traffic Shifting Step
description: ECS Blue-Green deployment strategy with native support for phased traffic shifting using ALB weighted target groups.
sidebar_position: 5
---

Harness now supports gradual traffic shifting during ECS Blue-Green deployments using [AWS Application Load Balancer (ALB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) weighted target groups. This enhancement enables you to progressively direct live traffic to a new ECS service version.

:::note
Currently, this feature is behind the feature flag `CDS_ECS_TRAFFIC_SHIFT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::


## Overview

Traditionally, ECS Blue-Green deployments in Harness used two listener rules—Stage and Prod listener rules. This setup lacked the flexibility to support multiple rules or test traffic on alternate listener rules before shifting production traffic. All validation was done on the Stage listener rule before traffic was swapped to Prod.


To solve this, you can now configure **traffic shifting** between target groups attached to the same listener rule, giving you the flexibility to:


- Use multiple target groups in a **single rule** with configurable traffic distribution across target groups.
- Test new versions incrementally in dev and then production environments.
- Perform gradual roll-outs with approval gates between steps.
- Revert traffic back to the original forward configuration in case of issues.


## Set up a ECS Blue-Green Traffic Shifting Step Group

1. Add an ECS stage to your pipeline.
2. Add a Harness ECS service in the stage Service. For more information, refer [Adding an ECS Service](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial#add-the-harness-service)
3. Add a Harness ECS environment and infrastructure in the stage Environment.  For more information, refer [Adding an ECS Environment](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial#define-the-infrastructure)
4. In the Execution strategies tab, select the **Blue Green** strategy and enable the checkbox **Add Traffic Shifting Steps** under the **Enable Traffic Shifting for ECS Deployment** section.


Your Execution tab now includes a Blue Green Deployment step group with the **ECS Blue Green Create Service step** and **ECS Blue-Green Traffic Shifting** step.

<div align="center">
  <DocImage path={require('./static/traffic-shifting-1.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

If you do not select the **Add Traffic Shifting Steps** checkbox, then you will have a Blue Green Deployment step group with steps **Configure Blue Green Deployment** and **ECS Blue Green Swap Target Groups**.

You can also use a blank canvas and manually add the **ECS Blue Green Create Service step** and **ECS Blue-Green Traffic Shifting** step to your stage.

:::info
You cannot have a **ECS Blue-Green Traffic Shifting** step and a **Configure Swap Target Groups** within the same stage as it uses the same configure step which is the **ECS Blue Green Create Service step**.
:::

### Configure the ECS Blue Green Create Service step.

<div align="center">
  <DocImage path={require('./static/traffic-shifting-2.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

- **Name** : Name of the step 
- **Timeout** : Execution timeout 
- **Elastic Load Balancer** : Select the AWS Load Balancer to use

Select the **Use Shift Traffic** checkbox to enable the ECS Blue-Green Traffic Shifting step. 

:::info
If this checkbox is not selected, the **ECS Blue-Green Traffic Shifting** step will not be available.
:::


In **Configure your Production Service**:

- **Prod Listener**: Select the ELB listener you want to use for production.
- **Prod Listener Rule ARN**: Select the listener rule that forwards traffic to the production and stage target groups.
- **Stage Target Group ARN**: Select the target group where the new service version will be deployed.

  The specified listener rule must reference exactly two target groups: one for the existing (production) service and one for the new (stage) service. This field identifies the stage target group in that rule.


- **Same as already running instances**: When selected, the new ECS service uses the same instances as the old service after deployment.

- **Update Green Service**: When selected, the green service will be updated instead of being deleted and re-created during deployment.

<details>
<summary>Yaml sample for the step</summary>

Yaml sample for the step

```yaml
- step:
    name: ECS Blue Green Create Service
    identifier: EcsBlueGreenCreateService
    type: EcsBlueGreenCreateService
    timeout: 15m
    spec:
      loadBalancer: ecs
      isTrafficShift: true
      sameAsAlreadyRunningInstances: false
      updateGreenService: true
      prodListener: <+input>
      prodListenerRuleArn: <+input>
      stageTargetGroupArn: <+runtime>
```
</details>

### Configure the ECS Blue-Green Traffic Shifting step

This step adjusts traffic weights between target groups.

<div align="center">
  <DocImage path={require('./static/traffic-shifting-3.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

**Step parameters**

- **Name** : Name of the step.
- **Timeout** : Execution timeout.

In the **Traffic Shifting** configuration, you have the option to either:

- **Inherit** the configuration from the previous ECS Blue-Green Create Service step using the **Inherit** checkbox, or  
- Select the **Standalone** checkbox to define a new configuration.

### Inherit

When **Inherit** is selected:

- Provide the **New ECS Weight**.
- Configuration such as Elastic Load Balancer, Listener, and Listener Rule ARN is inherited from the **ECS Blue Green Create Service** step.

The step adjusts traffic distribution between the **Stage Target Group** (where the new service version is deployed) and the **Prod Target Group** (where the existing version is running):

- Weight `50` → 50% traffic to Stage Target Group, 50% to Prod Target Group.
- Weight `70` → 70% to Stage Target Group, 30% to Prod Target Group.
- Weight `100` →  Suppose you provide the weight as `100`, the step will route `100%` traffic to the **Stage target group**.


The **Inherit** step updates blue and green tags only when 100% of the traffic is shifted to the Stage Target Group.  
In this case, the new service deployed is tagged as **BLUE**. For any lower weight, tagging does not occur.

<details>
<summary>Sample YAML</summary>

Sample YAML

```yaml
- step:
    name: Ecs Blue Green Traffic Shift
    identifier: EcsBlueGreenTrafficShift
    type: EcsBlueGreenTrafficShift
    timeout: 10m
    spec:
      ecsTrafficShiftWrapper:
        type: Inherit
        spec:
          weightPercentage: <+matrix.weight>
  ```
</details>

### Standalone

When the **Standalone** checkbox is selected:

- You can provide a new set of Elastic Load Balancer, Listener, and Listener Rule ARN values.
- This allows you to set the **forward configuration** for the specified listener rule, which defines how traffic is distributed across multiple target groups.
- A common use case is to validate the new service independently in lower environments by referencing the same target groups used in the production rule from the Blue-Green Create step.

:::warning
You must not reuse the same listener rule that is specified in the **ECS Blue Green Create Service** step. Doing so will result in a failure during execution.
:::

- **Elastic Load Balancer**: Click here and select the AWS load balancer to use.

Harness uses the delegate to locate the load balancers and list them in Elastic Load Balancer.
If you do not see your load balancer, ensure that the delegate can connect to ECS.

- **Listener**: Select the ELB listener to associate with this deployment.

- **Listener Rule ARN**: Choose the Listener Rule ARN that defines the routing of traffic to the appropriate target group.

In **Target Group Tuples**, specify:

- **Target Group ARN**: Select the target group to which traffic should be shifted.
- **Weight**: Specify the weight to be associated with the target group in the listener rule.

  For details on how weights work and supported values, refer to the [AWS ALB Listener Rule documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html).

You can provide one or more **Target Group Tuples**, and the forward configuration for the listener rule will be set accordingly based on the weights specified in each tuple.

:::info
If only one **Target Group Tuple** is provided, 100% of the traffic will be routed to the specified **Target Group ARN** for the listener rule.
:::

<details>
<summary>Sample YAML of the step group</summary>

Sample YAML

```yaml
stepGroup:
  name: Blue Green Deployment
  identifier: blueGreenDeployment
  steps:
    - step:
        name: ECS Blue Green Create Service
        identifier: EcsBlueGreenCreateService
        type: EcsBlueGreenCreateService
        timeout: 10m
        spec:
          loadBalancer: my-app-elb
          prodListener: arn:aws:elasticloadbalancing:region:account-id:listener/app/my-app/123456
          prodListenerRuleArn: arn:aws:elasticloadbalancing:region:account-id:listener-rule/app/my-app/123456/abc123
          isTrafficShift: true
          stageTargetGroupArn: arn:aws:elasticloadbalancing:region:account-id:targetgroup/stage-group/abcdef
    - step:
        name: Ecs Blue Green Traffic Shift
        identifier: EcsBlueGreenTrafficShift
        type: EcsBlueGreenTrafficShift
        timeout: 10m
        spec:
          ecsTrafficShiftWrapper:
            type: Standalone
            spec:
              loadBalancer: my-app-elb
              listener: arn:aws:elasticloadbalancing:region:account-id:listener/app/my-app/123456
              listenerRuleArn: arn:aws:elasticloadbalancing:region:account-id:listener-rule/app/my-app/123456/dev123
              forwardConfig:
                - targetGroupArn: arn:aws:elasticloadbalancing:region:account-id:targetgroup/stage-group/abcdef
                  weight: 70
                - targetGroupArn: arn:aws:elasticloadbalancing:region:account-id:targetgroup/prod-group/123456
                  weight: 30
  rollbackSteps:
    - step:
        name: ECS Blue Green Rollback
        identifier: EcsBlueGreenRollback
        type: EcsBlueGreenRollback
        timeout: 10m
        spec: {}
    - step:
        name: Stand Alone Traffic Shift Rollback
        identifier: StandAloneTrafficShiftRollback
        type: StandAloneTrafficShiftRollback
        timeout: 10m
        spec: {}
```
</details>

The **Standalone** step does not assign blue or green tags to the associated ECS services.

## Rollback Behavior

When you run the **ECS Blue Green Create Service** step, the system stores the initial configuration as **Prepare Rollback Data** before execution begins.

- In **Inherit mode**, if the step fails mid-execution, the rollback is handled by the **ECS Blue Green Rollback** step, which restores the traffic weights and blue/green tag assignments using the stored rollback data.

- In **Standalone mode**, during the first execution of each listener rule, the system captures the original forward configuration as part of the rollback data. If a failure occurs, the **Standalone Traffic Shift Rollback** step restores the original forward configuration for all affected listener rules.

In both cases, rollback steps ensure that traffic is routed back to the original setup in the event of a failure.

Rollback behavior depends on the mode used: 

<div align="center">
  <DocImage path={require('./static/traffic-shifting-4.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

- **Inherit Mode**: Restores the initial traffic weights using the **ECS BG Rollback** step.

<div align="center">
  <DocImage path={require('./static/traffic-shifting-5.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

- **Standalone Mode**: Resets the original forward configuration for all listener rules used in the stage using the **Standalone Traffic Shift Rollback** step.

<div align="center">
  <DocImage path={require('./static/traffic-shifting-6.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

In both cases, the original forward configuration is restored in the event of a failure or rollback trigger, using the appropriate rollback step for each mode.

## Comparison: Traditional Blue-Green vs. Traffic Shifting

### Traditional Blue-Green Deployment (Pre-Traffic Shifting)

- Requires two separate listener rules (typically configured on different ports)
- New version is deployed to the Stage target group associated with a different listener rule (commonly mapped to a separate port)
- After manual/automated validation, a Swap Target Groups step is used to direct 100% traffic to the new version
- You cannot test the new version on live production traffic until after the swap
- Swap is atomic—no gradual rollout or partial traffic shift

### Blue-Green Deployment with Traffic Shifting (New Flow)

- Uses a single listener rule with weighted target groups
- New version is deployed to a target group under the same listener rule as the old version
- Allows progressive traffic rollout (e.g., 10% → 50% → 100%) using ECS Traffic Shift step
- Eliminates need for separate ports or manual AWS CLI scripts
- Enables staged rollout with approval gates, monitoring, and rollback safety
- No Swap step needed—transition to full traffic is handled by adjusting target group weights

Note: This new traffic-shifting approach makes Blue-Green deployments safer, more controlled, and production-traffic-aware.

## General Solution Pattern for Traffic Shifting

For customers who want to implement progressive traffic shifting (e.g., 10% → 30% → 100%) across environments:

- Attach two target groups to a single ALB **listener rule** designated as the production rule.
- Create a separate **listener rule** for the dev environment that uses the same two target groups.
- In the **ECS Blue Green Create Service** step, specify the **production listener rule**.
- In lower environments, shift traffic to the stage target group using the **Standalone Traffic Shift** step with the dev listener rule.
- In production, use **Inherit mode** to gradually increase traffic to the new service version via the stage target group.
- Use **ECS Traffic Shift** steps to adjust traffic incrementally (e.g., 10%, 50%, 100%) with optional approval gates between shifts.
- Finalize with a full cut-over to the stage target group, which is tagged as **BLUE** when traffic reaches 100%.

## Limitations

- For supported target group weights and configuration options, refer to the [AWS ALB Listener Rules documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html).
- Maximum of 5 target groups per rule (AWS limitation).
- **Swap** step and **Auto Scaling during swap** are not supported.

## Example Use Case: Controlled Traffic Shifting Across Environments

You can use ECS traffic shifting to gradually roll out and validate a new version of your service across different environments before promoting it to production:

1. 1. Deploy the new version of the service once and attach it to the **Stage Target Group**.
2. Keep the **prod target group** mapped to the existing (old) service.
3. In lower environments, incrementally shift traffic to the new service version and validate using **CV (Continuous Verification)**, **approval steps**, or **custom scripts**.
4. Once validated, deploy the new version in the production environment and mark the new service as the **blue** version.

## Example Use Case: Step-by-Step Flow for Gradual Traffic Shifting

This example outlines the basic flow you can follow when implementing ECS Blue-Green deployments with traffic shifting:

1. Add the **ECS Blue-Green Create Service** step with `isTrafficShift: true` and provide the `stageTargetGroupArn`.
2. Add an **ECS Traffic Shift** step (inherit or standalone) to begin shifting traffic incrementally.
3. **(Optional)** Add an **approval step** to control progression between shifts.
4. Repeat the **ECS Traffic Shift** steps to gradually increase traffic to 100%.

## Sample pipeline YAML for Inherit traffic shifting step

Below is a ready-to-use pipeline YAML that demonstrates how to configure the **Inherit traffic shifting mode** in an ECS Blue-Green deployment.

<details>
<summary>Sample pipeline YAML</summary>

```yaml
pipeline:
  name: ecs-bluegreen-inherit-example
  identifier: ecs_bluegreen_inherit_example
  projectIdentifier: demo_project
  orgIdentifier: demo_org
  tags: {}
  delegateSelectors:
    - my-delegate
  stages:
    - stage:
        name: ecs-inherit-stage
        identifier: ecs_inherit_stage
        type: Deployment
        spec:
          deploymentType: ECS
          service:
            serviceRef: <+input>
            serviceInputs: <+input>
          environment:
            environmentRef: <+input>
            deployToAll: false
            environmentInputs: <+input>
            serviceOverrideInputs: <+input>
            infrastructureDefinitions: <+input>
          execution:
            steps:
              - stepGroup:
                  name: Blue Green Deployment
                  identifier: blueGreenDeployment
                  steps:
                    - step:
                        name: ECS Blue Green Create Service
                        identifier: EcsBlueGreenCreateService
                        type: EcsBlueGreenCreateService
                        timeout: 10m
                        spec:
                          loadBalancer: <+input>
                          prodListener: <+input>
                          prodListenerRuleArn: <+input>
                          isTrafficShift: true
                          stageTargetGroupArn: <+input>
                    - step:
                        name: ECS Blue Green Traffic Shift
                        identifier: EcsBlueGreenTrafficShift
                        type: EcsBlueGreenTrafficShift
                        timeout: 10m
                        spec:
                          ecsTrafficShiftWrapper:
                            type: Inherit
                            spec:
                              weightPercentage: 70
          rollbackSteps:
            - step:
                name: ECS Blue Green Rollback
                identifier: EcsBlueGreenRollback
                type: EcsBlueGreenRollback
                timeout: 10m
                spec: {}
            - step:
                name: Standalone Traffic Shift Rollback
                identifier: StandAloneTrafficShiftRollback
                type: StandAloneTrafficShiftRollback
                timeout: 10m
                spec: {}
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
```

</details>

## Sample pipeline YAML for Standalone traffic shifting step

Below is a ready-to-use pipeline YAML that demonstrates how to configure the **Standalone traffic shifting mode** in an ECS Blue-Green deployment.

<details>
<summary>Sample pipeline YAML</summary>

```yaml
pipeline:
  name: ecs-bluegreen-sample
  identifier: ecs_bluegreen_sample
  projectIdentifier: demo_project
  orgIdentifier: demo_org
  tags: {}
  stages:
    - stage:
        name: ecs-traffic-shifting
        identifier: ecstrafficshifting
        description: ""
        type: Deployment
        spec:
          deploymentType: ECS
          service:
            serviceRef: <+input>
            serviceInputs: <+input>
          environment:
            environmentRef: <+input>
            deployToAll: false
            environmentInputs: <+input>
            serviceOverrideInputs: <+input>
            infrastructureDefinitions: <+input>
          execution:
            steps:
              - stepGroup:
                  name: Blue Green Deployment
                  identifier: blueGreenDeployment
                  steps:
                    - step:
                        name: ECS Blue Green Create Service
                        identifier: EcsBlueGreenCreateService
                        type: EcsBlueGreenCreateService
                        timeout: 10m
                        spec:
                          loadBalancer: <+input>
                          prodListener: <+input>
                          prodListenerRuleArn: <+input>
                          isTrafficShift: true
                          stageTargetGroupArn: <+input>
                    - step:
                        name: Ecs Blue Green Traffic Shift
                        identifier: EcsBlueGreenTrafficShift
                        type: EcsBlueGreenTrafficShift
                        timeout: 10m
                        spec:
                          ecsTrafficShiftWrapper:
                            type: Standalone
                            spec:
                              loadBalancer: <+input>
                              listener: <+input>
                              listenerRuleArn: <+input>
                              forwardConfig:
                                - targetGroupArn: <+stage.variables.stageTargetGroup>
                                  weight: 70
                                - targetGroupArn: <+stage.variables.prodTargetGroup>
                                  weight: 30
            rollbackSteps:
              - step:
                  name: ECS Blue Green Rollback
                  identifier: EcsBlueGreenRollback
                  type: EcsBlueGreenRollback
                  timeout: 10m
                  spec: {}
              - step:
                  name: Stand Alone Traffic Shift Rollback
                  identifier: StandAloneTrafficShiftRollback
                  type: StandAloneTrafficShiftRollback
                  timeout: 10m
                  spec: {}
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
  delegateSelectors:
    - harness-dev
```

</details>
