---
id: Fault-wise permissions
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
- You can authenticate cloud API requests made by the chaos pods. If the Kubernetes chaos infrastructure (or agent) is set up on EKS or GKE clusters, you can set up [IRSA](/docs/chaos-engineering/chaos-faults/aws/aws-iam-integration/) or [workload identity](/docs/chaos-engineering/chaos-faults/gcp/gcp-iam-integration/) respectively, instead of using Kubernetes secrets.
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
    <td> Pod delete * </td>
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
    <td> Container kill </td>
    <td> Namespaced, Cluster </td>
    <td> <ul><li>pod = [create, delete, get, list, patch, deletecollection, update]</li>
    <li>events = [create, get, list, patch, update]</li>
    <li>configMaps = NA</li>
    <li>pods/log = [get, list, watch]</li>
    <li>pods/exec = NA</li>
    <li>deployments, statefulsets = [get, list]</li>
    <li>replicasets, daemonsets = [get, list]</li>
    <li>networkpolicies = NA</li>
    <li>networkpolicies = NA</li>
    <li>networkpolicies = NA</li>
    <li>jobs = [create, delete, get, list, deletecollection]</li>
    <li>chaosEngines, chaosExperiments, chaosResults = [create, delete, get, list, patch, update]</li>
    <li>secrets = NA</li>
    <li>pod eviction = NA</li>
    <li>nodes = NA*</li></ul></td>
    </tr>
    <tr>
    <td> Disk fill </td>
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
    <td> Pod API block </td>
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
    <td> Pod API latency </td>
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
    <td> Pod API modify body </td>
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
    <td> Pod API modify header </td>
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
    <td> Pod API status code </td>
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
    <td> Pod autoscaler * </td>
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
    <td> Pod CPU hog exec * </td>
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
    <td> Pod CPU hog </td>
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
    <td> Pod DNS error </td>
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
    <td> Pod DNS spoof </td>
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
    <td> Pod HTTP latency </td>
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
    <td> Pod HTTP modify body </td>
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
    <td> Pod HTTP modify header </td>
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
    <td> Pod HTTP reset peer </td>
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
    <td> Pod HTTP status code </td>
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
    <td> Pod IO attribute override </td>
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
    <td> Pod IO error </td>
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
    <td> Pod IO latency </td>
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
    <td> Pod IO stress </td>
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
    <td> Pod memory hog exec * </td>
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
    <td> Pod memory hog </td>
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
    <td> Pod network corruption </td>
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
    <td> Pod network duplication </td>
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
    <td> Pod network latency </td>
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
    <td> Pod network loss </td>
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
    <td> Pod network partition * </td>
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
    <td> Pod network rate limit </td>
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
    <td> Time chaos </td>
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
    <td> Kubelet service kill </td>
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
    <td> Node CPU hog </td>
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
    <td> Node drain </td>
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
    <td> Node IO stress </td>
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
    <td> Node memory hog </td>
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
    <td> Node network latency </td>
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
    <td> Node network loss </td>
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
    <td> Node restart </td>
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
    <td> Node taint </td>
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
    <td> Kubelet density </td>
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