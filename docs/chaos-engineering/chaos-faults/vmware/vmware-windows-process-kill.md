---
id: vmware-windows-process-kill
title: VMware Windows process kill
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/vmware/vmware-windows-process-kill
---

VMware Windows process kill simulates a process kill scenario on Windows OS based VMware VM. It checks the performance of the application running on the VMware Windows VMs under process kill conditions.

![VMware Windows Process Kill](./static/images/vmware-windows-process-kill.png)

## Use cases
VMware Windows process kill:
- Determines the resilience of an application when a process kill scenario is simulated on a VMware Windows virtual machine.
- Simulates the situation of process kill for processes running on the application, which degrades their performance.
- Helps verify the application's ability to handle process failures and its failover mechanisms.

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
    </table>

### Optional tunables

   <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> PROCESS_IDS </td>
        <td> Comma-separated list of process IDs to kill. </td>
        <td> For example, <code>1234,5678</code>. For more information, go to <a href="#process-ids"> process IDs. </a> </td>
      </tr>
      <tr>
        <td> FORCE </td>
        <td> If set to "enable", the process will be forcefully killed. </td>
        <td> Default: disable. For more information, go to <a href="#force"> force. </a></td>
      </tr>
      <tr>
        <td> PROCESS_NAMES </td>
        <td> Comma separated list of process names to kill. </td>
        <td> For example, <code>chrome,firefox</code>. For more information, go to <a href="#process-names"> process names. </a></td>
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
        <td> Default: parallel. Supports serial and parallel sequence. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a> </td>
      </tr>
      <tr>
      <td>DEFAULT_HEALTH_CHECK</td>
      <td>Determines if you wish to run the default health check which is present inside the fault. </td>
      <td> Default: 'true'. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#default-health-check"> default health check.</a></td>
      </tr>
    </table>

### Process IDs

The `PROCESS_IDS` environment variable specifies the process IDs to kill on the target Windows VM.

Use the following example to specify process IDs:

[embedmd]:# (./static/manifests/vmware-windows-process-kill/vm-process-kill-ids.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-windows-process-kill
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
       # Process IDs to kill
        - name: PROCESS_IDS
          value: '1234,5678'
```

### Force

The `FORCE` environment variable specifies whether the process should be forcefully killed.

Use the following example to enable forceful killing:

[embedmd]:# (./static/manifests/vmware-windows-process-kill/vm-process-kill-force.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-windows-process-kill
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
       # Enable forceful killing
        - name: FORCE
          value: 'enable'
```

### Process names

The `PROCESS_NAMES` environment variable specifies the process names to kill on the target Windows VM.

Use the following example to specify process names:

[embedmd]:# (./static/manifests/vmware-windows-process-kill/vm-process-kill-names.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-windows-process-kill
    spec:
      components:
        env:
        # Name of the VM
        - name: VM_NAME
          value: 'test-vm-01'
       # Process names to kill
        - name: PROCESS_NAMES
          value: 'chrome,firefox'
```
