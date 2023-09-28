---
title: Custom GitHub Status Check
description: In this article, we will guide you through the process of creating your own customized GitHub Status Check using our Harness CI module. By following these steps, you'll be able to integrate a GitHub Status Check into your CI pipeline and enhance your development workflow.
keywords: [Continuous Integration, CI Tutorial, GitHub, Status Check]
---

# Creating Your Own Customized GitHub Status Check

### Module

- Harness CI

### Environment

- **Infrastructure:** Any
- **OS:** Any

### Prerequisites

Before you begin, make sure you are familiar with the following concepts and have the necessary resources:

* [Harness CI Basics](/docs/continuous-integration/ci-quickstarts/ci-pipeline-basics): Familiarize yourself with the basics of Harness CI.
* [CI Run Step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings): Understand how to configure a CI Run Step in your pipeline.
* [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens): Generate a personal access token in your GitHub account, which will be used for authentication.
* [Pipeline](/docs/platform/Pipelines/harness-yaml-quickstart): Have an existing pipeline in Harness where you want to add the **GitHub Status Check**.

### Create a secret to store your GitHub Personal Access Token

To ensure the security of your personal access token, we recommend storing it in a safe place like the [Harness Secret Manager](/docs/platform/secrets/secrets-management/harness-secret-manager-overview). Follow these steps to create a secret and store your GitHub Personal Access Token:

1. Generate a personal access token in your **GitHub** account.
2. Navigate to the  Secret Manager and create a new secret. [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets).
3. Add the **GitHub Personal Access Token** as the value for the secret.

### Add a Run Step to your CI Stage

Once you have the secret set up, you can add a **Run Step** to your pipeline to implement the GitHub Status Check. Here's how you can configure the step parameters:

1. Click on the **Add Step** button and select **Run Step** from the options. Remember, it must be inside of a [CI Stage](/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings)
2. Configure the step parameters:
    - **Name:** Provide a descriptive name for the step (e.g., "GitHub Status Check - Pending").
    - **Container Registry:** Choose the appropriate container registry (e.g., Harness Docker Connector).
    - **Image:** Select an image that has cURL installed. You can use the official image from DockerHub [curlimages/curl](https://hub.docker.com/r/curlimages/curl)
    - **Shell:** Set it to "sh" for running shell commands.

### Customize the script

In this step, you will include a script to send a request to GitHub's API. Follow these instructions:

1. Copy and paste the following command into the **Run Step** configuration, and make the necessary edits based on your requirements:

```shell
  curl -i \
  -X POST \
  -H "Authorization: Bearer <+secrets.getValue('account.Github_Access_Token')>" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/<YOUR_ORGANIZATION>/<+pipeline.properties.ci.codebase.repoName>/statuses/<+codebase.commitSha> \
  -d '{"state":"pending","target_url":"<+pipeline.execution.url>","description":"Test is running","context":"harness-ci/tests"}'
```

2. Replace the ```<+secrets.getValue('account.Github_Access_Token')>``` placeholder with the secret reference that contains your GitHub Personal Access Token.

3. Customize the remaining placeholders based on your repository and pipeline details.

:::info
The example above provides the fundamental command to create a GitHub Status Check, but it may not cover all your requirements. Feel free to leverage our expressions and tailor the script according to your specific needs.
:::
