---
sidebar_position: 1
hide_table_of_contents: true
title: Serverless
description: Deploy a Serverless app on AWS Lambda using Serverless.com Infrastructure. 
---

# Deploy a Serverless app on AWS Lambda using Serverless.com Infrastructure.

This tutorial will get you started with Serverless Deployment using Harness Continuous Delivery (CD). We will guide you through deploying a sample application using Harness pipeline. 

:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=tutorials-cd-kubernetes-manifest).

:::

## Before you begin

Verify the following:

1. **Obtain GitHub personal access token with the repo scope**. See the GitHub documentation on [creating a personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).
2. **A Kubernetes cluster**. Use your own Kubernetes cluster or we recommend using [K3D](https://k3d.io/v5.5.1/) for installing Harness Delegates and deploying a sample application in a local development environment.
    - Check [Delegate system requirements](https://developer.harness.io/docs/platform/Delegates/delegate-concepts/delegate-requirements)
3. **Fork the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork)** repository through the GitHub website.
    - See [GitHub docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) for more information on forking a GitHub repository.
4. **AWS User account with required policy:** Serverless deployments require an AWS User with specific AWS permissions, as described in AWS Credentials from Serverless.com. To create the AWS User, follow the steps mentioned [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console). 

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

    For this tutorial, we require Custom Harness Delegate image with Serverless installed:
    
  1. In **Delegates Setup**, select **Install new Delegate**. The delegate wizard appears.
  2. In the **New Delegate** dialog, in **Select where you want to install your Delegate**, select **Docker**.
  3. Enter a delegate name, `harness-serverless-delegate`

<h3> Prerequisite </h3>

Ensure that you have the Docker runtime installed on your host. If not, use one of the following options to install Docker:

- [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Docker for CentOS](https://docs.docker.com/engine/install/centos/)
- [Docker for Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Docker for Debian](https://docs.docker.com/engine/install/debian/)
- [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/) 

<h3> Install on Docker </h3>

Now you can install the delegate using the following command.

```bash
docker run --cpus=1 --memory=2g \
  -e DELEGATE_NAME=docker-delegate \
  -e NEXT_GEN="true" \
  -e DELEGATE_TYPE="DOCKER" \
  -e ACCOUNT_ID=PUT_YOUR_HARNESS_ACCOUNTID_HERE \
  -e DELEGATE_TOKEN=PUT_YOUR_DELEGATE_TOKEN_HERE \
  -e LOG_STREAMING_SERVICE_URL=PUT_YOUR_MANAGER_HOST_AND_PORT_HERE/log-service/ \
  -e MANAGER_HOST_AND_PORT=PUT_YOUR_MANAGER_HOST_AND_PORT_HERE \
  harness-community/custom-delegate:23.05.79310 
```
Replace the `PUT_YOUR_MANAGER_HOST_AND_PORT_HERE` variable with the Harness Manager Endpoint noted below. For Harness SaaS accounts, you can find your Harness Cluster Location on the **Account Overview** page under the **Account Settings** section of the left navigation. For Harness CDCE, the endpoint varies based on the Docker vs. Helm installation options.

| Harness Cluster Location| Harness Manager Endpoint on Harness Cluster	|
| ------------------------| -------------------------------------------	|
| SaaS prod-1  	 		| `https://app.harness.io`       				|
| SaaS prod-2  	 		| `https://app.harness.io/gratis`        		|
| SaaS prod-3  	 		| `https://app3.harness.io`        				|
| [CDCE Docker](/tutorials/platform/install-cd-community-edition)  	 		| `http://<HARNESS_HOST>` if Docker Delegate is remote to CDCE  or  `http://host.docker.internal` if Docker Delegate is on same host as CDCE |
| [CDCE Helm](/tutorials/platform/install-cd-community-edition)      		| `http://<HARNESS_HOST>:7143`  where HARNESS_HOST is the public IP of the Kubernetes node where CDCE Helm is running|

To use local runner build infrastructure, modify the delegate command using the instructions to install the delegate in [Use local runner build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure/#install-the-delegate)


### Verify delegate connectivity

Select **Continue**. After the health checks pass, your delegate is available for you to use. Select **Done** and verify your new delegate is listed.

    

### Secrets

<details open>
<summary>What are Harness secrets?</summary>

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness delegate has access to the key management system. You can also integrate your own secret manager. To learn more about secrets in Harness, go to [Harness Secret Manager Overview](https://developer.harness.io/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview/).

</details>

1. Under **Project Setup**, select **Secrets**.
    1. Select **New Secret**, and then select **Text**.
    2. Enter the secret name `harness_gitpat`.
    3. For the secret value, paste the GitHub personal access token you saved earlier.
    4. Select **Save**.

### Connectors

<details open>
<summary>What are connectors?</summary>

Connectors in Harness enable integration with 3rd party tools, providing authentication and operations during pipeline runtime. For instance, a GitHub connector facilitates authentication and fetching files from a GitHub repository within pipeline stages. Explore connector how-tos [here](https://developer.harness.io/docs/category/connectors).

</details>

1. Create the **GitHub connector**.
    1. Copy the contents of 1-github-connector.yml
    2. In your Harness project in the Harness Manager, under **Project Setup**, select **Connectors**.
    3. Select **Create via YAML Builder** and paste the copied YAML.
    4. Assuming you have already forked the [harnessed-example-apps](https://github.com/harness-community/harnesscd-example-apps/fork) repository mentioned earlier, replace **GITHUB_USERNAME** with your GitHub account username in the YAML.
    5. In `projectIdentifier`, replace with the project identifier with yours, which you can you in the browser URL. For example, `Default_Project_1663189008762`.
    6. Select **Save Changes** and verify that the new connector named **harness_gitconnector** is successfully created.
    7. Finally, select **Connection Test** under **Connectivity Status** to ensure the connection is successful.

2. Kubernetes Connector:
    
In the Harness web console, under **Project Setup**, click **Connectors**.

 Enter the following and click **Save and Continue**.
        
* **Name:** `AWS Serverless`.
* **Credentials:** `AWS Access Key`. Enter the AWS access key for the AWS User you created with the required policies.
* Enter the secret key as a [Harness Text Secret](/docs/platform/Secrets/add-use-text-secrets). The Harness Delegate uses these credentials to authenticate Harness with AWS at deployment runtime.
* **Delegates Setup:** `Only use Delegates with all of the following tags`.
* Select the Delegate you added earlier in this tutorial.
     The **Connection Test** verifies the connection. Click **Finish**.

### Environment

<details open>
<summary>What are Harness environments?</summary>

Environments define the deployment location, categorized as **Production** or **Pre-Production**. Each environment includes infrastructure definitions for VMs, Kubernetes clusters, or other target infrastructures. To learn more about environments, go to [Environments overview](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview/).

</details>

1. In your Harness project, select **Environments**.
    1. Select **New Environment**, and then select **YAML**.
    2. Copy the contents of 3-environment.yml, paste it into the YAML editor, and select **Save**.
    3. In your new environment, select the **Infrastructure Definitions** tab.
    4. Select **Infrastructure Definition**, and then select **YAML**.
    5. Copy the contents of 4-infrastructure-definition.yml and paste it into the YAML editor.
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
    4. Select **Edit YAML**, copy the contents of 5-service.yml, and paste the into the YAML editor.
    5. Select **Save** and verify that the service **harness_serverless** is successfully created.

### Pipeline

<details open>
<summary>What are Harness pipelines?</summary>

A pipeline is a comprehensive process encompassing integration, delivery, operations, testing, deployment, and monitoring. It can utilize CI for code building and testing, followed by CD for artifact deployment in production. A CD Pipeline is a series of stages where each stage deploys a service to an environment. To learn more about CD pipeline basics, go to [CD pipeline basics](https://developer.harness.io/docs/continuous-delivery/get-started/cd-pipeline-basics/).

</details>

1. In your Harness project, select **Pipelines**.
    1. Select **Create a Pipeline**.
    2. Enter the name `harness_serverless_pipeline`.
    3. Choose **Inline** to store the pipeline in Harness.
    4. Select **Start**. 
    5. In **Pipeline Studio**, select **YAML**.
    6. Select **Edit YAML** and choose any of the following execution strategies. Paste the respective YAML based on your selection.


```mdx-code-block
<TabItem value="Serverless Lambda Deploy">
```

Copy the contents of following YAML

```YAML
    pipeline:
  name: serverless-demo
  identifier: serverlessdemo
  projectIdentifier: communityeng
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: stage-1
        identifier: stage1
        description: ""
        type: Deployment
        spec:
          deploymentType: ServerlessAwsLambda
          service:
            serviceRef: Serverless
          execution:
            steps:
              - step:
                  name: Serverless Lambda Deploy
                  identifier: ServerlessLambdaDeploy
                  type: ServerlessAwsLambdaDeploy
                  timeout: 10m
                  spec:
                    commandOptions: ""
            rollbackSteps:
              - step:
                  name: Serverless Lambda Rollback
                  identifier: ServerlessLambdaRollback
                  type: ServerlessAwsLambdaRollback
                  timeout: 10m
                  spec: {}
          environment:
            environmentRef: demoenv
            deployToAll: false
            infrastructureDefinitions:
              - identifier: demoec2
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
        variables: []

```

```mdx-code-block
</TabItem>
```

10. Finally, it's time to execute the Pipeline. Click on **Run**, and then click **Run Pipeline** to initiate the deployment.
Finally, it's time to execute your pipeline. 

1.  Select **Run**, and then select **Run Pipeline** to initiate the deployment.
    - Observe the execution logs as Harness deploys the workload and checks for steady state.


### Congratulations!🎉

You've just learned how to use Harness CD to deploy an application using serverless lambda.