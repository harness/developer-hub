---
title: Chaos experiment
sidebar_position: 2
description: Chaos experiment specification and its values
redirect_from:
  - /docs/chaos-engineering/technical-reference/configurations/chaos-experiment
---

Granular definition of chaos intent specified via image, library, necessary permissions, low-level chaos parameters (default values).

This section describes the fields in the chaos experiment and the possible values that can be set against the same.

## Component specifications

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.definition.image</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify the image to run the ChaosExperiment </td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Mandatory</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: string)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i> (refer Notes)</td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.spec.definition.image</code> allows the developers to specify their experiment images. Typically set to the Litmus <code>go-runner</code> or the <code>ansible-runner</code>. This feature of the experiment enables BYOC (BringYourOwnChaos), where developers can implement their own variants of a standard chaos experiment</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.definition.imagePullPolicy</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag that helps the developers to specify imagePullPolicy for the ChaosExperiment</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Mandatory</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><code>IfNotPresent</code>, <code>Always</code> (type: string)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>Always</code></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.spec.definition.imagePullPolicy</code> allows developers to specify the pull policy for ChaosExperiment image. Set to <code>Always</code> during debug/test</td>
  </tr>
</table>

### Image

It allows the developers to specify their experiment images. Typically set to the Litmus go-runner or the ansible-runner. This feature of the experiment enables BYOC (BringYourOwnChaos), where developers can implement their own variants of a standard chaos experiment. It can be tuned via `image` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosexperiment/image.yaml yaml)

```yaml
apiVersion: litmuschaos.io/v1alpha1
description:
  message: |
    Deletes a pod belonging to a deployment/statefulset/daemonset
kind: ChaosExperiment
metadata:
  name: pod-delete
  labels:
    name: pod-delete
    app.kubernetes.io/part-of: litmus
    app.kubernetes.io/component: chaosexperiment
    app.kubernetes.io/version: latest
spec:
  definition:
    scope: Namespaced
    permissions:
      - apiGroups:
          - ""
          - "apps"
          - "apps.openshift.io"
          - "argoproj.io"
          - "batch"
          - "litmuschaos.io"
        resources:
          - "deployments"
          - "jobs"
          - "pods"
          - "pods/log"
          - "replicationcontrollers"
          - "deployments"
          - "statefulsets"
          - "daemonsets"
          - "replicasets"
          - "deploymentconfigs"
          - "rollouts"
          - "pods/exec"
          - "events"
          - "chaosengines"
          - "chaosexperiments"
          - "chaosresults"
        verbs:
          - "create"
          - "list"
          - "get"
          - "patch"
          - "update"
          - "delete"
          - "deletecollection"
    # image of the chaosexperiment
    image: "litmuschaos/go-runner:latest"
    imagePullPolicy: Always
    args:
    - -c
    - ./experiments -name pod-delete
    command:
    - /bin/bash
    env:

    - name: TOTAL_CHAOS_DURATION
      value: '15'

    - name: RAMP_TIME
      value: ''

    - name: FORCE
      value: 'true'

    - name: CHAOS_INTERVAL
      value: '5'

    - name: PODS_AFFECTED_PERC
      value: ''

    - name: LIB
      value: 'litmus'    

    - name: TARGET_PODS
      value: ''

    - name: SEQUENCE
      value: 'parallel'
      
    labels:
      name: pod-delete
      app.kubernetes.io/part-of: litmus
      app.kubernetes.io/component: experiment-job
      app.kubernetes.io/version: latest
```

### ImagePullPolicy

It allows developers to specify the pull policy for ChaosExperiment image. Set to Always during debug/test. It can be tuned via `imagePullPolicy` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosexperiment/imagePullPolicy.yaml yaml)

