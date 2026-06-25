---
id: cf-app-container-kill
title: CF app container kill
sidebar_label: CF App Container Kill
description: Kill the container of a Cloud Foundry app instance so you can test how the platform reschedules it and how peers absorb traffic during the gap.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app container kill
  - container kill
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-container-kill
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-container-kill
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app container kill is a Cloud Foundry chaos fault that terminates the container holding one or more instances of `app` in `organization`/`space`. Cloud Foundry detects the missing instance and restarts it elsewhere in the Diego cluster, exercising the platform's self-healing behavior.

Use this fault to validate how the application and its consumers behave when an individual app instance disappears: whether peers absorb the load, whether the app rejoins the route map cleanly, whether SLOs hold during the rescheduling window, and whether alerts fire only when the platform fails to recover.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Instance loss resilience:** Confirm peer instances absorb traffic when one container is killed.
- **Platform self-healing:** Validate Cloud Foundry's Diego scheduler restarts the instance inside its expected window.
- **Connection draining:** Verify in-flight requests on the killed instance fail cleanly (not silently hang) and clients retry.
- **Alert tuning:** Tune health-check thresholds so single-instance failures do not page on-call.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed in one of the supported deployment models. Go to [Cloud Foundry chaos deployment](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-chaos-components-and-their-deployment-architecture) to read the options.
- **CF and BOSH credentials:** The chaos infrastructure host has `CF_*`, `UAA_SERVER_ENDPOINT`, and `BOSH_*` credentials configured (see [Authentication](#authentication)).
- **Target identifiers:** You know the `organization`, `space`, and `app` name, and the `boshDeployment` that manages the CF cluster (find with `bosh deployments`).
- **Multiple instances recommended:** The app runs more than one instance, so the experiment can validate peer absorption.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Cloud Foundry (TAS, PCF, open-source) running on BOSH-managed Diego cells | Supported |
| Single-instance apps | Supported (no peer absorption check possible) |

---

## Permissions required

| Action | Requirement |
| --- | --- |
| List apps the CF user can access | `SpaceDeveloper`, `SpaceAuditor`, `OrgManager`, or `OrgAuditor`; scopes `cloud_controller.read` or `cloud_controller.admin` |
| List BOSH deployments | BOSH user with `bosh.read` scope (typically `admin` or a read-only operator) |
| Establish a BOSH SSH session to a Diego cell | BOSH UAA token with `bosh.ssh` or `bosh.admin` scope |
| Locate and terminate the target container on the cell | Operator with SSH and `sudo` on the cell host |

---

## Authentication

| Layer | Where to provide | Tunables |
| --- | --- | --- |
| Cloud Foundry API + BOSH director | `/etc/linux-chaos-infrastructure/cf.env` on the LCI host | `CF_API_ENDPOINT`, `CF_USERNAME`, `CF_PASSWORD`, `UAA_SERVER_ENDPOINT`, `BOSH_CLIENT`, `BOSH_CLIENT_SECRET`, `BOSH_CA_CERT`, `BOSH_ENVIRONMENT` |
| vSphere (only when `faultInjectorLocation: vSphere`) | `/etc/linux-chaos-infrastructure/vsphere.env` | `GOVC_URL`, `GOVC_USERNAME`, `GOVC_PASSWORD`, `GOVC_INSECURE`, `VM_NAME`, `VM_USERNAME`, `VM_PASSWORD` |

---

## Fault tunables

**Required parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `deploymentModel` | LCI placement model. One of `model-1` or `model-2`. For `model-1`, `boshDeployment` and `faultInjectorLocation` are not required. Go to [Cloud Foundry chaos deployment](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-chaos-components-and-their-deployment-architecture). | (required) |
| `organization` | CF organization that owns the app. | (required) |
| `space` | CF space within the organization. | (required) |
| `app` | App whose container instance is targeted. | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `signal` | Termination signal sent to the container's main process. | `SIGKILL` |
| `instanceAffectedPercentage` | Percentage of app instances to target. Default of `0` means exactly one instance. Go to [Instance affected percentage](#instance-affected-percentage). | `0` |
| `boshDeployment` | BOSH deployment name that manages the Diego cells. Required for `deploymentModel: model-2`. | `""` |
| `faultInjectorLocation` | Where the fault-injector runs. Supports `local` and `vSphere`. Required for `deploymentModel: model-2`. | `local` |
| `faultInjectorPort` | Local port used by the fault-injector. If unavailable, a random port in `50320-51320` is chosen. | `50320` |
| `duration` | Total chaos duration. | `30s` |
| `skipSSLValidation` | Skip SSL validation when calling CF APIs. | `false` |
| `rampTime` | Wait period in seconds before and after the fault. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to Cloud Foundry and BOSH, identifies the Diego cell that hosts the target app instance(s), terminates the container holding the instance using the configured `signal`, then waits for Cloud Foundry to reschedule the instance. The fault exits once the reschedule completes or `duration` elapses.

---

## Expected behavior during fault execution

- The targeted instance disappears from the app's instance list briefly; CF marks it `CRASHED` then `STARTING`.
- The CF router stops sending requests to the killed instance until it returns to `RUNNING`.
- Peer instances absorb traffic during the rescheduling window.
- After recovery, the app's instance count returns to the configured value.

### Signals to watch

- **App health:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on a route mapped to the app and assert a healthy 2xx response throughout the experiment.
- **Instance count:** Use a [command probe](/docs/resilience-testing/chaos-testing/probes/command-probe) running `cf app <name>` and assert the instance count matches the desired state after recovery.

---

## Recovery and cleanup

- CF automatically reschedules the killed instance. No manual cleanup is needed.
- If the platform fails to reschedule within `duration`, investigate the Diego scheduler logs and the app's resource quotas.

---

## Limitations

- The killed container is restarted by Cloud Foundry, not by the fault itself. Recovery time depends on the cluster's scheduling capacity.
- With `instanceAffectedPercentage: 100` and an app that runs a single instance, brief downtime is expected (no peers to absorb traffic).
- Requires BOSH access; standalone Diego deployments without BOSH are not supported.

---

## Troubleshooting

<Troubleshoot
  issue="CF app container kill fails to locate the target instance in Harness Chaos Engineering"
  mode="docs"
  fallback="Verify boshDeployment matches an output of bosh deployments. Run cf app <name> --guid to confirm the app exists in the given organization/space."
/>

<Troubleshoot
  issue="BOSH SSH session is rejected"
  mode="docs"
  fallback="Confirm the BOSH UAA client has the bosh.ssh (or bosh.admin) scope. Re-issue BOSH_CLIENT_SECRET if the existing token has expired."
/>

<Troubleshoot
  issue="App stays in CRASHED state after the fault ends"
  mode="docs"
  fallback="The platform attempted a restart and the app did not recover. Run cf logs <app> --recent to inspect crash output, then check Diego scheduler logs and the org/space quota."
/>

---

## Common configurations

### Instance affected percentage

`instanceAffectedPercentage` controls how many instances of the app are targeted. The default `0` translates to exactly one instance. Set a value between `1` and `100` to target a percentage of the running instances.

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-container-kill
  labels:
    name: app-container-kill
spec:
  cfAppContainerKill/inputs:
    duration: 30s
    deploymentModel: model-2
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    instanceAffectedPercentage: 50
```

### Signal

`signal` controls how the container's main process is terminated. Use `SIGKILL` to simulate an abrupt crash, `SIGTERM` to test graceful shutdown handling.

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-container-kill
  labels:
    name: app-container-kill
spec:
  cfAppContainerKill/inputs:
    duration: 30s
    deploymentModel: model-2
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    signal: SIGTERM
```

---

<CFAndBOSHSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app stop](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-stop): Stop the whole app instead of a single instance.
- [CF app route unmap](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-route-unmap): Disconnect the app from its route without touching containers.
