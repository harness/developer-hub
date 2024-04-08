---
title: Chaos engine
sidebar_position: 1
description: Chaos engine specification and its values
redirect_from:
  - /docs/chaos-engineering/technical-reference/configurations/chaos-engine
---

Bind an instance of a given app with one or more chaos experiments, define run characteristics, override chaos defaults, define steady-state hypothesis, reconciled by Litmus Chaos Operator.

This section describes the fields in the Chaos engine spec and the possible values that can be set against the same.

## State Specifications

It is a user-defined flag to trigger chaos. Setting it to active ensures the successful execution of chaos. Patching it with stop aborts ongoing experiments. It has a corresponding flag in the chaos engine status field, called engineStatus which is updated by the controller based on the actual state of the chaos engine. You can tune it using the engineState field. It supports active and stop values.

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.engineState</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to control the state of the chaos engine</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Mandatory</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><code>active</code>, <code>stop</code></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>active</code></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>engineState</code> in the spec is a user defined flag to trigger chaos. Setting it to <code>active</code> ensures successful execution of chaos. Patching it with <code>stop</code> aborts ongoing experiments. It has a corresponding flag in the chaos engine status field, called <code>engineStatus</code> which is updated by the controller based on actual state of the chaos engine.</td>
  </tr>
</table>

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/engine-state.yaml yaml)

```yaml
# contains the chaosengine state
# supports: active and stop states
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  # contains the state of engine
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

## Application Specifications

It contains AUT (application under test) details provided at `spec.appinfo` inside chaosengine.

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.appinfo.appns</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify namespace of application under test</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: string)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>appns</code> in the spec specifies the namespace of the AUT. Usually provided as a quoted string. It is optional for the infra chaos.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.appinfo.applabel</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify unique label of application under test</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: string)(pattern: "label_key=label_value")</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>applabel</code> in the spec specifies a unique label of the AUT. Usually provided as a quoted string of pattern key=value. Note that if multiple applications share the same label within a given namespace, the AUT is filtered based on the presence of the chaos annotation <code>litmuschaos.io/chaos: "true"</code>. If, however, the <code>annotationCheck</code> is disabled, then a random application (pod) sharing the specified label is selected for chaos. It is optional for the infra chaos.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.appinfo.appkind</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify resource kind of application under test</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><code>deployment</code>, <code>statefulset</code>, <code>daemonset</code>, <code>deploymentconfig</code>, <code>rollout</code></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i> (depends on app type)</td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>appkind</code> in the spec specifies the Kubernetes resource type of the app deployment. The Litmus ChaosOperator supports chaos on deployments, statefulsets and daemonsets. Application health check routines are dependent on the resource types, in case of some experiments. It is optional for the infra chaos</td>
  </tr>
</table>

### Application Under Test

It defines the `appns`, `applabel`, and `appkind` to set the namespace, labels, and kind of the application under test.

- `appkind`: It supports `deployment`, `statefulset`, `daemonset`, `deploymentconfig`, and `rollout`.
  It is mandatory for the pod-level experiments and optional for the rest of the experiments.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/app-info.yaml yaml)

```yaml
# contains details of the AUT(application under test)
# appns: name of the application
# applabel: label of the applicaton
# appkind: kind of the application. supports: deployment, statefulset, daemonset, rollout, deploymentconfig
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  # AUT details
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

## RBAC Specifications

It specifies the name of the serviceaccount mapped to a role/clusterRole with enough permissions to execute the desired chaos experiment. The minimum permissions needed for any given experiment are provided in the .spec.definition.permissions field of the respective chaosexperiment CR. It can be tuned via chaosServiceAccount field.

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.chaosServiceAccount</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify serviceaccount used for chaos experiment</td>
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
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>chaosServiceAccount</code> in the spec specifies the name of the serviceaccount mapped to a role/clusterRole with enough permissions to execute the desired chaos experiment. The minimum permissions needed for any given experiment is provided in the <code>.spec.definition.permissions</code> field of the respective <b>chaosexperiment</b> CR.</td>
  </tr>
</table>

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/service-account.yaml yaml)

