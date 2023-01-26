---
id: VMware-vm-power-off
title: VMware VM power off
---

VMware VM poweroff stops (or powers off) the VMware VMs for a specific duration.
- After the duration, the VMs are back to original state.
- It checks the performance of the application running on the VMware VMs.


![VMware VM Poweroff](./static/images/vm-poweroff.png)


## Usage
<details>
<summary>View fault usage</summary>
<div>
This fault helps determine how resilient an application is to random power failures. It determines how efficiently an application recovers and restarts the services.
</div>
</details>

## Prerequisites

- Kubernetes >= 1.17
- Vcenter access to stop and start the VM.
- Kubernetes secret that has the Vcenter credentials in the `CHAOS_NAMESPACE`. Below is a sample secret file:

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
        <td> APP_VM_MOIDS </td>
        <td> MOIDs of the VMware instance. After you open the VM in VCenter WebClient, you can find the MOID in the address field (VirtualMachine:vm-5365). Alternatively you can use the CLI to fetch the MOID. </td>
        <td> For example, <code>vm-5365</code>. </td>
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

### Stop/Poweroff the VM by MOID

It contains the MOID of the VM instance. You can tune it using the `APP_VM_MOIDS` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vm-poweroff/app-vm-moid.yaml yaml)
```yaml
# power-off the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vm-poweroff
    spec:
      components:
        env:
        # MOID of the VM
        - name: APP_VM_MOIDS
          value: 'vm-53,vm-65'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
