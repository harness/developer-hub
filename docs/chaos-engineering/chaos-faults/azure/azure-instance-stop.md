---
id: azure-instance-stop
title: Azure instance stop
---
Azure instance stop powers off from an Azure instance during a specific duration.
- It checks the performance of the application (or process) running on the instance.

![Azure Instance Stop](./static/images/azure-instance-stop.png)

## Usage

<details>
<summary>View fault usage</summary>
<div>
This fault determines the resilience of an application to unexpected power-off of the Azure instances. It determines how the application handles the requests and how quickly it recovers from such failures.
</div>
</details>

## Prerequisites

- Kubernetes > 1.16.
- Azure access to stop and start the an instance. 
- Use Azure [ file-based authentication ](https://docs.microsoft.com/en-us/azure/developer/go/azure-sdk-authorization#use-file-based-authentication) to connect to the instance using Azure GO SDK in the experiment. To generate the auth file, run `az ad sp create-for-rbac --sdk-auth > azure.auth` Azure CLI command.
- Create a Kubernetes secret that has the auth file created in the previous step in the `CHAOS_NAMESPACE`. Below is a sample secret file:

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
- If you change the secret key name (from `azure.auth`), ensure that you update the `AZURE_AUTH_LOCATION` environment variable in the chaos experiment with the new name.

## Default validations

Azure instance should be in a healthy state.

## Fault tunables
<details>
<summary>Fault tunables</summary>
    <h2>Mandatory Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> AZURE_INSTANCE_NAME </td>
        <td> Name of the target Azure instance. </td>
        <td> For AKS nodes, the instance name is from the scale set section in Azure and not the node name from AKS node pool </td>
      </tr>
      <tr>
        <td> RESOURCE_GROUP </td>
        <td> The name of the resource group for the target instance.</td>
        <td> For example, <code>TeamDevops</code>. </td>
      </tr>
    </table>
    <h2>Optional Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> SCALE_SET </td>
        <td> Whether instance is part of Scale set</td>
        <td> Accepts "enable"/"disable". Default is "disable"</td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive instance power offs.</td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target instances. </td>
        <td> Defaults to parallel. Supports serial sequence as well. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. </td>
      </tr>
    </table>
</details>

## Fault examples

### Common fault tunables

Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Stop instances by name

It has a comma-separated list of instance names that are subject to chaos. You can tune it using the `AZURE_INSTANCE_NAME` environment variable.

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

It has a comma-separated list of instance names that belong to Scale Set or AKS which are subject to chaos. You can tune it using the `SCALE_SET` environment variable.

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
