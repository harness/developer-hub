---
id: ec2-network-latency
title: EC2 network latency
---
EC2 network latency causes flaky access to the application (or services) by injecting network packet latency to EC2 instance(s).
- It determines the performance of the application (or process) running on the EC2 instances.

![EC2 Network Latency](./static/images/ec2-network-chaos.png)

## Usage
<details>
<summary>View fault usage</summary>
<div>
This fault degrades the network without the EC2 instance being marked as unhealthy (or unworthy) of traffic. This can be resolved by using a middleware that switches traffic based on some SLOs (performance parameters). The EC2 instance may stall or get corrupted while waiting endlessly for a packet. This fault limits the impact (blast radius) to only the traffic that you wish to test, by specifying the IP addresses. This fault will help to improve the resilience of your services over time.
</div>
</details>

## Prerequisites

- Kubernetes > 1.16
- SSM agent is installed and running on the target EC2 instance.
- Create a Kubernetes secret that has the AWS Access Key ID and Secret Access Key credentials in the `CHAOS_NAMESPACE`. A sample secret file looks like:

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

- If you change the secret name, update the `experiment.yml` environment variable to derive the respective data from the secret. Account for the path where this secret is mounted as a file manifest in the `AWS_SHARED_CREDENTIALS_FILE` environment variable.

### Note
You can pass the VM credentials as secrets or as a `ChaosEngine` environment variable.

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
                "ec2:DescribeInstanceStatus",
                "ec2:DescribeInstances"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```
</details>

Refer to the [superset permission/policy](./policy-for-all-aws-faults) to execute all AWS faults.

## Default validations
The EC2 instance should be in healthy state.

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
            <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
            <td> Defaults to 30s. </td>
        </tr>
        <tr>
            <td> CHAOS_INTERVAL </td>
            <td> Time interval between two successive instance terminations (in seconds). </td>
            <td> Defaults to 30s. </td>
        </tr>
        <tr>
            <td> AWS_SHARED_CREDENTIALS_FILE </td>
            <td> Provide the path for AWS secret credentials.</td>
            <td> Defaults to <code>/tmp/cloud_config.yml</code>. </td>
        </tr>
        <tr>
            <td> INSTALL_DEPENDENCY </td>
            <td> Select to install dependencies used to run the network chaos. It can be either True or False. </td>
        <td> If the dependency already exists, you can turn it off. Defaults to True.</td>
        </tr>
        <tr>
            <td> NETWORK_LATENCY </td>
            <td> The latency/delay in milliseconds.</td>
            <td> Default to 2000, provide numeric value only. </td>
        </tr>
        <tr>
            <td> JITTER </td>
            <td> The network jitter value in ms.</td>
            <td> Defaults to 0, provide numeric value only. </td>
        </tr>
        <tr>
            <td> DESTINATION_IPS </td>
            <td> IP addresses of the services or the CIDR blocks(range of IPs), the accessibility to which is impacted. </td>
            <td> comma-separated IP(S) or CIDR(S) can be provided. If not provided, it will induce network chaos for all ips/destinations. </td>
        </tr>
        <tr>
            <td> DESTINATION_HOSTS </td>
            <td> DNS names of the services, the accessibility to which, is impacted. </td>
            <td> If not provided, it will induce network chaos for all ips/destinations or DESTINATION_IPS if already defined. </td>
        </tr>
        <tr>
            <td> NETWORK_INTERFACE </td>
            <td> Name of ethernet interface considered for shaping traffic.</td>
            <td> Defaults to `eth0`. </td>
        </tr>
        <tr>
            <td> SEQUENCE </td>
            <td> It defines the sequence of chaos execution for multiple instances. </td>
            <td> Defaults to parallel. Supports serial sequence as well. </td>
        </tr>
        <tr>
            <td> RAMP_TIME </td>
            <td> Period to wait before and after injecting chaos (in seconds).  </td>
            <td> For example, 30s. </td>
        </tr>
    </table>
</details>

## Fault examples

### Common fault tunables
Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Network packet latency

It defines the network packet latency to be injected on the EC2 instances. You can tune it using the `NETWORK_LATENCY` environment variable.

You can tune it using the following example:

[embedmd]:# (./static/manifests/ec2-network-latency/network-latency.yaml yaml)
```yaml
# it injects the chaos into the egress traffic
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-network-latency
    spec:
      components:
        env:
        # network packet latency
        - name: NETWORK_LATENCY
          value: '2000'
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        - name: REGION
          value: 'us-west-2'
```

### Run with jitter

It defines the jitter (in ms), a parameter that allows introducing a network delay variation. You can tune it using the `JITTER` environment variable. Its default value is 0.

You can tune it using the following example:

[embedmd]:# (./static/manifests/ec2-network-latency/network-latency-with-jitter.yaml yaml)
```yaml
# it injects the chaos into the egress traffic
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-network-latency
    spec:
      components:
        env:
        # value of the network latency jitter (in ms)
        - name: JITTER
          value: '200'
        - name: NETWORK_LATENCY
          value: '2000'
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        - name: REGION
          value: 'us-west-2'
```

### Run with destination IPs and destination hosts

The network faults interrupt traffic for all the IPs/hosts by default. The interruption of specific IPs/Hosts can be tuned via `DESTINATION_IPS` and `DESTINATION_HOSTS` environment variable.

`DESTINATION_IPS`: It contains the IP addresses of the services or the CIDR blocks(range of IPs), the accessibility to which is impacted.
`DESTINATION_HOSTS`: It contains the DNS Names of the services, the accessibility to which, is impacted

You can tune it using the following example:

[embedmd]:# (./static/manifests/ec2-network-latency/destination-host-and-ip.yaml yaml)
```yaml
# it injects the chaos into the egress traffic for specific IPs/hosts
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-network-latency
    spec:
      components:
        env:
        # supports comma-separated destination ips
        - name: DESTINATION_IPS
          value: '8.8.8.8,192.168.5.6'
        # supports comma-separated destination hosts
        - name: DESTINATION_HOSTS
          value: 'google.com'
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        - name: REGION
          value: 'us-west-2'
```

###  Network interface

The defined name of the ethernet interface, which is considered for shaping traffic. You can tune it using the `NETWORK_INTERFACE` environment variable. Its default value is `eth0`.

You can tune it using the following example:

[embedmd]:# (./static/manifests/ec2-network-latency/network-interface.yaml yaml)
```yaml
# it injects the chaos into the egress traffic for specific network interface
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-network-latency
    spec:
      components:
        env:
        # name of the network interface
        - name: NETWORK_INTERFACE
          value: 'eth0'
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        - name: REGION
          value: 'us-west-2'
```