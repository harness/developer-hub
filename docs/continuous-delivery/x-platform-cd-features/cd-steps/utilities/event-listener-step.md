---
title: Event Listener Step
description: Event Listener Step enables pipelines to resume or fail execution based on webhook events that meet predefined approval or rejection criteria
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Event Listener Step

The **Event Listener Step** introduces an event-driven mechanism to Harness pipelines, eliminating the need for polling and improving performance. Instead of continuously checking for status updates, this step reacts to **webhook events** in real time to determine whether a pipeline should resume or fail based on predefined conditions.

## Key Features

- **Webhook Event Handling**  
  Processes incoming webhook events to either resume or fail pipeline execution based on the event payload.

- **Success/Failure Criteria**  
  - Harness uses **JEXL expressions** to define success and failure conditions.
  - **Success Criteria** (required) is always evaluated first and takes precedence. If success criteria is met, the pipeline resumes.
  - **Failure Criteria** (optional) is evaluated only if the success criteria is **not** met. If the failure criteria is met, the step fails and the corresponding failure strategy (step or stage-level) is applied.
  - If no failure criteria is provided, the step continues to wait for an event that meets the success criteria until the timeout is reached.

- **Event-Driven**  
  Eliminates the overhead of polling by listening for relevant events as they occur.

## Configuring an Webhook

Refer [Generic Webhook Documentation](https://developer.harness.io/docs/platform/triggers/trigger-pipelines-using-generic-events/#configure-a-webhook) to know more about how to create a webhook.

## Configuring an Event Listener Step

Follow these steps to set up a **Google Cloud Run Service** in Harness:

<Tabs>
<TabItem value="Interactive guide">

Here is an interactive guide to setup your Event Listener Step pipeline.

<iframe 
	src="https://app.tango.us/app/embed/d822c083-7b20-45c5-ada2-8a84b8104426"
	style={{ minHeight: '800px'}} 
	sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin" 
	security="restricted" 
	title="Setting Up GCR Sample Pipeline in Harness" 
	width="100%" 
	height="100%" 
	referrerpolicy="strict-origin-when-cross-origin" 
	frameborder="0" 
   webkitallowfullscreen="webkitallowfullscreen" 
   mozallowfullscreen="mozallowfullscreen" 
	allowfullscreen="allowfullscreen"
></iframe>
</TabItem>

<TabItem value="Step by Step Guide">
This step is available in **Deploy Stages** and **Custom Stages**.

1. **Add Step**  
   Click **Add Step** and select **Event Listener Step**.

2. **Name & Time-Out**  
   Provide a **Name** and **Time-out** value for the step.

3. **Webhook Selection**  
   Choose a **Webhook** to trigger pipeline execution based on incoming events.

4. **Success Criteria**  
   - Provide a **JEXL expression** that defines when the pipeline should succeed.  
   - Once the success criteria is met, the pipeline resumes with a **SUCCESS** status.

5. **Failure Criteria**  
   - Provide a **JEXL expression** that defines when the pipeline should fail.  
   - If failure criteria is met (and success criteria isn’t already met), the pipeline fails.  
   - **Note**: Success criteria is evaluated first. If success criteria passes, the failure criteria is not considered.

6. **Input Variables**  
   - Optionally, define input variables that can be used within your success/failure JEXL expressions.

7. **Output Variables**  
   - (Optional) Specify any variables you want to make available for later steps in the pipeline.

</TabItem>
</Tabs>

## Using Input and Output Variables in Success Criteria

You can also use input variables defined in the **Event Listener step configuration** to evaluate incoming payloads dynamically.

### Referencing Input Variables

Use this format to reference an input variable:

```yaml
<+spec.inputVariables.inputVarA>
```

Valid: `<+spec.inputVariables.inputVarA>`

Invalid: `$inputVar` (shell-style syntax is not supported)

For example, to compare an input variable with a payload field:

`<+event.payload.action> == <+spec.inputVariables.inputVarA>`

### Referencing Output Variables

To compare event payloads with a known output or expression from another step:

`<+event.payload.someField> == <+someOtherStep.output.outputVarB>`

## Use Cases

<details>
<summary>Use Cases</summary>

Suppose the webhook payload received is:

```json
{
  "event": "ping",
  "data": {
    "success": true
  },
  "webhook": "EventListenerTest",
  "action": "SUCCESS"
}
```

1. Success Criteria: `<+event.payload.action> == "SUCCESS"`

Since action is "SUCCESS", the success criteria is met and the step succeeds.

2. Success Criteria: `<+event.payload.action> == "SUCCESS"`
Failure Criteria: `<+event.payload.webhook> == "EventListenerTest"`

Both conditions are met (action is "SUCCESS" and webhook is "EventListenerTest").
Because success criteria is evaluated first, the step succeeds.

3. Success Criteria: `<+event.payload.action> == "Null"`
Failure Criteria: `<+event.payload.webhook> == "EventListenerTest"`

The success criteria fails (action is not "Null").
The failure criteria passes (webhook is "EventListenerTest").
The step fails.

4. Neither Criteria Met

If neither the success nor failure criteria is met, the step waits for additional events that might match until the time-out is reached.

</details>

## Sample Pipeline YAML

<details>
<summary>Sample yaml</summary>

Here is the sample pipeline yaml for the EventListener step

```yaml
pipeline:
  name: Event-Listener
  identifier: EventListener
  projectIdentifier: projectIdentifier
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: stage1
        identifier: stage1
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: EventListener
                  name: EventListener_1
                  identifier: EventListener_1
                  spec:
                    webhookIdentifier: Event_listener
                    successCriteria: <+event.payload.action>=="SUCCESS"
                    failureCriteria: <+event.payload.action>=="FAILURE"
                  timeout: 10m
        tags: {}

````

</details>
