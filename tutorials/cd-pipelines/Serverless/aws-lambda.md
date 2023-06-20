---
sidebar_position: 1
hide_table_of_contents: true
title: AWS Lambda
description: Deploy a Serverless app on AWS Lambda.
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

# Deploy a Serverless app on AWS Lambda 

This tutorial will get you started with Serverless Deployment using Harness Continuous Delivery (CD). We will guide you through deploying a sample application using Harness pipeline. 

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-serverless-aws-lambda).

:::

```mdx-code-block
<Tabs>
<TabItem value="Serverless.com Infrastructure">
```

## Before you begin

Verify the following:

1. **Obtain GitHub personal access token with the repo scope**. See the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
2. **Docker**. For this tutorial ensure that you have the Docker runtime installed on your host. If not, use one of the following options to install Docker:
    - [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
    - [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
    - [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Docker for Debian](https://docs.docker.com/engine/install/debian/)
    - [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) 
    - Check [Delegate system requirements](https://developer.harness.io/docs/platform/Delegates/delegate-concepts/delegate-requirements)
3. **Fork the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub website.
    - See [GitHub docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) for more information on forking a GitHub repository.
4. **AWS User account with required policy:** Serverless deployments require an AWS User with specific AWS permissions, as described in AWS Credentials from Serverless.com. To create the AWS User, follow the follwing steps:

    * Click **Users**, and then **Add user**. Enter a name. Enable **Programmatic access** by clicking the checkbox. Click **Next** to go to the Permissions page. Do one of the following:

    * **Full Admin Access:** click on **Attach existing policies directly**. Search for and select **AdministratorAccess** then click **Next: Review**. Check to make sure everything looks good and click **Create user**.
    * **Limited Access:** click on **Create policy**. Select the **JSON tab**, and add the JSON from the [Serverless gist: IAMCredentials.json](https://gist.github.com/ServerlessBot/7618156b8671840a539f405dea2704c8#file-iamcredentials-json)

### **Limitations and Capabilities**
    
* Harness supports Serverless framework 1.82 and later.
* Harness supports Serverless framework CLI versions 2.x.x and 3.x.x.
* Harness supports all language runtimes that Serverless supports.
* Harness supports ZIP files and Docker image artifacts only.
	+ ZIP files are supported with JFrog Artifactory.
	+ Docker images are supported with AWS ECR.

## Getting Started with Harness CD
----------------------------------

1. Log in to the [Harness App](https://app.harness.io/)

2. Select on **Projects** in the top left corner and choose **Default Project**

:::caution

Going forward, follow all the steps as they are, including the naming conventions, for the pipeline to run successfully.

:::

### Delegate

<details open>
<summary>What is the Harness delegate?</summary>

The Harness delegate is a service that runs in your local network or VPC to establish connections between the Harness Manager and various providers such as artifacts registries, cloud platforms, etc. The delegate is installed in the target infrastructure, for example, a Kubernetes cluster, and performs operations including deployment and integration. Learn more about the delegate in the [Delegate Overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/).

</details>

1. Under **Project Setup**, select **Delegates**.
    
  1. In **Delegates Setup**, select **Install new Delegate**. The delegate wizard appears.
  2. In the **New Delegate** dialog, in **Select where you want to install your Delegate**, select **Docker**.
  3. Enter a delegate name, `harness-serverless-delegate`

Now you can install the delegate by using the command that appears on your installation wizard with prefilled info for the environement varables as mentioned in the example below. 

```bash
docker run --cpus=1 --memory=2g \
  -e DELEGATE_NAME=harness-serverless-delegate \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID= YOUR_HARNESS_ACCOUNTID\
  -e DELEGATE_TOKEN=YOUR_DELEGATE_TOKEN\
  -e LOG_STREAMING_SERVICE_URL=YOUR_MANAGER_HOST_AND_PORT /
  log-service/ \
  -e MANAGER_HOST_AND_PORT=YOUR_MANAGER_HOST_AND_PORT \
  DELEGATE_IMAGE:TAG
```
:::info

Replace the `DELEGATE_IMAGE:TAG` variable with the custom delegate image `harnesscommunity/serverless-delegate:latest` with serverless installed on the same.

:::

#### Verify delegate connectivity

Select **Continue**. After the health checks pass, your delegate is available for you to use. Select **Done** and verify your new delegate is listed.

    

### Secrets

<details open>
<summary>What are Harness secrets?</summary>

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness delegate has access to the key management system. You can also integrate your own secret manager. To learn more about secrets in Harness, go to [Harness Secret Manager Overview](https://developer.harness.io/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview/).

</details>

### Github Secret
 Under **Project Setup**, select **Secrets**.
1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `harness_gitpat`.
3. For the secret value, paste the GitHub personal access token you saved earlier.
4. Select **Save**.

### AWS Secret
    
1. Select **New Secret**, and then select **Text**.
2. Enter the secret name `aws_access_key`.
3. For the secret value, paste the access token for your  AWS User account, the Harness Delegate uses these credentials to authenticate Harness with AWS at deployment runtime.
4. Select **Save**.

### Connectors

<details open>
<summary>What are connectors?</summary>

Connectors in Harness enable integration with 3rd party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Explore connector how-tos [here](https://developer.harness.io/docs/category/connectors).

</details>

1. Create the **GitHub connector**.
    1. Copy the contents of [github-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/serverless-lambda/harnesscd-pipeline/github-connector.yml)
    2. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
    3. Select **Create via YAML Builder** and paste the copied YAML.
    4. Assuming you have already forked the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository mentioned earlier, replace **GITHUB_USERNAME** with your GitHub account username in the YAML.
    5. In `projectIdentifier`, replace with the project identifier with yours, i.e, `default`. 
    6. Select **Save Changes** and verify that the new connector named **harness_gitconnector** is successfully created.
    7. Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful.

2. Create the **AWS Connector**.
    1. Copy the contents of [aws-connector.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/serverless-lambda/harnesscd-pipeline/aws-connector.yml)
    2. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
    3. Select **Create via YAML Builder** and paste the copied YAML.
    4. Assuming you have already forked the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository mentioned earlier, replace **crossAccountRoleArn** with your AWS role's ARN in the YAML, also replace the **accessKey** field with your [aws access key](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-appendix-sign-up.html) for the AWS User you created with the required policies.
    5. In `projectIdentifier`, replace with the project identifier with yours, i.e, `default`. 
    6. Select **Save Changes** and verify that the new connector named **harness_awsconnector** is successfully created.
    7. Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful. 
    

### Environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. In your Harness project, select **Environments**.
    1. Select **New Environment**, and then select **YAML**.
    2. Copy the contents of [environment.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/serverless-lambda/harnesscd-pipeline/environement.yml), paste it into the YAML editor, and select **Save**.
    3. In your new environment, select the **Infrastructure Definitions** tab.
    4. Select **Infrastructure Definition**, and then select **YAML**.
    5. Copy the contents of [infrastructure-definition.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/serverless-lambda/harnesscd-pipeline/infrastructure-definition.yml) and paste it into the YAML editor.
    6. Select **Save** and verify that the environment and infrastructure definition are created successfully.

### Services

<details open>
<summary>What are Harness services?</summary>

In Harness, services represent what you deploy to environments. You use services to configure variables, manifests, and artifacts. The **Services** dashboard provides service statistics like deployment frequency and failure rate. To learn more about services, go to [Services overview](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/services-overview/).

</details>

1. In your Harness project, select **Services**.
    1. Select **New Service**.
    2. Enter the name `harnessserverless`.
    3. Select **Save**, and then **YAML** (on the **Configuration** tab).
    4. Select **Edit YAML**, copy the contents of [service.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/serverless-lambda/harnesscd-pipeline/service.yml), and paste the into the YAML editor.
    5. Select **Save** and verify that the service **harness_serverless** is successfully created.

### Pipeline

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](https://developer.harness.io/docs/continuous-delivery/get-started/cd-pipeline-basics/).

</details>

1. In your Harness project, select **Pipelines**.
    1. Select **Create a Pipeline**.
    2. Enter the name `serverless_pipeline`.
    3. Choose **Inline** to store the pipeline in Harness.
    4. Select **Start**. 
    5. In **Pipeline Studio**, select **YAML**.
    6. Select **Edit YAML** and choose any of the following execution strategies. Paste the respective YAML based on your selection.


### AWS Lambda Deploy using Serverless Infrastructure

1. Copy the contents of [serverless-pipeline.yml](https://github.com/harness-community/harnesscd-example-apps/blob/master/serverless-lambda/harnesscd-pipeline/serverless-pipeline.yml).
2. In your Harness pipeline YAML editor, paste the YAML.
3. Select **Save**.
   
   You can switch to the **Visual** pipeline editor and confirm the pipeline stage and execution steps as shown below.


 <docimage path={require('../static/harness-cicd-tutorial/serverless-aws-lambda.png')}/>

```mdx-code-block
</TabItem>
</Tabs>
```

10. Finally, it's time to execute the Pipeline. Click on **Run**, and then click **Run Pipeline** to initiate the deployment.
Finally, it's time to execute your pipeline. 

11.  Select **Run**, and then select **Run Pipeline** to initiate the deployment.
        * Observe the execution logs as Harness deploys the workload and checks for steady state.


### Congratulations!🎉

You've just learned how to use Harness CD to deploy an application on aws lambda. 