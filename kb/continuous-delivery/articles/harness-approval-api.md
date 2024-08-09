---
description: KB - Gain a deep understanding of Harness Approval APIs and how to use them to automate workflows. 
title: "Orchestrating Deployments with Choice: Exploring Harness Approval APIs"
---

# Orchestrating Deployments with Choice: Exploring Harness Approval APIs

Approvals play a crucial role in getting your deployments done timely and with precision. Although too many approvals or too many dependencies on external systems can create bottlenecks and increase the complexity of managing the approvals.

Harness understands the importance of this coordination, and that's why we bring you the Approval API which can approve any pipeline by the pipeline execution id. 

## Why use Harness Approval?

Harness Approval Step can be used to prevent a stage execution from proceeding without an approval from the required users. For e.g. You might want to add an approval step just before a production deployment happens to have a controlled release.

Familiarize yourself with the Harness Approval Step. [The Harness documentation provides](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/) detailed information on it.

### A Sample Scenario using Harness Approval

Your organization has multiple pipelines, each representing a crucial step in your software deployment process. These pipelines await approvals before progressing further, ensuring a robust and controlled release.

Now, imagine one of these pipelines is waiting for an approval. But, this approval depends on the status of a process running in an external system. The approver, responsible for approving pipelines, would typically:

1. Identify the pipeline execution that needs to be manually approved.

2. The approver then verifies whether the external system's job is complete and successful, and based on the job's status approves or rejects the execution.

3. Generally the approver wouldn't have just one pipeline to approve, but several such pending approvals.


## Using Approval API: Approve or Reject an Execution by Pipeline Execution ID

Their can be multiple such scenarios like the one listed above, which can be automated using the Harness Approval API. The API can approve or reject a pipeline by directly using the pipeline's execution ID. 
So any process can call this API to approve or reject the execution based on the process's status, eliminating the need for manual intervention and making approvals a seamless process.

Below is an example API curl request to approve a pipeline by it's execution id:

```
curl -i -X POST \
  'https://app.harness.io/gateway/pipeline/api/v1/orgs/<orgIdentifier>/projects/<projectIdentifier>/approvals/execution/<executionId>' \
  -H 'Content-Type: application/json' \
  -H 'Harness-Account: <accountIdentifier>' \
  -H 'x-api-key: <yourpattoken>' \
  -d '{
    "action": "APPROVE",
    "approver_inputs": [
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

To ensure clarity and precision, this API is designed to handle only one approval instance at a time. If multiple approvals are pending simultaneously, the API call will encounter an error, signaling that approving multiple instances in a single call is not supported. However, in the scenario where only one approval is awaiting consideration, it will seamlessly proceed to be automatically approved.

Refer [API Documentation](https://apidocs.harness.io/tag/Approvals#operation/addHarnessApprovalActivityByPipelineExecutionId) for more detailed information on it.

### Using Approval API for a pipeline having multiple approvals:
There can be some usecases where multiple approvals are waiting in a pipeline, and we want to approve a specific one out of them using the API. To overcome this limitation, the configuration of Harness Approval Step contains a parameter—`callback_id`. This parameter is optional, allowing users to provide a unique identifier to each approval step, so that it can be identified easily.
This parameter can be configured while adding an Harness Approval step to the pipeline, like shown in the below image

<DocImage path={require('../static/harness-approval-api.png')} width="60%" height="60%" title="Click to view full size image" />

This `callback_id` can now be passed to the same API, to further filter the approval instances waiting in a particular pipeline execution. Here's a sample curl request:

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

:::note

If there are multiple approvals waiting in the same pipeline execution with the same callback identifier, this API call will fail again. This API at any-time supports approving only one Harness Approval step at a time.

:::

## Illustrating with a Sample Scenario

Let's dive into a real-world example to showcase approval using execution id and callback id in action. Consider the following sample pipeline which has 2 Stages:

- **Stage 1: Approval Stage**
  
  In the initial stage, the focus is on orchestrating approvals seamlessly. This stage comprises three essential steps:

    ***Step 1: Shell Script Step - To generate a random UUID:***

    This step will basically generate a random uuid using `uuidgen` and export it as a harness expression using Shell Script Output Variables.

    ***Step 2: HTTP Step - To trigger the external system job:***

    This step will trigger the external system job, while passing the pipeline execution id along with the uniquely generated callback identifier.

    ***Step 3: Prod Approval Step - Approval Step just before the prod deployment:***

    This Harness Approval step will use the unique callback identifier created in first step and wait for an approval(either manual or through an API)

- **Stage 2: Prod Deployment Stage**

  This stage has the deployment steps, to do the actual deployment to the production system

Once this orchestrated pipeline is set in motion, it initiates a randomized UUID, triggers a job in the external system, and gracefully awaits approval. Now, the external system holds the control to either approve or reject the pipeline based on the completion status of the job. This entire approval process now becomes automated, hence ensuring precision and efficiency in every deployment instance.

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
            requestBody: "{\"executionId\": \"<+pipeline.executionId>\",\"callback_id\": \"<+execution.steps.<STEP_GROUP_ID>.steps.generate_random_uuid.output.outputVariables.callback_id>\"}"
          timeout: 1m
      - step:
          type: HarnessApproval
          name: prodApproval
          identifier: prodApproval
          spec:
            callbackId: <+execution.steps.<STEP_GROUP_ID>.steps.generate_random_uuid.output.outputVariables.callback_id>
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

Replace the \<STEP_GROUP_ID\> by the identifier of the stepgroup when it gets used in a pipeline

:::

## Fixing common issues while using API

1. Getting error `User not authorized to approve/reject` while running the API:
  
  Each Approval Step can only be approved by a limited set of users, which is defined by the user groups configuration in the Harness Approval Step. To verify if the approval is only done by authorized users, this API uses the permissions of the user who's api key is passed in the header `x-api-key` only. So the key and the user's permission needs to be verified in case the API call is failing.

2. Getting error `Invalid request: execution_id param value provided doesn't belong to Account: <account_id>, Org: <org_id>, Project: <project_id> or the pipeline has been deleted`:

  The execution id parameter of the API, or the account/org and project identifiers being passed to the API might not be pointing to a correct pipeline execution.

3. Getting error `Found no Harness Approval Instance waiting for pipeline execution id: <execution_id> and callback id: <callback_id>`:

  The pipeline execution id passed wouldn't be having any Harness Approval Step with the provided callback id waiting for approval at the time of the API call. This API can be used to approve only Harness Approval Steps and doesn't support other approval steps that Harness provides.
  Also, if no callback id is passed to the API, it will fetch all the approval steps in an execution irrespective of callback id being configured in the Harness Approval Step.

### Harness Documentation

1. Familiarize yourself with the Harness Approval Step. [The Harness documentation provides](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/) detailed information on it.

2. Refer [API Documentation](https://apidocs.harness.io/tag/Approvals#operation/addHarnessApprovalActivityByPipelineExecutionId) for more detailed information on the the API.
