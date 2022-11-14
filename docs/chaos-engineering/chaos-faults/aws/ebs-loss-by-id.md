---
id: ebs-loss-by-id
title: EBS Loss By ID
---

## Introduction
- It causes chaos to disrupt state of ebs volume by detaching it from the node/ec2 instance for a certain chaos duration using volume id.
- In case of EBS persistent volumes, the volumes can get self-attached and experiment skips the re-attachment step.
Tests deployment sanity (replica availability & uninterrupted service) and recovery workflows of the application pod.

:::tip Fault execution flow chart
![EBS Loss By ID](./static/images/ebs-loss.png)
:::

## Uses

<details>
<summary>View the uses of the experiment</summary>
<div>
Coming soon.
</div>
</details>

## Prerequisites

:::info
- Ensure that Kubernetes Version > 1.16.
- Ensure that you have sufficient AWS access to attach or detach an ebs volume for the instance. 
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
- If you change the secret key name (from `cloud_config.yml`) please also update the `AWS_SHARED_CREDENTIALS_FILE` ENV value on `experiment.yaml`with the same name.
:::

## Default Validations

:::info
- EBS volume is attached to the instance.
:::

## Experiment tunables

<details>
    <summary>Check the Experiment Tunables</summary>
    <h2>Mandatory Fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr> 
        <td> EBS_VOLUME_ID </td>
        <td> Comma separated list of volume IDs subjected to ebs detach chaos</td>
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

## Experiment Examples

### Common and AWS specific tunables

Refer the [common attributes](../common-tunables-for-all-experiments) and [AWS specific tunable](./aws-experiments-tunables) to tune the common tunables for all experiments and aws specific tunables.

### Detach Volumes By ID

It contains comma separated list of volume IDs subjected to ebs detach chaos. It can be tuned via `EBS_VOLUME_ID` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/ebs-loss-by-id/ebs-volume-id.yaml yaml)
```yaml
# contains ebs volume id 
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ebs-loss-by-id
    spec:
      components:
        env:
        # id of the ebs volume
        - name: EBS_VOLUME_ID
          value: 'ebs-vol-1'
        # region for the ebs volume
        - name: REGION
          value: 'us-east-1'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
