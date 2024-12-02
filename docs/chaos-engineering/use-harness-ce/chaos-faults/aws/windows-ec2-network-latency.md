---
id: windows-ec2-network-latency
title: Windows EC2 Network Latency
---

Windows EC2 network latency causes a network packet delay on Windows VM for the target EC2 instance(s) using [Clumsy](https://jagt.github.io/clumsy/).

- It degrades the network without marking the EC2 instance as unhealthy (or unworthy) of traffic, which is resolved using a middleware that switches traffic based on SLOs (performance parameters).
- It may stall the EC2 instance or get corrupted waiting endlessly for a packet.
- It limits the impact (blast radius) to the traffic that you wish to test, by specifying the IP addresses.


![Windows EC2 Network Latency](./static/images/windows-ec2-network-latency.png)

:::tip
When Clumsy is downloaded, the path is exported which is used while executing the experiment. 
:::

## Use cases

Windows EC2 network latency:

- Simulates the situation of network delay for dependent processes and microservices running on the application, which degrades their performance.
- Helps verify the application's ability to handle network delays.
- Determines the performance of the application (or process) running on the EC2 instances.
- Simulates a consistently slow network connection between microservices (for example, cross-region connectivity between active-active peers of a given service or across services or poor cni-performance in the inter-pod-communication network).
- Simulates jittery connection with transient latency spikes between microservices.
- Simulates a slow response on specific third party (or dependent) components (or services), and degraded data-plane of service-mesh infrastructure.

## Prerequisites
- Ensure that the [prerequisites](/docs/chaos-engineering/use-harness-ce/chaos-faults/windows/prerequisites) are fulfilled before executing the experiment.
- Verify that [Clumsy](https://app.harness.io/public/shared/tools/chaos/windows/clumsy-0.3-win64-a.zip) is installed on the Windows VM.
- The EC2 instance should be in a healthy state.

### Mandatory tunables

   <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
          <td> EC2_INSTANCE_ID </td>
          <td> ID of the target EC2 instance. </td>
          <td> For example, <code>i-044d3cb4b03b8af1f</code>. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/aws/ec2-cpu-hog#multiple-ec2-instances"> EC2 instance ID.</a></td>
        </tr>
      <tr>
        <td> NETWORK_LATENCY </td>
        <td> The network latency (or delay) that you want to introduce during chaos, in milliseconds. </td>
        <td> For example, 2000. For more information, go to <a href="#network-latency"> network latency. </a></td>
      </tr>
      <tr>
          <td> REGION </td>
          <td> The AWS region ID where the EC2 instance has been created. </td>
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
        <td> Duration that you specify, through which chaos is injected into the target resource (in seconds).</td>
        <td> Default: 60s. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos. </a></td>
      </tr>
      <tr>
            <td> AWS_SHARED_CREDENTIALS_FILE </td>
            <td> Path to the AWS secret credentials.</td>
            <td> Default: <code>/tmp/cloud_config.yml</code>.</td>
        </tr>
      <tr>
          <td> PATH_OF_CLUMSY </td>
          <td> Path of the Clumsy tool in the VM. </td>
          <td> For example, <code>C:\\Program Files\\Clumsy\\</code>. For more information, go to <a href="#path-of-clumsy"> path of Clumsy. </a></td>
          </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30 s. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time. </a></td>
      </tr>
    </table>

### Network latency

The `NETWORK_LATENCY` environment variable specifies the delay induced, in  milliseconds.

Use the following example to specify network latency:

[embedmd]:# (./static/manifests/windows-ec2-network-latency/network-latency.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: MachineChaosExperiment
metadata:
  name: windows-network-latency
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
    infraType: windows
    steps:
      - - name: windows-network-latency
    tasks:
    - definition:
        chaos:
          env:
            - name: NETWORK_LATENCY
              value: "2000"
```
### Path of Clumsy
The `PATH_OF_CLUMSY` environment variable specifies the path of the Clumsy tool in the VM.

Use the following example to specify the path of Clumsy:

[embedmd]:# (./static/manifests/windows-ec2-network-loss/path-of-clumsy.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: MachineChaosExperiment
metadata:
  name: windows-network-latency
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
    infraType: windows
    steps:
      - - name: windows-network-latency
    tasks:
    - definition:
      chaos:
        env:
       # Path of the Clumsy tool in the VM
        - name: PATH_OF_CLUMSY
          value: 'C:\\Program Files\\Clumsy\\'
```