```yaml
apiVersion: litmuschaos.io/v1alpha1
description:
  message: |
    Deletes a pod belonging to a deployment/statefulset/daemonset
kind: ChaosExperiment
metadata:
  name: pod-delete
  labels:
    name: pod-delete
    app.kubernetes.io/part-of: litmus
    app.kubernetes.io/component: chaosexperiment
    app.kubernetes.io/version: latest
spec:
  definition:
    scope: Namespaced
    permissions:
      - apiGroups:
          - ""
          - "apps"
          - "apps.openshift.io"
          - "argoproj.io"
          - "batch"
          - "litmuschaos.io"
        resources:
          - "deployments"
          - "jobs"
          - "pods"
          - "pods/log"
          - "replicationcontrollers"
          - "deployments"
          - "statefulsets"
          - "daemonsets"
          - "replicasets"
          - "deploymentconfigs"
          - "rollouts"
          - "pods/exec"
          - "events"
          - "chaosengines"
          - "chaosexperiments"
          - "chaosresults"
        verbs:
          - "create"
          - "list"
          - "get"
          - "patch"
          - "update"
          - "delete"
          - "deletecollection"
    image: "litmuschaos/go-runner:latest"
    # imagePullPolicy of the chaosexperiment
    imagePullPolicy: Always
    args:
    - -c
    - ./experiments -name pod-delete
    command:
    - /bin/bash
    env:

    - name: TOTAL_CHAOS_DURATION
      value: '15'

    - name: RAMP_TIME
      value: ''

    - name: FORCE
      value: 'true'

    - name: CHAOS_INTERVAL
      value: '5'

    - name: PODS_AFFECTED_PERC
      value: ''

    - name: LIB
      value: 'litmus'    

    - name: TARGET_PODS
      value: ''

    - name: SEQUENCE
      value: 'parallel'
      
    labels:
      name: pod-delete
      app.kubernetes.io/part-of: litmus
      app.kubernetes.io/component: experiment-job
      app.kubernetes.io/version: latest
```

## Configuration Specification

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.definition.securityContext.podSecurityContext</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify security context for ChaosPod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type:corev1.PodSecurityContext)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td> The <code>.spec.definition.securityContext.podSecurityContext</code> allows the developers to specify the security context for the ChaosPod which applies to all containers inside the Pod.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.definition.securityContext.containerSecurityContext.privileged</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify the security context for the ChaosExperiment pod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>true, false</i> (type:bool)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.spec.definition.securityContext.containerSecurityContext.privileged</code> specify the securityContext params to the experiment container.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.definition.hostFileVolumes</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify the host file volumes to the ChaosPod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type\:map[string]string)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td> The <code>.spec.definition.hostFileVolumes</code> allows the developer to specify the host file volumes to the ChaosPod.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.definition.hostPID</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify the host PID for the ChaosPod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>true, false</i> (type:bool)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td> The <code>.spec.definition.hostPID</code> allows the developer to specify the host PID  for the ChaosPod. </td>
  </tr>
</table>

### PodSecurityContext

It allows the developers to specify the security context for the ChaosPod which applies to all containers inside the Pod. It can be tuned via `podSecurityContext` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosexperiment/pod-security-context.yaml yaml)

