---
id: linux-jvm-cpu-stress
title: Linux JVM CPU stress
redirect_from:
  - /docs/chaos-engineering/chaos-faults/linux/linux-jvm-cpu-stress
---

import Ossupport from './shared/note-supported-os.md'
import FaultPermissions from './shared/fault-permissions.md'

Linux JVM CPU stress consumes excessive CPU threads of the JVM.

:::tip
- JVM chaos faults use the [Byteman utility](https://byteman.jboss.org/) to inject chaos faults into the JVM.
- Provide **read** and **execute** permissions to the `/etc/linux-chaos-infrastructure/byteman` directory (the directory that houses Byteman agent) for the Java application user.
:::

![Linux JVM CPU stress](./static/images/linux-jvm-cpu-stress.png)

## Use cases
Linux JVM CPU stress:
- Tests the system's ability to handle high payloads.
- Evaluates the application's behavior in high-stress cases.
- Induces CPU consumption and exhaustion on the target Java process JVM.
- Simulates a lack of CPU threads for processes running on the application, which degrades their performance.
- Simulates application slowness due to CPU starvation.

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
    <td> cpu </td>
    <td> The number of CPU threads that the application should consume. </td>
    <td> For example, 4. For more information, go to <a href="#cpu-threads"> CPU threads</a>.</td>
  </tr>
  <tr>
    <td> pid </td>
    <td> The process ID that Byteman uses to target the service. This is mutually exclusive with <b>startupCommand</b>. If <code>pid</code> is specified (other than 0), <code>startupCommand</code> is not required.</td>
    <td> For example, <code>6429</code>. For more information, go to <a href="#pid"> process Ids</a>.</td>
  </tr>
  <tr>
    <td> startupCommand </td>
    <td> The command used to start the Java process. A substring match is used with the given command for all processes. This is mutually exclusive with <b>pid</b>.</td>
    <td> If <code>startupCommand</code> is specified, you need to set <code>pid</code> to 0. For example, <code>/usr/local/bin/pet-clinic.jar</code>. For more information, go to <a href="#startup-command"> startup command</a>.</td>
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
    <td> Default: <code>30s</code>. Examples: <code>1m25s</code>, <code>1h3m2s</code>, <code>1h3s</code>. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults/#duration-of-the-chaos"> duration of the chaos.</a></td>
  </tr>
  <tr>
    <td> port </td>
    <td> Port used by the Byteman agent. </td>
    <td> Default: <code>9091</code>. </td>
  </tr>
  <tr>
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos. Should be provided in <code>[numeric-hours]h[numeric-minutes]m[numeric-seconds]s</code> format. </td>
    <td> Default: <code>0s</code>. Examples: <code>1m25s</code>, <code>1h3m2s</code>, <code>1h3s</code>. For more information, go to <a href= "/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time.</a></td>
  </tr>
</table>

### Pid

The process ID used by Byteman to target the services of the JVM. This is mutually exclusive with the `startupCommand` input variable.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-jvm-cpu-stress/pid.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-jvm-cpu-stress
  labels:
    name: jvm-cpu-stress
spec:
  jvmChaos/inputs:
    duration: 30s
    port: 9091
    pid: 1
    cpu: 2
    rampTime: ""
```

### Startup command

The command used to start the Java process. A substring match is used with the given command for all processes. This is mutually exclusive with the `pid` input variable.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-jvm-cpu-stress/startup-command.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-jvm-cpu-stress
  labels:
    name: jvm-cpu-stress
spec:
  jvmChaos/inputs:
    duration: 30s
    port: 9091
    pid: 0
    cpu: 2
    startupCommand: "/usr/bin/pet-clinic.jar"
    rampTime: ""
```

### CPU threads

The number of CPU threads used to simulate excessive CPU usage.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-jvm-cpu-stress/cpu-thread.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-jvm-cpu-stress
  labels:
    name: jvm-cpu-stress
spec:
  jvmChaos/inputs:
    duration: 30s
    port: 9091
    pid: 0
    cpu: 2
    startupCommand: "/usr/bin/pet-clinic.jar"
    rampTime: ""
```