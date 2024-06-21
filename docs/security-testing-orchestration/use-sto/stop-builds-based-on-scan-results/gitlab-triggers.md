---
title: GitLab triggers to block merge requests with vulnerabilities
description: Trigger STO scans to block GitLab merge requests with vulnerabilities.
sidebar_label: GitLab triggers to block merge requests
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can create GitLab event triggers to support a variety of STO workflows and use cases. This topic describes how to do the following:

- Trigger an STO pipeline in response to a GitLab MR that targets a protected branch and/or updates specific files.
- Include a keyword in a review comment to trigger a new scan if a previous pipeline execution failed.



The following steps outline the basic workflow:


1. [Create a trigger](#create-the-harness-trigger) for your Harness pipeline.

   This should automatically register an outbound webhook in your Git repo.

2. [Set up the failure criteria](#set-up-the-failure-criteria) for your STO pipeline.

3. [Create a merge request](#test-the-outbound-webhook-and-trigger) to test the webhook and trigger.

   When you create a merge request, GitLab sends a request to the Harness webhook. If the STO pipeline fails, it sends back a `failed` response that blocks the merge request. 

## Before you begin

These workflows require the following:

- A [Harness connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-lab-connector-settings-reference) to your GitLab account.
- A Harness pipeline with a code-repository scan step such as Semgrep.
- The [Codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/) in your pipeline should point to the Git repo that you want to scan.


## Create the Harness trigger

The following sections describe two triggers that can be very useful in the context of STO scanning:

- [Trigger on a changed file](#trigger-on-a-changed-file)
- [Trigger on a review comment](#trigger-on-a-merge-request-comment)

### Trigger on a changed file

You can specify a trigger that says: If a merge request updates any of these files, run the pipeline and scan the repo.

This type of trigger supports use cases such as:

- If the merge request updates any file that matches the trigger filter, run a SAST scan and block the PR if the scan results meet the [failure criteria](#set-up-the-failure-criteria).

- If the merge request updates a specific file of interest, such as a `pom.xml` workspace file, run an SCA scan and block the PR if the scan results meet the [failure criteria](#set-up-the-failure-criteria).


#### Trigger setup
<!-- details>

<summary>Trigger setup</summary -->

1. Go to your STO pipeline, select **Triggers**, and add a new trigger.

2. Set up the trigger as follows. 


#### [Configuration](/docs/platform/triggers/triggering-pipelines#configure-the-trigger)

1. [Connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-lab-connector-settings-reference) to your GitLab account

2. **Repository name**

3. [Event](/docs/platform/triggers/triggers-reference#event-and-actions) = **merge request**

4. [Actions](/docs/platform/triggers/triggers-reference#event-and-actions) to trigger the pipeline 


#### [Condition](/docs/platform/triggers/triggers-reference#conditions-settings)

 The following conditions are the most relevant to this workflow. You can add other conditions as needed. Triggers are complex filters in which all conditions are AND-ed together.

   1. **Target Branch** This should match your [target baseline](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines), such as `main`.

   2. [Changed Files](/docs/platform/triggers/triggers-reference#branch-and-changed-files-conditions) The files that trigger the STO pipeline if they have updates in the PR. You can specify multiple files using the [operators](/docs/platform/triggers/triggers-reference#operators) **In**, **Not In**, and **Regex**.

   Here's a simple example: trigger a build if a PR seeks to update a specific `pom.xml` in the `main` branch.

   <DocImage path={require('./static/trigger-to-block-prs/changed-file-condition-example-simple.png')} width="50%" height="50%" title="Trigger on changed file in main branch" />


#### [Pipeline input](/docs/platform/triggers/triggering-pipelines#set-pipeline-input)

   The pipeline input should be configured correctly, with **Build Type** set to **Git Pull Request**.


#### Test the trigger

After you create the trigger, proceed to [Set up the failure criteria](#set-up-the-failure-criteria).

<details>

<summary>YAML trigger example</summary>

```yaml

trigger:
  name: gitlab-trigger-on-mr-changed-file
  identifier: gitlabtriggeronmrchangedfile
  enabled: true
  description: ""
  tags: {}
  orgIdentifier: default
  stagesToExecute: []
  projectIdentifier: sto_tutorials
  pipelineIdentifier: triggertestgitlab
  source:
    type: Webhook
    spec:
      type: Gitlab
      spec:
        type: MergeRequest
        spec:
          connectorRef: your_gitlab_connector_id
          autoAbortPreviousExecutions: false
          payloadConditions:
            - key: changedFiles
              operator: Equals
              value: README.rst
            - key: targetBranch
              operator: Equals
              value: main
          headerConditions: []
          repoName: dvpwa-gitlab-tutorial
          actions:
            - Open
            - Update
            - Reopen
  inputYaml: |
    pipeline:
      identifier: triggertestgitlab
      properties:
        ci:
          codebase:
            build:
              type: PR
              spec:
                number: <+trigger.prNumber>


```

</details>


<!-- /details -->


### Trigger on a merge-request comment

You can specify a trigger that says: If a reviewer includes a specific keyword in a pull-request review comment, run the pipeline and scan the repo.

This type of trigger is useful when a pipeline execution fails for reasons other than the [failure criteria](#set-up-the-failure-criteria) you specified for the pipeline. If the STO scan doesn't finish in the original execution, a reviewer can add a review comment with a keyword such as `RERUN_STO_PIPELINE`. 

<!-- details>

<summary>Trigger setup</summary -->

#### Trigger setup

1. Go to your STO pipeline, select **Triggers**, and add a new trigger.

2. Set up the trigger as follows.

#### [Configuration](/docs/platform/triggers/triggering-pipelines#configure-the-trigger)

1. [Harness Connector](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-lab-connector-settings-reference) to your GitLab account

2. **Repository name**

3. [Event](/docs/platform/triggers/triggers-reference#event-and-actions) = **Merge Request**

4. [Actions](/docs/platform/triggers/triggers-reference#event-and-actions), such as **Open**, **Reopen**, and **Edit**, to trigger the scan. You can also select **All actions** to allow reviewers to trigger a scan at any time.

#### [Condition](/docs/platform/triggers/triggers-reference#conditions-settings)

 The following conditions are the most relevant to this workflow. You can add other conditions as needed. Triggers are complex filters in which all conditions are AND-ed together.

   1. **Target Branch** This should match your [target baseline](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines).

   2. Enter the following [JEXL condition](/docs/platform/triggers/triggers-reference#jexl-conditions) with the keyword to trigger a new scan:

      `<+trigger.payload.object_attributes.description>.contains("RERUN_STO_SCAN")`

      <DocImage path={require('./static/trigger-to-block-prs/review-comment-condition-example-simple.GITLAB.png')} width="60%" height="60%" title="JEXL condition to trigger GitLab scan based on a comment string" /> 


#### [Pipeline input](/docs/platform/triggers/triggering-pipelines#set-pipeline-input)

The pipeline input should be configured correctly, with **Build Type** set to **Git Pull Request**.

#### Test the trigger

After you create the trigger, proceed to [Set up the failure criteria](#set-up-the-failure-criteria).

<details>

<summary>YAML trigger example</summary>

```yaml

trigger:
  name: trigger-on-mr-comment
  identifier: triggeronmrcomment
  enabled: true
  description: ""
  tags: {}
  orgIdentifier: default
  stagesToExecute: []
  projectIdentifier: sto_tutorials
  pipelineIdentifier: triggertestgitlab
  source:
    type: Webhook
    spec:
      type: Gitlab
      spec:
        type: MergeRequest
        spec:
          connectorRef: dbothwell1gitlab
          autoAbortPreviousExecutions: false
          payloadConditions:
            - key: targetBranch
              operator: Equals
              value: main
          headerConditions: []
          jexlCondition: "<+trigger.payload.object_attributes.description>.contains(\"RERUN_STO_SCAN\") "
          repoName: dvpwa-gitlab-tutorial
          actions:
            - Open
            - Reopen
            - Update
  inputYaml: |
    pipeline:
      identifier: triggertestgitlab
      properties:
        ci:
          codebase:
            build:
              type: branch
              spec:
                branch: <+trigger.branch>



```

</details>


<!-- /details -->

## Set up the failure criteria

You can configure your Harness pipeline to fail if the scan finds vulnerabilities that match a specified set of criteria. You can use one of two methods:

- [Fail on Severity](/docs/security-testing-orchestration/exemptions/exemption-workflows)

  Every STO scan step has a `fail_on_severity` setting that fails the step if a scan detects issues with the specified severity or higher. You can also create exemptions ("Ignore rules") for specific issues to override this behavior.

- [Governance policies](/docs/security-testing-orchestration/policies/create-opa-policies)

   You can use Harness Policy as Code to write and enforce policies against your security tests, and to block your pipelines if a security test has any issues that violate those policies. STO includes a set of predefined templates for blocking pipelines based on issue severity, reference ID, CVE age, title, and number of occurrences.

## Test the outbound webhook and trigger

### Verify the webhook in GitLab

Once you add a trigger to your pipeline, your Git service provider should create a webhook for the trigger automatically. This is true for all non-custom webhooks and all Git providers supported by Harness.

1. Go to your GitLab account and select **Settings** > **Webhooks**.

   <DocImage path={require('./static/trigger-to-block-prs/gitlab-new-trigger.png')} width="50%" height="50%" title="GitLab webhook for new trigger" />

2. If you don't see a webhook, you can add one manually. For more information, go to [Register the webhook in the Git provider](/docs/platform/triggers/triggering-pipelines/#register-the-webhook-in-the-git-provider).


### Test the webhook and trigger

1. Create a merge request in your GitLab repo to verify that the trigger works as intended.

    - To verify the [changed-file trigger](#trigger-on-a-changed-file) described above:

        - Go to the root branch you specified in the trigger.
        - Update the file you specified in the trigger. Then create a merge request in a new branch.

    - To verify the [review-comment trigger](#trigger-on-a-merge-request-comment) described above, create a merge request and then add a review comment with the keyword you specified.

        - Go to the root branch you specified in the trigger.
        - Create a merge request in a new branch.
        - Add a review comment with the keyword you specified in the trigger.

3. Go to the GitLab pipeline for your merge request. The STO pipeline execution appears as an external check.

    When you create a merge request, GitLab creates an external status check and sends a payload to the Harness webhook. Then it waits for a response that indicates the pipeline status (`pending`, `passed`, or `failed`).

    For more information, go to [External status checks](https://docs.gitlab.com/ee/user/project/merge_requests/status_checks.html) in the GitLab documentation.

    <DocImage path={require('./static/trigger-to-block-prs/gitlab-mr-external-check-running.png')} width="50%" height="50%" title="External status check (Harness STO pipeline)" /> 

3. Go to the **Pipeline Executions** page of your Harness pipeline and verify that the trigger starts a new execution.

    <DocImage path={require('./static/trigger-to-block-prs/test-trigger-02-new-pipeline-execution.png')} width="50%" height="50%" title="New Harness STO pipeline execution" />

4. Go to the **Merge Request** page in GitLab and wait for the merge-request checks to finish.

   When the Harness pipeline finishes, it sends a response to GitLab that reports the execution status. If the response is `failed`, the external check fails and blocks the merge request.


If the trigger doesn't work as intended, go to [Troubleshoot Git event triggers](/docs/platform/triggers/triggering-pipelines/#troubleshoot-git-event-triggers).


### Test the external status check

Now that you've set up the rule, trigger another Harness pipeline execution and fail it to verify that the rule stops the merge request.

:::note

To verify the branch protection rule, you must ensure that your STO pipeline fails. To configure your pipeline to fail temporarily, you can do one of the following:

- Set [Fail on Severity](/docs/security-testing-orchestration/get-started/key-concepts/fail-pipelines-by-severity/) to **Low** in the scan step of your pipeline. Then scan a repo with known vulnerabilities.
- Add a temporary Run step to your pipeline with the command `exit(1)`.

:::

1. Trigger another pipeline execution.

   - For the [changed-file trigger](#trigger-on-a-changed-file) described above, make and push a change. Then create a merge request.

   - For the [review-comment trigger](#trigger-on-a-merge-request-comment) described above, add a review comment with the keyword you specified.

Now, merging is blocked if the Harness pipeline fails.

<figure>
<DocImage path={require('./static/trigger-to-block-prs/gitlab-mr-external-check-failed.png')} width="60%" height="60%" title="Harness external check in merge-request pipeline failed." /> 

<figcaption>Figure 1: Harness external check in merge-request pipeline failed.</figcaption>
</figure>

<figure>
<DocImage path={require('./static/trigger-to-block-prs/gitlab-mr-blocked.png')} width="60%" height="60%" title="GitLab merge request blocked." /> 

<figcaption>Figure 2: GitLab merge request blocked.</figcaption>
</figure>



## For more information

- The Harness platform docs include [extensive information about triggers](/docs/category/triggers). The following topics are highly relevant to STO use cases:

  - [Trigger pipelines using Git events](/docs/platform/triggers/triggering-pipelines/)
  - [Webhook triggers reference](/docs/platform/triggers/triggers-reference/)

- For detailed information about outbound webhooks and branch protection rules, go to the docs for your source code management (SCM) provider. This topic describes a few simple GitLab workflows, but these topics are outside the scope of Harness documentation.




