---
title: Provision with the Terraform Apply Step
description: Apply a Terraform plan or script using the Terraform Apply step.
sidebar_position: 3
helpdocs_topic_id: hdclyshiho
helpdocs_category_id: jcu7twh2t6
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to apply a Terraform plan or script using the Terraform Apply step.

The Terraform Apply step can apply a Terraform script with or without the Terraform Plan step.

Typically the Terraform Apply step is used with the Terraform Plan step to apply a plan. For steps on using the Terraform Plan step, see [Plan Terraform Provisioning with the Terraform Plan Step](run-a-terraform-plan-with-the-terraform-plan-step.md).

The Terraform Apply step can provision any resource, including the target infrastructure for a CD deployment. For steps on provisioning the target infrastructure for a CD deployment, see [Provision Target Deployment Infra Dynamically with Terraform](../../cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform.md).

## Before You Begin

* [Terraform Provisioning with Harness](terraform-provisioning-with-harness.md)
* [Kubernetes CD Quickstart](../../onboard-cd/cd-quickstarts/kubernetes-cd-quickstart.md)

## Important: Install Terraform on Delegates

Terraform must be installed on the Delegate to use a Harness Terraform Provisioner. You can install Terraform manually or use the `INIT_SCRIPT` environment variable in the Delegate YAML.

See [Install Software on the Delegate with Initialization Scripts](../../../platform/2_Delegates/delegate-guide/run-scripts-on-delegates.md).


```bash
# Install TF  
microdnf install -y unzip  
curl -O -L  https://releases.hashicorp.com/terraform/0.12.25/terraform_0.12.25_linux_amd64.zip  
unzip terraform_0.12.25_linux_amd64.zip  
mv ./terraform /usr/bin/  
# Check TF install  
terraform --version
```

## Review: Terraform Plan and Apply Steps

Typically the Terraform Plan step is used with the Terraform Apply step.

First, you add the Terraform Plan step and define the Terraform script for it to use.

Next, you add the Terraform Apply step, select **Inherit from Plan** in **Configuration Type**, and reference the Terraform Plan step using the same **Provisioner Identifier.**

![](./static/run-a-terraform-plan-with-the-terraform-apply-step-02.png)

For steps on using the Terraform Plan with the Apply step, see:

* [Provision Target Deployment Infra Dynamically with Terraform](../../cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform.md)

You can also simply run the Terraform Apply step without applying the plan from the Terraform Plan step.

In that case, you simply add the Terraform Apply step and select the **Inline** option in **Configuration Type**. Next, you add the Terraform script and settings in Terraform Apply. This scenario is described below.

## Step 1: Add the Terraform Apply Step

When you are provisioning the target infrastructure for a deployment, you add the Terraform Plan step in the stage's Infrastructure in **Dynamic Provisioning**. Dynamic Provisioning is used to provision the target infrastructure for the stage's deployment. Consequently, if you add Terraform Plan there, you must use a Terraform Apply step to apply the plan.

See [Provision Target Deployment Infra Dynamically with Terraform](../../cd-infrastructure/terraform-infra/provision-infra-dynamically-with-terraform.md).

You can also add a Terraform Apply step anywhere in the **Execution** steps for the stage. In that case, you can use a Terraform Plan step but it's not required.

When you use the Terraform Apply step without using the Terraform Plan step, you set up the Terraform Apply step to connect Harness to your repo and add Terraform scripts.

The Terraform Apply step has the following settings.

### Name

In **Name**, enter a name for the step, for example, **apply**.

The name is very important. You can use the name in [expressions](../../../platform/12_Variables-and-Expressions/harness-variables.md) to refer to settings in this step.

For example, if the name of the stage is **Terraform** and the name of the step is **apply**, and you want to echo its timeout setting, you would use:

`<+pipeline.stages.Terraform.spec.execution.steps.apply.timeout>`

or simply `<+execution.steps.apply.timeout>`.

### Timeout

