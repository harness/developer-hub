import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

AWS Cloud Development Kit (CDK) lets you define cloud infrastructure using general-purpose programming languages. Harness IaCM runs your CDK workspaces and pipelines with Git-backed configuration, connectors, and a default deploy pipeline purpose-built for the CDK lifecycle.

This guide walks you from connectors and workspace creation through a standard CDK deploy pipeline (bootstrap, synth, diff, deploy) and an optional approval between diff and deploy.

### What will you learn?

- **Connectors and workspace:** Create cloud and Git connectors, then create a CDK workspace configured with your language and package manager.
- **Deploy pipeline:** Run a pipeline that executes the four CDK steps: bootstrap, synth, diff, and deploy.
- **Stack targeting:** Optionally deploy a specific stack from your CDK app rather than the full application.
- **Plugin variables:** Always set `PLUGIN_AWS_REGION` for the target AWS Region. Set `PLUGIN_AWSCDK_STACKS` only when you want specific stacks processed; otherwise all stacks in the app are included.
- **Approvals:** Optionally gate deploy behind an approval step after diff.

## Prerequisites

Before you use this guide, ensure you have the following:

- **Harness account with IaCM enabled:** You need **Infrastructure as Code Management** under **Infrastructure** in Harness when it is entitled on your account. Go to [Getting started with Harness Platform](/docs/platform/get-started/onboarding-guide) to access or create a Harness account.

    :::info Contact Harness support

    If IaCM does not appear, contact your account administrator or [Harness Support](mailto:support@harness.io).

    :::

