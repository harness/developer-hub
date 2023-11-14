---
title: Create triggers
description: Create triggers for Harness Code repositories.
sidebar_position: 20
---

In Harness, you can create [triggers](/docs/category/triggers) to automatically run your CI/CD pipelines in response to Git events in your Harness Code repos. When you create a trigger for a Harness Code repository, a [webhook](../config-repos/webhooks.md) is automatically created in your Harness Code repository.

Currently, Harness Code triggers must be configured in the YAML editor.

1. Go to the pipeline where you want to add a trigger for a Harness Code repository.
2. Select **Triggers** in the Pipeline Studio header.
3. Select **New Trigger**, and select the **Custom** trigger type.
4. Enter a trigger **Name** and then switch to the YAML editor.
5. Replace the `source` and `inputYaml` sections with the following:

   ```yaml
     source:
       type: Webhook
       spec:
         type: Harness
         spec:
           type: Push
           spec:
             autoAbortPreviousExecutions: true
             payloadConditions: []
             headerConditions: []
             repoName: ## Provide your Harness Code repository name.
             actions: []
     inputYaml: |
       pipeline:
         identifier: ## Provide the same value as 'pipelineIdentifier'.
         properties:
           ci:
             codebase:
               build:
                 type: branch
                 spec:
                   branch: <+trigger.branch>
   ```

6. Save the trigger.

To test the trigger, create a PR or push a change to your Code repository.
