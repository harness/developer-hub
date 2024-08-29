---
id: ssm-chaos-by-id
title: SSM chaos by ID
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/aws/aws-ssm-chaos-by-id
---

AWS SSM chaos by ID induces chaos on AWS EC2 instances using the Amazon SSM Run Command.
- It is executed using the SSM document that defines the actions which the systems manager can perform on your managed instances (that have SSM agent installed).
- This SSM document is uploaded beforehand to AWS, whose name is referenced as an input to the chaos faults.
- It helps execute custom chaos (like stress, network, disk or IO) on AWS EC2 instances for a specific duration using the given instance ID(s).

![SSM chaos by ID](./static/images/ssm-chaos-by-id.png)

## Use cases
AWS SSM chaos by ID:
- Tests the resilience of EC2 instance or services in that instance by using custom SSM document as input to execute chaos on it.
- Triggers and manages the SSM command executed via SSM docs that is an input to the experiment.

### Prerequisites
- Kubernetes >= 1.17
- The SSM document should be available in AWS.
- Authentication is done using [IRSA](/docs/chaos-engineering/chaos-faults/aws/security-configurations/aws-iam-integration#set-up-your-target-accounts-for-irsa) or secret. For secret-based authentication, create a Kubernetes secret that has the AWS access configuration(key) in the `CHAOS_NAMESPACE`. Below is a sample secret file:

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
                "ec2:DescribeInstances"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ssm:DescribeInstanceInformation",
                "ssm:SendCommand",
                "ssm:GetCommandInvocation",
                "ssm:CancelCommand"
            ],
            "Resource": "*"
        }
    ]
}
```

:::info note
- Refer to [AWS named profile for chaos](./security-configurations/aws-switch-profile.md) to use a different profile for AWS faults.
- The EC2 instance should be in a healthy state before and after introducing chaos.
- Refer to the [common attributes](/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults.md) and [AWS-specific tunables](./aws-fault-tunables.md) to tune the common tunables for all faults and AWS-specific tunables.
- Refer to the [superset permission/policy](./security-configurations/policy-for-all-aws-faults.md) to execute all AWS faults.
:::

### Mandatory tunables
  <table>
        <tr>
          <th> Tunable </th>
          <th> Description </th>
          <th> Notes </th>
        </tr>
        <tr>
        <td> EC2_INSTANCE_ID </td>
        <td> Instance ID of the target EC2 instance. Multiple IDs can also be provided as a comma(,) separated values.</td>
        <td> Multiple IDs can be provided as "id1,id2". For more information, go to <a href="#ssm-chaos-by-id"> EC2 instance ID.</a></td>
      </tr>
        <tr>
          <td> REGION </td>
          <td> Region name of the target ECS cluster</td>
          <td> For example, <code>us-east-1</code>. </td>
        </tr>
    </table>

### Optional tunables
  <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds). </td>
        <td> Default: 30s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos. </a></td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Interval between successive instance terminations (in seconds).</td>
        <td> Default: 30s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#chaos-interval"> chaos interval.</a></td>
      </tr>
      <tr>
        <td> AWS_SHARED_CREDENTIALS_FILE </td>
        <td> Path to the AWS secret credentials.</td>
        <td> Defaults to <code>/tmp/cloud_config.yml</code>. </td>
      </tr>
      <tr>
        <td> DOCUMENT_NAME </td>
        <td> Name of the SSM docs that is added to AWS.</td>
        <td> Create or upload this document to AWS before providing the document as an input to any AWS chaos fault.</td>
      </tr>
      <tr>
        <td> PLUGIN_NAMES </td>
        <td> Specific plugin used in an SSM document (or command), such as runShellScript or ExecuteStressNg, which defines the action to be executed on the target instances.</td>
        <td> You can provide multiple names as comma-separated values.</td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines a sequence of chaos execution for multiple instances. </td>
        <td> Default: parallel. Supports serial and parallel. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds).  </td>
        <td> For example, 30 s. For more information, go to <a href="/docs/chaos-engineering/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time. </a></td>
      </tr>
    </table>

### SSM chaos by ID

Comma-separated list of target instance IDs. Tune it by using the `EC2_INSTANCE_ID` environment variable.

The following YAML snippet illustrates the use of this environment variable:

[embedmd]:# (./static/manifests/ssm-chaos-by-id/instance-id.yaml yaml)
```yaml
# contains the instance id, to be terminated/stopped
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: ssm-chaos-by-id
    spec:
      components:
        env:
        # ID of the EC2 instance
        - name: EC2_INSTANCE_ID
          value: 'instance-1'
        # region for the EC2 instance
        - name: REGION
          value: 'us-east-1'
```
