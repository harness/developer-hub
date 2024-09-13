---
title: AWS CDK provisioning
description: Provision infra using familiar programming languages with AWS CDK.
sidebar_position: 7
sidebar_label: AWS CDK
canonical_url: https://www.harness.io/blog/ci-cd-pipelines-for-aws
---

AWS Cloud Development Kit (AWS CDK), is an open-source software development framework that allows developers to provision AWS infrastructure resources using familiar programming languages, such as Go, Python, Java, C#, etc. CDK simplifies infrastructure as code (IaC) by abstracting away many of the low-level details and providing a higher-level, programmatic approach.

This topic provides steps on using Harness to provision a target AWS environment or resources using AWS CDK.

## Important notes

- You can add AWS CDK provisioning steps to Harness Deploy and Custom stage types.
- You can perform ad hoc provisioning or provision the target environment for a deployment as part of the deployment stage.

## Demo Video

<DocVideo src="https://www.loom.com/share/5a118a7ace3e49819c697b7131468990?sid=36ae85f0-0a39-4c5c-ba62-0e1a9d52c4de" />

## AWS permissions required

Ensure that the AWS CDK CLI is able to authenticate with the desired AWS account and has the necessary permissions for its provisioning. You can set the access keys, secret keys, and region as environment variables or let the CDK CLI inherit the IAM role from the EKS cluster where the containerized steps run.
If step group infra points to EKS, a ServiceAccout can be set in the step group **Service Account Name**. This way all containers created in that step group would inherit the permission of the IAM role of the corresponding ServiceAccount.

## Harness roles permissions required

- **Environments:** `View/Create`, `Edit`, `Access`, `Delete`.

## AWS CDK provisioning summary

Harness provisioning is categorized into the following use cases:

1. **Ad hoc provisioning:** temporary and on-demand provisioning of resources for specific tasks or purposes.
2. **Dynamic infrastructure provisioning:** provision the target deployment environment as part of the same deployment process. Typically, dynamic infrastructure provisioning is for temporary pre-production environments, such as dev, test, and qa. Production environments are usually pre-existing.

The provisioning pipeline steps are configured the same way for both use cases. These steps are covered later in this topic.

For details on Harness provisioning, go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview).

### Dynamic provisioning steps for different deployment types

Each of the deployment types Harness supports (Kubernetes, AWS ECS, etc.) require that you map different script outputs to the Harness infrastructure settings in the pipeline stage.

To see how to set up dynamic provisioning for each deployment type, go to the following topics:

- [Kubernetes infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure)
  - The Kubernetes infrastructure is also used for Helm, Native Helm, and Kustomize deployment types.
