---
title: Create triggers
description: Create triggers for Harness Code repositories.
sidebar_position: 20
---

In Harness, you can create [triggers](/docs/category/triggers) to automatically run your CI/CD pipelines in response to Git events in your Harness Code repos. When you create a trigger for a Harness Code repository, a [webhook](../config-repos/webhooks.md) is automatically created in your Harness Code repository.

Currently, Harness Code triggers must be configured in the YAML editor.

1. Go to the pipeline where you want to add a trigger for a Harness Code repository.
2. Select **Triggers** in the Pipeline Studio header.
3. Switch to the YAML editor, and use the following template to configure the trigger, and then save the trigger.

```yaml
trigger:
  name: CodePushTrigger ## Provide a trigger name.
  identifier: CodePushTrigger ## Provide an ID based on the name.
  enabled: true ## Set to 'false' to turn off the trigger.
  description: ""
  tags: {}
  orgIdentifier: default ## Leave as default or specify an org.
  stagesToExecute: []
  projectIdentifier: YOUR_HARNESS_PROJECT_ID ## Specify the project associated with your Harness Code repo.
  pipelineIdentifier: YOUR_PIPELINE_ID ## Specify the pipeline associated with this trigger.
  source:
    type: Webhook
    spec:
      type: Harness
      spec:
        type: Push
        spec:
          connectorRef: ""
          autoAbortPreviousExecutions: true
          payloadConditions: []
          headerConditions: []
          repoName: YOUR_HARNESS_CODE_REPO_NAME ## Specify your Harness Code repository name.
          actions: []
  inputYaml: |
    pipeline:
      identifier: YOUR_PIPELINE_ID ## Specify the pipeline associated with this trigger.
      properties:
        ci:
          codebase:
            build:
              type: branch
              spec:
                branch: <+trigger.branch>
```
