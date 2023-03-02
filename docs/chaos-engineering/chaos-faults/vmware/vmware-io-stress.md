---
id: VMware-io-stress
title: VMware IO stress
---
VMware IO stress causes disk stress on the target VMware VMs. It aims to verify the resilience of applications that share this disk resource with the VM. 

![VMware IO Stress](./static/images/vmware-io-stress.png)

## Use cases

- VMware IO stress determines the resilience of an application to unexpected spikes in resources. 
- It determines how well an application handles unexpected I/O stress.
- It simulates slower disk operations by the application.
- It simulates noisy neighbour problems by hogging the disk bandwidth. 
- It verifies the disk performance on increasing I/O threads and varying I/O block sizes.
- It checks whether the application functions well under high disk latency conditions.
- It checks for high I/O traffic that includes large I/O blocks, and in what cases other services monopolize the I/O disks. 

:::note
- Kubernetes > 1.16 is required to execute this fault.
- Execution plane should be connected to vCenter and host vCenter on port 443.
- The VM should be in a healthy state before and after injecting chaos.
- VMware tool should be installed on the target VM with remote execution enabled.
- Appropriate vCenter permissions should be provided to access the hosts and the VMs.
- Kubernetes secret has to be created that has the Vcenter credentials in the `CHAOS_NAMESPACE`. VM credentials can be passed as secrets or as a `ChaosEngine` environment variable. Below is a sample secret file:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: vcenter-secret
  namespace: litmus
type: Opaque
stringData:
    VCENTERSERVER: XXXXXXXXXXX
    VCENTERUSER: XXXXXXXXXXXXX
    VCENTERPASS: XXXXXXXXXXXXX
```
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
        <td> VM_NAME </td>
        <td> Name of the target VM. </td>
        <td> For example, <code>ubuntu-vm-1</code>. </td>
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
        <td> FILESYSTEM_UTILIZATION_PERCENTAGE </td>
        <td> Specify the size as a percentage of free space on the file system. </td>
        <td> For example, <code>40</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/VMware-io-stress#filesystem-utilization-percentage"> file system utilization percentage.</a></td>
      </tr>   
       <tr>
        <td> FILESYSTEM_UTILIZATION_BYTES </td>
        <td> Specify the size in gigabytes(GB). FILESYSTEM_UTILIZATION_PERCENTAGE and FILESYSTEM_UTILIZATION_BYTES environment variables are mutually exclusive. If both are provided, FILESYSTEM_UTILIZATION_PERCENTAGE takes precedence. </td>
        <td> For example, <code>100</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/VMware-io-stress#filesystem-utilization-bytes"> file system utilization bytes. </a></td>
      </tr>  
       <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> Number of I/O workers involved in I/O disk stress. </td>
        <td> Defaults to 4. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/VMware-io-stress#workers-for-stress"> workers for stress. </a> </td>
      </tr>
       <tr>
        <td> VOLUME_MOUNT_PATH </td>
        <td> Location that points to the volume mount path used in I/O stress. </td>
        <td> For example, <code>/Users/admin/disk-02</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/VMware-io-stress#mount-path"> mount path.</a></td>
      </tr>   
      <tr>
        <td> CPU_CORES </td>
        <td> Number of CPU cores that are subject to CPU stress.</td>
        <td> Defaults to 1. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/vmware-cpu-hog#cpu_cores"> CPU cores. </a></td>
        </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Defaults to 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos. </a></td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive instance terminations (in seconds). </td>
        <td> Defaults to 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#chaos-interval"> chaos interval. </a></td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
       <td> Sequence of chaos execution for multiple instances. </td>
        <td> Defaults to parallel. Supports serial sequence as well. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time. </a></td>
      </tr>
    </table>


### Filesystem utilization percentage
It specifes the size as a percentage of free space on the file system. Tune it by using the `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable. 

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-io-stress/vm-io-stress-filesystem-utilization-percentage.yaml yaml)
```yaml
# io-stress in the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: VMware-io-stress
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
        # percentage of free space of file system, need to be stressed
        - name: FILESYSTEM_UTILIZATION_PERCENTAGE
          value: '10'
```

### Filesystem utilization bytes
It specifies the amount of free space on the file system in gigabytes(GB). Tune it by using the `FILESYSTEM_UTILIZATION_BYTES` environment variable. `FILESYSTEM_UTILIZATION_BYTES` is mutually exclusive with the `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable. If both `FILESYSTEM_UTILIZATION_PERCENTAGE` and `FILESYSTEM_UTILIZATION_BYTES` environment variables are set, `FILESYSTEM_UTILIZATION_PERCENTAGE` takes precendence.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-io-stress/vm-io-stress-filesystem-utilization-bytes.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: VMware-io-stress
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
        # size of io to be stressed
        - name: FILESYSTEM_UTILIZATION_BYTES
          value: '1' #in GB
```
### Mount path
It specifies the location that points to the volume mount path used in I/O stress. Tune it by using the  `VOLUME_MOUNT_PATH` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-io-stress/vm-io-stress-filesystem-mount-path.yaml yaml)
```yaml
# io-stress in the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: VMware-io-stress
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
        # path need to be stressed/filled
        - name: VOLUME_MOUNT_PATH
          value: '/some-dir-in-container'
        # size of io to be stressed
        - name: FILESYSTEM_UTILIZATION_BYTES
          value: '1' #in GB
```
### Workers for stress
It specifies the worker's count for stress. Tune it by using the `NUMBER_OF_WORKERS` environment variable.
Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-io-stress/vm-io-stress-filesystem-worker.yaml yaml)
```yaml
# io-stress in the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: VMware-io-stress
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
        # number of io workers
        - name: NUMBER_OF_WORKERS
          value: '4'
        # size of io to be stressed
        - name: FILESYSTEM_UTILIZATION_BYTES
          value: '1' #in GB
```
