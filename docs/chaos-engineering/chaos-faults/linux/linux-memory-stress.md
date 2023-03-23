---
id: linux-memory-stress
title: Linux memory stress
---
Linux Memory Stress fault causes memory consumption of the target Linux machines for a certain duration.

## Use cases
- Induces memory consumption and exhaustion on the target Linux machines.
- Simulates a lack of memory for processes running on the application, which degrades their performance.
- Simulates application slowness due to memory starvation, and noisy neighbour problems due to excessive consumption of memory.

:::note
- This fault has been tested for compatibility in Ubuntu 16 or higher, Debian 10 or higher, CentOS 7 or higher, RHEL 7 or higher, and openSUSE LEAP 15.4 or higher.
- The `linux-chaos-infrastructure` systemd service should be in an active state and the infrastructure should be in a `CONNECTED` state.
:::

## Fault tunables
<h3>Optional fields</h3>
<table>
  <tr>
    <th> Variables </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> memoryBytes </td>
    <td> Amount of memory to be consumed (in bytes). </td>
    <td> Mutually exclusive to <code>memoryPercentage</code>. Defaults to 256 MB. </td>
  </tr>
   <tr>
    <td> memoryPercentage </td>
    <td> Amount of memory to be consumed (in percentage of the total available memory). </td>
    <td> Mutually exclusive to <code>memoryBytes</code>. </td>
  </tr>
  <tr>
    <td> workers </td>
    <td> Number of worker processes to start. </td>
    <td> Defaults to 1. </td>
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
### Workers

It specifies the workers value that will be utilized for the memory stress fault. Tune it by using the `workers` input.

Use the following example to tune the number of workers:

[embedmd]:# (./static/manifests/linux-memory-stress/workers.yaml yaml)
```yaml
# workers to utilize
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-memory-stress
  labels:
    name: memory-stress
spec:
  stressChaos/inputs:
    workers: 1
    memoryPercentage: 50
```

### Memory Consumption by Bytes

It specifies the amount of memory (in bytes) to be utilized. Tune it by using the `memoryBytes` input.

Use the following example to tune memory bytes:

[embedmd]:# (./static/manifests/linux-memory-stress/memory-bytes.yaml yaml)
```yaml
# memory bytes to consume
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-memory-stress
  labels:
    name: memory-stress
spec:
  stressChaos/inputs:
    workers: 1
    memoryBytes: 5000
```

### Memory Consumption by Percentage

It specifies the amount of memory (in percentage) to be utilized. Tune it by using the `memoryPercentage` input.

Use the following example to tune memory percentage:

[embedmd]:# (./static/manifests/linux-memory-stress/memory-percentage.yaml yaml)
```yaml
# memory percentage to consume
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-memory-stress
  labels:
    name: memory-stress
spec:
  stressChaos/inputs:
    workers: 1
    memoryPercentage: 70
```
