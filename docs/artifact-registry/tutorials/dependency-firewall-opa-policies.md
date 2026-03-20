---
title: Implement Dependency Firewall with OPA Policies
description: Learn how to secure your software supply chain using Dependency Firewall with Open Policy Agent policies and policy sets
sidebar_position: 1
keywords:
  - dependency firewall
  - open policy agent
  - opa
  - policy as code
  - policy sets
  - security policies
tags:
  - artifact-registry
  - security
  - tutorials
---

This tutorial guides you through implementing Dependency Firewall in Harness Artifact Registry using Open Policy Agent (OPA) policies. Dependency Firewall acts as a security gatekeeper for your software supply chain, automatically evaluating artifacts against custom policies before they're cached in your upstream proxy registries.

You'll learn how to create custom security policies using Rego (OPA's policy language), configure policy sets to enforce different security requirements, and monitor policy violations. By the end of this tutorial, you'll have a working Dependency Firewall implementation that protects your organization from vulnerable, non-compliant, or outdated dependencies.

## Prerequisites

Before you begin, ensure you have:

- A Harness account with the Artifact Registry module enabled
- The Dependency Firewall feature flag (`HAR_DEPENDENCY_FIREWALL`) enabled. Contact [Harness Support](mailto:support@harness.io) to enable it
- At least one [upstream proxy registry](/docs/artifact-registry/manage-registries/upstream-proxy) configured for package types such as npm or Maven
- Familiarity with policy as code concepts, your package manager ecosystem (npm, Maven, etc.), and software supply chain security principles
- Experience with Open Policy Agent (OPA) and Rego language is helpful but not required—this tutorial includes examples

## Overview

In this tutorial, you'll complete three main steps:

1. **Create Policy and Policy Set**: Define OPA policies using Rego and organize them into policy sets
2. **Enable Dependency Firewall**: Configure your upstream proxy registry to use the policy sets
3. **Monitor and Review**: Fetch packages and view policy violations in the Dependency Firewall dashboard

By following these steps, you'll establish automated security controls that evaluate every artifact against your organization's compliance requirements before allowing them into your software supply chain.

## Step 1: Create Policy and Policy Set

In this step, you'll create an OPA policy written in Rego and configure a policy set that will be used to evaluate artifacts.

### Create a Policy

For this tutorial, we'll create a license policy that blocks artifacts with non-compliant licenses from being cached in your registry. This helps maintain a secure software supply chain by ensuring only approved open-source licenses are used in your environment.

:::tip Use Pre-written Policies
Harness provides a library of pre-written OPA policies specifically designed for Dependency Firewall. You can use these policies as-is or customise them to fit your organisation's requirements. This can save time and provide a starting point for common security scenarios.
<DocImage path={require('./static/firewall-polict-lib.png')} alt="Create Policy" title="Create Policy in Harness" width="100%" />
:::

1. Create a new policy with the necessary details.

2. Add the following Rego policy code:

```rego
package upstreamFirewall

import future.keywords.in
import future.keywords.if


allowed_licenses_list := [
                            {"license": {
                                "value": "MIT",
                                "operator": "==",
                            }},
                            {"license": {
                                "value": ".*Apache.*",
                                "operator": "~",
                            }},
                            {"license": {
                                "value": ".*Eclipse.*",
                                "operator": "~",
                            }},
                        ]

#### DO NOT CHANGE THE FOLLOWING SCRIPT ####
allowed_licenses := {x | x := allowed_licenses_list[_]}

allowed_license_values := [x | x := allowed_licenses_list[_].license.value]

deny[msg] {
  item := violations[i]
  msg := item.message
}

violations[v] {
  res := input[i]
  lic := res.licenses[j]
  not is_license_allowed(lic)
  v := {
    "Blocked License": lic,
    "Category": "License",
    "Allowed Licenses": allowed_license_values,
    "message": sprintf("License '%s' is not allowed for package '%s'", [lic, res.purl]),
  }
}

license_matches(lic, allowed) if {
  allowed.license.operator == "=="
  lic == allowed.license.value
}

license_matches(lic, allowed) if {
  allowed.license.operator == "~"
  regex.match(allowed.license.value, lic)
}

is_license_allowed(lic) if {
  some allowed in allowed_licenses
  license_matches(lic, allowed)
}
```

<DocImage path={require('./static/create-policy.png')} alt="Create Policy" title="Create Policy in Harness" width="100%" />

**How this policy works:**

This policy uses flexible pattern matching to evaluate artifact licenses:

1. **Allowed Licenses with Operators**: Defines licenses using two matching strategies:
   - **Exact match (`==`)**: For licenses that must match exactly (e.g., "MIT")
   - **Regex match (`~`)**: For license families using patterns (e.g., ".*Apache.*" matches "Apache-2.0", "Apache-1.1", etc.)

2. **License Validation**: The policy checks each artifact's license against the allowed list using the appropriate operator

3. **Violation Details**: Provides information about blocked licenses and the package they belong to

**Customization examples:**
- Add exact match: `{"license": {"value": "BSD-3-Clause", "operator": "=="}}`
- Add pattern match: `{"license": {"value": ".*BSD.*", "operator": "~"}}` (matches all BSD variants)
- Block copyleft: Remove GPL patterns to restrict copyleft licenses

This flexible approach allows you to approve entire license families (like all Apache or Eclipse variants) without listing each version individually.

