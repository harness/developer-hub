---
title: Use OPA for IaC governance 
description: Learn how to use OPA to add security and governance to your IaCM pipeline
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info
Open Policy Agent (OPA) serves as the embedded policy engine within the Harness platform. Go to [Harness governance overview](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview/) for more information.
:::

Using OPA in your Infrastructure as Code Management (IaCM) workspace gives you control over what infrastructure changes are made, for example, to add restrictions such as ensuring that a server instance is under a specified size, or that the estimated cost of a proposed change does not exceed a certain amount.

Harness IaCM allows you to use OPA on the entities that are described in the table below:

| Type/Entity | Event/Action |  Description |
| ----------- | -----------  | -------------|  
| Workspace   | On save      | This policy will be evaluated whenever there is a configuration change in a workspace (for example Terraform version, repository details, the value of a variable is updated, etc) |
| Terraform Plan   | After Terraform Plan     | This policy will be evaluated whenever a `Terraform plan` operation is performed in the IaCM stage (for example plan step, apply/destroy step, etc.). The policy will be evaluated against the Plan schema |
| Terraform State   | After Terraform Plan | This policy will be evaluated after a `Terraform plan` operation is performed in the IaCM stage, against the state file. You can use this event to validate policy on resources, **before** applying any changes.   |
| Terraform State   | After Terraform Apply  | This policy will be evaluated after a `Terraform apply` operation is performed in the IaCM stage, against the state file. You can use this event to validate policy on resources, **after** applying any changes. |


Follow these steps to enforce governance using OPA:
1. Create the policies you would like to enforce
2. Create a policy set and configure it to work against the right entity and operation

The OPA policies will work against the standard schema of the Terraform plan and state. 

## Writing policies against Workspace

The following attributes are available to access and write policies against

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

## OPA Policy examples

### Workspace policies

To write policies against the Workspace, please use the following Workspace example:

Some examples include the following:
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

You can use OPA to enforce policies at the terraform plan or state level, for example:
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