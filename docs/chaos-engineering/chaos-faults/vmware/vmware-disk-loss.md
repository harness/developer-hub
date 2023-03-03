---
id: VMware-disk-loss
title: VMware disk loss
---

VMware disk loss detaches the disks that are attached to a Linux OS based VMware VM.

![VMware Disk Loss](./static/images/vmware-disk-loss.png)

## Use cases

- VMware disk loss determines the resilience of an application to the unplanned scaling of K8s pods.

:::note
- Kubernetes > 1.16 is required to execute this fault.
- The VM should be in a healthy state before and after injecting chaos.
- The target disks should be attached to the VM.
- Execution plane should be connected to vCenter and host vCenter on port 443. 
- VMware tool should be installed on the target VM with remote execution enabled.
- Appropriate vCenter permissions should be provided to access the hosts and the VMs.
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
        <td> APP_VM_MOIDS </td>
        <td> MOIDs of the VMware instance. After you open the VM in VCenter WebClient, you can find the MOID in the address field (VirtualMachine:vm-5365). Alternatively you can use the CLI to fetch the MOID. </td>
        <td> For example, <code>vm-5365</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/vmware-vm-power-off/#stoppoweroff-the-vm-by-moid"> MOIDs of the VMware instance.</a></td>
      </tr>
      <tr>
        <td> VIRTUAL_DISK_NAMES </td>
        <td> Name of the target disks provided as comma-separated values. </td>
        <td> For example, <code>disk-1.vmdk,disk-2.vmdk</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/VMware-disk-loss#virtual-disk-names"> virtual disk names. </a></td>
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
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
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
        <td> Period to wait before and after injecting chaos (in seconds).</td>
        <td> For example, 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time.</a></td>
      </tr>
    </table>

### Virtual disk names
It specifies the name of the target disks attached to a particular VM. Tune it by using the `VIRTUAL_DISK_NAMES` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-disk-loss/vm-disk-loss-diskname.yaml yaml)
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