```yaml
# contains name of the serviceAccount which contains all the RBAC permissions required for the experiment
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
  # name of the service account w/ sufficient permissions
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

## Runtime Specifications

It contains runtime details of the chaos experiments provided at `.spec` inside chaosengine.

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.terminationGracePeriodSeconds</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to control terminationGracePeriodSeconds for the chaos pods(abort case)</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td>integer value</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>30</code></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>terminationGracePeriodSeconds</code> in the spec controls the terminationGracePeriodSeconds for the chaos resources in abort case. Chaos pods contains chaos revert upon abortion steps, which continuously looking for the termination signals. The terminationGracePeriodSeconds should be provided in such a way that the chaos pods got enough time for the revert before completely terminated.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.jobCleanUpPolicy</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to control cleanup of chaos experiment job post execution of chaos</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><code>delete</code>, <code>retain</code></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>delete</code></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>jobCleanUpPolicy</code> controls whether the experiment pods are removed once execution completes. Set to <code>retain</code> for debug purposes (in the absence of standard logging mechanisms).</td>
  </tr>
</table>

### Jobcleanup Policy

It controls whether the experiment pods are removed once execution completes. Set to `retain` for debug purposes (in the absence of standard logging mechanisms).
It can be tuned via `jobCleanUpPolicy` fields. It supports `retain` and `delete`. The default value is `retain`.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/jobcleanup-policy.yaml yaml)

```yaml
# flag to delete or retain the chaos resources after completions of chaosengine
# supports: delete, retain. default: retain
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  jobCleanUpPolicy: "delete"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

### Termination Grace Period Seconds

It controls the `terminationGracePeriodSeconds` for the chaos resources in the abort case. Chaos pods contain chaos revert upon abortion steps, which continuously looking for the termination signals. The `terminationGracePeriodSeconds` should be provided in such a way that the chaos pods got enough time for the revert before being completely terminated.
It can be tuned via `terminationGracePeriodSeconds` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/terminationGracePeriod.yaml yaml)

```yaml
# contains flag to control the terminationGracePeriodSeconds for the chaos pod(abort case)
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  # contains terminationGracePeriodSeconds for the chaos pods
  terminationGracePeriodSeconds: 100
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

## Runner Specifications

It contains all the chaos-runner tunables provided at  `.spec.components.runner` inside chaosengine.

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.components.runner.image</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify image of ChaosRunner pod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: string)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i> (refer <i>Notes</i>)</td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.components.runner.image</code> allows developers to specify their own debug runner images. Defaults for the runner image can be enforced via the operator env <b>CHAOS_RUNNER_IMAGE</b></td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.components.runner.imagePullPolicy</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify imagePullPolicy for the ChaosRunner</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><code>Always</code>, <code>IfNotPresent</code></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><code>IfNotPresent</code></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.components.runner.imagePullPolicy</code> allows developers to specify the pull policy for chaos-runner. Set to <code>Always</code> during debug/test.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.components.runner.imagePullSecrets</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify imagePullSecrets for the ChaosRunner</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: []corev1.LocalObjectReference)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.components.runner.imagePullSecrets</code> allows developers to specify the <code>imagePullSecret</code> name for ChaosRunner. </td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.components.runner.runnerAnnotations</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Annotations that needs to be provided in the pod which will be created (runner-pod)</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td> <i>user-defined</i> (type: map[string]string) </td>
  </tr>
  <tr>
    <th>Default</th>
    <td> n/a </td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.components.runner.runnerAnnotation</code> allows developers to specify the custom annotations for the runner pod.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.components.runner.args</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Specify the args for the ChaosRunner Pod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: []string)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.components.runner.args</code> allows developers to specify their own debug runner args.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.components.runner.command</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Specify the commands for the ChaosRunner Pod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: []string)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.components.runner.command</code> allows developers to specify their own debug runner commands.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.components.runner.configMaps</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Configmaps passed to the chaos runner pod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td> <i> user-defined </i> </td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.spec.components.runner.configMaps</code> provides for a means to insert config information into the runner pod.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.components.runner.secrets</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Kubernetes secrets passed to the chaos runner pod.</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td> <i> user-defined </i> </td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.spec.components.runner.secrets</code> provides for a means to push secrets (typically project ids, access credentials etc.,) into the chaos runner pod. These are especially useful in case of platform-level/infra-level chaos experiments. </td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.components.runner.nodeSelector</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Node selectors for the runner pod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
  <td>Labels in the from of label key=value</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.spec.components.runner.nodeSelector</code> The nodeselector contains labels of the node on which runner pod should be scheduled. Typically used in case of infra/node level chaos.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.components.runner.resources</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Specify the resource requirements for the ChaosRunner pod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: corev1.ResourceRequirements)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.spec.components.runner.resources</code> contains the resource requirements for the ChaosRunner Pod, where we can provide resource requests and limits for the pod.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.components.runner.tolerations</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Toleration for the runner pod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: []corev1.Toleration)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.spec.components.runner.tolerations</code> Provides tolerations for the runner pod so that it can be scheduled on the respective tainted node. Typically used in case of infra/node level chaos.</td>
  </tr>
</table>

### ChaosRunner Annotations

It allows developers to specify the custom annotations for the runner pod. It can be tuned via `runnerAnnotations` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/runner-annotations.yaml yaml)

```yaml
# contains annotations for the chaos runner pod
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  components:
    runner:
     # annotations for the chaos-runner
     runnerAnnotations:
       name: chaos-runner
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

