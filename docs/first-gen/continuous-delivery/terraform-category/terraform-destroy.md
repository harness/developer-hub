---
title: Remove Provisioned Infra with Terraform Destroy
description: Remove any provisioned infrastructure.
sidebar_position: 80
helpdocs_topic_id: 4egyxnse9r
helpdocs_category_id: gkm7rtubpk
helpdocs_is_private: false
helpdocs_is_published: true
---

You can add a **Terraform Destroy** Workflow step to remove any provisioned infrastructure, just like running the `terraform destroy` command. See  [destroy](https://www.terraform.io/docs/commands/destroy.html) from Terraform.

The **Terraform Destroy** step is independent of any other Terraform provisioning step in a Workflow. It is not restricted to removing the infrastructure deployed in its Workflow. It can remove any infrastructure you have provisioned using a Terraform Infrastructure Provisioner.

### Before You Begin

This topic assumes you have read the following:

* [Terraform Provisioning with Harness](../concepts-cd/deployment-types/terraform-provisioning-with-harness.md)
* [Set Up Your Harness Account for Terraform](terraform-delegates.md)
* [Add Terraform Scripts](add-terraform-scripts.md)
* [Map Dynamically Provisioned Infrastructure using Terraform](mapgcp-kube-terraform-infra.md)
* [Provision using the Terraform Provision Step](terraform-provisioner-step.md)
* [Using the Terraform Apply Command](using-the-terraform-apply-command.md)
* [Perform a Terraform Dry Run](terraform-dry-run.md)

### Limitations

* You cannot add a Terraform Destroy step in the Rollback Phase of a Workflow.
* The Terraform Destroy step is only supported using Terraform versions less than 1.0.0. HashiCorp has deprecated the `terraform apply -destroy` command in 1.0.0.

### Review: What Gets Destroyed?

When you create a Harness Terraform Infrastructure Provisioner you specify the Terraform script that Harness will use for provisioning.

When you destroy the provisioned infrastructure, you specify the Terraform Infrastructure Provisioner for Harness to use to locate this script.

There are two ways to use the Terraform Destroy:

* Destroy the infrastructure provisioned by the last successful use of a specific Terraform Infrastructure Provisioner, via a **Terraform Provision** or **Terraform** **Apply** step. Harness will use the same input values and backend configuration (Remote state) set up in the **Terraform Provision** or **Terraform Apply** steps.
* Destroy the infrastructure by entering new input values and backend configuration (Remote state) for specific resources.

Which method you use is determined by the **Inherit from last successful Terraform Apply** option in the Terraform Destroy step.

When the Terraform Provision or Terraform Apply step were executed, Harness saved the **Inline Values** and **Backend Configuration** values using a combination of the following:

* **Terraform Infrastructure Provisioner** used.
* **Environment** used for the Workflow.
* **Workspace** used (or `default` if no workspace was specified).

You can decide to use these by selecting the **Inherit from last successful Terraform Apply** option or provide your own **Inline Values** and **Backend Configuration** values by not selecting this option.

#### Use Last Successful Terraform Provision or Apply Steps

When you set up the Terraform Destroy step, you specify the Provisioner and Workspace to use, and Harness gets the the **Inline Values** and **Backend Configuration** values from the last **successful** execution of that Provisioner.

When Terraform Destroy is run, it uses the same combination to identify which **Inline Values** and **Backend Configuration** values to use. You simply need to provide the Provisioner and Workspace.

#### Specify Backend Configuration (Remote State)

You can specify a Backend Configuration (Remote State) to use to identify the infrastructure to destroy.

You simply need to specify a Terraform Infrastructure Provisioner so that Harness knows where to look for the script.

In Terraform Destroy, you *disable* the **Inherit from last successful Terraform Apply** option, and then provide the input value and remote state settings to use.

### Step 1: Add Terraform Destroy Step

In the **Post-deployment Steps** of the Workflow, click **Add Step**, and then select **Terraform Destroy**.

The Terraform Destroy settings appear.

### Step 2: Select Provisioner and Workspace

Select the Terraform Infrastructure Provisioner and Workspace that was used to provision the infrastructure you want to destroy.

Typically, this is the Terraform Provisioner and Workspace used in the **Pre-deployment Steps**.

### Option: AWS Cloud Provider, Region, Role ARN

Currently, this feature is behind the Feature Flag `TERRAFORM_AWS_CP_AUTHENTICATION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.If you want to use a specific AWS role for this step's provisioning, you can select the AWS Cloud Provider, Region, and Role ARN. You can select any of these options, or all of them.

These options allow you to use different roles for different Terraform steps, such as one role for the Terraform Plan step and a different role for the Terraform Provision or Apply steps.

* **AWS Cloud Provider:** the AWS Cloud Provider selected here is used for authentication.  
At a minimum, select the **AWS Cloud Provider** and **Role ARN**. When used in combination with the AWS Cloud Provider option, the Role ARN is assumed by the Cloud Provider you select.  
The **AWS Cloud Provider** setting can be templated.You need to select an AWS Cloud Provider even if the Terraform Infrastructure Provisioner you selected uses a manually-entered template body. Harness needs access to the AWS API via the credentials in the AWS Cloud Provider.
* **Region:** the AWS region where you will be provisioning your resources. If not region is specified, Harness uses `us-east-1`.
* **Role ARN:** enter the Amazon Resource Name (ARN) of an AWS IAM role that Terraform assumes when provisioning. This allows you to tune the step for provisioning a specific AWS resource. For example, if you will only provision AWS S3, then you can use a role that is limited to S3.  
At a minimum, select the **AWS Cloud Provider** and **Role ARN**. When used in combination with the AWS Cloud Provider option, the Role ARN is assumed by the Cloud Provider you select.  
You can also use [Harness variable expressions](https://docs.harness.io/article/9dvxcegm90-variables) in **Role ARN**. For example, you can create a Service or Workflow variable and then enter its expression in **Role ARN**, such as `${serviceVariables.roleARN}` or `${workflow.variables.roleArn}`.

#### Environment Variables

If you use the **AWS Cloud Provider** and/or **Role ARN** options, do not add the following environment variables in the step's **Environment Variables** settings:

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `AWS_SESSION_TOKEN`

Harness generates these keys using the the **AWS Cloud Provider** and/or **Role ARN** options. If you also add these in **Environment Variables**, the step will fail.

### Option: Select Delegate

In **Delegate Selector**, enter the [Delegate Selector](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation) for the Delegate that you want to execute this step. Typically, this is the same Selector used to select a Delegate in the **Terraform Provision** or **Terraform Apply** step.

### Option: Terraform Environment Variables

You can remove any Terraform environment variables you created using the Terraform Provision or Terraform Apply steps.

You cannot add new environment variables in the Terraform Destroy step.

If you select the **Inherit from last successful Terraform Apply** option, then the environment variables are also inherited from the environment variables set in any pervious Terraform provisioning step in the Workflow.

### Option: Inherit from last successful Terraform Apply

As described in [Review: What Gets Destroyed?](#review_what_gets_destroyed), select this option to destroy the infrastructure provisioned by the last successful **Terraform Provision** or **Terraform** **Apply** step in the Workflow.

If you select this option, then the **Input Values** and **Backend Configuration** settings are disabled.

### Option: Set as Terraform Destroy Plan and Export

Select this option to make this Terraform Destroy step a Terraform plan. This is useful when you want to use an Approval step to approve Terraform Destroy steps.

This is the same as running `terraform plan -destroy` in Terraform.

If you select this option, Harness generates a plan to destroy all the known resources.

Later, when you want to actually destroy the resources, you add another Terraform Destroy step and select the option **Inherit following configurations from Terraform Destroy Plan**.

The **Inherit following configurations from Terraform Destroy Plan** option only appears if the **Set as Terraform Destroy Plan and Export** option was set in the preceding Terraform Destroy step.

The Terraform Plan is stored in a Secrets Manager as an encrypted text.

#### Terraform Plan Size Limit

The Terraform Plan is stored in the default Harness Secrets Manager as encrypted text. This is because plans often contain variables that store secrets.

The Terraform plan size must not exceed the secret size limit for secrets in your default Secret Manager. AWS Secrets Manager has a limitation of 64KB. Other supported Secrets Managers support larger file size.

See [Add a Secrets Manager](https://docs.harness.io/article/uuer539u3l-add-a-secrets-manager).

#### Terraform Destroy Plan Output Variable

If you select the **Set as Terraform Destroy Plan and Export** option, you can display the output of the plan using the variable expression `${terraformDestroy.tfplan}`. For example, you can display the plan output in a [Shell Script](https://docs.harness.io/article/1fjrjbau7x-capture-shell-script-step-output) step.

#### Terraform Destroy Plan File Output Variable

Currently, this feature is behind the Feature Flag `OPTIMIZED_TF_PLAN`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.If you select the **Set as Terraform Destroy Plan and Export** option, you can display the output of the plan using the variable expression `${terraformPlan.destroy.jsonFilePath()}` .

The `${terraformPlan.destroy.jsonFilePath()}` expression outputs the path to the Terraform plan file on the Harness Delegate that executed the step.

For example, you can display the plan output in a [Shell Script](https://docs.harness.io/article/1fjrjbau7x-capture-shell-script-step-output) step:


```
# Terraform Destroy  
#### Using OPA   
opa exec --decision terraform/analysis/authz --bundle policy/ ${terraformPlan.destroy.jsonFilePath()}  
  
#### Using OPA daemon  
curl localhost:8181/v0/data/terraform/analysis/authz -d @${terraformPlan.destroy.jsonFilePath()}
```
If you use the Terraform Plan step, you can use the expression `{terraformPlan.jsonFilePath()}` to output plan used by that step.

#### Terraform Plan Human Readable

Harness provides expressions to view the plan in a more human readable format:

* `${terraformApply.tfplanHumanReadable}`
* `${terraformDestroy.tfplanHumanReadable}`

### Option: Inherit following configurations from Terraform Destroy Plan

Select this option to apply the previous Terraform Destroy step if that step has the **Set as Terraform Destroy Plan and Export** option enabled.

As noted above in Option: Set as Terraform Destroy Plan and Export, the **Inherit following configurations from Terraform Destroy Plan** option only appears if the **Set as Terraform Destroy Plan and Export** option was set in the preceding Terraform Destroy step.

### Option: Input Values

Enter the input values to use when destroying the infrastructure.

The Terraform Infrastructure Provisioner you are using (the Terraform Infrastructure Provisioner you selected in the **Provisioner** setting earlier), identifies the Terraform script where the inputs are located.

See [Enter Input Variables](terraform-provisioner-step.md#step-3-enter-input-values).

#### Use tfvar Files

The **Input Values** section also includes the **Use tfvar files** option for using a variable definitions file.

You can use inline or remote tfvar files.

##### Inline tfvar Files

The path to the variable definitions file is relative to the root of the Git repo specified in the Terraform Provisioner setting. For example, in the following image, the **testing.tfvars** file is located in the repo at `terraform/ec2/testing/testing.tfvars`:

![](./static/terraform-destroy-02\.png)

If **Use tfvar files** is selected and there are also **Inline Values**, when Harness loads the variables from the **tfvars** file, the **Inline Values** variables override the variables from the tfvars file.

If you only want to use the tfvars file, make sure to delete the Inline Values.

You can also use [Workflow variables](https://docs.harness.io/article/766iheu1bk-add-workflow-variables-new-template) in **File Path**. This allows you to make the setting a deployment runtime parameter and to output their values using a [Shell Script](https://docs.harness.io/article/1fjrjbau7x-capture-shell-script-step-output) step.

##### Remote tfvar Files

In **Source Repository**, select the Harness [Source Repo Provider](https://docs.harness.io/article/ay9hlwbgwa-add-source-repo-providers) that connects to the repo where your tfvar file is.

Select **Commit ID** or **Branch.**

**Commit ID** also supports [Git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging).* For **Commit ID**, enter the git commit ID or Git tag containing the tfvar version you want to use.
* For **Branch**, enter the name of the branch where the tfvar file is located.

In **File Folder Path**, enter the full path from the root of the repo to the tfvar file.

### Step 4: Backend Configuration

Use this option to access the Backend state file directly. Enter values for each backend config (remote state variable).

The Terraform Infrastructure Provisioner you are using (the Terraform Infrastructure Provisioner you selected in the **Provisioner** setting earlier), identifies the Terraform script where the remote state settings are located.

See [Backend Configuration (Remote state)](terraform-provisioner-step.md#option-1-backend-configuration-remote-state).

Click **Submit**. The Terraform Destroy step is added to the Workflow.

![](./static/terraform-destroy-03.png)