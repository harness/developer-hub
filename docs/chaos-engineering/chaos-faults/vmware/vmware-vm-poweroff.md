---
id: vmware-vmpoweroff
title: VMware VM-Poweroff
---

## Introduction
- It stops/powers off the VMWare VMs before bringing them back to power-on state after a specific chaos duration using the VMWare APIs.
- It checks the performance of the application running on the VMWare VMs.

:::tip Fault execution flow chart
![VMware VM Poweroff](./static/images/vm-poweroff.png)
:::

## Uses
<details>
<summary>View the uses of the fault</summary>
<div>
Coming soon.
</div>
</details>

## Prerequisites

:::info

- Kubernetes >= 1.17
- Vcenter access to stop and start the VM.
- Kubernetes secret that has the Vcenter credentials in the `CHAOS_NAMESPACE`. A sample secret file looks like:

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

### NOTE

You can pass the VM credentials as a secret or as a chaosengine environment variable.
:::

## Default Validations

:::info

- The VM should be in a healthy state.

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
        <td> APP_VM_MOIDS </td>
        <td> MOIDs of the VMware instance</td>
        <td> Once you open the VM in VCenter WebClient, you can find MOID in address field (VirtualMachine:vm-5365). Alternatively you can use the CLI to fetch the MOID. For example, vm-5365. </td>
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
        <td> The total duration to insert chaos (in seconds). </td>
        <td> Defaults to 30s </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> The interval between successive instance terminations (in seconds). </td>
        <td> Defaults to 30s </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple instances. </td>
        <td> The default value is 'parallel', and it supports 'serial' value too. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos (in seconds). </td>
        <td> For example, 30 seconds</td>
      </tr>
    </table>
</details>

## Fault Examples

### Common Fault Tunables
Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Stop/Poweroff the VM By MOID

It contains MOID of the VM instance. You can tune it using the `APP_VM_MOIDS` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vm-poweroff/app-vm-moid.yaml yaml)
```yaml
# power-off the VMWare VM
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
