---
id: pod-cpu-hog-exec
title: Pod CPU hog exec
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod/pod-cpu-hog-exec
- /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/pod-cpu-hog-exec
---

Pod CPU hog exec is a Kubernetes pod-level chaos fault that consumes excess CPU resources of the application container. This fault applies stress on the target pods by simulating a lack of CPU for processes running on the Kubernetes application. This degrades the performance of the application.

![Pod CPU Hog Exec](./static/images/pod-cpu-hog-exec.png)

## Use cases

CPU hog exec:
- Simulates conditions where the application pods experience CPU spikes due to expected (or undesired) processes thereby testing the behaviour of application stack.
- Verifies metrics-based horizontal pod autoscaling as well as vertical autoscale, that is, demand based CPU addition.
- Facilitates scalability of nodes based on the growth beyond budgeted pods.
- Verifies the autopilot functionality of cloud managed clusters.
- Verifies multi-tenant load issues, that is, when the load increases on one container, this does not cause downtime in other containers.

### Permissions required

Below is a sample Kubernetes role that defines the permissions required to execute the fault.

```
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: hce
  name: pod-cpu-hog-exec
spec:
  definition:
    scope: Cluster # Supports "Namespaced" mode too
permissions:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["create", "delete", "get", "list", "patch", "deletecollection", "update"]
  - apiGroups: [""]
    resources: ["events"]
    verbs: ["create", "get", "list", "patch", "update"]
  - apiGroups: [""]
    resources: ["pods/log"]
    verbs: ["get", "list", "watch"]
    - apiGroups: [""]
    resources: ["pods/exec"]
    verbs: ["get", "list", "create"]
  - apiGroups: [""]
    resources: ["deployments, statefulsets"]
    verbs: ["get", "list"]
  - apiGroups: [""]
    resources: ["replicasets, daemonsets"]
    verbs: ["get", "list"]
  - apiGroups: [""]
    resources: ["chaosEngines", "chaosExperiments", "chaosResults"]
    verbs: ["create", "delete", "get", "list", "patch", "update"]
  - apiGroups: ["batch"]
    resources: ["jobs"]
    verbs: ["create", "delete", "get", "list", "deletecollection"]
```

### Prerequisites
- Kubernetes > 1.16 is required to execute this fault.
- The application pods should be in the running state before and after injecting chaos.

### Optional tunables

   <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> CPU_CORES </td>
        <td> Number of CPU cores subject to CPU stress. </td>
        <td> Default: 1. For more information, go to <a href="#cpu-cores">CPU cores</a> </td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration for which to insert chaos (in seconds). </td>
        <td> Default: 60 s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration of the chaos</a></td>
      </tr>
      <tr>
        <td> NODE_LABEL </td>
        <td> Node label used to filter the target node if <code>TARGET_NODE</code> environment variable is not set. </td>
        <td> It is mutually exclusive with the <code>TARGET_NODE</code> environment variable. If both are provided, the fault uses <code>TARGET_NODE</code>. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels">node label.</a></td>
      </tr>
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma-separated list of application pod names subject to pod CPU hog.</td>
        <td> If not provided, the fault selects the target pods randomly based on the provided appLabels. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults#target-specific-pods">target specific pods</a></td>
      </tr>
      <tr>
        <td> TARGET_CONTAINER </td>
        <td> Name of the target container under stress. </td>
        <td> If this value is not provided, the fault selects the first container of the target pod. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults#target-specific-container">target specific container</a> </td>
      </tr>
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> Percentage of total pods to target. Provide numeric values. </td>
        <td> Default: 0 (corresponds to 1 replica). For more information, go to <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults#pod-affected-percentage">pods affected percentage </a> </td>
      </tr>
      <tr>
        <td> CHAOS_INJECT_COMMAND </td>
        <td> Command to inject CPU chaos. </td>
        <td> Default: <code>md5sum /dev/zero</code>. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-cpu-hog-exec#chaos-inject-and-kill-commands">chaos inject command</a></td>
      </tr>
      <tr>
        <td> CHAOS_KILL_COMMAND </td>
        <td> Command to kill the chaos process. </td>
        <td> Defaults to <code>kill $(find /proc -name exe -lname '*/md5sum' 2>&1 | grep -v 'Permission denied' | awk -F/ '&#123;print $(NF-1)&#125;')</code>. Another useful one that generally works (in case the default doesn't) is <code>kill -9 $(ps afx | grep \"[md5sum] /dev/zero\" | awk '&#123;print $1&#125;' | tr '\n' ' ')</code>. In case neither works, please check whether the target pod's base image offers a shell. If yes, identify appropriate shell command to kill the chaos process. For more information, go to <a href="#chaos-inject-and-kill-commands">chaos kill command</a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before injecting chaos (in seconds). </td>
        <td> For example, 30 s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time</a></td>
      </tr>
      <tr>
        <td> LIB_IMAGE </td>
        <td> Image used to inject chaos. </td>
        <td> Default: <code>harness/chaos-go-runner:main-latest</code>. For more information, go to <a href = "/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#image-used-by-the-helper-pod">image used by the helper pod.</a></td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target pods. </td>
        <td> Default: parallel. Supports serial and parallel. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution">sequence of chaos execution</a></td>
      </tr>
    </table>


### CPU cores

Number of CPU cores to target. Tune it by using the `CPU_CORE` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]: # "./static/manifests/pod-cpu-hog-exec/cpu-cores.yaml yaml"

```yaml
# CPU cores for the stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: pod-cpu-hog-exec
      spec:
        components:
          env:
            # CPU cores for stress
            - name: CPU_CORES
              value: "1"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```

### Chaos inject and kill commands

The `CHAOS_INJECT_COMMAND` and `CHAOS_KILL_COMMAND` environment variables to set the chaos inject and chaos kill commands, respectively.
Default value for `CHAOS_INJECT_COMMAND` is "md5sum /dev/zero" and for `CHAOS_KILL_COMMAND`, it is "kill $(find /proc -name exe -lname '\*/md5sum' 2>&1 | grep -v 'Permission denied' | awk -F/ '\{print $(NF-1)}')"

The following YAML snippet illustrates the use of these environment variables:

[embedmd]: # "./static/manifests/pod-cpu-hog-exec/inject-and-kill-commands.yaml yaml"

```yaml
# provide the chaos kill, used to kill the chaos process
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: pod-cpu-hog-exec
      spec:
        components:
          env:
            # command to create the md5sum process to stress the cpu
            - name: CHAOS_INJECT_COMMAND
              value: "md5sum /dev/zero"
            # command to kill the md5sum process
            # alternative command: "kill -9 $(ps afx | grep \"[md5sum] /dev/zero\" | awk '{print$1}' | tr '\n' ' ')"
            - name: CHAOS_KILL_COMMAND
              value: "kill $(find /proc -name exe -lname '*/md5sum' 2>&1 | grep -v 'Permission denied' | awk -F/ '{print $(NF-1)}')"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```
