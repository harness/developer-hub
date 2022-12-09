---
id: vmware-network-latency
title: VMware Network Latency
---

## Introduction
- It injects network packet latency from the VMware VM(s) into the application (or service) and results in flaky access. 
- It checks the performance of the application (or process) running on the VMWare VM(s).

:::tip Fault execution flow chart
![VMware Network Latency](./static/images/vmware-network-chaos.png)
:::

## Uses
<details>
<summary>View the uses of the fault</summary>
<div>
The fault results in network degradation without the VM being marked unhealthy (or unworthy) of traffic. The goal of this fault is to simulate issues within your VM network or microservice communication across services in different hosts etc.

Mitigation (in this case, keeping the timeout i.e, the network latency low) can be achieved using a middleware that can switch traffic based on certain SLOs/performance parameters. If such an arrangement is not available, the next best solution would be to verify if a degradation is highlighted by notifying about it using alerts so that the admin (or SRE) has the opportunity to investigate and fix these issues. 
Another utility of the test is to see the extent of impact caused to the end-user or the last point in the application stack on account of degradation in accessing a downstream/dependent microservice; whether it accepts or breaks the system to an unacceptable degree. The fault provides `DESTINATION_IPS` or `DESTINATION_HOSTS` so that you can control the chaos against specific services within or outside the VM.

The VM may stall or get corrupted while it waits endlessly for a packet. The fault limits the impact (blast radius) to only the traffic you wish to test by specifying the IP addresses or application information. This fault helps improve the resilience of your services over time.
</div>
</details>

## Prerequisites
:::info
- Kubernetes > 1.16 
- Vcenter access to stop and start the VM.
- Kubernetes secret that has Vcenter credentials in the `CHAOS_NAMESPACE`. A sample secret file looks like:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: vcenter-secret
  namespace: litmus
type: Opaque
stringData:
    VCENTERSERVER: XXXXXXXXXXX
    VCENTERUSER: XXXXXXXXXXXXX
    VCENTERPASS: XXXXXXXXXXXXX
```

### NOTE
You can pass the VM credentials as a secret or as a chaosengine environment variable.
:::


## Default Validations
:::info
- The VM should be in a healthy state before and after chaos.
:::

## Fault Tunables
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
        <td> VM_NAMES </td>
        <td> Provide the target VM names.</td>
        <td> You can provide multiple VM names as comma separated values, for example: vm-1,vm-2. </td>
      </tr>
      <tr>
        <td> VM_USER_NAME </td>
        <td> Provide the username of the target VM(s).</td>
        <td> Multiple usernames can be provided as comma separated values (for more than one VM under chaos). It is used to run the 'govc' command.</td>
      </tr>
      <tr>
        <td> VM_PASSWORD </td>
        <td> Provide the password for the target VM(s).</td>
        <td> It is used to run the govc command.</td>
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
        <td> The total duration to insert chaos (in seconds). </td>
        <td> Its default value is 30s. </td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> The interval between successive instance terminations (in seconds). </td>
        <td> Its default value is 30s. </td>
      </tr>
      <tr>
        <td> NETWORK_LATENCY </td>
        <td> The latency (or delay) in milliseconds.</td>
        <td> Its default value is 2000, and it accepts numeric values only. </td>
      </tr>
      <tr>
        <td> JITTER </td>
        <td> The network jitter value in milliseconds.</td>
        <td> Its default value is 0, and it accepts numeric values only. </td>
      </tr>
      <tr>
        <td> DESTINATION_IPS </td>
        <td> The IP addresses of the services or the CIDR blocks(range of IPs), whose accessibility is impacted. </td>
        <td> Comma separated IP(S) or CIDR(S) can be provided. If it is not provided, it induces network chaos for all IPs/destinations. </td>
      </tr>
      <tr>
        <td> DESTINATION_HOSTS </td>
        <td> DNS Names of the services whose accessibility is impacted. </td>
        <td> If it is not provided, it induces network chaos for all IPs/destinations or `DESTINATION_IPS` if already defined. </td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> It defines the sequence of chaos execution for multiple instances. </td>
        <td> Its default value is 'parallel', and it supports 'serial' value too. </td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos (in seconds).</td>
        <td> For example, 30s. </td>
      </tr>
    </table>
    <h2>Secret Fields</h2>
     <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> GOVC_URL </td>
        <td> Provide the VMCenter Server URL. </td>
        <td> It is used to perform the VMware API calls using the 'govc' command and is derived from a secret.</td>
      </tr>
      <tr>
        <td> GOVC_USERNAME </td>
        <td> Provide the username of VMCenter Server.</td>
        <td> This environment variable is used for authentiation purposes and is setup using a secret.</td>
      </tr>
      <tr>
        <td> GOVC_PASSWORD </td>
        <td> Provide the password of VMCenter Server. </td>
        <td> This environment variable is used for authentiation purposes and is setup using a secret.</td>
      </tr>
      <tr>
        <td> GOVC_INSECURE </td>
        <td> Provide the value as <code>true</code>. </td>
        <td> This environment variable is used to run the 'govc' command in insecure mode and is setup using a secret.</td>
      </tr>
     </table>
</details>

## Fault Examples

### Common Fault Tunables
Refer to the [common attributes](../common-tunables-for-all-faults) to tune the common tunables for all the faults.

### Network Packet Latency

It defines the network packet latency that is injected to the VM. You can tune it using the `NETWORK_LATENCY` environment variable.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-network-latency/network-latency.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: vmware-engine
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-network-latency
    spec:
      components:
        env:
        # network packet latency
        - name: NETWORK_LATENCY
          value: '2000'
        - name: VM_NAME
          value: 'vm-1,vm-2'
        - name: VM_USER_NAME
          value: 'ubuntu,debian'
        - name: VM_PASSWORD
          value: '123,123'
```

