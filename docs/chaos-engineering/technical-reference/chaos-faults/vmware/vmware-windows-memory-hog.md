---
id: vmware-windows-memory-hog
title: VMware Windows Memory hog
---

VMware Windows Memory hog applies stress on the Memory resources on Windows OS based VMware VM.
- It checks the performance of the application running on the VMware Windows VMs.

![VMware Windows Memory Hog](./static/images/vmware-windows-memory-hog.png)

## Use cases

- VMware Windows Memory hog determines the resilience of an application when stress is applied on the Memory resources of a VMware Windows virtual machine.
- VMware Windows Memory hog simulates the situation of lack of Memory for processes running on the application, which degrades their performance. 
- It verifies the autopilot functionality of services or application on the VM.

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
        <td> MEMORY_CONSUMPTION </td>
        <td> Amount of Memory to consume in MB. </td>
        <td> Default: 0. </td>
      </tr>
      <tr>
        <td> MEMORY_PERCENTAGE </td>
        <td> Percentage of total Memory to consume. </td>
        <td> Default: 50. </td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
        <td> Default: 60s. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple instances. </td>
        <td> Default: parallel. Supports serial sequence as well. </td>
      </tr>
    </table>

### Memory Consumption
The `MEMORY_CONSUMPTION` environment variable applies stress on the target Windows VM for a specific duration.

Use the following example to specify Memory consumption:

[embedmd]:# (./static/manifests/vmware-windows-memory-hog/vm-memory-hog-consumption.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-windows-memory-hog
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
       # Memory consumption in MB
        - name: MEMORY_CONSUMPTION 
          value: '1024'
```

### Memory Percentage
The `MEMORY_PERCENTAGE` environment variable applies stress on the target Windows VM for a specific duration. It consumes the specified percentage of the total Memory resources.

Use the following example to specify Memory percentage:

[embedmd]:# (./static/manifests/vmware-windows-memory-hog/vm-memory-hog-percentage.yaml yaml)

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-windows-memory-hog
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
       # Memory percentage to consume
        - name: MEMORY_PERCENTAGE 
          value: '50'
```
