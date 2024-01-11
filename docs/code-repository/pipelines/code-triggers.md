---
title: Create triggers
description: Create triggers for Harness Code repositories.
sidebar_position: 20
---

In Harness, you can create [triggers](/docs/category/triggers) to automatically run your CI/CD pipelines in response to push events in your Harness Code repos.

Currently, Harness Code triggers must be configured in the YAML editor.

1. Go to the pipeline where you want to add a trigger for a Harness Code repository.
2. Make sure your [Harness Code repo is the pipeline's default codebase](./codebase-from-harness-code.md).
3. Select **Triggers** in the Pipeline Studio header.
4. Select **New Trigger**, and select the **Harness Code Repository** webhook trigger type.
5. Enter a trigger **Name** and then switch to the YAML editor.
6. Replace the `source` and `inputYaml` sections with the following:

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

7. Save the trigger.
8. To test the trigger, create a PR or push a change to your Code repository.

:::tip

You can also configure Harness Code Repository webhook triggers in the Visual editor.

:::