### ChaosRunner Args And Command

It defines the `args` and `command` to set the args and command of the chaos-runner respectively.

- `args`: It allows developers to specify their own debug runner args.
- `command`: It allows developers to specify their own debug runner commands.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/runner-args-and-command.yaml yaml)

```yaml
# contains args and command for the chaos runner
# it will be useful for the cases where custom image of the chaos-runner is used, which supports args and commands
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  components:
    # override the args and command for the chaos-runner
    runner:
      # name of the custom image
      image: "<your repo>/chaos-runner:ci"
      # args for the image
      args:
      - "/bin/sh"
      # command for the image
      command:
      - "-c"
      - "<custom-command>"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

### ChaosRunner Configmaps And Secrets

It defines the `configMaps` and `secrets` to set the configmaps and secrets mounted to the chaos-runner respectively.

- `configMaps`: It provides for a means to insert config information into the runner pod.
- `secrets`: It provides for a means to push secrets (typically project ids, access credentials, etc.,) into the chaos runner pod. These are especially useful in the case of platform-level/infra-level chaos experiments.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/runner-configmaps-and-secrets.yaml yaml)

```yaml
# contains configmaps and secrets for the chaos-runner
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  components:
    runner:
     # configmaps details mounted to the runner pod
     configMaps:
     - name: "configmap-01"
       mountPath: "/mnt"
     # secrets details mounted to the runner pod
     secrets:
     - name: "secret-01"
       mountPath: "/tmp"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

### ChaosRunner Image and ImagePullPolicy

It defines the `image` and `imagePullPolicy` to set the image and imagePullPolicy for the chaos-runner respectively.

- `image`: It allows developers to specify their own debug runner images. Defaults for the runner image can be enforced via the operator env `CHAOS_RUNNER_IMAGE`.
- `imagePullPolicy`: It allows developers to specify the pull policy for chaos-runner. Set to Always during debug/test.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/runner-image-and-pullPolicy.yaml yaml)

```yaml
# contains the image and imagePullPolicy of the chaos-runner
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  components:
    runner:
      # override the image of the chaos-runner
      # by default it is used the image based on the litmus version
      image: "litmuschaos/chaos-runner:latest"
      # imagePullPolicy for the runner image
      # supports: Always, IfNotPresent. default: IfNotPresent
      imagePullPolicy: "Always"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

### ChaosRunner ImagePullSecrets

It allows developers to specify the imagePullSecret name for the ChaosRunner. It can be tuned via `imagePullSecrets` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/runner-imagePullSecrets.yaml yaml)

```yaml
# contains the imagePullSecrets for the chaos-runner
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  components:
    runner:
      # secret name for the runner image, if using private registry
      imagePullSecrets:
      - name: regcred
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

### ChaosRunner NodeSelectors

The nodeselector contains labels of the node on which runner pod should be scheduled. Typically used in case of infra/node level chaos. It can be tuned via `nodeSelector` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/runner-nodeSelectors.yaml yaml)

