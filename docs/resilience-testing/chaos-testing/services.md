---
title: Services
description: Understand onboarded services in Harness Resilience Testing, how they differ from discovered workloads, and how to manage them from the Services page.
keywords:
  - services
  - onboarded services
  - service onboarding
  - resilience testing service
  - service discovery
  - service ID
tags:
  - chaos-engineering
  - services
sidebar_position: 30
---

A service is the unit that Harness Resilience Testing tests, scores, and reports on. Discovery finds candidate targets. Onboarding turns the ones you select into services. Chaos experiments, load tests, DR tests, probes, and risks then attach to those services.

The Kubernetes discovery path invents services from cluster workloads. A **Custom Service Agent** covers targets you define yourself, such as Linux VMs, Windows VMs, and AWS resources. Bulk discovery onboarding attaches default health probes; services you create one at a time start with none.

:::info Feature Flag
Service onboarding is currently behind a feature flag (`CHAOS_RISK_SERVICES_ENABLED`). Contact your Harness sales representative to get it enabled for your account.
:::

---

## What you will learn from this topic

- **The service as the unit of resilience:** How experiments, probes, and risks attach to one entity instead of naming targets separately.
- **Discovered compared with onboarded:** Why continuous discovery alone does not create a Resilience Testing service.
- **How to read a service:** What the Services list and details page report.
- **Service management:** How to edit or delete a service, and how to fill probe inputs from a service in Chaos Studio.

---

## Why the service model matters

Before services existed, each part of Resilience Testing named its own targets. An experiment named a namespace and a workload, a probe repeated the same values in its inputs, and a load test or a DR test described the same application again in its own terms. Nothing connected them.

A service is that connecting entity. Once a target is onboarded, everything else attaches to it.

| What attaches to a service | What that gives you |
|---|---|
| Chaos experiments, load tests, and DR tests | One details page reports all three for that service. |
| Probes | Probes take their inputs from the target behind the service, so you stop copying namespaces and workload kinds between experiments. |
| Risks | Scans record risks per service and score each one, so you can rank services by exposure. |

Resilience becomes a property of a service rather than only an outcome of an individual experiment.

---

## Discovered workloads and onboarded services

Discovery and onboarding are two separate processes.

