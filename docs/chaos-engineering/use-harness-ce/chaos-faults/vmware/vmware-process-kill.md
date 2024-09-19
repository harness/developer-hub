---
id: vmware-process-kill
title: VMware process kill
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/vmware-process-kill
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/process-kill
- /docs/chaos-engineering/chaos-faults/vmware/vmware-process-kill
---

VMware process kill kills the target processes that are running as a part of a Linux OS based VMware VM. The services that are disrupted might be running in the VMware VM, and this fault kills their underlying processes or threads. It helps determine the resilience of an application (or process) running on the VMware VMs.

![VMware Process kill](./static/images/vmware-process-kill.png)

:::info note
HCE doesn't support injecting VMWare Windows faults on Bare metal server.
:::


## Use cases
VMware process kill:
- Disrupts critical processes running within the application, such as databases or message queues.
- Determines how efficiently and quickly the VMware instance recovers from the unexpected disruption.

### Prerequisites
- Kubernetes > 1.16 is required to execute this fault.
- Execution plane should be connected to vCenter and host vCenter on port 443.
- The VM should be in a healthy state before and after injecting chaos.
- VMware tool should be installed on the target VM with remote execution enabled.
- The target processes should exist within the VM.
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

### Mandatory tunables

   <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> VM_NAME </td>
        <td> Name of the VM where the target processes reside. </td>
        <td> For example, <code>ubuntu-vm-1</code>. </td>
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
        <td> PROCESS_IDS </td>
        <td> Process IDs of the target processes that are provided as comma-separated values. </td>
        <td> For example, <code>183,253,857</code>. For more information, go to <a href="#process-ids"> process Ids. </a></td>
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
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Defaults to 30s. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos. </a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time. </a></td>
      </tr>
      <tr>
      <td>DEFAULT_HEALTH_CHECK</td>
      <td>Determines if you wish to run the default health check which is present inside the fault. </td>
      <td> Default: 'true'. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#default-health-check"> default health check.</a></td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive instance terminations (in seconds). </td>
        <td> Defaults to 30s. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#chaos-interval"> chaos interval. </a></td>
      </tr>
    </table>


### Process Ids
It specifies the target process Ids running on a particular VM. Tune it by using the `PROCESS_IDS` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-process-kill/VMware-process-kill.yaml yaml)
```yaml
# Process kill in the VMware VM
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: VMware-process-kill
      spec:
        components:
          env:
            # Name of the VM
            - name: VM_NAME
              value: 'test-vm-01'
            # List of Process IDs
            - name: PROCESS_IDS
              value: '8688,4678'
```
