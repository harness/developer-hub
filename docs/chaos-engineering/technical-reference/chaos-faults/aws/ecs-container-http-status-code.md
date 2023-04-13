---
id: ecs-container-http-status-code
title: ECS container HTTP status code
---
ECS container HTTP status code injects HTTP chaos that affects the request (or response) by modifying the status code (or the body or the headers) by starting a proxy server and redirecting the traffic through the proxy server on the target ECS containers.

![ECS Container HTTP Modify Response](./static/images/ecs-container-http-status-code.png)

## Use cases
ECS container HTTP status code:
- Tests the ECS task container resilience to erroneous code HTTP responses from the application server.
- Simulates unavailability of specific API services (503, 404), unavailability of specific APIs for(or from) a given microservice (TBD or Path Filter) (404).
- Simulates unauthorized requests for 3rd party services (401 or 403), and API malfunction (internal server error) (50x) on ECS task container.


## Prerequisites

- Kubernetes >= 1.17
- ECS container metadata is enabled (disabled by default). To enable it, refer to this [docs](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html). If your task is running from before, you may need to restart it to get the metadata directory.
- ECS cluster running with the desired tasks and containers and familiarity with ECS service update and deployment concepts.
- Access to the ECS cluster instances with the necessary permissions to update the start and stop timeouts for containers. Refer to [systems manager docs](https://docs.aws.amazon.com/systems-manager/latest/userguide/setup-launch-managed-instance.html).
- Backup and recovery mechanisms to handle potential failures during the testing process.
- You and the ECS cluster instances have a role with the required AWS access to perform the SSM and ECS operations.
- Kubernetes secret with AWS Access Key ID and Secret Access Key credentials in the `CHAOS_NAMESPACE`. Below is the sample secret file:

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

- It is recommended to use the same secret name, that is, `cloud-secret`. Otherwise, you will need to update the `AWS_SHARED_CREDENTIALS_FILE` environment variable in the fault template and you may be unable to use the default health check probes. 

:::info note
- You can pass the VM credentials as secrets or as a `ChaosEngine` environment variable.
- The ECS container should be in a healthy state before and after introducing chaos.
- Refer to the [superset permission or policy](./security-configurations/policy-for-all-aws-faults.md) to execute all AWS faults.
- Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.
- Refer to [AWS named profile for chaos](./security-configurations/aws-switch-profile.md) to use a different profile for AWS faults.
:::


## Permissions required

Here is an example AWS policy to execute the fault.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ssm:GetDocument",
                "ssm:DescribeDocument",
                "ssm:GetParameter",
                "ssm:GetParameters",
                "ssm:SendCommand",
                "ssm:CancelCommand",
                "ssm:CreateDocument",
                "ssm:DeleteDocument",
                "ssm:GetCommandInvocation",          
                "ssm:UpdateInstanceInformation",
                "ssm:DescribeInstanceInformation"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2messages:AcknowledgeMessage",
                "ec2messages:DeleteMessage",
                "ec2messages:FailMessage",
                "ec2messages:GetEndpoint",
                "ec2messages:GetMessages",
                "ec2messages:SendReply"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ECS Container:DescribeInstanceStatus",
                "ECS Container:DescribeInstances"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```

   <h3>Mandatory tunables</h3>
    <table>
        <tr>
            <th> Tunable </th>
            <th> Description </th>
            <th> Notes </th>
        </tr>
        <tr>
          <td> REGION </td>
          <td> The AWS region ID where the ECS Container instance has been created. </td>
          <td> For example, <code>us-east-1</code>. </td>
        </tr>
        <tr>
            <td> TARGET_SERVICE_PORT </td>
            <td> Port of the service to target. </td>
            <td> Defaults to port 80. </td>
        </tr>
        <tr>
            <td> STATUS_CODE </td>
            <td> Modified status code for the HTTP response.</td>
            <td> If no value is provided, then a random value is selected from the list of supported values.
            Multiple values can be provided as comma-separated, a random value from the provided list will be selected
            Supported values: [200, 201, 202, 204, 300, 301, 302, 304, 307, 400, 401, 403, 404, 500, 501, 502, 503, 504].
            Defaults to random status code. </td>
        </tr>
        <tr>
            <td> MODIFY_RESPONSE_BODY </td>
            <td> Whether to modify the body as per the status code provided.</td>
            <td> If true, then the body is replaced by a default template for the status code. Defaults to true. </td>
        </tr>
    </table>
    <h3>Optional tunable</h3>
    <table>
        <tr>
            <th> Tunable </th>
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
            <td> Time interval between two successive instance terminations (in seconds). </td>
            <td> Defaults to 30s. </td>
        </tr>
        <tr>
            <td> AWS_SHARED_CREDENTIALS_FILE </td>
            <td> Provide the path for aws secret credentials.</td>
            <td> Defaults to <code>/tmp/cloud_config.yml</code>. </td>
        </tr>
        <tr>
            <td> SEQUENCE </td>
            <td> It defines the sequence of chaos execution for multiple instances. </td>
            <td> Defaults to parallel. Supports serial sequence as well. </td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injection of chaos (in seconds). </td>
            <td> For example, 30s. </td>
        </tr>
        <tr>
            <td> INSTALL_DEPENDENCY </td>
            <td> Select to install dependencies used to run the network chaos. It can be either True or False. </td>
            <td> If the dependency already exists, you can turn it off. Defaults to True.</td>
        </tr>
        <tr>
            <td> PROXY_PORT </td>
            <td> Port where the proxy will be listening for requests.</td>
            <td> Defaults to 20000. </td>
        </tr>
        <tr>
          <td> NETWORK_INTERFACE </td>
          <td> Network interface to be used for the proxy.</td>
          <td> Defaults to `eth0`. </td>
        </tr>
    </table>

### Target service port

Service port that is targeted. Tune it by using the `TARGET_SERVICE_PORT` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/ecs-container-http-status-code/target-service-port.yaml yaml)
```yaml
## provide the port of the targeted service
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ecs-container-http-status-code
    spec:
      components:
        env:
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Modifying the response status code

Response body that is modified. Tune it by using the `RESPONSE_BODY` environment variable.

:::info note
`HTTP_CHAOS_TYPE` should be provided as `status_code`.
:::

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/ecs-container-http-status-code/status-code.yaml yaml)
```yaml
## provide the headers as a map
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ecs-container-http-status-code
    spec:
      components:
        env:
        # modified status code for the http response
        # if no value is provided, a random status code from the supported code list will selected
        # if multiple comma-separated values are provided, then a random value
        # from the provided list will be selected
        # if an invalid status code is provided, the fault will fail
        # supported status code list:
        # [200, 201, 202, 204, 300, 301, 302, 304, 307, 400, 401, 403, 404, 500, 501, 502, 503, 504]
        - name: STATUS_CODE
          value: '500'
        # whether to modify the body as per the status code provided
        - name: "MODIFY_RESPONSE_BODY"
          value: "true"
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Proxy port

Port where the proxy server listens for requests. Tune it by using the `PROXY_PORT` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/ecs-container-http-status-code/proxy-port.yaml yaml)
```yaml
# provide the port for proxy server
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ecs-container-http-status-code
    spec:
      components:
        env:
        # provide the port for proxy server
        - name: PROXY_PORT
          value: '8080'
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: "80"
```

### Network interface

Network interface used for the proxy. Tune it by using the `NETWORK_INTERFACE` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/ecs-container-http-status-code/network-interface.yaml yaml)
```yaml
## provide the network interface for proxy
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ecs-container-http-status-code
    spec:
      components:
        env:
        # provide the network interface for proxy
        - name: NETWORK_INTERFACE
          value: "eth0"
        # provide the port of the targeted service
        - name: TARGET_SERVICE_PORT
          value: '80'
```