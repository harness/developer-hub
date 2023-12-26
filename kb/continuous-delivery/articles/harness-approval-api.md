---
description: KB - Gain a deep understanding of Harness Approval APIs and how to use them to automate workflows. 
title: "Orchestrating Deployments with Choice: Exploring Harness Approval APIs"
---

# Orchestrating Deployments with Choice: Exploring Harness Approval APIs

Approvals play a crucial role in getting your deployments done timely and with precision. Although too many approvals or too many dependencies on external systems can create bottlenecks and increase the complexity of managing the approvals.

Harness understands the importance of this coordination, and that's why we bring you the Approval API which can approve any pipeline by the pipeline execution id. These APIs are designed to simplify and streamline the approval process in your projects, offering flexibility and choice to suit your unique needs.

## The Canvas of Approval

Traditionally, the Harness UI has been the go-to for approving or rejecting pipeline deployments. However, in the era of automation, we present Approval APIs that open up new dimensions for orchestrating your deployments.

### A Symphony of Approvals

Consider this sample scenario: Your organization has multiple pipelines, each representing a crucial step in your software deployment process. These pipelines await approvals before progressing further, ensuring a robust and controlled release.

Now, imagine one of these pipelines is waiting for an approval. But, this approval can only be approved after the completion of a process running in an external 3rd party system. The approver, responsible for approving pipelines, would typically:

1. **Navigate the Pipeline Executions:** First, they have to go through the list of pipeline executions to identify the executions waiting for an approval. 

2. **Connect with External Systems:** Upon identifying the pending approval, the approver is then required to switch to the external 3rd party system. Here, they manually interact with the system to grant approval, possibly after validating external conditions or processes.

3. **Repeat the Process:** Generally the approver wouldn't have just one pipeline to approve, but several such pending approvals. Each approval necessitates the same tedious navigation, manual intervention, and decision-making process.

This cumbersome journey not only consumes valuable time but also introduces the potential for errors and delays. As the number of pending approvals increases, so does the complexity of managing and ensuring timely approvals.

## Introducing the Approval API: Approve or Reject an Execution by Pipeline Execution ID

This Approval API introduces a seamless method to approve or reject a pipeline by directly using the pipeline's execution ID. It only needs an execution id to approve any pipeline waiting for an approval. So any process can call this API to approve or reject the execution based on the process's status, eliminating the need for manual intervention and making approvals a seamless process.

Below is an example API request to approve a pipeline by it's execution id:

```
curl -i -X POST \
  'https://app.harness.io/gateway/pipeline/api/v1/orgs/<orgIdentifier>/projects/<projectIdentifier>/approvals/execution/<executionId>' \
  -H 'Content-Type: application/json' \
  -H 'Harness-Account: <accountIdentifier>' \
  -H 'x-api-key: <yourpattoken>' \
  -d '{
    "action": "APPROVE",
    "approverInputs": [
      {
        "name": "example_input1",
        "value": "value1"
      },
      {
        "name": "example_input2",
        "value": "value2"
      }
    ],
    "comments": "Approving via API"
  }
  '
```

### But wait, there's a catch:

This API can only handle one approval instance at a time. If you have multiple approvals waiting for attention, it will throw an error. This is a restriction we have put in place to keep things simple.

### Navigating the Approval Symphony: A Real Scenario:
Imagine this: your deployment pipeline has multiple parallel approvals eagerly waiting in line. But our API, while powerful, can only handle one at a time. What if you need to pinpoint and approve a specific one? 

### Enter the Approval Callback Identifier—Your Orchestration Superpower:
To overcome the limitation and provide users with more control, the Approval Callback Identifier introduces a user-configurable parameter—`callback_id`. This parameter is optional, allowing users to provide a unique identifier to distinguish and approve specific instances within the deployment pipeline. 
This parameter can be configured while adding an Harness Approval step to the pipeline, like shown in the below image

<docimage path={require('../static/harness-approval-api.png')} width="60%" height="60%" title="Click to view full size image" />

Now, seamlessly integrate this power into your orchestration with a refined curl request:

```
curl -i -X POST \
  'https://app.harness.io/gateway/pipeline/api/v1/orgs/<orgIdentifier>/projects/<projectIdentifier>/approvals/execution/<executionId>?callback_id=<callback_id>' \
  -H 'Content-Type: application/json' \
  -H 'Harness-Account: <accountIdentifier>' \
  -H 'x-api-key: <yourpattoken>' \
  -d '{
    "action": "APPROVE",
    "approverInputs": [
      {
        "name": "example_input1",
        "value": "value1"
      },
      {
        "name": "example_input2",
        "value": "value2"
      }
    ],
    "comments": "Approving via API"
  }
  '
```