In **Timeout**, enter how long Harness should wait to complete the Terraform Apply step before failing the step.

### Configuration Type

In **Configuration Type**, select **Inline** or **Inherit from Plan**.

If you select **Inherit from Plan**, you'll enter the unique Id used by a [Terraform Plan](run-a-terraform-plan-with-the-terraform-plan-step.md) step in **Provisioner Identifier**.

If you select **Inline**, you'll configure this Terraform Apply step to use a Terraform script without any Terraform Plan step.

We'll cover the **Inline** settings below.

### Provisioner Identifier

Enter a unique value in **Provisioner Identifier**.

The Provisioner Identifier identifies the provisioning done in this step. You use the Provisioner Identifier in additional steps to refer to the provisioning done in this step.

The most common use of Provisioner Identifier is between the Terraform Plan and Terraform Apply steps. For the Terraform Apply step, to apply the provisioning from the Terraform Plan step, you use the same Provisioner Identifier.

![](./static/run-a-terraform-plan-with-the-terraform-apply-step-03.png)

You also use the same Provisioner Identifier with the [Terraform Destroy](remove-provisioned-infra-with-terraform-destroy.md) step to remove the provisioned resources.

![](./static/run-a-terraform-plan-with-the-terraform-apply-step-04.png)

You also use the same Provisioner Identifier with the [Terraform Rollback](rollback-provisioned-infra-with-the-terraform-rollback-step.md) step to rollback the provisioned resources.

#### Provisioner Identifier Scope

The Provisioner Identifier is a Project-wide setting. You can reference it across Pipelines in the same Project.

For this reason, it's important that all your Project members know the Provisioner Identifiers. This will prevent one member building a Pipeline from accidentally impacting the provisioning of another member's Pipeline.

### Configuration File Repository

**Configuration File Repository** is where the Terraform script and files you want to use are located.

Here, you'll add a connection to the Terraform script repo.

Click **Specify Config File** or edit icon.

The **Terraform Config File Store** settings appear.

Click the provider where your files are hosted.

![](./static/run-a-terraform-plan-with-the-terraform-apply-step-05.png)

Select or create a Connector for your repo. For steps, see [Connect to a Git Repo](../../../platform/7_Connectors/connect-to-code-repo.md) or [Artifactory Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/artifactory-connector-settings-reference.md) (see **Artifactory with Terraform Scripts and Variable Definitions (.tfvars) Files**).

In **Git Fetch Type**, select **Latest from Branch** or **Specific Commit ID**. When you run the Pipeline, Harness will fetch the script from the repo.

**Specific Commit ID** also supports [Git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging).If you think the script might change often, you might want to use **Specific Commit ID**. For example, if you are going to be fetching the script multiple times in your Pipeline, Harness will fetch the script each time. If you select **Latest from Branch** and the branch changes between fetches, different scripts are run.

In **Branch**, enter the name of the branch to use.

In **Folder Path**, enter the path from the root of the repo to the folder containing the script.

For example, here's a Terraform script repo, the Harness Connector to the repo, and the **Config Files** settings for the branch and folder path:

![](./static/run-a-terraform-plan-with-the-terraform-apply-step-06.png)

Click **Submit**.

Your Terraform Apply step is now ready. You can now configure a Terraform Destory or Rollback step that can use the Terraform script from this Terraform Apply step.

The following sections cover common Terraform Apply step options.

### Artifactory

See [Artifactory Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/artifactory-connector-settings-reference.md) (see **Artifactory with Terraform Scripts and Variable Definitions (.tfvars) Files**).

### Source Module

When you set up the file repo in **Configuration File Repository**, you use a Harness Connector to connect to the repo where the Terraform scripts are located.

Some scripts will reference module sources in other repos and Harness will pull the source code for the desired child module at runtime (during `terraform init`).

In **Source Module**, you can select **Use Connector credentials** to have Harness use the credentials of the Connector to pull the source code for the desired child module(s).

