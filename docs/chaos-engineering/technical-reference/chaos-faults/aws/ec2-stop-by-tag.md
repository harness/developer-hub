---
id: ec2-stop-by-tag
title: EC2 stop by tag
---
## Introduction

EC2 stop by tag stops an EC2 instance using the provided tag and brings back the instance after a specific duration. When the `MANAGED_NODEGROUP` environment variable is enabled, the fault will not try to start the instance after chaos. Instead, it checks for the addition of a new node instance to the cluster.


![EC2 Stop By Tag](./static/images/ec2-stop-by-tag.png)

## Use cases
EC2 stop by tag:
- Determines the performance of the application (or process) running on the EC2 instance.
- Determines the resilience of an application to unexpected halts in the EC2 instance by validating its failover capabilities.

:::info note
- Kubernetes version 1.17 or later is required to execute the fault.
- Appropriate AWS access to stop and start an EC2 instance. 
- The EC2 instances should be in a healthy state.
- The Kubernetes secret should have the AWS access configuration(key) in the `CHAOS_NAMESPACE`. Below is the sample secret file.
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
- We recommend you use the same secret name, that is, `cloud-secret`. Otherwise, update the `AWS_SHARED_CREDENTIALS_FILE` environment variable in the fault template, and you won't be able to use the default health check probes. 
- Go to [AWS named profile for chaos](./security-configurations/aws-switch-profile) to use a different profile for AWS faults and the [superset permission/policy](./security-configurations/policy-for-all-aws-faults) to execute all AWS faults.
- Go to the [common tunables](../common-tunables-for-all-faults) and [AWS-specific tunables](./aws-fault-tunables) to tune the common tunables for all faults and AWS-specific tunables.
:::

:::warning
If the target EC2 instance is a part of a self-managed nodegroup, ensure that you drain the target node if any application is running on it. Cordon the target node before running the fault so that the fault pods do not schedule on it.
:::

Below is an example AWS policy to execute the fault.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:StartInstances",
                "ec2:StopInstances",
                "ec2:DescribeInstanceStatus",
                "ec2:DescribeInstances"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "autoscaling:DescribeAutoScalingInstances"
            ],
            "Resource": "*"
        }
    ]
}
```

## Fault tunables
 <h3>Mandatory tunables</h3>
    <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> INSTANCE_TAG </td>
        <td> Instance Tag to filter the target EC2 instance.</td>
        <td> The <code>INSTANCE_TAG</code> should be provided as <code>key:value</code> ex: <code>team:devops</code>.</td>
      </tr>
      <tr>
        <td> REGION </td>
        <td> The region name of the target instance.</td>
        <td> </td>
      </tr>
    </table>
    <h3>Optional tunables</h3>
    <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> INSTANCE_AFFECTED_PERC </td>
        <td> The Percentage of total EC2 instance to target. </td>
        <td> Defaults to 0 (corresponds to 1 instance), provide numeric value only. </td>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> The interval (in sec) between successive instance termination.</td>
        <td> Defaults to 30s. </td>
      </tr>
      <tr>
        <td> MANAGED_NODEGROUP </td>
        <td> Set to <code>enable</code> if the target instance is the part of self-managed nodegroups. </td>
        <td> Defaults to <code>disable</code>. </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple instance.</td>
        <td> Defaults to parallel. Supports serial sequence as well. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds).  </td>
        <td> For example, 30s. </td>
      </tr>    
    </table>

### Target single instance

Random EC2 instance that is stopped. Tune it by using the `INSTANCE_TAG` tag and `REGION` region.

You can tune it using the following example.

[embedmd]:# (./static/manifests/ec2-stop-by-tag/instance-tag.yaml yaml)
```yaml
# target the EC2 instances with matching tag
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-terminate-by-tag
    spec:
      components:
        env:
        # tag of the EC2 instance
        - name: INSTANCE_TAG
          value: 'key:value'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```

### Target Percent of instances

Percentage of EC2 instancs to stop, based on the `INSTANCE_TAG` tag and `REGION` region. Tune it by using the `INSTANCE_AFFECTED_PERC` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/ec2-stop-by-tag/instance-affected-percentage.yaml yaml)
```yaml
# percentage of EC2 instances, needs to terminate with provided tags
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-terminate-by-tag
    spec:
      components:
        env:
        # percentage of EC2 instance filtered by tags
        - name: INSTANCE_AFFECTED_PERC
          value: '100'
        # tag of the EC2 instance
        - name: INSTANCE_TAG
          value: 'key:value'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```