---
id: linux-process-kill
title: Linux process kill
---
Linux process kill fault kills the target processes running on the Linux machines.
- It checks the performance of the application/ or rocess running on the Linux machine.

## Use cases
- Induces process kill on the target Linux machines.
- Disrupts the application critical processes such as databases or message queues by killing their underlying processes or threads.
- Determines the resilience of applications when processes on a Linux machine are unexpectedly killed (or disrupted).

:::note
- This fault is compatible with Ubuntu 16 or higher, Debian 10 or higher, CentOS 7 or higher, RHEL 7 or higher, and openSUSE LEAP 15.4 or higher.
- The `linux-chaos-infrastructure` systemd service should be in active state and the infrastructure should be in `CONNECTED` state.
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
    <td> processIDs </td>
    <td> Process IDs of the target processes. </td>
    <td> For example <code>13453,32444,27436</code> </td>
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
    <td> duration </td>
    <td> Duration through which chaos is injected into the target resource (in seconds). </td>
    <td> Default: 30s </td>
  </tr>
  <tr>
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos (in seconds). </td>
    <td> Default: 0s </td>
  </tr>
</table>

### Process IDs

The `processIDs` input variable targets process IDs to kill.

Use the following example to tune the process IDs:

[embedmd]:# (./static/manifests/linux-process-kill/process-ids.yaml yaml)
```yaml
# process ids of target processes
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-process-kill
  labels:
    name: process-kill
spec:
  processKillChaos/inputs:
    processIDs: "13453,32444,27436"
    duration: 30
```