## Illustrating with a Sample Scenario

Let's dive into a real-world example to showcase approval using execution id in action. Consider the following sample pipeline which has 2 Stages:

- **Stage 1: Approval Stage**
  
  In the initial stage, the focus is on orchestrating approvals seamlessly. This stage comprises three essential steps:

    ***Step 1: Shell Script Step - To generate a random UUID:***

    This step will basically generate a random uuid using `uuidgen` and export it as a harness expression using Shell Script Output Variables.

    ***Step 2: HTTP Step - To trigger the 3rd party system job:***

    This step will trigger the 3rd party system job, while passing the pipeline execution id along with the uniquely generated callback identifier.

    ***Step 3: Prod Approval Step - Approval Step just before the prod deployment:***

    This Harness Approval step will use the unique callback identifier created in first step and wait for an approval(either manual or through an API)

- **Stage 2: Prod Deployment Stage**

  This stage has the deployment steps, to do the actual deployment to the production system

Once this orchestrated pipeline is set in motion, it initiates a randomized UUID, triggers a job in the 3rd party system, and gracefully awaits approval. Now, the 3rd party system holds the control to either approve or reject the pipeline based on the completion status of the job. This entire approval process now becomes automated, hence ensuring precision and efficiency in every deployment instance.

Here's a sample account level step group template, to get you started. Simply save this step group template and use it in the pipelines that need an automated approval step.

```
template:
  name: ApprovalStepGroupTemplate
  identifier: ApprovalStepGroupTemplate
  versionLabel: V1
  type: StepGroup
  tags: {}
  spec:
    stageType: Custom
    steps:
      - step:
          type: ShellScript
          name: Generate Random Callback ID
          identifier: generate_random_uuid
          spec:
            shell: Bash
            onDelegate: true
            source:
              type: Inline
              spec:
                script: export uuid=$(uuidgen)
            environmentVariables: []
            outputVariables:
              - name: callback_id
                type: String
                value: uuid
          timeout: 10m
      - step:
          type: Http
          name: Trigger Jenkins Job Pipeline
          identifier: trigger_3rd_party_system_job
          spec:
            url: https://<thirdpartyurl>/job
            method: POST
            headers:
              - key: Content-Type
                value: application/json
            inputVariables: []
            outputVariables: []
            requestBody: "{\"executionId\": \"<+pipeline.executionId>\",\"callback_id\": \"<+execution.steps.<step_group_id>.steps.generate_random_uuid.output.outputVariables.callback_id>\"}"
          timeout: 1m
      - step:
          type: HarnessApproval
          name: prodApproval
          identifier: prodApproval
          spec:
            callbackId: <+execution.steps.<step_group_id>.steps.generate_random_uuid.output.outputVariables.callback_id>
            approvalMessage: Please review the following information and approve the pipeline progression
            includePipelineExecutionHistory: true
            approvers:
              userGroups:
                - account._account_all_users
              minimumCount: 1
              disallowPipelineExecutor: false
            approverInputs: []
            isAutoRejectEnabled: false
          timeout: 10m
```

:::note

Replace the <step_group_id> by the identifier of the stepgroup when it gets used in a pipeline

:::


## Ensuring Single Approval Instance

To ensure clarity and precision, this API is designed to handle only one approval instance at a time. If multiple approvals are pending simultaneously, the API call will encounter an error, signaling that approving multiple instances in a single call is not supported. However, in the scenario where only one approval is awaiting consideration, it will seamlessly proceed to be automatically approved.

## The Power of Choice Unleashed

- **Streamlined Workflow:** Automate the approval process directly from your systems.
- **Real-time Integration:** Sync external processes seamlessly with your deployment pipelines.
- **Efficiency Redefined:** No need for manual interventions—let the Approval API do the heavy lifting.

## Navigating the Future

Bid farewell to manual time-taking approvals, which could be time consuming and delay your release cycles. With this Approval API, you can automate the approvals, which could have been automated in the first place for e.g. approvals which just require a go ahead from other processes/pipelines.

### Harness Documentation

Familiarize yourself with the Harness Approval Step. [The Harness documentation provides](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/) detailed information on it.
