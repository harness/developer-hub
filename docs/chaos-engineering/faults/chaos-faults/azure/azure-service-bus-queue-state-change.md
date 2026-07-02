---
id: azure-service-bus-queue-state-change
title: Azure Service Bus queue state change
---

Azure Service Bus queue state change modifies the status of Azure Service Bus queues for a specific chaos duration. 
- It validates the resilience of applications that depend on Azure Service Bus messaging by testing how they handle queue disruptions.
- The fault can change queue statuses to disabled, send-disabled, or receive-disabled states.

## Use cases
Azure Service Bus queue state change:
- Determines the resilience of applications when Service Bus queues become unavailable or have restricted operations.
- Validates that message processing systems properly handle queue disruptions and implement appropriate retry mechanisms.
- Tests the behavior of distributed systems when message queues are disabled, ensuring graceful degradation.
- Verifies monitoring and alerting systems properly detect Service Bus queue state changes.

### Prerequisites
- Kubernetes >= 1.17
- Appropriate Azure access to manage Service Bus queues (read and write permissions on Service Bus namespace and queues).
- Azure Service Bus queues should be in an **Active** state before chaos injection.
- Use Azure [file-based authentication](https://docs.microsoft.com/en-us/azure/developer/go/azure-sdk-authorization#use-file-based-authentication) to connect to Azure using the Azure Go SDK. To generate the auth file, run `az ad sp create-for-rbac --sdk-auth > azure.auth` Azure CLI command.
- Kubernetes secret should contain the auth file created in the previous step in the `CHAOS_NAMESPACE`. Below is a sample secret file:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cloud-secret
type: Opaque
stringData:
  azure.auth: |-
    {
      "clientId": "XXXXXXXXX",
      "clientSecret": "XXXXXXXXX",
      "subscriptionId": "XXXXXXXXX",
      "tenantId": "XXXXXXXXX",
      "activeDirectoryEndpointUrl": "XXXXXXXXX",
      "resourceManagerEndpointUrl": "XXXXXXXXX",
      "activeDirectoryGraphResourceId": "XXXXXXXXX",
      "sqlManagementEndpointUrl": "XXXXXXXXX",
      "galleryEndpointUrl": "XXXXXXXXX",
      "managementEndpointUrl": "XXXXXXXXX"
    }
```

:::tip
If you change the secret key name from `azure.auth` to a new name, ensure that you update the `AZURE_AUTH_LOCATION` environment variable in the chaos experiment with the new name.
:::

#### Required Azure permissions

The service principal needs the following permissions:
- **Azure Service Bus Data Owner** or **Azure Service Bus Data Contributor** role on the target namespace
- Or custom role with these permissions:
  - `Microsoft.ServiceBus/namespaces/queues/read` 
  - `Microsoft.ServiceBus/namespaces/queues/write` 

### Mandatory tunables
   <table>
        <tr>
            <th> Tunable </th>
            <th> Description </th>
            <th> Notes </th>
        </tr>
        <tr>
            <td> RESOURCE_GROUP </td>
            <td> Name of the Azure resource group where the Service Bus namespace exists. </td>
            <td> For example, <code>rg-azure-servicebus</code>. For more information, go to <a href="#change-queue-state-by-name"> resource group field in the YAML file.</a></td>
        </tr>
        <tr>
            <td> AZURE_NAMESPACE_NAME </td>
            <td> Name of the Azure Service Bus namespace. </td>
            <td> For example, <code>my-servicebus-namespace</code>. For more information, go to <a href="#change-queue-state-by-name"> Azure namespace name.</a></td>
        </tr>
        <tr>
            <td> QUEUE_NAMES </td>
            <td> Comma-separated list of Service Bus queue names to target. </td>
            <td> For example, <code>queue-1,queue-2,queue-3</code>. For more information, go to <a href="#change-queue-state-by-name"> queue names.</a></td>
        </tr>
        <tr>
            <td> ACTION </td>
            <td> Target status to set for the queue(s). </td>
            <td> Supported values: <code>disabled</code>, <code>senddisabled</code>, <code>receivedisabled</code>. Defaults to <code>disabled</code>. For more information, go to <a href="#change-queue-state-by-name"> action.</a></td>
        </tr>
    </table>

### Optional tunables
   <table>
        <tr>
            <th> Tunable </th>
            <th> Description </th>
            <th> Notes </th>
        </tr>
        <tr>
            <td> TOTAL_CHAOS_DURATION </td>
            <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
            <td> Defaults to 30s. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos.</a></td>
        </tr>
        <tr>
            <td> CHAOS_INTERVAL </td>
            <td> Time interval between successive chaos iterations (in seconds). </td>
            <td> Defaults to 30s. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#chaos-interval"> chaos interval.</a></td>
        </tr>
        <tr>
            <td> SEQUENCE </td>
            <td> Sequence of chaos execution for multiple queues. </td>
            <td> Defaults to <code>parallel</code>. Also supports <code>serial</code> sequence. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injecting chaos (in seconds). </td>
            <td> For example, 30s. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time.</a></td>
        </tr>
        <tr>
            <td> DEFAULT_HEALTH_CHECK </td>
            <td> Determines if you wish to run the default health check which is present inside the fault. </td>
            <td> Default: 'true'. Validates queues are in Active state before chaos. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#default-health-check"> default health check.</a></td>
        </tr>
    </table>

### Change queue state by name

It specifies a comma-separated list of Service Bus queue names subject to state change. Tune it by using the `QUEUE_NAMES`, `AZURE_NAMESPACE_NAME`, `RESOURCE_GROUP`, and `ACTION` environment variables.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-service-bus-queue-state-change/queue-state-change.yaml yaml)
```yaml
# change state of Azure Service Bus queues for a certain chaos duration
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-service-bus-queue-state-change
    spec:
      components:
        env:
        # comma-separated names of the Azure Service Bus queues
        - name: QUEUE_NAMES
          value: 'queue-1,queue-2'
        # name of the Azure Service Bus namespace
        - name: AZURE_NAMESPACE_NAME
          value: 'my-servicebus-namespace'
        # name of the resource group
        - name: RESOURCE_GROUP
          value: 'rg-azure-servicebus'
        # target state for the queues
        - name: ACTION
          value: 'disabled'
        - name: TOTAL_CHAOS_DURATION
          value: '60'
```
