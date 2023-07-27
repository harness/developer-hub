---
id: lambda-update-function-timeout
title: Lambda update function timeout
---
## Introduction

Lambda update function timeout causes a timeout of a Lambda function, thereby updating the timeout to a specific value for a certain duration. Timeout errors interrupt the flow of the given function.
Hitting a timeout is a frequent scenario with Lambda functions. This can break the service and impact the delivery. Such scenarios can occur despite the availability aids provided by AWS. 


![Lambda Update Function Timeout](./static/images/lambda-update-function-timeout.png)


## Use cases
Lambda update function timeout:
- Checks the performance of the application (or service) running with a new timeout.
- Determines a safe overall timeout value for the function.

:::info note
- Kubernetes version 1.17 or later is required to execute this fault.
- Access to operate AWS Lambda service.
- Lambda function must be up and running.
- Kubernetes secret must have the AWS access configuration(key) in the `CHAOS_NAMESPACE`. A secret file looks like this:
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
- Harness recommends using the same secret name, that is, `cloud-secret`. Otherwise, you must update the `AWS_SHARED_CREDENTIALS_FILE` environment variable in the fault template and you won't be able to use the default health check probes.
- Go to [superset permission/policy](./security-configurations/policy-for-all-aws-faults.md) to execute all AWS faults.
- Go to [common attributes](../common-tunables-for-all-faults) and [AWS-specific tunables](./aws-fault-tunables) to tune the common tunables for all faults and AWS-specific tunables.
- Go to [AWS named profile for chaos](./security-configurations/aws-switch-profile.md) to use a different profile for AWS faults.
:::

Below is an example AWS policy to execute the fault.

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


## Fault tunables

   <h3>Mandatory tunables</h3>
    <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> FUNCTION_NAME </td>
        <td> Function name of the target lambda function. It support single function name.</td>
        <td> For example, <code>test-function</code> </td>
      </tr>
      <tr>
        <td> FUNCTION_TIMEOUT </td>
        <td> Value of function timeout in seconds.</td>
        <td> Minimum value is 1 s and maximum is 900 s (15 minutes) </td>
      </tr>
      <tr>
        <td> REGION </td>
        <td> The region name of the target lambda function</td>
        <td> For example, <code>us-east-2</code> </td>
      </tr>
    </table>
    <h2>Optional tunables</h2>
    <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Default: 30 s </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> The interval (in seconds) between successive instance termination.</td>
        <td> Default: 30 s </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines sequence of chaos execution for multiple instance</td>
        <td> Default value: parallel. Supported: serial, parallel </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in seconds </td>
        <td> For example, 30 s </td>
      </tr>
    </table>


### Timeout value

Updates the Lambda function timeout value to a different value. Tune it by using `FUNCTION_TIMEOUT` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/lambda-update-function-timeout/function-timeout.yaml yaml)
```yaml
# contains the timeout value for the lambda function
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: lambda-update-function-timeout
    spec:
      components:
        env:
        # provide the function timeout for 10seconds
        - name: FUNCTION_TIMEOUT
          value: '10'
        # provide the function name for timeout chaos
        - name: FUNCTION_NAME
          value: 'chaos-function'
```
