---
id: linux-service-restart
title: Linux service restart
---

import Ossupport from './shared/note-supported-os.md'
import FaultPermissions from './shared/fault-permissions.md'


Linux service restart stops the target system services running in a Linux machine.
- It determines the performance and resilience of the application (or services) running on Linux machines.

![Linux service restart](./static/images/linux-service-restart.png)

## Use cases
- Service restart determines the resilience of an application upon random halts.
- Determines how efficiently an application recovers and restarts the services.

<Ossupport />

<FaultPermissions />

## Fault tunables
<h3>Mandatory tunables</h3>
<table>
  <tr>
    <th> Tunable </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> services </td>
    <td> Names of the target services. </td>
    <td> For example <code>nginx,apache2,sshd</code> </td>
  </tr>
</table>
<h3>Optional tunables</h3>
<table>
  <tr>
    <th> Tunable </th>
    <th> Description </th>
    <th> Notes </th>
  </tr>
  <tr>
    <td> selfHealingServices </td>
    <td> Set to <code>true</code> if the service restarts on its own upon stopping it. </td>
    <td> Defaults to <code>false</code>. </td>
  </tr>
  <tr>
    <td> sequence </td>
    <td> Sequence in which the services will be stopped. </td>
    <td> Supports <code>serial</code> and <code>parallel</code>. Defaults to <code>parallel</code>. </td>
  </tr>
  <tr>
    <td> interval </td>
    <td> Duration of a single iteration of chaos (in seconds). Should be less than or equal to the <code>duration</code> input. </td>
    <td> Defaults to 30. </td>
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

### Services

The `services` input variable targets services to be stopped.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/linux-service-restart/services.yaml yaml)
```yaml
# specify target services
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-service-restart
  labels:
    name: service-restart
spec:
  serviceRestartChaos/inputs:
    services: "apache2,nginx"
    duration: 30
```

### Self-healing services

The `selfHealingServices` input variable restarts the services on their own after the service was stopped. 

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/linux-service-restart/self-healing-services.yaml yaml)
```yaml
# specify self healing services
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-service-restart
  labels:
    name: service-restart
spec:
  serviceRestartChaos/inputs:
    services: "apache2,nginx"
    selfHealingServices: true
    duration: 30
```

### Sequence

The `sequence` input variable stops the services. Services can be stopped in parallel, that is, all services can be stopped at once for every iteration of chaos or serially, that is, one after the other for every iteration of chaos.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/linux-service-restart/sequence.yaml yaml)
```yaml
# specify chaos sequence
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-service-restart
  labels:
    name: service-restart
spec:
  serviceRestartChaos/inputs:
    services: "apache2,nginx"
    sequence: "serial"
    duration: 30
```

### Interval

The `interval` input variable specifies the duration of a single iteration of chaos, which is less than or equal to `duration`, and denotes the entire duration of the fault execution. You can tune multiple iterations of the chaos injection.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/linux-service-restart/interval.yaml yaml)
```yaml
# three iterations of chaos
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-service-restart
  labels:
    name: service-restart
spec:
  serviceRestartChaos/inputs:
    services: "apache2,nginx"
    sequence: "parallel"
    duration: 30
    interval: 10
```
