---
title: Amazon ECR
sidebar_position: 1
description: Build and push container images to Amazon ECR
slug: /ci-pipelines/publish/amazon-ecr
---

# Build and push a container image to Amazon ECR

<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/certifications/continuous-integration"
  closable={true}
  target="_self"
/>

Docker made a revolution with containerization. It truly helped to bridge the gap between Dev and Ops teams. Similarly, the cloud providers introduced their own container registries to provide more security and governance. For example, Amazon has Elastic Container Registry (ECR), Microsoft has Azure Container Registry (ACR), and Google has a Google Container Registry (GCR). Container registries have become an integral part of any CI/CD pipeline to store images, metadata, and other important artifacts. In addition, they provide a secure way to store and share container images across a distributed system to help development teams build their software efficiently. In this article, we will explore the Amazon ECR container registry and see how to use it to push container images.

## Understanding container registries
As the name suggests, container registries are used to store some valuable data related to a pipeline. In particular, for storing and sharing container images securely and reliably in a central repository, which multiple users and systems can access. This makes managing and deploying container images easy across a distributed system. Container registries also provide the ability to store multiple versions of a single container image, which allows for version control and rollback if needed. In addition, container registries can store and share sensitive data, such as credentials and secrets, across the team.

## Overview of Amazon ECR
Amazon ECR is a fully managed service from Amazon Web Services (AWS). It is used to store and manage Docker images securely and reliably. In addition, Amazon ECR provides a simple web-based interface for creating, managing, and sharing Docker images and integrating them with other AWS services. 

The following graphic shows how to push your container image to ECR from Harness CI:
![project flowchart](../static/ci-tutorial-build-push-ecr/pipeline_flow_chart.png)

### Prerequisites
Before you can push your container image to ECR from Harness, there are a few prerequisites:
1. You must have an [AWS account](https://aws.amazon.com/resources/create-account/) and have created a repository in ECR.
2. You must have a Docker image of your application ready to push to ECR - We have a [sample application](https://github.com/pavanbelagatti/harness-ci-example) with a Dockerfile. You can clone it and use it in this tutorial. 
3. You must have access to the AWS CLI or the AWS Management Console. 
4. To use [Harness CI](https://app.harness.io/auth/#/signup/?module=ci&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=ci-plg&utm_content=get-started), you must have an account on Harness (it is Free). Harness offers hosted virtual machines (VMs) to run your builds. With Harness Cloud, you can build your code worry-free on the infrastructure that Harness provides. You don't have to spend time and effort to maintain build infrastructure; you can focus on developing great software instead.

### Push your container image to ECR using Harness

We have a [sample application](https://github.com/pavanbelagatti/harness-ci-example) you can fork and use. This sample code repo has a Dockerfile with instructions to build our image. We need to create an ECR repository on AWS to push our image. Then, we will use the Harness CI module to test, build, and push the image to our ECR repo. 

This tutorial assumes you have the ECR repo created on AWS. 
![AWS ECR screenshot](../static/ci-tutorial-build-push-ecr/ECR_AWS_screenshot.png)

1. Log in to your Harness CI module and create a project.
![Harness CI](../static/ci-tutorial-build-push-ecr/CI_Project_creation.png)

2. Create your first pipeline. Select **Get Started**.
![first pipeline](../static/ci-tutorial-build-push-ecr/CI_getstarted.png)

3. Connect your repository. Since our code is on GitHub, we will authenticate with GitHub. 

![CI get started](../static/ci-tutorial-build-push-ecr/code_repo_list.png)

Once the GitHub authentication is done, you should see all your GitHub repositories listed.
4. Select your repository and continue with **Configure Pipeline**.
![github repos](../static/ci-tutorial-build-push-ecr/select_repos.png)

5. Since it is a Node.js project, select Node.js, and then continue to build the pipeline.
![build pipeline](../static/ci-tutorial-build-push-ecr/configure_pipeline.png)

After you select **Create Pipeline**, you should see the skeleton of your CI pipeline.
![create pipeline](../static/ci-tutorial-build-push-ecr/build_node_app.png)

6. Select the name **Build NodeJS**, and then modify the name accordingly. Select the **Execution** tab, and then select **Build Node App** You should see the **Run** step configured for you automatically. 
![run step configure](../static/ci-tutorial-build-push-ecr/run_step_configuration.png)

7. Now, you can modify the commands. Since we don’t want the first three lines in this project, we will remove them and just keep the ‘npm test’ command. Apply changes and save the pipeline.

The pipeline is ready for testing and building the application. What is left is to push our built image to Amazon ECR. So, let us connect our AWS account with Harness to make sure they communicate with each other. 

8. In the project setup, go to the **Connectors** tab to connect our AWS account.

![explore connectors](../static/ci-tutorial-build-push-ecr/explore_connectors.png)

![connectors tab](../static/ci-tutorial-build-push-ecr/connectors.png)

9. Select AWS from the list and add the required details. 
![select AWS](../static/ci-tutorial-build-push-ecr/aws_connector_overview.png)

10. There are three ways to connect your AWS account. We will use **AWS Access Key** method to authenticate and connect.
![AWS access](../static/ci-tutorial-build-push-ecr/AWS_Access.png)

11. Connect the Harness platform as our option to connect with AWS.
![connect AWS](../static/ci-tutorial-build-push-ecr/connect_provider.png)

After you select **Save and Continue**, you should see a successful connection message.
![cloud provider](../static/ci-tutorial-build-push-ecr/cloud_provider_success.png)

Now, you have successfully connected your AWS account with Harness.

It is time to add our last step in the CI pipeline; pushing the image to Amazon ECR.

12. Go back to your pipeline and add a step under the **Build and Test** stage (under execution). 
![step library](../static/ci-tutorial-build-push-ecr/step_library.png)

13. Select **Build and Push to ECR**.
![build and push setup](../static/ci-tutorial-build-push-ecr/build_push_step.png)

14. Make sure to correctly add the Region, Account ID, and Image Name. Add the Tags [I have added **testing** as a Tag]. Apply the changes and save the pipeline settings.

Finally, your pipeline should look like this.
![ecr tutorial](../static/ci-tutorial-build-push-ecr/ECR_tutorial.png)

Basically, we are testing the application with a simple ‘npm test’ command as configured in the ‘Run’ step and pushing the built image to Amazon ECR (configured in the last step).

Save and run the pipeline.
![ci step success](../static/ci-tutorial-build-push-ecr/CI_step_success.png)

You should see a successful output of all steps passing the pipeline if you followed this tutorial and configured everything correctly. You can switch to the console view to see what is happening with each step for more details. 
![Image description](../static/ci-tutorial-build-push-ecr/push_ecr_console_view.png)

Now, you can go to your ECR repository and check the image pushed. 
![ECR image details](../static/ci-tutorial-build-push-ecr/ecr_image_details.png)

Harness CI is the fastest CI on the planet that can help you get going in minutes to test, build and push your artifacts to any registry of your choice. Amazon ECR offers several advantages, and it is a fully managed service, meaning that you don’t have to worry about managing the underlying infrastructure. 

In this tutorial, we explored Amazon ECR and saw how to use it to push our container images using Harness CI. Now that you have a better understanding of ECR and Harness CI, why not give it a try? Push your container images to ECR using Harness and speed up your build process.

**[Try Harness CI Today](https://app.harness.io/auth/#/signup/?module=ci&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=ci-plg&utm_content=get-started)!**
