---
id: ebs-loss-by-id
title: EBS loss by ID
---
EBS loss by ID disrupts the state of EBS volume by detaching it from the node (or EC2) instance using volume ID for a certain duration.
- In case of EBS persistent volumes, the volumes can self-attach and the re-attachment step can be skipped.
- It tests the deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod.

![EBS Loss By ID](./static/images/ebs-loss.png)

## Usage

<details>
<summary>View fault usage</summary>
<div>
It tests the deployment sanity (replica availability and uninterrupted service) and recovery workflows of the application pod.
</div>
</details>

## Prerequisites

- Kubernetes > 1.16.
- Adequate AWS access to attach or detach an EBS volume for the instance. 
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

- EBS volume is attached to the instance.

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
        <td> EBS_VOLUME_ID </td>
        <td> Comma-separated list of volume IDs subject to EBS detach. </td>
        <td> For example, <code>ebs-vol-1,ebs-vol-2</code>. </td>
      </tr>
      <tr>
        <td> REGION </td>
        <td> Region name for the target volumes.</td>
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
        <td> Time interval between the attachment and detachment of the volumes (in seconds). </td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple volumes.</td>
        <td> Defaults to parallel. Supports serial sequence as well. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. </td>
      </tr>
    </table>
</details>

## Fault examples

### Common and AWS-specific tunables

Refer to the [common attributes](../common-tunables-for-all-faults) and [AWS-specific tunables](./aws-fault-tunables) to tune the common tunables for all faults and aws specific tunables.

### Detach volumes by ID

It contains a comma-separated list of volume IDs that will be subject to EBS detach. You can tune it using the `EBS_VOLUME_ID` environment variable.

Use the following example to tune it:

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