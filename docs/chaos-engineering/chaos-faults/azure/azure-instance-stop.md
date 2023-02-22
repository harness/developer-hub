---
id: azure-instance-stop
title: Azure instance stop
---
Azure instance stop powers off from an Azure instance for a specific duration. It checks the performance of the application or process running on the instance.

![Azure Instance Stop](./static/images/azure-instance-stop.png)

## Use cases
Azure instance stop:
- Determines the resilience of an application to unexpected power off of the Azure instances. 
- Determines how the application handles the requests and how quickly it recovers from such failures.

:::note
- Kubernetes > 1.16 is required to execute this fault.
- Appropriate Azure access to start and stop an instance.
- Azure instance should be in a healthy state.
- Use Azure [ file-based authentication ](https://docs.microsoft.com/en-us/azure/developer/go/azure-sdk-authorization#use-file-based-authentication) to connect to the instance using Azure GO SDK in the experiment. To generate the auth file, run `az ad sp create-for-rbac --sdk-auth > azure.auth` Azure CLI command.
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
        <td> Name of the target Azure instance. </td>
        <td> For AKS nodes, the instance name is from the Scale Set in Azure and not the node name from AKS node pool. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-stop#stop-instances-by-name"> stop instance by name. </a></td>
      </tr>
      <tr>
        <td> RESOURCE_GROUP </td>
        <td> The name of the resource group for the target instance.</td>
        <td> For example, <code>TeamDevops</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-stop#stop-instances-by-name"> resource group field in the YAML file. </a></td>
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
        <td> SCALE_SET </td>
        <td> Whether instance is part of Scale set</td>
        <td> Accepts "enable"/"disable". Default is "disable" For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-stop#stop-scale-set-instances"> scale set instances. </a></td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Defaults to 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos.</a></td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive instance power offs (in seconds).</td>
        <td> Defaults to 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#chaos-interval"> chaos interval.</a></td>
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

### Stop instances by name

It specifies a comma-separated list of instance names subject to chaos. Tune it by using the `AZURE_INSTANCE_NAME` environment variable.

You can use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-stop/azure-instance.yaml yaml)
```yaml
## contains the Azure instance details
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-stop
    spec:
      components:
        env:
        # comma separated list of Azure instance names
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-01,instance-02'
        # name of the resource group
        - name: RESOURCE_GROUP
          value: 'rg-azure'
```

### Stop scale set instances

It specifies a comma-separated list of instance names that belong to Scale Set or AKS which are subject to chaos. Tune it by using the `SCALE_SET` environment variable.

You can use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-stop/azure-scale-set-instance.yaml yaml)
```yaml
## contains the Azure instance details for scale set instances or AKS nodes
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-stop
    spec:
      components:
        env:
        # comma separated list of Azure instance names
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-01,instance-02'
        # name of the resource group
        - name: RESOURCE_GROUP
          value: 'rg-azure'
        # accepts enable/disable value. default is disable
        - name: SCALE_SET
          value: 'enable'
```
