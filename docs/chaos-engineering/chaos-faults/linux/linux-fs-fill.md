---
id: linux-fs-fill
title: Linux fs fill
---

import Ossupport from './shared/note-supported-os.md'
import FaultPermissions from './shared/fault-permissions.md'

Linux fs fill fills up the available fs (file system) space at a given system path for a specific duration.

![Linux fs fill](./static/images/linux-fs-fill.png)

## Use cases
Linux fs fill:
- Induces heavy fs usage scenario on the target Linux machines.
- Simulates a lack of storage space for the underlying applications in the system.
- Validates application failover and data resiliency in the scenario of low fs space.

<Ossupport />

<FaultPermissions />

### Mandatory tunables
<table>
  <tr>
    <th> Tunable </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> fillPath </td>
    <td> System path to fill. </td>
    <td> Path to a valid directory. </td>
  </tr>
  <tr>
    <td> fillStorage </td>
    <td> Amount of storage to be filled </td>
    <td> You can specify in bytes (without unit), kilobytes (k/K/KB), megabytes (m/M/MB), gigabytes (g/G/GB). Example: <code>100M</code>, <code>1G</code>, etc.</td>
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
    <td> duration </td>
    <td> Duration through which chaos is injected into the target resource. Should be provided in <code>[numeric-hours]h[numeric-minutes]m[numeric-seconds]s</code> format. </td>
    <td> Default: <code>30s</code>. Examples: <code>1m25s</code>, <code>1h3m2s</code>, <code>1h3s</code> </td>
  </tr>
  <tr>
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos. Should be provided in <code>[numeric-hours]h[numeric-minutes]m[numeric-seconds]s</code> format. </td>
    <td> Default: <code>0s</code>. Examples: <code>1m25s</code>, <code>1h3m2s</code>, <code>1h3s</code> </td>
  </tr>
</table>

### Fill path

The `fillPath` input variable determines the system path to be filled up.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-fs-fill/fill-path.yaml yaml)
```yaml
# specify the fill path
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-fs-fill
  labels:
    name: fs-fill
spec:
  fsFillChaos/inputs:
    fillPath: "/tmp"
    fillStorage: 100M
    duration: 30s
```

### Fill storage

The `fillStorage` input variable determines the amount of storage space to be filled up at the `fillPath` path.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-fs-fill/fill-storage.yaml yaml)
```yaml
# specify the storage to be filled
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-fs-fill
  labels:
    name: fs-fill
spec:
  fsFillChaos/inputs:
    fillPath: "/tmp"
    fillStorage: 100M
    duration: 30s
```