```yaml
# contains the node-selector for the chaos-runner
# it will schedule the chaos-runner on the coresponding node with matching labels
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  components:
    runner:
      # nodeselector for the runner pod
      nodeSelector:
        context: chaos
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

### ChaosRunner Resource Requirements

It contains the resource requirements for the ChaosRunner Pod, where we can provide resource requests and limits for the pod. It can be tuned via `resources` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/runner-resources.yaml yaml)

```yaml
# contains the resource requirements for the runner pod
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  components:
    runner:
      # resource requirements for the runner pod
      resources:
        requests:
          cpu: "250m"
          memory: "64Mi"
        limits:
         cpu: "500m"
         memory: "128Mi"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

### ChaosRunner Tolerations

It provides tolerations for the runner pod so that it can be scheduled on the respective tainted node. Typically used in case of infra/node level chaos. It can be tuned via `tolerations` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/runner-tolerations.yaml yaml)

```yaml
# contains the tolerations for the chaos-runner
# it will schedule the chaos-runner on the tainted node
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  components:
    runner:
      # tolerations for the runner pod
      tolerations:
      - key: "key1"
        operator: "Equal"
        value: "value1"
        effect: "Schedule"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
```

## Experiment Specifications

It contains all the experiment tunables provided at `.spec.experiments[].spec.components` inside chaosengine.

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.experiments[].spec.components.configMaps</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Configmaps passed to the chaos experiment</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td> <i> user-defined </i> </td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>experiment[].spec.components.configMaps</code> provides for a means to insert config information into the experiment. The configmaps definition is validated for correctness and those specified are checked for availability (in the cluster/namespace) before being mounted into the experiment pods.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.experiments[].spec.components.secrets</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Kubernetes secrets passed to the chaos experiment</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td> <i> user-defined </i> </td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>experiment[].spec.components.secrets</code> provides for a means to push secrets (typically project ids, access credentials etc.,) into the experiment pods. These are especially useful in case of platform-level/infra-level chaos experiments. The secrets definition is validated for correctness and those specified are checked for availability (in the cluster/namespace) before being mounted into the experiment pods.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.experiments[].spec.components.experimentImage</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Override the image of the chaos experiment</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i> string </i></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>experiment[].spec.components.experimentImage</code> overrides the experiment image for the chaoexperiment.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.experiments[].spec.components.experimentImagePullSecrets</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Flag to specify imagePullSecrets for the ChaosExperiment</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: []corev1.LocalObjectReference)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.components.runner.experimentImagePullSecrets</code> allows developers to specify the <code>imagePullSecret</code> name for ChaosExperiment. </td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.experiments[].spec.components.nodeSelector</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Provide the node selector for the experiment pod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i> Labels in the from of label key=value</i></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>experiment[].spec.components.nodeSelector</code> The nodeselector contains labels of the node on which experiment pod should be scheduled. Typically used in case of infra/node level chaos.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.experiments[].spec.components.statusCheckTimeouts</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Provides the timeout and retry values for the status checks. Defaults to 180s & 90 retries (2s per retry)</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i> It contains values in the form (delay: int, timeout: int) </i></td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>delay: 2s and timeout: 180s</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>experiment[].spec.components.statusCheckTimeouts</code> The statusCheckTimeouts override the status timeouts inside chaosexperiments. It contains timeout & delay in seconds.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.experiments[].spec.components.resources</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Specify the resource requirements for the ChaosExperiment pod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: corev1.ResourceRequirements)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>experiment[].spec.components.resources</code> contains the resource requirements for the ChaosExperiment Pod, where we can provide resource requests and limits for the pod.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.experiments[].spec.components.experimentAnnotations</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Annotations that needs to be provided in the pod which will be created (experiment-pod)</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td> <i>user-defined</i> (type: label key=value) </td>
  </tr>
  <tr>
    <th>Default</th>
    <td> n/a </td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.spec.components.experimentAnnotation</code> allows developers to specify the custom annotations for the experiment pod.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Field</th>
    <td><code>.spec.experiments[].spec.components.tolerations</code></td>
  </tr>
  <tr>
    <th>Description</th>
    <td>Toleration for the experiment pod</td>
  </tr>
  <tr>
    <th>Type</th>
    <td>Optional</td>
  </tr>
  <tr>
    <th>Range</th>
    <td><i>user-defined</i> (type: []corev1.Toleration)</td>
  </tr>
  <tr>
    <th>Default</th>
    <td><i>n/a</i></td>
  </tr>
  <tr>
    <th>Notes</th>
    <td>The <code>.spec.components.tolerations</code>Tolerations for the experiment pod so that it can be scheduled on the respective tainted node. Typically used in case of infra/node level chaos.</td>
  </tr>
