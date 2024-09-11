---
id: vmware-windows-service-stop
title: VMware Windows service stop
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/vmware/vmware-windows-service-stop
---

VMware Windows service stop simulates a service stop scenario on Windows OS based VMware VM. It checks the performance of the application running on the VMware Windows VMs under service stop conditions.

![VMware Windows Service Stop](./static/images/vmware-windows-service-stop.png)

## Use cases
VMware Windows service stop:
- Determines the resilience of an application when a service stop scenario is simulated on a VMware Windows virtual machine.
- Simulates the situation of service stop for services running on the application, which degrades their performance.
- Helps verify the application's ability to handle service failures and its failover mechanisms.

### Prerequisites
- Kubernetes > 1.16 is required to execute this fault.
- Execution plane should be connected to vCenter and host vCenter on port 443.
- VMware tool should be installed on the target VM with remote execution enabled.
- Adequate vCenter permissions should be provided to access the hosts and the VMs.
- The VM should be in a healthy state before and after injecting chaos.
- Kubernetes secret has to be created that has the Vcenter credentials in the `CHAOS_NAMESPACE`.
- Run the fault with a user possessing admin rights, preferably the built-in Administrator, to guarantee permissions for memory stress testing. [See how to enable the built-in Administrator in Windows](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/enable-and-disable-the-built-in-administrator-account?view=windows-11).

- VM credentials can be passed as secrets or as a chaos engine environment variable.
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

### Mandatory tunables

   <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> VM_NAME </td>
        <td> Name of the target VM. </td>
        <td> For example, <code>win-vm-1</code> </td>
      </tr>
      <tr>
          <td> VM_USER_NAME </td>
          <td> Username of the target VM.</td>
          <td> For example, <code>vm-user</code>. </td>
      </tr>
      <tr>
          <td> VM_PASSWORD </td>
          <td> User password for the target VM. </td>
          <td> For example, <code>1234</code>. Note: You can take the password from secret as well. </td>
      </tr>
      <tr>
        <td> SERVICE_NAMES </td>
        <td> Comma separated list of service names to stop. </td>
        <td> For example, <code>service1,service2</code>. For more information, go to <a href="#service-names"> service names. </a> </td>
      </tr>
    </table>

### Optional tunables

   <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> FORCE </td>
        <td> If set to "enable", the service will be forcefully stopped. </td>
        <td> Default: enable. For more information, go to <a href="#force"> force. </a></td>
      </tr>
      <tr>
        <td> SELF_HEALING_SERVICE </td>
        <td> If set to "enable", the service will be restarted after chaos injection. </td>
        <td> Default: disable. For more information, go to <a href="#self-healing-service"> self-healing service. </a></td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
        <td> Default: 60 s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos. </a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> Default: 0 s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time. </a></td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple instances. </td>
        <td> Default: parallel. Supports serial and parallel sequence. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
      </tr>
      <tr>
      <td>DEFAULT_HEALTH_CHECK</td>
      <td>Determines if you wish to run the default health check which is present inside the fault. </td>
      <td> Default: 'true'. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#default-health-check"> default health check.</a></td>
      </tr>
    </table>

### Service names

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

### Self-healing service

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