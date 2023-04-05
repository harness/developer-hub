---
id: linux-disk-io-stress
title: Linux disk IO stress
---
Linux disk IO stress applies stress on the disk of the target Linux machines over I/O operations for a specific duration.

![Linux disk IO stress](./static/images/linux-disk-io-stress.png)

## Use cases
- Simulates slower disk operations for the applications.
- Simulates noisy neighbour problems by exhausting the disk bandwidth.
- Verifies the disk performance on increasing I/O threads and varying I/O block sizes.
- Checks how the application functions under high disk latency conditions, when I/O traffic is high and includes large I/O blocks, and when other services monopolize the I/O disks.

:::note
- This fault is compatible with Ubuntu 16 or higher, Debian 10 or higher, CentOS 7 or higher, RHEL 7 or higher, and openSUSE LEAP 15.4 or higher.
- The `linux-chaos-infrastructure` systemd service should be in active state and the infrastructure should be in `CONNECTED` state.
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
    <td> fileSystemUtilisationBytes </td>
    <td> File size consumed for the disk I/O operations (in bytes). </td>
    <td> Mutually exclusive to <code>fileSystemUtilisationPercentage</code> </td>
  </tr>
   <tr>
    <td> fileSystemUtilisationPercentage </td>
    <td> File size consumed for the disk I/O operations (in percentage of the total available disk size). </td>
    <td> Mutually exclusive to <code>fileSystemUtilisationBytes</code>. Default: 10% </td>
  </tr>
  <tr>
    <td> workers </td>
    <td> Number of worker processes to start. </td>
    <td> Default: 1 </td>
  </tr>
  <tr>
    <td> volumeMountPath </td>
    <td> Volume mount path used for the disk I/O operations. </td>
    <td> Default: user HOME directory </td>
  </tr>
  <tr>
    <td> duration </td>
    <td> Duration through which chaos is injected into the target resource (in seconds). </td>
    <td> Defaults to 30s </td>
  </tr>
  <tr>
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos (in seconds). </td>
    <td> Default: 0s </td>
  </tr>
</table>

### Workers

The `workers` input variable utilizes a specific number of workers for the disk I/O stress fault.

Use the following example to tune the number of workers:

[embedmd]:# (./static/manifests/linux-disk-io-stress/workers.yaml yaml)
```yaml
# workers to utilize
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-disk-io-stress
  labels:
    name: disk-io-stress
spec:
  stressChaos/inputs:
    workers: 1
    fileSystemUtilisationPercentage: 10
```

### File system utilization in bytes

The `fileSystemUtilisationBytes` input variable utilizes a specific amount of file system disk space or bandwidth as a part of the disk I/O operations in bytes.

Use the following example to tune the file system utilization in bytes:

[embedmd]:# (./static/manifests/linux-disk-io-stress/file-system-bytes.yaml yaml)
```yaml
# file system amount to be utilized
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-disk-io-stress
  labels:
    name: disk-io-stress
spec:
  stressChaos/inputs:
    workers: 3
    fileSystemUtilisationBytes: 10000
```

### File system utilization in percentage

The `fileSystemUtilisationPercentage` input variable utilizes a specific amount of file system disk space or bandwidth as a part of the disk I/O operations in terms of percentage of the total available disk space.

Use the following example to tune the file system utilization in percentage:

[embedmd]:# (./static/manifests/linux-disk-io-stress/file-system-percentage.yaml yaml)
```yaml
# file system percentage to be utilized
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-disk-io-stress
  labels:
    name: disk-io-stress
spec:
  stressChaos/inputs:
    workers: 3
    fileSystemUtilisationPercentage: 70
```

### Volume mount path
The `volumeMountPath` input variable utilizes the volume mount path where the disk I/O operations are performed.

Use the following example to tune the volume mount path:

[embedmd]:# (./static/manifests/linux-disk-io-stress/volume-mount-path.yaml yaml)
```yaml
# configure volume mount path
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-disk-io-stress
  labels:
    name: disk-io-stress
spec:
  stressChaos/inputs:
    workers: 1
    fileSystemUtilisationPercentage: 50
    volumeMountPath: "/tmp"
```
