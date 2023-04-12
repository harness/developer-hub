---
id: ecs-container-io-stress
title: ECS container IO stress
---

ECS container IO stress disrupts the state of infrastructure resources. It induces stress on the AWS ECS container using Amazon SSM Run command, which is carried out using SSM docs which is in-built into the fault.
- It causes I/O stress on the containers of the ECS task using the given `CLUSTER_NAME` environment variable for a specific duration.
- To select the Task Under Chaos (TUC), use the servie name associated with the task. If you provide the service name along with the cluster name, all the tasks associated with the given service will be selected as chaos targets.
- It tests the ECS task sanity (service availability) and recovery of the task containers subject to I/O stress.

![ECS Container IO Stress](./static/images/ecs-stress-chaos.png)

## Usage

<details>
<summary>View fault usage</summary>
<div>
File system read and write can evict the application (task container) and impact its delivery. These issues are also known as noisy neighbour problems.
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

- It is recommended to use the same secret name, i.e. `cloud-secret`. Otherwise, you will need to update the `AWS_SHARED_CREDENTIALS_FILE` environment variable in the fault template and you may be unable to use the default health check probes. 

- Refer to [AWS Named Profile For Chaos](./security-configurations/aws-switch-profile.md) to know how to use a different profile for AWS faults.

## Permissions required

Here is an example AWS policy to execute the fault.

<details>
<summary>View policy for the fault</summary>

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "ecs:UpdateContainerInstancesState",
                "ecs:RegisterContainerInstance",
                "ecs:ListContainerInstances",
                "ecs:DeregisterContainerInstance",
                "ecs:DescribeContainerInstances",
                "ecs:ListTasks",
                "ecs:DescribeClusters"

            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ssm:GetDocument",
                "ssm:DescribeDocument",
                "ssm:GetParameter",
                "ssm:GetParameters",
                "ssm:SendCommand",
                "ssm:CancelCommand",
                "ssm:CreateDocument",
                "ssm:DeleteDocument",
                "ssm:GetCommandInvocation",          
                "ssm:UpdateInstanceInformation",
                "ssm:DescribeInstanceInformation"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2messages:AcknowledgeMessage",
                "ec2messages:DeleteMessage",
                "ec2messages:FailMessage",
                "ec2messages:GetEndpoint",
                "ec2messages:GetMessages",
                "ec2messages:SendReply"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```
</details>

Refer to the [superset permission/policy](./security-configurations/policy-for-all-aws-faults.md) to execute all AWS faults.

## Default validations

The ECS container instance should be in a healthy state.

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
      <td> FILESYSTEM_UTILIZATION_BYTES </td>
      <td> Memory consumed during I/O stress (in GB). </td>
      <td> Defaults to 1. </td>
    </tr>
    <tr> 
      <td> VOLUME_MOUNT_PATH </td>
      <td> Location that points to the volume mount path used in I/O stress.</td>
      <td> Defaults to <code>/tmp</code>. </td>
    </tr>
    <tr> 
      <td> NUMBER_OF_WORKERS </td>
      <td> Number of workers for memory stress.</td>
      <td> Defaults to 1. </td>
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

### File system utilization percentage

It specifies the amount of free space available in the ECS container (in percentage). You can tune it using the  `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variable.

Use the following example to tune it:

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

### File system utilization bytes

It specifies the amount of free space available in the ECS container (in gigabytes). You can tune it using the  `FILESYSTEM_UTILIZATION_BYTES` environment variable.

The `FILESYSTEM_UTILIZATION_BYTES` and `FILESYSTEM_UTILIZATION_PERCENTAGE` environment variables are mutually exclusive. If values for both variables are provided, `FILESYSTEM_UTILIZATION_PERCENTAGE` takes precedence. 

Use the following example to tune it:

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

### Mount path

It specfiies the ;ocation that points to the volume mount path used in I/O stress. You can tune it using the `VOLUME_MOUNT_PATH` environment variable.

Use the following example to tune it:

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

### Workers for stress

It specifies the worker's count to apply stress. You can tune it using the `NUMBER_OF_WORKERS` environment variable.

Use the following example to tune it:

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
