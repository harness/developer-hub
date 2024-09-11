---
title: Fault-wise permissions
sidebar_position: 1
redirect_from:
	- /docs/chaos-engineering/chaos-faults/kubernetes/fault-wise-permissions
---

This topic describes the [prerequisites](#fault-type-specific-prerequisites) and [fault-wise permissions](#permissions-required-for-pod-level-faults) required to execute Kubernetes-based faults.

The prerequisites can be categorized into two groups:
1. [Common prerequisites](#common-prerequisites)
2. [Fault-type specific prerequisites](#fault-type-specific-prerequisites)

### Common prerequisites

- Ensure that the Kubernetes chaos infrastructure (or agent) is installed and all the components are healthy and in **running** state.
- There should be outbound connectivity from the cluster pods to the Harness control plane.
- Connectivity should be established between the cluster pods to any endpoint that needs to be queried as a part of the probe execution (or resilience validation).
- Appropriate RBAC should be set up on the Kubernetes cluster, so that the service accounts used by the agent components are sufficient for the discovery and chaos injection. This is based on:
    - The scope of execution (cluster-wide or namespaced).
    - The nature of faults planned to be executed.

### Fault-type specific prerequisites

Certain fault categories have unique requirements, from a permissions and set up (or configuration) perspective.

#### Pod network/Stress/API/IO

These faults require [identifying the target container PID and remote execution](/docs/chaos-engineering/chaos-faults/kubernetes/classification#pod-faults-microservices-based-faults) of certain commands (or processes) within the target containers' network, PID, and mount namespace. These actions require the transient chaos pods to run with:
- Root user;
- Container runtime socket mounted;
- Privilege escalation;
- Linux capabilities like NET_ADMIN, SYS_ADMIN;
- Mapping to hostpid.

HCE recommends you create a dedicated pod security policy (PSP) or equivalent that you can map to the transient chaos pods or service account.

#### Service load

Internally, the load fault leverages Locust (support for other tools is a part of the roadmap). The internal load engine uses a Python script to define the API calls that should be part of the load profile. The script is embedded within a ConfigMap that is referenced by the chaos pods during execution. Go to [locust prerequisites](/docs/chaos-engineering/chaos-faults/load/locust-loadgen/#prerequisites) for detailed steps

#### Cloud-based targets

Create an IAM role on the cloud account that is mapped to the appropriate policy.
Your (cloud account user) credentials must be embedded with a Kubernetes secret before executing the fault.
You can create a [superset AWS policy](/docs/chaos-engineering/chaos-faults/aws/security-configurations/policy-for-all-aws-faults/) that allows executing all the fault types supported by HCE.

:::tip
- You can authenticate cloud API requests made by the chaos pods. If the Kubernetes chaos infrastructure (or agent) is set up on EKS or GKE clusters, you can set up [IRSA](/docs/chaos-engineering/chaos-faults/aws/security-configurations/aws-iam-integration) or [workload identity](/docs/chaos-engineering/chaos-faults/gcp/gcp-iam-integration/) respectively, instead of using Kubernetes secrets.
- You can configure [ChaosGuard](/docs/chaos-engineering/features/chaosguard/introduction-to-chaosguard/) rules to limit the scope of the Harness chaos platform for faults executed, clusters chosen, application workload targeted and chaos service account leveraged.
- The Service Load chaos is target-platform agnostic, that is, it can generate load against service endpoints regardless of where they are hosted.
:::

### Permissions required for pod-level faults

This table lists the permissions required to execute Kubernetes fault (node-level and pod-level).

:::tip
- NA refers to **Not Applicable**.
- NA* indicates that the permissions are not required for pod-level experiments by default, but if you want to target the pods on specific node, then the permissions will be required.
- Starred pod-level experiments indicate that they don't require helper pods for execution.
:::

Read the permission as: "You can create **pod delete** fault in **Namespaced and cluster** mode, and on the **pod** entity, it requires permissions to **[create, delete, get, list, patch, deletecollection, update]** the pod.

<table>
    <tr>
    <th> Pod-level faults </th>
    <th> Mode (Scopes of chaos agent) </th>
    <th> Permissions required </th>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-delete#permissions-required"> Pod delete * </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
        <li>events = [create, get, list, patch, update]</li>
        <li>configMaps = NA</li>
        <li>pods/log = [get, list, watch]</li>
        <li>pods/exec = NA</li>
        <li>deployments, statefulsets = [get, list]</li>
        <li>replicasets, daemonsets = [get, list]</li>
        <li>networkpolicies = NA</li>
        <li>jobs = [create, delete, get, list, deletecollection]</li>
        <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
        <li>secrets = NA</li>
        <li>pod eviction = NA</li>
        <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/container-kill#permissions-required"> Container kill </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/disk-fill#permissions-required"> Disk fill </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-api-block#permissions-required"> Pod API block </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-api-latency#permissions-required"> Pod API latency </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-api-modify-body#permissions-required"> Pod API modify body </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-api-modify-header#permissions-required"> Pod API modify header </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li> networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-api-status-code#permissions-required"> Pod API status code </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-autoscaler#permissions-required"> Pod autoscaler * </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list, patch, update]</li>
    <li>replicasets, daemonsets = NA</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-cpu-hog-exec#permissions-required"> Pod CPU hog exec * </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = [get, list, create]</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-cpu-hog#permissions-required"> Pod CPU hog </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-dns-error#permissions-required"> Pod DNS error </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-dns-spoof#permissions-required"> Pod DNS spoof </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-latency#permissions-required"> Pod HTTP latency </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-modify-body#permissions-required"> Pod HTTP modify body </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-modify-header#permissions-required"> Pod HTTP modify header </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-reset-peer#permissions-required"> Pod HTTP reset peer </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-http-status-code#permissions-required"> Pod HTTP status code </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-io-attribute-override#permissions-required"> Pod IO attribute override </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-io-error#permissions-required"> Pod IO error </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-io-latency#permissions-required"> Pod IO latency </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-io-stress#permissions-required"> Pod IO stress </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-memory-hog-exec#permissions-required"> Pod memory hog exec * </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = [get, list, create]</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-memory-hog#permissions-required"> Pod memory hog </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-corruption#permissions-required"> Pod network corruption </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-duplication#permissions-required"> Pod network duplication </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-latency#permissions-required"> Pod network latency </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-loss#permissions-required"> Pod network loss </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-partition#permissions-required"> Pod network partition * </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = [create, delete, get, list]</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/pod-network-rate-limit#permissions-required"> Pod network rate limit </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/pod/time-chaos#permissions-required"> Time chaos </a></td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
</table>


### Permissions required for node-level faults

<table>
    <tr>
    <th> Node-level faults </th>
    <th> Mode (Scopes of chaos agent) </th>
    <th> Permissions required </th>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/kubelet-service-kill#permissions-required"> Kubelet service kill</a> </td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li> pod = [create, delete, get, list, patch, deletecollection, update]</li>
        <li>events = [create, get, list, patch, update]</li>
        <li>configMaps = NA</li>
        <li>pods/log = [get, list, watch]</li>
        <li>pods/exec = [get, list, create]</li>
        <li>deployments, statefulsets = NA</li>
        <li>replicasets, daemonsets = NA</li>
        <li>networkpolicies = NA</li>
        <li>jobs = [create, delete, get, list, deletecollection]</li>
        <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
        <li>secrets = NA</li>
        <li>pod eviction = NA</li>
        <li>nodes = [get, list]</li> </ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-cpu-hog#permissions-required"> Node CPU hog </a></td>
    <td> Cluster </td>
    <td><ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
        <li>events = [create, get, list, patch, update]</li>
        <li>configMaps = NA</li>
        <li>pods/log = [get, list, watch]</li>
        <li>pods/exec = [get, list, create]</li>
        <li>deployments, statefulsets = NA</li>
        <li>replicasets, daemonsets = NA</li>
        <li>networkpolicies = NA</li>
        <li>jobs = [create, delete, get, list, deletecollection]</li>
        <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
        <li>secrets = NA</li>
        <li>pod eviction = NA</li>
        <li>nodes = [get, list]</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-drain#permissions-required"> Node drain </a></td>
    <td> Cluster </td>
    <td><ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
        <li>events = [create, get, list, patch, update]</li>
        <li>configMaps = NA</li>
        <li>pods/log = [get, list, watch]</li>
        <li>pods/exec = [get, list, create]</li>
        <li>deployments, statefulsets = NA</li>
        <li>replicasets, daemonsets = NA</li>
        <li>networkpolicies = NA</li>
        <li>jobs = [create, delete, get, list, deletecollection]</li>
        <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
        <li>secrets = NA</li>
        <li>pod eviction = [get, list, create]</li>
        <li>nodes = [get, list, patch, update]</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-io-stress#permissions-required"> Node IO stress </a></td>
    <td> Cluster </td>
    <td><ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
        <li>events = [create, get, list, patch, update]</li>
        <li>configMaps = NA</li>
        <li>pods/log = [get, list, watch]</li>
        <li>pods/exec = [get, list, create]</li>
        <li>deployments, statefulsets = NA</li>
        <li>replicasets, daemonsets = NA</li>
        <li>networkpolicies = NA</li>
        <li>jobs = [create, delete, get, list, deletecollection]</li>
        <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
        <li>secrets = NA</li>
        <li>pod eviction = NA</li>
        <li>nodes = [get, list]</li></ul> </td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-memory-hog#permissions-required"> Node memory hog </a></td>
    <td> Cluster </td>
    <td><ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
        <li>events = [create, get, list, patch, update]</li>
        <li>configMaps = NA</li>
        <li>pods/log = [get, list, watch]</li>
        <li>pods/exec = [get, list, create]</li>
        <li>deployments, statefulsets = NA</li>
        <li>replicasets, daemonsets = NA</li>
        <li>networkpolicies = NA</li>
        <li>jobs = [create, delete, get, list, deletecollection]</li>
        <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
        <li>secrets = NA</li>
        <li>pod eviction = NA</li>
        <li>nodes = [get, list]</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-network-latency#permissions-required"> Node network latency </a></td>
    <td> Cluster </td>
    <td><ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
        <li>events = [create, get, list, patch, update]</li>
        <li>configMaps = NA</li>
        <li>pods/log = [get, list, watch]</li>
        <li>pods/exec = [get, list, create]</li>
        <li>deployments, statefulsets = NA</li>
        <li>replicasets, daemonsets = NA</li>
        <li>networkpolicies = NA</li>
        <li>jobs = create, delete, get, list, deletecollection</li>
        <li>chaosEngines, chaosExperiments, chaosResults = create, delete, get, list, patch, update</li>
        <li>secrets = NA</li>
        <li>pod eviction = NA</li>
        <li>nodes = [get, list]</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-network-loss#permissions-required"> Node network loss </a></td>
    <td> Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
        <li>events = [create, get, list, patch, update]</li>
        <li>configMaps = NA</li>
        <li>pods/log = [get, list, watch]</li>
        <li>pods/exec = [get, list, create]</li>
        <li>deployments, statefulsets = NA</li>
        <li>replicasets, daemonsets = NA</li>
        <li>networkpolicies = NA</li>
        <li>jobs = [create, delete, get, list, deletecollection]</li>
        <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
        <li>secrets = NA</li>
        <li>pod eviction = NA</li>
        <li>nodes = [get, list]</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-restart#permissions-required"> Node restart </a></td>
    <td> Cluster </td>
    <td><ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
        <li>events = [create, get, list, patch, update]</li>
        <li> configMaps = NA</li>
        <li>pods/log = [get, list, watch]</li>
        <li>pods/exec = [get, list, create]</li>
        <li>deployments, statefulsets = NA</li>
        <li>replicasets, daemonsets = NA</li>
        <li>networkpolicies = NA</li>
        <li>jobs = [create, delete, get, list, deletecollection]</li>
        <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
        <li>secrets = [get, list]</li>
        <li>pod eviction = NA</li>
        <li>nodes = [get, list]</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kubernetes/node/node-taint#permissions-required"> Node taint </a></td>
    <td> Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
        <li>events = [create, get, list, patch, update]</li>
        <li>configMaps = NA</li>
        <li>pods/log = [get, list, watch]</li>
        <li>pods/exec = [get, list, create]</li>
        <li>deployments, statefulsets = NA</li>
        <li>replicasets, daemonsets = NA</li>
        <li>networkpolicies = NA</li>
        <li>jobs = [create, delete, get, list, deletecollection]</li>
        <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
        <li>secrets = NA</li>
        <li>pod eviction = [get, list, create]</li>
        <li>nodes = [get, list, patch, update]</li></ul></td>
    </tr>
    <tr>
    <td> <a href="/docs/chaos-engineering/chaos-faults/kube-resilience/kubelet-density#permissions-required"> Kubelet density </a></td>
    <td> Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
        <li>events = [create, get, list, patch, update]</li>
        <li>configMaps = [get, list]</li>
        <li>pods/log = [get, list, watch]</li>
        <li>pods/exec = NA</li>
        <li>deployments, statefulsets = NA</li>
        <li>replicasets, daemonsets = NA</li>
        <li>networkpolicies = NA</li>
        <li>jobs = [create, delete, get, list, deletecollection]</li>
        <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update] </li>
        <li>secrets = [get, list]</li>
        <li>pod eviction = NA</li>
        <li>nodes = [get, list]</li></ul></td>
    </tr>
</table>

### Permissions required for Spring boot faults

<table>
    <tr>
    <th> Spring boot </th>
    <th> Mode (Scopes of chaos agent) </th>
    <th> Permissions required </th>
    </tr>
    <tr>
    <td> Spring boot app kill </td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update] </li>
    <li> events = [create, get, list, patch, update] </li>
    <li> configMaps = NA </li>
    <li> pods/log = [get, list, watch] </li>
    <li> pods/exec = NA </li>
    <li> deployments, statefulsets = [get, list] </li>
    <li> replicasets, daemonsets = [get, list] </li>
    <li> networkpolicies = NA </li>
    <li> jobs = [create, delete, get, list, deletecollection] </li>
    <li> chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update] </li>
    <li> secrets = NA </li>
    <li> pod eviction = NA </li>
    <li> nodes = NA* </li> </ul> </td>
    </tr>
    <tr>
    <td> Spring boot CPU stress </td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update] </li>
    <li> events = [create, get, list, patch, update] </li>
    <li> configMaps = NA </li>
    <li> pods/log = [get, list, watch] </li>
    <li> pods/exec = NA </li>
    <li> deployments, statefulsets = [get, list] </li>
    <li> replicasets, daemonsets = [get, list] </li>
    <li> networkpolicies = NA </li>
    <li> jobs = [create, delete, get, list, deletecollection] </li>
    <li> chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update] </li>
    <li> secrets = NA </li>
    <li> pod eviction = NA </li>
    <li> nodes = NA* </li> </ul> </td>
    </tr>
    <tr>
    <td> Spring boot memory stress </td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update] </li>
    <li> events = [create, get, list, patch, update] </li>
    <li> configMaps = NA </li>
    <li> pods/log = [get, list, watch] </li>
    <li> pods/exec = NA </li>
    <li> deployments, statefulsets = [get, list] </li>
    <li> replicasets, daemonsets = [get, list] </li>
    <li> networkpolicies = NA </li>
    <li> jobs = [create, delete, get, list, deletecollection] </li>
    <li> chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update] </li>
    <li> secrets = NA </li>
    <li> pod eviction = NA </li>
    <li> nodes = NA* </li> </ul> </td>
    </tr>
    <tr>
    <td> Spring boot latency </td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update] </li>
    <li> events = [create, get, list, patch, update] </li>
    <li> configMaps = NA </li>
    <li> pods/log = [get, list, watch] </li>
    <li> pods/exec = NA </li>
    <li> deployments, statefulsets = [get, list] </li>
    <li> replicasets, daemonsets = [get, list] </li>
    <li> networkpolicies = NA </li>
    <li> jobs = [create, delete, get, list, deletecollection] </li>
    <li> chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update] </li>
    <li> secrets = NA </li>
    <li> pod eviction = NA </li>
    <li> nodes = NA* </li> </ul> </td>
    </tr>
    <tr>
    <td> Spring boot exception </td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update] </li>
    <li> events = [create, get, list, patch, update] </li>
    <li> configMaps = NA </li>
    <li> pods/log = [get, list, watch] </li>
    <li> pods/exec = NA </li>
    <li> deployments, statefulsets = [get, list] </li>
    <li> replicasets, daemonsets = [get, list] </li>
    <li> networkpolicies = NA </li>
    <li> jobs = [create, delete, get, list, deletecollection] </li>
    <li> chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update] </li>
    <li> secrets = NA </li>
    <li> pod eviction = NA </li>
    <li> nodes = NA* </li> </ul> </td>
    </tr>
    <tr>
    <td> Spring boot fault </td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update] </li>
    <li> events = [create, get, list, patch, update] </li>
    <li> configMaps = NA </li>
    <li> pods/log = [get, list, watch] </li>
    <li> pods/exec = NA </li>
    <li> deployments, statefulsets = [get, list] </li>
    <li> replicasets, daemonsets = [get, list] </li>
    <li> networkpolicies = NA </li>
    <li> jobs = [create, delete, get, list, deletecollection] </li>
    <li> chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update] </li>
    <li> secrets = NA </li>
    <li> pod eviction = NA </li>
    <li> nodes = NA* </li> </ul> </td>
    </tr>
</table>
