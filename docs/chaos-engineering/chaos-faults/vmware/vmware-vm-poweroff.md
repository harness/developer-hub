---
id: vmware-vmpoweroff
title: VMware VM-Poweroff
---

## Introduction
- It causes VMWare VMs to Stop/Power-off before bringing them back to Powered-on state after a specified chaos duration using the VMWare APIs to start/stop the target VM.
- It helps to check the performance of the application/process running on the VMWare VMs.

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

- Ensure that Kubernetes Version >= 1.17
- Ensure that you have sufficient Vcenter access to stop and start the VM.
- Ensure to create a Kubernetes secret having the Vcenter credentials in the `CHAOS_NAMESPACE`. A secret file looks like:

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

You can pass the VM credentials as secrets or as an ChaosEngine ENV variable.
:::

## Default Validations

:::info

- VM should be in healthy state.

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
        <td> Once you open VM in vCenter WebClient, you can find MOID in address field (VirtualMachine:vm-5365). Alternatively you can use the CLI to fetch the MOID. Eg: vm-5365 </td>
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
        <td> The total time duration for chaos insertion (sec) </td>
        <td> Defaults to 30s </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> The interval (in sec) between successive instance termination </td>
        <td> Defaults to 30s </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple instance </td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> Eg. 30 </td>
      </tr>
    </table>
</details>

## Fault Examples

### Common Fault Tunables
Refer the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Stop/Poweroff VM By MOID

It contains MOID of the vm instance. It can be tuned via `APP_VM_MOIDS` ENV.

Use the following example to tune this:

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
