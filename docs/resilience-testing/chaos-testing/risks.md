---
title: Risks
description: Understand how Harness Resilience Testing detects risks, scores them by severity, and confirms them with chaos experiments.
keywords:
  - risks
  - passive risk
  - confirmed risk
  - risk rules
  - risk score
  - risk severity
  - resilience risk
tags:
  - chaos-engineering
  - risks
sidebar_position: 60
---

A risk is a weakness Harness Resilience Testing finds in your system before you break anything. Harness reads the manifests behind your applications, compares them against a set of resilience rules, and records every place your configuration is likely to fail under stress.

Risks are the static half of resilience testing. A risk tells you what looks fragile, and a chaos experiment tells you whether it actually is.

:::info Feature Flag
Risks are currently behind a feature flag (`CHAOS_RESILIENCE_RISKS_ENABLED`). Contact your Harness sales representative to get it enabled for your account.
:::

---

## What you will learn from this topic

- **How risks are produced:** Onboarding scans, pipeline scans, infrastructure scans, and the rules Harness matches your manifests against.
- **How exposure is scored:** Severity weights, the scan risk score, and the Resilience Risk Score for a single service.
- **Passive compared with confirmed:** How a detected risk becomes proven evidence through probe failures.
- **How to prioritize work:** How to read the heat map and the project risk list to decide what to test next.

---

## Where risks come from

Risks are not entered by hand. Every risk is the output of a **scan**. Scans run from three places.

