---
id: lambda-block-tcp-connection
title: Lambda Block TCP Connection
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/aws/lambda-block-tcp-connection
- /docs/chaos-engineering/chaos-faults/aws/lambda-block-tcp-connection
---

Lambda Block TCP Connection is an AWS fault that simulates network blocks for TCP connections of a Lambda function. This fault helps you evaluate how your application responds when outbound TCP connections from a Lambda function are blocked.

![Lambda Block TCP Connection](./static/images/lambda-inject-latency.png)

## Use cases
- Simulate network blocks to test Lambda function resilience.
- Evaluate the impact of blocked TCP connections on application performance and error handling.
- Test fallback mechanisms and error reporting in serverless architectures.

### Prerequisites
- Kubernetes >= 1.17
- The Lambda function must be up and running.
- Kubernetes secret must have the AWS access configuration (key) in the `CHAOS_NAMESPACE`. Below is a sample secret file:
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

:::tip
HCE recommends that you use the same secret name, that is, `cloud-secret`. Otherwise, you will need to update the `AWS_SHARED_CREDENTIALS_FILE` environment variable in the fault template with the new secret name and you won't be able to use the default health check probes.
:::

Below is an example AWS policy to execute the fault.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "lambda:GetFunction",
        "lambda:GetFunctionConfiguration",
        "lambda:UpdateFunctionConfiguration"
      ],
      "Resource": "*"
    }
  ]
}
```

:::info note
- Go to [superset permission/policy](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/policy-for-all-aws-faults) to execute all AWS faults.
- Go to the [common tunables](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults) and [AWS-specific tunables](/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables) to tune the common tunables for all faults and AWS-specific tunables.
- Go to [AWS named profile for chaos](/docs/chaos-engineering/faults/chaos-faults/aws/security-configurations/aws-switch-profile) to use a different profile for AWS faults.
- Currently, it is supported in Python; support for other languages is coming soon.
:::

### Mandatory tunables

<table>
  <caption>Lambda Chaos Fault Tunables</caption>
  <thead>
    <tr>
      <th>Tunable</th>
      <th>Description</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>FUNCTION_NAME</td>
      <td>Name of the target Lambda function.</td>
      <td>For example, <code>test-function</code>. For more information, go to <a href="#function-name">function name</a>.</td>
    </tr>
    <tr>
      <td>REGION</td>
      <td>The AWS region where the Lambda function is deployed.</td>
      <td>For example, <code>us-east-1</code>. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables">region</a>.</td>
    </tr>
    <tr>
      <td>TARGET_HOSTNAMES</td>
      <td>Comma-separated list of hostnames to block TCP connections to.</td>
      <td>For example, <code>example.com,api.example.com</code>. For more information, go to <a href="#target-hostnames">target hostnames</a>.</td>
    </tr>
  </tbody>
</table>


### Optional tunables

<table>
  <caption>Common Chaos Tunables</caption>
  <thead>
    <tr>
      <th>Tunable</th>
      <th>Description</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TOTAL_CHAOS_DURATION</td>
      <td>Duration for which chaos is injected (in seconds).</td>
      <td>Default: 30 s. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos">duration of the chaos</a>.</td>
    </tr>
    <tr>
      <td>CHAOS_INTERVAL</td>
      <td>The interval (in seconds) between successive network block attempts.</td>
      <td>Default: 30 s. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#chaos-interval">chaos interval</a>.</td>
    </tr>
    <tr>
      <td>AWS_SHARED_CREDENTIALS_FILE</td>
      <td>Path to the AWS secret credentials.</td>
      <td>Default: <code>/tmp/cloud_config.yml</code>. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/aws/aws-fault-tunables">AWS shared credentials file</a>.</td>
    </tr>
    <tr>
      <td>RAMP_TIME</td>
      <td>Period to wait before and after injecting chaos (in seconds).</td>
      <td>Optional. For more information, go to <a href="/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time">ramp time</a>.</td>
    </tr>
  </tbody>
</table>


#### Target Hostnames

The `TARGET_HOSTNAMES` environment variable defines the list of hostnames to which TCP connections should be blocked from the target Lambda function during chaos execution.


Block TCP connections to specific hostnames from a Lambda function.

[embedmd]:# (./static/manifests/lambda-block-tcp-connection/target-hostnames.yaml yaml)
```yaml
---
# Block TCP connections to specific hostnames from a Lambda function
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: lambda-block-tcp-connection
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: lambda-block-tcp-connection
      spec:
        components:
          env:
            - name: TARGET_HOSTNAMES
              value: 'example.com,api.example.com'
```

#### Function Name

The `FUNCTION_NAME` environment variable specifies the name of the target AWS Lambda function whose host will be subjected to chaos.

[embedmd]:# (./static/manifests/lambda-block-tcp-connection/function-name.yaml yaml)
```yaml
---
# Block TCP connections from a specific Lambda function
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: lambda-block-tcp-connection
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: lambda-block-tcp-connection
      spec:
        components:
          env:
            - name: FUNCTION_NAME
              value: 'test-function'
```