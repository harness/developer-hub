---
title: Create triggers
description: Create triggers for Harness Code repositories.
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In Harness, you can create [triggers](/docs/category/triggers) to automatically run your CI/CD pipelines in response to push events in your Harness Code repos.

You can configure Harness Code webhook triggers in the visual or YAML editors.

<Tabs>
<TabItem value="Visual" label="Visual" default>

1. Go to the pipeline where you want to add a trigger for a Harness Code repository.
2. Make sure your [Harness Code repo is the pipeline's default codebase](./codebase-from-harness-code.md).
3. Select **Triggers** in the Pipeline Studio header.
4. Select **New Trigger**, and select the **Harness** webhook trigger type.
5. Enter a trigger **Name**, select the **Repository**, **Event**, and **Actions** that you want the trigger to listen on, and, if desired, select specific stages to run for this trigger.
6. On the **Conditions** tab, you can refine the trigger by specifying conditions that must also apply *in addition to* the previously-specified **Event** and **Actions**. For example, you can create a trigger that runs only when a Pull Request (event) is opened (action) against your `main` branch (condition).
7. On the **Pipeline Input** tab, if your pipeline accepts any runtime input, you can provide values that you want the trigger to use for these inputs.
8. Save the trigger.
9. To test the trigger, create a PR or push a change to your Code repository.

</TabItem>
<TabItem value="YAML" label="YAML">

1. Go to the pipeline where you want to add a trigger for a Harness Code repository.
2. Make sure your [Harness Code repo is the pipeline's default codebase](./codebase-from-harness-code.md).
3. Select **Triggers** in the Pipeline Studio header.
4. Select **New Trigger**, and select the **Harness** webhook trigger type.
5. Enter a trigger **Name** and then switch to the YAML editor.
6. Configure the trigger settings as described in [Trigger pipelines using Git events](/docs/platform/triggers/triggering-pipelines) and [Webhook triggers reference](/docs/platform/triggers/triggers-reference).
7. Save the trigger.
8. To test the trigger, create a PR or push a change to your Code repository.

Here's a Harness Code webhook trigger YAML example. This trigger listens for Pull Requests to be opened, reopened, or edited in a specific Harness Code repo. In addition, it only triggers if the PR's target branch is `main`.

```yaml
trigger:
  name: YOUR_TRIGGER_NAME
  identifier: yourtriggerid
  enabled: true
  description: ""
  tags: {}
  orgIdentifier: YOUR_HARNESS_ORG_ID
  stagesToExecute: []
  projectIdentifier: YOUR_HARNESS_PROJECT_ID
  pipelineIdentifier: YOUR_PIPELINES_ID
  source:
    type: Webhook
    spec:
      type: Harness
      spec:
        type: PullRequest ## Specify the event type to listen on.
        spec:
          connectorRef: ""
          autoAbortPreviousExecutions: true ## If true, in-progress builds previously started by this trigger are cancelled when another build is initiated by this trigger. Minimizes concurrent builds for frequently activated triggers.
          payloadConditions: ## Conditions are an optional way to refine triggers beyond 'type' and 'actions'.
            - key: targetBranch
              operator: Equals
              value: main
          headerConditions: []
          repoName: YOUR_HARNESS_CODE_REPO_NAME
          actions: ## Specify the actions to listen on for the specified event 'type'.
            - Open
            - Reopen
            - Edit
  inputYaml: | ## If required, specify input to supply to the build at runtime.
    pipeline:
      identifier: YOUR_HARNESS_PIPELINE_ID
      properties:
        ci:
          codebase:
            build:
              type: PR
              spec:
                number: <+trigger.prNumber>

```

</TabItem>
</Tabs>

### Permissions required for creating and updating Triggers

Triggers creation are supported with two modes of permissions

1. Mandatory pipeline Create/Edit and pipeline execute permissions
2. Optional pipeline Create/Edit pipeline execute permissions

This can be enabled using the settings available at Project level as part of the pipeline settings group
<img width="1298" alt="image" src="https://github.com/harness/developer-hub/assets/104134358/d4ec7fa4-5801-48e9-a69e-484ecebf4ae3">

This setting mandates pipeline Create/Edit permissions for Trigger Create/Edit by default.

You can chose to toggle off the mandatory pipeline Create/Edit permissions to create and update Triggers . This will decouple the pipeline Create/Edit permissions for Trigger creation and enable pipeline to be editable only for required users.






   
