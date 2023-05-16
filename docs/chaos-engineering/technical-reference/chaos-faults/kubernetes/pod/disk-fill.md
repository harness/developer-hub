---
id: disk-fill
title: Disk fill
---
## Introduction

Disk fill is a Kubernetes pod-level chaos fault that applies disk stress by filling the pod's ephemeral storage on a node. This fault evicts the application pod if its capacity exceeds the pod's ephemeral storage limit.

![Disk Fill](./static/images/disk-fill.png)

## Use cases
Disk fill:
- Tests the ephemeral storage limits and ensures that the parameters are sufficient.
- Determines the resilience of the application to unexpected storage exhaustions. 
- Evaluates the application's resilience to disk stress or replica evictions.
- Simulates the filled data mount points.
- Verifies file system performance, and thin-provisioning support.
- Verifies space reclamation (UNMAP) capabilities on storage. 

:::info note
- Kubernetes > 1.16 is required to execute this fault.
- The application pods should be in the running before and after injecting chaos.
- Appropriate Ephemeral storage requests and limits should be set for the application before running the fault. An example specification is shown below:
```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: frontend
    spec:
      containers:
      - name: db
        image: mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: "password"
        resources:
          requests:
            ephemeral-storage: "2Gi"
          limits:
            ephemeral-storage: "4Gi"
      - name: wp
        image: wordpress
        resources:
          requests:
            ephemeral-storage: "2Gi"
          limits:
            ephemeral-storage: "4Gi"
```
:::

## Fault tunables

  <h3>Mandatory tunables</h3>
    <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr> 
        <td> FILL_PERCENTAGE </td>
        <td> Percentage to fill the ephemeral storage limit. This limit is set in the target pod. </td>
        <td> It can be set to more than 100 which force evicts the pod. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/disk-fill#disk-fill-percentage">disk fill percentage</a></td>
      </tr>
      <tr>
        <td> EPHEMERAL_STORAGE_MEBIBYTES </td>
        <td> Ephemeral storage required to be filled (in mebibytes). It is mutually exclusive with <code>FILL_PERCENTAGE</code> environment variable. If both are provided, <code>FILL_PERCENTAGE</code> takes precedence.</td>
        <td> For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/disk-fill#disk-fill-mebibytes">disk fill mebibytes</a></td>
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
        <td> TARGET_CONTAINER </td>
        <td> Name of the container subject to disk fill. </td>
        <td> If it is not provided, the first container in the target pod will be subject to chaos. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/container-kill/#kill-specific-container">kill specific container</a></td>
      </tr>
      <tr> 
        <td> CONTAINER_PATH </td>
        <td> Storage location of containers. </td>
        <td> Default: <code>/var/lib/docker/containers</code>. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/disk-fill#container-path">container path</a></td>
      </tr>
      <tr> 
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration for which to insert chaos (in seconds). </td>
        <td> Default: 60 s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration of the chaos</a></td>
      </tr>
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma-separated list of application pod names subject to disk fill chaos. </td>
        <td> If not provided, the fault selects the target pods randomly based on provided appLabels. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults#target-specific-pods">target specific pods</a></td>
      </tr> 
      <tr>
        <td> DATA_BLOCK_SIZE </td>
        <td> Data block size used to fill the disk (in KB). </td>
        <td> Default: 256 KB. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/disk-fill#data-block-size">data block size</a></td>
      </tr> 
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> Percentage of total pods to target. Provide numeric values. </td>
        <td> Default: 0 (corresponds to 1 replica). For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/kubernetes/pod/common-tunables-for-pod-faults#pod-affected-percentage">pod affected percentage</a></td>
      </tr> 
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before injecting chaos (in seconds). </td>
        <td> For example, 30 s. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time</a></td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple target pods. </td>
        <td> Default: parallel. Supports serial and parallel. For more information, go to <a href="https://developer.harness.io/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution">sequence of chaos execution</a></td>
      </tr>
    </table>


### Disk fill percentage

Percentage of ephemeral storage limit to be filled at `resource.limits.ephemeral-storage` within the target application. Tune it by using the `FILL_PERCENTAGE` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]: # "./static/manifests/disk-fill/fill-percentage.yaml yaml"

```yaml
## percentage of ephemeral storage limit specified at `resource.limits.ephemeral-storage` inside target application
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
    - name: disk-fill
      spec:
        components:
          env:
            ## percentage of ephemeral storage limit, which needs to be filled
            - name: FILL_PERCENTAGE
              value: "80" # in percentage
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```

### Disk fill mebibytes

Ephemeral storage required to be filled in the target pod. Tune it by using the `EPHEMERAL_STORAGE_MEBIBYTES` environment variable.

`EPHEMERAL_STORAGE_MEBIBYTES` is mutually exclusive with the `FILL_PERCENTAGE` environment variable. If `FILL_PERCENTAGE` environment variable is set, the fault uses `FILL_PERCENTAGE` for the fill. Otherwise, the dault fills the ephemeral storage based on `EPHEMERAL_STORAGE_MEBIBYTES` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]: # "./static/manifests/disk-fill/ephemeral-storage-mebibytes.yaml yaml"

```yaml
# ephemeral storage which needs to fill in will application
# if ephemeral-storage limits is not specified inside target application
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
    - name: disk-fill
      spec:
        components:
          env:
            ## ephemeral storage size, which needs to be filled
            - name: EPHEMERAL_STORAGE_MEBIBYTES
              value: "256" #in MiBi
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```

### Data block size

Size of the data block required to fill the ephemeral storage of the target pod. It is in terms of `KB`. The default value of `DATA_BLOCK_SIZE` is `256` KB. Tune it by using the `DATA_BLOCK_SIZE` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]: # "./static/manifests/disk-fill/data-block-size.yaml yaml"

```yaml
# size of the data block used to fill the disk
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
    - name: disk-fill
      spec:
        components:
          env:
            ## size of data block used to fill the disk
            - name: DATA_BLOCK_SIZE
              value: "256" #in KB
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```

### Container path

Storage location of the containers inside the host (node or VM). Tune it by using the `CONTAINER_PATH` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]: # "./static/manifests/disk-fill/container-path.yaml yaml"

```yaml
# path inside node/vm where containers are present
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
    - name: disk-fill
      spec:
        components:
          env:
            # storage location of the containers
            - name: CONTAINER_PATH
              value: "/var/lib/docker/containers"
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```