---
id: windows-ec2-cpu-hog
title: Windows EC2 CPU Hog
---

EC2 windows CPU hog induces stress on the AWS EC2 instances using Amazon SSM Run command, which is carried out using SSM docs that is in-built into the fault.
- It causes CPU chaos on the target windows ec2 instances using the given `EC2_INSTANCE_ID` environment variable for a specific duration.

![Windows EC2 CPU hog](./static/images/windows-ec2-cpu-hog.png)

## Usage

<details>
<summary>View fault usage</summary>
<div>
The fault causes CPU stress on the target AWS Windows EC2 instance(s). It simulates the situation of lack of CPU for processes running on the application, which degrades their performance. Injecting a rogue process into the target EC2 instance starves the main processes (or applications) (typically pid 1) of the resources allocated to it. This slows down the application traffic or exhausts the resources leading to degradation in performance of processes on the instance. These faults build resilience to such stress cases.
</div>
</details>

## Prerequisites

- Kubernetes >= 1.17
- SSM agent is installed and running on the target EC2 Windows instance.
- SSM IAM role should be attached to the target EC2 instance(s).
- Create a Kubernetes secret that has the AWS Access Key ID and Secret Access Key credentials in the `CHAOS_NAMESPACE`. A sample secret file looks like:

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

- If you change the secret key name (from `experiment.yml`), ensure that you update the `AWS_SHARED_CREDENTIALS_FILE` environment variable in the chaos experiment with the new name.

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

Refer to the [superset permission/policy](./policy-for-all-aws-faults) to execute all AWS faults.

## Default validations
The EC2 instance should be in a healthy state.


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
            <td> EC2_INSTANCE_ID </td>
            <td> ID(s) of the target EC2 instances</td>
            <td> For example: <code>i-044d3cb4b03b8af1f</code> </td>
        </tr>
        <tr>
            <td> REGION </td>
            <td> The AWS region ID where the EC2 instance has been created </td>
            <td> For example: <code>us-east-1</code> </td>
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
            <td> The total time duration for chaos injection (sec) </td>
            <td> Defaults to 30s </td>
        </tr>
        <tr>
            <td> AWS_SHARED_CREDENTIALS_FILE </td>
            <td> Provide the path for aws secret credentials</td>
            <td> Defaults to <code>/tmp/cloud_config.yml</code> </td>
        </tr>
        <tr>
            <td> CPU_CORE </td>
            <td> Provide the number of CPU cores to consume</td>
            <td> Defaults to 0 which means all available cpu cores </td>
        </tr>
        <tr>
            <td> SEQUENCE </td>
            <td> It defines sequence of chaos execution for multiple instance</td>
            <td> Default value: parallel. Supported: serial, parallel </td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injecting chaos (in seconds). </td>
            <td> For example, 30s. </td>
        </tr>
    </table>
</details>

## Fault examples

### Fault tunables

Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### CPU core

It defines the CPU core value to be utilised on the EC2 instance. You can tune it using the `CPU_CORE` environment variable, `0` means all the available cpu cores should be consumed.

Use the following example to tune it:

[embedmd]:# (./static/manifests/windows-ec2-cpu-hog/cpu-core.yaml yaml)
```yaml
# CPU cores to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: windows-ec2-cpu-hog
    spec:
      components:
        env:
        - name: CPU_CORE
          VALUE: '2'
        # ID of the EC2 instance
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```

### Multiple EC2 instances

Multiple EC2 instances can be targeted in one chaos run. You can tune it using the `EC2_INSTANCE_ID` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/windows-ec2-cpu-hog/multiple-instances.yaml yaml)
```yaml
# mutilple instance targets
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: windows-ec2-cpu-hog
    spec:
      components:
        env:
        # ids of the EC2 instances
        - name: EC2_INSTANCE_ID
          value: 'instance-1,instance-2,instance-3'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```
