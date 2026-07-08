---
id: azure-service-bus-queue-state-change
title: Azure Service Bus queue state change
sidebar_label: Azure Service Bus Queue State Change
description: Change the operational status of one or more Azure Service Bus queues (Disabled, SendDisabled, ReceiveDisabled) for a configurable duration so you can test how producers and consumers handle queue-state disruptions.
keywords:
  - chaos engineering
  - azure service bus
  - azure fault
  - messaging
tags:
  - chaos-engineering
  - azure-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/azure/azure-service-bus-queue-state-change
- /docs/chaos-engineering/chaos-faults/azure/azure-service-bus-queue-state-change
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Azure Service Bus queue state change is an Azure chaos fault that changes the status of one or more Service Bus queues listed in `QUEUE_NAMES` (in `AZURE_NAMESPACE_NAME`, resource group `RESOURCE_GROUP`, subscription `AZURE_SUBSCRIPTION_ID`) to the value of `ACTION` (`disabled`, `sendDisabled`, or `receiveDisabled`) for `TOTAL_CHAOS_DURATION` seconds, then restores the queue to `Active`.

Use this fault to test how producers and consumers handle Service Bus queue state disruptions: whether producers retry on `SendDisabled`, whether consumers stop polling on `ReceiveDisabled`, whether retry/backoff logic recovers cleanly when the queue returns to `Active`, and whether monitoring detects the state change within the alerting SLA.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Producer behavior:** When `ACTION=sendDisabled`, do producers fail messages cleanly with a clear error and retry inside the SLA?
- **Consumer behavior:** When `ACTION=receiveDisabled`, do consumers stop polling and resume cleanly when the queue is restored?
- **Full outage:** When `ACTION=disabled`, do dependent services degrade gracefully and recover?
- **Dead-letter behavior:** Do messages move to the DLQ correctly when delivery counts are exceeded during the chaos window?
- **Monitoring fidelity:** Do alerts on `Microsoft.ServiceBus/namespaces/queues/Status` and producer/consumer error counters fire inside the alerting SLA?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the chaos infrastructure cluster.
- **Target queues reachable:** Each entry in `QUEUE_NAMES` exists in the namespace `AZURE_NAMESPACE_NAME` inside `RESOURCE_GROUP`.
- **Queues in `Active` state:** The fault skips queues that are already disabled.
- **Azure credentials available:** Service principal File Secret, workload identity, or managed identity.
- **RBAC granted:** The principal includes the role listed below.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Azure Service Bus Standard | Supported |
| Azure Service Bus Premium | Supported |
| Service Bus Basic | Not supported (queues only; no topics/subscriptions, no partitioning) |
| Topics and subscriptions | Not supported by this fault (only queues) |

---

## Permissions required

The Azure principal used by the chaos pod needs the following role on the Service Bus namespace.

**Recommended built-in role:** `Azure Service Bus Data Owner` plus `Contributor` on the namespace (to change queue status), or a custom role with the actions below.

**Custom role (minimum actions):**

```json
{
  "Name": "Harness Chaos Service Bus Queue State Change",
  "Actions": [
    "Microsoft.ServiceBus/namespaces/read",
    "Microsoft.ServiceBus/namespaces/queues/read",
    "Microsoft.ServiceBus/namespaces/queues/write"
  ],
  "AssignableScopes": ["/subscriptions/<SUBSCRIPTION_ID>"]
}
```

Go to [Azure fault permissions](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/fault-permissions) to read the full permission catalog.

---

## Authentication

Go to [Azure authentication methods](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/azure-authentication-methods) to set up Service principal, Workload identity, or Managed identity.

---

## Fault tunables

