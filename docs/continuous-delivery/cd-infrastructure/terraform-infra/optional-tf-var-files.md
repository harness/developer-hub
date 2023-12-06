---
title: Specify Terraform variables
description: Learn how to specify Terraform variables or fetch variable files in Terraform steps
sidebar_label: Specify Terraform variables
sidebar_position: 7
---

In the **Optional Configuration** > **Terraform Var Files (optional)** section of the Terraform Apply, Terraform Plan, and Terraform Destroy steps, you can specify Terraform variable files. You can add multiple entries in the section, and each entry can represent inline variables or a connection to a remote file store such as a GitHub or GitLab repository. 

In entries that connect to a remote file store, you can add multiple Terraform variable files, and you can mark those files as being optional. At runtime, Harness connects to the file store and fetches the specified files. If you mark the files as optional, Harness fetches any files that are available at runtime, ignores any files that do not exist, and continues to execute the step.

:::note
The ability to mark Terraform variable files as optional files is behind the feature flag `CDS_TERRAFORM_SUPPORT_OPTIONAL_VAR_FILE_PATHS_NG`. To enable the feature, contact [Harness Support](mailto:support@harness.io).
:::

Harness supports all [Terraform input types and values](https://www.terraform.io/docs/language/expressions/types.html).

## Harness Manager
To specify optional Terraform variable files, do the following:

:::tip 
In some fields in this workflow, you can specify a fixed value or expression or set up the field to accept an input at run time. For information about value types and how to identify fields that offer this functionality, go to [Fixed values, runtime inputs, and expressions](/docs/platform/variables-and-expressions/runtime-inputs).
:::

1. On the **Visual** tab of **Pipeline Studio**, select the step at which you want Harness to download Terraform variable files.

2. In the step configuration pane that appears, expand **Optional Configuration**.

3. In **Terraform Var Files (optional)**, select **+ Add**, and then do one of the following:

  - To enter inline Terraform variables, select **Add Inline**.

  - To specify files available in remote file stores, select **Add Remote**.

    The **Remote File** wizard is displayed.

4. If you selected **Add Inline**, do the following:

  - In **Identifier**, specify an identifier for the file.

    You can use the identifier to refer to variables using expressions. For example, if the identifier is `myvars` you could refer to its content as follows:

    `<+pipeline.stages.MyStage.spec.infrastructure.infrastructureDefinition.provisioner.steps.plan.spec.configuration.varFiles.myvars.spec.content>`

  - In **Content**, provide the input variables and values for your Terraform script. Harness follows the same format as Terraform.

    For example, suppose that your Terraform script has the following:

    ```json
    variable "region" {  
    type = string  
    }
    ```

    In **Content**, you could enter the following:

    ```bash
    region = "asia-east1-a"
    ```

    If you are entering secrets (for example, credentials), use Harness secret references in the value of the variable, as follows:

    ```bash
    secrets_encryption_kms_key = "<+secrets.getValue("org.kms_key")>"
    ```
    For more information, go to [Add Text Secrets](/docs/platform/secrets/add-use-text-secrets).

5. If you selected **Add Remote**, on the **Specify Terraform Var File Store** page of the **Remote File** wizard, do the following:

  - From the list of file stores shown, select the file store that contains the Terraform variable files.

  - Click in the connector field, select a connector in the dialog that is displayed, and then select **Apply Selected**. 
  
    Alternately, select the button for creating a connector. For information about creating a connector, go to [Connectors](/docs/category/connectors).

6. Select **Continue**.

7. On the **Var File Details** page, do the following:
 
  - In **Identifier**, enter an identifier for the remote file store entry. 

    You can use the identifier to refer to variables using expressions. For example, if the identifier is `myremotevars`, you could refer to its content as follows:

    `<+pipeline.stages.MyStage.spec.infrastructure.infrastructureDefinition.provisioner.steps.plan.spec.configuration.varFiles.myremotevars.spec.store.spec.paths>`

  - In **Repo Name**, specify the name of the repository.

  - In **Git Fetch Type**, specify what you want Harness to fetch, and then enter the branch name, commit Id, or Git tag in the next field:

    - **Latest from Branch**. Fetch the latest versions of the files.
    - **Specific Commit Id/Git Tag**. Fetch a specific commit Id or Git tag.

  - In **File Paths**, add one or more file paths from the root of the repo to the variable file. Select **+ Add File Path** to add more file paths.

  - Select **Optional** if you want Harness to ignore any files that do not exist at run time. Harness downloads available files and does not fail the step on account of missing files.

8. Select **Submit**. The entry is created.

## YAML

The following lines illustrate the YAML configuration for the Terraform variable files section:

```YAML
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
                                  repoName: ""
                                  branch: main
                                  paths:
                                    - terraform/localresource/localresourcevars/localresource.tfvar
                                    - inexistentaasd123a.tvfars
                                    - iasd13sadfsa6757.tfvars
                                  connectorRef: vlicaprerequisites
```

## Logs

At execution time, Harness shows the `.tfvars` files that were found. The following lines illustrate these logs:

```
Starting Git Fetch Files

Fetching GIT VAR_FILES files with identifier: optional-var-fil12313
Git connector Url: https://github.com/vlica-harness/prerequisites.git
Branch: main

Fetching following Files :
- terraform/localresource/localresourcevars/localresource.tfvar
- inexistent131.tfvars
- asfafainexistent.tfvars
- asdsadasdsa.tfavr
Successfully fetched following files:
- terraform/localresource/localresourcevars/localresource.tfvar
```