- [AWS ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
- [AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)
- [Spot Elastigroup](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot-deployment)
- [Serverless.com framework for AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless/serverless-lambda-cd-quickstart)
- [Tanzu Application Services](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart)
- [VM deployments using SSH](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)
- [Windows VM deployments using WinRM](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial)

#### Dynamic provisioning example

Here's an AWS CDK TypeScript example that provisions the infrastructure for an ECS deployment and includes the required output of AWS region:

```TypeScript
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';

class EcsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define a VPC (Virtual Private Cloud)
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2, // Specify the number of availability zones
    });

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc,
    });

    // Define an ECS Fargate service using a sample container image
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'MyFargateService', {
      cluster,
      memoryLimitMiB: 512,
      cpu: 256,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
      },
    });

    // Define an output for the AWS region
    new cdk.CfnOutput(this, 'RegionOutput', {
      value: cdk.Aws.REGION,
      description: 'AWS region of the stack',
    });

    // Define an output for the ECS cluster name
    new cdk.CfnOutput(this, 'ClusterNameOutput', {
      value: cluster.clusterName,
      description: 'Name of the ECS cluster',
    });
  }
}

const app = new cdk.App();
new EcsCdkStack(app, 'EcsCdkStack');

```

In the Harness Infrastructure Definition, you map outputs to their corresponding settings using expressions in the format `<+provisioner.STACK_NAME.OUTPUT_NAME>`, such as `<+provisioner.EcsCdkStack.RegionOutput>`.

<DocImage path={require('./static/0982655fcd2dfeb4043905e6f878f29c6005dd8d9e0d659898055fb2750d214f.png')} width="40%" height="40%" title="Click to view full size image" />

### No artifact required

You don't need to deploy artifacts via Harness services to use AWS CDK provisioning in a stage.

You can simply set up an AWS CDK provisioner and use it in a stage to provision infrastructure without deploying any artifact.

### Service Instances (SIs) consumption

Harness Service Instances (SIs) aren't consumed and no other licensing is required when a Harness stage uses AWS CDK to provision resources.

When Harness deploys artifacts via Harness services to the provisioned infrastructure in the same stage or pipeline, SI licensing is consumed.

## AWS CDK step group and step order

AWS CDK steps in Harness stages must be added in a [containerized step group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups). The steps cannot be selected outside of a containerized step group.

The step group contains the Harness connector to a Kubernetes cluster and namespace hosted in your environment. When the pipeline is run, the step group creates a container inside the cluster. Inside the container, a pod is created for each step in the step group using the image you provide in the step. The steps share a common disk space and can reference the same paths.

When you select AWS CDK as the provisioner on the CD stage **Environment** tab, Harness automatically generates a containerized [step group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups) containing the steps needed for the AWS CDK.

If you add AWS CDK steps to a stage's **Execution** tab, you must add the containerized step group yourself.

### AWS CDK step group settings

For AWS CDK, the step group setting **Enable container based execution** must be enabled. This setting configures the step group as containerized.

:::tip Info

For more information on containerized step groups, go to [Containerize step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups).

:::

In the step group, you need to configure the following mandatory settings:

- **Kubernetes Cluster:** Add a [Harness Kubernetes Cluster connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference) to connect to the cluster that will be used as the runtime step infrastructure.
- **Namespace:** Enter the name of the cluster namespace to use.

### Step order

The AWS CDK steps in Harness are similar to the AWS CDK toolkit `cdk` commands. For information on the `cdk` commands, go to [AWS CDK Toolkit (cdk command)](https://docs.aws.amazon.com/cdk/v2/guide/cli.html) from AWS.

The AWS CDK steps in your stage **Environment** or **Execution** typically follow the logical order of the CDK commands:

![picture 1](static/099abb22f98f11fa6f14026bf9c825bbc5586eb1ea22fe5c1c72668283c8aca8.png)

Inside the step group, the following AWS CDK steps are used:

1. **Git Clone step:** Clones the CDK app repository into the CD stage's workspace.

By cloning the repository, you gain access to the necessary code, scripts, or configurations, enabling you to perform various actions and ensure a reliable and controlled deployment.

The Git Clone step use case for CDK is described later in this document, but for more general information, go to [Git Clone step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/git-clone-step).

1. **AWS CDK Bootstrap step (optional):** Runs the `cdk bootstrap` command.

This step sets up the necessary AWS resources and environment required for deploying CDK applications in a specific AWS region and AWS account. This command is typically run once per AWS account and region to prepare the environment for CDK deployments.

If the AWS environment is already bootstrapped and has the necessary AWS resources required for deploying CDK applications, you can omit this step. 2. **AWS CDK Diff step:** Runs the `cdk diff` command.

Compares the specified stack and its dependencies with the deployed stacks.

1. **AWS CDK Synth step:** Runs the `cdk synthesize` command.

Synthesizes and prints the CloudFormation template for one or more stacks specified in the step. 2. **AWS CDK Deploy step:** Runs the `cdk deploy` command.

Deploys the infrastructure defined in your CDK application to your AWS account. 3. **AWS CDK Destroy step (optional):** Runs the `cdk destroy` command.

Deletes the AWS CloudFormation stacks that were previously created by a CDK application. 4. **AWS CDK rollback steps:**

1.  **Git Clone rollback step:** Typically, this step restores the Git branch/tag/commit of repo used in the last successful deployment. You can also choose to clone and branch/tag/commit as part of rollback.
2.  **AWS CDK Rollback step:** Rolls back the provisioned resources deployed by the failed **CDK Deploy** step to the state of the resources of the last successful deployment.

These steps are described in detail below.

## Docker image registry connector and image for all steps

The CDK steps in the step group are containerized. In the **Container Registry** and **Image** settings in each step, you must provide a Harness connector to a container registry and an image for the pod the step uses.

Harness provides the `aws-cdk-plugin` base image and custom images for different stacks (Java, .NET, Python, Go, etc.) They are located on the Docker Hub registry [aws-cdk-plugin](https://hub.docker.com/r/harness/aws-cdk-plugin/tags). For example, `harness/aws-cdk-plugin:1.0.0` is the base image that contains the CDK CLI and Node.js and `harness/aws-cdk-plugin:1.0.0-java` is the custom image for Java created by Harness. You can use a Harness custom image or create your own.

You can use a Harness base image to create your own image and use that in a step. For example, if your CDK app uses a specific Java or Node.js version, you can use the base image provided by Harness and create your own image containing your dependencies. You should never override the entry point.

The image you use should support the CDK operations you are running in your app.

## Git Clone step

The Git Clone step is the first stage **Execution** step added to the containerized step group for Harness CDK.

![picture 1](static/099abb22f98f11fa6f14026bf9c825bbc5586eb1ea22fe5c1c72668283c8aca8.png)

The Git Clone step clones the CDK repo containing your CDK app and adds it to a shared space in the container that can be used by all subsequent steps.

:::note

You can omit the Git Clone step if you have added the app files to the shared space on the container using some other means, such as a script in a Shell Script step.

:::

During rollback, the Git Clone rollback step can be used to replace the Git branch/tag/commit that you used in the Git Clone step.

The Git Clone step is documented in detail in [Git Clone step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/git-clone-step), but let's review how the key settings for CDK.

- **Connector:** Select or add a Harness Git connector for the source control provider hosting the CDK app code repository that you want to use.
- **Repository name:** If the connector's [URL Type](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference#url-type) is **Repository**, then **Repository Name** is automatically populated based on the repository defined in the connector's configuration. If the connector's **URL Type** is **Account**, then you must specify the name of the code repository that you want to clone into the stage workspace.
- **Build type:** Select **Git Branch** if you want the step to clone code from a specific branch within the repository, or select **Git Tag** or **Commit SHA** if you want the step to clone code from a specific commit. Based on your selection, specify a **Branch Name**, **Tag Name**, **Commit SHA**.

  :::tip

  You can use [fixed values, runtime input, or variable expressions](/docs/platform/variables-and-expressions/runtime-inputs) for the branch and tag names. For example, you can enter `<+input>` for the branch or tag name to supply a branch or tag name at runtime.

  :::

- **Clone directory:** An optional target path in the stage workspace where you want to clone the repo.
- **Depth:** The number of commits to fetch when the step clones the repo. The default depth is 0, which fetches all commits from the relevant branch. For more information, go to the [git clone documentation](https://git-scm.com/docs/git-clone).
- **SSL Verify:** If you set this to **True**, which is the default value, the pipeline verifies your Git SSL certificates. The stage fails if the certificate check fails. Set this to **False** only if you have a known issue with the certificate and you are willing to run your stages anyway.

For the remaining settings, see [Step settings common to multiple steps](/docs/continuous-delivery/cd-infrastructure/aws-cdk#step-settings-common-to-multiple-steps) below.

## AWS CDK Bootstrap step

Runs the `cdk bootstrap` command. For details on bootstrapping, go to [Bootstrapping your AWS environment](https://docs.aws.amazon.com/cdk/v2/guide/cli.html#cli-bootstrap) from AWS.

This step sets up the necessary AWS resources and environment required for deploying CDK applications in a specific AWS region and AWS account. This command is typically run once per AWS account and region to prepare the environment for CDK deployments.

If the AWS environment is already bootstrapped and has the necessary AWS resources required for deploying CDK applications, you can omit this step.

Step settings:

- **Container registry:** A Harness Docker registry connector for the registry hosting the image that you want Harness to run commands on, such as Docker Hub.
- **Image:** The image to use for this step. For example, `harness/aws-cdk-plugin:1.0.0-java`.
- **App Path:** The path to the CDK app. The Git Clone step listed the app repository in its **Repository Name** setting. **App Path** must include the path to the app folder in that directory.
- **AWS CDK Bootstrap Command Options:** You can add any CDK parameters you can see in the `cdk bootstrap --help` command, just like you would in the `cdk` command-line tool. For example, `--verbose`. For more information, go to [Parameters](https://docs.aws.amazon.com/cdk/v2/guide/parameters.html) from AWS.

For the remaining settings, see [Step settings common to multiple steps](/docs/continuous-delivery/cd-infrastructure/aws-cdk#step-settings-common-to-multiple-steps) below.

## AWS CDK Diff step

Runs the `cdk diff` command to compare the specified stack and its dependencies with the deployed stacks.

Step settings:

- **Container registry:** A Harness Docker registry connector for the registry hosting the image that you want Harness to run commands on, such as Docker Hub.
- **Image:** The image to use for this step. For example, `harness/aws-cdk-plugin:1.0`.0-java.
- **App Path:** The path to the CDK app. The Git Clone step listed the app repository in its **Repository Name** setting. App Path must include the path to the app folder in that directory.
- **AWS CDK Diff Command Options:** You can add any CDK parameters you can see in the `cdk diff --help` command, just like you would in the `cdk` command-line tool. For example, `--verbose`. For more information, go to [Parameters](https://docs.aws.amazon.com/cdk/v2/guide/parameters.html) from AWS.
- **Stack Names:** If you are using a multi-stack app, enter the names of each stack you want to passed to `cdk` command. For example, if your stack names are `cdkTest1Stack1` and `cdkTest1Stack2`, you would select **Add** and enter two stack names, one for each stack.

  ![picture 2](static/8be0b8f77211f4eabf068c7b6a19bffb0a1ce86a6fe26b7bc0fc4ed3f1a1d8f3.png)

  If you omit a stack name, it can cause a step failure. If your app uses only one stack, you do not need to enter its name.

For the remaining settings, see [Step settings common to multiple steps](/docs/continuous-delivery/cd-infrastructure/aws-cdk#step-settings-common-to-multiple-steps) below.

## AWS CDK Synth step

Runs the `cdk synthesize` command. Synthesizes and prints the CloudFormation template for one or more stacks specified in the step. In the log for the executed step you will see the JSON file exported, for example, `Exporting template file:  hello-cdk/cdk.out/cdkTest1stack1.template.json`.

Step settings:

- **Container registry:** A Harness Docker registry connector for the registry hosting the image that you want Harness to run commands on, such as Docker Hub.
- **Image:** The image to use for this step. For example, `harness/aws-cdk-plugin:1.0`.0-java.
- **App Path:** The path to the CDK app. The Git Clone step listed the app repository in its **Repository Name** setting. App Path must include the path to the app folder in that directory.
- **AWS CDK Synth Command Options:** You can add any CDK parameters you can see in the `cdk synthesize --help` command, just like you would in the `cdk` command-line tool. For example, `--verbose`. For more information, go to [Parameters](https://docs.aws.amazon.com/cdk/v2/guide/parameters.html) from AWS.
- **Stack Names:** If you are using a multi-stack app, enter the names of each stack you want to passed to `cdk` command. For example, if your stack names are `cdkTest1Stack1` and `cdkTest1Stack2`, you would select **Add** and enter two stack names, one for each stack.
- **Export Template:** Exports the JSON template(s) for the stacks entered in **Stack Names**. If no stacks are listed in Stack Names, and **Export Template** is enabled, Harness export templates for all stacks in the app.

For the remaining settings, see [Step settings common to multiple steps](/docs/continuous-delivery/cd-infrastructure/aws-cdk#step-settings-common-to-multiple-steps) below.

### Export and reference JSON templates

After this step, synthetized JSON templates will we available in **cdk.out** folder. If the **Export Template** option is selected, the JSON templates for the stacks will exported as step output.

You can reference the JSON template from the step output after the step has run using an expression in this format:

```
<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_GROUP_ID.steps.STEP_ID.output.outputVariables.STACK_NAME>
```

For example:

```
<+pipeline.stages.test.spec.execution.steps.test.steps.AwsCdkSynth.output.outputVariables.cdkTest1stack2>
```

You can obtain the expression by copying it from the executed step **Outputs**.

![picture 3](static/b36f4fa4dce007edfc19a2f807b2d866b2427ea0f51ebdd1714340c037f42396.png)

#### Using the template expression in a script

You can use the expression in a Shell Script step to output the JSON template.

Do not echo the expression. The template is multiline json and contains special characters and this can cause issues with echo.

You can assign the value to a variable like this:

<details>
<summary>Using cat with the JSON template expression</summary>

`stackOnetemplate=$(cat <<-END"<+pipeline.stages.test.spec.execution.steps.test.steps.AwsCdkSynth.output.outputVariables.cdkTest1stack1>"END)`

</details>

## AWS CDK Deploy step

Runs the `cdk deploy` command to deploy the infrastructure defined in your CDK application to your AWS account.

The CDK Deploy step includes a **Provisioner Identifier** setting to track the provisioning it performs.

The **Provisioner Identifier** is used by the AWS CDK Rollback step to ensure that the step uses same parameters and inputs that were used by the last successful `cdk deploy` with the corresponding Provisioner Identifier (in the CDK Deploy step).

The **Provisioner Identifier** must be unique per provisioned infrastructure at the Harness project level.

If you've made these settings expressions, Harness uses the values it obtains at runtime when it evaluates the expression.

Step settings:

- **Container registry:** A Harness Docker registry connector for the registry hosting the image that you want Harness to run commands on, such as Docker Hub.
- **Image:** The image to use for this step. For example, `harness/aws-cdk-plugin:1.0`.0-java.
- **Provisioner Identifier:** Enter a unique Id to identify the provisioning performed by this step.

  The **Provisioner Identifier** is a project-wide setting. You can reference it across pipelines in the same project.

  For this reason, it's important that all your project members know the provisioner identifiers. This will prevent one member building a pipeline from accidentally impacting the provisioning of another member's pipeline.

- **App Path:** The path to the CDK app. The Git Clone step listed the app repository in its **Repository Name** setting. App Path must include the path to the app folder in that directory.
- **AWS CDK Deploy Command Options:** You can add any CDK parameters you can see in the `cdk deploy --help` command, just like you would in the `cdk` command-line tool. For example, `--verbose`. For more information, go to [Parameters](https://docs.aws.amazon.com/cdk/v2/guide/parameters.html) from AWS.

  The `--all` command can be used to deploy all stacks in the app without having to name them in the **Stack Names** setting.

- **Stack Names:** If you are using a multi-stack app, enter the names of each stack you want to passed to `cdk` command. For example, if your stack names are `cdkTest1Stack1` and `cdkTest1Stack2`, you would select **Add** and enter two stack names, one for each stack.

  ![picture 2](static/8be0b8f77211f4eabf068c7b6a19bffb0a1ce86a6fe26b7bc0fc4ed3f1a1d8f3.png)

  If you omit a stack name for a multi-stack CDK application, it can cause a step failure. If your app uses only one stack, you do not need to enter its name.

- **Parameters:** This setting is the same as the `--parameters` option for `cdk deploy` (for example, `cdk deploy MyStack --parameters uploadBucketName=UploadBucket`).

  For more information, go to [Specifying AWS CloudFormation parameters](https://docs.aws.amazon.com/cdk/v2/guide/cli.html#cli-deploy) from AWS.

  Add any additional parameters to pass to CloudFormation at deploy time by adding the keys and values in **Parameters**.

  If the CDK app had a single stack, then you can enter the parameter name in **Key** and value in **Value**.

  If the CDK app has multiple stacks, then include the stack name as a prefix to the parameter in **Key** using a colon, in the format `STACK:KEY` (this is similar to the `STACK:KEY=VALUE` format in `cdk deploy --parameters`). For example, `mystack1:uploadBucketName`.

  In the log for the Harness CDK Deploy step, you will see the parameters added to the command, like this:

  ```
  /usr/local/bin/cdk deploy cdkTest3stack1 cdkTest3stack2 --parameters cdkTest3stack1:sname=stackOneSecretNameStage1ZfBcO4T6Te --parameters cdkTest3stack2:sname=stackTwoSecretNameStage1mEDUcmGTm1 -c stack1_name=cdkTest3stack1 -c stack2_name=cdkTest3stack2 --outputs-file cdk-outputs.json
  ```

For the remaining settings, see [Step settings common to multiple steps](/docs/continuous-delivery/cd-infrastructure/aws-cdk#step-settings-common-to-multiple-steps) below.

:::warning

Ensure that the user Id used in the Git Clone step and steps that call Git commands in the step group is same as the user Id specified in the [Run as User](#run-as-user) setting. Your step will fail if the user Id used in the Git Clone command and user that calls the Git Clone command is different.

This issue can also occur for existing pipelines for users who have turned on the `CDS_CONTAINER_STEP_GROUP_RUN_AS_USER_AND_PRIVILEGED_FIX` feature flag as it changes the behavior of certain settings including `Run as User` when it is not configured. To fix this issue, set `Run as User` in your Git Clone step and CDK Deploy step to `0`.
:::

### Output variable expressions

After pipeline execution, the CDK Deploy step **Output** tab displays several output variables.

![picture 4](static/29275e4d5bc3a244d2c934e36dd611fb13004a7f3887d277923f22d0236f43b3.png)

#### GIT_COMMIT_ID and LATEST_SUCCESSFUL_PROVISIONING_COMMIT_ID

This is the Git commit Id of the CDK app that was deployed.

After every successful `cdk deploy`, Harness attempts to obtain the commit SHA from the App path directory. This commit Id is saved and exported in step output `GIT_COMMIT_ID`.

Also, the CDK Deploy step outputs the commit SHA of the latest successful `cdk deploy` from a previous stage execution in the output `LATEST_SUCCESSFUL_PROVISIONING_COMMIT_ID`.

You can reference this value using the expression:

```
<+pipeline.stages.STAGE_ID.spec.provisioner.steps.STEP_GROUP_ID.steps.STEP_ID.output.outputVariables.LATEST_SUCCESSFUL_PROVISIONING_COMMIT_ID>
```

For example:

```
<+pipeline.stages.s1.spec.provisioner.steps.test.steps.AwsCdkDeploy_1.output.outputVariables.LATEST_SUCCESSFUL_PROVISIONING_COMMIT_ID>
```

#### Stack(s) outputId

A CDK app stack output is a value or set of values that are exposed by an AWS CloudFormation stack created and managed by your CDK application. These outputs provide a way for other resources or applications to access and use information produced or computed by the CDK stack during its deployment.

For example, `BucketNameOutput` is the output that provides the AWS S3 bucket name used by the stack:

```
new cdk.CfnOutput(this, 'BucketNameOutput', {
  value: bucket.bucketName,
  description: 'Name of the S3 bucket',
});

```

Each CDK app stack output Id is listed in the CDK Deploy step **Output** tab.

You can reference this value using the expression:

```
<+pipeline.stages.STAGE_ID.spec.provisioner.steps.STEP_GROUP_ID.steps.STEP_ID.cdkOutput.STACK_NAME.OUTPUT_ID>
```

For example:

```
<+pipeline.stages.s1.spec.provisioner.steps.test.steps.AwsCdkDeploy_1.cdkOutput.cdkTest3stack2.BucketNameOutput>
```

## AWS CDK Destroy step

Runs the `cdk destroy` command to destroy one or more specified stacks.

You can use this step to destroy one or more stacks defined in the CDK application.

Step settings:

- **Container registry:** A Harness Docker registry connector for the registry hosting the image that you want Harness to run commands on, such as Docker Hub.
- **Image:** The image to use for this step. For example, `harness/aws-cdk-plugin:1.0`.0-java.
- **App Path:** The path to the CDK app. The Git Clone step listed the app repository in its **Repository Name** setting. App Path must include the path to the app folder in that directory.
- **AWS CDK Destroy Command Options:** You can add any CDK parameters you can see in the `cdk destroy --help` command, just like you would in the `cdk` command-line tool.
- **Stack Names:** If you are using a multi-stack app, enter the names of each stack you want to destroy here. For example, if your stack names are `cdkTest1Stack1` and `cdkTest1Stack2`, you would select **Add** and enter two stack names, one for each stack.

For the remaining settings, see [Step settings common to multiple steps](/docs/continuous-delivery/cd-infrastructure/aws-cdk#step-settings-common-to-multiple-steps) below.

## AWS CDK rollback steps

The CDK Rollback step will run `cdk deploy` using the saved inputs and parameters used at last successful `cdk deploy` from a previous stage execution. The CDK Rollback step references the latest successful deploy using its **Provisioner identifier**.

The CDK rollback steps are located in the **Rollback** section of the **Environment** or **Execution** sections where you added your CDK steps.

:::note Tip

If you are using rollback steps in a Custom stage **Execution**, there is no **Rollback** section. You can add the rollback steps as the last steps and use the step's **Conditional Execution** settings. For example, select the **Execute this step only if prior step failed** setting and add the expression `<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_GROUP_ID.steps.STEP_ID.status> != "SUCCEEDED"` in the step's **And execute this step only if the following JEXL Condition evaluates to true** setting.

:::

### Rollback step group

AWS CDK rollback steps in Harness stages must be added in a [containerized step group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups). The steps cannot be selected outside of a containerized step group.

The step group contains the Harness connector to a Kubernetes cluster and namespace hosted in your environment. When the pipeline is run, the step group creates a container inside the cluster. Inside the container, a pod is created for each step in the step group using the image you provide in the step. The steps share a common disk space and can reference the same paths.

When you select AWS CDK as the provisioner on the CD stage **Environment** tab, Harness automatically generates a containerized [step group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups) in **Rollback** containing the steps needed for the AWS CDK.

### Git Clone step in rollback

The Git Clone step is simply a Git Clone step used to roll back the Git repo in the container to the branch, tag, or commit SHA that you want to restore in the case of deployment failure.

Typically, the Git Clone step is used to roll back the app source repo in the container to the last successful commit. You can also add Harness steps to manipulate the repo, such as Shell Script step.

Ensure that CDK application on the shared disk space is at the revision you want to rollback. The Git Clone step can be added with the specific commit SHA to use for rollback.

When the CDK Deploy step runs, it outputs the Git commit Id of the CDK app repo commit it used. You can see this in the **Output** of the CDK Deploy step and reference it using the expression in the format `<+pipeline.stages.STAGE_ID.spec.provisioner.steps.STEP_GROUP_ID.steps.STEP_ID.output.outputVariables.LATEST_SUCCESSFUL_PROVISIONING_COMMIT_ID>`.

To ensure that the Git Clone step rolls back to the last successful commit, configure the step as follows:

- **Connector:** Select or add a Harness Git connector for the source control provider hosting the CDK app code repository that you want to use.
- **Repository Name:** If the connector's **URL Type** is **Repository**, then **Repository Name** is automatically populated based on the repository defined in the connector's configuration. If the connector's **URL Type** is **Account**, then you must specify the name of the code repository that you want to clone into the stage workspace.
- **Build Type:** Select the branch, tag, or Git commit SHA of the commit you want to use.
- **Commit SHA:** If you use, **Git Commit SHA**, you can use the `LATEST_SUCCESSFUL_PROVISIONING_COMMIT_ID` expression from the last _successful_ CDK Deploy step. For example, `<+pipeline.stages.s2.spec.provisioner.steps.test.steps.AwsCdkDeploy_2.output.outputVariables.LATEST_SUCCESSFUL_PROVISIONING_COMMIT_ID>`. In this example, this expression will resolve to the commit SHA from the latest successful execution of the `AwsCdkDeploy_2` step from a previous stage. The Git Clone step will checkout at that specific commit SHA.

  You do not have to use the Git commit used by the last successful CDK Deploy step. You can rollback to any branch, tag, or commit you like.

### AWS CDK Rollback step

The CDK Rollback step rolls back the provisioned resources deployed by the CDK Deploy step to the last successful version.

Step settings:

- **Provisioner Identifier:** The **Provisioner Identifier** setting is used to link CDK Deploy and CDK Rollback steps. In the CDK Rollback step, use the identical **Provisioner Identifier** as the CDK Deploy step to ensure that it rolls back the resources deployed by the failed CDK Deploy step.
  By using the same **Provisioner Identifier** in both the CDK Deploy and CDK Rollback steps, you ensure that CDK Rollback will uses the data from corresponding `cdk deploy`. After each successful `cdk deploy`, Harness stores the details using the **Provisioner Identifier** so they can be used for rollback.
- **Environment Variables:** You can change or add environment variables in your CDK app.

## Step settings common to multiple steps

The followings settings are common to the CDK steps and configure the pods used for each step.

### Privileged

Enable this option to run the container with escalated privileges. This is equivalent to running a container with the Docker `--privileged` flag.

### Image Pull Policy

Select an option to set the pull policy for the image.

- **Always**: The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
- **If Not Present**: The image is pulled only if it is not already present locally.
- **Never**: The image is assumed to exist locally. No attempt is made to pull the image.

### Run as User

The standard `runAsUser` setting for the `securityContext` property. This setting determines the user Id of the user running all commands in the container.

Specify the user ID (UID) under which the container should run.

### Limit Memory

Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number with the suffixes G or M. You can also use the power-of-two equivalents, Gi or Mi. Do not include spaces when entering a fixed value. The default is 500Mi.

### Limit CPU

The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed. For example, you can specify one hundred millicpu as 0.1 or 100m. The default is 400m. For more information, go to Resource units in Kubernetes.

### Environment Variables

You can change or add environment variables used in the container. You must input a **Key** and **Value** for each variable.

Variable values can be [Fixed Values, Runtime Inputs, and Expressions](/docs/platform/variables-and-expressions/runtime-inputs). For example, if the value type is expression, you can input a value that references the value of some other setting in the stage or pipeline.

### Advanced settings

In **Advanced**, you can use the following options:

- [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors)
- [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
- [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
- [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)

### Supported Languages

Harness provides custom images for testing purposes for the following programming languages:

- Java
- Go
- Python 3
- .NET
  Base image allready contains Node.js and JavaScript installed.

Please navigate to our [DockerHub Repository](https://hub.docker.com/r/harness/aws-cdk-plugin/tags) for the latest image tags for this feature.
