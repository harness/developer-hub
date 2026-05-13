---
title: Specify Terraform variables
description: Learn how to specify Terraform variables or fetch variable files in Terraform steps
sidebar_label: Specify Variables
sidebar_position: 7
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

This guide shows you how to configure Terraform variable files in your pipeline's Terraform steps. You can specify inline variables or connect to remote file stores to manage configuration separately from your code.

---

## What will you learn?

- **Inline variables:** Add variables directly in the step configuration for simple, static values.
- **Remote variable files:** Connect to Git repositories to fetch `.tfvars` files managed in version control.
- **Optional file handling:** Mark files as optional so Harness ignores missing files and continues execution.

---

## Before you begin

- **Harness account with CD module enabled:** You need the Continuous Delivery module available in your Harness account. Go to [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide) to access or create a Harness account.

    :::info Contact Harness support

    If the CD module does not appear, go to [Get started with CD](/docs/continuous-delivery/get-started/key-concepts) or contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Pipeline permissions:** You need **View**, **Create/Edit**, and **Execute** permissions for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). An administrator must assign you a role that includes these permissions. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to configure roles.
- **Existing pipeline with Terraform step:** You need a pipeline with a Terraform Apply, Terraform Plan, or Terraform Destroy step. Go to [Terraform provisioning with Harness](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness) to create a Terraform provisioning pipeline.
- **Terraform variable knowledge:** You should understand Terraform variable syntax and `.tfvars` file format. Go to [Terraform input types and values](https://www.terraform.io/docs/language/expressions/types.html) to understand supported variable types. Harness supports all Terraform input types.

---

## Specify Terraform variable files

In the **Optional Configuration** > **Terraform Var Files (optional)** section of the Terraform Apply, Terraform Plan, and Terraform Destroy steps, you can add inline variables or connect to remote file stores. Each entry can represent inline variables or a connection to a remote Git repository.

When you mark remote files as optional, Harness fetches any files that exist at runtime and ignores any files that do not exist. The step continues to execute even if some files are missing.

:::tip When to use inline vs remote variables

Use **inline variables** for simple, non-sensitive values that rarely change and are specific to one pipeline. Use **remote variable files** for configuration managed in version control, variables shared across multiple pipelines, or when you need to track changes to variable definitions.

:::

### Add inline variables

Follow these steps to add inline Terraform variables directly in the step configuration.

:::tip 

In some fields in this procedure, you can specify a fixed value, expression, or runtime input. Go to [Fixed values, runtime inputs, and expressions](/docs/platform/variables-and-expressions/runtime-inputs) to understand value types and how to identify fields that offer this functionality.

:::

1. On the **Visual** tab of **Pipeline Studio** (Harness's visual pipeline editor), select the step at which you want to configure Terraform variables.

2. In the step configuration pane that appears, expand **Optional Configuration**.

3. In **Terraform Var Files (optional)**, select **+ Add**, and then select **Add Inline**.

4. In **Identifier**, specify an identifier for the variable file.

   You can reference variables by using the identifier in Harness expressions. For example, if the identifier is `myvars`, you could refer to its content as follows:

   `<+pipeline.stages.MyStage.spec.infrastructure.infrastructureDefinition.provisioner.steps.plan.spec.configuration.varFiles.myvars.spec.content>`

   Go to [Use Harness expressions](/docs/platform/variables-and-expressions/harness-variables) to learn how to reference values in pipelines.

5. In **Content**, provide the input variables and values for your Terraform script. Harness follows the same format as Terraform.

   For example, suppose that your Terraform script has the following variable definition:

   ```hcl
   variable "region" {  
   type = string  
   }
   ```

   In **Content**, you could enter the following:

   ```hcl
   region = "asia-east1-a"
   ```

   If you are entering secrets (for example, credentials), use Harness secret references in the value of the variable:

   ```hcl
   secrets_encryption_kms_key = "<+secrets.getValue("org.kms_key")>"
   ```
   Go to [Add Text Secrets](/docs/platform/secrets/add-use-text-secrets) to learn how to create and reference secrets in Harness.

6. Select **Submit**. The inline variable entry is created.

### Add remote variable files

Follow these steps to specify variable files available in remote Git repositories.

1. On the **Visual** tab of **Pipeline Studio**, select the step at which you want Harness to download Terraform variable files.

2. In the step configuration pane that appears, expand **Optional Configuration**.

3. In **Terraform Var Files (optional)**, select **+ Add**, and then select **Add Remote**.

   The **Remote File** wizard is displayed.

4. On the **Specify Terraform Var File Store** page of the **Remote File** wizard, do the following:

   - From the list of file stores shown, select the file store that contains the Terraform variable files.

   - Click in the connector field, select a connector in the dialog that is displayed, and then select **Apply Selected**. 
   
     Alternately, select the button for creating a connector. Go to [Code repo connectors](/docs/category/code-repo-connectors) to create a connector for GitHub, GitLab, Bitbucket, or Azure Repos.

5. Select **Continue**.

6. On the **Var File Details** page, do the following:
 
   - In **Identifier**, enter an identifier for the remote file store entry. 

     You can use the identifier to refer to variables using Harness expressions. For example, if the identifier is `myremotevars`, you could refer to its content as follows:

     `<+pipeline.stages.MyStage.spec.infrastructure.infrastructureDefinition.provisioner.steps.plan.spec.configuration.varFiles.myremotevars.spec.store.spec.paths>`

     Go to [Use Harness expressions](/docs/platform/variables-and-expressions/harness-variables) to learn how to reference values in pipelines.

   - In **Repo Name**, specify the name of the repository in `organization/repository` format (for example, `harness/terraform-configs`).

   - In **Git Fetch Type**, specify what you want Harness to fetch, and then enter the branch name, commit ID, or Git tag in the next field:

     - **Latest from Branch:** Fetch the latest versions of the files. Use this for active development where you want the most recent variable definitions.
     - **Specific Commit Id/Git Tag:** Fetch a specific commit ID or Git tag. Use this for reproducible production deployments where you need consistent variable values.

   - In **File Paths**, add one or more file paths from the root of the repository to the variable file. Select **+ Add File Path** to add more file paths.

   - Select **Optional** if you want Harness to ignore any files that do not exist at run time. Harness downloads available files and does not fail the step on account of missing files. If all files are missing, the step continues with no variable files loaded.

7. Select **Submit**. The entry is created.

:::info Variable precedence

When you specify multiple variable files, Terraform applies them in the order listed. Later files override earlier files if they define the same variable. This follows standard Terraform variable precedence rules.

:::

### Configure using YAML

The following lines illustrate the YAML configuration for the Terraform variable files section:

```yaml
                      varFiles:
                        - varFile:
                            type: Remote
                            identifier: optional_var_files_123
                            spec:
                              optional: true
                              store:
                                type: Github
                                spec:
                                  gitFetchType: Branch
                                  repoName: "organization/repository"
                                  branch: main
                                  paths:
                                    - terraform/localresource/localresourcevars/localresource.tfvars
                                    - inexistentaasd123a.tvfars
                                    - iasd13sadfsa6757.tfvars
                                  connectorRef: vlicaprerequisites
```

### View execution logs

At execution time, Harness logs the `.tfvars` files that were found and fetched. You can verify which files were successfully loaded in the step execution logs. The variables appear in the Terraform Plan output.

The following lines illustrate these logs:

```
Starting Git Fetch Files

Fetching GIT VAR_FILES files with identifier: optional-var-fil12313
Git connector Url: https://github.com/vlica-harness/prerequisites.git
Branch: main

Fetching following Files :
- terraform/localresource/localresourcevars/localresource.tfvars
- inexistent131.tfvars
- asfafainexistent.tfvars
- asdsadasdsa.tfavr
Successfully fetched following files:
- terraform/localresource/localresourcevars/localresource.tfvars
```

---

## Troubleshooting

<Troubleshoot
  issue="File path not found error in Harness Terraform step even with optional marked true"
  mode="docs"
  fallback="Check that file paths are relative to the repository root. Review execution logs to see which files were fetched and which were skipped. If optional is true, missing files do not fail the step."
/>

<Troubleshoot
  issue="Connector authentication failure when fetching remote Terraform variable files in Harness CD"
  mode="docs"
  fallback="Verify that the connector credentials are correct and that the service account has read access to the repository. Check connector settings in Harness Platform."
/>

<Troubleshoot
  issue="Variable precedence when multiple Terraform variable files define the same variable in Harness"
  mode="docs"
  fallback="Terraform applies variable files in the order listed. Later files override earlier files for the same variable. Reorder files in the Terraform Var Files section to control precedence."
/>

<Troubleshoot
  issue="Harness expression evaluation errors in inline Terraform variables"
  mode="docs"
  fallback="Check expression syntax and ensure referenced values exist in the pipeline context. Verify that secrets and variables are defined at the correct scope (pipeline, project, organization, or account)."
/>

<Troubleshoot
  issue="Secret reference not resolving in inline Terraform variables in Harness CD"
  mode="docs"
  fallback="Verify that the secret exists at the correct scope and that you have permission to access it. Check the secret path in the expression and ensure it matches the secret identifier. An administrator must grant secret access permissions if needed."
/>

---

## Next steps

You have configured Terraform variable files for your pipeline steps. Harness will now fetch and apply these variables during Terraform execution.

- Go to [Provision with the Terraform Apply step](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step) to run your Terraform pipeline.
- Go to [Terraform how-tos](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-how-tos) to explore advanced Terraform workflows in Harness.
