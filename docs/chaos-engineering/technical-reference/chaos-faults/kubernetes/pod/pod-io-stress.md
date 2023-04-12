---
id: pod-io-stress
title: Pod IO stress
---

Pod I/O stress is a Kubernetes pod-level chaos fault that causes IO stress on the application pod by spiking the number of input and output requests.
- Aims to verify the resiliency of applications that share this disk resource for ephemeral (or persistent) storage.

![Pod IO Stress](./static/images/pod-io-stress.png)


## Usage
<details>
<summary>View fault usage</summary>
<div>
Disk pressure or CPU hog affects Kubernetes applications that results in the eviction of the application replica and impacts its delivery. These issues are referred to as "noisy neighbour" problems.
It simulates slower disk operations by the application and nosiy neighbour problems by hogging the disk bandwidth. It also verifies the disk performance on increasing I/O threads and varying I/O block sizes. It checks if the application functions under high disk latency conditions, when I/O traffic is very high and includes large I/O blocks, and when other services monopolize the I/O disks. 
Stressing the disk with continuous and heavy I/O can degrade the reads and writes with respect to the microservices. Scratch space consumed on a node may lead to lack of memory for new containers to be scheduled. These faults helps build immunity to such stress cases.
</div>
</details>

## Prerequisites

- Kubernetes> 1.16.


## Default validations

The application pods should be in running state before and after chaos injection.


## Fault tunables
<details>
    <summary>Fault tunables</summary>
    <h2>Optional fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> FILESYSTEM_UTILIZATION_PERCENTAGE </td>
        <td> Specify the size as percentage of free space on the file system </td>
        <td> Default to 10%</td>
      </tr>
      <tr>
        <td> FILESYSTEM_UTILIZATION_BYTES </td>
        <td> Specify the size in GigaBytes(GB). <code>FILESYSTEM_UTILIZATION_PERCENTAGE</code> & <code>FILESYSTEM_UTILIZATION_BYTES</code> are mutually exclusive. If both are provided, <code>FILESYSTEM_UTILIZATION_PERCENTAGE</code> is prioritized. </td>
        <td> </td>
      </tr>
      <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> It is the number of IO workers involved in IO disk stress </td>
        <td> Default to 4 </td>
      </tr> 
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> The time duration for chaos (seconds) </td>
        <td> Default to 120s </td>
      </tr>
      <tr>
        <td> VOLUME_MOUNT_PATH </td>
        <td> Fill the given volume mount path</td>
        <td> </td>
      </tr>
      <tr>
        <td> LIB_IMAGE </td>
        <td> Image used to run the stress command </td>
        <td> Default to <code>litmuschaos/go-runner:latest</code> </td>
      </tr>  
      <tr>
        <td> TARGET_PODS </td>
        <td> Comma separated list of application pod name subjected to pod io stress chaos</td>
        <td> If not provided, it will select target pods randomly based on provided appLabels</td>
      </tr>  
      <tr>
        <td> PODS_AFFECTED_PERC </td>
        <td> The Percentage of total pods to target </td>
        <td> Defaults to 0 (corresponds to 1 replica), provide numeric value only </td>
      </tr>
      <tr>
        <td> CONTAINER_RUNTIME </td>
        <td> container runtime interface for the cluster</td>
        <td> Defaults to containerd, supported values: docker, containerd and crio </td>
      </tr>
      <tr>
        <td> SOCKET_PATH </td>
        <td> Path of the containerd/crio/docker socket file </td>
        <td> Defaults to <code>/run/containerd/containerd.sock</code> </td>
      </tr>    
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> For example, 30 </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple target pods </td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
    </table>
</details>

## Fault examples

### Common and pod-specific tunables
Refer to the [common attributes](../../common-tunables-for-all-faults) and [pod-specific tunables](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

### Filesystem utilization percentage

It stresses the `FILESYSTEM_UTILIZATION_PERCENTAGE` percentage of total free space available in the pod.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-io-stress/filesystem-utilization-percentage.yaml yaml"

```yaml
# stress the i/o of the targeted pod with FILESYSTEM_UTILIZATION_PERCENTAGE of total free space
# it is mutually exclusive with the FILESYSTEM_UTILIZATION_BYTES.
# if both are provided then it will use FILESYSTEM_UTILIZATION_PERCENTAGE for stress
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
    - name: pod-io-stress
      spec:
        components:
          env:
            # percentage of free space of file system, need to be stressed
            - name: FILESYSTEM_UTILIZATION_PERCENTAGE
              value: "10" #in GB
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```

### Filesystem utilization bytes

It stresses the `FILESYSTEM_UTILIZATION_BYTES` GB of the i/o of the targeted pod.
It is mutually exclusive with the `FILESYSTEM_UTILIZATION_PERCENTAGE` ENV. If `FILESYSTEM_UTILIZATION_PERCENTAGE` ENV is set then it will use the percentage for the stress otherwise, it will stress the i/o based on `FILESYSTEM_UTILIZATION_BYTES` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-io-stress/filesystem-utilization-bytes.yaml yaml"

```yaml
# stress the i/o of the targeted pod with given FILESYSTEM_UTILIZATION_BYTES
# it is mutually exclusive with the FILESYSTEM_UTILIZATION_PERCENTAGE.
# if both are provided then it will use FILESYSTEM_UTILIZATION_PERCENTAGE for stress
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
    - name: pod-io-stress
      spec:
        components:
          env:
            # size of io to be stressed
            - name: FILESYSTEM_UTILIZATION_BYTES
              value: "1" #in GB
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```

### Container runtime and socket path

It defines the `CONTAINER_RUNTIME` and `SOCKET_PATH` ENV to set the container runtime and socket file path.

- `CONTAINER_RUNTIME`: It supports `docker`, `containerd`, and `crio` runtimes. The default value is `containerd`.
- `SOCKET_PATH`: It contains path of containerd socket file by default(`/run/containerd/containerd.sock`). For `docker`, specify path as `/var/run/docker.sock`. For `crio`, specify path as `/var/run/crio/crio.sock`.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-io-stress/container-runtime-and-socket-path.yaml yaml"

```yaml
## provide the container runtime and socket file path
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
    - name: pod-io-stress
      spec:
        components:
          env:
            # runtime for the container
            # supports docker, containerd, crio
            - name: CONTAINER_RUNTIME
              value: "containerd"
            # path of the socket file
            - name: SOCKET_PATH
              value: "/run/containerd/containerd.sock"
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```

### Mount path

The volume mount path, which needs to be filled. It can be tuned with `VOLUME_MOUNT_PATH` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-io-stress/mount-path.yaml yaml"

```yaml
# provide the volume mount path, which needs to be filled
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
    - name: pod-io-stress
      spec:
        components:
          env:
            # path need to be stressed/filled
            - name: VOLUME_MOUNT_PATH
              value: "/some-dir-in-container"
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```

### Workers for stress

The worker's count for the stress can be tuned with `NUMBER_OF_WORKERS` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-io-stress/workers.yaml yaml"

```yaml
# number of workers for the stress
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
    - name: pod-io-stress
      spec:
        components:
          env:
            # number of io workers
            - name: NUMBER_OF_WORKERS
              value: "4"
            - name: TOTAL_CHAOS_DURATION
              VALUE: "60"
```