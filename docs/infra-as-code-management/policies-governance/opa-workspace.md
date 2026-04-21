---
title: OPA Policies
sidebar_label: OPA Policies
description: Learn how to use OPA to add security and governance to your IaCM pipeline
sidebar_position: 50
keywords:
  - opa
  - policy
  - governance
  - terraform
  - iacm
  - open policy agent
  - rego
tags:
  - iacm
  - governance
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Open Policy Agent (OPA) is an embedded policy engine within Harness that enforces governance rules across your infrastructure deployments. It evaluates policies written in Rego against your infrastructure configurations at different points in the deployment lifecycle, preventing misconfigurations before they reach production.

In Harness IaCM, OPA policies can evaluate workspace configurations, Terraform plans, and Terraform state files. This automated enforcement prevents manual review bottlenecks and catches violations early. You can restrict instance sizes, require specific tags, limit costs, or ensure only approved connectors and repositories are used.

:::info
Go to [Harness governance overview](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview) to learn about policy enforcement across the Harness platform.
:::

## What you will learn

- **Policy entity types:** The three types of entities (Workspace, Terraform Plan, Terraform State) that OPA can evaluate, and when each type is triggered during pipeline execution.
- **Policy triggering behavior:** How Harness automatically evaluates policy sets based on entity type, and why some policies require no step-level configuration.
- **Workspace schema structure:** The attributes available for writing policies against workspace configurations, including connectors, provisioners, and variables.
- **Policy examples:** Common policy patterns for enforcing version requirements, connector restrictions, repository allowlists, resource tagging, and cost limits.

