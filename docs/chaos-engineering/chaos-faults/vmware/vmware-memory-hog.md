---
id: VMware-memory-hog
title: VMware memory hog
---

VMware memory hog fault consumes excessive memory resources on Linux OS based VMware VMs.
- It determines the performance of the application running on the VMware VMs.


![VMware Memory Hog](./static/images/vmware-memory-hog.png)

## Usage

<details>
<summary>View the uses of the fault</summary>
<div>
This fault helps determine how resilient an application is when excessive memory is unexpectedly consumed by resources.
</div>
</details>


## Prerequisites
- Kubernetes > 1.16
- Execution plane is connected to vCenter and the hosts on port 443. 
- VMware tool is installed on the target VM with remote execution enabled.
- Adequate vCenter permissions to access the hosts and the VMs.
- Create a Kubernetes secret that has the Vcenter credentials in the `CHAOS_NAMESPACE`. Below is a sample secret file:

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

### Note
You can pass the VM credentials as secrets or as a `ChaosEngine` environment variable.

## Default validations
The VM should be in a healthy state.

## Fault tunables
<details>
    <summary>Fault tunables</summary>
    <h2>Mandatory fields</h2>
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
    <h2>Optional fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
     <tr>
        <td> MEMORY_CONSUMPTION_MEBIBYTES </td>
        <td> Amount of memory consumed by VMware VMs (in MiB). </td>
        <td> For example, <code>4024</code>.</td>
      </tr>
      <tr>
        <td> MEMORY_CONSUMPTION_PERCENTAGE </td>
        <td> Amount of total memory to be consumed (in percentage). </td>
        <td> Default to 100. </td>
      </tr>
      <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> Number of workers used to run the stress process. </td>
        <td> Defaults to 4. </td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive instance terminations (in seconds). </td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple instances. </td>
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

### Memory consumption in mebibytes
It defines the memory consumed by the target VM in mebibytes (MiB) for a duration specified by `TOTAL_CHAOS_DURATION` environment variable. You can tune it using the `MEMORY_CONSUMPTION_MEBIBYTES` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-memory-hog/vm-memory-hog-memoryconsumption.yaml yaml)
```yaml
# Memory hog in the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: VMware-memory-hog
      spec:
        components:
          env:
            # Name of the VM
            - name: VM_NAME
              value: 'test-vm-01'
            # memory consumption value
            - name: MEMORY_CONSUMPTION_MEBIBYTES
              value: '500'
```

### Workers for stress
It specifies the worker's count for stress. You can tune it using the `NUMBER_OF_WORKERS` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-memory-hog/vm-memory-hog-worker.yaml yaml)
```yaml
# Memory hog in the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: VMware-memory-hog
      spec:
        components:
          env:
            # Name of the VM
            - name: VM_NAME
              value: 'test-vm-01'
            # Number of workers for stress
            - name: NUMBER_OF_WORKERS
              value: '4'
```
