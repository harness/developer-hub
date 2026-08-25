---
title: Manage SBOM Policies
description: Configure and enforce SBOM policies in Harness SCS using OPA templates for allow list, deny list, and package age rules, apply them in the SBOM Policy Enforcement step during pipeline execution, and review policy violations and skipped dependency counts.
sidebar_position: 80
sidebar_label: Manage SBOM Policies

tags:
  - harness-scs
  - sbom-policies
  - open-source-management
  - deny-list-policies
  - opa-policies
  - supply-chain-visibility
---

Supply Chain Security (SCS) depends on the use of trusted software components throughout the development lifecycle. However, organizations often need to enforce security, compliance, and governance requirements for the software components included in their Software Bill of Materials (SBOM). Without automated policy enforcement, identifying and controlling dependencies that do not meet organizational requirements can be difficult and time-consuming.

SBOM Policies help address this challenge by allowing you to define and enforce rules that evaluate software components during SBOM policy enforcement. SCS provides out-of-the-box policy templates that you can use to enforce your organization's security and compliance requirements. You can also customize these policies to align with your organization's governance standards and software supply chain security objectives.

## What you will learn from this topic

By the end of this topic, you will be able to:

* Understand SBOM Policies and the different policy types supported in SCS.
* Configure and customize SBOM policies using out-of-the-box policy templates or custom policy definitions.
* Use SBOM policies in the SBOM Policy Enforcement step to enforce security, compliance, and governance requirements during pipeline execution.
* Review policy violations and skipped dependency counts after policy evaluation.
* Use the provided SBOM policy examples as a starting point for creating and customizing your own policies.

## Before you begin

Make a note of the following before you proceed with managing SBOM policies in SCS:

* Make sure you have a clear understanding of SBOM generation through pipeline execution for artifacts and repositories. Go to [Generate SBOM for Artifacts](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-artifacts) and [Generate SBOM for Repositories](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-repositories) to generate SBOMs.
* Make sure you have a clear understanding of SBOM policy enforcement. Go to [Enforce SBOM Policies](/docs/software-supply-chain-assurance/open-source-management/enforce-sbom-policies) to enforce policies in a pipeline.
* Make sure you have a clear understanding of creating SBOM policies and writing policy definitions. Go to [Create SBOM Policies](/docs/software-supply-chain-assurance/open-source-management/create-sbom-policies) and [Write Policy Definitions](/docs/software-supply-chain-assurance/how-to-guides/define-sbom-policies), to create policies and write policy definitions respectively.

## Understand SBOM policies

SBOM Policies enable you to define rules that evaluate the software components in a generated Software Bill of Materials (SBOM) against your organization's security, compliance, and governance requirements. Each policy consists of one or more rules that evaluate component attributes, such as licenses, suppliers, package URLs (PURLs), versions, package age, and dependency types. During SBOM policy enforcement, SCS evaluates every dependency in the generated SBOM against the configured policy rules and reports dependencies that do not satisfy the configured requirements as policy violations.

SCS provides out-of-the-box policy templates that you can use to quickly implement common software supply chain security requirements. You can also create custom policies or modify existing policy definitions to meet your organization's governance and compliance requirements. Policies can then be grouped into policy sets and enforced during pipeline execution through the **SBOM Policy Enforcement** step.

### Types of SBOM policies

SCS supports the following policy types:

* **Allow list policies**: Allow list policies define the components that are approved for use in your software supply chain based on configured attributes. During policy evaluation, SCS validates each component against the configured allow list rules and reports components that do not satisfy the configured criteria as policy violations. You can define allow list rules using one or more component attributes, such as the component `name`, `supplier`, `license`, `version`, or `package URL (PURL)`. Use allow list policies when you want to ensure that only trusted components that meet your organization's security and compliance requirements are included in your repositories or artifacts.
* **Deny list policies**: Deny list policies define the components that are prohibited based on configured attributes. During policy evaluation, SCS reports components that satisfy the configured deny list criteria as policy violations. If an artifact or repository includes a component that matches the configured deny list criteria, policy evaluation fails according to the configured enforcement action. You can define deny list rules using one or more component attributes, such as the component `name`, `supplier`, `license`, `version`, or `package URL (PURL)`. Use deny list policies to prevent the use of dependencies that are known to be insecure, non-compliant, or otherwise unsuitable for your software supply chain.
* **Allow and deny list policies**: Allow and deny list policies combine allow list and deny list rules within a single policy to define both approved and prohibited dependency criteria. During policy evaluation, SCS enforces both sets of rules to validate dependencies against your organization's security and compliance requirements. Use this policy type when you need to allow trusted dependencies while explicitly blocking specific dependencies that do not meet your organization's governance requirements.

### Understand package age policy enforcement

Package Age Policy Enforcement helps organizations reduce software supply chain risk by preventing the use of newly published open-source packages. Newly published packages may not have undergone sufficient community review and can occasionally contain vulnerabilities or malicious code that are discovered only after release. By enforcing a configurable cooldown period, you can delay the adoption of new package versions until they have been available long enough to establish trust.

