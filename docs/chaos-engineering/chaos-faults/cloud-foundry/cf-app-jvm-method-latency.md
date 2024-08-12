---
id: cf-app-jvm-method-latency
title: CF app JVM method latency
---

import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app JVM method latency injects latency into a method of a Java based Cloud Foundry app.

![CF App JVM Method Latency](./static/images/cf-app-jvm-method-latency.png)

## Use cases
CF app JVM method latency:
- Mimics slow external services to test app behavior under load.
- Identifies performance bottlenecks by introducing controlled delays.
- Uncovers issues caused by tight timeout thresholds during development.
- Prepares your application to handle increased response times.

### Mandatory tunables
<table>
  <tr>
    <th>Tunable</th>
    <th>Description</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td>organization</td>
    <td>Organization where the target app resides.</td>
    <td>For example, <code>dev-org</code>.</td>
  </tr>
  <tr>
    <td>space</td>
    <td>Space where the target app resides.</td>
    <td>The space must reside within the given organization. For example, <code>dev-space</code>.</td>
  </tr>
  <tr>
    <td>app</td>
    <td>The app in which chaos will be injected.</td>
    <td>The app must reside within the given organization and space. For example, <code>cf-app</code>.</td>
  </tr>
  <tr>
    <td>class</td>
    <td>The target Java class where the method lies. It should be provided in the format: <code>package-name.class-name</code></td>
    <td>For example, <code>Inventory</code></td>
  </tr>
  <tr>
    <td>method</td>
    <td>The target Java class method.</td>
    <td>For example, <code>AddToInventory</code></td>
  </tr>
  <tr>
    <td> deploymentModel </td>
    <td> The deployment model used for setting up the fault injector. It supports <code>model-1</code> and <code>model-2</code>. Model-1 assumes that the fault-injector exists within a diego cell VM whereas Model-2 assumes that the fault-injector exists within a jumpbox VM.</td>
    <td> Supports <code>model-1</code> and <code>model-2</code>. For more information, go to <a href="#deployment-model"> Deployment Model</a>. </td>
  </tr>
</table>

### Optional tunables
<table>
  <tr>
    <th>Tunable</th>
    <th>Description</th>
    <th>Notes</th>
  </tr>
  <tr>
    <td>latency</td>
    <td>The latency to be injected to the method, in milliseconds.</td>
    <td>Default: <code>2000</code></td>
  </tr>
  <tr>
    <td> javaHome </td>
		<td> Value of the <code>JAVA_HOME</code> environment variable.</td>
		<td> Not required if the Java binary file path is added to the Linux <code>PATH</code> env or <code>JAVA_HOME</code> env is added to the Linux <code>PATH</code> env. </td>
  </tr>
  <tr>
		<td> instanceAffectedPercentage </td>
		<td> Percentage of total number of app instances that will be targeted. </td>
		<td> Default: 0 (1 instance). For more information, go to <a href="#instance-affected-percentage"> instance affected percentage</a>. </td>
	</tr>
    <tr>
		<td> faultInjectorPort </td>
		<td> Local server port used by the fault-injector utility. </td>
		<td> Default: <code>50320</code>. If the default port is unavailable, a random port in the range of <code>50320-51320</code> is selected. For more information, go to <a href="#fault-injector-port"> fault injector port</a>. </td>
	</tr>
	<tr>
		<td> duration </td>
		<td> Duration through which chaos is injected into the target resource (in seconds). </td>
		<td> Default: 30s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> chaos duration</a>. </td>
	</tr>
	<tr>
		<td> skipSSLValidation </td>
		<td> Skip SSL validation while invoking CF APIs. </td>
		<td> Supports <code>true</code> and <code>false</code>. Default: <code>false</code>. For more information, go to <a href="#skip-ssl-validation"> skip SSL validation</a>. </td>
	</tr>
	<tr>
		<td> rampTime </td>
		<td> Period to wait before and after injecting chaos (in seconds). </td>
		<td> Defaults to 0. </td>
	</tr>
  <tr>
    <td> boshDeployment </td>
    <td> The bosh deployment under which the CF components are being managed. </td>
    <td> It can be obtained using the BOSH CLI command <code>bosh deployments</code>. For more information, go to <a href="#bosh-deployment"> BOSH deployment</a>. </td>
  </tr>
  <tr>
    <td> faultInjectorLocation </td>
    <td> Location of the fault injector with respect to the cloud foundry vms. </td>
    <td> Supports <code>local</code> and <code>vSphere</code>. For more information, go to <a href="#fault-injector-location"> Fault Injector Location</a>. </td>
  </tr>