- **Onboarding scan:** The **Scanning** stage of Resilience Testing service onboarding assesses the workloads you select before they become services. Go to [Service discovery and onboarding](/docs/resilience-testing/chaos-testing/service-discovery#scanning-stage) for that flow.
- **Pipeline scan:** Reads the application manifests from the deploy stage of a Harness pipeline. Only pipelines that contain a deploy stage can be scanned, because that stage is where the application definition is available.
- **Infrastructure scan:** Reads the applications a [discovery agent](/docs/platform/service-discovery/) already found in a cluster. Each scan maps to one discovery agent.

All three feed the same analysis, so the risks and reports look the same whichever entry point you use. Go to [Risk scans](/docs/resilience-testing/chaos-testing/risk-scans) to run a pipeline or infrastructure scan on demand.

:::info Risks describe configuration, not behavior
A scan never touches your running system. It inspects declared configuration, so it can tell you that a workload has a single replica, but not that losing that replica takes your checkout page down. Chaos experiments answer the second question.
:::

---

## Risk rules

A risk rule is a resilience condition that Harness checks your manifests against. Harness ships a fixed set of 26 rules and matches them internally. Risk rules are static, so you cannot create, edit, or delete them.

Rules are evaluated with context rather than in isolation. A Deployment running a single replica is a risk on its own, but the same Deployment behind a Horizontal Pod Autoscaler is treated differently, because the autoscaler changes what happens when the replica is lost.

Each rule belongs to one of four categories.

| Category | What it covers | Example rules |
|---|---|---|
| **Availability** | Redundancy and failover. | Single Replica Deployment, Missing Availability Zone Spread, Missing Pod Anti-Affinity, Missing Pod Disruption Budget, Recreate Deployment Strategy |
| **Performance** | Capacity and resource behavior. | Missing CPU or Memory Resource Limits, Missing CPU or Memory Resource Requests, Missing Horizontal Pod Autoscaler, Missing Ephemeral Storage Limits, Init Container Without Resource Limits |
| **Resilience** | Recovery after a failure has already occurred. | Missing Liveness or Readiness Probes, Missing Startup Probe for Slow-Starting Containers, Missing Graceful Shutdown Configuration, Aggressive Rolling Update Configuration, Missing minReadySeconds |
| **Config** | Declared settings that weaken the workload regardless of load. | Container Running as Root, Privileged Container, Writable Root Filesystem, Dangerous Linux Capabilities, Missing Network Policy, Mutable or Missing Image Tag |

Each rule carries its own severity. **Single Replica Deployment** is Critical, for example, while **Missing Pod Anti-Affinity** is Medium.

Not every rule applies to every application. A scan of one application may evaluate only a subset of the rules, so a lower rule count in a report does not mean the scan was incomplete.

To read the full rule list with the category of each rule, open the **Risk Rule** step of the probe wizard in **Project Settings → Probes**, which lists every rule and lets you search it. Go to [Associate a risk rule with a probe](#associate-a-risk-rule-with-a-probe) for the rest of that flow.

---

## Recommendations and mitigation

A risk on its own is only a finding. Harness pairs each one with guidance for acting on it, and that guidance comes in two forms.

**Mitigation** is the Kubernetes change that removes the weakness. The report states it per service in a **Recommendations & Next Steps** table, with a **What we found** column and a **Recommended fix** column. The fixes are concrete rather than generic, for example:

- Add `readinessProbe` and `livenessProbe` targeting the health endpoint on the port the service listens on.
- Create a `PodDisruptionBudget` with `minAvailable` set high enough to survive simultaneous eviction.
- Configure a `preStop` lifecycle hook with a sleep so endpoints de-register before `SIGTERM`.

**Verification** is the chaos experiment that proves whether the risk is real. Every risk in the **Risks Detected** table carries a **Recommendation** describing the experiment to run, such as running a pod delete against a new pod during a rolling update to test a progress deadline. The report expands on this in a section titled **How Harness Chaos Engineering Validates These Fixes**.

Apply the mitigation to fix the configuration, then run the recommended experiment to confirm the fix holds under the failure the risk predicted.

:::info Findings reflect the manifest, not the live cluster
The report states this directly: each finding reflects the declared state of the workload manifest at scan time, and runtime behavior and traffic patterns are not assessed. Validate a finding against the live cluster before you remediate, because the manifest may have changed since the scan ran.
:::

---

## Severity and risk score

Every risk carries a severity, and each severity carries a weight out of 10.

| Severity | Weight |
|---|---|
| **Critical** | 10 |
| **High** | 5 |
| **Medium** | 2 |
| **Low** | 1 |

Harness adds the weights of every risk it found, divides that by the worst possible outcome for the same number of risks, and expresses the result on a 1000-point scale.

```
risk score = (sum of severity weights) / (number of risks x 10) x 1000
```

Consider a scan that found 15 risks: 1 critical, 5 high, 6 medium, and 3 low.

| Step | Calculation | Result |
|---|---|---|
| Weighted total | (1 x 10) + (5 x 5) + (6 x 2) + (3 x 1) | 50 |
| Worst case for 15 risks | 15 x 10 | 150 |
| Proportion | 50 / 150 | 33.3% |
| Score on the 1000-point scale | 33.3% of 1000 | 333 |

The score is truncated rather than rounded. A scan whose proportion works out to 40.29% displays 402, not 403.

Because the score is a proportion rather than a count, it reflects how severe your risks are and not how many you have. A scan of 989 risks weighted mostly medium and low can score 402 while a scan of 15 risks scores 333, so the score compares severity between scans and the raw counts size the work.

:::tip A score of 500 is the recommended gate threshold
The generated report compares the score against a recommended gate threshold of 500 and states whether the scan is above or below it. Use 500 as the default line for deciding whether a service is fit to promote, and tighten it as your scores improve.
:::

### Resilience Risk Score

The risk score describes a whole scan. The **Resilience Risk Score (RRS)** describes a single service, and the report leads with it so you can see which service contributes most of the exposure. The report glossary defines it as a weighted composite of the number and severity of the findings for that service, where a higher value means greater exposure, and the report bands services by it so a service in the Critical band stands out from one in the High band.

---

## The risk heat map

The **Risk Detection Heatmap** on a scan is a matrix of **services against risk rules**. Services form the rows and rules form the columns, so one screen shows you which component is weakest and which rule is violated most widely.

Each cell is colored by the severity of the risk that rule produced for that service, using the same Critical, High, Medium, and Low scale as the risks themselves. A cell marked **No risk detected** means the rule produced nothing for that service, either because the service satisfies it or because the rule does not apply.

Read it in two directions.

- **Across a row:** A service that trips many rules is structurally fragile and is the strongest candidate for your next experiment.
- **Down a column:** A rule that trips across many services is a platform-level or template-level problem. Fixing the shared manifest or Helm chart clears every cell at once, which is far cheaper than fixing services one at a time.

Hover a row to see the risks for that service listed with their severity and the time each one was detected.

The same matrix appears in the report as **Risk Heatmap, Service by Risk Type**, where darker cells indicate a higher concentration of risk and the least severe rule columns are grouped into a single **Other** column to keep the table readable.

---

## Passive and confirmed risks

Every risk a scan produces starts as **passive**. A passive risk is a suspicion: static analysis says this configuration is likely to fail, but nothing has proven it.

You confirm a risk by testing it. Risks attach to a service, and a risk can also be attached to a probe. When an experiment runs a probe that carries a risk, the probe result decides the state of that risk.

Harness calls this state the **validation** of a risk, and it takes one of two values.

| Validation | Meaning |
|---|---|
| **Passive** | Detected through automated metadata scanning and not yet verified by live probing. The default for every new risk. |
| **Confirmed** | Validated by an active probe failure, so the weakness is real and needs immediate attention. |

Confirmed is not a worse category of risk. It is the same risk with evidence attached, which is what makes it worth prioritizing over a passive risk nobody has reproduced yet.

:::tip Treat passive risks as a test backlog
A long list of passive risks is not a resilience posture. It is a list of hypotheses. Work down it by severity, attach each risk to a probe, and run an experiment to find out which ones are real.
:::

### Associate a risk rule with a probe

The link between a probe and the risk lifecycle is the risk rule, and you make it in the probe itself.

1. Go to **Project Settings → Probes**.
2. Select **+ New Probe** and pick the probe type, or open an existing probe to edit it.
3. Work through the wizard. **Risk Rule** is the final step, after **Overview**, **Variables**, **Probe Properties**, and **Run Properties**.
4. In **Risk Rule**, select the rules this probe validates. The list shows every rule with its category and is searchable, and the rules are selected with check boxes, so a probe can carry more than one.
5. Select **Create Probe** to finish.

The association is optional. A probe with no risk rule behaves exactly as it always has and simply reports pass or fail. Once a probe carries a rule, a failure marks the corresponding risk as confirmed.

Associate the rule that matches what the probe actually measures. A probe that checks readiness should carry **Missing Liveness or Readiness Probes** rather than a resource limits rule, otherwise a failure attributes evidence to the wrong weakness.


---

## Risks and services

Each risk points at exactly one service, which is what lets Harness aggregate risk per service and show it on the service details page. You can change the mapping if a risk is attached to the wrong service.

Two behaviors are worth knowing.

- **Aggregation across scans:** A service accumulates risks from every scan that covered it, so its risk counts are a running total rather than the result of the last scan.
- **Detections:** When repeated scans find the same risk on the same service, Harness records another **detection** of that one risk instead of creating a duplicate. A high detection count means the risk has survived several scans without being fixed.

The **Risks** tab on a service collects both routes into one view: risks that came from agent based scans, and risks linked indirectly through the probes attached to that service.

---

## Review risks across the project

Go to **Resilience Testing → Insights → Risks** to see every risk in the project. The page has two tabs and a **Timeframe** filter that defaults to the last 30 days.

**Summary** gives you the totals. **Passive Risks** splits the count by what was scanned, so risks found by scanning pipeline metadata are counted separately from risks found by scanning services metadata, each broken down by severity. **Confirmed Risks** counts the risks validated by probe failures and links to **View Probe Executions**. Below the totals, **Services with risk** ranks every affected service from highest to lowest severity composition, with a stacked **Risk Composition** bar per service.

**Risks** is the full list, one row per risk per service, showing the severity, the rule name and its description, the service, and the validation state. Filter it by **Severity**, **Service ID** (the immutable service identifier), **Validation**, or **Source**, and search by rule name. Start a scan from **+ New Scan** on this page.

### Open a single risk

Select a risk to open its detail page, which is headed with the severity, the rule name, and the service the risk was found in.

**About this Risk** holds the rule name, the service, the severity, the **Latest Validation** state, and a description of what the rule detects. Alongside it, **Total Detections** lists every time the risk has been reported, with these columns.

| Column | Contents |
|---|---|
| **Detection** | The scan that reported it, by name, with the affected service. |
| **Source** | Where the detection came from, such as **Discovery** for a discovery agent scan. |
| **Validation** | The state of that detection, **Passive** or **Confirmed**. |
| **Time Detected** | When the detection was recorded. |

Filter the detections by **Timeframe**, **Source**, or **Validation**. Because each detection names its scan and source, you can tell a risk that one scan found once from a risk every scan since has reported.

Open a single service to review only the risks recorded against it.

---

## Availability on Self-Managed Enterprise Edition

Not every part of risk detection is available on Harness Self-Managed Enterprise Edition (SMP).

| Capability | SaaS | SMP |
|---|---|---|
| Infrastructure scans | Supported | Supported |
| Risk generation, with and without AI | Supported | Supported |
| Pipeline scans | Supported | Not supported |
| Kubernetes mitigations | Supported | Not supported |

On SMP, run infrastructure scans and use the risks they produce. Pipeline scans and Kubernetes mitigation guidance are SaaS only.

---

## Next steps

- [Risk scans](/docs/resilience-testing/chaos-testing/risk-scans): Run a pipeline scan or an infrastructure scan and read the report.
- [Probes](/docs/resilience-testing/chaos-testing/probes): Build the checks that confirm a risk.
- [Chaos experiments](/docs/resilience-testing/chaos-testing/experiments): Run a fault to verify a risk against a live system.
