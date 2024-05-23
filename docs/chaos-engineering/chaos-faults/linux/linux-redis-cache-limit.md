---
id: linux-redis-cache-limit
title: Linux Redis cache limit
---

import Ossupport from './shared/note-supported-os.md'
import FaultPermissions from './shared/fault-permissions.md'
import AuthenticationDetails from './shared/redis-auth.md'

Linux Redis cache limit limits the amount of Redis cache memory on a Linux machine. The memory is restored after the duration of chaos.

![Linux Redis cache limit](./static/images/linux-redis-cache-limit.png)

## Use cases
Determines the resilience of Redis-dependant application again frequent cache misses that occurs due to a low cache size.

<Ossupport />

<FaultPermissions />

<AuthenticationDetails />

### External packages
This fault uses [`stress-ng`](https://github.com/ColinIanKing/stress-ng), which is installed as part of the infrastructure installation.

### Optional tunables

<table>
  <tr>
    <th> Tunable </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> maxMemory </td>
    <td> The percentage of memory or amount (in MB, KB, GB) to limit with respect to the primary memory of the system.</td>
    <td> Default: 50 %. For more information, go to <a href="#maximum-memory">maximum memory.</a> </td>
  </tr>
  <tr>
    <td> duration </td>
    <td> Duration through which chaos is injected into the target resource. Should be provided in <code>[numeric-hours]h[numeric-minutes]m[numeric-seconds]s</code> format. </td>
    <td> Default: <code>30s</code>. Examples: <code>1m25s</code>, <code>1h3m2s</code>, <code>1h3s</code>. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration.</a></td>
  </tr>
  <tr>
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos. Should be provided in <code>[numeric-hours]h[numeric-minutes]m[numeric-seconds]s</code> format. </td>
    <td> Default: <code>0s</code>. Examples: <code>1m25s</code>, <code>1h3m2s</code>, <code>1h3s</code>. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time</a>. </td>
  </tr>
</table>

### Maximum memory

The `maxMemory` input variable indicates the percentage of Redis cache memory to limit during the chaos duration. Its default value is 50 %.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-redis-cache-limit/max-memory.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: redis-cache-limit
  labels:
    name: cache-limit
spec:
  redisChaos/inputs:
    duration: "30s"
    maxMemory: "50%"
    rampTime: ""

```
