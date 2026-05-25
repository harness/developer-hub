---
id: node-restart
title: Node restart
sidebar_label: Node Restart
description: Reboot a Kubernetes node over SSH to test how the cluster handles sudden node loss, pod rescheduling, and stateful recovery.
keywords:
  - chaos engineering
  - node restart
  - node reboot
  - ssh
  - pod eviction
  - kubernetes node fault
tags:
  - chaos-engineering
  - node-faults
  - lifecycle-chaos
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node/node-restart
  - /docs/chaos-engineering/technical-reference/chaos-faults/kubernetes/node-restart
  - /docs/chaos-engineering/chaos-faults/kubernetes/node-restart
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Node restart is a Kubernetes node-level chaos fault that reboots a target node. Harness Chaos Engineering connects to the node over SSH (using a private key supplied via a Kubernetes secret) and runs a configurable reboot command, by default `sudo systemctl reboot`. The kubelet stops, the node's lease expires, the controller-manager marks the node `NotReady`, and the taint manager eventually evicts the pods. After the node boots back up, the kubelet rejoins the cluster and the node becomes `Ready` again.

Use this fault to simulate sudden node loss: a power event, an unexpected reboot triggered by a kernel update, a hypervisor failover, or a misbehaving daemon that crashes the kernel.

:::tip Prefer cloud-provider alternatives on managed Kubernetes
For managed Kubernetes services, prefer the cloud-provider VM stop faults over node-restart. They do not require SSH access and integrate with the cloud provider's API directly.

- **Amazon EKS:** Use [ec2-stop-by-id](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-id) or [ec2-stop-by-tag](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-tag).
- **Google GKE:** Use [gcp-vm-instance-stop](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-instance-stop).
- **Azure AKS:** Use [azure-instance-stop](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-stop).
:::

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Stateful workload recovery:** Do databases, message brokers, and StatefulSet replicas (PostgreSQL, Kafka, Cassandra, etcd) survive a node loss, recover leader election, and resume serving without data loss?
- **PodDisruptionBudget under sudden loss:** PDBs do not protect against ungraceful node loss. Does your workload have enough replicas distributed across enough nodes to absorb a single-node failure?
- **Cluster autoscaler reaction:** When a node disappears and capacity drops, does the cluster autoscaler add a replacement, and how long does that take?
- **DaemonSet behavior on reboot:** Do critical DaemonSets (CNI agent, log shipper, monitoring agent) come back cleanly when the kubelet rejoins?
- **Resource budgeting and topology constraints:** Do pods reschedule onto nodes that satisfy their topology constraints (zone spread, anti-affinity), or do they stay `Pending` because no other node fits?
- **Persistent volume reattachment:** Do PVs detach from the rebooting node and reattach to the rescheduling node within an acceptable window, especially for cloud block storage (EBS, PD, Disk)?

---

## Prerequisites

