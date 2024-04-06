---
title: Set up Slack notifications for detected issues in STO
description: Set up Slack notifications based on severity levels
sidebar_label: Set up Slack notifications
sidebar_position: 45
---

You can set up your STO pipelines to send a Slack notification whenever a scan detects vulnerabilities with a specific [severity](/docs/security-testing-orchestration/get-started/key-concepts/fail-pipelines-by-severity). 

 All you need to do is write a simple script that does the following: 

1. Determine whether to send a notification. To do this, evaluate the [output variables](/docs/security-testing-orchestration/get-started/key-concepts/output-variables) from the scan.

   Suppose you want to get notified on any new critical or high vulnerabilities. If NEW_CRITICAL or NEW_HIGH are non-zero, proceed.

2. Create a string variable with the information to include in the notification.

3. Post the notification to your Slack webhook. 

## Before you begin

Do the following:

1. Create an incoming webhook to your Slack app.

2. Run a cURL command to verify that you can post notifications to the webhook. 

   For information about these steps, go to [Sending messages using incoming webhooks](https://api.slack.com/messaging/webhooks) in the Slack documentation.

3. Create a Harness secret for your webhook URL. 

## Add the script to your pipeline

1. In your Harness pipeline, add a **Custom** stage after your scan stage. 

2. Add a **Shell Script** step to the Custom stage.

3. In the Shell Script step, go to **Optional Configuration** > **Script input variables** and add the Harness secret for your Slack webhook. 

   <DocImage path={require('./static/slack-webhook-add-as-secret.png')} width="70%" height="70%" title="Add shared path for scan results" /> 

3. Set up your script as follows.

### Add variables for your pipeline and scan results

You generally want to include your pipeline URL in the notification. You also want to include output variables for the scan results you're interested in, such as the number of `NEW_CRITICAL` or `NEW_HIGH` issues detected.  For example:

```bash
new_critical="<+pipeline.stages.YOUR_SCAN_STAGE.spec.execution.steps.YOUR_SCAN_STEP.output.outputVariables.NEW_CRITICAL>"
new_high="<+pipeline.stages.YOUR_SCAN_STAGE.spec.execution.steps.YOUR_SCAN_STEP.output.outputVariables.NEW_HIGH>"
pipeline_url="https://app.harness.io/ng/account/XXXX/sto/orgs/default/projects/sto_tutorials/pipelines/buildscanpushexample/"

```

:::tip

To get the full expression for an output variable:

- Go to the **Pipeline Execution** page for a previous run of your STO pipeline. 

- Navigate to <b>Pipeline</b> &gt; <b>&lt;_scan_stage_id_&gt;</b> &gt; <b>Output</b>.

- Hover next to the output value to access **Click to Copy**.

  <DocImage path={require('./static/output-variable-click-to-copy.png')} width="100%" height="100%" title="Add shared path for scan results" /> 

:::

### Send the notification? 

If all the output variables you're interested in are zero, there's no need to send a notification. Exit. 

```bash

issues_total=$(( $new_critical + $new_high))
if [ "$issues_total" == "0" ]; then
  exit 0
fi

```

### Generate the notification content

Create a string variable for your notification content. Include the pipeline URL, the scan output, and any other relevant information. For example:

```bash

slack_msg="=======================================================  \n"
slack_msg="$slack_msg Pipeline = $pipeline"
slack_msg="$slack_msg Issues detected with NEW_CRITICAL and NEW_HIGH severity  \n"
slack_msg="$slack_msg - NEW_CRITICAL issues: \t $new_critical \n"
slack_msg="$slack_msg - NEW_HIGH issues: \t = $new_high \n"
slack_msg="$slack_msg =======================================================  \n"

```

### Post the notification

Add a cURL command to post the notification to your Slack webhook. In this example, `$slack_hook` is the Harness secret for the Slack webhook URL.

```bash
curl -X POST --data-urlencode "payload={
  \"channel\": \"sto-scans\",
  \"username\": \"doug\",
  \"type\": \"mrkdwn\",
  \"text\": \"$slack_msg \",
  \"icon_emoji\": \":harnesshd:\"
}" $slack_hook
```

## Pipeline example

Here's a simple pipeline you can copy and paste into Harness:

1. Do the steps in [Before you begin](#before-you-begin).

1. Create a new pipeline with the name `slack_notification_example`.

2. Replace the YAML definition with the example below. 

3. Update the `slack_hook` environment variable with the Harness secret for your Slack webhook. 

4. Save and run the pipeline. 

<details>

<summary>YAML pipeline</summary>

```yaml
pipeline:
  identifier: slack_notification_example
  name: slack_notification_example
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: YOUR_SCAN_STAGE
        identifier: YOUR_SCAN_STAGE
        description: ""
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: AquaTrivy
                  name: YOUR_SCAN_STEP
                  identifier: YOUR_SCAN_STEP
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      type: container
                      detection: auto
                    advanced:
                      log:
                        level: info
                    privileged: true
                    image:
                      type: docker_v2
                      name: <+input>
                      tag: <+input>
                    sbom:
                      generate: true
                      format: spdx-json
          caching:
            enabled: false
            paths: []
    - stage:
        name: slack_notify
        identifier: slack_notify
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: Slack_Notify
                  identifier: ShellScript_1
                  spec:
                    shell: Bash
                    executionTarget: {}
                    source:
                      type: Inline
                      spec:
                        script: |-

                          # Assign variables
                          new_critical="<+pipeline.stages.YOUR_SCAN_STAGE.spec.execution.steps.YOUR_SCAN_STEP.output.outputVariables.NEW_CRITICAL>"
                          new_high="<+pipeline.stages.YOUR_SCAN_STAGE.spec.execution.steps.YOUR_SCAN_STEP.output.outputVariables.NEW_HIGH>"
                          pipeline="YOUR_PIPELINE_ID"


                          # Get the total # of issues. If the total is 0, exit without sending a notification
                          issues_total=$(($critical + $new_critical + $high + $new_high))
                          if [ "$issues_total" == "0" ]; then
                            exit 0
                          fi

                          echo "issues = $issues_total"

                          slack_msg="=======================================================  \n"
                          slack_msg="$slack_msg New issues detected with CRITICAL and HIGH severity! \n"
                          slack_msg="$slack_msg Pipeline: \t $pipeline \n"
                          slack_msg="$slack_msg - NEW_CRITICAL issues: \t $new_critical \n"
                          slack_msg="$slack_msg - NEW_HIGH issues: \t = $new_high \n"
                          slack_msg="$slack_msg =======================================================  \n"


                          curl -X POST --data-urlencode "payload={
                            \"channel\": \"sto-scans\",
                            \"username\": \"doug\",
                            \"type\": \"mrkdwn\",
                            \"text\": \" $slack_msg \",
                            \"icon_emoji\": \":harnesshd:\"
                          }" $slack_hook
                    environmentVariables:
                      - name: slack_hook
                        type: Secret
                        value: sto-slack-notifications-webhook-url
                    outputVariables: []
                  timeout: 10m
        tags: {}

```

</details>