---
title: ECS Blue-Green Traffic shifting
description: ECS Blue-Green Traffic shifting
sidebar_position: 5
---

Harness now supports gradual traffic shifting during ECS Blue-Green deployments using [AWS Application Load Balancer (ALB)](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) weighted target groups. This enhancement enables you to progressively direct live traffic to a new ECS service version.

:::note
Currently, this feature is behind the feature flag `CDS_ECS_TRAFFIC_SHIFT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::


## Overview

Traditionally, ECS Blue-Green deployments in Harness used two listeners—Stage and Prod—on separate ports and only one listener rule. This lacked the flexibility to support multiple rules or test traffic on alternate listener rules before shifting production traffic. All validation was done on the Stage listener before traffic is swapped to Prod.

To solve this, you can now configure **traffic shifting** between target groups attached to the same listener, giving you the flexibility to:

- Use multiple target groups of a **single rules** with configurable traffic distribution across target groups.
- Test new versions with a percentage of production or dev traffic.
- Perform gradual rollouts with approval gates between steps.
- Revert traffic back to the original version in case of issues.

## Set up a ECS Blue-Green Traffic Shifting Step Group

1. Add an ECS stage to your pipeline.
2. Add a Harness ECS service in the stage Service. For more information, refer [Adding an ECS Service](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial#add-the-harness-service)
3. Add a Harness ECS environment and infrastructure in the stage Environment.  For more information, refer [Adding an ECS Environment](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial#define-the-infrastructure)
4. In the Execution strategies tab, select the **Blue Green** strategy and enable the checkbox **Add Traffic Shifting Steps** under the **Enable Traffic Shifting for ECS Deployment** section.


Your Execution tab now includes a Blue Green step group with the **ECS Blue Green Create Service step** and **ECS Blue-Green Traffic Shifting** step.

<div align="center">
  <DocImage path={require('./static/traffic-shifting-1.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

If you dont select the **Add Traffic Shifting Steps** checkbox, then you will have a **ECS Blue-Green Traffic Shifting step** with steps **Configure Blue Green Deployment** and **Configure Swap Target Groups**.

You can also use a blank calvas and manually add the **ECS Blue Green Create Service step** and **ECS Blue-Green Traffic Shifting** step to your stage.

:::
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

:::note
If this checkbox is not selected, you cannot use the **ECS Blue-Green Traffic Shifting step** without enabling this checkbox.
:::

In **Configure your Production Service**:

- **Prod Listener**: Select the ELB listener you want to use for production.
- **Prod Listener Rule ARN**: Select the listener rule associated with your target groups.
- **Stage Target Group ARN**: Select the target group where the new service version will be deployed.

- **Same as already running instances**: When selected, the new ECS service uses the same instances as the old service after deployment.

- **Update Green Service**: When selected, the green service will be updated instead of being deleted once traffic routed to it drops to zero.

Yaml sample for the step

```yaml
- step:
    name: ECS Blue Green Create Service
    identifier: EcsBlueGreenCreateService
    type: EcsBlueGreenCreateService
    timeout: 15m
    spec:
      loadBalancer: ecs-donot-delete-todolist
      isTrafficShift: true
      sameAsAlreadyRunningInstances: false
      updateGreenService: true
      prodListener: <+input>
      prodListenerRuleArn: <+input>
      stageTargetGroupArn: <+runtime>
```

### Configure the ECS Blue-Green Traffic Shifting step

This step adjusts traffic weights between target groups.

<div align="center">
  <DocImage path={require('./static/traffic-shifting-3.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

**Step parameters**

**Name** : Name of the step.

**Timeout** : Execution timeout.

In the **Traffic Shifting** configuration, you have the option to either:

- **Inherit** the configuration from the previous ECS Blue-Green Create Service step using the **Inherit** checkbox, or  
- Select the **Standalone** checkbox to define a new configuration.

### Inherit

When **Inherit** is selected:

- Configure the **New ECS Weight** percentage.

Here is the inherit works. 
- Suppose you provide the weight as `50`, then the step will fetch all the configuration such as **The Elastic Load Balancer**, **Listener**, and **Listener Rule ARN** values from the **Blue-Green Create Service** step.
The step will route `50%` of the traffic to each of the target groups, i.e the **Prod Listener** and the **Stage Listener**

- Suppose you provide the weight as `70`, then the step will fetch all the configuration from the  **Blue-Green Create Service** step, The step will route `70%` to the **Prod Listener** and `30%` the **Stage Listener**

- Suppose you provide the weight as `70`, the step will route `70%` to the **Prod Listener** and `30%` the **Stage Listener**

- Suppose you provide the weight as `100`, the step will route `100%` traffic to the **Prod Listener**.

The inherit will do the tagging of blue and green only if the traffic shifting is done for 100 percent. for any weight, the tagging of blue and green to the target groups will not be done.

#### Sample YAML

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
  contextType: Pipeline
  ```

### Standalone 

When the **Standalone** checkbox is selected:

- You can provide a new set of Elastic Load Balancer, Listener, and Listener Rule ARN values.
- This allows you to validate the traffic shifting process independently.

- **Elastic Load Balancer**: Click here and select the AWS load balancer to use.

Harness uses the delegate to locate the load balancers and list them in Elastic Load Balancer.
If you do not see your load balancer, ensure that the delegate can connect to ECS.

- **Listener**: Select the ELB listener to associate with this deployment.

- **Listener Rule ARN**: Choose the Listener Rule ARN that defines the routing of traffic to the appropriate target group.

