---
title: Automated Activities
slug: /release-orchestration/activities/activity-types/automated-activities
description: Learn about automated activities and how to configure them
sidebar_position: 1
---

Automated activities execute without human intervention, enabling efficient and consistent release execution.

## What are Automated Activities?

An automated activity is an activity that encapsulates a pipeline. It executes as part of a process when its dependencies are met.

## Pipeline Activities

Pipeline activities are the primary type of automated activities. They:
- **Encapsulate pipelines**: The activity contains or references a Harness pipeline
- **Pass inputs**: Activity variables are mapped to pipeline inputs
- **Track execution**: Monitor pipeline execution status
- **Capture outputs**: Pipeline outputs can be used in subsequent activities

## Example (YAML)

This example shows an activity in a process referencing a pipeline.

```yaml
phase:
  id: deploy_phase
  name: Deploy to Staging1 Phase
  activities:
    - activity: WaitingActivity
      id: WaitingActivity
      name: WaitingActivity
      depends-on: []
      data:
        pipeline:
          pipeline: default/MyProject/MyPipeline
          inputSet: {}
```

## Best Practices

### Idempotency
Design activities to be idempotent:
- Safe to retry
- No side effects on repeat
- Consistent results

### Error Handling
Implement robust error handling:
- Clear error messages
- Appropriate retries
- Failure notifications

### Logging
Ensure proper logging:
- Execution logs
- Error details
- Performance metrics

### Testing
Test automated activities:
- Unit testing
- Integration testing
- Failure scenario testing

## Related Topics

- [Activities Overview](../activities-overview.md)
- [Manual Activities](./manual-activities.md)
- [Activity Dependencies](../activity-dependencies.md)