- **Discovered:** A discovery agent builds an inventory on a schedule. On Kubernetes, that inventory is workloads (and optionally network relationships). Discovery is continuous and read-only. It tells you what exists. Go to [Service discovery](/docs/platform/service-discovery/) for the platform agent, and go to [Automated service onboarding](/docs/resilience-testing/chaos-testing/service-discovery) for the Resilience Testing wizard that consumes that inventory.
- **Onboarded:** You select targets and onboard them in Resilience Testing. Harness creates a service entity for each one. Bulk discovery onboarding also attaches three default probes and runs a risk scan as part of the flow. Go to [Default probes attached during onboarding](/docs/resilience-testing/chaos-testing/service-discovery#default-probes-attached-during-onboarding) for the default set.

A cluster can report hundreds of discovered workloads while only a subset become services. Discovery covers everything the agent can see. Onboarding covers what you intend to test.

:::info Continuous discovery, one-time bulk onboarding
Discovery keeps refreshing the inventory after the initial setup. The bulk onboarding wizard runs once per infrastructure. Onboard new workloads later with manual onboarding when discovery finds them.
:::

---

## Where services live in the UI

Services sit under the **Insights** section of the Resilience Testing left navigation.

Go to **Resilience Testing → Insights → Services** to open the list. It shows every service in the project, whichever infrastructure it was onboarded from.

| Column | What it shows |
|---|---|
| **Service name** | The display name, the **Service ID**, and the number of tags applied to it. |
| **Service type** | The kind of target the service represents, such as `Service` for a Kubernetes workload or `Linux VM` for a virtual machine. |
| **Infrastructure** | The Resilience Testing infrastructure the service is bound to. |
| **Last modified** | Who last changed the service and when. Services created by onboarding show `SYSTEM` as the author. |

Use **Search for a service** to find a service by name, and **Add Filter** to narrow the list by attributes such as infrastructure. **Reset** clears every active filter. The sort control defaults to **Last Modified (New -> Old)**.

### Services belong to one infrastructure

A service is scoped to the infrastructure it was onboarded against. When the same workload runs in more than one cluster and you onboard each infrastructure, you get one service per infrastructure. The **Infrastructure** column is what separates them.

Custom services you create with the Custom Service Agent also require an explicit infrastructure assignment. Go to [Custom Service Agent](/docs/resilience-testing/chaos-testing/custom-service-agent) for that path.

### Tags applied at onboarding

Harness tags each service it onboards through the discovery wizard:

- **`onboarding=true`:** Marks the service as created by the onboarding flow.
- **`namespace=<namespace>`:** Records the Kubernetes namespace the workload runs in.

---

## Open a service

Select a service name in the list to open its details page.

| Tab | What it shows |
|---|---|
| **Summary** | Test counts and resilience metrics for the service, the risks detected against it, and its recent test activity. |
| **Resilience Tests** | The chaos experiments, load tests, and DR tests that target this service, filtered by **Status**. |
| **Probes** | The probes attached to the service. Bulk discovery onboarding starts you with three defaults; manual onboarding starts empty. Go to [Default probes attached during onboarding](/docs/resilience-testing/chaos-testing/service-discovery#default-probes-attached-during-onboarding) for the default set. |
| **Risks** | The resilience risks identified against the service, filtered by **Severity**, **Validation**, or **Source**. |

Use **Edit** in the top right to change the display name, description, tags, or attached probes. The **Service ID** does not change when you rename the service. Use **Settings** to manage the service configuration.

### About this Service

The left panel of the **Summary** tab records where the service came from and where experiments against it run.

- **Service type:** The platform the target runs on, such as Kubernetes.
- **Chaos agent / infrastructure:** The Resilience Testing infrastructure that executes experiments against the service.
- **Namespace:** The Kubernetes namespace the workload runs in, when applicable.
- **Discovery agent:** The discovery agent that found the workload, when the service came from discovery.

### Resilience metrics

The **Summary** tab summarizes chaos, load, and disaster recovery activity for the service over the period set in the **Timeframe** selector, which defaults to the last 30 days.

| Card | Metrics |
|---|---|
| **Chaos Testing** | Tests run, resilience score, and resilience coverage for this service. |
| **Load Testing** | Tests run and latency metrics when load tests have produced them. |
| **Disaster Recovery Testing** | Tests run and recovery metrics when DR tests have produced them. |

:::info Metrics need test activity
Cards stay empty until matching tests have run against the service in the selected timeframe. Some load and DR metric fields remain sparse until those test types report richer results.
:::

:::info Application-level scoring is not in this release
Service pages report per-service results. Application-level resilience scoring across a group of services is not available yet. Do not treat Application Maps as part of the services onboarding flow.
:::

Below the cards, **Risks Detected in this Service** lists open risks, and **Resilience Test Activity** lists recent runs. Filter that activity by **Chaos Experiments**, **Load Tests**, or **DR Tests**.

### How to read a service

- **Is this service actually being tested?** A service with no test activity is onboarded but unvalidated. Generate a suitable experiment for it before you rely on its score.
- **Is the coverage meaningful?** Resilience score tells you how well the service held up in the tests you ran, and resilience coverage tells you how much of the service those tests exercised. A high score with low coverage means the service is barely tested, not resilient.

---

## Use a service to fill in probe inputs in Chaos Studio

When you add a probe to an experiment in [Chaos Studio](/docs/resilience-testing/chaos-testing/experiments), select a service to populate the probe inputs instead of typing them.

1. Open the experiment and select the probe in the **Experiment Builder**.
2. Select the service you want the probe to validate.
3. Harness fills the **Envs** section from the service, including `TARGET_NAMES`, `TARGET_NAMESPACE`, and `TARGET_KIND`, along with timing inputs such as `STATUS_CHECK_TIMEOUT` and `STATUS_CHECK_DELAY`.
4. Adjust any value that needs to differ for this experiment, then select **Apply Changes**.

Service selection is optional. Clear it to enter inputs yourself. **Target Application** on the fault similarly offers workload kind, namespace, and names from workloads Harness already knows about.

In experiment YAML, the link is a `serviceId` inside `probeRef`:

```yaml
probeRef:
  name: pod-status-check
  serviceId: productcatalogservice
```

Go to [Automated service onboarding](/docs/resilience-testing/chaos-testing/service-discovery) to onboard services in bulk. Go to [Manual service onboarding](/docs/resilience-testing/chaos-testing/manual-service-onboarding) to onboard one workload.

---

## Edit or delete a service

Select **Edit** on a service, or use the row menu on the **Services** page, to open the **Edit Resilience Testing Service** wizard. It has the same three steps as [manual service onboarding](/docs/resilience-testing/chaos-testing/manual-service-onboarding), so you can rename the display name, change its tags, and add, reconfigure, or remove its probes.

Renaming a service does not change its **Service ID**. Experiments and probes that already reference the service keep working after a rename.

:::caution Probe target names must be lowercase
Probe inputs such as `TARGET_NAMES` are passed to the Kubernetes API, which rejects uppercase characters in resource names. Keep the values lowercase when you edit them, otherwise the probe fails to apply at runtime.
:::

---

## Next steps

- [Automated service onboarding](/docs/resilience-testing/chaos-testing/service-discovery): Run bulk onboarding with risk scanning and default probes.
- [Manual service onboarding](/docs/resilience-testing/chaos-testing/manual-service-onboarding): Add one workload and select its probes.
- [Custom Service Agent](/docs/resilience-testing/chaos-testing/custom-service-agent): Onboard Linux, Windows, AWS, and other custom targets.
- [Probes](/docs/resilience-testing/chaos-testing/probes): Add your own validation on top of the default probes.
- [Chaos experiments](/docs/resilience-testing/chaos-testing/experiments): Target an onboarded service with a fault.
