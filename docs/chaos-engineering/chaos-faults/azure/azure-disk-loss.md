---
id: azure-disk-loss
title: Azure disk loss
---
Azure disk loss detaches the virtual disk from an Azure instance. 
- After a specific duration, the virtual disk is re-attached to the instance. 
- This fault checks the performance of the application (or process) running on the instance.

![Azure Disk Loss](./static/images/azure-disk-loss.png)

## Use cases
Azure disk loss:
- Determines the resilience of an application to unexpected disk detachment. 
- Determines how quickly the Azure instance recovers from such failures. 

:::note
- Kubernetes > 1.16 is required to execute this fault.
- Appropriate Azure access to detach and attach a disk.
- Azure disk should be connected to an instance.
- Use Azure [file-based authentication](https://docs.microsoft.com/en-us/azure/developer/go/azure-sdk-authorization#use-file-based-authentication) to connect to the instance using Azure GO SDK. To generate auth file, run `az ad sp create-for-rbac --sdk-auth > azure.auth` Azure CLI command.
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
            <td> VIRTUAL_DISK_NAMES </td>
            <td> Name of the virtual disks to target.</td>
            <td> Provide comma-separated names for multiple disks. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-disk-loss#detach-virtual-disks-by-name"> detach virtual disks by name.</a></td>
        </tr>
        <tr>
            <td> RESOURCE_GROUP </td>
            <td> Name of the resource group for the target disk(s). </td>
            <td> For example, <code>TeamDevops</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-disk-loss#detach-virtual-disks-by-name"> resource group field in the YAML file. </a></td>
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
            <td> Checks if the disk is connected to scale set instance.</td>
            <td> Defaults to disable. Also supports <code>enable</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-disk-loss#detach-virtual-disks-attached-to-scale-set-instances-by-name"> scale set instances.</a></td>
        </tr>
        <tr>
            <td> TOTAL_CHAOS_DURATION </td>
            <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
            <td> Defaults to 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos.</a></td>
        </tr>
        <tr>
            <td> CHAOS_INTERVAL </td>
            <td> Time interval between two successive instance poweroffs (in seconds). </td>
            <td> Defaults to 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#chaos-interval"> chaos interval.</a></td>
        </tr>
        <tr>
            <td> SEQUENCE </td>
            <td> Sequence of chaos execution for multiple target pods.</td>
            <td> Defaults to parallel. Also supports <code>serial</code> sequence. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injecting chaos (in seconds). </td>
            <td> For example, 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time.</a></td>
        </tr>
    </table>

### Detach virtual disks by name

It specifies a comma-separated list of disk names that are subject to disk loss. Tune it by using the `VIRTUAL_DISK_NAMES` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-disk-loss/azure-disks.yaml yaml)
```yaml
# detach multiple Azure disks by their names
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-disk-loss
    spec:
      components:
        env:
        # comma separated names of the Azure disks attached to VMs
        - name: VIRTUAL_DISK_NAMES
          value: 'disk-01,disk-02'
        # name of the resource group
        - name: RESOURCE_GROUP
          value: 'rg-azure-disks'
```

### Detach virtual disks attached to scale set instances by name

It specifies a comma-separated list of disk names attached to Scale Set instances subject to disk loss. Tune it by using the `VIRTUAL_DISK_NAMES` and `SCALE_SET` environment variables, respectively.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-disk-loss/azure-scale-set-disk.yaml yaml)
```yaml
# detach multiple Azure disks attached to scale set VMs by their names
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-disk-loss
    spec:
      components:
        env:
        # comma separated names of the Azure disks attached to scaleset VMs
        - name: VIRTUAL_DISK_NAMES
          value: 'disk-01,disk-02'
        # name of the resource group
        - name: RESOURCE_GROUP
          value: 'rg-azure-disks'
        # VM belongs to scaleset or not
        - name: SCALE_SET
          value: 'enable'
```
