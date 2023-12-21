---
description: KB - Gain a deep understanding of Harness Approval APIs and how to use them to automate workflows. 
title: "Orchestrating Deployments with Choice: Exploring Harness Approval APIs"
---

# Orchestrating Deployments with Choice: Exploring Harness Approval APIs

In the realm of efficient deployment, where every step matters, approvals play a crucial role. Approvals serve as the conductors in the symphony of deployment, orchestrating each move with precision and perfect timing.

Harness understands the significance of this choreography, and that's why we bring you three user-friendly Approval APIs. These APIs are designed to simplify and streamline the approval process in your projects, offering flexibility and choice to suit your unique needs.

## The Canvas of Approval

Traditionally, the Harness UI has been the go-to for approving or rejecting pipeline deployments. However, in the era of automation, we present a suite of Approval APIs that open up new dimensions for orchestrating your deployments.

### A Symphony of Approvals

Consider this intricate scenario: Your organization has a multitude of pipelines, each representing a crucial step in your software deployment process. These pipelines await approvals before progressing further, ensuring a robust and controlled release.

Now, imagine one of these pipelines stands at a crossroads, awaiting a critical approval. The catch? This approval is intricately tied to a process running in an external 3rd party system. In the traditional landscape, an approver faced a complex task.

The approver, responsible for greenlighting multiple crucial steps, would typically:

1. **Navigate the Harness UI:** First, they delve into the Harness UI to identify the pending approvals. This process involves sifting through various pipelines, each presenting its own set of approvals.

2. **Connect with External Systems:** Upon identifying the pending approval, the approver is then required to switch to the external 3rd party system. Here, they manually interact with the system to grant approval, possibly after validating external conditions or processes.

3. **Repeat the Process:** To compound the challenge, imagine this approver faces not one, but several such pending approvals. Each approval necessitates the same tedious navigation, manual intervention, and decision-making process.

This cumbersome journey not only consumes valuable time but also introduces the potential for errors and delays. As the number of pending approvals increases, so does the complexity of managing and ensuring timely approvals.

## The Existing Approval APIs: An Established Choice

Before we explore additional options, let's acknowledge the existing API that have been serving users effectively:

**[Approve or Reject a Pipeline Execution by Approval Instance Id](https://apidocs.harness.io/tag/Approvals#operation/addHarnessApprovalActivity):**
   - This API is your tool for approving or rejecting pipeline deployments. You can give the green light using a unique ID called `approvalInstanceId`, which is created when an approval step starts.
   - **How to Get `approvalInstanceId`:**
      1. **Check Harness UI:** Navigating through the Harness UI is a direct path to discovering the approval instance ID. This visual approach allows users to quickly spot and access the necessary information.
      
      2. **Using another API:** Alternatively, the [Get Approval Instances by Execution Id API](https://apidocs.harness.io/tag/Approvals#operation/getApprovalInstancesByExecutionId) can fetch a list of all approvals tied to a specific execution. However, if there are multiple approvals in a single execution, it may require a bit of manual filtering to pinpoint the relevant `approvalInstanceId` needed for the approval journey.


## Introducing the Enhanced Approval API: Approve or Reject an Execution by Pipeline Execution ID

This Approval API introduces a seamless method to approve or reject a pipeline by directly using the pipeline's execution ID, eliminating the need for an `approvalInstanceId`. This reduces the complexity of calling 2 APIs to approve a single Harness Approval Step,and combines it into 1.

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

Here's the deal—this API is your trusted soloist, but it can only handle one approval instance at a time. If you have multiple approvals waiting for attention, it will throw an error. This is a restriction we have put in place to keep things simple.


### Navigating the Approval Symphony: A Real Scenario:
Imagine this: your deployment pipeline has multiple approvals eagerly waiting in line. Now, here's the twist-—our API, while powerful, can only handle one at a time. What if you need to pinpoint and approve a specific one? 

### Enter the Approval Callback Identifier—Your Orchestration Superpower:
To overcome the limitation and provide users with more control, the Approval Callback Identifier introduces a user-configurable parameter—`callback_id`. This parameter is optional, allowing users to provide a unique identifier to distinguish and approve specific instances within the deployment pipeline. 
This parameter can be configured while adding an Harness Approval step to the pipeline, like shown in the below image

<docimage path={require('../static/harness-approval-api.png')} width="60%" height="60%" title="Click to view full size image" />

Now, seamlessly integrate this power into your orchestration with a refined Curl request:

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

  ```
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
  ```

    ***Step 2: HTTP Step - To trigger the 3rd party system job:***

    This step will trigger the 3rd party system job, while passing the pipeline execution id along with the uniquely generated callback identifier.

  ```
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
        requestBody: |-
          {
          "executionId": "<+pipeline.executionId>",
          "callback_id": "<+pipeline.stages.prodApproval.spec.execution.steps.generate_random_uuid.output.outputVariables.callback_id>"
          }
      timeout: 10s
  ```
  
    ***Step 3: Prod Approval Step - Approval Step just before the prod deployment:***

    This Harness Approval step will use the unique callback identifier created in first step and wait for an approval(either manual or through an API)

  ```
  - step:
      type: HarnessApproval
      name: harness
      identifier: harness
      spec:
        callbackId: <+pipeline.stages.prodApproval.spec.execution.steps.generate_random_uuid.output.outputVariables.callback_id>
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

- **Stage 2: Prod Deployment Stage**

  This stage has the deployment steps, to do the actual deployment to the production system


Once this orchestrated pipeline is set in motion, it initiates a randomized UUID, triggers a job in the 3rd party system, and gracefully awaits approval. Now, the 3rd party system holds the reins to either approve or reject the pipeline based on the completion status of the job. The entire process becomes a harmonious symphony of automated decision-making, ensuring precision and efficiency in every deployment instance.


## Ensuring Single Approval Instance

To ensure clarity and precision, this API is designed to handle only one approval instance at a time. If multiple approvals are pending simultaneously, the API call will encounter an error, signaling that approving multiple instances in a single call is not supported. However, in the scenario where only one approval is awaiting consideration, it will seamlessly proceed to be automatically approved.

## The Power of Choice Unleashed

- **Streamlined Workflow:** Automate the approval process directly from your systems.
- **Real-time Integration:** Sync external processes seamlessly with your deployment pipelines.
- **Efficiency Redefined:** No need for manual interventions—let the Approval API do the heavy lifting.

## Navigating the Future

Bid farewell to one-size-fits-all solutions. With the enhanced Approval API, you carve a path towards a future where you choose the right tool for your deployment orchestration.

### In Conclusion

In the evolving landscape of DevOps, choice is not just an option—it's a necessity. Explore the untapped potential of the Harness Approval APIs and choose the approach that aligns with your deployment orchestration needs. Your journey to orchestrated, automated deployments starts here.

### Harness Documentation

Familiarize yourself with the Harness Approval Step. [The Harness documentation provides](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/) detailed information on it.