</table>

<CFAndBOSHSecrets />

<VSphereSecrets />

### Class
The `class` input specifies the Java class whose method will be targeted. It shall be provided as: `package-name.class-name`.

The following YAML snippet illustrates the use of this input:

[embedmd]:# (./static/manifests/cf-app-jvm-method-latency/class.yaml yaml)
```yaml
# class
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-method-latency
  labels:
    name: app-jvm-method-latency
spec:
  cfAppJVMChaos/inputs:
    class: com.appinventory.appinventory.appInventoryController
    duration: 30s
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
```

### BOSH deployment
The `boshDeployment` input determines the BOSH deployment name under which all the CF resources are managed. You can obtain it using the BOSH CLI command `bosh deployments`.

The following YAML snippet illustrates the use of this input:

[embedmd]:# (./static/manifests/cf-app-jvm-method-latency/boshDeployment.yaml yaml)
```yaml
# bosh deployment
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-method-latency
  labels:
    name: app-jvm-method-latency
spec:
  cfAppJVMChaos/inputs:
    duration: 30s
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
```

### Instance affected percentage
The `instanceAffectedPercentage` input specifies the percentage of total number of app instances that will be targeted. It defaults to 0 (1 instance).

The following YAML snippet illustrates the use of this input:

[embedmd]:# (./static/manifests/cf-app-jvm-method-latency/instanceAffectedPercentage.yaml yaml)
```yaml
# instance affected percentage
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-method-latency
  labels:
    name: app-jvm-method-latency
spec:
  cfAppJVMChaos/inputs:
    duration: 30s
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    instanceAffectedPercentage: 50
```

### Fault injector location
The `faultInjectorLocation` input determines the location of the fault injector with respect to the infrastructure. It is the location where the fault-injector utility is executed.
- It can be local, that is, the same environment used by the infrastructure, or a remote machine.

The following YAML snippet illustrates the use of this input:

[embedmd]:# (./static/manifests/cf-app-jvm-method-latency/faultInjectorLocation.yaml yaml)
```yaml
# cf deployment platform
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-method-latency
  labels:
    name: app-jvm-method-latency
spec:
  cfAppJVMChaos/inputs:
    duration: 30s
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
```

### Skip SSL validation
The `skipSSLValidation` input variable determines whether to skip SSL validation for calling the CF APIs.

The following YAML snippet illustrates the use of this input:

[embedmd]:# (./static/manifests/cf-app-jvm-method-latency/skipSSLValidation.yaml yaml)
```yaml
# skip ssl validation for cf
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-method-latency
  labels:
    name: app-jvm-method-latency
spec:
  cfAppJVMChaos/inputs:
    duration: 30s
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    skipSSLValidation: true
```

### Fault injector port
The `faultInjectorPort` input determines the port used for the fault-injector local server.

The following YAML snippet illustrates the use of this input:

[embedmd]:# (./static/manifests/cf-app-jvm-method-latency/faultInjectorPort.yaml yaml)
```yaml
# fault injector port
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-method-latency
  labels:
    name: app-jvm-method-latency
spec:
  cfAppJVMChaos/inputs:
    duration: 30s
    faultInjectorLocation: local
    app: cf-app
    organization: dev-org
    space: dev-space
    faultInjectorPort: 50331
```
