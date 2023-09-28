---
title: Create a service onboarding pipeline
description: Create a basic service onboarding pipeline in Harness IDP
sidebar_position: 10
---

This tutorial is designed to help a platform engineer to get started with Harness IDP. We will create a basic service onboarding pipeline that uses a software template and provisions a Next.js application for a developer. After you create the software template, developers can choose the template on the **Create** page and enter details such as a name for the application and the path to their Git repository. The service onboarding pipeline creates a hello world repository for storing code.

Your users (developers) must perform a sequence of tasks to create the application. First, they interact with a software template. A software template is a form that collects a user's requirements. After a user submits the form, IDP executes a Harness pipeline that onboards the new service. Usually the pipeline fetches a _hello-world_ skeleton code, creates a new repository, and interacts with third-party providers such as cloud providers, Jira, and Slack.

![](./static/service-onboarding-user-flow.png)

## Prerequisites

Before you begin this tutorial, make sure that you fulfil the following requirements:

- Enable Harness IDP for your account.
- Obtain a CI or CD license if you do not have one. This is a temporary requirement.

## Create a pipeline

Begin by creating a pipeline for onboarding the service.

### Create a Build or Custom stage

To create a Build or Custom stage, perform the following steps:

1. In the sidebar of the Harness application, select **Projects**, and then select a project.

You can also create a new project for the service onboarding pipelines. Eventually, all the users in your account should have permissions to execute the pipelines in this project. For information about creating a project, go to [Create organizations and projects](/docs/platform/organizations-and-projects/create-an-organization/).

2. Select **Pipelines**, and then select **Create a Pipeline**.

3. In **Pipeline Studio**, select **Add Stage**.

![](./static/create-pipeline.png)

4. In **Select Stage Type**, select **Custom Stage**. (If you have a Harness CI license, you could also use the Build stage type. However, for this tutorial, we recommend that you use the Custom Stage type.)

![](./static/custom-stage.png)

5. In **Stage Name**, enter a name for the stage, and then click **Set Up Stage**.

6. Select **Add step**, and then, in the menu that appears, select **Add Step**.

A sidebar with available steps is displayed.