</table>

### Experiment Annotations

It allows developers to specify the custom annotations for the experiment pod. It can be tuned via `experimentAnnotations` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/experiment-annotations.yaml yaml)

```yaml
# contains annotations for the chaos runner pod
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
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        # annotations for the experiment pod
        experimentAnnotations:
          name: chaos-experiment
```

### Experiment Configmaps And Secrets

It defines the `configMaps` and `secrets` to set the configmaps and secrets mounted to the experiment pod respectively.

- `configMaps`: It provides for a means to insert config information into the experiment. The configmaps definition is validated for the correctness and those specified are checked for availability (in the cluster/namespace) before being mounted into the experiment pods.
- `secrets`: It provides for a means to push secrets (typically project ids, access credentials, etc.,) into the experiment pods. These are especially useful in the case of platform-level/infra-level chaos experiments. The secrets definition is validated for the correctness and those specified are checked for availability (in the cluster/namespace) before being mounted into the experiment pods.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/experiment-configmaps-and-secrets.yaml yaml)

```yaml
# contains configmaps and secrets for the experiment pod
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
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        # configmaps details mounted to the experiment pod
        configMaps:
        - name: "configmap-01"
          mountPath: "/mnt"
        # secrets details mounted to the experiment pod
        secrets:
        - name: "secret-01"
          mountPath: "/tmp"
```

### Experiment Image

It overrides the experiment image for the chaosexperiment. It allows developers to specify the experiment image. It can be tuned via `experimentImage` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/experiment-image.yaml yaml)

```yaml
# contains the custom image for the experiment pod
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
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        # override the image of the experiment pod
        experimentImage: "litmuschaos/go-runner:ci"
```

### Experiment ImagePullSecrets

It allows developers to specify the imagePullSecret name for ChaosExperiment. It can be tuned via `experimentImagePullSecrets` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/experiment-imagePullSecrets.yaml yaml)

```yaml
# contains the imagePullSecrets for the experiment pod
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
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        # secret name for the experiment image, if using private registry
        experimentImagePullSecrets:
        - name: regcred
```

### Experiment NodeSelectors

The nodeselector contains labels of the node on which experiment pod should be scheduled. Typically used in case of infra/node level chaos. It can be tuned via `nodeSelector` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/experiment-nodeSelectors.yaml yaml)

```yaml
# contains the node-selector for the experiment pod
# it will schedule the experiment pod on the coresponding node with matching labels
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
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        # nodeselector for the experiment pod
        nodeSelector:
          context: chaos
```

### Experiment Resource Requirements

It contains the resource requirements for the ChaosExperiment Pod, where we can provide resource requests and limits for the pod. It can be tuned via `resources` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/experiment-resources.yaml yaml)

```yaml
# contains the resource requirements for the experiment pod
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
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        # resource requirements for the experiment pod
        resources:
          requests:
            cpu: "250m"
            memory: "64Mi"
          limits:
          cpu: "500m"
          memory: "128Mi"
```

### Experiment Tolerations

It provides tolerations for the experiment pod so that it can be scheduled on the respective tainted node. Typically used in case of infra/node level chaos. It can be tuned via `tolerations` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/experiment-tolerations.yaml yaml)

```yaml
# contains the tolerations for the experiment pod
# it will schedule the experiment pod on the tainted node
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
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        # tolerations for the experiment pod
        tolerations:
        - key: "key1"
          operator: "Equal"
          value: "value1"
          effect: "Schedule"
```

### Experiment Status Check Timeout

It overrides the status timeouts inside chaosexperiments. It contains timeout & delay in seconds. It can be tuned via `statusCheckTimeouts` field.

Use the following example to tune this:

[embedmd]:# (./static/manifests/chaosengine/experiment-statusCheckTimeout.yaml yaml)

```yaml
# contains status check timeout for the experiment pod
# it will set this timeout as upper bound while checking application status, node status in experiments
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
  chaosServiceAccount: pod-delete-sa
  experiments:
  - name: pod-delete
    spec:
      components:
        # status check timeout for the experiment pod
        statusCheckTimeouts:
          delay: 2
          timeout: 180
```
