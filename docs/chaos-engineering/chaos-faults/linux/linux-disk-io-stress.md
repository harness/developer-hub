---
id: linux-disk-io-stress
title: Linux Disk IO Stress
---
Linux Disk IO Stress fault stresses the disk of the target Linux machines over IO operations for a certain duration.

## Use cases
- Simulates slower disk operations for the applications.
- Simulates noisy neighbour problems by exhausting the disk bandwidth.
- Verifies the disk performance on increasing IO threads and varying IO block sizes.
- Checks how the application functions under high disk latency conditions, when IO traffic is high and includes large I/O blocks, and when other services monopolize the IO disks.

:::note
- This fault has been tested for compatibility in Ubuntu 16 or higher, Debian 10 or higher, CentOS 7 or higher, RHEL 7 or higher, and openSUSE LEAP 15.4 or higher.
- The `linux-chaos-infrastructure` systemd service should be in an active state and the infrastructure should be in a `CONNECTED` state.
:::

## Fault tunables
  <h3>Mandatory fields</h3>
    <h3>Optional fields</h3>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> fileSystemUtilisationBytes </td>
        <td> File size to be consumed for the disk IO operations (in bytes). </td>
        <td> Mutually exclusive to <code>fileSystemUtilisationPercentage</code>. </td>
      </tr>
       <tr>
        <td> fileSystemUtilisationPercentage </td>
        <td> File size to be consumed for the disk IO operations (in percentage of the total available disk size) </td>
        <td> Mutually exclusive to <code>fileSystemUtilisationBytes</code>. Defaults to 10%. </td>
      </tr>
      <tr>
        <td> workers </td>
        <td> Number of worker processes to start. </td>
        <td> Defaults to 1. </td>
      </tr>
      <tr>
        <td> volumeMountPath </td>
        <td> Volume mount path to be used for the disk IO operations. </td>
        <td> Defaults to the user HOME directory. </td>
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


### Workers

It specifies the workers value that will be utilized for the disk IO stress fault. Tune it by using the `workers` input.

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

It specifies the file system amount to be utilized as part of the disk IO operations in bytes. Tune it by using the `fileSystemUtilisationBytes` input.

Use the following example to tune file system utilisation bytes:

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

It specifies the file system amount to be utilized as part of the disk IO operations as a percentage of the total available disk space. Tune it by using the `fileSystemUtilisationPercentage` input.

Use the following example to tune file system utilisation percentage:

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

### Volume Mount Path
It specifies the volume mount path to be utilized for performing the disk IO operations. Tune it by using the `volumeMountPath` input.

Use the following example to tune volume mount path:

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