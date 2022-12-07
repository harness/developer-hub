---
id: ec2-memory-hog
title: EC2 Memory Hog
---

## Introduction

- EC2 Memory Hog contains chaos to disrupt the state of infra resources. The fault can induce stress chaos on AWS EC2 Instance using Amazon SSM Run Command, this is carried out by using SSM Docs which is in-built in the fault for the give chaos scenario.
- It causes Memory Hog chaos on EC2 Instance using an SSM doc for a certain chaos duration.

:::tip Fault execution flow chart
![EC2 Memory Hog](./static/images/ec2-memory-hog.png)
:::

## Uses

### Uses of the fault

:::info

- The fault causes memory hog/stress on the target AWS EC2 Instance(s). The idea of this fault is to simulate issues when there is lack of memory for other runnning processes/applications resulting into degrading their performance.
- Injecting a rogue process into a target EC2 instance, we starve the main processes/applications (typically pid 1) of the resources allocated to it (where limits are defined) causing slowness in application traffic or in other cases unrestrained use can cause instance to exhaust resources leading to degradation in performance of processes/applications present on the instance. So this category of chaos fault helps to build the immunity on the application undergoing any such stress scenario.

:::

## Prerequisites

:::info

### Verify the prerequisites

- Ensure that Kubernetes Version >= 1.17

**AWS EC2 Access Requirement:**

- Ensure that SSM agent is installed and running in the target EC2 instance.
- Ensure to create a Kubernetes secret having the AWS Access Key ID and Secret Access Key credentials in the `CHAOS_NAMESPACE`. A sample secret file looks like:

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

- If you change the secret name then please also update the `experiment.yml` ENV values for deriving the respective data from the secret. Also account for the path at which this secret is mounted as a file in the manifest ENV `AWS_SHARED_CREDENTIALS_FILE`.

:::

## Default Validations

:::info

- EC2 instance should be in healthy state.

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
        <td> EC2_INSTANCE_ID </td>
        <td> ID of the target EC2 instance </td>
        <td> For example: <code>i-044d3cb4b03b8af1f</code> </td>
    </tr>
    <tr>
        <td> REGION </td>
        <td> The AWS region ID where the EC2 instance has been created </td>
        <td> For example: <code>us-east-1</code> </td>
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
        <td> INSTALL_DEPENDENCIES </td>
        <td> Select to install dependencies used to run the memory chaos. It can be either True or False</td>
        <td> Defaults to True </td>
    </tr>
    <tr>
        <td> MEMORY_CONSUMPTION </td>
        <td> The amount of memory to be hogged in the EC2 instance in terms of mega bytes </td>
        <td> Defaults to 500MB </td>
    </tr>
    <tr>
        <td> MEMORY_PERCENTAGE </td>
        <td> The amount of memory to be hogged in the EC2 instance in terms of percentage</td>
        <td> Defaults to 0 </td>
    </tr>
    <tr>
        <td> NUMBER_OF_WORKERS </td>
        <td> The number of workers used to run the stress process </td>
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
        <td> eg: 30 </td>
    </tr>
</table>

</details>

## Fault Examples

### Common Fault Tunables

Refer the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### MEMORY CONSUMPTION IN MEGABYTES

It defines the memory value to be utilised in megabytes on the EC2 instance. It can be tuned via `MEMORY_CONSUMPTION` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/ec2-memory-hog/memory-bytes.yaml yaml)
```yaml
# memory in mb to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-memory-hog
    spec:
      components:
        env:
        - name: MEMORY_CONSUMPTION
          VALUE: '1024'
        # ID of the EC2 instance
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```

### MEMORY CONSUMPTION BY PERCENTAGE

It defines the memory percentage value to be utilised on the EC2 instance. It can be tuned via `MEMORY_PERCENTAGE` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/ec2-memory-hog/memory-percentage.yaml yaml)
```yaml
# memory percentage to utilize
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-memory-hog
    spec:
      components:
        env:
        - name: MEMORY_PERCENTAGE
          VALUE: '50'
        # ID of the EC2 instance
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```

### MULTIPLE EC2 INSTANCES

Multiple EC2 instances can be targeted in one chaos run by providing comma seperated instance ids. It can be tuned via `EC2_INSTANCE_ID` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/ec2-memory-hog/multiple-instances.yaml yaml)
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
  - name: ec2-memory-hog
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

### MULTIPLE WORKERS

It defines the CPU threads to be run to spike the memory utilisation, this will increase the growth of memory consumption. It can be tuned via `NUMBER_OF_WORKERS` ENV.

Use the following example to tune this:

[embedmd]:# (./static/manifests/ec2-memory-hog/multiple-workers.yaml yaml)
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
  - name: ec2-memory-hog
    spec:
      components:
        env:
        - name: NUMBER_OF_WORKERS
          VALUE: '3'
        # ID of the EC2 instance
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```
