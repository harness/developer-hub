---
title: Dependency Firewall
description: Learn how Dependency Firewall in Harness Artifact Registry acts as a gatekeeper to control and secure your software supply chain.
sidebar_label: Dependency Firewall
sidebar_position: 1
---

import { FAQ } from '@site/src/components/AdaptiveAIContent';

# Dependency Firewall

:::info Feature Flag
This feature is behind the feature flag `HAR_DEPENDENCY_FIREWALL`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

Dependency Firewall is a powerful security feature in Harness Artifact Registry that acts as a **gatekeeper** for your software supply chain. It works exclusively with **upstream proxy registries** to control whether artifact versions can be fetched from external sources by evaluating them against defined security policies.

:::note The Dependency Firewall tab is visible in all registries by default

Seeing the tab does not mean the feature is active. Dependency Firewall requires two setup steps before it evaluates artifacts: (1) go to [Configure Policies and Policy Sets](/docs/artifact-registry/dependency-firewall/configure-policies) to configure OPA policies, and (2) go to [Configure Registry](/docs/artifact-registry/manage-registries/configure-registry#enable-dependency-firewall) to enable Dependency Firewall on your upstream proxy.
:::

## How Dependency Firewall Works

When Dependency Firewall is enabled for an upstream proxy registry, every artifact version fetched from the external source is automatically evaluated against configured policy sets. Based on the evaluation results, the artifact version receives one of three statuses:

- **Passed**: The artifact version meets all policy requirements, is cached in the upstream proxy registry, and can be used without restrictions
- **Warning**: The artifact version has policy violations but is still cached in the upstream proxy registry and can be used. In Warning mode, all violations result in a warning status, allowing the artifact to be cached and used
- **Blocked**: The artifact version violates configured policies and is **not cached** in the upstream proxy registry. It cannot be used in deployments or any other operations. In Block mode, all violations result in the artifact being blocked

:::note Important
- **Blocked versions** are never cached in your upstream proxy registry and will not be available for download or use
- If an artifact was already present in the registry and is later scanned and found to have blocking violations, it will show a **blocked** status.
- **Warning and Passed versions** are cached in the upstream proxy registry and can be viewed in the Artifacts page
- Passed versions do not appear in the Dependency Firewall dashboard—only Warning and Blocked violations are shown
:::

## The Dependency Firewall Dashboard

The Dependency Firewall dashboard provides a centralized view of all policy violations detected when fetching artifacts from external sources through upstream proxy registries.

<DocImage path={require('./static/dashboard.png')} />

#### What You'll See

At the top of the dashboard, you'll find a summary of violations:

- **Total Violations**: Complete count of all policy violations (Warning + Blocked)
- **Blocked Violations**: Number of artifact versions that are blocked and not cached
- **Warning Violations**: Number of artifact versions with warnings that are still cached and usable

### Filtering and Searching Violations

To help you quickly find specific violations, the dashboard provides multiple filtering options. You can filter by **Registry Type** to view violations for specific registry types (Docker, Maven, NPM, Helm, etc.), filter by **Package Type**, or use the **Search** function to find specific artifact names or versions.

## Viewing Violation Details

When you need to investigate why a specific artifact version was blocked or flagged with a warning, click on the dependency version in the dashboard. A **Violation Details** sidebar opens on the right-hand side with the following information:

<DocImage path={require('./static/violation-details.png')} width="40%" />

**Basic Information**
- **Package Name**: The artifact name (e.g., "lodash")
- **Upstream Proxy**: The upstream proxy registry name (e.g., "npmjs")
- **Status**: Shows whether the version has a Warning or is Blocked

**Violated Policies**

This section displays policy violations in a hierarchical structure. Each policy set that was violated is shown with:

- **Policy Set Violated**: The name of the policy set that failed (e.g., "Firewall")
- **Policies Violated**: The count of individual policies that failed within that policy set (e.g., 2)

Within each policy set, you can expand to see the individual policy violations:
- **Policy Violated**: The specific policy name (e.g., "firewall-license")
- **Category**: The policy category badge (SECURITY, PACKAGE AGE, LICENSE, etc.)

Multiple policy sets can fail for the same artifact version, and each is displayed separately with its own list of violated policies.

**Evaluation**
- **First Detected**: When the violation was first identified
- **Last Detected**: Most recent evaluation timestamp

**Re-Evaluate Button**

At the bottom of the sidebar, click **Re-Evaluate** to re-run the evaluation against all configured policy sets and see updated results in real-time. This is useful when policies have been updated, new security information is available, or you want to verify if a previously blocked version now passes.

## Understanding Policies and Policy Sets

Dependency Firewall uses a hierarchical policy structure:

- **Policy Sets**: Collections of related security policies that are evaluated together
- **Policies**: Individual security rules within a policy set (e.g., vulnerability checks, license compliance, version restrictions)

When an artifact version is evaluated, it runs through all configured policy sets. If any policy within a policy set fails, the artifact version is marked as either **Blocked** or **Warning** depending on your firewall configuration.

Harness provides three built-in policy templates specifically for Dependency Firewall: CVSS Threshold, License Policy, and Package Age. You can use these templates as-is, customize them, or create your own policies using Rego. To learn how to configure policies and policy sets for Dependency Firewall, see [Configure Policies and Policy Sets](/docs/artifact-registry/dependency-firewall/configure-policies).

<FAQ
  question="Does Dependency Firewall require an STO or SCS license?"
  mode="docs"
  fallback="No. Dependency Firewall is included with Artifact Registry. It does not require STO or SCS licenses."
/>

