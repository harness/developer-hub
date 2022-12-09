---
id: ecs-container-io-stress
title: ECS Container IO Hog
---

## Introduction

- ECS Container IO hog contains chaos to disrupt the state of infra resources. The fault can induce a stress chaos on AWS ECS container using Amazon SSM Run Command, this is carried out by using SSM Docs which is in-built in the fault for the give chaos experiment.

- It causes IO chaos on containers of ECS task with given `CLUSTER_NAME` using an SSM docs for a certain chaos duration.

- To select the Task Under Chaos (TUC) you can make use of servie name associated with the task that is, if you provide the service name along with cluster name only all the tasks associated with the given service will be selected as chaos targets.

- It tests the ECS task sanity (service availability) and recovery of the task containers subjected to IO stress.

:::tip Fault execution flow chart
![ECS Container IO Stress](./static/images/ecs-stress-chaos.png)
:::

## Uses

<details>
<summary>View the uses of the fault</summary>
<div>
Filesystem read and write is another very common and frequent scenario we find with conrainers/applications that can result in the eviction of the application (task container) and impact its delivery. Such scenarios that can still occur despite whatever availability aids docker provides. These problems are generally referred to as "Noisy Neighbour" problems.

Injecting a rogue process into a target task container, we starve the main microservice process (typically pid 1) of the resources allocated to it (where limits are defined) causing slowness in application traffic or in other cases unrestrained use can cause instance to exhaust resources leading to eviction of all task containers. So this category of chaos fault helps to build the immunity on the application undergoing any such stress scenario.
</div>
</details>

## Prerequisites

:::info

- Ensure that Kubernetes Version >= 1.17

**AWS EC2 Access Requirement:**

- Ensure that the ECS container metadata is enabled this feature is disabled by default. To enable it please follow the aws docs to [Enabling container metadata](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html). If you have your task running prior this activity you may need to restart it to get the metadata directory as mentioned in the docs.

- Ensure that both you and ECS cluster instances have a Role with required AWS access to do SSM and ECS operations. Refer the below mentioned sample policy for the fault (please note that the sample policy can be minimised further). To know more checkout [Systems Manager Docs](https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-launch-managed-instance.html). Also, please refer the below mentioned policy required for the experiment.

- Ensure to create a Kubernetes secret having the AWS access configuration(key) in the `CHAOS_NAMESPACE`. A sample secret file looks like:

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

- If you change the secret key name (from `cloud_config.yml`) please also update the `AWS_SHARED_CREDENTIALS_FILE` ENV value in the ChaosExperiment CR with the same name.
:::

## Default Validations

:::info

- ECS container instance should be in healthy state.

:::

## Fault Tunables

<details>
    <summary>Check the Fault Tunables</summary>
    <h2>Mandatory Fields</h2>
    <table>
        <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
        </tr>
        <tr> 
        <td> CLUSTER_NAME </td>
        <td> Name of the target ECS cluster</td>
        <td> Eg. cluster-1 </td>
        </tr>
        <tr>
        <td> REGION </td>
        <td> The region name of the target ECS cluster</td>
        <td> Eg. us-east-1 </td>
        </tr>
    </table>
    <h2>Optional Fields</h2>
<table>
    <tr>
      <th> Variables </th>
      <th> Description </th>
      <th> Notes </th>
    </tr>
    <tr> 
      <td> TOTAL_CHAOS_DURATION </td>
      <td> The total time duration for chaos injection (sec) </td>
      <td> Defaults to 30s </td>
    </tr>
    <tr> 
      <td> CHAOS_INTERVAL </td>
      <td> The interval (in sec) between successive chaos injection</td>
      <td> Defaults to 60s </td>
    </tr>  
    <tr> 
      <td> AWS_SHARED_CREDENTIALS_FILE </td>
      <td> Provide the path for aws secret credentials</td>
      <td> Defaults to <code>/tmp/cloud_config.yml</code> </td>
    </tr>
    <tr> 
      <td> FILESYSTEM_UTILIZATION_BYTES </td>
      <td> Provide the memory for IO stress (in GB)</td>
      <td> Defaults to 1 </td>
    </tr>
    <tr> 
      <td> VOLUME_MOUNT_PATH </td>
      <td> Provide the mount path for IO stress</td>
      <td> Defaults to /tmp </td>
    </tr>
    <tr> 
      <td> NUMBER_OF_WORKERS </td>
      <td> Provide the number of workers for memory stress chaos</td>
      <td> Defaults to 1 </td>
    </tr>
    <tr>
      <td> SEQUENCE </td>
      <td> It defines sequence of chaos execution for multiple instance</td>
      <td> Default value: parallel. Supported: serial, parallel </td>
    </tr>
    <tr>
      <td> RAMP_TIME </td>
      <td> Period to wait before and after injection of chaos in sec </td>
      <td> </td>
    </tr>     
</table>
</details>

## Fault Examples

### Common and AWS specific tunables

Refer the [common attributes](../common-tunables-for-all-faults) and [AWS specific tunable](./aws-fault-tunables) to tune the common tunables for all faults and aws specific tunables.

### Filesystem Utilization Percentage

It stresses the `FILESYSTEM_UTILIZATION_PERCENTAGE` percentage of total free space available in the ECS container.

Use the following example to tune this:

[embedmd]:# (./static/manifests/ecs-stress-chaos/filesystem-utilization-percentage.yaml yaml)
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
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ecs-container-io-stress
    spec:
      components:
        env:
        # percentage of free space of file system, need to be stressed
        - name: FILESYSTEM_UTILIZATION_PERCENTAGE
          value: '10' #in GB
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Filesystem Utilization Bytes

It stresses the `FILESYSTEM_UTILIZATION_BYTES` GB of the i/o of the targeted ECS container. It is mutually exclusive with the `FILESYSTEM_UTILIZATION_PERCENTAGE` ENV. 

If `FILESYSTEM_UTILIZATION_PERCENTAGE` ENV is set then it will use the percentage for the stress otherwise, it will stress the i/o based on `FILESYSTEM_UTILIZATION_BYTES` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/ecs-container-io-stress/filesystem-utilization-bytes.yaml yaml)
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
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ecs-container-io-stress
    spec:
      components:
        env:
        # size of io to be stressed
        - name: FILESYSTEM_UTILIZATION_BYTES
          value: '1' #in GB
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Mount Path

The volume mount path, which needs to be filled. It can be tuned with `VOLUME_MOUNT_PATH ENV`.

Use the following example to tune this:

[embedmd]:# (./static/manifests/ecs-container-io-stress/mount-path.yaml yaml)
```yaml
# provide the volume mount path, which needs to be filled
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ecs-container-io-stress
    spec:
      components:
        env:
        # path need to be stressed/filled
        - name: VOLUME_MOUNT_PATH
          value: '/some-dir-in-container'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```

### Workers For Stress

The worker's count for the stress can be tuned with `NUMBER_OF_WORKERS` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/ecs-container-io-stress/io-number-of-workers.yaml yaml)
```yaml
# number of workers for the stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ecs-container-io-stress
    spec:
      components:
        env:
        # number of io workers 
        - name: NUMBER_OF_WORKERS
          value: '4'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
