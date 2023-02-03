---
title: Common pod fault tunables
---
Fault tunables which are common to all pod-level faults are listed here. These tunables can be provided at `.spec.experiment[*].spec.components.env` in the chaosengine.

### Target specific pods

It defines the comma-separated name of the target pods subject to chaos. You can tune it using the `TARGET_PODS` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/common/target-pods.yaml yaml)
```yaml
## it contains comma separated target pod names
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
  - name: pod-delete
    spec:
      components:
        env:
        ## comma separated target pod names
        - name: TARGET_PODS
          value: 'pod1,pod2'
```

### Pod affected percentage

It defines the percentage of pods subject to chaos with matching the labels provided at `.spec.appinfo.applabel` inside the chaosengine. You can tune it using the `PODS_AFFECTED_PERC` environment variable. If `PODS_AFFECTED_PERC` is set to `empty` or `0`, it targets a minimum of one pod.

Use the following example to tune it:

[embedmd]:# (./static/manifests/common/pod-affected-percentage.yaml yaml)
```yaml
## it contains percentage of application pods to be targeted with matching labels or names in the application namespace
## supported for all pod-level fault expect pod-autoscaler
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
  - name: pod-delete
    spec:
      components:
        env:
        # percentage of application pods
        - name: PODS_AFFECTED_PERC
          value: '100'
```

### Target specific container

It defines the name of the target container subject to chaos. You can tune it using the `TARGET_CONTAINER` environment variable. If `TARGET_CONTAINER` is set to `empty`, it uses the first container of the target pod.

Use the following example to tune it:

[embedmd]:# (./static/manifests/common/target-container.yaml yaml)
```yaml
## name of the target container
## it will use first container as target container if TARGET_CONTAINER is provided as empty
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
  - name: pod-delete
    spec:
      components:
        env:
        # name of the target container
        - name: TARGET_CONTAINER
          value: 'nginx'
```

### Default application health check

It defines the default application status checks as a tunable. It is helpful in cases where you do not wish to validate the application status as a mandatory check before and after chaos. You can tune it using the `DEFAULT_APP_HEALTH_CHECK` environment variable. If `DEFAULT_APP_HEALTH_CHECK` is not provided, it is set to `true`.

Use the following example to tune it:

[embedmd]:# (./static/manifests/common/default-app-health-check.yaml yaml)
```yaml
## application status check as tunable
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
  - name: pod-delete
    spec:
      components:
        env:
        - name: DEFAULT_APP_HEALTH_CHECK
          value: 'false'
```

### Node label filter for selecting the target pods

It defines the target application pod selection from a specific node. It is helpful in cases where you do not wish to select the pods scheduled on specific nodes as chaos candidates considering the pod affected percentage. You can tune it using the `NODE_LABEL` environment variable.

<b>This feature requires node-level permission or cluster role service account to filter pods on a specific node.</b>

<table>
  <tr>
    <th>APP_LABEL</th>
    <th>TARGET_PODS</th>
    <th>NODE_LABEL</th>
    <th>SELECTED PODS</th>
  </tr>
  <tr>
    <td>Provided</td>
    <td>Provided</td>
    <td>Provided</td>
    <td>The target pods that are filtered from applabel which reside on the node containing the given node label. It is specified using the <code>TARGET_PODS</code> environment variable. </td>
  </tr>
   <tr>
    <td>Provided</td>
    <td>Not Provided</td>
    <td>Provided</td>
    <td>The pods filtered from applabel that reside on the node containing the given node label is selected. </td>
  </tr>
   <tr>
    <td>Not provided</td>
    <td>Provided</td>
    <td>Provided</td>
    <td>The target pods that are selected reside on the node with given node label. </td>
  </tr>
  <tr>
    <td>Not provided</td>
    <td>Not provided</td>
    <td>Provided</td>
    <td>Invalid</td>
  </tr>
  <tr>
    <td>Not provided</td>
    <td>Not provided</td>
    <td>Not provided</td>
    <td>Invalid</td>
  </tr>
</table>

Use the following example to tune it:
[embedmd]:# (./static/manifests/common/node-label-filter.yaml yaml)
```yaml
## node label to filter target pods
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
  - name: pod-delete
    spec:
      components:
        env:
        - name: NODE_LABEL
          value: 'kubernetes.io/hostname=worker-01'
```
