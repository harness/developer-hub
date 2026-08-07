---
title: Single & Multi-Workload AutoStopping Rules
sidebar_label: Single & Multi-Workload Rules
description: Compare the two Kubernetes AutoStopping rule models, one that covers a single workload and one that covers a whole application, and understand how each detects traffic and how you create it.
sidebar_position: 1.5
---

{/*
Vocabulary locked with the user:
  - single-workload rule = one rule covers one workload; traffic detected by an Envoy proxy in the request path; YAML written by hand.
  - multi-workload rule  = one rule covers a whole application; traffic detected by an eBPF agent from the side; Harness composes the rule.
Do NOT use "V1"/"V2" as the customer-facing frame for the rules.
K8s Coverage content (workload discovery, Network Map, applications, recommendations) lives in overview.md.
Link to it here — do not restate it.
*/}

## Introduction

Harness CACM provides two Kubernetes AutoStopping rules: the **single-workload rule** and the **multi-workload rule**. Support for each depends on the version of the AutoStopping controller in your cluster. Controller versions up to `1.2.3` support single-workload rules, where one rule manages one workload and detects its traffic with a proxy in the request path. Controller version `2.0.0` and later support multi-workload rules instead, where one rule manages several related workloads together as one application and detects their traffic with an eBPF agent that watches from the side.

---

## Single-Workload AutoStopping Rule

In a single-workload rule, every request to a workload passes through an Envoy proxy that Harness places in front of it. This proxy does two jobs: it watches the incoming traffic, so Harness knows when a workload is in use, and it forwards requests to the workload, starting the workload again if it has been stopped. Because the proxy handles every request, it is the single point that both watches traffic and controls routing, and each AutoStopping rule manages one workload. You define the workload and its routing by hand for every rule.

---

## Multi-Workload AutoStopping Rule

A multi-workload rule removes the Envoy proxy from between the ingress and your workloads. While a workload is running, traffic flows straight from the ingress to it, with no Harness component in between. To know when a workload is being used, AutoStopping watches network activity from the side using an eBPF agent, so there is nothing extra between your users and your application.

Because the eBPF agent watches traffic instead of carrying it, it can also see how your workloads talk to each other. Harness uses this to map out your applications, discover which workloads belong together, and recommend rules for you, so you no longer have to build each rule by hand.

When a workload is idle and AutoStopping stops it, the controller scales the workload to zero and points its ingress route at a lightweight proxy. The next request to that route reaches the proxy, which returns a progress page while the controller scales the workload back up and rewires the ingress to it. Subsequent requests are served by the running workload. The eBPF agent only observes traffic and is never in this path.

Go to the [Kubernetes AutoStopping overview](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/k8s-coverage) to understand how AutoStopping discovers workloads, groups them into applications on the Network Map, and recommends these rules.

{/* TODO: confirm supported workload kinds — Shalin call says Deployments AND StatefulSets. Verify before stating. */}

---

## How They Compare

| Capability | Single-workload rule | Multi-workload rule | Why it matters |
| --- | --- | --- | --- |
| Traffic path | `ingress -> Envoy proxy -> workload` | `ingress -> workload` | No Harness component sits between your users and a running workload, so there is nothing extra to scale or secure in the request path. |
| Traffic detection | Envoy proxy in the traffic path | eBPF agent, watching from the side | Traffic is detected without adding latency or inspecting request contents. |
| Workloads per rule | One | Multiple (a whole application) | One rule covers an entire application, instead of one rule per workload. |
| Ingress entry points per workload | One | Multiple | A workload reachable through several domains or ingress controllers starts on traffic to any of them. |
| Ingress support | Controller-specific | Works across ingress controllers (NGINX and AWS ALB) | AutoStopping works with your existing ingress controller, with no certified-controller requirement. |
| Onboarding | Edit a ready-made YAML template per rule | Recommendations and one-click rule creation | Harness composes the rule for you, so onboarding no longer means editing YAML for each rule. |

:::note

A multi-workload rule works across ingress controllers rather than being tied to a specific one, because the eBPF agent watches traffic from the side instead of parsing controller configuration. Current support is as follows:

