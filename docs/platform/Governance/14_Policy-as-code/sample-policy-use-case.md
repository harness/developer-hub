title: Sample Policies and Use Case Library
description: Common Policies and Use Cases
sidebar_position: 6
helpdocs_topic_id: xy8zsn8fa3
helpdocs_category_id: zoc8fpiifm
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the feature flag `OPA_PIPELINE_GOVERNANCE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature. Harness provides governance using Open Policy Agent (OPA), Policy Management, and Rego policies.

You can enforce policies in two ways:

* **Account, Org, and** **Project-specific:** you can create the policy and apply it to all Pipelines in your Account, Org, and Project. The policy is evaluated on Pipeline-level events like On Run and On Save. See [Harness Governance Quickstart](harness-governance-quickstart.md).
* **Stage-specific:** you can add a Policy step, add a new/existing Policy Set to it, and then provide a JSON payload to evaluate.
	+ The policy is evaluated whenever the Pipeline reaches the Policy step.
	+ Policy evaluation can be performed on data generated when the Pipeline is running, such as resolved expressions.
	+ Policy evaluation can fail Pipeline execution.

This topic describes how to add a Policy step to a Stage.

### Before you begin

* If you are new to Harness Governance, see [Harness Governance Overview](harness-governance-overview.md) and [Harness Governance Quickstart](harness-governance-quickstart.md).


### Policy Samples


#### Sample Connector Policies

**Use Case:** Enforcing an authorization type when configuring a Kubernetes Connector

The Below policy can be used to enforce a specific auth type, this prevents users from setting up connectors that may not be in compliance or standard with the guidelines set by the account owner. This policy can be executed `On Connector Save`. 

```TEXT
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

**Use Case:** Admins want to enforce which user's can select a specific connector for Pipeline Configuration and Pipeline Run time

The below policy can enforce which users and user group is allowed to use the connector for deployment, build, etc.

```TEXT
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

**Use Case:** Admins want to enforce the connector naming conventions when users add a new connector

This policy can be applied on `Connector Save`, this will enforce naming conventions for connectors created in the Harness Account

```TEXT
package connectors

# Deny connectors whose names do not follow the correct naming convention
# e.g. "Lion - Data Store" is allowed but "Cool connector" is not
# NOTE: Try setting the name to "Test" to see the policy fail
deny[msg] {
	not regex.match("[Cheetah|Tiger|Lion]\\s[-]\\s[a-zA-Z0-9\\s]+", input.entity.name)
	msg := sprintf("Connector name '%s' must follow the correct naming convention 'Team - Account'", [input.entity.name])
}
```

#### Pipeline Enforcement Policies

**Use Case:** Admins want to prevent other developers from deploying into a non-compliant environment.

The below policy enforces `On Pipeline Run`. User's can enforce policies on which environment the developer can deploy to.

```TEXT
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

**Use Case:** Enforcing the container registry selected for building and publishing code

Admin's want to restrict and prevent users from publishing images to public repos, only approve repos can be used. Below policy can be executed `On Pipeline Run`

```TEXT
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

**Use Case:** Enforcing a Deployment Freeze via Policy

Admin's may configure a deployment freeze via Policy to supplement the formal deployment freeze feature. The policy route is great for one off freezes that are set by the business. This policy is set on `Pipeline Run`

```TEXT
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


#### Feature Flag Policies

**Use Case:** Prevent feature flags from being enabled in production that are not configured in a lower environment like stage

This policy can be enforced on Feature Flags. It can ensure the configuration of the Flag is properly governed by the end user.

```TEXT
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


#### Template Policies

**Use Case:** Enforce the use of stable templates in a pipeline

This policy enforces the correct version of a template is used in the pipeline. It can be applied `On Pipeline Save` or `On Pipeline Run` 

```TEXT
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


**Use Case:** Enforce a Stage templates use in a Pipeline

Users may want to enforce an approved stage template in a pipeline. This policy can be executed `On Pipeline Save` or `On Pipelne Run`.

```TEXT
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

**Use Case:** Enforce step templates to be used in a pipeline

Users can enforce the step template being used in a Pipeline. It ensures the correct steps and approved steps are leveraged `On Pipeline Save` or  `On Pipeline Run`.

```TEXT
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