Configure the following fault parameters when you add Azure Service Bus queue state change to an experiment in Chaos Studio. Defaults are shown for reference.

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_NAMESPACE_NAME` | Name of the Service Bus namespace that contains the queues. | (required) |
| `QUEUE_NAMES` | Comma-separated list of Service Bus queue names. | (required) |
| `RESOURCE_GROUP` | Resource group that contains the Service Bus namespace. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `ACTION` | New queue status: `disabled`, `sendDisabled`, or `receiveDisabled`. | `disabled` |
| `TOTAL_CHAOS_DURATION` | Total duration of the fault in seconds. The queue stays in the requested state for this period. | `30` |
| `CHAOS_INTERVAL` | Delay in seconds between successive iterations when running for more than one cycle. | `30` |
| `SEQUENCE` | Order in which multiple queues are changed: `parallel` or `serial`. | `parallel` |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

**Authentication**

| Tunable | Description | Default |
| --- | --- | --- |
| `AZURE_SUBSCRIPTION_ID` | Target Azure subscription ID. | `""` |
| `AZURE_CLIENT_ID` | Client ID of a user-assigned managed identity. | `""` |
| `AZURE_AUTHENTICATION_SECRET` | Identifier of the **File Secret in Harness Secret Manager** that contains the service principal JSON. | `""` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Calls the Service Bus management API to set the `status` of each queue in `QUEUE_NAMES` to the value of `ACTION`, waits for `TOTAL_CHAOS_DURATION` seconds, then sets the status back to `Active`.

---

## Expected behavior during fault execution

- **`ACTION=disabled`:** Producers receive `MessagingEntityDisabled` errors on send, consumers receive the same on receive. The queue is fully unavailable.
- **`ACTION=sendDisabled`:** Producers receive `MessagingEntityDisabled` on send; consumers continue to drain the queue.
- **`ACTION=receiveDisabled`:** Producers continue to enqueue; consumers receive `MessagingEntityDisabled` on receive (queue depth grows).
- After the duration ends, the queue returns to `Active` and producers/consumers resume.

:::info When the fault ends
The chaos pod sets `status` back to `Active` on every targeted queue. Producers and consumers resume immediately, though clients may still need to recreate stale connections.
:::

### Signals to watch

- **Queue state:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `az servicebus queue show -g <rg> --namespace-name <ns> --name <q> --query status`.
- **Producer error rate:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on the producer's send-error counter.
- **Consumer lag:** Use a Prometheus probe on the consumer's queue-depth metric (or Azure Monitor `ActiveMessages`).

---

## Verify the fault execution effect

1. **Inspect queue status.**

   ```bash
   az servicebus queue show \
     --resource-group <rg> \
     --namespace-name <namespace> \
     --name <queue> \
     --query status
   ```

   The status should match `ACTION` during the chaos window and `Active` afterwards.

2. **Inspect Azure Monitor.**

   `Microsoft.ServiceBus/namespaces/queues/ActiveMessages` and producer/consumer error counters should shift in the expected direction.

---

## Recovery and cleanup

- **End of duration:** The chaos pod sets `status` back to `Active` on every queue.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also restores the queues.
- **Manual recovery:** Run `az servicebus queue update --resource-group <rg> --namespace-name <namespace> --name <queue> --status Active` for any queue still in a non-Active state.

---

## Limitations

- **Queues only:** Topics and subscriptions are not supported by this fault.
- **Same-namespace targeting:** All queues in `QUEUE_NAMES` must belong to `AZURE_NAMESPACE_NAME`.
- **Same-subscription targeting:** A single experiment targets one `AZURE_SUBSCRIPTION_ID`.
- **Client connection lifecycle:** Some client SDKs hold connections that may need to be recreated when the queue is re-enabled.

---

## Troubleshooting

<Troubleshoot
  issue="Azure Service Bus queue state change fails with AuthorizationFailed in Harness Chaos Engineering"
  mode="docs"
  fallback="The Azure principal is missing Microsoft.ServiceBus/namespaces/queues/write. Assign Contributor on the Service Bus namespace (or a custom role with the listed actions)."
/>

<Troubleshoot
  issue="Producer/consumer continued to work during the chaos window"
  mode="docs"
  fallback="Verify the queue status actually changed with az servicebus queue show --query status. The fault skips queues that are already disabled. Also check the client SDK is reading the status; some older SDKs cache the queue handle."
/>

<Troubleshoot
  issue="Queue stayed disabled after the experiment ended"
  mode="docs"
  fallback="Run az servicebus queue update --resource-group <rg> --namespace-name <ns> --name <queue> --status Active to restore manually. Check the chaos pod logs to root-cause why cleanup failed."
/>

---

## Related faults

- [Azure web app stop](/docs/chaos-engineering/faults/chaos-faults/azure/azure-web-app-stop): Stop the consumer web app instead of disabling the queue.
- [Azure instance stop](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-stop): Stop the VM running the producer or consumer.
