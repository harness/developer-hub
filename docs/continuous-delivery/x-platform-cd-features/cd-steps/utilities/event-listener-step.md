---
title: Event Listener Step
description: Event Listener Step enables pipelines to resume or fail execution based on webhook events that meet predefined approval or rejection criteria
sidebar_position: 1
---

# Event Listener Step

The **Event Listener Step** introduces an event-driven mechanism to Harness pipelines, eliminating the need for polling and improving performance. Instead of continuously checking for status updates, this step reacts to **webhook events** in real time to determine whether a pipeline should resume or fail based on predefined conditions.

:::note
This feature is behind the feature flag: `CDS_EVENT_LISTENER_STEP`
:::

## Key Features

- **Webhook Event Handling**  
  Processes webhook events to either resume or fail pipeline execution based on the event payload.

- **Success/Failure Criteria**  
  Uses **JEXL expressions** to define conditions for success and failure. Success criteria are always evaluated first and take precedence over failure criteria.

- **Event-Driven**  
  Eliminates the overhead of polling by listening for relevant events as they occur.

## Configuring an Event Listener Step

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
