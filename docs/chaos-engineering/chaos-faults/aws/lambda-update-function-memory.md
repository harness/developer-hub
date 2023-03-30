---
id: lambda-update-function-memory
title: Lambda update function memory
---

Lambda update function memory causes the memory of a Lambda function to be updated to a specified value for a certain duration.
- It checks the performance of the application (or service) running with a new memory limit.
- It helps determine a safe overall memory limit value for the function.
- Smaller the memory limit higher will be the time taken by the Lambda function under load.


![Lambda Update Function Memory](./static/images/lambda-update-function-memory.png)


## Usage

<details>
<summary>View fault usage</summary>
<div>
Hitting a memory limit with Lambda functions may slow down the service and impact their delivery. Running out of memory due to smaller limits may interrupt the flow of the given function. These fault helps build resilience to such unexpected scenarios.
</div>
</details>

## Prerequisites
- Kubernetes >= 1.17
- Access for operating AWS Lambda functions.
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

- It is recommended to use the same secret name, i.e. `cloud-secret`. Otherwise, you will need to update the `AWS_SHARED_CREDENTIALS_FILE` environment variable in the fault template and you may be unable to use the default health check probes. 

- Refer to [AWS Named Profile For Chaos](./security-Configurations/aws-switch-profile) to know how to use a different profile for AWS faults.

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
                "lambda:UpdateFunctionConfiguration",
                "lambda:GetFunctionConcurrency",
                "lambda:GetFunction",
                "lambda:DeleteFunctionConcurrency",
                "lambda:PutFunctionConcurrency"
            ],
            "Resource": "*"
        }
    ]
}
```
</details>

Refer to the [superset permission/policy](./security-Configurations/policy-for-all-aws-faults) to execute all AWS faults.

## Default validations
The Lambda function should be up and running.

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
        <td> FUNCTION_NAME </td>
        <td> Function name of the target lambda function. It supports single function name.</td>
        <td> For example, <code>test-function</code> </td>
      </tr>
      <tr>
        <td> MEMORY_IN_MEGABYTES </td>
        <td> Provide the value of the memory limit of a function in megabytes.</td>
        <td> The minimum value of the memory limit on a lambda function is 128Mb and the maximum upto 10240Mb </td>
      </tr>
      <tr>
        <td> REGION </td>
        <td> The region name of the target lambda function</td>
        <td> For example, <code>us-east-2</code> </td>
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
        <td> The total time duration for chaos insertion in seconds </td>
        <td> Defaults to 30s </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> The interval (in seconds) between successive instance termination.</td>
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
        <td> For example, 30 </td>
      </tr>
    </table>
</details>

## Fault examples

### Common and AWS-specific tunables

Refer to the [common attributes](../common-tunables-for-all-faults) and [AWS-specific tunables](./aws-fault-tunables) to tune the common tunables for all faults and aws specific tunables.

### Memory limit

It can update the Lambda function memory limit to a newer value by using `MEMORY_IN_MEGABYTES` environment variable as shown below.

Use the following example to tune it:

[embedmd]:# (./static/manifests/lambda-update-function-memory/function-memory.yaml yaml)
```yaml
# contains the memory limit value for the lambda function
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: lambda-update-function-memory
    spec:
      components:
        env:
        # provide the function memory limit
        - name: MEMORY_IN_MEGABYTES
          value: '10'
        # provide the function name for memory limit chaos
        - name: FUNCTION_NAME
          value: 'chaos-function'
```
