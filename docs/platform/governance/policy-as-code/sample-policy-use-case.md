---
title: Policy samples
description: Learn about sample policies and their use cases in the Harness Policy Library.
sidebar_position: 90
canonical_url: https://www.harness.io/blog/feature-flags-best-practices
---

Harness supports policy enforcement through Open Policy Agent (OPA) and Rego. You can apply policies in two ways:

* **By scope:** Apply a policy across all pipelines in an account, organization, or project. See [Harness Policy As Code quickstart](/docs/platform/governance/policy-as-code/harness-governance-quickstart).

* **By stage:** Add a policy step to a pipeline with a policy set and JSON payload to evaluate. Policies run when the pipeline reaches that step, allowing evaluation of resolved expressions and runtime data. See [Add a policy step to a pipeline](/docs/platform/governance/policy-as-code/add-a-governance-policy-step-to-a-pipeline).

This topic provides sample policies you can use in policy steps and pipeline-level events such as **On Run** and **On Save**.

<!-- https://ecotrust-canada.github.io/markdown-toc/ -->

- [Policy samples](#policy-samples)
	- [Root policy samples](#root-policy-samples)
		- [Evaluate secrets in pipeline and only allow secrets that are at the account level](#evaluate-secrets-in-pipeline-and-only-allow-secrets-that-are-at-the-account-level)
	- [Connector policy samples](#connector-policy-samples)
		- [Enforce authorization type while configuring a Kubernetes connector](#enforce-authorization-type-while-configuring-a-kubernetes-connector)
		- [Enforce access control for a specific connector at runtime while configuring the pipeline](#enforce-access-control-for-a-specific-connector-at-runtime-while-configuring-the-pipeline)
		- [Enforce the connector naming conventions when users add a new connector](#enforce-the-connector-naming-conventions-when-users-add-a-new-connector)
	- [Pipeline enforcement policy samples](#pipeline-enforcement-policy-samples)
		- [Prevent other developers from deploying into a non-compliant environment](#prevent-other-developers-from-deploying-into-a-non-compliant-environment)
		- [Enforce the container registry selected for building and publishing code](#enforce-the-container-registry-selected-for-building-and-publishing-code)
		- [Prevent users from leveraging steps that are not allowed by the company](#prevent-users-from-leveraging-steps-that-are-not-allowed-by-the-company)
		- [Enforce a deployment freeze via policy](#enforce-a-deployment-freeze-via-policy)
		- [Enforce remote pipeline execution from the default branch only if the user is not part of a specific user group](#enforce-remote-pipeline-execution-from-the-default-branch-only-if-the-user-is-not-part-of-a-specific-user-group)
		- [Restrict certain commands from Inline ShellScript or Run Steps](#restrict-certain-commands-from-inline-shellscript-or-run-steps)
	- [Feature Flag policies](#feature-flag-policies)
		- [Enforce flag naming conventions](#enforce-flag-naming-conventions)
		- [Enforce allowed flag types](#enforce-allowed-flag-types)
		- [Enforce default flag values](#enforce-default-flag-values)
		- [Enforce flag environment states](#enforce-flag-environment-states)
		- [Enforce flag rules](#enforce-flag-rules)
		- [Enforce service change windows](#enforce-service-change-windows)
	- [FME Feature Flag policies](#fme-feature-flag-policies)
		- [Enforce FME flag naming conventions](#enforce-fme-flag-naming-conventions)
		- [Enforce required tags](#enforce-required-tags)
	    - [Require team ownership](#require-team-ownership)
	- [FME Feature Flag Definition policies](#fme-feature-flag-definition-policies)
		- [Enforce flag definition validation rules](#enforce-flag-definition-validation-rules)
	- [FME Environment policies](#fme-environment-policies)
	    - [Enforce environment naming conventions](#enforce-environment-naming-conventions)
		- [Require approvals for production environments](#require-approvals-for-production-environments)
	- [FME Segment policies](#fme-segment-policies)
		- [Enforce segment naming conventions](#enforce-segment-naming-conventions)
	- [FME Segment Definition policies](#fme-segment-definition-policies)
		- [Enforce segment definition validation rules](#enforce-segment-definition-validation-rules)
		- [Exclude high-priority users from rule-based segments](#exclude-high-priority-users-from-rule-based-segments)
	- [Template policy samples](#template-policy-samples)
		- [Enforce the use of stable templates in a pipeline](#enforce-the-use-of-stable-templates-in-a-pipeline)
		- [Enforce an Approval step in a stage template](#enforce-an-approval-step-in-a-stage-template)
		- [Enforce specific environments to be configured for a stage template](#enforce-specific-environments-to-be-configured-for-a-stage-template)
		- [Enforce use of an approved stage template in a pipeline](#enforce-use-of-an-approved-stage-template-in-a-pipeline)
		- [Enforce step templates to be used in a pipeline](#enforce-step-templates-to-be-used-in-a-pipeline)
		- [Enforce the stage structure of a pipeline](#enforce-the-stage-structure-of-a-pipeline)
		- [Enforce steps in a pipeline](#enforce-steps-in-a-pipeline)
		- [Enforce step order in a pipeline](#enforce-step-order-in-a-pipeline)
		- [Enforce a step is used only in specific pipelines](#enforce-a-step-is-used-only-in-specific-pipelines)
	- [Secret policy samples](#secret-policy-samples)
		- [Ensure there are no principals in the secret secrets](#ensure-there-are-no-principals-in-the-secret-secrets)
		- [Enforce secret naming conventions](#enforce-secret-naming-conventions)
		- [Enforce what secrets manager can be used to save secrets.](#enforce-what-secrets-manager-can-be-used-to-save-secrets)
	- [Security Tests policy samples](#security-tests-policy-samples)
	    - [Exclude vulnerabilities by severity](#exclude-vulnerabilities-by-severity)
	    - [Exclude vulnerabilities by reference ID](#exclude-vulnerabilities-by-reference-id)
	    - [Exclude vulnerabilities by title](#exclude-vulnerabilities-by-title)
	    - [Exclude vulnerabilities by number of occurrences](#exclude-vulnerabilities-by-number-of-occurrences)
	    - [Exclude vulnerabilities by CVE age](#exclude-vulnerabilities-by-cve-age)
	    - [Exclude vulnerabilities using STO output variables](#exclude-vulnerabilities-using-sto-output-variables)
		- [Block the pipeline based on the code coverage results](#block-the-pipeline-based-on-the-code-coverage-results)
		- [Warn or Block vulnerabilities based on CISA KEV count](#warn-or-block-vulnerabilities-based-on-cisa-kev-count)

## Policy samples

### Root policy samples
* [Evaluate secrets in pipeline and only allow secrets that are at the account level](#evaluate-secrets-in-pipeline-and-only-allow-secrets-that-are-at-the-account-level)
#### Evaluate secrets in pipeline and only allow secrets that are at the account level
This rule is set in place to ensure the pipeline yaml does not include secrets at the project level, but will allow secrets at the account level.  

```json
package policy

# Rule to check if any value in the input contains the secret substring
has_secret_value {
    walk(input, [_, value])
    is_string(value)
    contains(value, "<+secrets.getValue")
    not contains(value,"<+secrets.getValue(\"account.")
}

# Main denial rule
deny[msg] {
    has_secret_value
    msg := "Found potentially sensitive value containing 'secret.getValues' in the input"
}
```

### Connector policy samples

* [Enforce authorization type while configuring a Kubernetes connector](#enforce-authorization-type-while-configuring-a-kubernetes-connector)
* [Enforce access control for a specific connector at runtime while configuring the pipeline](#enforce-access-control-for-a-specific-connector-at-runtime-while-configuring-the-pipeline)
* [Enforce the connector naming conventions when users add a new connector](#enforce-the-connector-naming-conventions-when-users-add-a-new-connector)

#### Enforce authorization type while configuring a Kubernetes connector

Enforce authorization type to prevent users from setting up connectors that might not be standard or in compliance with the account owner's guidelines.

Here is a sample policy that you can evaluate using the **On Save** event for a Harness connector:

```json
package connector

import future.keywords.in

# Choose a connector type to check
connectorType := "K8sCluster"
# Choose one or more allowed auth types for the above connector type
allowedAuthTypes := ["UsernamePassword"]

deny[msg] {
	cType := input.entity.type
	aType := input.entity.spec.credential.spec.auth.type

	# This will deny when both of the below conditions are true
	cType == connectorType
	not aType in allowedAuthTypes

	msg := sprintf("Auth types %s are allowed for connector type %s, used '%s'", [allowedAuthTypes, cType, aType])
}

```

#### Enforce access control for a specific connector at runtime while configuring the pipeline

The administrator can control which users can select a specific connector for pipeline configuration and pipeline execution.

Here is a sample policy to enforce which users and user groups can deploy and build using the connector:

```json
package connector

# Choose a connector type to check
connectorType := "K8sCluster"
# Choose one or more user groups, identified by the "identifier" property
AllowedUserGroups := ["_project_all_users"]

deny[msg] {
	cType := input.entity.type

	# Check the connector type is the one we need
	cType == connectorType

	# Check the user groups from the connector are contained in the allowed list
	not contains(input.metadata.userGroups)

	msg := sprintf("Only user groups %s are allowed for connector type %s'", [AllowedUserGroups, cType])
}

contains(userGroups) {
	identifier := userGroups[_].identifier
	AllowedUserGroups[_] = identifier
}
```

#### Enforce the connector naming conventions when users add a new connector

Administrators can enforce naming conventions for connectors created in the Harness account.

Here is a sample policy to enforce naming conventions for connectors that can be applied using the **On Save** event for connector:

```json
package connectors

# Deny connectors whose names do not follow the correct naming convention
# e.g. "Lion - Data Store" is allowed but "Cool connector" is not
# NOTE: Try setting the name to "Test" to see the policy fail
deny[msg] {
	not regex.match("[Cheetah|Tiger|Lion]\\s[-]\\s[a-zA-Z0-9\\s]+", input.entity.name)
	msg := sprintf("Connector name '%s' must follow the correct naming convention 'Team - Account'", [input.entity.name])
}
```

### Pipeline enforcement policy samples

* [Prevent other developers from deploying into a non-compliant environment](#prevent-other-developers-from-deploying-into-a-non-compliant-environment)
* [Enforce the container registry selected for building and publishing code](#enforce-the-container-registry-selected-for-building-and-publishing-code)
* [Prevent users from leveraging steps that are not allowed by the company](#prevent-users-from-leveraging-steps-that-are-not-allowed-by-the-company)
* [Enforce a deployment freeze via policy](#enforce-a-deployment-freeze-via-policy)
* [Enforce remote pipeline execution from the default branch only if the user is not part of a specific user group](#enforce-remote-pipeline-execution-from-the-default-branch-only-if-the-user-is-not-part-of-a-specific-user-group)

#### Prevent other developers from deploying into a non-compliant environment

Administrators can enforce policies to restrict the environments that developers can deploy to.

Here is a sample policy to do this. This policy can be applied using the **On Run** event for a pipeline:

```json
package pipeline

# Deny pipelines that do not use allowed environments
# NOTE: Try removing "test" from the 'allowed_environments' list to see the policy fail
deny[msg] {
	# Find all deployment stages
	stage = input.pipeline.stages[_].stage
	stage.type == "Deployment"

	# ... where the environment is not in the allow list
	not contains(allowed_environments, stage.spec.infrastructure.environment.identifier)

	# Show a human-friendly error message
	msg := sprintf("deployment stage '%s' cannot be deployed to environment '%s'", [stage.name, stage.spec.infrastructure.environment.identifier])
}

# Deny pipelines if the environment is missing completely
deny[msg] {
	# Find all deployment stages
	stage = input.pipeline.stages[_].stage
	stage.type == "Deployment"

	# ... without an environment
	not stage.spec.infrastructure.environment.identifier

	# Show a human-friendly error message
	msg := sprintf("deployment stage '%s' has no environment identifier", [stage.name])
}

# Environments that can be used for deployment
allowed_environments = ["demoprod","stage"]

contains(arr, elem) {
	arr[_] = elem
}
```

#### Enforce the container registry selected for building and publishing code

Administrators can restrict and prevent users from publishing images to public repos, ensuring that only approved repos can be used.

Here is a sample policy that can be applied using the **On Run** event for a pipeline:

```json
package pipeline

# Deny build pipelines that don't push to "us.gcr.io"
# NOTE: Try changing the expected host to see the policy fail
deny[msg] {
	# Find all stages ...
	stage = input.pipeline.stages[_].stage

	# ... that are used for CI
	stage.type == "CI"

	# ... that have steps
	step = stage.spec.execution.steps[_].step

	# ... that build and push to GCR steps
	step.type == "BuildAndPushGCR"

	# ... and do not target "us.gcr.io"
	step.spec.host != "us.gcr.io"

	# Show a human-friendly error message
	msg = sprintf("CI stage '%s' cannot push images to host '%s'", [stage.name, step.spec.host])
}
```

#### Prevent users from leveraging steps that are not allowed by the company

You can restrict developers from using specific steps in their pipelines.

Here is a sample policy that can be applied using the **On Save** and **On Run** events for a pipeline:

```json
package pipeline

# Deny pipelines that are missing required steps
# NOTE: Try adding "HarnessApproval" to the 'forbidden_steps' list to see the policy fail
deny[msg] {
	# Find all stages ...
	stage = input.pipeline.stages[_].stage

	# ... that are deployments
	stage.type == "Deployment"

	# Find all steps in each stage ...
	step = stage.spec.execution.steps[_].step

	# ... that use forbidden types
	forbidden_steps[_] = step.type

	# Show a human-friendly error message
	msg := sprintf("deployment stage '%s' has step '%s' that is forbidden type '%s'", [stage.name, step.name, step.type])
}

# Steps that should not used in deployments
forbidden_steps = ["ShellScript"]

contains(arr, elem) {
	arr[_] = elem
}
```

#### Enforce a deployment freeze via policy

Administrators can configure a deployment freeze via policy to supplement the [deployment freeze](/docs/continuous-delivery/manage-deployments/deployment-freeze) feature. The policy is great for one-off freezes as opposed to recurring freezes.

Here is a sample policy to do this, that can be applied using the **On Run** event for a pipeline:

```json
package pipeline

# Deny when the current date is after a start date and before an end date
# Could be used for deployment freezes
deny[msg] {
	freezeStart := time.parse_rfc3339_ns("2022-11-18T00:00:00+00:00")
	freezeEnd := time.parse_rfc3339_ns("2022-11-20T00:00:00+00:00")
	now := time.now_ns()

	now > freezeStart
	now < freezeEnd

	# Show a human-friendly error message
	msg := "Deployment is currently frozen from 18th Nov to 20th Nov"
}

```

#### Enforce remote pipeline execution from the default branch only if the user is not part of a specific user group

Users in a specific user group can run remote pipelines from any branch, but others can only run pipelines from the default branch.

```json
package pipeline

# Deny when the current date is after a start date and before an end date
# Could be used for deployment freezes
deny[msg] {
        # Find all user groups that are in the project
        userGroup = input.metadata.userGroups[_]
        userGroup.identifier == "groupIdentifier"

	# Ensure if user is not part of the specific group 
        not contains(userGroup.users, input.metadata.user.uuid)

	# Ensure user is running pipeline only from default branch
        input.pipeline.gitConfig.branch == "defaultBranch"

	# Show a human-friendly error message
	msg := "Execution is only allowed from default branch for this user"
}

```

#### Restrict certain commands from Inline ShellScript or Run Steps

The following outlines methods to restrict certain commands from being utilized within Shell Scripts or Run Steps.  These will apply to templates as well.  Please note that scripts that are used, but are stored in Harness File Store will not be evaluated as the only YAML informatil that exists within the pipeline will be a reference to the file, and not the content of the file.

For this example, a customer wants to remove any possibility of running `Maven Debug proceses`.

```
package pipeline

# Deny step if shell script it contains Maven with debug
# e.g. mvn install -X

deny[msg] {
  step := input.pipeline.stages[_].stage.spec.execution.steps[_].step
  
  # Find all mvn command -X matches
  regex.match("\\b(mvn\\b[^\\n]*?\\s-X\\b[^\\n]*)\\b", step.spec.source.spec.script)

  msg := sprintf("Shell Script Step contains Maven Debug Flag.  This is not allowed.",[step.identifier])
}

deny[msg] {
  step := input.pipeline.stages[_].stage.spec.execution.steps[_].step
  
  # Find all mvn command -X matches
  regex.match("\\b(mvn\\b[^\\n]*?\\s-X\\b[^\\n]*)\\b", step.spec.command)

  msg := sprintf("Run Step contains Maven Debug Flag.  This is not allowed.",[step.identifier])
}

```
#### Enforce a Stage Name via Regex

On Pipeline Save you can enforce a stage to adhere to a specific naming convention.

```json
package stage

# Deny if stageName doesn't match the regex pattern
# CRITERIA
# Begin with a lowercase letter.
# Followed by lowercase letters, numbers, or hyphens.
# Be between 3 to 10 characters long.

deny[msg] {
    # Find all stages ...
    stage = input.pipeline.stages[_].stage

    # ... that are deployments
    stage.type == "Deployment"

    not regex.match("^[a-z][a-z0-9-]{2,9}$", stage.name)
    msg := sprintf("The provided stage name '%v' is invalid.", [stage.name])
}
```

### Feature Flag policies

* [Enforce flag naming conventions](#enforce-flag-naming-conventions)
* [Enforce allowed flag types](#enforce-allowed-flag-types)
* [Enforce default flag values](#enforce-default-flag-values)
* [Enforce flag environment states](#enforce-flag-environment-states)
* [Enforce flag rules](#enforce-flag-rules)
* [Enforce service change windows](#enforce-service-change-windows)

#### Enforce flag naming conventions

Ensure flag names match your organization's naming conventions. Apply this policy using the **On Save** event for a feature flag.

```rego title="Ensure that flag names match naming conventions"
package feature_flags

# Deny flags whose names do not contain a validly formatted Jira ticket number
# e.g. "FFM-123" is allowed but "Cool flag" is not
# NOTE: Try setting the name to "Test" to see the policy fail
deny[msg] {
	not regex.match("[FFM|OPA|CI|CD]+[-][1-9][0-9]?", input.flag.name)
	msg := sprintf("Flag name '%s' doesn't contain a Jira ticket number", [input.flag.name])
}
```

#### Enforce allowed flag types

Ensure only boolean flags can be created. Apply this policy using the **On Creation** event for a feature flag.

```rego title="Ensure that only boolean flags can be created"
package feature_flags

# Deny flags that aren't "boolean"
# NOTE: Try changing the flag 'kind' to see the policy fail
deny[msg] {
	input.flag.kind != "boolean"
	msg := sprintf(`Flag '%s' isn't of type "boolean"`, [input.flag.name])
}
```

#### Enforce default flag values

Ensure flags have default on and off values of `false` to prevent accidentally enabling a flag for all users.

```rego title="Ensure that flags have default on and off values of false"
package feature_flags

# Deny flags that serve true by default when turned off
# NOTE: Try setting 'defaultOnVariation' to true to see the policy fail
deny[msg] {
	input.flag.defaultOnVariation != "false"
	msg := sprintf("Flag '%s' does not have default 'on' value of false", [input.flag.name])
}

# Deny flags that serve true by default when turned on
# NOTE: Try setting 'defaultOffVariation' to true to see the policy fail
deny[msg] {
	input.flag.defaultOffVariation != "false"
	msg := sprintf("Flag '%s' does not have default 'off' value of false", [input.flag.name])
}
```

#### Enforce flag environment states

Ensure flags are enabled in a lower environment before they can be enabled in a higher one.

```rego title="Ensure flags are enabled in one environment before they are enabled in another"
package feature_flags

# Deny flags that are enabled in "production" but not in "stage"
# NOTE: Try changing the "production" state to "on" to see the policy fail
deny[msg] {
	# Match flags where the "production" environment is on ...
	prod := input.flag.envProperties[_]
	prod.environment == "production"
	prod.state == "on"

	# ... and the "stage" environment is off
	stage := input.flag.envProperties[_]
	stage.environment == "stage"
	stage.state == "off"

	msg := sprintf(`Flag '%s' cannot be enabled in "production" because it is disabled in "stage"`, [input.flag.name])
}
```

#### Enforce flag rules

Control how flag targeting rules can be configured, including limits on target rules and prerequisites.

```rego title="Enforce how flag rules can be used"
package feature_flags

# Deny flags that have too many target rules
# NOTE: Try adding target rules to the input to see the policy fail
deny[msg] {
	env = input.flag.envProperties[_]
	count(env.variationMap[_].targets) > "2"
	msg := sprintf("Flag '%s' has more than 2 target rules", [input.flag.name])
}

# Deny flags that have prerequisite rules
# NOTE: Try adding prerequisite rules to the input to see the policy fail
deny[msg] {
	count(input.flag.prerequisites) > 0
	msg := sprintf("Flag '%s' has a prerequisite rule configured", [input.flag.name])
}
```

#### Enforce service change windows

Ensure flags linked to regulated services can only be modified during an allowed maintenance window.

```rego title="Ensure flags linked to a regulated service can only be changed during allowed times"
package feature_flags

# Only allow changes to flags linked to regulated services on a Saturday (maintenance window)
# NOTE: Try setting metadata.timestamp to "1661507619" (a Friday) to see the policy fail
deny[msg] {
	services := input.flag.services[_]
	regulated_services[_] = services.identifier
	changeDay := time.weekday(input.metadata.timestamp*1000000000)
	changeDay != "Saturday"
	msg := sprintf(`Changes to regulated services are only allowed on a "Saturday", got %s`, [changeDay])
}

regulated_services = ["regulated_svc_1","regulated_svc_2"]
```

### FME Feature Flag policies

* [Enforce FME flag naming conventions](#enforce-fme-flag-naming-conventions)
* [Enforce required tags](#enforce-required-tags)
* [Require team ownership](#require-team-ownership)

#### Enforce FME flag naming conventions

Ensure feature flag names follow your organization's naming convention. For example, names must start with `ff_` and contain only lowercase letters, numbers, and underscores, between 5 and 100 characters long.

```rego title="Ensure that FME feature flag names follow organizational naming conventions"
package fme_feature_flags

# Deny flags whose names don't follow naming conventions
# e.g. "ff_user_authentication_v2" is allowed but "FF_User_Auth" or "user_auth" is not
deny[msg] {
	not regex.match("^ff_[a-z]+[a-z0-9_]*$", input.featureFlag.name)
	msg := sprintf("FME feature flag name '%s' must start with 'ff_' and contain only lowercase letters, numbers, and underscores", [input.featureFlag.name])
}

# Deny flags with names that are too short
deny[msg] {
	count(input.featureFlag.name) < 5
	msg := sprintf("FME feature flag name '%s' is too short (minimum 5 characters)", [input.featureFlag.name])
}

# Deny flags with names that are too long
deny[msg] {
	count(input.featureFlag.name) > 100
	msg := sprintf("FME feature flag name '%s' is too long (maximum 100 characters)", [input.featureFlag.name])
}
```

#### Enforce required tags

Ensure every feature flag has the required tags for categorization and tracking: `owner`, `team`, `service`, and `component`.

```rego title="Ensure that FME feature flags have required tags for categorization and tracking"
package fme_feature_flags

# Deny flags without any tags
deny[msg] {
	count(input.featureFlag.tags) == 0
	msg := sprintf("FME feature flag '%s' must have at least one tag", [input.featureFlag.name])
}

# Deny flags missing an 'owner' tag
deny[msg] {
	not contains_required_tag("owner")
	msg := sprintf("FME feature flag '%s' must have an 'owner' tag", [input.featureFlag.name])
}

# Deny flags missing a 'team' tag
deny[msg] {
	not contains_required_tag("team")
	msg := sprintf("FME feature flag '%s' must have a 'team' tag", [input.featureFlag.name])
}

# Deny flags missing a 'service' tag
deny[msg] {
	not contains_required_tag("service")
	msg := sprintf("FME feature flag '%s' must have a 'service' tag", [input.featureFlag.name])
}

# Deny flags missing a 'component' tag
deny[msg] {
	not contains_required_tag("component")
	msg := sprintf("FME feature flag '%s' must have a 'component' tag", [input.featureFlag.name])
}

# Helper: check if a required tag exists
contains_required_tag(tag_name) {
	some i
	contains(input.featureFlag.tags[i], tag_name)
}

# Warn if no description is set
warn[msg] {
	input.featureFlag.description == ""
	msg := sprintf("FME feature flag '%s' should have a description for better documentation", [input.featureFlag.name])
}
```

#### Require team ownership

Ensure every feature flag has at least one owner, and that all owners are teams rather than individual users.

```rego title="Ensure that FME feature flags have at least one owner and all owners are teams, not individual users"
package fme_feature_flags

# Deny flags with no owners
deny[msg] {
	count(input.entityMetadata.owners) == 0
	msg := sprintf("FME feature flag '%s' must have at least one owner", [input.featureFlag.name])
}

# Deny flags owned by individual users
deny[msg] {
	some i
	owner := input.entityMetadata.owners[i]
	owner.ownerType == "user"
	owner_name := object.get(owner, "ownerName", owner.ownerId)
	msg := sprintf("FME feature flag '%s' has an individual user owner '%s'. Owners must be teams, not individual users", [input.featureFlag.name, owner_name])
}
```

### FME Feature Flag Definition policies

* [Enforce flag definition validation rules](#enforce-flag-definition-validation-rules)

#### Enforce flag definition validation rules

Ensure every feature flag definition has at least two treatments (`on` and `off`), that each treatment has a non-empty description, and that the default treatment is always `off`.

```rego title="Ensure FME feature flag definitions have at least 2 treatments (ON & OFF), each with descriptions, and default is always OFF"
package fme_feature_flag_definitions

# Deny definitions without at least 2 treatments
deny[msg] {
	count(input.featureFlagDefinition.treatments) < 2
	msg := sprintf("FME feature flag definition '%s' must have at least 2 treatments", [input.featureFlagDefinition.name])
}

# Deny definitions missing an 'on' treatment
deny[msg] {
	not has_treatment("on")
	msg := sprintf("FME feature flag definition '%s' must have an 'on' treatment", [input.featureFlagDefinition.name])
}

# Deny definitions missing an 'off' treatment
deny[msg] {
	not has_treatment("off")
	msg := sprintf("FME feature flag definition '%s' must have an 'off' treatment", [input.featureFlagDefinition.name])
}

# Helper: check if a treatment exists
has_treatment(treatment_name) {
	some i
	input.featureFlagDefinition.treatments[i].name == treatment_name
}

# Deny treatments with an empty or missing description
deny[msg] {
	some i
	treatment := input.featureFlagDefinition.treatments[i]
	description := object.get(treatment, "description", "")
	description == ""
	msg := sprintf("FME feature flag definition '%s' treatment '%s' must have a non-empty description", [input.featureFlagDefinition.name, treatment.name])
}

# Deny definitions where the default treatment is not 'off'
deny[msg] {
	some i
	treatment := input.featureFlagDefinition.treatments[i]
	treatment.defaultTreatment == true
	treatment.name != "off"
	msg := sprintf("FME feature flag definition '%s' must have 'off' as the default treatment, but '%s' is set as default", [input.featureFlagDefinition.name, treatment.name])
}
```

### FME Environment policies

* [Enforce environment naming conventions](#enforce-environment-naming-conventions)
* [Require approvals for production environments](#require-approvals-for-production-environments)

#### Enforce environment naming conventions

Ensure environment names start with a lowercase letter and contain only lowercase letters, numbers, and underscores, between 3 and 100 characters long.

```rego title="Ensure that FME environment names follow organizational naming conventions"
package fme_environments

# Deny environments whose names don't follow naming conventions
deny[msg] {
	not regex.match("^[a-z][a-z0-9_]*$", input.fmeEnvironment.name)
	msg := sprintf("FME environment name '%s' must start with a lowercase letter and contain only lowercase letters, numbers, and underscores", [input.fmeEnvironment.name])
}

# Deny environments with names that are too short
deny[msg] {
	count(input.fmeEnvironment.name) < 3
	msg := sprintf("FME environment name '%s' is too short (minimum 3 characters)", [input.fmeEnvironment.name])
}

# Deny environments with names that are too long
deny[msg] {
	count(input.fmeEnvironment.name) > 100
	msg := sprintf("FME environment name '%s' is too long (maximum 100 characters)", [input.fmeEnvironment.name])
}
```

#### Require approvals for production environments

Ensure production environments have approvals enabled and at least one approver configured.

```rego title="Ensure that production environments have approvals required and at least one approver configured"
package fme_environments

# Deny production environments that don't require approvals
deny[msg] {
	input.fmeEnvironment.environmentType == "production"
	not input.fmeEnvironment.changeSettings.areApprovalsRequired
	msg := sprintf("FME production environment '%s' must have approvals required", [input.fmeEnvironment.name])
}

# Deny production environments with no approvers configured
deny[msg] {
	input.fmeEnvironment.environmentType == "production"
	count(object.get(input.fmeEnvironment.changeSettings, "approvers", [])) == 0
	msg := sprintf("FME production environment '%s' must have at least one approver configured", [input.fmeEnvironment.name])
}
```

### FME Segment policies

* [Enforce segment naming conventions](#enforce-segment-naming-conventions)

#### Enforce segment naming conventions

Ensure segment names start with a lowercase letter and contain only lowercase letters, numbers, and underscores, between 3 and 100 characters long.

```rego title="Ensure that FME segment names follow organizational naming conventions"
package fme_segments

# Deny segments whose names do not follow naming conventions
# Names must start with lowercase letter and contain only lowercase letters, numbers, and underscores
deny[msg] {
    not regex.match("^[a-z][a-z0-9_]*$", input.fmeSegment.name)
    msg := sprintf("FME Segment name '%s' must start with a lowercase letter and contain only lowercase letters, numbers, and underscores", [input.fmeSegment.name])
}

# Deny segments with names that are too short
deny[msg] {
    count(input.fmeSegment.name) < 3
    msg := sprintf("FME Segment name '%s' is too short (minimum 3 characters)", [input.fmeSegment.name])
}

# Deny segments with names that are too long
deny[msg] {
    count(input.fmeSegment.name) > 100
    msg := sprintf("FME Segment name '%s' is too long (maximum 100 characters)", [input.fmeSegment.name])
}
```

### FME Segment Definition policies

* [Enforce segment definition validation rules](#enforce-segment-definition-validation-rules)
* [Exclude high-priority users from rule-based segments](#exclude-high-priority-users-from-rule-based-segments)

#### Enforce segment definition validation rules

Ensure segment definitions meet organizational requirements across standard, rule-based, and large segment types. Rule-based segments must have at least one rule with at least one matcher, all definitions must be active, and large segments warn when no keys are uploaded.

```rego title="Ensure that FME segment definitions meet organizational requirements across standard, rule-based, and large segment types"
package fme_segment_definitions

# Deny rule-based definitions with no rules
deny[msg] {
	input.fmeSegmentDefinition.segmentType == "rule_based_segment"
	count(object.get(input.fmeSegmentDefinition, "definition", [])) == 0
	msg := sprintf("FME rule-based segment definition '%s' in environment '%s' must have at least one rule", [input.fmeSegmentDefinition.name, input.fmeSegmentDefinition.environment.name])
}

# Deny rule-based definitions where a rule has no matchers
deny[msg] {
	input.fmeSegmentDefinition.segmentType == "rule_based_segment"
	some i
	rule := input.fmeSegmentDefinition.definition[i]
	count(object.get(rule.condition, "matchers", [])) == 0
	msg := sprintf("FME rule-based segment definition '%s' rule %d must have at least one matcher", [input.fmeSegmentDefinition.name, i])
}

# Deny definitions that are not active
deny[msg] {
	not input.fmeSegmentDefinition.status == "active"
	msg := sprintf("FME segment definition '%s' in environment '%s' must have status 'active', got '%s'", [input.fmeSegmentDefinition.name, input.fmeSegmentDefinition.environment.name, input.fmeSegmentDefinition.status])
}

# Warn when a large segment has no keys and is not currently uploading
warn[msg] {
	input.fmeSegmentDefinition.segmentType == "large_segment"
	input.fmeSegmentDefinition.currentKeyCount == 0
	not input.fmeSegmentDefinition.uploadingKeys
	msg := sprintf("FME large segment definition '%s' in environment '%s' has no keys and is not currently uploading", [input.fmeSegmentDefinition.name, input.fmeSegmentDefinition.environment.name])
}
```

#### Exclude high-priority users from rule-based segments

Ensure all rule-based segment definitions explicitly exclude the `high_priority_users` segment.

```rego title="Ensure that rule-based segment definitions always exclude the high priority users segment"
package fme_segment_definitions

# Deny rule-based definitions that don't exclude the high_priority_users segment
deny[msg] {
	input.fmeSegmentDefinition.segmentType == "rule_based_segment"
	not excludes_high_priority_users
	msg := sprintf("Rule-based segment definition '%s' in environment '%s' must exclude the 'high_priority_users' segment", [input.fmeSegmentDefinition.name, input.fmeSegmentDefinition.environment.name])
}

excludes_high_priority_users {
	some i
	input.fmeSegmentDefinition.excludedSegments[i].name == "high_priority_users"
}
```

### Template policy samples

* [Enforce the use of stable templates in a pipeline](#enforce-the-use-of-stable-templates-in-a-pipeline)
* [Enforce an Approval step in a stage template](#enforce-an-approval-step-in-a-stage-template)
* [Enforce specific environments to be configured for a stage template](#enforce-specific-environments-to-be-configured-for-a-stage-template)
* [Enforce use of an approved stage template in a pipeline](#enforce-use-of-an-approved-stage-template-in-a-pipeline)
* [Enforce step templates to be used in a pipeline](#enforce-step-templates-to-be-used-in-a-pipeline)
* [Enforce the stage structure of a pipeline](#enforce-the-stage-structure-of-a-pipeline)
* [Enforce steps in a pipeline](#enforce-steps-in-a-pipeline)
* [Enforce step order in a pipeline](#enforce-step-order-in-a-pipeline)
* [Secret policy samples](#secret-policy-samples)


#### Enforce the use of stable templates in a pipeline

Enforce policies to ensure that the correct version of a template is used in the pipeline.

Here is a sample policy that can be applied using the `On Save` or `On Run` events for a pipeline:

```json
package pipeline

template := "my_template"
stableVersion := "1"

# Deny a pipeline if the stage uses the template above
# without the stable version stated
deny[msg] {
	stage = input.pipeline.stages[_].stage

	# Check if the stage matches but doesn't have a template
	stage.template.templateRef == template
	stage.template.versionLabel != stableVersion

	# Show a human-friendly error message
	msg = sprintf(
		"Stage %s, has template %s, with version %s, it should be version %s",
		[stage.name, template, stage.template.versionLabel, stableVersion],
	)
}

# Deny a pipeline if the step uses the template above
# without the stable version stated
deny[msg] {
	stage = input.pipeline.stages[_].stage
	step = stage.spec.execution.steps[_].step

	# Check if the stage matches but doesn't have a template
	step.template.templateRef == template
	step.template.versionLabel != stableVersion

	# Show a human-friendly error message
	msg = sprintf(
		"Step %s in stage %s, , has template %s, with version %, it should be version %s",
		[step.name, stage.name, template, stage.template.versionLabel, stableVersion],
	)
}
```

#### Enforce an Approval step in a stage template

Ensure that an Approval Step is configured in a stage template when a user is creating a template. Here is a sample policy that can be applied using the **On Save** event of a template.

```json
package template
# Deny template that don't have an approval step
# NOTE: Try removing the HarnessApproval step from your input to see the policy fail
deny[msg] {
    # Find all stages that are Deployments ...
    input.template.spec.stages[i].stage.type == "Deployment"
    # ... that are not in the set of stages with HarnessApproval steps
    not stages_with_approval[i]
    # Show a human-friendly error message
    msg := sprintf("deployment stage '%s' does not have a HarnessApproval step", [input.template.spec.stages[i].stage.name])
}
# Find the set of stages that contain a HarnessApproval step
stages_with_approval[i] {
    input.template.spec.stages[i].stage.spec.execution.steps[_].step.type == "HarnessApproval"
}
```

#### Enforce specific environments to be configured for a stage template

This policy enforces only allowed environments to be configured on a stage template at design time.

Here is a sample policy that can be applied using the **On Save** of a template.

```json
package template
# Deny pipeline template that do not use allowed environments
# NOTE: Try removing "test" from the 'allowed_environments' list to see the policy fail
deny[msg] {
    # Find all deployment stages
    stage = input.template.spec.stages[_].stage
    stage.type == "Deployment"
    # ... where the environment is not in the allow list
    not contains(allowed_environments, stage.spec.environment.infrastructureDefinitions[i].identifier)
    # Show a human-friendly error message
    msg := sprintf("deployment stage '%s' cannot be deployed to environment '%s'", [stage.spec.environment.infrastructureDefinitions[i].identifier])
}
# Deny pipeline templates if the environment is missing completely
deny[msg] {
    # Find all deployment stages
    stage = input.template.spec.stages[_].stage
    stage.type == "Deployment"
    # ... without an environment
    not stage.spec.environment.environmentRef
    # Show a human-friendly error message
    msg := sprintf("deployment stage '%s' has no environment identifier", [stage.name])
}
# Environments that can be used for deployment
allowed_environments = ["prod","stage"]
contains(arr, elem) {
    arr[_] = elem
}
```


#### Enforce use of an approved stage template in a pipeline

You can apply this sample policy using the **On Save** or **On Run** events for a pipeline:

```json
package pipeline

stageType := "Deployment"
template := "my_stage_template"

# Deny a pipeline if the stage type above does not
# have a template at all
deny[msg] {
	stage = input.pipeline.stages[_].stage

	# Check if the stage matches but doesn't have a template
	stage.type == stageType
	not stage.template

	# Show a human-friendly error message
	msg = sprintf("Stage %s has no template, it must use template %s", [stage.name, template])
}

# Deny a pipeline if the stage type above does not
# use the template and version required
deny[msg] {
	stage = input.pipeline.stages[_].stage

	# Check if the stage matches but the template ref
	# or version are not matching
	stage.type == stageType
	stage.template.templateRef != template

	# Show a human-friendly error message
	msg = sprintf("Stage %s uses the wrong template, it must use template %s", [stage.name, template])
}

```

#### Enforce step templates to be used in a pipeline

Enforce the usage of a step template in a pipeline. This ensures that correct and approved steps are used.

Here is a sample policy that can be applied using the **On Save** or **On Run** event for a pipeline:

```json
package pipeline

stepType := "Policy"
template := "my_template"

# Deny a pipeline if the step type above does not
# have a template at all
deny[msg] {
	stage = input.pipeline.stages[_].stage
	step = stage.spec.execution.steps[_].step

	# Check if the step matches but doesn't have a template
	step.type == stepType
	not step.template

	# Show a human-friendly error message
	msg = sprintf("In stage %s, step %s has no template, it must use template %s", [stage.name, step.name, template])
}

# Deny a pipeline if the step type above does not
# use the template and version required
deny[msg] {
	stage = input.pipeline.stages[_].stage
	step = stage.spec.execution.steps[_].step

	# Check if the step matches but the template ref
	# or version are not matching
	step.type == stepType
	step.template.templateRef != template

	# Show a human-friendly error message
	msg = sprintf("In stage %s, step %s uses the wrong template, it must use template %s", [stage.name, step.name, template])
}
```



#### Enforce the stage structure of a pipeline

Enforce policies to ensure pipelines are designed with a recommended or mandatory structure.

This ensures that pipeline designers have the freedom to design a pipeline while following the guardrails.

Here is a sample policy that can be applied using the **On Save** event for a pipeline:

```json
package pipeline

stage_order := ["OPA check", "deploy"]

# Deny a pipeline if stages do not execute in the
# correct order. This will check that the named stages
# in the array above are in the right order, ignoring
# other stages.
deny[msg] {
	# Run through the order rules array
	item = stage_order[i]
	prev = stage_order[i - 1]
	index = getIndex(item, input.pipeline.stages)
	prevIndex = getIndex(prev, input.pipeline.stages)

	# Makes sure the current rule is after the previous
	# rule in the step order
	index < prevIndex

	# Show a human-friendly error message
	msg = sprintf("Stage order is incorrect %s should be after %s", [item, prev])
}

getIndex(str, stages) = result {
	stage = input.pipeline.stages[i].stage
	str == stage.name
	result = i
}
```

#### Enforce steps in a pipeline

Enforce policies to ensure mandatory steps are configured in a pipeline.

Here is a sample policy that can be applied using the **On Save** or **On Run** event for a pipeline:

```json

package pipeline

# Deny pipelines that are missing required steps
# NOTE: Try adding "ShellScript" to the 'required_steps' list to see the policy fail
deny[msg] {
	# Find all stages ...
	stage = input.pipeline.stages[_].stage

	# ... that are deployments
	stage.type == "Deployment"

	# ... and create a list of all step types in use
	existing_steps := [s | s = stage.spec.execution.steps[_].step.type]

	# For each required step ...
	required_step := required_steps[_]

	# ... check if it's present in the existing steps
	not contains(existing_steps, required_step)

	# Show a human-friendly error message
	msg := sprintf("deployment stage '%s' is missing required step '%s'", [stage.name, existing_steps])
}

# Steps that must be present in every deployment
required_steps = ["JiraUpdate","HarnessApproval"]

contains(arr, elem) {
	arr[_] = elem
}
```

#### Enforce step order in a pipeline

Enforce policies for the ordering of steps that are configured in a pipeline.

Here is a sample policy that can be applied using the **On Save** or **On Run** event for a pipeline:

```json
package pipeline

step_order := ["Get version", "Run OPA policy"]

# Deny a pipeline if steps do not execute in the
# correct order, this will check the steps in every
# stage
deny[msg] {
	stage = input.pipeline.stages[_].stage

	# Run through the order rules array
	item = step_order[i]
	prev = step_order[i - 1]
	index = getIndex(item, stage)
	prevIndex = getIndex(prev, stage)

	# Makes sure the current rule is after the previous
	# rule in the step order
	index < prevIndex

	# Show a human-friendly error message
	msg = sprintf("Step order is incorrect %s should be after %s", [item, prev])
}


getIndex(str, stage) = result {
	item = stage.spec.execution.steps[i]
	str == item.step.name
	result = i
}
```

#### Enforce a step is used only in specific pipelines

The below policy can be applied on pipeline save or on pipeline run. Users can deny a step being used in a particular list of pipelines. In the below example, users can enforce the Jenkins step in a particular list of pipelines.

```TEXT
package pipeline

# Deny usage of jenkins steps outside named pipelines
deny[msg] {
  # Check the current pipeline is not in the named list
  not contains(jenkins_pipelines, input.pipeline.name)

  # Check if the pipeline contains a JenkinsBuild step
  step := input.pipeline.stages[_].stage.spec.execution.steps[_].step
  step.type == "JenkinsBuild"
  msg := sprintf("Pipeline '%s' with Jenkins connector is not permitted", [input.pipeline.name])
}

# Pipelines allowed to have a jenkins step
jenkins_pipelines = ["qa_pipeline","prod_pipeline"]

contains(arr, elem) {
	arr[_] = elem
}
```

### Secret policy samples

+ [Ensure there are no principals in the secret secrets.](#ensure-there-are-no-principals-in-the-secret-secrets)
+ [Enforce secret naming conventions](#enforce-secret-naming-conventions)
+ [Enforce what secrets manager can be used to save secrets.](#enforce-what-secrets-manager-can-be-used-to-save-secrets)

#### Ensure there are no principals in the secret secrets

Enforce policies to ensure that the secrets configured in Harness are configured by the correct [principal](/docs/platform/role-based-access-control/rbac-in-harness#rbac-components).

Here is a sample policy that can be applied using the **On Save** event for a secret:

```json
package secret

import future.keywords.in

# The identifiers for one or more principals allowed to save secrets
allowedPrincipals = ["1234abcd"]

deny["Principal is not allowed to save secrets"] {
	# If the principal is not in the allowed principals list, deny.
	not input.metadata.principalIdentifier in allowedPrincipals
}
```

#### Enforce secret naming conventions

Enforce policies to ensure that developers add secrets to Harness with a common naming standard. This makes it easy to identify and manage them.

Here is a sample policy that can be applied using the **On Save** event for a secret:

```json
package secrets

# Deny secrets whose names do not follow the correct naming convention
# e.g. "Lion - MongoDB Password" is allowed but "Cool secret" is not
# NOTE: Try setting the name to "Test" to see the policy fail
deny[msg] {
	not regex.match("[Cheetah|Tiger|Lion]\\s[-]\\s[a-zA-Z0-9\\s]+", input.secret.name)
	msg := sprintf("Secret name '%s' must follow the correct naming convention 'Team - Purpose'", [input.secret.name])
}
```

#### Enforce what secrets manager can be used to save secrets.

Enforce policies to store your secrets in a specific secrets manager.

Here is a sample policy that can be applied using the **On Save** event for a secret:


```json
package secrets

import future.keywords.in

# Choose one or more allowed providers based on there identifier
allowedProviders := ["harnessSecretManager"]

deny[msg] {
	# Check that the secret manager identifier exists in the white list
	not input.secret.spec.secretManagerIdentifier in allowedProviders
	msg := sprintf("Only %s are allowed as providers", [allowedProviders])
}
```

<!-- STO-6934 -->

### Security Test policy samples

import SecurityTestsPolicySamples from '/docs/security-testing-orchestration/use-sto/shared/security-tests-policy-samples.md';

<SecurityTestsPolicySamples />

