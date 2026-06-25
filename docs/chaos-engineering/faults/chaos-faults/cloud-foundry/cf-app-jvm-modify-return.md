---
id: cf-app-jvm-modify-return
title: CF app JVM modify return
sidebar_label: CF App JVM Modify Return
description: Override the return value of a specific JVM method inside a Cloud Foundry app instance so you can test caller behavior against unexpected return values.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app jvm modify return
  - jvm method return
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-jvm-modify-return
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-jvm-modify-return
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app JVM modify return is a Cloud Foundry chaos fault that overrides the return value of a specific JVM method (`class`.`method`) inside a running Java app. Every invocation of the method returns the value you provide in `return` for `duration` seconds, after which the method behaves normally again.

Use this fault to simulate corrupted upstream data, unexpected `null` returns, stale cache values, or wrong-type responses, and validate the caller's defensive checks, fallbacks, and observability.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Null-safety validation:** Confirm callers handle `null` returns from a method that normally returns a value.
- **Corrupted-data resilience:** Test the caller's response to obviously-wrong return values.
- **Feature-flag bypass:** Force a method to return a specific value (for example, `false`) to short-circuit a flag and exercise the disabled code path.
- **Cache poisoning rehearsal:** Simulate a poisoned cache layer returning incorrect values.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed in one of the supported deployment models.
- **CF and BOSH credentials:** The LCI host has `CF_*`, `UAA_SERVER_ENDPOINT`, and `BOSH_*` credentials configured.
- **Target identifiers:** You know the `organization`, `space`, `app`, and the `boshDeployment`.
- **Java app:** The target app exposes a JVM agent on `port` (default `9091`).
- **Return-type compatibility:** The value you provide in `return` is assignable to the method's declared return type.

---

## Supported environments

| Platform | Support status |
| --- | --- |
| Java apps deployed to Cloud Foundry | Supported |
| Non-Java workloads | Not supported |

---

## Permissions required

| Action | Requirement |
| --- | --- |
| List apps the CF user can access | `SpaceDeveloper`, `SpaceAuditor`, `OrgManager`, or `OrgAuditor`; scopes `cloud_controller.read` or `cloud_controller.admin` |
| List BOSH deployments | BOSH user with `bosh.read` scope |
| SSH to a Diego cell via BOSH | BOSH UAA token with `bosh.ssh` or `bosh.admin` scope |
| Attach the JVM agent to the target container | Operator with `sudo` or root on the cell host |

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
| `deploymentModel` | LCI placement model. One of `model-1` or `model-2`. | (required) |
| `organization` | CF organization that owns the app. | (required) |
| `space` | CF space within the organization. | (required) |
| `app` | Java app whose method is targeted. | (required) |
| `class` | Fully qualified class name. | (required) |
| `method` | Method on `class` to instrument. | (required) |
| `return` | Value to return from every invocation. Must be assignable to the method's declared return type (for example, `null`, `false`, `0`, `"failure"`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `port` | JVM agent port inside the container. | `9091` |
| `javaHome` | Value of `JAVA_HOME`. | `""` |
| `instanceAffectedPercentage` | Percentage of instances to target. `0` targets exactly one. | `0` |
| `boshDeployment` | BOSH deployment name. Required for `deploymentModel: model-2`. | `""` |
| `faultInjectorLocation` | `local` or `vSphere`. Required for `deploymentModel: model-2`. | `local` |
| `faultInjectorPort` | Local port used by the fault-injector. | `50320` |
| `duration` | Total chaos duration. | `30s` |
| `skipSSLValidation` | Skip SSL validation when calling CF APIs. | `false` |
| `rampTime` | Wait period in seconds before and after the fault. | `0` |

Tunables that apply to every fault are documented in [common tunables for all faults](/docs/chaos-engineering/faults/chaos-faults/common-tunables-for-all-faults).

---

## Fault execution in brief

Authenticates to Cloud Foundry and BOSH, locates the target app instance(s), attaches an agent to the JVM via the debug port, and installs a rule that returns the configured `return` value for every call to `class.method`. The rule is removed when `duration` elapses.

---

## Expected behavior during fault execution

- Every invocation of the targeted method returns the configured `return` value, bypassing the method's normal body.
- Callers observe whatever happens next given the unexpected value: fallbacks, defensive checks, downstream errors.
- After the fault ends, the method returns to its normal behavior.

### Signals to watch

- **Caller response:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on an endpoint that calls the method and assert the expected fallback or error response.
- **Logs:** Verify the caller logs the unexpected value at the right severity.

---

## Recovery and cleanup

- The instrumentation is removed at the end of `duration`, restoring the method's normal behavior.

---

## Limitations

- Matches methods by name only; overloaded methods on the same class all receive the override.
- The return value must be expressible as a literal compatible with the declared return type. Complex object construction is not supported.

---

## Troubleshooting

<Troubleshoot
  issue="CF app JVM modify return: agent rejects the configured return value"
  mode="docs"
  fallback="The value in return must be assignable to the method's declared return type. For object returns, common choices are null or a static reference. For primitive returns use the literal form (true, false, 0, 42)."
/>

<Troubleshoot
  issue="Caller still observes the original return value"
  mode="docs"
  fallback="The method may have been JIT-inlined before the agent attached. Restart the app instance and rerun the experiment so the method is recompiled with the instrumentation in place."
/>

---

## Common configurations

### Force a method to return null

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-modify-return
  labels:
    name: app-jvm-modify-return
spec:
  cfAppJVMChaos/inputs:
    duration: 30s
    deploymentModel: model-2
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    class: com.example.UserRepository
    method: findById
    return: "null"
```

---

<CFAndBOSHSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app JVM method exception](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-method-exception): Make the method throw an exception instead of returning a wrong value.
- [CF app JVM method latency](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-method-latency): Make the method slow.
