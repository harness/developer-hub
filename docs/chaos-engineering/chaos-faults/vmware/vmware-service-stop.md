---
id: VMware-service-stop
title: VMware Service Stop
---

## Introduction
- VMware Service Stop fault stops the target systemd services running on Linux OS based VMware VM to determine the application/service resilience.
- It helps to check the performance of the application/service running on the VMware VMs.


![VMware ServiceStop](./static/images/VMware-service-stop.png)


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
info
- VM should be in healthy state.
- The target services should exist in the VM.


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
        <td> Defaults to parallel. Supports serial sequence as well. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. </td>
      </tr>
    </table>
</details>

        <td> Default value: parallel. Supported: serial, parallel </td>
## Fault examples

        <td> Default value: parallel. Supported: serial, parallel </td>
### Common fault tunables
Refer the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### SERVICE_NAME
It contains the target service running on a particular VM


Use the following example to tune this:

[embedmd]:# (./static/manifests/VMware-service-stop/VMware-service-stop.yaml yaml)
```yaml
# Service Stop in the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: VMware-service-stop
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
