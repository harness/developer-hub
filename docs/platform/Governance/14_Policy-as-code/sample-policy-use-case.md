---
title: Policy samples
description: See sample policies and when to use them.
sidebar_position: 6
---

:::important
Currently, this feature is behind the feature flag `OPA_PIPELINE_GOVERNANCE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

Harness provides governance using Open Policy Agent (OPA), policy management, and Rego policies.
You can enforce policies in the following ways:

* **Enforce policies at a scope:** Create a policy and apply it to all pipelines in your account, organization, and project. 

  Policy evaluation occurs on pipeline-level events like **On Run** and **On Save**.
For more information, go to [Harness Policy As Code quickstart](/docs/platform/Governance/Policy-as-code/harness-governance-quickstart).

* **Enforce policies at any stage:** Create a policy step and include a policy set and JSON payload to evaluate. 

  When the pipeline reaches the policy step, policy evaluation occurs. Data such as resolved expressions can be evaluated when the pipeline runs.

For information about how to add a policy step to a stage, go to [Add a policy step to a pipeline](/docs/platform/Governance/Policy-as-code/add-a-governance-policy-step-to-a-pipeline).

This topic provides sample policies you can use in policy steps and on pipeline-level events like **On Run** and **On Save**.

<!-- https://ecotrust-canada.github.io/markdown-toc/ -->

- [Policy samples](#policy-samples)
  * [Connector policy samples](#connector-policy-samples)
    + [Enforce authorization type while configuring a Kubernetes connector](#enforce-authorization-type-while-configuring-a-kubernetes-connector)
    + [Enforce access control for a specific connector at runtime while configuring the pipeline](#enforce-access-control-for-a-specific-connector-at-runtime-while-configuring-the-pipeline)
    + [Enforce the connector naming conventions when users add a new connector](#enforce-the-connector-naming-conventions-when-users-add-a-new-connector)
  * [Pipeline enforcement policy samples](#pipeline-enforcement-policy-samples)
    + [Prevent other developers from deploying into a non-compliant environment](#prevent-other-developers-from-deploying-into-a-non-compliant-environment)
    + [Enforce the container registry selected for building and publishing code](#enforce-the-container-registry-selected-for-building-and-publishing-code)
    + [Prevent users from leveraging steps that are not allowed by the company](#prevent-users-from-leveraging-steps-that-are-not-allowed-by-the-company)
    + [Enforce a deployment freeze via policy](#enforce-a-deployment-freeze-via-policy)
    + [Enforce remote pipeline execution from the default branch only if the user is not part of a specific user group](#enforce-remote-pipeline-execution-from-the-default-branch-only-if-the-user-is-not-part-of-a-specific-user-group)
  * [Feature Flag policies](#feature-flag-policies)
    + [Prevent feature flags from being enabled in a production environment that are not configured in a stage environment](#prevent-feature-flags-from-being-enabled-in-a-production-environment-that-are-not-configured-in-a-stage-environment)
    + [Enforce the flag types that are configured for feature flags](#enforce-the-flag-types-that-are-configured-for-feature-flags)
    + [Deny the creation of feature flags that serve true by default](#deny-the-creation-of-feature-flags-that-serve-true-by-default)
    + [Users want to enforce naming conventions for their feature flags](#users-want-to-enforce-naming-conventions-for-their-feature-flags)
  * [Template policy samples](#template-policy-samples)
    + [Enforce the use of stable templates in a pipeline](#enforce-the-use-of-stable-templates-in-a-pipeline)
    + [Enforce an Approval step in a stage template](#enforce-an-approval-step-in-a-stage-template)
    + [Enforce specific environments to be configured for a stage template](#enforce-specific-environments-to-be-configured-for-a-stage-template)
    + [Enforce use of an approved stage template in a pipeline](#enforce-use-of-an-approved-stage-template-in-a-pipeline)
    + [Enforce step templates to be used in a pipeline](#enforce-step-templates-to-be-used-in-a-pipeline)
    + [Enforce the stage structure of a pipeline](#enforce-the-stage-structure-of-a-pipeline)
    + [Enforce steps in a pipeline](#enforce-steps-in-a-pipeline)
    + [Enforce step order in a pipeline](#enforce-step-order-in-a-pipeline)
  * [Secret policy samples](#secret-policy-samples)
    + [Ensure there are no principals in the secret secrets](#ensure-there-are-no-principals-in-the-secret-secrets)
    + [Enforce secret naming conventions](#enforce-secret-naming-conventions)
    + [Enforce what secrets manager can be used to save secrets.](#enforce-what-secrets-manager-can-be-used-to-save-secrets)

## Policy samples


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
# Choose one or more user groups, identified by the "indentifier" property
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

Administrators can configure a deployment freeze via policy to supplement the [deployment freeze](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-freeze) feature. The policy is great for one-off freezes as opposed to recurring freezes. 

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


### Feature Flag policies

* [Prevent feature flags from being enabled in a production environment that are not configured in a stage environment](#prevent-feature-flags-from-being-enabled-in-a-production-environment-that-are-not-configured-in-a-stage-environment)
* [Enforce the flag types that are configured for Feature Flags](#enforce-the-flag-types-that-are-configured-for-feature-flags)
* [Deny the creation of Feature Flags that serve true by default](#deny-the-creation-of-feature-flags-that-serve-true-by-default)
* [Users want to enforce naming conventions for their Feature flags](#users-want-to-enforce-naming-conventions-for-their-feature-flags)

#### Prevent feature flags from being enabled in a production environment that are not configured in a stage environment

Enforce a policy on Feature Flags to ensure the configuration of the flag is properly governed by the end user.

Here is a sample policy to do this:

```json
package feature_flags

