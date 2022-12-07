---
id: azure-instance-memory-hog
title: Azure Instance Memory Hog
---

## Introduction

- Azure Instance Memory Hog contains chaos to disrupt the state of infra resources. The fault can induce stress chaos on Azure Instance using Azure Run Command, this is carried out by using bash scripts which are in-built in the fault for the given chaos scenario.
- It causes Memory Hog chaos on Azure Instance using an bash script for a certain chaos duration.

:::tip Fault execution flow chart
![Azure Instance Memory Hog](./static/images/azure-instance-memory-hog.png)
:::

## Uses

### Uses of the experiment

:::info

- The fault causes memory hog/stress on the target Azure Instance(s). The idea of this fault is to simulate issues when there is lack of memory for other runnning processes/applications resulting into degrading their performance.
- Injecting a rogue process into a target Azure instance, we starve the main processes/applications (typically pid 1) of the resources allocated to it (where limits are defined) causing slowness in application traffic or in other cases unrestrained use can cause instance to exhaust resources leading to degradation in performance of processes/applications present on the instance. So this category of chaos fault helps to build the immunity on the application undergoing any such stress scenario.

:::

## Prerequisites

:::info

### Verify the prerequisites

- Ensure that Kubernetes Version >= 1.17

**Azure Access Requirement:**

- Ensure that Azure Run Command agent is installed and running in the target Azure instance.
- We will use Azure [file-based authentication](https://docs.microsoft.com/en-us/azure/developer/go/azure-sdk-authorization#use-file-based-authentication) to connect with the instance using Azure GO SDK in the fault. For generating auth file run `az ad sp create-for-rbac --sdk-auth > azure.auth` Azure CLI command.
- Ensure to create a Kubernetes secret having the auth file created in the step in `CHAOS_NAMESPACE`. A sample secret file looks like:

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

- If you change the secret key name (from `azure.auth`) please also update the `AZURE_AUTH_LOCATION` ENV value in the ChaosExperiment CR with the same name.

:::

## Default Validations

:::info

- Azure instance should be in healthy state.

:::

## Fault Tunables

<details>
<summary>Check the Fault Tunables</summary>
<h2>Mandatory Fields</h2>
<table>
    <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
    </tr>
    <tr>
        <td> AZURE_INSTANCE_NAMES </td>
        <td> Names of the target Azure instances </td>
        <td> Multiple values can be provided as comma-separated string. Eg: instance-1,instance-2 </td>
    </tr>
    <tr>
        <td> RESOURCE_GROUP </td>
        <td> The Azure Resource Group name where the instances has been created </td>
        <td> All the instances must be from the same resource group </td>
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
        <td> The total time duration for chaos injection (sec) </td>
        <td> Defaults to 30s </td>
    </tr>
    <tr>
        <td> CHAOS_INTERVAL </td>
        <td> The interval (in sec) between successive chaos injection</td>
        <td> Defaults to 60s </td>
    </tr>
    <tr>
        <td> AZURE_AUTH_LOCATION </td>
        <td> Provide the name of the Azure secret credentials files</td>
        <td> Defaults to <code>azure.auth</code> </td>
    </tr>
    <tr>
        <td> SCALE_SET </td>
        <td> Whether the Instance are part of ScaleSet or not. It can be either disable or enable</td>
        <td> Defaults to <code>disable</code> </td>
    </tr>
    <tr>
        <td> MEMORY_CONSUMPTION </td>
        <td> The amount of memory to be hogged in the Azure instance in terms of mega bytes </td>
        <td> Defaults to 500MB </td>
    </tr>
    <tr>
        <td> MEMORY_PERCENTAGE </td>
        <td> The amount of memory to be hogged in the Azure instance in terms of percentage</td>
        <td> Defaults to 0 </td>
    </tr>
    <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> The number of workers used to run the stress process </td>
        <td> Defaults to 1 </td>
    </tr>
    <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple instance</td>
        <td> Default value: parallel. Supported: serial, parallel </td>
    </tr>
    <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> eg: 30 </td>
    </tr>
</table>

</details>

## Fault Examples

### Common Fault Tunables

Refer the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### MEMORY CONSUMPTION IN MEGABYTES

It defines the memory value to be utilised in megabytes on the Azure instance. It can be tuned via `MEMORY_CONSUMPTION` ENV.

Use the following example to tune this:

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

### MEMORY CONSUMPTION BY PERCENTAGE

It defines the memory percentage value to be utilised on the Azure instance. It can be tuned via `MEMORY_PERCENTAGE` ENV.

Use the following example to tune this:

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

### MULTIPLE Azure INSTANCES

Multiple Azure instances can be targeted in one chaos run. It can be tuned via `AZURE_INSTANCE_NAMES` ENV.

Use the following example to tune this:

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

### MULTIPLE WORKERS

It defines the CPU threads to be run to spike the memory utilisation, this will increase the growth of memory consumption. It can be tuned via `NUMBER_OF_WORKERS` ENV.

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