7. Select **Container Step** to run a Python CLI called [cookiecutter](https://github.com/cookiecutter/cookiecutter). We need a publicly available Python image for this purpose. You can use Container Step for any such project generators (for example, [yeoman](https://yeoman.io/)).

:::info note
In the CI or Build stage type, container step is named Run, and it has the same functionality.
:::

![](./static/container-step-tools.png)

8. Configure the step as follows:

   1. Enter a name for the step. For example, name it `Create Next.js app`.

   2. You can enter `10m` (10 minutes) in the Timeout field.

   3. In **Container Registry**, create or choose an anonymous Docker connector that connects to DockerHub (`https://registry.hub.docker.com/v2/`).

   4. In **Image**, enter `python`.

   Before we write the command, we must make an infrastructure choice, which means that we specify where the pipeline executes. You can execute the pipeline on your own infrastructure or on the Harness platform. If you have an existing delegate set up for deployments, you can use the associated connector and specify its Kubernetes namespace. If you want to use the Harness platform, you have to use the CI or Build stage type instead of the Custom stage type and choose the Harness platform as your infrastructure.

   :::info note
   Depending upon our operation, we might have to adjust the memory limit of the container. If required, you can change Limit Memory from `500Mi` to `4000Mi`.
   :::

   5. Paste the following cookiecutter-based script into **Command**.

      The script performs the following tasks:

      1. Generates a basic Next.js app.

      2. Creates a repository with the contents. The sample code used in the command is available [here](https://github.com/harness-community/idp-samples/tree/main/idp-pipelines/nextjs), whichand it's essentially is a [cookiecutter project](https://cookiecutter.readthedocs.io/en/stable/tutorials/tutorial2.html). You can choose from available [cookiecutter projects](https://www.cookiecutter.io/templates) or create your own project from scratch.

   ```sh
   # Pre-cleanup in case pipeline fails

   rm -rf idp-samples/
   rm -rf "<+pipeline.variables.project_name>"

   # Clone skeleton
   git clone https://github.com/harness-community/idp-samples

   # Generate code to be pushed
   pip install cookiecutter
   cookiecutter idp-samples/idp-pipelines/nextjs/skeleton project_name="<+pipeline.variables.project_name>" --no-input

   # Create a new GitHub repository
   curl -L -i -X POST -H "Accept: application/vnd.github+json" -H "Authorization: Bearer <+pipeline.variables.github_token>" https://api.github.com/orgs/<+pipeline.variables.github_org>/repos -d "{\"name\":\"<+pipeline.variables.github_repo>\",\"description\":\"<+pipeline.variables.project_name> - A Next.js app\",\"private\":false}"

   # Push the code
   cd <+pipeline.variables.project_name>/
   git init -b main
   git config --global user.email "support@harness.io"
   git config --global user.name "Harness Support"
   git add .
   git commit -m "Project init"
   git remote add origin https://github.com/<+pipeline.variables.github_org>/<+pipeline.variables.github_repo>.git
   git push https://<+pipeline.variables.github_token>@github.com/<+pipeline.variables.github_org>/<+pipeline.variables.github_repo>.git
   ```

9. Click **Apply Changes**.

### Manage variables in the pipeline

The script uses several pipeline variables. The variables are as follows:

- `<+pipeline.variables.project_name>`
- `<+pipeline.variables.github_username>`
- `<+pipeline.variables.github_token>`
- `<+pipeline.variables.github_org>`
- `<+pipeline.variables.github_repo>`

You can use the **Variables** button on the floating sidebar on the right-hand side to open the Variables page for the pipeline.

![](./static/pipeline%20variables.png)

You can create any number of pipeline variables and decide their value type. Some variables, such as a GitHub token, a user name, and organization, can have a fixed value. The token used in the code above is a Harness secret whose value is decoded during pipeline execution.

Variables such as project name and GitHub repository are runtime inputs. They are needed at the time of pipeline execution. When creating a new variable, you can specify its type in the UI. For more information about reference variables, go to the [reference documentation](/docs/platform/variables-and-expressions/harness-variables/) on pipeline variables.

### Create a software template definition in IDP

Now that our pipeline is ready to execute when a project name and a GitHub repository name are provided, let's create the UI counterpart of it in IDP. This is powered by the [Backstage Software Template](https://backstage.io/docs/features/software-templates/writing-templates). Create a `template.yaml` file anywhere in your Git repository. Usually, that would be the same place as your skeleton hello world code.

[Source](https://github.com/harness-community/idp-samples/blob/main/idp-pipelines/nextjs/template.yaml)

```yaml
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: nextjs-app
  title: Create a Next.js app
  description: A template to create a new Next.js app
  tags:
    - nextjs
    - react
    - javascript
spec:
  owner: name@company.io
  type: service
  parameters:
    - title: Next.js app details
      required:
        - project_name
        - github_repo
      properties:
        project_name:
          title: Name of your new app
          type: string
          description: Unique name of the app
        github_repo:
          title: Name of the GitHub repository
          type: string
          description: This will be the name of Repository on Github
        isPublish:
          title: Do you wish to publish the artificat the internal registry?
          type: boolean
    - title: Service Infrastructure Details
      required:
        - owner
      properties:
        cloud_provider:
          title: Choose a cloud provider for Deployment
          type: string
          enum: ["GCP", "AWS"]
          default: GCP
        db:
          title: Choose a Database Type for the Service
          type: string
          enum: ["None", "MySQL", "Postgres", "MongoDB"]
          default: None
        cache:
          title: Choose a caching system for the Service
          type: string
          enum: ["None", "Redis"]
          default: None
        owner:
          title: Choose an Owner for the Service
          type: string
          ui:field: OwnerPicker
          ui:options:
            allowedKinds:
              - Group
        # This field is hidden but needed to authenticate the request to trigger the pipeline
        token:
          title: Harness Token
          type: string
          ui:widget: password
          ui:field: HarnessAuthToken
  steps:
    - id: trigger
      name: Creating your Next.js app
      action: trigger:harness-custom-pipeline
      input:
        url: "https://app.harness.io/ng/account/vpCkHKsDSxK9_KYfjCTMKA/home/orgs/QE_Team/projects/Quality_Assurence/pipelines/IDP_New_NextJS_app/pipeline-studio/?storeType=INLINE"
        inputset:
          project_name: ${{ parameters.project_name }}
          github_repo: ${{ parameters.github_repo }}
          cloud_provider: ${{ parameters.provider }}
          db: ${{ parameters.db }}
          cache: ${{ parameters.cache }}
        apikey: ${{ parameters.token }}

  output:
    links:
      - title: Pipeline Details
        url: ${{ steps.trigger.output.PipelineUrl }}
```

This YAML code is governed by Backstage. You can change the name and description of the software template. The template has the following parts:

1. Input from the user
2. Execution of pipeline

![](./static/template-1.png)
![](./static/template-2.png)
![](./static/template-3.png)

Let's take a look at the inputs that the template expects from a developer. The inputs are written in the `spec.parameters` field. It has two parts, but you can combine them. The keys in `properties` are the unique IDs of fields (for example, `github_repo` and `project_name`). If you recall, they are the pipeline variables that we set as runtime inputs earlier. This is what we want the developer to enter when creating their new application.

The YAML definition includes fields such as cloud provider and database choice. They are for demonstration purposes only and are not used in this tutorial.

### Authenticate the request

Once you have written all the inputs that the template requires, you must add the following YAML snippet under `spec.parameters.properties`.

```yaml
token:
  title: Harness Token
  type: string
  ui:widget: password
  ui:field: HarnessAuthToken
```

This is a custom component we created to authenticate the call to execute the pipeline on the basis of the logged-in user's credentials.

### Action to trigger the pipeline

The `spec.steps` field contains only one action, and that is to trigger a Harness pipeline. Update the `url` and replace it with the URL of your service onboarding pipeline. Also, ensure that the `inputset` is correct and it contains all the runtime input variables that the pipeline needs.

### Register the template

Use the URL to the `template.yaml` created above and register it by using the same process for [registering a new software component](/docs/internal-developer-portal/getting-started/register-a-new-software-component).

Now navigate to the **Create** page in IDP. You will see the newly created template appear. Try it out!
