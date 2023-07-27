---
title: Terraform Cloud provisioning
description: Connect to a Terraform Cloud/Enterprise instance and run your workspaces.
sidebar_position: 9
---

:::note

Currently, Terraform Cloud support is behind the feature flag `CDS_TERRAFORM_CLOUD`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

In addition to running Terraform configuration files locally on the Harness Delegate, Harness supports running Terraform Cloud and Enterprise workspaces.

This topic explains how to run your Terraform Cloud and Enterprise workspaces in Harness CD stages.

<details>
<summary>Running Terraform locally</summary>

For details on running Terraform configuration files locally on the delegate, go to:

* [Provision Target Deployment Infra Dynamically with Terraform](provision-infra-dynamically-with-terraform.md)
* [Plan Terraform Provisioning with the Terraform Plan Step](run-a-terraform-plan-with-the-terraform-plan-step.md)
* [Provision with the Terraform Apply Step](run-a-terraform-plan-with-the-terraform-apply-step.md)
* [Remove Provisioned Infra with the Terraform Destroy Step](remove-provisioned-infra-with-terraform-destroy.md)
* [Rollback Provisioned Infra with the Terraform Rollback Step](rollback-provisioned-infra-with-the-terraform-rollback-step.md)


</details>

## Important notes

- The workspace in Terraform Cloud should be configured and connected to the configuration files repo. Execution mode should be set to **Remote**. Currently, Harness can be used only for running executions in the workspace.
- User/role permissions required by the target platform (AWS, GCP, etc) in order to perform tasks: You should create an API token in Terraform Cloud that can be used in the Harness connector that connects Harness to Terraform Cloud. You can create **User** or **Team API** tokens. Organization tokens can’t be used for run creation. For more information about the required privileges, review the [API tokens access levels](https://developer.hashicorp.com/terraform/cloud-docs/users-teams-organizations/api-tokens#access-levels) from HashiCorp.
- You can add Terraform Cloud steps in any CD or Custom stage.

## Harness connector

The Harness Terraform Cloud connector connects your Harness account with your Terraform Cloud or Enterprise account.

You can the Terraform Cloud connector and then select it in each of the Terraform Cloud steps you add to your pipeline.

The Terraform Cloud connector uses a [Terraform Cloud API token](https://developer.hashicorp.com/terraform/cloud-docs/users-teams-organizations/api-tokens) for authentication. 

To add the Terraform Cloud connector, do the following:

```mdx-code-block
import Tabs1 from '@theme/Tabs';
import TabItem1 from '@theme/TabItem';
```

<Tabs1>
  <TabItem1 value="YAML" label="YAML" default>

The following is an example of the YAML for a Terraform Cloud connector.

<details>
<summary>Terraform Cloud connector YAML example</summary>

```yaml
connector:
  name: TF Cloud connector
  identifier: TF_Cloud_connector
  description: ""
  orgIdentifier: default
  projectIdentifier: TerraformCloud_Doc_team
  type: TerraformCloud
  spec:
    terraformCloudUrl: https://app.terraform.io
    credential:
      type: ApiToken
      spec:
        apiToken: account.terraformconnector
    executeOnDelegate: true

```
</details>


```mdx-code-block
  </TabItem1>
  <TabItem1 value="API" label="API">
```

Create the Terraform Cloud connector using the [Create a Connector](https://apidocs.harness.io/tag/Connectors/#operation/createConnector) API.

<details>
<summary>Terraform Cloud connector API example</summary>

```yaml
curl --location --request POST 'https://app.harness.io/gateway/ng/api/connectors?accountIdentifier=12345' \
--header 'Content-Type: text/yaml' \
--header 'x-api-key: pat.12345.6789' \
--data-raw 'connector:
  name: TF Cloud connector
  identifier: TF_Cloud_connector
  description: ""
  orgIdentifier: default
  projectIdentifier: TerraformCloud_Doc_team
  type: TerraformCloud
  spec:
    terraformCloudUrl: https://app.terraform.io
    credential:
      type: ApiToken
      spec:
        apiToken: account.terraformconnector
    executeOnDelegate: true'
```
</details>


```mdx-code-block
  </TabItem1>
  <TabItem1 value="Pipeline Studio" label="Pipeline Studio">
```

<details>
<summary>To add a Terraform Cloud connector, do the following:</summary>

1. In your Harness project, select **Project Setup**, and then select **Connectors**.
2. Select **New Connector**, and then select **Terraform Cloud**.
3. Enter a name for the connector and click **Continue**.
4. Enter the URL for Terraform Cloud, such as `https://app.terraform.io`.
5. In **API Token**, create or select a Harness secret containing your Terraform Cloud API token, and then select **Continue**.
6. In **Connect to the provider**, select whether to connect using a delegate or Harness Platform, and then select **Continue** or **Save and Continue**.
   1. If you selected to connect using a delegate, select one or more delegates.
7. Select **Finish**. Harness verifies the connection.

<docimage path={require('./static/af1a2b13d480a67fa332fcbb06883622c35bfef4f1e0a00ab6a7ce98f05b5a2b.png')} width="60%" height="60%" title="Click to view full size image" />
</details>

```mdx-code-block
  </TabItem1>
</Tabs1>
```

## Terraform Cloud Run step

The Terraform Cloud Run step uses the Terraform Cloud connector you added to connect to your Terraform Cloud/Enterprise account and run your workspaces.

## Run Type

The Terraform Cloud Run step can perform the following run types.

<details>
<summary>Supported run types</summary>

- **Plan**: A plan is a Terraform Cloud run that generates an execution plan that describes the changes that Terraform will make to the infrastructure in order to match the configuration code. The plan step is typically used to preview changes before actually applying them. It provides insights into what resources will be created, modified, or destroyed, and what actions will be taken by Terraform to achieve the desired state.
- **Apply**: An apply run is a Terraform Cloud run that applies the changes described in the execution plan generated by a previous plan run. The apply step is used to make the actual changes to the infrastructure resources based on the configuration code. When an apply run is executed, Terraform will create, modify, or destroy resources as needed to bring the infrastructure into the desired state.
- **Refresh**: A refresh run is a Terraform Cloud run that updates the state of the infrastructure resources with the current state of the cloud environment. This can be useful if there have been changes made to the infrastructure outside of Terraform, and you need to update the state to reflect those changes.
- **Plan Only**: A plan-only run is a Terraform Cloud run that generates an execution plan but cannot apply it. This can be useful for previewing changes and verifying that the desired changes will be made without actually applying them.
- **Plan and Apply**: A plan-and-apply run is a Terraform Cloud run that generates an execution plan and then applies the changes to the infrastructure based on that plan. This is a combination of the plan and apply steps, and is often used when you're confident in the changes that will be made and want to apply them without previewing them first.
- **Plan and Destroy**: A plan-and-destroy run is a Terraform Cloud run that generates an execution plan and then destroys all of the infrastructure resources that are managed by the Terraform configuration. This can be useful if you want to delete the entire infrastructure environment, such as when decommissioning a project or environment.

</details>

## Provisioner Identifier

This setting is supported in the following run types: Plan, Apply, Plan Only, Plan and Apply, Plan and Destroy.

The **Provisioner Identifier** is a unique value that identifies the provisioning done in each Terraform Cloud Run step.

You use the Provisioner Identifier to reference specific provisioning across Terraform Cloud Run and Terraform Cloud Rollback steps.

The most common use of **Provisioner Identifier** is between Terraform Cloud Run steps performing Plan (or Plan Only) and Apply run types. 

For the Terraform Cloud Run **Apply** run type to apply the provisioning from the Terraform Cloud Run **Plan** run type, you use the same **Provisioner Identifier** in both steps.

<docimage path={require('./static/0c1b468853ed90c4ddb0b2e6960dd3a53b669989fef863ff87b22e67815e01dc.png')} width="60%" height="60%" title="Click to view full size image" />

To rollback the provisioning done by that Terraform Cloud Run **Apply** run type, you would use the same **Provisioner Identifier** in the Terraform Cloud Rollback step.

### Provisioner Identifier scope

The Provisioner Identifier is a pipeline-wide setting. You can reference it across stages in the same pipeline.

For this reason, it's important that all your project members know the Provisioner Identifiers. This will prevent one member building a pipeline from accidentally impacting the provisioning of another member's pipeline.

## Discard Pending Runs

This setting is supported in the following run types: Plan, Refresh, Plan Only, Plan and Apply, Plan and Destroy. It is also supported in the Terraform Cloud Rollback step.

A pending run is a Terraform run that has been queued but has not yet started executing. Enabling **Discard Pending Runs** allows you to cancel or discard a pending Terraform run before it is applied to the infrastructure environment. 

When enabled, any pending runs associated with that workspace will be cancelled and removed from the queue. This can be useful if you want to cancel a run that was initiated accidentally or if you want to prevent a run from being applied due to a change in requirements or a mistake in the configuration.

Discarding a pending run does not delete the associated configuration files or modify the state of the infrastructure resources. It simply removes the run from the queue and prevents it from being applied.

## Run Message

This setting is supported in the following run types: Plan, Refresh, Plan Only, Plan and Apply, Plan and Destroy.

Use **Run Message** to add a custom message or comment to a Terraform run. The run message can be used to provide additional context or information about the run, such as the reason for the changes, the status of the infrastructure resources, or any other relevant details.

## Select Connector

This setting is supported in the following run types: Plan, Refresh, Plan Only, Plan and Apply, Plan and Destroy.

Select the Harness Terraform Cloud connector to use when running this step. Ensure the Terraform Cloud API token used in the connector has the permissions needed to run the workspace and is scoped to the workspace.

## Organization

This setting is supported in the following run types: Plan, Plan Only, Refresh, Plan and Apply, Plan and Destroy.

Select the Terraform Cloud organization that includes the workspace you want to run.

## Terraform Workspace

Select the workspace to run.

## Command

This setting is supported in the following run types: Plan, Plan Only.

In **Command**, select **Apply** or **Destroy**.

- **Apply**: The plan will be applied by a Terraform Cloud step using the **Apply** run type later in your stage. Even though you are only running a Terraform plan in this step, you identify that this step can be used with a Terraform Cloud step using the **Apply** run type later.
- **Destroy**: The plan will be created with the [destroy mode](https://developer.hashicorp.com/terraform/cli/commands/plan#planning-modes).

## Terraform Version

This setting is supported in the following run types: Plan Only.

Select the Terraform version to run.

## Variables

This setting is supported in the following run types: Plan, Refresh, Plan Only, Plan and Apply, Plan and Destroy.

Enter any workspace environment variables.

## Targets

This setting is supported in the following run types: Plan, Refresh, Plan Only, Plan and Apply, Plan and Destroy.

Enter any workspace targets to limit the scope of a Terraform run to a specific set of resources or modules. This allows you to apply changes to a subset of your infrastructure resources without impacting the entire environment.

## Export JSON representation of Terraform Plan

This setting is supported in the following run types: Plan and Plan Only.

Enable this setting to use a JSON representation of the Terraform plan that is implemented in a Terraform Cloud Run step.

In subsequent execution steps, such as a Shell Script step, you can reference the Terraform plan using this expression format:

```
<+terraformCloudPlanJson."id">
```


## Continue on Soft Mandatory Policy evaluation result

This setting is supported in the following run types: Plan and Apply and Plan and Destroy. It is also supported in the Terraform Cloud Rollback step.

Soft Mandatory policies allow you to specify certain compliance requirements or best practices for your infrastructure code, but which do not block the deployment process if the policy check fails. Instead, they generate a warning or informational message and allow the deployment to proceed.

Enable the **Continue on Soft Mandatory Policy evaluation result** option to specify how to handle Soft Mandatory policies that generate warnings or informational messages during the deployment process. This option is the same as the option in the Terraform Cloud UI when configuring a workspace's policy sets.

When **Continue on Soft Mandatory Policy evaluation result** is enabled, Terraform Cloud will proceed with the deployment even if a Soft Mandatory policy check generates a warning or informational message. 

If **Continue on Soft Mandatory Policy evaluation result** is disabled, Terraform Cloud will treat Soft Mandatory policy warnings or informational messages as errors and block the deployment process until the policy check result is resolved. This can help to ensure that your infrastructure deployments adhere to organizational standards and best practices.

## Terraform Cloud expressions

You can use Harness expressions to display the plan JSON and policy checks.

The expressions can be copied from the Terraform Cloud Run step's **Output** tab when the Run Type is **Plan** or **Plan Only**.

<docimage path={require('./static/8eeaa5d08460c36408d12085e63dde0858a99927e88314d40ea3e51516cafb16.png')} width="60%" height="60%" title="Click to view full size image" />


### Print plan expression

Use the expression `<+terraformCloudPlanJson."id">` after the Terraform Cloud Run step to print the plan.

For example:

```
cat <+terraformCloudPlanJson."id">
```


### Print policy checks

Use the expression `<+policyChecksJson."id">` to print the Sentinel checks involved in the run.

For example:

```
cat <+policyChecksJson."id">
```

## Terraform Cloud Rollback step

Add this step to trigger a rollback of the latest run on your Terraform Cloud workspace. The cleanup methods also run a decline step on any plans that have not been applied.

In **Provisioner Identifier**, enter the same unique Id used in the Terraform Cloud Run step that ran the workspace.
