---
id: VMware-disk-loss
title: VMware disk loss
---

VMware disk loss detaches the disks that are attached to a Linux OS based VMware VM.

![VMware Disk Loss](./static/images/VMware-disk-loss.png)

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

## Default validations
- The VM should be in a healthy state.
- The target disks should be attached to the VM.


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
        <td> APP_VM_MOIDS </td>
        <td> Once you open the VM in vCenter WebClient, you can find MOID in the address field (VirtualMachine:vm-5365). You can also use the CLI to fetch the MOID. </td>
        <td> For example, vm-5365. </td>
      </tr>
      <tr>
        <td> VIRTUAL_DISK_NAMES </td>
        <td> Name of the target disks provided as comma-separated values. </td>
        <td> For example, <code>disk-1.vmdk,disk-2.vmdk</code>. </td>
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
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive instance terminations (in seconds).</td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple instances. </td>
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

### Virtual disk names
It contains the name of the target disks attached to a particular VM. You can tune it using the `VIRTUAL_DISK_NAMES` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/VMware-disk-loss/vm-disk-loss-diskname.yaml yaml)
```yaml
# Disk loss in the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: VMware-disk-loss
    spec:
      components:
        env:
        # Name of the VM
        - name: APP_VM_MOIDS
          value: 'vm-2055'
        # Name of target disk
        - name: VIRTUAL_DISK_NAMES
          value: 'disk-1.vmdk'
```

