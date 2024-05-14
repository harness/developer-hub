---
title: Using pipeline variables
description: Learn how to use Harness pipeline variables in your Workspaces
sidebar_position: 10
---

Harness IaCM can use [Harness pipeline variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/) as Environment Variables or Terraform Variables within your Workspace.

1. Create a variable in your Harness pipeline and retrieve its Fully-Qualified Name (FQN).
2. Provide a Key for your Environment Variable or Terraform Variable in the Workspace definition.
3. Place the FQN in the "Value" field.
4. Run the pipeline.
5. The variables will be used in the same fashion as [Environment Variables](https://developer.hashicorp.com/terraform/cli/config/environment-variables) or [Terraform Variables](https://developer.hashicorp.com/terraform/language/values/variables) in your Terraform workflow.

This functionality can be useful for ephemeral workspaces that may need to change slightly depending on downstream needs such as demonstration or workshop resources.
