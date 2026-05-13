---
title: License Family
description: Categorize individual licenses into standard families to quickly understand their impact and risk.
sidebar_position: 25

tags:
  - harness-scs
  - license-grouping
  - risk-and-compliance
---

A Software Bill of Materials (SBOM) provides visibility into the components and dependencies used in your application, including the licenses associated with each dependency. However, raw license identifiers (such as MIT, GPL-2.0, or Apache-2.0) do not clearly convey the level of risk or legal obligations associated with those licenses.

License Family Classification enhances the SBOM view by automatically grouping individual licenses into broader, industry-standard categories such as Permissive, Copyleft, Weak Copyleft, and Unknown/Proprietary. This classification adds contextual insight to existing SBOM data, making it easier to assess licensing risks and take informed actions during software development and security reviews without requiring manual analysis.

By categorizing licenses into families, you can do the following:

* Identify high-risk licenses at a glance.
* Standardize how licenses are interpreted across teams.
* Analyze dependencies based on license characteristics.
* Reduce the time spent manually reviewing and classifying licenses.

***

## What will you learn in this topic?

By the end of this topic, you will be able to understand:

* How license family classification works.
* The different license families and what they represent.
* The detailed steps to configure the license families.
* The detailed steps to view the license family of a dependency within the SBOM table.

***

## Understand License Families

License families group individual open source licenses based on their obligations and usage restrictions. Instead of interpreting each license separately, this classification helps you quickly understand how a license might impact your application.

For classifying licenses based on their impact and risk, SCS supports the following license families:

* **Permissive** - Permissive licenses have minimal restrictions on how software can be used, modified, or distributed. They are generally safe to use in proprietary applications with simple requirements, such as attribution, making them low risk for most teams. For example, *MIT, Apache-2.0, and BSD*.
* **Copyleft** - Copyleft licenses come with strong obligations. If you modify or distribute software under a copyleft license, you may be required to release your source code under the same terms. This can limit use in proprietary applications and is typically considered high risk. For example, *GPL-2.0, GPL-3.0, and AGPL-3.0*.
* **Weak Copyleft** - Weak Copyleft licenses impose limited obligations. You are required to share changes made to the licensed component itself, but not your entire application. This allows them to be used in proprietary software in many cases, though they still require careful review. For example, *LGPL, MPL-2.0, and EPL*.
* **Unknown/Proprietary** - Unknown or Proprietary licenses include licenses that are not part of standard databases, as well as custom or commercial licenses. Since their terms may be unclear or restrictive, they can introduce risk and usually need closer inspection before use. For example, *custom licenses, commercial licenses, or unlicensed code*.

***

## Before you begin

Make a note of the following before you proceed with license family configuration:

* Generate SBOMs for your artifacts or repositories. For more information, see [Generate SBOM for Artifacts](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-artifacts/) and [Generate SBOM for Repositories](/docs/software-supply-chain-assurance/open-source-management/generate-sbom-for-repositories/).

***

## Configure the License Families

Configuring license families allows you to control how licenses are grouped and interpreted in your SBOM. To configure the license families, complete the following steps:

1. Navigate to the **Configurations** page under the **Manage** section from the sidebar navigation of your SCS account. The `General` tab opens by default.
2. Click on the `License Family` tab to see the different Harness license families and the default licenses associated with each family. The available license families are **Permissive**, **Copyleft**, **Weak Copyleft**, and **Unknown/Proprietary**.
3. Click on the `edit (pen) icon` located on the right of the licenses within each license family row to open the `Edit License - <License_Family_Name>` dialog. 
4. Add your preferred license by entering comma-separated strings within the dialog. For example, *W3C-20020816, Public Domain*. Alternatively, you can remove licenses from the default set provided by Harness.
5. After verifying the details, click `Save`. Once saved, you can view the **License family configuration saved successfully** toaster message at the top, indicating the successful configuration of licenses within the family.
6. Alternatively, you can reset the license family configuration back to the default set provided by Harness. Click on the `edit (pen) icon` for the edited license family to open the `Edit License - <License_Family_Name>` dialog and click **Reset**.
7. Click `Reset` again to confirm your choice. Once done successfully, you can view the **License family reset to harness defaults successfully** toaster message at the top, indicating that the license family configuration was successfully reset to the default set of licenses provided by Harness.

