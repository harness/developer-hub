---
id: ec2-dns-chaos
title: EC2 DNS chaos
---
## Introduction

EC2 DNS chaos causes DNS errors such as unavailability or malfunctioning of DNS servers on the specified EC2 instance for a specific duration. 

![EC2 DNS Chaos](./static/images/ec2-dns-chaos.png)

## Use cases
EC2 DNS chaos:
- Determines the performance of the application (or process) running on the EC2 instance(s).
- Simulates the unavailability (or distorted) network connectivity from the VM to the target hosts. 
- Determines the impact of DNS chaos on the infrastructure and standalone tasks. 
- Simulates unavailability of the DNS server (loss of access to any external domain from a given microservice, access to cloud provider dependencies, and access to specific third party services).

:::info note
- Kubernetes version 1.17 or later is required to execute this fault.
- SSM agent is installed and running on the target EC2 instance.
- The EC2 instance should be in a healthy state.
- You can pass the VM credentials as secrets or as a `ChaosEngine` environment variable.
- The Kubernetes secret should have the AWS Access Key ID and Secret Access Key credentials in the `CHAOS_NAMESPACE`. Below is the sample secret file:
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
- We recommend that you use the same secret name, that is, `cloud-secret`. Otherwise, you will need to update the `AWS_SHARED_CREDENTIALS_FILE` environment variable in the fault template and you won't be able to use the default health check probes. 
- Go to the [common tunables](../common-tunables-for-all-faults) to tune the common tunables for all the faults.
- Go to [AWS named profile for chaos](./security-configurations/aws-switch-profile) to use a different profile for AWS faults and [superset permission or policy](./security-configurations/policy-for-all-aws-faults) to execute all AWS faults.
:::

Below is an example AWS policy to execute the fault.

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

## Fault tunables
   <h3>Mandatory tunables</h3>
    <table>
      <tr>
        <th> Tunable </th>
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
        <td> AWS region ID where the EC2 instance has been created. </td>
        <td> For example: <code>us-east-1</code>. </td>
      </tr>
      <tr>
        <td> PORT </td>
        <td> DNS port where chaos is injected. </td>
        <td> Default: port 54. </td>
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
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
        <td> Default: 30 s. </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive instance terminations (in seconds). </td>
        <td> Default: 30 s. </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple instance </td>
        <td> Default: parallel. Supports serial sequence. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> For example, 30 s </td>
      </tr>
      <tr>
        <td> INSTALL_DEPENDENCY </td>
        <td> Select to install dependencies used to run the network chaos. It can be either True or False </td>
        <td> If the dependency already exists, you can turn it off. Defaults to True.</td>
      </tr>
      <tr>
        <td> TARGET_HOSTNAMES </td>
        <td> List of the target host names. If this is not provided, all the host names (or domains) will be targeted. </td>
        <td> For example, <code>'["litmuschaos","chaosnative.com"]'</code>.</td>
      </tr>
      <tr>
        <td> MATCH_SCHEME </td>
        <td> Determines whether the DNS query should exactly match the targets or can be a substring. </td>
        <td> Default: exact.</td>
      </tr>
      <tr>
        <td> UPSTREAM_SERVER </td>
        <td> Custom upstream server to which the intercepted DNS requests are forwarded. </td>
        <td> Default: Server mentioned in the resolv.conf file. </td>
      </tr>
    </table>

### Run DNS chaos with port

DNS port to inject DNS chaos. Tune it by using the `PORT` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/ec2-dns-chaos/ec2-dns-port.yaml yaml)
```yaml
# induces dns chaos on the EC2 Instances
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-dns-chaos
    spec:
      components:
        env:
        # target port
        - name: PORT
          value: '54'
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        - name: REGION
          value: 'us-west-2'
```

### Run DNS chaos with target host names

List of the target host names to inject DNS chaos. Tune it by using the `TARGET_HOSTNAMES` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/ec2-dns-chaos/ec2-dns-target-hostnames.yaml yaml)
```yaml
# induces dns chaos on the EC2 Instances
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-dns-chaos
    spec:
      components:
        env:
        # list of target host names
        - name: TARGET_HOSTNAMES
          value: '["litmuschaos","chaosnative.com"]'
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        - name: REGION
          value: 'us-west-2'
```


### Run DNS chaos with match scheme

Determine whether the DNS query exactly matches the target or is a substring. Tune it by using the `MATCH_SCHEME` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/ec2-dns-chaos/ec2-dns-match-scheme.yaml yaml)
```yaml
# induces dns chaos on the EC2 Instances
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-dns-chaos
    spec:
      components:
        env:
        # match scheme type
        - name: MATCH_SCHEME
          value: 'exact'
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        - name: REGION
          value: 'us-west-2'
```

### Run DNS chaos with upstream server

Custom upstream server where the intercepted DNS requests are forwarded. It defaults to the server mentioned in the resolv.conf file. Tune it by using the `UPSTREAM_SERVER` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/ec2-dns-chaos/ec2-dns-upstream-server.yaml yaml)
```yaml
# induces dns chaos on the EC2 Instances
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ec2-dns-chaos
    spec:
      components:
        env:
        # name of the upstream server
        - name: UPSTREAM_SERVER
          value: '8.8.8.8'
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        - name: REGION
          value: 'us-west-2'
```