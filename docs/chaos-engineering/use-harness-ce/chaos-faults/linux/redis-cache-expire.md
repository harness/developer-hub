---
id: redis-cache-expire
title: Redis cache expire
redirect_from:
  - /docs/chaos-engineering/chaos-faults/linux/redis-cache-expire
---

import Ossupport from './shared/note-supported-os.md'
import FaultPermissions from './shared/fault-permissions.md'
import AuthenticationDetails from './shared/redis-auth.md'

Redis cache expire expires a given key (or all keys) for a specific duration. Due to this, you won't be able to access the key/s associated with the cache during chaos.

![Redis cache expire](./static/images/redis-cache-expire.png)

## Use cases
- Determines the resilience of Redis-dependant application when a key expires on a Linux machine.

<Ossupport />

<FaultPermissions />

<AuthenticationDetails />

### Optional tunables

<table>
  <tr>
    <th> Tunable </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> address </td>
    <td> The address of the Redis server. </td>
    <td> If a password or certificate is also required alongside the address, please use the <a href="#redis-authentication">secret file approach</a>. </td>
  </tr>
  <tr>
    <td> key </td>
    <td> The key to expire in the Redis cache. </td>
    <td> For empty value, all the keys are expired. For more information, go to <a href="#key"> key</a>. </td>
  </tr>
  <tr>
    <td> expiration </td>
    <td> The duration after which the key expires. </td>
    <td> Default: 0. For more information, go to <a href="#expiration"> expiration</a>. </td>
  </tr>
  <tr>
    <td> database </td>
    <td> Redis database where the key exists. </td>
    <td> Default: 0. For more information, go to <a href="#database"> database</a>.</td>
  </tr>
  <tr>
    <td> expiryOption </td>
    <td> The options for expiring a Redis key. Refer <a href="https://redis.io/docs/latest/commands/expire/#options"> here </a> for more information. </td>
    <td> Supports one of: NX, XX, GT and LT. For more information, go to <a href="#expiry-option"> expiry option</a>.</td>
  </tr>
  <tr>
    <td> duration </td>
    <td> Duration through which chaos is injected into the target resource. Should be provided in <code>[numeric-hours]h[numeric-minutes]m[numeric-seconds]s</code> format. </td>
    <td> Default: <code>30s</code>. Examples: <code>1m25s</code>, <code>1h3m2s</code>, <code>1h3s</code>. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration.</a></td>
  </tr>
  <tr>
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos. Should be provided in <code>[numeric-hours]h[numeric-minutes]m[numeric-seconds]s</code> format. </td>
    <td> Default: <code>0s</code>. Examples: <code>1m25s</code>, <code>1h3m2s</code>, <code>1h3s</code>. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time</a>. </td>
  </tr>
</table>

### Key

The `key` input variable indicates the key to be expired from the Redis cache.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/redis-cache-expire/key.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: redis-cache-expire
  labels:
    name: cache-expire
spec:
  redisChaos/inputs:
    duration: 30s
    expiration: ""
    key: "KeyName"
    database: 1
    expiryOption: ""
    rampTime: ""
```

### Expiration

The `expiration` input value describes the duration after which the key expires.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/redis-cache-expire/expiration.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: redis-cache-expire
  labels:
    name: cache-expire
spec:
  redisChaos/inputs:
    duration: 30s
    expiration: 30s
    key: ""
    database: 1
    expiryOption: ""
    rampTime: ""
```

### Expiry option
The `expiryOption` input variable provides options to expire a Redis key. It supports `NX`, `XX`, `GT` and `LT`. Go to [expire command](https://redis.io/docs/latest/commands/expire/) for more information.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/redis-cache-expire/expiry-option.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: redis-cache-expire
  labels:
    name: cache-expire
spec:
  redisChaos/inputs:
    duration: 30s
    expiration: "5s"
    key: ""
    database: 1
    expiryOption: "GT"
    rampTime: ""
```

### Database

The `database` input variable is represented as an integer. Its default value is 0.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/redis-cache-expire/database.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: redis-cache-expire
  labels:
    name: cache-expire
spec:
  redisChaos/inputs:
    duration: 30s
    expiration: ""
    key: ""
    database: 1
    expiryOption: ""
    rampTime: ""
```