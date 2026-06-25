---
id: cf-app-jvm-method-exception
title: CF app JVM method exception
sidebar_label: CF App JVM Method Exception
description: Make a specific JVM method throw an exception inside a Cloud Foundry app instance so you can test how callers handle synchronous failures.
keywords:
  - chaos engineering
  - cloud foundry
  - cf app jvm method exception
  - jvm method exception
tags:
  - chaos-engineering
  - cloud-foundry-faults
redirect_from:
- /docs/chaos-engineering/technical-reference/chaos-faults/cloud-foundry/cf-app-jvm-method-exception
- /docs/chaos-engineering/chaos-faults/cloud-foundry/cf-app-jvm-method-exception
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';
import CFAndBOSHSecrets from './shared/cf-and-bosh-secrets.md';
import VSphereSecrets from './shared/vsphere-secrets.md';

CF app JVM method exception is a Cloud Foundry chaos fault that forces a specific JVM method (`class`.`method`) inside a running Java app to throw the exception class you specify in `exception`. The fault lasts for `duration` seconds, after which the method behaves normally again.

Use this fault to validate the application's error-handling paths: try/catch coverage, exception-mapping, retry budgets, dead-letter queues, and circuit-breaker trips. It is also useful for testing how upstream consumers handle a known synchronous failure pattern.

:::info Run your first experiment
If you have not configured the chaos infrastructure yet, go to [Quickstart](/docs/chaos-engineering/quickstart) to install the Linux chaos infrastructure and run an experiment end to end.
:::

---

## Use cases

- **Catch-block coverage:** Confirm exceptions raised by a key method are caught and mapped to the expected user-visible response.
- **Retry budgets:** Validate the caller does not retry indefinitely on a permanent-looking exception.
- **Circuit-breaker behavior:** Confirm the breaker opens after the configured threshold.
- **Observability:** Verify the exception surfaces in logs and metrics with the right severity and tags.

---

## Before you begin

- **Chaos infrastructure:** A Linux chaos infrastructure (LCI) installed in one of the supported deployment models.
- **CF and BOSH credentials:** The LCI host has `CF_*`, `UAA_SERVER_ENDPOINT`, and `BOSH_*` credentials configured.
- **Target identifiers:** You know the `organization`, `space`, `app`, and the `boshDeployment`.
- **Java app:** The target app exposes a JVM agent on `port` (default `9091`).
- **Method signature:** You know the fully qualified class name and method name to target. Overloaded methods are matched by name; restrict the experiment in test environments to avoid false targets.

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
| `class` | Fully qualified class name (for example, `com.example.OrderService`). | (required) |
| `method` | Method on `class` to instrument. | (required) |
| `exception` | Fully qualified exception class to throw (for example, `java.lang.RuntimeException`). | (required) |

**Chaos parameters**

| Tunable | Description | Default |
| --- | --- | --- |
| `port` | JVM agent port inside the container. | `9091` |
| `javaHome` | Value of `JAVA_HOME`. Not required if the Java binary is on the container's `PATH`. | `""` |
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

Authenticates to Cloud Foundry and BOSH, locates the target app instance(s), attaches an agent to the JVM via the debug port, and installs a rule that makes every call to `class.method` throw an instance of `exception`. The rule is removed when `duration` elapses.

---

## Expected behavior during fault execution

- Every invocation of the targeted method throws the configured exception until the rule is removed.
- Callers experience whatever error path your application defines for that exception (HTTP 500, mapped 4xx, retry-then-fail, circuit-breaker open, and so on).
- After the fault ends, the method returns to its normal implementation.

### Signals to watch

- **Caller-side error rate:** Use an [HTTP probe](/docs/resilience-testing/chaos-testing/probes/http-probe) on an endpoint that calls the targeted method.
- **Exception logs:** Confirm the configured exception appears in the app's logs with the expected severity.

---

## Recovery and cleanup

- The instrumentation is removed when `duration` elapses, restoring normal behavior.
- If the experiment is aborted, the fault still attempts to remove the rule before exiting.

---

## Limitations

- Matches methods by name only. Overloaded methods on the same class throw the exception regardless of signature.
- The fault does not synthesise a stack trace; the exception originates inside the JVM agent.

---

## Troubleshooting

<Troubleshoot
  issue="CF app JVM method exception fails with 'class or method not found' in Harness Chaos Engineering"
  mode="docs"
  fallback="Confirm the fully qualified class name (with package) and method name match the loaded code exactly. Class names are case-sensitive. Use cf ssh <app> -c 'jcmd 1 GC.class_histogram' to inspect what is loaded."
/>

<Troubleshoot
  issue="Method still returns normally after the fault starts"
  mode="docs"
  fallback="The targeted method may not have been called during the chaos window, or it was JIT-inlined before the agent attached. Generate traffic through the endpoint that calls the method, or restart the app instance before re-running."
/>

---

## Common configurations

### Throw a custom exception

```yaml
apiVersion: litmuchaos.io/v1alpha1
kind: LinuxFault
metadata:
  name: cf-app-jvm-method-exception
  labels:
    name: app-jvm-method-exception
spec:
  cfAppJVMChaos/inputs:
    duration: 30s
    deploymentModel: model-2
    faultInjectorLocation: vSphere
    app: cf-app
    organization: dev-org
    space: dev-space
    boshDeployment: cf
    class: com.example.OrderService
    method: placeOrder
    exception: com.example.OrderRejectedException
```

---

<CFAndBOSHSecrets />

<VSphereSecrets />

---

## Related faults

- [CF app JVM method latency](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-method-latency): Make the same method slow instead of failing.
- [CF app JVM modify return](/docs/chaos-engineering/faults/chaos-faults/cloud-foundry/cf-app-jvm-modify-return): Make the method return a different value instead of throwing.
