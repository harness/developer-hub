---
description: KB - Gain a deep understanding of Harness Approval APIs and how to use them to automate workflows. 
title: "Automate your workflows: Using Harness Approval APIs"
---

# Automate your workflows: Using Harness Approval APIs
Harness Approval APIs offers to automate pipelines that have Harness Approval Steps that wait for a user action. But it requires a deep understanding to avoid potential pitfalls and unlock its true potential. This blog post delves into the intricacies of the API, exploring its inner workings, potential quirks, and best practices for approving with confidence.

### Using the API
Imagine a scenario where you have a pipeline to do a deployment to a QA or Production environment, and just before the deployment happens their are Harness Approval Steps that are waiting for manual approval action to approve or reject the pipeline. Now their might be chances that the approval has to be done only after some pre-defined action is complete, for e.g. there is an external process which is performing the testing or build of the service and only after completion of it, the deployment is to be started.

This can become cumbersome for the approvers which have to manually check the status of the external process and then based on that approve or reject the pipeline that's waiting for approval. Also, it might be possible that at a particular time their will be multiple such pipelines waiting for approval.

Introducing Harness Approval API to the rescue, this API can approve/reject any pipeline by the pipeline execution ID. So be it any external process which is running asynchronously, it can call an API to take approval action on the pipeline.

Below is an example API request to approve a pipeline by it's execution id:
```
curl -i -X POST \
  'https://app.harness.io/gateway/pipeline/api/v1/orgs/<orgIdentifier>/projects/<projectIdentifier>/approvals/execution/<executionId>' \
  -H 'Content-Type: application/json' \
  -H 'Harness-Account: <accountIdentifier>' \
  -H 'x-api-key: yourpattoken' \
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

This will approve the execution if it's waiting for approval using Harness Approval Step. Now their can be a case that the pipeline is waiting on multiple harness approval steps at the same time, in this case this API will fail as it doesn't support approving/rejecting multiple approval steps in a single API call. 
To resolve this we have added a new configuration `Callback ID` in the Harness Approval Step. This is a unique ID that can be configured by the user to give any approval step a unique ID. 

Below is a sample YAML on how to configure callback ID in a harness approval step:
```
steps:
  - step:
      type: ShellScript
      name: ShellScript_1
      identifier: ShellScript_1
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
      type: HarnessApproval
      name: harness
      identifier: harness
      spec:
        callbackId: <+pipeline.stages.stage.spec.execution.steps.ShellScript_1.output.outputVariables.callback_id>
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

After configuring this callback id, it can be used in the API to approve a particular harness approval step in an execution.

Below is an example API request:
```
curl -i -X POST \
  'https://app.harness.io/gateway/pipeline/api/v1/orgs/<orgIdentifier>/projects/<projectIdentifier>/approvals/execution/<executionId>?callback_id=<callback_id>' \
  -H 'Content-Type: application/json' \
  -H 'Harness-Account: <accountIdentifier>' \
  -H 'x-api-key: yourpattoken' \
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


### API Limitations
1. This API can only be used for pipelines which use Harness Approval Steps to wait for user approvals.
2. It can approve/reject only one Harness Approval instance at a time, in-case the execution has multiple approvals waiting for approvals at the same time, the API will fail with an error
3. It's recommended to have callback ID to be unique for a particular execution. In-case their are multiple approvals waiting with same callback ID in a particular execution, the API call will fail.

### Harness Documentation

Familiarize yourself with the Harness Approval Step. [The Harness documentation provides](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/) detailed information on it.