In **Target Group Tuples**, specify:

- **Target Group ARN**: Select the target group to which traffic should be shifted.
- **Weight**: specify the weight to be associated to the target group in the listener rule. Each target group weight is an integer from 0 to 999.

You have to provide two or more **Target Group Tuples** and the traffic shifting will be done accordingly based on the weight of the **Target Group Tuples** sets.

:::note
If only one **Target Group Tuples** is provided, no matter what weight you provide, it will be considered as `100%` and the traffic shifting will be done to the specified **Target Group ARN** with **Weight** `999`
:::

```yaml
- step:
    name: Ecs Blue Green Traffic Shift
    identifier: EcsBlueGreenTrafficShift
    type: EcsBlueGreenTrafficShift
    timeout: 10m
    spec:
      ecsTrafficShiftWrapper:
        type: Standalone
        spec:
          loadBalancer: ecs-load-balancer-name
          listener: <+stage.variables.listener>
          listenerRuleArn: <+stage.variables.devRule>
          forwardConfig:
            - targetGroupArn: <+stage.variables.stageTargetGroup>
              weight: <+matrix.weight>
            - targetGroupArn: <+stage.variables.prodTargetGroup>
              weight: <+(100 - <+matrix.weight>)>
```

The Standalone will not a tagging of blue or green to the target groups.


## Rollback Behavior

When you run the **ECS Blue Green Create Service** step for the first time, the system will store the initial configuration before the execution of the step as **Prepare Rollback Data**. if the step fails in-between the execution, the stage will be rolled back to the configuration stored in the **Prepare Rollback Data**

Rollback behavior depends on the mode used: 

<div align="center">
  <DocImage path={require('./static/traffic-shifting-4.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

- **Inherit Mode**: Restores the initial traffic weights using the ECS BG Prepare Rollback step.

<div align="center">
  <DocImage path={require('./static/traffic-shifting-5.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

- **Standalone Mode**: Resets the traffic weights using previously saved ALB rule configurations.

<div align="center">
  <DocImage path={require('./static/traffic-shifting-6.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

In both cases, this step restores traffic to its original distribution in the event of a failure or rollback trigger.

## Comparison: Traditional Blue-Green vs. Traffic Shifting

### Traditional Blue-Green Deployment (Pre-Traffic Shifting)

- Requires two separate listeners (e.g., ports 80 and 81)

- New version is deployed to the Stage target group associated with a different port (Stage listener)

- After manual/automated validation, a Swap Target Groups step is used to direct 100% traffic to the new version

- You cannot test the new version on live production traffic until after the swap

- Swap is atomic—no gradual rollout or partial traffic shift

### Blue-Green Deployment with Traffic Shifting (New Flow)

- Uses a single listener with weighted target groups

- New version is deployed to a target group under the same listener as the old version

- Allows progressive traffic rollout (e.g., 10% → 50% → 100%) using ECS Traffic Shift step

- Eliminates need for separate ports or manual AWS CLI scripts

- Enables staged rollout with approval gates, monitoring, and rollback safety

- No Swap step needed—transition to full traffic is handled by adjusting target group weights

Note: This new traffic-shifting approach makes Blue-Green deployments safer, more controlled, and production-traffic-aware.

## General Solution Pattern for Traffic Shifting

For customers needing traffic splitting (e.g., 10% → 30% → 100%) for ECS services:

Attach multiple target groups to a single ALB listener.

Deploy two ECS services (v1 and v2), each mapped to its own target group.

Use the ECS Blue-Green Create Service step with traffic shifting enabled.

Insert ECS Traffic Shift steps to incrementally adjust traffic.

Optionally include approvals between increments.

Finalize with full cutover or maintain partial rollout depending on success.


## Notes

- Target group weights range from `0–999` (AWS standard)
- Maximum 5 target groups per rule (AWS limit)
- **Swap** step and **Auto Scaling** during swap are not supported


## Example Use Case: Controlled Traffic Shifting Across Environments

You can use ECS traffic shifting to gradually roll out and validate a new version of your service across different environments before promoting it to production:

1. Deploy the new artifact to the ECS service and attach it to the **stage target group**.
2. Keep the **prod target group** mapped to the existing (old) service.
3. In lower environments, incrementally shift traffic to the new service version and validate using **CV (Continuous Verification)**, **approval steps**, or **custom scripts**.
4. Once validated, deploy the new version in the production environment and mark the new service as the **blue** version.

### Benefits

- **Immediate rollback** in all environments, from any point in the traffic shift.
- **Stage environment validation** before exposing the version to production traffic.
- **Single deployment**, with **granular control** over traffic distribution between artifact versions.

---

## Example Use Case: Step-by-Step Flow for Gradual Traffic Shifting

This example outlines the basic flow you can follow when implementing ECS Blue-Green deployments with traffic shifting:

1. Add the **ECS Blue-Green Create Service** step with `isTrafficShift: true` and provide the `stageTargetGroupArn`.
2. Add an **ECS Traffic Shift** step (inherit or standalone) to begin shifting traffic incrementally.
3. *(Optional)* Add an **approval step** to control progression between shifts.
4. Repeat the **ECS Traffic Shift** steps to gradually increase traffic to 100%.
5. *(Optional)* Manually disable the old service after the rollout is complete.

### Benefits

- **Simple step-by-step approach** that aligns with typical pipeline execution flows.
- **Supports approvals and gates** between incremental shifts.
- **Reduces deployment risk** by controlling traffic in defined stages.