SCS provides Package Age Policy Enforcement as an out-of-the-box OPA policy template. When used with the **SBOM Policy Enforcement** step, the policy evaluates the age of packages in the generated SBOM against a configurable cooldown period. The cooldown period defines the minimum number of days that must elapse after a package is published before it can be used. The default cooldown period is **2 days**, and you can configure a value between **1 and 14 days**. Packages that do not meet the configured requirement generate policy violations and are handled according to the configured enforcement action. The policy can be customized to align with your organization's security and compliance requirements.

SBOM policies provide a flexible framework for enforcing security, compliance, and governance requirements across your software supply chain. The following table summarizes why you should use SBOM policies, when they are most effective, and how you can leverage them in your pipelines.

| **Why use SBOM Policies?** | **When should you use SBOM Policies?** | **How can you leverage SBOM Policies?** |
| --- | --- | --- |
| 1. Enforce consistent security, compliance, and governance requirements for the software components in your SBOM.<br /> 2. Automate policy evaluation during CI/CD workflows to reduce manual dependency reviews.<br /> 3. Standardize dependency governance across repositories and artifacts. | 1. When you need to validate software components against your organization's security or compliance standards before they are used in repositories or artifacts.<br /> 2. When you want to automatically identify or block dependencies that do not satisfy your organization's policy requirements.<br /> 3. When multiple teams or projects need to enforce the same dependency validation rules. | 1. Create SBOM policies using the available policy templates or customize policy definitions to enforce your organization's dependency governance requirements.<br /> 2. Add policies to an [SBOM Policy Set](/docs/software-supply-chain-assurance/open-source-management/create-sbom-policies#create-an-sbom-policy-set) and use them in the **SBOM Policy Enforcement** step to evaluate dependencies during pipeline execution.<br /> 3. Reuse policy sets across pipelines to consistently enforce software supply chain security requirements throughout your organization. |

## Configure SBOM policies

SCS provides out-of-the-box policy templates that you can use to define security, compliance, and governance requirements for the software components in your SBOM. You can customize these templates by modifying their policy definitions to align with your organization's requirements. After configuring a policy, you can add it to a policy set and use it during SBOM policy enforcement.

To configure an SBOM policy, complete the following steps:

1. Navigate to **Project Settings** > **Security and Governance** > **Policies** from the sidebar navigation of your SCS account.<br /> The **Overview** page opens by default and displays the **Policy Health** dashboard.

2. Select **Policies** from the options in the top right corner to open the **Policies** page.

