---
id: VMware-process-kill
title: VMware process kill
---

VMware process kill kills the target processes that are running as a part of a Linux OS based VMware VM.
- It helps determine the resilience of an application (or process) running on the VMware VMs.

![VMware Process kill](./static/images/vmware-process-kill.png)


## Usage
<details>
<summary>View fault usage</summary>
<div>
This fault disrupts critical processes running within the application, such as databases or message queues. These services may be running in the VMware VM, and this fault kills their underlying processes or threads. Such faults help determine how efficiently and quickly the VMware instance recovers from the unexpected disruption.
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
- The VM should be in a healthy state.
- The target processes should exist inside the VM.


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
        <td> Name of the VM where the target processes reside. </td>
        <td> For example, <code>ubuntu-vm-1</code>. </td>
      </tr>
      <tr>
        <td> PROCESS_IDS </td>
        <td> Process IDs of the target processes that are provided as comma-separated values. </td>
        <td> For example, <code>183,253,857</code>. </td>
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
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Defaults to 30s. </td>
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

### Process IDs
It contains the target process IDs running on a particular VM. You can tune it using the `PROCESS_IDS` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-process-kill/VMware-process-kill.yaml yaml)
```yaml
# Process kill in the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: VMware-process-kill
      spec:
        components:
          env:
            # Name of the VM
            - name: VM_NAME
              value: 'test-vm-01'
            # List of Process IDs
            - name: PROCESS_IDS
              value: '8688,4678'
```