```yaml
apiVersion: litmuschaos.io/v1alpha1
description:
  message: |
    Deletes a pod belonging to a deployment/statefulset/daemonset
kind: ChaosExperiment
metadata:
  name: pod-delete
  labels:
    name: pod-delete
    app.kubernetes.io/part-of: litmus
    app.kubernetes.io/component: chaosexperiment
    app.kubernetes.io/version: latest
spec:
  definition:
    scope: Namespaced
    permissions:
      - apiGroups:
          - ""
          - "apps"
          - "apps.openshift.io"
          - "argoproj.io"
          - "batch"
          - "litmuschaos.io"
        resources:
          - "deployments"
          - "jobs"
          - "pods"
          - "pods/log"
          - "replicationcontrollers"
          - "deployments"
          - "statefulsets"
          - "daemonsets"
          - "replicasets"
          - "deploymentconfigs"
          - "rollouts"
          - "pods/exec"
          - "events"
          - "chaosengines"
          - "chaosexperiments"
          - "chaosresults"
        verbs:
          - "create"
          - "list"
          - "get"
          - "patch"
          - "update"
          - "delete"
          - "deletecollection"
    image: "litmuschaos/go-runner:latest"
    imagePullPolicy: Always
    args:
    - -c
    - ./experiments -name pod-delete
    command:
    - /bin/bash
    env:

    - name: TOTAL_CHAOS_DURATION
      value: '15'

    - name: RAMP_TIME
      value: ''

    - name: FORCE
      value: 'true'

    - name: CHAOS_INTERVAL
      value: '5'

    - name: PODS_AFFECTED_PERC
      value: ''

    - name: LIB
      value: 'litmus'    

    - name: TARGET_PODS
      value: ''

    - name: SEQUENCE
      value: 'parallel'
    # it contains pod security context
    securityContext:
      podSecurityContext:
        allowPrivilegeEscalation: true
    labels:
      name: pod-delete
      app.kubernetes.io/part-of: litmus
      app.kubernetes.io/component: experiment-job
      app.kubernetes.io/version: latest
```

### Container Security Context

It allows the developers to specify the security context for the container inside ChaosPod. It can be tuned via `containerSecurityContext` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosexperiment/container-security-context.yaml yaml)

```yaml
apiVersion: litmuschaos.io/v1alpha1
description:
  message: |
    Deletes a pod belonging to a deployment/statefulset/daemonset
kind: ChaosExperiment
metadata:
  name: pod-delete
  labels:
    name: pod-delete
    app.kubernetes.io/part-of: litmus
    app.kubernetes.io/component: chaosexperiment
    app.kubernetes.io/version: latest
spec:
  definition:
    scope: Namespaced
    permissions:
      - apiGroups:
          - ""
          - "apps"
          - "apps.openshift.io"
          - "argoproj.io"
          - "batch"
          - "litmuschaos.io"
        resources:
          - "deployments"
          - "jobs"
          - "pods"
          - "pods/log"
          - "replicationcontrollers"
          - "deployments"
          - "statefulsets"
          - "daemonsets"
          - "replicasets"
          - "deploymentconfigs"
          - "rollouts"
          - "pods/exec"
          - "events"
          - "chaosengines"
          - "chaosexperiments"
          - "chaosresults"
        verbs:
          - "create"
          - "list"
          - "get"
          - "patch"
          - "update"
          - "delete"
          - "deletecollection"
    image: "litmuschaos/go-runner:latest"
    imagePullPolicy: Always
    args:
    - -c
    - ./experiments -name pod-delete
    command:
    - /bin/bash
    env:

    - name: TOTAL_CHAOS_DURATION
      value: '15'

    - name: RAMP_TIME
      value: ''

    - name: FORCE
      value: 'true'

    - name: CHAOS_INTERVAL
      value: '5'

    - name: PODS_AFFECTED_PERC
      value: ''

    - name: LIB
      value: 'litmus'    

    - name: TARGET_PODS
      value: ''

    - name: SEQUENCE
      value: 'parallel'
    # it contains container security context
    securityContext:
      containerSecurityContext:
        privileged: true
    labels:
      name: pod-delete
      app.kubernetes.io/part-of: litmus
      app.kubernetes.io/component: experiment-job
      app.kubernetes.io/version: latest
```

### Host File Volumes

It allows the developer to specify the host file volumes to the ChaosPod. It can be tuned via `hostFileVolumes` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosexperiment/host-file-volumes.yaml yaml)