### Test Your Policy

Before applying the policy, you can test it with sample input to verify it works as expected.

**Test Case 1: Policy Violation (Artifact with Non-Allowed License)**

Input:
```json
[
  {
    "purl": "pkg:npm/some-gpl-package@1.0.0",
    "licenses": [
      "GPL-3.0"
    ]
  }
]
```

Expected Result: **Input failed Policy Evaluation**

The policy will deny this artifact because:
- It has a "GPL-3.0" license which doesn't match any allowed pattern
- The allowed patterns are: exact match for "MIT", regex match for ".*Apache.*", and regex match for ".*Eclipse.*"
- GPL-3.0 is a copyleft license that is not in the approved list

**Test Case 2: Policy Passes (Artifact with Allowed License)**

Input:
```json
[
  {
    "purl": "pkg:npm/lodash@4.17.21",
    "licenses": [
      "MIT"
    ]
  }
]
```

Expected Result: **Input passed Policy Evaluation**

The policy will allow this artifact because:
- It has a "MIT" license which matches the exact match rule (`==` operator)
- The license exactly matches the allowed value "MIT"

### Create a Policy Set

A policy set is a collection of one or more policies that are evaluated together against artifacts. Policy sets allow you to group related security policies and apply them to the upstream proxy entity type.

Now that you have a policy, you need to create a policy set to group and apply it.

1. Create a new policy set with the following details:
   - **Id**: `firewallset` (or your preferred identifier)
   - **Name**: `firewall-set`
   - **Description**: (optional) Add a description for your policy set
   - **Entity Type that this policy set applies to**: Select **Upstream Proxy**
   - **On what event should the policy set be evaluated**: Select **On Evaluation**

:::info Entity Type
The entity type must be set to **Upstream Proxy** for the policy set to work with Dependency Firewall. This ensures the policies are evaluated when artifacts are fetched from external sources through your upstream proxy registries.
:::

2. Click **Continue**

3. Select the policies you want to include in this policy set (e.g., "firewall - license")

<DocImage path={require('./static/select-policy.png')} alt="Select Policies for Policy Set" title="Select Policies for Policy Set" width="80%" />

4. Click **Apply** and then **Finish**

5. Toggle the policy set to **Enforced** to activate it

<DocImage path={require('./static/enforced-policy-set.png')} alt="Enforce Policy Set" title="Enforce Policy Set" width="80%" />

Once enforced, the policy set will actively evaluate artifacts against the configured policies when they're fetched through upstream proxy registries.



## Step 2: Enable Dependency Firewall on Upstream Proxy

Now that you have a policy set configured, you'll enable Dependency Firewall on your upstream proxy registry. You can enable it when creating a new upstream proxy or configure it on an existing one.

### Enable Dependency Firewall

1. Navigate to your upstream proxy registry (npm or Maven)
2. Go to the **Configuration** tab
3. Locate the **Dependency Firewall Configuration** section
4. Enable the **Enable Dependency Firewall** toggle
5. Choose an enforcement mode:

   - **Warn**: Violations are logged but not blocking. Artifacts with policy violations are still cached in your registry. This mode is useful for testing policies before enforcing them.
   
   - **Block**: Violations block the package from being cached. Artifacts that violate policies are NOT cached in your upstream proxy registry and cannot be used in builds or deployments. This is the recommended mode for production environments.

6. Save your configuration

Once enabled, the Dependency Firewall will automatically evaluate all artifacts fetched from external sources against your configured policy sets before caching them in your upstream proxy registry.

## Step 3: Fetch Packages and View Violations

Now that Dependency Firewall is enabled, you can fetch packages through your upstream proxy. The firewall will automatically evaluate each package against your configured policies and log any violations.

Use your package manager to fetch a package through your upstream proxy registry. The Dependency Firewall will evaluate the package in real-time before caching it in your registry.

### View Evaluated Packages

1. Navigate to your upstream proxy registry in Harness
2. Go to the **Dependency Firewall** tab
3. You'll see a list of evaluated packages with the following information:
   - **Package Name and Version**: The artifact that was evaluated (e.g., `requests 2.31.0`)
   - **Upstream Proxy**: The proxy registry name (e.g., `pythonproxy`)
   - **Status**: Either `Warning` or `Blocked` depending on your enforcement mode and policy violations
   - **Evaluated At**: Timestamp of when the evaluation occurred

:::info Artifact Visibility
- **Passed or Warning status**: Artifacts are cached and will be visible in the **Artifacts** tab of your registry
- **Blocked status**: Artifacts are NOT cached and will only appear in the **Dependency Firewall** tab
:::

### View Violation Details

To see detailed information about policy violations:

1. In the **Dependency Firewall** tab, click on a package with a `Warning` or `Blocked` status
2. The **Violation Details** panel will display:

<DocImage path={require('./static/violation-details.png')} alt="Violation Details Panel" title="Violation Details Panel" width="100%" />


## Related Resources

- [Dependency Firewall Overview](/docs/artifact-registry/dependency-firewall/overview)
- [Configure Policies and Policy Sets](/docs/artifact-registry/dependency-firewall/configure-policies)
- [Open Policy Agent Documentation](https://www.openpolicyagent.org/docs/latest/)
- [Rego Language Guide](https://www.openpolicyagent.org/docs/latest/policy-language/)
