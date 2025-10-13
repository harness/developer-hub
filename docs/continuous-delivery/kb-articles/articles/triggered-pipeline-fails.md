---
description: Troubleshooting triggered pipeline failures when manual execution succeeds
title: Triggered Pipeline Fails While Manual Execution Succeeds
redirect_from: 
  - /kb/continuous-delivery/articles/triggered-pipeline-fails
---

# Triggered Pipeline Fails While Manual Execution Succeeds

## Introduction

You may encounter a situation where a triggered pipeline execution fails while a manually run execution of the same pipeline succeeds. This article explains the common causes and resolution steps for this issue.

## Problem Statement

Some customers have reported that their triggered pipelines fail with service configuration errors, even though the same pipeline runs successfully when executed manually.

### Error Message

When executing the pipeline via trigger, you may see the following error messages:

```
No manifests configured in the service. manifest expressions will not work
No config files configured in the service. configFiles expressions will not work
No service hooks configured in the service. hooks expressions will not work
Failed to complete service step
```

## Resolution

In this scenario, the artifact source configuration in the trigger is typically responsible for the error. The trigger needs to properly specify the artifact source details that would otherwise be provided during manual execution.

### Solution

Ensure that your trigger configuration includes the correct artifact source specification in the `templateInputs` section. Here's an example of the proper configuration:

```yaml
- stage:
    identifier: xxxxx
    template:
      templateInputs:
        type: Deployment
        spec:
          service:
            serviceInputs:
              serviceDefinition:
                type: CustomDeployment
                spec:
                  artifacts:
                    primary:
                      sources:
                        - identifier: xxxxxx
                          type: xxxxx
                          spec:
                            tag: <+trigger.payload.tag>
```

### Key Points

- Verify that the artifact source identifier in the trigger matches the one configured in your service
- Ensure the artifact tag or version is properly specified using trigger expressions (e.g., `<+trigger.payload.tag>`)
- Check that all required service inputs are provided in the trigger's `templateInputs` section
- Compare the trigger configuration with the inputs you provide during manual execution to identify any missing fields

By correcting the artifact source configuration in your trigger, the pipeline should execute successfully when triggered automatically.