:::info Prerequisites
This guide assumes familiarity with OPA and Rego policy language basics. Go to [OPA documentation](https://www.openpolicyagent.org/docs/latest/) to learn about policy syntax and evaluation. You can create policies and policy sets at the account, organization, or project level. Go to **Account Settings**, **Organization Settings**, or **Project Settings**, then select **Policies**.
:::

## Policy entity types

Harness IaCM allows you to use OPA on the entities that are described in the table below:

| Type/Entity | Event/Action |  Description |
| ----------- | -----------  | -------------|  
| Workspace   | On save      | This policy will be evaluated whenever there is a configuration change in a workspace (for example Terraform version, repository details, the value of a variable is updated, etc) |
| Terraform Plan   | After Terraform Plan     | This policy will be evaluated whenever a `Terraform plan` operation is performed in the IaCM stage (for example plan step, apply/destroy step, etc.). The policy will be evaluated against the Plan schema |
| Terraform State   | After Terraform Plan | This policy will be evaluated after a `Terraform plan` operation is performed in the IaCM stage, against the state file. You can use this event to validate policy on resources, **before** applying any changes.   |
| Terraform State   | After Terraform Apply  | This policy will be evaluated after a `Terraform apply` operation is performed in the IaCM stage, against the state file. You can use this event to validate policy on resources, **after** applying any changes. |

OPA policies work against the standard schema of the Terraform plan and state files, giving you access to all resource attributes, configurations, and metadata.

## How policy sets are triggered

The entity type you select when creating a policy set determines both the input passed to the policy and how the policy set is triggered during pipeline execution.

**Workspace** policy sets are triggered when a workspace configuration is saved. You manage them through the workspace settings, not the pipeline step.

**Terraform Plan and Terraform State** policy sets are triggered **automatically** when the corresponding IaCM pipeline operation runs. You do not attach them in the plan or apply step's policy configuration UI. After you create a policy set with entity type **Terraform Plan** or **Terraform State**, Harness evaluates it against every matching plan or apply operation in your IaCM pipelines without any additional step-level configuration.

When a policy evaluation finds a violation (the `deny` rule is triggered), the outcome depends on the severity you assign to that policy in the policy set:

- **Error and exit:** the pipeline step fails and shows the violation message. The step does not succeed until you fix the violation or update the policy.
- **Warn & continue:** Harness shows a warning with the violation message and the pipeline continues.

:::warning Use the correct entity type for plan enforcement

If you attach a policy set to a plan step using the step's policy configuration UI and that policy set has an entity type other than **Terraform Plan** (for example, **Custom**), the plan step does not pass the Terraform plan JSON as input to the policy. The policy evaluates only the JSON supplied for that step's policy configuration, which is typically not the Terraform plan, so the policy can pass even when the plan violates the policy rules. Go to [Add a Governance Policy Step to a Pipeline](/docs/platform/governance/policy-as-code/add-a-governance-policy-step-to-a-pipeline#step-4-add-payload) to read how evaluation JSON is supplied through the **Payload** field on a **Policy** step.

To enforce tag requirements, cost limits, or any plan-based conditions:

1. Create a policy set with entity type **Terraform Plan**.
2. Do not look for this policy set in the plan step's policy configuration dropdown. It will not appear there. This is expected behavior.
3. Run the pipeline. Harness evaluates the policy set automatically against the Terraform plan JSON after the plan step completes.

:::

:::tip Verify policy evaluation input

To confirm that your policy is receiving the correct input, go to **Account Settings**, **Organization Settings**, or **Project Settings**, then open **Policies > Policy Sets**, open the policy set, and select **Evaluations**. Each evaluation entry shows the exact input payload passed to the policy.

:::


## Workspace attribute reference

The following attributes are available when writing policies against workspace configurations. Access these in your Rego policies via the `input.workspace` object (for example, `input.workspace.provisioner_version`).

**Attributes:**

- **account**: The account identifier of the workspace.  
- **org**: The org identifier of workspace.  
- **project**: The project identifier of the workspace.  
- **created**: Created timestamp.  
- **updated**: Updated timestamp.  
- **description**: Workspace description.  
- **name**: Name of the workspace.  
- **provider_connector**: The connector for the infrastructure provider. The exact attributes within this object change depending on the type of connector.  
- **provisioner**: The provisioner (terraform).  
- **provisioner_version**: The provisioner version.  
- **repository**: The repository from which Harness pulls the IAC.  
- **repository_commit**: The commit or tag Harness pulls from the IAC code. Should be null if repository_branch is specified.  
- **repository_branch**: The branch from which Harness pulls from the IAC code. Should be null if repository_commit is specified.  
- **repository_connector**: The connector used to pull the IAC. The exact attributes within this object change depending on the type of connector.  
- **status**: The workspace status.  
- **environment_variables**: A map of the environment variables.  
- **terraform_variables**: A map of the terraform variables.  

## OPA policy examples

### Workspace policies

The following examples demonstrate common policy patterns for workspace governance. Each policy evaluates the workspace schema shown in the first tab and denies configurations that violate the specified rules.

Common workspace policy use cases include:
- Ensure Terraform version is greater than a specific version.
- Ensure specific connectors are used.
- Ensure specific repositories are used (only corporate ones and not public).


<Tabs>
  <TabItem value="Workspace definition">
    ```
      "workspace": {
        "account": "25NKDX79QPC-YTyninmxRQ",
        "created": 1697100955404,
        "description": null,
        "environment_variables": {
          "k1": {
            "created": 1697713865939,
            "key": "k1",
            "updated": 1697713865939,
            "value": "v1",
            "value_type": "string"
          },
          "k2": {
            "created": 1697713924023,
            "key": "k2",
            "updated": 1697713924023,
            "value": "v2",
            "value_type": "string"
          }
        },
        "identifier": "fewfe",
        "name": "fewfe",
        "org": "default",
        "project": "OPA",
        "provider_connector": {
          "description": "",
          "identifier": "aws",
          "name": "aws-shared",
          "orgIdentifier": "",
          "projectIdentifier": "",
          "spec": {
            "awsSdkClientBackOffStrategyOverride": null,
            "credential": {
              "crossAccountAccess": null,
              "region": "us-east-1",
              "spec": {
                "accessKey": "someaccesskey",
                "accessKeyRef": null,
                "secretKeyRef": "account.Key"
              },
              "type": "ManualConfig"
            },
            "delegateSelectors": [],
            "executeOnDelegate": false
          },
          "type": "Aws"
        },
        "provisioner": "terraform",
        "provisioner_version": "1.5.6",
        "repository": "",
        "repository_commit": "1",
        "repository_connector": {
          "description": "",
          "identifier": "testrepo",
          "name": "testrepo",
          "orgIdentifier": "default",
          "projectIdentifier": "",
          "spec": {
            "apiAccess": {
              "spec": {
                "tokenRef": "account.PAT"
              },
              "type": "Token"
            },
            "authentication": {
              "spec": {
                "spec": {
                  "tokenRef": "account.PAT",
                  "username": "somedev-harness",
                  "usernameRef": null
                },
                "type": "UsernameToken"
              },
              "type": "Http"
            },
            "delegateSelectors": [],
            "executeOnDelegate": false,
            "type": "Repo",
            "url": "https://github.com/repo",
            "validationRepo": null
          },
          "type": "Github"
        },
        "status": "inactive",
        "updated": 1697713924023
      }
    ```
  </TabItem>
  <TabItem value="Terraform version" default>
    This policy denies workspaces using Terraform provisioner with a version less than 1.5.4.
    
    ```
      package workspaces

      # deny
      deny[msg] {
        # if the provisioner is terraform
        input.workspace.provisioner == "terraform"
        # and the version is greater than 1.5.4
        semver.compare(input.workspace.provisioner_version, "1.5.4") == -1
        msg := sprintf("the version was %s but the policy specifies > 1.5.4", [input.workspace.provisioner_version])
      }
    ```
  </TabItem>
  <TabItem value="Specify connectors">
    This policy denies workspaces using a repository connector with an identifier not equal to "githubtest".

    ```
      package workspaces
      # deny
      deny[msg] {
        # if the connector identifier does not equal githubtest
        input.workspace.repository_connector.identifier != "githubtest"
        msg := sprintf("the connector was %s but the policy specifies githubtest", [input.workspace.repository_connector.identifier]) 
      }
    ```
  </TabItem>
  <TabItem value="Specify a repository">
    This policy denies workspaces using a GitHub repository connector not belonging to the "your-org" organization.

    ```
      package workspaces

      # deny
      deny[msg] {
        # if the connector type is github
        input.workspace.repository_connector.type == "Github"
        # and the specified repository url is not in the your-org organization 
        splitUrl := split(input.workspace.repository_connector.spec.url, "/")
        splitUrl[3] != "your-org" 
        # msg
        msg := sprintf("the github org was %s but the policy specifies your-org", [splitUrl[3]])
        }
    ```
  </TabItem>
</Tabs>


### Terraform plan and state policies

When you create a policy set with entity type **Terraform Plan** or **Terraform State**, Harness automatically evaluates it after each plan or apply operation. You do not need to reference the policy set anywhere in the pipeline step configuration.

Terraform plan policies access the plan JSON via `input.planned_values` and `input.resource_changes`. State policies access the state file via `input.resources`. Go to [Terraform JSON format documentation](https://developer.hashicorp.com/terraform/internals/json-format) to understand the full schema structure.

You can use OPA to enforce policies at the Terraform plan or state level, for example:
- Define the list of allowed AMIs
- Define the list of allowed instance types
- Define tags that must be present in all instances
- Deny any plan or state that makes use of an AMI outside of the allowed list
- Deny any plan or state that makes use of an instance type outside of the allowed list
- Deny any plan or state that makes specified instances that are missing any of the required tags

<Tabs>
  <TabItem value="Terraform plan policies">
    ```
    package terraform_plan

    # DEFINE THE LIST OF ALLOWED AMIs
    # NOTE Try changing the allowed AMIs to see the policy fail
    allowed_amis = ["ami-0aa7d40eeae50c9a9"]

    # DEFINE THE LIST OF ALLOWED INSTANCE TYPES
    # NOTE Try changing the allowed instance types to see the policy fail
    allowed_instance_types = ["t2.nano", "t2.micro"]

    # DEFINE TAGS THAT MUST BE PRESENT IN ALL INSTANCES
    # NOTE Try changing the required tags to see the policy fail
    required_tags = ["Name", "Team"]

    # DENY ANY PLAN THAT MAKES USE OF AN AMI OUTSIDE OF THE ALLOWED LIST
    deny[sprintf("%s: ami %s is not allowed", [r.address, r.values.ami])] {
      r = input.planned_values.root_module.resources[_]
      r.type == "aws_instance"
      not contains(allowed_amis, r.values.ami)
    }

    # DENY ANY PLAN THAT MAKES USE OF AN INSTANCE TYPE OUTSIDE OF THE ALLOWED LIST
    deny[sprintf("%s: instance type %s is not allowed", [r.address, r.values.instance_type])] {
      r = input.planned_values.root_module.resources[_]
      r.type == "aws_instance"
      not contains(allowed_instance_types, r.values.instance_type)
    }

    # DENY ANY PLAN THAT MAKES SPECIFIED INSTANCES THAT ARE MISSING ANY OF THE REQUIRED TAGS
    deny[sprintf("%s: missing required tag '%s'", [r.address, required_tag])] {
      r = input.planned_values.root_module.resources[_]
      r.type == "aws_instance"
      existing_tags := [key | r.values.tags[key]]
      required_tag := required_tags[_]
      not contains(existing_tags, required_tag)
    }

    contains(arr, elem) {
      arr[_] = elem
    }
    ```
  </TabItem>
  <TabItem value="Terraform state policies">
    ```
    package terraform_state

    # DEFINE THE LIST OF ALLOWED AMIs
    # NOTE Try changing the allowed AMIs to see the policy fail
    allowed_amis = ["ami-0aa7d40eeae50c9a9"]

    # DEFINE THE LIST OF ALLOWED INSTANCE TYPES
    # NOTE Try changing the allowed instance types to see the policy fail
    allowed_instance_types = ["t2.nano", "t2.micro"]

    # DEFINE TAGS THAT MUST BE PRESENT IN ALL INSTANCES
    # NOTE Try changing the required tags to see the policy fail
    required_tags = ["Name", "Team"]

    # DENY ANY STATE THAT MAKES USE OF AN AMI OUTSIDE OF THE ALLOWED LIST
    deny[sprintf("%s: ami %s is not allowed", [attributes.id, attributes.ami])] {
      attributes = input.resources[_].instances[_].attributes
      not contains(allowed_amis, attributes.ami)
    }

    # DENY ANY STATE THAT MAKES USE OF AN INSTANCE TYPE OUTSIDE OF THE ALLOWED LIST
    deny[sprintf("%s: instance type %s is not allowed", [attributes.id, attributes.instance_type])] {
      attributes = input.resources[_].instances[_].attributes
      not contains(allowed_instance_types, attributes.instance_type)
    }

    # DENY ANY STATE THAT MAKES SPECIFIED INSTANCES THAT ARE MISSING ANY OF THE REQUIRED TAGS
    deny[sprintf("%s: missing required tag '%s'", [attributes.id, required_tag])] {
      attributes = input.resources[_].instances[_].attributes
      existing_tags := [key | attributes.tags[key]]
      required_tag := required_tags[_]
      not contains(existing_tags, required_tag)
    }

    contains(arr, elem) {
      arr[_] = elem
    }
    ```
  </TabItem>
</Tabs>

## Next steps

Now that you understand OPA policy evaluation in IaCM, explore related governance and workspace management topics:

- [Create policies and policy sets](/docs/platform/governance/policy-as-code/harness-governance-overview): Learn how to create policies and policy sets in the Harness UI
- [Create and manage workspaces](/docs/infra-as-code-management/workspaces/create-workspace): Understand how workspace configuration changes trigger policy evaluation
- [IaCM default pipelines](/docs/infra-as-code-management/pipelines/default-pipelines): Learn how policies integrate with IaCM plan and apply pipeline stages
- [Terraform plan and state JSON structure](https://developer.hashicorp.com/terraform/internals/json-format): Reference for writing policies against Terraform plan and state schemas