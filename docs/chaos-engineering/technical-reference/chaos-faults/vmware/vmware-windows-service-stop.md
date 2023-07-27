---
id: vmware-windows-service-stop
title: VMware Windows Service Stop
---

VMware Windows Service Stop simulates a service stop scenario on Windows OS based VMware VM.
- It checks the performance of the application running on the VMware Windows VMs under service stop conditions.

![VMware Windows Service Stop](./static/images/vmware-windows-service-stop.png)

## Use cases

- VMware Windows Service Stop determines the resilience of an application when a service stop scenario is simulated on a VMware Windows virtual machine.
- VMware Windows Service Stop simulates the situation of service stop for services running on the application, which degrades their performance. 
- It also helps verify the application's ability to handle service failures and its failover mechanisms. 

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
        <td> SERVICE_NAMES </td>
        <td> Comma separated list of service names to stop. </td>
        <td> For example, <code>service1,service2</code> </td>
      </tr>
      <tr>
        <td> FORCE </td>
        <td> If set to "enable", the service will be forcefully stopped. </td>
        <td> Default: enable. </td>
      </tr>
      <tr>
        <td> SELF_HEALING_SERVICE </td>
        <td> If set to "enable", the service will be restarted after chaos injection. </td>
        <td> Default: disable. </td>
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

### Service Names

The `SERVICE_NAMES` environment variable specifies the service names to stop on the target Windows VM.

Use the following example to specify service names:

[embedmd]:# (./static/manifests/vmware-windows-service-stop/vm-service-stop-names.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-windows-service-stop
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
       # Service names to stop
        - name: SERVICE_NAMES 
          value: 'service1,service2'
```

### Force

The `FORCE` environment variable specifies whether the service should be forcefully stopped.

Use the following example to enable forceful stopping:

[embedmd]:# (./static/manifests/vmware-windows-service-stop/vm-service-stop-force.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-windows-service-stop
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
       # Enable forceful stopping
        - name: FORCE 
          value: 'enable'
```

### Self Healing Service

The `SELF_HEALING_SERVICE` environment variable specifies whether the service should be restarted after chaos injection.

Use the following example to enable self healing service:

[embedmd]:# (./static/manifests/vmware-windows-service-stop/vm-service-stop-self-healing.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-windows-service-stop
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
       # Enable self healing service
        - name: SELF_HEALING_SERVICE 
          value: 'enable'
```