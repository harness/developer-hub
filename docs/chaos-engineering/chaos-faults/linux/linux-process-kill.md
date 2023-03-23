---
id: linux-process-kill
title: Linux process kill
---
Linux Process Kill fault kills the target processes running on Linux machines.
- It checks the performance of the application/process running on Linux.

## Use cases
- Induces process kill on the target Linux machines.
- Disrupts the application critical processes such as databases or message queues by killing their underlying processes or threads.
- Determines the resilience of applications when processes on a Linux machine are unexpectedly killed (or disrupted).

:::note
- This fault has been tested for compatibility in Ubuntu 16 or higher, Debian 10 or higher, CentOS 7 or higher, RHEL 7 or higher, and openSUSE LEAP 15.4 or higher.
- The `linux-chaos-infrastructure` systemd service should be in an active state and the infrastructure should be in a `CONNECTED` state.
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
    <td> Defaults to 30. </td>
  </tr>
  <tr>
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos (in seconds). </td>
    <td> Defaults to 0. </td>
  </tr>
</table>

## Fault examples
### Process IDs

It specifies the IDs of the target processes which will be killed. Tune it by using the `processIDs` input.

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
