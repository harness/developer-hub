---
id: vmware-windows-time-chaos
title: VMware Windows Time Chaos
---

VMware Windows Time Chaos simulates a time skew scenario on Windows OS based VMware VM.
- It checks the performance of the application running on the VMware Windows VMs under time skew conditions.

![VMware Windows Time Chaos](./static/images/vmware-windows-time-chaos.png)

## Use cases

- VMware Windows Time Chaos determines the resilience of an application when a time skew scenario is simulated on a VMware Windows virtual machine.
- VMware Windows Time Chaos simulates the situation of time skew for processes running on the application, which degrades their performance. 
- It also helps verify the application's ability to handle time failures and its failover mechanisms. 

:::note
- Kubernetes > 1.16 is required to execute this fault.
- Execution plane should be connected to vCenter and host vCenter on port 443. 
- VMware tool should be installed on the target VM with remote execution enabled.
- Adequate vCenter permissions should be provided to access the hosts and the VMs.
- The VM should be in a healthy state before and after injecting chaos.
- Kubernetes secret has to be created that has the Vcenter credentials in the `CHAOS_NAMESPACE`. 
- VM credentials can be passed as secrets or as a chaos enginer environment variable.

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
        <td> VM_NAME </td>
        <td> Name of the target VM. </td>
        <td> For example, <code>win-vm-1</code> </td>
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
        <td> OFFSET </td>
        <td> Time offset to induce in the VM. </td>
        <td> For example, <code>+24h</code> </td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
        <td> Default: 60s. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> Default: 0s. </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple instances. </td>
        <td> Default: parallel. Supports serial sequence as well. </td>
      </tr>
    </table>

### Offset

The `OFFSET` environment variable specifies the time offset to induce in the target Windows VM.

Use the following example to specify time offset:

[embedmd]:# (./static/manifests/vmware-windows-time-chaos/vm-time-chaos-offset.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-windows-time-chaos
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
       # Time offset to induce
        - name: OFFSET 
          value: '+24h'
```
