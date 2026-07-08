---
id: ssh-chaos
title: SSH chaos
sidebar_label: SSH Chaos
description: Run a custom chaos script and matching abort script on a remote VM over SSH for a configurable duration so you can build any kind of host-level fault that the gold-standard fault library does not cover out of the box.
keywords:
  - chaos engineering
  - ssh chaos
  - custom chaos
tags:
  - chaos-engineering
  - ssh-faults
redirect_from:
  - /docs/chaos-engineering/technical-reference/chaos-faults/ssh/ssh-chaos
  - /docs/chaos-engineering/chaos-faults/ssh/ssh-chaos
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

SSH chaos is a chaos fault that opens an SSH session to `HOST` as `USERNAME` (authenticating with `SSH_PASSWORD` or `SSH_KEY` from Harness Secret Manager), runs the user-supplied chaos script at `CHAOS_SCRIPT_PATH` with the parameters in `CHAOS_PARAMETER`, waits, and then runs the abort script at `ABORT_SCRIPT_PATH` with the parameters in `ABORT_PARAMETER` to roll back. Both scripts are mounted into the fault pod from ConfigMaps (`chaos-script`, `abort-script` by default).

Use this fault to add a host-level chaos experiment that the gold-standard fault library does not cover natively (custom service restart, custom network manipulation, custom storage manipulation, and so on) without writing a new fault from scratch.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the chaos infrastructure and run an experiment end to end. Then go to [SSH chaos prerequisites](/docs/chaos-engineering/faults/chaos-faults/ssh/prerequisites) to install the required ConfigMaps and Secrets.
:::

---

## Use cases

Run this fault when you want to answer concrete questions like:

- **Custom chaos:** Inject a fault on a target VM (any TCP block, any service kill, any custom workload script) where the script does the injection and the abort script reverses it.
- **Composite experiments:** Chain multiple host-level manipulations in a single script (for example, hold a network port, restart a process, mutate a config file) so the fault has one rollback step.
- **Rollback rehearsal:** Validate that your abort script returns the host to its pre-fault state cleanly after every run.
- **Bridge to non-Harness automation:** Re-use existing chaos scripts (Bash, Python, Ansible) without porting them to the Harness fault SDK.

---

## Prerequisites

- **Kubernetes version:** 1.21 or later for the cluster running the chaos infrastructure.
- **SSH reachability:** The chaos infrastructure pod can reach `HOST:22` (or the SSH port the script connects to). Adjust network policies, security groups, and routes as needed.
- **Credentials provisioned:** The SSH password or private key is stored in [Harness Secret Manager](/docs/platform/secrets/add-use-text-secrets) (as a Text Secret for `SSH_PASSWORD`, as a File Secret for `SSH_KEY`) and referenced by identifier in the experiment.
- **Scripts uploaded as ConfigMaps:** The chaos script and the abort script are stored in Kubernetes ConfigMaps mounted into the fault pod. The defaults are `chaos-script` mounted at `/tmp/chaos-script/` (script file `script.sh`) and `abort-script` mounted at `/tmp/abort-script/` (script file `abort-script.sh`).
- **Both scripts are idempotent:** The abort script must succeed even if the chaos script never ran, and the chaos script must tolerate a partially-applied previous run.

Go to [SSH chaos prerequisites](/docs/chaos-engineering/faults/chaos-faults/ssh/prerequisites) to create the ConfigMaps and secret with the recommended layout.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Linux VMs (any distribution) | Supported |
| VMs hosted on AWS, Azure, GCP, on-prem, or bare metal | Supported |
| Windows VMs over SSH | Not supported (use [Windows faults](/docs/chaos-engineering/faults/chaos-faults/windows)) |
| Containers (no SSH service) | Not supported (use Kubernetes faults) |

---

## Permissions required

This fault is classified as an **Advanced** SSH fault. Two layers of permissions apply.

**On the chaos infrastructure cluster.** The chaos service account needs the following Kubernetes RBAC permissions.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: hce
  name: ssh-chaos
