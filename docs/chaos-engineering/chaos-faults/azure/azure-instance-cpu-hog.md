---
id: azure-instance-cpu-hog
title: Azure instance CPU hog
---

Azure instance CPU hog disrupts the state of infrastructure resources. 
- This fault induces stress on the Azure instance using the Azure Run Command. This command is executed using the bash scripts that are in-built in the fault.
- It utilizes the CPU in excess on the Azure instance using the bash script for a specific duration.

![Azure Instance CPU Hog](./static/images/azure-instance-cpu-hog.png)

## Usage

<details>
<summary>View fault usage</summary>
<div>
This fault determines the resilience of an Azure instance when CPU resources are utilized in excess, unexpectedly. It determines how Azure scales the CPU resources to maintain the application when it is under stress. 
</div>
</details>

## Prerequisites

- Kubernetes >= 1.17
- Azure Run Command agent is installed and running in the target Azure instance.
- Use Azure [file-based authentication](https://docs.microsoft.com/en-us/azure/developer/go/azure-sdk-authorization#use-file-based-authentication) to connect to the instance using Azure GO SDK. To generate the auth file, run `az ad sp create-for-rbac --sdk-auth > azure.auth` Azure CLI command.
- Create a Kubernetes secret that contains the auth file created in the previous step in the `CHAOS_NAMESPACE`. Below is a sample secret file:

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
            <td> AZURE_INSTANCE_NAMES </td>
            <td> Names of the target Azure instances. </td>
            <td> Multiple values can be provided as comma-separated strings. For example, instance-1,instance-2. </td>
        </tr>
        <tr>
            <td> RESOURCE_GROUP </td>
            <td> The Azure Resource Group name where the instances will be created. </td>
            <td> All the instances must be from the same resource group. </td>
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
            <td> TOTAL_CHAOS_DURATION </td>
            <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
            <td> Defaults to 30s. </td>
        </tr>
        <tr>
            <td> CHAOS_INTERVAL </td>
            <td> Time interval between two successive container kills (in seconds).</td>
            <td> Defaults to 60s. </td>
        </tr>
        <tr>
          <td> AZURE_AUTH_LOCATION </td>
          <td> Name of the Azure secret credentials files</td>
          <td> Defaults to <code>azure.auth</code>. </td>
        </tr>
        <tr>
            <td> SCALE_SET </td>
            <td> Check if the instance is a part of Scale Set.</td>
            <td> Defaults to <code>disable</code>. Supports enable as well. </td>
        </tr>
        <tr>
            <td> INSTALL_DEPENDENCIES </td>
            <td> Install dependencies to run the chaos. </td>
            <td> Defaults to true. Supports false as well.</td>
        </tr>
        <tr>
            <td> CPU_CORE </td>
            <td> Number of CPU cores that will be subject to stress.</td>
            <td> Defaults to 0. </td>
        </tr>
        <tr>
            <td> CPU_LOAD </td>
            <td> Percentage load exerted on a single CPU core. </td>
            <td> Defaults to 100. </td>
        </tr>
        <tr>
            <td> SEQUENCE </td>
            <td> Sequence of chaos execution for multiple target pods.</td>
            <td> Defaults to parallel. Supports serial sequence as well. </td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injecting chaos (in seconds).</td>
            <td> For example, 30s. </td>
        </tr>
    </table>
</details>

## Fault examples

### Common fault tunables

Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### CPU core

It defines the CPU core value that is utilised on the Azure instance. You can tune it using the `CPU_CORE` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-cpu-hog/cpu-core.yaml yaml)
```yaml
# CPU cores to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-cpu-hog
    spec:
      components:
        env:
        - name: CPU_CORE
          VALUE: '2'
        # name of the Azure instance
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-1'
        # resource group for the Azure instance
        - name: RESOURCE_GROUP
          value: 'rg-azure'
```

### CPU percentage

It defines the CPU percentage value that is utilised on the Azure instance. You can tune it using the `CPU_LOAD` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-cpu-hog/cpu-percentage.yaml yaml)
```yaml
# CPU percentage to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-cpu-hog
    spec:
      components:
        env:
        - name: CPU_LOAD
          VALUE: '50'
        # name of the Azure instance
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-1'
        # resource group for the Azure instance
        - name: RESOURCE_GROUP
          value: 'rg-azure'
```

### Multiple Azure instances

Multiple Azure instances can be targeted in a single chaos run. You can tune it using the `AZURE_INSTANCE_NAMES` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-cpu-hog/multiple-instances.yaml yaml)
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
  - name: azure-instance-cpu-hog
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

### CPU core with percentage consumption

It defines the number of CPU cores that will be utilised (in percentage) by the Azure instance. You can tune it using the `CPU_CORE` and `CPU_LOAD` environment variables, respectively.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-cpu-hog/cpu-core-with-percentage.yaml yaml)
```yaml
# CPU core with percentage to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-cpu-hog
    spec:
      components:
        env:
        - name: CPU_CORE
          VALUE: '2'
        - name: CPU_LOAD
          VALUE: '50'
        # name of the Azure instance
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-1'
        # resource group for the Azure instance
        - name: RESOURCE_GROUP
          value: 'rg-azure'
```
