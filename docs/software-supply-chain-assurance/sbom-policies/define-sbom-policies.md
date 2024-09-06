---
title: Write policy definitions
description: Learn how to write policy definitions for SBOM policy files.
sidebar_position: 20
redirect_from:
  - /docs/software-supply-chain-assurance/ssca-policies/define-ssca-policies
---

When you [create SBOM policies](./create-sbom-policies.md), you define rules for open-source component usage based on criteria such as component name, version, license, PURL, and supplier.

The SCS module supports deny list and allow list policies. Your policy files can include both lists. This topic explains how to write rules for each list.

## Deny list policies

Use deny list policies to block the use of specific components within your artifacts. If an artifact includes a component that is part of the deny list, the artifact's policy evaluation fails.

For example, you can block a specific version of a component that has known vulnerabilities or doesn't meet your security standards. By adding that version of the component to the `deny_list` and [enforcing the policy](./enforce-sbom-policies.md) in your pipelines, any attempts to use this component version in your organization's artifacts will be blocked.

Your deny list rules can use any combination of the following attributes, in addition to the component `name`:

* `supplier`
* `license`
* `version`
* `purl`


## Allow list policies

Use allow list policies to define a list of approved licenses, suppliers, and PURLs. The allow list ensures that your artifacts only include components that meet your specifications, which can help mitigate security and compliance risks. When you enforce policies in your pipelines, if an artifact includes a component that is not included in the allow list, the attribute's policy evaluation fails. Policy evaluation will also fail if the attribute on which the policy is enforced is not present in the corresponding SBOM.


## Using OPA policies

You can define OPA policy sets at project, org, and account levels. A typical SBOM policy set has three sections:

* `deny_list`: Rules for denying the use of components based on specified criteria.
* `allow_list`: Rules for allowed licenses, suppliers, and PURLs.
* `Enforcement Logic`: Don't edit this part. It provides policy examples and logic that ensures your policies are consistently enforced.

:::warning

When writing SBOM OPA policies, select one of the sample policies from the Policy library and change *only* the `deny_list` and `allow_list` sections according to the rules you want to enforce.

**Do not** change anything below `#### DO NOT CHANGE THE FOLLOWING SCRIPT ####`. The content below this comment line is required to consistently enforce your SBOM OPA policy rules.

:::

When creating a policy set for SBOM, set the **Entity Type** to **SBOM**.

<!-- ![](./static/ssca-policy-file-store.png) -->

<DocImage path={require('./static/sbom-opa-policy-set.png')} />

### Sample policies

Harness has the following samples in the Policy Library to help you create rules for SBOM policy enforcement:

* SBOM - Allow list
* SBOM - Deny list
* SBOM - Allow and Deny list

Here is an example of a sample policy:

```
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
...........

```

## Supported Operators

In this section you can find the opreators supported by SBOM OPA policies

### String Operators
```
- ==: Equal to
- !=: Not equal to
- ~: Pattern match

Examples:
- {"name":{"value":"abc","operator":"=="}}
  Explanation: The package name is equal to abc.
- {"name":{"value":"abc","operator":"!="}}
  Explanation: The package name is not equal to abc.
- {"name":{"value":"regex","operator":"~"}}
  Explanation: The package name matches the regex pattern.

```

### Version Operators
```
- ==: Equal to
- !=: Not equal to
- >: Greater than
- <: Less than
- >=: Greater than or equal to
- <=: Less than or equal to
- ><: In between
- >=<: In between (start inclusive)
- ><=: In between (end inclusive)
- >=<=: In between (start and end inclusive)
- ~: Pattern match

Examples:
- {"version":{"value":"1.2.3","operator":"=="}}
  Explanation: The version is equal to 1.2.3.
- {"version":{"value":"1.2.3","operator":"!="}}
  Explanation: The version is not equal to 1.2.3.
- {"version":{"value":"1.2.3","operator":">"}}
  Explanation: The version is greater than 1.2.3.
- {"version":{"value":"1.2.3","operator":"<"}}
  Explanation: The version is less than 1.2.3.
- {"version":{"value":"1.2.3","operator":">="}}
  Explanation: The version is greater than or equal to 1.2.3.
- {"version":{"value":"1.2.3","operator":"<="}}
  Explanation: The version is less than or equal to 1.2.3.
- {"version":{"value":"1.2,2.3.4","operator":"><"}}
  Explanation: The version is greater than 1.2.3 and less than 2.3.4.
- {"version":{"value":"1.2,2.3.4","operator":">=<"}}
  Explanation: The version is greater than or equal to 1.2.3 and less than 2.3.4.
- {"version":{"value":"1.2,2.3.4","operator":">=<="}}
  Explanation: The version is greater than 1.2.3 and less than or equal to 2.3.4.
- {"version":{"value":"1.2,2.3.4","operator":">=<="}}
  Explanation: The version is greater than or equal to 1.2.3 and less than or equal to 2.3.4.
- {"version":{"value":"1.2.3","operator":"~"}}
  Explanation: The version matches the regex pattern.

```