rules:
  - apiGroups: [""]
    resources: ["pods"]
    verbs: ["create", "delete", "get", "list", "patch", "deletecollection", "update"]
  - apiGroups: [""]
    resources: ["events"]
    verbs: ["create", "get", "list", "patch", "update"]
  - apiGroups: [""]
    resources: ["pods/log"]
    verbs: ["get", "list", "watch"]
  - apiGroups: ["apps"]
    resources: ["deployments"]
    verbs: ["get", "list"]
  - apiGroups: ["litmuschaos.io"]
    resources: ["chaosengines", "chaosexperiments", "chaosresults"]
    verbs: ["create", "delete", "get", "list", "patch", "update"]
  - apiGroups: ["batch"]
    resources: ["jobs"]
    verbs: ["create", "delete", "get", "list", "deletecollection"]
  - apiGroups: [""]
    resources: ["configmaps", "secrets"]
    verbs: ["get", "list", "watch"]
```

**On the target VM.** `USERNAME` must have enough OS-level privileges to execute everything the chaos and abort scripts do. For root-level operations (`tc`, `iptables`, `systemctl`), grant `sudo` access (with `NOPASSWD` if needed) or use the root account. The chaos pod does not elevate privileges on its own.

---

## Fault tunables

Configure the following fault parameters when you add SSH chaos to an experiment in Chaos Studio. Defaults are shown for reference.

**Target host**

| Tunable | Description | Default |
| --- | --- | --- |
| `HOST` | DNS name or IP address of the target VM. | (required) |
| `USERNAME` | SSH user used to log in to `HOST`. | (required) |
| `SSH_PASSWORD` | Identifier of the **Text Secret in Harness Secret Manager** that contains the SSH password. | (required if no `SSH_KEY`) |
| `SSH_KEY` | Identifier of the **File Secret in Harness Secret Manager** that contains the SSH private key. | (required if no `SSH_PASSWORD`) |

**Scripts and parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `CHAOS_SCRIPT_PATH` | Absolute path inside the fault pod where the chaos script is mounted. | `/tmp/chaos-script/script.sh` |
| `ABORT_SCRIPT_PATH` | Absolute path inside the fault pod where the abort (rollback) script is mounted. | `/tmp/abort-script/abort-script.sh` |
| `CHAOS_PARAMETER` | JSON-encoded parameters passed to the chaos script. Use indicator types (`raw:`, `env:`, `$`) to mix literals, env vars, and references. | `""` |
| `ABORT_PARAMETER` | JSON-encoded parameters passed to the abort script. Same format as `CHAOS_PARAMETER`. | `""` |
| `INDICATOR_TYPES` | Comma-separated list overriding the default indicator markers when your scripts use non-standard placeholders (for example `string,environment,&`). | (uses defaults) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `RAMP_TIME` | Wait period in seconds before and after the fault. Go to [ramp time](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults#ramp-time) to read how it is applied. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Sample chaos and abort scripts

A minimal pair of scripts that blocks a port and then unblocks it on rollback:

```bash
# chaos script (/tmp/chaos-script/script.sh)
#!/usr/bin/env bash
set -euo pipefail
DEST_IP="$1"
PORT="$2"
sudo iptables -I OUTPUT -d "$DEST_IP" -p tcp --dport "$PORT" -j DROP
sleep "$DURATION"
```

```bash
# abort script (/tmp/abort-script/abort-script.sh)
#!/usr/bin/env bash
set -euo pipefail
DEST_IP="$1"
PORT="$2"
sudo iptables -D OUTPUT -d "$DEST_IP" -p tcp --dport "$PORT" -j DROP || true
```

Matching `CHAOS_PARAMETER` and `ABORT_PARAMETER`:

```json
{"parameters":[{"placeholder":"destination_ip","data_type":"string","value":"10.0.0.10"},{"placeholder":"port","data_type":"int","value":"3258"}]}
```

The same JSON is passed to both scripts so the abort script knows which rule to remove.

---

## Fault execution in brief

Opens an SSH connection to `HOST` as `USERNAME`, copies the chaos script to the target, runs it with the parameters from `CHAOS_PARAMETER`, waits for the chaos duration declared inside the script, then runs the abort script with the parameters from `ABORT_PARAMETER` and closes the SSH connection.

---

## Expected behavior during fault execution

- The target VM runs the chaos script with the privileges of `USERNAME`. Effects on the VM depend entirely on the script.
- The abort script is invoked at the end of the run (or when the experiment is aborted) to roll back the changes.
- The chaos pod streams the chaos script's stdout/stderr into its own logs for traceability.
- After the abort script returns, the SSH connection is closed and the fault exits.

:::info When the fault ends
The chaos pod runs the abort script and closes the SSH connection. Recovery on the target VM depends on the abort script returning cleanly.
:::

### Signals to watch

Attach [resilience probes](/docs/resilience-testing/chaos-testing/probes) to assert each layer:

- **Outcome on the target:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) that runs a check on the target (for example `ssh user@host 'systemctl is-active <unit>'`) and asserts the expected state during the chaos window.
- **Application impact:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on an endpoint served by the workload affected by the script.
- **Monitoring fidelity:** Use a [Prometheus probe](/docs/resilience-testing/chaos-testing/probes/apm-probes) on whatever metric the script is meant to move.

---

## Verify the fault execution effect

1. **Watch the fault pod logs to see script output.**

   ```bash
   kubectl logs -n <chaos-infra-namespace> -l name=ssh-chaos -f
   ```

2. **Inspect the target VM during the chaos window.**

   ```bash
   ssh <USERNAME>@<HOST> "<check command, for example 'sudo iptables -S OUTPUT | head'>"
   ```

3. **Confirm the abort script ran.**

   The fault pod logs should contain the abort script's stdout/stderr at the end of the run.

---

## Recovery and cleanup

- **End of duration:** The chaos pod runs the abort script when the chaos script returns or when the experiment duration ends.
- **Abort the experiment:** Stopping the experiment from Chaos Studio also triggers the abort script.
- **Manual recovery:** If the abort script fails (logged in the fault pod), SSH into the target VM and run it manually with the same parameters: `bash /path/to/abort-script.sh <args>`.
- **Workload recovery:** Recovery on the target VM depends entirely on the abort script.

---

## Limitations

- **Idempotency is on you:** Both scripts must be safe to re-run; the fault does not guarantee an exclusive lock on the target VM.
- **Single host per run:** Each fault run targets one `HOST`. Use multiple experiments to fan out to many VMs.
- **No built-in observability:** The chaos pod streams script output to its logs but does not parse it; encode pass/fail signals in the script's exit code.
- **No mid-flight reconfigure:** Changing the script requires updating the ConfigMap and re-running the experiment.
- **SSH connectivity:** A network outage on `HOST` mid-run can leave the chaos script partially applied; ensure the abort script can recover from that state on a subsequent run.

---

## Troubleshooting

<Troubleshoot
  issue="SSH chaos fails with permission denied (publickey) in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify USERNAME exists on the target VM and that the supplied SSH_KEY (or SSH_PASSWORD) is correct. For SSH_KEY, the File Secret must contain the private key file (not the public key) and the corresponding public key must be in ~/.ssh/authorized_keys on the target VM. Test manually with ssh -i <key> USERNAME@HOST."
/>

<Troubleshoot
  issue="Chaos script runs but produces no effect on the target VM"
  mode="docs"
  fallback="USERNAME may lack the privileges the script needs (for example sudo, capability to write to a system directory). Either grant sudo access to USERNAME on the target VM, use a privileged account, or simplify the script."
/>

<Troubleshoot
  issue="Abort script did not run or did not fully revert the changes"
  mode="docs"
  fallback="Check the fault pod logs for the abort script's stdout/stderr. If the abort script did not run, the SSH connection likely failed mid-experiment; re-run the abort script manually on the target VM with the same parameters. If the abort script ran but did not revert, make the script idempotent and re-run it."
/>

<Troubleshoot
  issue="Indicator parsing error in CHAOS_PARAMETER"
  mode="docs"
  fallback="Validate the JSON in CHAOS_PARAMETER with jq before running. The indicator types (raw:, env:, $) must match INDICATOR_TYPES if you overrode the defaults. The default format is raw:{value},env:{$ENV},raw:{para}."
/>

---

## Related faults

- [Linux fault library](/docs/chaos-engineering/faults/chaos-faults/linux): Use the supported Linux faults instead of writing custom scripts where possible.
- [Custom faults](/docs/chaos-engineering/faults/custom-faults/): Promote a custom script into a first-class fault for repeated use.