If you do not select **Use Connector credentials**, Terraform will use the credentials that have been set up in the system.

The **Use Connector credentials** setting is limited to Harness Git Connectors using SSH authentication (not HTTPS) and a token.

## Option: Workspace

Harness supports Terraform [workspaces](https://www.terraform.io/docs/state/workspaces.html). A Terraform workspace is a logical representation of one your infrastructures, such as Dev, QA, Stage, Production.

Workspaces are useful when testing changes before moving to a production infrastructure. To test the changes, you create separate workspaces for Dev and Production.

A workspace is really a different state file. Each workspace isolates its state from other workspaces. For more information, see [When to use Multiple Workspaces](https://www.terraform.io/docs/state/workspaces.html#when-to-use-multiple-workspaces) from Hashicorp.

Here's an example script where a local value names two workspaces, **default** and **production**, and associates different instance counts with each:


```json
locals {  
  counts = {  
      "default"=1  
      "production"=3  
  }  
}  
  
resource "aws_instance" "my_service" {  
  ami="ami-7b4d7900"  
  instance_type="t2.micro"  
  count="${lookup(local.counts, terraform.workspace, 2)}"  
  tags {  
         Name = "${terraform.workspace}"  
    }  
}
```

In the workspace interpolation sequence, you can see the count is assigned by applying it to the Terraform workspace variable (`terraform.workspace`) and that the tag is applied using the variable also.

Harness will pass the workspace name you provide to the `terraform.workspace` variable, thus determining the count. If you provide the name **production**, the count will be **3**.

In the **Workspace** setting, you can simply select the name of the workspace to use.

You can also use a [stage variable](../../../platform/12_Variables-and-Expressions/harness-variables.md) in **Workspace**.

Later, when the Pipeline is deployed, you specify the value for the stage variable and it is used in **Workspace**.

This allows you to specify a different workspace name each time the Pipeline is run.

You can even set a Harness Trigger where you can set the workspace name used in **Workspace**.

## Option: Terraform Var Files

The **Terraform Var Files** section is for entering and/or linking to Terraform script Input variables.

You can use inline or remote var files.

Harness supports all [Terraform input types and values](https://www.terraform.io/docs/language/expressions/types.html).

### Inline Variables

You can add inline variables just like you would in a tfvar file.

Click **Add Terraform Var File**, and then click **Add Inline**.

The **Add Inline Terraform Var File** settings appear.

In **Identifier**, enter an identifier so you can refer to variables using expressions if needed.

For example, if the **Identifier** is **myvars** you could refer to its content like this:

`<+pipeline.stages.MyStage.spec.infrastructure.infrastructureDefinition.provisioner.steps.plan.spec.configuration.varFiles.myvars.spec.content>`

Provide the input variables and values for your Terraform script. Harness follows the same format as Terraform.

For example, if your Terraform script has the following:


```json
variable "region" {  
  type = string  
}
```
In **Add Inline Terraform Var File**, you could enter:


```json
region = "asia-east1-a"
```

#### Inline Variable Secrets

If you are entering secrets (for credentials, etc.), use Harness secret references in the value of the variable:


```bash
secrets_encryption_kms_key = "<+secrets.getValue("org.kms_key")>"
```
See [Add Text Secrets](../../../platform/6_Security/2-add-use-text-secrets.md).

### Remote Variables

You can connect Harness to remote variable files.

Click **Add Terraform Var File**, and then click **Add Remote**.

Select your Git provider (GitHub, etc.) and then select or create a Connector to the repo where the files are located. Typically, this is the same repo where your Terraform script is located, so you can use the same Connector.

Click **Continue**. The **Var File Details** settings appear.

![](./static/run-a-terraform-plan-with-the-terraform-apply-step-07.png)

In **Identifier**, enter an identifier so you can refer to variables using expressions if needed.

In **Git Fetch Type**, select **Latest from Branch** or **Specific Commit ID**.

In **Branch**, enter the name of the branch.

In **File Paths**, add one or more file paths from the root of the repo to the variable file.

Click **Submit**. The remote file(s) are added.

##### Artifactory

See [Artifactory Connector Settings Reference](../../../platform/7_Connectors/ref-cloud-providers/artifactory-connector-settings-reference.md) (see **Artifactory with Terraform Scripts and Variable Definitions (.tfvars) Files**).

## Option: Backend Configuration

The **Backend Configuration** section contains the [remote state](https://www.terraform.io/docs/language/state/remote.html) values.

You can use an inline or remote state file.

### Using a Remote State File with Terraform Apply

:::note

Currently, remote state file support is behind the feature flag `TERRAFORM_REMOTE_BACKEND_CONFIG`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

1. In Backend Configuration, select **Remote**.
2. Click **Specify Backend Config File**, add a Connector to your repo, and select the backend config file.![](./static/run-a-terraform-plan-with-the-terraform-apply-step-08.png)

You can also use files in the [Harness File Store](../../cd-services/cd-services-general/add-inline-manifests-using-file-store.md).

To use the same remote state file set in the Terraform Plan step, Terraform Apply steps must use the same Provisioner Identifier.

For an example of how the config file should look, please see [Backend Configuration](https://developer.hashicorp.com/terraform/language/settings/backends/configuration#file) from HashiCorp.

Here's an example.

main.tf (note the empty backend S3 block):


```json
variable "global_access_key" {type="string"}  
variable "global_secret_key" {type="string"}  
  
variable "env" {  
    default= "test"  
}  
provider "aws" {  
  access_key = "${var.global_access_key}"  
  secret_key = "${var.global_secret_key}"  
  region = "us-east-1"  
      
}  
  
resource "aws_s3_bucket" "bucket" {  
  bucket = "prannoy-test-bucket"  
}  
  
terraform {  
backend "s3" {  
      
  }  
}
```

backend.tf:

```json
access_key = "1234567890"  
secret_key = "abcdefghij"  
bucket = "terraform-backend-config-test"  
key    = "remotedemo.tfstate"  
region = "us-east-1"
```

### Using Inline State with Terraform Apply

Enter values for each backend config (remote state variable).

For example, if your config.tf file has the following backend:


```json
terraform {  
  backend "gcs" {  
    bucket  = "tf-state-prod"  
    prefix  = "terraform/state"  
  }  
}
```
In **Backend Configuration**, you provide the required configuration variables for that backend type. See **Configuration variables** in Terraform's [gcs Standard Backend doc](https://www.terraform.io/docs/language/settings/backends/gcs.html#configuration-variables).

## Option: Targets

You can use the **Targets** setting to target one or more specific modules in your Terraform script, just like using the `terraform plan -target` command. See [Resource Targeting](https://www.terraform.io/docs/commands/plan.html#resource-targeting) from Terraform.

You simply identify the module using the standard format `module.name`, like you would using `terraform plan -target="module.s3_bucket"`.

If you have multiple modules in your script and you don't select one in **Targets**, all modules are used.


## Option: Environment Variables

If your Terraform script uses [environment variables](https://www.terraform.io/docs/cli/config/environment-variables.html), you can provide values for those variables here.

For example:


```bash
TF_LOG_PATH=./terraform.log  
TF_VAR_alist='[1,2,3]'
```
You can use Harness encrypted text for values. See [Add Text Secrets](../../../platform/6_Security/2-add-use-text-secrets.md).

## Option: Advanced Settings

In **Advanced**, you can use the following options:

* [Step Skip Condition Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-skip-condition-settings.md)
* [Step Failure Strategy Settings](../../../platform/8_Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings.md)
* [Select Delegates with Selectors](../../../platform/2_Delegates/delegate-guide/select-delegates-with-selectors.md)

## See Also

* [Plan Terraform Provisioning with the Terraform Plan Step](run-a-terraform-plan-with-the-terraform-plan-step.md)