## Sample Rules
In this section, you can find examples of various rules that you can create for SBOM policy enforcement

### Sample deny list rules

**Block 'curl' below a Certain Version**

```
Rule: "name": {"value": "curl", "operator": "=="}, "version": {"value": "3.0.0", "operator": "<="}
```

This rule blocks the usage of 'curl' if the version is 3.0.0 or lower.

**Block Versions of 'log4j' using Regex**

```
Rule: "name": {"value": ".*log4j.*", "operator": "~"}, "version": {"value": "3.0.0", "operator": "<"}
```

Targets any component matching the regex '.log4j.' that is below version 3.0.0.

**Block 'busybot' Between Version 3.0.0 and 5.0.0**

```
Rule: "name": {"value": "busybot", "operator": "=="}, "version": {"value": "3.0.0,5.0.0", "operator": "><"}
```

Prohibits the usage of 'busybot' for versions strictly between 3.0.0 and 5.0.0.

**Block 'curl' at or Above a Certain Version**

```
Rule: "name": {"value": "curl", "operator": "=="}, "version": {"value": "3.0.0", "operator": ">="}
```

Blocks 'curl' if its version is 3.0.0 or higher.

**Block 'curl' Above a Certain Version**

```
Rule: "name": {"value": "curl", "operator": "=="}, "version": {"value": "3.0.0", "operator": ">"}
```

Blocks 'curl' if its version is greater than 3.0.0.

**Block 'curl' Except a Specific Version**

```
Rule: "name": {"value": "curl", "operator": "=="}, "version": {"value": "3.0.0", "operator": "!"}
```

Blocks all versions of 'curl' except for 3.0.0.

**Block Specific 'log4j' Version**

```
Rule: "name": {"value": ".*log4j.*", "operator": "~"}, "version": {"value": "3.0.0", "operator": "=="}
```

Blocks the specific version 3.0.0 of any component matching '.log4j.'.

**Block Components with Regex Pattern in Name**

```
Rule: {"name": {"value": "c.*", "operator": "~"}}
```

Blocks any component whose name starts with 'c'.

**Block Components with a Specific License**

```
Rule: {"license": {"value": "BSD-3-Clause", "operator": "=="}}
```

Blocks components with the 'BSD-3-Clause' license.

**Block Components Within a Version Range**

```
Rule: {"version": {"value": "1.3.0,2.12.0", "operator": ">=<"}}
```

Targets components whose versions are greater than or equal to 1.3.0 and less than 2.12.0.

**Block Components from a Specific Supplier**

```
Rule: {"supplier": {"value": "Organization: Red Hat, Inc.", "operator": "=="}}
```

Blocks components supplied by "Red Hat, Inc."

### Sample allow list rules

Allow list rules are grouped under licenses, suppliers or purls

**Allow a list of licenses based on various criteria**

```
Rule: "licenses": [   {"license": {       "value": "MIT",       "operator": "==",     }},     {"license": {       "value": ".*Apache.*",       "operator": "~",     }},     {"license": {       "value": ".*eclipse.*",       "operator": "~",     }},   ],
```

This group of rules permits components based on their license types. The first rule explicitly allows components with the 'MIT' license. The next two rules use regex to allow any licenses containing 'Apache' or 'eclipse' in their names, respectively. This grouping ensures a broad but specific allowance based on license criteria.

**Allow a list of suppliers**

```
Rule: "suppliers": [{"supplier": {    "value": ".*Red Hat.*",     "operator": "~",   },  { "value": ".*Apache.*",     "operator": "~",   }}],
```

These rules allow components from suppliers that include ‘Red Hat' or 'Apache’ in their names. The use of regex (~) allows for flexible matching to any supplier name that contains 'Red Hat', accommodating variations in naming.

