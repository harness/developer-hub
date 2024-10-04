---
id: linux-dns-error
title: Linux DNS error
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/linux/linux-dns-error
- /docs/chaos-engineering/chaos-faults/linux/linux-dns-error
---

import Ossupport from './shared/note-supported-os.md'
import FaultPermissions from './shared/fault-permissions.md'


Linux DNS error injects chaos to disrupt the DNS resolution on a Linux machine.

![Linux DNS error](./static/images/linux-dns-error.png)

## Use cases
- Induces DNS error on the target Linux machines.
- Simulates loss of access to host by blocking the DNS resolution of host names.

<Ossupport />

<FaultPermissions />

### Optional tunables
<table>
  <tr>
    <th> Tunable </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> hostNames </td>
    <td> List of the target host names or keywords. For example, <code>google.com,litmuschaos.io</code>. </td>
    <td> If not provided, all host names are targeted. </td>
  </tr>
  <tr>
    <td> matchScheme </td>
    <td> Determines whether the DNS query has to exactly match one of the targets or can have any of the targets as substring. It can be <code>exact</code> or <code>substring</code>. </td>
    <td> If not provided, it is set to <code> exact </code> </td>
  </tr>
  <tr>
    <td> upstreamServer </td>
    <td> URL of the DNS upstream server. </td>
    <td>  </td>
  </tr>
  <tr>
    <td> dnsPort </td>
    <td> Port of the DNS server. </td>
    <td>  </td>
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

### Host names

The `hostNames` input variable subjects the comma-separated host names to chaos.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-dns-error/hostnames.yaml yaml)
```yaml
# target host names
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-dns-error
  labels:
    name: dns-error
spec:
  dnsChaos/inputs:
    hostNames: 'litmuschaos.io,google.com'
```

### Match scheme

The `matchScheme` input variable either exactly matches one of the targets to the DNS query or has any of the targets as a substring of the DNS query.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-dns-error/matchscheme.yaml yaml)
```yaml
# dns query match scheme
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-dns-error
  labels:
    name: dns-error
spec:
  stressChaos/inputs:
    matchScheme: 'exact'
```