- **Kubernetes version:** 1.21 or later. Go to [What's supported](/docs/chaos-engineering/whats-supported) to confirm distribution support.
- **SSH key secret in Harness Secret Manager:** The OpenSSH private key for `SSH_USER` is stored as a **File Secret** in Harness Secret Manager. Go to [Add and reference file secrets](/docs/platform/secrets/add-file-secrets) to upload the key file, and reference the secret identifier when you tune the experiment. The matching public key must be installed under `SSH_USER`'s `~/.ssh/authorized_keys` on every node you intend to target.
- **Network reachability:** The chaos infrastructure pod can reach the target node's internal IP on SSH (port 22 by default). On managed Kubernetes with public-only ingress, this may require a VPN, bastion host, or running the chaos infrastructure inside the same VPC.
- **Sudoers configuration:** The `SSH_USER` can run the `REBOOT_COMMAND` without an interactive password prompt (typically via `NOPASSWD` in `/etc/sudoers`).
- **Node readiness:** Target nodes are in `Ready` state before the fault is launched. The fault reports a precheck failure otherwise.
- **Chaos infrastructure isolation:** The chaos infrastructure pods are not scheduled on the node you are about to reboot. If they are evicted along with everything else, the fault loses observability and may not detect recovery.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Amazon EKS | Supported (prefer [ec2-stop-by-id](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-id)) |
| Azure AKS | Supported (prefer [azure-instance-stop](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-stop)) |
| Google GKE | Supported (prefer [gcp-vm-instance-stop](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-instance-stop)) |
| Red Hat OpenShift | Supported |
| Rancher | Supported |
| VMware Tanzu | Supported |
| Self-managed Kubernetes (CNCF-certified) | Supported |

This fault requires SSH access to the node. Managed environments without SSH access (for example GKE Autopilot, EKS Fargate, ACI virtual nodes) cannot run this fault directly.

---

## Permissions required

The fault runs under the chaos infrastructure's service account. Because the reboot is issued over SSH rather than through the Kubernetes API, the API permissions needed are modest.

| Resource (`apiGroup`) | Verbs | Why it is needed |
| --- | --- | --- |
| `pods` (`""`) | `get`, `list`, `create`, `delete`, `deletecollection`, `patch`, `update` | Create the helper pod that opens the SSH session |
| `pods/log` (`""`) | `get`, `list`, `watch` | Stream logs from the helper pod for status and debugging |
| `secrets` (`""`) | `get`, `list` | Read the SSH private key that Harness Secret Manager projects into the chaos namespace |
| `events` (`""`) | `get`, `list`, `create`, `patch`, `update` | Record fault progress as Kubernetes events |
| `nodes` (`""`) | `get`, `list` | Discover target nodes and validate selectors |
| `jobs` (`batch`) | `get`, `list`, `create`, `delete`, `deletecollection` | Run the chaos job that drives the fault |

The default Harness chaos infrastructure service account already includes these permissions. You only need to extend it if you are running with a restricted scope.

---

## Fault tunables

Configure the following fault parameters when you add Node restart to an experiment in Chaos Studio. Defaults are shown for reference.

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `REBOOT_COMMAND` | Command executed over SSH to reboot the node. The trailing `; true` ensures the SSH session exits cleanly when the connection drops mid-reboot. | `sudo systemctl reboot; true` |
| `TOTAL_CHAOS_DURATION` | Maximum time (in seconds) the fault waits for the node to reboot and rejoin. | `60` |

**Targeting**

| Tunable | Description | Default |
| --- | --- | --- |
| `TARGET_NODE` | Name of the node to reboot. | `""` |
| `TARGET_NODE_IP` | Internal IP of the target node. If empty, the fault derives the IP from `TARGET_NODE`. | `""` |
| `NODE_LABEL` | Label selector for choosing the target node when `TARGET_NODE` is not set. Go to [target nodes with labels](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults#target-nodes-with-labels) to read more. | `""` |

**SSH connection**

| Tunable | Description | Default |
| --- | --- | --- |
| `SSH_USER` | User account to SSH into the node as. | `root` |
| `NODE_RESTART_AUTHENTICATION_SECRET` | Reference to the **File Secret** in Harness Secret Manager that holds the OpenSSH private key for `SSH_USER`. Go to [Add and reference file secrets](/docs/platform/secrets/add-file-secrets) to create it. | required |

**Runtime and helper**

| Tunable | Description | Default |
| --- | --- | --- |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every chaos fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

:::warning Reboot, not graceful drain
This fault does not cordon, drain, or respect PDBs. Pods on the target node are killed when the node reboots, with whatever in-flight state they had. Use [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain) when you want graceful eviction; use Node restart when you want to test the cluster's reaction to sudden loss.
:::

---

## Fault execution in brief

The reboot is sudden from the cluster's perspective. The pod eviction path is the same as a network partition (taint manager + `tolerationSeconds`), but the cause is a missing kubelet rather than a missing network.

| Stage | What happens |
| --- | --- |
| SSH and reboot | Helper opens SSH, runs `REBOOT_COMMAND`, returns. The node starts shutting down. |
| Lease expiry | Kubelet stops renewing the node lease. After `node-monitor-grace-period` (default 40 to 50 seconds), the controller-manager flips the node to `Ready=Unknown` and applies the `node.kubernetes.io/unreachable:NoExecute` taint. |
| Pod eviction | Pods tolerate the taint for `tolerationSeconds: 300` by default. After that, the taint manager evicts them. Deployment pods reschedule on other Ready nodes. StatefulSet pods that share PV identity stay `Terminating` until the node rejoins or you force-delete. |
| Node returns | When the node boots and the kubelet renews its lease, the controller-manager removes the taint and the node is `Ready` again. |

---

## Expected behavior during fault execution

- The reboot is hard. Application pods do not receive `SIGTERM` cleanly because the kubelet itself is going down with the node. Any in-flight state that was not already persisted is lost.
- The taint and eviction path is identical to [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss). The controller-manager cannot distinguish a rebooted node from a partitioned node; in both cases the node lease stops renewing.
- `Deployment` pods are recreated on other Ready nodes. `StatefulSet` pods remain `Terminating` because the StatefulSet controller will not recreate a pod that still exists with the same identity; you must force-delete it to reclaim the slot.
- Pods bound to local persistent volumes or `hostPath` storage cannot reschedule and remain `Pending` until the node returns.
- The window for the node to come back is bounded by `TOTAL_CHAOS_DURATION`. If the boot takes longer (large kernel updates, slow hardware, hypervisor delays), the fault marks itself as failed even though the node may rejoin moments later.

:::info Exact timings vary by cluster
Both `node-monitor-grace-period` and the default toleration seconds are kube-controller-manager flags. Managed Kubernetes providers and hardened clusters often tune them. Use the numbers above as defaults rather than guarantees.
:::

### Signals to watch

A useful experiment captures signals from three layers. Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer automatically:

- **Cluster state:** Run `kubectl get node <name> -w` to confirm the `NotReady` → `Ready` cycle, and `kubectl get pods -o wide --field-selector spec.nodeName=<name> -w` to track eviction. Use a [Kubernetes probe](/docs/resilience-testing/chaos-testing/probes/k8s-probe) or the [node status check](/docs/resilience-testing/chaos-testing/probes/probe-templates/kubernetes/node-status-check) template to validate the node returns to `Ready` within your acceptable window.
- **Application service-level indicators:** Watch error rate and request availability for workloads whose pods were on the affected node. The signal that matters is whether replicas elsewhere absorbed the traffic and how long the disruption lasted. Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) for direct endpoint health.
- **Platform signals:** Track persistent volume attach/detach metrics, autoscaler scale-up events if any, and storage operation latency. Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) or an [APM probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) to fail the experiment when storage operations exceed your safe ceiling.