3. Create the **SBOM package age deny list** policy. Go to [Create SBOM Policies](/docs/software-supply-chain-assurance/open-source-management/create-sbom-policies#create-an-sbom-policy) to follow the step-by-step instructions.

4. Search for and use the preferred policy template from the available sample policies as instructed in the previous step.

5. Locate the **allow list** or **deny list** rules that you want to configure in the policy definition. Go to [Write Policy Definitions](/docs/software-supply-chain-assurance/how-to-guides/define-sbom-policies) to understand policy definition syntax. <br /> For the **SBOM Package Age – Deny** policy, locate the following configuration:

    ```yaml
    cooldown_days := 2
    ```

6. Modify the policy definition based on your organization's security and compliance requirements.<br /> For the **SBOM Package Age – Deny** policy, replace the default `cooldown_days` value with the number of days that you want to enforce.

7. Save the policy as instructed in **Step 3**.

8. Add the policy to a policy set to use it in the **SBOM Policy Enforcement** step. Go to [Creating an SBOM Policy Set](/docs/software-supply-chain-assurance/open-source-management/create-sbom-policies#create-an-sbom-policy-set) to create a policy set and add policies to it.

## Use the policy in SBOM Policy Enforcement step

After creating and configuring an SBOM policy and adding it to a policy set, you can use the policy in the **SBOM Policy Enforcement** step. During pipeline execution, the step evaluates the generated SBOM against the configured policy and applies the configured enforcement action when policy violations are detected. If one or more dependencies do not satisfy the configured policy requirements, the step fails according to the configured enforcement action, which can cause the pipeline to fail. This enables you to enforce your organization's security, compliance, and governance requirements as part of your software supply chain security workflow. Go to [Enforce SBOM Policies](/docs/software-supply-chain-assurance/open-source-management/enforce-sbom-policies) to configure the **SBOM Policy Enforcement** step and use policy sets.

:::note

If SCS cannot evaluate a dependency against a configured policy because the required metadata is unavailable, the dependency is skipped during policy evaluation. Skipped dependencies are not reported as policy violations, and the skipped dependency count is available in the SBOM Policy Enforcement step outputs.

:::

## View policy violations

After the **SBOM Policy Enforcement** step runs, SCS identifies packages that do not satisfy the configured policy requirements as policy violations. Reviewing these violations helps you identify affected packages and take appropriate remediation actions.

To view the policy violations, complete the following steps:

1. Select the **Supply Chain** tab within the pipeline execution page to view the supply chain security results for the pipeline execution.<br /> The **Policy Violations** card displays the total number of policy violations, categorized as **Allow List** and **Deny List** violations.

    <DocImage path={require('./static/view-policy-violations-summary.png')} width="100%" height="100%" title="Click to view full size image" />

2. The Target table displays the configured repository or artifact along with a summary of its supply chain security information, including the total number of Allow List and Deny List violations and a link to view the violation details.

3. In the **POLICY VIOLATIONS** column, click **View Policy Violations** to open the **\<repository_name\>** side panel.<br /> The **Policy Violations** tab opens by default.

4. Each violating dependency is listed as a separate entry and includes the affected component, its ecosystem, associated license, and the policy violation message.

    <DocImage path={require('./static/view-dependency-policy-violations.png')} width="100%" height="100%" title="Click to view full size image" />

### View skipped dependency count

After the **SBOM Policy Enforcement** step runs, SCS reports the number of dependencies that were skipped during policy evaluation. Dependencies are skipped when SCS cannot evaluate them because the required metadata is unavailable. Reviewing the skipped dependency count helps you identify dependencies that were not evaluated against the configured policy.

To view the skipped dependency count, complete the following steps:

1. Within the **Pipeline** tab of the pipeline execution page, open the execution details for the **SBOM Policy Enforcement** step.<br /> The **Logs** tab opens by default.

2. Select the **Output** tab.

3. Review the **skippedComponentCount** output to determine the total number of dependencies that were skipped during Package Age policy evaluation.

    <DocImage path={require('./static/skipped-dependency-count.png')} width="100%" height="100%" title="Click to view full size image" />

## Example SBOM policies

<details>
  <summary>Example SBOM Allow List Policy</summary>
<div>

The following example shows an **SBOM Allow List** policy. The policy allows only the dependencies that satisfy the configured allow list criteria and reports all other dependencies as policy violations. You can use this policy as a starting point and customize the allow list rules to meet your organization's security and compliance requirements.

```go
package sbom

import future.keywords.if
import future.keywords.in

#### DEFINE YOUR DENY RULES BELOW ####
deny_list := fill_default_deny_rules([])

#### DEFINE YOUR ALLOW RULES BELOW ####
allow_list := {
	"licenses": [
		{"license": {
			"value": "MIT",
			"operator": "==",
		}},
		{"license": {
			"value": ".*Apache.*",
			"operator": "~",
		}},
		{"license": {
			"value": ".*eclipse.*",
			"operator": "~",
		}},
	],
	"purls": [
		{"purl": {
			"value": "golang.*",
			"operator": "~",
		}},
		{"purl": {
			"value": "aaa",
			"operator": "==",
		}},
	],
	"suppliers": [{"supplier": {
		"value": ".*Red Hat.*",
		"operator": "~",
	}}],
}

#### DO NOT CHANGE THE FOLLOWING SCRIPT ####

does_violate_license(pkg, rules) if {
	some package_license in pkg.packageLicense
	not does_match_license(package_license, rules)
}

does_match_license(license, rules) if {
	some rule in rules
	str_compare(license, rule.license.operator, rule.license.value)
}

does_violate_purl(pkg, rules) if {
	not does_match_purl(pkg, rules)
}

does_match_purl(pkg, rules) if {
	some rule in rules
	str_compare(pkg.purl, rule.purl.operator, rule.purl.value)
}

does_violate_purl(pkg, _) if {
	not pkg.purl
}

does_violate_supplier(pkg, rules) if {
	not does_match_supplier(pkg, rules)
}

does_violate_supplier(pkg, _) if {
	not pkg.packageOriginatorName
}

does_match_supplier(pkg, rules) if {
	some rule in rules
	str_compare(pkg.packageOriginatorName, rule.supplier.operator, rule.supplier.value)
}

allow_rules_licenses_violations(allow_rules_licenses) := violating_packages if {
	violating_packages := {result |
		some pkg in input
		does_violate_license(pkg, allow_rules_licenses)
		result = pkg.uuid
	}
	count(violating_packages) > 0
}

allow_rules_purls_violations(allow_rules_purls) := violating_packages if {
	violating_packages := {result |
		some pkg in input
		does_violate_purl(pkg, allow_rules_purls)
		result = pkg.uuid
	}
	count(violating_packages) > 0
}

allow_rules_suppliers_violations(allow_rules_suppliers) := violating_packages if {
	violating_packages := {result |
		some pkg in input
		does_violate_supplier(pkg, allow_rules_suppliers)
		result = pkg.uuid
	}
	count(violating_packages) > 0
}

allow_list_violations[violations] {
	allow_rules_licenses := object.get(allow_list, "licenses", [])
	count(allow_rules_licenses) > 0
	violations := [x |
		x := {
			"type": "allow",
			"rule": allow_rules_licenses,
			"violations": allow_rules_licenses_violations(allow_rules_licenses),
		}
	]
	count(violations) > 0
}

allow_list_violations[violations] {
	allow_rules_purls := object.get(allow_list, "purls", [])
	count(allow_rules_purls) > 0
	violations := [x |
		x := {
			"type": "allow",
			"rule": allow_rules_purls,
			"violations": allow_rules_purls_violations(allow_rules_purls),
		}
	]
	count(violations) > 0
}

allow_list_violations[violations] {
	allow_rules_suppliers := object.get(allow_list, "suppliers", [])
	count(allow_rules_suppliers) > 0
	violations := [x |
		x := {
			"type": "allow",
			"rule": allow_rules_suppliers,
			"violations": allow_rules_suppliers_violations(allow_rules_suppliers),
		}
	]
	count(violations) > 0
}

deny_list_violations[violations] {
	some deny_rule in deny_list
	violations := [x |
		x := {
			"type": "deny",
			"rule": deny_rule,
			"violations": [violating_id |
				some pkg in input
				violating_id := pkg.uuid
				deny_compare(pkg, deny_rule)
			],
		}
	]
	count(violations) > 0
}

deny_compare(pkg, rule) if {
	license_match := [x |
		x := true
		some license, package_license in pkg.packageLicense
		str_compare(package_license, rule.license.operator, rule.license.value)
	]
	count(license_match) != 0

	is_name_denied(pkg, rule)
	is_purl_denied(pkg, rule)
	is_supplier_denied(pkg, rule)
	pkg_version := version_to_semver(pkg.packageVersion)
	rule_version := version_to_semver(rule.version.value)
	semver_compare(pkg_version, rule.version.operator, rule_version)
}

version_to_semver(version) = output if {
    parts := split(version, "-")
    numeric := parts[0]
    numParts := split(numeric, ".")
    count(numParts) == 1
    normalized := concat(".", [numeric, "0", "0"])
    remainder := array.slice(parts, 1, count(parts))
    output := with_remainder(normalized, remainder)
}

version_to_semver(version) = output if {
    parts := split(version, "-")
    numeric := parts[0]
    numParts := split(numeric, ".")
    count(numParts) == 2
    normalized := concat(".", [numeric, "0"])
    remainder := array.slice(parts, 1, count(parts))
    output := with_remainder(normalized, remainder)
}

version_to_semver(version) = output if {
    parts := split(version, "-")
    numeric := parts[0]
    numParts := split(numeric, ".")
    count(numParts) >= 3
    remainder := array.slice(parts, 1, count(parts))
    output := with_remainder(numeric, remainder)
}

version_to_semver(version) = output if {
  version == null
  output := null
}

# Helper function to handle remainder
with_remainder(base, remainder) = concat("-", array.concat([base], remainder)) if count(remainder) > 0
with_remainder(base, remainder) = base if count(remainder) == 0

is_supplier_denied(pkg, rule) if {
	not pkg.packageOriginatorName
	rule.supplier.value == null
}

is_name_denied(pkg, rule) if {
	not pkg.packageName
	rule.name.value == null
}

is_purl_denied(pkg, rule) if {
	not pkg.purl
	rule.purl.value == null
}

is_supplier_denied(pkg, rule) if {
	str_compare(pkg.packageOriginatorName, rule.supplier.operator, rule.supplier.value)
}

is_name_denied(pkg, rule) if {
	str_compare(pkg.packageName, rule.name.operator, rule.name.value)
}

is_purl_denied(pkg, rule) if {
	str_compare(pkg.purl, rule.purl.operator, rule.purl.value)
}

str_compare(a, "==", b) := a == b

str_compare(a, "!", b) := a != b

str_compare(a, "~", b) := regex.match(b, a)

str_compare(a, null, b) := a == b if b != null

str_compare(_, null, null) := true

semver_compare(a, "<=", b) := semver.compare(a, b) <= 0

semver_compare(a, "<", b) := semver.compare(a, b) < 0

semver_compare(a, "==", b) := semver.compare(a, b) == 0

semver_compare(a, ">", b) := semver.compare(a, b) > 0

semver_compare(a, ">=", b) := semver.compare(a, b) >= 0

semver_compare(a, "!", b) := semver.compare(a, b) != 0

semver_compare(a, "><", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) > 0
	semver.compare(a, secondValue) < 0
}

semver_compare(a, ">=<", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) >= 0
	semver.compare(a, secondValue) < 0
}

semver_compare(a, ">=<=", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) >= 0
	semver.compare(a, secondValue) <= 0
}

semver_compare(a, "><=", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) > 0
	semver.compare(a, secondValue) <= 0
}

semver_compare(a, "~", b) := regex.match(b, a)

semver_compare(a, null, b) := semver.compare(b, a) == 0 if b != null

semver_compare(_, null, null) := true

fill_default_deny_rules(obj) := list if {
	defaults := {
		"name": {"value": null, "operator": null},
		"license": {"value": null, "operator": null},
		"version": {"value": null, "operator": null},
		"supplier": {"value": null, "operator": null},
		"purl": {"value": null, "operator": null},
	}
	list := [x | x := object.union(defaults, obj[_])]
}
```

</div>

</details>

<details>
  <summary>Example SBOM Deny List Policy</summary>
<div>

The following example shows an **SBOM Deny List** policy. The policy reports dependencies that satisfy the configured deny list criteria as policy violations. You can use this policy as a starting point and customize the deny list rules to meet your organization's security and compliance requirements.

```go
package sbom

import future.keywords.if
import future.keywords.in

#### DEFINE YOUR DENY RULES BELOW ####
deny_list := fill_default_deny_rules([
	{
		"name": {"value": "curl", "operator": "=="},
		"version": {"value": "3.0.0", "operator": "<="},
	},
	{
		"name": {"value": ".*log4j.*", "operator": "~"},
		"version": {"value": "3.0.0", "operator": "<"},
	},
	{
		"name": {"value": "busybot", "operator": "=="},
		"version": {"value": "3.0.0,5.0.0", "operator": "><"},
	},
	{
		"name": {"value": "curl", "operator": "=="},
		"version": {"value": "3.0.0", "operator": ">="},
	},
	{
		"name": {"value": "curl", "operator": "=="},
		"version": {"value": "3.0.0", "operator": ">"},
	},
	{
		"name": {"value": "curl", "operator": "=="},
		"version": {"value": "3.0.0", "operator": "!"},
	},
	{
		"name": {"value": ".*log4j.*", "operator": "~"},
		"version": {"value": "3.0.0", "operator": "=="},
	},
	{
		"name": {"value": "acl", "operator": "=="},
		"license": {"value": "MPL-2.0", "operator": "=="},
		"version": {
			"value": "1.0.0,3.0.0",
			"operator": ">=<=",
		},
		"supplier": {"value": "Organization: Red Hat, Inc.", "operator": "=="},
		"purl": {"value": "BSD-3-Clause", "operator": "=="},
	},
	{"name": {"value": "c.*", "operator": "~"}},
	{"license": {"value": "BSD-3-Clause", "operator": "=="}},
	{"purl": {"value": "s", "operator": "!"}},
	{"version": {
		"value": "1.3.0,2.12.0",
		"operator": ">=<",
	}},
	{"supplier": {"value": "Organization: Red Hat, Inc.", "operator": "=="}},
])

#### DEFINE YOUR ALLOW RULES BELOW ####
allow_list := {
	"licenses": [],
	"purls": [],
	"suppliers": [],
}

#### DO NOT CHANGE THE FOLLOWING SCRIPT ####

does_violate_license(pkg, rules) if {
	some package_license in pkg.packageLicense
	not does_match_license(package_license, rules)
}

does_match_license(license, rules) if {
	some rule in rules
	str_compare(license, rule.license.operator, rule.license.value)
}

does_violate_purl(pkg, rules) if {
	not does_match_purl(pkg, rules)
}

does_match_purl(pkg, rules) if {
	some rule in rules
	str_compare(pkg.purl, rule.purl.operator, rule.purl.value)
}

does_violate_purl(pkg, _) if {
	not pkg.purl
}

does_violate_supplier(pkg, rules) if {
	not does_match_supplier(pkg, rules)
}

does_violate_supplier(pkg, _) if {
	not pkg.packageOriginatorName
}

does_match_supplier(pkg, rules) if {
	some rule in rules
	str_compare(pkg.packageOriginatorName, rule.supplier.operator, rule.supplier.value)
}

allow_rules_licenses_violations(allow_rules_licenses) := violating_packages if {
	violating_packages := {result |
		some pkg in input
		does_violate_license(pkg, allow_rules_licenses)
		result = pkg.uuid
	}
	count(violating_packages) > 0
}

allow_rules_purls_violations(allow_rules_purls) := violating_packages if {
	violating_packages := {result |
		some pkg in input
		does_violate_purl(pkg, allow_rules_purls)
		result = pkg.uuid
	}
	count(violating_packages) > 0
}

allow_rules_suppliers_violations(allow_rules_suppliers) := violating_packages if {
	violating_packages := {result |
		some pkg in input
		does_violate_supplier(pkg, allow_rules_suppliers)
		result = pkg.uuid
	}
	count(violating_packages) > 0
}

allow_list_violations[violations] {
	allow_rules_licenses := object.get(allow_list, "licenses", [])
	count(allow_rules_licenses) > 0
	violations := [x |
		x := {
			"type": "allow",
			"rule": allow_rules_licenses,
			"violations": allow_rules_licenses_violations(allow_rules_licenses),
		}
	]
	count(violations) > 0
}

allow_list_violations[violations] {
	allow_rules_purls := object.get(allow_list, "purls", [])
	count(allow_rules_purls) > 0
	violations := [x |
		x := {
			"type": "allow",
			"rule": allow_rules_purls,
			"violations": allow_rules_purls_violations(allow_rules_purls),
		}
	]
	count(violations) > 0
}

allow_list_violations[violations] {
	allow_rules_suppliers := object.get(allow_list, "suppliers", [])
	count(allow_rules_suppliers) > 0
	violations := [x |
		x := {
			"type": "allow",
			"rule": allow_rules_suppliers,
			"violations": allow_rules_suppliers_violations(allow_rules_suppliers),
		}
	]
	count(violations) > 0
}

deny_list_violations[violations] {
	some deny_rule in deny_list
	violations := [x |
		x := {
			"type": "deny",
			"rule": deny_rule,
			"violations": [violating_id |
				some pkg in input
				violating_id := pkg.uuid
				deny_compare(pkg, deny_rule)
			],
		}
	]
	count(violations) > 0
}

deny_compare(pkg, rule) if {
	license_match := [x |
		x := true
		some license, package_license in pkg.packageLicense
		str_compare(package_license, rule.license.operator, rule.license.value)
	]
	count(license_match) != 0

	is_name_denied(pkg, rule)
	is_purl_denied(pkg, rule)
	is_supplier_denied(pkg, rule)
	pkg_version := version_to_semver(pkg.packageVersion)
	rule_version := version_to_semver(rule.version.value)
	semver_compare(pkg_version, rule.version.operator, rule_version)
}

version_to_semver(version) = output if {
    parts := split(version, "-")
    numeric := parts[0]
    numParts := split(numeric, ".")
    count(numParts) == 1
    normalized := concat(".", [numeric, "0", "0"])
    remainder := array.slice(parts, 1, count(parts))
    output := with_remainder(normalized, remainder)
}

version_to_semver(version) = output if {
    parts := split(version, "-")
    numeric := parts[0]
    numParts := split(numeric, ".")
    count(numParts) == 2
    normalized := concat(".", [numeric, "0"])
    remainder := array.slice(parts, 1, count(parts))
    output := with_remainder(normalized, remainder)
}

version_to_semver(version) = output if {
    parts := split(version, "-")
    numeric := parts[0]
    numParts := split(numeric, ".")
    count(numParts) >= 3
    remainder := array.slice(parts, 1, count(parts))
    output := with_remainder(numeric, remainder)
}

version_to_semver(version) = output if {
  version == null
  output := null
}

# Helper function to handle remainder
with_remainder(base, remainder) = concat("-", array.concat([base], remainder)) if count(remainder) > 0
with_remainder(base, remainder) = base if count(remainder) == 0

is_supplier_denied(pkg, rule) if {
	not pkg.packageOriginatorName
	rule.supplier.value == null
}

is_name_denied(pkg, rule) if {
	not pkg.packageName
	rule.name.value == null
}

is_purl_denied(pkg, rule) if {
	not pkg.purl
	rule.purl.value == null
}

is_supplier_denied(pkg, rule) if {
	str_compare(pkg.packageOriginatorName, rule.supplier.operator, rule.supplier.value)
}

is_name_denied(pkg, rule) if {
	str_compare(pkg.packageName, rule.name.operator, rule.name.value)
}

is_purl_denied(pkg, rule) if {
	str_compare(pkg.purl, rule.purl.operator, rule.purl.value)
}

str_compare(a, "==", b) := a == b

str_compare(a, "!", b) := a != b

str_compare(a, "~", b) := regex.match(b, a)

str_compare(a, null, b) := a == b if b != null

str_compare(_, null, null) := true

semver_compare(a, "<=", b) := semver.compare(a, b) <= 0

semver_compare(a, "<", b) := semver.compare(a, b) < 0

semver_compare(a, "==", b) := semver.compare(a, b) == 0

semver_compare(a, ">", b) := semver.compare(a, b) > 0

semver_compare(a, ">=", b) := semver.compare(a, b) >= 0

semver_compare(a, "!", b) := semver.compare(a, b) != 0

semver_compare(a, "><", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) > 0
	semver.compare(a, secondValue) < 0
}

semver_compare(a, ">=<", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) >= 0
	semver.compare(a, secondValue) < 0
}

semver_compare(a, ">=<=", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) >= 0
	semver.compare(a, secondValue) <= 0
}

semver_compare(a, "><=", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) > 0
	semver.compare(a, secondValue) <= 0
}

semver_compare(a, "~", b) := regex.match(b, a)

semver_compare(a, null, b) := semver.compare(b, a) == 0 if b != null

semver_compare(_, null, null) := true

fill_default_deny_rules(obj) := list if {
	defaults := {
		"name": {"value": null, "operator": null},
		"license": {"value": null, "operator": null},
		"version": {"value": null, "operator": null},
		"supplier": {"value": null, "operator": null},
		"purl": {"value": null, "operator": null},
	}
	list := [x | x := object.union(defaults, obj[_])]
}
```

</div>

</details>

<details>
  <summary>Example SBOM Allow and Deny List Policy</summary>
<div>

The following example shows an **SBOM Allow and Deny List** policy. The policy combines allow list and deny list rules to enforce both approved and prohibited dependency criteria during policy evaluation. You can use this policy as a starting point and customize the allow list and deny list rules to meet your organization's security and compliance requirements.

```go
package sbom

import future.keywords.if
import future.keywords.in

#### DEFINE YOUR DENY RULES BELOW ####
deny_list := fill_default_deny_rules([
	{
		"name": {"value": "curl", "operator": "=="},
		"version": {"value": "3.0.0", "operator": "<="},
	},
	{
		"name": {"value": ".*log4j.*", "operator": "~"},
		"version": {"value": "3.0.0", "operator": "<"},
	},
	{
		"name": {"value": "busybot", "operator": "=="},
		"version": {"value": "3.0.0,5.0.0", "operator": "><"},
	},
	{
		"name": {"value": "curl", "operator": "=="},
		"version": {"value": "3.0.0", "operator": ">="},
	},
	{
		"name": {"value": "curl", "operator": "=="},
		"version": {"value": "3.0.0", "operator": ">"},
	},
	{
		"name": {"value": "curl", "operator": "=="},
		"version": {"value": "3.0.0", "operator": "!"},
	},
	{
		"name": {"value": ".*log4j.*", "operator": "~"},
		"version": {"value": "3.0.0", "operator": "=="},
	},
	{
		"name": {"value": "acl", "operator": "=="},
		"license": {"value": "MPL-2.0", "operator": "=="},
		"version": {
			"value": "1.0.0,3.0.0",
			"operator": ">=<=",
		},
		"supplier": {"value": "Organization: Red Hat, Inc.", "operator": "=="},
		"purl": {"value": "BSD-3-Clause", "operator": "=="},
	},
	{"name": {"value": "c.*", "operator": "~"}},
	{"license": {"value": "BSD-3-Clause", "operator": "=="}},
	{"purl": {"value": "s", "operator": "!"}},
	{"version": {
		"value": "1.3.0,2.12.0",
		"operator": ">=<",
	}},
	{"supplier": {"value": "Organization: Red Hat, Inc.", "operator": "=="}},
])

#### DEFINE YOUR ALLOW RULES BELOW ####
allow_list := {
	"licenses": [
		{"license": {
			"value": "MIT",
			"operator": "==",
		}},
		{"license": {
			"value": ".*Apache.*",
			"operator": "~",
		}},
		{"license": {
			"value": ".*eclipse.*",
			"operator": "~",
		}},
	],
	"purls": [
		{"purl": {
			"value": "golang.*",
			"operator": "~",
		}},
		{"purl": {
			"value": "aaa",
			"operator": "==",
		}},
	],
	"suppliers": [{"supplier": {
		"value": ".*Red Hat.*",
		"operator": "~",
	}}],
}

#### DO NOT CHANGE THE FOLLOWING SCRIPT ####

does_violate_license(pkg, rules) if {
	some package_license in pkg.packageLicense
	not does_match_license(package_license, rules)
}

does_match_license(license, rules) if {
	some rule in rules
	str_compare(license, rule.license.operator, rule.license.value)
}

does_violate_purl(pkg, rules) if {
	not does_match_purl(pkg, rules)
}

does_match_purl(pkg, rules) if {
	some rule in rules
	str_compare(pkg.purl, rule.purl.operator, rule.purl.value)
}

does_violate_purl(pkg, _) if {
	not pkg.purl
}

does_violate_supplier(pkg, rules) if {
	not does_match_supplier(pkg, rules)
}

does_violate_supplier(pkg, _) if {
	not pkg.packageOriginatorName
}

does_match_supplier(pkg, rules) if {
	some rule in rules
	str_compare(pkg.packageOriginatorName, rule.supplier.operator, rule.supplier.value)
}

allow_rules_licenses_violations(allow_rules_licenses) := violating_packages if {
	violating_packages := {result |
		some pkg in input
		does_violate_license(pkg, allow_rules_licenses)
		result = pkg.uuid
	}
	count(violating_packages) > 0
}

allow_rules_purls_violations(allow_rules_purls) := violating_packages if {
	violating_packages := {result |
		some pkg in input
		does_violate_purl(pkg, allow_rules_purls)
		result = pkg.uuid
	}
	count(violating_packages) > 0
}

allow_rules_suppliers_violations(allow_rules_suppliers) := violating_packages if {
	violating_packages := {result |
		some pkg in input
		does_violate_supplier(pkg, allow_rules_suppliers)
		result = pkg.uuid
	}
	count(violating_packages) > 0
}

allow_list_violations[violations] {
	allow_rules_licenses := object.get(allow_list, "licenses", [])
	count(allow_rules_licenses) > 0
	violations := [x |
		x := {
			"type": "allow",
			"rule": allow_rules_licenses,
			"violations": allow_rules_licenses_violations(allow_rules_licenses),
		}
	]
	count(violations) > 0
}

allow_list_violations[violations] {
	allow_rules_purls := object.get(allow_list, "purls", [])
	count(allow_rules_purls) > 0
	violations := [x |
		x := {
			"type": "allow",
			"rule": allow_rules_purls,
			"violations": allow_rules_purls_violations(allow_rules_purls),
		}
	]
	count(violations) > 0
}

allow_list_violations[violations] {
	allow_rules_suppliers := object.get(allow_list, "suppliers", [])
	count(allow_rules_suppliers) > 0
	violations := [x |
		x := {
			"type": "allow",
			"rule": allow_rules_suppliers,
			"violations": allow_rules_suppliers_violations(allow_rules_suppliers),
		}
	]
	count(violations) > 0
}

deny_list_violations[violations] {
	some deny_rule in deny_list
	violations := [x |
		x := {
			"type": "deny",
			"rule": deny_rule,
			"violations": [violating_id |
				some pkg in input
				violating_id := pkg.uuid
				deny_compare(pkg, deny_rule)
			],
		}
	]
	count(violations) > 0
}

deny_compare(pkg, rule) if {
	license_match := [x |
		x := true
		some license, package_license in pkg.packageLicense
		str_compare(package_license, rule.license.operator, rule.license.value)
	]
	count(license_match) != 0

	is_name_denied(pkg, rule)
	is_purl_denied(pkg, rule)
	is_supplier_denied(pkg, rule)
	pkg_version := version_to_semver(pkg.packageVersion)
	rule_version := version_to_semver(rule.version.value)
	semver_compare(pkg_version, rule.version.operator, rule_version)
}

version_to_semver(version) = output if {
    parts := split(version, "-")
    numeric := parts[0]
    numParts := split(numeric, ".")
    count(numParts) == 1
    normalized := concat(".", [numeric, "0", "0"])
    remainder := array.slice(parts, 1, count(parts))
    output := with_remainder(normalized, remainder)
}

version_to_semver(version) = output if {
    parts := split(version, "-")
    numeric := parts[0]
    numParts := split(numeric, ".")
    count(numParts) == 2
    normalized := concat(".", [numeric, "0"])
    remainder := array.slice(parts, 1, count(parts))
    output := with_remainder(normalized, remainder)
}

version_to_semver(version) = output if {
    parts := split(version, "-")
    numeric := parts[0]
    numParts := split(numeric, ".")
    count(numParts) >= 3
    remainder := array.slice(parts, 1, count(parts))
    output := with_remainder(numeric, remainder)
}

version_to_semver(version) = output if {
  version == null
  output := null
}

# Helper function to handle remainder
with_remainder(base, remainder) = concat("-", array.concat([base], remainder)) if count(remainder) > 0
with_remainder(base, remainder) = base if count(remainder) == 0

is_supplier_denied(pkg, rule) if {
	not pkg.packageOriginatorName
	rule.supplier.value == null
}

is_name_denied(pkg, rule) if {
	not pkg.packageName
	rule.name.value == null
}

is_purl_denied(pkg, rule) if {
	not pkg.purl
	rule.purl.value == null
}

is_supplier_denied(pkg, rule) if {
	str_compare(pkg.packageOriginatorName, rule.supplier.operator, rule.supplier.value)
}

is_name_denied(pkg, rule) if {
	str_compare(pkg.packageName, rule.name.operator, rule.name.value)
}

is_purl_denied(pkg, rule) if {
	str_compare(pkg.purl, rule.purl.operator, rule.purl.value)
}

str_compare(a, "==", b) := a == b

str_compare(a, "!", b) := a != b

str_compare(a, "~", b) := regex.match(b, a)

str_compare(a, null, b) := a == b if b != null

str_compare(_, null, null) := true

semver_compare(a, "<=", b) := semver.compare(a, b) <= 0

semver_compare(a, "<", b) := semver.compare(a, b) < 0

semver_compare(a, "==", b) := semver.compare(a, b) == 0

semver_compare(a, ">", b) := semver.compare(a, b) > 0

semver_compare(a, ">=", b) := semver.compare(a, b) >= 0

semver_compare(a, "!", b) := semver.compare(a, b) != 0

semver_compare(a, "><", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) > 0
	semver.compare(a, secondValue) < 0
}

semver_compare(a, ">=<", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) >= 0
	semver.compare(a, secondValue) < 0
}

semver_compare(a, ">=<=", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) >= 0
	semver.compare(a, secondValue) <= 0
}

semver_compare(a, "><=", b) if {
	ys := split(b, ",")
	firstValue := ys[0]
	secondValue := ys[1]
	semver.compare(a, firstValue) > 0
	semver.compare(a, secondValue) <= 0
}

semver_compare(a, "~", b) := regex.match(b, a)

semver_compare(a, null, b) := semver.compare(b, a) == 0 if b != null

semver_compare(_, null, null) := true

fill_default_deny_rules(obj) := list if {
	defaults := {
		"name": {"value": null, "operator": null},
		"license": {"value": null, "operator": null},
		"version": {"value": null, "operator": null},
		"supplier": {"value": null, "operator": null},
		"purl": {"value": null, "operator": null},
	}
	list := [x | x := object.union(defaults, obj[_])]
}
```

</div>

</details>

<details>
  <summary>Example SBOM package age enforcement policy with the default cooldown days</summary>
<div>

The following example shows the default **SBOM Package Age – Deny** policy. The policy denies packages that were published within the configured cooldown period. You can use this policy as a starting point and customize the cooldown period to meet your organization's security requirements.
 
```go
package sbom

import future.keywords.if
import future.keywords.in

# Denies components published within the cooldown window; undated ones are skipped.

#### CONFIGURE COOLDOWN PERIOD (days) ####
# Editable window, allowed range 1-14.
cooldown_days := 2

#### DO NOT CHANGE THE FOLLOWING SCRIPT ####

# Rule echoed on each violation so Harness can render the message and threshold.
package_age_rule := {"package_age": {"operator": "<", "value": cooldown_days, "unit": "days"}}

# Signals a package_age rule ran, so the skipped-count is meaningful.
package_age_evaluated := true

# No allow rules, but the key must exist for the evaluator.
allow_list_violations := []

# Emits one deny entry only when at least one component is too young.
deny_list_violations[violations] {
	denied_ids := [violating_id |
		some pkg in input
		violating_id := pkg.uuid
		is_package_age_denied(pkg, package_age_rule)
	]

	count(denied_ids) > 0

	violations := [{
		"type": "deny",
		"rule": package_age_rule,
		"violations": denied_ids,
	}]
}

# Denies when age is a real number below cooldown; is_number skips null/missing.
is_package_age_denied(pkg, rule) if {
	is_number(pkg.packageAgeDays)
	num_compare(pkg.packageAgeDays, rule.package_age.operator, rule.package_age.value)
}

# package_age_rule only ever uses "<".
num_compare(a, "<", b) := a < b

```
</div>

</details>

## Next steps

* [OSS Risks Remediation](/docs/software-supply-chain-assurance/open-source-management/oss-risks-remediation): Remediate detected open-source software (OSS) risks across your repositories and artifacts to strengthen your software supply chain security.
* [Direct/Indirect Dependency](/docs/software-supply-chain-assurance/open-source-management/direct-indirect-dependency): Filter and analyze direct and indirect dependencies in your SBOM to better understand dependency relationships and their security impact.