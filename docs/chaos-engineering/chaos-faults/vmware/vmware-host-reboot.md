---
id: VMware-host-reboot
title: VMware host reboot
---
VMware Host reboot reboots a VMware host that is attached to the Vcenter.
- It helps determine the VMware infrastructure resilience when the host reboots.
- It also measures the infrastructure resilience in case of an high availability (HA) cluster.


![VMware Host Reboot](./static/images/VMware-host-reboot.png)

## Usage
<details>
<summary>View fault usage</summary>
<div>
This fault has a high blast radius due to which all the VMs under the target host are disrupted. It measures the impact of the host reboot on the VMs and its underlying applications. It also measures the effectiveness of a HA cluster.
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
- The host should be in a healthy state.


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
        <td> HOST_NAME </td>
        <td> Name of the target host </td>
        <td> For example, <code>host-1</code>. </td>
      </tr>
      <tr>
        <td> HOST_DATACENTER </td>
        <td> Name of the data center to which the host belongs. </td>
        <td> For example, <code>datacenter-1</code>. </td>
      </tr>
      <tr>
        <td> HIGH_AVAILABILITY_CLUSTER </td>
        <td> Specify whether the host is a part of the high availability cluster. </td>
        <td> Defaults to disable. Supports enable as well. </td>
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
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds).</td>
        <td> For example, 30s. </td>
      </tr>
    </table>
</details>

## Fault examples

### Common fault tunables
Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Host reboot
It reboots a vCenter host.

Use the following example to tune it:

[embedmd]:# (./static/manifests/VMware-host-reboot/host-reboot.yaml yaml)
```yaml
# vCenter host reboot
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: VMware-host-reboot
      spec:
        components:
          env:
            # Name of the host
            - name: HOST_NAME
              value: 'host-1'
            # Host datacenter
            - name: HOST_DATACENTER
              value: 'datacenter-1'
```

### HA cluster
It reboots a vCenter host which is a part of a high availability cluster.

Use the following example to tune it:

[embedmd]:# (./static/manifests/VMware-host-reboot/ha-host-reboot.yaml yaml)
```yaml
# vCenter HA cluster host reboot
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: VMware-host-reboot
      spec:
        components:
          env:
            # Name of the host
            - name: HOST_NAME
              value: 'host-1'
            # Host datacenter
            - name: HOST_DATACENTER
              value: 'datacenter-1'
            # Is host part of HA cluster
            - name: HIGH_AVAILABILITY_CLUSTER
              value: 'enable'
```