### Run With Jitter

It defines jitter (in ms), a parameter that introduces a network delay variation. You can tune it using the `JITTER` environment variable. Its default value is 0.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-network-latency/network-latency-with-jitter.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: vmware-engine
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-network-latency
    spec:
      components:
        env:
        # value of the network latency jitter (in ms)
        - name: JITTER
          value: '200'
        - name: NETWORK_LATENCY
          value: '2000'
        - name: VM_NAME
          value: 'vm-1,vm-2'
        - name: VM_USER_NAME
          value: 'ubuntu,debian'
        - name: VM_PASSWORD
          value: '123,123'
```

### Run With Destination IPs And Destination Hosts

The network faults interrupt traffic for all the IPs/hosts by default. You can tune this using the `DESTINATION_IPS` and `DESTINATION_HOSTS` environment variables.

`DESTINATION_IPS`: It contains the IP addresses of the services or the CIDR blocks(range of IPs) that impacts its accessibility.
`DESTINATION_HOSTS`: It contains the DNS Names of the services that impacts its accessibility.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-network-latency/destination-host-and-ip.yaml yaml)
```yaml
## it injects the chaos for the egress traffic for specific ips/hosts
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: vmware-engine
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-network-latency
    spec:
      components:
        env:
        # supports comma separated destination ips
        - name: DESTINATION_IPS
          value: '8.8.8.8,192.168.5.6'
        # supports comma separated destination hosts
        - name: DESTINATION_HOSTS
          value: 'google.com'
        - name: VM_NAME
          value: 'vm-1,vm-2'
        - name: VM_USER_NAME
          value: 'ubuntu,debian'
        - name: VM_PASSWORD
          value: '123,123'
```

###  Network Interface

The name of the ethernet interface that shapes the traffic. You can tune it using the `NETWORK_INTERFACE` environment variable. Its default value is `eth0`.

Use the following example to tune it:

[embedmd]:# (./static/manifests/vmware-network-latency/network-interface.yaml yaml)
```yaml
## it injects the chaos for the egress traffic for specific ips/hosts
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: vmware-engine
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: vmware-network-latency
    spec:
      components:
        env:
        # name of the network interface
        - name: NETWORK_INTERFACE
          value: 'eth0'
        - name: VM_NAME
          value: 'vm-1,vm-2'
        - name: VM_USER_NAME
          value: 'ubuntu,debian'
        - name: VM_PASSWORD
          value: '123,123'
```
