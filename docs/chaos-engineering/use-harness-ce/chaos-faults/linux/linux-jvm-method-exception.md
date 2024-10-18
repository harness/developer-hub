---
id: linux-jvm-method-exception
title: Linux JVM method exception
redirect_from:
  - /docs/chaos-engineering/chaos-faults/linux/linux-jvm-method-exception
---

import Ossupport from './shared/note-supported-os.md'
import FaultPermissions from './shared/fault-permissions.md'

Linux JVM method exception injects chaos into a Java application to invoke an exception.

:::tip
- JVM chaos faults use the [Byteman utility](https://byteman.jboss.org/) to inject chaos faults into the JVM.
- Provide **read** and **execute** permissions to the `/etc/linux-chaos-infrastructure/byteman` directory (the directory that houses Byteman agent) for the Java application user.
:::

![Linux JVM method exception](./static/images/linux-jvm-method-exception.png)

## Use cases
JVM method exception:
- Determines the performance and resilience of an application (or service) on encountering exceptions.
- Determines how efficiently an application recovers the services.

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
    <td> class </td>
    <td> Specify as <b>packageName.className</b> that specifies the class in which you define the exception. </td>
    <td> For example, <code>org.framework.appName.system.WelcomeController</code>. For more information, go to <a href= "#class-name">class name.</a></td>
  </tr>
  <tr>
    <td> exception </td>
    <td> The exception you want to throw. </td>
    <td> For example, <code>NullPointerException("Something went wrong!")</code>. For more information, go to <a href= "#exception">exception name.</a></td>
  </tr>
  <tr>
    <td> method </td>
    <td> The method to which exception is applied. </td>
    <td> For example, <code>Welcome</code>. For more information, go to <a href= "#method ">method name.</a></td>
  </tr>
  <tr>
    <td> pid </td>
    <td> The process ID (integer) that Byteman uses to target the service. This is mutually exclusive with <b>startupCommand</b>. If <code>pid</code> is specified (other than 0), <code>startupCommand</code> is not required.</td>
    <td> For example, <code>6429</code>. For more information, go to <a href= "#pid ">process Id.</a></td>
  </tr>
  <tr>
    <td> startupCommand </td>
    <td> The command used to start the Java process. A substring match is used with the given command for all processes. This is mutually exclusive with <b>pid</b>.</td>
    <td> If <code>startupCommand</code> is specified, you need to set <code>pid</code> to 0. For example, <code>/usr/local/bin/pet-clinic.jar</code>. For more information, go to <a href= "#startup-command">startup command.</a></td>
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
    <td> rampTime </td>
    <td> Period to wait before and after injecting chaos. Should be provided in <code>[numeric-hours]h[numeric-minutes]m[numeric-seconds]s</code> format. </td>
    <td> Default: <code>0s</code>. Examples: <code>1m25s</code>, <code>1h3m2s</code>, <code>1h3s</code>. For more information, go to <a href= "/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time.</a></td>
  </tr>
  <tr>
    <td> port </td>
    <td> Port used by the Byteman agent. </td>
    <td> Default: <code>9091</code>. </td>
  </tr>
</table>

### Class name

The `class` input variable targets the class name where the exception is present. Specify it in the format `packageName.className`.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-jvm-method-exception/class-name.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-jvm-method-exception
  labels:
    name: jvm-method-exception
spec:
  jvmChaos/inputs:
    duration: 30s
    port: 9091
    pid: 0
    class: "org.framework.appName.system.WelcomeController"
    method: ""
    exception: ""
    startupCommand: "/usr/bin/pet-clinic.jar"
    rampTime: ""
```

### Exception

The `exception` you want to throw to the Java application.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-jvm-method-exception/exception.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-jvm-method-exception
  labels:
    name: jvm-method-exception
spec:
  jvmChaos/inputs:
    duration: 30s
    port: 9091
    pid: 0
    class: ""
    method: ""
    exception: "NullPointerException("Something went wrong!")"
    startupCommand: "/usr/bin/pet-clinic.jar"
    rampTime: ""
```

### Method

The method name on which you apply the `exception` input variable.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-jvm-method-exception/method.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-jvm-method-exception
  labels:
    name: jvm-method-exception
spec:
  jvmChaos/inputs:
    duration: 30s
    port: 9091
    pid: 0
    class: ""
    method: "welcome"
    exception: ""
    startupCommand: "/usr/bin/pet-clinic.jar"
    rampTime: ""
```

### Pid

The process ID used by Byteman to target the services of the Java application. This is mutually exclusive with the `startupCommand` input variable.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-jvm-method-exception/pid.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-jvm-method-exception
  labels:
    name: jvm-method-exception
spec:
  jvmChaos/inputs:
    duration: 30s
    port: 9091
    pid: 1
    class: ""
    method: ""
    exception: ""
    rampTime: ""
```

### Startup command

The command used to start the Java process. A substring match is used with the given command for all processes. This is mutually exclusive with the `pid` input variable.

The following YAML snippet illustrates the use of this input variable:

[embedmd]:# (./static/manifests/linux-jvm-method-exception/startup-command.yaml yaml)
```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: linux-jvm-method-exception
  labels:
    name: jvm-method-exception
spec:
  jvmChaos/inputs:
    duration: 30s
    port: 9091
    pid: 0
    class: ""
    method: ""
    exception: ""
    startupCommand: "/usr/bin/pet-clinic.jar"
    rampTime: ""
```