<DocImage path={require('./static/license-family-configuration.png')} width="100%" height="100%" title="Click to view full size image" />

***

## View the License Family

Viewing license families in the SBOM dependency table lets you quickly identify licensing risk using color-coded indicators for each dependency. To view the license family within the SBOM table, complete the following steps:

1. Navigate to the **Code Repositories** or **Artifacts** page under the **Supply Chain** section from the sidebar navigation of your SCS account and select your repository or artifact (along with the digest). The `Overview` tab opens by default.
2. Click the `SBOM` tab to view the list of dependencies in the form of a table.
3. The **License Family** column appears in the table with one or more license families for each dependency. Each license family is color-coded.
4. If a dependency is associated with multiple license families, the highest-risk family is displayed in the column, along with the number of additional families. Hover over the count to view the other associated license families.

<DocImage path={require('./static/view-license-family.png')} width="100%" height="100%" title="Click to view full size image" />

***

## Enforce License Compliance Using OPA Policies

License family classification gives you visibility into the licensing risk of your dependencies. However, organizations often need to go beyond visibility and enforce policies that restrict the use of certain license types to meet compliance and legal requirements.

Open Policy Agent (OPA) policies let you evaluate license families during SBOM checks and define whether dependencies should be allowed or denied based on your requirements. Policies are enforced through a Policy Set. In the Policy Set, you can configure how violations are handled, such as warning and continuing, or failing the pipeline. For example, if a dependency uses a restricted license family such as Copyleft or Unknown/Proprietary, you can choose to fail the pipeline or allow it with a warning. This helps prevent the introduction of dependencies with restricted or unclear licensing terms.

To enforce OPA policies for license families, you can create a policy and then enforce it via the SBOM Policy Enforcement step. For step-by-step instructions, see the [Create SBOM Policies](/docs/software-supply-chain-assurance/open-source-management/create-sbom-policies) and [Enforce SBOM Policies](/docs/software-supply-chain-assurance/open-source-management/enforce-sbom-policies) documentation, respectively.

### Examples

The following examples show how you can use OPA policies to evaluate license families and allow or deny dependencies during SBOM checks. Each example demonstrates how to define rules based on license families, helping you enforce your organization’s licensing requirements.

<details>
  <summary>Example Policy to Allow and Deny License Families</summary>
<div>  
The following policy example shows how to deny licenses from the **Copyleft** license family and allow licenses only from the **Permissive** license family:

