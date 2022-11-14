---
id: vmware-service-stop
title: VMware Service Stop
---

## Introduction
- VMware Service Stop experiment stops the target systemd services running on Linux OS based VMware VM to determine the application/service resilience.
- It helps to check the performance of the application/service running on the VMWare VMs.

:::tip Fault execution flow chart
![VMware ServiceStop](./static/images/vmware-service-stop.png)
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
- The target services should exist in the VM.
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
        <td> Name of the VM in which the target service reside </td>
        <td> ubuntu-vm-1 </td>
      </tr>
      <tr>
        <td> SERVICE_NAME </td>
        <td> Name of the target service </td>
        <td> nginx </td>
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
        <td> SELF_HEALING_SERVICES </td>
        <td> Set to <code>enable</code> if the target service is self healing </td>
        <td> Defaults to <code>disable</code> </td>
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
        <td> </td>
      </tr>
    </table>
</details>

## Experiment Examples

### Common Experiment Tunables
Refer the [common attributes](../common-tunables-for-all-experiments) to tune the common tunables for all the experiments.

### SERVICE_NAME
It contains the target service running on a particular VM


Use the following example to tune this:

[embedmd]:# (./static/manifests/vmware-service-stop/vmware-service-stop.yaml yaml)
```yaml
# Service Stop in the VMWare VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: vmware-service-stop
      spec:
        components:
          env:
            # Name of the VM
            - name: VM_NAME
              value: 'test-vm-01'
            # Name of service
            - name: SERVICE_NAME
              value: 'nginx'
```
