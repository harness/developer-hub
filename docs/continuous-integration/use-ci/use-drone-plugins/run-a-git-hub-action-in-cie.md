---
title: Run GitHub Actions in CI pipelines
description: Run GitHub Actions in your Harness CI pipelines.

sidebar_position: 30
helpdocs_topic_id: 7kb90dkxw0
helpdocs_category_id: ei5fgqxb0j
helpdocs_is_private: false
helpdocs_is_published: true
---

[GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) are a GitHub feature that enable you to automate various event-driven activities in GitHub, such as cloning a repository, generating Docker images, and testing scripts.

Harness CI supports launching GitHub Actions as part of a pipeline stage using the generic **Plugin** step or the **GitHub Action plugin** steps.

This topic describes how to use the **Plugin** step to run GitHub Actions available in the [GitHub Marketplace](https://github.com/marketplace?category=&query=&type=actions&verification=). For information about the specialized **GitHub Action plugin** step, go to [GitHub Action plugin step settings](../../ci-technical-reference/ci-github-action-step.md).

With the **Plugin** step, you use the GitHub Actions Drone Plugin, [plugins/github-actions](https://github.com/drone-plugins/github-actions), and then replicate the GitHub Action settings. When your pipeline runs, the Github Actions Drone Plugin runs the GitHub Action in the background using [nektos/act](https://github.com/nektos/act).

## Prerequisites

These steps assume you have a CI pipeline with a **Build** stage that is connected to your codebase and has defined build infrastructure.

If you've never created a CI pipeline before, [get started with the fastest CI on the planet](https://developer.harness.io/tutorials/build-code/fastest-ci) or try the [Kubernetes cluster build infrastructure tutorial](/tutorials/build-code/ci-tutorial-kubernetes-cluster-build-infra). If you're new to Harness CI, you might want to review [Harness CI concepts](../../ci-quickstarts/ci-concepts.md) and [CI pipeline concepts](../../ci-quickstarts/ci-pipeline-basics.md).

<details>
<summary>Add Build stage and connect codebase</summary>

Make sure you have a CI pipeline with a **Build** stage that is connected to your codebase.

To add a **Build** stage to an existing pipeline:
1. Go to the pipeline you want to edit.
2. In the Pipeline Studio, select **Add Stage**, and then select **Build**.
3. Enter a **Stage Name**, enable **Clone Codebase**, and then select **Set Up Stage**.

To check codebase configuration for existing pipelines, select **Codebase** while viewing the pipeline in the Pipeline Studio. For more information about codebase configuration, go to [Create and Configure a Codebase](../codebase-configuration/create-and-configure-a-codebase.md).

</details>

<details>
<summary>Define build infrastructure</summary>

1. In the Pipeline Studio, select the **Build** stage, and then select the **Infrastructure** tab.
2. Define the build farm for the codebase. For more information, go to [Set up build infrastructure](https://developer.harness.io/docs/category/set-up-build-infrastructure).

For more information about stage configuration, go to [CI Build stage settings](../../ci-technical-reference/ci-stage-settings.md).

:::tip

You can use expressions or [Runtime Inputs](../../../platform/20_References/runtime-inputs.md) for **Platform** settings.

:::

</details>

## Add the Plugin step

1. In the Pipeline Studio, select the **Build** stage, and then select the **Execution** tab.
2. Select **Add Step**, select **Add Step** again, and then select **Plugins** from the **Step Library**.
3. Enter a **Name** and optional **Description**.
4. Select the **Container Registry** where the [GitHub Actions Drone Plugin](https://github.com/drone-plugins/github-actions) is located.
5. In the **Image** field, enter the name of the GitHub Actions Drone Plugin image: `plugins/github-actions`.
6. Expand the **Optional Configuration**, and select **Privileged**.
   The GitHub Actions Drone Plugin uses [nektos/act](https://github.com/nektos/act) to run GitHub Actions in Harness CI. It requires DinD (Docker-in-Docker) to run your images. Hence, the **Privileged** attribute needs to be enabled to run with escalated permissions. <!--If you're using local runner or VM build infra, do you need privileged? -->

:::tip

For more information about Plugin step settings, go to the [Plugin step settings reference](../../ci-technical-reference/plugin-step-settings-reference.md).

:::

## Define variables and attributes

Use **Settings** to specify the Github Action you want to use and to pass variables and attributes required by the Action and the Drone Plugin. You must specify `uses` and `with`. You can use `env` to specify environment variables, such as GitHub tokens to access [private Action repos](#private-action-repos).

| Key | Description | Value format | Value example |
| - | - | - | - |
| `uses` | Required. Specify the Action's repo, along with a branch or tag.| `[repo]@[tag]` | `actions/setup-go@v3` |
| `with` | Required. Provide a map of key-value pairs representing settings required by the GitHub Action itself. | `key: value` | `go-version: '>=1.17.0'` or `{"path: pom.xml", "destination: cie-demo-pipeline/github-action", "credentials: <+stage.variables.GCP_SECRET_KEY_BASE64>"}` |
| `env` | Optional. Specify a map of environment variables to pass to the Action. | `key: value` | `GITHUB_TOKEN: <+secrets.getValue("github_pat")>` |

:::tip

You can use variable expressions in your values, such as `credentials: <+stage.variables.[TOKEN_SECRET]>`, which uses a [stage variable](/docs/platform/Pipelines/add-a-stage#option-stage-variables).

:::

![A configured Plugin step with Settings variables.](./static/run-a-git-hub-action-in-cie-03.png)

### Private Action repos

If you want to use an Action composite that is located in a private repository, you must add a `GITHUB_TOKEN` environment variable to the `env` **Settings**. You need a [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) that has pull permissions to the target repository. Additional permissions may be necessary depending on the Action's purpose.

* Key: `env`
* Value: `GITHUB_TOKEN: <+secrets.getValue("[SECRET_NAME]")>`

If you have multiple environment variables, add the `GITHUB_TOKEN` variable to the existing `env` map.

:::tip

You can use a variable expressions, such as `<+secrets.getValue("[SECRET_NAME]")>` to call a token stored as a Harness Secret.

:::

Here's an example of the YAML for a `Plugin` step using a private Action repo:

```yaml
- step:
   type: Plugin
   name: private action
   identifier: private_action
   spec:
     connectorRef: dockerhub
     image: plugins/github-actions
     privileged: true
     settings:
       uses: myorg/private-action-step@v1
       with:
         path: pom.xml
     envVariables:
       GITHUB_TOKEN: <+secrets.getValue("github_pat")>
```

## Test your pipeline

1. Select **Apply Changes** to save the step settings, and then select **Save** to save the pipeline.
2. Select **Run** to test the pipeline.

You can observe the GitHub Action in the build's logs.

![](./static/run-a-github-action-in-cie-532.png)

## Pipeline YAML example

The following YAML example includes a `Plugin` step that uses the Google `upload-cloud-storage` GitHub Action. The comments indicate values you must modify to use this code in your own Harness account.

```yaml
pipeline:  
    name: gcp-upload-github-action # Configure your Pipeline name  
    identifier: gcpuploadgithubaction # Configure your Pipeline identifier  
    projectIdentifier: Demo_CI_pipelines # Configure your Project identifier  
    orgIdentifier: default # Configure your Organization  
    tags: {}  
    stages:  
        - stage:  
              identifier: gcp_upload_success_gha # Configure your Stage identifier  
              name: stage 1  
              type: CI  
              variables:   
                  - name: GCP_SECRET_KEY_BASE64 # Configure your Secret Key Name  
                    type: Secret  
                    value: gcpbase64secret # Configure your Secret Key Value  
              spec:  
                  execution:  
                      steps:  
                          - step:  
                                identifier: gcsuploader # Configure your step identifier name  
                                name: step one # Configure your step name  
                                type: Plugin  
                                spec:  
                                    connectorRef: dockerhub  
                                    image: plugins/github-actions  
                                    privileged: true  
                                    settings: # Configure your plugins Settings configuration  
                                        uses: google-github-actions/upload-cloud-storage@main  
                                        with:  
                                            path: pom.xml  
                                            destination: cie-demo-pipeline/github-action  
                                            credentials: <+stage.variables.GCP_SECRET_KEY_BASE64>  
                  infrastructure: # Configure your Infrastructure Settings  
                      type: KubernetesDirect  
                      spec:  
                          connectorRef: buildfarm  
                          namespace: cie-demo-pipeline  
    properties:  
        ci:  
            codebase: # Configure your Codebase  
                connectorRef: githubautouser  
                repoName: springboot  
                build:  
                    type: branch  
                    spec:  
                        branch: ci-autouser
```
