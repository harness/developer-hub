---
id: ecs-container-cpu-hog
title: ECS container CPU hog
---

ECS Container CPU hog disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.
- It causes CPU chaos on the containers of the ECS task using the given `CLUSTER_NAME` environment variable for a specific duration.
- To select the Task Under Chaos (TUC), use the servie name associated with the task. If you provide the service name along with the cluster name, all the tasks associated with the given service will be selected as chaos targets.
- It tests the ECS task sanity (service availability) and recovery of the task containers subject to CPU stress.


![ECS Container CPU Hog](./static/images/ecs-stress-chaos.png)


## Usage

<details>
<summary>View fault usage</summary>
<div>
CPU hogs evict the application (task container) and impact its delivery. These issues are also known as noisy neighbour problems.
Injecting a rogue process into a target container starves the main microservice process (typically pid 1) of the resources allocated to it (where the limits are defined). This slows down the application traffic or exhausts the resources leading to eviction of all task containers. This fault determines how a container recovers from such a memory exhaustion.
</div>
</details>

## Prerequisites

- Kubernetes >= 1.17
- ECS container metadata is enabled (disabled by default). To enable it, refer to this [docs](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html). If your task is running from before, you may need to restart it to get the metadata directory.
- You and the ECS cluster instances have a role with the required AWS access to perform the SSM and ECS operations. Refer to [systems manager docs](https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-launch-managed-instance.html).
- Create a Kubernetes secret that has the AWS access configuration(key) in the `CHAOS_NAMESPACE`. Below is a sample secret file:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cloud-secret
type: Opaque
stringData:
  cloud_config.yml: |-
    # Add the cloud AWS credentials respectively
    [default]
    aws_access_key_id = XXXXXXXXXXXXXXXXXXX
    aws_secret_access_key = XXXXXXXXXXXXXXX
```

- If you change the secret key name (from `cloud_config.yml`), ensure that you update the `AWS_SHARED_CREDENTIALS_FILE` environment variable in the chaos experiment with the new name.

## Default validations

- ECS container instance should be in a healthy state.

## Fault tunables

<details>
    <summary>Fault tunables</summary>
    <h2>Mandatory fields</h2>
    <table>
        <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
        </tr>
        <tr> 
        <td> CLUSTER_NAME </td>
        <td> Name of the target ECS cluster. </td>
        <td> For example, <code>cluster-1</code>. </td>
        </tr>
        <tr>
        <td> REGION </td>
        <td> Region name of the target ECS cluster</td>
        <td> For example, <code>us-east-1</code>. </td>
        </tr>
    </table>
    <h2>Optional fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Interval between successive instance terminations (in seconds).</td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr> 
        <td> AWS_SHARED_CREDENTIALS_FILE </td>
        <td> Path to the AWS secret credentials.</td>
        <td> Defaults to <code>/tmp/cloud_config.yml</code>. </td>
      </tr>
      <tr> 
        <td> CPU_CORE </td>
        <td> Number of CPU cores to consume.</td>
        <td> Defaults to 0. </td>
      </tr>
      <tr> 
        <td> CPU_LOAD </td>
        <td> Percentage of the CPU to consume.</td>
        <td> Defaults to 100. </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple instances</td>
        <td> Defaults to parallel. Supports serial sequence as well. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds).  </td>
        <td> For example, 30s. </td>
      </tr>
    </table>
</details>

## Fault examples

### Common and AWS-specific tunables

Refer to the [common attributes](../common-tunables-for-all-faults) and [AWS-specific tunables](./aws-fault-tunables) to tune the common tunables for all faults and aws specific tunables.

### CPU cores

It specifies the cores of CPU to hog for the target container instances. You can tune it using the ` CPU_CORE` environment variable. 0 core means all the available CPU resources should be consumed.

Use the following example to tune it:

[embedmd]:# (./static/manifests/ecs-stress-chaos/cpu-core.yaml yaml)
```yaml
# cpu cores for the stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ecs-container-cpu-hog
    spec:
      components:
        env:
        # provide the cpu core to be hogged
        - name: CPU_CORE
          value: '0'
        - name: REGION
          value: 'us-east-2'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### CPU load

It specifies the percentage of CPU to be consumed for the target container instances. You can tune it using the ` CPU_LOAD` environment variable. CPU load `100` means 100% CPU core is provided.

Use the following example to tune it:

[embedmd]:# (./static/manifests/ecs-stress-chaos/cpu-load.yaml yaml)
```yaml
# cpu load for the stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ecs-container-cpu-hog
    spec:
      components:
        env:
        # provide the cpu load percentage
        - name: CPU_LOAD
          value: '100'
        - name: CPU_CORE
          value: '0'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
