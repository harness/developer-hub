---
id: azure-instance-io-stress
title: Azure instance IO stress
---

Azure instance I/O stress disrupts the state of infra resources. 
- This fault induces stress on the Azure instance using the Azure `Run` command. The Azure `Run` command is executed using the in-built bash scripts within the fault.
- It causes I/O stress on the Azure Instance using the bash script for a specific duration.

![Azure Instances IO Stress](./static/images/azure-instance-io-stress.png)

## Use cases
Azure instance I/O stress:
- Determines the resilience of an Azure instance when unexpected stress is applied on the I/O sources. 
- Determines how Azure scales the resources to maintain the application under stress. 
- Simulates slower disk operations by the application.
- Simulates noisy neighbour problems by hogging the disk bandwidth. 
- Verifies the disk performance on increasing I/O threads and varying I/O block sizes. 
- Checks whether or not the application functions under high disk latency conditions.
- Checks whether or not the application functions under high I/O traffic, and large I/O blocks.
- Checks if other services monopolize the I/O disks during stress. 

:::note
- Kubernetes >= 1.17 is required to execute this fault.
- Azure Run Command agent is installed and running in the target Azure instance.
- Azure instance should be in a healthy state.
- Use Azure [file-based authentication](https://docs.microsoft.com/en-us/azure/developer/go/azure-sdk-authorization#use-file-based-authentication) to connect to the instance using Azure GO SDK. to generate the auth file, run `az ad sp create-for-rbac --sdk-auth > azure.auth` Azure CLI command.
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
        <td> Multiple values can be provided as a comma-separated string. For example, <code>instance-1,instance-2</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-stop#stop-instances-by-name"> stop instance by name. </a></td>
    </tr>
    <tr>
        <td> RESOURCE_GROUP </td>
        <td> The Azure Resource Group name where the instances will be created. </td>
        <td> All the instances must be from the same resource group. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-io-stress#multiple-workers"> resource group field in the YAML file. </a></td>
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
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
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
        <td> INSTALL_DEPENDENCIES </td>
        <td> Install dependencies to run I/O stress. </td>
        <td> Defaults to <code>true</code>. Also supports <code>false</code>. </td>
    </tr>
    <tr>
        <td> FILESYSTEM_UTILIZATION_PERCENTAGE </td>
        <td> Specify the size as a percentage of free space on the file system.</td>
        <td> Defaults to 0 %, which results in 1 GB utilization. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-io-stress#file-system-utilization-in-percentage"> file system utilization in percentage. </a></td>
    </tr>
    <tr>
        <td> FILESYSTEM_UTILIZATION_BYTES </td>
        <td> Specify the size of the files used per worker (in GB). <code>FILESYSTEM_UTILIZATION_PERCENTAGE</code> and <code>FILESYSTEM_UTILIZATION_BYTES</code> are mutually exclusive. If both are specified, <code>FILESYSTEM_UTILIZATION_PERCENTAGE</code> takes precedence. </td>
        <td> Defaults to 0 GB, which results in 1 GB utilization. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-io-stress#file-system-utilization-in-gigabytes"> file system utilization in gigabytes. </a></td>
    </tr>
    <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> Number of I/O workers involved in I/O disk stress. </td>
        <td> Default to 4. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-io-stress#multiple-workers"> multiple workers. </a></td>
    </tr>
    <tr>
        <td> VOLUME_MOUNT_PATH </td>
        <td> Location that points to the volume mount path used in I/O stress.</td>
        <td> Defaults to the user HOME directory. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/azure/azure-instance-io-stress#volume-mount-path"> volume mount path. </a></td>
    </tr>
    <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target pods.</td>
        <td> Defaults to <code>parallel</code>. Also supports <code>serial</code> sequence. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
    </tr>
    <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time.</a></td>
    </tr>
</table>


### File system utilization in gigabytes

It specifies the size of file utilised by the Azure instance (in gigabytes). Tune it by using the `FILESYSTEM_UTILIZATION_BYTES` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-io-stress/filesystem-bytes.yaml yaml)
```yaml
# filesystem bytes to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-io-stress
    spec:
      components:
        env:
        - name: FILESYSTEM_UTILIZATION_BYTES
          VALUE: '1024'
        # name of the Azure instance
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-1'
        # resource group for the Azure instance
        - name: RESOURCE_GROUP
          value: 'rg-azure'
```

### File system utilization in percentage
It specifies the size of files utilised on the Azure instance (in percentage). Tune it by using the `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-io-stress/filesystem-percentage.yaml yaml)
```yaml
# filesystem percentage to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-io-stress
    spec:
      components:
        env:
        - name: FILESYSTEM_UTILIZATION_PERCENTAGE
          VALUE: '50'
        # name of the Azure instance
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-1'
        # resource group for the Azure instance
        - name: RESOURCE_GROUP
          value: 'rg-azure'
```

### Multiple workers

It specifies the CPU threads that will be run to spike the file system utilisation. As a consequence, it increases file system consumption. Tune it by using the `NUMBER_OF_WORKERS` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-io-stress/multiple-workers.yaml yaml)
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
  - name: azure-instance-io-stress
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

### Volume mount path

It specifies the location that points to the volume mount path used in I/O stress with respect to the Azure instance. Tune it by using the `VOLUME_MOUNT_PATH` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/azure-instance-io-stress/volume-path.yaml yaml)
```yaml
# volume path to be used for io stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: azure-instance-io-stress
    spec:
      components:
        env:
        - name: VOLUME_MOUNT_PATH
          VALUE: '/tmp'
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

[embedmd]:# (./static/manifests/azure-instance-io-stress/multiple-instances.yaml yaml)
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
  - name: azure-instance-io-stress
    spec:
      components:
        env:
        - name: MEMORY_CONSUMPTION
          VALUE: '1024'
        # names of the Azure instance
        - name: AZURE_INSTANCE_NAMES
          value: 'instance-1,instance-2'
        # resource group for the Azure instance
        - name: RESOURCE_GROUP
          value: 'rg-azure'
```
