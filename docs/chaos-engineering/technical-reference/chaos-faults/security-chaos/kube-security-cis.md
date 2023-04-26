---
id: kube-security-cis
title: Kube security CIS
---
## Introduction

Kube security CIS runs the CIS benchmark on the Kubernetes cluster and checks for the compliance of the cluster with the CIS benchmark. CIS benchmark is a set of security best practices to improve the resilience of the Kubernetes cluster.

![Kube Security CIS](./static/images/kube-security-cis.png)

## Use cases
Kube security CIS:
- Determines the compliance of the Kubernetes cluster with the CIS benchmark.
- Finds and fixes the security issues in the Kubernetes cluster.

:::info note
- Kubernetes > 1.16 is required to execute this fault.
- Appropriate permissions to execute this fault.
:::

<h3>Mandatory tunables</h3>
<table>
    <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
    </tr>
    <tr>
        <td> SOCKET_PATH </td>
        <td> Path to the <code>containerd/crio/docker</code> socket file. </td>
        <td> Default: <code>/run/containerd/containerd.sock</code>. </td>
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
        <td> CONFIG_FILE_PATH </td>
        <td> Provide the path to the config file to tune the benchmark</td>
        <td> Default: /tmp/cis-bench/config.yaml. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/security-chaos/kube-security-cis#tune-benchmark-using-config-file"> tune benchmark using config file.</a></td>
    </tr>
    <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
        <td> Default: 30 s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos.</a></td>
    </tr>
    <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive instance poweroffs (in seconds). </td>
        <td> Default: 30 s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#chaos-interval"> chaos interval.</a></td>
    </tr>
    <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target pods.</td>
        <td> Default: parallel. Supports <code>serial</code> sequence. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
    </tr>
    <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30 s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time.</a></td>
    </tr>
</table>


### Sample config file
To tune the benchmark to run only a subset of the tests, you can provide a config file to the fault. The config file contains the list of tests (in the YAML format) to be executed. The config file can be mounted as a configMap on the experiment pod.

The following YAML snippet illustrates the format of config file provided as a configMap:

[embedmd]:# (./static/manifests/kube-security-cis/sample-config.yaml yaml)
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cis-bench
  namespace: litmus
data:
  config.yaml: |
    KubernetesVersion: 1.18
    Benchmark: gke-1.2.0
    Target:
      - master
      - node
      - etcd
      - policies
    CheckGroup:
      - "3.1"
      - "3.2"
    CheckIndividual:
      - "3.1.1"
      - "3.1.2"
      - "3.1.3"
    ExcludeGroup:
      - "3.1"
      - "3.2"
    ExcludeIndividual:
      - "3.1.2"
      - "3.1.3"
      - "3.1.4"
```

### Kubernetes version
To specify the Kubernetes version manually, use the `KubernetesVersion` environment variable in the config file. If the Kubernetes version is not specified, the experiment automatically detects the Kubernetes version.

[embedmd]:# (./static/manifests/kube-security-cis/kubernetes-version.yaml yaml)
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cis-bench
  namespace: litmus
data:
  config.yaml: |
    KubernetesVersion: 1.18
```

:::tip
Either `Benchmark` or `KubernetesVersion` environment variables can be specified in the config file. Providing both the variables throws an error.
:::

### Benchmark platform
To specify the benchmark platform manually, use the `BenchmarkPlatform` environment variable in the config file. This specifies the CIS benchmark version to be used. If the benchmark platform is not specified, the experiment automatically detects the Kubernetes version and uses the corresponding CIS benchmark version. Go to <a href="https://github.com/aquasecurity/kube-bench/blob/main/docs/platforms.md">supported benchmark versions</a> to know more.

[embedmd]:# (./static/manifests/kube-security-cis/benchmark-platform.yaml yaml)
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cis-bench
  namespace: litmus
data:
  config.yaml: |
    Benchmark: gke-1.2.0
```

:::tip
Either `Benchmark` or `KubernetesVersion` environment variables can be specified in the config file. Providing both the variables throws an error.
:::

### Targets
To specify the targets manually, use the `Targets` environment variable in the config file. This specifies the list of tests to be executed. If the targets are not specified, the experiment executes the tests for all the targets. Supported targets include `[master, node, etcd, policies, managedservices]`. 

For example, if the target is `policies`, the experiment executes the tests for all the policies. Certain benchmark versions support only a subset of the targets. Go to <a href="https://github.com/aquasecurity/kube-bench/blob/main/docs/architecture.md">supported targets</a> to know more about each benchmark version.

[embedmd]:# (./static/manifests/kube-security-cis/targets.yaml yaml)
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cis-bench
  namespace: litmus
data:
  config.yaml: |
    Target:
      - master
      - node
      - etcd
```

### Specify groups or individual tests
To specify the groups or individual tests manually, use the `CheckIndividual` and/or `CheckGroup` environment variable in the config file. This specifies the list of tests to be executed. For example, if `1.1` is provided, the experiment executes the tests for the `1.1.x` group of tests only.

[embedmd]:# (./static/manifests/kube-security-cis/specify-test-group-individual.yaml yaml)
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cis-bench
  namespace: litmus
data:
  config.yaml: |
    CheckGroup:
      - "3.1"
      - "3.2"
    CheckIndividual:
      - "4.1.1"
      - "4.1.2"
      - "4.1.3"
```

### Skip tests
To skip certain tests, use the `ExcludeIndividual` and/or `ExcludeGroup` environment variable in the config file. This specifies the list of tests to be skipped. For example, if `1.1` is provided, the experiment skips the tests for the `1.1.x` group of tests.

[embedmd]:# (./static/manifests/kube-security-cis/exclude-test-group-individual.yaml yaml)
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cis-bench
  namespace: litmus
data:
  config.yaml: |
    ExcludeGroup:
      - "3.1"
      - "3.2"
    ExcludeIndividual:
      - "4.1.2"
      - "4.1.3"
      - "4.1.4"
```