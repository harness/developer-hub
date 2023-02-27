---
id: ec2-io-stress
title: EC2 IO stress
---

EC2 IO stress disrupts the state of infrastructure resources. 
- The fault induces stress on AWS EC2 instance using Amazon SSM Run command that is carried out using the SSM docs that comes in-built in the fault.
- It causes IO stress on the EC2 instance for a certain duration.

![EC2 IO Stress](./static/images/ec2-io-stress.png)

## Usage
<details>
<summary>View fault usage</summary>
<div>
Failure in file system read and write impacts the delivery, which is also known as "noisy neighbour' problems. It simulates slower disk operations by the application and nosiy neighbour problems by hogging the disk bandwidth. It also verifies the disk performance on increasing I/O threads and varying I/O block sizes. It checks if the application functions under high disk latency conditions, when I/O traffic is very high and includes large I/O blocks, and when other services monopolize the I/O disks. 
Injecting a rogue process into an EC2 instance may starve the main processes (or applications) (typically pid 1) of the resources allocated to it. This may slow down the application traffic or exhaust the resources resulting in degradation of the performance of the application. These faults determine the resilience of the application that undergo this stress.
</div>
</details>


## Prerequisites

- Kubernetes >= 1.17
- Ensure that the SSM agent is installed and running in the target EC2 instance.
- Ensure to create a Kubernetes secret having the AWS Access Key ID and Secret Access Key credentials in the `CHAOS_NAMESPACE`. Below is the sample secret file:

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
    aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

- It is recommended to use the same secret name, i.e. `cloud-secret`. Otherwise, you will need to update the `AWS_SHARED_CREDENTIALS_FILE` environment variable in the fault template and you may be unable to use the default health check probes. 

- Refer to [AWS Named Profile For Chaos](./security/aws-switch-profile.md) to know how to use a different profile for AWS faults.

## Permissions required

Here is an example AWS policy to execute the fault.

<details>
<summary>View policy for the fault</summary>

```json
{
    "Version": "2012-10-17",
    "Statement": [
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
                "ec2:DescribeInstanceStatus",
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

Refer to the [superset permission/policy](./security/policy-for-all-aws-faults.md) to execute all AWS faults.

## Default validations

The EC2 instance should be in healthy state.


## Fault tunables

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
        <td> EC2_INSTANCE_ID </td>
        <td> ID of the target EC2 instance. </td>
        <td> For example, <code>i-044d3cb4b03b8af1f</code>. </td>
    </tr>
    <tr>
        <td> REGION </td>
        <td> The AWS region ID where the EC2 instance has been created. </td>
        <td> For example, <code>us-east-1</code>. </td>
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
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Defaults to 30s. </td>
    </tr>
    <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive instance terminations (in seconds).</td>
        <td> Defaults to 60s. </td>
    </tr>
    <tr>
        <td> AWS_SHARED_CREDENTIALS_FILE </td>
        <td> Provide the path for aws secret credentials.</td>
        <td> Defaults to <code>/tmp/cloud_config.yml</code>. </td>
    </tr>
    <tr>
        <td> INSTALL_DEPENDENCIES </td>
        <td> Select to install dependencies used to run the io chaos. It can be either True or False.</td>
        <td> If the dependency already exists, you can turn it off. Defaults to True. </td>
    </tr>
    <tr>
        <td> FILESYSTEM_UTILIZATION_PERCENTAGE </td>
        <td> Specify the size as percentage of free space on the file system. </td>
        <td> Default to 0%, which will result in 1 GB Utilization. </td>
    </tr>
    <tr>
        <td> FILESYSTEM_UTILIZATION_BYTES </td>
        <td> Specify the size in GigaBytes(GB). <code>FILESYSTEM_UTILIZATION_PERCENTAGE</code> & <code>FILESYSTEM_UTILIZATION_BYTES</code> are mutually exclusive. If both are provided, <code>FILESYSTEM_UTILIZATION_PERCENTAGE</code> is prioritized. </td>
        <td> Default to 0GB, which will result in 1 GB Utilization. </td>
    </tr>
    <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> It is the number of IO workers involved in IO disk stress. </td>
        <td> Default to 4. </td>
    </tr>
    <tr>
        <td> VOLUME_MOUNT_PATH </td>
        <td> Fill the given volume mount path.</td>
        <td> Defaults to the user HOME directory. </td>
    </tr>
    <tr>
        <td> SEQUENCE </td>
        <td> It defines the sequence of chaos execution for multiple instances.</td>
        <td> Defaults to parallel. Supports serial sequence as well. </td>
    </tr>
    <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos (in seconds). </td>
        <td> For example, 30s. </td>
    </tr>
</table>

</details>

## Fault examples

### Fault tunables

Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Filesystem utilization in megabytes

It defines the filesystem value to be utilized in megabytes on the EC2 instance. You can tune it using the `FILESYSTEM_UTILIZATION_BYTES` environment variable.

You can tune it using the following example:

[embedmd]:# (./static/manifests/ec2-io-stress/filesystem-bytes.yaml yaml)
```yaml
# filesystem bytes to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-io-stress
    spec:
      components:
        env:
        - name: FILESYSTEM_UTILIZATION_BYTES
          value: '1024'
        # ID of the EC2 instance
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```

### Filesystem utilization in percentage

It defines the filesystem percentage to be utilized on the EC2 instance. You can tune it using the `FILESYSTEM_UTILIZATION_PERCENTAGE` ENV.

You can tune it using the following example:

[embedmd]:# (./static/manifests/ec2-io-stress/filesystem-percentage.yaml yaml)
```yaml
# filesystem percentage to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-io-stress
    spec:
      components:
        env:
        - name: FILESYSTEM_UTILIZATION_PERCENTAGE
          value: '50'
        # ID of the EC2 instance
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```

### Multiple workers

It defines the CPU threads to be run to spike the file system utilization, this will increase the growth of filesystem consumption. You can tune it using the `NUMBER_OF_WORKERS` ENV.

You can tune it using the following example:

[embedmd]:# (./static/manifests/ec2-io-stress/multiple-workers.yaml yaml)
```yaml
# multiple workers to utilize resources
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-io-stress
    spec:
      components:
        env:
        - name: NUMBER_OF_WORKERS
          value: '3'
        # ID of the EC2 instance
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```

### Volume mount path

It defines the volume mount path to the target attached to the EC2 instance. You can tune it using the `VOLUME_MOUNT_PATH` ENV.

Use the following example to tune it:

[embedmd]:# (./static/manifests/ec2-io-stress/volume-path.yaml yaml)
```yaml
# volume path to be used for io stress
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-io-stress
    spec:
      components:
        env:
        - name: VOLUME_MOUNT_PATH
          value: '/tmp'
        # ID of the EC2 instance
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```

### Multiple EC2 instances 

Multiple EC2 instances can be targeted in one chaos run. You can tune it using the `EC2_INSTANCE_ID` ENV.

You can tune it using the following example:

[embedmd]:# (./static/manifests/ec2-io-stress/multiple-instances.yaml yaml)
```yaml
# multiple instance targets
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-io-stress
    spec:
      components:
        env:
        # ids of the EC2 instances
        - name: EC2_INSTANCE_ID
          value: 'instance-1,instance-2'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```