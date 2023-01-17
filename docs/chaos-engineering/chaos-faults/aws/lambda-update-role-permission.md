---
id: lambda-update-role-permission
title: Lambda Update Role Permission
---

## Introduction

- It modifies the policies of a role attached to lambda function. This helps in verifying the handling mechanism for function failure.

- It can also modify the role attached to lambda function

- It helps to checks the performance of the running lambda application, if the lambda function has not enough premissions.

:::tip Fault execution flow chart
![Lambda Update Role Permission](./static/images/lambda-update-role-permission.png)
:::

## Uses

<details>
<summary>View the uses of the fault</summary>
<div>
In most of the cases lambda functions are dependent on ohter services like RDS, DynamoDB, S3 etc, For that lambda needs specific permissions to access these services. So this chaos faults helps you to check how your application is behaving when lambda function has not enough permission to access its dependent services.

</div>
</details>

## Prerequisites

:::info

- Ensure that Kubernetes Version >= 1.17
- Kubernetes secret that has AWS access configuration(key) in the `CHAOS_NAMESPACE`. A secret file looks like this:

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

- If you change the secret key name (from `cloud_config.yml`), update the `AWS_SHARED_CREDENTIALS_FILE` environment variable value on `experiment.yaml` with the same name.
:::
## Permission Requirement

- Here is an example AWS policy to execute this fault.

<details>
<summary>View policy for this fault if `ROLE_ARN` ENV is set</summary>

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "iam:PassRole",
                "lambda:GetFunction",
                "lambda:UpdateFunctionConfiguration",
                "iam:AttachRolePolicy"
            ],
            "Resource": "*"
        }
    ]
}
```
</details>
<details>
<summary>View policy for this fault if `POLICY_ARN` ENV is set</summary>

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "iam:DetachRolePolicy",
                "lambda:GetFunction",
                "iam:ListAttachedRolePolicies",
                "iam:AttachRolePolicy",
                "iam:GetRolePolicy"
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

- The Lambda function should be up and running.

:::

## Experiment Tunables

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
        <td> FUNCTION_NAME </td>
        <td> Function name of the target lambda function. It support single function name.</td>
        <td> Eg: <code>test-function</code> </td>
      </tr>
      <tr>
        <td> POLICY_ARN </td>
        <td> Provide the policy arn that you want to detach from the role attached</td>
        <td> </td>
      </tr>
      <tr>
        <td> ROLE_ARN </td>
        <td> Provide the role arn that you want to update in the lambda function</td>
        <td> ROLE_ARN and POLICY_ARN are mutually exclusive. If both are provided, ROLE_ARN is prioritized</td>
      </tr>
      <tr>
        <td> REGION </td>
        <td> The region name of the target lambda function</td>
        <td> Eg: <code>us-east-2</code> </td>
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
        <td> The total time duration for chaos insertion in seconds </td>
        <td> Defaults to 30s </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> The interval (in seconds) between successive policy/role detach/update.</td>
        <td> Defaults to 30s </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple instance</td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in seconds </td>
        <td> Eg. 30 </td>
      </tr>
    </table>
</details>

## Fault Examples

### Common and AWS specific tunables

Refer the [common attributes](../common-tunables-for-all-faults) and [AWS specific tunable](./aws-fault-tunables) to tune the common tunables for all faults and aws specific tunables.

### Role Arn

It can update the role attached to lambda function to a newer role by using `ROLE_ARN` ENV as shown below.

Use the following example to tune this:

[embedmd]:# (./static/manifests/lambda-update-role-permission/function-role.yaml yaml)
```yaml
# contains the role arn for the lambda function
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: lambda-update-role-permission
    spec:
      components:
        env:
        # provide the role arn 
        - name: ROLE_ARN
          value: 'arn:aws:iam::ACCOUNT_ID:role/service-role/chaos-role'
        # provide the function name 
        - name: FUNCTION_NAME
          value: 'chaos-function' 
```
### Policy Arn

It can detach the policies that are attached to the role of lambda function by using `POLICY_ARN` ENV as shown below. 
If `ROLE_ARN` ENV is set, then it will use the ROLE_ARN to update the role attached to the lambda function, otherwise it will detach the policy provided in the `POLICY_ARN` from the role that is attached to the lambda function.

Use the following example to tune this:

[embedmd]:# (./static/manifests/lambda-update-role-permission/function-policy.yaml yaml)
```yaml
# contains the policy arn for the lambda function
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: lambda-update-role-permission
    spec:
      components:
        env:
        # provide the policy arn 
        - name: POLICY_ARN
          value: 'arn:aws:iam::ACCOUNT_ID:policy/service-role/chaos-policy'
        # provide the function name 
        - name: FUNCTION_NAME
          value: 'chaos-function'
```
