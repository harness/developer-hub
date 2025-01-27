---
id: vmware-network-rate-limit
title: VMware network rate limit
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/vmware/vmware-network-rate-limit
- /docs/chaos-engineering/chaos-faults/vmware/vmware-network-rate-limit
---
VMware network rate limit fault injects network rate limit from the VMware VM(s) into the application (or service). This results in flaky access to the application. It checks the performance of the application (or process) running on the VMware VM(s).

![VMware Network Rate Limit](./static/images/vmware-network-rate-limit.png)

:::info note
HCE doesn't support injecting VMWare Windows faults on Bare metal server.
:::

## Use cases
VMware network rate limit:
- Simulates issues within the VM network (or microservice) communication across services in different hosts.
- Determines the impact of degradation while accessing a microservice.
- Simulates network congestion by artificially limiting the available bandwidth to understand how the system behaves under reduced network capacity.
- Helps assess the impact of network rate limits on the quality of service (QoS) and compliance with service level agreements (SLAs) by observing the system's response time and performance.
- Validates whether rate-limiting mechanisms in your application or network infrastructure are functioning correctly and effectively.
- Helps assess how the system performs when network resources are constrained, mimicking real-world scenarios where network connectivity may be compromised during a disaster or outage.
- Determines how the system prioritizes and handles different types of traffic when network rate limits are in place, ensuring that critical services receive preferential treatment.

### Prerequisites
- Kubernetes > 1.16 is required to execute this fault.
- Appropriate vCenter permissions should be provided to start and stop the VMs.
- The VM should be in a healthy state before and after injecting chaos.
- Kubernetes secret has to be created that has the Vcenter credentials in the `CHAOS_NAMESPACE`. VM credentials can be passed as secrets or as a `ChaosEngine` environment variable. Below is a sample secret file:
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

### Mandatory tunables

  <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> VM_NAME </td>
        <td> Comma-separated names of the target VMs.</td>
        <td> For example, <code> vm-1,vm-2</code>. </td>
      </tr>
      <tr>
        <td> VM_USER_NAME </td>
        <td> Username of the target VM(s).</td>
        <td> Multiple usernames can be provided as comma-separated values which corresponds to more than one VM under chaos. It is used to run the govc command. </td>
      </tr>
      <tr>
        <td> VM_PASSWORD </td>
        <td> Password for the target VM(s).</td>
        <td> It is used to run the govc command. </td>
      </tr>
      <tr>
        <td> NETWORK_INTERFACE </td>
        <td> Name of the ethernet interface considered for shaping traffic. </td>
        <td> For example, <code>ens160</code>. For more information, go to <a href="#network-interface"> network interface. </a></td>
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
        <td> Defaults to 30s. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#duration-of-the-chaos"> duration of the chaos. </a></td>
      </tr>
      <tr>
        <td> CHAOS_INTERVAL </td>
        <td> Time interval between two successive instance terminations (in seconds). </td>
        <td> Defaults to 30s. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#chaos-interval"> chaos interval. </a></td>
      </tr>
      <tr>
        <td> NETWORK_BANDWIDTH </td>
        <td> Specify the network bandwidth rate limit. </td>
        <td> Defaults to <code>1mbit</code>. For more information, go to <a href="#network-bandwidth"> network bandwidth. </a></td>
      </tr>
      <tr>
        <td> BURST </td>
        <td> Burst for the size of bucket, that is, the maximum amount of bytes that tokens can be available for instantaneously. </td>
        <td> Defaults to <code>2kb</code>. For more information, go to <a href="#burst"> burst. </a></td>
      </tr>
      <tr>
        <td> LIMIT </td>
        <td> Limit on the number of bytes that can be queued while waiting for tokens to become available. </td>
        <td> Defaults to <code>2kb</code>. For more information, go to <a href="#limit"> limit. </a></td>
      </tr>
      <tr>
        <td> MIN_BURST </td>
        <td> Size of the peakrate bucket. </td>
        <td> For example, <code>1kb</code>. </td>
      </tr>
      <tr>
        <td> PEAK_RATE </td>
        <td> Maximum depletion rate of the bucket. </td>
        <td> For example, <code>1mbit</code>. </td>
      </tr>
      <tr>
        <td> DESTINATION_IPS </td>
        <td> IP addresses of the services or pods whose accessibility should be affected. You can also specify a CIDR block. </td>
        <td> Comma-separated IPs (or CIDRs) can be provided. If it has not been provided, network chaos is induced on all IPs (or destinations). For more information, go to <a href="#run-with-destination-ips-and-destination-hosts"> run with destination IPs.</a></td>
      </tr>
      <tr>
        <td> DESTINATION_HOSTS </td>
        <td> DNS names (or FQDN names) of the services whose accessibility is affected. </td>
        <td> If it has not been provided, network chaos is induced on all IPs (or destinations). For more information, go to <a href="#run-with-destination-ips-and-destination-hosts"> run with destination hosts. </a></td>
      </tr>
      <tr>
        <td> SEQUENCE </td>
        <td> Sequence of chaos execution for multiple instances. </td>
        <td> Defaults to parallel. Supports serial sequence as well. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#sequence-of-chaos-execution"> sequence of chaos execution.</a></td>
      </tr>
      <tr>
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injecting chaos (in seconds). </td>
        <td> For example, 30s. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#ramp-time"> ramp time. </a></td>
      </tr>
      <tr>
      <td>DEFAULT_HEALTH_CHECK</td>
      <td>Determines if you wish to run the default health check which is present inside the fault. </td>
      <td> Default: 'true'. For more information, go to <a href="/docs/chaos-engineering/use-harness-ce/chaos-faults/common-tunables-for-all-faults#default-health-check"> default health check.</a></td>
      </tr>
    </table>