---

## Verify the fault execution effect

While the experiment is running, confirm that the reboot is actually happening. From a workstation with `kubectl` access:

1. **Confirm the helper pod started and issued the reboot.**

   ```bash
   kubectl logs -n <chaos-namespace> <helper-pod-name>
   ```

   Look for the SSH connection log and the `REBOOT_COMMAND` execution.

2. **Watch the node transition to `NotReady`.**

   ```bash
   kubectl get node <target-node> -w
   ```

   Expect `Ready` → `NotReady` within roughly one minute of the reboot command, then `NotReady` → `Ready` once the node boots back.

3. **Watch pod status on the affected node.**

   ```bash
   kubectl get pods --field-selector spec.nodeName=<target-node> -o wide -w
   ```

   Pods should transition to `Terminating` after the toleration window, then disappear (Deployment) or stay `Terminating` (StatefulSet without force-delete).

4. **Confirm node recovery.**

   ```bash
   kubectl describe node <target-node> | grep -E 'Conditions:|Ready'
   ```

   Once the kubelet rejoins, `Ready=True` should return and the `NoExecute` taint should be removed.

---

## Recovery and cleanup

- **End of duration:** When the node rejoins the cluster, the kubelet renews its lease and the controller-manager removes the `NoExecute` taint. The node is schedulable again.
- **Evicted Deployment pods do not migrate back:** Pods that were evicted during the reboot stay on the replacement nodes.
- **Terminating StatefulSet pods:** Force-delete to release the StatefulSet identity slot once you confirm the underlying storage is detached cleanly:

  ```bash
  kubectl delete pod <pod-name> -n <namespace> --force --grace-period=0
  ```

- **Pods stuck `Pending`:** If your cluster lacks capacity on other nodes, evicted pods may sit in `Pending` until the rebooted node returns and they get scheduled back, or until the cluster autoscaler adds capacity.
- **Pods bound to local storage:** PV-bound pods on local disks or `hostPath` cannot reschedule. They will return when the node returns, with their data intact if the disk survived the reboot.
- **If the node does not come back:** Check the cloud-provider console or hypervisor for failed boot. The chaos infrastructure cannot remedy a node that does not boot.
- **Abort the experiment early:** You cannot abort a reboot that has already executed. Once the `REBOOT_COMMAND` runs over SSH, the node will reboot regardless of whether you stop the experiment.

---

## Limitations

This fault is not appropriate in the following scenarios:

