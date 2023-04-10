---
id: azure-instance-memory-hog
title: Azure instance memory hog
---

Azure instance memory hog disrupts the state of infrastructure resources. 
- It induces stress on the Azure Instance using the Azure `Run` command. The Azure `Run` command is executed using the in-built bash scripts within the fault.
- It utilizes memory in excess on the Azure Instance using the bash script for a specific duration.

![Azure Instance Memory Hog](./static/images/azure-instance-memory-hog.png)

## Use cases
Azure instance memory hog:
- Determines the resilience of an Azure instance when memory resources are unexpectedly utilized in excess. 
- Determines how Azure scales the memory to maintain the application when resources are consumed heavily. 
- Simulates the situation of memory leaks in the deployment of microservices.
- Simulates a slowed application caused by lack of memory.
- Simulates noisy neighbour problems due to hogging. 
- Verifies pod priority and QoS setting for eviction purposes. 
- Verifies application restarts on OOM (out of memory) kills.

:::note
- Kubernetes >= 1.17 is required to execute this fault.
- Azure Run Command agent is installed and running in the target Azure instance.
- Azure instance should be in a healthy state.
- Use Azure [file-based authentication](https://docs.microsoft.com/en-us/azure/developer/go/azure-sdk-authorization#use-file-based-authentication) to connect to the instance using Azure GO SDK. To generate the auth file ,run `az ad sp create-for-rbac --sdk-auth > azure.auth` Azure CLI command.
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
- If you change the secret key name from `azure.auth` to a new name, ensure that you update the `AZURE_AUTH_LOCATION` environment variable in the chaos experiment with the new name.
:::

## Fault tunables

<h3>Mandatory fields</h3>
<table>
    <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
    </tr>
    <tr>
        <td> AZURE_INSTANCE_NAMES </td>
        <td> Names of the target Azure instances. </td>
        <td> Multiple values can be provided as a comma-separated string. For example, <code>instance-1,instance-2. </code> For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-stop#stop-instances-by-name"> stop instance by name.</a></td>
    </tr>
    <tr>
        <td> RESOURCE_GROUP </td>
        <td> The Azure Resource Group name where the instances will be created. </td>
        <td> All the instances must be from the same resource group. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-memory-hog#multiple-workers"> resource group field in the YAML file. </a></td>
    </tr>
</table>
<h3>Optional fields</h3>
<table>
    <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
    </tr>
    <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
        <td> Defaults to 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos.</a></td>
    </tr>
    <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive container kills (in seconds).</td>
        <td> Defaults to 60s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#chaos-interval"> chaos interval.</a></td>
    </tr>
    <tr>
        <td> AZURE_AUTH_LOCATION </td>
        <td> Name of the Azure secret credentials files.</td>
        <td> Defaults to <code>azure.auth</code>. </td>
    </tr>
    <tr>
        <td> SCALE_SET </td>
        <td> Check if the instance is a part of Scale Set.</td>
        <td> Defaults to <code>disable</code>. Also supports <code>enable</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-stop#stop-scale-set-instances"> scale set instances. </a></td>
    </tr>
    <tr>
        <td> MEMORY_CONSUMPTION </td>
        <td> Amount of memory to be consumed in the Azure instance (in megabytes). </td>
        <td> Defaults to 500 MB. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-memory-hog#memory-consumption-in-megabytes"> memory consumption in megabytes. </a></td>
    </tr>
    <tr>
        <td> MEMORY_PERCENTAGE </td>
        <td> Amount of memory to be consumed in the Azure instance (in percentage). </td>
        <td> Defaults to 0. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-memory-hog#memory-consumption-in-percentage"> memory consumption in percentage. </a></td>
    </tr>
    <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> Number of workers used to run the stress process. </td>
        <td> Defaults to 1. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-memory-hog#multiple-workers"> multiple workers. </a></td>
    </tr>
    <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target instances. </td>
        <td> Defaults to parallel. Also supports <code>serial</code> sequence. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
    </tr>
    <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time.</a></td>
    </tr>
</table>


### Memory consumption in megabytes

It specifies the memory utilised (in MB) on the Azure instance. Tune it by using the `MEMORY_CONSUMPTION` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-memory-hog/memory-bytes.yaml yaml)
```yaml
# memory in mb to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-memory-hog
    spec:
      components:
        env:
        - name: MEMORY_CONSUMPTION
          VALUE: '1024'
        # name of the Azure instance
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-1'
        # resource group for the Azure instance
        - name: RESOURCE_GROUP
          value: 'rg-azure'
```

### Memory consumption in percentage

It specifies the memory utilised (in percentage) on the Azure instance. Tune it by using the `MEMORY_PERCENTAGE` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-memory-hog/memory-percentage.yaml yaml)
```yaml
# memory percentage to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-memory-hog
    spec:
      components:
        env:
        - name: MEMORY_PERCENTAGE
          VALUE: '50'
        # name of the Azure instance
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-1'
        # resource group for the Azure instance
        - name: RESOURCE_GROUP
          value: 'rg-azure'
```

### Multiple Azure instances

It specifies comma-separated Azure instance names that are subject to chaos in a single run. Tune it by using the `AZURE_INSTANCE_NAMES` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-memory-hog/multiple-instances.yaml yaml)
```yaml
# mutilple instance targets
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-memory-hog
    spec:
      components:
        env:
        # names of the Azure instance
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-1,instance-2'
        # resource group for the Azure instance
        - name: RESOURCE_GROUP
          value: 'rg-azure'
```

### Multiple workers

It specifies the CPU threads that are run to spike the memory utilisation. As a consequence, this increases the memory consumption. Tune it by using the `NUMBER_OF_WORKERS` environment variable..

Use the following example to tune this:

[embedmd]:# (./static/manifests/azure-instance-memory-hog/multiple-workers.yaml yaml)
```yaml
# multiple workers to utilize resources
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-memory-hog
    spec:
      components:
        env:
        - name: NUMBER_OF_WORKERS
          VALUE: '3'
        # name of the Azure instance
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-1'
        # resource group for the Azure instance
        - name: RESOURCE_GROUP
          value: 'rg-azure'
```