```
package sbom

import future.keywords.if
import future.keywords.in

########################################################
# LICENSE FAMILY CLASSIFICATION - ENFORCEMENT TEST
#
# Uses pkg.licenseFamily (resolved at query time from
# the project's License Family Configuration).
#
# DENY  : licenseFamily == "copyleft"
# ALLOW : licenseFamily == "permissive" only
#
# Key validation: change a license's family in
# Configurations -> License Family (no policy change)
# and re-run -> enforcement result should change.
########################################################

#### DENY: Copyleft family ####
deny_list := fill_default_deny_rules([
  {"licenseFamily": {"value": "copyleft", "operator": "=="}},
])

#### ALLOW: Permissive family only ####
# Any component whose licenseFamily is NOT permissive will be flagged
allow_list := {
  "licenseFamilies": [
    {"licenseFamily": {"value": "permissive", "operator": "=="}},
  ],
}

#### DO NOT CHANGE THE FOLLOWING SCRIPT ####

# --- License name matching (existing) ---
does_violate_license(pkg, rules) if {
  some package_license in pkg.packageLicense
  not does_match_license(package_license, rules)
}

does_match_license(license, rules) if {
  some rule in rules
  str_compare(license, rule.license.operator, rule.license.value)
}

# --- License family matching (new) ---
does_violate_license_family(pkg, rules) if {
  not does_match_license_family(pkg, rules)
}

does_match_license_family(pkg, rules) if {
  some rule in rules
  str_compare(pkg.licenseFamily, rule.licenseFamily.operator, rule.licenseFamily.value)
}

# --- PURL / Supplier matching (existing) ---
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

# --- Allow list violations ---

# Existing: license-name-based allow list
allow_rules_licenses_violations(allow_rules_licenses) := violating_packages if {
  violating_packages := {result |
    some pkg in input
    does_violate_license(pkg, allow_rules_licenses)
    result = pkg.uuid
  }
  count(violating_packages) > 0
}

# New: licenseFamily-based allow list
allow_rules_license_families_violations(allow_rules_license_families) := violating_packages if {
  violating_packages := {result |
    some pkg in input
    does_violate_license_family(pkg, allow_rules_license_families)
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
  allow_rules_license_families := object.get(allow_list, "licenseFamilies", [])
  count(allow_rules_license_families) > 0
  violations := [x |
    x := {
      "type": "allow",
      "rule": allow_rules_license_families,
      "violations": allow_rules_license_families_violations(allow_rules_license_families),
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

# --- Deny list violations ---
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

# Existing deny_compare: license name match
deny_compare(pkg, rule) if {
  rule.license.value != null
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

# New deny_compare: licenseFamily match
deny_compare(pkg, rule) if {
  rule.licenseFamily.value != null
  str_compare(pkg.licenseFamily, rule.licenseFamily.operator, rule.licenseFamily.value)
  is_name_denied(pkg, rule)
  is_purl_denied(pkg, rule)
  is_supplier_denied(pkg, rule)
  pkg_version := version_to_semver(pkg.packageVersion)
  rule_version := version_to_semver(rule.version.value)
  semver_compare(pkg_version, rule.version.operator, rule_version)
}

version_to_semver(version) = output if {
  parts := split(version, ".")
  count(parts) == 1
  output := concat(".", [version, "0", "0"])
}

version_to_semver(version) = output if {
  parts := split(version, ".")
  count(parts) == 2
  output := concat(".", [version, "0"])
}

version_to_semver(version) = version if {
  parts := split(version, ".")
  count(parts) >= 3
}

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

version_to_semver(version) = output if {
  version == null
  output := null
}

semver_compare(a, "~", b) := regex.match(b, a)

semver_compare(a, null, b) := semver.compare(b, a) == 0 if b != null

semver_compare(_, null, null) := true

fill_default_deny_rules(obj) := list if {
  defaults := {
    "name":          {"value": null, "operator": null},
    "license":       {"value": null, "operator": null},
    "licenseFamily": {"value": null, "operator": null},
    "version":       {"value": null, "operator": null},
    "supplier":      {"value": null, "operator": null},
    "purl":          {"value": null, "operator": null},
  }
  list := [x | x := object.union(defaults, obj[_])]
}
```
</div>

</details>

<details>
  <summary>Example Policy to Deny a License Family</summary>
<div>
The following policy example shows how to deny licenses from the **Copyleft** license family:

```
package harness.sbom.deny_list

# Deny GPL licenses (all variants)
deny[msg] {
    license := input.component.licenses[_]
    contains(lower(license.name), "gpl")
    msg := sprintf("Component '%s' (version %s) contains GPL license '%s' which is not allowed in production", [input.component.name, input.component.version, license.name])
}

# Deny AGPL licenses (all variants)
deny[msg] {
    license := input.component.licenses[_]
    contains(lower(license.name), "agpl")
    msg := sprintf("Component '%s' (version %s) contains AGPL license '%s' which is not allowed in production", [input.component.name, input.component.version, license.name])
}
```
</div>

</details>