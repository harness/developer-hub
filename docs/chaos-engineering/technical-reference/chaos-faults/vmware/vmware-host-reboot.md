---
id: VMware-host-reboot
title: VMware host reboot
---
VMware host reboot reboots a VMware host that is attached to the Vcenter.
- It helps determine the VMware infrastructure resilience when the host reboots.
- It also measures the infrastructure resilience in case of an high availability (HA) cluster.

![VMware Host Reboot](./static/images/vmware-host-reboot.png)

## Use cases

- VMware host reboot has a high blast radius due to which all the VMs under the target host are disrupted. 
- It measures the impact of the host reboot on the VMs and its underlying applications. 
- It also measures the effectiveness of a HA cluster.

:::note
- Kubernetes > 1.16 is required to execute this fault.
- Execution plane should be connected to vCenter and host vCenter on port 443. 
- The VM should be in a healthy state before and after injecting chaos.
- VMware tool should be installed on the target VM with remote execution enabled.
- Appropriate vCenter permissions should be provided to access the hosts and the VMs.
- Kubernetes secret has to be created that has the Vcenter credentials in the `CHAOS_NAMESPACE`. VM credentials can be passed as secrets or as a `ChaosEngine` environment variable. Below is a sample secret file:

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
        <td> HOST_NAME </td>
        <td> Name of the target host </td>
        <td> For example, <code>host-1</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/VMware-host-reboot#host-reboot"> host name.</a></td>
      </tr>
      <tr>
        <td> HOST_DATACENTER </td>
        <td> Name of the data center to which the host belongs. </td>
        <td> For example, <code>datacenter-1</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/VMware-host-reboot#host-reboot"> host datacenter. </a></td>
      </tr>
      <tr>
        <td> HIGH_AVAILABILITY_CLUSTER </td>
        <td> Specify whether the host is a part of the high availability cluster. </td>
        <td> Defaults to disable. Supports enable as well. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/vmware/VMware-host-reboot#ha-cluster"> high availablity cluster. </a></td>
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
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds).</td>
        <td> For example, 30s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time.</a></td>
      </tr>
    </table>


### Host reboot
It reboots a vCenter host.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-host-reboot/host-reboot.yaml yaml)
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
It specifies whether to reboot a vCenter host which is a part of a high availability cluster. Tune it by using the `HIGH_AVAILABILITY_CLUSTER` environment variable. 

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-host-reboot/ha-host-reboot.yaml yaml)
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
