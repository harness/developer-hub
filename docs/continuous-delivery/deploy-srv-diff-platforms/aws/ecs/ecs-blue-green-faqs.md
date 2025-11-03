---
title: ECS Deployment FAQs
description: Frequently asked questions about ECS Blue-Green deployments.
sidebar_position: 6
---

This article addresses some frequently asked questions about ECS deployments in Harness.

## What's the difference between the Swap and Traffic Shift steps?

There are two distinct flows for ECS Blue-Green deployments. Only one can be used in a pipeline:

### Swap Step (Traditional Flow)

- The BG deploy step asks for **prod and stage listener rules** (two separate rules, typically on different ports)
- Does NOT ask for stage target group input
- Target groups are determined automatically based on which listener rule they're attached to
- Running the pipeline multiple times with the same configuration automatically alternates two versions of services between Blue/Green
- At the end of each deployment, the target group attached to the prod listener rule will have the blue service

### Traffic Shift Step (New Flow)

- The BG step asks for **one listener rule only** (production rule)
- This rule must be attached to precisely two target groups: stage and prod
- **Requires manual input** for the stage target group ARN to determine which of the two target groups is stage vs prod
- This design choice was intentional because users often have configurations like 60-40 or 20-80 traffic splits, not just 0-100
- With non-zero traffic on both target groups, Harness cannot automatically determine which is stage vs prod

## Why doesn't Harness automatically determine the stage target group like it does for ASG?

In ASG deployments, Harness automatically determines the prod target group as the one with 100% weight. However, for ECS traffic shifting:

- Users often maintain traffic configurations like 60-40, 20-80, or other splits
- It's not always 0-100, making automatic determination unreliable
- Requiring explicit stage target group input gives users complete control over which target group receives the new deployment

## Why does my active service get deleted during deployment?

**Symptom**: You see logs like:
```
Deleting existing non-blue version Service: echo-service__1
Waiting for existing Service echo-service__1 to reach inactive state
Deleted non-blue version Service: echo-service__1
```

**Root Cause**: Harness deletes any non-blue services attached to the stage target group at the start of each deployment. If you reuse the same stage target group that contains your current blue (active) service, Harness will delete it.

**Solution**: You must alternate the stage target group between deployments:

1. **First deployment**: Use `target-group-a` as stage target group → After 100% shift, `target-group-a` has blue service
2. **Second deployment**: Use `target-group-b` as stage target group → After 100% shift, `target-group-b` has blue service, `target-group-a` has green service
3. **Third deployment**: Use `target-group-a` as stage target group → Continues alternating

## If I constantly shift 100% traffic, do I still need to alternate target groups?

Yes. Even with a 100% traffic shift, you must alternate the stage target group between deployments if you want to maintain two versions of services alternating between Blue and Green (similar to the traditional swap flow).

**What happens if you don't alternate:**
- First deployment: Blue service `__1` is created in the stage target group with 100% traffic
- Second deployment (same stage target group): Harness sees service `__1` attached to stage target group, considers it non-blue (because it's in the stage target group), and deletes it before deploying new service `__2`
- You lose the ability to maintain two alternating versions

**What happens when you do alternate:**
- First deployment: Blue service `__1` in `target-group-a` with 100% traffic
- Second deployment (using `target-group-b`): Service `__1` is now tagged as green (in the prod target group), blue service `__2` is created in `target-group-b` with 100% traffic
- Third deployment (using `target-group-a`): Service `__2` is now green, blue service `__3` is created in `target-group-a` with 100% traffic

## How can I achieve traffic shifting without manual stage target group selection?

You can automate stage target group selection using a shell script step before the ECS Blue Green Create Service step. This eliminates the need for manual selection on each deployment:

```bash
#!/bin/bash

# Configuration
LISTENER_RULE_ARN="<+pipeline.variables.prodListenerRuleArn>"
TARGET_GROUP_A="<+pipeline.variables.targetGroupA>"
TARGET_GROUP_B="<+pipeline.variables.targetGroupB>"

# Get current listener rule configuration
RULE_CONFIG=$(aws elbv2 describe-rules --rule-arns "$LISTENER_RULE_ARN" --query 'Rules[0].Actions[0].ForwardConfig.TargetGroups' --output json)

# Extract weights for each target group
WEIGHT_A=$(echo "$RULE_CONFIG" | jq -r ".[] | select(.TargetGroupArn==\"$TARGET_GROUP_A\") | .Weight")
WEIGHT_B=$(echo "$RULE_CONFIG" | jq -r ".[] | select(.TargetGroupArn==\"$TARGET_GROUP_B\") | .Weight")

# Select the target group with 0% traffic (or lower weight)
if [ "$WEIGHT_A" -lt "$WEIGHT_B" ]; then
  STAGE_TARGET_GROUP="$TARGET_GROUP_A"
  echo "Selected Target Group A: $STAGE_TARGET_GROUP"
else
  STAGE_TARGET_GROUP="$TARGET_GROUP_B"
  echo "Selected Target Group B: $STAGE_TARGET_GROUP"
fi

# Export as output variable
export STAGE_TARGET_GROUP_ARN="$STAGE_TARGET_GROUP"
```

Then reference the output in your ECS Blue Green Create Service step:
```yaml
stageTargetGroupArn: <+execution.steps.SelectTargetGroup.output.outputVariables.STAGE_TARGET_GROUP_ARN>
```

## Can Harness provide a plugin or automatic inference for stage target group selection?

Stage target group selection is a manual input to support various traffic split configurations. If you have a specific use case that requires automatic inference, you can raise an enhancement request with Harness Support to explore options like:

- Publishing a plugin for automatic target group selection
- Adding configuration options for automatic inference based on traffic weights
- Supporting specific traffic patterns (e.g., always select 0% weight target group)

## What are the best practices for stage target group selection?

1. **Use runtime input**: Configure `stageTargetGroupArn: <+input>` to manually verify before each deployment
2. **Document your target groups**: Keep a record of your two target group ARNs and which one was used in the last deployment
3. **Implement automation**: Use a shell script step to select the target group with lower/zero traffic automatically
4. **Verify before deployment**: Check the AWS Console to confirm which target group currently has 100% traffic (this is your blue service)
5. **Select the opposite**: Choose the other target group as the stage target group for the new deployment

## Related documentation

- [ECS Blue-Green Traffic Shifting Step](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/traffic-shifting)
- [ECS Deployments Overview](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