- **Pipeline permissions:** You need **View**, **Create/Edit**, and **Execute** for [Pipelines](/docs/platform/role-based-access-control/permissions-reference#pipelines). Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) and [Manage roles](/docs/platform/role-based-access-control/add-manage-roles) to configure roles.
- **AWS account:** Access to an AWS account with permissions to deploy CloudFormation stacks. CDK bootstrapping requires permissions to create S3 buckets and ECR repositories in your target account and region.
- **Git repository:** Access to a Git provider with your CDK project.
- **Harness organization and project:** An [organization and project set up](/docs/platform/organizations-and-projects/create-an-organization) on the Harness Platform.

<details>
<summary>Sample CDK app</summary>

The following example CDK app creates an S3 bucket and an SQS queue. Save it as `app.py` in the root of your repository, with a standard `cdk.json` pointing to it.

```python
import aws_cdk as cdk
from aws_cdk import (
    aws_s3 as s3,
    aws_sqs as sqs,
    Stack,
)
from constructs import Construct

class MyFirstStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        s3.Bucket(self, "MyBucket",
            versioned=True,
            removal_policy=cdk.RemovalPolicy.DESTROY,
        )

        sqs.Queue(self, "MyQueue",
            visibility_timeout=cdk.Duration.seconds(300),
        )

app = cdk.App()
MyFirstStack(app, "MyFirstStack")
app.synth()
```

Go to the [AWS CDK documentation](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) to review supported languages and CDK app structure.
</details>

---

## Set up your workspace

A workspace is a named environment for storing your CDK configurations and resources. Connect your AWS account and code repository through **Connectors** to manage infrastructure changes and deployments with Harness IaCM pipelines.

:::info Connectors before workspace
Harness recommends configuring your connectors before you create a workspace. You can also add new connectors during the [Create Workspace flow](/docs/infra-as-code-management/get-started#awscdk).
:::

### Create a connector

Use **Harness AI** to create and configure your AWS and code repository connectors before you create a workspace:

<Tabs>
<TabItem value="Create a connector">
<DocVideo src="https://app.tango.us/app/embed/73d9628e-7093-4c6b-a9f7-dac8125c8441?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Create Cloud Provider Connector with Harness AI" />
</TabItem>
<TabItem value="Step-by-step">

When you add a connector, start with:

1. Sign in to [app.harness.io](https://app.harness.io).
2. In the module pane, select **Infrastructure**.
3. Select **Project Setup**, and then select **Connectors**.
4. Select **New Connector (AI)**.
5. Select an option, for example "Create an AWS connector", or type your request to create a connector for your AWS account or code repository.

Harness creates a YAML file for your connector. Once you select **Create**, Harness adds it to your project.

:::tip Edit connector
Edit your connector by updating the AI-generated YAML file, or by selecting **Edit Details** in the connectors panel.
:::

Go to [Connect your Cloud Provider](/docs/category/cloud-providers) to set up your cloud account connection. Go to [Connect your Code Repository](/docs/platform/connectors/code-repositories/connect-to-code-repo) to set up your Git connection.
</TabItem>
</Tabs>

:::info OIDC connectors
For easier access and token management, use the **OIDC** (OpenID Connect) option in the Credentials panel. This allows your connector to assume roles with permissions set in your AWS account, updated only by authorized users. Go to [Use OIDC](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference#credentials) to review credential options.
:::

---

### Create your workspace

Once you have configured your connectors, create a workspace and select those connectors in the **New Workspace** wizard.

<Tabs queryString="create-workspace">
<TabItem value="Step-by-step">

1. In the module pane, select **Infrastructure**.
2. Select an existing project or create a new project.
3. Select **Workspaces**, and then select **New Workspace**.
4. Select **Create new Workspace**, then select **Start from scratch** and complete the following fields:

#### About workspace

- **Name:** Type a unique name to identify the workspace.
- **Description (optional):** Type an optional description.
- **Tags (optional):** Add tags to identify the workspace.

#### Configure repository details

- Select your Git provider: **Harness Code Repository** or **Third-party Git provider**.
- **Git Connector:** Select the Git connector you created in the previous step.
- **Git Fetch Type:** Select **Latest from branch**, **Git tag**, or **Commit SHA**.
- **Git Branch:** Specify the branch to use.
- **Folder Path:** Specify the path from the repository root to the directory containing your CDK app (for example, `src/my-cdk-app`).

#### Provisioner

- **Connector:** Select the AWS connector you created in the previous step.
- **Workspace Type:** Select **AWS CDK**.
- **AWS CDK version:** Select the CDK version to use.
- **Programming Language:** Select the programming language for your CDK app (**Python** or **TypeScript**).
- **Language Version:** Select the language runtime version to use.
- **Package Manager:** Select your package manager (for example, **Pip** for Python).
- **Package Manager Version:** Select the package manager version.

:::info Dynamic environment installation
Harness installs your selected language runtime and package manager dynamically at pipeline execution time rather than using pre-baked Docker images. This means each run uses exactly the versions you specify in the workspace configuration.
:::

5. Select **Create**.
</TabItem>
</Tabs>

---

### Run the deploy pipeline

CDK workspaces come with a default deploy pipeline that runs the four CDK lifecycle steps in sequence. Go to [AWS CDK pipeline steps](/docs/infra-as-code-management/iac-provisioners/cdk/cdk-pipeline-steps) to review what each step does and how to configure it.

#### CDK plugin environment variables

Before you run the pipeline, set environment variables the CDK plugin expects:

- **`PLUGIN_AWS_REGION` (required):** AWS Region where resources should be deployed (for example `us-east-1`). You always need this set explicitly—for example as a **MANUAL** row under **Environment Variables** on the workspace **Connectors and Variables** tab, or as stage, pipeline, or step variables.
- **`PLUGIN_AWSCDK_STACKS` (optional):** Comma-separated logical stack IDs only when you want this pipeline run to target specific stacks (for example `s3bucket` or `SQSStack,S3Stack`). If you omit it, every stack in the app is processed. Harness is working on a more seamless experience for stack selection.

Add them as **stage** or **pipeline** variables, on the workspace **Environment Variables** table, or under **Environment Variables** on the CDK steps. Go to [Connector Authentication](/docs/infra-as-code-management/manage-projects/iacm-aws-connectors) to review how other IaCM steps use the `PLUGIN_*` pattern. Go to [AWS CDK overview](/docs/infra-as-code-management/iac-provisioners/cdk/overview) for the CDK lifecycle and stacks.

<Tabs>
<TabItem value="Step-by-step">

1. Select the **Infrastructure** module.
2. Select **Pipelines**, then select **Create a Pipeline**.
3. Select an option from Harness AI chat or type a request to generate a CDK deploy pipeline, for example:
   - "Create a CDK deploy pipeline with bootstrap, synth, diff, and deploy steps."
4. Review the generated YAML and Harness AI chat summary, then select **Accept**.
5. Select **Run** to execute the pipeline.

The pipeline runs four steps:

- **Bootstrap:** Provisions the CDK toolkit resources (an S3 bucket and ECR repository) in your target AWS account and region. This step is required once per account and region before any CDK app can be deployed there.
- **Synth:** Compiles your CDK app code into a CloudFormation template. This step validates your code and produces the CloudFormation assets used by subsequent steps.
- **Diff:** Compares the synthesized CloudFormation template against the currently deployed stack and shows what will change.
- **Deploy:** Executes the CloudFormation change set and provisions your infrastructure.

</TabItem>
</Tabs>

---

### Target a specific stack (optional)

If your CDK app defines multiple stacks, you can target a single stack for deployment rather than running against the full app. Set the **Stack Path** field on your pipeline steps to the identifier of the stack you want to deploy.

:::tip When to use stack targeting
Use stack targeting when you have a monorepo CDK app with independent stacks per environment or service and you want to deploy only one at a time. Go to [AWS CDK overview](/docs/infra-as-code-management/iac-provisioners/cdk/overview) to understand how stacks relate to CDK apps.
:::

---

### Add an approval step (optional)

Add an **Approval** step between `diff` and `deploy` to gate deployment on a manual review of the planned changes.

:::warning Approval steps hold resources
When you add an Approval step, the underlying machine that runs the pipeline remains active until the approval is resolved. The machine continues to consume compute resources.
:::

<Tabs>
<TabItem value="Step-by-step">

1. From the Pipeline > **Execution** tab, select **+** between the `diff` and `deploy` steps.
2. Select **Add Step**.
3. Under **IACM**, select **IACM Approval**.
4. Name the approval step and select **Apply Changes**.
5. Select **Save**, then **Run** your pipeline.
</TabItem>
</Tabs>
