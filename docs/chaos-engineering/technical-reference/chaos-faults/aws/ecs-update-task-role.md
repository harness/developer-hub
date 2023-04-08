---
id: ecs-update-task-role
title: ECS Update Task Role
---

ECS Update Task Role is a chaos fault that allows you to modify the IAM task role associated with an Amazon ECS (Elastic Container Service) task. This fault is useful for testing how your ECS tasks behave when their IAM role is changed, and verifying the authorization and access permissions of your ECS tasks under different IAM configurations.

![ECS Update Task Role](./static/images/ecs-update-task-role.png)

## Usage

<details>
<summary>View fault usage</summary>
<div>
This fault modifies the IAM task role associated with a container task by updating the task definition associated with the ECS service or task. It allows you to simulate scenarios where the IAM role associated with a task is changed, which may impact the authorization and access permissions of the containers running in the task.
The fault can be used to validate the behavior of your application and infrastructure during simulated IAM role changes, such as:

1. Testing how your application handles changes in IAM role permissions and access.
2. Verifying the authorization settings of your system when the IAM role is updated.
3. Evaluating the impact of changes in IAM roles on the security and compliance of your application.

It's important to note that modifying the IAM task role using the ECS Update Task Role fault is an intentional disruption and should be used carefully in controlled environments.

</div>
</details>


## Prerequisites

- Kubernetes >= 1.17
- ECS cluster running with the desired tasks and containers and familiarity with ECS service update and deployment concepts.
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

## Default validations

The ECS containers should be in a healthy state.

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
          <td> SERVICE_NAME </td>
          <td> Name of the ECS service under chaos. </td>
          <td> For example, <code>nginx-svc</code>. </td>
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
        <td> TASK_ROLE </td>
        <td> Provide a custom chaos role for the ECS Task containers. </td>
        <td> Default to no role </td>
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

### Task Role specification

It specifies the Taks role for the ECS task containers. You can tune it using the `TASK_ROLE` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/ecs-update-task-role/task-role.yaml yaml)
```yaml
# Set task role resource for the target task
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: aws-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ecs-update-task-role
    spec:
      components:
        env:
        - name: TASK_ROLE
          value: 'arn:aws:iam::149554801296:role/ecsTaskExecutionRole'
        - name: REGION
          value: 'us-east-2'
        - name: TOTAL_CHAOS_DURATION
          VALUE: '60'
```
