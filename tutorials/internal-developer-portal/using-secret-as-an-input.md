---
title: Using short lived secret to trigger service onboarding pipelines
description: Create a secret input field for developers to give their credentials, which can be used as a runtime input runtime input when creating a service onboarding pipeline in Harness IDP
sidebar_position: 20
---

Sometimes you as a platform engineer, would like your developers to enter their credentials when using a software template in IDP. For example, developers enter their GitHub credentials and then its used in the pipeline to create a repository on their behalf. This is a good approach since this ensures that developers are creating repositories where they have access and there needs to be no "superuser" token configured to such tasks. This tutorial explains how such software templates and the corresponding pipeline can be configured.

## Pre-requisites

Before you begin this tutorial, make sure that you have already created a [basic service onboarding pipeline](./service-onboarding-pipeline.md).

## Pipeline changes

In your pre-existing Harness pipeline, create a new variable, choose the type to be Secret and the value to be Runtime input, as shown in this image.

![](./static/secret-runtime-input.png)

## Template changes

Update your `template.yaml` registered in the IDP to

1. Accept a secret input on the UI
2. Create a Harness secret using an action
3. Use the secret ID to trigger the Harness pipeline
4. Delete the secret after the pipeline is triggered

### 1. Create an input field in the template

Inside the `spec.parameters[0].properties` field of your `template.yaml`, add the following property to generate the input field for the user where they can enter their credentials.

```yaml {5-8}
spec:
  parameters:
    - title: Details
      properties:
        secretValue:
          title: Your credentials
          type: string
          ui:widget: password
```

![](./static/template-creator-ui-secret.png)

### 2. Add secret creation step

Using our `harness:create-secret` action, add a step in the `template.yaml` to create a Harness secret using the input provided by the user.

```yaml
spec:
  # ...
  steps:
    - id: createsecret
      name: Create Harness secret
      action: harness:create-secret
      input:
        projectId: "your-harness-project-id"
        orgId: "your-harness-org-id"
        secretValue: ${{ parameters.secretValue }}
        apikey: ${{ parameters.token }}
```

This will create a new secret in the Harness project mentioned in the input. It should be the same project as your service onboarding pipeline where this will be used. This action has an output field called `secretId` where the generated secret's ID is stored. It can be used in following steps as described below.

:::info note

Ensure that the user using this software template should have access to create secrets in the Harness project. Ideally you should create a new project to store your service onboarding pipelines, where all account users have access to trigger pipelines and create secrets.

:::

### 3. Use secret as pipeline runtime input

Using `steps.createsecret.output.secretId`, you can use the secret ID as an input for the service onboarding pipeline to be triggered.

```yaml
spec:
  # ...
  steps:
    # - id: createsecret
    # ...
    - id: trigger
      name: Creating your new service
      action: trigger:harness-custom-pipeline
      input:
        url: "<link-to-your-Harness-pipeline>"
        inputset:
          input1: ${{ parameters.input1 }}
          # ...
          secret: ${{ steps.createsecret.output.secretId }}
        apikey: ${{ parameters.token }}
```

### 4. Delete secret after the job is done

Using the `harness:delete-secret`, ensure that the secret is removed from the project as it will no longer be needed.

```yaml
spec:
  # ...
  steps:
    # - id: createsecret
    # ...
    # - id: trigger
    # ...
    - id: deletesecret
      name: Delete the Harness secret
      action: harness:delete-secret
      input:
        projectId: "your-harness-project-id"
        orgId: "your-harness-org-id"
        secretId: ${{ steps.createsecret.output.secretId }}
        apikey: ${{ parameters.token }}
```

:::info note

If the pipeline step fails, the secret will not be removed automatically from the project. We are exploring the approaches of automatic cleanup, but you can find all the secrets created using this action to look like `idp_template_tempsecret_{uniqueID}` and manually delete those secrets.

:::
