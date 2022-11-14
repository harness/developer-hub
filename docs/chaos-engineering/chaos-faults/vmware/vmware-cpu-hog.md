---
id: vmware-cpu-hog
title: VMware Cpu Hog
---

## Introduction
- VMware cpu hog experiment consumes the CPU resources on Linux OS based VMware VM .
- It helps to check the performance of the application running on the VMWare VMs.

:::tip Fault execution flow chart
![VMware Cpu Hog](./static/images/vmware-cpu-hog.png)
:::

## Prerequisites
:::info
- Ensure that Kubernetes Version > 1.16 

** vCenter Requirements **
- Ensure the connectivity of execution plane with vCenter and the hosts over 443 port. 
- Ensure that Vmware tool is installed on the target VM with remote execution enabled.
- Ensure that you have sufficient vCenter permission to access hosts and VMs.
- Ensure to create a Kubernetes secret having the Vcenter credentials in the `CHAOS_NAMESPACE`. A sample secret file looks like:
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

## Experiment tunables
<details>
    <summary>Check the Experiment Tunables</summary>
    <h2>Mandatory Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> VM_NAME </td>
        <td> Name of the target VM </td>
        <td> ubuntu-vm-1 </td>
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
        <td> CPU_CORES </td>
        <td> Number of the cpu cores subjected to CPU stress </td>
        <td> Default to 1 </td>
        </tr>
      <tr>
        <td> CPU_LOAD </td>
        <td> Percentage of cpu to be consumed  </td>
        <td> Default to 100  </td>
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
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple instance </td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
    </table>
</details>

## Experiment Examples

### Common Experiment Tunables
Refer the [common attributes](../common-tunables-for-all-experiments) to tune the common tunables for all the experiments.

### CPU_CORES
It stresses the `CPU_CORE` of the targeted vm for the `TOTAL_CHAOS_DURATION` duration

Use the following example to tune this:

[embedmd]:# (./static/manifests/vmware-cpu-hog/vm-cpu-hog-core.yaml yaml)
```yaml
# cpu hog in the VMWare VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-cpu-hog
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
       # cpu cores for stress
        - name: CPU_CORES 
          value: '1'
```
### CPU Load
It contains percentage of vm CPU to be consumed. It can be tuned via `CPU_LOAD` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/vmware-cpu-hog/vm-cpu-hog-load.yaml yaml)
```yaml
# cpu hog in the VMWare VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-cpu-hog
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
        # cpu load in percentage for the stress
        - name: CPU_LOAD
          value: '100'
```