# Deny flags that are enabled in "production" but not in "stage"
# NOTE: Try changing the "production" stage to be on to see the policy fail
deny[msg] {
	# Match flags where the "production" environment is on ...
	prod := input.flag.envProperties[_]
	prod.environment == "production"
	prod.state == "on"

	# ... and the "stage" environment is off
	stage := input.flag.envProperties[_]
	stage.environment == "stage"
	stage.state == "off"

	# Show a human-friendly error message
	msg := sprintf(`Flag '%s' cannot be enabled in "production" because it is disabled in "stage"`, [input.flag.name])
}
```

####  Enforce the flag types that are configured for Feature Flags

Enforce policies to configure Feature Flags with a boolean value. 
Here is a sample policy to do this, which can be applied using the **On Creation** events for a Feature Flag:

```json
package feature_flags

# Deny flags that aren't "boolean"
# NOTE: Try adding changing the flag 'kind' to see the policy fail
deny[msg] {
	input.flag.kind != "boolean"
	msg := sprintf(`Flag '%s' isn't of type "boolean"`, [input.flag.name])
}
```

#### Deny the creation of Feature Flags that serve true by default

Enforce policies to prevent users from configuring flags and serving true to all the end users of the flag. It allows for a safer rollout of the flag. 
Here is a sample policy to do this, which can be applied on feature flag configuration:

```json
package feature_flags

# Deny flags that serve true by default when turned off to prevent accidentally enabling the flag
# NOTE: Try setting the 'defaultOnVariation' to true to see the policy fail
deny[msg] {
	input.flag.defaultOnVariation != "false"
	msg := sprintf("Flag '%s' does not have default 'on' value of false", [input.flag.name])
}

# Deny flags that serve true by default when turned on to prevent accidentally enabling the flag
# NOTE: Try setting the 'defaultOffVariation' to true to see the policy fail
deny[msg] {
	input.flag.defaultOffVariation != "false"
	msg := sprintf("Flag '%s' does not have default 'off' value of false", [input.flag.name])
}
```

#### Users want to enforce naming conventions for their Feature flags

Establish policies to ensure no one falls outside the proper naming convention for internal flags when naming Feature Flags. 
Here is a sample policy to do this, which can be applied using the **On Save** event for the Feature Flag:

```json
package feature_flags

# Deny flags whose names do not contain a validly formatted Jira ticket number
# e.g. "FFM-123" is allowed but "Cool flag" is not
# NOTE: Try setting the name to "Test" to see the policy fail
deny[msg] {
	not regex.match("[FFM|OPA|CI|CD]+[-][1-9][0-9]?", input.flag.name)
	msg := sprintf("Flag name '%s' doesn't contain a Jira ticket number", [input.flag.name])
}
```

### Template policy samples

+ [Enforce the use of stable templates in a pipeline](#enforce-the-use-of-stable-templates-in-a-pipeline)
+ [Enforce an Approval step in a stage template](#enforce-an-approval-step-in-a-stage-template)
+ [Enforce specific environments to be configured for a stage template](#enforce-specific-environments-to-be-configured-for-a-stage-template)
+ [Enforce use of an approved stage template in a pipeline](#enforce-use-of-an-approved-stage-template-in-a-pipeline)
+ [Enforce step templates to be used in a pipeline](#enforce-step-templates-to-be-used-in-a-pipeline)
+ [Enforce the stage structure of a pipeline](#enforce-the-stage-structure-of-a-pipeline)
+ [Enforce steps in a pipeline](#enforce-steps-in-a-pipeline)
+ [Enforce step order in a pipeline](#enforce-step-order-in-a-pipeline)
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

ppackage pipeline

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

Enforce policies to ensure that the secrets configured in Harness are configured by the correct [principal](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#principal). 

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