:::tip
If the environment variables `DESTINATION_HOSTS` or `DESTINATION_IPS` are left empty, the default behaviour is to target all hosts. To limit the impact on all the hosts, you can specify the IP addresses of the service (use commas to separate multiple values) or the DNS or the FQDN names of the services in `DESTINATION_HOSTS`.
:::

### Secret tunables
   <table>
      <tr>
        <th> Tunable </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> GOVC_URL </td>
        <td> vCenter server URL used to perform API calls using the govc command. </td>
        <td> It is derived from a secret. </td>
      </tr>
        <tr>
        <td> GOVC_USERNAME </td>
        <td> Username of the vCenter server used for authentication purposes. </td>
        <td> It can be set up using a secret. </td>
      </tr>
      <tr>
        <td> GOVC_PASSWORD </td>
        <td> Password of the vCenter server used for authentication purposes. </td>
        <td> It can be set up using a secret. </td>
      </tr>
      <tr>
        <td> GOVC_INSECURE </td>
        <td> Runs the govc command in insecure mode. It is set to <code>true</code>. </td>
        <td> It can be set up using a secret. </td>
      </tr>
     </table>

### Network bandwidth

Network bandwidth injected to the VM. Tune it by using the `NETWORK_BANDWIDTH` environment variable.

Following YAML snippet illustrates the use of this input variable.

[embedmd]:# (./static/manifests/vmware-network-rate-limit/network-bandwidth.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: VMware-engine
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: VMware-network-rate-limit
    spec:
      components:
        env:
        - name: NETWORK_BANDWIDTH
          value: '2mbit'
        - name: VM_NAME
          value: 'vm-1,vm-2'
        - name: VM_USER_NAME
          value: 'ubuntu,debian'
        - name: VM_PASSWORD
          value: '123,123'
```

### Burst

Size of bucket, in bytes. It is the maximum number of bytes for which tokens can be instantaneously available. Tune it by using the `BURST` environment variable.

Following YAML snippet illustrates the use of this input variable.

[embedmd]:# (./static/manifests/vmware-network-rate-limit/burst.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: VMware-engine
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: VMware-network-rate-limit
    spec:
      components:
        env:
        - name: NETWORK_BANDWIDTH
          value: '2mbit'
        - name: BURST
          value: '2kb'
        - name: VM_NAME
          value: 'vm-1,vm-2'
        - name: VM_USER_NAME
          value: 'ubuntu,debian'
        - name: VM_PASSWORD
          value: '123,123'
```

### Limit

Limit on the number of bytes that can be queued while waiting for tokens to become available. Tune it by using the `LIMIT` environment variable.

Following YAML snippet illustrates the use of this input variable.

[embedmd]:# (./static/manifests/vmware-network-rate-limit/limit.yaml yaml)
```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: VMware-engine
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: VMware-network-rate-limit
    spec:
      components:
        env:
        - name: NETWORK_BANDWIDTH
          value: '2mbit'
        - name: BURST
          value: '2kb'
        - name: LIMIT
          value: '2kb'
        - name: VM_NAME
          value: 'vm-1,vm-2'
        - name: VM_USER_NAME
          value: 'ubuntu,debian'
        - name: VM_PASSWORD
          value: '123,123'
```

### Run with destination IPs and destination hosts

The IPs/hosts that interrupt traffic by default. Tune it by using the `DESTINATION_IPS` and `DESTINATION_HOSTS` environment variables, respectively.

`DESTINATION_IPS`: IP addresses of the services or the CIDR blocks (range of IPs) whose accessibility is impacted.
`DESTINATION_HOSTS`: DNS names of the services whose accessibility is impacted.

Following YAML snippet illustrates the use of this input variable.

[embedmd]:# (./static/manifests/vmware-network-rate-limit/destination-host-and-ip.yaml yaml)
```yaml
## it injects the chaos for the egress traffic for specific ips/hosts
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: VMware-engine
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: VMware-network-rate-limit
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

###  Network interface

Name of the ethernet interface that shapes the traffic. Tune it by using the `NETWORK_INTERFACE` environment variable. Its default value is `eth0`.

Following YAML snippet illustrates the use of this input variable.

[embedmd]:# (./static/manifests/vmware-network-rate-limit/network-interface.yaml yaml)
```yaml
## it injects the chaos for the egress traffic for specific ips/hosts
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: VMware-engine
spec:
  engineState: "active"
  chaosServiceAccount: litmus-admin
  experiments:
  - name: VMware-network-rate-limit
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