- **Supported:** the NGINX and AWS ALB ingress controllers.
- **Not supported:** the GCE ingress controller on GKE and Traefik.
- **Gateway API resource model:** AutoStopping detects workloads exposed through the standard `Ingress` resource. Routing defined with the Gateway API (`Gateway` and `HTTPRoute` resources) is not yet supported.

:::

---

## Components Installed in Your Cluster

A multi-workload rule installs the following components:

| Component | Kind | Role |
| --- | --- | --- |
| AutoStopping controller | Deployment | Runs workload and ingress discovery, applies rules, scales workloads, and updates ingress routing when workloads stop or start. |
| Discovery agent | DaemonSet | Observes kernel-level network activity on every node using eBPF and reports the connections between workloads. |
| Progress agent | Deployment (dynamic) | Serves the progress page while a stopped workload restarts. The controller installs it per namespace as rules are created. |

Each rule you create is also stored in the cluster as an `AutoStoppingRule` custom resource, which the controller keeps in sync with Harness.

---

## Move to a Multi-Workload Rule

If you already run single-workload rules, moving to multi-workload rules is two things: one action you take in your cluster, and one thing Harness does for you automatically. You re-apply the AutoStopping YAML from your CCM Kubernetes connector, and Harness then converts your existing rules.

:::info

This is not a version bump. Changing the AutoStopping controller image tag on its own does not move you to multi-workload rules. The multi-workload controller needs extra components and extra configuration that only the full YAML installs, so always re-apply the full YAML from your connector.

:::

### 1. Re-apply the AutoStopping YAML

Re-download and apply the YAML from your CCM Kubernetes connector:

1. In Harness, go to **Account Resources** > **Connectors** and open your CCM Kubernetes connector.
2. Select **Edit** and step through the wizard to **Provide Permissions**.
3. Select **Download YAML**.
4. Copy the YAML to a machine that has `kubectl` and access to your cluster, then apply it:

   ```
   kubectl apply -f ccm-kubernetes.yaml
   ```

5. Back in the wizard, select **Done**, then **Continue**.
6. Wait for **Verify connection** to succeed, then select **Finish**.

Applying the YAML installs the multi-workload components and upgrades the running controller for you. You do not edit image tags or restart workloads by hand.

#### What the YAML Installs

The full YAML does more than update the controller image. It installs the [components listed above](#components-installed-in-your-cluster), the eBPF discovery agent and the `AutoStoppingRule` CRD along with the RBAC they need, and it configures the controller to talk to Harness. This configuration is the reason an image-tag change on its own does not work.

The controller reads its configuration from environment variables and an API-key secret:

```yaml
env:
  - name: HARNESS_API
    value: https://app.harness.io   # your Harness URL
  - name: CONNECTOR_ID
    value: <your-connector-id>       # filled in for you in the downloaded YAML
  - name: REMOTE_ACCOUNT_ID
    value: <your-account-id>         # filled in for you in the downloaded YAML
  - name: DISCOVERY_TICKER_INTERVAL
    value: '10m'                     # how often discovery runs; defaults to 10m
  - name: HARNESS_SECRET_NAME
    value: harness-api-key           # secret that holds your API key
  - name: HARNESS_SECRET_NAMESPACE
    value: harness-autostopping
  - name: HARNESS_SECRET_KEY
    value: token
```

`CONNECTOR_ID` and `REMOTE_ACCOUNT_ID` are populated for you in the YAML you download, so you do not set them by hand.

### 2. Harness Converts Your Rules

Once the multi-workload components are running, Harness migrates your existing rules automatically. There is no button to press.

- Every valid, working single-workload rule is converted to a multi-workload rule and otherwise left unchanged.
- A rule that is not in a healthy, working state is not converted.
- The move is forward-only. After a rule becomes a multi-workload rule, it does not revert to single-workload.

---

## Related Concepts

- [Kubernetes AutoStopping overview](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/k8s-coverage): Understand how discovery, the Network Map, and recommendations work.
- [Set up Kubernetes AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/k8s-coverage-setup): Install the components, discover your application, and create a rule from a recommendation.
