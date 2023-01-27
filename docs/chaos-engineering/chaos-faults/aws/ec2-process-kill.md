---
id: ec2-process-kill
title: EC2 process kill
---
EC2 process kill fault kills the target processes running on an EC2 instance.
- It checks the performance of the application/process running on the EC2 instance(s).

![EC2 Process Kill](./static/images/ec2-process-kill.png)

## Usage
<details>
<summary>View fault usage</summary>
<div>
This fault disrupts the application critical processes such as databases or message queues running on the EC2 instance by killing their underlying processes or threads. This fault determines the resilience of applications when processes on EC2 instances are unexpectedly killed (or disrupted).
</div>
</details>

## Prerequisites
- Kubernetes > 1.16
- SSM agent is installed and running in the target EC2 instance.
- Create a Kubernetes secret that has the AWS Access Key ID and Secret Access Key credentials in the `CHAOS_NAMESPACE`. Below is the sample secret file:

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

- If you change the secret name, ensure that you update the `experiment.yml` environment variable to derive the respective data from the secret. Also account for the path at which this secret is mounted as a file in the manifest ENV `AWS_SHARED_CREDENTIALS_FILE`.

### Note
You can pass the VM credentials as secrets or as a chaos-engine environment variable.

## Default validations

- EC2 instance should be in healthy state
- The target processes should exist in the VM.


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
        <td> ID of the target EC2 instance. </td>
        <td> For example, <code>i-044d3cb4b03b8af1f</code>. </td>
      </tr>
      <tr>
        <td> REGION </td>
        <td> The AWS region ID where the EC2 instance has been created. </td>
        <td> For example, <code>us-east-1</code>. </td>
      </tr>
      <tr>
        <td> PROCESS_IDS </td>
        <td> Process IDs of the target processes provided as comma separated values. </td>
        <td> For example, 183,253,857. </td>
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
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds).  </td>
        <td> For example, 30 </td>
      </tr>
    </table>
</details>

## Fault examples

### Common fault tunables
Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Process IDs
It contains the target process IDs running on a particular EC2 instance.

You can tune it using the following example:

[embedmd]:# (./static/manifests/ec2-process-kill/ec2-process-kill-processid.yaml yaml)
```yaml
# Process kill running on EC2 instance
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-process-kill
    spec:
      components:
        env:
        # List of Process IDs
        - name: PROCESS_IDS
          value: '8688,4678'
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        - name: REGION
          value: 'us-west-2'
```
