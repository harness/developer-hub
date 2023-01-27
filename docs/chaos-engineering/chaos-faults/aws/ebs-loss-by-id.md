---
id: ebs-loss-by-id
title: EBS Loss By ID
---

## Introduction
- It Detaches an EBS volume from the EC2 instance for a specified chaos duration using instance ids.
- In case of EBS persistent volumes, the volumes can get self-attached and the re-attachment step is skipped.

Tests deployment sanity (replica availability & uninterrupted service) and recovery workflows of the application pod.

:::tip Fault execution flow chart
![EBS Loss By ID](./static/images/ebs-loss.png)
:::

## Uses

<details>
<summary>View the uses of the fault</summary>
<div>
Coming soon.
</div>
</details>

## Prerequisites

:::info
- Ensure that Kubernetes Version > 1.17
- Ensure that you have sufficient AWS access to attach or detach an EBS volume form the instance (as mentioned in permission section below). 
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

## Permission Requirement

- Here is an example AWS policy to execute ebs loss fault.

<details>
<summary>View policy for this fault</summary>

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:AttachVolume",
                "ec2:DetachVolume"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": "ec2:DescribeVolumes",
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstanceStatus",
                "ec2:DescribeInstances"
            ],
            "Resource": "*"
        }
    ]
}
```
</details>

- Refer a [superset permission/policy](../policy-for-all-aws-faults) to execute all AWS faults.

## Default Validations

:::info
- EBS volume is attached to the instance.
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
        <td> EBS_VOLUME_ID </td>
        <td> Comma separated list of volume IDs subjected to EBS detach chaos</td>
        <td> Eg. ebs-vol-1,ebs-vol-2 </td>
      </tr>
      <tr>
        <td> REGION </td>
        <td> The region name for the target volumes</td>
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
        <td> The time duration for chaos insertion (sec) </td>
        <td> Defaults to 30s </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> The time duration between the attachment and detachment of the volumes (sec) </td>
        <td> Defaults to 30s </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple volumes</td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> Eg: 30 </td>
      </tr>
    </table>
</details>

## Fault Examples

### Common and AWS specific tunables

Refer the [common attributes](../common-tunables-for-all-faults) and [AWS specific tunable](./aws-fault-tunables) to tune the common tunables for all faults and aws specific tunables.

### Detach Volumes By ID

It contains comma separated list of volume IDs subjected to EBS detach chaos. It can be tuned via `EBS_VOLUME_ID` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/ebs-loss-by-id/ebs-volume-id.yaml yaml)
```yaml
# contains EBS volume ID 
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ebs-loss-by-id
    spec:
      components:
        env:
        # ID of the EBS volume
        - name: EBS_VOLUME_ID
          value: 'ebs-vol-1'
        # region for the EBS volume
        - name: REGION
          value: 'us-east-1'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