```yaml
apiVersion: litmuschaos.io/v1alpha1
description:
  message: |
    Deletes a pod belonging to a deployment/statefulset/daemonset
kind: ChaosExperiment
metadata:
  name: pod-delete
  labels:
    name: pod-delete
    app.kubernetes.io/part-of: litmus
    app.kubernetes.io/component: chaosexperiment
    app.kubernetes.io/version: latest
spec:
  definition:
    scope: Namespaced
    permissions:
      - apiGroups:
          - ""
          - "apps"
          - "apps.openshift.io"
          - "argoproj.io"
          - "batch"
          - "litmuschaos.io"
        resources:
          - "deployments"
          - "jobs"
          - "pods"
          - "pods/log"
          - "replicationcontrollers"
          - "deployments"
          - "statefulsets"
          - "daemonsets"
          - "replicasets"
          - "deploymentconfigs"
          - "rollouts"
          - "pods/exec"
          - "events"
          - "chaosengines"
          - "chaosexperiments"
          - "chaosresults"
        verbs:
          - "create"
          - "list"
          - "get"
          - "patch"
          - "update"
          - "delete"
          - "deletecollection"
    image: "litmuschaos/go-runner:latest"
    imagePullPolicy: Always
    args:
    - -c
    - ./experiments -name pod-delete
    command:
    - /bin/bash
    env:

    - name: TOTAL_CHAOS_DURATION
      value: '15'

    - name: RAMP_TIME
      value: ''

    - name: FORCE
      value: 'true'

    - name: CHAOS_INTERVAL
      value: '5'

    - name: PODS_AFFECTED_PERC
      value: ''

    - name: LIB
      value: 'litmus'    

    - name: TARGET_PODS
      value: ''

    - name: SEQUENCE
      value: 'parallel'
    # it contains host file volumes
    hostFileVolumes:
      - name: socket file
        mountPath: "/run/containerd/containerd.sock"
        nodePath: "/run/containerd/containerd.sock"
    labels:
      name: pod-delete
      app.kubernetes.io/part-of: litmus
      app.kubernetes.io/component: experiment-job
      app.kubernetes.io/version: latest
```

### Host PID

It allows the developer to specify the host PID for the ChaosPod. It can be tuned via `hostPID` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosexperiment/host-pid.yaml yaml)

```yaml
apiVersion: litmuschaos.io/v1alpha1
description:
  message: |
    Deletes a pod belonging to a deployment/statefulset/daemonset
kind: ChaosExperiment
metadata:
  name: pod-delete
  labels:
    name: pod-delete
    app.kubernetes.io/part-of: litmus
    app.kubernetes.io/component: chaosexperiment
    app.kubernetes.io/version: latest
spec:
  definition:
    scope: Namespaced
    permissions:
      - apiGroups:
          - ""
          - "apps"
          - "apps.openshift.io"
          - "argoproj.io"
          - "batch"
          - "litmuschaos.io"
        resources:
          - "deployments"
          - "jobs"
          - "pods"
          - "pods/log"
          - "replicationcontrollers"
          - "deployments"
          - "statefulsets"
          - "daemonsets"
          - "replicasets"
          - "deploymentconfigs"
          - "rollouts"
          - "pods/exec"
          - "events"
          - "chaosengines"
          - "chaosexperiments"
          - "chaosresults"
        verbs:
          - "create"
          - "list"
          - "get"
          - "patch"
          - "update"
          - "delete"
          - "deletecollection"
    image: "litmuschaos/go-runner:latest"
    imagePullPolicy: Always
    args:
    - -c
    - ./experiments -name pod-delete
    command:
    - /bin/bash
    env:

    - name: TOTAL_CHAOS_DURATION
      value: '15'

    - name: RAMP_TIME
      value: ''

    - name: FORCE
      value: 'true'

    - name: CHAOS_INTERVAL
      value: '5'

    - name: PODS_AFFECTED_PERC
      value: ''

    - name: LIB
      value: 'litmus'    

    - name: TARGET_PODS
      value: ''

    - name: SEQUENCE
      value: 'parallel'
    # it allows hostPID
    hostPID: true
    labels:
      name: pod-delete
      app.kubernetes.io/part-of: litmus
      app.kubernetes.io/component: experiment-job
      app.kubernetes.io/version: latest
```