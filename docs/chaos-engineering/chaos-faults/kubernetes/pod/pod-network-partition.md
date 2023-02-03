---
id: pod-network-partition
title: Pod network partition
---
Pod network partition is a Kubernetes pod-level fault that blocks 100% ingress and egress traffic of the target application by creating network policy.
- It can test the application's resilience to lossy (or flaky) network.

![Pod Network Partition](./static/images/network-chaos.png)


## Usage
<details>
<summary>View fault usage</summary>
<div>
It can test the application's resilience to lossy (or flaky) network.
</div>
</details>

## Prerequisites

- Kubernetes > 1.16.


## Default validations

The application pods should be in running state before and after chaos injection.


## Fault tunables
<details>
    <summary>Fault tunables</summary>
    <h2>Optional fields</h2>
    <table>
      <tr>
        <th> Variables </th>
        <th> Description </th>
        <th> Notes </th>
      </tr>
      <tr>
        <td> TOTAL_CHAOS_DURATION </td>
        <td> The time duration for chaos insertion (seconds) </td>
        <td> Default (60s) </td>
      </tr>
      <tr>
        <td> POLICY_TYPES </td>
        <td> Contains type of network policy </td>
        <td> It supports <code>egress</code>, <code>ingress</code> and <code>all</code> values</td>
      </tr>
      <tr>
        <td> POD_SELECTOR </td>
        <td> Contains labels of the destination pods </td>
        <td> For example, app=cart </td>
      </tr>
      <tr>
        <td> NAMESPACE_SELECTOR </td>
        <td> Contains labels of the destination namespaces </td>
        <td> For example, env=prod </td>
      </tr>
      <tr>
        <td> PORTS </td>
        <td> Comma separated list of the targeted ports </td>
        <td> For example, 80,443,22 </td>
      </tr>
      <tr>
        <td> DESTINATION_IPS </td>
        <td> IP addresses of the services or pods or the CIDR blocks(range of IPs), the accessibility to which is impacted </td>
        <td> comma separated IP(S) or CIDR(S) can be provided. if not provided, it will induce network chaos for all ips/destinations</td>
      </tr>  
      <tr>
        <td> DESTINATION_HOSTS </td>
        <td> DNS Names/FQDN names of the services, the accessibility to which, is impacted </td>
        <td> if not provided, it will induce network chaos for all ips/destinations or DESTINATION_IPS if already defined</td>
      </tr>   
      <tr>   
        <td> RAMP_TIME </td>
        <td> Period to wait before and after injection of chaos in sec </td>
        <td> For example, 30 </td>
      </tr>
    </table>
</details>

## Fault examples

### Common and pod-specific tunables
Refer to the [common attributes](../../common-tunables-for-all-faults) and [pod-specific tunables](./common-tunables-for-pod-faults) to tune the common tunables for all fault and pod specific tunables.

### Destination IPs and destination hosts

The network partition fault interrupt traffic for all the IPs/hosts by default. The interruption of specific IPs/Hosts can be tuned via `DESTINATION_IPS` and `DESTINATION_HOSTS` ENV.

- `DESTINATION_IPS`: It contains the IP addresses of the services or pods or the CIDR blocks(range of IPs), the accessibility to which is impacted.
- `DESTINATION_HOSTS`: It contains the DNS Names/FQDN names of the services, the accessibility to which, is impacted.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-network-partition/destination-ips-and-hosts.yaml yaml"

```yaml
# it injects the chaos for specific ips/hosts
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: pod-network-partition
      spec:
        components:
          env:
            # supports comma separated destination ips
            - name: DESTINATION_IPS
              value: "8.8.8.8,192.168.5.6"
            # supports comma separated destination hosts
            - name: DESTINATION_HOSTS
              value: "nginx.default.svc.cluster.local,google.com"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```

### Target specific namespaces

The network partition fault interrupt traffic for all the namespaces by default. The access to/from pods in specific namespace can be allowed via providing namespace labels inside `NAMESPACE_SELECTOR` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-network-partition/namespace-selectors.yaml yaml"

```yaml
# it injects the chaos for specified namespaces, matched by labels
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: pod-network-partition
      spec:
        components:
          env:
            # labels of the destination namespace
            - name: NAMESPACE_SELECTOR
              value: "key=value"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```

### Target specific pods

The network partition fault interrupt traffic for all the external pods by default. The access to/from specific pod(s) can be allowed via providing pod labels inside `POD_SELECTOR` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-network-partition/pod-selectors.yaml yaml"

```yaml
# it injects the chaos for specified pods, matched by labels
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: pod-network-partition
      spec:
        components:
          env:
            # labels of the destination pods
            - name: POD_SELECTOR
              value: "key=value"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```

### Policy type

The network partition fault interrupt both ingress and egress traffic by default. The interruption of either `ingress` or `egress` traffic can be tuned via `POLICY_TYPES` ENV.

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-network-partition/policy-type.yaml yaml"

```yaml
# inject network loss for only ingress or only egress or all traffics
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: pod-network-partition
      spec:
        components:
          env:
            # provide the network policy type
            # it supports `ingress`, `egress`, and `all` values
            # default value is `all`
            - name: POLICY_TYPES
              value: "all"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```

### Destination ports

The network partition fault interrupt traffic for all the external ports by default. Access to specific port(s) can be allowed by providing comma separated list of ports inside `PORTS` ENV.

- If `PORT` is not set and none of the pod-selector, namespace-selector and destination_ips are provided then it will block traffic for all ports for all pods/ips
- If `PORT` is not set but any of the podselector, nsselector and destination ips are provided then it will allow all ports for all the pods/ips filtered by the specified selectors

Use the following example to tune this:

[embedmd]: # "./static/manifests/pod-network-partition/ports.yaml yaml"

```yaml
# it injects the chaos for specified ports
apiVersion: litmuschaos.io/v1alpha1
kind: ChaosEngine
metadata:
  name: engine-nginx
spec:
  engineState: "active"
  annotationCheck: "false"
  appinfo:
    appns: "default"
    applabel: "app=nginx"
    appkind: "deployment"
  chaosServiceAccount: litmus-admin
  experiments:
    - name: pod-network-partition
      spec:
        components:
          env:
            # comma separated list of ports
            - name: PORTS
              value: "tcp: [8080,80], udp: [9000,90]"
            - name: TOTAL_CHAOS_DURATION
              value: "60"
```