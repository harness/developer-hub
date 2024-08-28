---
id: linux-jvm-memory-stress
title: Linux JVM memory stress
redirect_from:
  - /docs/chaos-engineering/chaos-faults/linux/linux-jvm-memory-stress
---

import Ossupport from './shared/note-supported-os.md'
import FaultPermissions from './shared/fault-permissions.md'

Linux JVM memory stress consumes excessive memory resources of the JVM. This sometimes results in OOM kill (Out-of-memory).

:::tip
JVM chaos faults use the [Byteman utility](https://byteman.jboss.org/) to inject chaos faults into the JVM.
:::

![Linux JVM memory stress](./static/images/linux-jvm-memory-stress.png)

## Use cases
Linux JVM memory stress:
- Tests the system's ability to handle high payloads.
- Evaluates the application's behavior in high-stress cases.
- Induces memory consumption and exhaustion on the target Java application JVM.
- Simulates a lack of memory for processes running on the application, which degrades their performance.
- Simulates application slowness due to memory starvation, and noisy neighbour problems due to excessive consumption of memory.

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
    <td> memory </td>
    <td> The type of memory to stress. </td>
    <td> Choose between <b>heap</b> or <b>stack</b>.</td>
  </tr>
  <tr>
    <td> pid </td>
    <td> The process ID that Byteman uses to target the service. This is mutually exclusive with <b>startupCommand</b>. If <code>pid</code> is specified (other than 0), <code>startupCommand</code> is not required.</td>
    <td> For example, <code>6429</code>. </td>
  </tr>
  <tr>
    <td> startupCommand </td>
    <td> The command used to start the Java process. A substring match is used with the given command for all processes. This is mutually exclusive with <b>pid</b>.</td>
    <td> If <code>startupCommand</code> is specified, you need to set <code>pid</code> to 0. For example, <code>/usr/local/bin/pet-clinic.jar</code>. </td>
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
    <td> Default: <code>30s</code>. Examples: <code>1m25s</code>, <code>1h3m2s</code>, <code>1h3s</code>. </td>
  </tr>
  <tr>
    <td> port </td>
    <td> Port used by the Byteman agent. </td>
    <td> Default: <code>9091</code>. </td>
  </tr>
  <tr>
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos. Should be provided in <code>[numeric-hours]h[numeric-minutes]m[numeric-seconds]s</code> format. </td>
    <td> Default: <code>0s</code>. Examples: <code>1m25s</code>, <code>1h3m2s</code>, <code>1h3s</code>.</td>
  </tr>
</table>

### Pid

The process ID used by Byteman to target the services of the JVM. This is mutually exclusive with the `startupCommand` input variable.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-jvm-memory-stress/pid.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-jvm-memory-stress
  labels:
    name: jvm-memory-stress
spec:
  jvmChaos/inputs:
    duration: 30s
    port: 9091
    pid: 1
    memoryType: "heap"
    rampTime: ""
```

### Startup command

The `startupCommand` is used to start the Java process. A substring match is used with the given command for all processes. This is mutually exclusive with the `pid` input variable.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-jvm-memory-stress/startup-command.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-jvm-memory-stress
  labels:
    name: jvm-memory-stress
spec:
  jvmChaos/inputs:
    duration: 30s
    port: 9091
    pid: 0
    memoryType: "heap"
    startupCommand: "/usr/bin/pet-clinic.jar"
    rampTime: ""
```

### Memory type

The type of memory that is consumed in excess by the JVM; choose between **heap** and **stack** memory.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-jvm-memory-stress/memory-type.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-jvm-memory-stress
  labels:
    name: jvm-memory-stress
spec:
  jvmChaos/inputs:
    duration: 30s
    port: 9091
    pid: 0
    memoryType: "heap"
    startupCommand: "/usr/bin/pet-clinic.jar"
    rampTime: ""
```