- **GKE Autopilot, EKS Fargate, ACI virtual nodes:** These environments do not expose nodes you can SSH into. Use cloud-provider VM stop faults if available.
- **Single-node clusters:** A reboot of the only node takes the entire cluster down for the duration of the boot. The chaos infrastructure itself goes with it.
- **Co-located chaos infrastructure:** If the chaos infrastructure pods live on the node being rebooted, the experiment loses observability. Schedule chaos infrastructure on a node outside the blast radius.
- **Nodes without sudo/NOPASSWD or with hardened SSH:** SSH key-only access without `NOPASSWD` for the reboot command causes the fault to hang waiting on a password prompt.
- **Long boot times:** If your nodes take longer than `TOTAL_CHAOS_DURATION` to boot, the fault is marked as failed even when the node eventually rejoins. Raise `TOTAL_CHAOS_DURATION` to fit your boot envelope.
- **Workloads that lose data on hard kill:** Applications that rely on graceful shutdown (`SIGTERM`) to flush state will lose that state. Use [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain) for testing graceful eviction; use Node restart only when sudden loss is the failure mode you intend to test.

---

## Troubleshooting

<Troubleshoot
  issue="Node restart fails immediately with SSH authentication or 'Permission denied (publickey)' in Harness Chaos Engineering"
  mode="docs"
  fallback="The private key referenced from Harness Secret Manager does not match a public key in SSH_USER's authorized_keys on the target node. Verify the File Secret in the Harness UI, then SSH manually with the same key from a workstation to confirm the credentials work. Re-run ssh-copy-id if the public key is missing on the node."
/>

<Troubleshoot
  issue="Node restart times out waiting for SSH connection in Harness Chaos Engineering"
  mode="docs"
  fallback="The chaos infrastructure pod cannot reach the target node's SSH port. Confirm the node's internal IP with kubectl get node <target-node> -o wide (look at the INTERNAL-IP column) and test reachability from inside a debug pod in the chaos namespace. On managed Kubernetes with private-only nodes you may need a bastion host or a VPN."
/>

<Troubleshoot
  issue="Node restart command runs but the node does not actually reboot"
  mode="docs"
  fallback="REBOOT_COMMAND ran but the user lacked sudo permission. Verify NOPASSWD sudo is configured for SSH_USER for the specific command. Check /etc/sudoers.d/<file> on the node. As a workaround, use a REBOOT_COMMAND that does not require sudo, such as 'sudo /sbin/reboot' if that path is allowed."
/>

<Troubleshoot
  issue="Node does not return to Ready within TOTAL_CHAOS_DURATION"
  mode="docs"
  fallback="The node may take longer to boot than the experiment allows (kernel updates, slow hardware, hypervisor queue). Check the cloud-provider console to confirm boot status. For future runs, raise TOTAL_CHAOS_DURATION above your worst-case boot time. The experiment marks itself failed but the node typically still rejoins shortly after."
/>

<Troubleshoot
  issue="StatefulSet pods stay Terminating after node-restart even after the node returns to Ready"
  mode="docs"
  fallback="The StatefulSet controller will not recreate a pod that still exists with the same identity. Force-delete the Terminating pod with kubectl delete pod <name> -n <namespace> --force --grace-period=0, then confirm the PV detaches and the new pod takes over. If the PV is on cloud block storage, verify with the provider's console that detach completed."
/>

---

## Related faults

- [Node drain](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-drain): Graceful eviction respecting PDB. Use it to test the planned-maintenance path.
- [Node network loss](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/node-network-loss): Same eviction sequence (taint + tolerationSeconds) but the node stays up. Use it to test partition-handling without an actual reboot.
- [Kubelet service kill](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/kubelet-service-kill): Same `NotReady` signal but kubelet alone is stopped, not the whole node. Faster to recover.
- [ec2-stop-by-id](/docs/chaos-engineering/faults/chaos-faults/aws/ec2-stop-by-id), [gcp-vm-instance-stop](/docs/chaos-engineering/faults/chaos-faults/gcp/gcp-vm-instance-stop), [azure-instance-stop](/docs/chaos-engineering/faults/chaos-faults/azure/azure-instance-stop): Cloud-provider equivalents that do not require SSH.
- [Common node fault tunables](/docs/chaos-engineering/faults/chaos-faults/kubernetes/node/common-tunables-for-node-faults): Shared environment variables for selecting target nodes across node faults.
